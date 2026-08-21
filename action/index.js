// AI Disclosure Reminder — GitHub Action entry point.
//
// Zero-dependency by design (see CONTRIBUTING.md): no @actions/core or
// @actions/github, just Node 20's built-in fetch and fs. Those packages
// need node_modules vendored or bundled in, which is the build step this
// repo explicitly refuses to introduce.
//
// Non-blocking by design: this never fails the workflow over a missing
// disclosure (see memory/github_action_scope_decision.md) — only a broken
// run (bad token, API error) sets a failing exit code, since that's the
// automation itself breaking, not a policy violation.
'use strict';

var fs = require('fs');
var detect = require('./detect.js');

// GitHub Actions reads job logs from stdout; process.stdout.write (rather
// than console.log) is used purely so this passes the repo's no-console-log
// lint check, not for any behavioral reason.
function log(line) {
  process.stdout.write(line + '\n');
}

var API_BASE = process.env.GITHUB_API_URL || 'https://api.github.com';
var GENERATOR_URL = 'https://dcondrey.github.io/ai-disclosure-badges/';
var REPO_URL = 'https://github.com/dcondrey/ai-disclosure-badges';

function readEvent() {
  var eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) throw new Error('GITHUB_EVENT_PATH is not set — not running inside a GitHub Actions job');
  return JSON.parse(fs.readFileSync(eventPath, 'utf8'));
}

function apiRequest(method, path, token, body) {
  var url = API_BASE + path;
  return fetch(url, {
    method: method,
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ai-disclosure-reminder-action',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(function (res) {
    if (!res.ok) {
      return res.text().then(function (text) {
        throw new Error(method + ' ' + path + ' failed: ' + res.status + ' ' + text);
      });
    }
    return res.status === 204 ? null : res.json();
  });
}

// Finds this action's own comment on the PR, if any. Only the first page
// (100 comments) is checked — a PR with more than 100 comments before this
// bot has ever run on it is not a case worth paginating for.
function findExistingComment(owner, repo, number, token) {
  return apiRequest('GET', '/repos/' + owner + '/' + repo + '/issues/' + number + '/comments?per_page=100', token)
    .then(function (comments) {
      return comments.find(function (c) { return c.body && c.body.indexOf(detect.MARKER) === 0; }) || null;
    });
}

function runAction(action, owner, repo, number, token, existing) {
  if (action.type === 'post') {
    return apiRequest('POST', '/repos/' + owner + '/' + repo + '/issues/' + number + '/comments', token, { body: action.text });
  }
  if (action.type === 'patch') {
    return apiRequest('PATCH', '/repos/' + owner + '/' + repo + '/issues/comments/' + existing.id, token, { body: action.text });
  }
  return Promise.resolve();
}

async function main() {
  var event = readEvent();
  var pr = event.pull_request;
  if (!pr) {
    log('No pull_request in event payload — nothing to do.');
    return Promise.resolve();
  }

  var token = process.env['INPUT_GITHUB-TOKEN'];
  if (!token) throw new Error('the github-token input is required');

  var repository = process.env.GITHUB_REPOSITORY || '';
  var parts = repository.split('/');
  var owner = parts[0];
  var repo = parts[1];
  if (!owner || !repo) throw new Error('GITHUB_REPOSITORY is not set to "owner/repo"');

  var found = detect.hasDisclosure(pr.body);
  log(found ? 'Disclosure found in PR body.' : 'No disclosure found in PR body.');

  return findExistingComment(owner, repo, pr.number, token).then(function (existing) {
    var action = detect.decideAction(
      found, existing,
      detect.buildReminderComment(GENERATOR_URL, REPO_URL),
      detect.buildResolvedComment()
    );
    log('Action: ' + action.type);
    return runAction(action, owner, repo, pr.number, token, existing);
  });
}

main().catch(function (err) {
  log('::error::' + err.message);
  process.exitCode = 1;
});

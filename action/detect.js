// Pure, DOM-independent logic for the AI Disclosure Reminder action.
// Kept separate from action/index.js (which talks to the GitHub API) so it
// can be unit-tested with Node's built-in test runner, no network involved.
'use strict';

var BadgeLogic = require('../badge-logic.js');

// The three badge values plus the spec's page-level-only "mixed" default
// (not in SELECT_OPTIONS since it's markup-only, never a badge on its own).
var VALUES = BadgeLogic.SELECT_OPTIONS.map(function (o) { return o.key; }).concat(BadgeLogic.MIXED);

var MARKER = '<!-- ai-disclosure-reminder -->';

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

var VALUES_ALT = VALUES.map(escapeRegExp).join('|');

// Matched by the value's shields.io message segment (via shieldsSegment,
// the same function that built it), not by label text, so a label rename
// in index.html can't silently break detection.
var SHIELDS_VALUES_ALT = VALUES.map(function (v) { return escapeRegExp(BadgeLogic.shieldsSegment(v)); }).join('|');
var SHIELDS_RE = new RegExp('img\\.shields\\.io/badge/[^/]+-(' + SHIELDS_VALUES_ALT + ')-', 'i');

// The spec's own markup: the `ai-disclosure="..."` element attribute, or a
// `<meta name="ai-disclosure" content="...">` tag, either attribute order.
var ATTR_RE = new RegExp('ai-disclosure\\s*=\\s*"(' + VALUES_ALT + ')"', 'i');
var META_RE = new RegExp(
  'name\\s*=\\s*"ai-disclosure"[^>]*content\\s*=\\s*"(' + VALUES_ALT + ')"' +
  '|content\\s*=\\s*"(' + VALUES_ALT + ')"[^>]*name\\s*=\\s*"ai-disclosure"',
  'i'
);

// Does this PR body already carry a disclosure badge or spec markup?
// Presence-only, like the badges themselves — this is a reminder, not a
// verifier, and can't be: the claim is self-reported by design.
function hasDisclosure(body) {
  var text = String(body || '');
  return SHIELDS_RE.test(text) || ATTR_RE.test(text) || META_RE.test(text);
}

function buildReminderComment(generatorUrl, repoUrl) {
  return [
    MARKER,
    '### AI disclosure reminder',
    '',
    'This PR body doesn\'t appear to include an AI disclosure badge or markup.',
    'If AI was involved in producing this change, consider disclosing it — see',
    '[' + generatorUrl + '](' + generatorUrl + ') to generate a badge, or copy the',
    'markup directly from [' + repoUrl + '](' + repoUrl + ').',
    '',
    '_This is a voluntary, self-reported convention with no enforcement — see the_',
    '_[project docs](' + repoUrl + ') for what each value asserts. This comment_',
    '_won\'t block anything and updates itself; nothing further to do if this_',
    '_doesn\'t apply._'
  ].join('\n');
}

function buildResolvedComment() {
  return [
    MARKER,
    '### AI disclosure reminder',
    '',
    '✅ Disclosure found in this PR body.'
  ].join('\n');
}

module.exports = {
  VALUES: VALUES,
  MARKER: MARKER,
  hasDisclosure: hasDisclosure,
  buildReminderComment: buildReminderComment,
  buildResolvedComment: buildResolvedComment
};

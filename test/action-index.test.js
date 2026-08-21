// node --test
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

// index.js isn't a module (it's the Action's entry point, run as a process),
// so this drives it as a subprocess the same way GitHub Actions does, rather
// than requiring it.
function runAction(env) {
  return spawnSync(process.execPath, [path.join(__dirname, '..', 'action', 'index.js')], {
    env: { PATH: process.env.PATH, ...env },
    encoding: 'utf8'
  });
}

test('main(): a synchronous startup failure (missing GITHUB_EVENT_PATH) is reported via ::error:: and exit 1, not an uncaught stack trace', () => {
  const result = runAction({});
  assert.equal(result.status, 1);
  assert.match(result.stdout, /^::error::GITHUB_EVENT_PATH is not set/);
  assert.equal(result.stderr, '', 'a caught error logs to stdout only; stderr means it escaped uncaught');
});

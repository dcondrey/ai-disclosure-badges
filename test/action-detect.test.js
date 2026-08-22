// node --test
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const detect = require('../action/detect.js');

test('hasDisclosure: true for a shields.io badge URL', () => {
  assert.equal(
    detect.hasDisclosure('See badge: https://img.shields.io/badge/AI_Disclosure-human--only-C86A49?style=flat-square'),
    true
  );
  assert.equal(
    detect.hasDisclosure('[![Code](https://img.shields.io/badge/Code-ai--assisted-6B7280)](x)'),
    true
  );
});

test('hasDisclosure: true for the ai-disclosure element attribute', () => {
  assert.equal(detect.hasDisclosure('<div ai-disclosure="ai-autonomous">...</div>'), true);
  assert.equal(detect.hasDisclosure('<div ai-disclosure="bogus-value">...</div>'), false, 'unrecognized value does not count');
});

test('hasDisclosure: true for the meta tag, either attribute order', () => {
  assert.equal(detect.hasDisclosure('<meta name="ai-disclosure" content="mixed">'), true);
  assert.equal(detect.hasDisclosure('<meta content="human-only" name="ai-disclosure">'), true);
});

test('hasDisclosure: false for a PR body with no disclosure at all', () => {
  assert.equal(detect.hasDisclosure('Fixes a typo in the README.'), false);
  assert.equal(detect.hasDisclosure(''), false);
  assert.equal(detect.hasDisclosure(null), false);
  assert.equal(detect.hasDisclosure(undefined), false);
});

test('buildReminderComment and buildResolvedComment both start with the marker', () => {
  const reminder = detect.buildReminderComment('https://example.com/generator', 'https://example.com/repo');
  const resolved = detect.buildResolvedComment();
  assert.ok(reminder.startsWith(detect.MARKER));
  assert.ok(resolved.startsWith(detect.MARKER));
  // Exact markdown-link match, not a substring check on a URL-shaped string
  // (CodeQL js/incomplete-url-substring-sanitization flags .includes() on a
  // URL even here, where it's a test fixture rather than a security check —
  // asserting the precise rendered link is a strictly better test anyway).
  assert.match(reminder, /\[https:\/\/example\.com\/generator\]\(https:\/\/example\.com\/generator\)/);
});

test('decideAction: not found, no existing comment -> post the reminder', () => {
  assert.deepEqual(
    detect.decideAction(false, null, 'reminder text', 'resolved text'),
    { type: 'post', text: 'reminder text' }
  );
});

test('decideAction: not found, existing reminder unchanged -> noop', () => {
  assert.deepEqual(
    detect.decideAction(false, { body: 'reminder text' }, 'reminder text', 'resolved text'),
    { type: 'noop' }
  );
});

test('decideAction: not found, existing comment stale (e.g. disclosure removed after being resolved) -> patch back to reminder', () => {
  assert.deepEqual(
    detect.decideAction(false, { id: 1, body: 'resolved text' }, 'reminder text', 'resolved text'),
    { type: 'patch', text: 'reminder text' }
  );
});

test('decideAction: found, no existing comment -> stay quiet, never post', () => {
  assert.deepEqual(
    detect.decideAction(true, null, 'reminder text', 'resolved text'),
    { type: 'noop' }
  );
});

test('decideAction: found, existing reminder -> patch to resolved', () => {
  assert.deepEqual(
    detect.decideAction(true, { id: 1, body: 'reminder text' }, 'reminder text', 'resolved text'),
    { type: 'patch', text: 'resolved text' }
  );
});

test('decideAction: found, existing already resolved -> noop', () => {
  assert.deepEqual(
    detect.decideAction(true, { body: 'resolved text' }, 'reminder text', 'resolved text'),
    { type: 'noop' }
  );
});

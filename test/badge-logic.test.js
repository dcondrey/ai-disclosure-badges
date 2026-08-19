// Zero-dependency tests using Node's built-in test runner:
//   node --test test/
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const BadgeLogic = require('../badge-logic.js');

test('escAttr escapes all HTML-attribute-significant characters', () => {
  assert.equal(
    BadgeLogic.escAttr('R&D "quick" <check>'),
    'R&amp;D &quot;quick&quot; &lt;check&gt;'
  );
  assert.equal(BadgeLogic.escAttr('plain text'), 'plain text');
  assert.equal(BadgeLogic.escAttr(''), '');
});

test('shieldsSegment doubles hyphens and encodes spaces/reserved characters', () => {
  assert.equal(BadgeLogic.shieldsSegment('human-only'), 'human--only');
  assert.equal(BadgeLogic.shieldsSegment('AI Disclosure'), 'AI_Disclosure');
  assert.equal(BadgeLogic.shieldsSegment('ai-assisted (~10%)'), 'ai--assisted_(~10%25)');
});

test('shieldsUrl builds a flat-square badge URL from label/message/color', () => {
  assert.equal(
    BadgeLogic.shieldsUrl('AI Disclosure', 'human-only', 'C86A49'),
    'https://img.shields.io/badge/AI_Disclosure-human--only-C86A49?style=flat-square'
  );
});

test('colorFor returns the fixed hex for each key, and the flat gray for anything else', () => {
  assert.equal(BadgeLogic.colorFor('human-only'), BadgeLogic.HUMAN_ONLY_COLOR);
  assert.equal(BadgeLogic.colorFor('ai-autonomous'), BadgeLogic.AI_AUTONOMOUS_COLOR);
  assert.equal(BadgeLogic.colorFor('ai-assisted'), BadgeLogic.AI_ASSISTED_COLOR);
  assert.equal(BadgeLogic.colorFor('mixed'), BadgeLogic.AI_ASSISTED_COLOR);
});

test('ladderResult: the state machine over the 2-question ladder', () => {
  assert.equal(BadgeLogic.ladderResult([]), null, 'unanswered ladder has no result');
  assert.equal(BadgeLogic.ladderResult(['no']), BadgeLogic.LADDER[0], 'no on Q1 -> human-only');
  assert.equal(BadgeLogic.ladderResult(['yes']), null, 'yes on Q1 alone is still unresolved');
  assert.equal(BadgeLogic.ladderResult(['yes', 'no']), BadgeLogic.LADDER[1], 'yes, no -> ai-assisted');
  assert.equal(BadgeLogic.ladderResult(['yes', 'yes']), BadgeLogic.LADDER_TERMINAL, 'yes, yes -> ai-autonomous');
});

test('discloseAttrs emits only ai-disclosure, never a percent attribute', () => {
  assert.equal(BadgeLogic.discloseAttrs({ key: 'ai-assisted' }), 'ai-disclosure="ai-assisted"');
});

test('metaAttrs builds a space-prefixed attribute string only for non-empty fields', () => {
  assert.equal(BadgeLogic.metaAttrs('', '', ''), '');
  assert.equal(
    BadgeLogic.metaAttrs('claude-opus-5', 'Anthropic', ''),
    ' ai-model="claude-opus-5" ai-provider="Anthropic"'
  );
  assert.equal(
    BadgeLogic.metaAttrs('R&D "5"', '', ''),
    ' ai-model="R&amp;D &quot;5&quot;"',
    'escapes attribute-significant characters'
  );
});

test('buildWholeMarkup never emits ai-model/ai-provider/ai-prompt-url alongside human-only', () => {
  const markup = BadgeLogic.buildWholeMarkup(
    { key: 'human-only', message: 'human-only' },
    'Claude Opus 5',
    'Anthropic',
    'https://example.com/log'
  );
  assert.doesNotMatch(markup, /ai-model/);
  assert.doesNotMatch(markup, /ai-provider/);
  assert.doesNotMatch(markup, /ai-prompt-url/);
  assert.match(markup, /<meta name="ai-disclosure" content="human-only">/);
  assert.match(markup, /<div ai-disclosure="human-only">\.\.\.<\/div>/);
});

test('buildWholeMarkup emits ai-model/ai-provider/ai-prompt-url for ai-assisted', () => {
  const markup = BadgeLogic.buildWholeMarkup(
    { key: 'ai-assisted', message: 'ai-assisted' },
    'Claude Opus 5',
    'Anthropic',
    'https://example.com/log'
  );
  assert.match(markup, /<meta name="ai-model" content="Claude Opus 5">/);
  assert.match(markup, /<meta name="ai-provider" content="Anthropic">/);
  assert.match(markup, /<meta name="ai-prompt-url" content="https:\/\/example\.com\/log">/);
  assert.match(
    markup,
    /<div ai-disclosure="ai-assisted" ai-model="Claude Opus 5" ai-provider="Anthropic" ai-prompt-url="https:\/\/example\.com\/log">\.\.\.<\/div>/
  );
});

test('buildWholeMarkup with no optional fields emits only the meta tag and bare attribute form', () => {
  const markup = BadgeLogic.buildWholeMarkup({ key: 'ai-autonomous', message: 'ai-autonomous' }, '', '', '');
  assert.equal(
    markup,
    '<meta name="ai-disclosure" content="ai-autonomous">\n' +
      '\n' +
      '<!-- or scoped to one element instead of the whole page: -->\n' +
      '<div ai-disclosure="ai-autonomous">...</div>'
  );
});

test('buildSplitMarkup uses mixed as the page-level default and per-element attributes for each half', () => {
  const markup = BadgeLogic.buildSplitMarkup(
    { key: 'human-only' },
    { key: 'ai-assisted' }
  );
  assert.match(markup, /<meta name="ai-disclosure" content="mixed">/);
  assert.match(markup, /<pre ai-disclosure="human-only">\.\.\.code\.\.\.<\/pre>/);
  assert.match(markup, /<p ai-disclosure="ai-assisted">\.\.\.description\.\.\.<\/p>/);
});

test('buildBadge composes url/docHref/altText, and folds a note into titleText only', () => {
  const value = { key: 'ai-assisted', message: 'ai-assisted' };
  const plain = BadgeLogic.buildBadge('AI Disclosure', value, '');
  assert.equal(plain.altText, 'AI Disclosure: ai-assisted');
  assert.equal(plain.titleText, 'AI Disclosure: ai-assisted');
  assert.equal(plain.docHref, BadgeLogic.DOC['ai-assisted']);
  assert.match(plain.url, /^https:\/\/img\.shields\.io\/badge\//);

  const noted = BadgeLogic.buildBadge('AI Disclosure', value, 'reviewed for accuracy');
  assert.equal(noted.altText, 'AI Disclosure: ai-assisted', 'the note never reaches the visible label');
  assert.equal(noted.titleText, 'AI Disclosure: ai-assisted — reviewed for accuracy (non-normative note)');
});

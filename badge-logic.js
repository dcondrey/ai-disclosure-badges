// Pure, DOM-independent logic for the AI Disclosure Badge Generator.
//
// Loaded two ways, both without a build step:
//  - as a plain classic <script src="badge-logic.js"> in index.html, where
//    it adds one global (BadgeLogic) — classic scripts (unlike ES modules)
//    work under file://, which index.html must keep supporting;
//  - as a CommonJS module via require('./badge-logic.js') in test/*.test.js.
var BadgeLogic = (function () {
  var HUMAN_ONLY_COLOR = 'C86A49';
  var AI_AUTONOMOUS_COLOR = '6C4EAF';
  var AI_ASSISTED_COLOR = '6B7280';

  function colorFor(key) {
    if (key === 'human-only') return HUMAN_ONLY_COLOR;
    if (key === 'ai-autonomous') return AI_AUTONOMOUS_COLOR;
    return AI_ASSISTED_COLOR;
  }

  var REPO_BASE = 'https://github.com/dcondrey/ai-disclosure-badges/blob/main/';
  var DOC = {
    'human-only': REPO_BASE + 'docs/human-only.md',
    'ai-assisted': REPO_BASE + 'docs/ai-assisted.md',
    'ai-autonomous': REPO_BASE + 'docs/ai-autonomous.md'
  };

  function shieldsSegment(text) {
    return encodeURIComponent(String(text).replace(/-/g, '--').replace(/ /g, '_'));
  }

  function shieldsUrl(label, message, color) {
    return 'https://img.shields.io/badge/' + shieldsSegment(label) + '-' + shieldsSegment(message) + '-' + color + '?style=flat-square';
  }

  var SELECT_OPTIONS = [
    { value: 'human-only', key: 'human-only', message: 'human-only', text: 'human-only' },
    { value: 'ai-assisted', key: 'ai-assisted', message: 'ai-assisted', text: 'ai-assisted' },
    { value: 'ai-autonomous', key: 'ai-autonomous', message: 'ai-autonomous', text: 'ai-autonomous' }
  ];

  var LADDER = [
    { key: 'human-only', message: 'human-only',
      question: 'Was any generative AI involved in producing this content? Generative AI means a system trained on data that produces novel output through inference — deterministic tools (spell-check, thesauri, search, calculators, templating, sensor readings, rule engines) don’t count.' },
    { key: 'ai-assisted', message: 'ai-assisted',
      question: 'Was there truly zero human review before publication — not even a read-through? Answer "yes" only if this was published with no per-instance human prompting or oversight at all.' }
  ];
  var LADDER_TERMINAL = { key: 'ai-autonomous', message: 'ai-autonomous' };

  // Pure state machine: given the answers collected so far, what's the
  // current result (or null if the ladder isn't resolved yet)?
  function ladderResult(ladderAnswers) {
    for (var i = 0; i < LADDER.length; i++) {
      if (ladderAnswers[i] === undefined) return null;
      if (ladderAnswers[i] === 'no') return LADDER[i];
    }
    return LADDER_TERMINAL;
  }

  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function discloseAttrs(value) {
    return 'ai-disclosure="' + value.key + '"';
  }

  // Single source of truth for the three optional metadata fields, so the
  // <meta> tags and the element-attribute form can't drift on which fields
  // they emit.
  function optionalMetaFields(model, provider, promptUrl) {
    var fields = [];
    if (model) fields.push(['ai-model', model]);
    if (provider) fields.push(['ai-provider', provider]);
    if (promptUrl) fields.push(['ai-prompt-url', promptUrl]);
    return fields;
  }

  function metaAttrs(model, provider, promptUrl) {
    var fields = optionalMetaFields(model, provider, promptUrl);
    if (!fields.length) return '';
    return ' ' + fields.map(function (f) { return f[0] + '="' + escAttr(f[1]) + '"'; }).join(' ');
  }

  function buildWholeMarkup(value, model, provider, promptUrl) {
    // The spec: ai-model/ai-provider/ai-prompt-url "SHOULD NOT be present
    // when ai-disclosure=\"human-only\"". Enforced here, not just by the
    // caller hiding the input fields, so this function can't be made to
    // emit contradictory markup even if a caller forgets to gate.
    var allowMeta = value.key !== 'human-only';
    var lines = ['<meta name="ai-disclosure" content="' + value.key + '">'];
    if (allowMeta) {
      optionalMetaFields(model, provider, promptUrl).forEach(function (f) {
        lines.push('<meta name="' + f[0] + '" content="' + escAttr(f[1]) + '">');
      });
    }
    lines.push('');
    lines.push('<!-- or scoped to one element instead of the whole page: -->');
    lines.push('<div ' + discloseAttrs(value) + (allowMeta ? metaAttrs(model, provider, promptUrl) : '') + '>...</div>');
    return lines.join('\n');
  }

  function buildSplitMarkup(codeVal, descVal) {
    // mixed only means something when the two halves actually differ —
    // if they agree, a single page-level default is the true, correct
    // statement (and the spec-honest one).
    var agree = codeVal.key === descVal.key;
    var lines = agree
      ? ['<meta name="ai-disclosure" content="' + codeVal.key + '">']
      : [
          '<!-- code and description disagree, so the page-level default is "mixed" -->',
          '<meta name="ai-disclosure" content="mixed">'
        ];
    lines.push('');
    lines.push('<pre ' + discloseAttrs(codeVal) + '>...code...</pre>');
    lines.push('<p ' + discloseAttrs(descVal) + '>...description...</p>');
    return lines.join('\n');
  }

  function escMdTitle(s) {
    // Markdown image-title syntax only needs its delimiter quote handled,
    // not full HTML-attribute escaping — this is deliberately different
    // from escAttr(), not an inconsistency.
    return String(s).replace(/"/g, "'");
  }

  function buildBadge(label, value, note) {
    var url = shieldsUrl(label, value.message, colorFor(value.key));
    var docHref = DOC[value.key];
    var altText = label + ': ' + value.message;
    var titleText = note ? altText + ' — ' + note + ' (non-normative note)' : altText;
    return { url: url, docHref: docHref, altText: altText, titleText: titleText };
  }

  return {
    HUMAN_ONLY_COLOR: HUMAN_ONLY_COLOR,
    AI_AUTONOMOUS_COLOR: AI_AUTONOMOUS_COLOR,
    AI_ASSISTED_COLOR: AI_ASSISTED_COLOR,
    colorFor: colorFor,
    DOC: DOC,
    SELECT_OPTIONS: SELECT_OPTIONS,
    LADDER: LADDER,
    LADDER_TERMINAL: LADDER_TERMINAL,
    ladderResult: ladderResult,
    escAttr: escAttr,
    escMdTitle: escMdTitle,
    shieldsSegment: shieldsSegment,
    shieldsUrl: shieldsUrl,
    discloseAttrs: discloseAttrs,
    optionalMetaFields: optionalMetaFields,
    metaAttrs: metaAttrs,
    buildWholeMarkup: buildWholeMarkup,
    buildSplitMarkup: buildSplitMarkup,
    buildBadge: buildBadge
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BadgeLogic;
}

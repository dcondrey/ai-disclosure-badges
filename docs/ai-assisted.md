# `ai-assisted` badge

## What this badge asserts

Generative AI was involved in producing the content, alongside human
authorship and/or human review. This corresponds to the `ai-assisted`
disclosure value defined by the
[AI Content Disclosure for HTML](https://w3c-cg.github.io/ai-content-disclosure/)
specification (`ai-disclosure="ai-assisted"`), where it is described as:

> AI was involved in producing the content, with human authorship and/or
> human review. This spans the full range from light AI editing of
> human-written text to AI-drafted text refined or reviewed by a human.

`ai-assisted` deliberately covers a wide spectrum. The spec considered
splitting it into finer categories (e.g. "assisted" vs. "generated") and
rejected the split as impractical: with multiple contributors, that boundary
forces unanswerable questions about who counts as the first author. This
badge inherits that same deliberate breadth — it does not by itself tell you
whether the AI's role was a grammar pass or a full first draft.

## The retired percentage proposal

Earlier versions of this badge supported an optional AI-authorship
percentage, mirroring the spec's `ai-assisted-percent` proposal. As of the
W3C CG's 2026-07-13 meeting, the group reached a working consensus against
a numeric percentage — "a percent value gives a false sense of precision
and has no well-defined numerator" — and against a coarser bucketed
alternative (mostly-human / roughly-equal / mostly-AI) floated in the same
discussion. The recorded outcome: no intensity sub-attribute, no research
action for now. See
[w3c-cg/ai-content-disclosure#25](https://github.com/w3c-cg/ai-content-disclosure/issues/25)
for the issue and meeting minutes.

This project's badges and generator no longer produce a percentage,
tracking that consensus — a badge conforming as closely as possible to the
spec shouldn't assert precision the spec's own working group has argued
against. If the CG later finalizes some granularity mechanism, this doc and
the generator will be updated to match.

## Optional metadata attributes

Beyond `ai-disclosure` itself, the spec defines three optional attributes
that MAY appear alongside it — unlike `ai-assisted-percent`, these are
finalized, not proposals:

- **`ai-model`** — a free-form string identifying the AI model used (e.g.
  `"claude-opus-5"`, `"gpt-4o"`).
- **`ai-provider`** — a free-form string identifying the AI provider or
  vendor (e.g. `"Anthropic"`, `"OpenAI"`).
- **`ai-prompt-url`** — a URL pointing to documentation of the prompt or
  methodology used. The spec is explicit that the prompt text itself must
  not be embedded in the HTML; this attribute links out instead, so the
  author keeps control over what's disclosed and can revoke access later.

All three are optional — the spec notes authors "may have legitimate
reasons not to disclose specific tools or providers." They're valid
alongside both `ai-assisted` and `ai-autonomous`, but the spec states they
"SHOULD NOT be present when `ai-disclosure=\"human-only\"`" — asserting no
AI was involved while also citing which AI model was used would be
self-contradictory.

This project's [generator](../index.html) surfaces all three as optional
fields when building its spec-markup snippet (not the badge itself —
shields.io badges have no room for them, and hide these fields entirely
once you've selected `human-only`).

## The optional human-involvement note

`ai-assisted-percent` measures authorship share of the final text — it says
nothing about how much a human steered the work to get there. A human who
rejects an AI's first approach, sets the requirements, or redirects the
architecture mid-task can drive the outcome heavily while still not writing
any of the final words themselves; the percentage alone won't show that.

This project's badge generator offers a free-text note for exactly this,
carried in the badge's `title`/`alt` text rather than its visible label. It
covers both axes — depth of review ("reviewed for factual accuracy," "AI
drafted, human rewrote throughout") and depth of direction ("human set
requirements and rejected the first approach; AI implemented the
revision"). **This note is not part of the W3C specification** — unlike the
`ai-model` / `ai-provider` / `ai-prompt-url` attributes above, the spec
defines no controlled vocabulary for the type or degree of human
involvement. Treat any such note as informal color supplied by the badge's
author, not as a citable disclosure value.

## What "AI" means here

The boundary is generative AI: systems trained on data that produce novel
output through inference, as opposed to deterministic tools applying fixed
rules. See the spec's
[boundary guidance](https://w3c-cg.github.io/ai-content-disclosure/#boundary-guidance)
for concrete examples on each side of that line (e.g. AI grammar tools,
AI summarization, and AI-drafted-then-human-reviewed text all fall inside
`ai-assisted`).

## What this badge does NOT assert

- **No cryptographic proof.** This badge is a plain image and a link, not a
  signed or tamper-evident claim. For verifiable provenance, see
  [C2PA](https://c2pa.org/).
- **No AI-detection claim.** The claim is self-reported by the author, not
  detected or audited.
- **No claim about which specific tool or model was used**, unless stated
  separately via the optional `ai-model` / `ai-provider` / `ai-prompt-url`
  attributes (see [above](#optional-metadata-attributes)) — the badge label
  itself never carries this.

## Source of truth

The vocabulary this badge cites is defined and maintained by the W3C AI
Content Disclosure Community Group, not by this project. See the
[specification](https://w3c-cg.github.io/ai-content-disclosure/) and its
[repository](https://github.com/w3c-cg/ai-content-disclosure) for the
normative definitions.

The spec is currently an early working draft with no version number of its
own, so quotes on this page reflect the spec text as fetched 2026-08-18.
Check the spec repository directly if you need the current text.

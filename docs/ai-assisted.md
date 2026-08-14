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

## The optional percentage

If a percentage appears on this badge (e.g. "ai-assisted · ~50%"), it
corresponds to the spec's optional
[`ai-assisted-percent`](https://w3c-cg.github.io/ai-content-disclosure/#ai-assisted-percent)
attribute: a rough, self-reported estimate of what share of the final
content was AI-authored. The spec is explicit that this figure:

- is **necessarily an estimate** — the specification does not define a
  measurement procedure;
- is **valid only** alongside `ai-assisted` (not `human-only` or
  `ai-autonomous`);
- is a **proposal still under discussion** at the specification level, not
  yet finalized.

A badge without a percentage simply means no estimate was offered. Absence
of a percentage is not itself meaningful and should not be read as "0% AI."

Note that the percentage measures AI *authorship share*, not the presence or
absence of human review. Content can be 100% AI-authored and still be
`ai-assisted` rather than `ai-autonomous`, provided a human reviewed it
before publication — the two axes (how much AI wrote vs. whether a human
looked at it) are independent.

## The optional human-involvement note

This project's badge generator additionally offers a free-text note (e.g.
"reviewed for factual accuracy," "AI drafted, human rewrote throughout"),
carried in the badge's `title`/`alt` text rather than its visible label.
**This note is not part of the W3C specification.** The spec defines only
`ai-assisted-percent` as an optional refinement; it deliberately does not
define a controlled vocabulary for the type of human involvement. Treat any
such note as informal color supplied by the badge's author, not as a
citable disclosure value.

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
- **No precision on the percentage.** Any percentage shown is a rough,
  author-estimated figure with no defined measurement methodology behind
  it — treat it as an order-of-magnitude signal, not a metric.
- **No claim about which specific tool or model was used**, unless stated
  separately alongside the badge.

## Source of truth

The vocabulary this badge cites is defined and maintained by the W3C AI
Content Disclosure Community Group, not by this project. See the
[specification](https://w3c-cg.github.io/ai-content-disclosure/) and its
[repository](https://github.com/w3c-cg/ai-content-disclosure) for the
normative definitions.

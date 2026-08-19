# `ai-autonomous` badge

## What this badge asserts

The content was published without human involvement or review — no
per-instance human prompting or oversight. This corresponds to the
`ai-autonomous` disclosure value defined by the
[AI Content Disclosure for HTML](https://w3c-cg.github.io/ai-content-disclosure/)
specification (`ai-disclosure="ai-autonomous"`), where it is described as:

> Content published without human involvement or review (no per-instance
> human prompting or oversight).

The key phrase is "per-instance." An agent operating under standing
instructions a human configured once — and never reviewed again before this
particular piece of content went out — still qualifies as `ai-autonomous`.
The spec's own examples include automated reporting (weather, sports
scores, financial summaries) and content from persistent agents with
standing instructions. See the
[boundary guidance](https://w3c-cg.github.io/ai-content-disclosure/#boundary-guidance)
section for the full list.

## What this badge does NOT assert

- **No cryptographic proof.** This badge is a plain image and a link, not a
  signed or tamper-evident claim. For verifiable provenance, see
  [C2PA](https://c2pa.org/).
- **No AI-detection claim.** The claim is self-reported by whoever deployed
  the system, not detected or audited.
- **No percentage.** This project's badges don't state one at all anymore
  (see [`ai-assisted`'s retired percentage proposal](ai-assisted.md#the-retired-percentage-proposal)),
  and the spec's proposed `ai-assisted-percent` was never valid alongside
  `ai-autonomous` in the first place — a badge claiming `ai-autonomous` is,
  by definition, 100% AI-produced with no human authorship step to measure
  against.
- **No claim about content quality, accuracy, or oversight after the fact.**
  "No per-instance review before publication" does not mean the system or
  its outputs are never audited at all — only that no human reviewed this
  specific piece before it went out.

## Optional metadata attributes

The spec's `ai-model`, `ai-provider`, and `ai-prompt-url` attributes are
valid alongside `ai-autonomous` too — see
[`ai-assisted`'s optional metadata attributes section](ai-assisted.md#optional-metadata-attributes)
for what each means. Unlike `human-only`, there's no contradiction in
naming a model here: `ai-autonomous` already asserts the content is
entirely AI-produced, so citing which AI produced it is consistent, not
redundant.

## Source of truth

The vocabulary this badge cites is defined and maintained by the W3C AI
Content Disclosure Community Group, not by this project. See the
[specification](https://w3c-cg.github.io/ai-content-disclosure/) and its
[repository](https://github.com/w3c-cg/ai-content-disclosure) for the
normative definitions.

The spec is currently an early working draft with no version number of its
own, so quotes on this page reflect the spec text as fetched 2026-08-18.
Check the spec repository directly if you need the current text.

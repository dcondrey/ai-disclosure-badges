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
- **No percentage.** The optional `ai-assisted-percent` attribute is valid
  only alongside `ai-assisted`; it does not apply here and should not appear
  on this badge. A badge claiming `ai-autonomous` is, by definition, 100%
  AI-produced with no human authorship step to measure against.
- **No claim about content quality, accuracy, or oversight after the fact.**
  "No per-instance review before publication" does not mean the system or
  its outputs are never audited at all — only that no human reviewed this
  specific piece before it went out.

## Source of truth

The vocabulary this badge cites is defined and maintained by the W3C AI
Content Disclosure Community Group, not by this project. See the
[specification](https://w3c-cg.github.io/ai-content-disclosure/) and its
[repository](https://github.com/w3c-cg/ai-content-disclosure) for the
normative definitions.

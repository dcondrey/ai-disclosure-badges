# `human-only` badge

## What this badge asserts

A positive claim, made by the content's author, that no generative AI was
involved in producing the content it is attached to.

This corresponds to the `human-only` disclosure value defined by the
[AI Content Disclosure for HTML](https://w3c-cg.github.io/ai-content-disclosure/)
specification (`ai-disclosure="human-only"`), where it is described as:

> A positive assertion that no AI was involved in producing this content.

`human-only` is not the same as the absence of a badge. The spec draws this
distinction explicitly: no disclosure at all means "unknown" — no claim has
been made either way. Displaying this badge is an active, specific claim,
not a default.

## What "AI" means here

The boundary is generative AI: systems trained on data that produce novel
output through inference. Deterministic tools — spell-check, thesauri,
search, calculators, template/mail-merge, sensor readings, rule engines —
are outside the boundary and do not disqualify a `human-only` claim. See the
spec's
[boundary guidance](https://w3c-cg.github.io/ai-content-disclosure/#boundary-guidance)
for the full list of examples on each side of the line.

## What this badge does NOT assert

- **No cryptographic proof.** This badge is a plain image and a link. It is
  not signed, is not tamper-evident, and carries no cryptographic binding to
  the content it appears next to. For verifiable provenance, see
  [C2PA](https://c2pa.org/).
- **No AI-detection claim.** Nobody has verified this claim by analyzing the
  content. It is a voluntary, author-declared statement, not a detected or
  audited result.
- **No enforcement.** Nothing prevents an author from displaying this badge
  incorrectly. Trust in the badge is trust in the author, same as any other
  self-reported disclosure.

## Source of truth

The vocabulary this badge cites is defined and maintained by the W3C AI
Content Disclosure Community Group, not by this project. See the
[specification](https://w3c-cg.github.io/ai-content-disclosure/) and its
[repository](https://github.com/w3c-cg/ai-content-disclosure) for the
normative definitions.

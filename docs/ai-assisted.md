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

## Illustrative anchors for each 10% band

The spec deliberately declines to define a measurement procedure for
`ai-assisted-percent` — see above. That means there is no formula that
converts "what actually happened" into a number, and this project isn't
attempting to supply one. What follows is **illustrative guidance, not a
rule**: rough anchors to help you pick a band, in the same spirit as the
spec's own [boundary guidance](https://w3c-cg.github.io/ai-content-disclosure/#boundary-guidance)
(examples on each side of a line, not a test you compute). Treat these as
"if your situation looks roughly like this, this band is a reasonable
pick," not as thresholds to satisfy exactly.

The [generator](../index.html) implements this same progression as a
ladder: starting from `human-only`, each row asks one yes/no question
gating the next step up. Answer "no" and you stop at that row's badge;
answer "yes" and you move one step closer to `ai-autonomous`. The table
below is the same anchors, for reference outside the generator.

| Band | Roughly looks like |
|---|---|
| ~10% | Human-written draft with an AI grammar/style pass (e.g. Grammarly-style). AI touched wording, not structure or ideas. |
| ~20% | Human-written draft with AI help on a few sentences or one short section. |
| ~30% | Human draft with AI-rewritten passages in several places (e.g. AI expanded a few bullet points into prose). |
| ~40% | Human wrote the core argument/structure; AI contributed meaningful passages throughout, still a minority of the text. |
| ~50% | Roughly even split — human and AI each produced about half the final text. |
| ~60% | AI produced most passages from a human outline or prompts; human wrote some sections directly. |
| ~70% | AI produced most of the draft from human prompts/outline; human substantively rewrote select sections. |
| ~80% | AI produced nearly the entire draft; human made targeted edits or corrections to specific passages. |
| ~90% | AI produced the entire draft; human's edits were light (fixing errors, minor wording) across most of the piece. |
| ~100% | AI produced the entire draft; human review was a read-through/approval with no substantive edits. Still `ai-assisted`, not `ai-autonomous` — a human did review it before publication. |

These anchors describe the *content*, not a workflow you must follow to
qualify — arriving at, say, "human wrote a full draft, then had AI rewrite
it entirely, then rewrote it back by hand" and landing near ~100% because
that's what the *final text* looks like is a legitimate use of this table,
even though the process looked nothing like the row's description.

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

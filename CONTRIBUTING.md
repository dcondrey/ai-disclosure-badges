# Contributing to AI Disclosure Badges

This is a small, single-purpose repo: three explainer docs, one static
generator page, and a README. Contributions are welcome; here's how they
tend to break down.

## Ways you can help

### Wording in the explainer docs

`docs/human-only.md`, `docs/ai-assisted.md`, and `docs/ai-autonomous.md`
state what each badge asserts and what it doesn't. If wording is unclear,
imprecise, or drifts from the underlying specification, open a PR. Cite the
relevant line of the spec (`index.html` in
[w3c-cg/ai-content-disclosure](https://github.com/w3c-cg/ai-content-disclosure))
where possible.

### The generator (`index.html`)

Bug reports and small fixes (encoding issues, a broken snippet, a UI glitch)
are welcome as PRs. Keep it dependency-free: no build step, no framework,
no external JS libraries. It should keep working when opened directly via
`file://` or hosted as a static page.

### The vocabulary itself

`human-only` / `ai-assisted` / `ai-autonomous` and the optional
`ai-assisted-percent` figure are **not** defined by this project — they're
normatively defined by the W3C AI Content Disclosure Community Group. If you
think the vocabulary itself should change, that discussion belongs in
[w3c-cg/ai-content-disclosure issues](https://github.com/w3c-cg/ai-content-disclosure/issues),
not here.

### Colors and conventions

The badge color palette (see [README § Colors](README.md#colors)) and the
split-badge convention are this project's own design choices, not spec
requirements. Proposals to change them are welcome as issues — explain the
motivation, since these are load-bearing for anyone already using the
current badges.

## Pull requests

- Keep changes scoped and explain the "why," not just the "what."
- No new dependencies, build tooling, or frameworks without discussing it
  in an issue first — the whole point of this repo is staying small enough
  to audit at a glance.
- Verify badge URLs actually resolve (`curl -sI <url>`) before submitting a
  color or encoding change.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).

# Contributing to AI Disclosure Badges

This is a small, single-purpose repo: three explainer docs, a static
generator page backed by a small tested logic module, and a README.
Contributions are welcome; here's how they tend to break down.

## Ways you can help

### Wording in the explainer docs

`docs/human-only.md`, `docs/ai-assisted.md`, and `docs/ai-autonomous.md`
state what each badge asserts and what it doesn't. If wording is unclear,
imprecise, or drifts from the underlying specification, open a PR. Cite the
relevant line of the spec (`index.html` in
[w3c-cg/ai-content-disclosure](https://github.com/w3c-cg/ai-content-disclosure))
where possible.

### The generator (`index.html` and `badge-logic.js`)

Bug reports and small fixes (encoding issues, a broken snippet, a UI glitch)
are welcome as PRs. Keep it dependency-free: no build step, no framework,
no external JS libraries. It should keep working when opened directly via
`file://` or hosted as a static page.

The pure logic (badge/markup builders, the ladder state machine, HTML
escaping) lives in `badge-logic.js`, loaded by `index.html` as a plain
classic `<script src>` (not a module — modules don't load under `file://`
in most browsers) and covered by `test/badge-logic.test.js` using Node's
built-in test runner, no dependencies:

```sh
node --test
```

DOM-only code (rendering, event wiring) stays inline in `index.html` and
isn't unit-tested — verify it by hand in a browser per the PR checklist.
If you change `badge-logic.js`, run the tests before opening a PR.

### The GitHub Action (`action.yml` and `action/`)

A reminder-only PR check that comments when a PR body has no disclosure
badge or markup yet — never blocking, per the vocabulary's own "no
enforcement" stance. `action/detect.js` holds the pure, testable logic
(what counts as "present", the comment text); `action/index.js` is the
GitHub API glue. Same dependency-free rule applies: `using: 'node20'` and
built-in `fetch` only, no `@actions/core`/`@actions/github`. Covered by
`test/action-detect.test.js`, run the same way:

```sh
node --test
```

### The vocabulary itself

`human-only` / `ai-assisted` / `ai-autonomous` / `mixed` are **not** defined
by this project — they're normatively defined by the W3C AI Content
Disclosure Community Group. If you think the vocabulary itself should
change, that discussion belongs in
[w3c-cg/ai-content-disclosure issues](https://github.com/w3c-cg/ai-content-disclosure/issues),
not here.

The generator previously offered an optional `ai-assisted-percent` figure,
mirroring a spec proposal. That proposal hit a working consensus against it
at the CG's 2026-07-13 meeting (see
[w3c-cg/ai-content-disclosure#25](https://github.com/w3c-cg/ai-content-disclosure/issues/25)),
so this project dropped it to track the spec as closely as possible. If the
CG revives or finalizes some granularity mechanism, reopen that question
here as well.

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
<!-- test: verifying AI Disclosure Reminder Action fires on a real PR event; this PR will be closed after verification -->

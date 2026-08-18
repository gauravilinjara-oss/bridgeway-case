# Bridgeway Solution Story and Mobile Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise owner-centered landing-page story and replace the current onboarding visuals with the supplied seven-state mobile flow.

**Architecture:** Preserve the single-file static architecture. Add focused CSS, HTML, and JavaScript blocks to `index.html`, place new images under `assets/bridgeway/`, and add a Node contract test that checks structure, copy, and asset references.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in test runner

**Spec:** `docs/superpowers/specs/2026-08-18-solution-story-and-mobile-flow-design.md`

## Global Constraints

- Keep the existing 768 pixel reading column, sticky rail, Satoshi typography, and blue accent.
- Use short conversational copy with no em dashes.
- Preserve the current section order after the expanded solution preview.
- Show five questions plus an introduction and confirmation.
- Add no framework, animation library, or build step.
- Respect `prefers-reduced-motion: reduce`.

---

### Task 1: Add visual assets and a failing content contract

**Files:**
- Create: `tests/case-study-contract.test.mjs`
- Create: `assets/bridgeway/flow/business-name.png`
- Create: `assets/bridgeway/flow/story-beginning.png`
- Create: `assets/bridgeway/flow/marketing-direction.png`
- Create: `assets/bridgeway/flow/emotional-outcome.png`
- Create: `assets/bridgeway/flow/customer-feeling.png`
- Create: `assets/bridgeway/flow/connect-sources.png`
- Create: `assets/bridgeway/flow/confirmation.png`
- Create: `assets/bridgeway/landing/owners.png`
- Create: `assets/bridgeway/landing/alex-night.png`
- Create: `assets/bridgeway/landing/morning-drafts.png`

**Interfaces:**
- Consumes: The seven user-supplied PNG files and the live Bridgeway landing page.
- Produces: Stable image paths referenced by `index.html` and verified by the contract test.

- [ ] **Step 1: Write the failing contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const flowAssets = [
  'business-name.png',
  'story-beginning.png',
  'marketing-direction.png',
  'emotional-outcome.png',
  'customer-feeling.png',
  'connect-sources.png',
  'confirmation.png',
];

test('includes the owner-centered solution story', () => {
  assert.match(html, /The product explained the work\. It did not make owners feel seen\./);
  assert.match(html, /Start with the owner, not the technology\./);
  assert.match(html, /Recognition first\. Understanding next\./);
});

test('shows five questions across seven visual states', () => {
  assert.match(html, /Five questions help Bridgeway understand/);
  assert.equal((html.match(/data-flow-screen/g) || []).length, 7);
  assert.doesNotMatch(html, /Four questions/);
});

test('all new flow assets exist', async () => {
  await Promise.all(flowAssets.map((name) => access(new URL(`../assets/bridgeway/flow/${name}`, import.meta.url))));
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/case-study-contract.test.mjs`

Expected: FAIL because the new solution copy and seven flow states are not present.

- [ ] **Step 3: Add the visual assets**

Copy the supplied mobile PNGs to the exact flow paths above. Capture the four-owner opening, Alex at 8:52 PM, and morning draft review from `https://bridgeway-mu.vercel.app/` and save them to the exact landing paths above.

- [ ] **Step 4: Verify image files are readable**

Run: `file assets/bridgeway/flow/*.png assets/bridgeway/landing/*.png`

Expected: All ten files report PNG image data with nonzero dimensions.

- [ ] **Step 5: Commit**

```bash
git add tests assets/bridgeway/flow assets/bridgeway/landing
git commit -m "test: add Bridgeway solution assets and contract"
```

### Task 2: Build the concise landing-page solution story

**Files:**
- Modify: `index.html`
- Modify: `tests/case-study-contract.test.mjs`

**Interfaces:**
- Consumes: The three landing PNG paths from Task 1.
- Produces: A `data-landing-story` section, three `data-landing-screen` elements, three matching captions, and scroll progress consumed by the page animation loop.

- [ ] **Step 1: Extend the contract test for the landing story**

```js
test('landing story has three synchronized moments', () => {
  assert.equal((html.match(/data-landing-screen/g) || []).length, 3);
  assert.equal((html.match(/data-landing-copy/g) || []).length, 3);
  assert.match(html, /href="https:\/\/bridgeway-mu\.vercel\.app\/"/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test --test-name-pattern="landing story" tests/case-study-contract.test.mjs`

Expected: FAIL because the landing story does not exist.

- [ ] **Step 3: Add the landing story markup and concise copy**

Insert the three beats after the current overview text and before the second-shift chapter. Use these exact headlines:

```html
<h2>The product explained the work. It did not make owners feel seen.</h2>
<h2>Start with the owner, not the technology.</h2>
<h2>Recognition first. Understanding next.</h2>
```

Use one sentence per beat. Add three screenshot states with descriptive alternative text and retain the live landing-page link.

- [ ] **Step 4: Add landing story styling and scroll state**

Add a desktop pinned two-column layout with crossfading screenshots, 10 pixel upward entry, and a blue progress line. Extend the existing animation frame to calculate an index from the landing-story scroll progress and toggle `.on` on matching copy and screen elements.

- [ ] **Step 5: Add mobile and reduced-motion fallbacks**

Below the existing responsive breakpoints, change the pinned story to a horizontal scroll-snap sequence. Under reduced motion, remove transforms and transitions and expose every moment without a pinned dependency.

- [ ] **Step 6: Run the contract tests**

Run: `node --test tests/case-study-contract.test.mjs`

Expected: The landing-story test passes. The seven-state flow test still fails.

- [ ] **Step 7: Commit**

```bash
git add index.html tests/case-study-contract.test.mjs
git commit -m "feat: add owner-centered landing story"
```

### Task 3: Replace the prototype with seven new mobile states

**Files:**
- Modify: `index.html`
- Modify: `tests/case-study-contract.test.mjs`

**Interfaces:**
- Consumes: The seven flow image paths from Task 1 and the existing `data-flow`, `data-fc`, `data-scr`, and `data-jump` behavior.
- Produces: Seven synchronized copy, image, and progress-control states that continue to use the existing scroll and click controls.

- [ ] **Step 1: Extend the contract test for copy and accessibility**

```js
test('prototype controls expose seven selected states', () => {
  assert.equal((html.match(/role="tab"/g) || []).length, 7);
  assert.equal((html.match(/data-flow-screen/g) || []).length, 7);
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test --test-name-pattern="prototype controls" tests/case-study-contract.test.mjs`

Expected: FAIL because the old flow has six controls and six screens.

- [ ] **Step 3: Replace copy and image references**

Use seven states in this order: business name, beginning, direction, feeling, takeaway, sources, confirmation. Keep copy to one sentence per state. Label questions as 1 of 5 through 5 of 5. Label the first state `Introduction` and the last state `Confirmation`.

- [ ] **Step 4: Update flow height, progress controls, and semantics**

Adjust the pinned flow height for seven states. Give each button `role="tab"`, `aria-selected`, and a clear label. Update `aria-selected` whenever the active state changes or a progress control is selected.

- [ ] **Step 5: Add the confirmation pulse**

Toggle a `.confirm-on` class only when the final screen becomes active. Animate one soft box-shadow pulse and disable it under reduced motion.

- [ ] **Step 6: Run all tests**

Run: `node --test tests/case-study-contract.test.mjs`

Expected: PASS for every test.

- [ ] **Step 7: Commit**

```bash
git add index.html tests/case-study-contract.test.mjs
git commit -m "feat: refresh Bridgeway mobile prototype"
```

### Task 4: Verify the complete case study

**Files:**
- Modify if needed: `index.html`
- Modify if needed: `tests/case-study-contract.test.mjs`

**Interfaces:**
- Consumes: The complete static case study.
- Produces: A locally verified preview with no broken paths or interaction regressions.

- [ ] **Step 1: Run automated checks**

Run: `node --test tests/case-study-contract.test.mjs && git diff --check`

Expected: All tests pass and `git diff --check` prints no errors.

- [ ] **Step 2: Start the local site**

Run: `python3 -m http.server 4173`

Expected: The site is available at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify desktop behavior**

Open the local page at 1512 by 900. Confirm the new landing story appears before onboarding, screenshots advance in order, the phone states advance in order, progress controls work, and the remainder of the case study is unchanged.

- [ ] **Step 4: Verify mobile behavior**

Open the local page at 390 by 844. Confirm media is uncropped, horizontal sequences scroll, copy is readable, and no content overflows the viewport.

- [ ] **Step 5: Verify reduced motion and keyboard use**

Emulate reduced motion. Confirm every screenshot and caption remains reachable. Tab through the seven prototype controls and verify visible focus and selected state.

- [ ] **Step 6: Review browser logs**

Confirm there are no console errors caused by missing assets, invalid selectors, or animation state.

- [ ] **Step 7: Commit verification fixes if required**

```bash
git add index.html tests/case-study-contract.test.mjs
git commit -m "fix: polish Bridgeway solution preview"
```

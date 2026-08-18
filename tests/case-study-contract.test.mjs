import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const htmlUrl = new URL('../index.html', import.meta.url);
const html = await readFile(htmlUrl, 'utf8');

const flowAssets = [
  'business-name.png',
  'story-beginning.png',
  'marketing-direction.png',
  'emotional-outcome.png',
  'customer-feeling.png',
  'connect-sources.png',
  'confirmation.png',
];

test('renders the owner-centered solution sequence before the second shift', () => {
  const gap = html.indexOf('The product explained the work. It did not make owners feel seen.');
  const redesign = html.indexOf('Start with the owner, not the technology.');
  const handoff = html.indexOf('Recognition first. Understanding next.');
  const secondShift = html.indexOf('Four businesses. One invisible second shift.');

  assert.ok(gap > -1, 'missing the landing-page gap');
  assert.ok(gap < redesign && redesign < handoff, 'solution beats are out of order');
  assert.ok(handoff < secondShift, 'solution handoff must precede the second shift');
});

test('renders three synchronized landing-page moments', () => {
  assert.equal((html.match(/data-landing-screen(?:=|\s)/g) || []).length, 3);
  assert.equal((html.match(/data-landing-copy(?:=|\s)/g) || []).length, 3);
  assert.match(html, /href="https:\/\/bridgeway-mu\.vercel\.app\/"/);
});

test('renders five questions across seven accessible prototype states', () => {
  assert.match(html, /Five questions help Bridgeway understand/);
  assert.equal((html.match(/data-flow-screen(?:=|\s)/g) || []).length, 7);
  assert.equal((html.match(/role="tab"/g) || []).length, 7);
  assert.doesNotMatch(html, /Four questions/);
});

test('references seven readable mobile prototype assets', async () => {
  await Promise.all(flowAssets.map(async (name) => {
    assert.match(html, new RegExp(`assets/bridgeway/flow/${name.replace('.', '\\.')}`));
    await access(new URL(`../assets/bridgeway/flow/${name}`, import.meta.url));
  }));
});

test('keeps a reduced-motion path for the new sequences', () => {
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
  assert.match(html, /\.landingrig/);
  assert.match(html, /\.flowrig/);
});

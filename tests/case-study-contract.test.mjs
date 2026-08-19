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

test('places the field interview between the composite Alex story and Act II', () => {
  const composite = html.indexOf('Composite scenario based on the product audit');
  const interview = html.indexOf('Meet Alex — owner of Unbound Fitness.');
  const actTwo = html.indexOf('Act II. The system collision');

  assert.ok(composite > -1, 'missing the composite-scenario disclosure');
  assert.ok(interview > composite, 'field interview must follow the composite scenario');
  assert.ok(actTwo > interview, 'field interview must resolve before Act II');
});

test('embeds the real interview as an accessible, user-controlled research artifact', async () => {
  const asset = 'assets/bridgeway/research/user-interview-alex.mp4';

  assert.match(html, new RegExp(asset.replaceAll('.', '\\.')));
  assert.match(html, /<dialog[^>]*data-interview-dialog[^>]*>/);
  assert.match(html, /<video[^>]*data-interview-full[^>]*controls/);
  assert.match(html, /Contextual interview · 7:17/);
  assert.match(html, /Live user interview · on site/);
  await access(new URL(`../${asset}`, import.meta.url));
});

test('uses plain-language chapter navigation and credits the AI agent team', () => {
  for (const label of ['Overview', 'The Gap', 'Live User Interview', 'Research', 'Solution', 'Prototype', 'AI Stack', 'Impact', 'Reflection']) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.match(html, /1 Designer \(me\)/);
  assert.match(html, /A team of AI agents/);
});

test('adds the field interview to the research methodology', () => {
  assert.match(html, /04 Field interview/);
  assert.match(html, /On-site contextual interview/);
});

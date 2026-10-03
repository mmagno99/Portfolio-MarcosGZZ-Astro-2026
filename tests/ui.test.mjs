import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const script = readFileSync('src/components/ui/BackToTop.astro', 'utf8')
  .split('<script>')[1]
  .split('</script>')[0];
const js = ts.transpileModule(script, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.None,
  },
}).outputText;

test('back-to-top respects threshold, reduced motion and navigation listener cleanup', () => {
  const button = new EventTarget();
  const classes = new Set();
  button.dataset = { threshold: '280' };
  button.classList = {
    toggle: (name, enabled) =>
      enabled ? classes.add(name) : classes.delete(name),
  };
  const document = new EventTarget();
  document.querySelectorAll = () => [button];
  const window = new EventTarget();
  window.scrollY = 0;
  let reduced = false;
  window.matchMedia = () => ({ matches: reduced });
  const scrolls = [];
  window.scrollTo = (options) => scrolls.push(options);
  vm.runInNewContext(js, { document, window, AbortController });
  assert.equal(button.disabled, true);
  assert.equal(classes.has('is-visible'), false);
  window.scrollY = 281;
  window.dispatchEvent(new Event('scroll'));
  assert.equal(button.disabled, false);
  assert.equal(classes.has('is-visible'), true);
  button.dispatchEvent(new Event('click'));
  assert.equal(scrolls[0].top, 0);
  assert.equal(scrolls[0].behavior, 'smooth');
  document.dispatchEvent(new Event('astro:page-load'));
  reduced = true;
  button.dispatchEvent(new Event('click'));
  assert.equal(scrolls.length, 2);
  assert.equal(scrolls[1].behavior, 'instant');
  window.scrollY = 0;
  window.dispatchEvent(new Event('pageshow'));
  assert.equal(button.disabled, true);
  document.dispatchEvent(new Event('astro:before-swap'));
  button.dispatchEvent(new Event('click'));
  assert.equal(scrolls.length, 2);
});

test('header scroll state preserves always-white pages and resets the home header', () => {
  const source = readFileSync('src/components/ui/Header.astro', 'utf8')
    .split('<script>')[1]
    .split('</script>')[0];
  const js = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.None,
    },
  }).outputText;
  const makeHeader = (alwaysWhite) => {
    const classes = new Set();
    return {
      dataset: { alwaysWhite: String(alwaysWhite) },
      classes,
      classList: {
        toggle: (name, enabled) =>
          enabled ? classes.add(name) : classes.delete(name),
      },
      querySelector: () => null,
    };
  };
  const home = makeHeader(false),
    quote = makeHeader(true);
  const document = new EventTarget();
  document.querySelectorAll = () => [home, quote];
  const window = new EventTarget();
  window.scrollY = 0;
  vm.runInNewContext(js, { document, window, AbortController });
  assert.equal(home.classes.has('is-white'), false);
  assert.equal(quote.classes.has('is-white'), true);
  window.scrollY = 11;
  window.dispatchEvent(new Event('scroll'));
  assert.equal(home.classes.has('is-white'), true);
  window.scrollY = 0;
  window.dispatchEvent(new Event('scroll'));
  assert.equal(home.classes.has('is-white'), false);
  assert.equal(quote.classes.has('is-white'), true);
  document.dispatchEvent(new Event('astro:page-load'));
  assert.equal(quote.classes.has('is-white'), true);
});

function faqHarness({ reduced = false, animate = true } = {}) {
  const source = readFileSync('src/features/quote/QuoteFAQ.astro', 'utf8')
    .split('<script>')[1]
    .split('</script>')[0];
  const js = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.None,
    },
  }).outputText;
  const document = new EventTarget();
  const summary = new EventTarget();
  summary.getBoundingClientRect = () => ({ height: 72 });
  const content = { getBoundingClientRect: () => ({ height: 100 }) };
  const details = {
    open: false,
    height: 74,
    style: {},
    offsetHeight: 74,
    clientHeight: 72,
    getBoundingClientRect() {
      return { height: this.height };
    },
    querySelector: (selector) => (selector === 'summary' ? summary : content),
  };
  const animations = [];
  if (animate)
    details.animate = (frames, options) => {
      const result = {
        frames,
        options,
        cancelled: false,
        cancel() {
          this.cancelled = true;
        },
      };
      animations.push(result);
      return result;
    };
  document.querySelectorAll = () => [details];
  const motion = new EventTarget();
  motion.matches = reduced;
  const window = { matchMedia: () => motion };
  vm.runInNewContext(js, { document, window, AbortController });
  const click = () => {
    const event = new Event('click', { cancelable: true });
    summary.dispatchEvent(event);
    return event;
  };
  return { details, document, motion, animations, click };
}

test('FAQ animates both directions and restores natural height after completion', () => {
  const { details, animations, click } = faqHarness();
  assert.equal(click().defaultPrevented, true);
  assert.equal(details.open, true);
  assert.equal(animations[0].frames[1].height, '174px');
  assert.equal(details.style.overflow, 'hidden');
  animations[0].onfinish();
  assert.equal(details.style.height, '');
  assert.equal(details.style.overflow, '');
  details.height = 174;
  click();
  assert.equal(details.open, true, 'content remains rendered while closing');
  assert.equal(animations[1].frames[1].height, '74px');
  animations[1].onfinish();
  assert.equal(details.open, false);
  assert.equal(details.style.height, '');
});

test('FAQ reverses an in-flight animation and cleans up after navigation', () => {
  const { details, document, animations, click } = faqHarness();
  click();
  details.height = 120;
  click();
  assert.equal(animations[0].cancelled, true);
  assert.equal(animations[1].frames[0].height, '120px');
  assert.equal(animations[1].frames[1].height, '74px');
  document.dispatchEvent(new Event('astro:before-swap'));
  assert.equal(details.open, false);
  assert.equal(details.style.overflow, '');
  click();
  assert.equal(animations.length, 2, 'detached listeners do not respond');
  document.dispatchEvent(new Event('astro:page-load'));
  click();
  assert.equal(
    animations.length,
    3,
    'initialization does not duplicate listeners',
  );
});

test('FAQ preserves native interaction for reduced motion or missing animation support', () => {
  for (const options of [{ reduced: true }, { animate: false }]) {
    const { animations, click } = faqHarness(options);
    assert.equal(click().defaultPrevented, false);
    assert.equal(animations.length, 0);
  }
  const { details, animations, motion, click } = faqHarness();
  click();
  motion.matches = true;
  motion.dispatchEvent(new Event('change'));
  assert.equal(details.open, true);
  assert.equal(details.style.height, '');
  assert.equal(animations[0].cancelled, true);
  assert.equal(click().defaultPrevented, false);
});

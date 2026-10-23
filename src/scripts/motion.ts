import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

// ───────────── Header + menu (always on) ─────────────
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let last = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    if (!document.body.classList.contains('menu-open')) {
      header.classList.toggle('hide', y > last && y > 240);
    }
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  if (!btn || !menu) return;
  const label = btn.querySelector('span');
  const links = menu.querySelectorAll<HTMLElement>('[data-menu-item]');

  const set = (open: boolean) => {
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close' : 'Menu';
    menu.toggleAttribute('inert', !open);
    // Keep focus inside the menu while it covers the page.
    document.querySelectorAll<HTMLElement>('.skip-link, #main, footer, .site-header .brand, .site-header .nav, .site-header .header-cta').forEach((el) => el.toggleAttribute('inert', open));
    if (open) links[0]?.focus();
    else if (document.activeElement === document.body || menu.contains(document.activeElement)) btn.focus();
    if (open && !reduced) {
      gsap.fromTo(links, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'expo.out', delay: 0.2 });
    }
  };
  menu.setAttribute('inert', '');
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) set(false); });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
}

// ───────────── Hero split stage (always on; motion optional) ─────────────
function initStage() {
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const state = { split: 50 };
  const apply = () => stage.style.setProperty('--split', `${state.split}%`);
  apply();
  if (reduced) return;

  if (finePointer) {
    const to = gsap.quickTo(state, 'split', { duration: 0.9, ease: 'expo.out', onUpdate: apply });
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const pct = ((e.clientX - r.left) / r.width) * 100;
      // The side under the cursor grows.
      to(Math.min(85, Math.max(15, 100 - pct)));
    });
    stage.addEventListener('pointerleave', () => to(50));
  } else {
    // Touch: let the divider breathe so both sides get a moment.
    gsap.fromTo(state, { split: 38 }, { split: 62, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate: apply });
  }
}

// ───────────── Forms (always on) ─────────────
function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const ok = form.querySelector<HTMLElement>('[data-form-ok]');
  const err = form.querySelector<HTMLElement>('[data-form-err]');

  const preset = new URLSearchParams(location.search).get('service');
  if (preset) {
    const input = form.querySelector<HTMLInputElement>(`input[name="service"][value="${CSS.escape(preset)}"]`);
    if (input) input.checked = true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ok?.setAttribute('hidden', '');
    err?.setAttribute('hidden', '');
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const contact = String(fd.get('contact') || '').trim();
    if (!name || !contact) {
      form.querySelector<HTMLInputElement>(!name ? '[name="name"]' : '[name="contact"]')?.focus();
      return;
    }
    const data = {
      name,
      contact,
      service: String(fd.get('service') || 'general'),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''),
    };
    if (submit) submit.disabled = true;
    try {
      const res = await fetch(form.dataset.webhook || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      ok?.removeAttribute('hidden');
      form.reset();
    } catch {
      err?.removeAttribute('hidden');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter]').forEach((group) => {
    const target = document.querySelector(group.dataset.filter!);
    if (!target) return;
    const buttons = group.querySelectorAll<HTMLButtonElement>('button[data-value]');
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        const v = b.dataset.value!;
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const items = target.querySelectorAll<HTMLElement>('[data-group]');
        items.forEach((it) => {
          const show = v === 'all' || it.dataset.group === v || it.dataset.group === 'both';
          it.classList.toggle('hidden-by-filter', !show);
          it.hidden = !show;
        });
        if (!reduced) {
          gsap.fromTo([...items].filter((i) => !i.hidden), { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'expo.out' });
        }
        ScrollTrigger.refresh();
      }),
    );
  });
}

// ───────────── Motion (skipped for reduced motion) ─────────────
function initLenis() {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    }),
  );
}

function initSplits() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const hero = el.dataset.split === 'hero';
    const split = SplitText.create(el, { type: 'lines,words', mask: 'lines', linesClass: 'split-line' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: hero ? 1.3 : 1.1,
      stagger: hero ? 0.09 : 0.07,
      ease: 'expo.out',
      delay: hero ? 0.15 : 0,
      scrollTrigger: hero ? undefined : { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function initReveals() {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  gsap.set(els, { y: 40, opacity: 0 });
  ScrollTrigger.batch(els, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out', overwrite: true }),
  });

  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.3,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -12 }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

function initStageIntro() {
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 80%', once: true } });
  tl.from(stage, { clipPath: 'inset(0 50% 0 50%)', duration: 1.4, ease: 'expo.inOut' })
    .from(stage.querySelectorAll('.stage-panel > *'), { y: 30, opacity: 0, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.7);
}

function initMarquee() {
  document.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
    let dir = 1;
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (self.direction !== dir) dir = self.direction;
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
        gsap.to(loop, { timeScale: boost * dir, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' });
      },
    });
  });
}

function initStatement() {
  document.querySelectorAll<HTMLElement>('[data-statement]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'w' });
    gsap.fromTo(split.words, { opacity: 0.14 }, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
  });
}

function initJourney() {
  const section = document.querySelector<HTMLElement>('[data-journey]');
  const track = section?.querySelector<HTMLElement>('.journey-track');
  if (!section || !track) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const distance = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    const bar = section.querySelector<HTMLElement>('[data-journey-bar]');
    if (bar) {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      });
    }
  });
}

function initSteps() {
  gsap.utils.toArray<HTMLElement>('.step .n').forEach((n) => {
    gsap.from(n, { yPercent: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: n, start: 'top 90%', once: true } });
  });
}

function initFooterMark() {
  const mark = document.querySelector<HTMLElement>('[data-footer-mark]');
  if (!mark) return;
  const split = SplitText.create(mark, { type: 'chars' });
  gsap.from(split.chars, {
    yPercent: 100,
    stagger: 0.04,
    duration: 1.1,
    ease: 'expo.out',
    scrollTrigger: { trigger: mark, start: 'top 98%', once: true },
  });
}

function initMagnetic() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

function initCursor() {
  if (!finePointer) return;
  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  const x = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
  const y = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });
  window.addEventListener('pointermove', (e) => { dot.classList.add('on'); x(e.clientX); y(e.clientY); });
  document.addEventListener('pointerleave', () => dot.classList.remove('on'));
  document.addEventListener('pointerover', (e) => {
    const hit = (e.target as Element).closest('a, button, [data-stage], label');
    dot.classList.toggle('big', !!hit);
  });
}

function initTrail() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-trail]').forEach((section) => {
    const srcs: string[] = JSON.parse(section.dataset.trail || '[]');
    if (!srcs.length) return;
    const imgs = srcs.map((src) => {
      const img = document.createElement('img');
      img.src = src; img.alt = ''; img.className = 'trail-img'; img.loading = 'lazy';
      section.prepend(img);
      return img;
    });
    let i = 0, lx = 0, ly = 0;
    section.addEventListener('pointermove', (e) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (Math.hypot(x - lx, y - ly) < 110) return;
      lx = x; ly = y;
      const img = imgs[i++ % imgs.length];
      gsap.killTweensOf(img);
      gsap.set(img, { x: x - img.offsetWidth / 2, y: y - img.offsetHeight / 2, opacity: 1, scale: 0.6, rotate: gsap.utils.random(-8, 8), zIndex: i });
      gsap.timeline()
        .to(img, { scale: 1, duration: 0.5, ease: 'expo.out' })
        .to(img, { opacity: 0, scale: 0.85, y: '+=40', duration: 0.8, ease: 'power2.in' }, 0.45);
    });
  });
}

function initLoader(): Promise<void> {
  // First visit per session only: a short count-up curtain.
  try { if (sessionStorage.getItem('pz-loaded')) return Promise.resolve(); sessionStorage.setItem('pz-loaded', '1'); } catch { return Promise.resolve(); }
  if (!document.querySelector('[data-hero-gl]')) return Promise.resolve();
  const el = document.createElement('div');
  el.className = 'loader';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="loader-count">0</div><div class="loader-row"><span>Pancatz</span><span>Look sharper. Run smarter.</span></div>';
  document.body.appendChild(el);
  const count = el.querySelector<HTMLElement>('.loader-count')!;
  const o = { v: 0 };
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: () => { el.remove(); } })
      .to(o, { v: 100, duration: 1.1, ease: 'power3.inOut', onUpdate: () => { count.textContent = String(Math.round(o.v)); } })
      .add(() => resolve())
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' });
  });
}

function initReelScale() {
  const reel = document.querySelector<HTMLElement>('[data-reel]');
  if (!reel) return;
  gsap.fromTo(reel, { scale: 0.86 }, {
    scale: 1,
    ease: 'none',
    scrollTrigger: { trigger: reel, start: 'top bottom', end: 'top 25%', scrub: true },
  });
}

// ───────────── Boot ─────────────
initHeader();
initMenu();
initStage();
initContactForm();
initFilters();

if (!reduced) {
  root.classList.add('js-motion');
  initLenis();
  initCursor();
  initMagnetic();
  initReveals();
  initMarquee();
  initTrail();
  initReelScale();
  Promise.all([document.fonts.ready, initLoader()]).then(() => {
    initStageIntro();
    initSplits();
    initStatement();
    initJourney();
    initSteps();
    initFooterMark();
    ScrollTrigger.refresh();
  });
}

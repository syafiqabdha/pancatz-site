import { Camera, GLTFLoader, Mesh, Program, Renderer, Transform, Vec3 } from 'ogl';

/**
 * Pan, the Pancatz mascot: half panda, half cat. Modelled in Blender
 * (video/blender/pancatz.py) and drawn here with OGL in a flat, illustrated style.
 *
 * Pan lives on the page, not in a corner. It drops in from the top, perches
 * on headings and rides them as the page scrolls, hops to the next heading
 * when its perch scrolls away, and falls back to the bottom of the window
 * when there's nowhere to sit. Scrolling makes it run, hold on, and look the
 * way you're going. Visitors can poke it, or pick it up and throw it.
 * It still follows the pointer, blinks, naps, and worries when you head for
 * the tab bar. Reduced motion or no WebGL2 shows a still in the corner instead.
 */

const LINES = [
  'Hi, I’m Pan. Half panda, half cat, all Pancatz.',
  'We design it, print it, and plug it in.',
  'Psst… brand your shop in 10 seconds →',
  'You can pick me up, you know. Go on.',
  'Sharper looks. Smarter systems. More bamboo.',
  'I was made in Blender. My humans make the rest.',
];
const TRY_LINE = 2;
const LEAVING = { text: 'Leaving already? Brand your shop in 10 seconds first →', href: '/try' };
const END = { text: 'That’s the lot! Say hi on WhatsApp →', href: '/contact' };
const THROWN = ['Wheee!', 'Again! Again!', 'I’m a cat. I always land on my feet.', 'Okay, that was fun.'];
const IDLE_MS = 12000;
const AWAY_TITLE = '🐼 Pan misses you…';
const PERCHES = 'main h1, main h2, main h3';
const GRAVITY = 2600;
const FOV = 22;
const OUTLINE_PX = 1.6;

const vertex = /* glsl */ `#version 300 es
in vec3 position;
in vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uOutline;
out vec3 vNormal;
out vec3 vView;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  // The ink outline is pushed out in view space, so it's the same width on every part.
  mv.xyz += vNormal * uOutline * -mv.z;
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

const fragment = /* glsl */ `#version 300 es
precision highp float;
uniform vec3 uColor;
uniform float uOutline;
in vec3 vNormal;
in vec3 vView;
out vec4 fragColor;
void main() {
  if (uOutline > 0.0) { fragColor = vec4(0.051, 0.051, 0.059, 1.0); return; }
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);
  vec3 l = normalize(vec3(-0.5, 0.8, 0.7));
  // Two-tone cel shading, a soft rim and a crisp highlight.
  float d = dot(n, l);
  float shade = mix(0.78, 1.0, smoothstep(-0.05, 0.08, d));
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0) * 0.18;
  float spec = step(0.97, max(dot(reflect(-l, n), v), 0.0)) * 0.35;
  vec3 c = pow(uColor, vec3(1.0 / 2.2)) * shade + rim + spec;
  fragColor = vec4(c, 1.0);
}`;

// Small parts that read better without an outline.
const NO_OUTLINE = /^(Whisker|Glint|Scratch|Mouth|Bean|Pad|EarInner|Nose)/;

type Part = Transform & { name?: string };
type Mode = 'floor' | 'perch' | 'jump' | 'fall' | 'drag';
type Line = { top: number; left: number; right: number; height: number };
type Point = { x: number; y: number };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const approach = (v: number, target: number, rate: number, dt: number) => v + (target - v) * Math.min(1, rate * dt);
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * The first line of text in an element, in viewport pixels. It measures the
 * text itself, not the boxes around it, since split headings wrap each line in
 * a full-width block.
 */
const range = document.createRange();
function topLine(el: Element): Line | null {
  const rects: DOMRect[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.nodeValue?.trim()) continue;
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) if (r.width > 1 && r.height > 1) rects.push(r);
  }
  if (!rects.length) return null;
  const top = Math.min(...rects.map((r) => r.top));
  const first = rects.filter((r) => r.top < top + r.height * 0.5);
  return {
    top,
    left: Math.min(...first.map((r) => r.left)),
    right: Math.max(...first.map((r) => r.right)),
    height: Math.max(...first.map((r) => r.height)),
  };
}
// The glyphs start a little below the top of the text box.
const surface = (l: Line) => l.top + l.height * 0.16;

export async function initMascot(root: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bubble = root.querySelector<HTMLElement>('[data-mascot-bubble]')!;
  const poke = root.querySelector<HTMLButtonElement>('[data-mascot-poke]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-mascot-close]')!;
  const stage = root.querySelector<HTMLElement>('[data-mascot-stage]')!;

  try {
    if (sessionStorage.getItem('pan-hidden')) return;
  } catch {}

  // ── Speech bubble ──
  let bubbleTimer = 0;
  const say = (text: string, href?: string, ms = 5200) => {
    bubble.innerHTML = '';
    const el = href ? Object.assign(document.createElement('a'), { href }) : document.createElement('span');
    el.textContent = text;
    bubble.append(el);
    root.classList.add('is-talking');
    clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(() => root.classList.remove('is-talking'), ms);
  };
  let line = 0;
  const nextLine = () => {
    const i = line++ % LINES.length;
    say(LINES[i], i === TRY_LINE ? '/try' : undefined);
  };
  close.addEventListener('click', () => {
    root.hidden = true;
    try {
      sessionStorage.setItem('pan-hidden', '1');
    } catch {}
  });

  // ── Tab title: a small "come back" ──
  const title = document.title;
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? AWAY_TITLE : title;
  });

  // ── 3D ──
  let renderer: Renderer | null = null;
  try {
    renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 2), alpha: true, webgl: 2, antialias: true, premultipliedAlpha: false });
  } catch {}
  if (reduced || !renderer || !renderer.isWebgl2) {
    root.hidden = false;
    stage.classList.add('is-still');
    poke.addEventListener('click', nextLine);
    return;
  }
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl, { fov: FOV, near: 0.1, far: 50 });
  camera.position.set(0, 2.3, 9.4);
  camera.lookAt(new Vec3(0, 1.45, 0));
  const scene = new Transform();

  const gltf = await GLTFLoader.load(gl, '/models/pancatz.glb');
  (gltf.scene as Transform[]).forEach((r) => r.setParent(scene));

  // Swap the loader's programs for the cel shader, and add an ink outline.
  const outlines: Program[] = [];
  const meshes: Mesh[] = [];
  scene.traverse((node: Transform) => {
    if (node instanceof Mesh) meshes.push(node);
  });
  for (const node of meshes) {
    const mat = (node.program as Program & { gltfMaterial?: { baseColorFactor: number[] } }).gltfMaterial;
    const c = mat?.baseColorFactor ?? [1, 1, 1, 1];
    node.program = new Program(gl, { vertex, fragment, uniforms: { uColor: { value: [c[0], c[1], c[2]] }, uOutline: { value: 0 } } });
    if (NO_OUTLINE.test((node.parent as Part | null)?.name ?? '')) continue;
    const program = new Program(gl, { vertex, fragment, cullFace: gl.FRONT, uniforms: { uColor: { value: [0, 0, 0] }, uOutline: { value: 0 } } });
    outlines.push(program);
    new Mesh(gl, { geometry: node.geometry, program }).setParent(node);
  }

  const find = (name: string) => {
    let hit: Part | undefined;
    scene.traverse((n: Part) => {
      if (!hit && n.name === name) hit = n;
    });
    if (!hit) throw new Error(`Pan is missing ${name}`);
    return hit;
  };
  const pan = find('Pan');
  const body = find('Body');
  const head = find('Head');
  const ears = [find('EarL'), find('EarR')];
  const eyes = [find('EyeL'), find('EyeR')];
  const pupils = [find('PupilL'), find('PupilR')];
  const arms = [find('ArmL'), find('ArmR')];
  const legs = [find('LegL'), find('LegR')];
  const tail = [1, 2, 3, 4, 5, 6].map((i) => find(`Tail${i}`));
  const bodyY = body.position.y;
  const pupilBase = pupils.map((p) => p.position.clone());

  // ── Size and framing ──
  let size = 0;
  let foot = 0.9; // where Pan's feet sit in the canvas, from the top
  const resize = () => {
    size = Math.round(clamp(innerWidth * 0.1, 96, 150));
    root.style.setProperty('--pan-size', `${size}px`);
    renderer!.setSize(size, size);
    camera.perspective({ aspect: 1 });
    camera.updateMatrixWorld();
    const p = new Vec3(0, 0, 0);
    camera.project(p);
    foot = (1 - p.y) / 2;
    const width = (OUTLINE_PX * 2 * Math.tan((FOV * Math.PI) / 360)) / size;
    outlines.forEach((o) => (o.uniforms.uOutline.value = width));
  };
  resize();
  addEventListener('resize', resize);

  stage.append(gl.canvas);
  // A tighter hit area than the square canvas, so Pan doesn't block links around it.
  const hit = document.createElement('span');
  hit.className = 'mascot-hit';
  poke.append(hit);

  // ── Where Pan can stand ──
  const header = document.querySelector<HTMLElement>('.site-header');
  const floorY = () => innerHeight - 4;
  const bandTop = () => (header?.offsetHeight ?? 64) + size * 0.95;
  // Skips screen-reader-only headings, which are a pixel wide.
  const perches = () => Array.from(document.querySelectorAll<HTMLElement>(PERCHES)).filter((el) => el.offsetWidth > 4 && !el.closest('[data-mascot-skip]'));
  /** A heading Pan could jump to now. dir > 0 means the page is moving up. */
  const pickPerch = (dir: number, except?: Element) => {
    const lo = bandTop();
    const hi = innerHeight * 0.9;
    // Scrolling down, take the lowest one (it stays on screen longest); up, the highest.
    const score = (l: Line) => (dir > 0 ? l.top : dir < 0 ? -l.top : -Math.abs(l.top - pos.y));
    let best: { el: HTMLElement; l: Line; score: number } | null = null;
    for (const el of perches()) {
      if (el === except) continue;
      const box = el.getBoundingClientRect();
      if (box.bottom < lo || box.top > hi) continue;
      const l = topLine(el);
      if (!l || l.top < lo || l.top > hi || l.right - l.left < size * 0.5) continue;
      if (!best || score(l) > best.score) best = { el, l, score: score(l) };
    }
    return best;
  };

  // ── State ──
  const pos: Point = { x: innerWidth - size, y: -size };
  const vel: Point = { x: -160, y: 0 };
  let screenVel: Point = { x: 0, y: 0 };
  let mode: Mode = 'fall';
  let perch: { el: HTMLElement; dx: number } | null = null;
  let jump: { from: Point; to: () => Point | null; last: Point; t: number; pre: number; dur: number; arc: number; onLand: () => void } | null = null;
  let walkGoal: number | null = null;
  let nextThought = performance.now() + 4000;
  let landedAt = 0;
  let facing = 0;
  let phase = 0;
  let squash = 0;
  let swing = 0;
  let wave = 0;
  let giggle = 0;
  let worried = 0;
  let blink = 0;
  let blinkAt = performance.now() + 2000;
  let asleep = false;
  let lastInput = performance.now();
  let scrollV = 0;
  let lastScroll = scrollY;
  let saidEnd = false;
  const look = { x: 0, y: 0 };
  const aim = { x: 0, y: 0 };

  const wake = () => {
    lastInput = performance.now();
    if (asleep) {
      asleep = false;
      squash = -0.6;
      root.classList.remove('is-asleep');
    }
  };

  const land = (m: 'floor' | 'perch', impact = 400) => {
    mode = m;
    jump = null;
    walkGoal = null;
    landedAt = performance.now();
    squash = clamp(impact / 1400, 0.25, 0.9);
    nextThought = landedAt + 2500 + Math.random() * 4000;
  };

  const jumpTo = (target: { el: HTMLElement; l: Line } | null, x?: number) => {
    const from = { ...pos };
    let to: () => Point | null;
    let onLand: () => void;
    if (target) {
      const { el, l } = target;
      const margin = Math.min(size * 0.35, (l.right - l.left) / 2);
      const tx = clamp(x ?? pos.x + (Math.random() - 0.5) * size, l.left + margin, l.right - margin);
      const dx = tx - l.left;
      to = () => {
        const n = topLine(el);
        return n && n.top > 0 && n.top < innerHeight ? { x: n.left + dx, y: surface(n) } : null;
      };
      onLand = () => {
        perch = { el, dx };
        land('perch');
      };
    } else {
      const tx = clamp(x ?? pos.x, size / 2, innerWidth - size / 2);
      to = () => ({ x: tx, y: floorY() });
      onLand = () => {
        perch = null;
        land('floor');
      };
    }
    const end = to() ?? { x: from.x, y: floorY() };
    const dist = Math.hypot(end.x - from.x, end.y - from.y);
    jump = { from, to, last: end, t: 0, pre: 0.12, dur: clamp(0.38 + dist / 1800, 0.42, 0.85), arc: 50 + Math.max(0, from.y - end.y) * 0.25 + dist * 0.12, onLand };
    facing = Math.sign(end.x - from.x) * 0.6;
    mode = 'jump';
  };

  // ── Input ──
  addEventListener('pointermove', (e) => {
    const cx = pos.x;
    const cy = pos.y - size * 0.6;
    aim.x = clamp((e.clientX - cx) / (innerWidth * 0.4), -1, 1);
    aim.y = clamp((e.clientY - cy) / (innerHeight * 0.4), -1, 1);
    wake();
  }, { passive: true });
  addEventListener('scroll', wake, { passive: true });
  addEventListener('keydown', wake);

  // Pointer heading out through the top of the window, once per visit.
  let warned = false;
  document.addEventListener('mouseout', (e) => {
    if (warned || e.relatedTarget || e.clientY > 8) return;
    warned = true;
    worried = 1;
    const onTry = location.pathname.startsWith('/try');
    say(onTry ? 'Don’t forget to save your video!' : LEAVING.text, onTry ? undefined : LEAVING.href, 6500);
  });

  const pokeIt = () => {
    wake();
    giggle = 1;
    nextLine();
  };
  // Keyboard presses arrive as clicks with no pointer behind them.
  poke.addEventListener('click', (e) => {
    if (e.detail === 0) pokeIt();
  });

  // Pick Pan up and throw it.
  let press: { id: number; x: number; y: number; ox: number; oy: number } | null = null;
  let pointer = { x: 0, y: 0, vx: 0, vy: 0, t: 0 };
  hit.addEventListener('pointerdown', (e) => {
    press = { id: e.pointerId, x: e.clientX, y: e.clientY, ox: pos.x - e.clientX, oy: pos.y - e.clientY };
    pointer = { x: e.clientX, y: e.clientY, vx: 0, vy: 0, t: performance.now() };
    hit.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  hit.addEventListener('pointermove', (e) => {
    if (!press || e.pointerId !== press.id) return;
    const now = performance.now();
    const dt = Math.max(1, now - pointer.t) / 1000;
    pointer = {
      x: e.clientX,
      y: e.clientY,
      vx: approach(pointer.vx, (e.clientX - pointer.x) / dt, 0.5, 1),
      vy: approach(pointer.vy, (e.clientY - pointer.y) / dt, 0.5, 1),
      t: now,
    };
    if (mode !== 'drag' && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 6) {
      mode = 'drag';
      perch = null;
      jump = null;
      wake();
      root.classList.add('is-held');
      const r = root.getBoundingClientRect();
      root.style.transformOrigin = `${press.x - r.left}px ${press.y - r.top}px`;
      say('Wheee!', undefined, 1600);
    }
  });
  const release = (e: PointerEvent) => {
    if (!press || e.pointerId !== press.id) return;
    press = null;
    root.classList.remove('is-held');
    if (mode === 'drag') {
      vel.x = clamp(pointer.vx, -2200, 2200);
      vel.y = clamp(pointer.vy, -2600, 2600);
      mode = 'fall';
      if (Math.hypot(vel.x, vel.y) > 900) say(THROWN[Math.floor(Math.random() * THROWN.length)], undefined, 2400);
    } else if (e.type === 'pointerup') {
      pokeIt();
    }
  };
  hit.addEventListener('pointerup', release);
  hit.addEventListener('pointercancel', release);

  // Say hello once the visitor has settled in.
  setTimeout(() => {
    if (!root.classList.contains('is-talking')) say(LINES[0]);
    line = 1;
  }, 9000);

  // ── Movement ──
  const think = (now: number) => {
    if (now < nextThought || asleep) return;
    nextThought = now + 3500 + Math.random() * 6000;
    const r = Math.random();
    if (r < 0.45) {
      // Hop to another heading in view, if there is one.
      const t = pickPerch(0, perch?.el);
      if (t && Math.abs(surface(t.l) - pos.y) > 30) return jumpTo(t);
    }
    if (mode === 'perch' && perch) {
      const l = topLine(perch.el);
      if (l) walkGoal = clamp(Math.random() * (l.right - l.left), size * 0.35, Math.max(size * 0.35, l.right - l.left - size * 0.35));
    } else if (mode === 'floor') {
      walkGoal = clamp(pos.x + (Math.random() - 0.5) * innerWidth * 0.5, size / 2, innerWidth - size / 2);
    }
  };

  const walk = (current: number, dt: number) => {
    if (walkGoal === null) return current;
    const d = walkGoal - current;
    const step = size * 0.9 * dt;
    if (Math.abs(d) <= step) {
      walkGoal = null;
      return current + d;
    }
    facing = Math.sign(d) * 0.95;
    return current + Math.sign(d) * step;
  };

  const move = (dt: number, now: number) => {
    const scrolling = Math.abs(scrollV) > 120;
    if (mode === 'perch' && perch) {
      const l = topLine(perch.el);
      if (!l || l.top < bandTop() * 0.75 || l.top > innerHeight * 0.97) {
        // The heading is scrolling away: hop to another, or down to the bottom.
        const t = pickPerch(Math.sign(scrollV), perch.el);
        return jumpTo(t, pos.x);
      }
      if (!scrolling) perch.dx = walk(perch.dx, dt);
      perch.dx = clamp(perch.dx, 0, l.right - l.left);
      pos.x = l.left + perch.dx;
      pos.y = surface(l);
      think(now);
    } else if (mode === 'floor') {
      pos.y = floorY();
      if (scrolling) {
        walkGoal = null;
        // Something to sit on just came into view.
        if (now - landedAt > 700) {
          const t = pickPerch(Math.sign(scrollV));
          if (t && surface(t.l) < innerHeight * 0.85) return jumpTo(t);
        }
      } else {
        pos.x = walk(pos.x, dt);
        think(now);
      }
      pos.x = clamp(pos.x, size / 2, innerWidth - size / 2);
    } else if (mode === 'jump' && jump) {
      if (jump.pre > 0) {
        jump.pre -= dt;
        squash = 0.45;
        return;
      }
      jump.t = Math.min(1, jump.t + dt / jump.dur);
      const target = jump.to() ?? jump.last;
      jump.last = target;
      const k = smooth(jump.t);
      pos.x = jump.from.x + (target.x - jump.from.x) * k;
      pos.y = jump.from.y + (target.y - jump.from.y) * k - jump.arc * 4 * jump.t * (1 - jump.t);
      if (jump.t >= 1) jump.onLand();
    } else if (mode === 'fall') {
      const prevY = pos.y;
      vel.y += GRAVITY * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;
      if (pos.x < size / 2 || pos.x > innerWidth - size / 2) {
        pos.x = clamp(pos.x, size / 2, innerWidth - size / 2);
        vel.x *= -0.55;
      }
      facing = clamp(vel.x / 900, -0.8, 0.8);
      if (vel.y > 0) {
        for (const el of perches()) {
          const box = el.getBoundingClientRect();
          if (box.bottom < prevY - 40 || box.top > pos.y + 40) continue;
          const l = topLine(el);
          if (!l) continue;
          const y = surface(l);
          if (prevY <= y && pos.y >= y && pos.x > l.left && pos.x < l.right && y > bandTop() * 0.75) {
            pos.y = y;
            perch = { el, dx: pos.x - l.left };
            return land('perch', vel.y);
          }
        }
      }
      if (pos.y >= floorY()) {
        pos.y = floorY();
        perch = null;
        land('floor', vel.y);
      }
    } else if (mode === 'drag') {
      pos.x = pointer.x + (press?.ox ?? 0);
      pos.y = pointer.y + (press?.oy ?? 0);
    }
  };

  // ── Pose ──
  const pose = (dt: number, now: number) => {
    const s = now / 1000;
    const grounded = mode === 'floor' || mode === 'perch';
    const walking = grounded && walkGoal !== null && !asleep;
    const running = mode === 'floor' && Math.abs(scrollV) > 120;
    const holding = mode === 'perch' && Math.abs(scrollV) > 450;
    const airborne = mode === 'jump' || mode === 'fall';
    const held = mode === 'drag';

    if (!asleep && grounded && walkGoal === null && now - lastInput > IDLE_MS) {
      asleep = true;
      root.classList.add('is-asleep');
    }
    if (now > blinkAt && !asleep) {
      blink = 1;
      blinkAt = now + 2200 + Math.random() * 3800;
    }
    blink = Math.max(0, blink - dt * 7);
    giggle = Math.max(0, giggle - dt * 1.4);
    worried = Math.max(0, worried - dt * 0.25);
    wave = Math.max(0, wave - dt * 0.45);
    squash = approach(squash, 0, 7, dt);

    // Face the way Pan is going; face the visitor when standing still.
    if (grounded && !walking && !running) facing = approach(facing, 0, 3, dt);
    pan.rotation.y = approach(pan.rotation.y, facing, 8, dt);

    // Where to look: up or down with the scroll, else at the pointer.
    const target = asleep
      ? { x: 0, y: 0.5 }
      : worried > 0
        ? { x: -0.1, y: -0.9 }
        : Math.abs(scrollV) > 80
          ? { x: 0, y: scrollV > 0 ? 0.7 : -0.8 }
          : held
            ? { x: 0, y: 0.6 }
            : aim;
    look.x = approach(look.x, target.x, 6, dt);
    look.y = approach(look.y, target.y, 6, dt);

    // Legs and arms.
    const speed = running ? 16 : walking ? 11 : 0;
    phase += dt * speed;
    const stride = running ? 0.95 : walking ? 0.65 : 0;
    const sw = Math.sin(phase);
    let legL = sw * stride;
    let legR = -sw * stride;
    let armX = -sw * stride * 0.8;
    let raise = 0.12 + Math.sin(s * 2) * 0.03;
    let lean = running ? 0.22 : walking ? 0.08 : 0;
    let drop = asleep ? -0.3 : holding ? -0.08 : 0;
    if (asleep) {
      legL = legR = -1.25;
      armX = -0.5;
      raise = 0.25;
      lean = -0.05;
    } else if (airborne) {
      const flail = mode === 'fall' ? Math.sin(s * 26) * 0.35 : 0;
      legL = -0.55 + flail;
      legR = -0.35 - flail;
      armX = 0;
      raise = 1.9 + flail;
    } else if (held) {
      legL = Math.sin(s * 7) * 0.35;
      legR = -Math.sin(s * 7) * 0.35;
      armX = 0;
      raise = 2.1;
    } else if (holding) {
      raise = 1.0 + Math.sin(s * 9) * 0.15;
    }
    legs[0].rotation.x = approach(legs[0].rotation.x, legL, 14, dt);
    legs[1].rotation.x = approach(legs[1].rotation.x, legR, 14, dt);
    const giggleWave = Math.sin(giggle * 20) * giggle * 0.6;
    const waving = wave > 0 ? 2.7 + Math.sin(s * 12) * 0.3 : 0;
    arms[0].rotation.x = approach(arms[0].rotation.x, armX, 14, dt);
    arms[1].rotation.x = approach(arms[1].rotation.x, -armX, 14, dt);
    arms[0].rotation.z = approach(arms[0].rotation.z, -(raise + giggleWave), 12, dt);
    arms[1].rotation.z = approach(arms[1].rotation.z, waving || raise + giggleWave, 12, dt);

    // Body: bob, lean, squash on landing.
    const bob = walking || running ? Math.abs(sw) * 0.07 : Math.sin(s * (asleep ? 1.6 : 2.4)) * 0.015;
    body.position.y = approach(body.position.y, bodyY + drop + bob - squash * 0.12, 16, dt);
    body.rotation.x = approach(body.rotation.x, lean, 8, dt);
    body.scale.set(1 + squash * 0.12, 1 - squash * 0.14, 1 + squash * 0.12);

    // Head.
    head.rotation.y = look.x * 0.55 + Math.sin(giggle * 18) * giggle * 0.25;
    head.rotation.x = look.y * 0.32;
    head.rotation.z = -look.x * 0.12 + Math.sin(giggle * 22) * giggle * 0.16 + (asleep ? Math.sin(s * 0.8) * 0.06 + 0.14 : 0);

    // Ears and tail lag behind fast moves, like real fur would.
    const flop = clamp(-screenVel.y / 1600, -0.5, 0.6) + (airborne ? 0.35 : 0) + (asleep ? 0.3 : 0);
    ears[0].rotation.z = approach(ears[0].rotation.z, flop + Math.sin(s * 1.3) * 0.04, 10, dt);
    ears[1].rotation.z = approach(ears[1].rotation.z, -flop - Math.sin(s * 1.3 + 1) * 0.04, 10, dt);
    ears[0].rotation.x = ears[1].rotation.x = approach(ears[0].rotation.x, airborne || held ? -0.35 : 0, 10, dt);
    const swish = asleep ? 0.05 : running || airborne ? 0.35 : 0.18;
    const tailSpeed = asleep ? 1 : running ? 9 : 3;
    const lift = clamp(screenVel.y / 2400, -0.3, 0.3);
    tail.forEach((t, i) => {
      t.rotation.y = Math.sin(s * tailSpeed - i * 0.6) * swish;
      t.rotation.x = approach(t.rotation.x, lift + (asleep ? 0.15 : 0), 6, dt);
    });

    // Eyes.
    const lid = asleep ? 0.08 : 1 - Math.sin(blink * Math.PI) * 0.92;
    const wide = 1 + Math.max(worried, held ? 0.6 : 0, airborne ? 0.3 : 0) * 0.3;
    eyes.forEach((e) => e.scale.set(wide, lid * wide, 1));
    pupils.forEach((p, i) => {
      p.position.x = pupilBase[i].x + look.x * 0.04;
      p.position.y = pupilBase[i].y - look.y * 0.035;
    });

    // Swing from the grab point while held.
    swing = approach(swing, held ? clamp(-pointer.vx / 40, -35, 35) : 0, held ? 6 : 10, dt);
  };

  let bubbleShift = 0;
  const place = () => {
    root.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - foot * size}px, 0) rotate(${swing.toFixed(2)}deg)`;
    root.dataset.mode = asleep ? 'asleep' : mode;
    root.classList.toggle('bubble-left', pos.x > innerWidth * 0.55);
    root.classList.toggle('bubble-below', pos.y - size < 150);
    // Nudge the bubble sideways so it never runs off a narrow screen.
    if (root.classList.contains('is-talking')) {
      const b = bubble.getBoundingClientRect();
      const left = b.left - bubbleShift;
      const shift = clamp(0, 8 - left, innerWidth - 8 - (left + b.width));
      if (Math.abs(shift - bubbleShift) > 0.5) {
        bubbleShift = shift;
        bubble.style.translate = `${shift.toFixed(1)}px 0`;
      }
    }
  };

  // ── Loop ──
  let visible = !document.hidden;
  document.addEventListener('visibilitychange', () => (visible = !document.hidden));
  let t0 = performance.now();
  const prev: Point = { ...pos };
  const tick = (now: number) => {
    requestAnimationFrame(tick);
    if (!visible || root.hidden) return;
    const dt = Math.min(0.05, (now - t0) / 1000);
    t0 = now;
    if (dt <= 0) return;

    scrollV = approach(scrollV, (scrollY - lastScroll) / dt, 10, dt);
    lastScroll = scrollY;
    if (!saidEnd && scrollY > 200 && scrollY + innerHeight >= document.documentElement.scrollHeight - 8) {
      saidEnd = true;
      wave = 1;
      say(END.text, END.href, 6000);
    }

    move(dt, now);
    screenVel = { x: (pos.x - prev.x) / dt, y: (pos.y - prev.y) / dt };
    prev.x = pos.x;
    prev.y = pos.y;
    pose(dt, now);
    place();
    renderer!.render({ scene, camera });
  };

  root.classList.add('is-roaming', 'is-ready');
  root.hidden = false;
  place();
  requestAnimationFrame(tick);
}

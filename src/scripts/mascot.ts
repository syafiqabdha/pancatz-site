import { Camera, GLTFLoader, Mesh, Program, Renderer, Transform, Vec3 } from 'ogl';

/**
 * Pan, the Pancatz panda. Modelled in Blender (video/blender/panda.py) and
 * drawn here with OGL in a flat, illustrated style.
 *
 * It peeks up from the corner and reacts to the visitor: it follows the
 * pointer, blinks, naps when nobody moves, wakes with a hop, giggles when
 * poked, and looks worried when the pointer heads for the tab bar.
 * Reduced motion or no WebGL2 shows the rendered still instead.
 */

const LINES = [
  'Hi, I’m Pan. I guard the WiFi.',
  'We design it, print it, and plug it in.',
  'Psst… brand your shop in 10 seconds →',
  'Sharper looks. Smarter systems. More bamboo.',
  'I was made in Blender. My humans make the rest.',
];
const LEAVING = { text: 'Leaving already? Brand your shop in 10 seconds first →', href: '/try' };
const IDLE_MS = 12000;
const AWAY_TITLE = '🐼 Pan misses you…';

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
  vec3 p = position + normal * uOutline;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
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

type Part = Transform & { name?: string };

export async function initMascot(root: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bubble = root.querySelector<HTMLElement>('[data-mascot-bubble]')!;
  const poke = root.querySelector<HTMLButtonElement>('[data-mascot-poke]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-mascot-close]')!;
  const stage = root.querySelector<HTMLElement>('[data-mascot-stage]')!;

  try {
    if (sessionStorage.getItem('pan-hidden')) return;
  } catch {}
  root.hidden = false;

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
  let renderer: Renderer;
  try {
    renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 2), alpha: true, webgl: 2, antialias: true, premultipliedAlpha: false });
  } catch {
    renderer = null as unknown as Renderer;
  }
  const gl = renderer?.gl;
  if (reduced || !renderer || !renderer.isWebgl2) {
    stage.classList.add('is-still');
    poke.addEventListener('click', () => say(LINES[line++ % LINES.length], line % LINES.length === 3 ? '/try' : undefined));
    return;
  }
  gl.clearColor(0, 0, 0, 0);
  stage.append(gl.canvas);

  const camera = new Camera(gl, { fov: 26, near: 0.1, far: 50 });
  camera.position.set(0, 0.35, 8.2);
  camera.lookAt(new Vec3(0, -0.15, 0));
  const scene = new Transform();

  const gltf = await GLTFLoader.load(gl, '/models/panda.glb');
  (gltf.scene as Transform[]).forEach((r) => r.setParent(scene));

  // Swap the loader's programs for the cel shader, and add an ink outline.
  scene.traverse((node: Transform) => {
    if (!(node instanceof Mesh) || (node as Mesh & { isOutline?: boolean }).isOutline) return;
    const mat = (node.program as Program & { gltfMaterial?: { baseColorFactor: number[] } }).gltfMaterial;
    const c = mat?.baseColorFactor ?? [1, 1, 1, 1];
    node.program = new Program(gl, { vertex, fragment, uniforms: { uColor: { value: [c[0], c[1], c[2]] }, uOutline: { value: 0 } } });
    const outline = new Mesh(gl, {
      geometry: node.geometry,
      program: new Program(gl, { vertex, fragment, cullFace: gl.FRONT, uniforms: { uColor: { value: [0, 0, 0] }, uOutline: { value: 0.018 } } }),
    }) as Mesh & { isOutline?: boolean };
    outline.isOutline = true;
    outline.setParent(node);
  });

  const find = (name: string) => {
    let hit: Part | undefined;
    scene.traverse((n: Part) => {
      if (!hit && n.name === name) hit = n;
    });
    return hit;
  };
  const head = find('Head')!;
  const eyes = [find('EyeL'), find('EyeR')].filter(Boolean) as Part[];
  const pupils = [find('PupilL'), find('PupilR')].filter(Boolean) as Part[];
  const pupilBase = pupils.map((p) => p.position.clone());
  const paws = [find('PawL'), find('PawR')].filter(Boolean) as Part[];
  const pawBase = paws.map((p) => p.position.clone());

  const resize = () => {
    const { width, height } = stage.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.perspective({ aspect: width / height });
  };
  resize();
  new ResizeObserver(resize).observe(stage);

  // ── State ──
  const look = { x: 0, y: 0 };
  const aim = { x: 0, y: 0 };
  let lastInput = performance.now();
  let asleep = false;
  let worried = 0;
  let hop = 0;
  let giggle = 0;
  let blinkAt = performance.now() + 2000;
  let blink = 0;
  let scrollKick = 0;
  let lastScroll = scrollY;

  const wake = () => {
    lastInput = performance.now();
    if (asleep) {
      asleep = false;
      hop = 1;
      root.classList.remove('is-asleep');
    }
  };
  addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height * 0.4;
    aim.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * 0.5)));
    aim.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * 0.5)));
    wake();
  }, { passive: true });
  addEventListener('scroll', () => {
    scrollKick += (scrollY - lastScroll) * 0.002;
    lastScroll = scrollY;
    wake();
  }, { passive: true });
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

  poke.addEventListener('click', () => {
    wake();
    giggle = 1;
    const i = line++ % LINES.length;
    say(LINES[i], i === 2 ? '/try' : undefined);
  });

  // Say hello once the visitor has settled in.
  setTimeout(() => {
    if (!root.classList.contains('is-talking')) say(LINES[0]);
    line = 1;
  }, 9000);

  // ── Loop ──
  let visible = true;
  document.addEventListener('visibilitychange', () => (visible = !document.hidden));
  let t0 = performance.now();
  const tick = (now: number) => {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(0.05, (now - t0) / 1000);
    t0 = now;

    if (!asleep && now - lastInput > IDLE_MS) {
      asleep = true;
      root.classList.add('is-asleep');
    }
    if (now > blinkAt && !asleep) {
      blink = 1;
      blinkAt = now + 2200 + Math.random() * 3800;
    }
    blink = Math.max(0, blink - dt * 7);
    hop = Math.max(0, hop - dt * 2.2);
    giggle = Math.max(0, giggle - dt * 1.4);
    worried = Math.max(0, worried - dt * 0.25);
    scrollKick *= 0.9;

    const target = asleep ? { x: 0, y: 0.35 } : worried > 0 ? { x: -0.1, y: -0.9 } : aim;
    look.x += (target.x - look.x) * Math.min(1, dt * 6);
    look.y += (target.y - look.y) * Math.min(1, dt * 6);

    const s = now / 1000;
    const breathe = Math.sin(s * (asleep ? 1.6 : 2.4)) * (asleep ? 0.03 : 0.015);
    head.rotation.y = look.x * 0.55 + Math.sin(giggle * 18) * giggle * 0.25;
    head.rotation.x = look.y * 0.35 + scrollKick;
    head.rotation.z = -look.x * 0.12 + Math.sin(giggle * 22) * giggle * 0.18 + (asleep ? Math.sin(s * 0.8) * 0.06 + 0.12 : 0);
    head.position.y = breathe + Math.sin(hop * Math.PI) * 0.45;
    head.scale.set(1 + breathe * 0.6, 1 - breathe * 0.4 + Math.sin(hop * Math.PI) * 0.04, 1);

    const lid = asleep ? 0.08 : 1 - Math.sin(blink * Math.PI) * 0.92;
    const wide = 1 + worried * 0.25;
    eyes.forEach((e) => e.scale.set(wide, lid * wide, 1));
    pupils.forEach((p, i) => {
      p.position.x = pupilBase[i].x + look.x * 0.05;
      p.position.y = pupilBase[i].y - look.y * 0.04;
    });
    paws.forEach((p, i) => {
      p.position.y = pawBase[i].y + Math.max(0, Math.sin(s * 3 + i * Math.PI)) * giggle * 0.2;
    });

    renderer.render({ scene, camera });
  };
  requestAnimationFrame(tick);
  root.classList.add('is-ready');
}

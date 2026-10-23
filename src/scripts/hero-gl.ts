// Hero "living print" field: a slowly drifting topographic noise map in the two
// studio colours, swirled by the cursor through an OGL flowmap. Falls back to
// the static CSS background when WebGL2 isn't available.
import { Renderer, Program, Mesh, Triangle, Flowmap, Vec2 } from 'ogl';

const vertex = /* glsl */ `#version 300 es
in vec2 uv;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = /* glsl */ `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform sampler2D tFlow;
in vec2 vUv;
out vec4 fragColor;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec3 flow = texture(tFlow, vUv).rgb;
  vec2 uv = vUv - flow.xy * 0.18;
  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.35;
  float t = uTime * 0.045;

  vec2 q = vec2(snoise(vec3(p, t)), snoise(vec3(p + 5.2, t + 1.7)));
  float n = snoise(vec3(p + 1.25 * q, t * 1.4));
  float h = n * 0.5 + 0.5;

  vec3 paper = vec3(0.949, 0.941, 0.922);
  vec3 design = vec3(1.0, 0.31, 0.102);
  vec3 tech = vec3(0.169, 0.208, 1.0);
  vec3 ink = vec3(0.051, 0.051, 0.059);

  float aa = fwidth(h) * 1.5;
  // Keep the lower part (behind the headline) mostly paper; colour lives up top
  // and wherever the cursor stirs the field.
  float stir = smoothstep(0.0, 0.2, length(flow.xy));
  float zone = max(smoothstep(0.42, 0.78, vUv.y), stir);
  float hiT = mix(0.98, 0.70, zone);
  float loT = mix(0.02, 0.30, zone);
  vec3 col = paper;
  col = mix(col, design, smoothstep(hiT - aa, hiT + aa, h));
  col = mix(col, tech, 1.0 - smoothstep(loT - aa, loT + aa, h));

  // Topographic contour lines, like a print plate or a circuit trace
  float bands = 16.0;
  float f = fract(h * bands);
  float w = fwidth(h * bands);
  float line = 1.0 - smoothstep(0.0, w * 1.1, min(f, 1.0 - f));
  float lineAlpha = mix(0.16, 0.5, smoothstep(0.0, 0.25, length(flow.xy)));
  col = mix(col, ink, line * lineAlpha);

  // Fine print grain
  // Hash on a wrapped coordinate so large pixel values cannot lose precision.
  vec2 gp = mod(gl_FragCoord.xy, 256.0);
  float g = fract(sin(dot(gp, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.035;

  fragColor = vec4(col, 1.0);
}`;

export function initHeroGL(container: HTMLElement, opts: { animate: boolean }) {
  const canvas = document.createElement('canvas');
  let renderer: Renderer;
  try {
    renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 1.5), webgl: 2, antialias: false });
  } catch {
    return;
  }
  const gl = renderer.gl;
  if (!renderer.isWebgl2) return;

  container.appendChild(canvas);
  canvas.setAttribute('aria-hidden', 'true');

  const flowmap = new Flowmap(gl, { falloff: 0.28, dissipation: 0.94, alpha: 0.6 });
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: Math.random() * 100 },
      uRes: { value: new Vec2(1, 1) },
      tFlow: flowmap.uniform,
    },
  });
  const mesh = new Mesh(gl, { geometry, program });

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    program.uniforms.uRes.value.set(width, height);
    flowmap.aspect = width / height;
  };
  resize();
  new ResizeObserver(resize).observe(container);

  const mouse = new Vec2(-1);
  const velocity = new Vec2();
  let lastTime = 0;
  const last = new Vec2();
  container.addEventListener('pointermove', (e) => {
    const r = container.getBoundingClientRect();
    mouse.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    const now = performance.now();
    if (!lastTime) { lastTime = now; last.set(e.clientX, e.clientY); }
    const dt = Math.max(14, now - lastTime);
    velocity.x = (e.clientX - last.x) / dt;
    velocity.y = (e.clientY - last.y) / dt;
    last.set(e.clientX, e.clientY);
    lastTime = now;
  });

  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 }).observe(container);

  const draw = (t: number) => {
    program.uniforms.uTime.value = 30 + t * 0.001;
    if (!lastTime || performance.now() - lastTime > 60) { mouse.set(-1); velocity.set(0); }
    flowmap.mouse.copy(mouse);
    flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1);
    flowmap.update();
    renderer.render({ scene: mesh });
  };

  if (!opts.animate) {
    draw(0);
  } else {
    const loop = (t: number) => {
      requestAnimationFrame(loop);
      if (visible && !document.hidden) draw(t);
    };
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(() => canvas.classList.add('ready'));
}

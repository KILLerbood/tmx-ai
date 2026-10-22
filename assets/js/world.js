// The 3D backdrop: one particle field that morphs into a different form for
// every area (core, code lattice, neural net, growth bars, server stack ...).
import * as THREE from '../vendor/three.module.min.js';

const MORPH_SECONDS = 1.8;
const SHAPES = ['core', 'development', 'ai', 'marketing', 'it', 'galaxy', 'ring'];

function rand(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function buildShape(name, n, r) {
  const out = new Float32Array(n * 3);
  const set = (i, x, y, z) => { out[i * 3] = x; out[i * 3 + 1] = y; out[i * 3 + 2] = z; };
  const gauss = () => (r() + r() + r() - 1.5) / 1.5;

  if (name === 'core') {
    // Fibonacci sphere shell with an inner glowing nucleus.
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      if (i % 5 === 0) {
        const rad = Math.pow(r(), 2) * 0.9;
        const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1);
        set(i, rad * Math.sin(ph) * Math.cos(th), rad * Math.sin(ph) * Math.sin(th), rad * Math.cos(ph));
      } else {
        const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
        const k = 2.2 + gauss() * 0.04;
        set(i, Math.cos(th) * rad * k, y * k, Math.sin(th) * rad * k);
      }
    }
  } else if (name === 'development') {
    // A 3x3x3 lattice of cube edges.
    const g = 3, size = 3.6, step = size / g;
    for (let i = 0; i < n; i++) {
      const axis = Math.floor(r() * 3);
      const a = Math.round(r() * g) * step - size / 2;
      const b = Math.round(r() * g) * step - size / 2;
      const c = r() * size - size / 2;
      const j = 0.015;
      const p = axis === 0 ? [c, a, b] : axis === 1 ? [a, c, b] : [a, b, c];
      set(i, p[0] + gauss() * j, p[1] + gauss() * j, p[2] + gauss() * j);
    }
  } else if (name === 'ai') {
    // Neural network: nodes connected by synapse lines.
    const nodes = [];
    const nr = rand(7);
    for (let k = 0; k < 46; k++) {
      const th = nr() * Math.PI * 2, ph = Math.acos(2 * nr() - 1), rad = 0.8 + nr() * 1.7;
      nodes.push([rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph) * 0.8, rad * Math.sin(ph) * Math.sin(th)]);
    }
    const edges = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j <= i) return;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < 1.25) edges.push([a, b]);
    }));
    for (let i = 0; i < n; i++) {
      if (i % 3 === 0) {
        const c = nodes[i % nodes.length];
        set(i, c[0] + gauss() * 0.09, c[1] + gauss() * 0.09, c[2] + gauss() * 0.09);
      } else {
        const [a, b] = edges[Math.floor(r() * edges.length)];
        const u = r();
        set(i, a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u);
      }
    }
  } else if (name === 'marketing') {
    // A rising 3D bar chart.
    const cols = 6, rows = 4, w = 0.34, gap = 0.62;
    for (let i = 0; i < n; i++) {
      const cx = Math.floor(r() * cols), cz = Math.floor(r() * rows);
      const height = 0.6 + (cx / (cols - 1)) * 2.6 + Math.sin(cx * 1.7 + cz) * 0.35;
      const x0 = (cx - (cols - 1) / 2) * gap, z0 = (cz - (rows - 1) / 2) * gap;
      const face = Math.floor(r() * 5);
      let x = (r() - 0.5) * w, z = (r() - 0.5) * w, y = r() * height;
      if (face === 0) x = -w / 2; else if (face === 1) x = w / 2;
      else if (face === 2) z = -w / 2; else if (face === 3) z = w / 2; else y = height;
      set(i, x0 + x, y - 1.6, z0 + z);
    }
  } else if (name === 'it') {
    // A stack of server slabs with a data column through the middle.
    const slabs = 5, sw = 3, sd = 1.8, sh = 0.32, gap = 0.62;
    for (let i = 0; i < n; i++) {
      if (i % 7 === 0) {
        set(i, gauss() * 0.06, (r() - 0.5) * slabs * gap * 1.3, gauss() * 0.06);
        continue;
      }
      const s = Math.floor(r() * slabs), y0 = (s - (slabs - 1) / 2) * gap;
      const face = Math.floor(r() * 3);
      let x = (r() - 0.5) * sw, y = (r() - 0.5) * sh, z = (r() - 0.5) * sd;
      if (face === 0) y = r() < 0.5 ? -sh / 2 : sh / 2;
      else if (face === 1) z = r() < 0.5 ? -sd / 2 : sd / 2;
      else x = r() < 0.5 ? -sw / 2 : sw / 2;
      set(i, x, y0 + y, z);
    }
  } else if (name === 'galaxy') {
    for (let i = 0; i < n; i++) {
      const arm = i % 3, rad = Math.pow(r(), 0.7) * 3.2;
      const th = rad * 1.5 + (arm / 3) * Math.PI * 2;
      const spread = 0.25 * (1 - rad / 3.6);
      set(i, Math.cos(th) * rad + gauss() * spread, gauss() * 0.12, Math.sin(th) * rad + gauss() * spread);
    }
  } else {
    // ring: a torus portal.
    for (let i = 0; i < n; i++) {
      const u = r() * Math.PI * 2, v = r() * Math.PI * 2, R = 2.2, tube = 0.12 + Math.pow(r(), 3) * 0.35;
      set(i, (R + tube * Math.cos(v)) * Math.cos(u), (R + tube * Math.cos(v)) * Math.sin(u), tube * Math.sin(v));
    }
  }
  return out;
}

const vertex = /* glsl */`
  attribute float aRand;
  attribute vec3 aTo;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixel;
  varying float vRand;
  varying float vDepth;
  void main() {
    // Morph on the GPU: every particle starts a little later than the last.
    float k = clamp((uProgress - aRand * 0.35) / 0.65, 0.0, 1.0);
    k = k * k * (3.0 - 2.0 * k);
    vec3 p = mix(position, aTo, k);
    float t = uTime * 0.6 + aRand * 20.0;
    p += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * 0.025;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = uSize * (0.55 + aRand * 0.9);
    gl_PointSize = s * uPixel * (10.0 / -mv.z);
    vRand = aRand;
    vDepth = clamp((-mv.z - 4.0) / 8.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */`
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  uniform float uOpacity;
  varying float vRand;
  varying float vDepth;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 1.8);
    vec3 col = mix(uA, uB, smoothstep(0.15, 0.95, vRand));
    col = mix(col, uC, step(0.94, vRand));
    gl_FragColor = vec4(col, glow * uOpacity * (1.0 - vDepth * 0.6));
  }
`;

export function createWorld(canvas, { reduced = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch (_) {
    canvas.remove();
    return null; // No WebGL: the page still works without the backdrop.
  }

  const small = window.matchMedia('(max-width: 760px)').matches;
  const N = small ? 4500 : 11000;
  const pixel = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75);
  renderer.setPixelRatio(pixel);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const shapes = {};
  SHAPES.forEach((s, i) => { shapes[s] = buildShape(s, N, rand(101 + i * 17)); });

  // "from" lives in position, "to" in aTo; the shader blends them by uProgress.
  const from = new Float32Array(N * 3);
  const start = rand(3);
  for (let i = 0; i < from.length; i++) from[i] = (start() - 0.5) * 18;
  let target = shapes.core;
  const to = new Float32Array(target);

  const geometry = new THREE.BufferGeometry();
  const fromAttr = new THREE.BufferAttribute(from, 3);
  const toAttr = new THREE.BufferAttribute(to, 3);
  geometry.setAttribute('position', fromAttr);
  geometry.setAttribute('aTo', toAttr);
  const rnd = new Float32Array(N);
  const rr = rand(42);
  for (let i = 0; i < N; i++) rnd[i] = rr();
  geometry.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);

  const css = getComputedStyle(document.documentElement);
  const color = (v, fb) => new THREE.Color((css.getPropertyValue(v) || fb).trim() || fb);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: small ? 3.4 : 3.0 },
      uPixel: { value: pixel },
      uOpacity: { value: 0.9 },
      uA: { value: color('--c-violet', '#8b5cf6') },
      uB: { value: color('--c-cyan', '#22d3ee') },
      uC: { value: color('--c-pink', '#f0abfc') }
    }
  });

  const points = new THREE.Points(geometry, material);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  const state = { x: 0, y: 0, scale: 1, opacity: 0.9, spin: 0 };
  const goal = { x: 0, y: 0, scale: 1, opacity: 0.9 };
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let scrollVel = 0, lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    scrollVel += (window.scrollY - lastY) * 0.0006;
    lastY = window.scrollY;
  }, { passive: true });

  // Freeze wherever the particles are right now, then head for the new shape.
  // This runs once per morph, never per frame.
  function retarget(next) {
    const p = material.uniforms.uProgress.value;
    for (let i = 0, j = 0; i < N; i++, j += 3) {
      let k = Math.min(1, Math.max(0, (p - rnd[i] * 0.35) / 0.65));
      k = k * k * (3 - 2 * k);
      from[j] += (to[j] - from[j]) * k;
      from[j + 1] += (to[j + 1] - from[j + 1]) * k;
      from[j + 2] += (to[j + 2] - from[j + 2]) * k;
    }
    to.set(next);
    target = next;
    fromAttr.needsUpdate = true;
    toAttr.needsUpdate = true;
    material.uniforms.uProgress.value = reduced ? 1 : 0;
  }

  const clock = new THREE.Clock();
  let running = true;

  function frame() {
    if (!running) return;
    const raw = clock.getDelta();
    const dt = Math.min(raw, 0.05);
    const t = clock.elapsedTime;
    material.uniforms.uTime.value = t;

    const u = material.uniforms.uProgress;
    if (u.value < 1) u.value = Math.min(1, u.value + Math.min(raw, 0.25) / MORPH_SECONDS);

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    for (const key of ['x', 'y', 'scale', 'opacity']) state[key] += (goal[key] - state[key]) * 0.06;
    scrollVel *= 0.92;
    state.spin += dt * 0.12 + scrollVel;

    group.position.set(state.x, state.y, 0);
    group.scale.setScalar(state.scale);
    group.rotation.y = state.spin + mouse.x * 0.35;
    group.rotation.x = 0.18 + mouse.y * 0.2;
    material.uniforms.uOpacity.value = state.opacity;

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  if (reduced) {
    material.uniforms.uProgress.value = 1;
    group.rotation.x = 0.18;
    renderer.render(scene, camera);
  } else {
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    const wasRunning = running;
    running = !document.hidden && !reduced;
    if (running && !wasRunning) { clock.getDelta(); requestAnimationFrame(frame); }
  });

  return {
    morph(name, opts = {}) {
      if (shapes[name] && shapes[name] !== target) retarget(shapes[name]);
      if ('x' in opts) goal.x = opts.x;
      if ('y' in opts) goal.y = opts.y;
      if ('scale' in opts) goal.scale = opts.scale;
      if ('opacity' in opts) goal.opacity = opts.opacity;
      if (reduced) {
        material.uniforms.uProgress.value = 1;
        Object.assign(state, goal);
        group.position.set(state.x, state.y, 0); group.scale.setScalar(state.scale);
        material.uniforms.uOpacity.value = state.opacity;
        renderer.render(scene, camera);
      }
    }
  };
}

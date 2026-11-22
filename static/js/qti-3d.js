/* QTI Lab Interactive 3D Engine (STEP 8 · Three.js Vanilla ESM · Progressive Enhancement)
 * - Scene A: Hub Hero Data-Flow (desktop only, glow deep-teal)
 * - Scene B: Report KPI 3D Bar Chart with bidirectional 2D table row click highlight
 * - Performance: Lazy-loaded via IntersectionObserver, offscreen render pause, DPR capped at 2
 * - Accessibility & Fallbacks: keyboard ArrowLeft/ArrowRight, aria-live, prefers-reduced-motion,
 *   low-end device (hardwareConcurrency <= 2) & WebGL fallback preserves static SVG untouched.
 */
const THREE_URL = "three";
const ORBIT_URL = "three/addons/controls/OrbitControls.js";
const BOX_URL = "three/addons/geometries/RoundedBoxGeometry.js";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const LOW_END = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;

let modsPromise = null;
function loadThree() {
  if (!modsPromise) {
    modsPromise = Promise.all([import(THREE_URL), import(ORBIT_URL), import(BOX_URL)]).then(
      ([THREE, { OrbitControls }, { RoundedBoxGeometry }]) => ({ THREE, OrbitControls, RoundedBoxGeometry })
    );
  }
  return modsPromise;
}

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (_) {
    return false;
  }
}

function makeSprite(THREE, text, color) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const x = c.getContext("2d");
  x.font = '700 46px "Roboto Mono", "SUIT", sans-serif';
  x.fillStyle = color;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(text, 256, 64);
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthTest: false })
  );
  s.scale.set(4.5, 1.12, 1);
  s.renderOrder = 999;
  return s;
}

function createStage(THREE, OrbitControls, host, tip, { frustum, targetY }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  cam.position.set(18, 16, 18);

  const ctrl = new OrbitControls(cam, renderer.domElement);
  ctrl.enableZoom = false;
  ctrl.enablePan = false;
  ctrl.enableDamping = true;
  ctrl.minPolarAngle = Math.PI * 0.22;
  ctrl.maxPolarAngle = Math.PI * 0.36;
  ctrl.minAzimuthAngle = Math.PI * 0.05;
  ctrl.maxAzimuthAngle = Math.PI * 0.45;
  ctrl.target.set(0, targetY, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 1.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(12, 22, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14 });
  scene.add(sun);

  const resize = () => {
    const w = host.clientWidth || 640;
    const h = host.clientHeight || 360;
    const a = w / h;
    renderer.setSize(w, h);
    cam.left = -frustum * a;
    cam.right = frustum * a;
    cam.top = frustum;
    cam.bottom = -frustum;
    cam.updateProjectionMatrix();
  };
  window.addEventListener("resize", resize);
  resize();

  host.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const ang = (e.key === "ArrowLeft" ? -1 : 1) * 0.15;
      const p = cam.position.clone().sub(ctrl.target);
      p.applyAxisAngle(new THREE.Vector3(0, 1, 0), ang);
      cam.position.copy(p.add(ctrl.target));
      ctrl.update();
    }
  });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);
  return { renderer, scene, cam, ctrl, tip, isVisible: () => visible };
}

/* ── Scene A: Hub Hero Data-Flow ── */
async function mountHubHero(host) {
  if (LOW_END || !canWebGL() || window.innerWidth <= 768) return;
  const { THREE, OrbitControls, RoundedBoxGeometry } = await loadThree();
  const ipoCount = Number(host.dataset.ipoCount || 25);
  const tenderCount = Number(host.dataset.tenderCount || 337);
  const totalCount = ipoCount + tenderCount;
  const tip = host.querySelector(".qti-3d-tip");
  const fb = host.querySelector(".qti-3d-fallback");
  const st = createStage(THREE, OrbitControls, host, tip, { frustum: 7.4, targetY: 1.1 });
  if (fb) fb.hidden = true;

  const grid = new THREE.GridHelper(22, 16, 0x1e4a50, 0x15363b);
  grid.material.transparent = true;
  grid.material.opacity = 0.65;
  st.scene.add(grid);

  const hoverables = [];
  const mk = (w, h, d, col, x, z, data, em = 0.16) => {
    const m = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 3, 0.12),
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.45, emissive: col, emissiveIntensity: em })
    );
    m.position.set(x, h / 2, z);
    m.castShadow = m.receiveShadow = true;
    m.userData = data;
    st.scene.add(m);
    hoverables.push(m);
    return m;
  };

  mk(3.6, 0.9, 3.6, 0x2BB3A6, -6.4, -3.1, { t: "DART 전자공시", v: `공모주 ${ipoCount}건 정량 추적` });
  mk(3.6, 0.9, 3.6, 0x9C86FF, -6.4, 3.1, { t: "나라장터 G2B", v: `입찰 공고 ${tenderCount}건 시방서 요약` });
  mk(3.4, 3.2, 3.4, 0x0B7A75, 0, 0, { t: "QTI 분석 엔진", v: "Mac mini 로컬 LLM + NAS 백테스트" }, 0.25);
  [0.7, 1.4, 2.2].forEach((bh, i) =>
    mk(1.1, bh, 1.1, 0xE0A100, 5.1 + i * 1.35, -1.6, { t: "IPO 리포트", v: "수요예측 · 확약 · 유통 자동 발행" })
  );
  [0.9, 1.5, 2.0].forEach((bh, i) =>
    mk(1.1, bh, 1.1, 0x6D4AFF, 5.1 + i * 1.35, 1.6, { t: "입찰 브리핑", v: "시방서 3줄 요약 · 필수면허 체크" })
  );

  const addL = (txt, x, y, z) => {
    const sp = makeSprite(THREE, txt, "#E9F5F3");
    sp.position.set(x, y, z);
    st.scene.add(sp);
  };
  addL(`DART · ${ipoCount}`, -6.4, 2.0, -3.1);
  addL(`G2B · ${tenderCount}`, -6.4, 2.0, 3.1);
  addL("QTI ENGINE", 0, 4.3, 0);
  addL(`${totalCount} REPORTS`, 6.5, 3.3, 0);

  const movers = [];
  [
    [[-6.4, -3.1], [0, 0], 0x2BB3A6],
    [[-6.4, 3.1], [0, 0], 0x9C86FF],
    [[0, 0], [6.5, -1.6], 0xE0A100],
    [[0, 0], [6.5, 1.6], 0x9C86FF],
  ].forEach(([a, b, col]) => {
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.32, 0.32),
        new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.9 })
      );
      m.userData = { a, b, off: i / 3 };
      st.scene.add(m);
      movers.push(m);
    }
  });

  const ray = new THREE.Raycaster();
  const pt = new THREE.Vector2();
  let hov = null;
  st.renderer.domElement.addEventListener("pointermove", (e) => {
    const r = st.renderer.domElement.getBoundingClientRect();
    pt.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(pt, st.cam);
    const hit = ray.intersectObjects(hoverables)[0]?.object || null;
    if (hov && hov !== hit) hov.material.emissiveIntensity = 0.16;
    hov = hit;
    if (hit && tip) {
      hit.material.emissiveIntensity = 0.52;
      tip.innerHTML = `${hit.userData.t}<br><b>${hit.userData.v}</b>`;
      tip.style.left = `${e.clientX - r.left + 12}px`;
      tip.style.top = `${e.clientY - r.top + 12}px`;
      tip.style.opacity = "1";
      st.renderer.domElement.style.cursor = "pointer";
    } else if (tip) {
      tip.style.opacity = "0";
      st.renderer.domElement.style.cursor = "grab";
    }
  });

  const clk = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!st.isVisible()) return;
    const t = clk.getElapsedTime();
    if (!REDUCED) {
      movers.forEach((m) => {
        const { a, b, off } = m.userData;
        const k = (t * 0.26 + off) % 1;
        m.position.set(
          a[0] + (b[0] - a[0]) * k,
          1.1 + Math.sin(k * Math.PI) * 1.25,
          a[1] + (b[1] - a[1]) * k
        );
      });
    }
    st.ctrl.update();
    st.renderer.render(st.scene, st.cam);
  })();
}

/* ── Scene B: Report KPI 3D + Bidirectional 2D Table Highlight ── */
async function mountReportKpi(host) {
  const dataEl = document.getElementById(host.dataset.peersId || "");
  if (!dataEl) return;
  let peers = [];
  try { peers = JSON.parse(dataEl.textContent || "[]"); } catch (_) { return; }
  if (!peers.length) return;

  const table = document.getElementById(host.dataset.tableId || "");
  const live = document.getElementById(host.dataset.liveId || "");
  const fb = host.querySelector(".qti-3d-fallback");
  const btn3d = document.querySelector(`[data-kpi3d-mode="3d"][data-target="${host.id}"]`);
  const btn2d = document.querySelector(`[data-kpi3d-mode="2d"][data-target="${host.id}"]`);

  let activeIdx = 0;
  let highlightBar = () => {};

  const selectPeer = (idx) => {
    activeIdx = idx;
    if (table) {
      table.querySelectorAll("tbody tr").forEach((tr, i) => tr.classList.toggle("is-hl", i === idx));
    }
    highlightBar(idx);
    const r = peers[idx];
    if (live && r) live.textContent = `${r.corp} 선택됨, 기관 경쟁률 ${r.comp_num}:1`;
  };

  if (table) {
    table.querySelectorAll("tbody tr").forEach((tr, i) => {
      tr.style.cursor = "pointer";
      tr.addEventListener("click", () => selectPeer(i));
    });
  }

  if (LOW_END || !canWebGL()) return;
  const { THREE, OrbitControls, RoundedBoxGeometry } = await loadThree();
  const tip = host.querySelector(".qti-3d-tip");
  const st = createStage(THREE, OrbitControls, host, tip, { frustum: 7.4, targetY: 2.9 });
  if (fb) fb.hidden = true;

  // CVD-safe IPO palette (no violet!)
  const COLS = [0x0B7A75, 0xE0A100, 0x2BB3A6, 0x6E7F7D, 0x062A2E];
  const maxVal = Math.max(...peers.map((p) => Number(p.comp_num) || 1), 1);
  let group = new THREE.Group();
  let bars = [];
  st.scene.add(group);

  const rebuild = () => {
    st.scene.remove(group);
    group = new THREE.Group();
    st.scene.add(group);
    bars = [];
    const dark = document.documentElement.dataset.theme === "dark";
    group.add(new THREE.GridHelper(22, 16, dark ? 0x234045 : 0xd5dedc, dark ? 0x1a3034 : 0xe5ecea));
    const tCol = dark ? "#E9F5F3" : "#062A2E";
    const sCol = dark ? "#8FA5A3" : "#50605F";
    const step = 2.8;
    const startX = -((peers.length - 1) * step) / 2;
    peers.forEach((p, i) => {
      const val = Number(p.comp_num) || 1;
      const h = Math.max(0.8, (val / maxVal) * 7.6);
      const x = startX + i * step;
      const col = COLS[i % COLS.length];
      const m = new THREE.Mesh(
        new RoundedBoxGeometry(1.8, h, 1.8, 3, 0.12),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 })
      );
      m.position.set(x, h / 2, 0);
      m.castShadow = m.receiveShadow = true;
      m.userData = { idx: i, t: p.corp, v: `기관 ${val.toLocaleString()}:1 · 확약 ${p.lock_num}%`, col };
      group.add(m);
      bars.push(m);
      const s1 = makeSprite(THREE, `${val.toLocaleString()}:1`, tCol);
      s1.position.set(x, h + 0.85, 0);
      group.add(s1);
      const s2 = makeSprite(THREE, p.corp.slice(0, 6), sCol);
      s2.position.set(x, 0.25, 2.3);
      group.add(s2);
    });
    highlightBar(activeIdx);
  };

  highlightBar = (idx) => {
    bars.forEach((b, i) => {
      const on = i === idx;
      b.material.emissive.setHex(on ? b.userData.col : 0x000000);
      b.material.emissiveIntensity = on ? 0.36 : 0;
      b.scale.set(on ? 1.07 : 1, 1, on ? 1.07 : 1);
    });
  };
  rebuild();
  selectPeer(0);
  window.addEventListener("qti:theme", rebuild);

  const ray = new THREE.Raycaster();
  const pt = new THREE.Vector2();
  st.renderer.domElement.addEventListener("pointermove", (e) => {
    const r = st.renderer.domElement.getBoundingClientRect();
    pt.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(pt, st.cam);
    const hit = ray.intersectObjects(bars)[0]?.object || null;
    if (hit && tip) {
      tip.innerHTML = `${hit.userData.t}<br><b>${hit.userData.v}</b>`;
      tip.style.left = `${e.clientX - r.left + 12}px`;
      tip.style.top = `${e.clientY - r.top + 12}px`;
      tip.style.opacity = "1";
      st.renderer.domElement.style.cursor = "pointer";
    } else if (tip) {
      tip.style.opacity = "0";
      st.renderer.domElement.style.cursor = "grab";
    }
  });
  st.renderer.domElement.addEventListener("click", (e) => {
    const r = st.renderer.domElement.getBoundingClientRect();
    pt.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(pt, st.cam);
    const hit = ray.intersectObjects(bars)[0]?.object;
    if (hit) selectPeer(hit.userData.idx);
  });

  if (btn3d && btn2d && fb) {
    const toggle = (is3d) => {
      btn3d.setAttribute("aria-pressed", String(is3d));
      btn2d.setAttribute("aria-pressed", String(!is3d));
      fb.hidden = is3d;
      st.renderer.domElement.style.display = is3d ? "block" : "none";
    };
    btn3d.addEventListener("click", () => toggle(true));
    btn2d.addEventListener("click", () => toggle(false));
  }

  (function loop() {
    requestAnimationFrame(loop);
    if (!st.isVisible()) return;
    st.ctrl.update();
    st.renderer.render(st.scene, st.cam);
  })();
}

/* ── Lazy Observer Boot ── */
document.querySelectorAll("[data-qti-3d]").forEach((host) => {
  const kind = host.getAttribute("data-qti-3d");
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      if (kind === "hub-hero") mountHubHero(host).catch(() => {});
      if (kind === "report-kpi") mountReportKpi(host).catch(() => {});
    },
    { rootMargin: "120px" }
  );
  io.observe(host);
});

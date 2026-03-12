import * as THREE from 'https://unpkg.com/three@0.170.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.170.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('court-canvas');
const section = document.getElementById('court-3d');
const buttons = document.querySelectorAll('.court-target');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!canvas || !section || !window.WebGLRenderingContext) {
  if (buttons.length) {
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }
} else {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d11);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(8, 6, 10);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.minDistance = 6;
  controls.maxDistance = 16;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.6;

  const ambient = new THREE.AmbientLight(0xffffff, 0.46);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(10, 12, 8);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe4007c, 0.45);
  fillLight.position.set(-8, 5, -6);
  scene.add(fillLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 10),
    new THREE.MeshStandardMaterial({ color: 0x1a1a21, roughness: 0.9, metalness: 0.08 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const courtGroup = new THREE.Group();
  scene.add(courtGroup);

  function makeCourtLines() {
    const points = [];
    const y = 0.02;

    function line(a, b) {
      points.push(a.x, y, a.z, b.x, y, b.z);
    }

    line({ x: -8, z: -4 }, { x: 8, z: -4 });
    line({ x: -8, z: 4 }, { x: 8, z: 4 });
    line({ x: -8, z: -4 }, { x: -8, z: 4 });
    line({ x: 8, z: -4 }, { x: 8, z: 4 });
    line({ x: 0, z: -4 }, { x: 0, z: 4 });
    line({ x: -3.9, z: -4 }, { x: -3.9, z: 4 });
    line({ x: 3.9, z: -4 }, { x: 3.9, z: 4 });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

    return new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({ color: 0xe2e2e2, transparent: true, opacity: 0.9 })
    );
  }

  const courtLines = makeCourtLines();
  courtGroup.add(courtLines);

  const net = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.14, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xdadade, roughness: 0.45, metalness: 0.16 })
  );
  net.position.set(0, 0.5, 0);
  courtGroup.add(net);

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a33,
    transparent: true,
    opacity: 0.25,
    roughness: 0.7,
    metalness: 0.05,
  });

  const backWallA = new THREE.Mesh(new THREE.BoxGeometry(16, 3, 0.12), wallMaterial);
  backWallA.position.set(0, 1.5, -4.02);
  const backWallB = backWallA.clone();
  backWallB.position.set(0, 1.5, 4.02);
  courtGroup.add(backWallA, backWallB);

  const sideWallA = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3, 8), wallMaterial);
  sideWallA.position.set(-8.02, 1.5, 0);
  const sideWallB = sideWallA.clone();
  sideWallB.position.set(8.02, 1.5, 0);
  courtGroup.add(sideWallA, sideWallB);

  function makeStandardMaterial(hex) {
    return new THREE.MeshStandardMaterial({
      color: hex,
      roughness: 0.45,
      metalness: 0.25,
      emissive: 0x000000,
      emissiveIntensity: 0.35,
    });
  }

  const hardware = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), makeStandardMaterial(0xe4007c));
  hardware.position.set(-5.6, 0.35, 0);
  courtGroup.add(hardware);

  const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 20), makeStandardMaterial(0xd9d9de));
  monitorStand.position.set(5.4, 1.1, -0.5);
  courtGroup.add(monitorStand);

  const monitor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.95, 0.1), makeStandardMaterial(0x26262f));
  monitor.position.set(5.4, 2.05, -0.5);
  courtGroup.add(monitor);

  const monitorGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.75), makeStandardMaterial(0xe4007c));
  monitorGlow.position.set(5.4, 2.05, -0.44);
  courtGroup.add(monitorGlow);

  function makeCameraUnit(x, z) {
    const group = new THREE.Group();

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.7, 16), makeStandardMaterial(0xccccd4));
    pole.position.y = 1.35;

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), makeStandardMaterial(0xe4007c));
    body.position.set(0, 2.62, 0);

    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 18), makeStandardMaterial(0x111114));
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 2.62, 0.16);

    group.add(pole, body, lens);
    group.position.set(x, 0, z);
    return group;
  }

  const cameraA = makeCameraUnit(-2.8, -3.7);
  const cameraB = makeCameraUnit(2.8, 3.7);
  courtGroup.add(cameraA, cameraB);

  const highlightMeshes = [hardware, monitor, monitorGlow, ...cameraA.children, ...cameraB.children];
  const explodeParts = {
    hardware,
    monitor,
    monitorStand,
    monitorGlow,
    cameras: new THREE.Group(),
  };

  explodeParts.cameras.add(cameraA, cameraB);

  const explodeVectors = {
    hardware: new THREE.Vector3(-0.9, 0.4, 0),
    monitor: new THREE.Vector3(1, 1.1, 0),
    monitorStand: new THREE.Vector3(1, 0.8, 0),
    monitorGlow: new THREE.Vector3(1, 1.1, 0),
    cameras: new THREE.Vector3(0, 1.3, 0),
  };

  Object.entries(explodeParts).forEach(([key, part]) => {
    part.userData.basePosition = part.position.clone();
    part.userData.explodeVector = explodeVectors[key] || new THREE.Vector3();
  });

  function setHighlight(target) {
    highlightMeshes.forEach((mesh) => {
      if (mesh.material && mesh.material.emissive) {
        mesh.material.emissive.setHex(0x000000);
      }
    });

    const groups = {
      hardware: [hardware],
      monitor: [monitor, monitorGlow, monitorStand],
      cameras: [...cameraA.children, ...cameraB.children],
    };

    const selected = groups[target] || groups.hardware;
    selected.forEach((mesh) => {
      if (mesh.material && mesh.material.emissive) {
        mesh.material.emissive.setHex(0xe4007c);
      }
    });

    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.target === target);
    });
  }

  setHighlight('hardware');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setHighlight(button.dataset.target || 'hardware');
    });
  });

  const sectionProgress = {
    target: 0,
    current: 0,
  };

  function updateTargetProgress() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    const start = vh * 0.75;
    const end = -rect.height * 0.25;
    const raw = (start - rect.top) / (start - end);
    sectionProgress.target = THREE.MathUtils.clamp(raw, 0, 1);
  }

  function applyDeconstruction(progress) {
    Object.values(explodeParts).forEach((part) => {
      const base = part.userData.basePosition;
      const vector = part.userData.explodeVector;
      part.position.copy(base).addScaledVector(vector, progress);
    });
  }

  function resizeRenderer() {
    const bounds = canvas.parentElement.getBoundingClientRect();
    const width = Math.max(1, Math.floor(bounds.width));
    const height = Math.max(1, Math.floor(bounds.height));

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(canvas.parentElement);

  window.addEventListener('scroll', updateTargetProgress, { passive: true });
  window.addEventListener('resize', updateTargetProgress);

  updateTargetProgress();
  resizeRenderer();

  const clock = new THREE.Clock();

  function animate() {
    const delta = clock.getDelta();

    sectionProgress.current += (sectionProgress.target - sectionProgress.current) * Math.min(1, delta * 7.5);
    applyDeconstruction(sectionProgress.current);

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

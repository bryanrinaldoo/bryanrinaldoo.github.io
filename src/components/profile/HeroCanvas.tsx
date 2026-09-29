'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLS = 90;
const ROWS = 45;
const GAP = 0.35;

/**
 * Mounts the WebGL scene into the container.
 * @param container The element that hosts the canvas.
 * @returns Cleanup that stops the animation and frees GPU resources.
 */
const mountScene = (container: HTMLDivElement) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 5, 11);
  camera.lookAt(0, 0, 0);

  const positions = new Float32Array(COLS * ROWS * 3);
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const i = (r * COLS + c) * 3;
      positions[i] = (c - COLS / 2) * GAP;
      positions[i + 2] = (r - ROWS / 2) * GAP;
    }
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  geometry.setAttribute('position', positionAttribute);
  const material = new THREE.PointsMaterial({
    color: 0x11_11_11,
    size: 0.05,
    transparent: true,
    opacity: 0.45,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const mouse = new THREE.Vector2();
  const target = new THREE.Vector3(999, 0, 999);
  const cursor = target.clone();
  const raycaster = new THREE.Raycaster();
  const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  const onPointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    mouse.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(floor, target);
  };

  const resize = () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };

  const timer = new THREE.Timer();
  let frame = 0;

  const render = () => {
    timer.update();
    const time = timer.getElapsed();
    cursor.lerp(target, 0.08);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i] ?? 0;
      const z = positions[i + 2] ?? 0;
      const distance = Math.hypot(x - cursor.x, z - cursor.z);
      const bump = Math.exp(-distance * distance * 0.5) * 1.2;
      positions[i + 1] =
        Math.sin(x * 0.6 + time) * 0.25 + Math.cos(z * 0.8 + time * 0.8) * 0.25 + bump;
    }
    positionAttribute.needsUpdate = true;

    // Scroll parallax: camera sinks and the field turns as the hero leaves the viewport
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y = 5 - scroll * 3;
    camera.lookAt(0, -scroll * 2, 0);
    points.rotation.y = scroll * 0.5;

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  window.addEventListener('pointermove', onPointerMove);
  resize();
  render();

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
};

/**
 * Renders an animated dot-wave that bulges under the cursor and tilts on scroll.
 * @returns The canvas container.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  // Imperative WebGL setup needs an effect; there is no declarative alternative here.
  useEffect(() => (ref.current ? mountScene(ref.current) : undefined), []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_65%)]"
    />
  );
}

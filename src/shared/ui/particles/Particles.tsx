"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticlesProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  className?: string;
}

/**
 * Three.js star-dust field with mouse-parallax camera.
 * Ported from ScrollX UI's particles; the sprite texture is generated
 * on a canvas at runtime instead of loading /assets/disc.png, and the
 * hue-cycling is dropped to stay on-palette.
 */
const createDiscTexture = (): THREE.Texture => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export const Particles = ({
  color = "#818cf8",
  particleCount = 1200,
  particleSize = 10,
  className = "",
}: ParticlesProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      2,
      2000
    );
    camera.position.z = 1000;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02030a, 0.0012);

    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    for (let particleIndex = 0; particleIndex < particleCount; particleIndex++) {
      vertices.push(
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000,
        2000 * Math.random() - 1000
      );
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      size: particleSize,
      sizeAttenuation: true,
      map: createDiscTexture(),
      alphaTest: 0.1,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    material.color.setStyle(color);

    scene.add(new THREE.Points(geometry, material));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      mouseX = (event.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.4;
    };

    const renderLoop = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    renderLoop();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      material.map?.dispose();
      material.dispose();
      geometry.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [color, particleCount, particleSize]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default Particles;

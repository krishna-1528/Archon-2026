import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const THEME = {
  cyan: '#00f2ff',
  magenta: '#ff00ff',
  base: '#12002b' // BRIGHTER: Deep Saturated Violet instead of black
};

function ReactiveGeometry({ count = 60 }) {
  const group = useRef();
  const { mouse } = useThree();
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      // CLEAR CENTER: Most particles spawn at the edges (left/right)
      const isCenter = Math.random() > 0.85;
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = isCenter ? (Math.random() - 0.5) * 4 : (Math.random() * 12 + 8) * side;

      return {
        position: [x, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.5 ? THEME.cyan : THEME.magenta,
        opacity: isCenter ? 0.1 : 0.4 
      };
    });
  }, [count]);

  useFrame(() => {
    // FULL SCREEN INTERACTION: group tilts based on X and Y mouse position
    const targetX = mouse.x * 1.2;
    const targetY = mouse.y * 0.8;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Float key={i} speed={2.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={p.position} rotation={p.rotation} scale={p.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={p.color} wireframe transparent opacity={p.opacity} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const GamingPortalBG = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#12002b]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
        
        {/* Luminous Stars for high-end depth */}
        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />

        {/* BRIGHTER GRID: High visibility Magenta/Cyan grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
          <planeGeometry args={[180, 180, 50, 50]} />
          <meshBasicMaterial color={THEME.cyan} wireframe transparent opacity={0.15} />
        </mesh>

        <ReactiveGeometry />
        
        {/* MAXIMUM BRIGHTNESS LIGHTING */}
        <ambientLight intensity={1.5} />
        <pointLight position={[20, 20, 20]} intensity={3} color={THEME.cyan} />
        <pointLight position={[-20, -20, 20]} intensity={3} color={THEME.magenta} />
      </Canvas>

      {/* Cinematic Luminous Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#12002b_130%)] pointer-events-none" />
    </div>
  );
};

export default GamingPortalBG;
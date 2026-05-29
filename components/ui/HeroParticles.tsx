import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Explicitly cast R3F elements to 'any' to bypass TS introspection issues with intrinsic elements
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

const ParticleField = () => {
  const mesh = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const count = 2500;

  // Generate random vertices
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // randFloatSpread(100) equivalent
      positions[i * 3] = (Math.random() - 0.5) * 100; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Rotate particles gently
    mesh.current.rotation.x += 0.0005;
    mesh.current.rotation.y += 0.0005;

    // Mouse Interaction
    // Calculate target based on mouse (-1 to 1) mapped to viewport
    const targetX = (mouse.x * viewport.width) / 100;
    const targetY = (mouse.y * viewport.height) / 100;

    // Smooth lerp for parallax
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (-targetY - mesh.current.position.y) * 0.05;
  });

  return (
    <Points ref={mesh}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial 
        color={0x4f46e5} 
        size={0.15} 
        sizeAttenuation={true} 
        transparent={true}
        opacity={0.8}
        depthWrite={false} // OPTIMIZATION: Disable depth write for transparent particles
      />
    </Points>
  );
};

const HeroParticles: React.FC = () => {
  return (
    <div id="bg-canvas-container" className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]} // Cap DPR to 1.5 for performance
        gl={{ 
          antialias: false, // OPTIMIZATION: Disable AA for background particles
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true 
        }}
        camera={{ position: [0, 0, 30], fov: 75 }} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default HeroParticles;
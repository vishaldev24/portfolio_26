import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing types by using explicitly cast constants
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const HemisphereLight = 'hemisphereLight' as any;
const Group = 'group' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

const TechNode = () => {
  const meshRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !lightRef.current) return;

    if (!reducedMotion) {
        // 3D Tilt Effect based on mouse position (Spatial UI)
        // Convert normalized mouse (-1 to 1) to rotation values
        const targetRotX = (mouse.y * viewport.height) / 20; // Tilt up/down
        const targetRotY = (mouse.x * viewport.width) / 20;  // Tilt left/right

        // Smooth interpolation (lerp)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetRotX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
        
        // Slight hover float
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Light follows mouse for realistic reflection
    // Map mouse range to 3D space coordinates approx
    lightRef.current.position.x = mouse.x * 5;
    lightRef.current.position.y = mouse.y * 5;
  });

  return (
    <>
      <AmbientLight intensity={0.5} />
      {/* Reduced intensity slightly as Standard material reflects differently than Physical */}
      <PointLight ref={lightRef} position={[0, 0, 5]} intensity={40} distance={10} color="#3B82F6" />
      <HemisphereLight intensity={0.2} groundColor="#000000" />

      <Group ref={meshRef}>
        {/* Main "Phone" or "Super App" block */}
        {/* OPTIMIZATION: smoothness reduced from 4 to 2 to save vertex count */}
        <RoundedBox args={[2.2, 4.5, 0.2]} radius={0.15} smoothness={2}>
          {/* OPTIMIZATION: Replaced MeshPhysicalMaterial with MeshStandardMaterial for better performance */}
          <MeshStandardMaterial 
            color="#111" 
            roughness={0.2} 
            metalness={0.8} 
          />
        </RoundedBox>

        {/* Screen/Interface Element (Abstract) */}
        <RoundedBox position={[0, 0, 0.11]} args={[2, 4.3, 0.01]} radius={0.1} smoothness={2}>
          <MeshBasicMaterial color="#000" />
        </RoundedBox>
        
        {/* "UI" Elements glowing */}
        <RoundedBox position={[0, 0.5, 0.12]} args={[1.5, 1.5, 0.01]} radius={0.75} smoothness={2}>
             <MeshStandardMaterial 
                color="#3B82F6" 
                emissive="#3B82F6" 
                emissiveIntensity={2}
                roughness={0.4}
             />
        </RoundedBox>
        
        <RoundedBox position={[0, -1, 0.12]} args={[1.5, 0.2, 0.01]} radius={0.05} smoothness={1}>
            <MeshStandardMaterial color="#444" roughness={0.5} />
        </RoundedBox>
         <RoundedBox position={[0, -1.4, 0.12]} args={[1.5, 0.2, 0.01]} radius={0.05} smoothness={1}>
            <MeshStandardMaterial color="#444" roughness={0.5} />
        </RoundedBox>

      </Group>
    </>
  );
};

const Tarang3D: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas 
        dpr={[1, 1.5]} // OPTIMIZATION: Clamp pixel ratio for mobile performance
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          stencil: false // OPTIMIZATION: Disable stencil buffer
        }}
      >
        <TechNode />
      </Canvas>
    </div>
  );
};

export default Tarang3D;
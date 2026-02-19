
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

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
        const targetRotX = (mouse.y * viewport.height) / 40; 
        const targetRotY = (mouse.x * viewport.width) / 40;  

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetRotX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
        
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    lightRef.current.position.x = mouse.x * 2;
    lightRef.current.position.y = mouse.y * 2;
  });

  return (
    <>
      <AmbientLight intensity={0.4} />
      <PointLight ref={lightRef} position={[0, 0, 4]} intensity={25} distance={8} color="#3B82F6" />
      <HemisphereLight intensity={0.3} groundColor="#000000" />

      <Group ref={meshRef}>
        <RoundedBox args={[2.2, 4.5, 0.2]} radius={0.12} smoothness={1}>
          <MeshStandardMaterial 
            color="#080808" 
            roughness={0.15} 
            metalness={0.9} 
          />
        </RoundedBox>

        <RoundedBox position={[0, 0, 0.11]} args={[2, 4.3, 0.01]} radius={0.08} smoothness={1}>
          <MeshBasicMaterial color="#000" />
        </RoundedBox>
        
        <RoundedBox position={[0, 0.5, 0.12]} args={[1.4, 1.4, 0.01]} radius={0.7} smoothness={2}>
             <MeshStandardMaterial 
                color="#3B82F6" 
                emissive="#3B82F6" 
                emissiveIntensity={1.5}
                roughness={0.3}
             />
        </RoundedBox>
        
        <RoundedBox position={[0, -1, 0.12]} args={[1.4, 0.15, 0.01]} radius={0.04} smoothness={1}>
            <MeshStandardMaterial color="#222" roughness={0.6} />
        </RoundedBox>
         <RoundedBox position={[0, -1.3, 0.12]} args={[1.4, 0.15, 0.01]} radius={0.04} smoothness={1}>
            <MeshStandardMaterial color="#222" roughness={0.6} />
        </RoundedBox>
      </Group>
    </>
  );
};

const Tarang3D: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 8], fov: 35 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false
        }}
        onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
        }}
      >
        <TechNode />
      </Canvas>
    </div>
  );
};

export default Tarang3D;

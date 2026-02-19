import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Octahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Intrinsic elements casting
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const PrecisionObject = () => {
    const groupRef = useRef<THREE.Group>(null);
    const outerRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock, mouse, viewport }) => {
        if (!groupRef.current || !outerRef.current || !innerRef.current) return;
        
        const t = clock.getElapsedTime();

        // Base Rotation
        groupRef.current.rotation.y = t * 0.1;
        
        // Mouse Interaction (Parallax)
        const x = (mouse.x * viewport.width) / 10;
        const y = (mouse.y * viewport.height) / 10;
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.1);

        // Individual part animations
        outerRef.current.rotation.x = t * 0.2;
        outerRef.current.rotation.z = t * 0.1;
        
        innerRef.current.rotation.x = -t * 0.4;
        innerRef.current.rotation.y = t * 0.5;
    });

    return (
        <Group ref={groupRef} scale={1.2}>
            {/* Outer Wireframe - Structure/Engineering */}
            <Icosahedron ref={outerRef} args={[1, 1]}>
                <MeshStandardMaterial 
                    color="#4f46e5" 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                />
            </Icosahedron>

            {/* Inner Core - Product/Experience */}
            <Octahedron ref={innerRef} args={[0.5, 0]}>
                <MeshDistortMaterial
                    color="#ffffff"
                    emissive="#4f46e5"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.4}
                    speed={2}
                />
            </Octahedron>
        </Group>
    );
};

const PrecisionShape: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <AmbientLight intensity={0.5} />
        <PointLight position={[10, 10, 10]} intensity={10} color="#818cf8" />
        <PointLight position={[-10, -10, -10]} intensity={5} color="#c084fc" />
        <PrecisionObject />
      </Canvas>
    </div>
  );
};

export default PrecisionShape;
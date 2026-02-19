import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Intrinsic elements casting for TS
const Group = 'group' as any;

const skills = [
  "React", "TypeScript", "Next.js", "Three.js", "Figma", 
  "Node.js", "GSAP", "Tailwind", "WebGL", "UX Research", 
  "Prototyping", "Framing", "Blender", "System Design",
  "A11y", "Git", "CI/CD", "Testing"
];

interface WordProps {
  children: React.ReactNode;
  position: THREE.Vector3; // Current target position
  isDark: boolean;
}

const Word: React.FC<WordProps> = ({ children, position, isDark }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ camera }) => {
    if (!ref.current) return;
    
    // Smoothly interpolate to target position
    ref.current.position.lerp(position, 0.1);
    
    // Always face camera
    ref.current.quaternion.copy(camera.quaternion);
    
    // Hover scale effect
    const targetScale = hovered ? 1.25 : 1;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const defaultColor = isDark ? '#ffffff' : '#1c1c1c';
  const hoverColor = '#4f46e5';

  return (
    <Text
      ref={ref}
      fontSize={0.9} // Reduced from 1.1 to fit grid better
      color={hovered ? hoverColor : defaultColor}
      anchorX="center"
      anchorY="middle"
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {children}
    </Text>
  );
};

interface CloudProps {
    isGrid: boolean;
    radius?: number;
}

const Cloud: React.FC<CloudProps> = ({ isGrid, radius = 10 }) => {
  const [isDark, setIsDark] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // 1. Calculate Spherical Positions
  const sphericalPositions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < skills.length; i++) {
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [radius]);

  // 2. Calculate Grid Positions
  const gridPositions = useMemo(() => {
    const temp = [];
    const cols = 3;
    // Reduced spacing to make the grid more compact
    const xSpacing = 6; 
    const ySpacing = 2.4; 
    
    // Center the grid
    // Rows = 6 (18/3)
    // Width = 2 * 6 = 12
    // Height = 5 * 2.4 = 12
    
    for (let i = 0; i < skills.length; i++) {
        const col = i % cols; // 0, 1, 2
        const row = Math.floor(i / cols); // 0 to 5
        
        const x = (col - 1) * xSpacing; // -6, 0, 6
        const y = -(row - 2.5) * ySpacing; // Centered vertically
        const z = 0;
        
        temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame((state) => {
      if (!groupRef.current) return;

      if (isGrid) {
          // In Grid mode: Stop rotation, orient to front
          // Smoothly reset rotation to 0
          groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
          groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
          groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);

          // Gently pull camera back to center if user moved it. 
          // Increased Z distance to 28 to ensure grid fits on narrower screens (mobile)
          state.camera.position.lerp(new THREE.Vector3(0, 0, 28), 0.05);
          state.camera.lookAt(0,0,0);
      } else {
          // In Sphere mode: Continuous slow rotation
          groupRef.current.rotation.y += 0.001;
          groupRef.current.rotation.x += 0.0005;
      }
  });

  return (
    <Group ref={groupRef}>
      {skills.map((skill, index) => (
        <Word 
            key={index} 
            position={isGrid ? gridPositions[index] : sphericalPositions[index]} 
            isDark={isDark}
        >
            {skill}
        </Word>
      ))}
    </Group>
  );
};

interface Skill3DProps {
    isGrid: boolean;
    toggleGrid: () => void;
}

const Skill3D: React.FC<Skill3DProps> = ({ isGrid, toggleGrid }) => {
  return (
    <div 
        className="w-full h-full cursor-pointer active:cursor-grabbing transition-colors duration-300"
        onClick={toggleGrid}
        title={isGrid ? "Click to view sphere" : "Click to organize view"}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 22], fov: 50 }}>
        <Cloud radius={10} isGrid={isGrid} />
        {/* Only enable orbit controls when in sphere mode to allow free exploration */}
        <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enabled={!isGrid} // Disable rotation interaction in grid mode
            autoRotate={false} 
            rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Skill3D;
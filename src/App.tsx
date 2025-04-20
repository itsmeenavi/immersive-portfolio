import React, { useState, useEffect, useRef, Suspense, lazy } from 'react' // Keep necessary hooks, add Suspense, lazy
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Stars, RoundedBox } from '@react-three/drei' // Removed Html
import * as THREE from 'three'
import './App.css'

// --- 3D Components ---
// Consistent material for section representation (e.g., planets)
const sectionMaterial = new THREE.MeshStandardMaterial({ color: '#9b59b6', roughness: 0.4, metalness: 0.1 });
const selectedMaterial = new THREE.MeshStandardMaterial({ color: '#f1c40f', emissive: '#f1c40f', emissiveIntensity: 0.6, toneMapped: false });

// Component for Section Representation (changed to RoundedBox)
function SectionRepresentation(
  { position, label, onClick, isSelected }: 
  { position: [number, number, number]; label: string; onClick: () => void; isSelected: boolean }
) {
  const [hovered, setHover] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[1.6, 1.6, 1.6]}
        radius={0.2}
        smoothness={4}
        material={isSelected ? selectedMaterial : sectionMaterial}
        onClick={onClick}
        onPointerOver={(event) => { event.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        scale={hovered ? 1.1 : 1}
      />
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="black"
        visible={hovered || isSelected}
      >
        {label}
      </Text>
    </group>
  );
}

// --- Dynamic Content Loader ---
const contentComponents: {
  [key: string]: React.LazyExoticComponent<React.FC<{}>>
} = {
  AboutMe: lazy(() => import('./components/content/AboutMeContent')),
  Skills: lazy(() => import('./components/content/SkillsContent')),
  Education: lazy(() => import('./components/content/EducationContent')),
  WorkExperience: lazy(() => import('./components/content/WorkExperienceContent')),
  Projects: lazy(() => import('./components/content/ProjectsContent')),
  Contact: lazy(() => import('./components/content/ContactContent')),
};

function ContentDisplay({ selectedSection }: { selectedSection: string | null }) {
  if (!selectedSection) return null;

  const ContentComponent = contentComponents[selectedSection];

  if (!ContentComponent) {
    console.warn(`Content component for ${selectedSection} not found.`);
    return null; // Or a fallback 3D element
  }

  return (
    <Suspense fallback={null}> {/* Simple fallback, maybe a loading spinner? */}
      <ContentComponent />
    </Suspense>
  );
}

// --- App Component --- 
function App() {
  const sections = [
    "AboutMe", "Skills", "Education", "WorkExperience", "Projects", "Contact",
  ];
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Section Positions Calculation
  const radius = 5;
  const sectionPositions = sections.map((_, index) => {
    const angle = (index / sections.length) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  });

  const defaultCameraPosition = new THREE.Vector3(0, 2, 10);

  return (
    <Canvas camera={{ position: defaultCameraPosition.toArray() as [number,number,number], fov: 60 }}>
      {/* Lighting & Stars */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={0.8} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Section Representations */}
      {sections.map((section, index) => (
        <SectionRepresentation
          key={section}
          position={sectionPositions[index].toArray() as [number, number, number]}
          label={section}
          onClick={() => {
            setSelectedSection(section === selectedSection ? null : section)
          }}
          isSelected={selectedSection === section}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={20}
      />

      {/* Render the 3D Content Display */}
      <ContentDisplay selectedSection={selectedSection} />

    </Canvas>
  );
}

export default App;

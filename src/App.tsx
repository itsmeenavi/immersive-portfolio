import React, { useState, useEffect, useRef, Suspense, lazy, useMemo, useCallback } from 'react' // Keep necessary hooks, add Suspense, lazy, useMemo, useCallback
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Stars, Sphere } from '@react-three/drei' // Removed Html
import * as THREE from 'three'
import './App.css'
import InfoConsole from './components/InfoConsole'

// --- 3D Components ---
// Base material for planets
const basePlanetMaterial = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.1 });
const selectedMaterial = new THREE.MeshStandardMaterial({ color: '#f1c40f', emissive: '#f1c40f', emissiveIntensity: 0.8, toneMapped: false });

// Simple color variations for planets
const planetColors = ['#9b59b6', '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#1abc9c'];

// Component for Section Representation (changed to Sphere)
function SectionRepresentation(
  { position, label, onClick, isSelected, color }: 
  { position: [number, number, number]; label: string; onClick: () => void; isSelected: boolean; color: string }
) {
  const [hovered, setHover] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null!);

  // Create a unique material instance for each planet to set color
  const planetMaterial = useMemo(() => {
    const mat = basePlanetMaterial.clone();
    mat.color.set(color);
    return mat;
  }, [color]);

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.8, 32, 32]} // radius, widthSegments, heightSegments
        material={isSelected ? selectedMaterial : planetMaterial}
        onClick={onClick}
        onPointerOver={(event) => { event.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        scale={hovered ? 1.2 : 1} // Slightly larger hover effect
      />
      <Text
        position={[0, 1.1, 0]} // Adjust label position for sphere
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
  [key: string]: React.LazyExoticComponent<React.FC<{ 
    panelWidth: number; 
    panelHeight: number; 
  }>>;
} = {
  AboutMe: lazy(() => import('./components/content/AboutMeContent')),
  Skills: lazy(() => import('./components/content/SkillsContent')),
  Education: lazy(() => import('./components/content/EducationContent')),
  WorkExperience: lazy(() => import('./components/content/WorkExperienceContent')),
  Projects: lazy(() => import('./components/content/ProjectsContent')),
  Contact: lazy(() => import('./components/content/ContactContent')),
};

// ContentDisplay - Now with dynamic height
function ContentDisplay({ selectedSection }: { selectedSection: string | null }) {

  if (!selectedSection) return null;

  const ContentComponent = contentComponents[selectedSection];

  if (!ContentComponent) {
    console.warn(`Content component for ${selectedSection} not found.`);
    return null;
  }

  // --- Define Console Dimensions Dynamically ---
  let consoleWidth = 5.5; // Standard width
  let consoleHeight = 3.5; // Standard height

  // Adjust dimensions for specific sections
  switch (selectedSection) {
    case 'WorkExperience':
    case 'Projects':
      consoleHeight = 5.0; // Taller for these
      break;
    case 'Skills':
      consoleHeight = 4.0; // Medium height
      break;
    case 'Contact':
      consoleHeight = 2.0; // Shorter
      consoleWidth = 4.0;  // Narrower
      break;
    case 'Education':
         consoleHeight = 4.0; // Education might need medium height too
         break;
    // Keep default for AboutMe
  }
  // -------------------------------------------

  return (
    <Suspense fallback={null}> 
      <InfoConsole 
        width={consoleWidth} // Use dynamic width
        height={consoleHeight} // Use dynamic height
        position={[0, 0.5, 2]}
      >
        {/* Pass dynamic dimensions */}
        <ContentComponent 
          panelWidth={consoleWidth} 
          panelHeight={consoleHeight} 
        />
      </InfoConsole>
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
    <Canvas style={{ background: '#000000' }} camera={{ position: defaultCameraPosition.toArray() as [number,number,number], fov: 60 }}>
      {/* Lighting & Stars */}
      <ambientLight intensity={0.3} /> {/* Slightly dimmer ambient */}
      <pointLight position={[0, 10, 10]} intensity={0.7} />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <Stars 
        radius={80} // Smaller radius to bring them closer
        depth={40} 
        count={7000} // More stars
        factor={5} // Slightly larger points
        saturation={0} 
        fade // Keep fade effect
        speed={0.5} // Slower speed
      />

      {/* Section Representations (Planets) */}
      {sections.map((section, index) => (
        <SectionRepresentation
          key={section}
          position={sectionPositions[index].toArray() as [number, number, number]}
          label={section}
          color={planetColors[index % planetColors.length]}
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
        minDistance={3} // Adjust min distance for planets
        maxDistance={25}
      />

      {/* Render the ContentDisplay (which now renders the InfoConsole) */}
      <ContentDisplay selectedSection={selectedSection} />

    </Canvas>
  );
}

export default App;

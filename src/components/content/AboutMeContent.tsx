import React from 'react';
import { Billboard, Plane, Text } from '@react-three/drei';
import * as THREE from 'three';

// Basic hologram material
const hologramMaterial = new THREE.MeshStandardMaterial({
  color: '#00ffff', // Cyan color
  emissive: '#00ffff', // Make it glow
  emissiveIntensity: 0.6,
  transparent: true,
  opacity: 0.6,
  roughness: 0.6,
  metalness: 0.2,
  side: THREE.DoubleSide, // Render both sides
  depthWrite: false, // Prevent writing to depth buffer for better transparency
  blending: THREE.AdditiveBlending // Additive blending for glow effect
});

const textMaterial = hologramMaterial.clone();
textMaterial.emissiveIntensity = 1.0; // Make text brighter
textMaterial.opacity = 0.8;

const AboutMeContent: React.FC = () => {
  // Extracting data - could eventually fetch or receive as props
  const name = "Ivhan Salazar";
  const title = "Aspiring Full Stack Developer";
  const bio = "I am an aspiring software developer with a keen focus on delivering top-tier quality... always pushing myself to achieve the best possible outcomes."; // Shortened for example

  const maxWidth = 4; // Max width of the hologram plane

  return (
    <Billboard
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false} // Lock rotation if needed?
      position={[0, 1, -3]} // Position relative to the selected object/center
    >
      {/* Background Plane */}
      <Plane args={[maxWidth, 2.5]} material={hologramMaterial}>
        {/* You might add textures or shaders here later for scan lines etc. */}
      </Plane>

      {/* Text Content - Position relative to the plane */}
      <Text
        material={textMaterial}
        fontSize={0.25}
        color={textMaterial.emissive} // Use emissive color for Text
        position={[0, 0.8, 0.01]} // Slightly in front of the plane
        anchorX="center"
        anchorY="top"
        maxWidth={maxWidth * 0.9}
      >
        {name}
      </Text>
      <Text
        material={textMaterial}
        fontSize={0.15}
        color={textMaterial.emissive}
        position={[0, 0.5, 0.01]}
        anchorX="center"
        anchorY="top"
        fontStyle="italic"
        maxWidth={maxWidth * 0.9}
      >
        {title}
      </Text>
      <Text
        material={textMaterial}
        fontSize={0.12}
        color={textMaterial.emissive}
        position={[0, 0.3, 0.01]}
        anchorX="center"
        anchorY="top"
        textAlign="justify"
        lineHeight={1.5}
        maxWidth={maxWidth * 0.9}
      >
        {bio}
      </Text>
      {/* Add links/resume as Text elements or maybe simple geometries later */}

    </Billboard>
  );
};

export default AboutMeContent; 
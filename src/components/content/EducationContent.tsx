import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Adjusted Materials for Console (Copied from others) ---
const consoleTextMaterial = new THREE.MeshStandardMaterial({
  color: '#E0F8F8', emissive: '#A0FFFF', emissiveIntensity: 0.2, 
  roughness: 0.6, metalness: 0.1, transparent: true, opacity: 0.9,
});

const consoleDetailTextMaterial = consoleTextMaterial.clone();
consoleDetailTextMaterial.color.set('#B0E0E0');
consoleDetailTextMaterial.emissiveIntensity = 0.1;
consoleDetailTextMaterial.opacity = 0.8;
// -----------

// --- Data --- 
const educationData = [
  { institution: 'Sacred Heart Academy Pasig', degree: 'Elementary', years: '2008 - 2014' },
  { institution: 'Pasig Catholic College', degree: 'Junior High School', years: '2014 - 2018' },
  { institution: 'STI College Global City', degree: 'Senior High School', years: '2018 - 2020' },
  { institution: 'PUP Sta Mesa', degree: 'Diploma in Information Technology', years: '2020 - 2023' },
  { institution: 'Lyceum of Alabang', degree: 'Bachelor of Science in Information Technology', years: '2024 - 2025' },
];
// ----------

// --- Props Interface ---
interface EducationContentProps {
    panelWidth: number;
    panelHeight: number;
    // Removed scroll props
}

const EducationContent: React.FC<EducationContentProps> = ({ 
    panelWidth, 
    panelHeight 
}) => {
  
  // Layout constants using props
  const itemSpacing = 0.5;
  const topPadding = 0.2; // Padding from console top

  // Adjusted start positions relative to console center
  const startY = panelHeight / 2 - topPadding - 0.1; // Start below padding
  const yearX = -panelWidth / 2 + 0.5; 
  const detailX = -panelWidth / 2 + 1.5; 
  const detailMaxWidth = panelWidth - (detailX - (-panelWidth / 2)) - 0.3; // Calculate based on detailX and right margin

  return (
    <group position={[0, 0, 0]}> 
      {/* Education List - No scroll group needed for now */}
      {educationData.map((item, index) => {
        // Calculate Y relative to the container's top (startY)
        const yPos = startY - index * itemSpacing; 

        // Removed visibility check

        return (
          <group key={index} position={[0, yPos, 0.01]}> 
            {/* Years */}
            <Text
              material={consoleDetailTextMaterial}
              fontSize={0.1}
              color={consoleDetailTextMaterial.color}
              position={[yearX, 0.05, 0]} 
              anchorX="left"
              anchorY="top"
            >
              {item.years}
            </Text>
            {/* Institution */}
            <Text
              material={consoleTextMaterial} // Use main text material
              fontSize={0.14}
              color={consoleTextMaterial.color}
              position={[detailX, 0, 0]} 
              anchorX="left"
              anchorY="top"
              maxWidth={detailMaxWidth}
            >
              {item.institution}
            </Text>
            {/* Degree */}
            <Text
              material={consoleDetailTextMaterial}
              fontSize={0.11}
              color={consoleDetailTextMaterial.color}
              position={[detailX, -0.16, 0]} 
              anchorX="left"
              anchorY="top"
              maxWidth={detailMaxWidth}
              fontStyle="italic"
            >
              {item.degree}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default EducationContent; 
import React, { useMemo } from 'react';
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

// --- Props Interface ---
interface AboutMeContentProps {
    panelWidth: number;
    panelHeight: number;
}

const AboutMeContent: React.FC<AboutMeContentProps> = ({ 
    panelWidth, 
    panelHeight, 
}) => {

  // --- Data ---
  const name = "Ivhan Salazar";
  const title = "Aspiring Full Stack Developer";
  const bio = "I am an aspiring software developer with a keen focus on delivering top-tier quality. I thrive on challenges and continuously seek opportunities to expand my skill set, always pushing myself to achieve the best possible outcomes."; // Full bio
  // ----------

  // Layout constants using panelWidth
  const contentMaxWidth = panelWidth * 0.9; 
  const topPadding = 0.2; // Padding from console top edge

  // Position elements relative to console center and topPadding
  const nameY = panelHeight / 2 - topPadding - 0.1; // Adjust Y based on panelHeight
  const titleY = nameY - 0.3;
  const bioY = titleY - 0.25;

  return (
    <group position={[0, 0, 0]}> {/* Base group at console center */}
        {/* Content positioned relative to console center/top */}
        <Text
            material={consoleTextMaterial}
            fontSize={0.25}
            color={consoleTextMaterial.color}
            position={[0, nameY, 0.01]} // Use calculated Y
            anchorX="center"
            anchorY="top"
            maxWidth={contentMaxWidth}
        >
            {name}
        </Text>
        <Text
            material={consoleDetailTextMaterial} // Use detail material for title
            fontSize={0.15}
            color={consoleDetailTextMaterial.color}
            position={[0, titleY, 0.01]} // Use calculated Y
            anchorX="center"
            anchorY="top"
            fontStyle="italic"
            maxWidth={contentMaxWidth}
        >
            {title}
        </Text>
        <Text
            material={consoleDetailTextMaterial}
            fontSize={0.12}
            color={consoleDetailTextMaterial.color}
            position={[0, bioY, 0.01]} // Use calculated Y
            anchorX="center"
            anchorY="top"
            textAlign="justify"
            lineHeight={1.5}
            maxWidth={contentMaxWidth}
        >
            {bio}
        </Text>
    </group>
  );
};

export default AboutMeContent; 
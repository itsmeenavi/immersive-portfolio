import React from 'react';
import { Billboard, Plane, Text } from '@react-three/drei';
import * as THREE from 'three';

// Basic hologram material (copied from AboutMeContent)
const hologramMaterial = new THREE.MeshStandardMaterial({
  color: '#00ffff', emissive: '#00ffff', emissiveIntensity: 0.6, 
  transparent: true, opacity: 0.6, roughness: 0.6, metalness: 0.2,
  side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
});

const textMaterial = hologramMaterial.clone();
textMaterial.emissiveIntensity = 1.0; textMaterial.opacity = 0.8;

// Create a separate, dimmer material for the level text
const levelTextMaterial = textMaterial.clone();
levelTextMaterial.opacity = textMaterial.opacity * 0.7; // Make it dimmer than the name
levelTextMaterial.emissiveIntensity = textMaterial.emissiveIntensity * 0.8;

// --- Data --- (Hardcoded for now)
const skillsData = [
  { name: 'HTML5', level: 'Advanced' }, { name: 'CSS3', level: 'Intermediate' }, { name: 'JavaScript', level: 'Intermediate' },
  { name: 'React', level: 'Novice' }, { name: 'Next.js', level: 'Beginner' }, { name: 'Node.js', level: 'Beginner' },
  { name: 'Bootstrap', level: 'Novice' }, { name: 'Tailwind CSS', level: 'Beginner' }, { name: 'Sass', level: 'Beginner' },
  { name: 'PHP', level: 'Novice' }, { name: 'MySQL', level: 'Novice' }, { name: 'Firebase', level: 'Novice' },
  { name: 'Flutter', level: 'Novice' }, { name: 'Dart', level: 'Novice' }, { name: 'C', level: 'Beginner' },
  { name: 'C++', level: 'Beginner' }, { name: 'Python', level: 'Novice' }, { name: 'Java', level: 'Novice' },
  { name: 'Git', level: 'Intermediate' }, { name: 'WordPress', level: 'Intermediate' }, { name: 'Figma', level: 'Advanced' },
  { name: 'Canva', level: 'Expert' }, { name: 'VB.NET', level: 'Novice' }, { name: 'AJAX', level: 'Novice' },
  { name: 'Odoo ERP', level: 'Novice' },
];
// ------------- 

const SkillsContent: React.FC = () => {
  const panelWidth = 5; // Wider panel for grid
  const panelHeight = 3;
  const columns = 5; // Adjust number of columns
  const columnWidth = panelWidth / columns;
  const rowHeight = 0.4; // Adjust vertical spacing
  const startX = -panelWidth / 2 + columnWidth / 2;
  const startY = panelHeight / 2 - 0.5; // Start below title
  const nameFontSize = 0.1;
  const levelFontSize = 0.08;

  return (
    <Billboard position={[0, 1, -3]}>
      {/* Background Plane */}
      <Plane args={[panelWidth, panelHeight]} material={hologramMaterial} />

      {/* Title */}
      <Text
        material={textMaterial}
        fontSize={0.25}
        color={textMaterial.emissive}
        position={[0, panelHeight / 2 - 0.2, 0.01]} // Top center
        anchorX="center"
        anchorY="top"
      >
        Skills
      </Text>

      {/* Skills Grid */}
      {skillsData.map((skill, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const xPos = startX + col * columnWidth;
        const yPos = startY - row * rowHeight;

        return (
          <group key={index} position={[xPos, yPos, 0.01]}>
            <Text
              material={textMaterial}
              fontSize={nameFontSize}
              color={textMaterial.emissive}
              anchorX="center"
              anchorY="middle"
              maxWidth={columnWidth * 0.9}
              textAlign="center"
            >
              {skill.name}
            </Text>
            <Text
              material={levelTextMaterial}
              fontSize={levelFontSize}
              color={levelTextMaterial.emissive}
              position={[0, -nameFontSize * 0.8, 0]} // Position level below name
              anchorX="center"
              anchorY="middle"
              maxWidth={columnWidth * 0.9}
              textAlign="center"
              fontStyle="italic"
            >
              {skill.level}
            </Text>
          </group>
        );
      })}
    </Billboard>
  );
};

export default SkillsContent; 
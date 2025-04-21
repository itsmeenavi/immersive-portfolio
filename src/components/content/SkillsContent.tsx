import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Adjusted Materials for Console (similar to WorkExperience) ---
const consoleTextMaterial = new THREE.MeshStandardMaterial({
  color: '#E0F8F8', emissive: '#A0FFFF', emissiveIntensity: 0.2, 
  roughness: 0.6, metalness: 0.1, transparent: true, opacity: 0.9,
});

const consoleLevelTextMaterial = consoleTextMaterial.clone();
consoleLevelTextMaterial.color.set('#B0E0E0');
consoleLevelTextMaterial.emissiveIntensity = 0.1;
consoleLevelTextMaterial.opacity = consoleTextMaterial.opacity * 0.8; // Keep level dimmer
// -----------

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

// --- Props Interface ---
interface SkillsContentProps {
    panelWidth: number;
    panelHeight: number;
}

const SkillsContent: React.FC<SkillsContentProps> = ({ 
    panelWidth, 
    panelHeight, 
}) => {

  // Layout constants using props
  const columns = 5; 
  const columnWidth = panelWidth / columns;
  const rowHeight = 0.4; 
  const nameFontSize = 0.1;
  const levelFontSize = 0.08;
  const topPadding = 0.2; // Padding from console top edge
  const bottomPadding = 0.2; // Padding from bottom

  // Adjusted start positions relative to console center
  const startX = -panelWidth / 2 + columnWidth / 2;
  const startY = panelHeight / 2 - topPadding - nameFontSize; // Start below top padding

  return (
    <group position={[0, 0, 0]}> {/* Base group at console center */}
        {/* Skills Grid */}
        {skillsData.map((skill, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const xPos = startX + col * columnWidth;
            const yPos = startY - row * rowHeight;

            return (
                <group key={index} position={[xPos, yPos, 0.01]}> 
                    {/* Skill Name - Use Console Material */}
                    <Text
                        material={consoleTextMaterial}
                        fontSize={nameFontSize}
                        color={consoleTextMaterial.color}
                        anchorX="center"
                        anchorY="middle"
                        maxWidth={columnWidth * 0.9}
                        textAlign="center"
                    >
                        {skill.name}
                    </Text>
                    {/* Skill Level - Use Console Level Material */}
                    <Text
                        material={consoleLevelTextMaterial}
                        fontSize={levelFontSize}
                        color={consoleLevelTextMaterial.color}
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
    </group>
  );
};

export default SkillsContent; 
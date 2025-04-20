import React from 'react';
import { Billboard, Plane, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Materials (Copied) ---
const hologramMaterial = new THREE.MeshStandardMaterial(/* ... */);
hologramMaterial.color = new THREE.Color('#00ffff'); hologramMaterial.emissive = new THREE.Color('#00ffff');
hologramMaterial.emissiveIntensity = 0.6; hologramMaterial.transparent = true; hologramMaterial.opacity = 0.6;
hologramMaterial.roughness = 0.6; hologramMaterial.metalness = 0.2; hologramMaterial.side = THREE.DoubleSide;
hologramMaterial.depthWrite = false; hologramMaterial.blending = THREE.AdditiveBlending;

const textMaterial = hologramMaterial.clone();
textMaterial.emissiveIntensity = 1.0; textMaterial.opacity = 0.8;

const detailTextMaterial = textMaterial.clone(); // For slightly less prominent text
detailTextMaterial.emissiveIntensity = 0.8; detailTextMaterial.opacity = 0.7;
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

const EducationContent: React.FC = () => {
  const panelWidth = 4.5;
  const panelHeight = 3;
  const itemSpacing = 0.5;
  const startY = panelHeight / 2 - 0.5; // Start below title
  const yearX = -panelWidth / 2 + 0.5; // X pos for years
  const detailX = -panelWidth / 2 + 1.5; // X pos for institution/degree
  const detailMaxWidth = panelWidth - 1.8; // Max width for details

  return (
    <Billboard position={[0, 1, -3]}>
      <Plane args={[panelWidth, panelHeight]} material={hologramMaterial} />

      {/* Title */}
      <Text
        material={textMaterial}
        fontSize={0.25}
        color={textMaterial.emissive}
        position={[0, panelHeight / 2 - 0.2, 0.01]}
        anchorX="center"
        anchorY="top"
      >
        Education
      </Text>

      {/* Education List */}
      {educationData.map((item, index) => {
        const yPos = startY - index * itemSpacing;
        return (
          <group key={index} position={[0, yPos, 0.01]}>
            {/* Years */}
            <Text
              material={detailTextMaterial}
              fontSize={0.1}
              color={detailTextMaterial.emissive}
              position={[yearX, 0.05, 0]} // Slightly above vertical center
              anchorX="left"
              anchorY="top"
            >
              {item.years}
            </Text>
            {/* Institution */}
            <Text
              material={textMaterial}
              fontSize={0.14}
              color={textMaterial.emissive}
              position={[detailX, 0, 0]} // Align top with years?
              anchorX="left"
              anchorY="top"
              maxWidth={detailMaxWidth}
            >
              {item.institution}
            </Text>
            {/* Degree */}
            <Text
              material={detailTextMaterial}
              fontSize={0.11}
              color={detailTextMaterial.emissive}
              position={[detailX, -0.16, 0]} // Below institution
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
    </Billboard>
  );
};

export default EducationContent; 
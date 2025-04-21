import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Adjusted Materials for Console ---
// Make text less emissive, maybe brighter base color for contrast
const consoleTextMaterial = new THREE.MeshStandardMaterial({
  color: '#E0F8F8', // Off-white / very light cyan
  emissive: '#A0FFFF', // Dimmer emissive
  emissiveIntensity: 0.2, 
  roughness: 0.6,
  metalness: 0.1,
  transparent: true, 
  opacity: 0.9, // Slightly less than fully opaque
});

const consoleDetailTextMaterial = consoleTextMaterial.clone();
consoleDetailTextMaterial.color.set('#B0E0E0'); // Slightly darker detail text
consoleDetailTextMaterial.emissiveIntensity = 0.1;
consoleDetailTextMaterial.opacity = 0.8;
// -----------

// --- Data ---
const workExperienceData = [
  {
    company: 'Connected Technology',
    position: 'CSS NC2 OJT',
    years: 'Nov 2022',
    description:
      'Designed network layouts using Packet Tracer and set up peer-to-peer networking configurations. Additionally, I established server-to-user networks to ensure smooth data flow. Furthermore, I gained hands-on experience in computer assembling and disassembling, enhancing my hardware proficiency.',
  },
  {
    company: 'Avasia Information Systems Inc.',
    position: 'Web Developer Intern',
    years: 'March 2023 - July 2023',
    description:
      'Developed User Authentication using Cordova to ensure secure access and authentication processes. Created a Company Job Application Form that incorporated MySQL, Mustache JS, jQuery, Slim PHP, and Ajax, optimizing data handling and enhancing user interaction. Additionally, crafted comprehensive documentation for a Transport Route Project, leveraging Google Maps API and routing functionalities to provide clear implementation guidelines.',
  },
  {
    company: 'P.C.E.S Inc.',
    position: 'Mobile Application Developer',
    years: 'Sept 2023 - Feb 2024',
    description:
      'Developed websites using PHP and JavaScript. Designed websites using WordPress CMS with the help of HTML and JavaScript. Created professional presentations for B2B and B2C clients. Designed the full UI/UX of a mobile app using Figma. Initiated development of a mobile application version of the main company product using Flutter Dart. Managed the IT team to be more organized and systematic.',
  },
  {
    company: 'Philippine Statistics Authority',
    position: 'Systems Developer Internship',
    years: 'October 2024 - December 2024',
    description:
      `Gained in-depth exposure to PSA's operations and the BRAMS/BRAP Project through multiple workshops and meetings. Strengthened JavaScript proficiency by completing a full course, which covered essential concepts such as HTTP vs. HTTPS, encryption, and hashing. Simultaneously, advanced skills in Golang by studying various courses and setting up local client-server connections. Contributed to UI/UX design discussions for the BRAP application and documented technical insights during project sessions. Expanded front-end capabilities by learning ReactJS (including API fetching) and explored modern web technologies such as Next.js and Supabase for streamlined development workflows. Enhanced mobile development expertise with Flutter while gaining hands-on experience initializing projects with PostgreSQL and npm-based toolchains.`,
  },
];
// ----------

// --- Props Interface ---
interface WorkExperienceContentProps {
    panelWidth: number; 
    panelHeight: number;
    // Removed onWheel, scrollYOffset
}

const WorkExperienceContent: React.FC<WorkExperienceContentProps> = ({ 
    panelWidth, 
    panelHeight, 
    // Removed onWheel, scrollYOffset from destructuring
}) => {
  
  // Keep using props for dimensions
  const itemSpacing = 0.75;
  const descriptionLineHeight = 0.1 * 1.4; 
  const topPadding = 0.25; // Adjusted padding for no main title here
  const bottomPadding = 0.2;

  // Layout constants using panelWidth
  const yearX = -panelWidth / 2 + 0.4;
  const detailX = -panelWidth / 2 + 1.4;
  const detailMaxWidth = panelWidth - (detailX - (-panelWidth / 2)) - 0.3;
  
  // Use panelHeight from props for start Y relative to console center
  const startY = panelHeight / 2 - topPadding;

  return (
    <group position={[0, 0, 0]}> 
      {/* Removed Scrollable Group wrapper */}
      {workExperienceData.map((item, index) => {
          let currentY = startY;
          for (let i = 0; i < index; i++) {
            const prevItem = workExperienceData[i];
            const prevDescLines = Math.ceil(prevItem.description.length / (detailMaxWidth / (0.1 * 0.6)));
            const prevItemHeight = 0.16 + 0.16 + (prevDescLines * descriptionLineHeight);
            currentY -= (prevItemHeight + itemSpacing);
          }
          const yPos = currentY; // Y position relative to the container top (startY)

          // Removed Visibility Check

          return (
            <group key={index} position={[0, yPos, 0.01]}> 
              {/* Years */}
              <Text material={consoleDetailTextMaterial} fontSize={0.1} color={consoleDetailTextMaterial.color} position={[yearX, 0, 0]} anchorX="left" anchorY="top">
                {item.years}
              </Text>
              {/* Company */}
              <Text material={consoleTextMaterial} fontSize={0.14} color={consoleTextMaterial.color} position={[detailX, 0, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth}>
                {item.company}
              </Text>
              {/* Position */}
              <Text material={consoleDetailTextMaterial} fontSize={0.11} color={consoleDetailTextMaterial.color} position={[detailX, -0.16, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth} fontStyle="italic">
                {item.position}
              </Text>
              {/* Description */}
              <Text material={consoleDetailTextMaterial} fontSize={0.1} color={consoleDetailTextMaterial.color} position={[detailX, -0.32, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth} lineHeight={1.4} textAlign="justify">
                {item.description}
              </Text>
            </group>
          );
        })}
    </group>
  );
};

export default WorkExperienceContent; 
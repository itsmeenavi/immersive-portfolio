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

const detailTextMaterial = textMaterial.clone();
detailTextMaterial.emissiveIntensity = 0.8; detailTextMaterial.opacity = 0.7;
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

const WorkExperienceContent: React.FC = () => {
  const panelWidth = 5.5; // Wider for descriptions
  const panelHeight = 3.5;
  const itemSpacing = 0.75; // More space for description
  const startY = panelHeight / 2 - 0.5;
  const yearX = -panelWidth / 2 + 0.5;
  const detailX = -panelWidth / 2 + 1.5;
  const detailMaxWidth = panelWidth - 1.8;

  return (
    <Billboard position={[0, 1, -3]}>
      <Plane args={[panelWidth, panelHeight]} material={hologramMaterial} />

      {/* Title */}
      <Text material={textMaterial} fontSize={0.25} color={textMaterial.emissive} position={[0, panelHeight / 2 - 0.2, 0.01]} anchorX="center" anchorY="top">
        Work Experience
      </Text>

      {/* Experience List */}
      {workExperienceData.map((item, index) => {
        const yPos = startY - index * itemSpacing;
        return (
          <group key={index} position={[0, yPos, 0.01]}>
            {/* Years */}
            <Text material={detailTextMaterial} fontSize={0.1} color={detailTextMaterial.emissive} position={[yearX, 0, 0]} anchorX="left" anchorY="top">
              {item.years}
            </Text>
            {/* Company */}
            <Text material={textMaterial} fontSize={0.14} color={textMaterial.emissive} position={[detailX, 0, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth}>
              {item.company}
            </Text>
            {/* Position */}
            <Text material={detailTextMaterial} fontSize={0.11} color={detailTextMaterial.emissive} position={[detailX, -0.16, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth} fontStyle="italic">
              {item.position}
            </Text>
            {/* Description */}
            <Text material={detailTextMaterial} fontSize={0.1} color={detailTextMaterial.emissive} position={[detailX, -0.32, 0]} anchorX="left" anchorY="top" maxWidth={detailMaxWidth} lineHeight={1.4} textAlign="justify">
              {item.description}
            </Text>
          </group>
        );
      })}
    </Billboard>
  );
};

export default WorkExperienceContent; 
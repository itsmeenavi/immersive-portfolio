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

const consoleTechTextMaterial = consoleDetailTextMaterial.clone();
consoleTechTextMaterial.opacity = 0.7; // Tech slightly dimmer than details
// -----------

// --- Data ---
const projectData = [
    { name: 'Siklisto', description: 'A Mobile Based Electric Bike Charging Station Locator', link: '/siklisto', technologies: ['Flutter', 'Dart', 'Firebase'], isExternal: false },
    { name: 'Lyceum of Alabang Performance Evaluation System', description: 'Faculty Evaluation System with Sentiment Analysis', link: 'https://github.com/LOA-Capstone/eval-system-capstone', technologies: ['Html', 'Javascript', 'CSS', 'PHP', 'Python', 'Mysql'], isExternal: true },
    { name: 'Random Bible Verse', description: 'Generates random bible verses to display', link: 'https://random-bible-verse-flame.vercel.app', technologies: ['Nextjs'], isExternal: true },
    { name: 'Random Advice Generator', description: 'Generates random advice', link: 'https://random-advice-app-seven.vercel.app', technologies: ['Nextjs'], isExternal: true },
    { name: 'Basic Photography Gallery', description: 'A website made for a project in Basic Photography', link: 'https://basic-photo-finals.vercel.app/photography', technologies: ['ReactJS', 'Tailwind'], isExternal: true },
];
// ----------

// --- Props Interface ---
interface ProjectsContentProps {
    panelWidth: number;
    panelHeight: number;
    // Removed scroll props
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ 
    panelWidth, 
    panelHeight 
}) => {

    // Layout constants using props
    const itemSpacing = 0.8; 
    const topPadding = 0.2;
    const contentStartX = -panelWidth / 2 + 0.3;
    const contentMaxWidth = panelWidth - 0.6;
    const techSpacing = 0.08;

    // Adjusted start positions relative to console center
    const startY = panelHeight / 2 - topPadding - 0.1; // Start below padding

    return (
        <group position={[0, 0, 0]}> 
            {/* Projects List - No scroll group */}
            {projectData.map((project, index) => {
                // Calculate Y relative to the container's top (startY)
                const yPos = startY - index * itemSpacing; 
                let currentTechX = contentStartX; 
                const techYOffset = -0.32; // Keep this relative offset

                // Removed visibility check

                return (
                    <group key={index} position={[0, yPos, 0.01]}>
                        {/* Project Name */}
                        <Text material={consoleTextMaterial} fontSize={0.14} color={consoleTextMaterial.color} position={[contentStartX, 0, 0]} anchorX="left" anchorY="top" maxWidth={contentMaxWidth * 0.8}>
                            {project.name}
                        </Text>
                        {/* Project Link (simplified) */}
                        <Text material={consoleDetailTextMaterial} fontSize={0.08} color={consoleDetailTextMaterial.color} position={[panelWidth/2 - 0.3, -0.02, 0]} anchorX="right" anchorY="top">
                            {project.isExternal ? "(Link)" : "(Internal)"}
                        </Text>
                         {/* Description */}
                         <Text material={consoleDetailTextMaterial} fontSize={0.1} color={consoleDetailTextMaterial.color} position={[contentStartX, -0.18, 0]} anchorX="left" anchorY="top" maxWidth={contentMaxWidth} lineHeight={1.4} textAlign="left">
                           {project.description}
                         </Text>
                         {/* Technologies (horizontal list) */}
                         <group position={[0, techYOffset, 0]}>
                           {project.technologies.map((tech, techIndex) => {
                             const x = currentTechX;
                             const widthEstimate = tech.length * 0.04 + 0.04;
                             currentTechX += widthEstimate + techSpacing;

                             // Basic wrap - simple version, just render, might overlap
                             // if (currentTechX > panelWidth / 2 - 0.2) { }

                             return (
                                <Text key={techIndex} material={consoleTechTextMaterial} fontSize={0.07} color={consoleTechTextMaterial.color} position={[x, 0, 0.001]} /* Position relative to group origin */ anchorX="left" anchorY="middle" >
                                   {`[${tech}]`}
                                </Text>
                             );
                           })}
                         </group>
                    </group>
                );
            })}
        </group>
    );
};

export default ProjectsContent; 
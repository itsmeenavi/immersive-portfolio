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

const techTextMaterial = detailTextMaterial.clone(); // Slightly different style for techs
techTextMaterial.emissiveIntensity = 0.7; techTextMaterial.opacity = 0.6;
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

const ProjectsContent: React.FC = () => {
    const panelWidth = 5;
    const panelHeight = 3.5;
    const itemSpacing = 0.8;
    const startY = panelHeight / 2 - 0.5;
    const contentStartX = -panelWidth / 2 + 0.3;
    const contentMaxWidth = panelWidth - 0.6;
    const techSpacing = 0.08;

    return (
        <Billboard position={[0, 1, -3]}>
            <Plane args={[panelWidth, panelHeight]} material={hologramMaterial} />

            {/* Title */}
            <Text material={textMaterial} fontSize={0.25} color={textMaterial.emissive} position={[0, panelHeight / 2 - 0.2, 0.01]} anchorX="center" anchorY="top">
                Projects
            </Text>

            {/* Projects List */}
            {projectData.map((project, index) => {
                const yPos = startY - index * itemSpacing;
                let currentTechX = contentStartX; // For horizontal tech list layout
                const techYOffset = -0.32; // Base Y offset for tech items below description

                return (
                    <group key={index} position={[0, yPos, 0.01]}>
                        {/* Project Name */}
                        <Text material={textMaterial} fontSize={0.14} color={textMaterial.emissive} position={[contentStartX, 0, 0]} anchorX="left" anchorY="top" maxWidth={contentMaxWidth * 0.8 /* Leave space for link */}>
                            {project.name}
                        </Text>
                        {/* Project Link (simplified) */}
                        <Text material={detailTextMaterial} fontSize={0.08} color={detailTextMaterial.emissive} position={[panelWidth/2 - 0.3, -0.02, 0]} anchorX="right" anchorY="top">
                            {project.isExternal ? "(Link)" : "(Internal)"}
                            {/* TODO: Make clickable later */} 
                        </Text>
                         {/* Description */}
                         <Text material={detailTextMaterial} fontSize={0.1} color={detailTextMaterial.emissive} position={[contentStartX, -0.18, 0]} anchorX="left" anchorY="top" maxWidth={contentMaxWidth} lineHeight={1.4} textAlign="left">
                           {project.description}
                         </Text>
                         {/* Technologies (horizontal list) */}
                         <group position={[0, techYOffset, 0]}>
                           {project.technologies.map((tech, techIndex) => {
                             const x = currentTechX;
                             // Basic width estimation
                             const widthEstimate = tech.length * 0.04 + 0.04;
                             currentTechX += widthEstimate + techSpacing; // Move X for next tech

                             // Simple wrap (reset X if exceeds boundary)
                             if (currentTechX > panelWidth / 2 - 0.2) {
                                // This simple wrap isn't perfect, might need refinement
                             }

                             return (
                                <Text key={techIndex} material={techTextMaterial} fontSize={0.07} color={techTextMaterial.emissive} position={[x - contentStartX, 0, 0.001]} /* Position relative to tech group */ anchorX="left" anchorY="middle" >
                                   {`[${tech}]`}
                                </Text>
                             );
                           })}
                         </group>
                    </group>
                );
            })}
        </Billboard>
    );
};

export default ProjectsContent; 
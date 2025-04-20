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

const detailTextMaterial = textMaterial.clone(); // Use for labels like "Email:"
detailTextMaterial.emissiveIntensity = 0.7; detailTextMaterial.opacity = 0.7;
// -----------

// --- Data ---
const contactInfoData = {
    email: "ivhansalazar@example.com", 
    phone: "+639514663857", 
};
// ----------

const ContactContent: React.FC = () => {
    const panelWidth = 3.5;
    const panelHeight = 1.8;
    const startY = panelHeight / 2 - 0.5;
    const labelX = -panelWidth / 2 + 0.4;
    const valueX = -panelWidth / 2 + 1.0;
    const itemSpacing = 0.3;

    return (
        <Billboard position={[0, 1, -3]}>
            <Plane args={[panelWidth, panelHeight]} material={hologramMaterial} />

            {/* Title */}
            <Text material={textMaterial} fontSize={0.25} color={textMaterial.emissive} position={[0, panelHeight / 2 - 0.2, 0.01]} anchorX="center" anchorY="top">
                Contact
            </Text>

            {/* Email */}
            <group position={[0, startY, 0.01]}>
                <Text material={detailTextMaterial} fontSize={0.12} color={detailTextMaterial.emissive} position={[labelX, 0, 0]} anchorX="left" anchorY="middle">
                    Email:
                </Text>
                <Text material={textMaterial} fontSize={0.12} color={textMaterial.emissive} position={[valueX, 0, 0]} anchorX="left" anchorY="middle">
                    {contactInfoData.email}
                    {/* TODO: Make clickable? */}
                </Text>
            </group>

            {/* Phone */}
            {contactInfoData.phone && (
                <group position={[0, startY - itemSpacing, 0.01]}>
                    <Text material={detailTextMaterial} fontSize={0.12} color={detailTextMaterial.emissive} position={[labelX, 0, 0]} anchorX="left" anchorY="middle">
                        Phone:
                    </Text>
                    <Text material={textMaterial} fontSize={0.12} color={textMaterial.emissive} position={[valueX, 0, 0]} anchorX="left" anchorY="middle">
                        {contactInfoData.phone}
                    </Text>
                </group>
            )}

             {/* Notice */}
             <Text material={detailTextMaterial} fontSize={0.08} color={detailTextMaterial.emissive} position={[0, -panelHeight / 2 + 0.2, 0.01]} anchorX="center" anchorY="bottom" fontStyle="italic">
               (Social links in "About Me")
             </Text>

        </Billboard>
    );
};

export default ContactContent; 
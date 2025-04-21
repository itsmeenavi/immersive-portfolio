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

// --- Data (Remains the same) ---
const contactInfoData = {
    email: "ivhansalazar@example.com", 
    phone: "+639514663857", 
};
// ----------

// --- Props Interface ---
interface ContactContentProps {
    panelWidth: number;
    panelHeight: number;
    // Removed scroll props
}

const ContactContent: React.FC<ContactContentProps> = ({ 
    panelWidth, 
    panelHeight 
}) => {
    
    // Layout constants using props
    const topPadding = 0.2;
    const labelX = -panelWidth / 2 + 0.4;
    const valueX = -panelWidth / 2 + 1.0;
    const itemSpacing = 0.3;

    // Adjusted start positions relative to console center
    const startY = panelHeight / 2 - topPadding - 0.15; // Start below padding
    const noticeY = -panelHeight / 2 + 0.15; // Position notice near bottom

    return (
        <group position={[0, 0, 0]}> 
            {/* Contact Info */}
            {/* Email */}
            <group position={[0, startY, 0.01]}>
                <Text material={consoleDetailTextMaterial} fontSize={0.12} color={consoleDetailTextMaterial.color} position={[labelX, 0, 0]} anchorX="left" anchorY="middle">
                    Email:
                </Text>
                <Text material={consoleTextMaterial} fontSize={0.12} color={consoleTextMaterial.color} position={[valueX, 0, 0]} anchorX="left" anchorY="middle">
                    {contactInfoData.email}
                </Text>
            </group>

            {/* Phone */}
            {contactInfoData.phone && (
                <group position={[0, startY - itemSpacing, 0.01]}>
                    <Text material={consoleDetailTextMaterial} fontSize={0.12} color={consoleDetailTextMaterial.color} position={[labelX, 0, 0]} anchorX="left" anchorY="middle">
                        Phone:
                    </Text>
                    <Text material={consoleTextMaterial} fontSize={0.12} color={consoleTextMaterial.color} position={[valueX, 0, 0]} anchorX="left" anchorY="middle">
                        {contactInfoData.phone}
                    </Text>
                </group>
            )}

             {/* Notice */}
             <Text material={consoleDetailTextMaterial} fontSize={0.08} color={consoleDetailTextMaterial.color} position={[0, noticeY, 0.01]} anchorX="center" anchorY="bottom" fontStyle="italic">
               (Social links in "About Me")
             </Text>
        </group>
    );
};

export default ContactContent; 
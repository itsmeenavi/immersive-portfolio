import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface InfoConsoleProps {
  width: number;
  height: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onWheel?: (event: any) => void; // Pass down wheel event for scrolling
  children?: React.ReactNode;    // To render content inside
}

// Define materials for the console
const consoleMaterial = new THREE.MeshStandardMaterial({
  color: '#222222', // Dark grey/black base
  metalness: 0.8,
  roughness: 0.4,
  side: THREE.DoubleSide,
});

const edgeMaterial = new THREE.MeshStandardMaterial({
    color: '#00ffff',      // Cyan edge
    emissive: '#00ffff',   // Glowing edge
    emissiveIntensity: 0.6,
    toneMapped: false,
    metalness: 0.5,
    roughness: 0.5,
});

const InfoConsole: React.FC<InfoConsoleProps> = ({
  width,
  height,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onWheel,
  children,
}) => {
  const consoleRef = useRef<THREE.Mesh>(null);
  const edgeThickness = 0.03; // How thick the edge frame is

  return (
    <group position={position} rotation={rotation}>
      {/* Main Background Panel */}
      <RoundedBox
        ref={consoleRef}
        args={[width, height, 0.05]} // width, height, depth (very thin)
        radius={0.05}
        smoothness={4}
        material={consoleMaterial}
        onWheel={onWheel} // Attach scroll handler here
      >
        {/* Render content inside the console, slightly offset forward */}
        <group position={[0, 0, 0.03]}> 
            {children}
        </group>
      </RoundedBox>

      {/* Optional: Add an edge/frame for better definition */}
      {/* Top Edge */}
      <RoundedBox args={[width + edgeThickness*2, edgeThickness, 0.07]} radius={0.01} position={[0, height/2 + edgeThickness/2, -0.01]} material={edgeMaterial} />
      {/* Bottom Edge */}
      <RoundedBox args={[width + edgeThickness*2, edgeThickness, 0.07]} radius={0.01} position={[0, -height/2 - edgeThickness/2, -0.01]} material={edgeMaterial} />
      {/* Left Edge */}
      <RoundedBox args={[edgeThickness, height + edgeThickness*2, 0.07]} radius={0.01} position={[-width/2 - edgeThickness/2, 0, -0.01]} material={edgeMaterial} />
      {/* Right Edge */}
      <RoundedBox args={[edgeThickness, height + edgeThickness*2, 0.07]} radius={0.01} position={[width/2 + edgeThickness/2, 0, -0.01]} material={edgeMaterial} />

    </group>
  );
};

export default InfoConsole; 
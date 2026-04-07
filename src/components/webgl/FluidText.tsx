import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FluidTextProps {
  text: string;
  position?: [number, number, number] | any;
  fontSize?: number;
  color?: string;
  isHoverable?: boolean;
  noHitbox?: boolean;
  onClick?: () => void;
  maxWidth?: number;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  letterSpacing?: number;
  outlineWidth?: number;
  outlineColor?: string;
  outlineBlur?: number;
  emissive?: string;
  emissiveIntensity?: number;
}

export function FluidText({
  text,
  position = [0, 0, 0],
  fontSize = 1,
  color = '#111111', 
  isHoverable = false,
  noHitbox = false,
  onClick,
  maxWidth,
  textAlign = 'center',
  letterSpacing = 0,
  outlineWidth = 0,
  outlineColor = "transparent",
  outlineBlur = 0,
  emissive,
  emissiveIntensity = 1,
}: FluidTextProps) {
  const textRef = useRef<any>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Use a subtle floating animation
  useFrame((state) => {
    if (textRef.current && !isHoverable) { // Don't float if it's meant to be precisely hoverable right away, or keep it subtle
      const t = state.clock.elapsedTime;
      textRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      maxWidth={maxWidth}
      textAlign={textAlign}
      letterSpacing={letterSpacing}
      outlineWidth={outlineWidth}
      outlineColor={outlineColor}
      outlineBlur={outlineBlur}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        if (isHoverable && materialRef.current) {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        if (isHoverable && materialRef.current) {
          document.body.style.cursor = 'auto';
        }
      }}
      onClick={onClick}
      raycast={noHitbox ? () => null : undefined}
    >
      {text}
      <meshStandardMaterial 
        ref={materialRef} 
        color={color} 
        roughness={0.2} 
        metalness={0.1} 
        emissive={emissive || '#000000'}
        emissiveIntensity={emissiveIntensity}
      />
    </Text>
  );
}

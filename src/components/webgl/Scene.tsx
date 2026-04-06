import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useLocation } from "wouter";
import { OrganicLattice } from './OrganicLattice';
import { FluidText } from './FluidText';
import * as THREE from 'three';

function PlantStems() {
  const [location] = useLocation();
  const count = 6; // Reduced count for supplementary look
  
  // Re-generate stems whenever we change pages for dynamic randomness
  const stems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 70;
        for (let j = 0; j < 6; j++) {
            points.push(new THREE.Vector3(
                startX + Math.sin(j * 0.5 + i) * 10,
                (j - 3) * 18,
                (Math.random() - 0.5) * 20
            ));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 80, 0.12, 10, false);
        temp.push({ geometry, speed: Math.random() * 0.03 + 0.01 });
    }
    return temp;
  }, [location]);

  return (
    <group>
      {stems.map((stem, i) => (
        <Float key={`${location}-${i}`} speed={stem.speed * 8} rotationIntensity={0.15} floatIntensity={0.3}>
          <mesh geometry={stem.geometry}>
            <meshStandardMaterial 
              color="#4CAF7D" 
              transparent 
              opacity={0.1} // More subtle opacity
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ScrollRig() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const vPage = viewport.height;
  const vWidth = viewport.width;
  const [scroll, setScroll] = useState(0);

  // Use native scroll for 100% reliability instead of ScrollControls
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      setScroll(window.scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Map scroll to 5.5 pages as before
    const displacement = scroll * vPage * 5;
    groupRef.current.position.y = displacement;
    groupRef.current.rotation.y = scroll * Math.PI * 0.05;
  });

  // Responsive scaling constants - clamped tightly so text never overflows on any screen size
  const titleSize = Math.min(vWidth * 0.16, 1.8); // Hero MVE - reduced to prevent overflow
  const subtitleSize = Math.min(vWidth * 0.013, 0.13); // Miami Venturing Entrepreneurs - smaller for safety
  const page2HeadingSize = Math.min(vWidth * 0.07, 0.68); // Page 2 Headings - reduced max significantly
  const programSize = Math.min(vWidth * 0.04, 0.36); // Program links
  
  // Adaptive horizontal tracking
  const sideMargin = Math.min(vWidth * 0.2, 2.4);

  return (
    <group ref={groupRef}>
      {/* Page 1 (Top) */}
      <FluidText 
        text="M I A M I  V E N T U R I N G  E N T R E P R E N E U R S" 
        position={[0, vPage * 0.38, -2]} 
        fontSize={subtitleSize} 
        color="#7A92A8" 
        maxWidth={vWidth * 0.9}
        noHitbox={true}
      />
      <FluidText 
        text="M V E" 
        position={[0, vPage * 0.02, 1]} 
        fontSize={titleSize} 
        color="#4CAF7D" 
        noHitbox={true}
      />
      <FluidText 
        text="SCROLL TO EXPLORE ↓" 
        position={[0, -vPage * 0.42, 1]} 
        fontSize={0.15} 
        color="#7A92A8" 
        noHitbox={true}
      />
      <FluidText 
        text="COMPETITIVE. STUDENT-LED. FINANCIAL THINKING." 
        position={[0, -vPage * 0.75, 0]} 
        fontSize={0.25} 
        color="#334155" 
        maxWidth={vWidth * 0.8}
        noHitbox={true}
      />

      {/* Page 2 */}
      <FluidText 
        text="LARGEST CLUB." 
        position={[-sideMargin, -vPage * 2.1, 1]} 
        fontSize={page2HeadingSize} 
        color="#334155" 
        textAlign="left"
        maxWidth={vWidth * 0.45}
        noHitbox={true}
      />
      <FluidText 
        text="200+ MEMBERS." 
        position={[sideMargin, -vPage * 2.1, 1]} 
        fontSize={page2HeadingSize} 
        color="#4CAF7D" 
        textAlign="right"
        maxWidth={vWidth * 0.45}
        noHitbox={true}
      />
      <FluidText 
        text="COMPETITIONS. INVESTING. CONSULTING." 
        position={[0, -vPage * 1.75, 0]} 
        fontSize={0.35} 
        color="#7A92A8" 
        maxWidth={vWidth * 0.8}
        noHitbox={true}
      />

      {/* Page 3: Interactive Links */}
      <FluidText 
        text="OUR PROGRAMS" 
        position={[0, -vPage * 2.8, 0]} 
        fontSize={Math.min(vWidth * 0.1, 0.9)} 
        color="#334155" 
        noHitbox={true}
      />
      <FluidText 
        text="INVESTMENT SUMMIT  →" 
        position={[-Math.min(vWidth * 0.15, 1.8), -vPage * 3.35, 0]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="left"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/investment-summit' }))}
      />
      <FluidText 
        text="SFERE SYMPOSIUM  →" 
        position={[Math.min(vWidth * 0.15, 1.8), -vPage * 3.65, 0]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="right"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/sfere' }))}
      />
      <FluidText 
        text="MVE REASON  →" 
        position={[-Math.min(vWidth * 0.15, 1.8), -vPage * 3.95, -1]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="left"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/reason' }))}
      />
      <FluidText 
        text="MVE FUND  →" 
        position={[0, -vPage * 4.4, 0]} 
        fontSize={0.35} 
        color="#334155" 
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/investment-challenge' }))}
      />
      <FluidText 
        text="COMPETITIONS  →" 
        position={[0, -vPage * 4.6, 0]} 
        fontSize={0.35} 
        color="#334155" 
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/competitions' }))}
      />
      <FluidText 
        text="CONTACT US  →" 
        position={[0, -vPage * 4.8, 0]} 
        fontSize={0.35} 
        color="#334155" 
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/contact' }))}
      />
    </group>
  );
}

function Loader() {
  return (
    <FluidText 
      text="ASSEMBLING..." 
      position={[0, 0, 0]} 
      fontSize={0.5} 
      color="#4CAF7D" 
    />
  );
}

export function WebGLScene({ isHome = true }: { isHome?: boolean }) {
  return (
    <div className="w-full h-full fixed inset-0 bg-transparent z-0 pointer-events-none">
      <Canvas 
        shadows
        eventSource={document.body}
        className="pointer-events-auto"
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#F0FFFF" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#FAFAD2" />
        
        <Suspense fallback={<Loader />}>
          {/* Background Group: Pushed far back and reduced opacity */}
          <group position={[0, 0, -15]}>
            <PlantStems />
            <OrganicLattice />
          </group>

          {/* Foreground Group: Navigation and Hero Text at original z-zero for proper scale */}
          {isHome && <ScrollRig />}
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

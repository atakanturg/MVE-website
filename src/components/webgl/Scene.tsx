import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useLocation } from "wouter";
import { OrganicLattice } from './OrganicLattice';
import { FluidText } from './FluidText';
import * as THREE from 'three';

function PlantStems() {
  const [location] = useLocation();
  const count = 12; // More stems for a lush growth
  
  const stems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 60;
        const startZ = -10 + (Math.random() - 0.5) * 15;
        for (let j = 0; j < 8; j++) {
            points.push(new THREE.Vector3(
                startX + Math.sin(j * 0.4 + i) * 8,
                (j - 4) * 15,
                startZ + Math.cos(j * 0.3 + i) * 5
            ));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 100, 0.25, 12, false);
        temp.push({ 
            geometry, 
            speed: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2
        });
    }
    return temp;
  }, [location]);

  return (
    <group>
      {stems.map((stem, i) => (
        <Float key={`${location}-${i}`} speed={stem.speed * 20} rotationIntensity={0.6} floatIntensity={1.5}>
          <mesh geometry={stem.geometry}>
            <meshPhysicalMaterial 
              color="#00FF88" 
              emissive="#00FFCC"
              emissiveIntensity={2.0}
              transparent 
              opacity={0.4}
              roughness={0.1}
              metalness={0.8}
              transmission={0.5}
              thickness={1.0}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Adding glowing "dust" or spores near the stems */}
      <points position={[0, 0, -5]}>
          <sphereGeometry args={[40, 32, 32]} />
          <pointsMaterial 
            color="#00FFCC" 
            size={0.05} 
            transparent 
            opacity={0.3} 
            sizeAttenuation={true} 
            blending={THREE.AdditiveBlending}
          />
      </points>
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
  const sideMargin = Math.min(vWidth * 0.25, 2.8);

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
        text="MVE" 
        position={[0, vPage * 0.02, 1]} 
        fontSize={titleSize} 
        color="#4CAF7D" 
        letterSpacing={0.4}
        outlineWidth={titleSize * 0.02}
        outlineColor="#4CAF7D"
        emissive="#4CAF7D"
        emissiveIntensity={0.8}
        noHitbox={true}
      />
      <FluidText 
        text="SCROLL TO EXPLORE" 
        position={[0, -vPage * 0.22, 2]} 
        fontSize={0.12} 
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
        maxWidth={vWidth * 0.35}
        noHitbox={true}
      />
      <FluidText 
        text="200+ MEMBERS." 
        position={[sideMargin, -vPage * 2.1, 1]} 
        fontSize={page2HeadingSize} 
        color="#4CAF7D" 
        textAlign="right"
        maxWidth={vWidth * 0.35}
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
        position={[-Math.min(vWidth * 0.15, 1.8), -vPage * 3.35, 2]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="left"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/investment-summit' }))}
      />
      <FluidText 
        text="SFERE SYMPOSIUM  →" 
        position={[Math.min(vWidth * 0.15, 1.8), -vPage * 3.65, 2]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="right"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/sfere' }))}
      />
      <FluidText 
        text="MVE REASON  →" 
        position={[-Math.min(vWidth * 0.15, 1.8), -vPage * 3.95, 2]} 
        fontSize={programSize} 
        color="#4CAF7D" 
        textAlign="left"
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/reason' }))}
      />
      <FluidText 
        text="MVE FUND  →" 
        position={[0, -vPage * 4.4, 2]} 
        fontSize={0.35} 
        color="#334155" 
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/investment-challenge' }))}
      />
      <FluidText 
        text="COMPETITIONS  →" 
        position={[0, -vPage * 4.6, 2]} 
        fontSize={0.35} 
        color="#334155" 
        isHoverable={true}
        onClick={() => window.dispatchEvent(new CustomEvent('mve-navigate', { detail: '/competitions' }))}
      />
      <FluidText 
        text="CONTACT US  →" 
        position={[0, -vPage * 4.8, 2]} 
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

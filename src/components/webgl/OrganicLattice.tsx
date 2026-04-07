import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const COUNT = 120; // Increased count for a more lush feeling

export function OrganicLattice() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Base rock data
  const rocks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + Math.random() * 25;
      temp.push({
        position: new THREE.Vector3(
            Math.cos(angle) * radius, 
            (Math.random() - 0.5) * 60, 
            (Math.random() - 0.5) * 15
        ),
        speed: Math.random() * 0.2 + 0.1,
        drift: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.01),
        factor: Math.random() * 100,
        scale: Math.random() * 1.3 + 0.2, // Increased variance: much smaller and much larger rocks
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotationSpeed: new THREE.Vector3(Math.random() * 0.3, Math.random() * 0.2, Math.random() * 0.1),
        isBroken: false,
        shatterProgress: 1.0 // 1 = visible, 0 = vanished
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      rocks.forEach((rock, i) => {
        if (rock.shatterProgress <= 0.01) {
          dummy.scale.setScalar(0);
        } else {
          // Continuous drift movement
          rock.position.add(rock.drift);
          
          // Subtle sinusoid bounce on top of drift
          const floatT = t * rock.speed;
          dummy.position.set(
            rock.position.x + Math.sin(floatT + rock.factor) * 0.08,
            rock.position.y + Math.cos(floatT + rock.factor) * 0.06,
            rock.position.z
          );

          // Wrap-around logic
          if (Math.abs(rock.position.x) > 35) rock.position.x *= -0.95;
          if (Math.abs(rock.position.y) > 35) rock.position.y *= -0.95;

          dummy.rotation.set(
            rock.rotation.x + t * rock.rotationSpeed.x, 
            rock.rotation.y + t * rock.rotationSpeed.y, 
            rock.rotation.z + t * rock.rotationSpeed.z
          );
          
          // GSAP scale/shatter effect
          dummy.scale.setScalar(rock.scale * rock.shatterProgress);
        }
        
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const handleShatter = (instanceId: number) => {
    const rock = rocks[instanceId];
    if (rock.isBroken) return;
    
    rock.isBroken = true;
    // Premium GSAP bounce-out animation
    gsap.to(rock, {
      shatterProgress: 0,
      duration: 0.6,
      ease: "back.in(2)",
      onComplete: () => {
          rock.shatterProgress = 0;
      }
    });

    // Subtly speed up neighboring rocks as if there's a pressure wave (optional polish)
    rocks.forEach(r => {
        const dist = r.position.distanceTo(rock.position);
        if (dist < 5 && !r.isBroken) {
            r.position.add(r.position.clone().sub(rock.position).normalize().multiplyScalar(0.5));
        }
    });
  };

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, COUNT]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.instanceId !== undefined) {
          handleShatter(e.instanceId);
        }
      }}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#E0F7FA" 
        emissive="#00FFCC" 
        emissiveIntensity={1.8} // Slightly reduced to show facets better
        roughness={0.2} // Increased for a more 'stony' surface
        metalness={0.4} // Sharper reflections
        transmission={0.4} // More solid than before
        thickness={2.0}
        ior={1.45}
        iridescence={0.8}
        iridescenceIOR={1.5}
        clearcoat={1}
        transparent={true}
        opacity={1.0} // Fully opaque shell
      />
    </instancedMesh>
  );
}


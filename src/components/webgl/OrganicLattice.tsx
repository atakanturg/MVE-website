import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 80; // Slightly fewer rocks for better performance and less clutter

export function OrganicLattice() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Base rock data
  const rocks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      temp.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 45, (Math.random() - 0.5) * 45, (Math.random() - 0.5) * 15),
        speed: Math.random() * 0.1 + 0.05,
        drift: new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.01), // New drift vector
        factor: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.3, // Larger rocks with more variety
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotationSpeed: new THREE.Vector3(Math.random() * 0.2, Math.random() * 0.15, Math.random() * 0.1),
        isBroken: false
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      rocks.forEach((rock, i) => {
        if (rock.isBroken) {
          dummy.scale.setScalar(0);
        } else {
          // Continuous drift movement
          rock.position.add(rock.drift);
          
          // Subtle sinusoid bounce on top of drift
          const floatT = t * rock.speed;
          dummy.position.set(
            rock.position.x + Math.sin(floatT + rock.factor) * 0.05,
            rock.position.y + Math.cos(floatT + rock.factor) * 0.04,
            rock.position.z
          );

          // Wrap-around logic to keep rocks in view
          if (Math.abs(rock.position.x) > 30) rock.position.x *= -0.95;
          if (Math.abs(rock.position.y) > 30) rock.position.y *= -0.95;

          dummy.rotation.set(
            rock.rotation.x + t * rock.rotationSpeed.x, 
            rock.rotation.y + t * rock.rotationSpeed.y, 
            rock.rotation.z + t * rock.rotationSpeed.z
          );
          dummy.scale.setScalar(rock.scale);
        }
        
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, COUNT]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.instanceId !== undefined) {
          // Instant vanish on click - no jitter, no scaling
          rocks[e.instanceId].isBroken = true;
        }
      }}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#F0FFFF"
        roughness={0.25}
        metalness={0.4}
        transmission={0.15}
        thickness={2.5}
        ior={1.45}
        iridescence={0.8}
        clearcoat={1}
      />
    </instancedMesh>
  );
}

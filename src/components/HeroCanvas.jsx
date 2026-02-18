'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function NeuralNetwork(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    // 1. Constant background rotation
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // 2. Interactive Tilt (Mouse Follow)
    // We target the mouse position and apply a gentle damping for "expensive" smoothness
    const targetX = state.mouse.y * 0.2; // Tilt up/down
    const targetY = state.mouse.x * 0.2; // Tilt left/right

    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#92f63bff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for extra "glow"
        />
      </Points>
    </group>
  );
}

// THIS IS THE COMPONENT HERO.JSX IS LOOKING FOR
export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
           <NeuralNetwork />
        </Float>
      </Canvas>
    </div>
  );
}
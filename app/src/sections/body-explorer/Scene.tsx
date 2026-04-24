import { Canvas } from '@react-three/fiber';
import { type ReactNode } from 'react';

interface SceneProps {
  children: ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <Canvas
      className="absolute inset-0"
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 5, 12], fov: 50, near: 0.1, far: 100 }}
      style={{ background: '#0B0E17' }}
    >
      <fog attach="fog" args={['#0B0E17', 15, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#4FC3F7" />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#B388FF" />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#FF4081" distance={8} />
      {children}
    </Canvas>
  );
}

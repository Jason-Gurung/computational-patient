import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';

const MODEL_PATHS = HEART_ZOOM_LEVELS.map((l) => l.modelPath);

interface ModelViewerProps {
  zoomIndex: number;
}

export function ModelViewer({ zoomIndex }: ModelViewerProps) {
  const path = MODEL_PATHS[zoomIndex] ?? MODEL_PATHS[0];
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GLTFModel key={path} path={path} />
    </Suspense>
  );
}

function GLTFModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingSpinner() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.rotation.x = clock.elapsedTime * 1.5;
      ring.current.rotation.y = clock.elapsedTime;
    }
  });
  return (
    <mesh ref={ring}>
      <torusGeometry args={[0.5, 0.04, 8, 48]} />
      <meshStandardMaterial
        color="#4FC3F7"
        emissive="#4FC3F7"
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Preload all models for smooth transitions
MODEL_PATHS.forEach((p) => useGLTF.preload(p));

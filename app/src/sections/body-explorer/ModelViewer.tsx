import { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';

const MODEL_PATHS = HEART_ZOOM_LEVELS.map((l) => l.modelPath);

export interface ModelBounds {
  center: THREE.Vector3;
  radius: number;
}

interface ModelViewerProps {
  zoomIndex: number;
  onModelReady?: (bounds: ModelBounds) => void;
}

export function ModelViewer({ zoomIndex, onModelReady }: ModelViewerProps) {
  const path = MODEL_PATHS[zoomIndex] ?? MODEL_PATHS[0];
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GLTFModel key={path} path={path} onModelReady={onModelReady} />
    </Suspense>
  );
}

// Names commonly left in Blender exports for grids, planes, cameras, lights
const STRIP_PATTERN = /^(grid|plane|floor|ground|camera|light|lamp|sun|empty)/i;

/**
 * Remove grid planes, stray cameras/lights, and other Blender export artifacts
 * from the loaded scene so only the actual model geometry remains.
 */
function stripBlenderArtifacts(root: THREE.Object3D) {
  const toRemove: THREE.Object3D[] = [];

  root.traverse((child) => {
    // Match by name
    if (STRIP_PATTERN.test(child.name)) {
      toRemove.push(child);
      return;
    }

    // Detect grid-like meshes: very flat (one axis near-zero) and large area
    if (child instanceof THREE.Mesh && child.geometry) {
      child.geometry.computeBoundingBox();
      const box = child.geometry.boundingBox;
      if (box) {
        const size = new THREE.Vector3();
        box.getSize(size);
        const dims = [size.x, size.y, size.z].sort((a, b) => a - b);
        // If the thinnest axis is <1% of the widest, it's likely a flat plane/grid
        if (dims[0] < dims[2] * 0.01 && dims[2] > 1) {
          toRemove.push(child);
        }
      }
    }

    // Also strip GridHelper instances
    if (child instanceof THREE.GridHelper) {
      toRemove.push(child);
    }
  });

  for (const obj of toRemove) {
    obj.removeFromParent();
  }
}

function GLTFModel({ path, onModelReady }: { path: string; onModelReady?: (bounds: ModelBounds) => void }) {
  const { scene } = useGLTF(path);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    // Strip Blender artifacts before computing bounds
    stripBlenderArtifacts(scene);

    if (!group.current || !onModelReady) return;
    const box = new THREE.Box3().setFromObject(group.current);
    if (box.isEmpty()) return;
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    onModelReady({ center: sphere.center.clone(), radius: sphere.radius });
  }, [scene, onModelReady]);

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

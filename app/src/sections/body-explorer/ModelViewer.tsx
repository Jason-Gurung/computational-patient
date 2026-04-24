import { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const MODEL_PATHS = HEART_ZOOM_LEVELS.map((l) => `${base}${l.modelPath}`);

export type ModelVariant =
  | 'base'
  | 'responding-1' | 'responding-2' | 'responding-3'
  | 'progressing-1' | 'progressing-2' | 'progressing-3';

export interface ModelBounds {
  center: THREE.Vector3;
  radius: number;
}

/**
 * Compute the model path for a given zoom level and variant.
 * Full body (index 0) has no variants — always returns the base path.
 * For other levels, appends the staged variant suffix before .glb.
 */
function getVariantPath(zoomIndex: number, variant: ModelVariant): string {
  const basePath = MODEL_PATHS[zoomIndex] ?? MODEL_PATHS[0];
  if (variant === 'base' || zoomIndex === 0) return basePath;
  // e.g. /assets/models/custom/heart-organ.glb → heart-organ-responding-2.glb
  return basePath.replace(/\.glb$/, `-${variant}.glb`);
}

interface ModelViewerProps {
  zoomIndex: number;
  variant?: ModelVariant;
  onModelReady?: (bounds: ModelBounds) => void;
  children?: React.ReactNode;
}

export function ModelViewer({ zoomIndex, variant = 'base', onModelReady, children }: ModelViewerProps) {
  const path = getVariantPath(zoomIndex, variant);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GLTFModel key={path} path={path} onModelReady={onModelReady}>
        {children}
      </GLTFModel>
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
    if (STRIP_PATTERN.test(child.name)) {
      toRemove.push(child);
      return;
    }
    if (child instanceof THREE.Mesh && child.geometry) {
      child.geometry.computeBoundingBox();
      const box = child.geometry.boundingBox;
      if (box) {
        const size = new THREE.Vector3();
        box.getSize(size);
        const dims = [size.x, size.y, size.z].sort((a, b) => a - b);
        if (dims[0] < dims[2] * 0.01 && dims[2] > 1) {
          toRemove.push(child);
        }
      }
    }
    if (child instanceof THREE.GridHelper) {
      toRemove.push(child);
    }
  });

  for (const obj of toRemove) {
    obj.removeFromParent();
  }
}

function GLTFModel({ path, onModelReady, children }: { path: string; onModelReady?: (bounds: ModelBounds) => void; children?: React.ReactNode }) {
  const { scene } = useGLTF(path);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
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
      {children}
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

// Preload base models
MODEL_PATHS.forEach((p) => useGLTF.preload(p));
// Preload all 6 variant stages per zoom level (skip full-body at index 0)
const VARIANT_SUFFIXES = ['responding-1', 'responding-2', 'responding-3', 'progressing-1', 'progressing-2', 'progressing-3'];
for (let i = 1; i < MODEL_PATHS.length; i++) {
  for (const suffix of VARIANT_SUFFIXES) {
    useGLTF.preload(MODEL_PATHS[i].replace(/\.glb$/, `-${suffix}.glb`));
  }
}

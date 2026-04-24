import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Hotspot } from '@/shared/types';
import type { ModelBounds } from './ModelViewer';

interface HotspotOverlayProps {
  hotspots: Hotspot[];
  onNavigate: (index: number) => void;
  currentZoomIndex: number;
  modelBounds: ModelBounds | null;
}

/**
 * Hotspot positions in data are normalized offsets (-1 to 1).
 * We scale them by the model's bounding sphere radius and add to the center.
 */
function resolvePosition(
  normalizedPos: [number, number, number],
  bounds: ModelBounds | null,
): [number, number, number] {
  if (!bounds) return normalizedPos;
  const r = bounds.radius;
  return [
    bounds.center.x + normalizedPos[0] * r,
    bounds.center.y + normalizedPos[1] * r,
    bounds.center.z + normalizedPos[2] * r,
  ];
}

export function HotspotOverlay({ hotspots, onNavigate, currentZoomIndex, modelBounds }: HotspotOverlayProps) {
  return (
    <group>
      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          onClick={() => onNavigate(currentZoomIndex + 1)}
          modelBounds={modelBounds}
        />
      ))}
    </group>
  );
}

function HotspotMarker({
  hotspot,
  onClick,
  modelBounds,
}: {
  hotspot: Hotspot;
  onClick: () => void;
  modelBounds: ModelBounds | null;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.8;
    if (glow.current) {
      const pulse = Math.sin(t * 3) * 0.5 + 0.5;
      glow.current.scale.setScalar(1 + pulse * 0.3);
    }
  });

  const worldPos = resolvePosition(hotspot.position, modelBounds);

  return (
    <group position={worldPos}>
      {/* Pulsing glow sphere — fixed size */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
      {/* Rotating ring — fixed size */}
      <mesh ref={ring}>
        <torusGeometry args={[0.14, 0.01, 8, 32]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>
      {/* HTML label */}
      <Html distanceFactor={6} style={{ pointerEvents: 'auto' }}>
        <button
          onClick={onClick}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-kz-blue/40 bg-kz-bg-secondary/90 px-3 py-1.5 text-xs font-semibold text-kz-blue shadow-[0_0_20px_rgba(79,195,247,0.3)] backdrop-blur-md transition-all hover:border-kz-blue hover:bg-kz-bg-tertiary hover:shadow-[0_0_30px_rgba(79,195,247,0.5)]"
        >
          <span className="h-2 w-2 rounded-full bg-kz-cyan shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
          {hotspot.label}
        </button>
      </Html>
    </group>
  );
}

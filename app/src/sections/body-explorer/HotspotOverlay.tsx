import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Hotspot } from '@/shared/types';

interface HotspotOverlayProps {
  hotspots: Hotspot[];
  onNavigate: (index: number) => void;
  currentZoomIndex: number;
}

export function HotspotOverlay({ hotspots, onNavigate, currentZoomIndex }: HotspotOverlayProps) {
  return (
    <group>
      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          onClick={() => onNavigate(currentZoomIndex + 1)}
        />
      ))}
    </group>
  );
}

function HotspotMarker({ hotspot, onClick }: { hotspot: Hotspot; onClick: () => void }) {
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

  return (
    <group position={hotspot.position}>
      {/* Pulsing glow sphere */}
      <mesh ref={glow}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
      {/* Rotating ring */}
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

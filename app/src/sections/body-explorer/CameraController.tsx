import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { CameraConfig } from '@/shared/types';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControllerProps {
  config: CameraConfig;
}

export function CameraController({ config }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const [transitioning, setTransitioning] = useState(false);
  const transitionProgress = useRef(0);
  const prevConfig = useRef<CameraConfig | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      camera.position.set(...config.position);
      if (controlsRef.current) {
        controlsRef.current.target.set(...config.target);
        controlsRef.current.update();
      }
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = config.fov;
        camera.updateProjectionMatrix();
      }
      prevConfig.current = config;
      isFirstMount.current = false;
      return;
    }

    if (prevConfig.current !== config) {
      setTransitioning(true);
      transitionProgress.current = 0;
      prevConfig.current = config;
    }
  }, [config, camera]);

  useFrame((_, delta) => {
    if (!transitioning || !controlsRef.current) return;

    const speed = 3;
    const t = 1 - Math.exp(-speed * delta);
    transitionProgress.current += delta * speed;

    const targetPos = new THREE.Vector3(...config.position);
    const targetLookAt = new THREE.Vector3(...config.target);

    camera.position.lerp(targetPos, t);
    controlsRef.current.target.lerp(targetLookAt, t);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, config.fov, t);
      camera.updateProjectionMatrix();
    }

    controlsRef.current.update();

    if (transitionProgress.current > 3) {
      setTransitioning(false);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={0.5}
      maxDistance={80}
      enablePan
      panSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      enabled={!transitioning}
    />
  );
}

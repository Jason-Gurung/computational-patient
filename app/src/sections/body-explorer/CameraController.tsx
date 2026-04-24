import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { CameraConfig } from '@/shared/types';

interface CameraControllerProps {
  config: CameraConfig;
}

export function CameraController({ config }: CameraControllerProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(...config.target));
  const isFirstFrame = useRef(true);

  useFrame((_, delta) => {
    const targetPos = new THREE.Vector3(...config.position);
    const targetLookAt = new THREE.Vector3(...config.target);

    if (isFirstFrame.current) {
      camera.position.copy(targetPos);
      lookAtTarget.current.copy(targetLookAt);
      camera.lookAt(lookAtTarget.current);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = config.fov;
        camera.updateProjectionMatrix();
      }
      isFirstFrame.current = false;
      return;
    }

    const speed = 3;
    const t = 1 - Math.exp(-speed * delta);

    camera.position.lerp(targetPos, t);
    lookAtTarget.current.lerp(targetLookAt, t);
    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, config.fov, t);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

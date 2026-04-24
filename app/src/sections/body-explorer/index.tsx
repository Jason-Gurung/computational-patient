import { useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { useSimulationTime } from '@/shared/hooks';
import { getPatientById } from '@/data/patients';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';
import type { CameraConfig } from '@/shared/types';
import { Scene } from './Scene';
import { CameraController } from './CameraController';
import { ModelViewer } from './ModelViewer';
import type { ModelBounds } from './ModelViewer';
import { HotspotOverlay } from './HotspotOverlay';
import { ZoomBreadcrumb } from './ZoomBreadcrumb';
import { ZoomLevelIndicator } from './ZoomLevelIndicator';
import { PatientProfileSidebar } from './PatientProfileSidebar';
import { NarrationOverlay } from './NarrationOverlay';
import { MetricsPanel } from './MetricsPanel';
import { TimelineMilestones } from './TimelineMilestones';

/**
 * Compute an auto-framed camera config that preserves the viewing angle
 * from the data config but adjusts distance so the model fills the view.
 */
function autoFrameCamera(dataConfig: CameraConfig, bounds: ModelBounds): CameraConfig {
  const dataPos = new THREE.Vector3(...dataConfig.position);
  const dataTarget = new THREE.Vector3(...dataConfig.target);

  // Direction the camera looks from (preserved from authored config)
  const direction = dataPos.clone().sub(dataTarget).normalize();

  // Place camera far enough that the bounding sphere fits comfortably
  const fovRad = THREE.MathUtils.degToRad(dataConfig.fov);
  const halfFov = fovRad / 2;
  const padding = 1.8; // snug framing
  const distance = (bounds.radius * padding) / Math.tan(halfFov);

  const newPos = bounds.center.clone().add(direction.multiplyScalar(distance));

  return {
    position: [newPos.x, newPos.y, newPos.z],
    target: [bounds.center.x, bounds.center.y, bounds.center.z],
    fov: dataConfig.fov,
    transitionDuration: dataConfig.transitionDuration,
  };
}

export default function BodyExplorerPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = getPatientById(patientId ?? 'patient-001');
  const [zoomIndex, setZoomIndex] = useState(0);
  const [modelBounds, setModelBounds] = useState<ModelBounds | null>(null);
  const { state: simState, toggle, setWeek, setSpeed } = useSimulationTime(52);

  const currentLevel = HEART_ZOOM_LEVELS[zoomIndex];

  const cameraConfig = useMemo(() => {
    if (!modelBounds) return currentLevel.cameraPosition;
    return autoFrameCamera(currentLevel.cameraPosition, modelBounds);
  }, [currentLevel.cameraPosition, modelBounds]);

  const handleModelReady = useCallback((bounds: ModelBounds) => {
    setModelBounds(bounds);
  }, []);

  const handleNavigate = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, HEART_ZOOM_LEVELS.length - 1));
      setZoomIndex(clamped);
      setModelBounds(null); // reset so auto-frame recalculates for the new model
    },
    [],
  );

  if (!patient) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-kz-bg-primary">
        <div className="text-center">
          <p className="text-lg text-kz-text-secondary">Patient not found</p>
          <Link to="/trial" className="mt-2 text-sm text-kz-blue transition-colors hover:text-kz-cyan">
            Back to trial
          </Link>
        </div>
      </div>
    );
  }

  const isDeepZoom = zoomIndex >= 3;

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-kz-bg-primary">
      {/* 3D Canvas — full viewport */}
      <Scene>
        <CameraController config={cameraConfig} />
        <ModelViewer zoomIndex={zoomIndex} onModelReady={handleModelReady} />
        {currentLevel.hotspots.length > 0 && (
          <HotspotOverlay
            hotspots={currentLevel.hotspots}
            onNavigate={handleNavigate}
            currentZoomIndex={zoomIndex}
          />
        )}
      </Scene>

      {/* Top bar — Back link + Breadcrumb, single row */}
      <div className="absolute left-4 right-4 top-3 z-10 flex items-center gap-3">
        <Link
          to="/trial"
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 px-3 py-1.5 text-xs text-kz-text-secondary backdrop-blur-md transition-colors hover:text-kz-text-primary"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <ZoomBreadcrumb currentIndex={zoomIndex} onNavigate={handleNavigate} />
      </div>

      {/* Right edge — Zoom level indicator dots */}
      <ZoomLevelIndicator currentIndex={zoomIndex} onNavigate={handleNavigate} />

      {/* Left — Patient profile (below top bar) */}
      <PatientProfileSidebar patient={patient} isDeepZoom={isDeepZoom} />

      {/* Right — Narration + Metrics, scrollable, narrower */}
      <div className="absolute right-12 top-14 z-10 flex max-h-[calc(100%-9rem)] w-72 flex-col gap-2 overflow-y-auto">
        <NarrationOverlay
          narrations={currentLevel.narration}
          currentWeek={simState.currentWeek}
        />
        <MetricsPanel metrics={currentLevel.metrics} />
      </div>

      {/* Bottom — Timeline milestones + time controls */}
      <TimelineMilestones
        currentWeek={simState.currentWeek}
        maxWeek={simState.maxWeek}
        isPlaying={simState.isPlaying}
        speed={simState.speed}
        onToggle={toggle}
        onSetWeek={setWeek}
        onSetSpeed={setSpeed}
      />

      {/* Zoom level label — above timeline */}
      <div className="absolute bottom-28 left-4 z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
          {currentLevel.label}
        </p>
      </div>
    </div>
  );
}

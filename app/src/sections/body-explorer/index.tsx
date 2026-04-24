import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSimulationTime } from '@/shared/hooks';
import { getPatientById } from '@/data/patients';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';
import { Scene } from './Scene';
import { CameraController } from './CameraController';
import { ModelViewer } from './ModelViewer';
import { HotspotOverlay } from './HotspotOverlay';
import { ZoomBreadcrumb } from './ZoomBreadcrumb';
import { ZoomLevelIndicator } from './ZoomLevelIndicator';
import { PatientProfileSidebar } from './PatientProfileSidebar';
import { NarrationOverlay } from './NarrationOverlay';
import { MetricsPanel } from './MetricsPanel';
import { TimelineMilestones } from './TimelineMilestones';

export default function BodyExplorerPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = getPatientById(patientId ?? 'patient-001');
  const [zoomIndex, setZoomIndex] = useState(0);
  const { state: simState, toggle, setWeek, setSpeed } = useSimulationTime(52);

  const currentLevel = HEART_ZOOM_LEVELS[zoomIndex];

  const handleNavigate = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, HEART_ZOOM_LEVELS.length - 1));
      setZoomIndex(clamped);
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
        <CameraController config={currentLevel.cameraPosition} />
        <ModelViewer zoomIndex={zoomIndex} />
        {currentLevel.hotspots.length > 0 && (
          <HotspotOverlay
            hotspots={currentLevel.hotspots}
            onNavigate={handleNavigate}
            currentZoomIndex={zoomIndex}
          />
        )}
      </Scene>

      {/* Back to trial link */}
      <Link
        to="/trial"
        className="absolute left-4 top-[3.5rem] z-10 flex items-center gap-1.5 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 px-3 py-1.5 text-xs text-kz-text-secondary backdrop-blur-md transition-colors hover:text-kz-text-primary"
      >
        <ArrowLeft size={14} />
        Back to Trial
      </Link>

      {/* Top — Zoom breadcrumb */}
      <ZoomBreadcrumb currentIndex={zoomIndex} onNavigate={handleNavigate} />

      {/* Right edge — Zoom level indicator dots */}
      <ZoomLevelIndicator currentIndex={zoomIndex} onNavigate={handleNavigate} />

      {/* Left — Patient profile */}
      <PatientProfileSidebar patient={patient} isDeepZoom={isDeepZoom} />

      {/* Right — Narration + Metrics */}
      <div className="absolute right-14 top-16 z-10 flex max-h-[calc(100%-10rem)] flex-col gap-3 overflow-y-auto">
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

      {/* Zoom level label */}
      <div className="absolute bottom-24 left-4 z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
          {currentLevel.label}
        </p>
        <p className="mt-0.5 max-w-xs text-[10px] leading-relaxed text-kz-text-tertiary">
          {currentLevel.description}
        </p>
      </div>
    </div>
  );
}

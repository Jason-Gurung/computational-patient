import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGridPatients, getGridCols } from '@/data/population';
import { OUTCOME_COLORS } from '@/shared/constants/outcomes';
import { ROUTES } from '@/shared/constants/routes';
import type { PatientOutcome, PopulationPatient } from '@/shared/types';
import { PatientTooltip } from './PatientTooltip';

// Target a minimum canvas width so small cohorts don't produce a tiny
// pixelated image that gets upscaled by CSS.
const MIN_CANVAS_WIDTH = 800;

function getDotSize(cohortSize: number, cols: number) {
  let dot: number, gap: number;
  if (cohortSize <= 500) { dot = 12; gap = 3; }
  else if (cohortSize <= 2000) { dot = 8; gap = 2; }
  else if (cohortSize <= 10000) { dot = 6; gap = 1; }
  else if (cohortSize <= 50000) { dot = 3; gap = 1; }
  else { dot = 2; gap = 0; }

  const baseWidth = cols * (dot + gap);
  if (baseWidth < MIN_CANVAS_WIDTH) {
    const scale = MIN_CANVAS_WIDTH / baseWidth;
    dot = Math.round(dot * scale);
    gap = Math.max(1, Math.round(gap * scale));
  }

  return { dot, gap };
}

function getOutcomeAtWeek(patient: PopulationPatient, week: number): PatientOutcome {
  const history = patient.outcomeHistory;
  let current: PatientOutcome = history[0].outcome;
  for (const entry of history) {
    if (entry.weekNumber <= week) {
      current = entry.outcome;
    } else {
      break;
    }
  }
  return current;
}

interface PatientGridProps {
  currentWeek: number;
  activeFilters: PatientOutcome[];
  cohortSize: number;
}

export function PatientGrid({ currentWeek, activeFilters, cohortSize }: PatientGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hoveredPatient, setHoveredPatient] = useState<PopulationPatient | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const hasFilters = activeFilters.length > 0;

  const gridParams = useMemo(() => {
    const cols = getGridCols(cohortSize);
    const rows = Math.ceil(cohortSize / cols);
    const { dot, gap } = getDotSize(cohortSize, cols);
    const cell = dot + gap;
    return { cols, rows, dot, gap, cell, canvasW: cols * cell, canvasH: rows * cell };
  }, [cohortSize]);

  const outcomeColorHex = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [key, val] of Object.entries(OUTCOME_COLORS)) {
      map[key] = val;
    }
    return map;
  }, []);

  // Continuous draw loop for pulsing clickable patients
  const drawRef = useRef<() => void>(undefined);
  drawRef.current = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cols, dot, cell, canvasW, canvasH } = gridParams;
    const now = performance.now() / 1000;

    ctx.clearRect(0, 0, canvasW, canvasH);

    const patients = getGridPatients(cohortSize);
    for (let i = 0; i < patients.length; i++) {
      const p = patients[i];
      const outcome = getOutcomeAtWeek(p, currentWeek);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cell;
      const y = row * cell;

      const dimmed = hasFilters && !activeFilters.includes(outcome);

      if (p.isClickable) {
        // Gentle pulse: oscillate opacity between 0.4 and 1.0
        // Each clickable patient has a slight phase offset for visual interest
        const phase = i * 0.7;
        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(now * 2.5 + phase));
        const ringPulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(now * 2.5 + phase));
        const baseAlpha = dimmed ? 0.12 : pulse;

        ctx.save();
        ctx.globalAlpha = baseAlpha;
        ctx.fillStyle = outcomeColorHex[outcome];

        if (!dimmed) {
          ctx.shadowColor = outcomeColorHex[outcome];
          ctx.shadowBlur = 12 + 4 * Math.sin(now * 2.5 + phase);
        }
        ctx.beginPath();
        ctx.arc(x + dot / 2, y + dot / 2, dot / 2 + 1, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.shadowBlur = 0;
        ctx.globalAlpha = dimmed ? 0.08 : ringPulse * 0.7;
        ctx.strokeStyle = '#ECEFF1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x + dot / 2, y + dot / 2, dot / 2 + 2.5 + Math.sin(now * 2.5 + phase) * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.globalAlpha = dimmed ? 0.08 : 1;
        ctx.fillStyle = outcomeColorHex[outcome];
        ctx.beginPath();
        ctx.roundRect(x, y, dot, dot, 1);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    startTimeRef.current = performance.now();
    let running = true;

    function loop() {
      if (!running) return;
      drawRef.current?.();
      animFrameRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentWeek, activeFilters, hasFilters, outcomeColorHex, cohortSize, gridParams]);

  const getPatientAtPos = useCallback((clientX: number, clientY: number): PopulationPatient | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const { cols, rows, cell, canvasW, canvasH } = gridParams;
    const scaleX = canvasW / rect.width;
    const scaleY = canvasH / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top) * scaleY;

    const col = Math.floor(cx / cell);
    const row = Math.floor(cy / cell);
    if (col < 0 || col >= cols || row < 0 || row >= rows) return null;

    const idx = row * cols + col;
    const patients = getGridPatients(cohortSize);
    if (idx >= patients.length) return null;
    const patient = patients[idx];
    if (patient?.isClickable) return patient;
    return null;
  }, [cohortSize, gridParams]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const patient = getPatientAtPos(e.clientX, e.clientY);
    setHoveredPatient(patient);
    if (patient) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  }, [getPatientAtPos]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const patient = getPatientAtPos(e.clientX, e.clientY);
    if (patient?.linkedPatientId) {
      navigate(ROUTES.BODY_EXPLORER(patient.linkedPatientId));
    }
  }, [getPatientAtPos, navigate]);

  const handleMouseLeave = useCallback(() => {
    setHoveredPatient(null);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={gridParams.canvasW}
        height={gridParams.canvasH}
        className="h-auto w-full cursor-crosshair rounded-xl border border-kz-border-default bg-kz-bg-secondary"
        style={{ imageRendering: 'pixelated' }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredPatient && (
        <PatientTooltip patient={hoveredPatient} position={tooltipPos} currentWeek={currentWeek} />
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-kz-text-tertiary">
          {cohortSize.toLocaleString()} virtual patients
        </span>
        <span className="text-xs text-kz-text-tertiary">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-kz-cyan" />{' '}
          3 pulsing dots are explorable — click to enter body explorer
        </span>
      </div>
    </div>
  );
}

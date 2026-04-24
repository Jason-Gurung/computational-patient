import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { gridPatients, CLICKABLE_PATIENT_IDS } from '@/data/population';
import { OUTCOME_COLORS } from '@/shared/constants/outcomes';
import { ROUTES } from '@/shared/constants/routes';
import type { PatientOutcome, PopulationPatient } from '@/shared/types';
import { PatientTooltip } from './PatientTooltip';

const COLS = 100;
const ROWS = 100;
const DOT_SIZE = 6;
const GAP = 1;
const CELL = DOT_SIZE + GAP;
const CANVAS_W = COLS * CELL;
const CANVAS_H = ROWS * CELL;

// Clickable patient lookup for fast hit-testing
const clickableMap = new Map<string, PopulationPatient>();
for (const p of gridPatients) {
  if (p.isClickable) clickableMap.set(p.id, p);
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
}

export function PatientGrid({ currentWeek, activeFilters }: PatientGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [hoveredPatient, setHoveredPatient] = useState<PopulationPatient | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const hasFilters = activeFilters.length > 0;

  // Pre-compute colour hex to avoid lookups per pixel
  const outcomeColorHex = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [key, val] of Object.entries(OUTCOME_COLORS)) {
      map[key] = val;
    }
    return map;
  }, []);

  // Draw the grid
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    for (let i = 0; i < gridPatients.length; i++) {
      const p = gridPatients[i];
      const outcome = getOutcomeAtWeek(p, currentWeek);
      const x = p.gridPosition.col * CELL;
      const y = p.gridPosition.row * CELL;

      const dimmed = hasFilters && !activeFilters.includes(outcome);

      ctx.globalAlpha = dimmed ? 0.08 : 1;
      ctx.fillStyle = outcomeColorHex[outcome];

      if (p.isClickable) {
        // Draw a slightly larger circle with glow for clickable patients
        ctx.save();
        if (!dimmed) {
          ctx.shadowColor = outcomeColorHex[outcome];
          ctx.shadowBlur = 10;
        }
        ctx.beginPath();
        ctx.arc(x + DOT_SIZE / 2, y + DOT_SIZE / 2, DOT_SIZE / 2 + 1, 0, Math.PI * 2);
        ctx.fill();

        // Ring
        ctx.shadowBlur = 0;
        ctx.globalAlpha = dimmed ? 0.1 : 0.7;
        ctx.strokeStyle = '#ECEFF1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x + DOT_SIZE / 2, y + DOT_SIZE / 2, DOT_SIZE / 2 + 2.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else {
        // Regular patient: small rounded rect
        ctx.beginPath();
        ctx.roundRect(x, y, DOT_SIZE, DOT_SIZE, 1);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, [currentWeek, activeFilters, hasFilters, outcomeColorHex]);

  useEffect(() => {
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  // Hit-test for clickable patients
  const getPatientAtPos = useCallback((clientX: number, clientY: number): PopulationPatient | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top) * scaleY;

    const col = Math.floor(cx / CELL);
    const row = Math.floor(cy / CELL);
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null;

    const idx = row * COLS + col;
    const patient = gridPatients[idx];
    if (patient?.isClickable) return patient;
    return null;
  }, []);

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
        width={CANVAS_W}
        height={CANVAS_H}
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
          10,000 virtual patients — {CLICKABLE_PATIENT_IDS.length} explorable
        </span>
        <span className="text-xs text-kz-text-tertiary">
          100 × 100 grid
        </span>
      </div>
    </div>
  );
}

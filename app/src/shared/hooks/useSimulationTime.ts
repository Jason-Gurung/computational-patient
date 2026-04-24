import { useState, useCallback, useRef, useEffect } from 'react';

interface SimulationTimeState {
  currentWeek: number;
  isPlaying: boolean;
  speed: number;
  maxWeek: number;
}

interface SimulationTimeControls {
  state: SimulationTimeState;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setWeek: (week: number) => void;
  setSpeed: (speed: number) => void;
}

export function useSimulationTime(maxWeek = 52): SimulationTimeControls {
  const [state, setState] = useState<SimulationTimeState>({
    currentWeek: 0,
    isPlaying: false,
    speed: 1,
    maxWeek,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setWeek = useCallback((week: number) => {
    setState((prev) => ({ ...prev, currentWeek: Math.max(0, Math.min(week, prev.maxWeek)) }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, speed }));
  }, []);

  useEffect(() => {
    if (state.isPlaying) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const next = prev.currentWeek + 1;
          if (next > prev.maxWeek) {
            return { ...prev, currentWeek: prev.maxWeek, isPlaying: false };
          }
          return { ...prev, currentWeek: next };
        });
      }, 1000 / state.speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isPlaying, state.speed]);

  return { state, play, pause, toggle, setWeek, setSpeed };
}

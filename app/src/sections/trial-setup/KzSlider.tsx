interface KzSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function KzSlider({ min, max, step, value, onChange }: KzSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative h-6">
      {/* Visual track (background) */}
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-kz-bg-surface" />

      {/* Visual fill */}
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-kz-blue"
        style={{ width: `${pct}%` }}
      />

      {/* Visual thumb */}
      <div
        className="pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kz-blue bg-kz-text-primary shadow-[0_0_8px_rgba(79,195,247,0.4)]"
        style={{ left: `${pct}%` }}
      />

      {/* Invisible native input for interaction */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function formatPercent(n: number, decimals = 0): string {
  return `${(n * 100).toFixed(decimals)}%`;
}

export function formatWeekLabel(week: number): string {
  if (week === 0) return 'Baseline';
  if (week < 4) return `Week ${week}`;
  const months = Math.round(week / 4.33);
  return `Month ${months}`;
}

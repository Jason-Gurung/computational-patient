interface FilterItem {
  id: string;
  label: string;
  color: string;
}

interface FilterBarProps {
  items: FilterItem[];
  activeIds: string[];
  onToggle: (id: string) => void;
}

export function FilterBar({ items, activeIds, onToggle }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = activeIds.includes(item.id);
        return (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              isActive
                ? 'border-transparent text-kz-bg-primary'
                : 'border-kz-border-default text-kz-text-tertiary hover:border-kz-border-strong'
            }`}
            style={isActive ? { backgroundColor: item.color } : undefined}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

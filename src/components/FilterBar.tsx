interface Props<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  counts?: Partial<Record<T, number>>;
}

/** Category filter chips (toggle buttons; keyboard and screen-reader friendly). */
export default function FilterBar<T extends string>({ options, value, onChange, label, counts }: Props<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2 print:hidden">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`label border px-3.5 py-2 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
              active ? 'border-ink bg-ink text-paper' : 'border-line bg-transparent text-ink-soft hover:border-ink'
            }`}
          >
            {o}
            {counts?.[o] !== undefined && <span className={`ml-2 ${active ? 'text-paper/60' : 'text-muted'}`}>{counts[o]}</span>}
          </button>
        );
      })}
    </div>
  );
}

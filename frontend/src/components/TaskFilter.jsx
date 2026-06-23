export const TaskFilter = ({ filter, onChange, counts }) => {
  const options = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="filter" role="tablist" aria-label="Filter tasks">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          role="tab"
          aria-selected={filter === opt.key}
          className={`filter__btn ${filter === opt.key ? 'is-active' : ''}`}
          onClick={() => onChange(opt.key)}
        >
          {opt.label}
          <span className="filter__count">{opt.count}</span>
        </button>
      ))}
    </div>
  );
}
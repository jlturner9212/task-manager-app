export default function SearchBar({ query, status, priority, onChange }) {
  const inputStyle = {
    backgroundColor: '#1a2030',
    border: '1px solid #334155',
    color: '#cbd5e1',
    fontSize: '14px',
    padding: '8px 12px',
    outline: 'none',
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onChange({ query: e.target.value })}
        style={{ ...inputStyle, flex: '1', minWidth: '200px' }}
      />
      <div style={{ position: 'relative' }}>
        <select
          value={status}
          onChange={(e) => onChange({ status: e.target.value })}
          style={{ ...inputStyle, paddingRight: '28px', cursor: 'pointer' }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
      </div>
      <div style={{ position: 'relative' }}>
        <select
          value={priority}
          onChange={(e) => onChange({ priority: e.target.value })}
          style={{ ...inputStyle, paddingRight: '28px', cursor: 'pointer' }}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
      </div>
    </div>
  );
}
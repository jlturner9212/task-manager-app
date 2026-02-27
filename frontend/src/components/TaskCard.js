const statusConfig = {
  pending:     { label: 'Pending',     classes: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' },
  in_progress: { label: 'In Progress', classes: 'bg-blue-900/30 text-blue-400 border border-blue-800' },
  completed:   { label: 'Completed',   classes: 'bg-green-900/30 text-green-400 border border-green-800' },
};

const priorityConfig = {
  low:    { label: 'Low',    color: '#4ade80', count: 1 },
  medium: { label: 'Medium', color: '#facc15', count: 2 },
  high:   { label: 'High',   color: '#f87171', count: 3 },
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const status = statusConfig[task.status] || statusConfig.pending;
  const priority = priorityConfig[task.priority] || priorityConfig.low;

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors group">
      <td className="px-4 py-3 font-medium text-slate-100">{task.title}</td>
      <td className="px-4 py-3 text-sm text-slate-400 max-w-xs truncate">{task.description}</td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold px-2 py-1 ${status.classes}`}>
          {status.label}
        </span>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: i <= priority.count ? priority.color : 'rgba(255,255,255,0.1)',
              border: `1px solid ${i <= priority.count ? priority.color : 'rgba(255,255,255,0.15)'}`,
              boxShadow: i <= priority.count ? `0 0 6px ${priority.color}` : 'none',
            }} />
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 font-mono">{task.due_date || '—'}</td>
      <td style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onEdit(task)}
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#60a5fa',
            background: 'transparent',
            border: '1px solid rgba(96,165,250,0.3)',
            cursor: 'pointer',
            padding: '4px 10px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.target.style.backgroundColor = 'rgba(96,165,250,0.1)'; e.target.style.borderColor = '#60a5fa'; }}
          onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(96,165,250,0.3)'; }}
          >
          Edit
        </button>
        <button onClick={() => onDelete(task.id)}
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#f87171',
            background: 'transparent',
            border: '1px solid rgba(248,113,113,0.3)',
            cursor: 'pointer',
            padding: '4px 10px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.target.style.backgroundColor = 'rgba(248,113,113,0.1)'; e.target.style.borderColor = '#f87171'; }}
          onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(248,113,113,0.3)'; }}
          >
          Delete
        </button>
      </div>
      </td>
    </tr>
  );
}
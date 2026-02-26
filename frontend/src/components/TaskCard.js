const statusConfig = {
  pending:     { label: 'Pending',     classes: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' },
  in_progress: { label: 'In Progress', classes: 'bg-blue-900/30 text-blue-400 border border-blue-800' },
  completed:   { label: 'Completed',   classes: 'bg-green-900/30 text-green-400 border border-green-800' },
};

const priorityConfig = {
  low:    { label: 'Low',    classes: 'text-slate-400' },
  medium: { label: 'Medium', classes: 'text-yellow-400' },
  high:   { label: 'High',   classes: 'text-red-400 font-bold' },
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
      <td className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${priority.classes}`}>
        {priority.label}
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
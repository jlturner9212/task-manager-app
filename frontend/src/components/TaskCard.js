const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700',
};

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 font-medium">{task.title}</td>
      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{task.description}</td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{task.due_date || '—'}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
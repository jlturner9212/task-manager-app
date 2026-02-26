import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border border-slate-800">
        <p className="text-slate-600 text-xs tracking-widest uppercase">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-800 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-[#0d1117]">
            {['Title', 'Description', 'Status', 'Priority', 'Due Date', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
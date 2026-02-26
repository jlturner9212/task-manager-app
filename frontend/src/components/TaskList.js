import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 text-center py-10">No tasks found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 text-left text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Actions</th>
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
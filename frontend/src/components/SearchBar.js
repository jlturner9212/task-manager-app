export default function SearchBar({ query, status, priority, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onChange({ query: e.target.value })}
        className="border rounded px-3 py-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={status}
        onChange={(e) => onChange({ status: e.target.value })}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={priority}
        onChange={(e) => onChange({ priority: e.target.value })}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
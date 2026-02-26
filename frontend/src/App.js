import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ query: '', status: '', priority: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getTasks({
        q: filters.query,
        status: filters.status,
        priority: filters.priority,
      });
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleFilterChange = (changed) => setFilters((f) => ({ ...f, ...changed }));

  const handleSubmit = async (form) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
      } else {
        await createTask(form);
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    fetchTasks();
  };

  const handleCancel = () => { setShowForm(false); setEditingTask(null); };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + New Task
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <SearchBar {...filters} onChange={handleFilterChange} />
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

      {showForm && (
        <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
    </div>
  );
}
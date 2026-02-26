import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';

const container = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 40px',
};

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
      if (editingTask) { await updateTask(editingTask.id, form); }
      else { await createTask(form); }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) { console.error('Failed to save task', err); }
  };
  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    fetchTasks();
  };
  const handleCancel = () => { setShowForm(false); setEditingTask(null); };

  const stats = [
    { label: 'Total',       value: tasks.length,                                         color: '#e2e8f0' },
    { label: 'Pending',     value: tasks.filter(t => t.status === 'pending').length,      color: '#facc15' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length,  color: '#60a5fa' },
    { label: 'Completed',   value: tasks.filter(t => t.status === 'completed').length,    color: '#4ade80' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0c10', color: '#e2e8f0' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0d1117' }}>
        <div style={{ ...container, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#60a5fa', whiteSpace: 'nowrap' }}>
              Task Manager
            </span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '8px 20px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0d1117' }}>
        <div style={{ ...container, paddingTop: '40px', paddingBottom: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: '8px' }}>
            Operational Dashboard
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>
            Mission Control
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>
            Track, prioritize, and execute tasks with clarity.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0d1117' }}>
        <div style={{ ...container, paddingTop: '24px', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {stats.map(({ label, value, color }, i) => (
              <div key={label} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '0 24px',
                borderLeft: i > 0 ? '1px solid #1e293b' : 'none',
              }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</span>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#475569' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main style={{ ...container, paddingTop: '32px', paddingBottom: '32px' }}>
        <SearchBar {...filters} onChange={handleFilterChange} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Loading...
          </div>
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
import { useState, useEffect } from 'react';

const empty = { title: '', description: '', status: 'pending', priority: 'medium', due_date: '' };

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => { setForm(task ? { ...task } : empty); }, [task]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

  const inputClass = "w-full bg-[#0a0c10] border border-slate-700 text-slate-200 text-sm px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#0d1117] border border-slate-700 w-full max-w-md">
        {/* Modal header */}
        <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-blue-500" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-400">
              {task ? 'Edit Task' : 'New Task'}
            </span>
          </div>
          <button onClick={onCancel} className="text-slate-600 hover:text-slate-400 text-lg leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Task title" />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} placeholder="Task description" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex-1">
              <label className={labelClass}>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input type="date" name="due_date" value={form.due_date || ''} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-800 mt-4">
            <button type="button" onClick={onCancel}
              className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-blue-600 hover:bg-blue-500 text-white transition-colors">
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
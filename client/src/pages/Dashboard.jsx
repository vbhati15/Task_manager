import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard({ token, user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    try {
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (err) {
      setError(err.error || 'Could not load tasks');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    const t = await createTask(payload, token);
    setTasks(prev => [t, ...prev]);
  };
  const handleToggle = async (task) => {
    const updated = await updateTask(task.id, { completed: !task.completed }, token);
    setTasks(prev => prev.map(p => p.id === task.id ? updated : p));
  };
  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen p-6 app-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">My Tasks</h2>
          <p className="subtle">Stay organized, ship faster ✨</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-4 subtle">
            <div className="text-sm">Signed in as</div>
            <div className="font-medium">{user?.name}</div>
          </div>
          <button onClick={onLogout} className="px-3 py-2 rounded-lg border hover:bg-white/80">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-4">
            <TaskForm onCreate={handleCreate} />
          </div>

          <div className="card p-4">
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {loading ? <div>Loading...</div> : <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="subtle">Total tasks</div>
                <div className="font-medium">{tasks.length}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="subtle">Completed</div>
                <div className="font-medium">{completedCount}</div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-2">Quick tips</h3>
            <ul className="text-sm text-slate-600 list-disc pl-5">
              <li>Prioritize 3 tasks each day.</li>
              <li>Use categories to filter faster.</li>
              <li>Keep descriptions short and actionable.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

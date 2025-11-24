import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white/95 p-4 rounded-xl shadow-sm flex items-start justify-between hover:shadow-glow transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} className="h-5 w-5" />
          <div>
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</h3>
            {task.description && <p className="text-sm text-slate-600 mt-1">{task.description}</p>}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-600">{task.category}</span>
              <span className="text-xs subtle">{new Date(task.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4">
        <button className="text-sm text-red-600 hover:underline" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}


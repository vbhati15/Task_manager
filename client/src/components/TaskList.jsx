import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <div className="text-slate-500">No tasks yet — add one above.</div>;
  return (
    <div className="grid gap-3">
      {tasks.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}
    </div>
  );
}

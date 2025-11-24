import React, { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [desc, setDesc] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title: title.trim(), description: desc, category });
    setTitle(''); setDesc(''); setCategory('General');
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task title"
          className="flex-1 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
        <select value={category} onChange={e=>setCategory(e.target.value)}
          className="w-36 border border-slate-200 rounded-lg px-3 py-3 focus:outline-none">
          <option>General</option>
          <option>Work</option>
          <option>Study</option>
          <option>Personal</option>
        </select>
        <button className="btn-primary" type="submit">Add</button>
      </div>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows="3" placeholder="Optional description"
        className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
    </form>
  );
}

import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('test@demo.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await login(email, password);
      onAuth(res.token, res.user);
    } catch (error) {
      setErr(error.error || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:flex items-center justify-center">
          <div className="w-64 h-64 rounded-xl card flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
              <p className="subtle">Manage tasks, stay focused, ship faster.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handle} className="card p-6">
          <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
          {err && <div className="text-red-600 mb-2">{err}</div>}
          <label className="block mb-3">
            <span className="text-sm">Email</span>
            <input value={email} onChange={e=>setEmail(e.target.value)}
              className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300" />
          </label>
          <label className="block mb-4">
            <span className="text-sm">Password</span>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300" />
          </label>
          <button className="w-full btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <p className="mt-3 text-xs text-slate-500">Use <strong>test@demo.com</strong> / <strong>password123</strong></p>
        </form>
      </div>
    </div>
  );
}


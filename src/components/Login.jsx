import React, { useState } from 'react';
import { LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { credentials } from '../data/mockData.js';

export function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (username.trim() === credentials.username && password === credentials.password) {
      setError('');
      onLogin(username.trim());
      window.location.hash = window.location.hash || '#/';
      return;
    }
    setError('Invalid username or password');
  };

  return (
    <main className="login-shell">
      <section className="login-hero">
        <span className="pill"><ShieldCheck size={15} /> Secure workspace</span>
        <h1>Lead quality and response intelligence</h1>
        <p>Access the operational model for lead intake, response SLA, drop-off analysis, and sales follow-up accountability.</p>
      </section>
      <form className="login-card" onSubmit={submit}>
        <div className="login-icon"><UserRound size={28} /></div>
        <span className="eyebrow">Admin access</span>
        <h2>Lead-Check</h2>
        <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="whitebegin" autoComplete="username" /></label>
        <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="12345" type="password" autoComplete="current-password" /></label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit"><LockKeyhole size={17} /> Sign in</button>
      </form>
    </main>
  );
}

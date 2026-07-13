import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export function Shell({ routes, activeRoute, user, onLogout, children }) {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#/">
          <MessageCircle /> Lead-Check
        </a>
        <nav>
          {routes.map(({ id, path, label, icon: Icon }) => (
            <a className={activeRoute.id === id ? 'active' : ''} href={`#${path}`} key={id}>
              <Icon /> {label}
            </a>
          ))}
        </nav>
        <div className="user-panel">
          <span>Workspace</span>
          <strong>{user}</strong>
          <button className="logout" onClick={onLogout}>Sign out</button>
        </div>
      </aside>
      <section className="page">
        {children}
        <footer>
          <CheckCircle2 size={18} /> Lead-Check model template for lead quality, response SLA, and sales accountability.
        </footer>
      </section>
    </main>
  );
}

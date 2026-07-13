import React, { useState } from 'react';
import { CheckCircle2, KeyRound, PlugZap, ShieldCheck } from 'lucide-react';
import { apiConnectors } from '../data/mockData.js';

export function ApiConnectorPanel() {
  const [selected, setSelected] = useState(apiConnectors[0].id);
  const [saved, setSaved] = useState('');
  const connector = apiConnectors.find((item) => item.id === selected);

  return (
    <section className="panel api-panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">API connector layer</span>
          <h2>Prepare platform credentials and sync rules</h2>
        </div>
        <span className="status-pill"><ShieldCheck size={15} /> Secrets handled by backend</span>
      </div>

      <div className="api-grid">
        <div className="connector-list">
          {apiConnectors.map((item) => (
            <button className={selected === item.id ? 'selected' : ''} key={item.id} onClick={() => setSelected(item.id)}>
              <PlugZap size={17} />
              <span>{item.name}</span>
              <small>{item.status}</small>
            </button>
          ))}
        </div>

        <div className="connector-detail">
          <div className="connector-header">
            <div>
              <span className="eyebrow">Connector</span>
              <h3>{connector.name}</h3>
            </div>
            <b>{connector.status}</b>
          </div>

          <label>Webhook / Sync endpoint<input value={connector.endpoint} readOnly /></label>

          <div className="field-grid">
            {connector.fields.map((field) => (
              <label key={field}>{field}<input placeholder="Stored securely on backend" type={field.toLowerCase().includes('secret') || field.toLowerCase().includes('token') ? 'password' : 'text'} /></label>
            ))}
          </div>

          <div className="api-meta">
            <article>
              <KeyRound size={17} />
              <h4>Required scopes</h4>
              <ul>{connector.scopes.map((scope) => <li key={scope}>{scope}</li>)}</ul>
            </article>
            <article>
              <CheckCircle2 size={17} />
              <h4>Mapped objects</h4>
              <ul>{connector.objects.map((object) => <li key={object}>{object}</li>)}</ul>
            </article>
          </div>

          <div className="connector-actions">
            <button type="button">Test connection</button>
            <button type="button" className="ghost" onClick={() => setSaved(connector.id)}>
              {saved === connector.id ? 'Configuration saved' : 'Save configuration'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

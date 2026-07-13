import React, { useState } from 'react';
import { ScanLine, Upload } from 'lucide-react';
import { scannedLeads } from '../data/mockData.js';

export function ScannerPanel() {
  const [preview, setPreview] = useState('');
  const [scanned, setScanned] = useState(false);
  const [imported, setImported] = useState(false);

  const loadFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setScanned(false);
    setImported(false);
  };

  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Name extraction</span>
          <h2>Facebook inbox screenshot reader</h2>
        </div>
        <label className="upload-button">
          <Upload size={16} /> Upload image
          <input type="file" accept="image/*" onChange={loadFile} />
        </label>
      </div>
      <div className="scanner-grid">
        <div className="scan-preview">
          {preview ? <img src={preview} alt="Uploaded Facebook inbox screenshot" /> : <div className="empty-upload">No image selected</div>}
        </div>
        <div className="scan-result">
          <div className="scan-actions">
            <div>
              <span className="eyebrow">Detected profiles</span>
              <h3>{scanned ? `${scannedLeads.length} names found` : 'Ready to scan'}</h3>
            </div>
            <button onClick={() => setScanned(true)} disabled={!preview}><ScanLine size={17} /> Extract names</button>
          </div>
          {!scanned ? (
            <p className="scan-empty">Upload a Facebook inbox screenshot to extract profile names and prepare them for lead intake.</p>
          ) : (
            <>
              <div className="name-list">
                {scannedLeads.map((lead) => (
                  <article key={lead.name}>
                    <div>
                      <strong>{lead.name}</strong>
                      <span>{lead.source}</span>
                    </div>
                    <b>{lead.confidence}%</b>
                  </article>
                ))}
              </div>
              <div className="scan-controls">
                <select defaultValue="Facebook Page">
                  <option>Facebook Page</option>
                  <option>TikTok Inbox</option>
                  <option>LINE OA</option>
                </select>
                <select defaultValue="Intake">
                  <option>Intake</option>
                  <option>Qualified</option>
                  <option>Follow-up</option>
                </select>
              </div>
              <button className={imported ? 'success-button' : ''} onClick={() => setImported(true)}>
                {imported ? 'Imported to lead intake' : 'Import selected names'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

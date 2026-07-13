import React from 'react';
import { PlusCircle } from 'lucide-react';
import { PageTitle } from '../components/PageTitle.jsx';
import { LeadTable } from '../components/LeadTable.jsx';
import { dropOffs } from '../data/mockData.js';

export function Leads() {
  return (
    <>
      <PageTitle eyebrow="Lead dimension" title="Lead intake and drop-off classification" description="Record customer attributes, assign source channels, and classify where each lead leaves the sales process." />
      <section className="two-column wide-left">
        <form className="panel form-panel">
          <h2><PlusCircle size={18} /> Lead intake form</h2>
          <label>Name / phone<input placeholder="Customer name or phone number" /></label>
          <label>Source<select><option>Facebook Ads</option><option>TikTok Ads</option><option>LINE OA</option><option>Referral</option></select></label>
          <label>Current stage<select><option>Intake</option><option>Qualified</option><option>Appointment</option><option>Closed</option><option>Drop-off</option></select></label>
          <label>Sales note<textarea placeholder="Requirement, budget, next action, and follow-up owner"></textarea></label>
          <button type="button">Save lead record</button>
        </form>
        <section className="panel">
          <span className="eyebrow">Drop-off model</span>
          <h2>Classification rules</h2>
          <div className="drop-list">
            {dropOffs.map((item) => (
              <article key={item.stage}>
                <div>
                  <h3>{item.stage}</h3>
                  <p>{item.reason}</p>
                </div>
                <strong>{item.people}</strong>
                <span>{item.owner}</span>
                <b>{item.action}</b>
              </article>
            ))}
          </div>
        </section>
      </section>
      <LeadTable />
    </>
  );
}

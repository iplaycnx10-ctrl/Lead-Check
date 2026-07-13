import React from 'react';
import { CalendarDays } from 'lucide-react';
import { leads } from '../data/mockData.js';

export function LeadTable() {
  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Lead registry</span>
          <h2>Customer records</h2>
        </div>
        <button className="ghost"><CalendarDays size={16} /> Export</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Source</th>
              <th>Status</th>
              <th>Response</th>
              <th>Note</th>
              <th>Next date</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell, index) => <td key={`${cell}-${index}`} className={index === 2 ? 'status-cell' : ''}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

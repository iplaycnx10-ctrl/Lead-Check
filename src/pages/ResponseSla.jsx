import React from 'react';
import { BellRing, MessageCircle } from 'lucide-react';
import { PageTitle } from '../components/PageTitle.jsx';
import { appointments } from '../data/mockData.js';

export function ResponseSla() {
  return (
    <>
      <PageTitle eyebrow="SLA fact table" title="Response time and appointment controls" description="Monitor sales response time, appointment schedule, reminder status, and follow-up completion." />
      <section className="two-column">
        <section className="panel">
          <div className="section-head">
            <div>
              <span className="eyebrow">Appointment plan</span>
              <h2>High-intent schedule</h2>
            </div>
            <button className="ghost"><BellRing size={16} /> Reminder rule</button>
          </div>
          <div className="appointment-list">
            {appointments.map((item) => (
              <article key={`${item.date}-${item.name}`}>
                <div className="datebox">
                  <strong>{item.date}</strong>
                  <span>{item.day}</span>
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.time} - {item.type}</p>
                </div>
                <b>{item.score}%</b>
              </article>
            ))}
          </div>
        </section>
        <section className="panel accent-panel">
          <MessageCircle />
          <span className="eyebrow">LINE reminder</span>
          <h2>Follow-up enforcement</h2>
          <p>Send reminders before and after appointments, then require sales to record outcome status for BI reporting.</p>
          <div className="reminder-bubble">คุณ D: appointment at 14:00 today. Update result after meeting.</div>
        </section>
      </section>
    </>
  );
}

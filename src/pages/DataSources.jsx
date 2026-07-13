import React from 'react';
import { BellRing, Database, MessageCircle, ScanLine } from 'lucide-react';
import { PageTitle } from '../components/PageTitle.jsx';

export function DataSources() {
  return (
    <>
      <PageTitle eyebrow="Source system" title="Data source and integration design" description="Prepare each ingestion path as a modular connector so future API, CSV, and reminder workflows can be maintained independently." />
      <section className="source-strip source-grid">
        {[
          ['Facebook Page API', 'Conversation, sender profile, timestamp, campaign metadata', MessageCircle],
          ['Name Scanner', 'Screenshot-based profile name extraction for backfill', ScanLine],
          ['LINE OA Reminder', 'Appointment reminder and follow-up status capture', BellRing],
          ['CSV / CRM Import', 'Legacy lead import and data reconciliation', Database],
        ].map(([title, text, Icon]) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
            <span>Module ready</span>
          </article>
        ))}
      </section>
    </>
  );
}

import React from 'react';
import { Clock3, Database, MessageCircle, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { stages } from '../data/mockData.js';
import { MetricCard } from '../components/Metrics.jsx';
import { TrendChart } from '../components/TrendChart.jsx';

export function Dashboard({ period, setPeriod, chartData }) {
  return (
    <>
      <section className="hero-minimal">
        <div>
          <span className="eyebrow">Lead intelligence model</span>
          <h1>Measure lead quality, response SLA, and sales accountability.</h1>
          <p>A lightweight BI model for Facebook Page leads, drop-off checkpoints, appointment follow-up, and channel performance.</p>
        </div>
        <div className="model-card">
          <span>Primary measure</span>
          <strong>4.8 min</strong>
          <p>Average first response</p>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard icon={MessageCircle} label="Conversation fact" value="500" change="+24% MoM" />
        <MetricCard icon={Clock3} label="SLA within 5 min" value="78%" change="+11%" />
        <MetricCard icon={Users} label="Qualified leads" value="175" change="+32%" />
        <MetricCard icon={TrendingUp} label="Forecast leads" value="25" change="High intent" />
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <span className="eyebrow">Dimension flow</span>
            <h2>Lead journey checkpoints</h2>
          </div>
          <p>Each stage can be used as a reporting dimension for sales and marketing review.</p>
        </div>
        <div className="stage-grid">
          {stages.map((stage) => (
            <article className="stage-card" key={stage.id}>
              <b>{stage.id}</b>
              <h3>{stage.label}</h3>
              <strong>{stage.count}</strong>
              <span>{stage.percent}% of total</span>
              <p>{stage.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="two-column">
        <TrendChart data={chartData} period={period} setPeriod={setPeriod} />
        <section className="panel">
          <ShieldCheck />
          <span className="eyebrow">Control purpose</span>
          <h2>Marketing proof layer</h2>
          <p>Separate true lead quality issues from response delay, missed follow-up, and incomplete sales notes.</p>
          <div className="proof-list">
            <span><b>82%</b> complete lead attributes</span>
            <span><b>37</b> SLA breach cases</span>
            <span><b>18</b> missed follow-up cases</span>
          </div>
        </section>
      </section>

      <section className="source-strip">
        {[
          ['Facebook Page', 'Conversation and profile dimension', MessageCircle],
          ['LINE OA', 'Reminder and appointment channel', Clock3],
          ['CSV / CRM', 'Legacy lead import', Database],
        ].map(([title, text, Icon]) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}

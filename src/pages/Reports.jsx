import React from 'react';
import { LineChart } from 'lucide-react';
import { PageTitle } from '../components/PageTitle.jsx';
import { LeadTable } from '../components/LeadTable.jsx';
import { TrendChart } from '../components/TrendChart.jsx';

export function Reports({ period, setPeriod, chartData }) {
  return (
    <>
      <PageTitle eyebrow="Semantic model" title="Lead quality and sales accountability report" description="A reporting surface inspired by SSAS-style measures, dimensions, facts, and controlled business definitions." />
      <section className="two-column">
        <TrendChart data={chartData} period={period} setPeriod={setPeriod} />
        <section className="panel">
          <LineChart />
          <span className="eyebrow">Measures</span>
          <h2>Board summary</h2>
          <ul className="clean-list">
            <li>Lead completeness rate: 82%</li>
            <li>Average first response: 4.8 minutes</li>
            <li>Sales follow-up compliance: 74%</li>
            <li>Forecast conversion count: 25 leads</li>
          </ul>
        </section>
      </section>
      <LeadTable />
    </>
  );
}

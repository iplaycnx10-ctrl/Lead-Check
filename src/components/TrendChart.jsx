import React from 'react';

export function TrendChart({ data, period, setPeriod }) {
  const max = Math.max(...data);
  const points = data.map((value, index) => `${(index / (data.length - 1)) * 100},${100 - (value / max) * 88}`).join(' ');

  return (
    <section className="panel">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Model trend</span>
          <h2>Lead movement over time</h2>
        </div>
        <div className="tabs">
          {['daily', 'weekly', 'monthly'].map((item) => (
            <button className={period === item ? 'selected' : ''} onClick={() => setPeriod(item)} key={item}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <svg className="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={`0,100 ${points} 100,100`} fill="rgba(14, 165, 233, 0.12)" stroke="none" />
        <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-grid">
        <span>Volume</span>
        <span>Qualification</span>
        <span>Conversion intent</span>
      </div>
    </section>
  );
}

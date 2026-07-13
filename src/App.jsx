import React, { useMemo, useState } from 'react';
import { BarChart3, Clock3, Database, FileText, ScanLine, Users } from 'lucide-react';
import { Shell } from './components/Shell.jsx';
import { Login } from './components/Login.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Leads } from './pages/Leads.jsx';
import { NameScanner } from './pages/NameScanner.jsx';
import { ResponseSla } from './pages/ResponseSla.jsx';
import { DataSources } from './pages/DataSources.jsx';
import { Reports } from './pages/Reports.jsx';
import { daily, monthly, weekly } from './data/mockData.js';

const routes = [
  { id: 'dashboard', path: '/', label: 'Dashboard', icon: BarChart3 },
  { id: 'leads', path: '/leads', label: 'Leads', icon: Users },
  { id: 'scanner', path: '/scanner', label: 'Name Scanner', icon: ScanLine },
  { id: 'sla', path: '/response-sla', label: 'Response SLA', icon: Clock3 },
  { id: 'sources', path: '/data-sources', label: 'Data Sources', icon: Database },
  { id: 'reports', path: '/reports', label: 'Reports', icon: FileText },
];

function getRouteFromHash() {
  const cleanHash = window.location.hash.replace(/^#/, '') || '/';
  return routes.find((route) => route.path === cleanHash) || routes[0];
}

export function App() {
  const [user, setUser] = useState('');
  const [route, setRoute] = useState(getRouteFromHash);
  const [period, setPeriod] = useState('monthly');
  const chartData = useMemo(() => ({ daily, weekly, monthly })[period], [period]);

  React.useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Shell routes={routes} activeRoute={route} user={user} onLogout={() => setUser('')}>
      {route.id === 'dashboard' && <Dashboard period={period} setPeriod={setPeriod} chartData={chartData} />}
      {route.id === 'leads' && <Leads />}
      {route.id === 'scanner' && <NameScanner />}
      {route.id === 'sla' && <ResponseSla />}
      {route.id === 'sources' && <DataSources />}
      {route.id === 'reports' && <Reports period={period} setPeriod={setPeriod} chartData={chartData} />}
    </Shell>
  );
}

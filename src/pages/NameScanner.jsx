import React from 'react';
import { PageTitle } from '../components/PageTitle.jsx';
import { ScannerPanel } from '../components/ScannerPanel.jsx';

export function NameScanner() {
  return (
    <>
      <PageTitle eyebrow="Facebook name dimension" title="Extract profile names from inbox screenshots" description="Use screenshot import only as a backup workflow when historical inbox data is not available through API sync." />
      <ScannerPanel />
    </>
  );
}

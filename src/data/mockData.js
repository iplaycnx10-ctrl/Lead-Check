export const credentials = { username: 'whitebegin', password: '12345' };

export const stages = [
  { id: 1, label: 'Intake', count: 500, percent: 100, note: 'All inbound conversations captured as raw lead records.' },
  { id: 2, label: 'Qualified', count: 150, percent: 30, note: 'Leads with contact, budget, intent, or clear requirement.' },
  { id: 3, label: 'Follow-up', count: 80, percent: 16, note: 'Open leads pending sales response or customer reply.' },
  { id: 4, label: 'Closed', count: 25, percent: 5, note: 'Converted, appointed, or contract-ready customers.' },
  { id: 5, label: 'Forecast', count: 25, percent: 5, note: 'High-probability leads expected to close this month.' },
];

export const leads = [
  ['คุณ A', 'Facebook Ads', 'Qualified', '2 min', 'Budget and project type confirmed', 'Today', 'High'],
  ['คุณ B', 'TikTok Ads', 'Follow-up', '18 min', 'Proposal sent, no reply yet', '12/07/69', 'Medium'],
  ['คุณ C', 'Facebook Page', 'Closed', '4 min', 'Documents in preparation', '20/07/69', 'High'],
  ['คุณ D', 'LINE OA', 'Forecast', '1 min', 'Appointment confirmed', '25/07/69', 'High'],
  ['คุณ E', 'Referral', 'Intake', '9 min', 'Price inquiry', 'Today', 'Low'],
  ['คุณ F', 'TikTok Lead', 'Qualified', '6 min', 'Promotion requested', 'This week', 'Medium'],
];

export const appointments = [
  { date: '13', day: 'Mon', name: 'คุณ A', time: '10:30', type: 'Budget validation', score: 92 },
  { date: '14', day: 'Tue', name: 'คุณ D', time: '14:00', type: 'Site visit', score: 88 },
  { date: '16', day: 'Thu', name: 'คุณ C', time: '11:00', type: 'Document review', score: 81 },
  { date: '18', day: 'Sat', name: 'คุณ B', time: '09:30', type: 'Proposal follow-up', score: 64 },
];

export const dropOffs = [
  { stage: 'Contact missing', people: 42, reason: 'Asked for price and left conversation', owner: 'Marketing', action: 'Improve first-response script' },
  { stage: 'No appointment', people: 55, reason: 'Budget mismatch or comparing options', owner: 'Sales', action: 'Create 7-day nurture flow' },
  { stage: 'Appointment moved', people: 18, reason: 'Customer unavailable for site visit', owner: 'Sales', action: 'Offer video consultation' },
  { stage: 'Proposal silent', people: 12, reason: 'Waiting for decision maker', owner: 'Sales', action: 'Map decision owner' },
];

export const scannedLeads = [
  { name: 'ธา ชูรัก...', confidence: 78, source: 'Messenger Inbox' },
  { name: 'เมืองเดือน เราจะเข้าใจความหมาย ของชีวิตมากขึ้น', confidence: 91, source: 'Messenger Inbox' },
  { name: 'สาธีราวานดี ติ๊ก', confidence: 95, source: 'Messenger Inbox' },
  { name: 'ธนู ปิ่นแก้ว', confidence: 97, source: 'Messenger Inbox' },
  { name: 'อารีย์ เอื้อหา', confidence: 94, source: 'Messenger Inbox' },
  { name: 'Phong Pairoj', confidence: 99, source: 'Messenger Inbox' },
  { name: 'วันชัย สูงสง่า', confidence: 96, source: 'Messenger Inbox' },
  { name: 'Jakkitt Siripomajak', confidence: 99, source: 'Messenger Inbox' },
];

export const daily = [72, 95, 88, 114, 132, 125, 156, 148, 176, 169, 201, 188];
export const weekly = [420, 510, 610, 580, 720, 790, 860, 920];
export const monthly = [1200, 1480, 1690, 1930, 2280, 2470, 2650, 2910];

import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  BellRing,
  CircleDot,
  Clock3,
  Database,
  Eraser,
  FileText,
  LineChart,
  LockKeyhole,
  MessageCircle,
  PencilLine,
  PlugZap,
  PlusCircle,
  Send,
  ShieldCheck,
  Sparkles,
  ScanLine,
  TrendingUp,
  Upload,
  UserRound,
  Users,
} from 'lucide-react';
import './styles.css';
import heroImage from '../upload/image(159).png';
import sampleInbox from '../upload/image(160).png';

const stages = [
  { id: 1, label: 'ทักแชททั้งหมด', count: 500, percent: 100, color: 'rose', note: 'เบอร์ลูกค้าทุกคนที่ทักเข้ามา' },
  { id: 2, label: 'กำลังเจรจา', count: 150, percent: 30, color: 'orange', note: 'อัปเดตสถานะและเหตุผล' },
  { id: 3, label: 'ไม่ตอบกลับ', count: 80, percent: 16, color: 'amber', note: 'ติดตามครั้งล่าสุด + next action' },
  { id: 4, label: 'ปิดแล้ว', count: 25, percent: 5, color: 'green', note: 'นัดวัน/เซ็นสัญญา/จ่ายเงิน' },
  { id: 5, label: 'Forecast เดือนนี้', count: 25, percent: 5, color: 'blue', note: 'โอกาสปิดสูงจากพฤติกรรมแชท' },
];

const leads = [
  ['คุณ A', 'Facebook Ads', 'กำลังเจรจา', '2 นาที', 'สนใจแบบเร่งด่วน', 'วันนี้', 'High'],
  ['คุณ B', 'TikTok Ads', 'ไม่ตอบกลับ', '18 นาที', 'ส่งแบบบ้านแล้ว', '12/07/69', 'Medium'],
  ['คุณ C', 'Facebook Page', 'ปิดแล้ว', '4 นาที', 'เตรียมเอกสาร', '20/07/69', 'High'],
  ['คุณ D', 'LINE OA', 'Forecast', '1 นาที', 'โอกาสปิดสูง', '25/07/69', 'High'],
  ['คุณ E', 'Referral', 'ทักแชท', '9 นาที', 'สอบถามราคา', 'วันนี้', 'Low'],
  ['คุณ F', 'TikTok Shop', 'กำลังเจรจา', '6 นาที', 'ขอโปรโมชัน', 'สัปดาห์นี้', 'Medium'],
];

const appointments = [
  { date: '13', day: 'จันทร์', name: 'คุณ A', time: '10:30', type: 'โทรยืนยันงบ', score: 92 },
  { date: '14', day: 'อังคาร', name: 'คุณ D', time: '14:00', type: 'นัดดูโครงการ', score: 88 },
  { date: '16', day: 'พฤหัส', name: 'คุณ C', time: '11:00', type: 'เตรียมเอกสาร', score: 81 },
  { date: '18', day: 'เสาร์', name: 'คุณ B', time: '09:30', type: 'Follow up แบบบ้าน', score: 64 },
];

const dropOffs = [
  { stage: 'ทักแล้วไม่ให้เบอร์', people: 42, reason: 'ถามราคาแล้วหาย', owner: 'Marketing', impact: 'ปรับคำตอบแรก + offer' },
  { stage: 'ให้เบอร์แต่ไม่นัด', people: 55, reason: 'งบไม่ถึง / ยังเปรียบเทียบ', owner: 'Sales', impact: 'ทำ nurturing 7 วัน' },
  { stage: 'นัดแล้วเลื่อน', people: 18, reason: 'ไม่สะดวกเดินทาง', owner: 'Sales', impact: 'เสนอ video call' },
  { stage: 'ส่งเอกสารแล้วเงียบ', people: 12, reason: 'รอคนตัดสินใจ', owner: 'Sales', impact: 'ตามผู้มีอำนาจซื้อ' },
];

const daily = [72, 95, 88, 114, 132, 125, 156, 148, 176, 169, 201, 188];
const weekly = [420, 510, 610, 580, 720, 790, 860, 920];
const monthly = [1200, 1480, 1690, 1930, 2280, 2470, 2650, 2910];
const demoUser = { username: 'whitebegin', password: '12345' };
const scannedLeads = [
  { name: 'ธา ชูรัก...', confidence: 78, source: 'Messenger Inbox' },
  { name: 'เมืองเดือน เราจะเข้าใจความหมาย ของชีวิตมากขึ้น', confidence: 91, source: 'Messenger Inbox' },
  { name: 'สาธีราวานดี ติ๊ก', confidence: 95, source: 'Messenger Inbox' },
  { name: 'ธนู ปิ่นแก้ว', confidence: 97, source: 'Messenger Inbox' },
  { name: 'อารีย์ เอื้อหา', confidence: 94, source: 'Messenger Inbox' },
  { name: 'Phong Pairoj', confidence: 99, source: 'Messenger Inbox' },
  { name: 'วันชัย สูงสง่า', confidence: 96, source: 'Messenger Inbox' },
  { name: 'Jakkitt Siripomajak', confidence: 99, source: 'Messenger Inbox' },
];

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (username.trim() === demoUser.username && password === demoUser.password) {
      setError('');
      onLogin(username.trim());
      return;
    }
    setError('Username หรือ password ไม่ถูกต้อง');
  };

  return (
    <main className="login-shell" style={{ '--hero-image': `url(${heroImage})` }}>
      <section className="login-hero">
        <span className="pill"><ShieldCheck size={15} /> Secure ChatOps</span>
        <h1>เข้าสู่ระบบก่อนดูข้อมูล Lead และผลตอบแชท</h1>
        <p>Mockup นี้ล็อก dashboard ไว้ก่อน เพื่อให้เห็นภาพระบบจริงที่ต้องป้องกันข้อมูลลูกค้า, นัดหมาย, เบอร์โทร และรายงาน performance ของทีมขาย.</p>
        <div className="login-points">
          <span><LockKeyhole size={16} /> Role-based access พร้อมต่อยอด</span>
          <span><BellRing size={16} /> Reminder และ lead calendar อยู่หลัง login</span>
        </div>
      </section>

      <form className="login-card" onSubmit={submit}>
        <div className="login-icon"><UserRound size={28} /></div>
        <span className="eyebrow">Admin Login</span>
        <h2>Chat Lead Analytics</h2>
        <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="whitebegin" autoComplete="username" /></label>
        <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="12345" type="password" autoComplete="current-password" /></label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit"><LockKeyhole size={17} /> เข้าสู่ระบบ</button>
        <small>Demo account: whitebegin / 12345</small>
      </form>
    </main>
  );
}

function MiniChart({ data, mode }) {
  const max = Math.max(...data);
  const points = data
    .map((value, index) => `${(index / (data.length - 1)) * 100},${100 - (value / max) * 88}`)
    .join(' ');

  return (
    <div className="chart-card">
      <div className="chart-top">
        <div>
          <span className="eyebrow">Performance</span>
          <h3>{mode === 'daily' ? 'รายวัน' : mode === 'weekly' ? 'รายสัปดาห์' : 'รายเดือน'} แบบเทรดหุ้น</h3>
        </div>
        <strong>+18.4%</strong>
      </div>
      <svg className="line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,100 ${points} 100,100`} fill="url(#lineFill)" stroke="none" />
        <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-grid">
        <span>Inbound chat</span>
        <span>Lead quality</span>
        <span>Close chance</span>
      </div>
    </div>
  );
}

function DrawingBoard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const pos = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const source = event.touches?.[0] || event;
    return {
      x: ((source.clientX - rect.left) / rect.width) * canvas.width,
      y: ((source.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const start = (event) => {
    setDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    const point = pos(event);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const move = (event) => {
    if (!drawing) return;
    event.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const point = pos(event);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section className="annotation-panel">
      <div className="section-head">
        <div>
          <span className="eyebrow">Analysis Pad</span>
          <h2>ลากเส้นใส่กราฟเพื่อคุยกับทีม</h2>
        </div>
        <button className="ghost" onClick={clear}><Eraser size={16} /> ล้างเส้น</button>
      </div>
      <div className="draw-wrap">
        <div className="draw-chart">
          {daily.map((value, index) => <i key={index} style={{ height: `${32 + (value / 201) * 58}%` }} />)}
        </div>
        <canvas
          ref={canvasRef}
          width="1200"
          height="380"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={() => setDrawing(false)}
          onMouseLeave={() => setDrawing(false)}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={() => setDrawing(false)}
        />
      </div>
      <p><PencilLine size={16} /> ใช้ mark จุดที่ lead หลุด, ช่วงตอบช้า, หรือแคมเปญที่ควรเร่ง retargeting</p>
    </section>
  );
}

function OcrScanner() {
  const [preview, setPreview] = useState(sampleInbox);
  const [scanned, setScanned] = useState(false);
  const [imported, setImported] = useState(false);

  const loadFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setScanned(false);
    setImported(false);
  };

  return (
    <section className="ocr-scanner">
      <div className="section-head">
        <div>
          <span className="eyebrow">Facebook Name Scanner</span>
          <h2>อัปโหลดรูป Inbox แล้วอ่านชื่อเฟส</h2>
        </div>
        <label className="upload-button">
          <Upload size={16} /> อัปโหลดรูป
          <input type="file" accept="image/*" onChange={loadFile} />
        </label>
      </div>

      <div className="scanner-grid">
        <div className="scan-preview">
          <img src={preview} alt="ตัวอย่างรูป inbox สำหรับอ่านชื่อเฟส" />
        </div>
        <div className="scan-result">
          <div className="scan-actions">
            <div>
              <span className="eyebrow">Facebook names</span>
              <h3>{scanned ? `พบ ${scannedLeads.length} รายชื่อ` : 'รอสแกนข้อมูล'}</h3>
            </div>
            <button onClick={() => setScanned(true)}><ScanLine size={17} /> อ่านชื่อเฟส</button>
          </div>
          {!scanned ? (
            <p className="scan-empty">ระบบตัวอย่างจะอ่านชื่อบัญชี Facebook จากรูปหน้า Inbox หรือรายการแชท แล้วแยกชื่อออกจากข้อความพรีวิว/แท็กโฆษณา เพื่อเอาเข้า Lead Intake ต่อ.</p>
          ) : (
            <>
              <div className="name-list">
                {scannedLeads.map((lead) => (
                  <article key={lead.name}>
                    <div>
                      <strong>{lead.name}</strong>
                      <span>{lead.source}</span>
                    </div>
                    <b>{lead.confidence}%</b>
                  </article>
                ))}
              </div>
              <div className="scan-controls">
                <select defaultValue="Facebook Page">
                  <option>Facebook Page</option>
                  <option>TikTok Inbox</option>
                  <option>LINE OA</option>
                </select>
                <select defaultValue="ทักแชท">
                  <option>ทักแชท</option>
                  <option>กำลังเจรจา</option>
                  <option>ต้องติดตาม</option>
                </select>
              </div>
              <button className={imported ? 'success-button' : ''} onClick={() => setImported(true)}>
                {imported ? 'ส่งเข้า Lead Intake แล้ว' : 'ส่งรายชื่อเข้า Lead Intake'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function PageTitle({ eyebrow, title, description }) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function LeadTable() {
  return (
    <section className="lead-table">
      <div className="section-head">
        <div>
          <span className="eyebrow">Lead Registry</span>
          <h2>ทะเบียนข้อมูลลูกค้าจากทุกช่องทาง</h2>
        </div>
        <button className="ghost"><CalendarDays size={16} /> Export report</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>แหล่งที่มา</th>
              <th>สถานะ</th>
              <th>เวลาตอบ</th>
              <th>หมายเหตุ</th>
              <th>นัดหมาย</th>
              <th>คุณภาพ</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell, index) => <td key={cell} className={index === 2 ? 'status-cell' : ''}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DashboardView({ mode, setMode, chartData }) {
  return (
    <>
      <header className="hero premium-hero" style={{ '--hero-image': `url(${heroImage})` }}>
        <div>
          <span className="pill"><Sparkles size={15} /> Lead Intelligence Platform</span>
          <h1>Facebook Lead Quality & Sales Response Analytics</h1>
          <p>ระบบกลางสำหรับตรวจสอบคุณภาพลีด เวลาตอบกลับของทีมขาย จุดที่ลูกค้าหลุด และผลลัพธ์จากทุกช่องทางอย่างเป็นหลักฐาน.</p>
          <div className="hero-actions">
            <button><PlugZap size={18} /> Connect channels</button>
            <button className="secondary"><Bot size={18} /> Review recommendations</button>
          </div>
        </div>
        <div className="live-card">
          <span>Average first response</span>
          <strong>4.8 min</strong>
          <small>37% faster than last week</small>
          <div className="sla">
            <i style={{ width: '82%' }} />
          </div>
        </div>
      </header>

      <section className="connectors">
        {[
          ['Facebook Page', 'Read conversation and sender profile name', MessageCircle, 'Ready'],
          ['TikTok Lead', 'Collect campaign leads for review', Send, 'Planned'],
          ['LINE OA', 'Follow up and reminder channel', MessageCircle, 'Ready'],
          ['CRM / CSV', 'Import, clean, and export lead data', Database, 'Supported'],
        ].map(([title, desc, Icon, status]) => (
          <article key={title}>
            <Icon size={22} />
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <b>{status}</b>
          </article>
        ))}
      </section>

      <section className="kpis">
        {[
          ['Total conversations', '500', '+24%', MessageCircle],
          ['SLA within 5 min', '78%', '+11%', Clock3],
          ['Qualified leads', '175', '+32%', Users],
          ['Forecast closings', '25', 'High intent', TrendingUp],
        ].map(([label, value, change, Icon]) => (
          <article key={label}>
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </article>
        ))}
      </section>

      <section className="proof-strip">
        <article>
          <ShieldCheck size={26} />
          <div>
            <span className="eyebrow">Marketing Proof</span>
            <h2>หลักฐานกลางสำหรับตรวจสอบคุณภาพลีด</h2>
            <p>เก็บแหล่งที่มา ข้อความแรก เวลาตอบกลับ การติดตาม นัดหมาย และคะแนนคุณภาพ เพื่อแยกให้ชัดว่า lead เสียเพราะคุณภาพ หรือหลุดจากกระบวนการขาย.</p>
          </div>
        </article>
        <div className="proof-metrics">
          <b>82%</b><span>Lead มีข้อมูลสำคัญครบ</span>
          <b>37</b><span>เคสตอบช้าเกิน SLA</span>
          <b>18</b><span>เคสไม่ follow up ตามนัด</span>
        </div>
      </section>

      <section className="funnel-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Lead Journey</span>
            <h2>ภาพรวมลูกค้า 100% ตามสถานะ</h2>
          </div>
          <p>ใช้เป็นฐานข้อมูลสำหรับวิเคราะห์คุณภาพและการติดตามของทีมขาย</p>
        </div>
        <div className="funnel">
          {stages.map((stage) => (
            <article className={`stage ${stage.color}`} key={stage.id}>
              <b>{stage.id}</b>
              <h3>{stage.label}</h3>
              <strong>{stage.count} คน</strong>
              <span>({stage.percent}%)</span>
              <p>{stage.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="analytics">
        <div className="report">
          <div className="section-head compact">
            <div>
              <span className="eyebrow">Performance Report</span>
              <h2>แนวโน้มรายวัน รายสัปดาห์ รายเดือน</h2>
            </div>
            <div className="tabs">
              {['daily', 'weekly', 'monthly'].map((item) => (
                <button className={mode === item ? 'selected' : ''} onClick={() => setMode(item)} key={item}>
                  {item === 'daily' ? 'Daily' : item === 'weekly' ? 'Weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
          <MiniChart data={chartData} mode={mode} />
        </div>
        <div className="ai-panel">
          <Activity />
          <h3>Operational recommendations</h3>
          <ul>
            <li>TikTok leads are answered 9 minutes slower than Facebook leads.</li>
            <li>Leads marked “sent proposal” should be followed up within 24 hours.</li>
            <li>Campaign budget should be shifted toward high-intent lead sources.</li>
          </ul>
        </div>
      </section>
    </>
  );
}

function LeadsView() {
  return (
    <>
      <PageTitle eyebrow="Lead Management" title="Lead Intake & Quality Control" description="จัดเก็บข้อมูลลูกค้า ตรวจสอบคุณภาพ และระบุจุดที่ลูกค้าหลุดจากกระบวนการขาย." />
      <section className="bi-workbench">
        <div className="section-head">
          <div>
            <span className="eyebrow">Drop-off Analysis</span>
            <h2>จำแนกประเภทลูกค้าตามขั้นตอนที่หลุด</h2>
          </div>
          <div className="filter-row">
            <select defaultValue="all">
              <option value="all">All channels</option>
              <option>Facebook Ads</option>
              <option>TikTok Ads</option>
              <option>LINE OA</option>
            </select>
            <select defaultValue="drop">
              <option value="drop">Drop-off stage</option>
              <option>ทักแล้วไม่ให้เบอร์</option>
              <option>ให้เบอร์แต่ไม่นัด</option>
              <option>นัดแล้วเลื่อน</option>
            </select>
          </div>
        </div>
        <div className="bi-grid">
          <form className="lead-form">
            <h3><PlusCircle size={18} /> Lead intake form</h3>
            <label>ชื่อ / เบอร์โทร<input placeholder="เช่น คุณสมชาย 09x-xxx-xxxx" /></label>
            <label>แหล่งที่มา<select><option>Facebook Ads</option><option>TikTok Ads</option><option>LINE OA</option><option>Referral</option></select></label>
            <label>ขั้นตอนปัจจุบัน<select><option>ทักแชท</option><option>กำลังเจรจา</option><option>นัดหมายแล้ว</option><option>ปิดแล้ว</option><option>Drop-off</option></select></label>
            <label>บันทึกการติดตาม<textarea placeholder="สรุปความต้องการ งบประมาณ และ next action"></textarea></label>
            <button type="button">Save lead record</button>
          </form>
          <div className="drop-table">
            {dropOffs.map((item) => (
              <article key={item.stage}>
                <div>
                  <h3>{item.stage}</h3>
                  <p>{item.reason}</p>
                </div>
                <strong>{item.people} คน</strong>
                <span>{item.owner}</span>
                <b>{item.impact}</b>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LeadTable />
    </>
  );
}

function SlaView() {
  return (
    <>
      <PageTitle eyebrow="Response SLA" title="Sales Response Monitoring" description="ตรวจสอบเวลาตอบกลับ ความต่อเนื่องในการติดตาม และเคสที่เสี่ยงหลุดจากทีมขาย." />
      <section className="calendar-plan">
        <div className="section-head">
          <div>
            <span className="eyebrow">Calendar Plan</span>
            <h2>นัดลูกค้าคุณภาพสูงและระบบเตือนผ่าน LINE</h2>
          </div>
          <button className="ghost"><BellRing size={16} /> Configure reminder</button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-card">
            {appointments.map((item) => (
              <article key={`${item.date}-${item.name}`} className={item.score > 80 ? 'hot' : ''}>
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
          <div className="line-reminder">
            <MessageCircle />
            <h3>LINE Reminder Bot</h3>
            <p>แจ้งเตือนก่อนนัด หลังนัด และบังคับให้บันทึกผลลัพธ์ของแต่ละเคส เพื่อให้ตรวจสอบได้ว่าลีดถูกติดตามครบตามมาตรฐาน.</p>
            <div className="reminder-bubble">Reminder: คุณ D นัดดูโครงการ 14:00 วันนี้ กรุณาอัปเดตผลหลังจบนัด</div>
          </div>
        </div>
      </section>
      <DrawingBoard />
    </>
  );
}

function DataSourcesView() {
  return (
    <>
      <PageTitle eyebrow="Data Sources" title="Channel & Data Integration" description="ออกแบบจุดเชื่อมต่อข้อมูลสำหรับ Facebook Page, TikTok, LINE OA และไฟล์ CRM/CSV." />
      <section className="connectors source-grid">
        {[
          ['Facebook Page API', 'อ่านข้อความ ชื่อผู้ส่ง เวลาเริ่มแชท และ metadata ของแคมเปญ', MessageCircle, 'Primary source'],
          ['Facebook Name Scanner', 'อ่านชื่อบัญชีจากรูป Inbox สำหรับกรณีนำเข้าข้อมูลย้อนหลัง', ScanLine, 'OCR assisted'],
          ['LINE OA Reminder', 'ส่งแจ้งเตือนนัดหมายและบันทึกผล follow up', BellRing, 'Reminder channel'],
          ['CSV / CRM Import', 'นำเข้าข้อมูล lead และประวัติการขายจากระบบเดิม', Database, 'Import ready'],
        ].map(([title, desc, Icon, status]) => (
          <article key={title}>
            <Icon size={22} />
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <b>{status}</b>
          </article>
        ))}
      </section>
    </>
  );
}

function ReportsView({ mode, setMode, chartData }) {
  return (
    <>
      <PageTitle eyebrow="Executive Reports" title="Lead Quality & Sales Accountability" description="รายงานสำหรับผู้บริหาร ใช้ดูคุณภาพลีด จุดหลุด ต้นทางแคมเปญ และประสิทธิภาพทีมขาย." />
      <section className="analytics">
        <div className="report">
          <div className="section-head compact">
            <div>
              <span className="eyebrow">Trend</span>
              <h2>Performance timeline</h2>
            </div>
            <div className="tabs">
              {['daily', 'weekly', 'monthly'].map((item) => (
                <button className={mode === item ? 'selected' : ''} onClick={() => setMode(item)} key={item}>
                  {item === 'daily' ? 'Daily' : item === 'weekly' ? 'Weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
          <MiniChart data={chartData} mode={mode} />
        </div>
        <div className="ai-panel">
          <LineChart />
          <h3>Board summary</h3>
          <ul>
            <li>High quality leads remain strong at 82% completeness.</li>
            <li>Response delay is the main controllable drop-off factor.</li>
            <li>LINE reminder coverage should be enabled for high-intent appointments.</li>
          </ul>
        </div>
      </section>
      <LeadTable />
    </>
  );
}

function App() {
  const [mode, setMode] = useState('monthly');
  const [currentUser, setCurrentUser] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const chartData = useMemo(() => ({ daily, weekly, monthly })[mode], [mode]);
  const tabs = [
    ['dashboard', 'Dashboard', BarChart3],
    ['leads', 'Leads', Users],
    ['scanner', 'Name Scanner', ScanLine],
    ['sla', 'Response SLA', Clock3],
    ['sources', 'Data Sources', Database],
    ['reports', 'Reports', FileText],
  ];

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><MessageCircle /> Lead-Check</div>
        <nav>
          {tabs.map(([id, label, Icon]) => (
            <button className={activeTab === id ? 'active' : ''} key={id} onClick={() => setActiveTab(id)}>
              <Icon /> {label}
            </button>
          ))}
        </nav>
        <div className="user-panel">
          <span>Workspace</span>
          <strong>{currentUser}</strong>
          <button className="logout" onClick={() => setCurrentUser('')}>ออกจากระบบ</button>
        </div>
      </aside>

      <section className="page">
        {activeTab === 'dashboard' && <DashboardView mode={mode} setMode={setMode} chartData={chartData} />}
        {activeTab === 'leads' && <LeadsView />}
        {activeTab === 'scanner' && (
          <>
            <PageTitle eyebrow="Facebook Name Scanner" title="Extract Facebook names from inbox screenshots" description="อัปโหลดภาพรายชื่อแชทเพื่ออ่านชื่อบัญชี Facebook และส่งต่อเข้าระบบ lead intake." />
            <OcrScanner />
          </>
        )}
        {activeTab === 'sla' && <SlaView />}
        {activeTab === 'sources' && <DataSourcesView />}
        {activeTab === 'reports' && <ReportsView mode={mode} setMode={setMode} chartData={chartData} />}

        <footer>
          <CheckCircle2 size={18} /> Lead-Check template: designed for chat performance, lead quality, and sales accountability workflows.
        </footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

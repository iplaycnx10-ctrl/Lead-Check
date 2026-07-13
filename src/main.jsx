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

function App() {
  const [mode, setMode] = useState('monthly');
  const [currentUser, setCurrentUser] = useState('');
  const chartData = useMemo(() => ({ daily, weekly, monthly })[mode], [mode]);

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><MessageCircle /> ChatOps Lead</div>
        <nav>
          <a className="active"><BarChart3 /> Dashboard</a>
          <a><Users /> Leads</a>
          <a><ScanLine /> OCR Scanner</a>
          <a><Clock3 /> Response SLA</a>
          <a><Database /> Data Sources</a>
          <a><FileText /> Reports</a>
        </nav>
        <div className="user-panel">
          <span>Logged in as</span>
          <strong>{currentUser}</strong>
          <button className="logout" onClick={() => setCurrentUser('')}>ออกจากระบบ</button>
        </div>
      </aside>

      <section className="page">
        <header className="hero" style={{ '--hero-image': `url(${heroImage})` }}>
          <div>
            <span className="pill"><Sparkles size={15} /> Mockup ระบบประเมินแชท Admin</span>
            <h1>วัดผลแชท Facebook Page แล้วแยกลีดเป็น 100%</h1>
            <p>จำลองระบบดึงข้อความ, จับเวลาตอบกลับ, แยกประเภทลูกค้า, ทำรายงานรายวัน/สัปดาห์/เดือน และเตรียมเชื่อม Facebook, TikTok, LINE OA ในที่เดียว.</p>
            <div className="hero-actions">
              <button><PlugZap size={18} /> เชื่อมต่อช่องทาง</button>
              <button className="secondary"><Bot size={18} /> วิเคราะห์สิ่งที่ควรทำ</button>
            </div>
          </div>
          <div className="live-card">
            <span>Response SLA วันนี้</span>
            <strong>4.8 นาที</strong>
            <small>เร็วขึ้น 37% จากสัปดาห์ก่อน</small>
            <div className="sla">
              <i style={{ width: '82%' }} />
            </div>
          </div>
        </header>

        <section className="connectors">
          {[
            ['Facebook Page', 'อ่านข้อความ + ชื่อผู้ทัก', MessageCircle, 'พร้อมเชื่อม'],
            ['TikTok', 'รวม lead จากแคมเปญ', Send, 'รอ API'],
            ['LINE OA', 'ตามต่อหลังปิดแชท', MessageCircle, 'พร้อมออกแบบ'],
            ['CRM / Excel', 'นำเข้าไฟล์และ export', Database, 'CSV/XLSX'],
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

        <OcrScanner />

        <section className="kpis">
          {[
            ['แชทเข้าเดือนนี้', '500', '+24%', MessageCircle],
            ['ตอบใน 5 นาที', '78%', '+11%', Clock3],
            ['Lead คุณภาพสูง', '175', '+32%', Users],
            ['ยอดคาดการณ์', '25', 'ปิดได้สูง', TrendingUp],
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
              <h2>หลักฐานกันคำอ้างว่า Lead ไม่มีคุณภาพ</h2>
              <p>ทุก lead จะมีแหล่งที่มา, ข้อความแรก, เวลาตอบของเซลล์, จำนวนครั้งที่ follow up, นัดหมาย และคะแนนคุณภาพ เพื่อแยกให้เห็นว่า lead เสียเพราะคุณภาพจริง หรือหลุดเพราะกระบวนการขาย.</p>
            </div>
          </article>
          <div className="proof-metrics">
            <b>82%</b><span>Lead มีเบอร์/งบ/ความต้องการครบ</span>
            <b>37</b><span>เคสตอบช้าเกิน SLA</span>
            <b>18</b><span>เคสเซลล์ไม่ follow up ตามนัด</span>
          </div>
        </section>

        <section className="funnel-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Lead Journey</span>
              <h2>ลูกค้า 100% แยกตามสถานะ</h2>
            </div>
            <p>ส่งข้อมูลทุกวันเพื่อให้ทีมการตลาดวิเคราะห์และต่อยอด</p>
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

        <section className="bi-workbench">
          <div className="section-head">
            <div>
              <span className="eyebrow">BI Workbench</span>
              <h2>แยกประเภทลูกค้าตาม Drop-off</h2>
            </div>
            <div className="filter-row">
              <select defaultValue="all">
                <option value="all">ทุกช่องทาง</option>
                <option>Facebook Ads</option>
                <option>TikTok Ads</option>
                <option>LINE OA</option>
              </select>
              <select defaultValue="drop">
                <option value="drop">จุดที่หลุด</option>
                <option>ทักแล้วไม่ให้เบอร์</option>
                <option>ให้เบอร์แต่ไม่นัด</option>
                <option>นัดแล้วเลื่อน</option>
              </select>
            </div>
          </div>
          <div className="bi-grid">
            <form className="lead-form">
              <h3><PlusCircle size={18} /> กรอกข้อมูลลูกค้าในตัว</h3>
              <label>ชื่อ / เบอร์โทร<input placeholder="เช่น คุณสมชาย 09x-xxx-xxxx" /></label>
              <label>แหล่งที่มา<select><option>Facebook Ads</option><option>TikTok Ads</option><option>LINE OA</option><option>Referral</option></select></label>
              <label>ขั้นตอนปัจจุบัน<select><option>ทักแชท</option><option>กำลังเจรจา</option><option>นัดหมายแล้ว</option><option>ปิดแล้ว</option><option>Drop-off</option></select></label>
              <label>สาเหตุ / หมายเหตุ<textarea placeholder="เช่น สนใจจริง แต่ต้องคุยกับแฟนก่อน"></textarea></label>
              <button type="button">บันทึก Lead</button>
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

        <section className="analytics">
          <div className="report">
            <div className="section-head compact">
              <div>
                <span className="eyebrow">Reports</span>
                <h2>รายงานแยกช่วงเวลา</h2>
              </div>
              <div className="tabs">
                {['daily', 'weekly', 'monthly'].map((item) => (
                  <button className={mode === item ? 'selected' : ''} onClick={() => setMode(item)} key={item}>
                    {item === 'daily' ? 'วัน' : item === 'weekly' ? 'สัปดาห์' : 'เดือน'}
                  </button>
                ))}
              </div>
            </div>
            <MiniChart data={chartData} mode={mode} />
          </div>
          <div className="ai-panel">
            <Activity />
            <h3>Tap วิเคราะห์สิ่งที่ควรทำ</h3>
            <ul>
              <li>แชทจาก TikTok ตอบช้ากว่า Facebook เฉลี่ย 9 นาที</li>
              <li>กลุ่ม “ส่งแบบบ้านแล้ว” ควร follow up ใน 24 ชั่วโมง</li>
              <li>งบโฆษณาควรโยกไปแคมเปญที่ได้ lead คุณภาพสูง</li>
            </ul>
          </div>
        </section>

        <section className="calendar-plan">
          <div className="section-head">
            <div>
              <span className="eyebrow">Calendar Plan</span>
              <h2>นัดลูกค้าคุณภาพสูง + เตือนผ่าน LINE</h2>
            </div>
            <button className="ghost"><BellRing size={16} /> ตั้งเตือน LINE</button>
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
              <p>แจ้งเตือนเซลล์ก่อนนัด 1 วัน, ก่อนนัด 1 ชั่วโมง และหลังนัดเพื่อบันทึกผล เช่น มาตามนัด/เลื่อน/ไม่รับสาย/ปิดการขาย.</p>
              <div className="reminder-bubble">
                แจ้งเตือน: คุณ D นัดดูโครงการ 14:00 วันนี้ กรุณาอัปเดตผลหลังจบนัด
              </div>
            </div>
          </div>
        </section>

        <DrawingBoard />

        <section className="lead-table">
          <div className="section-head">
            <div>
              <span className="eyebrow">Lead Table</span>
              <h2>ข้อมูลที่ต้องเก็บจากทุกช่องทาง</h2>
            </div>
            <button className="ghost"><CalendarDays size={16} /> ส่งรายงานทุกวัน</button>
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

        <footer>
          <CheckCircle2 size={18} /> Mockup นี้สามารถต่อเป็นระบบจริงได้ โดยต้องขอสิทธิ์ API, webhook, storage และ policy การเก็บข้อมูลลูกค้าให้ถูกต้อง.
        </footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

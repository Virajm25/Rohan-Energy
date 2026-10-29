/* Rohan Energy – HPCL Cluster 2 Reporting Portal — preview only (mock data, no backend) */
(function () {
'use strict';

/* ---------- data ---------- */
const USERS = [
  { id:'amit',   name:'Amit Sharma',   un:'hpcl_central',     org:'hpcl',  role:'Sales Officer (Approver)', zone:'Central Zone',        active:true,  last:'Today, 10:42' },
  { id:'rahul',  name:'Rahul Verma',   un:'re_central_01',    org:'rohan', role:'Sales Officer',            zone:'Central Zone',        active:true,  last:'Today, 09:15' },
  { id:'neha',   name:'Neha Kulkarni', un:'re_central_02',    org:'rohan', role:'Sales Officer',            zone:'Central Zone',        active:true,  last:'Yesterday' },
  { id:'sanjay', name:'Sanjay Mishra', un:'hpcl_eastcentral', org:'hpcl',  role:'Sales Officer (Approver)', zone:'East Central Zone',   active:true,  last:'Yesterday' },
  { id:'vikram', name:'Vikram Singh',  un:'re_eastcentral_01',org:'rohan', role:'Sales Officer',            zone:'East Central Zone',   active:true,  last:'2 days ago' },
  { id:'priya',  name:'Priya Nair',    un:'hpcl_ncr',         org:'hpcl',  role:'Sales Officer (Approver)', zone:'North Central Retail',active:true,  last:'Today, 08:50' },
  { id:'arjun',  name:'Arjun Patel',   un:'re_ncr_01',        org:'rohan', role:'Sales Officer',            zone:'North Central Retail',active:true,  last:'Today, 11:05' },
  { id:'karan',  name:'Karan Joshi',   un:'re_ncr_02',        org:'rohan', role:'Sales Officer',            zone:'North Central Retail',active:false, last:'3 weeks ago' },
];
const ZONES = ['Central Zone', 'East Central Zone', 'North Central Retail'];
const ROS = ['BHOPAL RET RO', 'INDORE RET RO', 'JABALPUR RET RO'];
const ITEMS = ['HP DEF - 1X20L', 'TATA MOTORS HP GENUINE DEF 20L'];
const LPU = 20;
const OUTLETS = {
  '41086412': ['Shree Balaji Fuels, Bhopal', 'BHOPAL RET RO', 'Bhopal', 'Madhya Pradesh', 'Bhopal Retail SA'],
  '41086377': ['Rajdhani Auto Fuels', 'BHOPAL RET RO', 'Bhopal', 'Madhya Pradesh', 'Bhopal Retail SA'],
  '41092218': ['Gupta Petroleum', 'JABALPUR RET RO', 'Jabalpur', 'Madhya Pradesh', 'Jabalpur Retail SA'],
  '41075590': ['Mahakal Filling Station', 'INDORE RET RO', 'Indore', 'Madhya Pradesh', 'Indore Retail SA'],
  '41068821': ['Sagar Road Lines', 'BHOPAL RET RO', 'Sagar', 'Madhya Pradesh', 'Bhopal Retail SA'],
  '41081105': ['Om Sai Service Station', 'INDORE RET RO', 'Indore', 'Madhya Pradesh', 'Indore Retail SA'],
  '41079034': ['Kisan Seva Kendra', 'INDORE RET RO', 'Dewas', 'Madhya Pradesh', 'Indore Retail SA'],
  '41093340': ['New Highway Dhaba Pump', 'JABALPUR RET RO', 'Katni', 'Madhya Pradesh', 'Jabalpur Retail SA'],
  '41055001': ['Maha Kisan Fuels', 'INDORE RET RO', 'Ujjain', 'Madhya Pradesh', 'Indore Retail SA'],
  '41088870': ['Vindhya Fuel Point', 'BHOPAL RET RO', 'Sehore', 'Madhya Pradesh', 'Bhopal Retail SA'],
};
const rcOf = name => Object.keys(OUTLETS).find(k => OUTLETS[k][0].startsWith(name)) || '';
const D = (d, h, m) => new Date(2026, 9, d, h || 0, m || 0);
const NOW = D(29, 11, 30);

function mk(n, status, outlet, qty, item, d, officer, extra) {
  const o = OUTLETS[rcOf(outlet)];
  const base = { ref: 'RE-ORD-' + String(n).padStart(6, '0'), date: d, outlet: outlet, rc: rcOf(outlet), ro: o[1], district: o[2], state: o[3], area: o[4],
    zone: 'Central Zone', officer: officer, items: [{ item: item, qty: qty }], remarks: 'Outlet confirmed verbally.', status: status, hist: [] };
  return Object.assign(base, extra || {});
}
const H = (t, by, ts, c) => ({ t: t, by: by, ts: ts, c: c || '' });

let ORDERS = [
  mk(148, 'draft', 'Shree Balaji Fuels', 180, ITEMS[0], D(29, 9, 40), 'rahul', { items: [{ item: ITEMS[0], qty: 120 }, { item: ITEMS[1], qty: 60 }], remarks: 'Delivery requested before 5 Nov. Outlet confirmed verbally.', hist: [H('Draft created', 'rahul', D(29, 9, 40))] }),
  mk(147, 'draft', 'Om Sai Service Station', 90, ITEMS[0], D(29, 9, 5), 'rahul', { hist: [H('Draft created', 'rahul', D(29, 9, 5))] }),
  mk(146, 'pending', 'Gupta Petroleum', 200, ITEMS[0], D(28, 11, 5), 'rahul', { sub: D(28, 11, 5), remarks: 'Outlet confirmed verbally. Deliver before 5 Nov.', hist: [H('Submitted for approval', 'rahul', D(28, 11, 5)), H('Draft created', 'rahul', D(28, 10, 40))] }),
  mk(145, 'pending', 'Rajdhani Auto Fuels', 60, ITEMS[0], D(28, 16, 20), 'rahul', { sub: D(28, 16, 20), hist: [H('Submitted for approval', 'rahul', D(28, 16, 20)), H('Draft created', 'rahul', D(28, 16, 5))] }),
  mk(144, 'approved', 'Kisan Seva Kendra', 150, ITEMS[0], D(27, 14, 0), 'rahul', { sub: D(27, 14, 10), appr: 'amit', apprAt: D(28, 10, 12), hist: [H('Approved', 'amit', D(28, 10, 12), 'Approved.'), H('Submitted for approval', 'rahul', D(27, 14, 10)), H('Draft created', 'rahul', D(27, 14, 0))] }),
  mk(143, 'rejected', 'New Highway Dhaba Pump', 40, ITEMS[0], D(26, 12, 0), 'rahul', { sub: D(26, 12, 10), reason: 'RO code mismatch — please recheck', appr: 'amit', apprAt: D(27, 9, 30), hist: [H('Rejected', 'amit', D(27, 9, 30), 'RO code mismatch — please recheck'), H('Submitted for approval', 'rahul', D(26, 12, 10)), H('Draft created', 'rahul', D(26, 12, 0))] }),
  mk(142, 'approved', 'Shree Balaji Fuels', 120, ITEMS[0], D(25, 15, 48), 'rahul', { remarks: 'Delivery requested before 5 Nov. Outlet confirmed verbally.', sub: D(25, 16, 10), appr: 'amit', apprAt: D(26, 11, 32), hist: [H('Approved', 'amit', D(26, 11, 32), 'Approved. Please dispatch as per schedule.'), H('Submitted for approval', 'rahul', D(25, 16, 10)), H('Draft created', 'rahul', D(25, 15, 48))] }),
  mk(141, 'approved', 'Vindhya Fuel Point', 75, ITEMS[0], D(24, 10, 0), 'rahul', { sub: D(24, 10, 20), appr: 'amit', apprAt: D(25, 12, 0), hist: [H('Approved', 'amit', D(25, 12, 0), 'Approved.'), H('Submitted for approval', 'rahul', D(24, 10, 20)), H('Draft created', 'rahul', D(24, 10, 0))] }),
  mk(140, 'pending', 'Mahakal Filling Station', 90, ITEMS[1], D(27, 15, 40), 'neha', { sub: D(27, 15, 40), hist: [H('Submitted for approval', 'neha', D(27, 15, 40)), H('Draft created', 'neha', D(27, 15, 30))] }),
  mk(139, 'pending', 'Sagar Road Lines', 60, ITEMS[0], D(27, 10, 12), 'neha', { sub: D(27, 10, 12), hist: [H('Submitted for approval', 'neha', D(27, 10, 12)), H('Draft created', 'neha', D(27, 10, 0))] }),
  mk(138, 'approved', 'Om Sai Service Station', 100, ITEMS[0], D(23, 11, 0), 'neha', { sub: D(23, 11, 10), appr: 'amit', apprAt: D(24, 9, 0), hist: [H('Approved', 'amit', D(24, 9, 0), 'Approved.'), H('Submitted for approval', 'neha', D(23, 11, 10)), H('Draft created', 'neha', D(23, 11, 0))] }),
  mk(137, 'approved', 'Gupta Petroleum', 140, ITEMS[0], D(22, 11, 0), 'neha', { sub: D(22, 11, 10), appr: 'amit', apprAt: D(23, 9, 30), hist: [H('Approved', 'amit', D(23, 9, 30), 'Approved.'), H('Submitted for approval', 'neha', D(22, 11, 10)), H('Draft created', 'neha', D(22, 11, 0))] }),
  mk(136, 'pending', 'Maha Kisan Fuels', 80, ITEMS[0], D(26, 9, 0), 'vikram', { zone: 'East Central Zone', sub: D(26, 9, 0), hist: [H('Submitted for approval', 'vikram', D(26, 9, 0)), H('Draft created', 'vikram', D(26, 8, 50))] }),
  mk(135, 'approved', 'Gupta Petroleum', 110, ITEMS[0], D(21, 9, 0), 'arjun', { zone: 'North Central Retail', sub: D(21, 9, 10), appr: 'priya', apprAt: D(22, 10, 0), hist: [H('Approved', 'priya', D(22, 10, 0), 'Approved.'), H('Submitted for approval', 'arjun', D(21, 9, 10)), H('Draft created', 'arjun', D(21, 9, 0))] }),
];
let nextRef = 149;

const S = {
  user: 'rahul',
  form: null,
  f: { my: { st: '', q: '' }, all: { zone: '', st: '', q: '' }, pend: { off: '', ro: '' }, adm: { org: '', zone: '' }, raw: { ro: '' } },
  review: null,
  newUsers: 0,
};

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const U = id => id === 'admin' ? adminUser : USERS.find(u => u.id === id);
const cur = () => U(S.user);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const p2 = n => String(n).padStart(2, '0');
const dShort = d => d.getDate() + ' ' + MON[d.getMonth()];
const dFull = d => dShort(d) + ' ' + d.getFullYear();
const dTime = d => dShort(d) + ', ' + p2(d.getHours()) + ':' + p2(d.getMinutes());
const dFullTime = d => dFull(d) + ', ' + p2(d.getHours()) + ':' + p2(d.getMinutes());
const n0 = n => Number(n).toLocaleString('en-IN');
const qtyOf = o => o.items.reduce((a, i) => a + i.qty, 0);
const litOf = o => qtyOf(o) * LPU;
const approverOf = zone => USERS.find(u => u.org === 'hpcl' && u.zone === zone && u.active);
const orgLabel = o => o === 'rohan' ? 'Rohan Energy' : 'HPCL';
const pill = st => ({ draft: '<span class="pill p-draft">Draft</span>', pending: '<span class="pill p-pend">Pending approval</span>', approved: '<span class="pill p-appr">Approved</span>', rejected: '<span class="pill p-rej">Rejected</span>' }[st]);
const tag = org => '<span class="tag ' + (org === 'rohan' ? 't-or' : 't-bl') + '">' + orgLabel(org) + '</span>';
const optHtml = (arr, sel, blank) => (blank ? '<option value="">' + blank + '</option>' : '') + arr.map(a => '<option' + (a === sel ? ' selected' : '') + '>' + esc(a) + '</option>').join('');
function waitOf(o) {
  const days = Math.floor((NOW - o.sub) / 864e5);
  if (days <= 0) return ['Today', 0];
  return [days + (days === 1 ? ' day' : ' days'), days];
}

function visible(o) {
  const u = cur();
  if (u.org === 'rohan') return o.officer === u.id;
  if (u.id === 'admin') return true;
  return o.zone === u.zone;
}
var adminUser = { id: 'admin', name: 'superadmin', org: 'admin', zone: 'All zones' };
const cur2 = cur;

function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ---------- routing ---------- */
const route = () => (location.hash.replace(/^#\/?/, '') || 'dashboard').split('/');
const go = h => { location.hash = '#/' + h; };

function tabsFor(u) {
  const pend = ORDERS.filter(o => o.status === 'pending' && visible(o)).length;
  if (u.org === 'rohan') return [['dashboard', 'Dashboard'], ['raw', 'Raw Data'], ['new', 'New Order'], ['my', 'My Orders', pend]];
  if (u.org === 'hpcl') return [['dashboard', 'Dashboard'], ['raw', 'Raw Data'], ['pending', 'Pending Approvals', pend], ['all', 'All Orders']];
  return [['dashboard', 'Dashboard'], ['raw', 'Raw Data'], ['all', 'All Orders'], ['admin', 'Admin · Users & Zones']];
}

/* ---------- shell ---------- */
function render() {
  const u = cur2();
  let r = route();
  const tabs = tabsFor(u);
  const allowed = tabs.map(t => t[0]).concat(['order']);
  if (!allowed.includes(r[0])) { go(tabs[0][0]); return; }
  if (r[0] === 'new' && r[1] === undefined && S.form && S.form.ref) S.form = null;
  const chip = u.org === 'rohan' ? 'rc-rohan' : u.org === 'hpcl' ? 'rc-hpcl' : 'rc-admin';
  const chipTxt = u.org === 'rohan' ? 'Rohan Energy' : u.org === 'hpcl' ? 'HPCL' : 'Super Admin';
  const activeTab = r[0] === 'order' ? (u.org === 'rohan' ? 'my' : u.org === 'hpcl' ? 'pending' : 'all') : r[0];
  const body = ({ dashboard: vDash, raw: vRaw, new: vNew, my: vMy, pending: vPending, all: vAll, admin: vAdmin, order: vOrder }[r[0]] || vDash)(r);
  $('#app').innerHTML =
    '<div class="topbar"><div class="tb-left"><img class="logo-h" src="logo-hpcl.svg" alt="HPCL"><div class="tb-sep"></div><img class="logo-m" src="logo-mark.svg" alt="Rohan Energy"><div class="tb-sep"></div>' +
    '<div><div class="tb-main">Rohan Energy–HPCL Cluster 2 Reporting Portal</div><div class="tb-sub">' + esc(u.zone) + '</div></div></div>' +
    '<div class="tb-right"><span class="role-chip ' + chip + '">' + chipTxt + '</span>' +
    '<span class="tb-user">Demo user:<select onchange="A.as(this.value)">' +
    [['rahul', 'Rahul Verma (Rohan)'], ['amit', 'Amit Sharma (HPCL)'], ['admin', 'superadmin']].map(x => '<option value="' + x[0] + '"' + (x[0] === S.user ? ' selected' : '') + '>' + x[1] + '</option>').join('') +
    '</select></span><button class="btn-sm" onclick="A.as(\'rahul\')">Sign out</button></div></div>' +
    '<div class="tabs">' + tabs.map(t => '<a class="tab' + (t[0] === activeTab ? ' on' : '') + '" href="#/' + t[0] + '">' + t[1] + (t[2] ? '<span class="badge-n">' + t[2] + '</span>' : '') + '</a>').join('') + '</div>' +
    '<div class="content">' + body + '</div>';
  bindNew();
}

/* ---------- Dashboard / Raw ---------- */
const SALES = [];
(function () {
  const outs = Object.keys(OUTLETS);
  const months = ['Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026'];
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  months.forEach(m => outs.forEach(rc => {
    const o = OUTLETS[rc];
    SALES.push({ m: m, rc: rc, outlet: o[0], ro: o[1], item: ITEMS[rnd() > .75 ? 1 : 0], qty: Math.round(60 + rnd() * 240) });
  }));
})();

function vDash() {
  const lit = ro => SALES.filter(s => s.m === 'Oct 2026' && (!ro || s.ro === ro)).reduce((a, s) => a + s.qty * LPU, 0);
  const tot = lit(), max = Math.max.apply(null, ROS.map(lit));
  const os = ORDERS.filter(visible);
  const c = st => os.filter(o => o.status === st).length;
  return '<div class="metrics">' +
    mc('Oct 2026 DEF sales', n0(tot) + ' L', 'All regional offices', 'bl') + mc('Outlets reporting', Object.keys(OUTLETS).length, 'This month', 'gr') +
    mc('Orders pending', c('pending'), 'Awaiting approval', 'am') + mc('Orders approved', c('approved'), 'Visible to you', 'gr') + '</div>' +
    '<div class="card"><h3>Oct 2026 DEF volume by regional office (litres)</h3><div class="sub">Sample data — preview only</div>' +
    '<div class="chart">' + ROS.map(r => '<div class="bar" style="height:' + (lit(r) / max * 100) + '%"><span>' + n0(lit(r)) + '</span></div>').join('') + '</div>' +
    '<div style="display:flex;gap:18px">' + ROS.map(r => '<div class="bar-lbl">' + r + '</div>').join('') + '</div></div>';
}
function mc(l, v, s, cls) { return '<div class="mc ' + cls + '"><div class="lbl">' + l + '</div><div class="val">' + v + '</div><div class="s">' + s + '</div></div>'; }

function vRaw() {
  const f = S.f.raw;
  return '<div class="filter-bar"><div class="fg"><label>Regional office</label><select class="sel" onchange="A.f(\'raw\',\'ro\',this.value)">' + optHtml(ROS, f.ro, 'All') + '</select></div></div>' +
    '<div class="tc"><div class="th"><h3>Secondary sales — raw data</h3></div><div class="tcs"><table><thead><tr><th>Month</th><th>RO code</th><th>Outlet</th><th>Regional office</th><th>Item</th><th class="num">Qty (EA)</th><th class="num">Litres</th></tr></thead><tbody>' +
    SALES.filter(s => !f.ro || s.ro === f.ro).slice().reverse().slice(0, 40).map(s => '<tr><td>' + s.m + '</td><td>' + s.rc + '</td><td><b>' + esc(s.outlet) + '</b></td><td>' + s.ro + '</td><td>' + s.item + '</td><td class="num">' + s.qty + '</td><td class="num">' + n0(s.qty * LPU) + '</td></tr>').join('') +
    '</tbody></table></div></div>';
}

/* ---------- New / edit order ---------- */
function blankForm() { return { ref: null, date: '29 Oct 2026', ro: ROS[0], rc: '', remarks: '', items: [], add: { item: '', qty: '', touched: false } }; }

function vNew(r) {
  if (r[1]) {
    const o = ORDERS.find(x => x.ref === r[1]);
    if (o && (!S.form || S.form.ref !== o.ref)) S.form = { ref: o.ref, date: dFull(o.date), ro: o.ro, rc: o.rc, remarks: o.remarks, items: o.items.map(i => Object.assign({}, i)), add: { item: '', qty: '', touched: false } };
  } else if (!S.form || S.form.ref) S.form = blankForm();
  const f = S.form, u = cur2(), ap = approverOf(u.zone);
  const info = OUTLETS[f.rc];
  const tot = f.items.reduce((a, i) => a + i.qty, 0);
  return '<div class="rn"><span>ⓘ</span><span>This order will be sent to <b>' + esc(ap.name) + ' (HPCL, ' + esc(u.zone) + ')</b> for approval. You can edit it until it is submitted.</span></div>' +
    '<div class="card"><h3>' + (f.ref ? 'Edit order ' + f.ref : 'Create order') + '</h3><div class="sub">Order reference is generated on save. Fields marked * are mandatory.</div>' +
    '<div class="grid g4"><div class="field"><label>Order date *</label><input class="inp" value="' + esc(f.date) + '" oninput="A.fv(\'date\',this.value)"></div>' +
    '<div class="field"><label>Zone</label><input class="inp lock" value="' + esc(u.zone) + ' 🔒" readonly></div>' +
    '<div class="field"><label>Regional office *</label><select class="inp" id="f-ro" onchange="A.fv(\'ro\',this.value)">' + optHtml(ROS, f.ro) + '</select></div>' +
    '<div class="field"><label>State</label><input class="inp lock" id="f-state" value="' + esc(info ? info[3] : '') + '" readonly></div>' +
    '<div class="field"><label>RO code *</label><input class="inp" id="f-rc" value="' + esc(f.rc) + '" placeholder="e.g. 41086412" oninput="A.rc(this.value)"><div id="f-rcmsg"></div></div>' +
    '<div class="field"><label>Outlet name</label><input class="inp lock" id="f-out" value="' + esc(info ? info[0] : '') + '" readonly></div>' +
    '<div class="field"><label>District</label><input class="inp lock" id="f-dist" value="' + esc(info ? info[2] : '') + '" readonly></div>' +
    '<div class="field"><label>Sales area</label><input class="inp lock" id="f-area" value="' + esc(info ? info[4] : '') + '" readonly></div></div>' +
    '<hr style="border:0;border-top:1px solid #e5e7eb;margin:1.1rem 0"><h3>Order items</h3><div style="height:8px"></div>' +
    '<div class="tc tcs" style="margin-bottom:1rem"><table><thead><tr><th>Item *</th><th class="num">Quantity (EA) *</th><th class="num">Volume (litres)</th><th></th></tr></thead><tbody>' +
    f.items.map((i, k) => '<tr><td>' + esc(i.item) + '</td><td class="num">' + n0(i.qty) + '</td><td class="num">' + n0(i.qty * LPU) + '</td><td class="num"><button class="btn-xs" onclick="A.rm(' + k + ')">Remove</button></td></tr>').join('') +
    '<tr><td><select class="inp" onchange="A.addv(\'item\',this.value)">' + optHtml(ITEMS, f.add.item, 'Select item') + '</select></td>' +
    '<td class="num"><input class="inp" type="number" min="0" style="width:110px;text-align:right' + (f.add.touched && !(f.add.qty > 0) ? ';border-color:#e02424' : '') + '" value="' + esc(f.add.qty) + '" placeholder="0" oninput="A.addv(\'qty\',this.value)">' +
    (f.add.touched && !(f.add.qty > 0) ? '<div class="err-t">Enter a quantity greater than 0</div>' : '') + '</td><td class="num">—</td><td class="num"><button class="btn-p" onclick="A.add()">+ Add item</button></td></tr>' +
    '<tr><td><b>Total</b></td><td class="num"><b id="f-tq">' + n0(tot) + ' EA</b></td><td class="num"><b id="f-tl">' + n0(tot * LPU) + ' L</b></td><td></td></tr></tbody></table></div>' +
    '<div class="field"><label>Remarks (optional)</label><textarea class="inp" oninput="A.fv(\'remarks\',this.value)">' + esc(f.remarks) + '</textarea></div>' +
    '<div style="display:flex;gap:8px"><button class="btn-g" onclick="A.save(false)">Save as draft</button><button class="btn-p" onclick="A.save(true)">Submit for HPCL approval →</button><span class="right"></span><button class="btn-g" onclick="A.cancel()">Cancel</button></div></div>';
}
function bindNew() { if (route()[0] === 'new' && S.form) lookupMsg(); }
function lookupMsg() {
  const f = S.form, el = $('#f-rcmsg'); if (!el) return;
  if (!f.rc) { el.innerHTML = ''; return; }
  el.innerHTML = OUTLETS[f.rc] ? '<div class="ok-t">✓ Outlet found</div>' : '<div class="err-t">RO code not found (try 41086412)</div>';
}

/* ---------- order tables ---------- */
function vMy() {
  const f = S.f.my;
  const mine = ORDERS.filter(visible);
  const c = st => mine.filter(o => o.status === st).length;
  const ap = approverOf(cur2().zone);
  return '<div class="metrics">' + mc('Draft', c('draft'), 'Not yet submitted', 'gy') + mc('Pending approval', c('pending'), 'With ' + esc(ap.name) + ' (HPCL)', 'am') + mc('Approved', c('approved'), 'This month', 'gr') + mc('Rejected', c('rejected'), 'Needs your action', 'rd') + '</div>' +
    '<div class="filter-bar"><div class="fg"><label>Status</label><select class="sel" onchange="A.f(\'my\',\'st\',this.value)">' + ['', 'draft', 'pending', 'approved', 'rejected'].map(s => '<option value="' + s + '"' + (f.st === s ? ' selected' : '') + '>' + (s ? s[0].toUpperCase() + s.slice(1) : 'All') + '</option>').join('') + '</select></div>' +
    '<div class="fg"><label>Month</label><select class="sel"><option>Oct 2026</option></select></div>' +
    '<div class="fg"><label>Search</label><input class="sel" style="min-width:200px" placeholder="Order ref, outlet…" value="' + esc(f.q) + '" oninput="A.fq(\'my\',this.value)"></div>' +
    '<button class="btn-g right" onclick="A.reset(\'my\')">Reset</button></div><div id="tbl">' + tMy() + '</div>';
}
function tMy() {
  const f = S.f.my, q = f.q.toLowerCase();
  const rows = ORDERS.filter(visible).filter(o => (!f.st || o.status === f.st) && (!q || (o.ref + o.outlet).toLowerCase().includes(q))).sort((a, b) => b.date - a.date || b.ref.localeCompare(a.ref));
  const ap = approverOf(cur2().zone);
  return '<div class="tc"><div class="th"><h3>My orders (' + rows.length + ')</h3><button class="btn-p" onclick="A.newOrder()">+ New order</button></div><div class="tcs"><table><thead><tr><th>Order ref</th><th>Date</th><th>Outlet</th><th>RO</th><th class="num">Qty (EA)</th><th class="num">Litres</th><th>HPCL officer</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
    (rows.map(o => {
      const sub = o.status === 'approved' ? '<div class="hint">by ' + esc(U(o.appr).name) + ' · ' + dShort(o.apprAt) + '</div>' : o.status === 'rejected' ? '<div class="note-rej">“' + esc(o.reason) + '”</div>' : '';
      const act = o.status === 'draft' ? '<button class="btn-xs e" onclick="A.edit(\'' + o.ref + '\')">Edit</button> <button class="btn-xs p" onclick="A.submit(\'' + o.ref + '\')">Submit</button> <button class="btn-xs" onclick="A.del(\'' + o.ref + '\')">Delete</button>'
        : o.status === 'rejected' ? '<button class="btn-xs e" onclick="A.edit(\'' + o.ref + '\')">Edit &amp; resubmit</button> <button class="btn-xs" onclick="A.view(\'' + o.ref + '\')">View</button>'
        : '<button class="btn-xs" onclick="A.view(\'' + o.ref + '\')">View</button>';
      return '<tr><td class="ref">' + o.ref + '</td><td>' + dShort(o.date) + '</td><td><b>' + esc(o.outlet) + '</b></td><td>' + o.ro + '</td><td class="num">' + qtyOf(o) + '</td><td class="num">' + n0(litOf(o)) + '</td><td>' + esc(ap.name) + '</td><td>' + pill(o.status) + sub + '</td><td>' + act + '</td></tr>';
    }).join('') || '<tr><td colspan="9" class="empty">No orders match.</td></tr>') + '</tbody></table></div></div>';
}

function vPending() {
  const u = cur2(), f = S.f.pend;
  const pend = ORDERS.filter(o => o.status === 'pending' && visible(o));
  const apprM = ORDERS.filter(o => o.status === 'approved' && visible(o)), rejM = ORDERS.filter(o => o.status === 'rejected' && visible(o));
  const oldest = pend.length ? Math.max.apply(null, pend.map(o => waitOf(o)[1])) : 0;
  const officers = USERS.filter(x => x.org === 'rohan' && x.zone === u.zone).map(x => x.name);
  return '<div class="metrics">' + mc('Awaiting your approval', pend.length, pend.length ? 'Oldest waiting ' + oldest + ' day' + (oldest === 1 ? '' : 's') : 'All clear', 'am') +
    mc('Pending volume', n0(pend.reduce((a, o) => a + litOf(o), 0)) + ' L', pend.reduce((a, o) => a + qtyOf(o), 0) + ' EA', 'bl') +
    mc('Approved this month', apprM.length + 28, n0(apprM.reduce((a, o) => a + litOf(o), 0) + 55000) + ' L', 'gr') + mc('Rejected this month', rejM.length + 1, '', 'rd') + '</div>' +
    '<div class="tc"><div class="th"><h3>Orders pending approval — ' + esc(u.zone) + '</h3><div class="fg"><label>Rohan officer</label><select class="sel" onchange="A.f(\'pend\',\'off\',this.value)">' + optHtml(officers, f.off, 'All') + '</select><label>RO</label><select class="sel" onchange="A.f(\'pend\',\'ro\',this.value)">' + optHtml(ROS, f.ro, 'All') + '</select></div></div><div id="tbl">' + tPending() + '</div></div>';
}
function tPending() {
  const f = S.f.pend;
  const rows = ORDERS.filter(o => o.status === 'pending' && visible(o)).filter(o => (!f.off || U(o.officer).name === f.off) && (!f.ro || o.ro === f.ro)).sort((a, b) => b.sub - a.sub);
  return '<div class="tcs"><table><thead><tr><th>Order ref</th><th>Submitted</th><th>Rohan officer</th><th>Outlet</th><th>RO code</th><th>Item(s)</th><th class="num">Qty (EA)</th><th class="num">Litres</th><th>Waiting</th><th>Action</th></tr></thead><tbody>' +
    (rows.map(o => { const w = waitOf(o); return '<tr><td class="ref">' + o.ref + '</td><td>' + dTime(o.sub) + '</td><td>' + esc(U(o.officer).name) + '</td><td><b>' + esc(o.outlet) + '</b></td><td>' + o.rc + '</td><td>' + esc(o.items.map(i => i.item).join(', ')) + '</td><td class="num">' + qtyOf(o) + '</td><td class="num">' + n0(litOf(o)) + '</td><td style="color:' + (w[1] >= 2 ? '#e02424' : '#d97706') + '">' + w[0] + '</td><td><button class="btn-xs p" onclick="A.review(\'' + o.ref + '\')">Review</button></td></tr>'; }).join('') || '<tr><td colspan="10" class="empty">Nothing pending — all caught up.</td></tr>') + '</tbody></table></div>';
}

function vAll() {
  const u = cur2(), f = S.f.all;
  return '<div class="filter-bar">' + (u.id === 'admin' ? '<div class="fg"><label>Zone</label><select class="sel" onchange="A.f(\'all\',\'zone\',this.value)">' + optHtml(ZONES, f.zone, 'All') + '</select></div>' : '') +
    '<div class="fg"><label>Status</label><select class="sel" onchange="A.f(\'all\',\'st\',this.value)">' + ['', 'draft', 'pending', 'approved', 'rejected'].map(s => '<option value="' + s + '"' + (f.st === s ? ' selected' : '') + '>' + (s ? s[0].toUpperCase() + s.slice(1) : 'All') + '</option>').join('') + '</select></div>' +
    '<div class="fg"><label>Search</label><input class="sel" style="min-width:200px" placeholder="Order ref, outlet…" value="' + esc(f.q) + '" oninput="A.fq(\'all\',this.value)"></div></div>' +
    (u.id === 'admin' ? '<div class="rn"><span>ⓘ</span><span>Super admin has read-only access to all orders and cannot create or approve.</span></div>' : '') +
    '<div id="tbl">' + tAll() + '</div>';
}
function tAll() {
  const f = S.f.all, q = f.q.toLowerCase();
  const rows = ORDERS.filter(visible).filter(o => o.status !== 'draft' || cur2().org === 'rohan').filter(o => (!f.zone || o.zone === f.zone) && (!f.st || o.status === f.st) && (!q || (o.ref + o.outlet).toLowerCase().includes(q))).sort((a, b) => b.date - a.date || b.ref.localeCompare(a.ref));
  return '<div class="tc"><div class="th"><h3>All orders (' + rows.length + ')</h3></div><div class="tcs"><table><thead><tr><th>Order ref</th><th>Date</th><th>Zone</th><th>Rohan officer</th><th>Outlet</th><th>RO</th><th class="num">Qty (EA)</th><th class="num">Litres</th><th>Status</th><th></th></tr></thead><tbody>' +
    (rows.map(o => '<tr><td class="ref">' + o.ref + '</td><td>' + dShort(o.date) + '</td><td>' + o.zone + '</td><td>' + esc(U(o.officer).name) + '</td><td><b>' + esc(o.outlet) + '</b></td><td>' + o.ro + '</td><td class="num">' + qtyOf(o) + '</td><td class="num">' + n0(litOf(o)) + '</td><td>' + pill(o.status) + '</td><td><button class="btn-xs" onclick="A.view(\'' + o.ref + '\')">View</button></td></tr>').join('') || '<tr><td colspan="10" class="empty">No orders match.</td></tr>') + '</tbody></table></div></div>';
}

/* ---------- order detail ---------- */
function vOrder(r) {
  const o = ORDERS.find(x => x.ref === r[1]);
  if (!o || !visible(o)) return '<div class="card"><div class="empty">Order not found.</div></div>';
  const u = cur2(), ap = approverOf(o.zone);
  const k = (a, b) => '<div><div class="k" style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;font-weight:600;margin-bottom:2px">' + a + '</div><div class="v" style="font-size:13px;font-weight:500">' + b + '</div></div>';
  const back = u.org === 'rohan' ? 'my' : u.org === 'hpcl' ? 'pending' : 'all';
  return '<div class="page-head"><button class="btn-g" onclick="go(\'' + back + '\')">← Back to orders</button><h2>Order <span class="ref">' + o.ref + '</span></h2>' + pill(o.status) + '<span class="right">' + (o.status === 'approved' ? '<span class="stamp">APPROVED</span>' : o.status === 'rejected' ? '<span class="stamp rej">REJECTED</span>' : '') + '</span></div>' +
    '<div class="dwrap"><div class="card"><h3>Order details</h3><div class="sub">Visible to the Rohan Energy officer and the HPCL officer of this zone.</div>' +
    '<div class="dl">' + k('Order date', dFull(o.date)) + k('Zone', o.zone) + k('Regional office', o.ro) + k('Outlet', esc(o.outlet)) + k('RO code', o.rc) + k('District / State', esc(o.district) + ' / ' + esc(o.state)) + k('Sales area', esc(o.area)) + k('Created by', esc(U(o.officer).name) + ' (Rohan)') + k('Approver', esc(ap.name) + ' (HPCL)') + '</div>' +
    '<div class="tc tcs"><table><thead><tr><th>Item</th><th class="num">Qty (EA)</th><th class="num">Volume (L)</th></tr></thead><tbody>' + o.items.map(i => '<tr><td>' + esc(i.item) + '</td><td class="num">' + n0(i.qty) + '</td><td class="num">' + n0(i.qty * LPU) + '</td></tr>').join('') + '<tr><td><b>Total</b></td><td class="num"><b>' + qtyOf(o) + '</b></td><td class="num"><b>' + n0(litOf(o)) + '</b></td></tr></tbody></table></div>' +
    '<div class="field"><label>Remarks</label><div class="inp lock" style="min-height:39px">' + (esc(o.remarks) || '—') + '</div></div>' +
    (o.status === 'rejected' && u.id === o.officer ? '<button class="btn-p" onclick="A.edit(\'' + o.ref + '\')">Edit &amp; resubmit</button>' : '') + '</div>' +
    '<div class="card"><h3>Status history</h3><div class="sub">Every change is recorded with user and time.</div><div class="tl">' +
    o.hist.map((h, i) => { const hu = U(h.by); const cls = h.t === 'Rejected' ? 'rej' : (i === 0 && o.status === 'pending' ? 'cur' : 'done'); return '<div class="tli ' + cls + '"' + '' + '><div class="t"' + (h.t === 'Rejected' ? ' style="color:#e02424"' : '') + '>' + h.t + '</div><div class="m">' + esc(hu.name) + ' · ' + orgLabel(hu.org) + ' · ' + dFullTime(h.ts) + '</div>' + (h.c ? '<div class="c">' + esc(h.c) + '</div>' : '') + '</div>'; }).join('') + '</div></div></div>';
}

/* ---------- admin ---------- */
function vAdmin() {
  const f = S.f.adm;
  return '<div class="card"><h3>Zone mapping</h3><div class="sub">Each zone has one HPCL approving officer and one or more Rohan Energy sales officers. Orders are routed by zone.</div><div class="zgrid">' +
    ZONES.map(z => { const us = USERS.filter(u => u.zone === z); return '<div class="zcard"><h4>' + z + '<span class="cnt">' + us.length + ' users</span></h4>' + us.map(u => '<div class="zrow">' + tag(u.org) + (u.org === 'hpcl' ? '<b>' + esc(u.name) + '</b> <span class="ml">· approver</span>' : esc(u.name)) + '</div>').join('') + '</div>'; }).join('') + '</div></div>' +
    '<div class="card"><h3>Add user</h3><div class="sub">Credentials are shared with the user by the administrator. Password is stored hashed.</div>' +
    '<div class="grid" style="grid-template-columns:repeat(6,1fr)"><div class="field"><label>Full name</label><input class="inp" id="nu-name" placeholder="e.g. Rahul Verma"></div><div class="field"><label>Username</label><input class="inp" id="nu-un" placeholder="letters, numbers, _"></div>' +
    '<div class="field"><label>Organization</label><select class="inp" id="nu-org"><option value="rohan">Rohan Energy</option><option value="hpcl">HPCL</option></select></div>' +
    '<div class="field"><label>Role</label><select class="inp" id="nu-role"><option>Sales Officer</option><option>Sales Officer (Approver)</option></select></div>' +
    '<div class="field"><label>Zone</label><select class="inp" id="nu-zone">' + optHtml(ZONES) + '</select></div><div class="field"><label>Temporary password</label><input class="inp" id="nu-pw" type="password" placeholder="Min 8 characters"></div></div>' +
    '<div style="height:10px"></div><button class="btn-p" onclick="A.addUser()">+ Create user</button></div>' +
    '<div class="tc"><div class="th"><h3 id="ucount"></h3><div class="fg"><label>Organization</label><select class="sel" onchange="A.f(\'adm\',\'org\',this.value)"><option value="">All</option><option value="rohan"' + (f.org === 'rohan' ? ' selected' : '') + '>Rohan Energy</option><option value="hpcl"' + (f.org === 'hpcl' ? ' selected' : '') + '>HPCL</option></select><label>Zone</label><select class="sel" onchange="A.f(\'adm\',\'zone\',this.value)">' + optHtml(ZONES, f.zone, 'All') + '</select></div></div><div id="tbl">' + tUsers() + '</div></div>';
}
function tUsers() {
  const f = S.f.adm;
  const rows = USERS.filter(u => (!f.org || u.org === f.org) && (!f.zone || u.zone === f.zone));
  setTimeout(() => { const c = $('#ucount'); if (c) c.textContent = 'Users (' + rows.length + ')'; });
  return '<div class="tcs"><table><thead><tr><th>Name</th><th>Username</th><th>Organization</th><th>Role</th><th>Zone</th><th>Status</th><th>Last login</th><th>Actions</th></tr></thead><tbody>' +
    rows.map(u => '<tr><td><b>' + esc(u.name) + '</b></td><td>' + esc(u.un) + '</td><td>' + tag(u.org) + '</td><td>' + u.role + '</td><td>' + u.zone + '</td><td><span class="dot" style="background:' + (u.active ? '#0e9f6e' : '#9ca3af') + '"></span>' + (u.active ? 'Active' : 'Disabled') + '</td><td>' + u.last + '</td>' +
      '<td><button class="btn-xs e" onclick="A.toast(\'Edit user — not wired in preview\')">Edit</button> <button class="btn-xs" onclick="A.toast(\'Password reset link sent (demo)\')">Reset password</button> <button class="btn-xs' + (u.active ? '' : ' p') + '" onclick="A.toggle(\'' + u.id + '\')">' + (u.active ? 'Disable' : 'Enable') + '</button></td></tr>').join('') + '</tbody></table></div>';
}

/* ---------- review modal ---------- */
function modal() {
  const el = $('#modal');
  if (!S.review) { el.innerHTML = ''; return; }
  const o = ORDERS.find(x => x.ref === S.review.ref), sb = U(o.officer);
  const k = (a, b) => '<div><div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;font-weight:600;margin-bottom:2px">' + a + '</div><div style="font-size:13px;font-weight:500">' + b + '</div></div>';
  el.innerHTML = '<div class="overlay" onclick="if(event.target===this)A.close()"><div class="modal"><h3>Review order ' + o.ref + ' ' + pill(o.status) + '</h3><div class="sub">Submitted by ' + esc(sb.name) + ' (Rohan Energy) on ' + dFullTime(o.sub) + '</div>' +
    '<div class="dl">' + k('Outlet', esc(o.outlet)) + k('RO code', o.rc) + k('Regional office', o.ro) + k('District / State', esc(o.district) + ' / ' + esc(o.state)) + k('Sales area', esc(o.area)) + k('Zone', o.zone) + '</div>' +
    '<div class="tc tcs"><table><thead><tr><th>Item</th><th class="num">Qty (EA)</th><th class="num">Volume (L)</th></tr></thead><tbody>' + o.items.map(i => '<tr><td>' + esc(i.item) + '</td><td class="num">' + n0(i.qty) + '</td><td class="num">' + n0(i.qty * LPU) + '</td></tr>').join('') + '<tr><td><b>Total</b></td><td class="num"><b>' + qtyOf(o) + '</b></td><td class="num"><b>' + n0(litOf(o)) + '</b></td></tr></tbody></table></div>' +
    '<div class="field"><label>Rohan remarks</label><div class="inp lock">' + (esc(o.remarks) || '—') + '</div></div>' +
    '<div class="field"><label>Your comment <span style="font-weight:400;text-transform:none;color:#9ca3af">(required when rejecting)</span></label><textarea class="inp" id="rv-c" placeholder="Add a comment for the Rohan officer…" oninput="document.getElementById(\'rv-e\').textContent=\'\'"></textarea><div class="err-t" id="rv-e"></div></div>' +
    '<div class="mfoot"><button class="btn-g" onclick="A.close()">Close</button><button class="btn-do" onclick="A.decide(\'rejected\')">✕ Reject</button><button class="btn-s" onclick="A.decide(\'approved\')">✓ Approve order</button></div></div></div>';
}

/* ---------- actions ---------- */
function tblRefresh() {
  const r = route()[0], el = $('#tbl'); if (!el) return;
  el.innerHTML = ({ my: tMy, all: tAll, pending: tPending, admin: tUsers }[r] || (() => ''))();
}
function stamp() { return new Date(2026, 9, 29, new Date().getHours(), new Date().getMinutes()); }

const A = {
  as(id) { S.user = id; S.form = null; S.review = null; modal(); go('dashboard'); render(); },
  f(view, key, v) { S.f[view][key] = v; if (route()[0] === 'raw') render(); else tblRefresh(); },
  fq(view, v) { S.f[view].q = v; tblRefresh(); },
  reset(view) { S.f[view] = { st: '', q: '' }; render(); },
  toast: toast,
  newOrder() { S.form = null; go('new'); },
  edit(ref) { S.form = null; go('new/' + ref); },
  view(ref) { go('order/' + ref); },
  fv(k, v) { S.form[k] = v; },
  rc(v) {
    const f = S.form; f.rc = v.trim();
    const i = OUTLETS[f.rc];
    $('#f-out').value = i ? i[0] : ''; $('#f-dist').value = i ? i[2] : ''; $('#f-state').value = i ? i[3] : ''; $('#f-area').value = i ? i[4] : '';
    if (i) { f.ro = i[1]; $('#f-ro').value = i[1]; }
    lookupMsg();
  },
  addv(k, v) { S.form.add[k] = k === 'qty' ? v : v; if (k === 'qty') S.form.add.touched = true; },
  add() {
    const a = S.form.add, q = parseInt(a.qty, 10);
    if (!a.item) { toast('Select an item first'); return; }
    if (!(q > 0)) { a.touched = true; render(); return; }
    const ex = S.form.items.find(i => i.item === a.item);
    if (ex) ex.qty += q; else S.form.items.push({ item: a.item, qty: q });
    S.form.add = { item: '', qty: '', touched: false }; render();
  },
  rm(k) { S.form.items.splice(k, 1); render(); },
  cancel() { S.form = null; go(cur2().org === 'rohan' ? 'my' : 'dashboard'); },
  save(submit) {
    const f = S.form, u = cur2(), i = OUTLETS[f.rc];
    if (!i) { toast('Enter a valid RO code (try 41086412)'); return; }
    if (!f.items.length) { toast('Add at least one item'); return; }
    let o = f.ref && ORDERS.find(x => x.ref === f.ref);
    const now = stamp();
    if (!o) {
      o = { ref: 'RE-ORD-' + String(nextRef++).padStart(6, '0'), date: now, zone: u.zone, officer: u.id, status: 'draft', hist: [H('Draft created', u.id, now)] };
      ORDERS.push(o);
    }
    Object.assign(o, { outlet: i[0].split(',')[0], rc: f.rc, ro: f.ro, district: i[2], state: i[3], area: i[4], items: f.items.map(x => Object.assign({}, x)), remarks: f.remarks });
    if (submit) { o.status = 'pending'; o.sub = now; o.hist.unshift(H('Submitted for approval', u.id, now)); }
    S.form = null; toast(submit ? o.ref + ' submitted to ' + approverOf(o.zone).name : o.ref + ' saved as draft'); go('my'); render();
  },
  submit(ref) {
    const o = ORDERS.find(x => x.ref === ref), now = stamp();
    o.status = 'pending'; o.sub = now; o.reason = ''; o.hist.unshift(H('Submitted for approval', o.officer, now));
    toast(ref + ' submitted for approval'); render();
  },
  del(ref) { ORDERS = ORDERS.filter(o => o.ref !== ref); toast(ref + ' deleted'); render(); },
  review(ref) { S.review = { ref: ref }; modal(); },
  close() { S.review = null; modal(); },
  decide(st) {
    const o = ORDERS.find(x => x.ref === S.review.ref), c = $('#rv-c').value.trim();
    if (st === 'rejected' && !c) { $('#rv-e').textContent = 'A comment is required when rejecting an order.'; return; }
    const now = stamp();
    o.status = st; o.appr = S.user; o.apprAt = now; o.reason = st === 'rejected' ? c : '';
    o.hist.unshift(H(st === 'approved' ? 'Approved' : 'Rejected', S.user, now, c));
    S.review = null; modal(); toast(o.ref + (st === 'approved' ? ' approved' : ' rejected')); render();
  },
  addUser() {
    const g = id => $('#' + id).value.trim();
    if (!g('nu-name') || !g('nu-un')) { toast('Full name and username are required'); return; }
    if (g('nu-pw').length < 8) { toast('Temporary password must be at least 8 characters'); return; }
    USERS.push({ id: 'u' + (++S.newUsers), name: g('nu-name'), un: g('nu-un'), org: g('nu-org'), role: g('nu-role'), zone: g('nu-zone'), active: true, last: 'Never' });
    toast('User created'); render();
  },
  toggle(id) { const u = U(id); u.active = !u.active; tblRefresh(); }
};
window.A = A; window.go = go;
window.addEventListener('hashchange', () => { S.review = null; modal(); render(); });
render();
})();

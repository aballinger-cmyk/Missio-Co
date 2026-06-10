import { useState } from "react";

// ── Brand colors ──────────────────────────────────────────────────────────────
const NAVY  = "#1a2744";
const GREEN = "#2d5a1b";
const CREAM = "#f8f6f0";
const GOLD  = "#c9a84c";

// ── Logo SVG (inline, no external deps) ──────────────────────────────────────
function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill={NAVY}/>
      <path d="M20 75 L50 25 L80 75" stroke={GREEN} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M35 55 L50 30 L65 55" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="50" cy="78" r="5" fill={GOLD}/>
    </svg>
  );
}

// ── Seed data ─────────────────────────────────────────────────────────────────
const PROPERTIES = [
  { id: 1, name: "9520 Main Estate", type: "Estate", status: "Active" },
  { id: 2, name: "Young Property",   type: "Residential", status: "Active" },
  { id: 3, name: "TRC Property",     type: "Ranch", status: "Active" },
  { id: 4, name: "Sub-Property 4",   type: "Residential", status: "Active" },
];

const INITIAL_TASKS = [
  { id: 1, title: "Walk driveways – remove debris", property: 1, assignee: "Daniel", freq: "Weekly",   status: "Pending",  priority: "High" },
  { id: 2, title: "Stucco inspection – mark with red tape", property: 1, assignee: "Daniel", freq: "Monthly", status: "In Progress", priority: "High" },
  { id: 3, title: "Clear grasses/weeds over 12 inches", property: 3, assignee: "Daniel", freq: "Monthly", status: "Pending", priority: "Urgent" },
  { id: 4, title: "Fire break from buildings & fences", property: 3, assignee: "Daniel", freq: "Quarterly", status: "Pending", priority: "Urgent" },
  { id: 5, title: "Pressure wash exterior lights & statues", property: 1, assignee: "Daniel", freq: "Quarterly", status: "Pending", priority: "Routine" },
  { id: 6, title: "Olive harvest & press", property: 1, assignee: "Daniel", freq: "Annual", status: "Pending", priority: "Scheduled" },
  { id: 7, title: "Wednesday landscape work", property: 2, assignee: "James Small", freq: "Weekly", status: "Pending", priority: "Routine" },
  { id: 8, title: "Fire extinguisher check – all houses", property: 1, assignee: "Daniel", freq: "Annual", status: "Pending", priority: "High" },
];

const INITIAL_VENDORS = [
  { id: 1, name: "Small Landscaping (James Small)", service: "Landscape", property: "Young Property", status: "Active", contact: "TBD" },
  { id: 2, name: "Drew Cranford", service: "Property Mgmt", property: "9520 Main Estate", status: "Active", contact: "TBD" },
  { id: 3, name: "Wayne (Stucco)", service: "Stucco / Masonry", property: "9520 Main Estate", status: "Active", contact: "TBD" },
  { id: 4, name: "Spa Vendor", service: "Spa Maintenance", property: "9520 Main Estate", status: "Under Review", contact: "TBD" },
  { id: 5, name: "Water Softener Vendor", service: "Water Systems", property: "9520 Main Estate", status: "Under Review", contact: "TBD" },
  { id: 6, name: "Pest Control Vendor", service: "Pest Control", property: "All Properties", status: "Under Review", contact: "TBD" },
];

const OPEN_QUESTIONS = [
  { id: 1, q: "Full vendor list for estate properties", owner: "Daniel", status: "Open" },
  { id: 2, q: "James Small – exact duties & scope", owner: "Daniel", status: "Open" },
  { id: 3, q: "Drew Cranford – exact areas & tasks", owner: "Daniel", status: "Open" },
  { id: 4, q: "Horse Grounds – Drew or Property Mgmt?", owner: "Jennifer", status: "Open" },
  { id: 5, q: "Spa – what are we paying vs what's being done?", owner: "Jennifer", status: "Open" },
  { id: 6, q: "Water softener – current scope & cost?", owner: "Jennifer", status: "Open" },
  { id: 7, q: "Pest control – fields and ranch coverage?", owner: "Daniel", status: "Open" },
];

const SKILLS_LIST = [
  "Landscaping","Irrigation","Tree Care","Fence Repair","General Labor",
  "Driving / Hauling","Cleaning / Housekeeping","Event Setup","Animal Care",
  "Painting","Basic Carpentry","Pressure Washing","Equipment Operation","Kitchen / Cooking",
];

const TIMELINE_ITEMS = [
  { day: "Days 1–3",   task: "9520 audit – walk all zones, log time per area", who: "Daniel", property: "9520" },
  { day: "Days 4–7",   task: "Vendor review – confirm scope & cost for spa, water softener, pest", who: "Jennifer", property: "9520" },
  { day: "Days 8–10",  task: "Fire hazard clear – grasses & weeds >12 in, establish fire break", who: "Daniel", property: "TRC Ranch" },
  { day: "Days 11–14", task: "Young Property audit & Wednesday schedule confirm with James Small", who: "Daniel", property: "Young" },
  { day: "Days 15–17", task: "Fire extinguisher check all houses – coord w/ Bro. Lumpkin & Hogue", who: "Daniel", property: "All" },
  { day: "Days 18–21", task: "TRC Ranch audit – identify gaps & prep for active use", who: "Daniel", property: "TRC Ranch" },
  { day: "Days 22–25", task: "Task frequency matrix finalized – daily/weekly/monthly/quarterly/annual", who: "Daniel + Jennifer", property: "All" },
  { day: "Days 26–30", task: "V1 system review with Jennifer & leadership – document open items", who: "All", property: "All" },
];

// ── Shared UI atoms ───────────────────────────────────────────────────────────
const badge = (label, color = "#e2e8f0", text = "#1a202c") => (
  <span style={{ background: color, color: text, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{label}</span>
);

const priorityColor = (p) => ({
  Urgent: ["#fee2e2","#991b1b"], High: ["#fef3c7","#92400e"],
  Routine: ["#d1fae5","#065f46"], Scheduled: ["#dbeafe","#1e40af"],
}[p] || ["#f1f5f9","#475569"]);

const statusDot = (s) => ({
  Active: GREEN, "In Progress": GOLD, Pending: "#94a3b8",
  Complete: GREEN, Open: "#f59e0b", Resolved: GREEN, "Under Review": "#f59e0b",
}[s] || "#94a3b8");

function Card({ children, style = {} }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 style={{ fontSize: 20, fontWeight: 700, color: NAVY, margin: "0 0 16px" }}>{children}</h2>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ tasks, vendors, volunteers, interns, requests }) {
  const urgent = tasks.filter(t => t.priority === "Urgent" || t.priority === "High").length;
  const openReq = requests.filter(r => r.status === "Open" || r.status === "Pending").length;
  return (
    <div>
      <SectionTitle>Dashboard</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Properties", value: PROPERTIES.length, color: NAVY },
          { label: "Active Tasks", value: tasks.length, color: GREEN },
          { label: "High Priority", value: urgent, color: "#b91c1c" },
          { label: "Open Requests", value: openReq, color: GOLD },
          { label: "Vendors", value: vendors.length, color: "#7c3aed" },
          { label: "Volunteers", value: volunteers.length, color: "#0891b2" },
          { label: "Interns", value: interns.length, color: "#059669" },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 12px" }}>Open Questions</h3>
          {OPEN_QUESTIONS.map(q => (
            <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", marginTop: 6, flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 13, color: "#1e293b" }}>{q.q}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>Owner: {q.owner}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 12px" }}>Properties Overview</h3>
          {PROPERTIES.map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{p.type}</div>
              </div>
              {badge(p.status, "#d1fae5", "#065f46")}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
function Tasks({ tasks, setTasks }) {
  const [filter, setFilter] = useState("All");
  const freqs = ["All", "Daily", "Weekly", "Monthly", "Quarterly", "Annual"];
  const shown = filter === "All" ? tasks : tasks.filter(t => t.freq === filter);

  const toggle = (id) => setTasks(ts => ts.map(t =>
    t.id === id ? { ...t, status: t.status === "Complete" ? "Pending" : "Complete" } : t
  ));

  return (
    <div>
      <SectionTitle>Tasks</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {freqs.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
              background: filter === f ? NAVY : "#f1f5f9", color: filter === f ? "#fff" : "#475569" }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.map(t => {
          const [bg, txt] = priorityColor(t.priority);
          const prop = PROPERTIES.find(p => p.id === t.property);
          return (
            <Card key={t.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
              opacity: t.status === "Complete" ? 0.55 : 1 }}>
              <input type="checkbox" checked={t.status === "Complete"} onChange={() => toggle(t.id)}
                style={{ width: 18, height: 18, accentColor: GREEN, cursor: "pointer", flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b",
                  textDecoration: t.status === "Complete" ? "line-through" : "none" }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{prop?.name} · {t.assignee} · {t.freq}</div>
              </div>
              {badge(t.priority, bg, txt)}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── REQUESTS ──────────────────────────────────────────────────────────────────
function Requests({ requests, setRequests }) {
  const [tab, setTab] = useState("board");
  const [form, setForm] = useState({ title: "", submitter: "", role: "Staff", property: "1", urgency: "Routine", reason: "", eventLinked: false, eventDate: "" });

  const submit = () => {
    if (!form.title || !form.reason) return alert("Title and reason are required.");
    setRequests(rs => [...rs, { ...form, id: Date.now(), status: "Open", property: parseInt(form.property) }]);
    setForm({ title: "", submitter: "", role: "Staff", property: "1", urgency: "Routine", reason: "", eventLinked: false, eventDate: "" });
    setTab("board");
  };

  const urgencyColor = { Emergency: ["#fee2e2","#991b1b"], Urgent: ["#fef3c7","#92400e"], Routine: ["#d1fae5","#065f46"], Scheduled: ["#dbeafe","#1e40af"] };

  return (
    <div>
      <SectionTitle>Requests</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["board","Triage Board"],["submit","Submit Request"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)}
            style={{ padding: "6px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
              background: tab === v ? NAVY : "#f1f5f9", color: tab === v ? "#fff" : "#475569" }}>{l}</button>
        ))}
      </div>

      {tab === "board" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {requests.length === 0 && <p style={{ color: "#94a3b8" }}>No requests yet. Submit one to get started.</p>}
          {requests.map(r => {
            const [bg,txt] = urgencyColor[r.urgency] || ["#f1f5f9","#475569"];
            const prop = PROPERTIES.find(p => p.id === r.property);
            return (
              <Card key={r.id} style={{ borderLeft: `4px solid ${txt}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
                      {r.submitter || "Unknown"} · {r.role} · {prop?.name || "Estate"}
                      {r.eventLinked && <span style={{ marginLeft: 8, color: GOLD, fontWeight: 700 }}>⚡ Event</span>}
                    </div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>{r.reason}</div>
                  </div>
                  {badge(r.urgency, bg, txt)}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "submit" && (
        <Card style={{ maxWidth: 560 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 16px" }}>New Request</h3>
          {[["title","Request Title","text"],["submitter","Your Name","text"]].map(([k,ph,type]) => (
            <input key={k} type={type} placeholder={ph} value={form[k]}
              onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
              style={{ display: "block", width: "100%", marginBottom: 12, padding: "9px 12px", borderRadius: 8,
                border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}/>
          ))}
          {[["role","Role",["Leadership","Jennifer Lagos","Daniel","Staff","Vendor","Volunteer","Intern"]],
            ["urgency","Urgency",["Emergency","Urgent","Routine","Scheduled"]],
            ["property","Property",PROPERTIES.map(p => p.name)]].map(([k,label,opts]) => (
            <select key={k} value={k === "property" ? PROPERTIES.find(p=>p.id===form.property)?.name || opts[0] : form[k]}
              onChange={e => setForm(f => ({ ...f, [k]: k === "property" ? (PROPERTIES.find(p=>p.name===e.target.value)?.id||1) : e.target.value }))}
              style={{ display: "block", width: "100%", marginBottom: 12, padding: "9px 12px", borderRadius: 8,
                border: "1px solid #e2e8f0", fontSize: 14, background: "#fff" }}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}
          <textarea placeholder="Reason / guiding problem (required)" value={form.reason}
            onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
            style={{ display: "block", width: "100%", marginBottom: 12, padding: "9px 12px", borderRadius: 8,
              border: "1px solid #e2e8f0", fontSize: 14, minHeight: 80, boxSizing: "border-box", resize: "vertical" }}/>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={form.eventLinked} onChange={e => setForm(f => ({ ...f, eventLinked: e.target.checked }))}
              style={{ accentColor: GOLD }}/>
            <span style={{ fontSize: 13 }}>Linked to a special event</span>
          </label>
          {form.eventLinked && (
            <input type="date" value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))}
              style={{ display: "block", width: "100%", marginBottom: 12, padding: "9px 12px", borderRadius: 8,
                border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}/>
          )}
          <button onClick={submit}
            style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 8, padding: "10px 28px",
              fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Submit Request</button>
        </Card>
      )}
    </div>
  );
}

// ── VENDORS ───────────────────────────────────────────────────────────────────
function Vendors({ vendors, setVendors }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", service: "", property: "All Properties", status: "Active", contact: "" });

  const add = () => {
    if (!form.name) return;
    setVendors(vs => [...vs, { ...form, id: Date.now() }]);
    setForm({ name: "", service: "", property: "All Properties", status: "Active", contact: "" });
    setAdding(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle>Vendors</SectionTitle>
        <button onClick={() => setAdding(a => !a)}
          style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          + Add Vendor
        </button>
      </div>

      {adding && (
        <Card style={{ marginBottom: 20, maxWidth: 480 }}>
          {[["name","Vendor / Company Name"],["service","Service Type"],["contact","Contact Info"]].map(([k,ph]) => (
            <input key={k} placeholder={ph} value={form[k]}
              onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
              style={{ display: "block", width: "100%", marginBottom: 10, padding: "9px 12px", borderRadius: 8,
                border: "1px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }}/>
          ))}
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            style={{ display: "block", width: "100%", marginBottom: 12, padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, background: "#fff" }}>
            {["Active","Under Review","Inactive"].map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={add} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 8, padding: "9px 24px", fontWeight: 700, cursor: "pointer" }}>Save</button>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {vendors.map(v => (
          <Card key={v.id} style={{ borderTop: `3px solid ${statusDot(v.status)}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 4 }}>{v.name}</div>
            <div style={{ fontSize: 13, color: "#475569" }}>{v.service}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0" }}>{v.property}</div>
            {v.contact && <div style={{ fontSize: 12, color: "#64748b" }}>{v.contact}</div>}
            <div style={{ marginTop: 10 }}>{badge(v.status, v.status === "Active" ? "#d1fae5" : v.status === "Under Review" ? "#fef3c7" : "#f1f5f9",
              v.status === "Active" ? "#065f46" : v.status === "Under Review" ? "#92400e" : "#475569")}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── VOLUNTEERS ────────────────────────────────────────────────────────────────
function Volunteers({ volunteers, setVolunteers }) {
  const [adding, setAdding] = useState(false);
  const [skills, setSkills] = useState({});
  const [form, setForm] = useState({ name: "", type: "One-Time", org: "", contact: "" });

  const toggleSkill = (skill, mode) => {
    setSkills(s => {
      const cur = s[skill];
      if (cur === mode) return { ...s, [skill]: undefined };
      return { ...s, [skill]: mode };
    });
  };

  const add = () => {
    if (!form.name) return;
    setVolunteers(vs => [...vs, { ...form, id: Date.now(), skills, hoursLogged: 0 }]);
    setForm({ name: "", type: "One-Time", org: "", contact: "" });
    setSkills({});
    setAdding(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle>Volunteers</SectionTitle>
        <button onClick={() => setAdding(a => !a)}
          style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          + Add Volunteer
        </button>
      </div>

      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[["name","Full Name"],["org","Organization / Church"],["contact","Contact Info"]].map(([k,ph]) => (
              <input key={k} placeholder={ph} value={form[k]}
                onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}/>
            ))}
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, background: "#fff" }}>
              {["One-Time","Recurring","Church Group","Organization Group"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>Skills Checklist</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 6 }}>
              {SKILLS_LIST.map(sk => (
                <div key={sk} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 12, flex: 1, color: "#475569" }}>{sk}</span>
                  <button onClick={() => toggleSkill(sk, "have")}
                    style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, border: "none", cursor: "pointer",
                      background: skills[sk] === "have" ? GREEN : "#e2e8f0", color: skills[sk] === "have" ? "#fff" : "#475569" }}>Have</button>
                  <button onClick={() => toggleSkill(sk, "want")}
                    style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, border: "none", cursor: "pointer",
                      background: skills[sk] === "want" ? GOLD : "#e2e8f0", color: skills[sk] === "want" ? "#fff" : "#475569" }}>Learn</button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={add} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 8, padding: "9px 24px", fontWeight: 700, cursor: "pointer" }}>Save Volunteer</button>
        </Card>
      )}

      {volunteers.length === 0 && !adding && <p style={{ color: "#94a3b8" }}>No volunteers yet. Add the first one above.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {volunteers.map(v => (
          <Card key={v.id} style={{ borderTop: `3px solid ${GREEN}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{v.name}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", margin: "3px 0 8px" }}>{v.type}{v.org ? ` · ${v.org}` : ""}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Hours logged: {v.hoursLogged}</div>
            {Object.keys(v.skills || {}).filter(k => v.skills[k]).length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {Object.entries(v.skills || {}).filter(([,val]) => val).map(([sk, val]) =>
                  badge(sk, val === "have" ? "#d1fae5" : "#fef3c7", val === "have" ? "#065f46" : "#92400e")
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── INTERNS ───────────────────────────────────────────────────────────────────
function Interns({ interns, setInterns }) {
  const [adding, setAdding] = useState(false);
  const [skills, setSkills] = useState({});
  const [form, setForm] = useState({ name: "", start: "", goal: "", contact: "" });

  const toggleSkill = (sk, mode) => setSkills(s => ({ ...s, [sk]: s[sk] === mode ? undefined : mode }));

  const add = () => {
    if (!form.name) return;
    setInterns(is => [...is, { ...form, id: Date.now(), skills, hoursLogged: 0, checkIns: [] }]);
    setForm({ name: "", start: "", goal: "", contact: "" });
    setSkills({});
    setAdding(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle>Interns</SectionTitle>
        <button onClick={() => setAdding(a => !a)}
          style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          + Add Intern
        </button>
      </div>

      {adding && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[["name","Full Name"],["start","Start Date (YYYY-MM-DD)"],["goal","Learning Goal"],["contact","Contact Info"]].map(([k,ph]) => (
              <input key={k} placeholder={ph} value={form[k]}
                onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}/>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 8 }}>Skills Checklist</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 6 }}>
              {SKILLS_LIST.map(sk => (
                <div key={sk} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 12, flex: 1, color: "#475569" }}>{sk}</span>
                  <button onClick={() => toggleSkill(sk, "have")}
                    style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, border: "none", cursor: "pointer",
                      background: skills[sk] === "have" ? GREEN : "#e2e8f0", color: skills[sk] === "have" ? "#fff" : "#475569" }}>Have</button>
                  <button onClick={() => toggleSkill(sk, "want")}
                    style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, border: "none", cursor: "pointer",
                      background: skills[sk] === "want" ? GOLD : "#e2e8f0", color: skills[sk] === "want" ? "#fff" : "#475569" }}>Learn</button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={add} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 8, padding: "9px 24px", fontWeight: 700, cursor: "pointer" }}>Save Intern</button>
        </Card>
      )}

      {interns.length === 0 && !adding && <p style={{ color: "#94a3b8" }}>No interns yet. Add the first one above.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {interns.map(i => (
          <Card key={i.id} style={{ borderTop: `3px solid ${NAVY}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{i.name}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", margin: "3px 0" }}>Started: {i.start || "TBD"}</div>
            {i.goal && <div style={{ fontSize: 13, color: "#475569", margin: "4px 0 6px" }}>Goal: {i.goal}</div>}
            <div style={{ fontSize: 12, color: "#64748b" }}>Hours logged: {i.hoursLogged}</div>
            {Object.keys(i.skills || {}).filter(k => i.skills[k]).length > 0 && (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {Object.entries(i.skills || {}).filter(([,val]) => val).map(([sk, val]) =>
                  badge(sk, val === "have" ? "#d1fae5" : "#fef3c7", val === "have" ? "#065f46" : "#92400e")
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── TIMELINE ──────────────────────────────────────────────────────────────────
function Timeline() {
  return (
    <div>
      <SectionTitle>30-Day Implementation Timeline</SectionTitle>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "#e2e8f0" }}/>
        {TIMELINE_ITEMS.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 18, position: "relative" }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: NAVY, border: `3px solid ${GREEN}`,
              flexShrink: 0, marginTop: 3, position: "relative", zIndex: 1 }}/>
            <Card style={{ flex: 1, padding: "12px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 2 }}>{item.day}</div>
                  <div style={{ fontSize: 14, color: "#1e293b", fontWeight: 500 }}>{item.task}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{item.who}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{item.property}</div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SHELL / NAV ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "tasks",     label: "Tasks",     icon: "✓" },
  { id: "requests",  label: "Requests",  icon: "↗" },
  { id: "vendors",   label: "Vendors",   icon: "🔧" },
  { id: "volunteers",label: "Volunteers",icon: "🤝" },
  { id: "interns",   label: "Interns",   icon: "🎓" },
  { id: "timeline",  label: "Timeline",  icon: "📅" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks]         = useState(INITIAL_TASKS);
  const [vendors, setVendors]     = useState(INITIAL_VENDORS);
  const [volunteers, setVolunteers] = useState([]);
  const [interns, setInterns]     = useState([]);
  const [requests, setRequests]   = useState([]);

  const pages = { dashboard: <Dashboard tasks={tasks} vendors={vendors} volunteers={volunteers} interns={interns} requests={requests}/>,
    tasks: <Tasks tasks={tasks} setTasks={setTasks}/>,
    requests: <Requests requests={requests} setRequests={setRequests}/>,
    vendors: <Vendors vendors={vendors} setVendors={setVendors}/>,
    volunteers: <Volunteers volunteers={volunteers} setVolunteers={setVolunteers}/>,
    interns: <Interns interns={interns} setInterns={setInterns}/>,
    timeline: <Timeline/>,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: CREAM }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: NAVY, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo area */}
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Logo size={40}/>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>MISSIO CO.</div>
              <div style={{ color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>Property Management App</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 20px",
                border: "none", background: page === item.id ? "rgba(255,255,255,0.12)" : "transparent",
                color: page === item.id ? "#fff" : "rgba(255,255,255,0.6)",
                cursor: "pointer", fontSize: 14, fontWeight: page === item.id ? 700 : 400,
                borderLeft: page === item.id ? `3px solid ${GOLD}` : "3px solid transparent",
                textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
          Daniel · Jennifer · Leadership
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", maxWidth: 960 }}>
        {pages[page]}
      </main>
    </div>
  );
}

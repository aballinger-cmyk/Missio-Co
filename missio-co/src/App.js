import { useState, useRef } from "react";

const NAVY = "#1a2744";
const GREEN = "#2d5a1b";
const GOLD = "#c9a84c";

const DEFAULT_CHARACTERISTICS = ["House","Barn","Yard","Agriculture","Ranch","Orchard","Spa","Guest House","Workshop"];
const DEFAULT_SKILLS = ["Landscaping","Irrigation","Tree Care","Fence Repair","General Labor","Driving / Hauling","Cleaning / Housekeeping","Event Setup","Animal Care","Painting","Basic Carpentry","Pressure Washing","Equipment Operation","Kitchen / Cooking"];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);

// ── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" fill="#fff" stroke={GOLD} strokeWidth="4"/>
      <path d="M60 4 A56 56 0 0 0 60 116 Z" fill={NAVY}/>
      <path d="M60 4 A56 56 0 0 1 60 116 Z" fill={GREEN}/>
      {/* House outline (left/navy side) */}
      <polyline points="22,72 22,55 34,44 46,55 46,72" stroke="#fff" strokeWidth="1.8" fill="none"/>
      <line x1="26" y1="72" x2="26" y2="63" stroke="#fff" strokeWidth="1.4"/>
      <line x1="30" y1="63" x2="30" y2="72" stroke="#fff" strokeWidth="1.4"/>
      <rect x="36" y="60" width="7" height="9" stroke="#fff" strokeWidth="1.4" fill="none"/>
      {/* Barn (right/green side) */}
      <polyline points="68,72 68,54 75,48 82,54 82,72" stroke="#fff" strokeWidth="1.8" fill="none"/>
      <path d="M68,54 Q75,46 82,54" stroke="#fff" strokeWidth="1.4" fill="none"/>
      <line x1="75" y1="48" x2="75" y2="72" stroke="#fff" strokeWidth="1.2"/>
      {/* Silo */}
      <rect x="84" y="58" width="6" height="14" stroke="#fff" strokeWidth="1.4" fill="none"/>
      <ellipse cx="87" cy="58" rx="3" ry="2" stroke="#fff" strokeWidth="1.2" fill="none"/>
      {/* Windmill */}
      <line x1="96" y1="72" x2="96" y2="56" stroke="#fff" strokeWidth="1.4"/>
      <line x1="96" y1="60" x2="92" y2="56" stroke="#fff" strokeWidth="1.2"/>
      <line x1="96" y1="60" x2="100" y2="56" stroke="#fff" strokeWidth="1.2"/>
      <line x1="96" y1="60" x2="96" y2="55" stroke="#fff" strokeWidth="1.2"/>
      <line x1="96" y1="60" x2="96" y2="65" stroke="#fff" strokeWidth="1.2"/>
      {/* Trees */}
      <polygon points="50,72 54,60 58,72" stroke="#fff" strokeWidth="1.2" fill="none"/>
      <line x1="54" y1="72" x2="54" y2="68" stroke="#fff" strokeWidth="1.2"/>
      <polygon points="61,72 64,63 67,72" stroke="#fff" strokeWidth="1.2" fill="none"/>
      <line x1="64" y1="72" x2="64" y2="69" stroke="#fff" strokeWidth="1.2"/>
      {/* Fence */}
      <line x1="18" y1="76" x2="102" y2="76" stroke="#fff" strokeWidth="1.2"/>
      <line x1="22" y1="73" x2="22" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="30" y1="73" x2="30" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="38" y1="73" x2="38" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="46" y1="73" x2="46" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="54" y1="73" x2="54" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="62" y1="73" x2="62" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="70" y1="73" x2="70" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="78" y1="73" x2="78" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="86" y1="73" x2="86" y2="79" stroke="#fff" strokeWidth="1.2"/>
      <line x1="94" y1="73" x2="94" y2="79" stroke="#fff" strokeWidth="1.2"/>
      {/* Tablet */}
      <rect x="40" y="82" width="40" height="26" rx="3" fill={NAVY} stroke={GOLD} strokeWidth="2"/>
      <rect x="43" y="85" width="34" height="20" rx="2" fill="#0d1b38"/>
      {/* Network dots */}
      <circle cx="52" cy="92" r="2" fill={GOLD}/>
      <circle cx="60" cy="88" r="2" fill={GOLD}/>
      <circle cx="68" cy="92" r="2" fill={GOLD}/>
      <circle cx="55" cy="98" r="2" fill={GOLD}/>
      <circle cx="65" cy="98" r="2" fill={GOLD}/>
      <line x1="52" y1="92" x2="60" y2="88" stroke={GOLD} strokeWidth="1"/>
      <line x1="60" y1="88" x2="68" y2="92" stroke={GOLD} strokeWidth="1"/>
      <line x1="52" y1="92" x2="55" y2="98" stroke={GOLD} strokeWidth="1"/>
      <line x1="68" y1="92" x2="65" y2="98" stroke={GOLD} strokeWidth="1"/>
      <line x1="55" y1="98" x2="65" y2="98" stroke={GOLD} strokeWidth="1"/>
      {/* Crossed tools below tablet - X shape */}
      <line x1="56" y1="110" x2="64" y2="116" stroke={GOLD} strokeWidth="1.5"/>
      <line x1="64" y1="110" x2="56" y2="116" stroke={GOLD} strokeWidth="1.5"/>
    </svg>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{background:"#fff", borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", padding:"18px 22px", ...style}}>{children}</div>
}

function EmptyState({ icon="🏠", title, message, action, onAction }) {
  return (
    <div style={{textAlign:"center", padding:"60px 20px", color:"#94a3b8"}}>
      <div style={{fontSize:48, marginBottom:16}}>{icon}</div>
      <div style={{fontSize:18, fontWeight:700, color:"#475569", marginBottom:8}}>{title}</div>
      <div style={{fontSize:14, marginBottom:20}}>{message}</div>
      {action && <button onClick={onAction} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontWeight:700, cursor:"pointer"}}>{action}</button>}
    </div>
  )
}

const badge = (label, bg="#e2e8f0", color="#1a202c") => (
  <span style={{background:bg, color, borderRadius:6, padding:"2px 10px", fontSize:11, fontWeight:600, display:"inline-block"}}>{label}</span>
);

const priorityBadge = (p) => {
  const map = {Urgent:["#fee2e2","#991b1b"], High:["#fef3c7","#92400e"], Routine:["#d1fae5","#065f46"], Scheduled:["#dbeafe","#1e40af"]};
  const [bg,color] = map[p]||["#f1f5f9","#475569"];
  return badge(p, bg, color);
};

const statusBadge = (s) => {
  const map = {"Active":["#d1fae5","#065f46"], "In Progress":["#fef3c7","#92400e"], "Pending":["#f1f5f9","#475569"], "Complete":["#d1fae5","#065f46"], "Open":["#fef3c7","#92400e"], "Under Review":["#fef3c7","#92400e"], "Inactive":["#fee2e2","#991b1b"], "Not Started":["#f1f5f9","#475569"], "Cancelled":["#fee2e2","#991b1b"], "Emergency":["#fee2e2","#991b1b"]};
  const [bg,color] = map[s]||["#f1f5f9","#475569"];
  return badge(s, bg, color);
};

const inp = {display:"block", width:"100%", marginBottom:10, padding:"9px 12px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:14, boxSizing:"border-box", background:"#fff"};

function SectionTitle({children, sub}) {
  return (
    <div style={{marginBottom:20}}>
      <h2 style={{fontSize:22, fontWeight:800, color:NAVY, margin:0}}>{children}</h2>
      {sub && <div style={{fontSize:13, color:"#64748b", marginTop:4}}>{sub}</div>}
    </div>
  )
}

function SkillsChecklist({ skills, onChange, customSkills, onCustomSkillsChange }) {
  const [newSkill, setNewSkill] = useState("");
  const allSkills = [...DEFAULT_SKILLS, ...(customSkills||[])];
  const toggle = (sk, mode) => {
    const cur = skills[sk];
    onChange({...skills, [sk]: cur===mode ? undefined : mode});
  };
  const addCustom = () => {
    if (!newSkill.trim() || allSkills.includes(newSkill.trim())) return;
    onCustomSkillsChange([...(customSkills||[]), newSkill.trim()]);
    setNewSkill("");
  };
  return (
    <div>
      <div style={{fontSize:13, fontWeight:600, color:NAVY, marginBottom:8}}>Skills</div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:6, marginBottom:10}}>
        {allSkills.map(sk => (
          <div key={sk} style={{display:"flex", gap:4, alignItems:"center"}}>
            <span style={{fontSize:12, flex:1, color:"#475569"}}>{sk}</span>
            <button onClick={()=>toggle(sk,"have")} style={{fontSize:10, padding:"2px 7px", borderRadius:4, border:"none", cursor:"pointer", background:skills[sk]==="have"?GREEN:"#e2e8f0", color:skills[sk]==="have"?"#fff":"#475569"}}>Have</button>
            <button onClick={()=>toggle(sk,"want")} style={{fontSize:10, padding:"2px 7px", borderRadius:4, border:"none", cursor:"pointer", background:skills[sk]==="want"?GOLD:"#e2e8f0", color:skills[sk]==="want"?"#fff":"#475569"}}>Learn</button>
          </div>
        ))}
      </div>
      <div style={{display:"flex", gap:8}}>
        <input value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add custom skill..." style={{...inp, marginBottom:0, flex:1}} onKeyDown={e=>e.key==="Enter"&&addCustom()}/>
        <button onClick={addCustom} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"0 16px", cursor:"pointer", fontWeight:700}}>+</button>
      </div>
    </div>
  )
}

function MultiSelect({ label, options, selected, onChange }) {
  return (
    <div style={{marginBottom:10}}>
      <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>{label}</div>
      <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
        {options.map(opt => {
          const active = selected.includes(opt.id);
          return (
            <button key={opt.id} onClick={()=>onChange(active ? selected.filter(x=>x!==opt.id) : [...selected, opt.id])}
              style={{padding:"4px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                background:active?NAVY:"#f1f5f9", color:active?"#fff":"#475569"}}>
              {opt.name}
            </button>
          )
        })}
        {options.length===0 && <span style={{fontSize:12, color:"#94a3b8"}}>No options yet</span>}
      </div>
    </div>
  )
}

const DeleteBtn = ({onClick}) => (
  <button onClick={e=>{e.stopPropagation();onClick();}} style={{background:"#fee2e2", color:"#991b1b", border:"none", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, fontWeight:700}}>Delete</button>
);

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV = [
  {id:"dashboard", label:"Dashboard", icon:"⊞", group:"OVERVIEW"},
  {id:"properties", label:"Properties", icon:"🏠", group:"PROPERTIES"},
  {id:"characteristics", label:"Property Characteristics", icon:"🏷️", group:"PROPERTIES"},
  {id:"owners", label:"Property Owners", icon:"👑", level:"Level 1", group:"PEOPLE"},
  {id:"opsstaff", label:"Operations Staff", icon:"📋", level:"Level 2", group:"PEOPLE"},
  {id:"managers", label:"Estate Managers", icon:"🔑", level:"Level 3", group:"PEOPLE"},
  {id:"employees", label:"Employees", icon:"👷", level:"Level 4", group:"PEOPLE"},
  {id:"vendors", label:"Vendors", icon:"🔧", level:"Level 4", group:"PEOPLE"},
  {id:"interns", label:"Interns", icon:"🎓", level:"Level 4", group:"PEOPLE"},
  {id:"volunteers", label:"Volunteers", icon:"🤝", level:"Level 5", group:"PEOPLE"},
  {id:"tasks", label:"Tasks", icon:"✓", group:"OPERATIONS"},
  {id:"requests", label:"Requests", icon:"↗", group:"OPERATIONS"},
  {id:"checklists", label:"Checklists", icon:"☑️", group:"OPERATIONS"},
  {id:"projects", label:"Timeline / Projects", icon:"📅", group:"OPERATIONS"},
];

const navBtn = (active) => ({
  display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 16px",
  border:"none", background: active ? "rgba(201,168,76,0.15)" : "transparent",
  color: active ? "#fff" : "rgba(255,255,255,0.6)",
  cursor:"pointer", fontSize:13, fontWeight: active ? 700 : 400, textAlign:"left",
  borderLeft: active ? `3px solid ${GOLD}` : "3px solid transparent",
  boxSizing:"border-box",
});

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [propView, setPropView] = useState(null);

  const [characteristics, setCharacteristics] = useState(DEFAULT_CHARACTERISTICS);
  const [customSkills, setCustomSkills] = useState([]);

  const [owners, setOwners] = useState([]);
  const [opsStaff, setOpsStaff] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [interns, setInterns] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [properties, setProperties] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = (p) => { setPage(p); setPropView(null); };

  const allPeople = [
    ...owners.map(p=>({...p, role:"Owner"})),
    ...opsStaff.map(p=>({...p, role:"Ops Staff"})),
    ...managers.map(p=>({...p, role:"Manager"})),
    ...employees.map(p=>({...p, role:"Employee"})),
    ...vendors.map(p=>({...p, role:"Vendor"})),
    ...interns.map(p=>({...p, role:"Intern"})),
    ...volunteers.map(p=>({...p, role:"Volunteer"})),
  ];

  // ── render pages ─────────────────────────────────────────────────────────
  let content;
  if (page==="dashboard") {
    content = <DashboardPage properties={properties} tasks={tasks} requests={requests} projects={projects} managers={managers} navigate={navigate}/>;
  } else if (page==="properties") {
    content = <PropertiesPage properties={properties} setProperties={setProperties} characteristics={characteristics} managers={managers} opsStaff={opsStaff} employees={employees} vendors={vendors} interns={interns} volunteers={volunteers} tasks={tasks} requests={requests} projects={projects} propView={propView} setPropView={setPropView}/>;
  } else if (page==="characteristics") {
    content = <CharacteristicsPage characteristics={characteristics} setCharacteristics={setCharacteristics}/>;
  } else if (page==="owners") {
    content = <OwnersPage owners={owners} setOwners={setOwners}/>;
  } else if (page==="opsstaff") {
    content = <OpsStaffPage opsStaff={opsStaff} setOpsStaff={setOpsStaff} properties={properties}/>;
  } else if (page==="managers") {
    content = <ManagersPage managers={managers} setManagers={setManagers} properties={properties}/>;
  } else if (page==="employees") {
    content = <EmployeesPage employees={employees} setEmployees={setEmployees} properties={properties} managers={managers} customSkills={customSkills} setCustomSkills={setCustomSkills}/>;
  } else if (page==="vendors") {
    content = <VendorsPage vendors={vendors} setVendors={setVendors} properties={properties} customSkills={customSkills} setCustomSkills={setCustomSkills}/>;
  } else if (page==="interns") {
    content = <InternsPage interns={interns} setInterns={setInterns} properties={properties} managers={managers} customSkills={customSkills} setCustomSkills={setCustomSkills}/>;
  } else if (page==="volunteers") {
    content = <VolunteersPage volunteers={volunteers} setVolunteers={setVolunteers} properties={properties} customSkills={customSkills} setCustomSkills={setCustomSkills}/>;
  } else if (page==="tasks") {
    content = <TasksPage tasks={tasks} setTasks={setTasks} properties={properties}/>;
  } else if (page==="requests") {
    content = <RequestsPage requests={requests} setRequests={setRequests} properties={properties} projects={projects}/>;
  } else if (page==="checklists") {
    content = <ChecklistsPage checklists={checklists} setChecklists={setChecklists} allPeople={allPeople} tasks={tasks} setTasks={setTasks}/>;
  } else if (page==="projects") {
    content = <ProjectsPage projects={projects} setProjects={setProjects} properties={properties} allPeople={allPeople}/>;
  }

  const groups = ["OVERVIEW","PROPERTIES","PEOPLE","OPERATIONS"];

  return (
    <div style={{display:"flex", height:"100vh", fontFamily:"system-ui, -apple-system, sans-serif", background:"#f8f6f0"}}>
      <aside style={{width:240, background:NAVY, display:"flex", flexDirection:"column", flexShrink:0, overflowY:"auto"}}>
        <div style={{padding:"24px 20px 16px", borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{display:"flex", justifyContent:"center", marginBottom:12}}>
            <Logo size={64}/>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{color:"#fff", fontWeight:900, fontSize:18, letterSpacing:2}}>PROPERTYHUB</div>
            <div style={{color:GREEN, fontSize:11, fontWeight:600, marginTop:2}}>Powered by Missio Co.</div>
            <div style={{color:GOLD, fontSize:10, marginTop:2, lineHeight:1.4}}>One App. Multiple Properties.<br/>Consistent Care.</div>
            <div style={{margin:"8px auto 0", width:40, height:2, background:GREEN, borderRadius:2}}/>
          </div>
        </div>
        <nav style={{padding:"12px 0", flex:1}}>
          {groups.map(g => (
            <div key={g}>
              <div style={{padding:"12px 16px 4px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)", letterSpacing:1}}>{g}</div>
              {NAV.filter(n=>n.group===g).map(n => (
                <button key={n.id} style={navBtn(page===n.id)} onClick={()=>navigate(n.id)}>
                  <span>{n.icon}</span>
                  <span style={{flex:1}}>{n.label}</span>
                  {n.level && <span style={{fontSize:9, background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)", borderRadius:4, padding:"1px 5px"}}>{n.level}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div style={{padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.1)", fontSize:10, color:"rgba(255,255,255,0.3)"}}>
          PROPERTYHUB · Missio Co.
        </div>
      </aside>
      <main style={{flex:1, padding:"32px 36px", overflowY:"auto", background:"#f8f6f0"}}>
        {content}
      </main>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardPage({ properties, tasks, requests, projects, managers, navigate }) {
  if (properties.length === 0) {
    return <EmptyState icon="🏠" title="Welcome to PROPERTYHUB" message="Start by adding your first property. Everything else — tasks, people, requests, and projects — connects from there." action="Add First Property" onAction={()=>navigate("properties")}/>;
  }

  const activeTasks = tasks.filter(t=>t.status!=="Complete").length;
  const openRequests = requests.filter(r=>r.status==="Open").length;
  const inProgressProjects = projects.filter(p=>p.status==="In Progress").length;
  const today = new Date().toISOString().split("T")[0];
  const overdueProjects = projects.filter(p=>p.dueDate && p.dueDate < today && p.status!=="Complete");
  const checklistCompletions = 0; // placeholder

  const allNotes = projects.flatMap(p=>(p.notes||[]).map(n=>({...n, projectName:p.name}))).sort((a,b)=>b.timestamp>a.timestamp?1:-1).slice(0,5);

  const urgentRequests = requests.filter(r=>r.urgency==="Emergency"||r.urgency==="Urgent");

  return (
    <div>
      <SectionTitle sub="Live overview of all properties and operations">Dashboard</SectionTitle>
      {/* Stats row */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14, marginBottom:28}}>
        {[
          {label:"Properties", value:properties.length, color:NAVY},
          {label:"Active Tasks", value:activeTasks, color:GREEN},
          {label:"Open Requests", value:openRequests, color:"#92400e"},
          {label:"Projects in Progress", value:inProgressProjects, color:NAVY},
          {label:"Overdue Projects", value:overdueProjects.length, color:"#991b1b"},
          {label:"Checklist Completions Today", value:checklistCompletions, color:GREEN},
        ].map(s=>(
          <Card key={s.label} style={{padding:"14px 18px"}}>
            <div style={{fontSize:28, fontWeight:900, color:s.color}}>{s.value}</div>
            <div style={{fontSize:12, color:"#64748b", marginTop:2}}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Property Quick View */}
      <div style={{marginBottom:28}}>
        <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:14}}>Properties at a Glance</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14}}>
          {properties.map(p=>{
            const mgr = managers.find(m=>p.assignedManagers&&p.assignedManagers.includes(m.id));
            const openTasks = tasks.filter(t=>t.propertyId===p.id&&t.status!=="Complete").length;
            const urgReqs = requests.filter(r=>r.propertyId===p.id&&(r.urgency==="Emergency"||r.urgency==="Urgent")).length;
            const nextProj = projects.filter(pr=>pr.propertyIds&&pr.propertyIds.includes(p.id)&&pr.dueDate&&pr.status!=="Complete").sort((a,b)=>a.dueDate>b.dueDate?1:-1)[0];
            return (
              <Card key={p.id} style={{borderLeft:`4px solid ${GOLD}`}}>
                <div style={{fontWeight:700, color:NAVY, fontSize:15, marginBottom:4}}>{p.name}</div>
                <div style={{fontSize:12, color:"#64748b", marginBottom:8}}>{p.address||"No address"}</div>
                <div style={{fontSize:12, color:"#475569"}}>Manager: <b>{mgr?mgr.name:"Unassigned"}</b></div>
                <div style={{fontSize:12, color:"#475569"}}>Open Tasks: <b>{openTasks}</b></div>
                {urgReqs>0 && <div style={{fontSize:12, color:"#991b1b"}}>⚠ Urgent Requests: <b>{urgReqs}</b></div>}
                {nextProj && <div style={{fontSize:12, color:GREEN}}>Next Project Due: <b>{nextProj.dueDate}</b></div>}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Overdue Projects */}
      {overdueProjects.length>0 && (
        <div style={{marginBottom:28}}>
          <h3 style={{fontSize:16, fontWeight:700, color:"#991b1b", marginBottom:14}}>⚠ Overdue Projects</h3>
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {overdueProjects.map(p=>(
              <Card key={p.id} style={{borderLeft:"4px solid #991b1b"}}>
                <div style={{fontWeight:700, color:"#991b1b"}}>{p.name}</div>
                <div style={{fontSize:12, color:"#64748b"}}>Due: {p.dueDate} · {statusBadge(p.status)}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Urgent Requests */}
      {urgentRequests.length>0 && (
        <div style={{marginBottom:28}}>
          <h3 style={{fontSize:16, fontWeight:700, color:"#92400e", marginBottom:14}}>🚨 Urgent / Emergency Requests</h3>
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {urgentRequests.map(r=>(
              <Card key={r.id} style={{borderLeft:"4px solid #991b1b"}}>
                <div style={{fontWeight:700, color:"#991b1b"}}>{r.title}</div>
                <div style={{fontSize:12, color:"#64748b", marginTop:4}}>{r.reason}</div>
                <div style={{marginTop:6, display:"flex", gap:6}}>{statusBadge(r.urgency)}{statusBadge(r.status)}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Notes */}
      {allNotes.length>0 && (
        <div>
          <h3 style={{fontSize:16, fontWeight:700, color:NAVY, marginBottom:14}}>Recent Project Notes</h3>
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {allNotes.map(n=>(
              <Card key={n.id} style={{padding:"12px 18px"}}>
                <div style={{fontSize:12, fontWeight:700, color:NAVY}}>{n.projectName}</div>
                <div style={{fontSize:13, color:"#475569", marginTop:4}}>{n.text}</div>
                <div style={{fontSize:11, color:"#94a3b8", marginTop:4}}>{n.timestamp}</div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── PROPERTIES PAGE ───────────────────────────────────────────────────────────
function PropertiesPage({ properties, setProperties, characteristics, managers, opsStaff, employees, vendors, interns, volunteers, tasks, requests, projects, propView, setPropView }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", address:"", characteristics:[], assignedManagers:[], assignedOpsStaff:[]});

  const add = () => {
    if (!form.name.trim()) return;
    setProperties([...properties, {...form, id:uid(), createdAt:new Date().toISOString()}]);
    setForm({name:"", address:"", characteristics:[], assignedManagers:[], assignedOpsStaff:[]});
    setShowForm(false);
  };

  if (propView) {
    const prop = properties.find(p=>p.id===propView);
    if (!prop) { setPropView(null); return null; }
    const assignedMgrs = managers.filter(m=>prop.assignedManagers&&prop.assignedManagers.includes(m.id));
    const assignedOps = opsStaff.filter(m=>prop.assignedOpsStaff&&prop.assignedOpsStaff.includes(m.id));
    const assignedEmps = employees.filter(e=>e.assignedProperties&&e.assignedProperties.includes(prop.id));
    const assignedVens = vendors.filter(v=>v.assignedProperties&&v.assignedProperties.includes(prop.id));
    const assignedInts = interns.filter(i=>i.assignedProperties&&i.assignedProperties.includes(prop.id));
    const assignedVols = volunteers.filter(v=>v.assignedProperties&&v.assignedProperties.includes(prop.id));
    const propTasks = tasks.filter(t=>t.propertyId===prop.id);
    const propRequests = requests.filter(r=>r.propertyId===prop.id);
    const propProjects = projects.filter(p=>p.propertyIds&&p.propertyIds.includes(prop.id));

    return (
      <div>
        <button onClick={()=>setPropView(null)} style={{background:"none", border:"none", color:NAVY, fontWeight:700, cursor:"pointer", fontSize:14, marginBottom:16, padding:0}}>← Back to Properties</button>
        <SectionTitle sub={prop.address}>{prop.name}</SectionTitle>
        {prop.characteristics&&prop.characteristics.length>0 && (
          <div style={{display:"flex", flexWrap:"wrap", gap:6, marginBottom:20}}>
            {prop.characteristics.map(c=><span key={c} style={{background:"#e2e8f0", borderRadius:20, padding:"3px 12px", fontSize:12, fontWeight:600, color:"#475569"}}>{c}</span>)}
          </div>
        )}

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24}}>
          <Card>
            <h3 style={{fontWeight:700, color:NAVY, marginTop:0, marginBottom:10, fontSize:14}}>Assigned People</h3>
            {assignedOps.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Ops Staff:</b> {assignedOps.map(p=>p.name).join(", ")}</div>}
            {assignedMgrs.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Managers:</b> {assignedMgrs.map(p=>p.name).join(", ")}</div>}
            {assignedEmps.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Employees:</b> {assignedEmps.map(p=>p.name).join(", ")}</div>}
            {assignedVens.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Vendors:</b> {assignedVens.map(p=>p.name).join(", ")}</div>}
            {assignedInts.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Interns:</b> {assignedInts.map(p=>p.name).join(", ")}</div>}
            {assignedVols.length>0&&<div style={{marginBottom:6}}><b style={{fontSize:12}}>Volunteers:</b> {assignedVols.map(p=>p.name).join(", ")}</div>}
            {[...assignedMgrs,...assignedOps,...assignedEmps,...assignedVens,...assignedInts,...assignedVols].length===0&&<div style={{fontSize:12, color:"#94a3b8"}}>No people assigned yet.</div>}
          </Card>
          <Card>
            <h3 style={{fontWeight:700, color:NAVY, marginTop:0, marginBottom:10, fontSize:14}}>Active Tasks ({propTasks.filter(t=>t.status!=="Complete").length})</h3>
            {propTasks.length===0?<div style={{fontSize:12,color:"#94a3b8"}}>No tasks.</div>:propTasks.slice(0,5).map(t=>(
              <div key={t.id} style={{fontSize:12, padding:"4px 0", borderBottom:"1px solid #f1f5f9"}}>
                <span style={{fontWeight:600}}>{t.title}</span> {priorityBadge(t.priority)} {statusBadge(t.status)}
              </div>
            ))}
          </Card>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
          <Card>
            <h3 style={{fontWeight:700, color:NAVY, marginTop:0, marginBottom:10, fontSize:14}}>Open Requests ({propRequests.filter(r=>r.status==="Open").length})</h3>
            {propRequests.length===0?<div style={{fontSize:12,color:"#94a3b8"}}>No requests.</div>:propRequests.slice(0,5).map(r=>(
              <div key={r.id} style={{fontSize:12, padding:"4px 0", borderBottom:"1px solid #f1f5f9"}}>
                <span style={{fontWeight:600}}>{r.title}</span> {statusBadge(r.urgency)} {statusBadge(r.status)}
              </div>
            ))}
          </Card>
          <Card>
            <h3 style={{fontWeight:700, color:NAVY, marginTop:0, marginBottom:10, fontSize:14}}>Active Projects ({propProjects.length})</h3>
            {propProjects.length===0?<div style={{fontSize:12,color:"#94a3b8"}}>No projects.</div>:propProjects.map(p=>{
              const lastNote = p.notes&&p.notes.length>0?p.notes[p.notes.length-1]:null;
              return (
                <div key={p.id} style={{fontSize:12, padding:"6px 0", borderBottom:"1px solid #f1f5f9"}}>
                  <div style={{fontWeight:600}}>{p.name} {statusBadge(p.status)}</div>
                  {lastNote&&<div style={{color:"#64748b", marginTop:2}}>{lastNote.text}</div>}
                </div>
              )
            })}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub={`${properties.length} propert${properties.length===1?"y":"ies"} total`}>Properties</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Property</button>
      </div>

      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add New Property</h3>
          <input style={inp} placeholder="Property Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
          <MultiSelect label="Characteristics" options={characteristics.map(c=>({id:c,name:c}))} selected={form.characteristics} onChange={v=>setForm({...form,characteristics:v})}/>
          <MultiSelect label="Assign Managers (L3)" options={managers.map(m=>({id:m.id,name:m.name}))} selected={form.assignedManagers} onChange={v=>setForm({...form,assignedManagers:v})}/>
          <MultiSelect label="Assign Ops Staff (L2)" options={opsStaff.map(m=>({id:m.id,name:m.name}))} selected={form.assignedOpsStaff} onChange={v=>setForm({...form,assignedOpsStaff:v})}/>
          <div style={{display:"flex", gap:10, marginTop:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}

      {properties.length===0 ? (
        <EmptyState icon="🏠" title="No Properties Yet" message="Add your first property to get started." action="Add Property" onAction={()=>setShowForm(true)}/>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16}}>
          {properties.map(p=>{
            const mgr = managers.find(m=>p.assignedManagers&&p.assignedManagers.includes(m.id));
            const tCount = tasks.filter(t=>t.propertyId===p.id).length;
            const rCount = requests.filter(r=>r.propertyId===p.id).length;
            return (
              <Card key={p.id} onClick={()=>setPropView(p.id)} style={{cursor:"pointer", borderLeft:`4px solid ${GOLD}`, transition:"box-shadow 0.15s"}} >
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                  <div style={{fontWeight:800, fontSize:16, color:NAVY}}>{p.name}</div>
                  <DeleteBtn onClick={()=>setProperties(properties.filter(x=>x.id!==p.id))}/>
                </div>
                {p.address&&<div style={{fontSize:12, color:"#64748b", marginTop:4}}>{p.address}</div>}
                {p.characteristics&&p.characteristics.length>0&&(
                  <div style={{display:"flex", flexWrap:"wrap", gap:4, marginTop:8}}>
                    {p.characteristics.map(c=><span key={c} style={{background:"#e2e8f0", borderRadius:20, padding:"2px 10px", fontSize:11, color:"#475569"}}>{c}</span>)}
                  </div>
                )}
                <div style={{marginTop:10, fontSize:12, color:"#475569"}}>
                  Manager: <b>{mgr?mgr.name:"Unassigned"}</b> · Tasks: <b>{tCount}</b> · Requests: <b>{rCount}</b>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── CHARACTERISTICS ───────────────────────────────────────────────────────────
function CharacteristicsPage({ characteristics, setCharacteristics }) {
  const [newChar, setNewChar] = useState("");
  const add = () => {
    if (!newChar.trim() || characteristics.includes(newChar.trim())) return;
    setCharacteristics([...characteristics, newChar.trim()]);
    setNewChar("");
  };
  return (
    <div>
      <SectionTitle sub="Customize property tags used across all properties">Property Characteristics</SectionTitle>
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:16}}>
          {characteristics.map(c=>(
            <span key={c} style={{display:"inline-flex", alignItems:"center", gap:6, background:"#f1f5f9", borderRadius:20, padding:"5px 14px", fontSize:13, fontWeight:600, color:"#475569"}}>
              {c}
              <button onClick={()=>setCharacteristics(characteristics.filter(x=>x!==c))} style={{background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:14, lineHeight:1, padding:0}}>×</button>
            </span>
          ))}
          {characteristics.length===0&&<span style={{fontSize:13, color:"#94a3b8"}}>No characteristics. Add some below.</span>}
        </div>
        <div style={{display:"flex", gap:8, marginBottom:10}}>
          <input value={newChar} onChange={e=>setNewChar(e.target.value)} placeholder="New characteristic..." style={{...inp, marginBottom:0, flex:1}} onKeyDown={e=>e.key==="Enter"&&add()}/>
          <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"0 18px", fontWeight:700, cursor:"pointer"}}>Add</button>
        </div>
        <button onClick={()=>setCharacteristics(DEFAULT_CHARACTERISTICS)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600}}>Reset to Defaults</button>
      </Card>
    </div>
  );
}

// ── OWNERS ────────────────────────────────────────────────────────────────────
function OwnersPage({ owners, setOwners }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", notes:""});
  const add = () => {
    if (!form.name.trim()) return;
    setOwners([...owners, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", notes:""});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 1 — Administrative access to all properties">Property Owners</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Owner</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Owner</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <textarea style={{...inp, resize:"vertical", minHeight:80}} placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {owners.length===0 ? <EmptyState icon="👑" title="No Owners Yet" message="Add property owners to manage access." action="Add Owner" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14}}>
          {owners.map(o=>(
            <Card key={o.id}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{o.name}</div>
                <DeleteBtn onClick={()=>setOwners(owners.filter(x=>x.id!==o.id))}/>
              </div>
              {o.email&&<div style={{fontSize:12, color:"#64748b"}}>{o.email}</div>}
              {o.phone&&<div style={{fontSize:12, color:"#64748b"}}>{o.phone}</div>}
              <div style={{marginTop:8}}>{badge("Admin Access: All Properties", "#dbeafe", "#1e40af")}</div>
              {o.notes&&<div style={{fontSize:12, color:"#94a3b8", marginTop:8}}>{o.notes}</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── OPS STAFF ─────────────────────────────────────────────────────────────────
function OpsStaffPage({ opsStaff, setOpsStaff, properties }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", roleTitle:"Operations Coordinator", allProperties:false, assignedProperties:[]});
  const add = () => {
    if (!form.name.trim()) return;
    setOpsStaff([...opsStaff, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", roleTitle:"Operations Coordinator", allProperties:false, assignedProperties:[]});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 2 — Operations coordination across properties">Operations Staff</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Staff</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Operations Staff</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <select style={inp} value={form.roleTitle} onChange={e=>setForm({...form,roleTitle:e.target.value})}>
            <option>Operations Coordinator</option>
            <option>Property Operations Director</option>
          </select>
          <label style={{display:"flex", alignItems:"center", gap:8, fontSize:13, marginBottom:10, cursor:"pointer"}}>
            <input type="checkbox" checked={form.allProperties} onChange={e=>setForm({...form,allProperties:e.target.checked})}/>
            Assign to All Properties
          </label>
          {!form.allProperties && <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>}
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {opsStaff.length===0 ? <EmptyState icon="📋" title="No Operations Staff" message="Add operations staff to coordinate property management." action="Add Staff" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14}}>
          {opsStaff.map(o=>(
            <Card key={o.id}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{o.name}</div>
                <DeleteBtn onClick={()=>setOpsStaff(opsStaff.filter(x=>x.id!==o.id))}/>
              </div>
              <div style={{marginBottom:6}}>{badge(o.roleTitle, "#dbeafe", "#1e40af")}</div>
              {o.email&&<div style={{fontSize:12, color:"#64748b"}}>{o.email}</div>}
              {o.phone&&<div style={{fontSize:12, color:"#64748b"}}>{o.phone}</div>}
              {o.allProperties ? <div style={{fontSize:12, marginTop:6, color:GREEN}}>All Properties</div> : o.assignedProperties.length>0&&<div style={{fontSize:12, marginTop:6, color:"#64748b"}}>{o.assignedProperties.length} propert{o.assignedProperties.length===1?"y":"ies"} assigned</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MANAGERS ──────────────────────────────────────────────────────────────────
function ManagersPage({ managers, setManagers, properties }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", assignedProperties:[]});
  const add = () => {
    if (!form.name.trim()) return;
    setManagers([...managers, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", assignedProperties:[]});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 3 — On-site estate management">Estate Managers</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Manager</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Estate Manager</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {managers.length===0 ? <EmptyState icon="🔑" title="No Estate Managers" message="Add estate managers to oversee individual properties." action="Add Manager" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14}}>
          {managers.map(m=>(
            <Card key={m.id}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{m.name}</div>
                <DeleteBtn onClick={()=>setManagers(managers.filter(x=>x.id!==m.id))}/>
              </div>
              {m.email&&<div style={{fontSize:12, color:"#64748b"}}>{m.email}</div>}
              {m.phone&&<div style={{fontSize:12, color:"#64748b"}}>{m.phone}</div>}
              <div style={{fontSize:12, marginTop:6, color:"#64748b"}}>{m.assignedProperties.length} propert{m.assignedProperties.length===1?"y":"ies"} assigned</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── EMPLOYEES ─────────────────────────────────────────────────────────────────
function EmployeesPage({ employees, setEmployees, properties, managers, customSkills, setCustomSkills }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", type:"Skilled Labor", assignedProperties:[], assignedManager:"", hoursLogged:0, skills:{}});
  const add = () => {
    if (!form.name.trim()) return;
    setEmployees([...employees, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", type:"Skilled Labor", assignedProperties:[], assignedManager:"", hoursLogged:0, skills:{}});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 4 — Property employees">Employees</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Employee</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Employee</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <select style={inp} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option>Skilled Labor</option>
            <option>Unskilled Labor</option>
          </select>
          <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Assigned Manager</div>
            <select style={inp} value={form.assignedManager} onChange={e=>setForm({...form,assignedManager:e.target.value})}>
              <option value="">None</option>
              {managers.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <input style={inp} type="number" placeholder="Hours Logged" value={form.hoursLogged} onChange={e=>setForm({...form,hoursLogged:parseFloat(e.target.value)||0})}/>
          <SkillsChecklist skills={form.skills} onChange={s=>setForm({...form,skills:s})} customSkills={customSkills} onCustomSkillsChange={setCustomSkills}/>
          <div style={{display:"flex", gap:10, marginTop:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {employees.length===0 ? <EmptyState icon="👷" title="No Employees" message="Add employees to assign to properties and tasks." action="Add Employee" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14}}>
          {employees.map(emp=>{
            const mgr = managers.find(m=>m.id===emp.assignedManager);
            const haveSkills = Object.entries(emp.skills||{}).filter(([,v])=>v==="have").map(([k])=>k);
            const wantSkills = Object.entries(emp.skills||{}).filter(([,v])=>v==="want").map(([k])=>k);
            return (
              <Card key={emp.id}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                  <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{emp.name}</div>
                  <DeleteBtn onClick={()=>setEmployees(employees.filter(x=>x.id!==emp.id))}/>
                </div>
                <div style={{marginBottom:6}}>{badge(emp.type, "#dbeafe", "#1e40af")}</div>
                {emp.email&&<div style={{fontSize:12, color:"#64748b"}}>{emp.email}</div>}
                {emp.phone&&<div style={{fontSize:12, color:"#64748b"}}>{emp.phone}</div>}
                {mgr&&<div style={{fontSize:12, color:"#64748b", marginTop:4}}>Manager: {mgr.name}</div>}
                <div style={{fontSize:12, color:"#64748b"}}>Hours: {emp.hoursLogged}</div>
                {haveSkills.length>0&&<div style={{marginTop:6, display:"flex", flexWrap:"wrap", gap:4}}>{haveSkills.map(s=><span key={s} style={{background:"#d1fae5", color:"#065f46", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>{s}</span>)}</div>}
                {wantSkills.length>0&&<div style={{marginTop:4, display:"flex", flexWrap:"wrap", gap:4}}>{wantSkills.map(s=><span key={s} style={{background:"#fef3c7", color:"#92400e", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>↗ {s}</span>)}</div>}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── VENDORS ───────────────────────────────────────────────────────────────────
function VendorsPage({ vendors, setVendors, properties, customSkills, setCustomSkills }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", company:"", service:"", email:"", phone:"", assignedProperties:[], status:"Active", scopeNotes:"", costNotes:"", skills:{}});
  const add = () => {
    if (!form.name.trim()) return;
    setVendors([...vendors, {...form, id:uid()}]);
    setForm({name:"", company:"", service:"", email:"", phone:"", assignedProperties:[], status:"Active", scopeNotes:"", costNotes:"", skills:{}});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 4 — External service vendors">Vendors</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Vendor</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Vendor</h3>
          <input style={inp} placeholder="Contact Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
          <input style={inp} placeholder="Service" value={form.service} onChange={e=>setForm({...form,service:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>
          <select style={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Active</option>
            <option>Under Review</option>
            <option>Inactive</option>
          </select>
          <textarea style={{...inp, resize:"vertical", minHeight:60}} placeholder="Scope Notes" value={form.scopeNotes} onChange={e=>setForm({...form,scopeNotes:e.target.value})}/>
          <textarea style={{...inp, resize:"vertical", minHeight:60}} placeholder="Cost Notes" value={form.costNotes} onChange={e=>setForm({...form,costNotes:e.target.value})}/>
          <SkillsChecklist skills={form.skills} onChange={s=>setForm({...form,skills:s})} customSkills={customSkills} onCustomSkillsChange={setCustomSkills}/>
          <div style={{display:"flex", gap:10, marginTop:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {vendors.length===0 ? <EmptyState icon="🔧" title="No Vendors" message="Add vendors to track service providers." action="Add Vendor" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14}}>
          {vendors.map(v=>{
            const haveSkills = Object.entries(v.skills||{}).filter(([,val])=>val==="have").map(([k])=>k);
            const wantSkills = Object.entries(v.skills||{}).filter(([,val])=>val==="want").map(([k])=>k);
            return (
              <Card key={v.id}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                  <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{v.name}</div>
                  <DeleteBtn onClick={()=>setVendors(vendors.filter(x=>x.id!==v.id))}/>
                </div>
                {v.company&&<div style={{fontSize:12, color:"#475569", fontWeight:600}}>{v.company}</div>}
                {v.service&&<div style={{fontSize:12, color:"#64748b"}}>{v.service}</div>}
                <div style={{marginTop:6}}>{statusBadge(v.status)}</div>
                {v.email&&<div style={{fontSize:12, color:"#64748b", marginTop:4}}>{v.email}</div>}
                {v.phone&&<div style={{fontSize:12, color:"#64748b"}}>{v.phone}</div>}
                {haveSkills.length>0&&<div style={{marginTop:6, display:"flex", flexWrap:"wrap", gap:4}}>{haveSkills.map(s=><span key={s} style={{background:"#d1fae5", color:"#065f46", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>{s}</span>)}</div>}
                {wantSkills.length>0&&<div style={{marginTop:4, display:"flex", flexWrap:"wrap", gap:4}}>{wantSkills.map(s=><span key={s} style={{background:"#fef3c7", color:"#92400e", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>↗ {s}</span>)}</div>}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── INTERNS ───────────────────────────────────────────────────────────────────
function InternsPage({ interns, setInterns, properties, managers, customSkills, setCustomSkills }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", startDate:"", learningGoal:"", assignedProperties:[], assignedManager:"", hoursLogged:0, skills:{}});
  const add = () => {
    if (!form.name.trim()) return;
    setInterns([...interns, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", startDate:"", learningGoal:"", assignedProperties:[], assignedManager:"", hoursLogged:0, skills:{}});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 4 — Interns and trainees">Interns</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Intern</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Intern</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Start Date</div>
          <input style={inp} type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
          <textarea style={{...inp, resize:"vertical", minHeight:60}} placeholder="Learning Goal" value={form.learningGoal} onChange={e=>setForm({...form,learningGoal:e.target.value})}/>
          <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Assigned Manager</div>
            <select style={inp} value={form.assignedManager} onChange={e=>setForm({...form,assignedManager:e.target.value})}>
              <option value="">None</option>
              {managers.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <input style={inp} type="number" placeholder="Hours Logged" value={form.hoursLogged} onChange={e=>setForm({...form,hoursLogged:parseFloat(e.target.value)||0})}/>
          <SkillsChecklist skills={form.skills} onChange={s=>setForm({...form,skills:s})} customSkills={customSkills} onCustomSkillsChange={setCustomSkills}/>
          <div style={{display:"flex", gap:10, marginTop:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {interns.length===0 ? <EmptyState icon="🎓" title="No Interns" message="Add interns to track learning progress." action="Add Intern" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14}}>
          {interns.map(intern=>{
            const mgr = managers.find(m=>m.id===intern.assignedManager);
            const haveSkills = Object.entries(intern.skills||{}).filter(([,v])=>v==="have").map(([k])=>k);
            const wantSkills = Object.entries(intern.skills||{}).filter(([,v])=>v==="want").map(([k])=>k);
            return (
              <Card key={intern.id}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                  <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{intern.name}</div>
                  <DeleteBtn onClick={()=>setInterns(interns.filter(x=>x.id!==intern.id))}/>
                </div>
                {intern.email&&<div style={{fontSize:12, color:"#64748b"}}>{intern.email}</div>}
                {intern.phone&&<div style={{fontSize:12, color:"#64748b"}}>{intern.phone}</div>}
                {intern.startDate&&<div style={{fontSize:12, color:"#64748b"}}>Started: {intern.startDate}</div>}
                {mgr&&<div style={{fontSize:12, color:"#64748b"}}>Manager: {mgr.name}</div>}
                <div style={{fontSize:12, color:"#64748b"}}>Hours: {intern.hoursLogged}</div>
                {intern.learningGoal&&<div style={{fontSize:12, color:"#94a3b8", marginTop:4, fontStyle:"italic"}}>{intern.learningGoal}</div>}
                {haveSkills.length>0&&<div style={{marginTop:6, display:"flex", flexWrap:"wrap", gap:4}}>{haveSkills.map(s=><span key={s} style={{background:"#d1fae5", color:"#065f46", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>{s}</span>)}</div>}
                {wantSkills.length>0&&<div style={{marginTop:4, display:"flex", flexWrap:"wrap", gap:4}}>{wantSkills.map(s=><span key={s} style={{background:"#fef3c7", color:"#92400e", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>↗ {s}</span>)}</div>}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── VOLUNTEERS ────────────────────────────────────────────────────────────────
function VolunteersPage({ volunteers, setVolunteers, properties, customSkills, setCustomSkills }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", email:"", phone:"", type:"One-Time", org:"", assignedProperties:[], hoursLogged:0, skills:{}});
  const add = () => {
    if (!form.name.trim()) return;
    setVolunteers([...volunteers, {...form, id:uid()}]);
    setForm({name:"", email:"", phone:"", type:"One-Time", org:"", assignedProperties:[], hoursLogged:0, skills:{}});
    setShowForm(false);
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Level 5 — Community volunteers">Volunteers</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Volunteer</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Volunteer</h3>
          <input style={inp} placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input style={inp} placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input style={inp} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
          <select style={inp} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option>One-Time</option>
            <option>Recurring</option>
            <option>Church Group</option>
            <option>Organization Group</option>
          </select>
          <input style={inp} placeholder="Organization (optional)" value={form.org} onChange={e=>setForm({...form,org:e.target.value})}/>
          <MultiSelect label="Assigned Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.assignedProperties} onChange={v=>setForm({...form,assignedProperties:v})}/>
          <input style={inp} type="number" placeholder="Hours Logged" value={form.hoursLogged} onChange={e=>setForm({...form,hoursLogged:parseFloat(e.target.value)||0})}/>
          <SkillsChecklist skills={form.skills} onChange={s=>setForm({...form,skills:s})} customSkills={customSkills} onCustomSkillsChange={setCustomSkills}/>
          <div style={{display:"flex", gap:10, marginTop:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {volunteers.length===0 ? <EmptyState icon="🤝" title="No Volunteers" message="Add volunteers to coordinate community involvement." action="Add Volunteer" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14}}>
          {volunteers.map(vol=>{
            const haveSkills = Object.entries(vol.skills||{}).filter(([,v])=>v==="have").map(([k])=>k);
            const wantSkills = Object.entries(vol.skills||{}).filter(([,v])=>v==="want").map(([k])=>k);
            return (
              <Card key={vol.id}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                  <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{vol.name}</div>
                  <DeleteBtn onClick={()=>setVolunteers(volunteers.filter(x=>x.id!==vol.id))}/>
                </div>
                {badge(vol.type)}
                {vol.org&&<div style={{fontSize:12, color:"#64748b", marginTop:4}}>{vol.org}</div>}
                {vol.email&&<div style={{fontSize:12, color:"#64748b"}}>{vol.email}</div>}
                {vol.phone&&<div style={{fontSize:12, color:"#64748b"}}>{vol.phone}</div>}
                <div style={{fontSize:12, color:"#64748b"}}>Hours: {vol.hoursLogged}</div>
                {haveSkills.length>0&&<div style={{marginTop:6, display:"flex", flexWrap:"wrap", gap:4}}>{haveSkills.map(s=><span key={s} style={{background:"#d1fae5", color:"#065f46", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>{s}</span>)}</div>}
                {wantSkills.length>0&&<div style={{marginTop:4, display:"flex", flexWrap:"wrap", gap:4}}>{wantSkills.map(s=><span key={s} style={{background:"#fef3c7", color:"#92400e", borderRadius:4, padding:"1px 7px", fontSize:10, fontWeight:600}}>↗ {s}</span>)}</div>}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────────
function TasksPage({ tasks, setTasks, properties }) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({title:"", propertyId:"", assignedTo:"", frequency:"Weekly", priority:"Routine", status:"Pending"});
  const FREQS = ["All","Daily","Weekly","Monthly","Quarterly","Annual"];
  const add = () => {
    if (!form.title.trim()) return;
    setTasks([...tasks, {...form, id:uid()}]);
    setForm({title:"", propertyId:"", assignedTo:"", frequency:"Weekly", priority:"Routine", status:"Pending"});
    setShowForm(false);
  };
  const toggle = (id) => setTasks(tasks.map(t=>t.id===id?{...t, status:t.status==="Complete"?"Pending":"Complete"}:t));
  const filtered = filter==="All" ? tasks : tasks.filter(t=>t.frequency===filter);
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub={`${tasks.length} total tasks`}>Tasks</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Task</button>
      </div>
      <div style={{display:"flex", gap:8, marginBottom:20, flexWrap:"wrap"}}>
        {FREQS.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 16px", borderRadius:20, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, background:filter===f?NAVY:"#e2e8f0", color:filter===f?"#fff":"#475569"}}>{f}</button>
        ))}
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>Add Task</h3>
          <input style={inp} placeholder="Task Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
          <select style={inp} value={form.propertyId} onChange={e=>setForm({...form,propertyId:e.target.value})}>
            <option value="">No Property</option>
            {properties.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input style={inp} placeholder="Assigned To" value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})}/>
          <select style={inp} value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})}>
            <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Annual</option>
          </select>
          <select style={inp} value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
            <option>Urgent</option><option>High</option><option>Routine</option><option>Scheduled</option>
          </select>
          <select style={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Pending</option><option>In Progress</option><option>Complete</option>
          </select>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {filtered.length===0 ? <EmptyState icon="✓" title="No Tasks" message="Add tasks to track recurring and one-time work." action="Add Task" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {filtered.map(t=>{
            const prop = properties.find(p=>p.id===t.propertyId);
            return (
              <Card key={t.id} style={{borderLeft:`4px solid ${t.status==="Complete"?GREEN:t.priority==="Urgent"?"#991b1b":GOLD}`}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{display:"flex", alignItems:"center", gap:10, flex:1}}>
                    <input type="checkbox" checked={t.status==="Complete"} onChange={()=>toggle(t.id)} style={{width:16, height:16, cursor:"pointer"}}/>
                    <div>
                      <div style={{fontWeight:700, color:NAVY, textDecoration:t.status==="Complete"?"line-through":"none"}}>{t.title}</div>
                      <div style={{fontSize:12, color:"#64748b", marginTop:2}}>
                        {prop?prop.name:"No property"} · {t.frequency} · {t.assignedTo||"Unassigned"}
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex", gap:6, alignItems:"center"}}>
                    {priorityBadge(t.priority)}
                    {statusBadge(t.status)}
                    <DeleteBtn onClick={()=>setTasks(tasks.filter(x=>x.id!==t.id))}/>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── REQUESTS ──────────────────────────────────────────────────────────────────
function RequestsPage({ requests, setRequests, properties, projects }) {
  const [tab, setTab] = useState("triage");
  const [form, setForm] = useState({title:"", submitter:"", submitterRole:"Staff", propertyId:"", urgency:"Routine", reason:"", eventLinked:false, eventDate:"", projectId:"", status:"Open"});
  const URGENCY_ORDER = {Emergency:0, Urgent:1, Routine:2, Scheduled:3};
  const sorted = [...requests].sort((a,b)=>(URGENCY_ORDER[a.urgency]||3)-(URGENCY_ORDER[b.urgency]||3));
  const add = () => {
    if (!form.title.trim()||!form.reason.trim()) return;
    setRequests([...requests, {...form, id:uid()}]);
    setForm({title:"", submitter:"", submitterRole:"Staff", propertyId:"", urgency:"Routine", reason:"", eventLinked:false, eventDate:"", projectId:"", status:"Open"});
    setTab("triage");
  };
  return (
    <div>
      <SectionTitle sub="Manage and triage incoming property requests">Requests</SectionTitle>
      <div style={{display:"flex", gap:8, marginBottom:20}}>
        <button onClick={()=>setTab("triage")} style={{padding:"8px 20px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:700, background:tab==="triage"?NAVY:"#e2e8f0", color:tab==="triage"?"#fff":"#475569"}}>Triage Board</button>
        <button onClick={()=>setTab("new")} style={{padding:"8px 20px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:700, background:tab==="new"?NAVY:"#e2e8f0", color:tab==="new"?"#fff":"#475569"}}>+ New Request</button>
      </div>
      {tab==="triage" && (
        sorted.length===0 ? <EmptyState icon="↗" title="No Requests" message="Submit a new request using the button above." action="New Request" onAction={()=>setTab("new")}/> : (
          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            {sorted.map(r=>{
              const prop = properties.find(p=>p.id===r.propertyId);
              return (
                <Card key={r.id} style={{borderLeft:`4px solid ${r.urgency==="Emergency"?"#991b1b":r.urgency==="Urgent"?"#d97706":NAVY}`}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800, fontSize:15, color:NAVY, marginBottom:4}}>{r.title}</div>
                      <div style={{fontSize:12, color:"#64748b", marginBottom:8}}>{r.submitter||"Anonymous"} · {r.submitterRole} · {prop?prop.name:"No property"}</div>
                      <p style={{fontSize:13, color:"#475569", margin:"0 0 8px"}}>{r.reason}</p>
                      <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                        {statusBadge(r.urgency)}
                        {statusBadge(r.status)}
                        {r.eventLinked&&badge("Event Linked", "#ede9fe", "#5b21b6")}
                      </div>
                    </div>
                    <DeleteBtn onClick={()=>setRequests(requests.filter(x=>x.id!==r.id))}/>
                  </div>
                </Card>
              )
            })}
          </div>
        )
      )}
      {tab==="new" && (
        <Card style={{borderLeft:`4px solid ${GOLD}`, maxWidth:600}}>
          <h3 style={{marginTop:0, color:NAVY}}>Submit New Request</h3>
          <input style={inp} placeholder="Request Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
          <input style={inp} placeholder="Submitter Name" value={form.submitter} onChange={e=>setForm({...form,submitter:e.target.value})}/>
          <select style={inp} value={form.submitterRole} onChange={e=>setForm({...form,submitterRole:e.target.value})}>
            {["Leadership","Operations Coordinator","Property Operations Director","Estate Manager","Employee","Vendor","Intern","Volunteer","Staff"].map(r=><option key={r}>{r}</option>)}
          </select>
          <select style={inp} value={form.propertyId} onChange={e=>setForm({...form,propertyId:e.target.value})}>
            <option value="">No Property</option>
            {properties.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select style={inp} value={form.urgency} onChange={e=>setForm({...form,urgency:e.target.value})}>
            <option>Emergency</option><option>Urgent</option><option>Routine</option><option>Scheduled</option>
          </select>
          <textarea style={{...inp, resize:"vertical", minHeight:80}} placeholder="Reason / Details *" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/>
          <label style={{display:"flex", alignItems:"center", gap:8, fontSize:13, marginBottom:10, cursor:"pointer"}}>
            <input type="checkbox" checked={form.eventLinked} onChange={e=>setForm({...form,eventLinked:e.target.checked})}/>
            Linked to Event
          </label>
          {form.eventLinked && <input style={inp} type="date" value={form.eventDate} onChange={e=>setForm({...form,eventDate:e.target.value})}/>}
          <select style={inp} value={form.projectId} onChange={e=>setForm({...form,projectId:e.target.value})}>
            <option value="">No Project</option>
            {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select style={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Open</option><option>In Progress</option><option>Under Review</option><option>Complete</option><option>Cancelled</option>
          </select>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Submit</button>
            <button onClick={()=>setTab("triage")} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ── CHECKLISTS ────────────────────────────────────────────────────────────────
function ChecklistsPage({ checklists, setChecklists, allPeople, tasks, setTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"", type:"Onboarding", frequency:"Weekly", assignedTo:[], items:[]});
  const [newItem, setNewItem] = useState("");
  const [csvPreview, setCsvPreview] = useState(null);
  const [csvRows, setCsvRows] = useState([]);
  const fileRef = useRef(null);

  const addItem = () => {
    if (!newItem.trim()) return;
    setForm({...form, items:[...form.items, {id:uid(), text:newItem.trim(), complete:false}]});
    setNewItem("");
  };
  const add = () => {
    if (!form.name.trim()) return;
    setChecklists([...checklists, {...form, id:uid()}]);
    setForm({name:"", type:"Onboarding", frequency:"Weekly", assignedTo:[], items:[]});
    setShowForm(false);
  };
  const toggleItem = (clId, itemId) => {
    setChecklists(checklists.map(cl=>cl.id===clId?{...cl, items:cl.items.map(it=>it.id===itemId?{...it, complete:!it.complete}:it)}:cl));
  };

  const downloadTemplate = () => {
    const csv = "Task Name,Frequency,Priority,Assigned To,Notes\nWalk driveways - remove debris,Weekly,High,,Log time to build system\n";
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "task_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      const lines = text.split("\n").filter(l=>l.trim());
      if (lines.length < 2) return;
      const rows = lines.slice(1).map(line=>{
        const cols = line.split(",");
        return {title:cols[0]||"", frequency:cols[1]||"Weekly", priority:cols[2]||"Routine", assignedTo:cols[3]||"", notes:cols[4]||""};
      }).filter(r=>r.title.trim());
      setCsvRows(rows);
      setCsvPreview(true);
    };
    reader.readAsText(file);
  };

  const importTasks = () => {
    const newTasks = csvRows.map(r=>({id:uid(), title:r.title, propertyId:"", assignedTo:r.assignedTo, frequency:r.frequency||"Weekly", priority:r.priority||"Routine", status:"Pending"}));
    setTasks([...tasks, ...newTasks]);
    setCsvPreview(false);
    setCsvRows([]);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Onboarding and recurring task checklists">Checklists</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ New Checklist</button>
      </div>

      {/* CSV Section */}
      <Card style={{marginBottom:20}}>
        <h3 style={{marginTop:0, color:NAVY, fontSize:15}}>CSV Task Import</h3>
        <div style={{display:"flex", gap:10, alignItems:"center", flexWrap:"wrap", marginBottom:10}}>
          <button onClick={downloadTemplate} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontWeight:700, cursor:"pointer", fontSize:13}}>↓ Download Template</button>
          <span style={{fontSize:12, color:"#94a3b8"}}>Upload a .csv to bulk-import tasks</span>
        </div>
        <input ref={fileRef} type="file" accept=".csv" onChange={handleCsvUpload} style={{fontSize:13, marginBottom:8}}/>
        {csvPreview && csvRows.length>0 && (
          <div>
            <div style={{overflowX:"auto", marginBottom:10}}>
              <table style={{width:"100%", borderCollapse:"collapse", fontSize:12}}>
                <thead>
                  <tr style={{background:"#f1f5f9"}}>
                    {["Task Name","Frequency","Priority","Assigned To","Notes"].map(h=><th key={h} style={{padding:"6px 10px", textAlign:"left", fontWeight:700, color:"#475569"}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {csvRows.map((r,i)=>(
                    <tr key={i} style={{borderTop:"1px solid #e2e8f0"}}>
                      <td style={{padding:"5px 10px"}}>{r.title}</td>
                      <td style={{padding:"5px 10px"}}>{r.frequency}</td>
                      <td style={{padding:"5px 10px"}}>{r.priority}</td>
                      <td style={{padding:"5px 10px"}}>{r.assignedTo}</td>
                      <td style={{padding:"5px 10px"}}>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={importTasks} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"8px 20px", fontWeight:700, cursor:"pointer"}}>Import {csvRows.length} Tasks</button>
          </div>
        )}
      </Card>

      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>New Checklist</h3>
          <input style={inp} placeholder="Checklist Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <select style={inp} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option>Onboarding</option><option>Recurring</option>
          </select>
          {form.type==="Recurring" && (
            <select style={inp} value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})}>
              <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option><option>Annual</option>
            </select>
          )}
          <MultiSelect label="Assign To" options={allPeople.map(p=>({id:p.id, name:`${p.name} (${p.role})`}))} selected={form.assignedTo} onChange={v=>setForm({...form,assignedTo:v})}/>
          <div style={{fontSize:13, fontWeight:600, color:NAVY, marginBottom:6}}>Checklist Items</div>
          {form.items.map(it=>(
            <div key={it.id} style={{display:"flex", alignItems:"center", gap:8, marginBottom:4}}>
              <span style={{fontSize:13, color:"#475569", flex:1}}>• {it.text}</span>
              <button onClick={()=>setForm({...form, items:form.items.filter(x=>x.id!==it.id)})} style={{background:"none", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:14}}>×</button>
            </div>
          ))}
          <div style={{display:"flex", gap:8, marginBottom:10}}>
            <input value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Add item..." style={{...inp, marginBottom:0, flex:1}} onKeyDown={e=>e.key==="Enter"&&addItem()}/>
            <button onClick={addItem} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"0 14px", fontWeight:700, cursor:"pointer"}}>+</button>
          </div>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}

      {checklists.length===0 ? <EmptyState icon="☑️" title="No Checklists" message="Create onboarding or recurring checklists." action="New Checklist" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {checklists.map(cl=>{
            const done = cl.items.filter(i=>i.complete).length;
            return (
              <Card key={cl.id} style={{borderLeft:`4px solid ${cl.type==="Onboarding"?GOLD:GREEN}`}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8}}>
                  <div>
                    <div style={{fontWeight:800, fontSize:15, color:NAVY}}>{cl.name}</div>
                    <div style={{display:"flex", gap:6, marginTop:4}}>
                      {badge(cl.type, cl.type==="Onboarding"?"#fef3c7":"#d1fae5", cl.type==="Onboarding"?"#92400e":"#065f46")}
                      {cl.type==="Recurring"&&badge(cl.frequency)}
                    </div>
                  </div>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}>
                    <span style={{fontSize:12, color:"#64748b"}}>{done}/{cl.items.length} done</span>
                    <DeleteBtn onClick={()=>setChecklists(checklists.filter(x=>x.id!==cl.id))}/>
                  </div>
                </div>
                {cl.items.length>0 && (
                  <div style={{borderTop:"1px solid #f1f5f9", paddingTop:8}}>
                    {cl.items.map(it=>(
                      <label key={it.id} style={{display:"flex", alignItems:"center", gap:8, padding:"4px 0", cursor:"pointer", fontSize:13, color:it.complete?"#94a3b8":"#475569", textDecoration:it.complete?"line-through":"none"}}>
                        <input type="checkbox" checked={it.complete} onChange={()=>toggleItem(cl.id, it.id)}/>
                        {it.text}
                      </label>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────
function ProjectsPage({ projects, setProjects, properties, allPeople }) {
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [form, setForm] = useState({name:"", description:"", propertyIds:[], assignedPeople:[], startDate:"", dueDate:"", status:"Not Started", notes:[]});
  const add = () => {
    if (!form.name.trim()) return;
    setProjects([...projects, {...form, id:uid()}]);
    setForm({name:"", description:"", propertyIds:[], assignedPeople:[], startDate:"", dueDate:"", status:"Not Started", notes:[]});
    setShowForm(false);
  };
  const addNote = (projId) => {
    if (!noteText.trim()) return;
    setProjects(projects.map(p=>p.id===projId?{...p, notes:[...p.notes, {id:uid(), text:noteText.trim(), timestamp:new Date().toLocaleString()}]}:p));
    setNoteText("");
  };
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20}}>
        <SectionTitle sub="Track projects and timelines across properties">Timeline / Projects</SectionTitle>
        <button onClick={()=>setShowForm(!showForm)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:700, cursor:"pointer"}}>+ Add Project</button>
      </div>
      {showForm && (
        <Card style={{marginBottom:20, borderLeft:`4px solid ${GOLD}`}}>
          <h3 style={{marginTop:0, color:NAVY}}>New Project</h3>
          <input style={inp} placeholder="Project Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <textarea style={{...inp, resize:"vertical", minHeight:60}} placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <MultiSelect label="Properties" options={properties.map(p=>({id:p.id,name:p.name}))} selected={form.propertyIds} onChange={v=>setForm({...form,propertyIds:v})}/>
          <MultiSelect label="Assigned People" options={allPeople.map(p=>({id:p.id,name:`${p.name} (${p.role})`}))} selected={form.assignedPeople} onChange={v=>setForm({...form,assignedPeople:v})}/>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <div>
              <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Start Date</div>
              <input style={inp} type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/>
            </div>
            <div>
              <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Due Date</div>
              <input style={inp} type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/>
            </div>
          </div>
          <select style={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Not Started</option><option>In Progress</option><option>Complete</option>
          </select>
          <div style={{display:"flex", gap:10}}>
            <button onClick={add} style={{background:GREEN, color:"#fff", border:"none", borderRadius:8, padding:"9px 24px", fontWeight:700, cursor:"pointer"}}>Save</button>
            <button onClick={()=>setShowForm(false)} style={{background:"#f1f5f9", color:"#475569", border:"none", borderRadius:8, padding:"9px 24px", cursor:"pointer"}}>Cancel</button>
          </div>
        </Card>
      )}
      {projects.length===0 ? <EmptyState icon="📅" title="No Projects" message="Add projects to track timelines and milestones." action="Add Project" onAction={()=>setShowForm(true)}/> : (
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {projects.map(proj=>{
            const isExp = expanded===proj.id;
            const propNames = proj.propertyIds.map(pid=>properties.find(p=>p.id===pid)?.name).filter(Boolean);
            const today = new Date().toISOString().split("T")[0];
            const isOverdue = proj.dueDate && proj.dueDate < today && proj.status!=="Complete";
            return (
              <Card key={proj.id} style={{borderLeft:`4px solid ${isOverdue?"#991b1b":proj.status==="Complete"?GREEN:GOLD}`}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:proj.id)}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800, fontSize:16, color:NAVY}}>{proj.name}</div>
                    <div style={{display:"flex", gap:6, marginTop:4, flexWrap:"wrap", alignItems:"center"}}>
                      {statusBadge(proj.status)}
                      {isOverdue&&badge("OVERDUE","#fee2e2","#991b1b")}
                      {propNames.length>0&&<span style={{fontSize:12, color:"#64748b"}}>{propNames.join(", ")}</span>}
                      {proj.dueDate&&<span style={{fontSize:12, color:"#64748b"}}>Due: {proj.dueDate}</span>}
                    </div>
                  </div>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}>
                    <span style={{fontSize:20, color:"#94a3b8"}}>{isExp?"▲":"▼"}</span>
                    <DeleteBtn onClick={()=>setProjects(projects.filter(x=>x.id!==proj.id))}/>
                  </div>
                </div>
                {isExp && (
                  <div style={{marginTop:16, borderTop:"1px solid #f1f5f9", paddingTop:16}}>
                    {proj.description&&<p style={{fontSize:13, color:"#475569", margin:"0 0 12px"}}>{proj.description}</p>}
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16}}>
                      <div>
                        <div style={{fontSize:12, fontWeight:600, color:"#475569"}}>Start Date</div>
                        <div style={{fontSize:13}}>{proj.startDate||"—"}</div>
                      </div>
                      <div>
                        <div style={{fontSize:12, fontWeight:600, color:"#475569"}}>Due Date</div>
                        <div style={{fontSize:13}}>{proj.dueDate||"—"}</div>
                      </div>
                    </div>
                    {proj.assignedPeople.length>0 && (
                      <div style={{marginBottom:14}}>
                        <div style={{fontSize:12, fontWeight:600, color:"#475569", marginBottom:4}}>Assigned People</div>
                        <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
                          {proj.assignedPeople.map(pid=>{
                            const person = allPeople.find(p=>p.id===pid);
                            return person ? <span key={pid} style={{background:"#f1f5f9", borderRadius:20, padding:"2px 10px", fontSize:12, color:"#475569"}}>{person.name}</span> : null;
                          })}
                        </div>
                      </div>
                    )}
                    {/* Notes section */}
                    <div style={{borderTop:"1px solid #f1f5f9", paddingTop:14}}>
                      <div style={{fontSize:14, fontWeight:700, color:NAVY, marginBottom:10}}>Project Notes</div>
                      <div style={{display:"flex", gap:8, marginBottom:12}}>
                        <input value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add a note..." style={{...inp, marginBottom:0, flex:1}} onKeyDown={e=>e.key==="Enter"&&addNote(proj.id)}/>
                        <button onClick={()=>addNote(proj.id)} style={{background:NAVY, color:"#fff", border:"none", borderRadius:8, padding:"0 16px", fontWeight:700, cursor:"pointer"}}>Add</button>
                      </div>
                      {[...(proj.notes||[])].reverse().map(note=>(
                        <div key={note.id} style={{background:"#f8f6f0", borderRadius:8, padding:"10px 14px", marginBottom:8}}>
                          <div style={{fontSize:13, color:"#475569"}}>{note.text}</div>
                          <div style={{fontSize:11, color:"#94a3b8", marginTop:4}}>{note.timestamp}</div>
                        </div>
                      ))}
                      {proj.notes.length===0 && <div style={{fontSize:12, color:"#94a3b8"}}>No notes yet.</div>}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
}

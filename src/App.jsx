import { useState, useEffect, useRef, useMemo } from "react";

const LOGO = "data:image/jpeg;base64,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";

const P = {
  bw:"#3E2410", wd:"#5C3A1E", wm:"#7B4B2A", wl:"#9B6B3A",
  gd:"#B8943C", go:"#D4B86A", gl:"#E8D5A0", gp:"#F5EDD4",
  cr:"#FBF6ED", wh:"#FFFDF8",
  gn:"#3D7A22", gnD:"#2D6B12", gnL:"#5AA835", gnP:"#E6F2DA",
  rd:"#8B2500", rdL:"#B33A15", rdP:"#FDEAE4",
  sk:"#4A9CC7", skP:"#E0F0FA",
  tx:"#3E2410", txM:"#6B4D30", txL:"#9B8060", bd:"#E8DCC8",
  cd:"#FFFDF8",
  ok:"#2E7D32", okB:"#E8F5E9",
  ng:"#C62828", ngB:"#FFEBEE",
  inf:"#1565C0", inB:"#E3F2FD",
  wa:"#E65100", waB:"#FFF3E0",
};

const COW_PRICE = 5000;
const TIERS = [{min:1,max:9,rate:5},{min:10,max:49,rate:6},{min:50,max:199,rate:7},{min:200,max:999,rate:7.5},{min:1000,max:12000,rate:8}];
const INVESTORS = [
  {id:"INV-001",name:"Sarah Mitchell",email:"sarah@example.com",cows:25,invested:125000,returnRate:6,schedule:"Quarterly",status:"active",nextPayout:"2026-04-01",totalReturns:7500,achLinked:true,docStatus:"signed"},
  {id:"INV-002",name:"James Chen",email:"james@example.com",cows:150,invested:750000,returnRate:7,schedule:"Monthly",status:"active",nextPayout:"2026-04-01",totalReturns:52500,achLinked:true,docStatus:"signed"},
  {id:"INV-003",name:"Maria Garcia",email:"maria@example.com",cows:5,invested:25000,returnRate:5,schedule:"Semi-annually",status:"active",nextPayout:"2026-07-01",totalReturns:1250,achLinked:true,docStatus:"signed"},
  {id:"INV-004",name:"Robert Williams",email:"robert@example.com",cows:1000,invested:5000000,returnRate:8,schedule:"Annually",status:"active",nextPayout:"2027-01-10",totalReturns:400000,achLinked:true,docStatus:"signed"},
  {id:"INV-005",name:"Emily Johnson",email:"emily@example.com",cows:0,invested:0,returnRate:0,schedule:"-",status:"pending",nextPayout:"-",totalReturns:0,achLinked:false,docStatus:"pending"},
];
const COWS = Array.from({length:60},(_,i)=>({id:"COW-"+String(i+1).padStart(4,"0"), eid:"EID-"+(900000+i), breed:["Holstein","Jersey","Guernsey","Brown Swiss","Ayrshire"][i%5], dob:"202"+(1+(i%3))+"-"+String((i%12)+1).padStart(2,"0")+"-"+String((i%28)+1).padStart(2,"0"), vaccDate:"2024-"+String((i%12)+1).padStart(2,"0")+"-15", status:i<45?"available":"leased", assignedTo:i>=45?"INV-"+String((i%5)+1).padStart(3,"0"):null, milkYield:(18+Math.random()*12).toFixed(1), weight:Math.floor(450+Math.random()*200)}));
const PAYOUTS = [
  {id:"PAY-001",investor:"Sarah Mitchell",amount:1875,date:"2026-01-01",status:"completed",method:"ACH"},
  {id:"PAY-002",investor:"James Chen",amount:4375,date:"2026-03-01",status:"completed",method:"ACH"},
  {id:"PAY-003",investor:"James Chen",amount:4375,date:"2026-04-01",status:"scheduled",method:"ACH"},
  {id:"PAY-004",investor:"Maria Garcia",amount:625,date:"2026-07-01",status:"scheduled",method:"ACH"},
  {id:"PAY-005",investor:"Robert Williams",amount:400000,date:"2027-01-10",status:"scheduled",method:"ACH"},
  {id:"PAY-006",investor:"Sarah Mitchell",amount:1875,date:"2026-04-01",status:"scheduled",method:"ACH"},
  {id:"PAY-007",investor:"James Chen",amount:4375,date:"2026-02-01",status:"failed",method:"ACH"},
];
const TASKS = [
  {id:1,type:"purchase",desc:"Emily Johnson - New purchase (3 cows)",time:"2h ago",status:"action_needed"},
  {id:2,type:"payout_fail",desc:"James Chen - ACH failed ($4,375)",time:"5h ago",status:"action_needed"},
  {id:3,type:"doc",desc:"Sarah Mitchell - Lease signed",time:"1d ago",status:"complete"},
  {id:4,type:"upload",desc:"Cow XLS uploaded (batch #47)",time:"2d ago",status:"complete"},
  {id:5,type:"payout",desc:"James Chen - Payout ($4,375)",time:"3d ago",status:"complete"},
];

// ── Hooks ──
function useCountUp(target, dur) {
  dur = dur || 2000;
  const [c, setC] = useState(0);
  const [s, setS] = useState(false);
  const ref = useRef(null);
  useEffect(function() {
    var o = new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) setS(true); }, {threshold: 0.3});
    if (ref.current) o.observe(ref.current);
    return function() { o.disconnect(); };
  }, []);
  useEffect(function() {
    if (!s) return;
    var v = 0; var inc = target / (dur / 16);
    var t = setInterval(function() { v += inc; if (v >= target) { setC(target); clearInterval(t); } else setC(Math.floor(v)); }, 16);
    return function() { clearInterval(t); };
  }, [s, target, dur]);
  return {count: c, ref: ref};
}

function Reveal(props) {
  var ref = useRef(null);
  var _s = useState(false), vis = _s[0], setVis = _s[1];
  useEffect(function() {
    var o = new IntersectionObserver(function(e) { if (e[0].isIntersecting) setVis(true); }, {threshold: 0.12});
    if (ref.current) o.observe(ref.current);
    return function() { o.disconnect(); };
  }, []);
  var d = props.delay || 0;
  return <div ref={ref} style={{opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: "opacity .6s ease " + d + "ms, transform .6s ease " + d + "ms"}}>{props.children}</div>;
}

// ── UI Components ──
function Badge(props) {
  var m = {primary:{b:P.gnP,f:P.gn},accent:{b:P.gp,f:P.gd},danger:{b:P.ngB,f:P.ng},success:{b:P.okB,f:P.ok},info:{b:P.inB,f:P.inf},warning:{b:P.waB,f:P.wa},muted:{b:"#EEE",f:P.txL}};
  var c = m[props.color || "primary"] || m.primary;
  return <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:c.b,color:c.f}}>{props.children}</span>;
}

function Stat(props) {
  return <div style={{background:P.cd,borderRadius:16,padding:"20px 16px",border:"1px solid "+P.bd,flex:"1 1 180px",minWidth:160}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
      <span style={{fontSize:11,color:P.txL,fontWeight:600,textTransform:"uppercase",letterSpacing:.6}}>{props.label}</span>
      <span style={{fontSize:16}}>{props.icon}</span>
    </div>
    <div style={{fontSize:24,fontWeight:700,color:P.bw,fontFamily:"'DM Serif Display',serif"}}>{props.value}</div>
    {props.sub && <div style={{fontSize:11,color:P.txL,marginTop:2}}>{props.sub}</div>}
  </div>;
}

function Btn(props) {
  var base = {border:"none",cursor:props.disabled?"not-allowed":"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,borderRadius:10,display:"inline-flex",alignItems:"center",gap:7,transition:"all .2s",opacity:props.disabled?0.5:1,whiteSpace:"nowrap"};
  var sz = {sm:{padding:"6px 12px",fontSize:12},md:{padding:"9px 18px",fontSize:13},lg:{padding:"12px 24px",fontSize:14}};
  var vr = {primary:{background:P.wd,color:"#fff"},accent:{background:"linear-gradient(135deg,"+P.gd+","+P.go+")",color:P.bw},outline:{background:"transparent",color:P.wd,border:"2px solid "+P.wd},ghost:{background:"transparent",color:P.txM},danger:{background:P.rd,color:"#fff"}};
  var v = props.v || "primary";
  var s = props.sz || "md";
  return <button onClick={props.disabled ? undefined : props.onClick} style={{...base,...sz[s],...vr[v],...(props.style||{})}}>{props.children}</button>;
}

function DataTable(props) {
  var columns = props.columns, data = props.data;
  if (!data || !data.length) return <div style={{background:P.cd,borderRadius:12,border:"1px solid "+P.bd,padding:32,textAlign:"center",color:P.txL,fontSize:13}}>No data</div>;
  return <div style={{overflowX:"auto",borderRadius:12,border:"1px solid "+P.bd}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
      <thead><tr style={{background:P.gp}}>{columns.map(function(c) { return <th key={c.key} style={{padding:"10px 12px",textAlign:"left",fontWeight:700,color:P.wd,fontSize:10,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{c.label}</th>; })}</tr></thead>
      <tbody>{data.map(function(row, i) { return <tr key={i} style={{borderBottom:"1px solid "+P.bd,background:i%2===0?"transparent":P.cr}}>{columns.map(function(c) { return <td key={c.key} style={{padding:"10px 12px",color:P.tx,whiteSpace:"nowrap"}}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>; })}</tr>; })}</tbody>
    </table>
  </div>;
}

function Modal(props) {
  if (!props.open) return null;
  return <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(62,36,16,.4)",backdropFilter:"blur(3px)"}} onClick={props.onClose}>
    <div onClick={function(e){e.stopPropagation()}} style={{background:P.cd,borderRadius:18,padding:24,width:props.wide?660:440,maxWidth:"92vw",maxHeight:"85vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(62,36,16,.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:P.bw,margin:0}}>{props.title}</h2>
        <button onClick={props.onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:P.txL}}>✕</button>
      </div>
      {props.children}
    </div>
  </div>;
}

function FormInput(props) {
  return <div style={{marginBottom:12}}>
    {props.label && <label style={{display:"block",fontSize:12,fontWeight:600,color:P.tx,marginBottom:4}}>{props.label}</label>}
    {props.options
      ? <select value={props.value} onChange={function(e){props.onChange(e.target.value)}} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1.5px solid "+P.bd,fontSize:13,fontFamily:"'Outfit',sans-serif",background:P.cd}}>{props.options.map(function(o){return <option key={o} value={o}>{o}</option>})}</select>
      : <input type={props.type||"text"} value={props.value} onChange={function(e){props.onChange(e.target.value)}} placeholder={props.placeholder} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1.5px solid "+P.bd,fontSize:13,fontFamily:"'Outfit',sans-serif",boxSizing:"border-box",background:P.cd}} />
    }
  </div>;
}

var Chev = function(props) { return <svg width={props.size||16} height={props.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={props.style}><polyline points="6 9 12 15 18 9"/></svg>; };
var Arr = function(props) { return <svg width={props.size||16} height={props.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; };

// ═══════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════
function Home(props) {
  var onLogin = props.onLogin;
  var _s = useState(false), scrolled = _s[0], setScrolled = _s[1];
  var _f = useState(null), faqI = _f[0], setFaqI = _f[1];
  var c1=useCountUp(12000),c2=useCountUp(4850),c3=useCountUp(7150),c4=useCountUp(847),c5=useCountUp(2400000,2500);
  useEffect(function(){var fn=function(){setScrolled(window.scrollY>50)};window.addEventListener("scroll",fn);return function(){window.removeEventListener("scroll",fn)};},[]);
  var scrollTo = function(id){document.getElementById(id)&&document.getElementById(id).scrollIntoView({behavior:"smooth"})};
  var nav=[{l:"How It Works",id:"how"},{l:"Stats",id:"stats"},{l:"Returns",id:"returns"},{l:"FAQ",id:"faq"},{l:"Contact",id:"contact"}];
  var steps=[{n:"01",t:"Create Account",d:"Sign up with Google. Firebase Auth with bank-grade encryption.",bg:P.gnP,ic:"👤"},{n:"02",t:"Purchase Cows",d:"Browse herd, pay via Stripe. More cows = higher returns up to 8%.",bg:P.gp,ic:"🐄"},{n:"03",t:"Link Bank",d:"Connect via Plaid for ACH deposits. Credentials never stored.",bg:P.skP,ic:"🏦"},{n:"04",t:"Sign Lease",d:"Personalized lease with cow details sent via DocuSign.",bg:P.rdP,ic:"📋"},{n:"05",t:"Get Returns",d:"Choose monthly/quarterly/semi-annual/annual. Auto ACH deposit.",bg:P.gnP,ic:"💰"},{n:"06",t:"Track All",d:"Monitor cows, payouts, projections in your dashboard.",bg:P.gp,ic:"📊"}];
  var tiers=[{r:"1-9",p:"5%",l:"Starter"},{r:"10-49",p:"6%",l:"Growth"},{r:"50-199",p:"7%",l:"Premium",pop:true},{r:"200-999",p:"7.5%",l:"Pro"},{r:"1000+",p:"8%",l:"Enterprise"}];
  var faqs=[{q:"How much per cow?",a:"Each cow lease costs $5,000. Up to 12,000 cows. More = higher tier from 5% to 8%."},{q:"How are returns paid?",a:"Percentage of investment by tier. Choose Monthly/Quarterly/Semi-annually/Annually. Auto ACH."},{q:"How do I link my bank?",a:"Via Plaid during first purchase. Credentials never stored, only a secure token."},{q:"What is the lease agreement?",a:"Personalized Cow Lease with EID, breed, vaccination records. Sign via DocuSign."},{q:"Can I see cow details?",a:"Yes. EID, breed, DOB, vaccination, milk yield, weight. Updated by administrators."},{q:"How secure?",a:"Firebase Auth, Stripe (PCI), Plaid, Google Cloud Secret Manager. Strict data isolation."}];
  var pill = function(bg,fg){return {display:"inline-block",padding:"5px 14px",borderRadius:99,background:bg,color:fg,fontSize:10,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",marginBottom:16}};
  var ctn = {maxWidth:1140,margin:"0 auto",padding:"0 20px"};

  return <div>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;background:"+P.cr+"}::selection{background:"+P.go+"50;color:"+P.bw+"}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:"+P.bd+";border-radius:3px}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}"}</style>

    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(251,246,237,.97)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?"1px solid "+P.bd:"1px solid transparent",transition:"all .4s",padding:scrolled?"6px 0":"12px 0"}}>
      <div style={{...ctn,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <img src={LOGO} alt="Moo Dairy" style={{height:scrolled?40:48,transition:"height .4s",borderRadius:6,cursor:"pointer"}} onClick={function(){window.scrollTo({top:0,behavior:"smooth"})}} />
        <nav style={{display:"flex",alignItems:"center",gap:1}}>
          {nav.map(function(n){return <button key={n.id} onClick={function(){scrollTo(n.id)}} style={{padding:"6px 12px",borderRadius:8,border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:"'Outfit',sans-serif",color:scrolled?P.txM:"rgba(255,255,255,.85)"}}>{n.l}</button>})}
          <div style={{width:1,height:22,margin:"0 10px",background:scrolled?P.bd:"rgba(255,255,255,.2)"}} />
          <button onClick={function(){onLogin("investor")}} style={{padding:"8px 18px",borderRadius:10,fontWeight:600,fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer",border:"2px solid "+(scrolled?P.wd:"rgba(255,255,255,.4)"),background:"transparent",color:scrolled?P.wd:"#fff"}}>Investor Login</button>
          <button onClick={function(){onLogin("admin")}} style={{padding:"8px 18px",borderRadius:10,border:"none",marginLeft:6,background:P.rd,color:"#fff",fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}>Admin Login</button>
        </nav>
      </div>
    </header>

    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,"+P.bw+" 0%,"+P.wd+" 40%,"+P.wm+" 100%)"}} />
      <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:"radial-gradient(circle,#E8D5A0 1px,transparent 1px)",backgroundSize:"36px 36px"}} />
      <div style={{position:"relative",zIndex:10,...ctn,padding:"120px 20px 80px",width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:40}}>
        <div style={{maxWidth:540}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:99,background:"rgba(212,184,106,.12)",border:"1px solid rgba(212,184,106,.2)",marginBottom:28}}>
            <div style={{width:7,height:7,borderRadius:4,background:P.gnL,animation:"pulse 2s infinite"}} />
            <span style={{color:P.gl,fontSize:12,fontWeight:600}}>Now accepting new investors</span>
          </div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:52,color:"#fff",lineHeight:1.08,marginBottom:20}}>Invest in <span style={{color:P.go}}>Real Dairy.</span><br/>Earn Real Returns.</h1>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:16,lineHeight:1.7,marginBottom:32,maxWidth:440}}>Own dairy cows through our secure leasing platform. Receive automated returns deposited directly to your bank.</p>
          <div style={{display:"flex",gap:12}}>
            <button onClick={function(){onLogin("investor")}} style={{padding:"13px 28px",borderRadius:14,border:"none",background:"linear-gradient(135deg,"+P.gd+","+P.go+")",color:P.bw,fontSize:15,fontWeight:700,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>Start Investing <Arr /></button>
            <button onClick={function(){scrollTo("how")}} style={{padding:"13px 28px",borderRadius:14,border:"2px solid rgba(232,213,160,.3)",background:"transparent",color:P.gl,fontSize:15,fontWeight:600,fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}>Learn More</button>
          </div>
        </div>
        <div style={{flexShrink:0,textAlign:"center"}}>
          <img src={LOGO} alt="Moo Dairy Farms" style={{width:240,height:240,objectFit:"contain",filter:"drop-shadow(0 12px 36px rgba(0,0,0,.4))"}} />
          <div style={{marginTop:16,background:"rgba(232,213,160,.08)",border:"1px solid rgba(232,213,160,.12)",borderRadius:16,padding:"14px 20px",display:"inline-flex",gap:24}}>
            {[{v:"12,000",l:"Herd"},{v:"847",l:"Investors"},{v:"$2.4M",l:"Paid"}].map(function(s,i){return <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:P.go}}>{s.v}</div><div style={{fontSize:9,color:"rgba(232,213,160,.5)",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase"}}>{s.l}</div></div>})}
          </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:-1,left:0,right:0}}><svg viewBox="0 0 1440 70" fill="none" style={{width:"100%",display:"block"}}><path d="M0 28L80 24C160 20 320 14 480 18C640 22 800 36 960 40C1120 44 1280 36 1360 32L1440 28V70H0Z" fill={P.cr}/></svg></div>
    </section>

    <section id="how" style={{padding:"80px 0",background:P.cr}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:52}}><div style={pill(P.gnP,P.gn)}>The Process</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw,marginBottom:10}}>How Your Investment Works</h2></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>{steps.map(function(s,i){return <Reveal key={i} delay={i*70}><div style={{background:P.wh,borderRadius:18,padding:24,border:"1px solid "+P.bd,height:"100%"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}><div style={{width:44,height:44,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{s.ic}</div><span style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:P.bd}}>{s.n}</span></div><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:P.bw,marginBottom:6}}>{s.t}</h3><p style={{color:P.txL,fontSize:12,lineHeight:1.65}}>{s.d}</p></div></Reveal>})}</div>
    </div></section>

    <section id="stats" style={{padding:"80px 0",background:P.wh}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:52}}><div style={pill(P.gp,P.gd)}>Live Numbers</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw}}>Platform at a Glance</h2></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:16}}>{[{ref:c1.ref,v:c1.count.toLocaleString(),l:"Total Herd Capacity"},{ref:c2.ref,v:c2.count.toLocaleString(),l:"Farm-Owned Cows"},{ref:c3.ref,v:c3.count.toLocaleString(),l:"Investor-Owned Cows"}].map(function(s,i){return <Reveal key={i} delay={i*90}><div ref={s.ref} style={{background:P.cr,borderRadius:18,padding:24,border:"1px solid "+P.bd}}><div style={{fontFamily:"'DM Serif Display',serif",fontSize:38,color:P.bw,letterSpacing:-1,marginBottom:4}}>{s.v}</div><div style={{fontWeight:700,color:P.wd,fontSize:13}}>{s.l}</div></div></Reveal>})}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{[{ref:c4.ref,v:c4.count.toLocaleString(),l:"Active Investors",ic:"👥",g:"linear-gradient(135deg,"+P.sk+",#2E86AB)"},{ref:c5.ref,v:"$"+(c5.count/1e6).toFixed(1)+"M",l:"Returns Paid",ic:"💰",g:"linear-gradient(135deg,"+P.rd+","+P.rdL+")"}].map(function(s,i){return <Reveal key={i} delay={(i+3)*90}><div ref={s.ref} style={{background:P.cr,borderRadius:18,padding:24,border:"1px solid "+P.bd,display:"flex",alignItems:"center",gap:20}}><div style={{width:64,height:64,borderRadius:16,background:s.g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{s.ic}</div><div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:34,color:P.bw}}>{s.v}</div><div style={{fontWeight:700,color:P.wd,fontSize:13}}>{s.l}</div></div></div></Reveal>})}</div>
    </div></section>

    <section id="returns" style={{padding:"80px 0",background:P.cr}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}><div style={pill(P.gnP,P.gnD)}>Earn More</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw}}>Tiered Annual Returns</h2></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>{tiers.map(function(t,i){return <Reveal key={i} delay={i*50}><div style={{position:"relative",borderRadius:18,padding:"22px 14px",textAlign:"center",background:t.pop?"linear-gradient(135deg,"+P.wd+","+P.bw+")":P.wh,color:t.pop?P.gl:P.bw,border:t.pop?"2px solid "+P.go+"40":"1px solid "+P.bd,boxShadow:t.pop?"0 14px 40px "+P.bw+"30":"none",transform:t.pop?"scale(1.03)":"none"}}>{t.pop&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",padding:"3px 10px",background:P.rd,color:"#fff",fontSize:9,fontWeight:700,borderRadius:99,whiteSpace:"nowrap"}}>Popular</div>}<div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".15em",color:t.pop?P.go+"80":P.txL,marginBottom:10}}>{t.l}</div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:40,marginBottom:4}}>{t.p}</div><div style={{fontSize:11,marginBottom:12}}>annual</div><div style={{fontSize:12,fontWeight:600,padding:"6px 12px",borderRadius:8,background:t.pop?P.go+"18":P.gp}}>{t.r} cows</div></div></Reveal>})}</div>
    </div></section>

    <section id="faq" style={{padding:"80px 0",background:P.wh}}><div style={{maxWidth:660,margin:"0 auto",padding:"0 20px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}><div style={pill(P.skP,P.sk)}>Questions</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw}}>FAQ</h2></div></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{faqs.map(function(f,i){var op=faqI===i;return <Reveal key={i} delay={i*30}><div style={{border:"1px solid "+(op?P.go+"60":P.bd),borderRadius:14,overflow:"hidden",background:P.wh}}><button onClick={function(){setFaqI(op?null:i)}} style={{width:"100%",textAlign:"left",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}><span style={{fontWeight:600,color:P.bw,fontSize:13}}>{f.q}</span><Chev size={14} style={{color:op?P.gd:P.txL,flexShrink:0,transition:"transform .3s",transform:op?"rotate(180deg)":"rotate(0)"}} /></button><div style={{maxHeight:op?240:0,overflow:"hidden",transition:"max-height .35s ease"}}><p style={{padding:"0 20px 16px",color:P.txL,fontSize:12,lineHeight:1.65}}>{f.a}</p></div></div></Reveal>})}</div>
    </div></section>

    <section id="contact" style={{padding:"80px 0",background:P.cr}}><div style={ctn}>
      <Reveal><div style={{background:"linear-gradient(135deg,"+P.wd+","+P.bw+")",borderRadius:24,padding:"56px 32px",textAlign:"center",position:"relative",overflow:"hidden",marginBottom:56}}>
        <div style={{position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(circle,"+P.go+" 1px,transparent 1px)",backgroundSize:"22px 22px"}} />
        <div style={{position:"relative",zIndex:1}}><img src={LOGO} alt="" style={{width:60,height:60,objectFit:"contain",margin:"0 auto 14px",display:"block"}} /><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:34,color:P.gl,marginBottom:10}}>Ready to Start Earning?</h2><p style={{color:P.gl+"80",fontSize:15,maxWidth:400,margin:"0 auto 24px"}}>Join hundreds of investors earning automated returns.</p><button onClick={function(){onLogin("investor")}} style={{padding:"12px 36px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+P.gd+","+P.go+")",color:P.bw,fontSize:15,fontWeight:700,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>Get Started <Arr /></button></div>
      </div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>{[{ic:"📞",l:"Phone",v:"+1 (806) 555-0187",s:"Mon-Fri 8am-6pm"},{ic:"✉️",l:"Email",v:"invest@moodairyfarms.com",s:"24hr reply"},{ic:"📍",l:"Office",v:"4521 Ranch Rd",s:"Amarillo, TX"},{ic:"🕐",l:"Hours",v:"Mon - Fri",s:"8am - 6pm CST"}].map(function(x,i){return <Reveal key={i} delay={i*70}><div style={{background:P.wh,borderRadius:16,padding:20,border:"1px solid "+P.bd,textAlign:"center"}}><div style={{fontSize:22,marginBottom:8}}>{x.ic}</div><div style={{fontSize:9,fontWeight:700,color:P.txL,textTransform:"uppercase",letterSpacing:".12em",marginBottom:6}}>{x.l}</div><div style={{fontWeight:700,color:P.bw,fontSize:12,marginBottom:2}}>{x.v}</div><div style={{fontSize:10,color:P.txL}}>{x.s}</div></div></Reveal>})}</div>
    </div></section>

    <footer style={{background:P.bw,color:P.gl,padding:"40px 0 20px"}}><div style={ctn}>
      <div style={{display:"flex",justifyContent:"space-between",paddingBottom:20,borderBottom:"1px solid "+P.wd}}>
        <div><img src={LOGO} alt="" style={{height:44,borderRadius:5,marginBottom:10}} /><p style={{color:P.gl+"50",fontSize:12,maxWidth:260,lineHeight:1.6}}>Connecting investors with real dairy assets. Secure, automated returns.</p></div>
        <div style={{display:"flex",gap:40}}>
          <div>{nav.map(function(n,i){return <div key={i} style={{marginBottom:6}}><button onClick={function(){scrollTo(n.id)}} style={{color:P.gl+"40",fontSize:12,border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{n.l}</button></div>})}</div>
          <div><div style={{fontSize:12,color:P.gl+"50",marginBottom:8}}>invest@moodairyfarms.com</div><div style={{fontSize:12,color:P.gl+"50"}}>+1 (806) 555-0187</div><div style={{fontSize:10,color:P.gl+"25",marginTop:4}}>Amarillo, TX 79101</div></div>
        </div>
      </div>
      <div style={{paddingTop:16,textAlign:"center"}}><span style={{color:P.gl+"25",fontSize:10}}>© 2026 Moo Dairy Farms. All rights reserved.</span></div>
    </div></footer>
  </div>;
}

// ═══════════════════════════════════════════════════════
// INVESTOR DASHBOARD
// ═══════════════════════════════════════════════════════
function Investor(props) {
  var inv = INVESTORS[1];
  var _p = useState("overview"), pg = _p[0], setPg = _p[1];
  var _b = useState(false), showBuy = _b[0], setShowBuy = _b[1];
  var _q = useState(10), qty = _q[0], setQty = _q[1];
  var _st = useState(0), step = _st[0], setStep = _st[1];
  var myCows = COWS.filter(function(c){return c.assignedTo===inv.id});
  var myPay = PAYOUTS.filter(function(p){return p.investor===inv.name});
  var tier = TIERS.find(function(t){return qty>=t.min&&qty<=t.max}) || TIERS[0];
  var nav = [{id:"overview",l:"Overview",ic:"📊"},{id:"cows",l:"My Cows",ic:"🐄"},{id:"payouts",l:"Payouts",ic:"💰"},{id:"docs",l:"Documents",ic:"📋"}];

  return <div style={{display:"flex",minHeight:"100vh",background:P.cr}}>
    <div style={{width:240,background:P.wd,padding:"20px 0",display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"0 18px",marginBottom:32}}><img src={LOGO} alt="" style={{height:36,borderRadius:4}} /><div style={{color:P.gl+"60",fontSize:9,fontWeight:700,letterSpacing:".1em",marginTop:6}}>INVESTOR PORTAL</div></div>
      <nav style={{flex:1}}>{nav.map(function(n){return <button key={n.id} onClick={function(){setPg(n.id)}} style={{width:"100%",padding:"10px 18px",border:"none",background:pg===n.id?"rgba(255,255,255,.1)":"transparent",color:pg===n.id?"#fff":"rgba(255,255,255,.45)",fontSize:12,fontWeight:500,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderLeft:pg===n.id?"3px solid "+P.go:"3px solid transparent"}}><span>{n.ic}</span>{n.l}</button>})}</nav>
      <div style={{padding:"0 18px",borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:12}}><div style={{color:"#fff",fontSize:12,fontWeight:600}}>{inv.name}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:10}}>{inv.email}</div><button onClick={props.onLogout} style={{marginTop:8,color:"rgba(255,255,255,.4)",fontSize:12,border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>← Home</button></div>
    </div>
    <div style={{flex:1,padding:"24px 32px",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:0}}>{pg==="overview"?"Investment Overview":pg==="cows"?"My Cows":pg==="payouts"?"Payouts":"Documents"}</h1><p style={{color:P.txL,fontSize:12,margin:"3px 0 0"}}>Welcome, {inv.name.split(" ")[0]}</p></div>
        <Btn v="accent" onClick={function(){setShowBuy(true);setStep(0)}}>🛒 Purchase Cows</Btn>
      </div>
      {pg==="overview" && <><div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}><Stat label="Invested" value={"$"+(inv.invested/1000).toFixed(0)+"K"} sub={inv.cows+" cows"} icon="💵" /><Stat label="Rate" value={inv.returnRate+"%"} sub={inv.schedule} icon="📈" /><Stat label="Returns" value={"$"+inv.totalReturns.toLocaleString()} sub="Lifetime" icon="💰" /><Stat label="Next Payout" value={inv.nextPayout} icon="📅" /></div><DataTable columns={[{key:"id",label:"ID"},{key:"amount",label:"Amount",render:function(v){return "$"+v.toLocaleString()}},{key:"date",label:"Date"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="completed"?"success":v==="failed"?"danger":"warning"}>{v}</Badge>}}]} data={myPay} /></>}
      {pg==="cows" && <DataTable columns={[{key:"id",label:"ID"},{key:"eid",label:"EID"},{key:"breed",label:"Breed"},{key:"dob",label:"DOB"},{key:"milkYield",label:"Yield"},{key:"weight",label:"Weight"}]} data={myCows} />}
      {pg==="payouts" && <DataTable columns={[{key:"id",label:"ID"},{key:"amount",label:"Amount",render:function(v){return "$"+v.toLocaleString()}},{key:"date",label:"Date"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="completed"?"success":v==="failed"?"danger":"warning"}>{v}</Badge>}}]} data={myPay} />}
      {pg==="docs" && <div style={{display:"flex",flexDirection:"column",gap:12}}>{[{n:"Lease - Batch #1 (100 cows)",d:"2024-03-25"},{n:"Lease - Batch #2 (50 cows)",d:"2024-08-12"},{n:"Return Schedule 2025",d:"2025-01-05"}].map(function(d,i){return <div key={i} style={{background:P.cd,borderRadius:12,padding:"16px 20px",border:"1px solid "+P.bd,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:18}}>📄</span><div><div style={{fontWeight:600,color:P.bw,fontSize:12}}>{d.n}</div><div style={{color:P.txL,fontSize:10}}>{d.d}</div></div></div><Badge color="success">Signed</Badge></div>})}</div>}
    </div>
    <Modal open={showBuy} onClose={function(){setShowBuy(false)}} title={step===0?"Purchase Cows":step===1?"Link Bank":"Confirm"}>
      {step===0 && <><FormInput label="Number of Cows" type="number" value={qty} onChange={function(v){setQty(Math.max(1,parseInt(v)||1))}} /><div style={{background:P.gp,borderRadius:10,padding:16,marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:P.txL}}>Price/cow</span><span style={{fontWeight:600}}>$5,000</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:P.txL}}>Qty</span><span style={{fontWeight:600}}>{qty}</span></div><div style={{borderTop:"1px solid "+P.bd,paddingTop:4,display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700}}>Total</span><span style={{fontWeight:700,color:P.gn,fontSize:16}}>{"$"+(qty*5000).toLocaleString()}</span></div><div style={{marginTop:8,background:P.wh,borderRadius:6,padding:"4px 8px",fontSize:11}}><b style={{color:P.gd}}>Tier: {tier.rate}%</b></div></div><Btn v="primary" onClick={function(){setStep(1)}} style={{width:"100%"}}>Continue</Btn></>}
      {step===1 && <div style={{border:"2px dashed "+P.bd,borderRadius:12,padding:24,textAlign:"center",marginBottom:14}}><div style={{fontSize:32,marginBottom:4}}>🏦</div><div style={{fontWeight:600,color:P.bw,fontSize:13,marginBottom:8}}>Plaid Bank Link</div><Btn v="outline" onClick={function(){setStep(2)}}>Link Bank (Demo)</Btn></div>}
      {step===2 && <><div style={{background:P.okB,borderRadius:10,padding:12,marginBottom:14,display:"flex",gap:6,alignItems:"center"}}><span>✅</span><span style={{fontSize:12,color:P.ok,fontWeight:600}}>Bank linked</span></div><div style={{background:P.cr,borderRadius:10,padding:14,marginBottom:14,fontSize:12}}><b>{qty} cows</b> x $5,000 = <b>{"$"+(qty*5000).toLocaleString()}</b><br/><span style={{color:P.txL}}>Rate: {tier.rate}%</span></div><Btn v="accent" onClick={function(){setShowBuy(false);alert("Purchase submitted!")}} style={{width:"100%"}}>Confirm & Pay</Btn></>}
    </Modal>
  </div>;
}

// ═══════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════
function Admin(props) {
  var _p = useState("dashboard"), pg = _p[0], setPg = _p[1];
  var _s = useState(null), selInv = _s[0], setSelInv = _s[1];
  var _m = useState(false), showMeta = _m[0], setShowMeta = _m[1];
  var _sc = useState("Monthly"), sch = _sc[0], setSch = _sc[1];
  var _c = useState(""), cowQ = _c[0], setCowQ = _c[1];
  var _u = useState(false), showUp = _u[0], setShowUp = _u[1];
  var _up = useState(null), upProg = _up[0], setUpProg = _up[1];
  var fCows = useMemo(function(){if(!cowQ)return COWS.slice(0,30);var t=cowQ.toLowerCase();return COWS.filter(function(c){return c.id.toLowerCase().includes(t)||c.eid.toLowerCase().includes(t)||c.breed.toLowerCase().includes(t)});},[cowQ]);
  var nav = [{id:"dashboard",l:"Dashboard",ic:"📊"},{id:"investors",l:"Investors",ic:"👥"},{id:"cows",l:"Cow Data",ic:"🐄"},{id:"payouts",l:"Payouts",ic:"💰"},{id:"docs",l:"Documents",ic:"📋"},{id:"settings",l:"Settings",ic:"⚙️"}];
  var simUp = function(){setUpProg(0);var iv=setInterval(function(){setUpProg(function(p){if(p>=100){clearInterval(iv);return 100}return p+Math.random()*20})},400)};

  return <div style={{display:"flex",minHeight:"100vh",background:P.cr}}>
    <div style={{width:240,background:P.bw,padding:"20px 0",display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"0 18px",marginBottom:32}}><img src={LOGO} alt="" style={{height:36,borderRadius:4}} /><div style={{color:P.go,fontSize:9,fontWeight:700,letterSpacing:".1em",marginTop:6}}>ADMIN CONSOLE</div></div>
      <nav style={{flex:1}}>{nav.map(function(n){return <button key={n.id} onClick={function(){setPg(n.id)}} style={{width:"100%",padding:"10px 18px",border:"none",background:pg===n.id?"rgba(255,255,255,.07)":"transparent",color:pg===n.id?"#fff":"rgba(255,255,255,.35)",fontSize:12,fontWeight:500,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderLeft:pg===n.id?"3px solid "+P.go:"3px solid transparent"}}><span>{n.ic}</span>{n.l}{n.id==="dashboard"&&<span style={{marginLeft:"auto",background:P.rd,color:"#fff",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:8}}>2</span>}</button>})}</nav>
      <div style={{padding:"0 18px",borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:12}}><div style={{color:"#fff",fontSize:12,fontWeight:600}}>Admin</div><div style={{color:"rgba(255,255,255,.3)",fontSize:10}}>admin@moodairy.com</div><button onClick={props.onLogout} style={{marginTop:8,color:"rgba(255,255,255,.35)",fontSize:12,border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>← Home</button></div>
    </div>
    <div style={{flex:1,padding:"24px 32px",overflowY:"auto"}}>
      {pg==="dashboard" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Admin Dashboard</h1><div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}><Stat label="Investors" value={INVESTORS.filter(function(i){return i.status==="active"}).length} sub="1 pending" icon="👥" /><Stat label="Leased" value={COWS.filter(function(c){return c.status==="leased"}).length} sub={"of "+COWS.length} icon="🐄" /><Stat label="AUM" value="$5.9M" icon="💵" /><Stat label="Due" value={PAYOUTS.filter(function(p){return p.status==="scheduled"}).length} icon="📅" /></div><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:P.bw,marginBottom:12}}>Task Queue</h3><div style={{display:"flex",flexDirection:"column",gap:6}}>{TASKS.map(function(t){return <div key={t.id} style={{background:P.cd,borderRadius:12,padding:"12px 16px",border:"1px solid "+P.bd,borderLeft:t.status==="action_needed"?"4px solid "+P.ng:"4px solid "+P.ok,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:16}}>{t.type==="purchase"?"🛒":t.type==="payout_fail"?"⚠️":"✅"}</span><div><div style={{fontWeight:600,fontSize:12,color:P.bw}}>{t.desc}</div><div style={{fontSize:10,color:P.txL}}>{t.time}</div></div></div>{t.status==="action_needed"?<Btn v="danger" sz="sm">Action</Btn>:<Badge color="success">Done</Badge>}</div>})}</div></>}
      {pg==="investors" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Investors</h1><DataTable columns={[{key:"id",label:"ID"},{key:"name",label:"Name",render:function(v){return <b>{v}</b>}},{key:"cows",label:"Cows"},{key:"invested",label:"Invested",render:function(v){return v>0?"$"+v.toLocaleString():"-"}},{key:"returnRate",label:"Rate",render:function(v){return v>0?v+"%":"-"}},{key:"schedule",label:"Schedule"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="active"?"success":"warning"}>{v}</Badge>}},{key:"docStatus",label:"",render:function(_,row){return <Btn v="ghost" sz="sm" onClick={function(){setSelInv(row);setShowMeta(true)}}>⚙️</Btn>}}]} data={INVESTORS} /></>}
      {pg==="cows" && <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:0}}>Cow Data</h1><Btn v="accent" onClick={function(){setShowUp(true);setUpProg(null)}}>📤 Upload XLS</Btn></div><input value={cowQ} onChange={function(e){setCowQ(e.target.value)}} placeholder="Search..." style={{width:260,padding:"8px 12px",borderRadius:8,border:"1.5px solid "+P.bd,fontSize:12,fontFamily:"'Outfit',sans-serif",marginBottom:14}} /><DataTable columns={[{key:"id",label:"ID"},{key:"eid",label:"EID"},{key:"breed",label:"Breed"},{key:"dob",label:"DOB"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="available"?"success":"info"}>{v}</Badge>}},{key:"assignedTo",label:"Investor",render:function(v){return v||"-"}}]} data={fCows} /></>}
      {pg==="payouts" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Payouts</h1><div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}><Stat label="Done" value={PAYOUTS.filter(function(p){return p.status==="completed"}).length} icon="✅" /><Stat label="Scheduled" value={PAYOUTS.filter(function(p){return p.status==="scheduled"}).length} icon="📅" /><Stat label="Failed" value={PAYOUTS.filter(function(p){return p.status==="failed"}).length} icon="⚠️" /></div><DataTable columns={[{key:"id",label:"ID"},{key:"investor",label:"Investor",render:function(v){return <b>{v}</b>}},{key:"amount",label:"Amount",render:function(v){return "$"+v.toLocaleString()}},{key:"date",label:"Date"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="completed"?"success":v==="failed"?"danger":"warning"}>{v}</Badge>}},{key:"method",label:"",render:function(_,row){return row.status==="failed"?<Btn v="danger" sz="sm" onClick={function(){alert("Retrying...")}}>Retry</Btn>:null}}]} data={PAYOUTS} /></>}
      {pg==="docs" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Documents</h1><div style={{background:P.cd,borderRadius:12,padding:"16px 20px",border:"1px solid "+P.bd,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:18}}>📄</span><div><div style={{fontWeight:600,color:P.bw,fontSize:13}}>Cow Lease Agreement v3.2</div><div style={{color:P.txL,fontSize:10}}>Active template</div></div></div><Badge color="accent">Active</Badge></div><DataTable columns={[{key:"inv",label:"Investor"},{key:"doc",label:"Document"},{key:"date",label:"Date"},{key:"st",label:"Status",render:function(v){return <Badge color={v==="Signed"?"success":"warning"}>{v}</Badge>}}]} data={[{inv:"Sarah Mitchell",doc:"Lease - 25 cows",date:"2024-06-20",st:"Signed"},{inv:"James Chen",doc:"Lease - 150 cows",date:"2024-03-25",st:"Signed"},{inv:"Emily Johnson",doc:"Pending",date:"-",st:"Pending"}]} /></>}
      {pg==="settings" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Settings</h1><div style={{background:P.cd,borderRadius:14,padding:20,border:"1px solid "+P.bd,marginBottom:16}}><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:P.bw,marginBottom:12}}>Return Tiers</h3><DataTable columns={[{key:"min",label:"Min"},{key:"max",label:"Max",render:function(v){return v.toLocaleString()}},{key:"rate",label:"Rate",render:function(v){return <b style={{color:P.gn}}>{v}%</b>}}]} data={TIERS} /></div><div style={{background:P.cd,borderRadius:14,padding:20,border:"1px solid "+P.bd}}><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:P.bw,marginBottom:12}}>Integrations</h3>{[{n:"Stripe",d:"Payments"},{n:"Plaid",d:"Bank linking"},{n:"BoA ACH",d:"Payouts"},{n:"DocuSign",d:"E-signatures"}].map(function(s,i){return <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?"1px solid "+P.bd:"none"}}><div><div style={{fontWeight:600,color:P.bw,fontSize:12}}>{s.n}</div><div style={{color:P.txL,fontSize:10}}>{s.d}</div></div><Badge color="success">Connected</Badge></div>})}</div></>}
    </div>
    <Modal open={showMeta} onClose={function(){setShowMeta(false)}} title="Configure Investor" wide>{selInv && <><div style={{display:"flex",gap:14,marginBottom:16}}><div style={{flex:1,background:P.cr,borderRadius:10,padding:14}}><div style={{fontSize:9,color:P.txL,textTransform:"uppercase",marginBottom:4}}>Investor</div><div style={{fontWeight:700,fontSize:13,color:P.bw}}>{selInv.name}</div><div style={{color:P.txL,fontSize:11}}>{selInv.email}</div></div><div style={{flex:1,background:P.cr,borderRadius:10,padding:14}}><div style={{fontSize:9,color:P.txL,textTransform:"uppercase",marginBottom:4}}>Investment</div><div style={{fontWeight:700,fontSize:13,color:P.bw}}>{selInv.cows} cows</div><div style={{color:P.txL,fontSize:11}}>{"$"+selInv.invested.toLocaleString()}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><FormInput label="Return Rate (%)" type="number" value={selInv.returnRate||""} onChange={function(){}} /><FormInput label="Schedule" options={["Monthly","Quarterly","Semi-annually","Annually"]} value={sch} onChange={setSch} /></div><FormInput label="Assign Cows (EIDs)" placeholder="COW-0001, COW-0002..." value="" onChange={function(){}} /><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn v="outline" onClick={function(){setShowMeta(false)}}>Cancel</Btn><Btn v="primary" onClick={function(){setShowMeta(false);alert("Saved!")}}>Save</Btn></div></>}</Modal>
    <Modal open={showUp} onClose={function(){setShowUp(false)}} title="Upload Cow Data"><div style={{border:"2px dashed "+P.bd,borderRadius:12,padding:28,textAlign:"center",marginBottom:14}}><div style={{fontSize:32,marginBottom:4}}>📄</div><div style={{fontWeight:600,color:P.bw,fontSize:13,marginBottom:8}}>Drop XLS here</div><Btn v="outline" onClick={simUp}>Select File (Demo)</Btn></div>{upProg!==null&&<div><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,fontWeight:600}}>{upProg>=100?"Done!":"Uploading..."}</span><span style={{fontSize:11,color:P.txL}}>{Math.min(100,Math.round(upProg))}%</span></div><div style={{height:5,background:P.bd,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:Math.min(100,upProg)+"%",background:upProg>=100?P.ok:P.gn,borderRadius:3,transition:"width .3s"}} /></div>{upProg>=100&&<div style={{marginTop:8,background:P.okB,borderRadius:8,padding:10,fontSize:11,color:P.ok}}><b>Success!</b> 847 records written.</div>}</div>}</Modal>
  </div>;
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  var _r = useState(null), role = _r[0], setRole = _r[1];
  if (!role) return <Home onLogin={setRole} />;
  if (role === "investor") return <Investor onLogout={function(){setRole(null)}} />;
  return <Admin onLogout={function(){setRole(null)}} />;
}

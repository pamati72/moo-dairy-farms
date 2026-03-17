import { useState, useEffect, useRef, useMemo } from "react";

const LOGO = "data:image/jpeg;base64,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";
var HERO_IMG = "data:image/jpeg;base64,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";

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
  // Farm pastels
  hay:"#F7F0E0",    // soft wheat/hay
  meadow:"#EEF5E6", // light meadow green
  sky:"#EDF4F8",     // pale morning sky
  soil:"#E9F0E3",    // sage mist
  barn:"#E8EEF3",    // soft cloud
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
    <div onClick={function(e){e.stopPropagation()}} style={{background:P.cd,borderRadius:18,padding:16,width:props.wide?660:440,maxWidth:"92vw",maxHeight:"85vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(62,36,16,.2)"}}>
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
  var faqs=[{q:"How much per cow?",a:"Each cow lease costs $5,000. Up to 12,000 cows. More = higher tier from 5% to 8%."},{q:"How are returns paid?",a:"Percentage of investment by tier. Choose Monthly/Quarterly/Semi-annually/Annually. Auto ACH."},{q:"How do I link my bank?",a:"Via Plaid during first purchase. Credentials never stored, only a secure token."},{q:"What is the lease agreement?",a:"Personalized Cow Lease with EID, breed, vaccination records. Sign via DocuSign."},{q:"Can I see cow details?",a:"Yes. EID, breed, DOB, vaccination, milk yield, weight. Updated by administrators."},{q:"How secure is the platform?",a:"Firebase Auth, Stripe (PCI), Plaid, Google Cloud Secret Manager. Strict data isolation."},{q:"What if a payout fails?",a:"Failed ACH transfers are auto-flagged, admin notified, and retry initiated. You receive an email notification."},{q:"Can I change my payout schedule?",a:"Yes. Contact us and an admin can update your schedule at any time — Monthly to Quarterly, etc."}];
  var pill = function(bg,fg){return {display:"inline-block",padding:"5px 14px",borderRadius:99,background:bg,color:fg,fontSize:10,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",marginBottom:10}};
  var ctn = {maxWidth:1140,margin:"0 auto",padding:"0 20px"};

  return <div>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;background:"+P.meadow+"}::selection{background:"+P.go+"50;color:"+P.bw+"}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:"+P.bd+";border-radius:3px}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}"}</style>

    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"#DDE8D6",borderBottom:"1px solid #C5D4BC",padding:"8px 0"}}>
      <div style={{...ctn,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <img src={LOGO} alt="Moo Dairy" style={{height:44,borderRadius:6,cursor:"pointer"}} onClick={function(){window.scrollTo({top:0,behavior:"smooth"})}} />
        <nav style={{display:"flex",alignItems:"center",gap:1}}>
          {nav.map(function(n){return <button key={n.id} onClick={function(){scrollTo(n.id)}} style={{padding:"6px 12px",borderRadius:8,border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Outfit',sans-serif",color:P.bw}}>{n.l}</button>})}
          <div style={{width:1,height:22,margin:"0 10px",background:P.gn+"30"}} />
          <button onClick={function(){onLogin("investor")}} style={{padding:"8px 18px",borderRadius:10,fontWeight:600,fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer",border:"2px solid "+P.gn,background:"transparent",color:P.gn}}>Investor Login</button>
          <button onClick={function(){onLogin("admin")}} style={{padding:"8px 18px",borderRadius:10,border:"none",marginLeft:6,background:P.gn,color:"#fff",fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}>Admin Login</button>
        </nav>
      </div>
    </header>



    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#E8F0DA 0%,#E9F0E3 35%,#EDF4F8 70%,#F7F0E0 100%)"}} />
      <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"radial-gradient(circle,"+P.gn+" 1px,transparent 1px)",backgroundSize:"40px 40px"}} />
      <div style={{position:"relative",zIndex:10,...ctn,padding:"80px 20px 40px",width:"100%"}}>
        <div style={{background:"#E4EDDC",borderRadius:18,padding:"12px 0",marginBottom:16,position:"relative",overflow:"hidden",border:"1px solid #C5D4BC",fontFamily:"'DM Serif Display',serif"}}>
          <style>{"@keyframes walkCow{0%{transform:translateX(-100px) scaleX(-1)}100%{transform:translateX(calc(100vw + 100px)) scaleX(-1)}}"}</style>
          <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",overflow:"hidden"}}>
            <span style={{position:"absolute",top:1,fontSize:25,opacity:.85,animation:"walkCow 12s linear infinite",animationDelay:"0s",animationFillMode:"backwards"}}>🐄</span>
            <span style={{position:"absolute",top:10,fontSize:25,opacity:.8,animation:"walkCow 15s linear infinite",animationDelay:"3s",animationFillMode:"backwards"}}>🐄</span>
            <span style={{position:"absolute",top:4,fontSize:25,opacity:.85,animation:"walkCow 18s linear infinite",animationDelay:"7s",animationFillMode:"backwards"}}>🐄</span>
            <span style={{position:"absolute",top:14,fontSize:25,opacity:.75,animation:"walkCow 14s linear infinite",animationDelay:"5s",animationFillMode:"backwards"}}>🐄</span>
            <span style={{position:"absolute",top:0,fontSize:25,opacity:.85,animation:"walkCow 16s linear infinite",animationDelay:"10s",animationFillMode:"backwards"}}>🐄</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16,padding:"0 24px",position:"relative",zIndex:2}}>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <span style={{fontSize:22,display:"inline-block",transform:"scaleX(-1)"}}>🐄</span>
              <span style={{fontSize:20,color:P.bw}}>Cow Onboarding</span>
              <span style={{fontSize:16,color:P.gn,fontWeight:600}}>Current Year Target: 5,500</span>
            </div>
            <div style={{flex:1,height:32,background:"rgba(61,122,34,.08)",borderRadius:16,overflow:"hidden",display:"flex",border:"1px solid "+P.gn+"25"}}>
              <div style={{width:"44.3%",height:"100%",background:"linear-gradient(90deg,"+P.gn+","+P.gnL+")",borderRadius:"16px 0 0 16px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,.2)"}}>2,435 Onboarded</div>
              <div style={{width:"55.7%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:P.txM}}>3,065 Available</div>
            </div>
            <button onClick={function(){onLogin("investor")}} style={{fontSize:14,color:P.gn,background:"none",border:"2px solid "+P.gn,borderRadius:8,padding:"6px 16px",cursor:"pointer",fontFamily:"'DM Serif Display',serif",flexShrink:0,whiteSpace:"nowrap",fontWeight:600}}>Invest Now →</button>
            <span style={{fontSize:22,flexShrink:0}}>🐄</span>
          </div>
        </div>

        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,padding:"12px 32px",borderRadius:99,background:"linear-gradient(135deg,rgba(61,122,34,.12),rgba(184,148,60,.1))",border:"2px solid rgba(61,122,34,.3)",boxShadow:"0 0 30px rgba(61,122,34,.08)"}}>
            <div style={{width:10,height:10,borderRadius:5,background:P.gnL,animation:"pulse 1.5s infinite",boxShadow:"0 0 8px "+P.gnL}} />
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,letterSpacing:".5px"}}>Welcoming New Cow Owners!!!!</span>
            <div style={{width:10,height:10,borderRadius:5,background:P.gnL,animation:"pulse 1.5s infinite",boxShadow:"0 0 8px "+P.gnL}} />
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40}}>
        <div style={{maxWidth:540}}>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:46,color:P.bw,lineHeight:1.15,marginBottom:20}}>Be a Dairy Farmer<br/><span style={{color:P.gn}}>Without the Farm.</span><br/>Own Cows. Earn Returns.</h1>
          <p style={{color:P.txM,fontSize:17,lineHeight:1.75,marginBottom:36,maxWidth:460}}>Own dairy cows through our secure leasing platform. Receive automated returns deposited directly to your bank — monthly, quarterly, or annually.</p>
          <div style={{display:"flex",gap:10}}>
            <button onClick={function(){onLogin("investor")}} style={{padding:"14px 32px",borderRadius:14,border:"none",background:"linear-gradient(135deg,"+P.gn+","+P.gnL+")",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:"0 8px 32px rgba(61,122,34,.25)"}}>Start Investing <Arr /></button>
            <button onClick={function(){scrollTo("how")}} style={{padding:"14px 32px",borderRadius:14,border:"2px solid "+P.gn+"40",background:"transparent",color:P.gn,fontSize:16,fontWeight:600,fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}>Learn More</button>
          </div>
        </div>
        <div style={{flexShrink:0,textAlign:"center"}}>
          <img src={HERO_IMG} alt="Moo Dairy Farms" style={{width:380,height:260,objectFit:"cover",borderRadius:22,border:"3px solid "+P.gn+"30",boxShadow:"0 20px 60px rgba(0,0,0,.12), 0 0 40px rgba(61,122,34,.08)"}} />
        </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:-1,left:0,right:0}}><svg viewBox="0 0 1440 70" fill="none" style={{width:"100%",display:"block"}}><path d="M0 28L80 24C160 20 320 14 480 18C640 22 800 36 960 40C1120 44 1280 36 1360 32L1440 28V70H0Z" fill={P.meadow}/></svg></div>
    </section>

    <section id="how" style={{padding:"28px 0",background:P.meadow}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:20}}><div style={pill(P.gnP,P.gn)}>The Process</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw,marginBottom:8}}>How Virtual Farming Works</h2><p style={{color:P.txL,fontSize:14,maxWidth:460,margin:"0 auto"}}>From sign-up to your first payout — transparent, automated, secured by real assets.</p></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>{steps.map(function(s,i){return <Reveal key={i} delay={i*70}><div style={{background:P.wh,borderRadius:18,padding:18,border:"1px solid "+P.bd,height:"100%",boxShadow:"0 2px 12px rgba(62,36,16,.04)",transition:"box-shadow .3s"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><div style={{width:48,height:48,borderRadius:14,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s.ic}</div><span style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:P.go+"80"}}>{s.n}</span></div><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:P.bw,marginBottom:8}}>{s.t}</h3><p style={{color:P.txM,fontSize:13,lineHeight:1.7}}>{s.d}</p></div></Reveal>})}</div>
    </div></section>

    <section id="stats" style={{padding:"28px 0",background:P.soil}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:20}}><div style={pill(P.gp,P.gd)}>Live Numbers</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw,marginBottom:8}}>Platform at a Glance</h2><p style={{color:P.txL,fontSize:14,maxWidth:400,margin:"0 auto"}}>Real-time herd and investment metrics across the platform.</p></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:10}}>{[{ref:c1.ref,v:c1.count.toLocaleString(),l:"Total Herd Capacity"},{ref:c2.ref,v:c2.count.toLocaleString(),l:"Farm-Owned Cows"},{ref:c3.ref,v:c3.count.toLocaleString(),l:"Investor-Owned Cows"}].map(function(s,i){return <Reveal key={i} delay={i*90}><div ref={s.ref} style={{background:"#FFFDF8",borderRadius:18,padding:16,border:"1px solid "+P.bd,boxShadow:"0 2px 12px rgba(62,36,16,.05)"}}><div style={{fontFamily:"'DM Serif Display',serif",fontSize:38,color:P.bw,letterSpacing:-1,marginBottom:4}}>{s.v}</div><div style={{fontWeight:700,color:P.wd,fontSize:13}}>{s.l}</div></div></Reveal>})}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[{ref:c4.ref,v:c4.count.toLocaleString(),l:"Active Investors",ic:"👥",g:"linear-gradient(135deg,#4A9CC7,#2E86AB)"},{ref:c5.ref,v:"$"+(c5.count/1e6).toFixed(1)+"M",l:"Returns Paid",ic:"💰",g:"linear-gradient(135deg,"+P.gd+","+P.go+")"}].map(function(s,i){return <Reveal key={i} delay={(i+3)*90}><div ref={s.ref} style={{background:"#FFFDF8",borderRadius:18,padding:16,border:"1px solid "+P.bd,display:"flex",alignItems:"center",gap:20,boxShadow:"0 2px 12px rgba(62,36,16,.05)"}}><div style={{width:64,height:64,borderRadius:16,background:s.g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{s.ic}</div><div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:34,color:P.bw}}>{s.v}</div><div style={{fontWeight:700,color:P.wd,fontSize:13}}>{s.l}</div></div></div></Reveal>})}</div>
    </div></section>

    <section id="returns" style={{padding:"28px 0",background:P.sky}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:20}}><div style={pill(P.gnP,P.gnD)}>Earn More</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw,marginBottom:8}}>Tiered Annual Returns</h2><p style={{color:P.txL,fontSize:14,maxWidth:420,margin:"0 auto"}}>The more you invest, the higher your return rate — up to 8% annually.</p></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>{tiers.map(function(t,i){return <Reveal key={i} delay={i*50}><div style={{position:"relative",borderRadius:18,padding:"18px 12px",textAlign:"center",background:t.pop?"linear-gradient(135deg,"+P.wd+","+P.bw+")":P.wh,color:t.pop?P.gl:P.bw,border:t.pop?"2px solid "+P.go+"50":"1px solid "+P.bd,boxShadow:t.pop?"0 16px 48px "+P.bw+"35":"0 2px 12px rgba(62,36,16,.04)",transform:t.pop?"scale(1.05)":"none"}}>{t.pop&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",padding:"4px 14px",background:"linear-gradient(135deg,"+P.gd+","+P.go+")",color:P.bw,fontSize:10,fontWeight:700,borderRadius:99,whiteSpace:"nowrap",letterSpacing:".05em"}}>Most Popular</div>}<div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".15em",color:t.pop?P.go+"90":P.txL,marginBottom:12}}>{t.l}</div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:42,marginBottom:6}}>{t.p}</div><div style={{fontSize:12,color:t.pop?P.gl+"70":P.txL,marginBottom:14}}>annual return</div><div style={{fontSize:13,fontWeight:600,padding:"8px 14px",borderRadius:10,background:t.pop?P.go+"20":P.gp,color:t.pop?P.go:P.wd}}>{t.r} cows</div></div></Reveal>})}</div>
      <Reveal delay={300}><div style={{textAlign:"center",marginTop:14,display:"flex",justifyContent:"center",gap:24}}>{["Secured by real dairy assets","$5,000 per cow","ACH direct deposit","Stripe payments"].map(function(t,i){return <span key={i} style={{fontSize:12,color:P.txL,display:"flex",alignItems:"center",gap:6}}><span style={{color:P.gn}}>✓</span>{t}</span>})}</div></Reveal>
    </div></section>

    <section id="contact" style={{padding:"28px 0",background:P.meadow,textAlign:"center"}}>
      <Reveal><div style={{maxWidth:520,margin:"0 auto",padding:"0 20px"}}>
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:38,color:P.bw,marginBottom:12}}>Ready to Start Earning?</h2>
        <p style={{color:P.txM,fontSize:16,lineHeight:1.65,marginBottom:20}}>Join hundreds of investors earning automated returns from real dairy assets. Create your account in minutes.</p>
        <div style={{display:"flex",justifyContent:"center",gap:10}}>
          <button onClick={function(){onLogin("investor")}} style={{padding:"14px 36px",borderRadius:14,border:"none",background:"linear-gradient(135deg,"+P.gn+","+P.gnL+")",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:10,boxShadow:"0 6px 24px rgba(61,122,34,.2)"}}>Create Account <Arr /></button>
          <button onClick={function(){scrollTo("faq")}} style={{padding:"14px 36px",borderRadius:14,border:"2px solid "+P.gn+"30",background:"transparent",color:P.gn,fontSize:16,fontWeight:600,fontFamily:"'Outfit',sans-serif",cursor:"pointer"}}>Read FAQ</button>
        </div>
      </div></Reveal>
    </section>

    <section id="faq" style={{padding:"28px 0",background:P.barn}}><div style={ctn}>
      <Reveal><div style={{textAlign:"center",marginBottom:20}}><div style={pill(P.gnP,P.gn)}>Got Questions?</div><h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:P.bw,marginBottom:8}}>Frequently Asked Questions</h2><p style={{color:P.txL,fontSize:14,maxWidth:480,margin:"0 auto"}}>Everything you need to know about investing in Moo Dairy Farms.</p></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {faqs.map(function(f,i){var op=faqI===i;return <Reveal key={i} delay={i*40}><div onClick={function(){setFaqI(op?null:i)}} style={{cursor:"pointer",background:op?"linear-gradient(135deg,#E8F0DA,#EDF4F8)":"#FFFDF8",borderRadius:18,padding:"14px 18px",border:op?"2px solid "+P.gn+"40":"1px solid "+P.bd,boxShadow:op?"0 6px 24px rgba(61,122,34,.08)":"0 2px 8px rgba(62,36,16,.03)",transition:"all .3s",height:"100%",display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:op?14:0}}>
            <div style={{width:36,height:36,borderRadius:10,background:op?P.gnP:P.soil,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}><span style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:op?P.gn:P.txL}}>{"0"+(i+1)}</span></div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <span style={{fontWeight:600,color:P.bw,fontSize:14,lineHeight:1.4}}>{f.q}</span>
                <Chev size={14} style={{color:op?P.gn:P.txL,flexShrink:0,transition:"transform .3s",transform:op?"rotate(180deg)":"rotate(0)"}} />
              </div>
              <div style={{maxHeight:op?200:0,overflow:"hidden",transition:"max-height .4s ease"}}><p style={{color:P.txM,fontSize:13,lineHeight:1.7,marginTop:10,paddingTop:10,borderTop:"1px solid "+P.gn+"15"}}>{f.a}</p></div>
            </div>
          </div>
        </div></Reveal>})}
      </div>
      <Reveal delay={300}><div style={{textAlign:"center",marginTop:14}}><p style={{color:P.txL,fontSize:13}}>Still have questions? <button onClick={function(){scrollTo("contact")}} style={{color:P.gn,fontWeight:600,border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:13,textDecoration:"underline"}}>Contact our team</button></p></div></Reveal>
    </div></section>

    <footer style={{background:"#DDE8D6",color:P.bw,padding:"20px 0 10px"}}><div style={ctn}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,borderBottom:"1px solid #C5D4BC"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><img src={LOGO} alt="" style={{height:48,borderRadius:6}} /><p style={{color:P.txM,fontSize:13,maxWidth:280,lineHeight:1.6}}>Connecting investors with real dairy farm assets. Secure, automated, transparent returns.</p></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:13,color:P.bw,marginBottom:6,fontWeight:600}}>invest@moodairyfarms.com</div><div style={{fontSize:13,color:P.bw,fontWeight:600}}>+1 (806) 555-0187</div><div style={{fontSize:11,color:P.txL,marginTop:4}}>4521 Ranch Rd, Amarillo, TX 79101</div></div>
      </div>
      <div style={{paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{color:P.txL,fontSize:11}}>© 2026 Moo Dairy Farms. All rights reserved.</span><div style={{display:"flex",gap:8}}>{["Privacy Policy","Terms of Service","Security"].map(function(l,i){return <span key={i} style={{color:P.txM,fontSize:11,cursor:"pointer"}}>{l}</span>})}</div></div>
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
      <div style={{padding:"0 18px",marginBottom:20}}><img src={LOGO} alt="" style={{height:36,borderRadius:4}} /><div style={{color:P.gl+"60",fontSize:9,fontWeight:700,letterSpacing:".1em",marginTop:6}}>INVESTOR PORTAL</div></div>
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
      {pg==="docs" && <div style={{display:"flex",flexDirection:"column",gap:8}}>{[{n:"Lease - Batch #1 (100 cows)",d:"2024-03-25"},{n:"Lease - Batch #2 (50 cows)",d:"2024-08-12"},{n:"Return Schedule 2025",d:"2025-01-05"}].map(function(d,i){return <div key={i} style={{background:P.cd,borderRadius:12,padding:"16px 20px",border:"1px solid "+P.bd,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>📄</span><div><div style={{fontWeight:600,color:P.bw,fontSize:12}}>{d.n}</div><div style={{color:P.txL,fontSize:10}}>{d.d}</div></div></div><Badge color="success">Signed</Badge></div>})}</div>}
    </div>
    <Modal open={showBuy} onClose={function(){setShowBuy(false)}} title={step===0?"Purchase Cows":step===1?"Link Bank":"Confirm"}>
      {step===0 && <><FormInput label="Number of Cows" type="number" value={qty} onChange={function(v){setQty(Math.max(1,parseInt(v)||1))}} /><div style={{background:P.gp,borderRadius:10,padding:16,marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:P.txL}}>Price/cow</span><span style={{fontWeight:600}}>$5,000</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:P.txL}}>Qty</span><span style={{fontWeight:600}}>{qty}</span></div><div style={{borderTop:"1px solid "+P.bd,paddingTop:4,display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700}}>Total</span><span style={{fontWeight:700,color:P.gn,fontSize:16}}>{"$"+(qty*5000).toLocaleString()}</span></div><div style={{marginTop:8,background:P.wh,borderRadius:6,padding:"4px 8px",fontSize:11}}><b style={{color:P.gd}}>Tier: {tier.rate}%</b></div></div><Btn v="primary" onClick={function(){setStep(1)}} style={{width:"100%"}}>Continue</Btn></>}
      {step===1 && <div style={{border:"2px dashed "+P.bd,borderRadius:12,padding:16,textAlign:"center",marginBottom:14}}><div style={{fontSize:32,marginBottom:4}}>🏦</div><div style={{fontWeight:600,color:P.bw,fontSize:13,marginBottom:8}}>Plaid Bank Link</div><Btn v="outline" onClick={function(){setStep(2)}}>Link Bank (Demo)</Btn></div>}
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
      <div style={{padding:"0 18px",marginBottom:20}}><img src={LOGO} alt="" style={{height:36,borderRadius:4}} /><div style={{color:P.go,fontSize:9,fontWeight:700,letterSpacing:".1em",marginTop:6}}>ADMIN CONSOLE</div></div>
      <nav style={{flex:1}}>{nav.map(function(n){return <button key={n.id} onClick={function(){setPg(n.id)}} style={{width:"100%",padding:"10px 18px",border:"none",background:pg===n.id?"rgba(255,255,255,.07)":"transparent",color:pg===n.id?"#fff":"rgba(255,255,255,.35)",fontSize:12,fontWeight:500,fontFamily:"'Outfit',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderLeft:pg===n.id?"3px solid "+P.go:"3px solid transparent"}}><span>{n.ic}</span>{n.l}{n.id==="dashboard"&&<span style={{marginLeft:"auto",background:P.rd,color:"#fff",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:8}}>2</span>}</button>})}</nav>
      <div style={{padding:"0 18px",borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:12}}><div style={{color:"#fff",fontSize:12,fontWeight:600}}>Admin</div><div style={{color:"rgba(255,255,255,.3)",fontSize:10}}>admin@moodairy.com</div><button onClick={props.onLogout} style={{marginTop:8,color:"rgba(255,255,255,.35)",fontSize:12,border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>← Home</button></div>
    </div>
    <div style={{flex:1,padding:"24px 32px",overflowY:"auto"}}>
      {pg==="dashboard" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Admin Dashboard</h1><div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}><Stat label="Investors" value={INVESTORS.filter(function(i){return i.status==="active"}).length} sub="1 pending" icon="👥" /><Stat label="Leased" value={COWS.filter(function(c){return c.status==="leased"}).length} sub={"of "+COWS.length} icon="🐄" /><Stat label="AUM" value="$5.9M" icon="💵" /><Stat label="Due" value={PAYOUTS.filter(function(p){return p.status==="scheduled"}).length} icon="📅" /></div><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:P.bw,marginBottom:12}}>Task Queue</h3><div style={{display:"flex",flexDirection:"column",gap:6}}>{TASKS.map(function(t){return <div key={t.id} style={{background:P.cd,borderRadius:12,padding:"12px 16px",border:"1px solid "+P.bd,borderLeft:t.status==="action_needed"?"4px solid "+P.ng:"4px solid "+P.ok,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:16}}>{t.type==="purchase"?"🛒":t.type==="payout_fail"?"⚠️":"✅"}</span><div><div style={{fontWeight:600,fontSize:12,color:P.bw}}>{t.desc}</div><div style={{fontSize:10,color:P.txL}}>{t.time}</div></div></div>{t.status==="action_needed"?<Btn v="danger" sz="sm">Action</Btn>:<Badge color="success">Done</Badge>}</div>})}</div></>}
      {pg==="investors" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Investors</h1><DataTable columns={[{key:"id",label:"ID"},{key:"name",label:"Name",render:function(v){return <b>{v}</b>}},{key:"cows",label:"Cows"},{key:"invested",label:"Invested",render:function(v){return v>0?"$"+v.toLocaleString():"-"}},{key:"returnRate",label:"Rate",render:function(v){return v>0?v+"%":"-"}},{key:"schedule",label:"Schedule"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="active"?"success":"warning"}>{v}</Badge>}},{key:"docStatus",label:"",render:function(_,row){return <Btn v="ghost" sz="sm" onClick={function(){setSelInv(row);setShowMeta(true)}}>⚙️</Btn>}}]} data={INVESTORS} /></>}
      {pg==="cows" && <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:0}}>Cow Data</h1><Btn v="accent" onClick={function(){setShowUp(true);setUpProg(null)}}>📤 Upload XLS</Btn></div><input value={cowQ} onChange={function(e){setCowQ(e.target.value)}} placeholder="Search..." style={{width:260,padding:"8px 12px",borderRadius:8,border:"1.5px solid "+P.bd,fontSize:12,fontFamily:"'Outfit',sans-serif",marginBottom:14}} /><DataTable columns={[{key:"id",label:"ID"},{key:"eid",label:"EID"},{key:"breed",label:"Breed"},{key:"dob",label:"DOB"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="available"?"success":"info"}>{v}</Badge>}},{key:"assignedTo",label:"Investor",render:function(v){return v||"-"}}]} data={fCows} /></>}
      {pg==="payouts" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Payouts</h1><div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}><Stat label="Done" value={PAYOUTS.filter(function(p){return p.status==="completed"}).length} icon="✅" /><Stat label="Scheduled" value={PAYOUTS.filter(function(p){return p.status==="scheduled"}).length} icon="📅" /><Stat label="Failed" value={PAYOUTS.filter(function(p){return p.status==="failed"}).length} icon="⚠️" /></div><DataTable columns={[{key:"id",label:"ID"},{key:"investor",label:"Investor",render:function(v){return <b>{v}</b>}},{key:"amount",label:"Amount",render:function(v){return "$"+v.toLocaleString()}},{key:"date",label:"Date"},{key:"status",label:"Status",render:function(v){return <Badge color={v==="completed"?"success":v==="failed"?"danger":"warning"}>{v}</Badge>}},{key:"method",label:"",render:function(_,row){return row.status==="failed"?<Btn v="danger" sz="sm" onClick={function(){alert("Retrying...")}}>Retry</Btn>:null}}]} data={PAYOUTS} /></>}
      {pg==="docs" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Documents</h1><div style={{background:P.cd,borderRadius:12,padding:"16px 20px",border:"1px solid "+P.bd,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:18}}>📄</span><div><div style={{fontWeight:600,color:P.bw,fontSize:13}}>Cow Lease Agreement v3.2</div><div style={{color:P.txL,fontSize:10}}>Active template</div></div></div><Badge color="accent">Active</Badge></div><DataTable columns={[{key:"inv",label:"Investor"},{key:"doc",label:"Document"},{key:"date",label:"Date"},{key:"st",label:"Status",render:function(v){return <Badge color={v==="Signed"?"success":"warning"}>{v}</Badge>}}]} data={[{inv:"Sarah Mitchell",doc:"Lease - 25 cows",date:"2024-06-20",st:"Signed"},{inv:"James Chen",doc:"Lease - 150 cows",date:"2024-03-25",st:"Signed"},{inv:"Emily Johnson",doc:"Pending",date:"-",st:"Pending"}]} /></>}
      {pg==="settings" && <><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:P.bw,margin:"0 0 20px"}}>Settings</h1><div style={{background:P.cd,borderRadius:14,padding:20,border:"1px solid "+P.bd,marginBottom:10}}><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:P.bw,marginBottom:12}}>Return Tiers</h3><DataTable columns={[{key:"min",label:"Min"},{key:"max",label:"Max",render:function(v){return v.toLocaleString()}},{key:"rate",label:"Rate",render:function(v){return <b style={{color:P.gn}}>{v}%</b>}}]} data={TIERS} /></div><div style={{background:P.cd,borderRadius:14,padding:20,border:"1px solid "+P.bd}}><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:P.bw,marginBottom:12}}>Integrations</h3>{[{n:"Stripe",d:"Payments"},{n:"Plaid",d:"Bank linking"},{n:"BoA ACH",d:"Payouts"},{n:"DocuSign",d:"E-signatures"}].map(function(s,i){return <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?"1px solid "+P.bd:"none"}}><div><div style={{fontWeight:600,color:P.bw,fontSize:12}}>{s.n}</div><div style={{color:P.txL,fontSize:10}}>{s.d}</div></div><Badge color="success">Connected</Badge></div>})}</div></>}
    </div>
    <Modal open={showMeta} onClose={function(){setShowMeta(false)}} title="Configure Investor" wide>{selInv && <><div style={{display:"flex",gap:14,marginBottom:10}}><div style={{flex:1,background:P.cr,borderRadius:10,padding:14}}><div style={{fontSize:9,color:P.txL,textTransform:"uppercase",marginBottom:4}}>Investor</div><div style={{fontWeight:700,fontSize:13,color:P.bw}}>{selInv.name}</div><div style={{color:P.txL,fontSize:11}}>{selInv.email}</div></div><div style={{flex:1,background:P.cr,borderRadius:10,padding:14}}><div style={{fontSize:9,color:P.txL,textTransform:"uppercase",marginBottom:4}}>Investment</div><div style={{fontWeight:700,fontSize:13,color:P.bw}}>{selInv.cows} cows</div><div style={{color:P.txL,fontSize:11}}>{"$"+selInv.invested.toLocaleString()}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FormInput label="Return Rate (%)" type="number" value={selInv.returnRate||""} onChange={function(){}} /><FormInput label="Schedule" options={["Monthly","Quarterly","Semi-annually","Annually"]} value={sch} onChange={setSch} /></div><FormInput label="Assign Cows (EIDs)" placeholder="COW-0001, COW-0002..." value="" onChange={function(){}} /><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn v="outline" onClick={function(){setShowMeta(false)}}>Cancel</Btn><Btn v="primary" onClick={function(){setShowMeta(false);alert("Saved!")}}>Save</Btn></div></>}</Modal>
    <Modal open={showUp} onClose={function(){setShowUp(false)}} title="Upload Cow Data"><div style={{border:"2px dashed "+P.bd,borderRadius:12,padding:18,textAlign:"center",marginBottom:14}}><div style={{fontSize:32,marginBottom:4}}>📄</div><div style={{fontWeight:600,color:P.bw,fontSize:13,marginBottom:8}}>Drop XLS here</div><Btn v="outline" onClick={simUp}>Select File (Demo)</Btn></div>{upProg!==null&&<div><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,fontWeight:600}}>{upProg>=100?"Done!":"Uploading..."}</span><span style={{fontSize:11,color:P.txL}}>{Math.min(100,Math.round(upProg))}%</span></div><div style={{height:5,background:P.bd,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:Math.min(100,upProg)+"%",background:upProg>=100?P.ok:P.gn,borderRadius:3,transition:"width .3s"}} /></div>{upProg>=100&&<div style={{marginTop:8,background:P.okB,borderRadius:8,padding:10,fontSize:11,color:P.ok}}><b>Success!</b> 847 records written.</div>}</div>}</Modal>
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

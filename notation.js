/* Notation data (Stallings, "Notation", pp. 10–11) + the per-unit notation note.
   Used by notation.html (full table) and by every unitN.html (floating note).
   To add a unit: list the ids of the symbols it uses in UNIT_USES, then include
   <script src="notation.js" data-unit="N" defer></script> before </body>. */
(function(){
"use strict";

/* g = group, sym = symbol column, ex = expression column, m = meaning, home = unit that explains it */
var GROUPS={keys:"Encryption & keys",fields:"Fields & sets",nt:"Number theory",ops:"Operators & relations"};
var BIG=function(op,lo,up){return '<span class="nt-big"><span class="nt-up">'+up+'</span><span class="nt-bop">'+op+'</span><span class="nt-lo">'+lo+'</span></span>'};
var NOTATION=[
  {id:"dK",  g:"keys", sym:"D, K",   ex:"D(K, Y)", m:"Symmetric decryption of ciphertext Y using secret key K", home:3},
  {id:"dPR", g:"keys", sym:"D, PR<sub>a</sub>", ex:"D(PR<sub>a</sub>, Y)", m:"Asymmetric decryption of ciphertext Y using A’s private key PR<sub>a</sub>", home:6},
  {id:"dPU", g:"keys", sym:"D, PU<sub>a</sub>", ex:"D(PU<sub>a</sub>, Y)", m:"Asymmetric decryption of ciphertext Y using A’s public key PU<sub>a</sub>", home:6},
  {id:"eK",  g:"keys", sym:"E, K",   ex:"E(K, X)", m:"Symmetric encryption of plaintext X using secret key K", home:3},
  {id:"ePR", g:"keys", sym:"E, PR<sub>a</sub>", ex:"E(PR<sub>a</sub>, X)", m:"Asymmetric encryption of plaintext X using A’s private key PR<sub>a</sub>", home:6},
  {id:"ePU", g:"keys", sym:"E, PU<sub>a</sub>", ex:"E(PU<sub>a</sub>, X)", m:"Asymmetric encryption of plaintext X using A’s public key PU<sub>a</sub>", home:6},
  {id:"K",   g:"keys", sym:"K",      ex:"",        m:"Secret key", home:3},
  {id:"PR",  g:"keys", sym:"PR<sub>a</sub>", ex:"", m:"Private key of user A", home:6},
  {id:"PU",  g:"keys", sym:"PU<sub>a</sub>", ex:"", m:"Public key of user A", home:6},
  {id:"mac", g:"keys", sym:"MAC, K", ex:"MAC(K, X)", m:"Message authentication code of message X using secret key K", home:7},

  {id:"gfp",k:"galois field prime", g:"fields", sym:"GF(p)", ex:"", m:"The finite field of order p, where p is prime. The field is defined as the set Z<sub>p</sub> together with the arithmetic operations modulo p.", home:4},
  {id:"gf2n",k:"galois field binary",g:"fields", sym:"GF(2<sup>n</sup>)", ex:"", m:"The finite field of order 2<sup>n</sup>", home:4},
  {id:"zn",  g:"fields", sym:"Z<sub>n</sub>", ex:"", m:"Set of nonnegative integers less than n", home:2},

  {id:"gcd", g:"nt", sym:"gcd", ex:"gcd(i, j)", m:"Greatest common divisor; the largest positive integer that divides both i and j with no remainder on division.", home:2},
  {id:"mod", g:"nt", sym:"mod", ex:"a mod m", m:"Remainder after division of a by m", home:2},
  {id:"cong",k:"congruent congruence",g:"nt", sym:"mod, ≡", ex:"a ≡ b (mod m)", m:"a mod m = b mod m", home:2},
  {id:"ncong",k:"not congruent",g:"nt",sym:"mod, ≢", ex:"a ≢ b (mod m)", m:"a mod m ≠ b mod m", home:2},
  {id:"dlog",k:"discrete logarithm",g:"nt", sym:"dlog", ex:"dlog<sub>a,p</sub>(b)", m:"Discrete logarithm of the number b for the base a (mod p)", home:2},
  {id:"phi",k:"phi totient", g:"nt", sym:"φ", ex:"φ(n)", m:"The number of positive integers less than n and relatively prime to n. This is Euler’s totient function.", home:2},
  {id:"div",k:"divides divisor", g:"nt", sym:"|", ex:"i | j", m:"i divides j, which means that there is no remainder when j is divided by i", home:2},
  {id:"abs",k:"absolute value", g:"nt", sym:"| , |", ex:"|a|", m:"Absolute value of a", home:2},

  {id:"sum",k:"sum summation sigma", g:"ops", sym:"∑", ex:BIG("∑","i=1","n")+"a<sub>i</sub>", m:"a<sub>1</sub> + a<sub>2</sub> + … + a<sub>n</sub>", home:null},
  {id:"prod",k:"product pi",g:"ops", sym:"∏", ex:BIG("∏","i=1","n")+"a<sub>i</sub>", m:"a<sub>1</sub> × a<sub>2</sub> × … × a<sub>n</sub>", home:null},
  {id:"cat",k:"concatenation concatenate", g:"ops", sym:"‖", ex:"x ‖ y", m:"x concatenated with y", home:null},
  {id:"approx",g:"ops",sym:"≈", ex:"x ≈ y", m:"x is approximately equal to y", home:null},
  {id:"xor",k:"xor", g:"ops", sym:"⊕", ex:"x ⊕ y", m:"Exclusive-OR of x and y for single-bit variables; bitwise exclusive-OR of x and y for multiple-bit variables", home:null},
  {id:"floor",k:"floor",g:"ops",sym:"⌊ , ⌋", ex:"⌊x⌋", m:"The largest integer less than or equal to x", home:null},
  {id:"in",k:"element member set",  g:"ops", sym:"∈", ex:"x ∈ S", m:"The element x is contained in the set S.", home:null},
  {id:"crt",k:"chinese remainder theorem crt", g:"ops", sym:"↔", ex:"A ↔ (a<sub>1</sub>, a<sub>2</sub>, …, a<sub>k</sub>)", m:"The integer A corresponds to the sequence of integers (a<sub>1</sub>, a<sub>2</sub>, …, a<sub>k</sub>)", home:2}
];

/* Symbols each unit uses, in the meaning the table gives them. Units not listed use none. */
var UNIT_USES={
  1:[],
  2:["zn","gcd","mod","cong","ncong","dlog","phi","div","abs","prod","approx","floor","in","crt"],
  3:["dK","eK","K","gcd","mod","cong","cat","approx","xor","in"],
  4:["gfp","gf2n","zn","gcd","mod","cong","div","sum","xor","floor"],
  5:["dK","eK","K","gf2n","mod","cong","sum","cat","approx","xor","floor"],
  6:["eK","dPR","dPU","ePR","ePU","K","PR","PU","gfp","gf2n","zn","gcd","mod","cong","dlog","phi","prod","cat","approx","xor","floor","in"],
  7:["dK","eK","ePR","ePU","K","PR","PU","mac","gf2n","mod","cong","cat","approx","xor"]
};
var UNIT_TITLES={1:"Security Foundations",2:"Number Theory",3:"Classical Ciphers & DES",4:"Finite Fields & AES",5:"Using Symmetric Ciphers",6:"Public-Key Cryptography",7:"Hashes & MACs",8:"Digital Signatures",9:"Key Management & Authentication",10:"Access Control & Wireless",11:"Protocol-Layer Security",12:"Email Security"};

function usedIn(id){var r=[];for(var u in UNIT_USES){if(UNIT_USES[u].indexOf(id)>=0)r.push(+u)}return r.sort(function(a,b){return a-b})}
window.STALLINGS_NOTATION={list:NOTATION,groups:GROUPS,uses:UNIT_USES,titles:UNIT_TITLES,usedIn:usedIn};

/* ---------- Floating note on unit pages ---------- */
var me=document.currentScript;
var unit=me&&me.getAttribute("data-unit");
if(!unit)return;
unit=+unit;

/* Same mono stack as the host page (each unit's stack has Noto Sans Math as the symbol fallback) */
var MATH='var(--mono,var(--f-mono,"Noto Sans Mono","Noto Sans Math",monospace))';
var css=[
'.nt-launch{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:40;width:56px;height:56px;border-radius:50%;border:0;padding:0;cursor:pointer;display:grid;place-items:center;background:var(--accent);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.22),0 2px 6px rgba(0,0,0,.12);transition:transform .18s ease,box-shadow .18s ease}',
'.nt-launch:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.26),0 3px 8px rgba(0,0,0,.14)}',
'.nt-launch:focus-visible{outline:2px solid var(--ink);outline-offset:3px}',
'.nt-launch .nt-ic{grid-area:1/1;font-family:'+MATH+';font-size:26px;line-height:1;transition:opacity .18s,transform .18s}',
'.nt-launch .nt-x{opacity:0;transform:rotate(-90deg) scale(.6);font-size:30px}',
'.nt-launch[aria-expanded="true"] .nt-sig{opacity:0;transform:rotate(90deg) scale(.6)}',
'.nt-launch[aria-expanded="true"] .nt-x{opacity:1;transform:none}',
'.nt-badge{position:absolute;top:-3px;right:-3px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--surface,var(--paper,#fff));color:var(--accent);border:2px solid var(--accent);font:700 11px/18px '+MATH+';text-align:center;transition:opacity .18s}',
'.nt-launch[aria-expanded="true"] .nt-badge{opacity:0}',
'.to-top{bottom:calc(84px + env(safe-area-inset-bottom,0px))!important}',
'.nt-note{--nt-bg:#FFF3B8;--nt-head:#FBE58A;--nt-ink:#2E2A16;--nt-mut:#6F6640;--nt-rule:rgba(120,98,20,.16);--nt-tape:rgba(255,255,255,.55);',
'  position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:41;width:min(380px,calc(100vw - 32px));max-height:min(68vh,580px);display:flex;flex-direction:column;',
'  background:var(--nt-bg);color:var(--nt-ink);border-radius:4px 4px 14px 4px;box-shadow:0 18px 40px rgba(0,0,0,.24),0 3px 10px rgba(0,0,0,.12);',
'  font-family:var(--body,var(--f-body,system-ui));transform-origin:calc(100% - 28px) calc(100% + 40px);opacity:0;visibility:hidden;transform:translateY(12px) scale(.94);transition:opacity .2s ease,transform .2s ease,visibility 0s linear .2s}',
'.nt-note.open{opacity:1;visibility:visible;transform:none;transition:opacity .2s ease,transform .2s ease}',
'.nt-note::before{content:"";position:absolute;top:-10px;left:50%;width:96px;height:22px;margin-left:-48px;background:var(--nt-tape);transform:rotate(-2deg);box-shadow:0 1px 2px rgba(0,0,0,.08);border-radius:2px}',
'.nt-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 14px 10px 18px;background:var(--nt-head);border-radius:4px 4px 0 0}',
'.nt-hd h2{display:block;margin:0;letter-spacing:normal;text-transform:none;font-family:var(--display,var(--f-display,inherit));font-size:1.02rem;font-weight:700;line-height:1.2;color:var(--nt-ink);outline:none}',
'.nt-hd .nt-k{display:block;font-family:'+MATH+';font-size:.7rem;font-weight:400;letter-spacing:.06em;text-transform:uppercase;color:var(--nt-mut);margin-bottom:2px}',
'.nt-close{flex:0 0 auto;width:30px;height:30px;border-radius:50%;border:1px solid transparent;background:transparent;color:var(--nt-ink);font:22px/1 '+MATH+';cursor:pointer;display:grid;place-items:center}',
'.nt-close:hover{background:rgba(0,0,0,.07)}',
'.nt-close:focus-visible{outline:2px solid var(--nt-ink);outline-offset:1px}',
'.nt-bd{flex:1 1 auto;min-height:168px;overflow:auto;overscroll-behavior:contain;padding:0 18px 0;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 23px,var(--nt-rule) 23px,var(--nt-rule) 24px);background-attachment:local;line-height:24px;font-size:13.5px}',
'.nt-list{margin:0;padding:0}',
'.nt-g{font-family:'+MATH+';font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--nt-mut);height:24px;padding-top:2px}',
'.nt-row{display:grid;grid-template-columns:minmax(6.6em,auto) minmax(0,1fr);column-gap:14px}',
'.nt-row .nt-ex{font-family:'+MATH+';font-size:13px;white-space:nowrap;font-variant-numeric:normal}',
'.nt-row .nt-m{color:var(--nt-ink)}',
'.nt-note sub,.nt-note sup{font-size:.72em;line-height:0}',
'.nt-big{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin-right:1px}',
'.nt-big .nt-bop{font-size:1.2em}.nt-big .nt-up,.nt-big .nt-lo{font-size:.62em}',
'.nt-row .nt-ex .nt-big{line-height:.78}',
'.nt-ft{padding:9px 18px 12px;border-top:1px dashed var(--nt-rule);font-size:.8rem;display:flex;justify-content:space-between;align-items:center;gap:10px}',
'.nt-ft a{color:var(--nt-ink);font-weight:700;text-decoration:none;border-bottom:1px solid currentColor}',
'.nt-ft a:hover{opacity:.75}',
'.nt-ft span{font-family:'+MATH+';font-size:.72rem;color:var(--nt-mut)}',
'@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .nt-note{--nt-bg:#3A3420;--nt-head:#4A4224;--nt-ink:#F1EAD0;--nt-mut:#BFB38A;--nt-rule:rgba(255,240,190,.09);--nt-tape:rgba(255,255,255,.14)}}',
':root[data-theme="dark"] .nt-note{--nt-bg:#3A3420;--nt-head:#4A4224;--nt-ink:#F1EAD0;--nt-mut:#BFB38A;--nt-rule:rgba(255,240,190,.09);--nt-tape:rgba(255,255,255,.14)}',
'@media (max-width:520px){.nt-note{bottom:calc(80px + env(safe-area-inset-bottom,0px));max-height:62vh}}',
'@media (prefers-reduced-motion:reduce){.nt-note,.nt-launch,.nt-launch .nt-ic{transition:none}}',
'@media print{.nt-launch,.nt-note{display:none!important}}'
].join("\n");

function build(){
  var st=document.createElement("style");st.id="nt-style";st.textContent=css;document.head.appendChild(st);

  var ids=UNIT_USES[unit]||[];
  var byId={};NOTATION.forEach(function(n){byId[n.id]=n});
  var rows="",lastG=null;
  NOTATION.forEach(function(n){
    if(ids.indexOf(n.id)<0)return;
    if(n.g!==lastG){rows+='<div class="nt-g" aria-hidden="false">'+GROUPS[n.g]+'</div>';lastG=n.g}
    rows+='<div class="nt-row" role="listitem"><span class="nt-ex">'+(n.ex||n.sym)+'</span><span class="nt-m">'+n.m+'</span></div>';
  });

  var btn=document.createElement("button");
  btn.type="button";btn.className="nt-launch";btn.id="nt-launch";
  btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls","nt-note");
  btn.setAttribute("aria-label","Notation used in this unit");btn.title="Notation used in this unit";
  btn.innerHTML='<span class="nt-ic nt-sig" aria-hidden="true">∑</span><span class="nt-ic nt-x" aria-hidden="true">×</span>'+
    (ids.length?'<span class="nt-badge" aria-hidden="true">'+ids.length+'</span>':'');

  var note=document.createElement("div");
  note.className="nt-note";note.id="nt-note";note.setAttribute("role","dialog");note.setAttribute("aria-modal","false");
  note.setAttribute("aria-labelledby","nt-title");note.hidden=false;
  note.innerHTML='<div class="nt-hd"><h2 id="nt-title" tabindex="-1"><span class="nt-k">Notation</span>Unit '+unit+' · '+(UNIT_TITLES[unit]||"")+'</h2>'+
    '<button type="button" class="nt-close" aria-label="Close notation note">×</button></div>'+
    '<div class="nt-bd"><div class="nt-list" role="list">'+rows+'</div></div>'+
    '<div class="nt-ft"><a href="notation.html">Full notation table →</a><span>Esc to close</span></div>';

  document.body.appendChild(note);document.body.appendChild(btn);
  note.setAttribute("aria-hidden","true");note.inert=true;

  function setOpen(o,focusBack){
    note.classList.toggle("open",o);btn.setAttribute("aria-expanded",String(o));
    note.setAttribute("aria-hidden",String(!o));note.inert=!o;
    if(o){note.querySelector("#nt-title").focus({preventScroll:true})}
    else if(focusBack){btn.focus({preventScroll:true})}
  }
  btn.addEventListener("click",function(){setOpen(btn.getAttribute("aria-expanded")!=="true",false)});
  note.querySelector(".nt-close").addEventListener("click",function(){setOpen(false,true)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&note.classList.contains("open"))setOpen(false,true)});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build);else build();
})();

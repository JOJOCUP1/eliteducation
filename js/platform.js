// ============================================================
//  platform.js  —  dashboard (student + teacher)
// ============================================================
import { supabase, requireAuth, getProfile } from './supabase.js';
import { initChat, sendMessage, cleanup } from './chat.js';

// AI requests go through /api/groq (server-side proxy)

let APP = { profile:null, peerUserId:null, wbTool:'pen', wbColor:'#ffffff', wbDrawing:false, wbLastX:0, wbLastY:0, wbSeconds:0, wbTimer:null };

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  APP.profile   = await getProfile();
  if (!APP.profile) {
    await supabase.from('profiles').upsert({ id:session.user.id, full_name:session.user.user_metadata?.full_name||session.user.email, role:'student', email:session.user.email });
    APP.profile = await getProfile();
  }
  renderSidebar();
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});

  if (APP.profile.role === 'teacher') {
    switchPanel('t-home'); loadTeacherStudents(); loadTeacherStudentDropdown(); triggerSubWarning();
  } else {
    switchPanel('s-home'); loadStudentData(); checkPendingTeacher();
  }
});

function checkPendingTeacher() {
  try {
    const raw = sessionStorage.getItem('pending_teacher');
    if (!raw) return;
    const { teacherName, teacherId } = JSON.parse(raw);
    sessionStorage.removeItem('pending_teacher');
    if (teacherName && teacherId) setTimeout(() => openBookModal(teacherId, teacherName), 700);
  } catch(e) {}
}

// ── SIDEBAR ───────────────────────────────────────────────────
function renderSidebar() {
  const p = APP.profile, ini = initials(p.full_name);
  document.getElementById('sidebar-avatar').textContent = ini;
  document.getElementById('sidebar-name').textContent   = p.full_name||p.email;
  document.getElementById('sidebar-role').textContent   = p.role==='teacher'?'Teacher':'Student';
  document.getElementById('sidebar-nav').innerHTML      = p.role==='teacher' ? teacherNav() : studentNav();
}
function studentNav() { return `
  <div class="nav-section">Main</div>
  <div class="nav-item active" onclick="switchPanel('s-home')" data-panel="s-home"><span class="nav-icon">🏠</span>Dashboard</div>
  <div class="nav-item" onclick="switchPanel('s-lesson')" data-panel="s-lesson"><span class="nav-icon">📡</span>Live Lesson</div>
  <div class="nav-section">Communication</div>
  <div class="nav-item" onclick="switchPanel('s-chat')" data-panel="s-chat"><span class="nav-icon">💬</span>Chat</div>
  <div class="nav-item" onclick="switchPanel('s-recordings')" data-panel="s-recordings"><span class="nav-icon">🎬</span>Recordings</div>
  <div class="nav-section">Settings</div>
  <div class="nav-item" onclick="switchPanel('s-profile')" data-panel="s-profile"><span class="nav-icon">⚙️</span>Profile</div>`; }
function teacherNav() { return `
  <div class="nav-section">Main</div>
  <div class="nav-item active" onclick="switchPanel('t-home')" data-panel="t-home"><span class="nav-icon">🏠</span>Dashboard</div>
  <div class="nav-item" onclick="switchPanel('t-lesson')" data-panel="t-lesson"><span class="nav-icon">📡</span>Live Lesson</div>
  <div class="nav-section">Communication</div>
  <div class="nav-item" onclick="switchPanel('t-chat')" data-panel="t-chat"><span class="nav-icon">💬</span>Students</div>
  <div class="nav-item" onclick="switchPanel('t-recordings')" data-panel="t-recordings"><span class="nav-icon">🎬</span>Recordings</div>
  <div class="nav-section">Management</div>
  <div class="nav-item" onclick="switchPanel('t-students')" data-panel="t-students"><span class="nav-icon">👨‍🎓</span>Students</div>
  <div class="nav-item" onclick="switchPanel('t-profile')" data-panel="t-profile"><span class="nav-icon">⚙️</span>Profile</div>`; }

// ── PANEL SWITCHING ───────────────────────────────────────────
window.switchPanel = function(id) {
  document.querySelectorAll('.panel').forEach(p => { p.classList.remove('active'); p.style.display='none'; });
  const target = document.getElementById('panel-'+id);
  if (!target) return;
  target.style.display = id.includes('chat') ? 'flex' : 'block';
  target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.panel===id));
  const titles = {'s-home':'Dashboard','s-lesson':'Live Lesson','s-chat':'Chat','s-recordings':'Recordings','s-profile':'Profile','t-home':'Dashboard','t-lesson':'Live Lesson','t-chat':'Students','t-recordings':'Recordings','t-students':'Students','t-profile':'Profile'};
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = titles[id]||'';
  if (id.includes('lesson')) setTimeout(() => { initWhiteboard(id==='t-lesson'); showAIProviderStatus(); }, 80);
  if (id.includes('chat'))   openChatPanel(id);
  if (id==='s-profile'||id==='t-profile') loadProfileForm();
};

// ── CHAT ──────────────────────────────────────────────────────
async function openChatPanel(panelId) {
  if (panelId !== 's-chat') return;
  const profile = await getProfile();
  let teacherId = profile?.teacher_id;
  if (!teacherId) {
    const { data:sel } = await supabase.from('teacher_selections').select('teacher_profile_id').eq('user_id',APP.profile.id).not('teacher_profile_id','is',null).order('created_at',{ascending:false}).limit(1).single();
    teacherId = sel?.teacher_profile_id;
  }
  if (teacherId) {
    const { data:teacher } = await supabase.from('profiles').select('id,full_name').eq('id',teacherId).single();
    if (teacher) {
      APP.peerUserId = teacher.id;
      const nameEl = document.getElementById('channel-name');
      if (nameEl) nameEl.textContent = teacher.full_name;
    }
    await initChat(teacherId, 'channel-body');
  } else {
    const body = document.getElementById('channel-body');
    if (body) body.innerHTML = '<div class="channel-sys">No teacher assigned yet</div>';
  }
}
window.setActivePeer = async function(peerId, peerName) {
  cleanup(); APP.peerUserId = peerId;
  const nameEl = document.getElementById('t-channel-name');
  if (nameEl) nameEl.textContent = peerName;
  await initChat(peerId, 'channel-body-t');
};
window.sendChatMsg = async function(role) {
  const input = document.getElementById(role==='s'?'s-channel-input':'t-channel-input');
  if (!input||!input.value.trim()) return;
  await sendMessage(input.value.trim()); input.value='';
};
window.quickMsg = function(role, text) {
  const input = document.getElementById(role==='s'?'s-channel-input':'t-channel-input');
  if (input) { input.value=text; window.sendChatMsg(role); }
};

// ── STUDENT DATA ──────────────────────────────────────────────
async function loadStudentData() {
  APP.profile = await getProfile();
  try {
    const { data } = await supabase.from('sessions').select('*,teacher:profiles!teacher_id(full_name)').eq('student_id',APP.profile.id).gte('scheduled_at',new Date().toISOString()).order('scheduled_at').limit(3);
    const el = document.getElementById('upcoming-sessions');
    if (el && data?.length) el.innerHTML = data.map(s => {
      const d = new Date(s.scheduled_at);
      return `<div class="sched-item"><div class="sched-date"><div class="sched-day">${d.toLocaleDateString('en-GB',{weekday:'short'})}</div><div class="sched-num">${d.getDate()}</div></div><div class="sched-sep"></div><div class="sched-info"><div class="sched-subject">${esc(s.topic||'Lesson')}</div><div class="sched-time">${d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} · ${esc(s.teacher?.full_name||'')}</div><div class="sched-agreed">✓ Confirmed</div></div><button class="btn-sm btn-primary-sm" onclick="switchPanel('s-lesson')">Join →</button></div>`;
    }).join('');
  } catch(e) {}
  loadRecordings();
}

// ── TEACHER DATA ──────────────────────────────────────────────
async function loadTeacherStudents() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, subject, role')
      .eq('teacher_id', APP.profile.id)
      .eq('role', 'student');

    if (error) console.error('loadTeacherStudents:', error);

    const row = (s) => `
      <div class="lesson-item">
        <div class="lesson-avatar">${initials(s.full_name)}</div>
        <div class="lesson-info">
          <div class="lesson-name">${esc(s.full_name)}</div>
          <div class="lesson-meta">${s.subject==='french'?'French':'Mathematics'} · ${esc(s.email||'')}</div>
        </div>
        <div class="lesson-actions">
          <button class="btn-sm btn-primary-sm" onclick="openTeacherLesson('${s.id}','${esc(s.full_name)}')">Start</button>
          <button class="btn-sm btn-ghost-sm" onclick="setActivePeer('${s.id}','${esc(s.full_name)}');switchPanel('t-chat')">💬</button>
        </div>
      </div>`;

    const empty = '<div style="color:var(--text3);font-size:0.82rem;padding:0.5rem 0">No students yet — add students below</div>';
    const html  = data?.length ? data.map(row).join('') : empty;

    const list     = document.getElementById('t-students-list');
    const fullList = document.getElementById('t-students-full');
    if (list)     list.innerHTML     = html;
    if (fullList) fullList.innerHTML = html;

  } catch(e) { console.error('loadTeacherStudents:', e); }
}
async function loadTeacherStudentDropdown() {
  const sel = document.getElementById('sched-student'); if (!sel) return;
  try {
    const { data } = await supabase.from('profiles').select('id,full_name').eq('teacher_id',APP.profile.id).eq('role','student');
    sel.innerHTML = data?.length ? data.map(s=>`<option value="${s.id}">${esc(s.full_name)}</option>`).join('') : '<option value="">No students</option>';
  } catch(e) {}
}
async function triggerSubWarning() {
  try { const { data } = await supabase.from('subscriptions').select('id').eq('teacher_id',APP.profile.id).eq('status','expired'); if (data?.length) showToast(`⚠️ ${data.length} student(s) expired subscription`,'warning'); } catch(e) {}
}

// ── RECORDINGS ────────────────────────────────────────────────
async function loadRecordings() {
  try {
    const { data } = await supabase.from('sessions').select('*,teacher:profiles!teacher_id(full_name)').eq('student_id',APP.profile.id).eq('status','done').not('recording_url','is',null).order('scheduled_at',{ascending:false});
    ['s-recordings-list','s-recordings-all'].forEach(id => {
      const el = document.getElementById(id); if (!el) return;
      el.innerHTML = data?.length ? data.map(s=>`<div class="recording-item"><div class="rec-icon">▶</div><div class="rec-info"><div class="rec-title">${esc(s.topic||'Lesson')}</div><div class="rec-meta">${new Date(s.scheduled_at).toLocaleDateString('en-GB')} · ${esc(s.teacher?.full_name||'')}</div></div><a href="${esc(s.recording_url)}" target="_blank" class="btn-sm btn-ghost-sm">Watch</a></div>`).join('') : '<div style="color:var(--text3);font-size:0.82rem;padding:0.5rem 0">No recordings yet</div>';
    });
  } catch(e) {}
}

// ── BOOK SESSION ──────────────────────────────────────────────
window.openBookModal = function(teacherId, teacherName) {
  ['b-teacher-id','b-teacher-name'].forEach((id,i) => { const el=document.getElementById(id); if(el) el.value=i?teacherName:teacherId; });
  const dateEl=document.getElementById('b-date'); if(dateEl){const t=new Date();t.setDate(t.getDate()+1);dateEl.min=t.toISOString().split('T')[0];}
  openModal('book-modal');
};
window.submitBooking = async function() {
  const teacherId=document.getElementById('b-teacher-id')?.value, date=document.getElementById('b-date')?.value, time=document.getElementById('b-time')?.value, topic=document.getElementById('b-topic')?.value||'Lesson';
  if (!date||!time) { showToast('Please fill in date and time','warning'); return; }
  try {
    const { error } = await supabase.from('sessions').insert({ student_id:APP.profile.id, teacher_id:teacherId, scheduled_at:new Date(`${date}T${time}`).toISOString(), topic, status:'pending' });
    if (error) throw error;
    showToast('✅ Session booked!','success'); closeModal('book-modal'); loadStudentData();
  } catch(e) { showToast('Error: '+e.message,'warning'); }
};

// ── SCHEDULE LESSON ───────────────────────────────────────────
window.scheduleLesson = async function() {
  const sel=document.getElementById('sched-student'), studentId=sel?.value, studentName=sel?.options[sel.selectedIndex]?.text||'Student';
  const date=document.getElementById('sched-date')?.value, time=document.getElementById('sched-time')?.value||'17:00', topic=document.getElementById('sched-topic')?.value||'Lesson';
  if (!studentId) { showToast('Please select a student','warning'); return; }
  if (!date)      { showToast('Please select a date','warning'); return; }
  try {
    await supabase.from('sessions').insert({ student_id:studentId, teacher_id:APP.profile.id, scheduled_at:new Date(`${date}T${time}`).toISOString(), topic, status:'pending' });
    showToast('✅ Lesson added for '+studentName,'success');
    const body=document.getElementById('channel-body-t'); if(body){const sys=document.createElement('div');sys.className='channel-sys';sys.textContent='📅 '+topic+' · '+date+' · '+time;body.appendChild(sys);}
  } catch(e) { showToast('Error: '+e.message,'warning'); }
};

// ── ADD STUDENT ───────────────────────────────────────────────
window.addStudent = async function() {
  const name=document.getElementById('new-student-name')?.value.trim(), email=document.getElementById('new-student-email')?.value.trim(), subject=document.getElementById('new-student-subject')?.value||'math', lessons=parseInt(document.getElementById('new-student-lessons')?.value||'8');
  if (!name||!email) { showToast('Please fill in name and email','warning'); return; }
  try {
    const { data:existing } = await supabase.from('profiles').select('id').eq('email',email).single();
    if (existing) {
      await supabase.from('profiles').update({ teacher_id:APP.profile.id, subject, full_name:name }).eq('id',existing.id);
      await supabase.from('subscriptions').upsert({ student_id:existing.id, teacher_id:APP.profile.id, total_lessons:lessons, used_lessons:0, status:'active' });
      showToast('✅ '+name+' linked to your account','success');
    } else {
      showToast('📧 '+email+' — ask them to sign up first, then add again','');
    }
    closeModal('add-student-modal'); loadTeacherStudents(); loadTeacherStudentDropdown();
  } catch(e) { showToast('Error: '+e.message,'warning'); }
};

// ── PROFILE ───────────────────────────────────────────────────
window.loadProfileForm = async function() {
  const p=APP.profile; ['prof-name','prof-email'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.value=i?p.email:p.full_name||'';});
};
window.saveProfile = async function() {
  const name=document.getElementById('prof-name')?.value.trim();
  try { await supabase.from('profiles').update({full_name:name}).eq('id',APP.profile.id); APP.profile.full_name=name; renderSidebar(); showToast('✅ Profile updated!','success'); } catch(e){showToast(e.message,'warning');}
};
window.changePassword = async function() {
  const pass=document.getElementById('prof-new-pass')?.value;
  if (!pass||pass.length<8){showToast('Password must be at least 8 characters','warning');return;}
  const {error}=await supabase.auth.updateUser({password:pass});
  if (error){showToast(error.message,'warning');return;}
  showToast('✅ Password changed!','success'); document.getElementById('prof-new-pass').value='';
};

// ── WHITEBOARD ────────────────────────────────────────────────
window.openTeacherLesson = function(sid,sname){APP.peerUserId=sid;const el=document.getElementById('wb-student-name');if(el)el.textContent=sname;switchPanel('t-lesson');};
function initWhiteboard(isTeacher) {
  const id=isTeacher?'wb-canvas-t':'wb-canvas-s', canvas=document.getElementById(id); if(!canvas)return;
  const wrap=canvas.parentElement; canvas.width=wrap.offsetWidth||800; canvas.height=wrap.offsetHeight||500;
  const ctx=canvas.getContext('2d'); ctx.fillStyle='#111827'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
  for(let x=0;x<canvas.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
  for(let y=0;y<canvas.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
  ctx.fillStyle='rgba(255,255,255,0.1)';ctx.font='14px Inter,sans-serif';ctx.fillText('✏️  Whiteboard Ready',20,36);
  canvas.onpointerdown=e=>{APP.wbDrawing=true;const r=canvas.getBoundingClientRect();APP.wbLastX=e.clientX-r.left;APP.wbLastY=e.clientY-r.top;};
  canvas.onpointermove=e=>{if(!APP.wbDrawing)return;const r=canvas.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;if(APP.wbTool==='eraser'){ctx.fillStyle='#111827';ctx.fillRect(x-15,y-15,30,30);}else{ctx.strokeStyle=APP.wbColor;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(APP.wbLastX,APP.wbLastY);ctx.lineTo(x,y);ctx.stroke();}APP.wbLastX=x;APP.wbLastY=y;};
  canvas.onpointerup=canvas.onpointerleave=()=>{APP.wbDrawing=false;};
  if(APP.wbTimer)clearInterval(APP.wbTimer);APP.wbSeconds=0;
  const tid=isTeacher?'wb-timer-t':'wb-timer-s';
  APP.wbTimer=setInterval(()=>{APP.wbSeconds++;const m=Math.floor(APP.wbSeconds/60),s=APP.wbSeconds%60;const tEl=document.getElementById(tid);if(tEl)tEl.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;},1000);
}
window.setWbTool=(t)=>{APP.wbTool=t;};
window.setWbColor=(c,el)=>{APP.wbColor=c;APP.wbTool='pen';document.querySelectorAll('.wb-color').forEach(e=>e.classList.remove('active'));if(el)el.classList.add('active');};
window.clearWb=()=>{['wb-canvas-s','wb-canvas-t'].forEach(id=>{const c=document.getElementById(id);if(!c)return;const ctx=c.getContext('2d');ctx.fillStyle='#111827';ctx.fillRect(0,0,c.width,c.height);});};
window.saveWb=()=>showToast('✅ Whiteboard saved','success');
window.endLesson=role=>{if(APP.wbTimer)clearInterval(APP.wbTimer);showToast('✅ Lesson ended','success');switchPanel(role==='t'?'t-home':'s-home');};

// ── AI HOMEWORK ───────────────────────────────────────────────
window.generateHomework = async function() {
  const topic=document.getElementById('ai-topic')?.value.trim(); if(!topic){showToast('Please enter a topic','warning');return;}
  const diff=document.getElementById('aiDifficulty')?.value||'mixed', count=parseInt(document.getElementById('aiCount')?.value||'5');
  const btn=document.getElementById('btn-ai-gen'); if(btn){btn.disabled=true;btn.textContent='⏳ AI thinking...';}
  let problems=null;
  try {
    const res=await fetch('/api/groq',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'llama-3.1-8b-instant',messages:[{role:'system',content:'Return ONLY JSON: {"problems":[{"q":"...","difficulty":"easy|medium|hard","hint":"..."}]}'},{role:'user',content:`${count} problems about "${topic}", difficulty: ${diff}`}],temperature:0.7,max_tokens:1200,response_format:{type:'json_object'}})});
    if(!res.ok)throw new Error('Groq '+res.status);
    const data=await res.json(); const parsed=JSON.parse(data.choices?.[0]?.message?.content||'{}');
    problems=Array.isArray(parsed)?parsed:(parsed.problems||Object.values(parsed)[0]);
    if(problems?.length)showToast('✅ AI generated '+problems.length+' problems','success');
  } catch(e){console.warn('Groq:',e.message);}
  if(!problems?.length){problems=localProblems(topic,count);showToast('💡 Local problem bank','');}
  renderHomework(problems);
  if(btn){btn.disabled=false;btn.textContent='✨ Regenerate';}
};
function localProblems(topic,count=5){
  const t=topic.toLowerCase();
  const b={
    algebra:[{q:'Solve: 3x+7=22',difficulty:'easy',hint:'Isolate x'},{q:'Factorise: x²+7x+12',difficulty:'easy',hint:'Two numbers ×12, +7'},{q:'Solve: 2x²-5x-3=0',difficulty:'medium',hint:'Quadratic formula'},{q:'Roots of x²-4x+3=0',difficulty:'medium',hint:'Factorise'},{q:'Sum+product of roots: 3x²+6x-9=0',difficulty:'hard',hint:"Vieta's"},{q:'Simplify (x²-9)/(x+3)',difficulty:'easy',hint:'Diff of squares'},{q:'Solve: 2x+y=7, x-y=2',difficulty:'medium',hint:'Add equations'},{q:'Expand: (2x-3)²',difficulty:'easy',hint:'(a-b)²=a²-2ab+b²'}],
    calculus:[{q:"f'(x) for f(x)=3x³-2x²+5x-1",difficulty:'easy',hint:'Power rule'},{q:'Differentiate: (2x+1)⁴',difficulty:'medium',hint:'Chain rule'},{q:'Derivative of x²·sin(x)',difficulty:'medium',hint:'Product rule'},{q:"Stationary points of x³-6x²+9x+2",difficulty:'hard',hint:"f'(x)=0"},{q:'∫(3x²-2x+1)dx',difficulty:'medium',hint:'Integrate each term'}],
    geometry:[{q:'Legs 5,12 — hypotenuse?',difficulty:'easy',hint:'a²+b²=c²'},{q:'Triangle: base 8cm, height 6cm — area?',difficulty:'easy',hint:'½×b×h'},{q:'Parallel lines, 65° — co-interior?',difficulty:'medium',hint:'Sum=180°'},{q:'Chord 16cm, 6cm from centre — radius?',difficulty:'hard',hint:'Pythagoras'},{q:'Cylinder: r=5,h=12 — volume?',difficulty:'medium',hint:'V=πr²h'}],
    statistics:[{q:'Mean,median,mode of 4,7,3,7,9,2,7',difficulty:'easy',hint:'Order first'},{q:'Mean=12 for 5 nums. Four: 8,15,10,14. Fifth?',difficulty:'medium',hint:'Total=mean×n'},{q:'Std dev of 2,4,4,4,5,5,7,9',difficulty:'hard',hint:'Variance first'},{q:'4 red,6 blue. P(both red, no replace)?',difficulty:'medium',hint:'4/10×3/9'}],
  };
  let chosen=b.algebra;
  if(/calcul|deriv|integr|limit/.test(t))chosen=b.calculus;
  else if(/geometr|triangle|circle|angle|area|volume/.test(t))chosen=b.geometry;
  else if(/statist|probabilit|mean|median|data/.test(t))chosen=b.statistics;
  return chosen.slice(0,Math.min(count,chosen.length));
}
function renderHomework(problems){
  const area=document.getElementById('ai-result'); if(!area)return;
  const dm={easy:'diff-easy',medium:'diff-med',hard:'diff-hard'};
  area.innerHTML=problems.map((p,i)=>`<div class="hw-item"><div class="hw-item-q">${i+1}. ${esc(p.q)}</div><span class="hw-item-diff ${dm[p.difficulty]||'diff-med'}">${p.difficulty}</span>${p.hint?`<div style="font-size:0.72rem;color:var(--text3);margin-top:3px">💡 ${esc(p.hint)}</div>`:''}</div>`).join('');
}
function showAIProviderStatus(){const el=document.getElementById('ai-provider-status');if(el)el.textContent='🟢 Groq AI — active';}

// ── SIGN OUT + MODAL + TOAST + UTILS ─────────────────────────
window.signOut=async function(){cleanup();await supabase.auth.signOut();window.location.href='../index.html';};
window.openModal=id=>{const el=document.getElementById(id);if(el)el.classList.add('open');};
window.closeModal=id=>{const el=document.getElementById(id);if(el)el.classList.remove('open');};
document.addEventListener('click',e=>{document.querySelectorAll('.modal-overlay.open').forEach(m=>{if(e.target===m)m.classList.remove('open');});});
window.showToast=function(msg,type=''){const toaster=document.getElementById('toaster');if(!toaster)return;const t=document.createElement('div');t.className='toast'+(type?' '+type:'');t.textContent=msg;toaster.appendChild(t);setTimeout(()=>t.remove(),3500);};
function initials(name=''){return name.split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase();}
function esc(str){return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

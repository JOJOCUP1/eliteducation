// ============================================================
//  auth.js  —  sign-in / sign-up / OAuth / sign-out logic
// ============================================================
import { supabase, redirectIfAuthed } from './supabase.js';

redirectIfAuthed();

let mode = 'login'; // 'login' | 'signup' | 'teacher'

const q     = id => document.getElementById(id);
const toast = (msg, type = '') => {
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  document.getElementById('toaster').appendChild(t);
  setTimeout(() => t.remove(), 3800);
};

// ── tab switching ─────────────────────────────────────────────
window.switchMode = function(m) {
  mode = m;
  q('tab-login').classList.toggle('active', m === 'login');
  q('tab-signup').classList.toggle('active', m === 'signup');
  q('tab-teacher').classList.toggle('active', m === 'teacher');

  const isSignup  = m === 'signup' || m === 'teacher';
  q('name-group').style.display    = isSignup ? 'flex' : 'none';
  q('teacher-code-group').style.display = m === 'teacher' ? 'flex' : 'none';

  const labels = {
    login:   ['Welcome Back',  'Sign In →'],
    signup:  ['Create Student Account', 'Sign Up →'],
    teacher: ['Teacher Portal','Sign In / Register →'],
  };
  q('auth-title').textContent   = labels[m][0];
  q('btn-submit').textContent   = labels[m][1];
};

// ── form submit ───────────────────────────────────────────────
q('auth-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = q('email').value.trim();
  const pass  = q('password').value;
  const name  = q('full-name')?.value.trim() || '';
  const code  = q('teacher-code')?.value.trim() || '';
  const btn   = q('btn-submit');

  btn.disabled    = true;
  btn.textContent = '...';

  // ── LOGIN ──
  if (mode === 'login') {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) { toast(error.message, 'warning'); btn.disabled = false; btn.textContent = 'Sign In →'; return; }
    window.location.href = 'dashboard.html';
    return;
  }

  // ── TEACHER SIGNUP / LOGIN ──
  if (mode === 'teacher') {
    // Secret invite code check (set your own code in Supabase or hardcode)
    const TEACHER_CODE = 'EEA2026'; // admin changes this
    if (code !== TEACHER_CODE) {
      toast('Invalid teacher access code', 'warning');
      btn.disabled = false; btn.textContent = 'Sign In / Register →';
      return;
    }
    // Try login first, then signup
    const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (!loginErr && loginData.user) {
      // Update role to teacher if not already
      await supabase.from('profiles').upsert({ id: loginData.user.id, role: 'teacher', full_name: name || loginData.user.email, email });
      window.location.href = 'dashboard.html';
      return;
    }
    // Signup as teacher
    const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
    if (error) { toast(error.message, 'warning'); btn.disabled = false; btn.textContent = 'Sign In / Register →'; return; }
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: name, role: 'teacher', email });
      toast('✅ Teacher account created!', 'success');
    }
    window.location.href = 'dashboard.html';
    return;
  }

  // ── STUDENT SIGNUP ──
  const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
  if (error) { toast(error.message, 'warning'); btn.disabled = false; btn.textContent = 'Sign Up →'; return; }
  if (data.user) {
    await supabase.from('profiles').upsert({ id: data.user.id, full_name: name, role: 'student', email });
    toast('✅ Account created!', 'success');
  }
  window.location.href = 'dashboard.html';
});

// ── Google OAuth ──────────────────────────────────────────────
window.signInWithGoogle = async function() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/pages/dashboard.html' }
  });
  if (error) toast(error.message, 'warning');
};

// ── OAuth callback ────────────────────────────────────────────
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const { data: existing } = await supabase.from('profiles').select('id').eq('id', session.user.id).single();
    if (!existing) {
      await supabase.from('profiles').insert({
        id: session.user.id,
        full_name: session.user.user_metadata?.full_name || session.user.email,
        role: 'student',
        email: session.user.email,
      });
    }
    if (window.location.pathname.includes('login.html')) {
      window.location.href = 'dashboard.html';
    }
  }
});

// ============================================================
//  supabase.js  —  single source of truth for the client
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL  = 'https://iuucpfxvsabenldczyaw.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_kCS9u53wrcvAQKkrb7HQwQ_tnxitFqY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── helpers ──────────────────────────────────────────────────

/** Returns the current session or null */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/** Returns the full profile row for the signed-in user */
export async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  return data;
}

/** Redirects to login.html if there is no active session.
 *  Works from any page because it uses the current origin. */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    // Determine login path relative to current page location
    const isInPages = window.location.pathname.includes('/pages/');
    window.location.href = isInPages ? 'login.html' : 'pages/login.html';
  }
  return session;
}

/** Redirects to dashboard.html if already logged in AND there's a pending teacher booking.
 *  Does NOT auto-redirect if user intentionally visits login page (e.g. from navbar). */
export async function redirectIfAuthed() {
  const session = await getSession();
  if (!session) return;

  // Only auto-redirect if user came via a booking intent (pending_teacher)
  // or came from a platform button click (auth_intent flag)
  const hasPendingTeacher = !!sessionStorage.getItem('pending_teacher');
  const hasAuthIntent     = sessionStorage.getItem('auth_intent') === 'platform';

  if (hasPendingTeacher || hasAuthIntent) {
    sessionStorage.removeItem('auth_intent');
    const isInPages = window.location.pathname.includes('/pages/');
    window.location.href = isInPages ? 'dashboard.html' : 'pages/dashboard.html';
  }
  // Otherwise: logged-in user visiting login.html directly → show the page normally
}

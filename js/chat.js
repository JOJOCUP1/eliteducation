// ============================================================
//  chat.js  —  realtime messaging (student ↔ teacher)
// ============================================================
import { supabase, getProfile } from './supabase.js';

let myProfile    = null;
let activePeer   = null; // the other person's profile id
let containerId  = 'channel-body'; // dynamic container ID
let subscription = null;

// ── bootstrap ─────────────────────────────────────────────────
export async function initChat(peerUserId, bodyId = 'channel-body') {
  myProfile   = await getProfile();
  activePeer  = peerUserId;
  containerId = bodyId;
  await loadHistory();
  subscribeRealtime();
}

// ── load message history ─────────────────────────────────────
async function loadHistory() {
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:profiles!sender_id(full_name, role)')
    .or(`and(sender_id.eq.${myProfile.id},receiver_id.eq.${activePeer}),and(sender_id.eq.${activePeer},receiver_id.eq.${myProfile.id})`)
    .order('created_at', { ascending: true });

  if (error) { console.error('chat load error', error); return; }
  const body = document.getElementById(containerId);
  if (!body) return;
  body.innerHTML = '<div class="channel-sys">🔒 Encrypted conversation</div>';
  (data || []).forEach(renderMessage);
  body.scrollTop = body.scrollHeight;
}

// ── realtime subscription ─────────────────────────────────────
function subscribeRealtime() {
  if (subscription) supabase.removeChannel(subscription);

  subscription = supabase
    .channel('messages-room')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `receiver_id=eq.${myProfile.id}`,
    }, payload => {
      renderMessage(payload.new);
      const body = document.getElementById(containerId);
      if (body) body.scrollTop = body.scrollHeight;
    })
    .subscribe();
}

// ── peer name cache ──────────────────────────────────────────
const peerNameCache = {};

// ── render a single message ───────────────────────────────────
function renderMessage(msg) {
  const body = document.getElementById(containerId);
  if (!body) return;

  const isOwn = msg.sender_id === myProfile.id;
  // Use full_name from joined sender data (loadHistory) or cache
  let name;
  if (isOwn) {
    name = myProfile.full_name || 'Me';
  } else if (msg.sender?.full_name) {
    name = msg.sender.full_name;
    peerNameCache[msg.sender_id] = name;
  } else if (peerNameCache[msg.sender_id]) {
    name = peerNameCache[msg.sender_id];
  } else {
    name = '...'; // fallback while loading
  }
  const time = new Date(msg.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const ini  = name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();

  const div = document.createElement('div');
  div.className = 'channel-msg' + (isOwn ? ' own' : '');
  div.innerHTML = `
    <div class="chat-av${isOwn ? '' : ' teacher'}">${ini}</div>
    <div>
      <div class="channel-msg-name">${esc(name)}</div>
      <div class="channel-bubble">${esc(msg.content)}</div>
      <div class="channel-time">${time}</div>
    </div>`;
  body.appendChild(div);
}

// ── send a message ────────────────────────────────────────────
export async function sendMessage(content) {
  if (!content.trim() || !myProfile || !activePeer) return;

  // Optimistic render
  renderMessage({
    sender_id: myProfile.id,
    receiver_id: activePeer,
    content,
    created_at: new Date().toISOString(),
  });

  const body = document.getElementById(containerId);
  if (body) body.scrollTop = body.scrollHeight;

  const { error } = await supabase.from('messages').insert({
    sender_id: myProfile.id,
    receiver_id: activePeer,
    content,
  });

  if (error) console.error('send error', error);
}

// ── quick helpers ─────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function cleanup() {
  if (subscription) supabase.removeChannel(subscription);
}

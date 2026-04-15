# Elite Education Academy — MVP

AI-powered teacher matching + learning platform.
Supabase Auth · Realtime Chat · Whiteboard · Free AI Homework

## ფაილების სტრუქტურა

```
elite-academy/
├── index.html              ← Landing (quiz + teacher match)
├── pages/
│   ├── login.html          ← Sign in / Sign up / Google OAuth
│   └── dashboard.html      ← Platform (student + teacher)
├── js/
│   ├── supabase.js         ← Supabase client + auth helpers
│   ├── auth.js             ← Login / signup logic
│   ├── chat.js             ← Realtime chat (Supabase)
│   └── platform.js         ← Dashboard, booking, whiteboard, AI
├── css/
│   └── platform.css        ← Dashboard styles
├── assets/
├── supabase_schema.sql     ← Run in Supabase SQL Editor
├── .env.example
└── .gitignore
```

## Setup — 3 ნაბიჯი

### 1. Supabase
1. შექმენი პროექტი → supabase.com
2. SQL Editor → გაუშვი `supabase_schema.sql`
3. Project Settings → API → დააკოპირე URL + anon key

### 2. Credentials
`js/supabase.js`-ში ჩაანაცვლე:
```js
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';
```
ასევე `index.html`-ის ბოლოს `<script type="module">` ბლოკში.

### 3. AI Homework (უფასო — არჩევანი)

**ვარიანტი A: Groq** (რეკომენდირებული — სწრაფი, უფასო)
1. → console.groq.com → Sign up (Google-ით)
2. → API Keys → Create → კოპირება
3. `js/platform.js`-ში: `YOUR_GROQ_API_KEY` → შენი key

**ვარიანტი B: Hugging Face** (ასევე უფასო)
1. → huggingface.co → Sign up
2. → Settings → Access Tokens → New Token (read)
3. `js/platform.js`-ში: `YOUR_HF_TOKEN` → შენი token

Key-ის გარეშე: ადგილობრივი problem bank მუშაობს ავტომატურად.

### Google OAuth (optional)
Supabase → Auth → Providers → Google → Client ID + Secret
Redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

## Local run
```bash
python3 -m http.server 3000
# open http://localhost:3000
```

## MVP Features
- ✅ AI teacher matching quiz (6 questions, Supabase save)
- ✅ Auth: email/password + Google OAuth
- ✅ Student & Teacher dashboards with sidebar
- ✅ Realtime chat (Supabase Realtime, correct per-panel IDs)
- ✅ Session booking (Supabase sessions table)
- ✅ Canvas whiteboard with tools + timer
- ✅ AI homework: Groq → Hugging Face → local bank fallback
- ✅ Profile settings (name, password)
- ✅ Past recordings list
- ✅ Pending booking restored after login
- ✅ Error handling on Supabase calls

## AI Homework — Provider Priority
```
1. Groq (llama-3.1-8b-instant) — fastest, free tier
2. Hugging Face (Mistral-7B)   — free, slightly slower
3. Local problem bank           — always works, no internet needed
```

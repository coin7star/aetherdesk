# AI Workspace Cloudflare

Web workspace berisi beberapa tool AI:
- AI Chat
- Prompt Builder
- Ringkas Teks
- Code Helper
- JSON Formatter

Frontend memakai React + Vite. Backend API memakai Cloudflare Pages Functions agar API key aman lewat ENV Cloudflare.

## 1. Install lokal

```bash
npm install
npm run dev
```

## 2. Build

```bash
npm run build
```

## 3. ENV Cloudflare

Masuk Cloudflare Dashboard:

Workers & Pages → pilih project Pages → Settings → Variables and Secrets → Add.

Tambahkan:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=ISI_API_KEY_GEMINI_KAMU
GEMINI_MODEL=gemini-1.5-flash
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=1200
```

Untuk OpenAI:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=ISI_API_KEY_OPENAI_KAMU
OPENAI_MODEL=gpt-4o-mini
```

Jangan taruh API key di file frontend.

## 4. Deploy Cloudflare Pages dari GitHub

1. Upload project ini ke GitHub.
2. Buka Cloudflare Dashboard.
3. Workers & Pages → Create → Pages.
4. Connect to Git.
5. Pilih repository.
6. Framework preset: Vite.
7. Build command: `npm run build`
8. Build output directory: `dist`
9. Deploy.

## 5. Struktur penting

```txt
src/App.jsx             Tampilan web workspace
src/style.css           Desain web
functions/api/ai.js     Backend API aman untuk memanggil AI
```

## 6. Cara kerja

Browser memanggil:

```txt
POST /api/ai
```

Cloudflare Function membaca ENV dan meneruskan request ke Gemini/OpenAI. Dengan cara ini API key tidak bocor ke user.

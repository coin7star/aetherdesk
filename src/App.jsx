import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot,
  Wand2,
  FileText,
  Code2,
  Braces,
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap,
  Menu,
  X
} from "lucide-react";
import "./style.css";

const TOOLS = [
  {
    id: "chat",
    name: "AI Chat",
    icon: Bot,
    placeholder: "Tanya apa saja...",
    system: "Kamu adalah asisten AI AetherDesk. Jawab dalam bahasa Indonesia yang jelas, rapi, dan mudah dipahami pemula."
  },
  {
    id: "prompt",
    name: "Prompt Builder",
    icon: Wand2,
    placeholder: "Tulis ide prompt mentah kamu...",
    system: "Ubah input user menjadi prompt AI yang rapi, detail, dan siap dipakai. Jawab hanya prompt final."
  },
  {
    id: "summary",
    name: "Ringkas Teks",
    icon: FileText,
    placeholder: "Tempel artikel, catatan, atau dokumen panjang...",
    system: "Ringkas teks user menjadi poin penting, kesimpulan, dan action item jika ada."
  },
  {
    id: "code",
    name: "Code Helper",
    icon: Code2,
    placeholder: "Tempel error/code atau jelaskan fitur yang ingin dibuat...",
    system: "Bantu debug dan tulis kode. Jelaskan untuk pemula, berikan contoh kode jika perlu."
  },
  {
    id: "json",
    name: "JSON Formatter",
    icon: Braces,
    placeholder: "Tempel JSON berantakan...",
    system: "Rapikan JSON user. Jika tidak valid, jelaskan error dan berikan versi yang diperbaiki jika memungkinkan."
  }
];

function App() {
  const [active, setActive] = useState("chat");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const tool = useMemo(() => TOOLS.find((t) => t.id === active), [active]);

  async function runAI() {
    if (!input.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tool: active,
          system: tool.system,
          message: input
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal memanggil AI.");
      }

      setOutput(data.text || "Tidak ada jawaban.");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function chooseTool(id) {
    setActive(id);
    setOutput("");
    setMobileMenu(false);
  }

  return (
    <main>
      <header className="navbar">
        <a href="/" className="brand" aria-label="AetherDesk Home">
          <span className="brandIcon">
            <Sparkles size={20} />
          </span>
          <span>AetherDesk</span>
        </a>

        <nav className="navLinks">
          <a href="#tools">Tools</a>
          <a href="#workspace">Workspace</a>
          <a href="#features">Fitur</a>
        </nav>

        <button className="mobileBtn" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      {mobileMenu && (
        <div className="mobileNav">
          <a href="#tools" onClick={() => setMobileMenu(false)}>Tools</a>
          <a href="#workspace" onClick={() => setMobileMenu(false)}>Workspace</a>
          <a href="#features" onClick={() => setMobileMenu(false)}>Fitur</a>
        </div>
      )}

      <section className="hero">
        <div className="heroText">
          <p className="badge">AI Workspace berbasis Cloudflare + Groq</p>
          <h1>AetherDesk, pusat kerja AI cepat untuk chat, coding, prompt, dan dokumen.</h1>
          <p>
            Gunakan beberapa tool AI dalam satu dashboard ringan, responsif, dan aman.
            Cocok untuk produktivitas, belajar coding, membuat prompt, dan merangkum teks.
          </p>

          <div className="heroActions">
            <a href="#workspace" className="primaryBtn">Mulai Pakai AI</a>
            <a href="#features" className="secondaryBtn">Lihat Fitur</a>
          </div>
        </div>

        <div className="heroCard">
          <div className="miniTop">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h2>AI Command Center</h2>
          <p>Fast response dengan Groq API, API key aman di Cloudflare Runtime Secrets.</p>
          <div className="miniStats">
            <div>
              <strong>5+</strong>
              <small>AI Tools</small>
            </div>
            <div>
              <strong>Global</strong>
              <small>Cloudflare CDN</small>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <article>
          <Zap />
          <h3>Cepat</h3>
          <p>Backend Worker ringan dan cocok untuk response AI cepat.</p>
        </article>
        <article>
          <ShieldCheck />
          <h3>Aman</h3>
          <p>API key disimpan di Cloudflare Secret, bukan di browser.</p>
        </article>
        <article>
          <Sparkles />
          <h3>Multi Tool</h3>
          <p>Chat, prompt builder, ringkas teks, coding helper, dan JSON formatter.</p>
        </article>
      </section>

      <section id="tools" className="toolsIntro">
        <p className="badge dark">AetherDesk Tools</p>
        <h2>Semua kebutuhan AI dalam satu workspace.</h2>
      </section>

      <section id="workspace" className="workspace">
        <aside className="sidebar">
          {TOOLS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={active === item.id ? "tool active" : "tool"}
                onClick={() => chooseTool(item.id)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </aside>

        <section className="panel">
          <div className="panelHeader">
            <div>
              <p className="panelLabel">Selected Tool</p>
              <h2>{tool.name}</h2>
            </div>

            <button
              className="clearBtn"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              Bersihkan
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder}
          />

          <button className="runBtn" onClick={runAI} disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="spin" size={18} /> : <Bot size={18} />}
            {loading ? "Memproses..." : "Jalankan AI"}
          </button>

          <div className="result">
            <h3>Hasil</h3>
            <pre>{output || "Output AI akan muncul di sini."}</pre>
          </div>
        </section>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} AetherDesk. AI workspace powered by Cloudflare Worker.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

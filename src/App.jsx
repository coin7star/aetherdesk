import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bot, Wand2, FileText, Code2, Braces, Loader2 } from "lucide-react";
import "./style.css";

const TOOLS = [
  {
    id: "chat",
    name: "AI Chat",
    icon: Bot,
    placeholder: "Tanya apa saja...",
    system: "Kamu adalah asisten AI yang membantu dengan bahasa Indonesia yang jelas dan mudah dipahami."
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
  const tool = useMemo(() => TOOLS.find((t) => t.id === active), [active]);

  async function runAI() {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: active, system: tool.system, message: input })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memanggil API");
      setOutput(data.text || "Tidak ada jawaban.");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="badge">Cloudflare Pages + GitHub + ENV API</p>
          <h1>AI Workspace</h1>
          <p className="subtitle">
            Beberapa tool AI dalam satu web. API key disimpan aman di Cloudflare ENV, bukan di browser.
          </p>
        </div>
      </section>

      <section className="workspace">
        <aside className="sidebar">
          {TOOLS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={active === item.id ? "tool active" : "tool"}
                onClick={() => {
                  setActive(item.id);
                  setOutput("");
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </aside>

        <section className="panel">
          <div className="panel-header">
            <h2>{tool.name}</h2>
            <button className="ghost" onClick={clearAll}>Bersihkan</button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder}
          />

          <button className="run" onClick={runAI} disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="spin" size={18} /> : <Bot size={18} />}
            {loading ? "Memproses..." : "Jalankan AI"}
          </button>

          <div className="result">
            <h3>Hasil</h3>
            <pre>{output || "Output AI akan muncul di sini."}</pre>
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

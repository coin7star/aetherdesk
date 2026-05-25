import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot,
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Mail,
  Calculator,
  Coins,
  KeyRound,
  Copy
} from "lucide-react";
import "./style.css";

const TOOLS = [
  {
    id: "chat",
    name: "AI Chat",
    icon: Bot,
    description: "Chat AI cepat menggunakan Groq."
  },
  {
    id: "tempmail",
    name: "TempMail Generator",
    icon: Mail,
    description: "Buat alamat email sementara random."
  },
  {
    id: "calculator",
    name: "Kalkulator Canggih",
    icon: Calculator,
    description: "Hitung ekspresi matematika dengan cepat."
  },
  {
    id: "crypto",
    name: "Crypto Harga",
    icon: Coins,
    description: "Cek harga crypto populer secara real-time."
  },
  {
    id: "password",
    name: "Password Generator",
    icon: KeyRound,
    description: "Buat password kuat dan aman."
  }
];

const CRYPTO_LIST = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "toncoin", symbol: "TON", name: "Toncoin" }
];

function App() {
  const [active, setActive] = useState("chat");
  const [mobileMenu, setMobileMenu] = useState(false);

  const tool = useMemo(() => TOOLS.find((t) => t.id === active), [active]);

  function chooseTool(id) {
    setActive(id);
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
          <p className="badge">AI Tools + Utility Workspace</p>
          <h1>AetherDesk, workspace cepat untuk AI, tempmail, kalkulator, crypto, dan tools harian.</h1>
          <p>
            Satu dashboard ringan untuk kebutuhan produktivitas harian. Mulai dari AI chat,
            generator email sementara, kalkulator canggih, cek harga crypto, sampai password generator.
          </p>

          <div className="heroActions">
            <a href="#workspace" className="primaryBtn">Mulai Pakai Tools</a>
            <a href="#features" className="secondaryBtn">Lihat Fitur</a>
          </div>
        </div>

        <div className="heroCard">
          <div className="miniTop">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h2>Smart Tool Hub</h2>
          <p>AetherDesk menggabungkan AI dan tools praktis dalam satu tampilan yang responsif untuk HP dan PC.</p>
          <div className="miniStats">
            <div>
              <strong>5+</strong>
              <small>Tools aktif</small>
            </div>
            <div>
              <strong>Fast</strong>
              <small>Cloudflare Worker</small>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <article>
          <Zap />
          <h3>Cepat</h3>
          <p>Frontend ringan dan backend Cloudflare Worker untuk akses cepat.</p>
        </article>
        <article>
          <ShieldCheck />
          <h3>Aman</h3>
          <p>API key AI disimpan di Cloudflare Runtime Secret, bukan di browser.</p>
        </article>
        <article>
          <Sparkles />
          <h3>Multi Tool</h3>
          <p>AI chat, TempMail, kalkulator, harga crypto, dan password generator.</p>
        </article>
      </section>

      <section id="tools" className="toolsIntro">
        <p className="badge dark">AetherDesk Tools</p>
        <h2>Pilih tool yang ingin kamu pakai.</h2>
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
              <p className="toolDesc">{tool.description}</p>
            </div>
          </div>

          {active === "chat" && <AIChat />}
          {active === "tempmail" && <TempMail />}
          {active === "calculator" && <AdvancedCalculator />}
          {active === "crypto" && <CryptoPrice />}
          {active === "password" && <PasswordGenerator />}
        </section>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} AetherDesk. AI tools and utility workspace.</p>
      </footer>
    </main>
  );
}

function AIChat() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

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
          system:
            "Kamu adalah AetherDesk AI. Jawab dalam bahasa Indonesia yang jelas, rapi, dan mudah dipahami pemula.",
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

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tanya apa saja ke AI..."
      />

      <div className="actionRow">
        <button className="runBtn" onClick={runAI} disabled={loading || !input.trim()}>
          {loading ? <Loader2 className="spin" size={18} /> : <Bot size={18} />}
          {loading ? "Memproses..." : "Jalankan AI"}
        </button>

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

      <ResultBox title="Hasil AI" value={output || "Output AI akan muncul di sini."} />
    </>
  );
}

function TempMail() {
  const [email, setEmail] = useState("");

  const domains = ["aethermail.dev", "tempmail.local", "quickmail.app", "maildrop.tools"];

  function generateEmail() {
    const randomName =
      "user" +
      Math.random().toString(36).substring(2, 8) +
      Math.floor(Math.random() * 999);

    const domain = domains[Math.floor(Math.random() * domains.length)];

    setEmail(`${randomName}@${domain}`);
  }

  return (
    <div className="toolBox">
      <p className="hint">
        Ini generator alamat email sementara. Untuk inbox asli, nanti bisa disambungkan ke API TempMail.
      </p>

      <button className="runBtn" onClick={generateEmail}>
        <Mail size={18} />
        Generate TempMail
      </button>

      <CopyBox value={email || "Klik Generate TempMail untuk membuat email."} />
    </div>
  );
}

function AdvancedCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    try {
      const safeExpr = expr
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("^", "**")
        .replace(/[^0-9+\-*/().%\s**]/g, "");

      if (!safeExpr.trim()) {
        setResult("Masukkan angka atau rumus dulu.");
        return;
      }

      const value = Function(`"use strict"; return (${safeExpr})`)();

      if (!Number.isFinite(value)) {
        setResult("Hasil tidak valid.");
        return;
      }

      setResult(String(value));
    } catch {
      setResult("Rumus salah. Contoh valid: 10+5*2 atau (100/4)+7");
    }
  }

  return (
    <div className="toolBox">
      <input
        className="input"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        placeholder="Contoh: (100 / 4) + 7 * 2"
      />

      <div className="quickGrid">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "%", "+"].map((v) => (
          <button key={v} onClick={() => setExpr(expr + v)}>{v}</button>
        ))}
      </div>

      <div className="actionRow">
        <button className="runBtn" onClick={calculate}>
          <Calculator size={18} />
          Hitung
        </button>

        <button
          className="clearBtn"
          onClick={() => {
            setExpr("");
            setResult("");
          }}
        >
          Reset
        </button>
      </div>

      <ResultBox title="Hasil Kalkulator" value={result || "Hasil perhitungan akan muncul di sini."} />
    </div>
  );
}

function CryptoPrice() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("usd");

  async function fetchPrices() {
    setLoading(true);

    try {
      const ids = CRYPTO_LIST.map((coin) => coin.id).join(",");

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency}&include_24hr_change=true`
      );

      const data = await res.json();

      const mapped = CRYPTO_LIST.map((coin) => ({
        ...coin,
        price: data[coin.id]?.[currency],
        change: data[coin.id]?.[`${currency}_24h_change`]
      }));

      setPrices(mapped);
    } catch {
      setPrices([]);
      alert("Gagal mengambil harga crypto. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="toolBox">
      <div className="selectRow">
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="idr">IDR</option>
        </select>

        <button className="runBtn" onClick={fetchPrices} disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : <Coins size={18} />}
          {loading ? "Loading..." : "Cek Harga"}
        </button>
      </div>

      <div className="cryptoGrid">
        {prices.length === 0 ? (
          <p className="hint">Klik Cek Harga untuk menampilkan harga crypto.</p>
        ) : (
          prices.map((coin) => (
            <div className="cryptoCard" key={coin.id}>
              <div>
                <strong>{coin.symbol}</strong>
                <span>{coin.name}</span>
              </div>
              <h3>
                {currency.toUpperCase()}{" "}
                {coin.price?.toLocaleString("id-ID") || "-"}
              </h3>
              <p className={coin.change >= 0 ? "green" : "red"}>
                24h: {coin.change?.toFixed(2) || "0.00"}%
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");

  function generatePassword() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  }

  return (
    <div className="toolBox">
      <label className="label">
        Panjang Password: {length}
      </label>

      <input
        type="range"
        min="8"
        max="40"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <button className="runBtn" onClick={generatePassword}>
        <KeyRound size={18} />
        Generate Password
      </button>

      <CopyBox value={password || "Klik Generate Password untuk membuat password."} />
    </div>
  );
}

function ResultBox({ title, value }) {
  return (
    <div className="result">
      <h3>{title}</h3>
      <pre>{value}</pre>
    </div>
  );
}

function CopyBox({ value }) {
  async function copyValue() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    alert("Berhasil disalin!");
  }

  return (
    <div className="copyBox">
      <pre>{value}</pre>
      <button onClick={copyValue}>
        <Copy size={16} />
        Copy
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

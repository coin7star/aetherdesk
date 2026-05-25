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
  Copy,
  Trash2,
  Edit3,
  Plus,
  MessageSquare
} from "lucide-react";
import "./style.css";

const TOOLS = [
  {
    id: "chat",
    name: "AI Chat",
    icon: Bot,
    description: "Chat AI cepat dengan history, rename, hapus chat, dan code block copy."
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

        <button
          className="mobileBtn"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      {mobileMenu && (
        <div className="mobileNav">
          <a href="#tools" onClick={() => setMobileMenu(false)}>
            Tools
          </a>
          <a href="#workspace" onClick={() => setMobileMenu(false)}>
            Workspace
          </a>
          <a href="#features" onClick={() => setMobileMenu(false)}>
            Fitur
          </a>
        </div>
      )}

      <section className="hero">
        <div className="heroText">
          <p className="badge">AI Tools + Utility Workspace</p>
          <h1>
            AetherDesk, workspace cepat untuk AI, tempmail, kalkulator, crypto,
            dan tools harian.
          </h1>
          <p>
            Satu dashboard ringan untuk kebutuhan produktivitas harian. Mulai
            dari AI chat, generator email sementara, kalkulator canggih, cek
            harga crypto, sampai password generator.
          </p>

          <div className="heroActions">
            <a href="#workspace" className="primaryBtn">
              Mulai Pakai Tools
            </a>
            <a href="#features" className="secondaryBtn">
              Lihat Fitur
            </a>
          </div>
        </div>

        <div className="heroCard">
          <div className="miniTop">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h2>Smart Tool Hub</h2>
          <p>
            AetherDesk menggabungkan AI dan tools praktis dalam satu tampilan
            yang responsif untuk HP dan PC.
          </p>

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
        <p>
          © {new Date().getFullYear()} AetherDesk. AI tools and utility
          workspace.
        </p>
      </footer>
    </main>
  );
}

function AIChat() {
  const STORAGE_KEY = "aetherdesk_chat_history";

  const createNewChat = () => ({
    id: crypto.randomUUID(),
    title: "Chat Baru",
    messages: [],
    createdAt: Date.now()
  });

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }

      return [createNewChat()];
    } catch {
      return [createNewChat()];
    }
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].id;
      }

      return null;
    } catch {
      return null;
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const activeChat = useMemo(() => {
    return chats.find((chat) => chat.id === activeChatId) || chats[0];
  }, [chats, activeChatId]);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  React.useEffect(() => {
    if (!activeChatId && chats[0]) {
      setActiveChatId(chats[0].id);
    }
  }, [activeChatId, chats]);

  function updateChat(chatId, updater) {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;
        return updater(chat);
      })
    );
  }

  function newChat() {
    const chat = createNewChat();
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
    setInput("");
  }

  function renameChat(chatId) {
    const current = chats.find((chat) => chat.id === chatId);
    const title = prompt("Nama chat baru:", current?.title || "Chat Baru");

    if (!title || !title.trim()) return;

    updateChat(chatId, (chat) => ({
      ...chat,
      title: title.trim()
    }));
  }

  function deleteChat(chatId) {
    const yes = confirm("Hapus chat ini?");
    if (!yes) return;

    setChats((prev) => {
      const filtered = prev.filter((chat) => chat.id !== chatId);

      if (filtered.length === 0) {
        const fresh = createNewChat();
        setActiveChatId(fresh.id);
        return [fresh];
      }

      if (activeChatId === chatId) {
        setActiveChatId(filtered[0].id);
      }

      return filtered;
    });
  }

  async function runAI() {
    if (!input.trim() || loading || !activeChat) return;

    const userText = input.trim();

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userText
    };

    const aiMessageId = crypto.randomUUID();

    const aiPlaceholder = {
      id: aiMessageId,
      role: "assistant",
      content: "Sedang memproses..."
    };

    updateChat(activeChat.id, (chat) => ({
      ...chat,
      title:
        chat.messages.length === 0
          ? userText.slice(0, 32) + (userText.length > 32 ? "..." : "")
          : chat.title,
      messages: [...chat.messages, userMessage, aiPlaceholder]
    }));

    setInput("");
    setLoading(true);

    try {
      const chatContext = activeChat.messages
        .slice(-8)
        .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n\n");

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          system:
            "Kamu adalah AetherDesk AI. Jawab dalam bahasa Indonesia yang jelas, rapi, dan mudah dipahami pemula. Jika memberi kode, selalu gunakan markdown code block dengan tiga backtick agar kode tampil di kotak khusus.",
          message: `${chatContext}\n\nUser terbaru: ${userText}`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal memanggil AI.");
      }

      updateChat(activeChat.id, (chat) => ({
        ...chat,
        messages: chat.messages.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content: data.text || "Tidak ada jawaban."
              }
            : msg
        )
      }));
    } catch (err) {
      updateChat(activeChat.id, (chat) => ({
        ...chat,
        messages: chat.messages.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content: "Error: " + err.message
              }
            : msg
        )
      }));
    } finally {
      setLoading(false);
    }
  }

  function handleEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runAI();
    }
  }

  return (
    <div className="chatGPTLayout">
      <aside className="chatHistory">
        <button className="newChatBtn" onClick={newChat}>
          <Plus size={18} />
          Chat Baru
        </button>

        <div className="chatList">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={chat.id === activeChat?.id ? "chatItem active" : "chatItem"}
            >
              <button
                className="chatTitleBtn"
                onClick={() => setActiveChatId(chat.id)}
              >
                <MessageSquare size={16} />
                <span>{chat.title}</span>
              </button>

              <div className="chatActions">
                <button onClick={() => renameChat(chat.id)} title="Rename chat">
                  <Edit3 size={15} />
                </button>

                <button onClick={() => deleteChat(chat.id)} title="Hapus chat">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="chatMain">
        <div className="chatMessages">
          {!activeChat || activeChat.messages.length === 0 ? (
            <div className="emptyChat">
              <Bot size={42} />
              <h3>Mulai percakapan baru</h3>
              <p>
                Tanyakan apa saja. Jawaban kode akan otomatis tampil dalam kotak
                yang bisa di-scroll dan di-copy.
              </p>
            </div>
          ) : (
            activeChat.messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))
          )}
        </div>

        <div className="chatComposer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Ketik pesan... Enter untuk kirim, Shift + Enter untuk baris baru"
          />

          <button className="runBtn" onClick={runAI} disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="spin" size={18} /> : <Bot size={18} />}
            {loading ? "Memproses..." : "Kirim"}
          </button>
        </div>
      </section>
    </div>
  );
}

function ChatMessage({ role, content }) {
  const parts = parseCodeBlocks(content);

  return (
    <div className={role === "user" ? "messageRow user" : "messageRow assistant"}>
      <div className="messageAvatar">{role === "user" ? "U" : <Bot size={17} />}</div>

      <div className="messageBubble">
        {parts.map((part, index) => {
          if (part.type === "code") {
            return (
              <CodeBlock
                key={index}
                language={part.language}
                code={part.content}
              />
            );
          }

          return (
            <p key={index} className="messageText">
              {part.content}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function parseCodeBlocks(text) {
  const regex = /```(\w+)?\n?([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index).trim();

      if (beforeText) {
        parts.push({
          type: "text",
          content: beforeText
        });
      }
    }

    parts.push({
      type: "code",
      language: match[1] || "code",
      content: match[2].trim()
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const afterText = text.slice(lastIndex).trim();

    if (afterText) {
      parts.push({
        type: "text",
        content: afterText
      });
    }
  }

  if (parts.length === 0) {
    return [
      {
        type: "text",
        content: text
      }
    ];
  }

  return parts;
}

function CodeBlock({ language, code }) {
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      alert("Kode berhasil disalin!");
    } catch {
      alert("Gagal copy kode.");
    }
  }

  return (
    <div className="codeBlock">
      <div className="codeHeader">
        <span>{language}</span>

        <button onClick={copyCode}>
          <Copy size={15} />
          Copy
        </button>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TempMail() {
  const [email, setEmail] = useState("");

  const domains = [
    "aethermail.dev",
    "tempmail.local",
    "quickmail.app",
    "maildrop.tools"
  ];

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
        Ini generator alamat email sementara. Untuk inbox asli, nanti bisa
        disambungkan ke API TempMail.
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
        .replace(/[^0-9+\-*/().%\s]/g, "");

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
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "%", "+"].map(
          (v) => (
            <button key={v} onClick={() => setExpr(expr + v)}>
              {v}
            </button>
          )
        )}
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

      <ResultBox
        title="Hasil Kalkulator"
        value={result || "Hasil perhitungan akan muncul di sini."}
      />
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
      <label className="label">Panjang Password: {length}</label>

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

    try {
      await navigator.clipboard.writeText(value);
      alert("Berhasil disalin!");
    } catch {
      alert("Gagal copy.");
    }
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

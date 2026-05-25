export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/ai" && request.method === "POST") {
      return handleAI(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleAI(request, env) {
  try {
    const body = await request.json();
    const message = String(body.message || "").trim();
    const system = String(body.system || "Kamu adalah asisten AI.").trim();

    if (!message) {
      return json({ error: "Message kosong." }, 400);
    }

    if (!env.GROQ_API_KEY) {
      return json({ error: "ENV GROQ_API_KEY belum diisi." }, 500);
    }

    const model = env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: message }
        ],
        temperature: Number(env.AI_TEMPERATURE || 0.7),
        max_tokens: Number(env.AI_MAX_TOKENS || 1200)
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return json({ error: data.error?.message || "Groq API error." }, res.status);
    }

    return json({
      text: data.choices?.[0]?.message?.content || ""
    });
  } catch (err) {
    return json({ error: err.message || "Server error." }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

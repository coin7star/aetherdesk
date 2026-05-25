export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const message = String(body.message || "").trim();
    const system = String(body.system || "Kamu adalah asisten AI.").trim();

    if (!message) {
      return json({ error: "Message kosong." }, 400);
    }

    // Provider AI
    const provider = String(env.AI_PROVIDER || "groq").toLowerCase();

    // GROQ
    if (provider === "groq") {
      return await callGroq(env, system, message);
    }

    // GEMINI
    if (provider === "gemini") {
      return await callGemini(env, system, message);
    }

    // OPENAI
    if (provider === "openai") {
      return await callOpenAI(env, system, message);
    }

    return json({
      error: "AI_PROVIDER tidak dikenal."
    }, 400);

  } catch (err) {
    return json({
      error: err.message || "Server error."
    }, 500);
  }
}

// =========================
// GROQ
// =========================
async function callGroq(env, system, message) {

  if (!env.GROQ_API_KEY) {
    return json({
      error: "ENV GROQ_API_KEY belum diisi."
    }, 500);
  }

  const model =
    env.GROQ_MODEL ||
    "llama-3.3-70b-versatile";

  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: system
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: Number(
          env.AI_TEMPERATURE || 0.7
        ),
        max_tokens: Number(
          env.AI_MAX_TOKENS || 1200
        )
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return json({
      error:
        data.error?.message ||
        "Groq API error."
    }, res.status);
  }

  return json({
    text:
      data.choices?.[0]?.message?.content || ""
  });
}

// =========================
// GEMINI
// =========================
async function callGemini(env, system, message) {

  if (!env.GEMINI_API_KEY) {
    return json({
      error: "ENV GEMINI_API_KEY belum diisi."
    }, 500);
  }

  const model =
    env.GEMINI_MODEL ||
    "gemini-1.5-flash";

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: system
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return json({
      error:
        data.error?.message ||
        "Gemini API error."
    }, res.status);
  }

  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("") || "";

  return json({ text });
}

// =========================
// OPENAI
// =========================
async function callOpenAI(env, system, message) {

  if (!env.OPENAI_API_KEY) {
    return json({
      error: "ENV OPENAI_API_KEY belum diisi."
    }, 500);
  }

  const model =
    env.OPENAI_MODEL ||
    "gpt-4o-mini";

  const res = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: system
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return json({
      error:
        data.error?.message ||
        "OpenAI API error."
    }, res.status);
  }

  return json({
    text:
      data.choices?.[0]?.message?.content || ""
  });
}

// =========================
// JSON RESPONSE
// =========================
function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8"
      }
    }
  );
}

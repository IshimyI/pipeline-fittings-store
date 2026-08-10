export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    if (request.headers.get("X-Relay-Secret") !== env.RELAY_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response("Bad JSON", { status: 400 });
    }

    const { token, chatId, text } = payload;
    const allowed = (env.ALLOWED_TOKENS || "").split(",").map((t) => t.trim());
    if (!token || !allowed.includes(token)) {
      return new Response("Token not allowed", { status: 403 });
    }

    const tgResp = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );
    const body = await tgResp.text();
    return new Response(body, {
      status: tgResp.status,
      headers: { "Content-Type": "application/json" },
    });
  },
};

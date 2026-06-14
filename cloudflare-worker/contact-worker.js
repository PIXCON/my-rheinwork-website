// Rheinwork contact form worker — Cloudflare Worker + Postmark
// Receives the contact form POST (JSON), emails the team and sends the sender a confirmation.
// Deploy + config: see README.md in this folder.
//   Secret: POSTMARK_TOKEN   (wrangler secret put POSTMARK_TOKEN)
//   Vars:   FROM_EMAIL, TO_EMAIL, ALLOWED_ORIGINS   (in wrangler.toml)

const CONFIRM = {
  de: {
    subject: "Ihre Anfrage bei Rheinwork",
    body: (d) => `Hallo ${d.firstname},

vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.

Ihre Angaben:
Thema: ${d.topic || "Allgemein"}
Nachricht: ${d.message || "(keine)"}

Viele Grüße
Ihr Rheinwork-Team`
  },
  en: {
    subject: "Your enquiry to Rheinwork",
    body: (d) => `Hi ${d.firstname},

thank you for your message. We have received your enquiry and usually get back to you within 24 hours.

Your details:
Topic: ${d.topic || "General"}
Message: ${d.message || "(none)"}

Best regards
The Rheinwork team`
  }
};

function corsHeaders(origin, allowed) {
  const list = (allowed || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = origin && list.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : (list[0] || "*"),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors }
  });
}

async function sendPostmark(token, msg) {
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token
    },
    body: JSON.stringify({ MessageStream: "outbound", ...msg })
  });
  if (!res.ok) throw new Error("Postmark " + res.status + ": " + (await res.text()));
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request.headers.get("Origin"), env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, cors);

    let d;
    try { d = await request.json(); } catch { return json({ ok: false, error: "bad_json" }, 400, cors); }

    // Honeypot: a bot filled the hidden field -> pretend success, send nothing.
    if (d.website) return json({ ok: true }, 200, cors);

    const email = (d.email || "").trim();
    const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!d.firstname || !d.lastname || !validEmail || !d.consent) {
      return json({ ok: false, error: "invalid" }, 400, cors);
    }

    if (!env.POSTMARK_TOKEN) return json({ ok: false, error: "not_configured" }, 500, cors);

    const fullName = `${d.firstname} ${d.lastname}`.trim();
    const topic = d.topic || "Allgemein";

    try {
      // 1) Notification to the team
      await sendPostmark(env.POSTMARK_TOKEN, {
        From: env.FROM_EMAIL,
        To: env.TO_EMAIL,
        ReplyTo: email,
        Subject: `Neue Anfrage von ${fullName} (${topic})`,
        TextBody:
`Neue Kontaktanfrage über die Website:

Name:    ${fullName}
Firma:   ${d.company || "-"}
E-Mail:  ${email}
Thema:   ${topic}
Sprache: ${d.lang || "-"}

Nachricht:
${d.message || "(keine)"}`
      });

      // 2) Confirmation to the sender (autoresponder)
      const c = CONFIRM[d.lang === "en" ? "en" : "de"];
      await sendPostmark(env.POSTMARK_TOKEN, {
        From: env.FROM_EMAIL,
        To: email,
        Subject: c.subject,
        TextBody: c.body(d)
      });

      return json({ ok: true }, 200, cors);
    } catch (err) {
      return json({ ok: false, error: "send_failed" }, 502, cors);
    }
  }
};

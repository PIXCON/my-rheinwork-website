// Cloudflare Pages Function — contact form endpoint (same-origin: POST /api/contact)
// Sends a team notification + a sender confirmation via Postmark, with Cloudflare Turnstile + honeypot.
// Configure in Pages → Settings → Environment variables (mark tokens as "Secret"):
//   POSTMARK_TOKEN   (secret)  — Postmark Server Token
//   FROM_EMAIL                 — verified sender, e.g. kontakt@rheinwork.com
//   TO_EMAIL                   — inbox, e.g. info@rheinwork.com
//   TURNSTILE_SECRET (secret)  — Turnstile secret key (optional; if unset, captcha is skipped)

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

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
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

async function verifyTurnstile(secret, token, ip) {
  if (!secret) return true; // not configured yet -> skip (allows preview/staging without captcha)
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token || "");
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  return data && data.success === true;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "bad_json" }, 400); }

  // Honeypot: a bot filled the hidden field -> pretend success, send nothing.
  if (d.website) return json({ ok: true }, 200);

  const email = (d.email || "").trim();
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!d.firstname || !d.lastname || !validEmail || !d.consent) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // Turnstile (skipped automatically if TURNSTILE_SECRET is not set)
  const token = d["cf-turnstile-response"] || d.turnstile;
  const ip = request.headers.get("CF-Connecting-IP");
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET, token, ip))) {
    return json({ ok: false, error: "captcha" }, 400);
  }

  if (!env.POSTMARK_TOKEN) return json({ ok: false, error: "not_configured" }, 500);

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

    return json({ ok: true }, 200);
  } catch (err) {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

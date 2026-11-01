// Cloudflare Worker — serves the Hugo static site (assets binding) and handles POST /api/contact.
// Static assets are served first; this Worker only runs for non-asset paths.
// Env (Worker → Settings → Variables & Secrets; mark tokens as "Secret"):
//   POSTMARK_TOKEN (secret) · FROM_EMAIL · TO_EMAIL · TURNSTILE_SECRET (secret, optional)
//   ADPURE_INTAKE_URL · ADPURE_INTAKE_KEY (secret) – optional: each enquiry also goes to the AdPure CRM

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
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

async function sendPostmark(token, msg) {
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json", "X-Postmark-Server-Token": token },
    body: JSON.stringify({ MessageStream: "outbound", ...msg })
  });
  if (!res.ok) throw new Error("Postmark " + res.status + ": " + (await res.text()));
}

async function verifyTurnstile(secret, token, ip) {
  if (!secret) return true; // not configured yet -> skip (allows preview without captcha)
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token || "");
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  return data && data.success === true;
}

// Forwards an accepted enquiry to the AdPure CRM (format nexus.event.v1). nexus_vid (visitor) and nexus_eid (this
// submission) are hidden fields the AdPure script puts into the form – they link the enquiry to exactly this
// submission, so AdPure's server report to Meta carries the same event ID as the browser pixel.
// Runs after the e-mails; a failure here never affects the visitor's "sent".
async function sendToAdPure(env, d, email, request) {
  if (!env.ADPURE_INTAKE_URL || !env.ADPURE_INTAKE_KEY) return;
  const fields = [
    ["company", d.company],
    ["topic", d.topic],
    ["message", d.message],
    ["lang", d.lang],
    ["nexus_vid", d.nexus_vid],
    ["nexus_eid", d.nexus_eid]
  ]
    .filter(([, v]) => typeof v === "string" && v.trim())
    .map(([name, v]) => ({ name, values: [v.trim().slice(0, 1000)] }));
  const page = request.headers.get("Referer");
  const event = {
    schema: "nexus.event.v1",
    event: "lead",
    eventId: crypto.randomUUID(),
    eventTime: new Date().toISOString(),
    source: "website",
    // Consent for ad feedback comes from the cookie banner (linked via nexus_vid), not from this form
    consent: { adFeedback: false },
    identifiers: { email },
    lead: { firstName: String(d.firstname).trim(), lastName: String(d.lastname).trim(), fields, ...(page ? { landingPage: page } : {}) }
  };
  try {
    const res = await fetch(env.ADPURE_INTAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Nexus-Key": env.ADPURE_INTAKE_KEY },
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) console.log("AdPure " + res.status + ": " + (await res.text()).slice(0, 300));
  } catch (err) {
    console.log("AdPure not reachable: " + err.message);
  }
}

async function handleContact(request, env, ctx) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: "bad_json" }, 400); }

  // Honeypot
  if (d.contact_ref) return json({ ok: true }, 200);

  const email = (d.email || "").trim();
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!d.firstname || !d.lastname || !validEmail || !d.consent) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const token = d["cf-turnstile-response"] || d.turnstile;
  const ip = request.headers.get("CF-Connecting-IP");
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET, token, ip))) {
    return json({ ok: false, error: "captcha" }, 400);
  }

  if (!env.POSTMARK_TOKEN) return json({ ok: false, error: "not_configured" }, 500);

  const fullName = `${d.firstname} ${d.lastname}`.trim();
  const topic = d.topic || "Allgemein";

  try {
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

    const c = CONFIRM[d.lang === "en" ? "en" : "de"];
    await sendPostmark(env.POSTMARK_TOKEN, { From: env.FROM_EMAIL, To: email, Subject: c.subject, TextBody: c.body(d) });

    // In the background: the visitor gets "sent" right away
    ctx.waitUntil(sendToAdPure(env, d, email, request));
    return json({ ok: true }, 200);
  } catch (err) {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
      return handleContact(request, env, ctx);
    }
    // Everything else: serve the static Hugo site.
    return env.ASSETS.fetch(request);
  }
};

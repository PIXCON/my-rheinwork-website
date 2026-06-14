# Kontaktformular-Versand (Cloudflare Worker + Postmark)

Die Website ist statisch (GitHub Pages) und kann selbst keine E-Mails senden. Dieser kleine
Cloudflare Worker nimmt die Formular-Absendung entgegen, schickt die Anfrage per **Postmark** an euch
und sendet dem Absender eine Empfangsbestätigung.

```
Formular (JS fetch)  ->  Cloudflare Worker  ->  Postmark  ->  E-Mail an info@ + Bestätigung an Absender
```

## Einmalige Einrichtung

### 1. Postmark vorbereiten
1. Account auf postmarkapp.com anlegen, einen **Server** erstellen.
2. **Sender Signature / Domain verifizieren** für `rheinwork.com` (SPF- und DKIM-DNS-Einträge setzen).
   Ohne Verifizierung landen die Mails im Spam oder werden abgelehnt.
3. **Server API Token** kopieren (unter „API Tokens").
4. Hinweis: Free-Plan = 100 Mails/Monat. Pro Anfrage werden 2 Mails versendet (Team + Bestätigung).

### 2. Worker deployen
Voraussetzung: Node.js + Cloudflare-Account.

```bash
npm install -g wrangler
wrangler login

cd cloudflare-worker
# wrangler.toml anpassen: FROM_EMAIL, TO_EMAIL, ALLOWED_ORIGINS
wrangler secret put POSTMARK_TOKEN   # Postmark Server API Token einfügen
wrangler deploy
```

`wrangler deploy` gibt eine URL aus, z. B. `https://rheinwork-contact.<subdomain>.workers.dev`.

### 3. Website verbinden
In `config/_default/hugo.toml` unter `[params]` die Worker-URL eintragen:

```toml
contactEndpoint = "https://rheinwork-contact.<subdomain>.workers.dev"
```

Danach committen/deployen. Solange `contactEndpoint` leer ist, zeigt das Formular nur die
Erfolgs-Animation an, **sendet aber nichts** (lokale Vorschau).

### 4. Datenschutz
- In der **Datenschutzerklärung** ergänzen: Verarbeitung der Formulardaten, Einsatz von **Postmark**
  (Anbieter, Auftragsverarbeitung/DPA) und **Cloudflare**.
- Die **Consent-Checkbox** im Formular ist bereits Pflicht und verlinkt auf die Datenschutzseite.

## Konfiguration (wrangler.toml)
| Schlüssel | Bedeutung |
|---|---|
| `FROM_EMAIL` | Verifizierte Absenderadresse (Postmark) |
| `TO_EMAIL` | Wohin die Anfragen gehen |
| `ALLOWED_ORIGINS` | Erlaubte Origins (CORS), kommagetrennt; Produktionsdomain ergänzen |
| `POSTMARK_TOKEN` | **Secret**, via `wrangler secret put` |

## Testen
- Lokal: `wrangler dev` und das Formular gegen die lokale Worker-URL testen.
- Live: Formular ausfüllen und absenden; Anfrage sollte bei `TO_EMAIL` ankommen, Absender erhält die Bestätigung.

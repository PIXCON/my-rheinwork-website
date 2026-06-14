---
title: "Consent Mode v2 ohne Datenverlust nutzen"
date: 2026-06-14
tag: "Daten"
author: "Dustin Schneider"
cover: "/img/blog/consent-mode-v2.svg"
summary: "Consent Mode v2 ist seit 2024 Pflicht für viele Google-Ads-Kampagnen im EWR. Dieser Leitfaden erklärt, wie Sie damit Einwilligung respektieren und trotzdem auswertbare Daten behalten."
description: "Consent Mode v2 verständlich erklärt: Basic vs Advanced, modellierte Conversions, Zusammenspiel mit serverseitigem GTM und typische Fehler. So bleiben Sie konform und behalten nutzbare Daten."
related:
  - "server-side-tracking"
  - "server-side-gtm-ga4"
  - "bad-data-model"
---

Seit Frühjahr 2024 verknüpft Google die Auslieferung wichtiger Werbefunktionen im Europäischen
Wirtschaftsraum mit einer technischen Bedingung: Wer Remarketing-Listen und Conversion-Daten weiter
nutzen will, muss Einwilligungssignale korrekt an Google übermitteln. Genau das leistet **Consent Mode
v2**. Viele Unternehmen behandeln das als reine Pflichtübung und verlieren dabei mehr Daten als nötig.
Dabei ist Consent Mode v2 richtig eingesetzt kein Datenkiller, sondern ein Werkzeug, das Einwilligung
respektiert und gleichzeitig auswertbare Zahlen erhält. Dieser Leitfaden erklärt ohne Fachjargon, was
dahintersteckt und wie Sie konform bleiben, ohne blind zu fliegen.

## Das Wichtigste in Kürze

- Consent Mode v2 übermittelt den Einwilligungsstatus an Google, statt Tags einfach zu blockieren.
- Ohne korrektes Setup riskieren Sie im EWR den Verlust von Remarketing und Conversion-Messung.
- Der Advanced Mode erlaubt modellierte Conversions und schließt so einen Teil der Consent-Lücke.
- In Kombination mit serverseitigem GTM behalten Sie die Kontrolle über das, was Ihr Haus verlässt.

## Was Consent Mode v2 eigentlich ist

Consent Mode v2 ist eine Schnittstelle zwischen Ihrem Cookie-Banner und den Google-Diensten auf Ihrer
Website. Statt Tags bei fehlender Einwilligung schlicht abzuschalten, übermittelt der Consent Mode den
**Einwilligungsstatus** als Signal. Konkret geht es um vier Parameter: `ad_storage` und
`analytics_storage` regeln die klassische Datenspeicherung, die beiden 2024 neu hinzugekommenen
Parameter `ad_user_data` und `ad_personalization` regeln, ob Nutzerdaten an Google für Werbung und ob
personalisierte Werbung erlaubt sind. Erst diese beiden neuen Signale machen aus dem alten Consent Mode
die Version v2.

Der entscheidende Punkt: Google-Tags passen ihr Verhalten an diese Signale an. Liegt keine Einwilligung
vor, werden keine Cookies gesetzt und keine identifizierenden Daten übertragen. Es fließen lediglich
anonyme, aggregierte Signale ohne Personenbezug, sofern Sie den entsprechenden Modus aktiviert haben.

## Warum das Thema kein optionales Detail ist

Google hat Consent Mode v2 zur Bedingung gemacht, um Daten aus dem EWR überhaupt noch für bestimmte
Funktionen zu verwenden. Fehlt das korrekt implementierte Signal, gilt:

- **Remarketing-Listen** füllen sich nicht mehr oder schrumpfen, weil keine Zielgruppen aufgebaut
  werden dürfen.
- **Conversion-Daten** fehlen oder kommen unvollständig an, was die Gebotssteuerung verschlechtert.
- **Smart Bidding** arbeitet mit weniger Signalen und liefert tendenziell schlechtere Ergebnisse.

Für Unternehmen, die nennenswertes Budget über Google Ads ausgeben, ist das keine theoretische Gefahr,
sondern ein direkter Hebel auf die Kampagnenleistung. Wer hier schludert, optimiert mit weniger Daten
und zahlt das über schlechtere Ergebnisse.

## Basic Mode und Advanced Mode im Vergleich

Consent Mode v2 kennt zwei Betriebsarten, und die Wahl hat spürbare Folgen für Ihre Datenbasis.

Im **Basic Mode** werden die Google-Tags erst geladen, nachdem der Nutzer eingewilligt hat. Lehnt
jemand ab, feuert gar nichts, es gehen also auch keine anonymen Signale an Google. Das ist
datensparsam, lässt aber wenig Spielraum für Modellierung.

Im **Advanced Mode** laden die Tags von Anfang an, übermitteln bei fehlender Einwilligung jedoch nur
anonyme, cookielose Pings. Diese enthalten keinen Personenbezug, geben Google aber genug Kontext, um
fehlende Conversions statistisch zu modellieren.

| Kriterium | Basic Mode | Advanced Mode |
|----------|-----------|---------------|
| Tag-Verhalten bei Ablehnung | Tags laden nicht | anonyme, cookielose Pings |
| Modellierte Conversions | nicht möglich | möglich |
| Datenbasis für Bidding | nur eingewilligte Nutzer | eingewilligt plus Modell |
| Datensparsamkeit | maximal | hoch, aber mit Signalen |
| Komplexität im Setup | gering | höher, dafür mehr Daten |

Welcher Modus der richtige ist, hängt von Ihrer Risikoabwägung und der Einschätzung Ihrer
Datenschutzberatung ab. Aus reiner Datenperspektive holt der Advanced Mode mehr heraus.

## Wie modellierte Conversions die Lücke schließen

Wenn ein Teil Ihrer Besucher nicht einwilligt, entsteht eine Lücke: Diese Conversions sehen Sie nicht
direkt. Im Advanced Mode nutzt Google die anonymen Pings der ablehnenden Nutzer zusammen mit dem
beobachtbaren Verhalten der einwilligenden Nutzer, um die fehlenden Conversions **statistisch zu
schätzen**. Das Ergebnis sind modellierte Conversions, die in Ihren Berichten ergänzt werden.

Wichtig dabei: Modellierung ist eine Schätzung, kein Ersatz für saubere Erfassung. Sie funktioniert
umso besser, je mehr verlässliche Grunddaten vorliegen. Genau hier wird deutlich, warum Consent Mode
und eine robuste Messinfrastruktur zusammengehören: Je belastbarer Ihre erfassten Daten sind, desto
genauer kann das Modell den Rest schätzen. Umgekehrt gilt: Wer ohnehin schon systematisch Daten
verliert, etwa durch kurze Cookie-Laufzeiten oder ein fehlerhaftes Banner, gibt dem Modell eine
wacklige Grundlage. Die Qualität der modellierten Conversions steht und fällt also mit der Qualität
dessen, was Sie überhaupt sauber messen.

## Consent Mode v2 im serverseitigen GTM-Setup

Consent Mode und Server-Side-Tracking sind keine Gegensätze, sondern ergänzen sich. In einem
serverseitigen Setup wird der Einwilligungsstatus im Browser erfasst und gemeinsam mit dem Event an
Ihren eigenen Server geschickt. Dort entscheidet der serverseitige Container regelbasiert, welche
Daten an welches Ziel gehen und welche bei fehlender Einwilligung zurückgehalten oder anonymisiert
werden.

Der Vorteil: Die Hoheit über die Weitergabe liegt nicht mehr allein bei den Tags im Browser, sondern
bei Ihrer Infrastruktur. Sie können Einwilligung serverseitig durchsetzen, Daten vor der Weitergabe
minimieren und sauber dokumentieren, was unter welcher Bedingung an Dritte geht. Wie ein solches Setup
technisch aussieht, erklären wir im Detail in unserem Leitfaden zu
[serverseitigem GTM und GA4]({{< relref "/blog/server-side-gtm-ga4" >}}).

## Häufige Fehler bei der Umsetzung

In der Praxis sehen wir immer wieder dieselben Stolperfallen:

- **Nur v1 implementiert:** Die alten Parameter sind gesetzt, aber `ad_user_data` und
  `ad_personalization` fehlen. Damit erfüllen Sie die v2-Anforderung nicht.
- **Standardstatus falsch gesetzt:** Wird der Default vor Banner-Interaktion zu großzügig gesetzt,
  feuern Tags, bevor eine Entscheidung vorliegt.
- **Banner und Consent Mode laufen getrennt:** Das Cookie-Tool zeigt einen Status an, der nicht
  sauber an die Tags durchgereicht wird. Die Folge sind widersprüchliche Daten.
- **Keine Validierung:** Es wird angenommen, dass alles funktioniert, ohne je den tatsächlichen
  Signalfluss zu prüfen.

Jeder dieser Fehler führt entweder zu Datenverlust oder zu einem Setup, das nur scheinbar konform ist.

## So validieren Sie Ihr Setup

Ein Consent-Mode-Setup ist erst dann fertig, wenn Sie nachweisen können, dass es funktioniert. Dafür
prüfen wir mehrere Ebenen:

1. **Signalprüfung:** Werden alle vier Parameter korrekt gesetzt, sowohl im Default-Zustand als auch
   nach Einwilligung und nach Ablehnung?
2. **Banner-Abgleich:** Stimmt das, was der Nutzer im Banner wählt, mit dem an Google gesendeten Signal
   überein?
3. **Tag-Verhalten:** Verhalten sich die Tags im jeweiligen Zustand wie erwartet, also keine Cookies
   ohne Einwilligung?
4. **Plausibilität in den Berichten:** Tauchen modellierte Conversions auf, und bewegen sich die Zahlen
   im erwartbaren Rahmen?

Erst wenn diese Punkte stimmen, ist das Setup belastbar. Alles andere ist ein Versprechen ohne
Nachweis.

## Konform bleiben und trotzdem Daten behalten

Der scheinbare Widerspruch zwischen Datenschutz und Datennutzung löst sich auf, wenn man Consent Mode
v2 richtig versteht. Es geht nicht darum, Einwilligung zu umgehen, sondern darum, sie sauber technisch
abzubilden und gleichzeitig die legitimen Spielräume zu nutzen, die Google bietet. Wer ablehnt, wird
respektiert. Wer einwilligt, wird vollständig erfasst. Und die Lücke dazwischen wird, soweit zulässig,
modelliert statt einfach ignoriert.

Für Entscheider heißt das: Sie müssen sich nicht zwischen Rechtssicherheit und nutzbaren Daten
entscheiden. Ein durchdachtes Setup liefert beides. Die rechtliche Bewertung im Einzelfall gehört
weiterhin in die Hände Ihrer Datenschutzberatung. Die saubere technische Grundlage dafür liefern wir.

## Häufig gestellte Fragen

**Ist Consent Mode v2 für alle Unternehmen Pflicht?**
Für Unternehmen, die Google Ads oder Remarketing mit Nutzern aus dem EWR betreiben, ist die korrekte
Übermittlung der Einwilligungssignale faktisch Voraussetzung, um diese Funktionen weiter zu nutzen.

**Ersetzt Consent Mode v2 mein Cookie-Banner?**
Nein. Das Banner holt die Einwilligung ein, Consent Mode v2 leitet diese Entscheidung technisch an die
Google-Dienste weiter. Beide arbeiten zusammen, ersetzen sich aber nicht.

**Sind modellierte Conversions verlässlich?**
Sie sind eine statistische Schätzung und werden umso genauer, je mehr belastbare Grunddaten vorliegen.
Sie ersetzen keine saubere Erfassung, schließen aber einen Teil der Consent-Lücke.

**Funktioniert Consent Mode v2 auch ohne serverseitiges Tracking?**
Ja, Consent Mode v2 lässt sich rein client-seitig umsetzen. In Kombination mit serverseitigem GTM
gewinnen Sie jedoch mehr Kontrolle über die Datenweitergabe.

**Was passiert, wenn ich es gar nicht implementiere?**
Sie riskieren, dass Remarketing-Listen nicht mehr befüllt werden und Conversion-Daten aus dem EWR
fehlen. Das verschlechtert die Steuerung Ihrer Kampagnen messbar.

**Wie lange dauert die Einrichtung?**
Eine saubere Einrichtung inklusive Banner-Abgleich und Validierung ist meist in wenigen Tagen bis
wenigen Wochen machbar, abhängig vom Zustand Ihres bestehenden Setups.

## Fazit

Consent Mode v2 ist keine lästige Pflicht, sondern ein Werkzeug, mit dem Sie Einwilligung respektieren
und gleichzeitig auswertbare Daten behalten. Falsch oder gar nicht umgesetzt kostet er Sie Reichweite,
Conversion-Daten und am Ende Werbeleistung. Richtig umgesetzt, idealerweise eingebettet in eine
serverseitige Infrastruktur, schließt er einen Teil der Consent-Lücke, ohne den Datenschutz zu
untergraben. Wir behandeln Messung als Engineering und entwickeln mit **PIXCON** ein eigenes Tool für
Server-Side-Tracking und GTM-Hosting.

Mehr dazu auf unserer Seite [Measurement Infrastructure]({{< relref "/services/measurement-infrastructure" >}}).
Passend dazu: [Server-Side-Tracking: der vollständige Leitfaden]({{< relref "/blog/server-side-tracking" >}})
und [Serverseitiger GTM mit GA4]({{< relref "/blog/server-side-gtm-ga4" >}}).

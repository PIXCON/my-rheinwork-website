---
title: "Multi-Tenant von Tag 1: Fallen und Muster"
date: 2026-06-14
tag: "Produkt"
author: "Dustin Schneider"
cover: "/img/blog/multi-tenant-from-day-one.svg"
summary: "Mehrere Kunden auf einer Plattform klingt einfach, ist aber eine Architekturentscheidung mit langem Schatten. Warum sich Multi-Tenant nur schwer nachrüsten lässt, welche Isolationsmodelle es gibt und wann Sie es von Anfang an brauchen."
description: "Multi-Tenant von Tag 1: Isolationsmodelle, Datensicherheit zwischen Kunden, typische Fallen und die Kostenfrage. Ein Leitfaden für Entscheider beim SaaS-Aufbau."
related:
  - "mvp-without-cutting-corners"
  - "bad-data-model"
  - "build-vs-buy"
---

Wenn mehrere Kunden dieselbe Anwendung nutzen, jeder aber nur seine eigenen Daten sehen darf, sprechen
wir von **Multi-Tenant**. Klingt nach einem Detail der Implementierung. In Wirklichkeit ist es eine der
Entscheidungen mit dem längsten Schatten in Ihrem Produkt: Sie prägt das Datenmodell, die Sicherheit
und die Kosten der nächsten Jahre. Wer sie zu spät trifft, zahlt sie doppelt.

## Das Wichtigste in Kürze

- Multi-Tenant bedeutet: viele Kunden, eine Anwendung, strikt getrennte Daten.
- Nachrüsten ist teuer, weil die Trennung jede Tabelle und fast jede Abfrage betrifft.
- Es gibt mehrere Isolationsmodelle, von gemeinsamem Schema bis zu getrennten Datenbanken.
- Die wichtigste Frage ist nicht technisch, sondern: Wie viel Trennung verlangt Ihr Markt?

## Was Multi-Tenant wirklich bedeutet

Ein Tenant (Mandant) ist eine Einheit, die ihre Daten vollständig getrennt von allen anderen sieht,
meist ein Kundenunternehmen mit seinen eigenen Nutzern. Multi-Tenant heißt: Eine einzige laufende
Anwendung bedient viele solcher Mandanten gleichzeitig, ohne dass einer je die Daten eines anderen zu
Gesicht bekommt.

Der Reiz liegt auf der Hand. Sie betreiben **eine** Codebasis, **eine** Infrastruktur und spielen
Updates für alle auf einmal ein. Das ist effizient, skaliert wirtschaftlich und ist der Standard für
moderne SaaS-Produkte. Der Preis dafür: Die Trennung der Kunden ist nicht mehr nur Sache des
Betriebssystems oder eines separaten Servers, sondern muss in der Software selbst zuverlässig
sichergestellt werden.

## Warum sich Nachrüsten so teuer rächt

Multi-Tenant ist keine Funktion, die man später danebenstellt. Es ist eine Eigenschaft, die fast jeden
Teil des Systems berührt. Wenn die Trennung von Anfang an fehlt, betrifft sie jede Tabelle, in der
Kundendaten liegen, jede Abfrage, die diese Tabellen liest, und jede Stelle im Code, die Daten
schreibt.

Das Nachrüsten ist deshalb selten ein kleiner Umbau. Es bedeutet, das Datenmodell zu erweitern,
bestehende Daten sauber den richtigen Mandanten zuzuordnen und sicherzustellen, dass wirklich keine
Abfrage den Tenant vergisst. Ein einziger übersehener Pfad genügt, damit ein Kunde Daten eines anderen
sieht. Genau diese Lückenlosigkeit ist im Nachhinein schwer zu garantieren. Wie hoch der Preis eines
unsauberen Fundaments wird, beschreiben wir in
[Die versteckten Kosten eines schlechten Datenmodells]({{< relref "/blog/bad-data-model" >}}).

## Die Isolationsmodelle im Überblick

Es gibt nicht das eine richtige Multi-Tenant. Stattdessen ein Spektrum, das vom maximal geteilten bis
zum maximal getrennten Betrieb reicht. Die drei verbreiteten Modelle:

- **Gemeinsames Schema:** Alle Mandanten teilen sich dieselben Tabellen. Jede Zeile trägt eine Kennung,
  zu welchem Mandanten sie gehört. Effizient und einfach zu betreiben, aber die Trennung hängt
  vollständig an der korrekten Filterung im Code.
- **Getrennte Schemata:** Eine Datenbank, aber je Mandant ein eigener Namensraum mit eigenen Tabellen.
  Stärkere Trennung, etwas mehr Verwaltungsaufwand.
- **Getrennte Datenbanken:** Jeder Mandant bekommt seine eigene Datenbank. Die klarste Trennung, aber
  auch die höchsten Betriebskosten und der größte Aufwand bei Updates.

## Datensicherheit zwischen Mandanten

Beim gemeinsamen Schema ist die Trennung eine Software-Eigenschaft, kein physischer Zaun. Das ist
machbar und in der Praxis weit verbreitet, verlangt aber Disziplin: Jede Abfrage muss zuverlässig auf
den richtigen Mandanten eingegrenzt sein, und zwar nicht an einigen Stellen, sondern an allen.

Der robuste Weg ist, diese Eingrenzung nicht jeder einzelnen Abfrage zu überlassen, sondern sie zentral
zu erzwingen, sodass ein Vergessen schlicht nicht möglich ist. So wird aus einer Frage der Sorgfalt eine
Frage der Architektur. Wer dagegen den Mandanten in jeder Abfrage von Hand mitführt, baut sich eine
Fehlerquelle, die mit jeder neuen Funktion wächst.

## Vergleich der Isolationsmodelle

| Kriterium | Gemeinsames Schema | Getrennte Schemata | Getrennte Datenbanken |
|---|---|---|---|
| Trennung der Daten | logisch, im Code | stärker, je Namensraum | physisch, je Datenbank |
| Betriebskosten | niedrig | mittel | hoch |
| Aufwand bei Updates | gering, einmal für alle | mittel | hoch, je Datenbank |
| Skalierung auf viele Kunden | sehr gut | gut | begrenzt |
| Passt zu | vielen kleineren Kunden | mittlerer Zahl, klare Trennung | wenigen, mit harten Vorgaben |

## Wann Sie es von Anfang an brauchen

Die Faustregel ist einfach: Sobald absehbar mehrere Kunden auf derselben Plattform laufen sollen,
gehört Multi-Tenant ins Fundament, auch wenn am ersten Tag nur ein einziger Kunde existiert. Der erste
Kunde kostet die saubere Anlage kaum Mehraufwand. Der zehnte Kunde, nachträglich eingezogen, kostet
einen Umbau.

Es gibt auch den umgekehrten Fall. Bauen Sie eine interne Anwendung für genau eine Organisation, ohne
Aussicht auf weitere Mandanten, brauchen Sie Multi-Tenant nicht und sollten es weglassen. Die Kunst
liegt nicht darin, alles vorzubauen, sondern die Weichen früh richtig zu stellen, wo der Markt es
verlangt. Das ist dieselbe Logik wie beim
[MVP ohne Abstriche]({{< relref "/blog/mvp-without-cutting-corners" >}}): klein bauen, aber auf einem
Fundament, das trägt.

## Typische Fallen

- **Die Trennung zu spät einziehen:** der teuerste Fehler, weil er rückwirkend jede Tabelle betrifft.
- **Den Mandanten von Hand mitführen:** eine vergessene Stelle genügt für ein Datenleck.
- **Falsches Modell wählen:** getrennte Datenbanken für hunderte Kleinkunden machen den Betrieb teuer
  und Updates zur Qual.
- **Konfiguration und Daten vermischen:** Wenn mandantenspezifische Einstellungen im Code statt in den
  Daten liegen, wird jeder neue Kunde zum Deployment.

## Mehr als nur Daten: Was sonst noch mandantenfähig sein muss

Multi-Tenant endet nicht beim Datenmodell. Auch das Drumherum muss mitdenken. Die Nutzerverwaltung muss
wissen, zu welchem Mandanten ein Nutzer gehört. Die Abrechnung muss je Kunde sauber zugeordnet sein.
Anpassungen wie Logo, Domain oder Funktionsumfang gehören je Mandant gesteuert, nicht im Code verdrahtet.
Selbst Hintergrundprozesse und Auswertungen müssen wissen, in wessen Namen sie gerade laufen. Wer das
früh mitdenkt, vermeidet, dass jede dieser Stellen später einzeln nachgerüstet werden muss.

## Die Kostenfrage für Entscheider

Aus Sicht der Geschäftsführung ist Multi-Tenant keine technische Spielerei, sondern eine Frage von
Marge und Risiko. Eine sauber gebaute Plattform bedient jeden zusätzlichen Kunden zu geringen
Grenzkosten, denn Sie betreiben weiter eine Codebasis und eine Infrastruktur. Genau das macht das
SaaS-Modell wirtschaftlich attraktiv.

Auf der Risikoseite steht die Datensicherheit. Ein Vorfall, bei dem ein Kunde die Daten eines anderen
sieht, ist nicht nur ein Bug, sondern ein Vertrauensbruch, der Verträge und Reputation kostet. Genau
deshalb lohnt es sich, die Trennung früh und architektonisch zu lösen, statt sie der Sorgfalt im
Tagesgeschäft zu überlassen. Mehr dazu, wie wir das aufsetzen, unter
[SaaS Engineering]({{< relref "/services/saas-engineering" >}}).

## Multi-Tenant und das spätere Wachstum

Der eigentliche Wert einer mandantenfähigen Architektur zeigt sich beim Wachstum. Ein neuer Kunde wird
zur Konfiguration, nicht zum Projekt. Ein gemeinsames Update erreicht alle gleichzeitig. Und wenn ein
einzelner großer Kunde irgendwann härtere Anforderungen an die Trennung stellt, lässt sich genau er auf
ein stärkeres Isolationsmodell heben, ohne dass die ganze Plattform umgebaut werden muss. Diese
Beweglichkeit entsteht aber nur, wenn die Trennung von Anfang an konsequent gedacht ist.

## Häufig gestellte Fragen

**Was ist der Unterschied zwischen Multi-Tenant und mehreren Installationen?**
Bei mehreren Installationen läuft je Kunde eine eigene Kopie der Anwendung. Bei Multi-Tenant läuft eine
einzige Anwendung für alle, mit getrennten Daten. Letzteres skaliert wirtschaftlicher, verlangt aber
die saubere Trennung in der Software.

**Welches Isolationsmodell ist das richtige?**
Das hängt von Ihrem Markt ab. Viele kleinere Kunden sprechen für ein gemeinsames Schema, wenige Kunden
mit harten Trennungsvorgaben eher für getrennte Datenbanken. Wir wählen das Modell anhand Ihrer
konkreten Anforderungen.

**Können wir später das Modell wechseln?**
Ja, aber leichter von stärker geteilt zu stärker getrennt als umgekehrt. Deshalb legen wir die
logische Trennung von Anfang an sauber an, auch wenn wir mit einem geteilten Modell starten.

**Brauche ich Multi-Tenant für ein MVP?**
Nur, wenn absehbar mehrere Kunden auf der Plattform laufen sollen. Dann gehört es ins Fundament. Für
eine interne Anwendung mit genau einer Organisation ist es unnötiger Aufwand.

**Wie wird sichergestellt, dass kein Kunde fremde Daten sieht?**
Indem die Eingrenzung auf den Mandanten zentral erzwungen wird, statt sie jeder einzelnen Abfrage zu
überlassen. So kann ein Entwickler sie nicht versehentlich vergessen.

**Was kostet Multi-Tenant?**
Von Anfang an mitgedacht kostet es kaum Mehraufwand gegenüber einer Anwendung für einen Kunden.
Nachträglich eingezogen wird es zum Umbauprojekt. Genau das ist das Argument, es früh zu tun.

## Fazit

Multi-Tenant ist keine Funktion, die man anschraubt, sondern eine Eigenschaft, die im Fundament
entsteht. Früh richtig gesetzt, kostet sie kaum mehr und macht jeden weiteren Kunden günstig. Zu spät
nachgerüstet, wird sie zum teuren Umbau mit Sicherheitsrisiko. Die wichtigste Entscheidung ist nicht
das technische Modell, sondern die ehrliche Antwort auf die Frage, wie viele Kunden Ihre Plattform
tragen soll.

Mehr dazu unter [SaaS Engineering]({{< relref "/services/saas-engineering" >}}). Verwandte Beiträge:
[Ein MVP entwickeln, ohne Abstriche zu machen]({{< relref "/blog/mvp-without-cutting-corners" >}}) und
[Die versteckten Kosten eines schlechten Datenmodells]({{< relref "/blog/bad-data-model" >}}).

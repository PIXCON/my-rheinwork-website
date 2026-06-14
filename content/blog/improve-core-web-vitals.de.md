---
title: "Core Web Vitals messbar verbessern"
date: 2026-06-14
tag: "Performance"
author: "Dustin Schneider"
cover: "/img/blog/improve-core-web-vitals.svg"
summary: "Core Web Vitals sind ein offizieller Rankingfaktor und ein direkter Hebel für Conversion. Dieser Artikel erklärt LCP, INP und CLS in klaren Worten, zeigt konkrete Stellschrauben pro Metrik und wie Sie den Erfolg nachweisbar messen."
description: "Core Web Vitals verbessern: was LCP, INP und CLS bedeuten, warum sie Ranking und Conversion beeinflussen, konkrete Hebel pro Metrik und wie Sie Feld- und Labordaten richtig messen."
related:
  - "hugo-website-performance"
  - "why-is-my-website-slow"
  - "server-side-tracking"
---

Wer seine Website schneller machen will, stößt schnell auf drei Buchstabenkürzel: LCP, INP und CLS.
Zusammen bilden sie die **Core Web Vitals**, mit denen Google misst, wie gut sich eine Seite für echte
Besucher anfühlt. Sie sind kein abstrakter Laborwert, sondern ein offizieller Rankingfaktor und zugleich
einer der direktesten Hebel für mehr Anfragen und Käufe. Dieser Artikel erklärt die drei Metriken in
klaren Worten, zeigt konkrete Stellschrauben für jede einzelne und beschreibt, wie Sie den Erfolg vorher
und nachher belegen können, ohne sich auf ein Bauchgefühl zu verlassen.

## Das Wichtigste in Kürze

- LCP misst die Ladezeit des Hauptinhalts, INP die Reaktionsfähigkeit, CLS die visuelle Stabilität.
- Die Core Web Vitals sind ein offizieller Rankingfaktor und beeinflussen direkt die Conversion.
- Für jede Metrik gibt es klare, umsetzbare Hebel, von Bildern über Code bis zu festen Layoutmaßen.
- Entscheidend ist die Messung mit echten Felddaten, damit Verbesserungen nachweisbar werden.

## Was die Core Web Vitals überhaupt sind

Die Core Web Vitals sind drei Messwerte, mit denen Google die tatsächliche Nutzererfahrung einer Seite
beschreibt. Sie beantworten drei einfache Fragen: Wie schnell sieht der Besucher den Hauptinhalt? Wie
schnell reagiert die Seite auf eine Eingabe? Und bleibt das Layout stabil, oder springt etwas weg, gerade
wenn man klicken will? Diese drei Fragen entsprechen genau den Metriken LCP, INP und CLS. Sie sind bewusst
aus Sicht des Besuchers gedacht, nicht aus Sicht des Servers. Genau das macht sie so aussagekräftig: Sie
messen nicht eine technische Zahl im Verborgenen, sondern den Moment, in dem ein Besucher entscheidet, ob
er bleibt oder abspringt. Für Sie als Entscheider heißt das, dass diese drei Werte stellvertretend für die
gesamte gefühlte Qualität Ihrer Seite stehen.

## LCP: wie schnell der Hauptinhalt erscheint

**LCP** steht für Largest Contentful Paint und misst, wann das größte sichtbare Element geladen ist, meist
ein Hero-Bild oder eine große Überschrift. Ein guter LCP liegt unter rund 2,5 Sekunden. Ist er schlecht,
starrt der Besucher zu lange auf eine halb leere Seite. Die häufigsten Ursachen sind große, unoptimierte
Bilder, langsames Hosting und render-blockierende Ressourcen, die das Anzeigen verzögern.

## Die wichtigsten Hebel für einen guten LCP

- **Bilder optimieren:** in moderner Komprimierung und passender Größe ausliefern, statt riesige Originale.
- **Schnelles Hosting mit CDN:** damit die erste Antwort und die wichtigen Dateien zügig beim Besucher sind.
- **Render-blockierende Ressourcen entschärfen:** kritisches Laden zuerst, alles andere im Hintergrund.
- **Das Hauptbild priorisieren:** dem Browser früh signalisieren, welches Element zuerst geladen werden soll.

## INP: wie reaktionsschnell die Seite ist

**INP** steht für Interaction to Next Paint und misst, wie schnell die Seite auf eine Eingabe reagiert,
etwa einen Klick oder eine Eingabe in ein Formular. Ein guter INP liegt unter rund 200 Millisekunden.
Hakt es hier, fühlt sich die Seite trotz schnellem Laden träge an, weil zu viel JavaScript im Hintergrund
den Hauptprozess blockiert. Genau das ist bei überladenen Baukasten-Seiten mit vielen Skripten häufig der
Fall.

## Die wichtigsten Hebel für einen guten INP

Der Schlüssel ist weniger und besser organisierter Code. Konkret bedeutet das: unnötiges JavaScript
entfernen, vor allem überflüssige Plugins und Drittanbieter-Skripte. Was bleibt, wird so geladen, dass es
den Hauptprozess nicht blockiert, und aufwendige Aufgaben werden aufgeteilt, statt den Browser am Stück zu
beschäftigen. Eine schlanke technische Basis hat hier einen strukturellen Vorteil, weil sie von vornherein
weniger im Hintergrund rechnet. Mehr zu den Ursachen träger Seiten lesen Sie unter
[Warum ist meine Website langsam?]({{< relref "/blog/why-is-my-website-slow" >}}).

## CLS: wie stabil das Layout bleibt

**CLS** steht für Cumulative Layout Shift und misst, wie sehr Inhalte beim Laden verrutschen. Jeder kennt
den Moment, in dem man auf einen Button tippen will und im letzten Augenblick ein nachgeladenes Bild oder
ein Banner alles verschiebt, sodass man danebentippt. Ein guter CLS liegt unter rund 0,1. Die häufigsten
Ursachen sind Bilder und Anzeigen ohne reservierten Platz sowie Schriften, die beim Nachladen das Layout
umbauen.

## Die wichtigsten Hebel für einen guten CLS

- **Feste Maße für Bilder und Videos:** den Platz im Layout vorab reservieren, damit nichts nachträglich springt.
- **Platz für eingebundene Elemente:** Banner, Anzeigen und Einbindungen brauchen einen festen Bereich.
- **Schriften sauber laden:** so, dass der Text beim Wechsel der Schriftart nicht das ganze Layout verschiebt.
- **Inhalte nicht über vorhandenen einschieben:** Nachgeladenes unten ergänzen, nicht oben einfügen.

## Warum die Core Web Vitals ein Rankingfaktor sind

Google hat ein klares Interesse daran, Nutzern schnelle, stabile Seiten zu zeigen. Deshalb sind die Core
Web Vitals seit Jahren ein offizieller, bestätigter Rankingfaktor. Sie sind nicht der einzige und meist
nicht der stärkste, aber sie sind ein **Wettbewerbsvorteil bei sonst gleicher Relevanz**: Zwischen zwei
inhaltlich ähnlich guten Seiten gewinnt die schnellere. Und anders als viele weiche Faktoren sind die Core
Web Vitals klar messbar, was sie zu einem der wenigen SEO-Hebel macht, deren Wirkung Sie direkt belegen
können.

## Feld- gegen Labordaten: richtig messen

Beim Messen kommt es auf die richtige Datenquelle an. **Labordaten** entstehen unter kontrollierten
Bedingungen, etwa in PageSpeed Insights, und eignen sich gut, um Probleme zu finden und Änderungen zu
testen. **Felddaten** stammen von echten Besuchern mit echten Geräten und Verbindungen und zeigen, wie
schnell Ihre Seite wirklich ist. Für die Bewertung durch Google zählen die Felddaten, die Sie in der
Search Console unter Core Web Vitals einsehen.

| Aspekt | Labordaten | Felddaten |
|--------|------------|-----------|
| Herkunft | kontrollierter Test | echte Besucher |
| Werkzeug | PageSpeed Insights, Lighthouse | Search Console, Felddaten-Bericht |
| Stärke | Probleme finden und testen | reale Erfahrung abbilden |
| Rankingrelevanz | indirekt | direkt bewertet |

## Der Zusammenhang mit Conversion

Schnelle, stabile Seiten ranken nicht nur besser, sie verkaufen auch besser. Jede zusätzliche Sekunde
Ladezeit erhöht die Absprungrate, und ein springendes Layout, das den falschen Button trifft, frustriert
Besucher unmittelbar. Verbesserte Core Web Vitals wirken also doppelt: mehr Sichtbarkeit über das Ranking
und mehr Abschlüsse aus dem vorhandenen Traffic. Genau deshalb ist der Hebel so attraktiv, er zahlt auf
zwei Ziele gleichzeitig ein. Für eine Investitionsentscheidung ist das ein seltener Glücksfall, denn die
meisten Maßnahmen wirken nur auf eines von beidem. Wer den vorhandenen Traffic besser nutzt und zugleich
mehr Sichtbarkeit gewinnt, verbessert sein Verhältnis von Aufwand zu Ergebnis gleich an zwei Stellen, ohne
das Werbebudget zu erhöhen.

## So machen Sie die Verbesserung nachweisbar

Damit aus einer Optimierung ein belegbarer Erfolg wird, braucht es ein sauberes Vorher-Nachher. Das
heißt: vor der Arbeit die Felddaten in der Search Console und einen Laborwert in PageSpeed Insights
festhalten, dann gezielt an LCP, INP und CLS arbeiten und nach einigen Wochen erneut messen. Felddaten
brauchen etwas Zeit, weil sie sich aus echten Besuchen speisen. Wer so vorgeht, kann die Verbesserung in
Zahlen zeigen, statt sie nur zu behaupten. Wie wir das in der Praxis umsetzen, beschreibt unsere Leistung
[Performance & SEO]({{< relref "/services/performance-seo" >}}).

## Häufig gestellte Fragen

**Was sind gute Core-Web-Vitals-Werte?**
Als grobe Orientierung: LCP unter rund 2,5 Sekunden, INP unter rund 200 Millisekunden und CLS unter rund
0,1. Wichtig ist, dass diese Werte bei echten Besuchern im Feld erreicht werden, nicht nur im Labor.

**Worin unterscheiden sich Feld- und Labordaten?**
Labordaten entstehen im kontrollierten Test und helfen, Probleme zu finden. Felddaten stammen von echten
Besuchern und werden von Google für das Ranking herangezogen. Beide gehören zusammen, aber gewertet wird
das Feld.

**Wie lange dauert es, bis sich Verbesserungen zeigen?**
Im Labor sofort, im Feld erst nach einigen Wochen, weil sich Felddaten aus echten Besuchen über einen
Zeitraum speisen. Geduld gehört hier zum Vorgehen dazu.

**Welche Metrik sollte ich zuerst angehen?**
Meist die, die laut Search Console am deutlichsten im roten Bereich liegt. Oft ist das der LCP, weil große
Bilder und langsames Laden weit verbreitet sind und sich vergleichsweise schnell verbessern lassen.

**Bringen die Core Web Vitals wirklich mehr Umsatz?**
Direkt insofern, als schnellere und stabilere Seiten weniger Abbrüche und mehr Abschlüsse erzeugen.
Indirekt über besseres Ranking und mehr Sichtbarkeit. Der Hebel wirkt also auf Sichtbarkeit und Conversion
zugleich.

**Kann ich die Core Web Vitals selbst verbessern?**
Einfache Schritte wie Bilder optimieren ja. Strukturelle Probleme bei INP und Layout-Stabilität erfordern
oft Eingriffe in den Code und die technische Basis, die fachliche Begleitung sinnvoll machen.

## Fazit

Core Web Vitals sind keine Black Box, sondern drei klar definierte Fragen aus Sicht des Besuchers: Wie
schnell, wie reaktiv, wie stabil. Für jede gibt es konkrete Hebel, und das Beste daran ist die
Messbarkeit: Wer vorher und nachher sauber misst, kann die Verbesserung in Zahlen belegen, im Ranking und
in der Conversion.

Mehr dazu unter [Performance & SEO]({{< relref "/services/performance-seo" >}}) und
[Web Engineering]({{< relref "/services/web-engineering" >}}). Passend zum technischen Fundament:
[Warum eine Hugo-Website schneller lädt und besser rankt]({{< relref "/blog/hugo-website-performance" >}}).

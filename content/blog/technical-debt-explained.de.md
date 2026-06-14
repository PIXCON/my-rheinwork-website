---
title: "Technische Schulden ehrlich erklärt"
date: 2026-06-14
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/technical-debt-explained.svg"
summary: "Technische Schulden klingen nach einem reinen Entwicklerthema, sind aber eine handfeste Geschäftsausgabe. Wie sie entstehen, welche Zinsen sie verlangen und wie man sie abbaut, ohne alles neu zu bauen."
description: "Technische Schulden verständlich erklärt für Entscheider: was sie sind, wie sie entstehen, welche Kosten sie verursachen, gute und schlechte Schulden und wie man sie abbaut."
related:
  - "bad-data-model"
  - "boring-technology"
  - "keeping-software-running"
---

Wenn die Entwicklung neuer Funktionen plötzlich zäher wird, obwohl das Team dasselbe ist, liegt das
selten an mangelndem Einsatz. Meist meldet sich etwas Unsichtbares: **technische Schulden**. Der Begriff
klingt nach einem reinen Entwicklerthema, ist aber in Wahrheit eine ganz normale Geschäftsausgabe, die
in keiner Bilanz auftaucht und trotzdem jeden Monat Zinsen verlangt. Dieser Artikel erklärt in
geschäftlichen Begriffen, was technische Schulden sind, wie sie entstehen und wie man sie unter
Kontrolle hält, ohne in einen teuren Komplettneubau zu fliehen.

## Das Wichtigste in Kürze

- Technische Schulden sind eine Geschäftskosten, kein reines Entwicklerthema. Sie verlangsamen Features und erhöhen Risiken.
- Sie entstehen schleichend, durch Eile, Abkürzungen und veränderte Anforderungen, nicht durch schlechte Arbeit.
- Es gibt bewusste, gute Schulden und unbewusste, teure Schulden. Der Unterschied ist die Absicht.
- Man baut sie schrittweise ab, dort wo es weh tut, statt alles auf einmal neu zu bauen.

## Was technische Schulden wirklich sind

Stellen Sie sich technische Schulden wie einen Kredit vor. Man bekommt heute etwas schneller, indem man
eine Abkürzung nimmt, und zahlt dafür später zurück, mit Zinsen. Diese Zinsen sind kein abstraktes
Konzept: Sie zeigen sich als **langsamere Entwicklung, mehr Fehler und höhere Kosten** bei jeder
weiteren Änderung. Der Code funktioniert, das Produkt läuft, aber unter der Oberfläche wird jede neue
Funktion ein Stück teurer als nötig. Genau diese stille Verteuerung ist das eigentliche Problem.

## Wie technische Schulden entstehen

Technische Schulden sind selten das Ergebnis schlechter Arbeit. Sie entstehen aus ganz normalen,
nachvollziehbaren Gründen:

- **Zeitdruck:** Ein Termin steht, also wird die schnelle statt der saubere Lösung gewählt.
- **Veränderte Anforderungen:** Was vor einem Jahr richtig war, passt nicht mehr zur heutigen Realität.
- **Fehlendes Wissen am Anfang:** Manche Zusammenhänge versteht man erst, wenn das Produkt im Einsatz ist.
- **Gewachsene Provisorien:** Eine Zwischenlösung bleibt, weil sie ja funktioniert, und wird zum Dauerzustand.

Keiner dieser Gründe ist verwerflich. Problematisch wird es erst, wenn niemand mitschreibt, welche
Schulden aufgenommen wurden, und niemand sie je zurückzahlt.

## Die Zinsen, die technische Schulden verlangen

Der Vergleich mit einem Kredit ist deshalb so treffend, weil die Zinsen sehr real sind. Sie tauchen nur
nicht als Posten auf, sondern verteilen sich über den Alltag:

- **Langsamere Features:** Jede Änderung muss sich erst durch Altlasten kämpfen, bevor sie wirken kann.
- **Mehr Fehler:** Verworrene Stellen sind fehleranfällig, und ein Bug zieht oft den nächsten nach sich.
- **Höhere Kosten:** Was schnell gehen sollte, dauert lange, und Zeit ist im Engineering der größte Kostenfaktor.
- **Mehr Risiko:** Niemand traut sich an heikle Stellen, also bleiben Verbesserungen aus Angst liegen.
- **Frust im Team:** Gute Entwickler verlieren die Lust, wenn jede Aufgabe gegen das eigene System läuft.

Diese Zinsen zahlt nicht die Technik allein, sondern das ganze Unternehmen, in Form verpasster
Markteinführungen und steigender Wartungskosten.

## Gute Schulden, schlechte Schulden

Nicht alle technischen Schulden sind schlecht. Der entscheidende Unterschied ist die Absicht. **Gute
Schulden** nimmt man bewusst auf: Man entscheidet sich für eine schnellere Lösung, weil Geschwindigkeit
gerade wichtiger ist als Eleganz, und man notiert, dass hier später aufgeräumt werden muss. **Schlechte
Schulden** entstehen unbewusst und unbemerkt, ohne Plan zur Rückzahlung. Eine bewusste Abkürzung vor
einem wichtigen Launch kann klug sein. Dieselbe Abkürzung, vergessen und vervielfacht, wird zur Last.

| Merkmal | Gute Schulden | Schlechte Schulden |
| --- | --- | --- |
| Entstehung | Bewusst entschieden | Unbemerkt entstanden |
| Dokumentation | Festgehalten und sichtbar | Im Kopf einzelner Personen |
| Rückzahlung | Geplant und terminiert | Nie vorgesehen |
| Wirkung | Tempo zum richtigen Zeitpunkt | Stetig steigende Zinsen |

## Woran man technische Schulden erkennt

Sie müssen kein Entwickler sein, um die Warnsignale zu bemerken:

- Einfache Änderungen dauern überraschend lange, und niemand kann gut erklären, warum.
- Nach jedem neuen Feature tauchen Fehler an scheinbar unbeteiligten Stellen auf.
- Das Team spricht von bestimmten Bereichen, die man besser nicht anfasst.
- Schätzungen werden immer vorsichtiger, weil das Risiko schwer einzuschätzen ist.

Diese Symptome ähneln denen eines schwachen Datenmodells, und oft hängen beide zusammen. Mehr dazu im
Beitrag über [die Kosten eines schlechten Datenmodells]({{< relref "/blog/bad-data-model" >}}).

## Ein Beispiel aus dem Alltag

Stellen Sie sich ein Team vor, das vor einem wichtigen Launch eine Funktion schnell umsetzt, indem es
eine Berechnung an drei verschiedenen Stellen im Code dupliziert, statt sie an einem Ort zu bündeln. Zum
Launch funktioniert alles, und niemand denkt mehr daran. Ein halbes Jahr später ändert sich eine
Geschäftsregel, etwa ein Steuersatz. Nun muss die Änderung an drei Stellen nachgezogen werden, von denen
sich niemand mehr an alle erinnert. Eine wird vergessen, und ab da rechnet die Software an einer Stelle
falsch, ohne dass es sofort auffällt. Das ist der typische Verlauf technischer Schulden: Die Abkürzung war
am Launch-Tag richtig, aber weil sie nie zurückgezahlt wurde, schlägt sie später mit Zinsen zu, in Form
eines stillen Fehlers, dessen Suche teuer wird.

## Warum es eine Geschäftsfrage ist, kein Detail

Der größte Denkfehler ist, technische Schulden als rein technisches Problem abzutun, das die Entwickler
schon regeln. In Wahrheit ist es eine **betriebswirtschaftliche Frage**: Wie schnell kann Ihr
Unternehmen auf den Markt reagieren? Wie verlässlich sind Ihre Termine? Wie viel zahlen Sie für jede
neue Funktion? All das hängt direkt am Schuldenstand unter der Oberfläche. Entscheider, die das Thema
ernst nehmen, treffen bessere Abwägungen zwischen Tempo und Tragfähigkeit, weil sie die wahren Kosten
einer Abkürzung kennen.

## Wie man technische Schulden abbaut, ohne alles neu zu bauen

Der teuerste und riskanteste Weg ist fast immer der Komplettneubau. Er klingt verlockend, weil er das
Versprechen eines sauberen Anfangs macht, scheitert aber oft an Zeit, Budget und der Realität, dass das
alte System weiterlaufen muss. Wir gehen stattdessen schrittweise vor:

1. **Sichtbar machen:** Schulden benennen und festhalten, statt sie im Kopf einzelner Personen zu lassen.
2. **Priorisieren:** Dort zuerst aufräumen, wo die Zinsen am höchsten sind, also wo am meisten Arbeit anfällt.
3. **In den Alltag integrieren:** Bei jeder ohnehin anstehenden Änderung das Umfeld ein Stück verbessern.
4. **Absichern:** Mit Tests dafür sorgen, dass das Aufräumen nichts Bestehendes kaputt macht.

So sinkt der Schuldenstand kontinuierlich, ohne dass die Weiterentwicklung stillsteht.

## Wie viel Aufräumen ist richtig?

Auch hier liegt die Kunst zwischen zwei Extremen. Wer Schulden komplett ignoriert, zahlt irgendwann nur
noch Zinsen und kommt kaum noch voran. Wer dagegen jede Unschönheit sofort beseitigt, verliert Zeit, die
besser in Funktionen für Kunden investiert wäre. Unser Maßstab ist pragmatisch: Wir bauen die Schulden
dort ab, wo sie echten Schmerz verursachen, und lassen harmlose Altlasten in Ruhe. Sauberkeit ist kein
Selbstzweck, sondern ein Mittel, um nachhaltig schneller zu liefern.

## Wie man neue Schulden von vornherein vermeidet

Schulden lassen sich nie ganz vermeiden, aber gut steuern. Hilfreich sind ein paar einfache Gewohnheiten:
ehrliche Kommunikation darüber, wann eine Abkürzung genommen wird, ein gemeinsam gepflegter Überblick
über bekannte Altlasten, sowie genug Sorgfalt am Fundament, etwa beim Datenmodell und bei der Wahl
bewährter Technologie. Wer von Anfang an auf solide Bausteine setzt, nimmt seltener teure Abkürzungen.
Mehr dazu unter [Software Engineering]({{< relref "/services/software-engineering" >}}).

## Wie wir damit umgehen

Wir behandeln technische Schulden wie eine echte Position, über die man offen spricht. Wenn wir eine
Abkürzung vorschlagen, sagen wir, was sie kurzfristig spart und langfristig kostet, damit Sie eine
informierte Entscheidung treffen können. Wir halten bekannte Schulden fest, statt sie zu verdrängen, und
bauen sie kontinuierlich ab, eingebettet in die normale Weiterentwicklung. Das ist keine glamouröse
Arbeit, aber sie hält Ihre Software über Jahre schnell, verlässlich und bezahlbar.

## Häufig gestellte Fragen

**Bedeuten technische Schulden, dass schlechte Arbeit geleistet wurde?**
Nein. Sie entstehen meist aus vernünftigen Entscheidungen unter Zeitdruck oder aus veränderten
Anforderungen. Problematisch ist nicht die Abkürzung selbst, sondern wenn niemand sie festhält und je
zurückzahlt.

**Kann man ganz ohne technische Schulden arbeiten?**
In der Praxis nicht, und es wäre auch nicht wirtschaftlich. Ziel ist nicht null Schulden, sondern ein
bewusster Umgang damit, sodass die Zinsen niedrig und kalkulierbar bleiben.

**Lohnt sich ein kompletter Neubau, um die Schulden loszuwerden?**
Nur selten. Ein Neubau ist teuer, riskant und dauert lange, während das alte System weiterlaufen muss.
Schrittweiser Abbau ist fast immer der sicherere und günstigere Weg.

**Woran merke ich als Entscheider, dass die Schulden zu hoch sind?**
An den Symptomen: Einfache Änderungen dauern lange, Termine werden unzuverlässig, und das Team meidet
bestimmte Bereiche. Diese Signale sind verlässlicher als jedes technische Detail.

**Wer entscheidet, wann aufgeräumt wird?**
Idealerweise Technik und Geschäftsseite gemeinsam. Die Technik kennt die Schulden, die Geschäftsseite
kennt die Prioritäten. Gute Entscheidungen entstehen im Gespräch zwischen beiden.

**Verlangsamt das Aufräumen die Entwicklung neuer Funktionen?**
Kurzfristig kostet es etwas Zeit, langfristig beschleunigt es die Entwicklung deutlich, weil jede
spätere Änderung leichter wird. Netto liefern Teams mit niedrigem Schuldenstand schneller.

## Fazit

Technische Schulden sind keine Schande und kein reines Entwicklerthema, sondern eine ganz normale
Geschäftsausgabe, die man steuern kann. Wer sie sichtbar macht, bewusst aufnimmt und dort abbaut, wo sie
weh tut, hält seine Software über Jahre schnell und bezahlbar, ohne je den großen, riskanten Neuanfang
zu brauchen.

Mehr dazu unter [Software Engineering]({{< relref "/services/software-engineering" >}}). Verwandte
Beiträge: [Die versteckten Kosten eines schlechten Datenmodells]({{< relref "/blog/bad-data-model" >}})
und [Warum wir auf bewährte Technologie setzen]({{< relref "/blog/boring-technology" >}}).

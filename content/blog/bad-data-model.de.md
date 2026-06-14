---
title: "Die versteckten Kosten eines schlechten Datenmodells"
date: 2026-05-09
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/bad-data-model.svg"
summary: "Die schmerzhaftesten Softwareprobleme beginnen im Datenmodell. Warum sich Sorgfalt am Anfang vielfach auszahlt, woran man ein tragfähiges Modell erkennt und wie man ein schlechtes saniert."
description: "Warum das Datenmodell über Erfolg oder Stillstand einer Software entscheidet: versteckte Kosten, Warnsignale, Merkmale eines guten Modells und wie man es saniert."
related:
  - "boring-technology"
  - "mvp-without-cutting-corners"
  - "keeping-software-running"
---

Fragen Sie erfahrene Engineers, wo die tiefsten Probleme in einer Software stecken, zeigen
überraschend viele auf dieselbe, unscheinbare Stelle: das **Datenmodell**. Es taucht in keinem
Pitch-Deck auf, kein Kunde sieht es, und trotzdem entscheidet es darüber, ob ein Produkt jahrelang
elegant mitwächst oder bei jeder Änderung teurer und langsamer wird. Dieser Artikel zeigt, warum das
so ist, welche Kosten ein schwaches Modell verursacht und wie man es besser macht.

## Das Wichtigste in Kürze

- Das Datenmodell ist das unsichtbare Fundament jeder Software. Es entscheidet, was leicht und was teuer wird.
- Ein schwaches Modell verursacht versteckte Kosten: langsamere Entwicklung, mehr Fehler, schlechte Auswertbarkeit.
- Die günstigste Gelegenheit, es richtig zu machen, ist immer am Anfang.
- Ein schlechtes Modell lässt sich meist schrittweise sanieren, ohne kompletten Neubau.

## Was ist ein Datenmodell, kurz und ohne Jargon?

Das Datenmodell beschreibt, **welche Informationen Ihre Software speichert und wie diese
zusammenhängen**: Kunden, Bestellungen, Produkte, Rechnungen, Nutzerrollen, und die Beziehungen
dazwischen. Es ist das Fundament, auf dem jede Funktion steht. Eine Funktion ist immer nur so flexibel
wie das Modell, das sie tragen muss.

## Das Modell prägt alles, was darauf aufbaut

Wie Sie Ihre Daten strukturieren, legt leise fest, welche Funktionen einfach und welche nahezu
unmöglich werden. Ein klares Modell macht neue Ideen **günstig umsetzbar**. Ein verworrenes verwandelt
jede Änderung in eine Verhandlung mit der Vergangenheit.

Ein Beispiel: Speichert ein Shop die Lieferadresse direkt am Bestelldatensatz, fällt es später schwer,
mehrere Adressen pro Kunde, abweichende Rechnungsadressen oder eine Adresshistorie abzubilden. Was als
kleine Vereinfachung begann, wird zur Wand, gegen die jedes neue Feature läuft.

## Die versteckten Kosten im Detail

Ein schwaches Datenmodell schickt selten eine Rechnung mit klarer Beschriftung. Die Kosten verstecken
sich, und sie summieren sich:

- **Langsamere Entwicklung:** Features dauern doppelt so lange, weil das Modell ständig im Weg steht.
- **Mehr Fehler:** Liegen Daten an mehreren Stellen, geraten sie in Widerspruch, und Bugs häufen sich.
- **Teure Workarounds:** Statt das Modell zu reparieren, werden Hilfskonstruktionen gebaut, die das
  Problem zementieren.
- **Schlechte Auswertbarkeit:** Wer unsauber speichert, kann später kaum verlässlich auswerten und
  trifft Entscheidungen im Blindflug.
- **Verbranntes Vertrauen:** Wenn jede Änderung Wochen dauert und Risiken birgt, leidet die
  Zusammenarbeit zwischen Team und Auftraggeber.

## Warum das Aufräumen später so teuer ist

Ein schwaches Datenmodell zu ändern, wenn schon viel Code und vor allem **echte Produktivdaten** darauf
liegen, ist, als würde man das Fundament unter einem bewohnten Haus austauschen. Möglich, aber
aufwendig, riskant und teuer. Jede Migration muss bestehende Daten verlustfrei überführen, und jeder
Fehler trifft echte Kunden. Genau deshalb ist die mit Abstand günstigste Gelegenheit immer **am Anfang**.

## Woran man ein tragfähiges Modell erkennt

- **Klare, konsistente Benennung:** Begriffe heißen überall gleich und meinen überall dasselbe.
- **Eine Quelle der Wahrheit:** Jede Information hat genau einen Ort, an dem sie „echt" ist.
- **Bewusste Beziehungen:** Verbindungen zwischen Daten sind absichtlich gewählt, nicht zufällig
  gewachsen.
- **Erweiterbarkeit:** Neue Anforderungen lassen sich ergänzen, ohne Bestehendes umzubauen.
- **Verständlichkeit:** Auch ein neuer Entwickler versteht das Modell in kurzer Zeit.

## Warnsignale für ein schlechtes Modell

- Dieselbe Information liegt an mehreren Stellen und muss „synchron gehalten" werden.
- Niemand traut sich mehr, bestimmte Tabellen oder Felder anzufassen.
- Einfache Auswertungen erfordern komplizierte Sonderlogik.
- Für jeden Sonderfall gibt es ein zusätzliches „flag"-Feld, dessen Bedeutung kaum jemand kennt.

Wenn Ihnen das bekannt vorkommt, ist das kein Grund zur Panik, aber ein klares Signal, früher als
später gegenzusteuern.

## Wie man ein schlechtes Datenmodell saniert

Eine Sanierung muss nicht „alles neu" bedeuten. In der Praxis gehen wir schrittweise vor:

1. **Verstehen:** Wie sieht das Modell heute aus, und welche fachlichen Regeln stecken wirklich dahinter?
2. **Zielbild entwerfen:** Wie sollte das Modell aussehen, damit es die nächsten Jahre trägt?
3. **Schrittweise migrieren:** Teil für Teil überführen, mit klaren Migrationsschritten und ohne den
   Betrieb zu unterbrechen.
4. **Absichern:** Tests und Plausibilitätsprüfungen, damit echte Daten verlustfrei umziehen.

## Wie wir damit umgehen

Wir investieren früh echte Zeit in das Datenmodell, bevor viel Code drumherum entsteht: benennen Dinge
sorgfältig, denken über Beziehungen nach und sind ehrlich darüber, was wir über die Fachlichkeit schon
verstehen und was noch nicht. Das ist keine glamouröse Arbeit, aber sie ist der Unterschied zwischen
einem Produkt, das anmutig wächst, und einem, das Ihnen bei jedem Schritt Widerstand leistet.

## Ein Beispiel aus der Praxis

Stellen Sie sich einen Online-Shop vor, der die Lieferadresse direkt am Bestelldatensatz speichert:
schnell gebaut, funktioniert für die erste Bestellung. Dann kommen die realen Anforderungen: Ein Kunde
möchte mehrere Adressen hinterlegen. Die Rechnungsadresse weicht von der Lieferadresse ab. Eine alte
Bestellung soll mit der **damaligen** Adresse angezeigt werden, nicht mit der aktuellen. Plötzlich ist
jede dieser selbstverständlichen Anforderungen ein größerer Umbau, weil das Modell „eine Adresse pro
Bestellung" angenommen hat.

Hätte man Adressen von Anfang an als eigene, mit dem Kunden verknüpfte Einheit modelliert, wären all
diese Fälle trivial. Genau hier entscheidet sich, ob spätere Features Stunden oder Wochen kosten.

## Datenmodell, Performance und Auswertbarkeit

Ein gutes Datenmodell wirkt weit über die Entwicklung hinaus:

- **Performance:** Saubere Strukturen lassen sich effizient abfragen. Verworrene Modelle erzwingen
  komplizierte, langsame Abfragen, und die Seite wird träge, ohne dass die „eigentliche" Funktion schuld
  ist.
- **Auswertbarkeit:** Wer sauber speichert, kann später verlässlich auswerten. Ein chaotisches Modell
  macht jede Analyse zur Bastelei und untergräbt genau die datengetriebenen Entscheidungen, auf die
  es ankommt.
- **Tracking & Reporting:** Auch Messung baut auf dem Datenmodell auf. Sind Zustände und Ereignisse
  unsauber abgebildet, stimmen am Ende auch die Kennzahlen nicht.

## Wie viel Modellierung ist genug?

Die Kunst liegt zwischen zwei Extremen. Zu wenig Modellierung rächt sich, wie beschrieben, bei jeder
Erweiterung. Zu viel, das Vorausmodellieren jeder denkbaren Zukunft, bläht das System auf und bremst
ebenfalls. Unser Maßstab: Das Modell bildet die **heutigen** Anforderungen sauber ab und lässt bewusst
Raum für das **absehbar Nächste**, ohne sich in Spekulation zu verlieren. Gutes Engineering ist hier
weniger Hellseherei als Erfahrung: zu wissen, welche Annahmen erfahrungsgemäß teuer werden.

## Datenmodell und Sicherheit

Ein oft übersehener Punkt: Auch Sicherheit beginnt im Datenmodell. Wer von Anfang an klar trennt,
welche Daten zu welchem Kunden, welcher Rolle und welchem Zugriff gehören, verhindert eine ganze
Klasse von Problemen, von versehentlich offengelegten Daten bis zu Mandanten, die Daten anderer sehen.
Ein sauberes Modell macht es einfach, Rechte korrekt zu vergeben; ein chaotisches lädt zu Fehlern ein,
die im schlimmsten Fall erst nach einem Datenleck auffallen.

## Eine kurze Checkliste vor dem ersten Code

Bevor viel Code entsteht, lohnt es sich, ein paar Fragen ehrlich zu beantworten:

- Welche **zentralen Begriffe** gibt es in der Fachlichkeit, und meinen alle dasselbe darunter?
- Wo liegt für jede Information die **eine Quelle der Wahrheit**?
- Welche **Beziehungen** zwischen den Daten sind heute schon klar, welche noch offen?
- Welche Erweiterungen sind **absehbar**, und bildet das Modell sie ohne Umbau ab?
- Wer darf **welche Daten** sehen und ändern?

Diese halbe Stunde Nachdenken am Anfang ist oft mehr wert als Wochen an späterem Refactoring.

## Häufig gestellte Fragen

**Ist ein perfektes Datenmodell von Anfang an realistisch?**
Nein, und das ist auch nicht das Ziel. Wichtig ist ein Modell, das die heutigen Anforderungen sauber
abbildet und bewusst Raum für absehbare Erweiterungen lässt, ohne sich in Spekulation zu verlieren.

**Lohnt sich die Sorgfalt auch bei einem kleinen MVP?**
Gerade dort. Ein schlankes, aber sauberes Modell ist der Unterschied zwischen einem MVP, das mitwächst,
und einem, das man nach dem ersten Erfolg neu bauen muss.

**Kann man ein schlechtes Modell reparieren, ohne neu anzufangen?**
In den meisten Fällen ja, durch schrittweise Migration. Ein kompletter Neubau ist selten nötig und
oft das größere Risiko.

**Wer sollte am Datenmodell mitarbeiten?**
Idealerweise Technik und Fachseite gemeinsam. Das Modell bildet die Fachlichkeit ab, und die kennt
niemand besser als die Menschen, die täglich damit arbeiten. Gute Modellierung ist auch ein Gespräch,
nicht nur Code.

**Merkt mein Kunde überhaupt etwas vom Datenmodell?**
Direkt nicht, indirekt aber ständig. Schnelle neue Funktionen, verlässliche Auswertungen und stabile
Software sind alle eine Folge des Modells darunter.

**Wie lange dauert es, ein Datenmodell sauber aufzusetzen?**
Der Anteil an der Gesamtprojektzeit ist überschaubar, oft sind es Tage statt Wochen. Gemessen an den
Wochen, die ein schlechtes Modell später kostet, ist es die mit Abstand günstigste Investition im
ganzen Projekt.

## Fazit

Sauberes Engineering beginnt unter der Oberfläche, beim Fundament, das niemand sieht. Wer früh in ein
tragfähiges Datenmodell investiert, spart sich später ein Vielfaches an Aufwand, Fehlern und Frust.

Mehr dazu unter [Software Engineering]({{< relref "/services/software-engineering" >}}). Verwandte Beiträge:
[Ein MVP entwickeln, ohne Abstriche zu machen]({{< relref "/blog/mvp-without-cutting-corners" >}}) und
[Warum wir auf bewährte Technologie setzen]({{< relref "/blog/boring-technology" >}}).

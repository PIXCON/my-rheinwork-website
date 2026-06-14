---
title: "Legacy-Software ablösen ohne Big-Bang"
date: 2026-06-14
tag: "Engineering"
author: "Dustin Schneider"
cover: "/img/blog/replace-legacy-software.svg"
summary: "Alte Systeme werden mit der Zeit zum Risiko: Niemand versteht sie mehr, Änderungen dauern ewig, Sicherheitslücken bleiben offen. Warum die komplette Neuentwicklung meist scheitert und wie Sie schrittweise ablösen, ohne den Betrieb anzuhalten."
description: "Legacy-Software ablösen ohne Big-Bang: warum eine komplette Neuentwicklung meist scheitert und wie Sie ein altes System schrittweise ersetzen, ohne den Betrieb zu unterbrechen. Praxisleitfaden."
related:
  - "technical-debt-explained"
  - "bad-data-model"
  - "boring-technology"
---

Irgendwann erreicht fast jedes erfolgreiche System einen Punkt, an dem es mehr bremst als hilft. Die
Software läuft zwar noch, aber jede Änderung wird zur Geduldsprobe, und niemand traut sich mehr richtig
heran. Der naheliegende Reflex lautet dann: einmal komplett neu bauen. Genau dieser **Big-Bang-Ansatz**
ist jedoch der teuerste und riskanteste Weg, den es gibt. Dieser Artikel zeigt, warum die schrittweise
Ablösung in fast allen Fällen die bessere Wahl ist und wie sie in der Praxis funktioniert.

## Das Wichtigste in Kürze

- Alte Systeme werden zum Risiko, weil Wissen verloren geht, Änderungen langsam werden und Sicherheitslücken offen bleiben.
- Die komplette Neuentwicklung in einem Rutsch scheitert besonders häufig: zu groß, zu lange, zu riskant.
- Der schrittweise Ansatz ersetzt das Alte Stück für Stück, während der Betrieb weiterläuft.
- Die wichtigste Frage ist nicht "alles oder nichts", sondern "was zuerst".

## Warum alte Systeme zum Risiko werden

Eine Software wird selten über Nacht zum Problem. Das Risiko wächst schleichend. Typischerweise treffen
mehrere Dinge zusammen: Die Menschen, die das System ursprünglich gebaut haben, sind längst woanders,
und mit ihnen ist das Wissen gegangen. Die verwendete Technologie wird nicht mehr gepflegt, sodass
Sicherheitsupdates ausbleiben. Und weil die Architektur über die Jahre gewachsen statt geplant ist,
hängt alles mit allem zusammen.

Das Ergebnis ist ein System, das man nur noch mit angehaltenem Atem anfasst. Genau diese Mischung aus
Unverständnis und Verflechtung ist das eigentliche Risiko, nicht der Code an sich.

## Wenn niemand mehr versteht, wie es funktioniert

Das größte Problem alter Systeme ist selten technischer Natur, sondern menschlicher. Wenn das Wissen,
warum eine bestimmte Logik so und nicht anders gebaut wurde, nur noch in den Köpfen einzelner Personen
steckt oder ganz verschwunden ist, wird jede Änderung zum Ratespiel. Man weiß nicht, welche scheinbar
harmlose Anpassung an anderer Stelle etwas zum Einsturz bringt.

Dieses fehlende Verständnis ist eng mit dem Thema [technische Schulden]({{< relref "/blog/technical-debt-explained" >}})
verwandt: Es sind Zinsen, die man auf alte Entscheidungen zahlt, oft ohne den ursprünglichen Kredit
noch zu kennen. Bevor man ein solches System ablöst, muss man es zuerst wieder verstehen lernen.

## Warum die komplette Neuentwicklung meist scheitert

Der Big-Bang klingt verlockend: ein sauberer Schnitt, einmal alles neu, danach ist alles besser. In der
Praxis geht diese Rechnung selten auf. Ein vollständiger Neubau bedeutet, dass man jahrelang investiert,
ohne zwischendurch einen Nutzen zu liefern. Das alte System muss weiterlaufen und gepflegt werden,
während das neue entsteht, also zahlt man doppelt.

Hinzu kommt: Das alte System enthält unzählige kleine Sonderfälle, die über Jahre eingebaut wurden.
Viele davon sind nirgends dokumentiert, fallen aber sofort auf, wenn sie im Neubau fehlen. Und am Tag
der großen Umstellung schaltet man auf ein System um, das nie unter echten Bedingungen lief. Das ist
der Moment, in dem Big-Bang-Projekte am häufigsten scheitern.

## Der schrittweise Ansatz erklärt

Die Alternative ist unspektakulär, aber bewährt: Man lässt das alte System laufen und ersetzt es Stück
für Stück. In der Fachsprache heißt dieses Muster **Strangler-Pattern**, weil das neue System das alte
nach und nach umwächst und verdrängt, wie eine Pflanze, die einen Baum umrankt, bis am Ende nur noch das
Neue trägt.

Praktisch bedeutet das: Man baut um das alte System eine Art Vermittler, der entscheidet, welche
Anfragen das alte und welche bereits das neue System bedienen. Anfangs läuft alles über das Alte. Dann
löst man einen ersten, klar abgegrenzten Bereich heraus, baut ihn neu und leitet nur diesen Teil um. Der
Rest bleibt unberührt. So wandert die Funktionalität Schritt für Schritt hinüber, ohne dass es je einen
großen Stichtag gibt.

## Schritt für Schritt migrieren, ohne den Betrieb anzuhalten

Der entscheidende Vorteil dieses Vorgehens ist, dass der Betrieb nie stillsteht. Jeder einzelne Schritt
ist klein genug, um ihn zu verstehen, zu testen und im Zweifel zurückzunehmen. Geht ein neu gebauter
Bereich live und macht Probleme, leitet man die Anfragen wieder auf das alte System zurück. Niemand
merkt etwas, und niemand verbringt eine durchwachte Nacht mit einer Komplettumstellung.

Diese Schritte folgen einem festen Rhythmus: einen Bereich auswählen, ihn neu bauen, parallel zum Alten
laufen lassen, Ergebnisse vergleichen, umschalten, den alten Teil abschalten. Danach beginnt der Zyklus
von vorn. Weil jeder Durchlauf einen echten, sichtbaren Nutzen liefert, bleibt das Projekt überschaubar
und liefert vom ersten Schritt an Wert.

## Wie Sie Ihre Daten dabei sicher halten

Der heikelste Teil jeder Ablösung sind nicht die Funktionen, sondern die Daten. Sie sind das Gedächtnis
des Unternehmens und dürfen unter keinen Umständen verloren gehen oder still verfälscht werden. Deshalb
wird die Datenmigration nie nebenbei gemacht, sondern als eigener, sorgfältig geplanter Strang.

Bewährt hat sich, alte und neue Datenhaltung eine Zeit lang parallel zu betreiben und automatisiert
abzugleichen, ob beide dasselbe Ergebnis liefern. Erst wenn das über einen ausreichenden Zeitraum stabil
stimmt, wird die alte Quelle abgeschaltet. Ein sauberes Datenmodell ist dabei Gold wert; wie teuer ein
schlechtes wird, beschreiben wir gesondert. Und selbstverständlich gilt während der gesamten Migration:
getestete Backups, bevor irgendetwas verändert wird.

## Wie Sie entscheiden, was zuerst abgelöst wird

Wenn man nicht alles auf einmal ersetzt, stellt sich die Frage, womit man anfängt. Die Antwort ergibt
sich aus zwei Größen: dem Nutzen einer Ablösung und dem Risiko, das von einem Bereich ausgeht. Sinnvoll
ist es, dort zu beginnen, wo der Schmerz am größten und das Risiko beherrschbar ist.

| Kriterium | Spricht für frühe Ablösung | Spricht für späteres Vorgehen |
| --- | --- | --- |
| Änderungshäufigkeit | Bereich wird oft angepasst | Bereich ist seit Jahren stabil |
| Geschäftswert | Direkter Einfluss auf Umsatz oder Kernprozess | Reine Nebenfunktion |
| Sicherheitslage | Bekannte, offene Lücken | Keine akuten Risiken |
| Abhängigkeiten | Klar abgrenzbar | Tief mit allem verflochten |
| Wissen im Team | Verständnis noch vorhanden | Niemand kennt die Logik mehr |

Diese Übersicht ersetzt kein Gespräch, aber sie verhindert die häufigste Fehlentscheidung: zuerst das
technisch Spannendste statt das geschäftlich Wichtigste anzugehen.

## Den richtigen Zeitpunkt erkennen

Eine Ablösung ist kein Selbstzweck. Solange ein altes System stabil läuft, sich noch warten lässt und
keine offenen Sicherheitslücken hat, gibt es keinen Grund zu handeln. Der richtige Moment kündigt sich
an: Änderungen dauern spürbar länger, die Liste der Dinge, die man sich nicht zu ändern traut, wächst,
und neue Anforderungen lassen sich nur noch mit Mühe einbauen.

Wer auf diese Signale achtet, kann die Ablösung planen, statt sie unter Druck erzwingen zu müssen.
Geplant ablösen ist immer günstiger und ruhiger als der erzwungene Notfall, wenn das alte System
endgültig nicht mehr mitspielt.

## Warum bewährte Technologie die Ablösung leichter macht

Beim Neubau einzelner Bereiche besteht die Versuchung, gleich die modernste verfügbare Technologie zu
wählen. Genau hier lohnt Zurückhaltung. Ein Ablöseprojekt ist anspruchsvoll genug; es zusätzlich mit
unerprobten Werkzeugen zu belasten, erhöht das Risiko ohne Not. Bewährte, gut verstandene Technologie
macht die neuen Teile von Anfang an wartbar und sorgt dafür, dass nicht in fünf Jahren genau dieselbe
Diskussion erneut geführt werden muss.

## Häufig gestellte Fragen

**Können wir während der Ablösung normal weiterarbeiten?**
Ja, das ist der Kern des Ansatzes. Das alte System läuft weiter, während einzelne Bereiche nach und nach
ersetzt werden. Es gibt keinen Stichtag, an dem alles stillsteht.

**Wie lange dauert eine schrittweise Ablösung?**
Das hängt von Größe und Zustand des Systems ab. Der Vorteil ist, dass jeder Schritt für sich Nutzen
liefert, sodass Sie nicht jahrelang auf ein Ergebnis warten, sondern es laufend sehen.

**Ist der schrittweise Weg nicht teurer als ein Neubau?**
In der Summe selten. Der Big-Bang verschlingt das Budget vorab und liefert lange nichts. Der
schrittweise Weg verteilt die Kosten und senkt das Risiko, dass am Ende viel Geld in ein gescheitertes
Projekt geflossen ist.

**Was passiert mit unseren Daten?**
Die Datenmigration wird als eigener Strang sorgfältig geplant, mit parallelem Betrieb und Abgleich, bevor
die alte Quelle abgeschaltet wird. Getestete Backups sind dabei selbstverständlich.

**Können Sie ein System ablösen, das wir nicht selbst gebaut haben?**
Ja. Ein wichtiger erster Schritt ist ohnehin, das bestehende System wieder zu verstehen und seine
Abläufe zu dokumentieren, unabhängig davon, wer es ursprünglich gebaut hat.

**Müssen wir vorher genau wissen, was ersetzt werden soll?**
Nein. Die Reihenfolge ergibt sich gemeinsam aus Nutzen und Risiko. Wir beginnen mit einer Bestandsaufnahme
und priorisieren von dort aus, statt eine vollständige Planung vorauszusetzen.

## Fazit

Ein altes System komplett auf einmal zu ersetzen, ist verlockend, aber riskant und teuer. Der ruhigere
und verlässlichere Weg ist die schrittweise Ablösung: das Alte verstehen, einen klar abgegrenzten Bereich
nach dem anderen ersetzen, die Daten sorgfältig mitnehmen und dabei nie den Betrieb anhalten. So wird aus
einem bedrohlichen Großprojekt eine planbare Folge kleiner, sicherer Schritte.

Mehr dazu unter [Software Engineering]({{< relref "/services/software-engineering" >}}). Verwandte Beiträge:
[Technische Schulden verständlich erklärt]({{< relref "/blog/technical-debt-explained" >}}) und
[Die versteckten Kosten eines schlechten Datenmodells]({{< relref "/blog/bad-data-model" >}}).

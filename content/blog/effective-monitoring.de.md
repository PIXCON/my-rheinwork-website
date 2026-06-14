---
title: "Monitoring, das nur bei echten Problemen alarmiert"
date: 2026-06-14
tag: "Infrastruktur"
author: "Dustin Schneider"
cover: "/img/blog/effective-monitoring.svg"
summary: "Die meisten Überwachungssysteme sind entweder zu laut oder zu leise. Was man wirklich überwachen sollte, wie man Alarmmüdigkeit vermeidet und warum gutes Monitoring direkt auf Verfügbarkeit und Vertrauen einzahlt."
description: "Monitoring, das nur bei echten Problemen alarmiert: was wirklich zu überwachen ist, wie Sie Alarmmüdigkeit vermeiden und warum Logs, Metriken und Traces zusammen den Unterschied machen. Praxisleitfaden."
related:
  - "keeping-software-running"
  - "boring-technology"
  - "technical-debt-explained"
---

Es gibt zwei Arten von schlechtem Monitoring, und beide enden gleich. Das eine schlägt ständig Alarm, bis
niemand mehr hinsieht. Das andere ist so still, dass der erste Hinweis auf einen Ausfall der Anruf eines
verärgerten Kunden ist. Gutes **Monitoring** liegt dazwischen: Es meldet sich nur dann, wenn wirklich
etwas zu tun ist. Dieser Artikel zeigt, was man tatsächlich überwachen sollte und wie man die Falle der
ständigen, sinnlosen Alarme vermeidet.

## Das Wichtigste in Kürze

- Schlechtes Monitoring ist entweder zu laut oder zu leise; beides führt dazu, dass Alarme ignoriert werden.
- Überwachen Sie das, was Nutzer spüren, nicht jede technische Kennzahl, die man messen kann.
- Alarmmüdigkeit ist die größte Gefahr: Jeder unnötige Alarm senkt den Wert aller echten.
- Logs, Metriken und Traces beantworten unterschiedliche Fragen und gehören zusammen.

## Warum die meisten Überwachungssysteme versagen

Der häufigste Fehler ist nicht zu wenig Monitoring, sondern das falsche. Viele Systeme überwachen alles,
was sich technisch messen lässt, und lösen bei jeder kleinen Schwankung einen Alarm aus. Das fühlt sich
gründlich an, ist aber das Gegenteil von hilfreich. Wenn jede Nacht drei Alarme kommen, von denen keiner
eine echte Handlung erfordert, lernt das Team, sie zu ignorieren.

Das andere Extrem ist ein System, das nur prüft, ob der Server grundsätzlich antwortet. Solange irgendein
Lebenszeichen kommt, gilt alles als in Ordnung, selbst wenn die eigentliche Funktion längst nicht mehr
geht. Beide Varianten haben dasselbe Problem: Sie messen nicht das, worauf es ankommt.

## Was man wirklich überwachen sollte

Die nützlichste Faustregel lautet: Überwachen Sie, was der Nutzer spürt. Eine bewährte Orientierung sind
vier Signale, die zusammen ein ehrliches Bild ergeben. **Verzögerung** beantwortet, wie lange Anfragen
dauern. **Verkehr** zeigt, wie viel gerade los ist. **Fehler** erfassen, wie oft etwas schiefgeht.
**Auslastung** verrät, wie nah das System an seiner Grenze arbeitet.

Diese vier sind ein guter Anfang, aber sie reichen nicht allein. Genauso wichtig sind Prüfungen auf
Geschäftsebene: Können Kunden tatsächlich bestellen? Kommen Zahlungen durch? Werden Bestätigungen
versendet? Ein Server kann technisch einwandfrei laufen, während der eigentliche Geschäftsvorgang
stillsteht. Erst die Kombination aus technischen Signalen und geschäftlichen Prüfungen sagt, ob es
wirklich läuft.

## Alarmmüdigkeit und wie man sie vermeidet

Das größte Risiko eines Überwachungssystems ist nicht, dass es etwas übersieht, sondern dass es zu oft
ruft. Jeder Alarm, der keine Handlung erfordert, senkt den Wert aller anderen. Nach genug Fehlalarmen
reagiert niemand mehr sofort, auch nicht beim echten Notfall. Diese **Alarmmüdigkeit** ist der häufigste
Grund, warum gut gemeintes Monitoring im Ernstfall versagt.

Der Ausweg ist Disziplin bei der Frage, was überhaupt einen Alarm auslöst. Eine gute Regel: Ein Alarm
darf nur dann auf das Telefon einer Person, wenn ein Mensch sofort etwas tun muss. Alles andere gehört
in eine ruhigere Ablage, die man im Tagesgeschäft prüft, nicht um drei Uhr nachts. Lieber wenige, dafür
ernst gemeinte Alarme als ein Dauerrauschen, das man wegklickt.

## Schwellen, die zum Geschäft passen

Eine Kennzahl allein sagt wenig; entscheidend ist die Schwelle, ab der sie zum Problem wird. Diese
Schwelle ergibt sich nicht aus der Technik, sondern aus dem Geschäft. Bei einem Shop ist eine langsame
Bezahlseite gravierend, eine langsame Hilfeseite weniger. Gute Alarme spiegeln diese Gewichtung wider,
statt jeden Bereich gleich zu behandeln.

Genauso wichtig ist, kurze, harmlose Ausschläge von echten Trends zu unterscheiden. Ein einzelner
Aussetzer ist selten ein Notfall; ein über Minuten steigender Fehleranteil schon. Alarme, die diese
zeitliche Dimension berücksichtigen, lösen seltener grundlos aus und sind dadurch glaubwürdiger.

## Logs, Metriken und Traces einfach erklärt

Drei Werkzeuge tauchen im Zusammenhang mit Monitoring immer wieder auf, und sie beantworten verschiedene
Fragen. Es lohnt, den Unterschied zu kennen, ohne in die Technik einzusteigen.

| Werkzeug | Beantwortet die Frage | Vergleich aus dem Alltag |
| --- | --- | --- |
| Metriken | Wie geht es dem System gerade? | Die Anzeigen im Auto-Cockpit |
| Logs | Was genau ist passiert? | Das Fahrtenbuch mit Einzeleinträgen |
| Traces | Wo im Ablauf hakt es? | Die Sendungsverfolgung eines Pakets |

**Metriken** sind verdichtete Zahlen über die Zeit, ideal, um Trends und Schwellen zu erkennen. **Logs**
sind die einzelnen Ereignisse mit Details, ideal, um nachzuvollziehen, was im konkreten Fall geschah.
**Traces** verfolgen eine einzelne Anfrage über mehrere Dienste hinweg, ideal, um in verteilten Systemen
den Engpass zu finden. Erst zusammen ergeben sie ein vollständiges Bild.

## Runbooks: Wenn der Alarm kommt, muss der Plan stehen

Ein Alarm ist nur so nützlich wie die Reaktion, die er auslöst. Wenn die alarmierte Person erst überlegen
muss, was zu tun ist, verstreicht wertvolle Zeit. Deshalb gehört zu gutem Monitoring immer auch das
passende **Runbook**: eine klare Schritt-für-Schritt-Anleitung für das jeweilige Szenario.

Im besten Fall verweist der Alarm selbst auf das zugehörige Runbook. So weiß auch jemand, der das System
nicht im Detail kennt, sofort, wie er die Lage einschätzt und eingrenzt. Damit hängt die Reaktion nicht
mehr am Wissen einer einzelnen Person, was eng mit verlässlichem [Software-Betrieb]({{< relref "/blog/keeping-software-running" >}})
zusammenhängt.

## Der Zusammenhang mit Verfügbarkeit und Vertrauen

Monitoring ist kein Selbstzweck, sondern dient einem Ziel: Probleme bemerken und beheben, bevor Nutzer
sie spüren. Genau hier entsteht der geschäftliche Wert. Eine Anwendung, die zuverlässig erreichbar ist,
baut Vertrauen auf. Eine, die immer wieder unbemerkt ausfällt, verliert es, und verlorenes Vertrauen ist
deutlich teurer als jedes Überwachungssystem.

Gutes Monitoring verkürzt vor allem die Zeit zwischen "etwas geht schief" und "jemand kümmert sich
darum". Diese Spanne entscheidet, ob ein Vorfall eine kurze Randnotiz bleibt oder zu einem sichtbaren
Ausfall mit echtem Schaden wird.

## Monitoring beginnt schon in der Entwicklung

Aussagekräftige Überwachung lässt sich nicht nachträglich über eine fertige Anwendung stülpen. Eine
Software, die von Anfang an verständliche Logs schreibt und ihren eigenen Zustand melden kann, ist im
Betrieb ein anderes Kaliber als eine, bei der man später mühsam von außen hineinschaut. Wer Monitoring
erst am Ende bedenkt, zahlt es mit blinden Flecken im Ernstfall.

Deshalb gehört die Frage, wie sich eine Anwendung im Betrieb beobachten lässt, schon in die ersten
Entwurfsentscheidungen. Das kostet zu Beginn wenig und erspart später langes Rätselraten an genau dem
Abend, an dem es darauf ankommt. Eine Anwendung, die ihren eigenen Zustand klar nach außen gibt, lässt
sich mit wenigen, treffsicheren Alarmen überwachen, statt mit einem dichten Netz aus Behelfslösungen.

## Monitoring als lebendes System pflegen

Eine Überwachung ist nie fertig eingerichtet. Systeme verändern sich, neue Funktionen kommen hinzu, alte
fallen weg, und mit ihnen verschieben sich die Stellen, an denen es klemmen kann. Ein Alarm, der vor
einem Jahr sinnvoll war, kann heute nur noch Lärm sein. Deshalb gehört zum Monitoring eine regelmäßige,
ehrliche Durchsicht: Welche Alarme haben zuletzt wirklich geholfen, welche wurden nur weggeklickt?

Besonders aufschlussreich ist der Rückblick nach einem Vorfall. Hat das Monitoring früh genug
angeschlagen? Fehlte ein Signal, das den Fehler hätte sichtbar machen können? Wer aus jedem Vorfall eine
kleine Anpassung mitnimmt, baut über die Zeit ein Überwachungssystem, das mit dem Geschäft mitwächst,
statt langsam an ihm vorbeizulaufen.

## Bewährte Werkzeuge statt der neuesten Mode

Bei Monitoring-Werkzeugen gilt dasselbe wie sonst in der Infrastruktur: Bewährtes schlägt Neues. Ein
Überwachungssystem muss selbst extrem verlässlich sein, denn es soll ja gerade dann funktionieren, wenn
anderes ausfällt. Ausgereifte, gut verstandene Werkzeuge sind hier mehr wert als die neueste Lösung mit
beeindruckender Funktionsliste. Wichtiger als das Werkzeug ist ohnehin, dass die richtigen Dinge
überwacht werden und die Alarme sinnvoll gesetzt sind.

## Häufig gestellte Fragen

**Wir bekommen ständig Alarme, aber nichts ist je kaputt. Was tun?**
Das ist klassische Alarmmüdigkeit. Der erste Schritt ist, jeden Alarm zu prüfen: Erfordert er sofortiges
Handeln? Wenn nicht, gehört er nicht aufs Telefon. So gewinnen die verbleibenden Alarme wieder Gewicht.

**Reicht es nicht, einfach zu prüfen, ob der Server läuft?**
Nein. Ein Server kann antworten, während die eigentliche Funktion stillsteht. Sinnvoller sind Prüfungen,
die das nachstellen, was ein Nutzer tatsächlich tut, etwa eine Bestellung oder eine Anmeldung.

**Brauchen wir Logs, Metriken und Traces alle drei?**
Nicht jedes Projekt braucht alles. Metriken und Logs sind fast immer sinnvoll. Traces lohnen sich vor
allem bei verteilten Systemen mit mehreren Diensten. Der Aufwand richtet sich nach der Komplexität.

**Was ist ein Runbook, kurz gesagt?**
Eine knappe Anleitung, was bei einem bestimmten Alarm zu tun ist. Sie sorgt dafür, dass im Ernstfall
nicht improvisiert werden muss und das Wissen nicht an einer einzelnen Person hängt.

**Können Sie Monitoring für eine bestehende Anwendung einrichten?**
Ja. Wir prüfen, was bereits überwacht wird, schließen die Lücken und reduzieren gleichzeitig die
sinnlosen Alarme, damit am Ende weniger, aber aussagekräftigere Meldungen ankommen.

**Wie viel Monitoring braucht ein kleines Projekt?**
Weniger, als man denkt, aber nicht keines. Schon eine Handvoll gut gewählter Prüfungen auf Verfügbarkeit
und die wichtigsten Geschäftsvorgänge verhindert die meisten bösen Überraschungen.

## Fazit

Gutes Monitoring misst sich nicht an der Zahl der Alarme, sondern daran, dass jeder Alarm zählt.
Überwachen Sie, was Nutzer spüren, ergänzen Sie technische Signale um geschäftliche Prüfungen, halten Sie
die Alarme bewusst knapp und hinterlegen Sie zu jedem ein klares Runbook. So entsteht ein System, das
ruhig bleibt, bis es wirklich etwas zu sagen hat, und genau dann verlässlich ist.

Mehr dazu unter [Infrastructure]({{< relref "/services/infrastructure" >}}). Verwandte Beiträge:
[Software zuverlässig betreiben]({{< relref "/blog/keeping-software-running" >}}) und
[Software Engineering]({{< relref "/services/software-engineering" >}}).

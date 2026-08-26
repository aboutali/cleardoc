# ClearDoc - Handover

Stand: 26. August 2026  
Status: Validierungsprototyp, nicht produktionsbereit

## 1. Was übergeben wird

ClearDoc ist aktuell als deutsche, responsive Landingpage umgesetzt. Die Seite erklärt eine lokal betriebene KI-Prüfung für TARDOC-Rechnungen, zeigt eine nachvollziehbare Beispielrechnung, enthält einen interaktiven Jahresrechner und sammelt Interesse von Pionierpraxen über ein Formspree-kompatibles Formular.

## 2. Strategischer Kern

**Positionierung:** Lokale, spezialisierte KI für die Prüfung ambulanter Schweizer Arztrechnungen.

**Kernversprechen:** Jede erbrachte Leistung. Korrekt verrechnet. Patientendaten bleiben in der Praxis.

**Zielgruppe:** Alle Arztpraxen; für die erste Validierung besonders Praxen mit hohem Rechnungsvolumen oder manueller Prüfbelastung.

**Nutzenpfeiler:**

1. Vollständig: dokumentierte, möglicherweise fehlende Leistungen erkennen.
2. Nachvollziehbar: Quelle, Tarifposition, Regel und finanziellen Effekt zeigen.
3. Vertraulich: Analyse in der kontrollierten Praxisinfrastruktur.

## 3. Produktlogik

ClearDoc erfindet keine Leistungen oder Zeiten. Ein Hinweis entsteht nur durch den Abgleich von Rechnungsentwurf, Behandlungsdokumentation und - falls relevant - einer belastbaren Zeitquelle aus Praxissoftware, Telefonie oder Zeiterfassung.

**Entscheidende Regel:** Keine Zeitquelle, kein Vorschlag. ClearDoc bucht nichts automatisch; die ärztliche oder autorisierte menschliche Freigabe bleibt zwingend.

## 4. Landingpage-Beispiel

- Telefoniedauer: 8 Minuten
- Im Entwurf verrechnet: erste 5 Minuten
- Dokumentierte Differenz: 3 Minuten
- ClearDoc-Prüfvorschlag: AA.10.0020 x 3
- Finanzieller Effekt im Beispiel: + CHF 29.23
- Rechnungsentwurf: CHF 257.17
- Nach ärztlicher Freigabe: CHF 286.40

Die blau markierte Rechnungsposition dient ausschliesslich zur Erklärung des vorgesehenen Prüfablaufs.

## 5. Jahresrechner

Standardannahme der Seite:

`6'800 Rechnungen x CHF 155 x 2,0 % = CHF 21'080`

Der Prozentwert kann zwischen 0,5 % und 5,0 % verändert werden. Die Darstellung ist eine Beispielrechnung und keine Ertragsgarantie.

## 6. Datenschutz- und Compliance-Leitplanken

- Patientendaten sollen die kontrollierte Praxisumgebung nicht verlassen.
- Patientendaten sollen nicht zum Training allgemeiner Modelle verwendet werden.
- Jede Empfehlung muss fachlich belegbar und prüfbar sein.
- Keine automatische Änderung oder Übermittlung einer Rechnung.
- Keine definitive Konformitätsaussage vor technischer, tariflicher und rechtlicher Prüfung.
- Zusatzversicherungslogik separat von der Grundversicherungslogik behandeln.

## 7. Validierungsplan für Pionierpraxen

Empfohlener Start ist ein Schattenbetrieb ohne automatische Änderung produktiver Rechnungen.

Zu messen sind:

- Anteil korrekt erkannter fehlender Positionen
- Anteil verworfener oder falscher Hinweise
- Zeitaufwand vor und nach ClearDoc
- akzeptierter finanzieller Effekt
- Ablehnungen oder Rückfragen nach Rechnungsversand
- Vertrauen in lokale Verarbeitung und Begründungen

## 8. Aktueller technischer Stand

Die Landingpage besteht aus statischem HTML, CSS und JavaScript. Es gibt keinen Build-Prozess, keine Datenbank und keine externe JavaScript-Bibliothek. Die Rechnungsauswahl und der Jahresrechner laufen im Browser.

Das Formular ist im Formspree-Format angelegt. Vor Veröffentlichung muss `YOUR_FORM_ID` durch die echte Formspree-ID ersetzt und die gesamte Übermittlung getestet werden.

## 9. Offene Entscheidungen

1. Formspree-Projekt und Empfängeradresse einrichten.
2. Domain, Markenname und Rechtsträger festlegen.
3. Impressum und Datenschutzerklärung ergänzen.
4. Quellen und Claims tariflich und juristisch abnehmen lassen.
5. Integrationen für Praxissoftware, Telefonie und Zeiterfassung priorisieren.
6. Pilot-Fachgebiete und Erfolgskriterien bestimmen.
7. Betriebsarchitektur für lokale Modelle festlegen und benchmarken.
8. Regelwerk und Datengrundlage für Zusatzversicherungen separat definieren.

## 10. Quellen

- BAG: https://www.bag.admin.ch/de/tardoc-und-ambulante-pauschalen
- BAG-Referenzwert: https://www.bag.admin.ch/dam/de/sd-web/fSTnQwKB6RVF/faktenblatt-2025-kostenentwicklung-aertzlich-ambulant.pdf
- FMH Rechnungsformat 5.0: https://tarifeambulant.fmh.ch/hilfe-services/neues-rechnungsformular-50.cfm
- Ärztekasse Lesehilfe: https://www.aerztekasse.ch/patienteninfo/tardoc-rechnung/

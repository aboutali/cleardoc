# ClearDoc - Value Proposition

Stand: 26. August 2026

## Positionierung

ClearDoc ist eine lokal betriebene, auf Schweizer Tariflogik spezialisierte KI-Prüfschicht für die ambulante Abrechnung. Sie unterstützt Arztpraxen dabei, erbrachte, dokumentierte und tarifkonforme Leistungen vor dem Rechnungsversand vollständig und nachvollziehbar zu verrechnen.

## Kernversprechen

> Jede erbrachte Leistung. Korrekt verrechnet. Patientendaten bleiben in der Praxis.

## Zielgruppen

- Externe Ansprache: alle Arztpraxen
- Anwender: Ärztinnen und Ärzte, MPAs, Abrechnungsspezialist:innen und Praxismanager:innen
- Käufer: Praxisinhaber:innen, Gruppenpraxen und ambulante medizinische Zentren
- Erste Validierung: Praxen mit relevantem Rechnungsvolumen und manueller Prüfbelastung

## Drei Nutzenpfeiler

### Vollständig

ClearDoc erkennt dokumentierte Leistungen, die im Rechnungsentwurf fehlen könnten.

### Nachvollziehbar

Jeder Hinweis verweist auf die zugrunde liegende Dokumentation, Zeitquelle, Tarifposition, Regelversion und finanzielle Auswirkung. Die Praxis entscheidet.

### Vertraulich

Das spezialisierte Modell läuft in der kontrollierten Infrastruktur der Praxis. Klinische Inhalte werden nicht an einen externen KI-Anbieter übertragen und nicht zum Training allgemeiner Modelle verwendet.

## Produktlogik

ClearDoc darf keine Leistungen oder Zeiten erfinden. Ein Vorschlag entsteht nur, wenn der Rechnungsentwurf mit einer belastbaren Quelle abgeglichen werden kann, beispielsweise mit Behandlungsdokumentation, Praxissoftware, Telefoniedauer oder Zeiterfassung.

**Guardrail:** Keine Zeitquelle, kein Vorschlag. Keine automatische Buchung. Menschliche Freigabe bleibt zwingend.

## Beispiel auf der Landingpage

- Rechnungsentwurf: CHF 257.17
- Zeitquelle: telefonische Konsultation von 08:41 bis 08:49 Uhr, insgesamt 8 Minuten
- Bereits verrechnet: erste 5 Minuten
- Dokumentierte Differenz: 3 Minuten
- Prüfvorschlag: TARDOC AA.10.0020 x 3, zusätzlich CHF 29.23
- Betrag nach ärztlicher Freigabe: CHF 286.40

Das Beispiel zeigt eine Produktlogik, keine pauschale Aussage über den Markt.

## Jahresszenario

Die Landingpage verwendet eine veränderbare Modellrechnung:

`6'800 Rechnungen x CHF 155 durchschnittlicher Rechnungsbetrag x 2,0 % übersehener Anteil = CHF 21'080`

Die 6'800 Rechnungen und der Prozentsatz sind Annahmen. CHF 155 wird als BAG-Referenzwert gekennzeichnet. Die Hochrechnung ist keine Ertragsgarantie.

## Produktgrenzen

- Niemals eine nicht dokumentierte Leistung empfehlen.
- Niemals Behandlung oder Dokumentation zur Erlössteigerung verändern.
- Keine Rechnung ohne menschliche Freigabe verändern oder versenden.
- Vor Einzelpositionslogik prüfen, ob eine ambulante Pauschale Vorrang hat.
- Grundversicherung und Zusatzversicherung regeltechnisch getrennt behandeln.
- Keine definitive Rechts- oder Datenschutzkonformität behaupten, bevor Architektur und Betrieb unabhängig geprüft wurden.

## Nächste Produkterweiterung

Die Logik für Zusatzversicherungen ist Teil der strategischen Roadmap, aber noch nicht Bestandteil des aktuellen Landingpage-Prototyps. Dafür braucht es separate Vertrags-, Produkt- und Versichererregeln sowie eine eigenständige Compliance-Prüfung.

## Validierungsfragen

1. Ist die Vermeidung übersehener, dokumentierter Leistungen das stärkste Nutzenversprechen?
2. Erhöht die lokale Verarbeitung messbar die Bereitschaft zu einem Pilotgespräch?
3. Welche Fachgebiete haben die grösste Prüfbelastung oder Unsicherheit?
4. Welche Datenquellen stehen in der Praxis zuverlässig zur Verfügung?
5. Wie hoch sind Trefferquote, Prüfzeitersparnis, verworfene Hinweise und akzeptierter finanzieller Effekt?

# ClearDoc Landingpage

Deutscher Validierungsprototyp für eine lokal betriebene TARDOC-Rechnungsprüfung.

## Aktueller Stand

- Arbeitsname: ClearDoc
- Zielgruppe: alle Arztpraxen
- Statische Website ohne Build-Prozess oder externe JavaScript-Abhängigkeiten
- Interaktiver Vergleich zwischen Rechnungsentwurf und ClearDoc-Vorschlag
- Veränderbare Jahreshochrechnung
- Formspree-kompatibles Pionierformular
- Finale Beispielrechnung unter `assets/tardoc-rechnung-beispiel-v4.png`

## Dateien

- `index.html`: Inhalt und Seitenstruktur
- `styles.css`: Gestaltung und responsive Darstellung
- `script.js`: Rechnungsumschaltung und Jahresrechner
- `VALUE_PROPOSITION.md`: fachliche und kommerzielle Positionierung
- `assets/tardoc-rechnung-beispiel-v4.png`: verwendete Beispielrechnung

## Lokal ansehen

Die Dateien können über einen einfachen lokalen Webserver bereitgestellt werden. Die aktuelle Vorschau läuft typischerweise unter `http://127.0.0.1:4173/`.

## Formspree

Das Formular sendet per `POST` an:

`https://formspree.io/f/YOUR_FORM_ID`

Vor Veröffentlichung muss `YOUR_FORM_ID` durch die echte Formspree-ID ersetzt werden. Die Formspree-Empfängeradresse, Spam-Schutz, Bestätigungsseite und Datenschutzhinweise müssen im Formspree-Konto konfiguriert und getestet werden.

## Vor öffentlicher Veröffentlichung

- Marken- und Domainprüfung für ClearDoc durchführen.
- Beispiel und Tariflogik durch eine qualifizierte Schweizer Tarifexpertin oder einen Tarifexperten validieren.
- Tatsächliche lokale Betriebsarchitektur bestätigen.
- Datenschutz-Folgenabschätzung und Rechtsprüfung abschliessen.
- Keine zertifizierte Konformität behaupten, solange sie nicht unabhängig bestätigt ist.
- Rechtsträger, Impressum und Datenschutzerklärung ergänzen.
- Formspree-ID einsetzen und Ende-zu-Ende testen.
- Nur bei Bedarf und mit Einwilligung Analytics ergänzen.

## Quellen im Prototyp

- Bundesamt für Gesundheit: TARDOC und ambulante Pauschalen ab 1. Januar 2026
- FMH: Rechnungsstandard 5.0
- Ärztekasse: öffentliche Lesehilfe zur TARDOC-Rechnung

Das Design ist eine eigenständige Umsetzung in einer sachlichen Schweizer Healthcare-Ästhetik. Es besteht keine Verbindung zu OAAT, FMH oder Versicherern.

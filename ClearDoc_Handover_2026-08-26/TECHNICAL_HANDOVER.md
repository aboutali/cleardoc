# ClearDoc - Technische Übergabe

## System

- Typ: statische One-Page-Landingpage
- Sprache: Deutsch
- Einstiegspunkt: `index.html`
- Styling: `styles.css`
- Interaktionen: `script.js`
- Abhängigkeiten: keine
- Build-Prozess: keiner
- Backend: keines

## Funktionen

### Rechnungsvergleich

Zwei Buttons setzen den Zustand `draft` oder `checked`. Der Zustand steuert:

- Markierung beziehungsweise Maskierung der zusätzlichen Rechnungsposition
- Statusmeldung der Analyse
- Rechnungsbetrag CHF 257.17 oder CHF 286.40
- angezeigten Prüfvorschlag AA.10.0020 x 3

### Jahresrechner

- Rechnungen pro Jahr: 6'800
- Durchschnittlicher Rechnungsbetrag: CHF 155
- Regler: 0,5 % bis 5,0 % in Schritten von 0,5 %
- Standard: 2,0 % beziehungsweise CHF 21'080

Berechnung in `script.js`:

`Rechnungen x Durchschnittsbetrag x Prozent / 100`

### Formular

Das Formular verwendet die Standardstruktur von Formspree:

- `method="POST"`
- `action="https://formspree.io/f/YOUR_FORM_ID"`
- benannte Felder für Vorname, Nachname, E-Mail, Fachgebiet, Herausforderung und Zustimmung
- versteckter Betreff und Spracheinstellung Deutsch

Vor Livegang:

1. Formspree-Formular anlegen.
2. `YOUR_FORM_ID` in `index.html` ersetzen.
3. Empfängeradresse bestätigen.
4. Spam-Schutz und Bestätigungsseite konfigurieren.
5. Testeintrag durchführen und Empfang prüfen.
6. Datenschutzerklärung auf Formspree-Verarbeitung abstimmen.

## Assets

Produktiv verwendet wird nur:

`assets/tardoc-rechnung-beispiel-v4.png`

Ältere Rechnungsbilder sind Arbeitsstände und gehören nicht in ein finales Deployment.

## Lokale Vorschau

Die Seite muss über einen lokalen Webserver geöffnet werden. Die bisherige Vorschau wurde unter `http://127.0.0.1:4173/` verwendet.

## Deployment

Der Inhalt des Ordners `landing-page` kann auf jedem statischen Webhost bereitgestellt werden. Vorher sollten nur die finalen Dateien übernommen und die älteren Bildstände ausgeschlossen werden.

## Abnahmekriterien

- Startseite lädt ohne Konsolenfehler.
- Navigation springt zu allen Abschnitten.
- Rechnungsentwurf und ClearDoc-Vorschlag schalten korrekt um.
- Die blaue Markierung liegt auf AA.10.0020.
- Jahresregler aktualisiert Prozentwert und Frankenbetrag.
- Formularvalidierung greift bei leeren Pflichtfeldern.
- Formspree-Test wird im konfigurierten Postfach empfangen.
- Mobile Darstellung hat keinen horizontalen Überlauf.
- Impressum, Datenschutz und Rechtsträger sind vorhanden.

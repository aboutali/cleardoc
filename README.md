# ClearDoc — Launch Site & Product Planning

## What is ClearDoc?

ClearDoc is a locally-run AI verification layer for Swiss TARDOC outpatient medical invoices. It identifies missing or incomplete billing entries by comparing invoice drafts against documented treatment records and reliable time sources (practice software, phone logs, time tracking). The core principle: no time source, no suggestion. All recommendations require physician or authorized staff approval before taking effect. Patient data remains in the practice's controlled environment.

**Tagline (German):** Jede erbrachte Leistung. Korrekt verrechnet. Patientendaten bleiben in der Praxis.

*Note: The launch website is in German and targets Swiss medical practices. Product planning documentation remains in English.*

## What's in this repository?

This repository holds **two things**:

1. **Launch website** (root directory: `index.html`, `styles.css`, `script.js`, `assets/`)
   - German-language landing page and interest form
   - Static HTML, CSS, and JavaScript; no build step
   - Example invoice (`assets/tardoc-rechnung-beispiel-v4.png`) and favicon
   
2. **Product planning & handover docs** (`docs/` directory)
   - Vision, MVP scope, roadmap (in English, for team coordination)
   - Sprint templates and decision log
   - Pointer to original handover documentation: `ClearDoc_Handover_2026-08-26/HANDOVER.md`

## Repo map

```
cleardoc/
├── README.md                          (you are here)
├── index.html                         (launch site entry point, German)
├── styles.css                         (landing page styles)
├── script.js                          (interactive elements: invoice picker, calculator)
├── assets/
│   ├── tardoc-rechnung-beispiel-v4.png (example TARDOC invoice)
│   └── favicon.svg                    (site icon)
├── docs/
│   ├── product/
│   │   ├── vision.md                  (product one-liner & principles, English)
│   │   ├── mvp.md                     (MVP scope, English)
│   │   ├── roadmap.md                 (sprint plan, English)
│   │   └── assumptions.md             (working hypotheses, English)
│   ├── templates/
│   │   └── sprint-template.md         (reusable sprint planning format)
│   └── decision-log.md                (architectural & product decisions)
└── ClearDoc_Handover_2026-08-26/
    └── HANDOVER.md                    (original handover documentation, preserved as record)
```

## Local preview

Run a local HTTP server to preview the site:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

(Direct file:// access may break interactive elements like the calculator and form.)

## Deployment

This is a **static site with zero build step**. Deploy the root directory as-is to any static host:

- **GitHub Pages:** Push to `main`; GitHub automatically serves `index.html` from root
- **Vercel/Netlify:** Connect the repo; no build command needed (leave blank)
- No environment variables, no database, no CI pipeline required

**Before go-live:** See `ClearDoc_Handover_2026-08-26/HANDOVER.md` section 9. Before publishing, you must:
1. Replace the Formspree `YOUR_FORM_ID` placeholder in `index.html` with your actual form ID and test the form submission
2. Add Swiss legal pages: Impressum (legal notice) and Datenschutzerklärung (privacy policy)

## Important notes

- **Handover reference:** The validated product scope and decisions are recorded in `ClearDoc_Handover_2026-08-26/HANDOVER.md`. Product planning docs in English are derived from this and remain in the repo for team coordination.
- **Language split:** Launch site is German (targeting Swiss practices); planning docs are English (for internal team use).
- **Form integration:** The interest form uses Formspree. Replace `YOUR_FORM_ID` in `index.html` before deploying to production.
- **No credentials:** This is a public repo; store no `.env` or secrets in version control.

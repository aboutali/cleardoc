# ClearDoc — Launch Site & Product Planning

## What is ClearDoc?

ClearDoc is a locally-run AI verification layer for Swiss TARDOC outpatient medical invoices. It identifies missing or incomplete billing entries by comparing invoice drafts against documented treatment records and reliable time sources (practice software, phone logs, time tracking). The core principle: no time source, no suggestion. All recommendations require physician or authorized staff approval before taking effect. Patient data remains in the practice's controlled environment.

**Tagline (German):** Jede erbrachte Leistung. Korrekt verrechnet. Patientendaten bleiben in der Praxis.

*Note: The launch website is multilingual (German, English, French, Italian) and targets Swiss medical practices. Product planning documentation remains in English. Live at https://www.cleardoc.ch.*

## What's in this repository?

This repository holds **two things**:

1. **Launch website** (root directory + language subdirectories)
   - German landing page at `/index.html` (default)
   - English at `/en/index.html`, French at `/fr/index.html`, Italian at `/it/index.html`
   - Shared styles (`styles.css`) and interactivity (`script.js`) at root; language subdirectories reference via `../`
   - Per-page I18N string config via `window.CLEARDOC_I18N` object
   - Canonical URLs and hreflang alternates for SEO; language switcher in header
   - Example invoice (`assets/tardoc-rechnung-beispiel-v4.png`) and favicon
   - Static HTML, CSS, and JavaScript; no build step
   
2. **Product planning & handover docs** (`docs/` directory)
   - Vision, MVP scope, roadmap (in English, for team coordination)
   - Sprint templates and decision log
   - Pointer to original handover documentation: `ClearDoc_Handover_2026-08-26/HANDOVER.md`

## Repo map

```
cleardoc/
├── README.md                          (you are here)
├── index.html                         (German landing page, default)
├── styles.css                         (shared styles for all language versions)
├── script.js                          (shared interactivity; reads window.CLEARDOC_I18N per page)
├── en/
│   └── index.html                     (English translation)
├── fr/
│   └── index.html                     (French translation)
├── it/
│   └── index.html                     (Italian translation)
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

## Deployment

This is a **static site with zero build step**. Deploy the root directory as-is to any static host:

- **GitHub Pages:** Push to `main`; GitHub automatically serves `index.html` from root
- **Vercel/Netlify:** Connect the repo; no build command needed (leave blank)
- No environment variables, no database, no CI pipeline required

Internal files (`README.md`, `CLAUDE.md`, `docs/`, the handover folder) are excluded
from the published site via `_config.yml`.

**Before go-live:**
1. Formspree is configured (ID: mvkpeykq) — test end-to-end form submission from the live site.
2. Legal pages (Impressum + Datenschutzerklärung) exist in all four languages — professional legal review recommended.
3. Custom domain www.cleardoc.ch is **on hold**: no `CNAME` file yet; add it back and set DNS when ready to connect.

## Important notes

- **Handover reference:** The validated product scope and decisions are recorded in `ClearDoc_Handover_2026-08-26/HANDOVER.md`. Product planning docs in English are derived from this and remain in the repo for team coordination.
- **Multilingual structure:** German is default (at repo root); other languages live in subdirectories (`/en/`, `/fr/`, `/it/`). Styles and scripts are shared at root; language-specific strings are in per-page `window.CLEARDOC_I18N` objects.
- **Form integration:** The interest form uses Formspree (ID: mvkpeykq, configured and live). Test from the production site before full launch.
- **Domain & contact:** Target domain https://www.cleardoc.ch (connection on hold); contact info@cleardoc.ch
- **No credentials:** This is a public repo; store no `.env` or secrets in version control.

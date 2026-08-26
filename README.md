# ClearDoc — Launch Site & Product Planning

## What is ClearDoc?

ClearDoc turns documents you dread into answers you trust. It's a document-understanding companion that reads complex documents—contracts, leases, insurance policies, medical letters, official forms—with you and gives you plain-language explanations grounded in the actual text. Every claim maps back to the passage it explains, so you can trust the clarity without blind faith in an AI.

## What's in this repository?

This repository holds **two things**:

1. **Launch website** (root directory: `index.html`, `css/`, `assets/`)
   - Public marketing site and waitlist signup form
   - Static HTML; no build step
   
2. **Product planning docs** (`docs/` directory)
   - Vision, MVP scope, roadmap, assumptions, sprint templates, decision log
   - The product *code* lives in a separate repository

**Note:** `docs/product/assumptions.md` contains working assumptions pending reconciliation with `docs/HANDOVER.md`. Check that file before citing product decisions.

## Repo map

```
cleardoc/
├── README.md                          (you are here)
├── index.html                         (launch site entry point)
├── css/                               (styles)
├── assets/                            (images, fonts)
├── docs/
│   ├── product/
│   │   ├── vision.md                  (product one-liner & principles)
│   │   ├── mvp.md                     (what we're building this quarter)
│   │   ├── roadmap.md                 (sprint plan)
│   │   └── assumptions.md             (working hypotheses; see note above)
│   ├── templates/
│   │   └── sprint-template.md         (reusable sprint planning format)
│   ├── decision-log.md                (decisions & their context)
│   └── HANDOVER.md                    (placeholder for handover docs when available)
```

## Local preview

**Option 1: Open directly**
```bash
open index.html          # macOS
xdg-open index.html      # Linux
```

**Option 2: Simple HTTP server**
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment

This is a **static site with zero build step**. Deploy the root directory and `docs/` as-is to any static host:

- **GitHub Pages:** Push to `main`; GitHub automatically serves `index.html` from root
- **Vercel/Netlify:** Connect the repo; no build command needed (leave blank)
- No environment variables, no database, no CI pipeline required

## Important notes

- **Docs & assumptions:** Product planning lives here until the product repo exists. See `docs/product/assumptions.md` — those are unverified working hypotheses pending `docs/HANDOVER.md`.
- **Website accuracy:** Keep launch-site copy in sync with the actual MVP scope in `docs/product/mvp.md`.
- **No credentials:** This is a public repo; store no `.env` or secrets in version control.

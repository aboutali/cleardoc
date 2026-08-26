# ClearDoc Launch Site — Test Case Suite

Planning document (English, per repo convention). Covers the 8 published
pages: `/`, `/legal.html`, `/en/index.html`, `/en/legal.html`,
`/fr/index.html`, `/fr/legal.html`, `/it/index.html`, `/it/legal.html`.

Every case below is atomic and machine-checkable — run it, compare the
actual output to "Expected result" verbatim, record PASS/FAIL. Do not
interpret or "eyeball" — if a command's output doesn't match exactly, it's
a FAIL and the actual output goes in the evidence column.

**Do not submit the pilot form in any test.** Suite B form cases stop at
`checkValidity()` / `reportValidity()` — never call `.click()` on the
submit button and never let a `form.submit()` reach the network.

---

## How to run

**1. Start (or confirm) the static file server**, from the repo root:

```bash
cd /home/user/cleardoc
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8123/
```

If that prints `200`, the server is already running — reuse it, do not
start a second one. If it errors or prints anything else, start it:

```bash
cd /home/user/cleardoc
python3 -m http.server 8123 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8123/   # expect 200
```

**2. Suite A** (static checks) needs no server and no browser — it greps
and parses the files directly from `/home/user/cleardoc`. Run its
commands from that directory.

**3. Suite B** (browser checks) uses Playwright, already installed at:

```
/tmp/claude-0/-home-user-cleardoc/0342f779-4866-5415-97c9-4b3e9c84318f/scratchpad
```

Run every Suite B script from that directory (`cd` there first) so
`require('playwright')` resolves, e.g.:

```bash
cd /tmp/claude-0/-home-user-cleardoc/0342f779-4866-5415-97c9-4b3e9c84318f/scratchpad
node b1.js
```

Every Playwright script must launch Chromium with the pinned local
binary — do not let Playwright try to download a browser:

```js
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
});
```

Base URL for all Suite B navigation: `http://127.0.0.1:8123/`.

Write each test's script to its own file (`b1.js`, `b2.js`, ...) in the
scratchpad directory before running it — the exact source for each is
given inline in that test case.

---

## Suite A — Static checks

No server, no browser. Run every command with `/home/user/cleardoc` as
the working directory.

### A1 — No root-absolute internal links

```bash
grep -rnE '(href|src)="/[^/]' index.html legal.html en/index.html en/legal.html fr/index.html fr/legal.html it/index.html it/legal.html
```

**Expected result:** no output printed (grep exits non-zero, meaning zero
matches). Any printed line is a FAIL — it means some internal link starts
with `/` instead of being relative.

### A2 — hreflang block identical across the 4 landing pages

```bash
diff <(grep '<link rel="alternate" hreflang=' index.html) <(grep '<link rel="alternate" hreflang=' en/index.html)
diff <(grep '<link rel="alternate" hreflang=' index.html) <(grep '<link rel="alternate" hreflang=' fr/index.html)
diff <(grep '<link rel="alternate" hreflang=' index.html) <(grep '<link rel="alternate" hreflang=' it/index.html)
```

**Expected result:** all three `diff` commands print nothing (no
differences). Each landing page's 5-line hreflang block must read exactly:

```
  <link rel="alternate" hreflang="de" href="https://www.cleardoc.ch/">
  <link rel="alternate" hreflang="en" href="https://www.cleardoc.ch/en/">
  <link rel="alternate" hreflang="fr" href="https://www.cleardoc.ch/fr/">
  <link rel="alternate" hreflang="it" href="https://www.cleardoc.ch/it/">
  <link rel="alternate" hreflang="x-default" href="https://www.cleardoc.ch/">
```

### A3 — hreflang block identical across the 4 legal pages

```bash
diff <(grep '<link rel="alternate" hreflang=' legal.html) <(grep '<link rel="alternate" hreflang=' en/legal.html)
diff <(grep '<link rel="alternate" hreflang=' legal.html) <(grep '<link rel="alternate" hreflang=' fr/legal.html)
diff <(grep '<link rel="alternate" hreflang=' legal.html) <(grep '<link rel="alternate" hreflang=' it/legal.html)
```

**Expected result:** all three `diff` commands print nothing. Each legal
page's block must read exactly:

```
  <link rel="alternate" hreflang="de" href="https://www.cleardoc.ch/legal.html">
  <link rel="alternate" hreflang="en" href="https://www.cleardoc.ch/en/legal.html">
  <link rel="alternate" hreflang="fr" href="https://www.cleardoc.ch/fr/legal.html">
  <link rel="alternate" hreflang="it" href="https://www.cleardoc.ch/it/legal.html">
  <link rel="alternate" hreflang="x-default" href="https://www.cleardoc.ch/legal.html">
```

### A4 — Canonical URL is correct per page

```bash
grep -o 'rel="canonical" href="[^"]*"' index.html legal.html en/index.html en/legal.html fr/index.html fr/legal.html it/index.html it/legal.html
```

**Expected result:** exactly these 8 lines (order as listed; each file
name is grep's own prefix):

```
index.html:rel="canonical" href="https://www.cleardoc.ch/"
legal.html:rel="canonical" href="https://www.cleardoc.ch/legal.html"
en/index.html:rel="canonical" href="https://www.cleardoc.ch/en/"
en/legal.html:rel="canonical" href="https://www.cleardoc.ch/en/legal.html"
fr/index.html:rel="canonical" href="https://www.cleardoc.ch/fr/"
fr/legal.html:rel="canonical" href="https://www.cleardoc.ch/fr/legal.html"
it/index.html:rel="canonical" href="https://www.cleardoc.ch/it/"
it/legal.html:rel="canonical" href="https://www.cleardoc.ch/it/legal.html"
```

### A5 — og: tags on landing pages only, absent on legal pages

```bash
grep -c 'property="og:' index.html en/index.html fr/index.html it/index.html
grep -c 'property="og:' legal.html en/legal.html fr/legal.html it/legal.html
```

**Expected result:** first command: all four counts `>= 3` (og:title,
og:description, og:url). Second command: all four counts are exactly `0`.

### A6 — Favicon path depth and target file

```bash
grep -o 'rel="icon"[^>]*href="[^"]*"' index.html legal.html en/index.html en/legal.html fr/index.html fr/legal.html it/index.html it/legal.html
test -f /home/user/cleardoc/assets/favicon.svg && echo "favicon file: OK"
```

**Expected result:** `index.html` and `legal.html` show
`href="assets/favicon.svg"`; the six `en/`, `fr/`, `it/` files show
`href="../assets/favicon.svg"`. Second command prints `favicon file: OK`.

### A7 — styles.css / script.js include paths correct per depth

```bash
grep -o 'href="[^"]*styles\.css"' index.html legal.html en/index.html en/legal.html fr/index.html fr/legal.html it/index.html it/legal.html
grep -o 'src="[^"]*script\.js"' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** first command — `index.html` and `legal.html` show
`href="styles.css"`; the six `en/`/`fr/`/`it/` files show
`href="../styles.css"`. Second command — exactly 4 lines: `index.html`
shows `src="script.js"`; `en/index.html`, `fr/index.html`, `it/index.html`
each show `src="../script.js"`.

### A8 — Legal pages include no external script.js, only inline year script

```bash
grep -c 'script.js' legal.html en/legal.html fr/legal.html it/legal.html
grep -c 'document.getElementById("year")' legal.html en/legal.html fr/legal.html it/legal.html
```

**Expected result:** first command: all four counts are `0` (no
reference to `script.js` at all, inline or external). Second command: all
four counts are `1`.

### A9 — Formspree action URL exact on all 4 landing forms

```bash
grep -o 'action="[^"]*"' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four lines read exactly
`action="https://formspree.io/f/mvkpeykq"`.

### A10 — Hidden `_language` field matches page language

```bash
grep -o 'name="_language" value="[^"]*"' index.html en/index.html fr/index.html it/index.html
```

**Expected result:**
```
index.html:name="_language" value="de"
en/index.html:name="_language" value="en"
fr/index.html:name="_language" value="fr"
it/index.html:name="_language" value="it"
```

### A11 — Consent checkbox has `value="zugestimmt"` on every language

```bash
grep -o '<input type="checkbox" name="consent"[^>]*>' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four lines read exactly
`<input type="checkbox" name="consent" value="zugestimmt" required>`
(the value stays the German word `zugestimmt` on every language — this
is intentional, not a translation bug).

### A12 — All 6 required form fields present on every landing page

```bash
cd /home/user/cleardoc && python3 - <<'EOF'
import re, sys
files = ["index.html", "en/index.html", "fr/index.html", "it/index.html"]
fields = ["firstName", "lastName", "email", "specialty", "challenge", "consent"]
ok = True
for f in files:
    t = open(f, encoding="utf-8").read()
    for field in fields:
        m = re.search(r'<(?:input|select)[^>]*name="%s"[^>]*>' % field, t)
        found = bool(m)
        required = bool(m and "required" in m.group(0))
        status = "OK" if found and required else "FAIL"
        if status == "FAIL":
            ok = False
        print(f"{f}: {field}: found={found} required={required} [{status}]")
print("ALL PASS" if ok else "SOME FAILED")
EOF
```

**Expected result:** all 24 lines show `found=True required=True [OK]`,
and the final line prints `ALL PASS`.

### A13 — Tariff code AA.10.0020 present on every landing page

```bash
grep -c 'AA.10.0020' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** `index.html` = `1` (built-in default, no inline
i18n override); `en/index.html`, `fr/index.html`, `it/index.html` each =
`2` (once in the static HTML suggestion, once in the page's inline
`window.CLEARDOC_I18N` override script).

### A14 — "Tarif 007" present in image alt text on every landing page

```bash
grep -ci 'tarif 007' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four counts are `1` (case-insensitive match
required — `fr/index.html` uses lowercase "tarif 007", the others use
"Tarif 007").

### A15 — CHF 155 present on every landing page

```bash
grep -c 'CHF 155' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four counts are `2`.

### A16 — 6'800 (straight apostrophe grouping) present statically on every landing page

```bash
grep -c "6'800" index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four counts are `2`. Note: the grouping mark is
a plain ASCII apostrophe (`U+0027`), not a typographic quote — copy the
command exactly rather than retyping the character.

### A17 — Time range 08:41–08:49 present on every landing page

```bash
grep -c '08:41–08:49' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** all four counts are `1`. Note: the dash is an en
dash (`U+2013`), not a hyphen — copy the command exactly.

### A18 — info@cleardoc.ch mailto link present on all 8 pages

```bash
grep -c 'mailto:info@cleardoc.ch' index.html legal.html en/index.html en/legal.html fr/index.html fr/legal.html it/index.html it/legal.html
```

**Expected result:** `index.html`, `en/index.html`, `fr/index.html`,
`it/index.html` each = `1`; `legal.html`, `en/legal.html`,
`fr/legal.html`, `it/legal.html` each = `5` (impressum address block,
datenschutz address block, §4 consent-withdrawal contact, §8 rights
contact, footer).

### A19 — Footer links to that language's own legal.html anchors

```bash
grep -c 'href="legal.html#impressum"' index.html en/index.html fr/index.html it/index.html
grep -c 'href="legal.html#datenschutz"' index.html en/index.html fr/index.html it/index.html
```

**Expected result:** both commands print `1` for all four files (a
relative link, resolving inside that language's own directory — never
`../legal.html` and never an absolute `/legal.html`).

### A20 — Legal pages: `#impressum` / `#datenschutz` sections exist exactly once each

```bash
for f in legal.html en/legal.html fr/legal.html it/legal.html; do
  echo "$f: impressum=$(grep -c 'id="impressum"' $f) datenschutz=$(grep -c 'id="datenschutz"' $f)"
done
```

**Expected result:** all four lines read
`<file>: impressum=1 datenschutz=1`.

### A21 — ANB Ventures address block (name + PO box + Zurich) appears exactly twice per legal page

```bash
grep -c "Postfach" legal.html
grep -c "PO Box" en/legal.html
grep -c "Case postale" fr/legal.html
grep -c "Casella postale" it/legal.html
```

**Expected result:** all four commands print `2` (once in the Impressum
"Betreiberin der Website" block, once in the Datenschutz "Verantwortliche
Stelle" block — each language uses its own translated term for the PO
box line, matched exactly above).

### A22 — GitHub Pages privacy link and Formspree privacy link present on every legal page

```bash
grep -c 'github-general-privacy-statement' legal.html en/legal.html fr/legal.html it/legal.html
grep -c 'formspree.io/legal/privacy-policy' legal.html en/legal.html fr/legal.html it/legal.html
```

**Expected result:** both commands print `1` for all four files.

### A23 — Bolded no-patient-data warning present on every legal page

```bash
grep -c '<p><strong>' legal.html en/legal.html fr/legal.html it/legal.html
```

**Expected result:** all four counts are `>= 1`. Then visually confirm
(read the matching line) it is the no-patient-data warning — expected
substrings per file: `legal.html` → "Patientendaten"; `en/legal.html` →
"patient or health data"; `fr/legal.html` → "donnée de patient";
`it/legal.html` → "dato di pazienti". Use:
```bash
grep -o '<p><strong>[^<]*</strong></p>' legal.html en/legal.html fr/legal.html it/legal.html
```
and check each output line contains its expected substring above.

---

## Suite B — Browser checks (Playwright)

Run from
`/tmp/claude-0/-home-user-cleardoc/0342f779-4866-5415-97c9-4b3e9c84318f/scratchpad`
with the server from "How to run" already up on `127.0.0.1:8123`. Each
case is a standalone Node script — write the given source to the named
file, then `node <file>`.

### B1 — Font-size floor (>= 12px) at desktop and mobile widths, all 8 pages

`b1.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/', '/legal.html', '/en/', '/en/legal.html', '/fr/', '/fr/legal.html', '/it/', '/it/legal.html'];
const WIDTHS = [1440, 390];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const violations = [];
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const path of PAGES) {
      await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
      const found = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('body *').forEach(el => {
          if (el.children.length > 0 && el.textContent.trim() === '') return; // skip pure containers
          const style = getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          const hasOwnText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim() !== '');
          if (!hasOwnText) return;
          const size = parseFloat(style.fontSize);
          if (size < 12) bad.push({ tag: el.tagName, cls: el.className, size, text: el.textContent.trim().slice(0, 40) });
        });
        return bad;
      });
      if (found.length) violations.push({ path, width, found });
    }
    await page.close();
  }
  console.log(JSON.stringify(violations, null, 2));
  console.log('VIOLATION COUNT:', violations.reduce((n, v) => n + v.found.length, 0));
  await browser.close();
})();
```

**Expected result:** printed JSON is `[]` and `VIOLATION COUNT: 0`. Any
listed element is a FAIL — record its `path`, `width`, `tag`/`cls`/`size`
as evidence.

### B2 — No horizontal scroll at 390px width, all 8 pages

`b2.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/', '/legal.html', '/en/', '/en/legal.html', '/fr/', '/fr/legal.html', '/it/', '/it/legal.html'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const results = {};
  for (const path of PAGES) {
    await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
    results[path] = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
```

**Expected result:** every value in the printed object is `false`. Any
`true` is a FAIL for that path.

### B3 — No console errors or page errors on load, all 8 pages

`b3.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/', '/legal.html', '/en/', '/en/legal.html', '/fr/', '/fr/legal.html', '/it/', '/it/legal.html'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const results = {};
  for (const path of PAGES) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
    results[path] = errors;
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
```

**Expected result:** every path's array is `[]`. Any non-empty array is
a FAIL — record the error text as evidence.

### B4 — Example invoice image resolves on every landing page

`b4.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/', '/en/', '/fr/', '/it/'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const results = {};
  for (const path of PAGES) {
    await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
    results[path] = await page.evaluate(() => {
      const img = document.querySelector('.official-invoice-viewer img');
      return img ? { src: img.currentSrc, naturalWidth: img.naturalWidth, complete: img.complete } : null;
    });
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
```

**Expected result:** every path's object has `complete: true` and
`naturalWidth` greater than `0`, and `src` ends with
`tardoc-rechnung-beispiel-v4.png`. A `null` entry or `naturalWidth: 0` is
a FAIL.

### B5 — Language switcher round trip on landing pages

`b5.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const log = [];

  async function record(label) {
    log.push({
      label,
      url: page.url(),
      htmlLang: await page.getAttribute('html', 'lang'),
      current: await page.getAttribute('.lang-switcher a[aria-current="page"]', 'href')
    });
  }

  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  await record('start-de');
  await page.click('.lang-switcher a[lang="en"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-en');
  await page.click('.lang-switcher a[lang="fr"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-fr');
  await page.click('.lang-switcher a[lang="it"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-it');
  await page.click('.lang-switcher a:has-text("DE")');
  await page.waitForLoadState('networkidle');
  await record('back-to-de');

  console.log(JSON.stringify(log, null, 2));
  await browser.close();
})();
```

**Expected result:** the 5 records show, in order:
`start-de` → url ends `/`, `htmlLang: "de"`;
`after-click-en` → url ends `/en/`, `htmlLang: "en"`;
`after-click-fr` → url ends `/fr/`, `htmlLang: "fr"`;
`after-click-it` → url ends `/it/`, `htmlLang: "it"`;
`back-to-de` → url ends `/`, `htmlLang: "de"`.
Each record's `current` (the `aria-current="page"` link's href) must
point at that same page (`./`, `./`, `./`, `./`, `./` respectively — the
current-language entry always links to itself).

### B6 — Language switcher round trip on legal pages

`b6.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const log = [];

  async function record(label) {
    log.push({
      label,
      url: page.url(),
      htmlLang: await page.getAttribute('html', 'lang'),
      hasImpressum: await page.locator('#impressum').count(),
      hasDatenschutz: await page.locator('#datenschutz').count()
    });
  }

  await page.goto('http://127.0.0.1:8123/legal.html', { waitUntil: 'networkidle' });
  await record('start-de-legal');
  await page.click('.lang-switcher a[lang="en"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-en-legal');
  await page.click('.lang-switcher a[lang="fr"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-fr-legal');
  await page.click('.lang-switcher a[lang="it"]');
  await page.waitForLoadState('networkidle');
  await record('after-click-it-legal');

  console.log(JSON.stringify(log, null, 2));
  await browser.close();
})();
```

**Expected result:** every record's `url` ends in `legal.html` (never
falls back to a landing page); `htmlLang` matches `de`/`en`/`fr`/`it` in
order; `hasImpressum` and `hasDatenschutz` are `1` in every record (a
landing page a link accidentally pointed to instead of a legal page would
show `0` for both).

### B7 — Invoice toggle default state is "checked" (DE)

`b7.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  const state = {
    checkedPressed: await page.getAttribute('button[data-invoice-state="checked"]', 'aria-pressed'),
    draftPressed: await page.getAttribute('button[data-invoice-state="draft"]', 'aria-pressed'),
    analysisStatus: await page.textContent('#analysis-status'),
    foundAmount: await page.textContent('#found-amount'),
    invoiceTotal: await page.textContent('#invoice-total'),
    totalLabel: await page.textContent('#total-label')
  };
  console.log(JSON.stringify(state, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "checkedPressed": "true",
  "draftPressed": "false",
  "analysisStatus": "Zeitquelle und Dokumentation abgeglichen",
  "foundAmount": "AA.10.0020 × 3 · + CHF 29.23",
  "invoiceTotal": "CHF 286.40",
  "totalLabel": "Nach ärztlicher Freigabe"
}
```

### B8 — Invoice toggle switches to draft values and back (DE)

`b8.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });

  await page.click('button[data-invoice-state="draft"]');
  const draft = {
    analysisStatus: await page.textContent('#analysis-status'),
    foundAmount: await page.textContent('#found-amount'),
    invoiceTotal: await page.textContent('#invoice-total'),
    totalLabel: await page.textContent('#total-label'),
    draftPressed: await page.getAttribute('button[data-invoice-state="draft"]', 'aria-pressed')
  };

  await page.click('button[data-invoice-state="checked"]');
  const backToChecked = {
    analysisStatus: await page.textContent('#analysis-status'),
    invoiceTotal: await page.textContent('#invoice-total')
  };

  console.log(JSON.stringify({ draft, backToChecked }, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "draft": {
    "analysisStatus": "Noch nicht geprüft",
    "foundAmount": "Noch kein Hinweis",
    "invoiceTotal": "CHF 257.17",
    "totalLabel": "Rechnungsbetrag im Entwurf",
    "draftPressed": "true"
  },
  "backToChecked": {
    "analysisStatus": "Zeitquelle und Dokumentation abgeglichen",
    "invoiceTotal": "CHF 286.40"
  }
}
```

### B9 — Invoice toggle localized strings on EN page

`b9.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/en/', { waitUntil: 'networkidle' });

  const checked = {
    analysisStatus: await page.textContent('#analysis-status'),
    invoiceTotal: await page.textContent('#invoice-total')
  };
  await page.click('button[data-invoice-state="draft"]');
  const draft = {
    analysisStatus: await page.textContent('#analysis-status'),
    foundAmount: await page.textContent('#found-amount'),
    invoiceTotal: await page.textContent('#invoice-total')
  };

  console.log(JSON.stringify({ checked, draft }, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "checked": {
    "analysisStatus": "Time source and documentation matched",
    "invoiceTotal": "CHF 286.40"
  },
  "draft": {
    "analysisStatus": "Not yet reviewed",
    "foundAmount": "No suggestion yet",
    "invoiceTotal": "CHF 257.17"
  }
}
```

### B10 — Annual slider default (2.0%) shows CHF 21’080 with de-CH grouping (DE)

`b10.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  const result = {
    sliderValue: await page.inputValue('#uplift-slider'),
    upliftOutput: await page.textContent('#uplift-output'),
    upliftFormula: await page.textContent('#uplift-formula'),
    annualExtra: await page.textContent('#annual-extra')
  };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "sliderValue": "2",
  "upliftOutput": "2,0%",
  "upliftFormula": "2,0%",
  "annualExtra": "≈ CHF 21’080"
}
```

### B11 — Annual slider at max (5.0%) computes CHF 52’700 (DE)

`b11.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  await page.fill('#uplift-slider', '5');
  await page.dispatchEvent('#uplift-slider', 'input');
  const result = {
    upliftOutput: await page.textContent('#uplift-output'),
    annualExtra: await page.textContent('#annual-extra')
  };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
```

**Expected result:** `{"upliftOutput":"5,0%","annualExtra":"≈ CHF 52’700"}`
— matches 6800 × 155 × 5 / 100 = 52700, grouped as `52’700` (note: the
browser's live `toLocaleString('de-CH')` grouping mark is a typographic
right single quote, `U+2019`, not the plain ASCII apostrophe used in the
static default HTML text checked in A16 — copy this character exactly).

### B12 — Annual slider at min (0.5%) computes CHF 5’270 (DE)

`b12.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  await page.fill('#uplift-slider', '0.5');
  await page.dispatchEvent('#uplift-slider', 'input');
  const result = {
    upliftOutput: await page.textContent('#uplift-output'),
    annualExtra: await page.textContent('#annual-extra')
  };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
```

**Expected result:** `{"upliftOutput":"0,5%","annualExtra":"≈ CHF 5’270"}`
— matches 6800 × 155 × 0.5 / 100 = 5270 (grouping mark is `U+2019`, see
note in B11).

### B13 — Decimal separator localized on EN ("." not ",") but grouping unchanged

`b13.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/en/', { waitUntil: 'networkidle' });
  const defaultState = {
    upliftOutput: await page.textContent('#uplift-output'),
    annualExtra: await page.textContent('#annual-extra')
  };
  await page.fill('#uplift-slider', '3.5');
  await page.dispatchEvent('#uplift-slider', 'input');
  const after = {
    upliftOutput: await page.textContent('#uplift-output'),
    annualExtra: await page.textContent('#annual-extra')
  };
  console.log(JSON.stringify({ defaultState, after }, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "defaultState": { "upliftOutput": "2.0%", "annualExtra": "≈ CHF 21’080" },
  "after": { "upliftOutput": "3.5%", "annualExtra": "≈ CHF 36’890" }
}
```
Note the decimal point uses `.` (localized) while the thousands grouping
still uses `'` (de-CH grouping, unchanged across all languages — this is
the specific behavior under test: `locale` stays `de-CH` in every
language's i18n; only `decimalSeparator` is overridden). 6800 × 155 ×
3.5 / 100 = 36890.

### B14 — Same slider-max check repeated on FR and IT (grouping consistency)

`b14.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/fr/', '/it/'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const results = {};
  for (const path of PAGES) {
    await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
    await page.fill('#uplift-slider', '5');
    await page.dispatchEvent('#uplift-slider', 'input');
    results[path] = {
      upliftOutput: await page.textContent('#uplift-output'),
      annualExtra: await page.textContent('#annual-extra')
    };
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
```

**Expected result:**
```json
{
  "/fr/": { "upliftOutput": "5,0%", "annualExtra": "≈ CHF 52’700" },
  "/it/": { "upliftOutput": "5,0%", "annualExtra": "≈ CHF 52’700" }
}
```
(FR and IT both use `,` as decimal separator like DE, and `'` grouping
like every other language.)

### B15 — Form: valid data passes browser validation (no submission)

`b15.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let navigated = false;
  page.on('framenavigated', () => { navigated = true; });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });
  navigated = false; // ignore the initial load navigation

  await page.fill('input[name="firstName"]', 'Anna');
  await page.fill('input[name="lastName"]', 'Muster');
  await page.fill('input[name="email"]', 'anna.muster@example.ch');
  await page.selectOption('select[name="specialty"]', { index: 1 });
  await page.selectOption('select[name="challenge"]', { index: 1 });
  await page.check('input[name="consent"]');

  const validNow = await page.evaluate(() => document.getElementById('pilot-form').checkValidity());
  console.log(JSON.stringify({ validNow, navigatedDuringTest: navigated }));
  await browser.close();
})();
```

**Expected result:** `{"validNow":true,"navigatedDuringTest":false}` —
the form is valid once every required field is filled, and crucially no
navigation occurred (confirming the submit button was never clicked).

### B16 — Form: empty submission is blocked by required-field validation

`b16.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const form = document.getElementById('pilot-form');
    const valid = form.checkValidity();
    const firstInvalid = document.querySelector('#pilot-form :invalid');
    return { valid, firstInvalidName: firstInvalid ? firstInvalid.name : null };
  });
  console.log(JSON.stringify(result));
  console.log('url after check:', page.url());
  await browser.close();
})();
```

**Expected result:**
`{"valid":false,"firstInvalidName":"firstName"}`, and
`url after check: http://127.0.0.1:8123/` (unchanged — no navigation, no
network POST attempted).

### B17 — Form: consent checkbox alone gates validity

`b17.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/', { waitUntil: 'networkidle' });

  await page.fill('input[name="firstName"]', 'Anna');
  await page.fill('input[name="lastName"]', 'Muster');
  await page.fill('input[name="email"]', 'anna.muster@example.ch');
  await page.selectOption('select[name="specialty"]', { index: 1 });
  await page.selectOption('select[name="challenge"]', { index: 1 });

  const withoutConsent = await page.evaluate(() => document.getElementById('pilot-form').checkValidity());
  await page.check('input[name="consent"]');
  const withConsent = await page.evaluate(() => document.getElementById('pilot-form').checkValidity());

  console.log(JSON.stringify({ withoutConsent, withConsent }));
  await browser.close();
})();
```

**Expected result:** `{"withoutConsent":false,"withConsent":true}`.

### B18 — Footer legal links navigate to the same-language legal page and anchor

`b18.js`:
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8123/en/', { waitUntil: 'networkidle' });
  await page.click('footer a[href="legal.html#impressum"]');
  await page.waitForLoadState('networkidle');
  const result = {
    url: page.url(),
    htmlLang: await page.getAttribute('html', 'lang'),
    impressumVisible: await page.locator('#impressum').isVisible()
  };
  console.log(JSON.stringify(result));
  await browser.close();
})();
```

**Expected result:**
`{"url":"http://127.0.0.1:8123/en/legal.html#impressum","htmlLang":"en","impressumVisible":true}`
— navigating from the EN landing page's footer must land on
`/en/legal.html`, never `/legal.html`.

### B19 — Legal pages issue no network request for script.js

`b19.js`:
```js
const { chromium } = require('playwright');
const PAGES = ['/legal.html', '/en/legal.html', '/fr/legal.html', '/it/legal.html'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const results = {};
  for (const path of PAGES) {
    const page = await browser.newPage();
    const scriptRequests = [];
    page.on('request', req => { if (req.url().endsWith('script.js')) scriptRequests.push(req.url()); });
    await page.goto(`http://127.0.0.1:8123${path}`, { waitUntil: 'networkidle' });
    results[path] = scriptRequests;
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
```

**Expected result:** every path's array is `[]` — no request for
`script.js` on any legal page. Any non-empty array is a FAIL.

---

## Results table template

Fill in one row per test case as you execute it. `pass/fail` is exactly
one of those two words. `evidence` is the actual command output (or a
short excerpt of it) when it diverges from "Expected result" — leave
blank or write `matches expected` on a pass.

| ID | pass/fail | evidence |
|----|-----------|----------|
| A1 | | |
| A2 | | |
| A3 | | |
| A4 | | |
| A5 | | |
| A6 | | |
| A7 | | |
| A8 | | |
| A9 | | |
| A10 | | |
| A11 | | |
| A12 | | |
| A13 | | |
| A14 | | |
| A15 | | |
| A16 | | |
| A17 | | |
| A18 | | |
| A19 | | |
| A20 | | |
| A21 | | |
| A22 | | |
| A23 | | |
| B1 | | |
| B2 | | |
| B3 | | |
| B4 | | |
| B5 | | |
| B6 | | |
| B7 | | |
| B8 | | |
| B9 | | |
| B10 | | |
| B11 | | |
| B12 | | |
| B13 | | |
| B14 | | |
| B15 | | |
| B16 | | |
| B17 | | |
| B18 | | |
| B19 | | |

---

## Latest run — 2026-08-26

Executed by independent test agents against commit `f6bd8d4` (local server, Chromium headless).

- **Suite A (static): 23/23 pass.** One spec correction during the run: A18's expected mailto count on legal pages was 3, actual site correctly has 5 — spec fixed, site unchanged.
- **Suite B (browser): 19/19 pass.** Highlights: font floor >= 12px verified on all 8 pages at 1440px and 390px; language switcher round trips DE→EN→FR→IT→DE on landing and legal pages; calculator verified at 0.5% (CHF 5'270), 2.0% (CHF 21'080), 5.0% (CHF 52'700) with localized decimal separators and shared apostrophe grouping; form validity gating works without submission; no console errors, no mobile horizontal scroll.

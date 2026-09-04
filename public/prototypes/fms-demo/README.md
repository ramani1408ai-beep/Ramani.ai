# FMS — Prototype

A click-through prototype of the Financial Management System (FMS), built to
walk stakeholders through the product's core workflow — and, deliberately,
through **where and how AI does the work**. It reproduces the real app's
visual language (navy/green/blue branding, icon sidebar, tabbed workspace),
backed entirely by fictional demo data — no backend, no real accounts,
nothing to install.

## How to run it

**Option A — just open it (simplest):**
Double-click [`index.html`](index.html). Everything is plain HTML/CSS/JS
with no build step, so it works straight from the file system in any
modern browser. (It loads the Inter font from Google Fonts if you're
online; offline, it falls back to your system font automatically.)

**Option B — serve it locally** (recommended if your browser blocks
anything when opened via `file://`):

```bash
cd "C:\Users\Ramani\Documents\Prototype"
python -m http.server 5179
```

Then open http://localhost:5179 in your browser.

A launch config for this is also registered in the main project's
`.claude/launch.json` under the name `fms-prototype`.

## Logging in

The login screen accepts anything — it's pre-filled with a demo email and
password. Click **Sign in to demo**.

## Where the AI shows up

This pass made the AI a first-class, visible actor throughout the app,
not just a feature on one screen:

- **AI Copilot** (bottom-right, every screen) — a persistent assistant that
  answers from your *live* demo state (net worth, what's unreconciled,
  what's queued in Capture, cheques due) and can jump you straight to the
  relevant page. Try the suggested prompts, or type your own.
- **AI Insights strip** (Dashboard) — proactive cards surfacing what the AI
  already noticed: auto-categorization stats, suggested reconciliation
  matches, documents ready to post, an anomaly it flagged, and forecast
  confidence. Each card is clickable.
- **Auto-process all with AI** (Capture) — the automation centerpiece.
  One click runs the AI over every queued document: a live processing feed
  streams in per-document, high-confidence documents (≥95%) post straight
  to the ledger, anything less certain is flagged with one click into a
  human-review queue. Ends with a summary (posted / flagged / elapsed time).
- **AI-suggested reconciliation matches** — the AI proactively pairs bank
  lines to book entries and shows its confidence; accept one with a single
  click, or **Accept all** to clear every suggestion at once.
- **AI-categorized badges** (Transactions, Dashboard) — every ledger entry
  shows whether it was categorized by AI (with confidence %) or entered
  manually, so the split is always visible, not just claimed.

## Built for presenting

- **⌘/Ctrl + K command palette** — jump to any page, or trigger an AI
  action ("Auto-process all captures", "Auto-match reconciliations") from
  anywhere, without touching the sidebar.
- **Guided tour** (topbar) — a one-click, auto-advancing walkthrough of the
  six core screens with captions, so you can hand this to a room and let it
  run itself. Pause, skip, step back, or exit at any point.

## What to click through

1. **Dashboard** — KPIs, AI insights strip, net worth trend, cash by bank,
   upcoming payments, and live alert banners.
2. **Capture** — the flagship feature. Either click **Auto-process all with
   AI** to watch the bulk automation run, or pick a single sample document
   to walk through the AI extraction → chat → journal → post flow manually.
3. **Reconcile** (under Banking) — accept an AI-suggested match with one
   click, or pair lines manually and **Confirm match**.
4. **Transactions** — search/filter the ledger; see the AI-categorization
   column; anything you posted from Capture appears at the top.
5. **Reporting** — Chart of Accounts, Trial Balance (debits = credits),
   Balance Sheet (assets = liabilities + equity), Income Statement,
   Cashflow, and Cashflow Forecast with scheduled events.
6. **Commodities, Cheques, Market Watch, Live Transactions (SMS),
   Properties, Audit Logs, Workspaces** — supporting modules with
   representative data.

## What this is not

This is a **front-end-only demo**. There is no backend, no database, and
no AI model — the Copilot, the Capture extraction, and the reconciliation
suggestions are all scripted against the demo dataset, not a real model.
Anything you post or match lives only in this browser tab's memory and
resets on reload. It exists purely to demonstrate the product's workflow
(and where AI sits in it) to stakeholders, not to be a functional build.

## File structure

```
Prototype/
├── index.html                Shell: login screen + app container + mount points
├── css/styles.css              Full design system (colors, components, AI surfaces)
├── js/
│   ├── icons.js                 Small hand-rolled outline icon set (SVG)
│   ├── util.js                   Formatting helpers (currency, dates, escaping)
│   ├── data.js                    All mock/demo data in one place
│   ├── charts.js                   Dependency-free inline SVG chart helpers
│   ├── copilot.js                   Global AI assistant (data-aware answers)
│   ├── command-palette.js            Ctrl/Cmd+K quick nav + AI actions
│   ├── presenter.js                   Guided tour / autoplay walkthrough
│   ├── app.js                          Sidebar, tabs, login, state, boot
│   └── pages/                           One file per page/module
│       ├── dashboard.js                  + AI insights strip
│       ├── capture.js                     Manual flow + bulk AI auto-process
│       ├── transactions.js                 + AI-categorization column
│       ├── reconciliation.js                + AI-suggested one-click matches
│       ├── reports.js                        COA, Trial Balance, Balance Sheet, etc.
│       ├── forecast.js
│       ├── commodities.js
│       └── misc.js                             Cheques, SMS feed, audit log, etc.
└── README.md
```

To change the demo data (amounts, names, dates, AI confidence scores), edit
`js/data.js` — every page reads from that one file.

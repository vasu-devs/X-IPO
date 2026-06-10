# AI IPO Watch

An interactive, research-grounded predictive model for the three frontier-AI listings of 2026: **OpenAI**, **Anthropic**, and **SpaceXAI (SPCX)**. Compiled June 11, 2026, the day before SpaceXAI's record $75B Nasdaq debut.

## What's inside

- **`app/`** — the website. React 19 + Vite, Tailwind v4, Motion (Framer Motion), Recharts. Bright matte-acrylic fintech UI with a grain finish, featuring:
  - **Forecast lab** — fan-chart projections (P10-P90 / P25-P75) for the first 12 months of trading per company, with bear/base/bull scenarios and a macro stress slider
  - **Prediction map** — probability-weighted expected-return heatmap, company x month
  - 30 years of landmark IPO comparables, era-filterable
  - Month-by-month market outlook through Q2 2027
- **`research/`** — the full research corpus: company dossiers, the 20-listing historical dataset (1995-2025), investor positioning, macro context, and model methodology. Built from 24 sources, 90 extracted claims, 25 adversarial verifications.
- **`site/`** — the original static prototype (vanilla JS + Chart.js), kept for reference.

## Run it

```bash
cd app
npm install
npm run dev
```

## Disclaimer

Research exercise, not investment advice. Private-company figures are company-disclosed or press-reported and unaudited. Predictions are probability-weighted model ranges.

---

Designed and built by **[VASU-DEVS](https://vasudev.live)** · [github.com/vasu-devs](https://github.com/vasu-devs)

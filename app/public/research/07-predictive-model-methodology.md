# Predictive Model Methodology — AI Mega-IPO Pricing & Trading Model

> How the predictions on the site are produced. Compiled 2026-06-10.
> This is a scenario/comparables model, not investment advice. All outputs are probability-weighted ranges, not point forecasts.

## 1. What the model predicts (per company: OpenAI, Anthropic, xAI)

1. **Listing probability by window** — P(IPO) for H2-2026, 2027, 2028+, or "stays private / other liquidity".
2. **Pricing valuation range** — at-offer enterprise valuation band.
3. **Day-1 return distribution** — implied from the size-vs-pop comparables curve.
4. **Month-6 and month-12 return bands** vs offer price — bull / base / bear.
5. **Demand picture** — expected book oversubscription, allocation mix (long-only vs hedge fund vs retail), index-inclusion timeline.

## 2. Model structure

### Layer 1 — Comparables regression (historical anchor)
From the 20-listing dataset in `04-historical-ipo-comparables.md`:
- `day1_pop ≈ f(raise_size, fwd_rev_multiple, tape_regime)` — log-linear fit; raise size negatively loads, tape regime (median trailing-90-day tech IPO pop) positively loads.
- `12mo_return ≈ g(fwd_rev_multiple, rev_growth, lockup_structure)` — the dominant term is the gap between growth rate and the growth implied by the multiple.

### Layer 2 — Company fundamentals (June 2026 verified data)
Inputs per company (from research files 01–03): latest primary/secondary valuation marks, revenue run-rate and trajectory, gross-margin/compute-cost structure, cash burn vs raise need, governance structure, cap-table pressure (investor liquidity demands).

### Layer 3 — Demand-side overlay (from file 05)
Mutual-fund mark momentum (Fidelity/T. Rowe style marks vs last round), secondary-market price vs last primary, sovereign/crossover participation, retail sentiment proxies.

### Layer 4 — Macro gate (from file 06)
Rates path, Nasdaq drawdown state, AI-capex sentiment, "AI bubble" discourse intensity. Acts as a multiplier on both listing probability and the pop distribution; a >15% Nasdaq drawdown historically shuts the mega-IPO window entirely.

### Scenario engine
Monte-Carlo-style scenario table (computed offline, embedded as static JSON in the site): for each company, 3 macro states × 3 fundamental states → 9 cells, each with valuation band, day-1, 12-month band, and assigned probability. Bands shown on the site are the probability-weighted P10/P50/P90.

## 3. Key model assumptions (editable)
- No model can price an unprecedented event precisely; OpenAI at ~$1T would be ~6× larger than the largest IPO valuation in history (Alibaba's $168B in 2014, Saudi Aramco's $1.7T 2019 local listing aside).
- Aramco 2019 is used as the only structural analogue for "$1T-class listing": tiny float (~1.5%), priced for stability, +10% day-1, index inclusion forced passive buying.
- We assume any OpenAI/Anthropic listing uses a **small-float strategy (2–6%)**, which mechanically supports the price and raises the day-1 distribution's floor.
- Lockup-expiry supply is the main month-6–12 downside channel.
- Predictions are conditional on the company actually filing; "no IPO" remains a high-probability branch for all three.

## 4. Honest limitations
- Private-company financials are press-reported, not audited public filings; error bars are wide.
- N=20 comparables is small; the regression is an anchor, not statistics-grade inference.
- Reflexivity: these IPOs are large enough to move the macro tape they depend on.
- The model treats each company independently; in reality the first mega-AI listing's performance will heavily condition the next one's pricing.

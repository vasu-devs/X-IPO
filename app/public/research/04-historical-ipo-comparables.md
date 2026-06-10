# Historical IPO Comparables — Landmark Tech Listings (1995–2025)

> Dataset compiled for the AI IPO predictive model. All figures are at-pricing unless noted.
> Sources: exchange records, S-1/prospectus filings, contemporaneous financial press. Compiled 2026-06-10.

## 1. The benchmark table

| Company | Ticker | IPO date | Offer price | Raise | Valuation at pricing | Day-1 close | Day-1 pop | ~12-month performance vs offer |
|---|---|---|---|---|---|---|---|---|
| Netscape | NSCP | 1995-08-09 | $28 | ~$140M | ~$1.1B | $58.25 | +108% | +~140% (peak), volatile |
| Amazon | AMZN | 1997-05-15 | $18 | $54M | $438M | $23.50 | +31% | +~230% |
| theGlobe.com | TGLO | 1998-11-13 | $9 | ~$28M | ~$0.3B | $63.50 | +606% | −90%+ (dot-com bust) |
| VA Linux | LNUX | 1999-12-09 | $30 | ~$132M | ~$1B | $239.25 | +698% (record) | −90%+ |
| Google | GOOG | 2004-08-19 | $85 (Dutch auction) | $1.67B | $23B | $100.34 | +18% | +~200% |
| Visa | V | 2008-03-19 | $44 | $17.9B | ~$37B | $56.50 | +28% | ~+25% (through GFC) |
| Facebook | FB | 2012-05-18 | $38 | $16B | $104B | $38.23 | +0.6% | −30% at 12mo; fell to $17.55 (−54%) by Sep 2012; recovered offer price Aug 2013 |
| Alibaba | BABA | 2014-09-19 | $68 | $25B (w/ greenshoe — largest ever at the time) | $168B | $93.89 | +38% | −10% at 12mo |
| Snap | SNAP | 2017-03-02 | $17 | $3.4B | $24B | $24.48 | +44% | −20% at 12mo |
| Uber | UBER | 2019-05-10 | $45 | $8.1B | $82B | $41.57 | −7.6% | −25% at 12mo |
| Snowflake | SNOW | 2020-09-16 | $120 | $3.9B | $33B (largest software IPO) | $253.93 | +112% | flat-to-down vs day-1 close; +~100% vs offer |
| Rivian | RIVN | 2021-11-10 | $78 | $12B | $77B | $100.73 | +29% | −60%+ at 12mo |
| ARM | ARM | 2023-09-14 | $51 | $4.9B | $54.5B | $63.59 | +25% | +~110% at 12mo (AI re-rating) |
| Reddit | RDDT | 2024-03-21 | $34 | $748M | $6.4B | $50.44 | +48% | +~190% at 12mo |
| Astera Labs | ALAB | 2024-03-20 | $36 | $713M | $5.5B | $62.03 | +72% | +~75% at 12mo |
| CoreWeave | CRWV | 2025-03-28 | $40 (cut from $47–55 range) | $1.5B | ~$23B | $40.00 | ~0% | surged in mid-2025 (peaked ~4× offer by June 2025), then highly volatile |
| Circle | CRCL | 2025-06-05 | $31 | $1.1B | ~$6.9B | $83.23 | +168% | — |
| Chime | CHYM | 2025-06-12 | $27 | $864M | ~$11.6B | $37.11 | +37% | — |
| Figma | FIG | 2025-07-31 | $33 | $1.2B | ~$19.3B | $115.50 | +250% | — |
| Klarna | KLAR | 2025-09-10 | $40 | $1.4B | ~$15.1B | $45.82 | +15% | — |

## 2. Structural lessons extracted (model inputs)

### 2.1 Size vs. first-day pop (inverse relationship)
Mega-deals price tighter. Raises above ~$8B (Facebook, Alibaba, Uber, Visa, Rivian) cluster between **−8% and +38%** day-1; raises under ~$2B in hot tapes can pop 50–250%. An OpenAI-scale deal (likely the largest raise in history) should be modeled with a **single-digit-to-~30% day-1 band**, not a Figma-style pop — banks and the issuer cannot afford to leave tens of billions on the table.

### 2.2 The "priced-for-perfection" drawdown pattern
Facebook (−54% within 4 months), Uber (−25% at 12mo), Rivian (−60%+) show that the largest, most-anticipated deals frequently trade **below offer within 6–12 months** when listing into peak expectations. Median 12-month excess return of mega-IPOs (> $10B raise) vs Nasdaq is **negative**.

### 2.3 Revenue multiples at listing (the gravity variable)
| Company | Fwd revenue multiple at IPO | Outcome |
|---|---|---|
| Google 2004 | ~7–8× | sustained rerating up |
| Facebook 2012 | ~20× | −50% drawdown, then grew into it |
| Snowflake 2020 | ~55–60× | never reclaimed day-1 close for years |
| ARM 2023 | ~17× | rerated up on AI narrative |
| CoreWeave 2025 | ~12× (but capital-intensive, levered) | priced cut, then squeezed up |

Rule of thumb encoded in the model: **above ~25× forward revenue, 12-month return distribution skews sharply negative** unless revenue growth exceeds ~80% y/y.

### 2.4 Tape dependence
First-day pops are regime-dependent: 1999 median tech pop ~65%; 2008–2012 ~10%; 2020–21 ~40%; 2022–23 (rate shock) — window nearly shut; 2024–25 reopened at ~30–60% median for sub-$2B tech deals. The 2025 cohort (Circle, Figma, CoreWeave-after-the-fact) signaled **strong retail/institutional appetite specifically for AI-adjacent scarcity**.

### 2.5 Insider supply & lockups
Direct listings and short lockups (Snowflake's staggered unlock, Rivian's Dec-2022 unlock) created the worst 6–12-month drawdowns. A staged-lockup structure is the single biggest predictable downside catalyst in months 6–12 post-IPO.

### 2.6 Dual-class / governance discounts
Snap (no-vote shares) and governance-heavy structures (OpenAI's nonprofit-controlled PBC, xAI's Musk control) historically cost ~5–15% in valuation multiple vs clean single-class peers — but have not prevented deals from getting done.

## 3. Scarcity-premium precedents (most relevant analogue class)
The closest analogues for an OpenAI/Anthropic listing are not median IPOs but **"category-defining scarcity" listings**: Google 2004 (search), Facebook 2012 (social), Alibaba 2014 (China internet), ARM 2023 / CoreWeave 2025 (AI compute). Common pattern:
1. Massive oversubscription (10–20×+ book coverage),
2. Modest-to-moderate day-1 (index funds and long-onlys absorb size),
3. High volatility in months 1–6,
4. Long-run path determined almost entirely by whether revenue growth beats the multiple's implied bar.

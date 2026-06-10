/* AI IPO Watch — dataset compiled 2026-06-11.
   Sources and verification trail: ../research/*.md
   All forward-looking numbers are probability-weighted model outputs, not advice. */

const DATA = {
  asOf: "June 11, 2026",

  companies: [
    {
      id: "openai",
      name: "OpenAI",
      product: "ChatGPT",
      color: "#7dd3fc",
      status: "Confidential S-1 announced Jun 8, 2026",
      lastMark: 852, // $B post-money
      lastMarkLabel: "$852B · Mar 31, 2026",
      revenueAnnualized: 24, // $B
      revenueLabel: "~$2B/month (~$24B annualized)",
      multiple: 35.5,
      profitability: "Unprofitable; ~$8B operating loss in 2025",
      raise: "$122B round (largest private raise in history), co-led by SoftBank and T. Rowe Price",
      listing: { p2026: 0.48, bySep2026: 0.12, by2027: 0.80 },
      pricingBand: { p10: 700, p50: 950, p90: 1150 },
      day1: { p10: -5, p50: 18, p90: 45 },
      m12: { p10: -45, p50: -5, p90: 60 },
      thesis: "Demand is pre-validated, but ~40x revenue at a $1T print is Facebook-2012 territory. The multiple needs >80% growth to hold; highest priced-for-perfection drawdown risk of the three.",
      valuationHistory: [
        { date: "2023-01", v: 30 },
        { date: "2024-02", v: 86 },
        { date: "2024-10", v: 157 },
        { date: "2025-03", v: 300 },
        { date: "2025-10", v: 500 },
        { date: "2026-03", v: 852 }
      ]
    },
    {
      id: "anthropic",
      name: "Anthropic",
      product: "Claude",
      color: "#34d39b",
      status: "Confidential S-1 filed Jun 1, 2026",
      lastMark: 965,
      lastMarkLabel: "$965B · May 28, 2026",
      revenueAnnualized: 47,
      revenueLabel: "$47B run-rate (May 2026)",
      multiple: 20.5,
      profitability: "Not disclosed; heavy compute spend",
      raise: "$65B Series H led by Altimeter, Dragoneer, Greenoaks, Sequoia",
      listing: { p2026: 0.40, bySep2026: 0.08, by2027: 0.85 },
      pricingBand: { p10: 900, p50: 1150, p90: 1500 },
      day1: { p10: 0, p50: 24, p90: 55 },
      m12: { p10: -30, p50: 20, p90: 95 },
      thesis: "Best multiple-to-growth cover of the three: ~20x a $47B run-rate that grew tenfold in a year. Risk concentrates in run-rate durability and the absolute size of any float.",
      valuationHistory: [
        { date: "2023-05", v: 5 },
        { date: "2024-02", v: 18 },
        { date: "2025-03", v: 61.5 },
        { date: "2025-09", v: 183 },
        { date: "2026-01", v: 350 },
        { date: "2026-05", v: 965 }
      ]
    },
    {
      id: "spcx",
      name: "SpaceXAI",
      product: "xAI · Grok · X",
      color: "#fbbf6d",
      status: "Lists Jun 12, 2026 · Nasdaq · SPCX",
      lastMark: 1750,
      lastMarkLabel: "$1.75T IPO valuation · fixed $135/share",
      revenueAnnualized: 3.8,
      revenueLabel: "~$3.8B annualized (xAI + X, est.)",
      multiple: null,
      profitability: "Consolidated $5B 2025 loss; ~$1B/month burn from xAI",
      raise: "$75B IPO raise (largest in history): 555.6M shares at a fixed $135",
      listing: { p2026: 0.97, bySep2026: 0.97, by2027: 0.99 },
      pricingBand: { p10: 1750, p50: 1750, p90: 1750 },
      day1: { p10: -8, p50: 22, p90: 65 },
      m12: { p10: -35, p50: 15, p90: 90 },
      thesis: "A hybrid asset: Starlink cash flows plus an AI lab plus X. The ~4.3% float follows the Aramco pattern: mechanically supported price, forced index buying later, violent moves on thin supply.",
      valuationHistory: [
        { date: "2024-06", v: 24 },
        { date: "2024-12", v: 50 },
        { date: "2025-03", v: 113 },
        { date: "2026-01", v: 230 },
        { date: "2026-02", v: 250 },
        { date: "2026-06", v: 1750 }
      ]
    }
  ],

  /* 20 landmark listings: raise ($B), day-1 pop (%), 12-month vs offer (%), valuation at pricing ($B) */
  comparables: [
    { name: "Netscape", year: 1995, raise: 0.14, pop: 108, m12: 140, val: 1.1 },
    { name: "Amazon", year: 1997, raise: 0.054, pop: 31, m12: 230, val: 0.44 },
    { name: "theGlobe.com", year: 1998, raise: 0.028, pop: 606, m12: -90, val: 0.3 },
    { name: "VA Linux", year: 1999, raise: 0.13, pop: 698, m12: -90, val: 1 },
    { name: "Google", year: 2004, raise: 1.67, pop: 18, m12: 200, val: 23 },
    { name: "Visa", year: 2008, raise: 17.9, pop: 28, m12: 25, val: 37 },
    { name: "Facebook", year: 2012, raise: 16, pop: 0.6, m12: -30, val: 104 },
    { name: "Alibaba", year: 2014, raise: 25, pop: 38, m12: -10, val: 168 },
    { name: "Snap", year: 2017, raise: 3.4, pop: 44, m12: -20, val: 24 },
    { name: "Uber", year: 2019, raise: 8.1, pop: -7.6, m12: -25, val: 82 },
    { name: "Snowflake", year: 2020, raise: 3.9, pop: 112, m12: 100, val: 33 },
    { name: "Rivian", year: 2021, raise: 12, pop: 29, m12: -60, val: 77 },
    { name: "ARM", year: 2023, raise: 4.9, pop: 25, m12: 110, val: 54.5 },
    { name: "Astera Labs", year: 2024, raise: 0.71, pop: 72, m12: 75, val: 5.5 },
    { name: "Reddit", year: 2024, raise: 0.75, pop: 48, m12: 190, val: 6.4 },
    { name: "CoreWeave", year: 2025, raise: 1.5, pop: 0, m12: 120, val: 23 },
    { name: "Circle", year: 2025, raise: 1.1, pop: 168, m12: null, val: 6.9 },
    { name: "Chime", year: 2025, raise: 0.86, pop: 37, m12: null, val: 11.6 },
    { name: "Figma", year: 2025, raise: 1.2, pop: 250, m12: null, val: 19.3 },
    { name: "Klarna", year: 2025, raise: 1.4, pop: 15, m12: null, val: 15.1 }
  ],

  polymarket: {
    note: "Polymarket-implied probability that OpenAI is publicly listed by each date (fetched Jun 11, 2026)",
    points: [
      { label: "Jun 30, 2026", p: 1 },
      { label: "Aug 31, 2026", p: 4 },
      { label: "Sep 30, 2026", p: 12 },
      { label: "Dec 31, 2026", p: 48 }
    ]
  },

  investors: [
    { cls: "Venture capital", names: "SoftBank · a16z · Sequoia · Thrive · TPG · Greenoaks", read: "Doubling down at $850B to $965B marks instead of distributing. Conviction, but also lock-in: exits now require public markets." },
    { cls: "Mutual funds", names: "Fidelity · T. Rowe Price · BlackRock affiliates", read: "Buying pre-IPO at scale. Their private marks now anchor IPO pricing, pulling demand forward and compressing the pop." },
    { cls: "Sovereign wealth", names: "MGX (Abu Dhabi) · Temasek · UC Investments", read: "Anchoring the mega-rounds with patient capital. A floor under valuations, with geopolitical scrutiny as the tail risk." },
    { cls: "Crossover funds", names: "Altimeter · Dragoneer · D. E. Shaw Ventures", read: "Led Anthropic's Series H. The last private round is functionally the IPO pricing committee." },
    { cls: "Strategics", names: "NVIDIA · Amazon · Microsoft · Cisco-linked funds", read: "Equity stakes tied to compute and commercial deals. The circular-deal critique becomes an S-1 disclosure battleground." },
    { cls: "Retail", names: "$3B+ via bank channels · ARK ETFs · prediction markets", read: "Retail owned OpenAI before any listing. Supports day-1 demand and raises the froth risk in equal measure." }
  ],

  macro: {
    nasdaqYtd: 10, spYtd: 8, tenYear: 4.5,
    drawdown: { from: "Jun 2 record high", nasdaq: -5, sp: -3 },
    events: [
      { date: "Jun 2", text: "S&P 500 and Nasdaq close at record highs" },
      { date: "Jun 5", text: "Nasdaq-100 falls 4.77%; ~$1T wiped out, led by semiconductors" },
      { date: "Jun 9", text: "Dip-buying stabilizes the tape; Nasdaq -0.97%" },
      { date: "Jun 12", text: "SpaceXAI (SPCX) lists on Nasdaq: the largest IPO in history" }
    ],
    bubble: {
      gmo: "GMO (Jan 2026): total AI industry revenue under $50B against roughly $1T of investment.",
      counter: "By May 2026, Anthropic's $47B run-rate alone nearly equals that whole-industry estimate. Either the gap is closing at historic speed, or run-rate accounting flatters the picture. Both can be true."
    }
  },

  scenarios: [
    { name: "Bear: window shuts", prob: 25, desc: "SPCX breaks below $135 in month one and the Nasdaq drawdown extends past 10%. OpenAI and Anthropic slip to 2027; pricing bands compress 20-30%." },
    { name: "Base: staggered debuts", prob: 50, desc: "SPCX holds its price into the summer. Anthropic lists around Q4 2026 to H1 2027 near $1.15T; OpenAI follows at $950B to $1T. Moderate pops, volatile first year." },
    { name: "Bull: melt-up", prob: 25, desc: "SPCX squeezes hard on its 4% float. Both S-1s convert fast; OpenAI prints at or above $1T and Anthropic toward $1.5T. The 2027 lockup cliffs become the next story." }
  ]
};

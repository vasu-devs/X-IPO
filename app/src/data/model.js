/* AI IPO Watch — dataset + forecast engine. Compiled 2026-06-11.
   Sources and verification trail: ../../research/*.md. Research exercise, not advice. */

export const AS_OF = "June 11, 2026";

export const COMPANIES = [
  {
    id: "openai",
    name: "OpenAI",
    product: "ChatGPT",
    color: "#4f53c4",
    status: "S-1 announced Jun 8",
    lastMark: 852,
    lastMarkLabel: "$852B · Mar 31, 2026",
    revenueAnnualized: 24,
    revenueLabel: "~$2B/mo (~$24B annualized)",
    multiple: 35.5,
    profitability: "Unprofitable · ~$8B 2025 op loss",
    raise: "$122B round, co-led by SoftBank and T. Rowe Price. The largest private raise in history.",
    listing: { p2026: 0.48, bySep2026: 0.12, by2027: 0.8 },
    expectedDebut: "Nov-Dec 2026 (base case)",
    offerValuation: 950,
    pricingBand: { p10: 700, p50: 950, p90: 1150 },
    day1: { p10: -5, p50: 18, p90: 45 },
    m12: { p10: -45, p50: -5, p90: 60 },
    thesis:
      "Demand is pre-validated, but ~40x revenue at a $1T print is Facebook-2012 territory. The multiple needs >80% growth to hold. Highest priced-for-perfection risk of the three.",
    valuationHistory: [
      { date: "2023-01", v: 30 }, { date: "2024-02", v: 86 }, { date: "2024-10", v: 157 },
      { date: "2025-03", v: 300 }, { date: "2025-10", v: 500 }, { date: "2026-03", v: 852 },
    ],
    paths: {
      bear: [100, 95, 86, 78, 72, 66, 60, 57, 55, 52, 55, 57, 55],
      base: [100, 118, 112, 104, 100, 96, 90, 86, 90, 94, 97, 95, 95],
      bull: [100, 145, 150, 142, 150, 158, 148, 140, 150, 158, 165, 162, 160],
    },
  },
  {
    id: "anthropic",
    name: "Anthropic",
    product: "Claude",
    color: "#118a72",
    status: "S-1 filed Jun 1",
    lastMark: 965,
    lastMarkLabel: "$965B · May 28, 2026",
    revenueAnnualized: 47,
    revenueLabel: "$47B run-rate (May 2026)",
    multiple: 20.5,
    profitability: "Not disclosed · heavy compute spend",
    raise: "$65B Series H led by Altimeter, Dragoneer, Greenoaks and Sequoia.",
    listing: { p2026: 0.4, bySep2026: 0.08, by2027: 0.85 },
    expectedDebut: "Q4 2026 - H1 2027 (base case)",
    offerValuation: 1150,
    pricingBand: { p10: 900, p50: 1150, p90: 1500 },
    day1: { p10: 0, p50: 24, p90: 55 },
    m12: { p10: -30, p50: 20, p90: 95 },
    thesis:
      "Best multiple-to-growth cover of the three: ~20x a run-rate that grew tenfold in a year. Risk concentrates in run-rate durability and the absolute size of any float.",
    valuationHistory: [
      { date: "2023-05", v: 5 }, { date: "2024-02", v: 18 }, { date: "2025-03", v: 61.5 },
      { date: "2025-09", v: 183 }, { date: "2026-01", v: 350 }, { date: "2026-05", v: 965 },
    ],
    paths: {
      bear: [100, 100, 94, 88, 82, 78, 72, 70, 68, 70, 72, 71, 70],
      base: [100, 124, 120, 114, 118, 124, 118, 112, 118, 124, 120, 122, 120],
      bull: [100, 155, 162, 172, 168, 180, 176, 168, 180, 188, 196, 192, 195],
    },
  },
  {
    id: "spcx",
    name: "SpaceXAI",
    product: "xAI · Grok · X · Starlink",
    color: "#d4762e",
    status: "Lists Jun 12 · SPCX",
    lastMark: 1750,
    lastMarkLabel: "$1.75T IPO · fixed $135/share",
    revenueAnnualized: 3.8,
    revenueLabel: "~$3.8B annualized (xAI + X, est.)",
    multiple: null,
    profitability: "$5B 2025 consolidated loss · ~$1B/mo burn",
    raise: "$75B IPO raise, 555.6M shares at a fixed $135. The largest IPO in history.",
    listing: { p2026: 0.97, bySep2026: 0.97, by2027: 0.99 },
    expectedDebut: "Tomorrow: Jun 12, 2026",
    offerValuation: 1750,
    pricingBand: { p10: 1750, p50: 1750, p90: 1750 },
    day1: { p10: -8, p50: 22, p90: 65 },
    m12: { p10: -35, p50: 15, p90: 90 },
    thesis:
      "A hybrid asset: Starlink cash flows plus an AI lab plus X. The ~4.3% float follows the Aramco pattern: a mechanically supported price, forced index buying later, violent moves on thin supply.",
    valuationHistory: [
      { date: "2024-06", v: 24 }, { date: "2024-12", v: 50 }, { date: "2025-03", v: 113 },
      { date: "2026-01", v: 230 }, { date: "2026-02", v: 250 }, { date: "2026-06", v: 1750 },
    ],
    paths: {
      bear: [100, 92, 84, 80, 74, 70, 66, 68, 64, 62, 60, 63, 65],
      base: [100, 122, 118, 112, 116, 120, 114, 108, 112, 118, 115, 118, 115],
      bull: [100, 165, 158, 170, 182, 175, 190, 182, 195, 205, 212, 200, 190],
    },
  },
];

export const SCENARIOS = [
  { id: "bear", name: "Bear", prob: 25, color: "#c14431", desc: "SPCX breaks issue in month one; the Nasdaq drawdown extends past 10%. OpenAI and Anthropic slip to 2027 and bands compress." },
  { id: "base", name: "Base", prob: 50, color: "#0e7a67", desc: "SPCX holds its price through summer. Anthropic lists Q4 2026 to H1 2027; OpenAI follows near $950B. Moderate pops, volatile first year." },
  { id: "bull", name: "Bull", prob: 25, color: "#a36408", desc: "SPCX squeezes on its 4% float. Both S-1s convert fast; OpenAI prints at or above $1T, Anthropic toward $1.5T. Lockup cliffs become 2027's story." },
];

/* Forecast engine: index paths (offer = 100), monthly steps T+0..T+12.
   Band spread widens with sqrt(t); macro tilt (-1..1) compounds into the path. */
export function forecast(company, scenarioId, macroTilt = 0) {
  const path = company.paths[scenarioId];
  return path.map((v, t) => {
    const tilted = v * (1 + macroTilt * 0.35 * (t / 12));
    const spread = t === 0 ? 0 : 0.05 + 0.17 * Math.sqrt(t / 12);
    return {
      t,
      month: t === 0 ? "Offer" : `M+${t}`,
      median: round1(tilted),
      band: [round1(tilted * (1 - spread)), round1(tilted * (1 + spread))],
      valuation: round1((tilted / 100) * company.offerValuation),
    };
  });
}
const round1 = (x) => Math.round(x * 10) / 10;

export const COMPARABLES = [
  { name: "Netscape", year: 1995, raise: 0.14, pop: 108, m12: 140, val: 1.1, era: "dotcom" },
  { name: "Amazon", year: 1997, raise: 0.054, pop: 31, m12: 230, val: 0.44, era: "dotcom" },
  { name: "theGlobe.com", year: 1998, raise: 0.028, pop: 606, m12: -90, val: 0.3, era: "dotcom" },
  { name: "VA Linux", year: 1999, raise: 0.13, pop: 698, m12: -90, val: 1, era: "dotcom" },
  { name: "Google", year: 2004, raise: 1.67, pop: 18, m12: 200, val: 23, era: "web2" },
  { name: "Visa", year: 2008, raise: 17.9, pop: 28, m12: 25, val: 37, era: "web2" },
  { name: "Facebook", year: 2012, raise: 16, pop: 0.6, m12: -30, val: 104, era: "web2" },
  { name: "Alibaba", year: 2014, raise: 25, pop: 38, m12: -10, val: 168, era: "web2" },
  { name: "Snap", year: 2017, raise: 3.4, pop: 44, m12: -20, val: 24, era: "web2" },
  { name: "Uber", year: 2019, raise: 8.1, pop: -7.6, m12: -25, val: 82, era: "web2" },
  { name: "Snowflake", year: 2020, raise: 3.9, pop: 112, m12: 100, val: 33, era: "ai" },
  { name: "Rivian", year: 2021, raise: 12, pop: 29, m12: -60, val: 77, era: "ai" },
  { name: "ARM", year: 2023, raise: 4.9, pop: 25, m12: 110, val: 54.5, era: "ai" },
  { name: "Astera Labs", year: 2024, raise: 0.71, pop: 72, m12: 75, val: 5.5, era: "ai" },
  { name: "Reddit", year: 2024, raise: 0.75, pop: 48, m12: 190, val: 6.4, era: "ai" },
  { name: "CoreWeave", year: 2025, raise: 1.5, pop: 0, m12: 120, val: 23, era: "ai" },
  { name: "Circle", year: 2025, raise: 1.1, pop: 168, m12: null, val: 6.9, era: "ai" },
  { name: "Chime", year: 2025, raise: 0.86, pop: 37, m12: null, val: 11.6, era: "ai" },
  { name: "Figma", year: 2025, raise: 1.2, pop: 250, m12: null, val: 19.3, era: "ai" },
  { name: "Klarna", year: 2025, raise: 1.4, pop: 15, m12: null, val: 15.1, era: "ai" },
];

export const ERAS = [
  { id: "all", label: "All eras" },
  { id: "dotcom", label: "Dot-com (1995-99)" },
  { id: "web2", label: "Platform era (2004-19)" },
  { id: "ai", label: "Cloud + AI (2020-25)" },
];

export const POLYMARKET = [
  { label: "Jun 30", p: 1 }, { label: "Aug 31", p: 4 },
  { label: "Sep 30", p: 12 }, { label: "Dec 31", p: 48 },
];

/* Month-by-month market outlook: how the next 12+ months are expected to unfold. */
export const OUTLOOK = [
  { month: "Jun 2026", tag: "SPCX lists", heat: 3,
    expect: "SpaceXAI debuts Jun 12 on a tape 5% off its record. Model median day-1: +22% on the 4.3% float.",
    watch: "If SPCX closes below $135 in week one, every band on this page compresses." },
  { month: "Jul 2026", tag: "Honeymoon test", heat: 2,
    expect: "No earnings yet; SPCX trades on flows. Private AI secondaries re-mark to the public print within weeks.",
    watch: "Nasdaq-100 inclusion chatter begins; index desks start modeling forced buying." },
  { month: "Aug 2026", tag: "Quiet window", heat: 1,
    expect: "Summer liquidity trough. Jackson Hole sets the rates tone for every Q4 listing decision.",
    watch: "Polymarket's Dec-31 OpenAI market (~48%) is the cleanest live gauge of window confidence." },
  { month: "Sep 2026", tag: "First earnings", heat: 3,
    expect: "SPCX reports its first public quarter: the first audited look at xAI's ~$1B/month burn. Earliest credible OpenAI window, priced at just 12%.",
    watch: "Anthropic's S-1 likely flips public ~15 days before any roadshow. Watch the amendment." },
  { month: "Oct 2026", tag: "Filings go public", heat: 3,
    expect: "Base case: at least one of the two S-1s flips public, revealing audited revenue and the real share structure.",
    watch: "First hard test of the circular-deal critique: how NVIDIA, Microsoft and Amazon contracts are disclosed." },
  { month: "Nov 2026", tag: "Debut window", heat: 4,
    expect: "The model's modal month for the first of the two: Anthropic near $1.15T or OpenAI near $950B, into post-election seasonality.",
    watch: "Mega-deal day-1s run -8% to +38% historically. Do not expect a Figma-style pop at this size." },
  { month: "Dec 2026", tag: "Coin-flip deadline", heat: 4,
    expect: "Polymarket says 48% OpenAI is public by Dec 31. The window effectively shuts mid-month; a miss slips to Feb-Mar 2027. SPCX's 180-day lockup expires ~Dec 9.",
    watch: "Lockup supply meeting index inclusion is SPCX's first real two-sided market." },
  { month: "Q1 2027", tag: "Second wave", heat: 2,
    expect: "Whichever lab missed 2026 lists here, repriced to how the first one traded. Early lockup expiries begin weighing.",
    watch: "If both 2026 debuts trade below offer, the private AI complex faces its first down-round era." },
  { month: "Q2 2027", tag: "Lockup cliffs", heat: 3,
    expect: "The dominant flow story: staged unlocks from all three listings against S&P 500 eligibility debates.",
    watch: "Months 6-12 post-IPO is where Facebook, Uber and Rivian broke. Same setup, bigger numbers." },
];

export const INVESTORS = [
  { cls: "Venture capital", names: "SoftBank · a16z · Sequoia · Thrive · TPG · Greenoaks", read: "Doubling down at $850B-965B marks instead of distributing. Conviction, but also lock-in: exits now require public markets." },
  { cls: "Mutual funds", names: "Fidelity · T. Rowe Price · BlackRock affiliates", read: "Buying pre-IPO at scale. Their private marks now anchor IPO pricing, pulling demand forward and compressing the pop." },
  { cls: "Sovereign wealth", names: "MGX (Abu Dhabi) · Temasek · UC Investments", read: "Anchoring the mega-rounds with patient capital. A floor under valuations, with geopolitical scrutiny as the tail risk." },
  { cls: "Crossover funds", names: "Altimeter · Dragoneer · D. E. Shaw Ventures", read: "Led Anthropic's Series H. The last private round is functionally the IPO pricing committee." },
  { cls: "Strategics", names: "NVIDIA · Amazon · Microsoft · Cisco-linked funds", read: "Equity stakes tied to compute and commercial deals. The circular-deal critique becomes an S-1 disclosure battleground." },
  { cls: "Retail", names: "$3B+ via bank channels · ARK ETFs · prediction markets", read: "Retail owned OpenAI before any listing. Supports day-1 demand and raises the froth risk in equal measure." },
];

export const MACRO_EVENTS = [
  { date: "Jun 2", text: "S&P 500 and Nasdaq close at record highs" },
  { date: "Jun 5", text: "Nasdaq-100 falls 4.77%; about $1T wiped out, led by semis" },
  { date: "Jun 9", text: "Dip-buying stabilizes the tape; Nasdaq -0.97%" },
  { date: "Jun 12", text: "SpaceXAI lists on Nasdaq: the largest IPO in history" },
];

export const TICKER_ITEMS = [
  ["OpenAI", "$852B post-money · S-1 in", "+"],
  ["Anthropic", "$965B post-money · S-1 in", "+"],
  ["SPCX", "$135 fixed · lists Jun 12", "+"],
  ["Anthropic run-rate", "$47B · +10x y/y", "+"],
  ["OpenAI revenue", "~$2B/mo", "+"],
  ["Nasdaq", "-5% from Jun 2 record", "-"],
  ["10-yr yield", "4.5%+", "-"],
  ["P(OpenAI by Dec 31)", "48%", "+"],
  ["Largest raise ever", "OpenAI $122B", "+"],
  ["Largest IPO ever", "SPCX $75B", "+"],
];

export const fmtB = (v) =>
  v >= 1000 ? "$" + (v / 1000).toFixed(2).replace(/\.?0+$/, "") + "T" : "$" + Math.round(v) + "B";

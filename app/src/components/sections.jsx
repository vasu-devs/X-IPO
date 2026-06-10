import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LabelList,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, CaretRight, TrendUp, Pulse, Bank, GithubLogo } from "@phosphor-icons/react";
import {
  COMPANIES, POLYMARKET, OUTLOOK, INVESTORS, MACRO_EVENTS, TICKER_ITEMS, AS_OF, fmtB,
} from "../data/model.js";
import { Reveal, Num, ChartTip, Logo } from "./ui.jsx";

/* ---------------- nav ---------------- */
export function Nav() {
  const links = [
    ["#contenders", "Contenders"], ["#history", "History"], ["#forecast", "Forecast"],
    ["#outlook", "Next 12 months"], ["#capital", "Capital"],
  ];
  return (
    <nav className="glass sticky top-0 z-40 border-b border-line">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={27} />
          <span className="text-[1.1rem] font-black tracking-tight">Arohan</span>
          <span className="num mt-0.5 hidden text-[10px] tracking-[0.18em] text-faint uppercase lg:inline">The AI IPO Observatory</span>
        </a>
        <div className="hidden gap-7 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-dim transition-colors hover:text-body">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="num hidden rounded-full border border-line px-3 py-1 text-[11px] text-dim sm:inline">{AS_OF}</span>
          <a
            href="https://github.com/vasu-devs/Arohan"
            target="_blank" rel="noopener noreferrer" aria-label="Source on GitHub"
            className="text-dim transition-colors hover:text-ink"
          >
            <GithubLogo size={20} weight="fill" />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- hero ---------------- */
export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[640px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(69,73,184,.30), transparent 60%)" }}
      />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 pt-20 pb-16 md:grid-cols-[7fr_5fr] md:px-8 md:pt-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="num mb-6 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-1.5 text-[12px] tracking-[0.14em] text-mint uppercase"
          >
            <Pulse size={14} weight="bold" /> Live model · {AS_OF}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.6rem] leading-[1.06] font-black tracking-tight md:text-[4rem]"
          >
            The trillion-dollar listings <span className="text-faint">are no longer hypothetical.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[46ch] text-lg text-dim"
          >
            OpenAI and Anthropic have filed S-1s. SpaceXAI lists tomorrow. One interactive model, thirty years of IPO history, a month-by-month forecast.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#forecast" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-lg shadow-ink/15 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-ink/20 active:scale-[0.98]">
              Open the forecast lab <CaretRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#history" className="rounded-full border border-line px-6 py-3 font-semibold text-body transition-colors hover:border-line-hi">
              Explore the data
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="card relative overflow-hidden p-7"
        >
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 0%, rgba(212,118,46,.16), transparent 55%)" }} />
          <span className="num text-[11px] tracking-[0.16em] text-amber uppercase">Tomorrow · Nasdaq · SPCX</span>
          <h3 className="mt-2 text-2xl font-bold">SpaceXAI</h3>
          <p className="mt-1 mb-6 text-sm text-dim">The largest IPO in history prices at a fixed $135 per share.</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Stat v={<Num value={1.75} format={(v) => "$" + v.toFixed(2) + "T"} className="text-2xl font-bold" />} k="Top valuation sought" />
            <Stat v={<Num value={75} format={(v) => "$" + v.toFixed(0) + "B"} className="text-2xl font-bold" />} k="Raise · 555.6M shares" />
            <Stat v={<Num value={4.3} format={(v) => "~" + v.toFixed(1) + "%"} className="text-2xl font-bold" />} k="Free float" />
            <Stat v={<Num value={22} format={(v) => "+" + v.toFixed(0) + "%"} className="text-2xl font-bold text-mint" />} k="Model median day-1" />
          </div>
        </motion.aside>
      </div>
    </header>
  );
}
const Stat = ({ v, k }) => (
  <div>
    <div>{v}</div>
    <div className="mt-0.5 text-[12px] text-faint">{k}</div>
  </div>
);

/* ---------------- ticker ---------------- */
export function Ticker() {
  const row = TICKER_ITEMS.map(([k, v, dir], i) => (
    <span key={i} className="num inline-flex items-center gap-2 text-[13px] whitespace-nowrap text-dim">
      {dir === "+" ? <ArrowUpRight size={13} className="text-mint" /> : <ArrowDownRight size={13} className="text-rose" />}
      <b className="font-semibold text-body">{k}</b> {v}
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-line bg-paper-deep/60 py-3.5" aria-hidden="true">
      <div className="ticker-track flex w-max gap-12 pr-12">{row}{row}</div>
    </div>
  );
}

/* ---------------- contender cards ---------------- */
export function Contenders() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {COMPANIES.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.08}>
          <motion.article whileHover={{ y: -5 }} transition={{ duration: 0.25 }} className="card relative h-full overflow-hidden p-7">
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: c.color }} />
            <p className="text-[13px] text-faint">{c.product}</p>
            <h3 className="text-2xl font-bold">{c.name}</h3>
            <span className="num mt-3 mb-5 inline-block rounded-full border border-line px-3 py-1 text-[11.5px] text-dim">{c.status}</span>
            <dl className="space-y-3.5">
              <Row k="Latest valuation" v={c.lastMarkLabel} mono />
              <Row k="Revenue" v={c.revenueLabel} mono />
              <Row k="Latest raise" v={c.raise} />
              <Row k="Profitability" v={c.profitability} />
            </dl>
            <p className="mt-5 border-t border-line pt-4 text-[13.5px] leading-relaxed text-dim">{c.thesis}</p>
          </motion.article>
        </Reveal>
      ))}
    </div>
  );
}
const Row = ({ k, v, mono }) => (
  <div>
    <dt className="text-[12px] text-faint">{k}</dt>
    <dd className={`${mono ? "num" : ""} text-[14.5px] leading-snug`}>{v}</dd>
  </div>
);

/* ---------------- valuation race ---------------- */
export function Race() {
  const months = useMemo(() => {
    const out = [];
    for (let y = 2023; y <= 2026; y++)
      for (let m = 1; m <= 12; m++) {
        if (y === 2026 && m > 7) break;
        const key = `${y}-${String(m).padStart(2, "0")}`;
        const row = { key, label: m === 1 ? String(y) : "" };
        for (const c of COMPANIES) {
          const pt = c.valuationHistory.find((p) => p.date === key);
          if (pt) row[c.id] = pt.v;
        }
        out.push(row);
      }
    return out;
  }, []);

  return (
    <div className="card p-5 md:p-7">
      <div className="h-[380px] md:h-[430px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={months} margin={{ top: 10, right: 14, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e6e3d7" vertical={false} />
            <XAxis dataKey="key" stroke="#8b8f99" tickLine={false} axisLine={{ stroke: "#d6d3c5" }}
              ticks={["2023-01", "2024-01", "2025-01", "2026-01"]}
              tickFormatter={(v) => v.slice(0, 4)}
              tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }} />
            <YAxis scale="log" domain={[3, 2600]} width={56} stroke="#8b8f99" tickLine={false} axisLine={false}
              ticks={[5, 20, 50, 150, 400, 1000, 2000]} tickFormatter={fmtB}
              tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }} />
            <Tooltip
              content={
                <ChartTip
                  render={(payload) => (
                    <>
                      <p className="mb-1 font-semibold text-body">{payload[0]?.payload.key}</p>
                      {payload.map((p) => (
                        <p key={p.dataKey} className="num" style={{ color: p.stroke }}>
                          {COMPANIES.find((c) => c.id === p.dataKey)?.name}: <b>{fmtB(p.value)}</b>
                        </p>
                      ))}
                    </>
                  )}
                />
              }
            />
            {COMPANIES.map((c) => (
              <Line key={c.id} type="monotone" dataKey={c.id} stroke={c.color} strokeWidth={2.5}
                connectNulls dot={{ r: 4, fill: c.color, strokeWidth: 0 }} activeDot={{ r: 6 }} animationDuration={900} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-5 px-2">
        {COMPANIES.map((c) => (
          <span key={c.id} className="num inline-flex items-center gap-2 text-[12px] text-dim">
            <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c.color }} /> {c.name}
          </span>
        ))}
        <span className="ml-auto text-[12px] text-faint">Post-money marks, $B, log scale</span>
      </div>
    </div>
  );
}

/* ---------------- timing (Polymarket) ---------------- */
export function Timing() {
  return (
    <div className="card p-5 md:p-7">
      <h3 className="mb-1 font-bold">When does OpenAI actually list?</h3>
      <p className="mb-5 text-[13px] text-dim">Polymarket-implied probability that OpenAI is public by each 2026 date. Fetched {AS_OF}.</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={POLYMARKET} margin={{ top: 22, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e6e3d7" vertical={false} />
            <XAxis dataKey="label" stroke="#8b8f99" tickLine={false} axisLine={{ stroke: "#d6d3c5" }} tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }} />
            <YAxis domain={[0, 100]} width={40} stroke="#8b8f99" tickLine={false} axisLine={false} tickFormatter={(v) => v + "%"} tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }} />
            <Bar dataKey="p" radius={[8, 8, 2, 2]} maxBarSize={64} animationDuration={800}>
              <LabelList dataKey="p" position="top" formatter={(v) => v + "%"} fill="#595e69" fontSize={12} fontFamily="ui-monospace, monospace" />
              {POLYMARKET.map((d, i) => (
                <Cell key={i} fill={i === POLYMARKET.length - 1 ? "#4f53c4" : "#4f53c466"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- monthly outlook ---------------- */
export function Outlook() {
  const [open, setOpen] = useState(5); // Nov 2026 pre-opened
  const heatColor = ["#8b8f99", "#4f53c4", "#0e7a67", "#a36408", "#c14431"];
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-[7px] hidden w-px bg-line md:block" />
      <div className="space-y-3">
        {OUTLOOK.map((o, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={o.month} delay={Math.min(i * 0.04, 0.3)}>
              <div className="md:pl-9">
                <span className="absolute left-0 mt-6 hidden h-[15px] w-[15px] rounded-full border-2 border-paper md:block" style={{ background: heatColor[o.heat] }} />
                <motion.button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={`card w-full cursor-pointer p-5 text-left transition-colors md:p-6 ${isOpen ? "border-line-hi" : "hover:border-line-hi"}`}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="num text-[15px] font-bold">{o.month}</span>
                      <span className="num rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: heatColor[o.heat] + "22", color: heatColor[o.heat] }}>
                        {o.tag}
                      </span>
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-faint"><CaretRight size={16} weight="bold" /></motion.span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-[14.5px] leading-relaxed text-body">{o.expect}</p>
                    <p className="mt-2.5 flex items-start gap-2 text-[13.5px] text-dim">
                      <TrendUp size={16} className="mt-0.5 shrink-0 text-mint" /> {o.watch}
                    </p>
                  </motion.div>
                </motion.button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- capital map ---------------- */
export function Capital() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {INVESTORS.map((v, i) => (
        <motion.div key={v.cls} whileHover={{ backgroundColor: "#f7f6f0" }} className="bg-card p-7" transition={{ duration: 0.2 }}>
          <div className="mb-2 flex items-center gap-2.5">
            <Bank size={18} className="text-mint" />
            <h4 className="font-bold">{v.cls}</h4>
          </div>
          <p className="num mb-3 text-[12.5px] leading-relaxed text-mint">{v.names}</p>
          <p className="text-[13.5px] leading-relaxed text-dim">{v.read}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- macro ---------------- */
export function Macro() {
  return (
    <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
      <Reveal>
        <div className="card h-full p-7">
          <h3 className="mb-4 font-bold">June 2026, day by day</h3>
          <ul>
            {MACRO_EVENTS.map((e) => (
              <li key={e.date} className="grid grid-cols-[64px_1fr] gap-3.5 border-b border-line py-3.5 last:border-0">
                <span className="num text-[13px] text-amber">{e.date}</span>
                <span className="text-[14px] text-dim">{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="card flex h-full flex-col gap-5 p-7">
          <blockquote className="border-l-[3px] border-mint pl-5 text-[1.05rem] leading-relaxed">
            "Total AI industry revenue is estimated at less than $50 billion, against a trillion dollars or more of investment."
            <footer className="mt-2 text-[13px] text-faint">GMO, "Valuing AI", January 2026</footer>
          </blockquote>
          <p className="text-[14px] leading-relaxed text-dim">
            Five months later, Anthropic's $47B run-rate alone nearly equals that whole-industry estimate, and OpenAI runs about $24B annualized. Either the revenue gap is closing at historic speed, or run-rate accounting flatters the picture. Both can be true, and the S-1s will finally show audited numbers.
          </p>
          <p className="text-[14px] leading-relaxed text-dim">
            The other open question is revenue quality: NVIDIA, Amazon and Microsoft hold equity stakes intertwined with compute purchase commitments. Expect the circular-deal critique to become a disclosure battleground.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- multiples ---------------- */
export function Multiples() {
  const rows = COMPANIES.filter((c) => c.multiple).map((c) => ({
    name: c.name, mult: c.multiple, fill: c.color,
    label: c.id === "openai" ? "at $852B" : "at $965B",
  }));
  return (
    <div className="card p-5 md:p-7">
      <h3 className="mb-1 font-bold">Valuation vs revenue</h3>
      <p className="mb-5 text-[13px] text-dim">Above ~25x annualized revenue, 12-month IPO returns skew sharply negative unless growth exceeds 80% a year.</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 56, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="#e6e3d7" horizontal={false} />
            <XAxis type="number" domain={[0, 50]} stroke="#8b8f99" tickLine={false} axisLine={{ stroke: "#d6d3c5" }} tickFormatter={(v) => v + "x"} tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }} />
            <YAxis type="category" dataKey="name" width={86} stroke="#8b8f99" tickLine={false} axisLine={false} tick={{ fontSize: 12.5, fill: "#23262d" }} />
            <ReferenceLine x={25} stroke="#c14431" strokeDasharray="6 6" label={{ value: "25x danger line", position: "insideTopRight", fill: "#c14431", fontSize: 11 }} />
            <Bar dataKey="mult" radius={[2, 8, 8, 2]} maxBarSize={42} animationDuration={800}>
              <LabelList dataKey="mult" position="right" formatter={(v) => v + "x"} fill="#595e69" fontSize={12} fontFamily="ui-monospace, monospace" />
              {rows.map((d, i) => <Cell key={i} fill={d.fill + "cc"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[12px] text-faint">SpaceXAI excluded: it prices as a hybrid aerospace and AI asset. Anthropic clears the bar with room; OpenAI at $1T would sit near 42x.</p>
    </div>
  );
}

/* ---------------- footer ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep/40 py-14 text-[14px] text-dim">
      <div className="mx-auto grid max-w-[1180px] gap-9 px-5 md:grid-cols-[2fr_1fr_1fr] md:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <Logo size={24} />
            <h5 className="font-bold text-body">Arohan · About this model</h5>
          </div>
          <p className="leading-relaxed">
            Built from 24 fetched sources, 90 extracted claims and 25 adversarial verifications, layered on a 20-listing comparables dataset spanning 1995 to 2025. All research, sources and the full methodology live in the companion markdown files.
          </p>
        </div>
        <div>
          <h5 className="mb-3 font-bold text-body">Research files</h5>
          <ul className="space-y-2">
            <li><a className="text-mint hover:underline" href="../research/00-executive-summary.md">Executive summary</a></li>
            <li><a className="text-mint hover:underline" href="../research/04-historical-ipo-comparables.md">IPO comparables</a></li>
            <li><a className="text-mint hover:underline" href="../research/07-predictive-model-methodology.md">Methodology</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-3 font-bold text-body">Key sources</h5>
          <ul className="space-y-2">
            <li><a className="text-mint hover:underline" href="https://openai.com/index/accelerating-the-next-phase-ai/">OpenAI announcement</a></li>
            <li><a className="text-mint hover:underline" href="https://www.anthropic.com/news/series-h">Anthropic Series H</a></li>
            <li><a className="text-mint hover:underline" href="https://polymarket.com/event/openai-ipo-by">Polymarket odds</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1180px] border-t border-line px-5 pt-7 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[72ch] text-[12.5px] leading-relaxed text-faint">
            Research exercise, not investment advice. This site does not constitute an offer, solicitation or recommendation to buy or sell any security. Private-company figures are company-disclosed or press-reported and unaudited; run-rates annualize single months. Predictions are probability-weighted model ranges conditional on listings occurring, and past IPO performance does not guarantee future results. All trademarks and company names belong to their respective owners. Compiled {AS_OF}.
          </p>
          <div className="shrink-0 text-[13px] leading-relaxed md:text-right">
            <p className="text-faint">Designed and built by</p>
            <a href="https://vasudev.live" target="_blank" rel="noopener noreferrer" className="link-credit text-[15px]">
              VASU-DEVS
            </a>
            <p className="mt-1.5 flex gap-3 md:justify-end">
              <a className="text-dim transition-colors hover:text-ink" href="https://vasudev.live" target="_blank" rel="noopener noreferrer">vasudev.live</a>
              <span className="text-line-hi">·</span>
              <a className="text-dim transition-colors hover:text-ink" href="https://github.com/vasu-devs" target="_blank" rel="noopener noreferrer">github.com/vasu-devs</a>
            </p>
          </div>
        </div>
        <p className="num mt-6 text-[11.5px] text-faint">© 2026 Arohan · The AI IPO Observatory · A VASU-DEVS production · All rights reserved.</p>
      </div>
    </footer>
  );
}

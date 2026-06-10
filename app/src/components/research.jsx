import { motion } from "motion/react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ShieldCheck, XCircle } from "@phosphor-icons/react";
import { COMPANIES, REVENUE_TRAJ, GAP, LADDER, VERIFICATION, fmtB } from "../data/model.js";
import { Reveal, Num, ChartTip } from "./ui.jsx";

const AXIS = { fontSize: 11, fontFamily: "ui-monospace, monospace" };

/* ---------- revenue ramp: the steepest curve ever recorded at this scale ---------- */
export function RevenueRamp() {
  const data = REVENUE_TRAJ.months.map((m) => {
    const row = { m };
    for (const s of REVENUE_TRAJ.series) if (s.pts[m] !== undefined) row[s.id] = s.pts[m];
    return row;
  });
  return (
    <div className="card p-5 md:p-7">
      <h3 className="mb-1 font-bold">The revenue ramp behind the prices</h3>
      <p className="mb-5 text-[13px] text-dim">
        Annualized run-rate, $B. Anthropic went from about $1B to $47B in fourteen months, the steepest ramp ever recorded at this scale. It is the entire bull case.
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 14, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e6e3d7" vertical={false} />
            <XAxis dataKey="m" stroke="#8b8f99" tick={AXIS} tickLine={false} axisLine={{ stroke: "#d6d3c5" }}
              tickFormatter={(v) => v.slice(2).replace("-", "/")} />
            <YAxis width={44} stroke="#8b8f99" tick={AXIS} tickLine={false} axisLine={false} tickFormatter={(v) => "$" + v + "B"} />
            <Tooltip
              content={
                <ChartTip
                  render={(payload, label) => (
                    <>
                      <p className="mb-1 font-semibold text-ink">{label}</p>
                      {payload.map((p) => (
                        <p key={p.dataKey} className="num" style={{ color: p.stroke }}>
                          {REVENUE_TRAJ.series.find((s) => s.id === p.dataKey)?.name}: <b>${p.value}B</b> annualized
                        </p>
                      ))}
                    </>
                  )}
                />
              }
            />
            {REVENUE_TRAJ.series.map((s) => (
              <Line key={s.id} type="monotone" dataKey={s.id} connectNulls
                stroke={COMPANIES.find((c) => c.id === s.id)?.color ?? "#d4762e"} strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: COMPANIES.find((c) => c.id === s.id)?.color ?? "#d4762e" }}
                activeDot={{ r: 6 }} animationDuration={900} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[12px] text-faint">Company-disclosed run-rates, unaudited; single-month annualizations. xAI shown combined with X.</p>
    </div>
  );
}

/* ---------- the GMO gap: investment vs revenue, drawn to scale ---------- */
export function GapViz() {
  const max = GAP[0].v;
  return (
    <div className="card flex h-full flex-col p-5 md:p-7">
      <h3 className="mb-1 font-bold">The bubble question, drawn to scale</h3>
      <p className="mb-6 text-[13px] text-dim">
        GMO's January bear case against what the labs themselves now report. Either the gap is closing at historic speed, or run-rate accounting flatters it. Both can be true.
      </p>
      <div className="flex flex-1 flex-col justify-center gap-6">
        {GAP.map((g, i) => (
          <div key={g.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-semibold text-ink">{g.label}</span>
              <span className="num text-[12px] text-dim">{g.note}</span>
            </div>
            <div className="h-7 overflow-hidden rounded-lg bg-paper-deep/70">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max((g.v / max) * 100, 1.5)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full items-center justify-end rounded-lg pr-2"
                style={{ background: g.color }}
              >
                <span className="num text-[11px] font-bold text-white">{g.v >= 1000 ? "$1T+" : "$" + g.v + "B"}</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] text-faint">Bars proportional. The S-1s will replace estimates with audited numbers; that is the real event.</p>
    </div>
  );
}

/* ---------- multiple ladder: where the labs sit in IPO history ---------- */
export function MultipleLadder() {
  const max = 60;
  const sorted = [...LADDER].sort((a, b) => a.m - b.m);
  return (
    <div className="card p-5 md:p-7">
      <h3 className="mb-1 font-bold">The multiple ladder</h3>
      <p className="mb-6 text-[13px] text-dim">
        Forward revenue multiple at listing, against what happened in the 12 months after. History says the ladder gets dangerous above 25x. The two filers are stepping onto it now.
      </p>
      <div className="space-y-3.5">
        {sorted.map((d, i) => {
          const lab = d.ai ? COMPANIES.find((c) => c.id === d.ai) : null;
          const color = lab ? lab.color : d.out >= 0 ? "#0e7a67" : "#c14431";
          return (
            <div key={d.name} className="grid grid-cols-[150px_1fr_92px] items-center gap-3 md:grid-cols-[180px_1fr_110px]">
              <span className={`num truncate text-[12.5px] ${lab ? "font-bold text-ink" : "text-dim"}`}>{d.name}</span>
              <div className="relative h-5">
                <div className="absolute inset-y-2 inset-x-0 rounded-full bg-paper-deep/70" />
                {/* 25x danger line */}
                <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-rose/60" style={{ left: `${(25 / max) * 100}%` }} />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(d.m / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-2 left-0 rounded-full"
                  style={{ background: lab ? color : color + "55" }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="num absolute -top-0.5 text-[11px] font-bold text-ink"
                  style={{ left: `calc(${(d.m / max) * 100}% + 7px)` }}
                >
                  {d.m}x
                </motion.span>
              </div>
              <span className={`num text-right text-[12px] font-semibold ${d.out === null ? "text-faint" : d.out >= 0 ? "text-mint" : "text-rose"}`}>
                {d.out === null ? "pending" : `${d.out > 0 ? "+" : ""}${d.out}%${d.outNote ? "*" : ""}`}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-[12px] text-faint">
        Right column: 12-month return vs offer. *Snowflake shown vs its day-1 close, the price most buyers actually paid. Dashed line: the 25x danger threshold from the comparables model.
      </p>
    </div>
  );
}

/* ---------- listing-day board: the model's three bands per company ---------- */
export function ListingBands() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {COMPANIES.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.08}>
          <div className="card h-full p-6" style={{ borderTop: `4px solid ${c.color}` }}>
            <div className="mb-4 flex items-baseline justify-between">
              <h4 className="font-bold">{c.name}</h4>
              <span className="num text-[11.5px] text-faint">{c.expectedDebut}</span>
            </div>
            {c.id !== "spcx" ? (
              <BandRow label="Pricing valuation" lo={c.pricingBand.p10} mid={c.pricingBand.p50} hi={c.pricingBand.p90}
                min={500} max={1800} fmt={fmtB} color={c.color} />
            ) : (
              <div className="mb-5">
                <p className="mb-1 text-[12px] text-faint">Pricing valuation</p>
                <p className="num text-[13.5px] font-bold text-ink">$1.75T <span className="font-normal text-dim">· fixed $135, no bookbuild</span></p>
              </div>
            )}
            <BandRow label="Day-1 return" lo={c.day1.p10} mid={c.day1.p50} hi={c.day1.p90}
              min={-60} max={100} fmt={(v) => (v > 0 ? "+" : "") + v + "%"} color={c.color} zero />
            <BandRow label="12-month vs offer" lo={c.m12.p10} mid={c.m12.p50} hi={c.m12.p90}
              min={-60} max={100} fmt={(v) => (v > 0 ? "+" : "") + v + "%"} color={c.color} zero />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function BandRow({ label, lo, mid, hi, min, max, fmt, color, zero }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-1 flex items-baseline justify-between">
        <p className="text-[12px] text-faint">{label}</p>
        <p className="num text-[12px] text-dim">{fmt(lo)} · <b className="text-ink">{fmt(mid)}</b> · {fmt(hi)}</p>
      </div>
      <div className="relative h-4">
        <div className="absolute inset-y-[6px] inset-x-0 rounded-full bg-paper-deep/70" />
        {zero && <div className="absolute top-0 bottom-0 w-px bg-line-hi" style={{ left: `${pct(0)}%` }} />}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-[6px] rounded-full"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%`, background: `${color}55`, transformOrigin: "left" }}
        />
        <div className="absolute top-0 h-4 w-[3px] rounded-full" style={{ left: `calc(${pct(mid)}% - 1px)`, background: color }} />
      </div>
    </div>
  );
}

/* ---------- the verification story ---------- */
export function Verification() {
  const totalSources = VERIFICATION.sources.reduce((a, s) => a + s.n, 0);
  return (
    <div className="grid gap-5 lg:grid-cols-[5fr_7fr]">
      <Reveal>
        <div className="card h-full p-7">
          <div className="mb-5 flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-mint" weight="fill" />
            <h3 className="font-bold">Every number, stress-tested</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-6">
            {VERIFICATION.stats.map(([n, label]) => (
              <div key={label}>
                <Num value={n} format={(v) => v.toFixed(0)} className="text-3xl font-black text-ink" />
                <p className="mt-0.5 text-[12px] leading-snug text-faint">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 border-t border-line pt-5">
            <p className="mb-2.5 text-[12px] text-faint">Source quality mix ({totalSources} fetched)</p>
            <div className="flex h-3.5 overflow-hidden rounded-full">
              {VERIFICATION.sources.map((s) => (
                <motion.div key={s.label}
                  initial={{ flexGrow: 0.0001 }} whileInView={{ flexGrow: s.n }} viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: s.color }} title={`${s.label}: ${s.n}`} />
              ))}
            </div>
            <ul className="mt-3 space-y-1.5">
              {VERIFICATION.sources.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-[12px] text-dim">
                  <i className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: s.color }} />
                  {s.label} <b className="num ml-auto text-ink">{s.n}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="card h-full p-7">
          <div className="mb-2 flex items-center gap-2.5">
            <XCircle size={20} className="text-rose" weight="fill" />
            <h3 className="font-bold">Killed in verification</h3>
          </div>
          <p className="mb-5 text-[13px] text-dim">
            Four claims from real, credible sources failed the 3-vote panel. Notice the pattern: in this market, valuations go stale faster than journalism can print them.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {VERIFICATION.refuted.map((r) => (
              <motion.div key={r.claim} whileHover={{ y: -3 }} className="rounded-xl border border-rose/25 bg-rose/[0.04] p-4">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <p className="text-[13.5px] font-semibold text-ink line-through decoration-rose/60 decoration-2">{r.claim}</p>
                  <span className="num shrink-0 rounded-full bg-rose/10 px-2 py-0.5 text-[10.5px] font-bold text-rose">{r.vote}</span>
                </div>
                <p className="text-[12.5px] leading-relaxed text-dim">{r.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

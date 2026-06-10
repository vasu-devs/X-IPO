import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { COMPANIES, SCENARIOS, forecast, fmtB } from "../data/model.js";
import { Reveal, Num, ChartTip } from "./ui.jsx";

const AXIS = { fontSize: 11, fontFamily: "ui-monospace, monospace" };
const GRID = "#e6e3d7";
const AXIS_C = "#8b8f99";
const AXIS_LINE = "#d6d3c5";

/* Bloomberg-style event markers on the forecast path */
const EVENTS = [
  { t: 3, label: "first earnings" },
  { t: 6, label: "lockups begin" },
  { t: 12, label: "full unlock" },
];

export default function ForecastLab() {
  const [companyId, setCompanyId] = useState("spcx");
  const [scenarioId, setScenarioId] = useState("base");
  const [tilt, setTilt] = useState(0);

  const company = COMPANIES.find((c) => c.id === companyId);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId);

  const data = useMemo(() => {
    const rows = forecast(company, scenarioId, tilt / 100);
    return rows.map((r) => {
      const w = r.band[1] - r.band[0];
      return { ...r, inner: [r.band[0] + w * 0.28, r.band[1] - w * 0.28] };
    });
  }, [company, scenarioId, tilt]);

  const m3 = data[3], m6 = data[6], m12 = data[12];
  const kpi = (d) => d.median - 100;

  return (
    <div className="card overflow-hidden">
      {/* company tabs */}
      <div className="flex border-b border-line bg-paper-deep/40">
        {COMPANIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCompanyId(c.id)}
            className={`relative flex-1 cursor-pointer px-3 py-4 text-sm font-semibold transition-colors md:text-base ${
              companyId === c.id ? "text-ink" : "text-faint hover:text-dim"
            }`}
          >
            {c.name}
            <span className="num ml-2 hidden text-xs text-faint md:inline">{c.product}</span>
            {companyId === c.id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-4 bottom-0 h-[3px] rounded-full"
                style={{ background: c.color }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
        {/* controls */}
        <div className="space-y-7 border-b border-line p-6 md:p-7 lg:border-r lg:border-b-0">
          <div>
            <p className="mb-3 text-[13px] text-faint">Scenario</p>
            <div className="grid grid-cols-3 gap-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScenarioId(s.id)}
                  className={`num cursor-pointer rounded-xl border px-2 py-2.5 text-[13px] transition-all ${
                    scenarioId === s.id
                      ? "border-transparent font-bold text-white shadow-md"
                      : "border-line text-dim hover:border-line-hi"
                  }`}
                  style={scenarioId === s.id ? { background: s.color } : undefined}
                >
                  {s.name}
                  <span className="block text-[11px] opacity-85">{s.prob}%</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={scenarioId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-3 text-[13px] leading-relaxed text-dim"
              >
                {scenario.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <p className="text-[13px] text-faint">Macro gate</p>
              <span className="num text-[12px] text-dim">
                {tilt === 0 ? "neutral tape" : tilt > 0 ? `easing tailwind +${tilt}` : `drawdown stress ${tilt}`}
              </span>
            </div>
            <input
              type="range" min="-50" max="50" step="5" value={tilt}
              onChange={(e) => setTilt(Number(e.target.value))}
              className="w-full"
              aria-label="Macro environment tilt"
            />
            <div className="num mt-1.5 flex justify-between text-[11px] text-faint">
              <span>Nasdaq -15%</span><span>flat</span><span>melt-up</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-line pt-6">
            {[["M+3", m3], ["M+6", m6], ["M+12", m12]].map(([label, d]) => (
              <div key={label} className="rounded-xl bg-paper-deep/60 px-3 py-3 text-center">
                <p className="num text-[11px] text-faint">{label}</p>
                <Num
                  value={kpi(d)}
                  format={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(0)}%`}
                  className={`text-lg font-bold ${kpi(d) >= 0 ? "text-mint" : "text-rose"}`}
                />
                <p className="num text-[11px] text-dim">{fmtB(d.valuation)}</p>
              </div>
            ))}
          </div>

          <p className="text-[12px] leading-relaxed text-faint">
            {company.name} modeled from a {fmtB(company.offerValuation)} offer ({company.expectedDebut}).
            Outer fan: P10-P90. Inner fan: P25-P75. Drag the macro slider to stress the path.
          </p>
        </div>

        {/* fan chart */}
        <div className="p-4 md:p-7">
          <div className="h-[380px] md:h-[440px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 26, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="month" stroke={AXIS_C} tick={AXIS} tickLine={false} axisLine={{ stroke: AXIS_LINE }} />
                <YAxis
                  stroke={AXIS_C} width={52} tick={AXIS} tickLine={false} axisLine={false}
                  domain={[(min) => Math.floor(Math.min(min, 60) / 20) * 20, (max) => Math.ceil((max + 10) / 20) * 20]}
                  tickFormatter={(v) => v + "%"}
                />
                <ReferenceLine y={100} stroke={AXIS_C} strokeDasharray="5 5"
                  label={{ value: "offer price", position: "insideBottomLeft", fill: AXIS_C, fontSize: 11 }} />
                {EVENTS.map((e) => (
                  <ReferenceLine key={e.t} x={`M+${e.t}`} stroke={AXIS_LINE} strokeDasharray="3 5"
                    label={{ value: e.label, position: "top", fill: AXIS_C, fontSize: 10.5 }} />
                ))}
                <Tooltip
                  content={
                    <ChartTip
                      render={(payload) => {
                        const d = payload[0]?.payload;
                        if (!d) return null;
                        return (
                          <>
                            <p className="mb-1 font-semibold text-ink">{company.name} · {d.month}</p>
                            <p className="num text-dim">Median: <b className={d.median >= 100 ? "text-mint" : "text-rose"}>{d.median >= 100 ? "+" : ""}{(d.median - 100).toFixed(0)}%</b> vs offer</p>
                            <p className="num text-dim">Implied valuation: <b className="text-ink">{fmtB(d.valuation)}</b></p>
                            <p className="num text-faint">P10-P90: {(d.band[0] - 100).toFixed(0)}% to +{(d.band[1] - 100).toFixed(0)}%</p>
                          </>
                        );
                      }}
                    />
                  }
                />
                <Area type="monotone" dataKey="band" stroke="none" fill={company.color} fillOpacity={0.12} animationDuration={700} />
                <Area type="monotone" dataKey="inner" stroke="none" fill={company.color} fillOpacity={0.2} animationDuration={700} />
                <Line type="monotone" dataKey="median" stroke={company.color} strokeWidth={3}
                  dot={{ r: 3.5, fill: company.color, strokeWidth: 0 }} activeDot={{ r: 6 }} animationDuration={700} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 px-2 text-[12px] text-faint">
            Indexed to offer = 100. Months are relative to each company's own listing date. Dashed verticals mark the structural events that decide each phase.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Prediction map: probability-weighted expected return, company x month. */
export function PredictionMap() {
  const rows = COMPANIES.map((c) => {
    const blend = c.paths.base.map((_, t) =>
      0.25 * c.paths.bear[t] + 0.5 * c.paths.base[t] + 0.25 * c.paths.bull[t] - 100
    );
    return { c, blend };
  });

  const color = (v) => {
    // matte coral (neg) -> paper (0) -> matte teal (pos)
    const cap = 45;
    const x = Math.max(-cap, Math.min(cap, v)) / cap;
    if (x >= 0) {
      const a = 0.08 + x * 0.8;
      return `rgba(14, 122, 103, ${a})`;
    }
    const a = 0.08 + -x * 0.8;
    return `rgba(193, 68, 49, ${a})`;
  };

  return (
    <div className="card overflow-x-auto p-5 md:p-7">
      <h3 className="mb-1 font-bold">The prediction map</h3>
      <p className="mb-5 text-[13px] text-dim">
        Probability-weighted expected return vs offer (25% bear, 50% base, 25% bull), month by month after each listing. Green is upside, red is drawdown.
      </p>
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[110px_repeat(12,1fr)] gap-1">
          <span />
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="num pb-1 text-center text-[11px] text-faint">M+{i + 1}</span>
          ))}
          {rows.map(({ c, blend }) => (
            <FragmentRow key={c.id} company={c} blend={blend} color={color} />
          ))}
        </div>
      </div>
      <div className="num mt-4 flex items-center gap-2 text-[11px] text-faint">
        <span>-45%</span>
        <span className="h-2.5 w-40 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(193,68,49,.88), rgba(241,239,232,1) 50%, rgba(14,122,103,.88))" }} />
        <span>+45%</span>
        <span className="ml-3">Hover any cell for the exact figure.</span>
      </div>
    </div>
  );
}

function FragmentRow({ company, blend, color }) {
  return (
    <>
      <span className="num flex items-center gap-2 pr-2 text-[12.5px] font-semibold text-ink">
        <i className="inline-block h-2.5 w-2.5 rounded-[3px]" style={{ background: company.color }} />
        {company.name}
      </span>
      {blend.slice(1).map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.12, zIndex: 5 }}
          title={`${company.name} M+${i + 1}: ${v >= 0 ? "+" : ""}${v.toFixed(1)}% expected vs offer`}
          className="num flex h-10 cursor-default items-center justify-center rounded-md border border-line/60 text-[11px] font-semibold"
          style={{ background: color(v), color: Math.abs(v) > 26 ? "#fdfdfb" : "#23262d" }}
        >
          {v >= 0 ? "+" : ""}{Math.round(v)}
        </motion.div>
      ))}
    </>
  );
}

export function ScenarioCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {SCENARIOS.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.08}>
          <motion.div
            whileHover={{ y: -4 }}
            className="card h-full p-7"
            style={{ borderTop: `4px solid ${s.color}` }}
          >
            <Num value={s.prob} format={(v) => v.toFixed(0) + "%"} className="text-4xl font-bold text-ink" />
            <span className="ml-2 align-middle text-sm font-bold" style={{ color: s.color }}>{s.name}</span>
            <p className="mt-3 text-sm leading-relaxed text-dim">{s.desc}</p>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { COMPARABLES, ERAS, fmtB } from "../data/model.js";
import { Chip, ChartTip } from "./ui.jsx";

const METRICS = [
  { id: "pop", label: "First-day return", domain: [-60, 720] },
  { id: "m12", label: "12-month return", domain: [-120, 260] },
];

export default function Comparables() {
  const [era, setEra] = useState("all");
  const [metric, setMetric] = useState("pop");

  const m = METRICS.find((x) => x.id === metric);
  const points = useMemo(
    () =>
      COMPARABLES.filter((d) => (era === "all" || d.era === era) && d[metric] !== null).map((d) => ({
        ...d, x: d.raise, y: d[metric], z: Math.max(d.val, 0.8),
      })),
    [era, metric]
  );

  return (
    <div className="card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {ERAS.map((e) => (
          <Chip key={e.id} active={era === e.id} onClick={() => setEra(e.id)}>{e.label}</Chip>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-line md:block" />
        {METRICS.map((x) => (
          <Chip key={x.id} active={metric === x.id} onClick={() => setMetric(x.id)} color="#4549b8">{x.label}</Chip>
        ))}
      </div>
      <div className="h-[380px] md:h-[430px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 16, left: 0, bottom: 6 }}>
            <CartesianGrid stroke="#e6e3d7" />
            <XAxis
              type="number" dataKey="x" scale="log" domain={[0.02, 120]}
              ticks={[0.05, 0.2, 1, 5, 25, 100]}
              tickFormatter={(v) => (v >= 1 ? "$" + v + "B" : "$" + v * 1000 + "M")}
              stroke="#8b8f99" tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}
              tickLine={false} axisLine={{ stroke: "#d6d3c5" }}
              label={{ value: "Capital raised (log)", position: "insideBottom", offset: -4, fill: "#8b8f99", fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="y" domain={m.domain} width={50}
              tickFormatter={(v) => v + "%"}
              stroke="#8b8f99" tick={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}
              tickLine={false} axisLine={false}
            />
            <ZAxis type="number" dataKey="z" range={[40, 900]} />
            <ReferenceLine y={0} stroke="#8b8f99" strokeDasharray="5 5" />
            <Tooltip
              cursor={{ strokeDasharray: "4 4", stroke: "#c2bfb1" }}
              content={
                <ChartTip
                  render={(payload) => {
                    const d = payload[0]?.payload;
                    if (!d) return null;
                    return (
                      <>
                        <p className="mb-1 font-semibold text-body">{d.name} ({d.year})</p>
                        <p className="num text-dim">Raised {fmtB(d.raise)} at {fmtB(d.val)} valuation</p>
                        <p className="num text-dim">Day-1: <b className={d.pop >= 0 ? "text-mint" : "text-rose"}>{d.pop > 0 ? "+" : ""}{d.pop}%</b></p>
                        {d.m12 !== null && (
                          <p className="num text-dim">12-month: <b className={d.m12 >= 0 ? "text-mint" : "text-rose"}>{d.m12 > 0 ? "+" : ""}{d.m12}%</b></p>
                        )}
                      </>
                    );
                  }}
                />
              }
            />
            <Scatter data={points} fill="#118a72" fillOpacity={0.32} stroke="#118a72" strokeWidth={1.2} animationDuration={600} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[12px] text-faint">
        Twenty landmark listings. Bubble size: valuation at pricing. The pattern that matters: the bigger the raise, the smaller the pop. Filter by era or flip the vertical axis to 12-month outcomes.
      </p>
    </div>
  );
}

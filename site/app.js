/* AI IPO Watch — rendering + charts */
(function () {
  const $ = (s) => document.querySelector(s);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const C = { grid: "#1d242d", tick: "#5c6873", text: "#94a1ae" };
  Chart.defaults.font.family = 'ui-monospace, "Cascadia Code", Consolas, monospace';
  Chart.defaults.font.size = 11;
  Chart.defaults.color = C.tick;
  Chart.defaults.borderColor = C.grid;
  Chart.defaults.animation = reduceMotion ? false : { duration: 900, easing: "easeOutQuart" };
  Chart.defaults.plugins.legend.labels.boxWidth = 10;
  Chart.defaults.plugins.legend.labels.boxHeight = 10;
  Chart.defaults.plugins.tooltip.backgroundColor = "#1a212a";
  Chart.defaults.plugins.tooltip.borderColor = "#2c3540";
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleColor = "#e8edf2";
  Chart.defaults.plugins.tooltip.bodyColor = "#94a1ae";

  const fmtB = (v) => (v >= 1000 ? "$" + (v / 1000).toFixed(2).replace(/\.?0+$/, "") + "T" : "$" + v + "B");

  /* ---------- ticker ---------- */
  (function ticker() {
    const items = [
      'OpenAI <b>$852B</b> post-money · S-1 in',
      'Anthropic <b>$965B</b> post-money · S-1 in',
      'SPCX prices at <b>$135</b> fixed · lists Jun 12',
      'Anthropic run-rate <b>$47B</b> <span class="up">+10x y/y</span>',
      'OpenAI revenue <b>~$2B/mo</b>',
      'Nasdaq <span class="down">-5%</span> from Jun 2 record',
      '10-yr yield <b>4.5%+</b>',
      'P(OpenAI public by Dec 31) <b>48%</b>',
      'Largest raise ever: OpenAI <b>$122B</b>',
      'Largest IPO ever: SPCX <b>$75B</b>'
    ];
    const half = items.map((t) => `<span>${t}</span>`).join("");
    $("#ticker-track").innerHTML = half + half;
  })();

  /* ---------- contender cards ---------- */
  $("#contenders-grid").innerHTML = DATA.companies
    .map(
      (c) => `
    <article class="company reveal" style="--c:${c.color}">
      <div class="product">${c.product}</div>
      <h3>${c.name}</h3>
      <span class="status num">${c.status}</span>
      <dl>
        <div><dt>Latest valuation</dt><dd>${c.lastMarkLabel}</dd></div>
        <div><dt>Revenue</dt><dd>${c.revenueLabel}</dd></div>
        <div><dt>Latest raise</dt><dd style="font-size:.9rem">${c.raise}</dd></div>
        <div><dt>Profitability</dt><dd style="font-size:.9rem">${c.profitability}</dd></div>
      </dl>
      <p class="thesis">${c.thesis}</p>
    </article>`
    )
    .join("");

  /* ---------- valuation race (log line) ---------- */
  (function race() {
    const months = [];
    for (let y = 2023; y <= 2026; y++)
      for (let m = 1; m <= 12; m++) {
        if (y === 2026 && m > 7) break;
        months.push(`${y}-${String(m).padStart(2, "0")}`);
      }
    const sets = DATA.companies.map((c) => ({
      label: c.name,
      data: months.map((mo) => {
        const pt = c.valuationHistory.find((p) => p.date === mo);
        return pt ? pt.v : null;
      }),
      borderColor: c.color,
      backgroundColor: c.color,
      spanGaps: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5
    }));
    new Chart($("#chart-race"), {
      type: "line",
      data: { labels: months, datasets: sets },
      options: {
        maintainAspectRatio: false,
        interaction: { mode: "nearest", intersect: false },
        scales: {
          x: { ticks: { maxTicksLimit: 9 }, grid: { display: false } },
          y: {
            type: "logarithmic", min: 3, max: 2600,
            ticks: { callback: (v) => ([5, 20, 50, 150, 400, 1000, 2000].includes(v) ? fmtB(v) : null) }
          }
        },
        plugins: {
          legend: { position: "top", align: "end" },
          tooltip: { callbacks: { label: (i) => ` ${i.dataset.label}: ${fmtB(i.parsed.y)}` } }
        }
      }
    });
  })();

  /* ---------- revenue + multiple ---------- */
  (function fundamentals() {
    const cs = DATA.companies;
    new Chart($("#chart-revenue"), {
      type: "bar",
      data: {
        labels: cs.map((c) => c.name),
        datasets: [{ data: cs.map((c) => c.revenueAnnualized), backgroundColor: cs.map((c) => c.color + "cc"), borderRadius: 8, maxBarThickness: 90 }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${fmtB(i.parsed.y)} annualized` } } },
        scales: { y: { ticks: { callback: (v) => "$" + v + "B" } }, x: { grid: { display: false } } }
      }
    });

    const withMult = cs.filter((c) => c.multiple);
    new Chart($("#chart-multiple"), {
      type: "bar",
      data: {
        labels: withMult.map((c) => c.name + (c.id === "openai" ? " (at $852B)" : " (at $965B)")),
        datasets: [{ data: withMult.map((c) => c.multiple), backgroundColor: withMult.map((c) => c.color + "cc"), borderRadius: 8, maxBarThickness: 90 }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (i) => ` ${i.parsed.y}x annualized revenue` } }
        },
        scales: { y: { max: 50, ticks: { callback: (v) => v + "x" } }, x: { grid: { display: false } } }
      },
      plugins: [{
        id: "threshold",
        afterDraw(chart) {
          const y = chart.scales.y.getPixelForValue(25);
          const { left, right } = chart.chartArea;
          const ctx = chart.ctx;
          ctx.save();
          ctx.setLineDash([6, 6]);
          ctx.strokeStyle = "#f08c8c";
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke();
          ctx.fillStyle = "#f08c8c";
          ctx.font = "11px ui-monospace, monospace";
          ctx.fillText("25x danger line", left + 6, y - 7);
          ctx.restore();
        }
      }]
    });
  })();

  /* ---------- comparables scatter ---------- */
  (function comps() {
    const pts = DATA.comparables.map((d) => ({
      x: d.raise, y: d.pop, r: Math.max(5, Math.sqrt(d.val) * 1.55, 5), meta: d
    }));
    new Chart($("#chart-comps"), {
      type: "bubble",
      data: {
        datasets: [{
          data: pts,
          backgroundColor: "rgba(52, 211, 155, 0.28)",
          borderColor: "#34d39b",
          borderWidth: 1.2,
          hoverBackgroundColor: "rgba(52, 211, 155, 0.5)"
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => { const m = items[0].raw.meta; return `${m.name} (${m.year})`; },
              label: (i) => {
                const m = i.raw.meta;
                const lines = [` Raised ${fmtB(m.raise)} at ${fmtB(m.val)} valuation`, ` Day-1: ${m.pop > 0 ? "+" : ""}${m.pop}%`];
                if (m.m12 !== null) lines.push(` 12-month vs offer: ${m.m12 > 0 ? "+" : ""}${m.m12}%`);
                return lines;
              }
            }
          }
        },
        scales: {
          x: {
            type: "logarithmic", min: 0.02, max: 120,
            title: { display: true, text: "Capital raised, $B (log)", color: C.text },
            ticks: { callback: (v) => ([0.05, 0.2, 1, 5, 25, 100].includes(v) ? fmtB(v) : null) }
          },
          y: {
            min: -60, max: 720,
            title: { display: true, text: "First-day return %", color: C.text },
            ticks: { callback: (v) => v + "%" }
          }
        }
      }
    });
  })();

  /* ---------- prediction bands ---------- */
  (function bands() {
    const max = 1600;
    $("#bands").innerHTML = DATA.companies
      .filter((c) => c.id !== "spcx")
      .map((c) => {
        const b = c.pricingBand;
        const pct = (v) => (v / max) * 100;
        return `
        <div class="band-row reveal" style="--c:${c.color}">
          <div class="band-head">
            <h4>${c.name} · IPO pricing valuation</h4>
            <span class="meta">P(2026 listing) ${Math.round(c.listing.p2026 * 100)}% · last private mark ${fmtB(c.lastMark)}</span>
          </div>
          <div class="band-track">
            <div class="band-fill" style="left:${pct(b.p10)}%; right:${100 - pct(b.p90)}%"></div>
            <div class="band-mid" style="left:${pct(b.p50)}%"></div>
            <div class="band-pin" style="left:${pct(b.p50)}%">${fmtB(b.p50)} median</div>
          </div>
          <div class="band-labels">
            <span>P10 ${fmtB(b.p10)}</span><span>P90 ${fmtB(b.p90)}</span>
          </div>
          <div class="band-scale"><span>$0</span><span>$400B</span><span>$800B</span><span>$1.2T</span><span>$1.6T</span></div>
        </div>`;
      })
      .join("");
  })();

  /* ---------- day-1 band chart ---------- */
  (function day1() {
    const cs = DATA.companies;
    new Chart($("#chart-day1"), {
      type: "bar",
      data: {
        labels: cs.map((c) => c.name),
        datasets: [
          {
            label: "P10 to P90 range",
            data: cs.map((c) => [c.day1.p10, c.day1.p90]),
            backgroundColor: cs.map((c) => c.color + "55"),
            borderColor: cs.map((c) => c.color),
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 64
          },
          {
            label: "Median",
            type: "scatter",
            data: cs.map((c, i) => ({ x: i, y: c.day1.p50 })),
            backgroundColor: cs.map((c) => c.color),
            pointRadius: 6,
            pointStyle: "rectRot"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", align: "end" },
          tooltip: {
            callbacks: {
              label: (i) => {
                const c = cs[i.dataIndex];
                return i.dataset.type === "scatter"
                  ? ` Median day-1: +${c.day1.p50}%`
                  : ` Range: ${c.day1.p10}% to +${c.day1.p90}%`;
              }
            }
          }
        },
        scales: {
          y: { ticks: { callback: (v) => (v > 0 ? "+" : "") + v + "%" } },
          x: { grid: { display: false } }
        }
      }
    });
  })();

  /* ---------- timing probabilities ---------- */
  (function timing() {
    const pm = DATA.polymarket;
    new Chart($("#chart-timing"), {
      type: "bar",
      data: {
        labels: pm.points.map((p) => p.label),
        datasets: [{ data: pm.points.map((p) => p.p), backgroundColor: "#7dd3fccc", borderRadius: 8, maxBarThickness: 70 }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => ` ${i.parsed.y}% implied probability` } } },
        scales: { y: { max: 100, ticks: { callback: (v) => v + "%" } }, x: { grid: { display: false } } }
      }
    });
  })();

  /* ---------- scenarios ---------- */
  $("#scenarios").innerHTML = DATA.scenarios
    .map((s, i) => {
      const cls = i === 0 ? "bear" : i === 1 ? "base" : "bull";
      return `<div class="scenario ${cls} reveal">
        <div class="p num">${s.prob}%</div>
        <h4>${s.name}</h4>
        <p class="d">${s.desc}</p>
      </div>`;
    })
    .join("");

  /* ---------- investors ---------- */
  $("#inv-grid").innerHTML = DATA.investors
    .map((v) => `<div class="inv"><h4>${v.cls}</h4><div class="names">${v.names}</div><p>${v.read}</p></div>`)
    .join("");

  /* ---------- macro timeline ---------- */
  $("#timeline").innerHTML = DATA.macro.events
    .map((e) => `<li><span class="d">${e.date}</span><span class="t">${e.text}</span></li>`)
    .join("");

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

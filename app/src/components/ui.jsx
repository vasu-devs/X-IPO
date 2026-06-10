import { motion, useReducedMotion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

/* brand mark: three ascending bars, one per listing */
export function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#20232a" />
      <rect x="7" y="17" width="4.6" height="8" rx="2.3" fill="#7e82e8" />
      <rect x="13.7" y="12" width="4.6" height="13" rx="2.3" fill="#2fbf9b" />
      <rect x="20.4" y="7" width="4.6" height="18" rx="2.3" fill="#eda05a" />
    </svg>
  );
}

/* full-screen branded loader: exits once the app has mounted and fonts settled */
export function Loader({ done }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={done ? { opacity: 0, scale: reduce ? 1 : 1.04, pointerEvents: "none" } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-paper"
      aria-hidden={done}
    >
      <div className="flex items-end gap-[7px]" role="status" aria-label="Loading">
        {[["#7e82e8", 22], ["#2fbf9b", 34], ["#eda05a", 46]].map(([c, h], i) => (
          <motion.span
            key={c}
            className="w-[13px] rounded-full"
            style={{ background: c, height: h, transformOrigin: "bottom" }}
            animate={reduce ? {} : { scaleY: [1, 0.45, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl font-black tracking-tight text-ink"
        >
          Debut
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="num mt-1 text-[11px] tracking-[0.22em] text-faint uppercase"
        >
          The AI IPO Observatory
        </motion.p>
      </div>
    </motion.div>
  );
}

/* thin multicolor progress bar under the nav: reading position at a glance */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #4f53c4, #118a72 55%, #d4762e)" }}
    />
  );
}

export function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, title, sub, children, wide = false }) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className={`mx-auto px-5 md:px-8 ${wide ? "max-w-[1320px]" : "max-w-[1180px]"}`}>
        <Reveal>
          <h2 className="text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight mb-3">{title}</h2>
        </Reveal>
        {sub && (
          <Reveal delay={0.08}>
            <p className="text-dim max-w-[64ch] mb-11">{sub}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* Animated number: springs to value when in view or when value changes. */
export function Num({ value, format = (v) => v.toFixed(0), className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 22 });
  const text = useTransform(spring, (v) => format(v));

  useEffect(() => {
    if (reduce) { mv.jump(value); return; }
    if (inView) mv.set(value);
  }, [inView, value, reduce, mv]);

  return <motion.span ref={ref} className={`num ${className}`}>{text}</motion.span>;
}

export function Chip({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      className={`num cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-200 ${
        active
          ? "border-transparent text-white font-semibold"
          : "border-line text-dim hover:border-line-hi hover:text-body"
      }`}
      style={active ? { background: color ?? "#20232a" } : undefined}
    >
      {children}
    </button>
  );
}

export function ChartTip({ active, payload, label, render }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card px-4 py-3 text-[13px] shadow-2xl" style={{ borderColor: "#c2bfb1" }}>
      {render(payload, label)}
    </div>
  );
}

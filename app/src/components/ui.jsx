import { motion, useReducedMotion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

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

import { Section, Reveal, ScrollProgress } from "./components/ui.jsx";
import ForecastLab, { ScenarioCards, PredictionMap } from "./components/ForecastLab.jsx";
import Comparables from "./components/Comparables.jsx";
import {
  Nav, Hero, Ticker, Contenders, Race, Timing, Outlook, Capital, Macro, Multiples, Footer,
} from "./components/sections.jsx";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <main>
        <Section
          id="contenders"
          title="Three labs, one window"
          sub="Every figure below survived adversarial source verification or is flagged in the research files. Private marks moved so fast in 2026 that several were refuted as stale within weeks."
        >
          <Contenders />
        </Section>

        <Section
          id="race"
          title="The valuation race"
          sub="From seed-stage marks to near-trillion prints in three years. Log scale, because nothing else fits."
        >
          <Reveal><Race /></Reveal>
        </Section>

        <Section
          id="history"
          title="Thirty years of landmark debuts"
          sub="Twenty category-defining listings from Netscape to Klarna, fully explorable. Filter by era, flip the axis, hover any bubble."
        >
          <Reveal><Comparables /></Reveal>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Reveal><Multiples /></Reveal>
            <Reveal delay={0.08}><Timing /></Reveal>
          </div>
        </Section>

        <Section
          id="forecast"
          title="The forecast lab"
          sub="Pick a company, pick a scenario, stress the macro environment. The model projects the monthly P10-P90 path for the first year of trading, indexed to the offer price."
        >
          <Reveal><ForecastLab /></Reveal>
          <div className="mt-5">
            <Reveal><PredictionMap /></Reveal>
          </div>
          <div className="mt-12">
            <Reveal>
              <h3 className="mb-2 text-xl font-bold">How the scenarios split</h3>
              <p className="mb-6 max-w-[64ch] text-dim">Everything keys off the first month of SPCX trading. It is the price discovery event for the entire private AI complex.</p>
            </Reveal>
            <ScenarioCards />
          </div>
        </Section>

        <Section
          id="outlook"
          title="The next twelve months, month by month"
          sub="What the model expects to happen, when, and what to watch at each step. Click any month to expand it."
        >
          <Outlook />
        </Section>

        <Section
          id="capital"
          title="Where the money already sits"
          sub="The defining feature of this cycle: the public-market buyer base bought in before the filings. The last private rounds were the real bookbuilds."
        >
          <Reveal><Capital /></Reveal>
        </Section>

        <Section
          id="macro"
          title="The tape they land on"
          sub="Nasdaq up about 10% on the year but 5% off its June 2 record, with the 10-year yield above 4.5%. The window is open, and twitchy."
        >
          <Macro />
        </Section>
      </main>
      <Footer />
    </>
  );
}

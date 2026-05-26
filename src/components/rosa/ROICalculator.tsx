import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function SliderInput({ label, value, min, max, step, onChange }: SliderInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <span className="font-mono text-sm font-semibold tabular-nums text-primary">{value.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
      />
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60 tabular-nums">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { copy } = useLanguage();
  const section = copy.roiCalculator;

  const [courts, setCourts] = useState(4);
  const [bookings, setBookings] = useState(200);
  const [price, setPrice] = useState(50);

  const baseRevenue = courts * bookings * price;
  const monthlyLow = Math.round(baseRevenue * 0.15);
  const monthlyHigh = Math.round(baseRevenue * 0.25);
  const annualLow = Math.round(monthlyLow * 12);
  const annualHigh = Math.round(monthlyHigh * 12);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-card border border-border overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left — inputs */}
            <div className="p-8 md:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-border">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-mono uppercase tracking-widest text-primary">{section.label}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
                <p className="text-muted-foreground">
                  <BrandText text={section.subtitle} />
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-7">
                <SliderInput
                  label={section.courtLabel}
                  value={courts}
                  min={1}
                  max={20}
                  step={1}
                  onChange={setCourts}
                />
                <SliderInput
                  label={section.bookingsLabel}
                  value={bookings}
                  min={50}
                  max={600}
                  step={10}
                  onChange={setBookings}
                />
                <SliderInput
                  label={section.priceLabel}
                  value={price}
                  min={10}
                  max={150}
                  step={5}
                  onChange={setPrice}
                />
              </div>
            </div>

            {/* Right — output */}
            <div className="p-8 md:p-10 space-y-8 flex flex-col">
              {/* Monthly estimate */}
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">{section.monthlyLabel}</p>
                <div className="rounded-2xl bg-secondary p-6 space-y-1">
                  <p className="font-mono text-4xl md:text-5xl font-bold text-primary tabular-nums leading-none">
                    €{monthlyLow.toLocaleString()} – €{monthlyHigh.toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
                    <BrandText text={section.numberContext} />
                  </p>
                  <p className="text-sm text-muted-foreground font-mono tabular-nums">
                    {section.annualPrefix} €{annualLow.toLocaleString()} – €{annualHigh.toLocaleString()}{" "}
                    {section.annualSuffix}
                  </p>
                </div>
              </div>

              {/* Revenue streams */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">{section.streamsTitle}</p>
                <ul className="space-y-2">
                  {section.streams.map((stream) => (
                    <li key={stream} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {stream}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer + CTA */}
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{section.disclaimer}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 px-6 text-sm hover:opacity-90 transition-opacity"
                >
                  {section.cta}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

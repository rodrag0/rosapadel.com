import { useId, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ROICalculator() {
  const { language } = useLanguage();
  const id = useId();
  const [courts, setCourts] = useState(1);
  const [hours, setHours] = useState(1);
  const [rate, setRate] = useState(500);
  const words = {
    en: {
      title: "What could an extra court hour mean?",
      body: "Explore your own booking scenario. This is additional court revenue, not a ROSA price or a forecast.",
      courts: "Number of courts",
      hours: "Extra paid hours / court / week",
      rate: "Court-hour revenue (MXN)",
      monthly: "Illustrative monthly revenue",
      annual: "Annual equivalent",
      note: "Based on52 weeks divided by12 months. Before operating costs, taxes and any hardware or service investment. Additional bookings are an assumption, not a guaranteed effect of ROSA.",
    },
    es: {
      title: "¿Qué podría representar una hora extra?",
      body: "Explora tu propio escenario de reservas. Son ingresos adicionales de cancha, no un precio de ROSA ni un pronóstico.",
      courts: "Número de canchas",
      hours: "Horas pagadas extra / cancha / semana",
      rate: "Ingreso por hora de cancha (MXN)",
      monthly: "Ingreso mensual ilustrativo",
      annual: "Equivalente anual",
      note: "Calculado con52 semanas divididas entre12 meses. Antes de costos operativos, impuestos e inversión en hardware o servicios. Las reservas adicionales son un supuesto, no un efecto garantizado de ROSA.",
    },
    de: {
      title: "Was könnte eine zusätzliche Court-Stunde bedeuten?",
      body: "Erkunde dein eigenes Buchungsszenario. Zusätzlicher Court-Umsatz, kein ROSA-Preis und keine Prognose.",
      courts: "Anzahl Courts",
      hours: "Zusätzliche bezahlte Stunden / Court / Woche",
      rate: "Umsatz pro Court-Stunde (MXN)",
      monthly: "Illustrativer Monatsumsatz",
      annual: "Jahresäquivalent",
      note: "Berechnet mit52 Wochen geteilt durch12 Monate. Vor Betriebskosten, Steuern und Hardware- oder Servicekosten. Zusätzliche Buchungen sind eine Annahme, kein garantierter ROSA-Effekt.",
    },
  }[language];
  const format = new Intl.NumberFormat(
    { en: "en-US", es: "es-MX", de: "de-DE" }[language],
    { style: "currency", currency: "MXN", maximumFractionDigits: 0 },
  );
  const annual = courts * hours * rate * 52;
  const inputs = [
    {
      key: "courts",
      label: words.courts,
      value: courts,
      min: 1,
      max: 20,
      step: 1,
      set: setCourts,
    },
    {
      key: "hours",
      label: words.hours,
      value: hours,
      min: 0,
      max: 20,
      step: 0.5,
      set: setHours,
    },
    {
      key: "rate",
      label: words.rate,
      value: rate,
      min: 0,
      max: 2000,
      step: 50,
      set: setRate,
    },
  ];
  return (
    <section className="roi-tool">
      <div className="studio-container roi-layout">
        <div>
          <h2>{words.title}</h2>
          <p className="mt-5">{words.body}</p>
          <div className="roi-inputs">
            {inputs.map((input) => (
              <div key={input.key}>
                <label htmlFor={`${id}-${input.key}`}>
                  <span>{input.label}</span>
                  <span className="tabular-nums">{input.value}</span>
                </label>
                <input
                  id={`${id}-${input.key}`}
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={input.value}
                  onChange={(event) => input.set(Number(event.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="roi-result" aria-live="polite">
          <p>{words.monthly}</p>
          <output>{format.format(annual / 12)}</output>
          <p>
            {words.annual}: {format.format(annual)}
          </p>
          <small>{words.note}</small>
        </div>
      </div>
    </section>
  );
}

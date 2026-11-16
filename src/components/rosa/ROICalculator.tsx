import { useId, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const currencySettings = {
  MXN: { rate: 500, max: 2000, step: 50 },
  EUR: { rate: 25, max: 200, step: 5 },
  USD: { rate: 30, max: 200, step: 5 },
} as const;
type Currency = keyof typeof currencySettings;
const currencies: Currency[] = ["MXN", "EUR", "USD"];

export default function ROICalculator() {
  const { language } = useLanguage();
  const id = useId();
  const [courts, setCourts] = useState(1);
  const [hours, setHours] = useState(1);
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [rates, setRates] = useState<Record<Currency, number>>({
    MXN: currencySettings.MXN.rate,
    EUR: currencySettings.EUR.rate,
    USD: currencySettings.USD.rate,
  });
  const rate = rates[currency];
  const words = {
    en: {
      title: "What could an extra court hour mean?",
      body: "Explore your own booking scenario. This is additional court revenue, not a ROSA price or a forecast.",
      courts: "Number of courts",
      hours: "Extra paid hours / court / week",
      currency: "Currency",
      rate: "Court-hour revenue",
      monthly: "Illustrative monthly revenue",
      annual: "Annual equivalent",
      excludesSponsorship: "Sponsorship income is not included.",
      note: "Based on 52 weeks divided by 12 months. Before operating costs, taxes and any hardware or service investment. Additional bookings are an assumption, not a guaranteed effect of ROSA.",
    },
    es: {
      title: "¿Qué podría representar una hora extra?",
      body: "Explora tu propio escenario de reservas. Son ingresos adicionales de cancha, no un precio de ROSA ni un pronóstico.",
      courts: "Número de canchas",
      hours: "Horas pagadas extra / cancha / semana",
      currency: "Moneda",
      rate: "Ingreso por hora de cancha",
      monthly: "Ingreso mensual ilustrativo",
      annual: "Equivalente anual",
      excludesSponsorship: "No incluye ingresos por patrocinios.",
      note: "Calculado con 52 semanas divididas entre 12 meses. Antes de costos operativos, impuestos e inversión en hardware o servicios. Las reservas adicionales son un supuesto, no un efecto garantizado de ROSA.",
    },
    de: {
      title: "Was könnte eine zusätzliche Court-Stunde bedeuten?",
      body: "Erkunde dein eigenes Buchungsszenario. Zusätzlicher Court-Umsatz, kein ROSA-Preis und keine Prognose.",
      courts: "Anzahl Courts",
      hours: "Zusätzliche bezahlte Stunden / Court / Woche",
      currency: "Währung",
      rate: "Umsatz pro Court-Stunde",
      monthly: "Illustrativer Monatsumsatz",
      annual: "Jahresäquivalent",
      excludesSponsorship: "Sponsoring-Einnahmen sind nicht enthalten.",
      note: "Berechnet mit 52 Wochen geteilt durch 12 Monate. Vor Betriebskosten, Steuern und Hardware- oder Servicekosten. Zusätzliche Buchungen sind eine Annahme, kein garantierter ROSA-Effekt.",
    },
  }[language];
  const format = new Intl.NumberFormat(
    { en: "en-US", es: "es-MX", de: "de-DE" }[language],
    { style: "currency", currency, maximumFractionDigits: 0 },
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
      label: `${words.rate} (${currency})`,
      value: rate,
      min: 0,
      max: currencySettings[currency].max,
      step: currencySettings[currency].step,
      set: (value: number) => setRates((current) => ({ ...current, [currency]: value })),
    },
  ];
  return (
    <section id="court-revenue" className="roi-tool scroll-mt-24" aria-labelledby={`${id}-title`}>
      <div className="studio-container roi-layout">
        <div>
          <h2 id={`${id}-title`}>{words.title}</h2>
          <p className="mt-5">{words.body}</p>
          <fieldset className="roi-currency">
            <legend>{words.currency}</legend>
            <div className="roi-currency-options">
              {currencies.map((option) => (
                <label key={option}>
                  <input
                    className="sr-only"
                    type="radio"
                    name={`${id}-currency`}
                    value={option}
                    checked={option === currency}
                    onChange={() => setCurrency(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="roi-inputs">
            {inputs.map((input) => (
              <div key={input.key}>
                <label htmlFor={`${id}-${input.key}`}>
                  <span>{input.label}</span>
                  <span className="tabular-nums">{input.key === "rate" ? format.format(input.value) : input.value}</span>
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
          <p className="roi-sponsorship-exclusion">{words.excludesSponsorship}</p>
          <small>{words.note}</small>
        </div>
      </div>
    </section>
  );
}

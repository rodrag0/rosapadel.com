import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import campusFoundersDark from "@/assets/campusfounders-logo-dark.svg";
import campusFoundersLight from "@/assets/campusfounders-logo-light.svg";
import emprelatamDark from "@/assets/emprelatam-dark.png";
import emprelatamLight from "@/assets/emprelatam-light.png";

export default function Partners() {
  const { theme } = useTheme();
  const { copy } = useLanguage();
  return (
    <section
      id="partners"
      className="partners-studio studio-container"
      aria-labelledby="partners-title"
    >
      <div className="partners-row">
        <h2 id="partners-title">{copy.partners.label}</h2>
        <ul aria-label={copy.partners.label}>
          <li>
            <img
              src={theme === "dark" ? campusFoundersDark : campusFoundersLight}
              alt="Campus Founders"
              width="527"
              height="120"
              loading="lazy"
            />
          </li>
          <li>
            <img
              src={theme === "dark" ? emprelatamDark : emprelatamLight}
              alt="Startup acelerada por emprelatam"
              width="500"
              height="200"
              loading="lazy"
            />
          </li>
        </ul>
      </div>
      <p className="partners-message">{copy.partners.body}</p>
    </section>
  );
}

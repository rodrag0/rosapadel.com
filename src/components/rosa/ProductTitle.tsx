import { useTheme } from "./ThemeProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";

export default function ProductTitle({ name }: { name: "portable" | "vision" | "coach" }) {
  const { theme } = useTheme();
  return (
    <h1 aria-label={`rosa ${name}`} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-5xl md:text-7xl font-extrabold leading-none">
      <img src={theme === "dark" ? rosaLogoDark : rosaLogoLight} alt="rosa" className="h-12 w-auto md:h-20" />
      <span>{name}</span>
    </h1>
  );
}

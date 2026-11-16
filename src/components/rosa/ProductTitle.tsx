import { useTheme } from "./ThemeProvider";
import rosaLogoDark from "@/assets/rosa-logo-dark.png";
import rosaLogoLight from "@/assets/rosa-logo-light.png";

export function RosaWordmark({ className, alt = "rosa" }: { className: string; alt?: string }) {
  const { theme } = useTheme();
  return <img src={theme === "dark" ? rosaLogoDark : rosaLogoLight} alt={alt} className={className} width="2226" height="644" />;
}

export default function ProductTitle({ name }: { name: "portable" | "vision" }) {
  const description = { portable: "LED scoring for padel", vision: "Connected padel scoring, livestream, replay and AI analysis" }[name];
  return (
    <h1 className="flex flex-wrap items-center gap-x-4 gap-y-2 text-5xl md:text-7xl font-extrabold leading-none">
      <RosaWordmark className="h-12 w-auto md:h-20" />
      <span>{name}</span>
      <span className="basis-full text-base font-medium leading-normal text-muted-foreground md:text-lg">{description}</span>
    </h1>
  );
}

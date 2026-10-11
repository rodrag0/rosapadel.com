import { Check, ChevronDown, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languageOptions } from "@/lib/siteCopy";
import { useLanguage } from "./LanguageProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
};

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, copy } = useLanguage();
  const currentLabel =
    languageOptions.find((option) => option.code === language)?.label ?? language.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center rounded-full border border-border bg-secondary/60 text-muted-foreground transition-colors hover:text-foreground ${
            compact ? "gap-1.5 px-3 py-2 text-xs" : "gap-2 px-3 py-2 text-sm"
          }`}
          aria-label={copy.nav.languageLabel}
        >
          <Languages className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          <span className="font-mono tracking-widest">{currentLabel}</span>
          <ChevronDown className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[9rem]">
        {languageOptions.map((option) => {
          const active = option.code === language;

          return (
            <DropdownMenuItem
              key={option.code}
              onSelect={() => setLanguage(option.code)}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-mono tracking-widest">{option.label}</span>
              {active ? <Check className="h-4 w-4 text-primary" /> : <span className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

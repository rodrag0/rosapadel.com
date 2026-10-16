import { siteCopy, type Language } from "./siteCopy";

// Hardware stays separate from the coach software layer in every navigation surface.
export function getHardwareProducts(language: Language) {
  return siteCopy[language].productFamily.items;
}

export function getProductLinks(language: Language) {
  return [...getHardwareProducts(language), siteCopy[language].productFamily.aiLayer];
}

export function getProductStatusClass(statusType: string) {
  if (statusType === "available") return "text-green-400";
  if (statusType === "pilot") return "text-yellow-400";
  return "text-muted-foreground";
}

import { siteCopy, type Language } from "./siteCopy";

// Vision includes the intelligence layer; Portable is the scoring alternative.
export function getHardwareProducts(language: Language) {
  return siteCopy[language].productFamily.items;
}

export function getProductLinks(language: Language) {
  return getHardwareProducts(language);
}

export function getProductStatusClass(statusType: string) {
  if (statusType === "available" || statusType === "presale") return "text-green-700 dark:text-green-400";
  if (statusType === "pilot") return "text-yellow-400";
  return "text-muted-foreground";
}

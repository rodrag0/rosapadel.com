import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";

export default function ImprintPage() {
  const { copy, language } = useLanguage();
  const imprint = copy.legal.imprint;
  const fieldValueHeaders =
    language === "de" ? ["Feld", "Wert"] : language === "es" ? ["Campo", "Valor"] : ["Field", "Value"];

  return (
    <LegalPageLayout
      title={imprint.title}
      description={imprint.description}
      documentTitle={copy.meta.imprintTitle}
    >
      <LegalSection title={imprint.sections.providerTitle}>
        <LegalDataTable headers={fieldValueHeaders} rows={imprint.sections.providerRows} />
      </LegalSection>

      <LegalSection title={imprint.sections.registerTitle}>
        <p>{imprint.sections.registerBody}</p>
      </LegalSection>

      <LegalSection title={imprint.sections.contentTitle}>
        <p>{imprint.sections.contentBody}</p>
      </LegalSection>

      <LegalSection title={imprint.sections.disputeTitle}>
        <p>{imprint.sections.disputeBody}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

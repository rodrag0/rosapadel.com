import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

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
        <p><BrandText text={imprint.sections.registerBody} /></p>
      </LegalSection>

      <LegalSection title={imprint.sections.contentTitle}>
        <p><BrandText text={imprint.sections.contentBody} /></p>
      </LegalSection>

      <LegalSection title={imprint.sections.disputeTitle}>
        <p><BrandText text={imprint.sections.disputeBody} /></p>
      </LegalSection>
    </LegalPageLayout>
  );
}

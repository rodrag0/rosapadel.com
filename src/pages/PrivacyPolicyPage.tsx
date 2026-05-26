import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

export default function PrivacyPolicyPage() {
  const { copy, language } = useLanguage();
  const privacy = copy.legal.privacy;
  const fieldValueHeaders =
    language === "de" ? ["Feld", "Wert"] : language === "es" ? ["Campo", "Valor"] : ["Field", "Value"];

  return (
    <LegalPageLayout
      title={privacy.title}
      description={privacy.description}
      documentTitle={copy.meta.privacyTitle}
    >
      <LegalSection title={privacy.sections.controllerTitle}>
        <LegalDataTable headers={fieldValueHeaders} rows={privacy.sections.controllerRows} />
      </LegalSection>

      <LegalSection title={privacy.sections.dataTitle}>
        <ul className="list-disc pl-5 space-y-2">
          {privacy.sections.dataList.map((item) => (
            <li key={item}><BrandText text={item} /></li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title={privacy.sections.purposesTitle}>
        <LegalDataTable
          headers={privacy.sections.purposesTable.headers}
          rows={privacy.sections.purposesTable.rows}
        />
      </LegalSection>

      <LegalSection title={privacy.sections.processorsTitle}>
        <p><BrandText text={privacy.sections.processorsBody} /></p>
      </LegalSection>

      <LegalSection title={privacy.sections.transfersTitle}>
        <p><BrandText text={privacy.sections.transfersBody} /></p>
      </LegalSection>

      <LegalSection title={privacy.sections.retentionTitle}>
        <p><BrandText text={privacy.sections.retentionBody} /></p>
      </LegalSection>

      <LegalSection title={privacy.sections.rightsTitle}>
        <p><BrandText text={privacy.sections.rightsBody} /></p>
      </LegalSection>

      <LegalSection title={privacy.sections.contactTitle}>
        <p><BrandText text={privacy.sections.contactBody} /></p>
      </LegalSection>
    </LegalPageLayout>
  );
}

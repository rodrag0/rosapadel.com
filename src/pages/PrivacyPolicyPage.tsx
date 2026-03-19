import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";

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
            <li key={item}>{item}</li>
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
        <p>{privacy.sections.processorsBody}</p>
      </LegalSection>

      <LegalSection title={privacy.sections.transfersTitle}>
        <p>{privacy.sections.transfersBody}</p>
      </LegalSection>

      <LegalSection title={privacy.sections.retentionTitle}>
        <p>{privacy.sections.retentionBody}</p>
      </LegalSection>

      <LegalSection title={privacy.sections.rightsTitle}>
        <p>{privacy.sections.rightsBody}</p>
      </LegalSection>

      <LegalSection title={privacy.sections.contactTitle}>
        <p>{privacy.sections.contactBody}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

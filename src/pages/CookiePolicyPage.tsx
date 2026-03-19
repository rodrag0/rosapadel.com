import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";

export default function CookiePolicyPage() {
  const { copy } = useLanguage();
  const cookies = copy.legal.cookies;

  return (
    <LegalPageLayout
      title={cookies.title}
      description={cookies.description}
      documentTitle={copy.meta.cookiesTitle}
    >
      <LegalSection title={cookies.sections.storageTitle}>
        <LegalDataTable
          headers={cookies.sections.storageTable.headers}
          rows={cookies.sections.storageTable.rows}
        />
      </LegalSection>

      <LegalSection title={cookies.sections.analyticsTitle}>
        <p>{cookies.sections.analyticsBody}</p>
      </LegalSection>

      <LegalSection title={cookies.sections.manageTitle}>
        <p>{cookies.sections.manageBody}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

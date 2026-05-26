import LegalPageLayout, { LegalDataTable, LegalSection } from "@/components/rosa/LegalPageLayout";
import { useLanguage } from "@/components/rosa/LanguageProvider";
import BrandText from "@/components/rosa/BrandText";

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
        <p><BrandText text={cookies.sections.analyticsBody} /></p>
      </LegalSection>

      <LegalSection title={cookies.sections.manageTitle}>
        <p><BrandText text={cookies.sections.manageBody} /></p>
      </LegalSection>
    </LegalPageLayout>
  );
}

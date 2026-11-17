import { ReactNode, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageProvider";
import BrandText from "./BrandText";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  documentTitle: string;
  children: ReactNode;
};

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="reading-section">
      <h2>{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

export function LegalDataTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead className="bg-secondary/60 text-foreground">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-border px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="border-b border-border/70 px-4 py-3 last:border-b-0">
                  <BrandText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LegalPageLayout({
  title,
  description,
  documentTitle,
  children,
}: LegalPageLayoutProps) {
  const { copy } = useLanguage();

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <main className="courtside-reading min-h-screen">
      <Navbar />

      <header className="reading-header studio-container">
            <h1><BrandText text={title} /></h1>
            <p><BrandText text={description} /></p>
            <p>
              {copy.legal.lastUpdatedPrefix}: 2026-03-19. {copy.legal.introNote}
            </p>
            <a href="/" className="studio-link"><ArrowLeft size={16} aria-hidden="true" />{copy.legal.backHome}</a>
      </header>

      <section className="pb-24">
        <div className="reading-document studio-container">{children}</div>
      </section>

      <Footer />
    </main>
  );
}

import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageProvider";

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
    <section className="rounded-2xl border border-border bg-card/80 p-8 inner-glow space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
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
    <div className="overflow-x-auto rounded-xl border border-border">
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
                  {cell}
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
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_48%)]" />
        <div className="relative container mx-auto max-w-5xl px-6 lg:px-12">
          <div className="rounded-[2rem] border border-border bg-card/60 p-8 md:p-12 glass space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-mono uppercase tracking-widest text-primary">{copy.footer.legalTitle}</p>
              <Button asChild variant="outline" size="sm" className="border-border bg-background/40">
                <a href="/">{copy.legal.backHome}</a>
              </Button>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{description}</p>
            <p className="max-w-3xl text-sm text-muted-foreground">
              {copy.legal.lastUpdatedPrefix}: 2026-03-19. {copy.legal.introNote}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12 space-y-8">{children}</div>
      </section>

      <Footer />
    </main>
  );
}

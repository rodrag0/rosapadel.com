import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import { comparisonGuides, sourceCheckDate, type ComparisonGuide as Guide } from "@/lib/comparisonGuides";

export default function ComparisonGuide({ guide }: { guide: Guide }) {
  return <main className="min-h-screen bg-background text-foreground" lang="en">
    <Navbar />
    <article className="container mx-auto px-6 pb-24 pt-32 lg:px-12">
      <header className="max-w-3xl">
        <a href="/learn" className="mb-8 inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-sm text-muted-foreground hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><ArrowLeft className="h-4 w-4" aria-hidden="true" />All guides</a>
        <p className="mb-4 text-sm text-muted-foreground">Review draft · ROSA product team</p>
        <h1 className="text-4xl font-bold leading-tight [overflow-wrap:anywhere] md:text-5xl">{guide.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{guide.subtitle}</p>
        <p className="mt-8 text-lg leading-relaxed">{guide.answer}</p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Published by ROSA. Documentary research, not a comparative field test. Sources checked <time dateTime={sourceCheckDate}>27 October 2026</time>. Draft awaiting product and editorial approval.</p>
      </header>

      <figure className="mt-12 max-w-5xl">
        <img src="https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-4e7582d7a08e.webp" alt="ROSA match preview with games 1-1 and points 30-30 at Final Expo 2026" width="1280" height="720" className="aspect-video w-full rounded-lg object-contain" />
        <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 text-sm leading-relaxed text-muted-foreground"><span className="max-w-2xl">A real ROSA example: Tolito / Mati vs Argañaras / Pablo. Saved score and demonstration sponsor artwork; this is not an athlete endorsement.</span><a href="/products/vision#match-preview" className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">See the match example<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></figcaption>
      </figure>

      <section className="mt-16 max-w-3xl" aria-labelledby="supplier-documentation">
        <h2 id="supplier-documentation" className="scroll-mt-28 text-2xl font-semibold">What {guide.supplier} documents</h2>
        <p className="mt-5 leading-7 text-muted-foreground">{guide.supplierSummary}</p>
        <ul className="mt-4 space-y-2 text-sm">{guide.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{source.label}</a></li>)}</ul>
      </section>

      <section className="mt-14 max-w-5xl" aria-labelledby="comparison">
        <h2 id="comparison" className="scroll-mt-28 text-2xl font-semibold">Compare the proposed setup</h2>
        <div className="mt-6 overflow-x-auto rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" role="region" aria-label="Supplier comparison table" tabIndex={0}>
          <table className="w-full min-w-[680px] table-fixed border-collapse text-left text-sm leading-6">
            <caption className="sr-only">Requirements, ROSA evidence and {guide.supplier} documentation or questions to verify</caption>
            <thead><tr className="border-y border-border"><th scope="col" className="w-1/5 px-4 py-4 pl-0 font-semibold">Requirement</th><th scope="col" className="w-2/5 px-4 py-4 font-semibold">ROSA</th><th scope="col" className="w-2/5 px-4 py-4 pr-0 font-semibold">{guide.supplier}</th></tr></thead>
            <tbody>{guide.rows.map(row => <tr key={row.requirement} className="border-b border-border align-top"><th scope="row" className="px-4 py-5 pl-0 font-medium">{row.requirement}</th><td className="px-4 py-5 text-muted-foreground">{row.rosa}</td><td className="px-4 py-5 pr-0 text-muted-foreground">{row.supplier}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(180px,1fr)] lg:gap-16">
        <div className="min-w-0 max-w-3xl space-y-14">
          {guide.sections.map(section => <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className="scroll-mt-28 text-2xl font-semibold leading-snug [overflow-wrap:anywhere]">{section.title}</h2>
            <div className="mt-5 space-y-5 leading-7 text-muted-foreground">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            {section.bullets && <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-muted-foreground">{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>)}
        </div>
        <aside className="order-first min-w-0 border-t border-border pt-6 lg:sticky lg:top-28 lg:order-none">
          <nav aria-label="In this guide"><h2 className="text-sm font-semibold">In this guide</h2><ul className="mt-4 space-y-3 text-sm leading-6">{guide.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{section.title}</a></li>)}</ul></nav>
        </aside>
      </div>

      <section className="mt-20 max-w-3xl border-t border-border pt-10" aria-labelledby="recommendation">
        <h2 id="recommendation" className="text-2xl font-semibold">Evaluate ROSA for your club</h2>
        <p className="mt-5 leading-7 text-muted-foreground">{guide.recommendation}</p>
        <a href="/#contact" className="mt-6 inline-flex min-h-12 items-center gap-3 whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Request a club demo<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
      </section>
      <nav aria-label="Related guides" className="mt-16 max-w-3xl border-t border-border pt-8"><h2 className="text-sm font-semibold">Related comparisons</h2><ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4 text-sm">{comparisonGuides.filter(item => item.path !== guide.path).map(item => <li key={item.path}><a href={item.path} className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{item.title}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></li>)}</ul></nav>
    </article>
    <Footer />
  </main>;
}

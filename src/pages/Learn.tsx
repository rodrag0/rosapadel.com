import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/rosa/Navbar";
import Footer from "@/components/rosa/Footer";
import { comparisonGuides } from "@/lib/comparisonGuides";

export default function Learn() {
  return <main className="min-h-screen bg-background text-foreground" lang="en">
    <Navbar />
    <header className="container mx-auto px-6 pb-12 pt-36 lg:px-12">
      <p className="mb-5 text-sm text-muted-foreground">Review drafts · ROSA product team</p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight [overflow-wrap:anywhere] md:text-5xl">Choosing a padel court system</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Compare the match your club needs to run: scoring, video, review and events. These ROSA-published guides use supplier documentation and our demonstrated pilot workflows, not a hands-on test of every system.</p>
    </header>
    <section className="container mx-auto px-6 pb-24 lg:px-12" aria-label="Comparison guides">
      <div className="max-w-4xl divide-y divide-border border-y border-border">
        {comparisonGuides.map(guide => <a key={guide.path} href={guide.path} className="group grid min-w-0 gap-4 py-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0"><h2 className="text-2xl font-semibold [overflow-wrap:anywhere] group-hover:text-primary">{guide.title}</h2><p className="mt-2 text-muted-foreground">{guide.subtitle}</p><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{guide.description}</p></div>
          <ArrowUpRight className="h-5 w-5 text-primary" aria-hidden="true" />
        </a>)}
      </div>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">Copy and commercial claims are awaiting review. A question left open in these guides is unverified, not evidence that a supplier lacks a feature. Prices are not published.</p>
    </section>
    <Footer />
  </main>;
}

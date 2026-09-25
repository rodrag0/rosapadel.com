import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { experienceCopy } from "@/lib/experienceCopy";
import { productPresentation } from "@/lib/productScreens";
import { useLanguage } from "./LanguageProvider";
import AppScreenshot from "./AppScreenshot";

export default function EventApplications({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { language } = useLanguage();
  const copy = experienceCopy[language].events;
  const presentation = productPresentation[language];
  return (
    <Tabs
      defaultValue="tournaments"
      className={`event-applications ${compact ? "event-applications-compact" : ""}`}
    >
      <TabsList className="experience-tabs-list" aria-label={copy.formatLabel}>
        {copy.formats.map((format) => (
          <TabsTrigger key={format.id} value={format.id}>
            {format.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {copy.formats.map((format) => (
        <TabsContent
          key={format.id}
          value={format.id}
          className="event-application-panel"
        >
          <AppScreenshot
            screen={format.id as "tournaments" | "leagues" | "social"}
            responsive
          />
          <div className="event-application-copy">
            <div>
              <h3>{format.title}</h3>
              <p>{format.body}</p>
            </div>
            {compact ? (
              <a href={`/events#formats`} className="experience-text-link">
                {experienceCopy[language].eventsTeaser.cta}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ) : (
              <ul>
                {format.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      ))}
      {!compact && (
        <p className="experience-footnote">{presentation.integrationBody}</p>
      )}
    </Tabs>
  );
}

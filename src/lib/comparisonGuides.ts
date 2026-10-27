export type GuideSection = { id: string; title: string; paragraphs: string[]; bullets?: string[] };
export type ComparisonGuide = {
  path: string;
  title: string;
  subtitle: string;
  description: string;
  answer: string;
  supplier: string;
  supplierSummary: string;
  rows: { requirement: string; rosa: string; supplier: string }[];
  sections: GuideSection[];
  recommendation: string;
  sources: { label: string; url: string }[];
};

export const sourceCheckDate = "2026-10-27";
export const guideHubPath = "/learn";
export const comparisonGuides: ComparisonGuide[] = [
  {
    path: "/compare/rosa-vs-playsight",
    title: "ROSA vs PlaySight",
    subtitle: "Choosing a padel scoring and video system",
    description: "Compare ROSA and PlaySight by your club's scoring, camera, replay and event requirements, with supplier sources and a court demonstration checklist.",
    answer: "Start with the match your club needs to run. Evaluate rosa vision when court scoring, video review and event operations need to work together. Ask PlaySight to demonstrate its proposed camera configuration, particularly when several viewing angles are a requirement. A useful comparison is the same court scenario, not a longer feature list.",
    supplier: "PlaySight",
    supplierSummary: "PlaySight's product page describes connected and multi-angle cameras, automated livestream production and video replay/VAR. It lists Pro, Pro Lite and a mobile system. Which installation and functions apply to a padel court must be confirmed with the supplier.",
    rows: [
      { requirement: "Camera configuration", rosa: "Confirm the court geometry, installation and cameras in the rosa vision proposal.", supplier: "Multi-angle video is described. Request the specific padel configuration." },
      { requirement: "Score control", rosa: "Demonstrated player pad and referee control. Points are entered by a person.", supplier: "Ask to see score entry and corrections in the quoted configuration." },
      { requirement: "During-play review", rosa: "Demonstrated Live VAR/replay workflow, with a person reviewing the decision.", supplier: "Video replay/VAR is described. Test its operation during a padel match." },
      { requirement: "After the match", rosa: "Demonstrated replay, clips, saved sponsor presentation and a shared match workspace.", supplier: "Ask to see recording access, export rights and the output your club would receive." },
      { requirement: "Installation and service", rosa: "Scope hardware, enabled services, connectivity, support and event workflow separately.", supplier: "Request the same installation, support and recurring-service scope." },
    ],
    sections: [
      { id: "requirements", title: "Write the court requirements first", paragraphs: ["Daily self-service games, coaching sessions and referee-operated tournaments have different needs. List who starts the match, enters the score, handles a correction and opens a replay. Include the spectator experience if you want livestreaming.", "Separate a required camera angle from an attractive demonstration. Ask both suppliers to show the view and controls on a court like yours. The material reviewed here does not establish comparative installation quality or reliability."] },
      { id: "rosa-fit", title: "Where ROSA fits", paragraphs: ["ROSA's demonstrated pilot connects court score control with video, review and post-match use. It is worth evaluating when the scoreboard and the recording should belong to the same match, with the club's event and sponsor presentation considered in the setup.", "rosa portable is the scoring-focused hardware option. rosa vision is the connected-court product to discuss for video and review. rosa coach is a separate AI layer whose commercial availability must be confirmed; a processed pilot example does not make every analysis feature part of every package."] },
      { id: "demonstration", title: "Run one demonstration with both suppliers", paragraphs: ["Use the same short sequence rather than comparing two unrelated promotional videos."], bullets: ["Start a match as a player or referee, including any account or staff steps.", "Enter points and correct one. Check the court display and the recording's score.", "Review a disputed moment during play, then return to the match.", "Finish the session, open the replay and inspect a clip with the intended sponsor artwork.", "Ask which event connections, support and recovery behavior are included and demonstrated."] },
      { id: "limits", title: "What this comparison does not prove", paragraphs: ["This is ROSA-published documentary research, not a hands-on performance test of PlaySight. An unanswered question is unverified, not a missing feature. The ROSA sample shown here demonstrates its selected workflow, not autonomous point awards, certified line calling or frame-exact alignment across every older recording.", "No same-scope installed-price comparison is available here. Ask for equipment, installation, subscriptions, storage, exports and support over the same period. Do not assume that existing cameras or a booking system can be reused without checking the proposed integration."] },
    ],
    recommendation: "If connecting score control, review and club events is the priority, bring that match scenario to a ROSA demonstration. We can show the relevant workflow and scope a rosa vision setup for your courts. If a particular multi-angle production setup is essential, include it explicitly in both evaluations.",
    sources: [{ label: "PlaySight product descriptions", url: "https://www.playsight.tv/products" }],
  },
  {
    path: "/learn/matchi-tv-alternatives",
    title: "MATCHi TV alternatives",
    subtitle: "Compare the complete padel match workflow",
    description: "Evaluate MATCHi TV alternatives for your padel club using scoring, live review, replay, account access and event requirements, with official sources.",
    answer: "Consider an alternative when your club has a requirement its current setup does not meet, rather than switching for a feature count. ROSA is worth evaluating when score control, video review and event operations need to connect. If MATCHi TV already meets your club's needs, keeping that workflow may be the better decision.",
    supplier: "MATCHi TV",
    supplierSummary: "MATCHi's venue documentation describes streaming and recording, Studio for scheduling and management, Arena for venue screens and ads, and Coach for footage review. It also describes AI analysis after processing. MATCHi TV should not be reduced to a basic recorder in a comparison.",
    rows: [
      { requirement: "Starting the session", rosa: "Confirm player, referee and club setup in the proposed court workflow.", supplier: "Official help describes court QR and app scheduling. Venue configuration matters." },
      { requirement: "Court score control", rosa: "Demonstrated pad/referee entry and corrections linked to the match.", supplier: "Request the actual scoring controls and correction flow in your setup." },
      { requirement: "Live and later review", rosa: "Demonstrated Live VAR, replay and clips, subject to enabled services.", supplier: "Streaming, recordings and Coach are documented; test the required during-play review." },
      { requirement: "Club presentation", rosa: "Saved sponsor presentation has been demonstrated in the video workflow.", supplier: "Arena screens can show streams, highlights and ads. Confirm your output requirements." },
      { requirement: "Moving an existing setup", rosa: "Check equipment, accounts, booking connections and permissions individually.", supplier: "Confirm existing account/history access and venue entitlements before making a change." },
    ],
    sections: [
      { id: "reason-to-change", title: "Identify the reason to change", paragraphs: ["A coach reviewing footage may have different priorities from an organizer running several matches. Record the step that is missing or creates work today: score entry, a disputed-point review, access to footage, event operations or a particular export.", "Use that requirement to choose the shortlist. This guide is not a full survey of suppliers and does not claim that a feature absent from our research is unavailable elsewhere."] },
      { id: "existing-workflow", title: "Check what your venue already has", paragraphs: ["Ask the club operator to demonstrate the enabled recording, coaching and screen setup, including who pays and who can access each part. The player experience and the installed club service are not the same purchase.", "Do not assume that bookings, camera hardware, user accounts or archived recordings can move into another platform. Get a specific answer about each dependency before planning a migration. Shared sign-in within ROSA's own services does not establish a migration path from MATCHi."] },
      { id: "rosa-fit", title: "When to include ROSA", paragraphs: ["Include rosa vision when you want to evaluate court score control together with livestreaming, video review, replay and the club's events. Ask to see a player or referee enter a point, correct it and find that match afterwards.", "For a scoring-only requirement, discuss rosa portable rather than treating a video installation as necessary. Ask separately about rosa coach and enabled analysis services. Demonstrated pilot outputs and future commercial availability should not be mixed in a quote."] },
      { id: "checklist", title: "Questions for the demonstration", paragraphs: ["A useful demonstration answers the operational questions that will still matter after the installation."], bullets: ["Who starts and controls the match, and what happens when the score needs correcting?", "Can a player or referee review a moment during play without confusing it with post-match replay?", "What do spectators see, and which club/sponsor presentation is supported?", "Who can watch, share or export the recording, and what are the actual storage terms?", "Which booking and event connections are included, and which require separate work?"] },
      { id: "limits", title: "Compare terms as carefully as the video", paragraphs: ["This ROSA-published guide uses official documentation and our own demonstrated workflow. It is not a comparative field test or a claim that one supplier is universally more reliable. No customer migration story, ranking or price saving has been established here.", "Video review means a person examines the footage; it does not establish automatic line calling. Analysis also needs its own quality and availability checks. Do not buy a turnaround or accuracy promise that has not been supported for your installation."] },
    ],
    recommendation: "Bring the missing step in your current match workflow to a ROSA demonstration. If the requirement is connected scoring, review and event operations, we can evaluate a rosa vision setup against it. Keep the existing system if it already delivers the experience and terms your club needs.",
    sources: [
      { label: "MATCHi TV venue information", url: "https://matchi.zendesk.com/hc/en-gb/articles/14786430982429-MATCHi-TV-General-information" },
      { label: "MATCHi TV player scheduling", url: "https://matchiplayers.zendesk.com/hc/en-gb/articles/14786639125917-MATCHi-TV" },
    ],
  },
  {
    path: "/compare/rosa-vs-padel-camera",
    title: "ROSA vs padel.camera",
    subtitle: "Recording a match or connecting the court",
    description: "Compare ROSA and padel.camera by your club's recording, scoring, review and event requirements, with official sources and demonstrated ROSA evidence.",
    answer: "If self-service match recording is the main requirement, start by testing the complete recording and delivery experience. If you also need court scoring, live review and event operations, include rosa vision in the evaluation. Neither question is answered by camera resolution alone.",
    supplier: "padel.camera",
    supplierSummary: "padel.camera describes a QR-led recording flow, with full video, highlights, statistics and heatmaps delivered after play, plus a club dashboard. It is therefore not accurate to compare it as a camera without analysis. Installation and enabled services still need a scoped discussion.",
    rows: [
      { requirement: "Player start flow", rosa: "Demonstrate match setup, access and the controls needed at your court.", supplier: "The website describes QR-led self-service recording and emailed delivery." },
      { requirement: "Score entry and corrections", rosa: "Demonstrated court pads and authorized referee control; people enter points.", supplier: "Ask to see how the score is entered and corrected in the proposed service." },
      { requirement: "During-play review", rosa: "Demonstrated Live VAR/replay workflow with a person making the call.", supplier: "Test your live-review requirement; post-match delivery does not answer it." },
      { requirement: "Post-match analysis", rosa: "Pilot tracking, statistics and heatmaps have been delivered; confirm enabled services and limits.", supplier: "Statistics, heatmaps and highlights are described. Request representative outputs." },
      { requirement: "Storage and output", rosa: "Confirm ordinary customer retention, access and export terms for the quote.", supplier: "Confirm current plan-level storage, download and sharing terms." },
    ],
    sections: [
      { id: "recording-first", title: "Start with the recording job", paragraphs: ["A recording-first club needs a straightforward start, usable footage and clear delivery. Test the actual player journey, including account or email steps, who can watch the video and what happens when a player cannot find it.", "Check the view on a court like yours. The available material does not establish comparative video quality, operating reliability or local installation support. A resolution label cannot replace a representative match recording."] },
      { id: "connected-court", title: "When the score is part of the requirement", paragraphs: ["ROSA's demonstrated connected-court workflow includes score entry/display, livestreaming, review, clips and sponsor presentation. Include rosa vision when those parts should be evaluated as one match workflow, with the club's event operations considered in the proposal.", "A person enters or controls the score. The system should not be presented as independently awarding every point. For a club that only needs a portable LED scoreboard, rosa portable is the relevant hardware discussion; camera and analysis requirements should not be assumed."] },
      { id: "analysis", title: "Ask what the analysis actually measures", paragraphs: ["Use a real match example when evaluating statistics, highlights or heatmaps. Ask how the court is calibrated, how player identities are assigned and what missing tracking data does to the result.", "ROSA's pilot outputs do not establish universal accuracy, radar-validated ball speed or a guaranteed processing time. rosa coach is a separate AI layer whose availability must be confirmed. Apply the same quality questions to any supplier's analysis, without assuming that different labels describe equivalent measurements."] },
      { id: "terms", title: "Compare a normal club plan", paragraphs: ["Request the same court count and operating period in both quotes. Separate hardware, installation, services, storage, exports and support. No approved same-scope prices are available in this guide.", "The retained ROSA showcase shown here is a special public demonstration, not a standard storage promise or an athlete endorsement. Compare ordinary customer terms on both sides, including what happens when access ends or a recording expires."] },
      { id: "demonstration", title: "A short court test", paragraphs: ["Test the functions your club expects to use, not just a supplier's best highlight."], bullets: ["Start a session and check the required player/staff steps.", "Enter points, correct one and inspect the court display and replay.", "Review a moment during play if that is a requirement.", "Finish the session and inspect recording access, a clip and any sponsor presentation.", "Discuss enabled event connections, support and ordinary retention before choosing a plan."] },
    ],
    recommendation: "Evaluate rosa vision when your club needs score control, review and event operations alongside recording. Bring that scenario to a ROSA demonstration and request a scoped setup. If recording and delivery are the entire requirement, assess that experience and its normal terms before adding a larger installation.",
    sources: [{ label: "padel.camera product and workflow information", url: "https://www.padel.camera/" }],
  },
];

export const reviewGuidePaths = [guideHubPath, ...comparisonGuides.map(guide => guide.path)];

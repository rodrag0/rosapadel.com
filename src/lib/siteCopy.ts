// Keep keys in this shared copy map aligned across all three languages; detail pages also contain local copy.
export type Language = "en" | "es" | "de";

export const languageOptions: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "de", label: "DE" },
];

export const siteCopy = {
  en: {
    meta: {
      homeTitle: "Rosa padel | Smart Courts for Every Club",
      homeDescription:
        "Professional scoring, instant replay, and match analytics for clubs, players, and tournaments.",
      imprintTitle: "Rosa padel | Imprint",
      privacyTitle: "Rosa padel | Privacy Policy",
      cookiesTitle: "Rosa padel | Cookie Policy",
    },
    nav: {
      products: "Products",
      howItWorks: "How It Works",
      contact: "Contact",
      bookDemo: "Book a Demo",
      languageLabel: "Language",
      toggleTheme: "Toggle theme",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      forClubs: "For Clubs",
      forInvestors: "For Investors",
      newTab: "Tournaments"
    },
    hero: {
      headlines: [
        { prefix: "The ", accent: "Pro", suffix: " Experience.", secondLine: "Any Court." },
        { prefix: "The ", accent: "Smartest", suffix: " Court", secondLine: "On Earth." },
      ],
      subtitle:
        "Live scoreboards, VAR, instant replays and analytics that grow your club and elevate every match.",
      primaryCta: "Book a Demo",
      secondaryCta: "See Products",
      badges: ["Live Scoring", "Instant Replay", "Match Analytics"],
    },
    problemSolution: {
      gapLabel: "The Gap",
      gapTitle: "Basic scoring apps can't keep up. Pro systems cost a fortune.",
      gapBody:
        "Clubs choose between basic apps and expensive pro systems. Players lack analytics, while clubs and tournaments stay limited.",
      solutionLabel: "Rosa fills it",
      solutionTitle: "A modular smart padel court system that works on any budget.",
      solutionBody:
        "Start with LED scoring and scale to HD replay and AI analytics.",
      stats: [
        { label: "Live Scoring", desc: "Real-time score on court for every point" },
        { label: "Video Output", desc: "Full match video with score overlay and set stats" },
        { label: "Match Insights", desc: "Heatmaps, shot breakdown, and player analytics" },
      ],
    },
    products: {
      label: "Modular Products",
      title: "One System. Three Tiers.",
      subtitle: "Start where you are. Scale when you're ready. Every tier is built to work independently or together.",
      popular: "Popular",
      items: [
        {
          tier: "Entry",
          name: "Core LED",
          description:
            "Portable LED scoring with touchpad control and plug-and-play setup.",
          features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play"],
        },
        {
          tier: "Growth",
          name: "Core HD",
          description:
            "HD display with QR/web setup, referee mode, and event branding.",
          features: ["HD Monitor Display", "QR/Web Setup", "Referee Mode", "Custom Branding", "Event Management", "Cloud Sync"],
        },
        {
          tier: "Advanced",
          name: "Rosa Vision",
          status: "Planned ecosystem",
          description:
            "Planned camera layer for replay, match history, and player insights.",
          features: ["Everything in Core HD", "Camera-Integrated Replay", "Match Highlights + Shot Classification", "Player History", "Club Screens", "Post-Match Insights", "Vision Roadmap Layer"],
          note: "Built to extend Rosa from live scoring into replay, review, and retention.",
        },
      ],
    },
    howItWorks: {
      label: "How It Works",
      title: "Three Steps to Smart",
      steps: [
        {
          num: "01",
          title: "Deploy on Court",
          description:
            "Core LED is plug-and-play and installs quickly. HD and Vision require a monitor and power connection.",
        },
        {
          num: "02",
          title: "Run Live Matches",
          description:
            "Players see live scores, spectators stay informed, and tournaments run smoothly.",
        },
        {
          num: "03",
          title: "Review & Improve",
          description:
            "Review replays, heatmaps, shot analytics, and match summaries.",
        },
      ],
    },
    playerExperience: {
      label: "Player Experience",
      title: "Every match tells a story.",
      accent: "Rosa",
      titleSuffix: " captures it.",
      status: "Vision roadmap",
      demoCtaLabel: "Open Vision Coach Demo",
      demoCtaHint: "Explore the mockup for shot ratings and shot-type filters.",
      body:
        "Rosa Vision turns live matches into replays, insights, and shareable moments.",
      features: [
        { label: "Instant Replay", desc: "Review key points from the match" },
        { label: "Match Flow", desc: "Review momentum and key swings" },
        { label: "Player Insights", desc: "Track patterns and post-match summaries" },
        { label: "Shareable Clips", desc: "Save key points and match recaps" },
      ],
      mockup: {
        liveMatch: "Live Match",
        tabs: ["Match", "Set 1", "Set 2", "Set 3"],
        teamStats: ["Points Won", "Winners", "Unforced Errors", "Break Points"],
        shotBreakdown: "Shot Breakdown",
        courtHeatmap: "Court Heatmap",
        rallyAverage: "Rally avg",
        lastRally: "Last",
        longestRally: "Longest",
        lastTenPoints: "Last 10 Points",
        highlights: "Match Highlights + Shot Classification",
      },
    },
    visionEcosystem: {
      label: "Rosa Vision",
      title: "From Court to Clubhouse.",
      body:
        "Rosa Vision connects live play, replay, player history, and club screens.",
      status: "Planned ecosystem",
      playerTitle: "For players",
      playerBody:
        "Keep players engaged after the match ends.",
      playerItems: [
        { title: "Capture the match", desc: "Record the session with Rosa scoring and HD output." },
        { title: "Replay key moments", desc: "Review key rallies, points, and patterns." },
        { title: "Build match history", desc: "Archive videos, clips, and match summaries." },
        { title: "Share the best points", desc: "Share clips and recaps beyond the court." },
      ],
      clubTitle: "For clubs",
      clubBody:
        "Create a stronger venue experience and retention loop.",
      clubItems: [
        { title: "Club screens", desc: "Show live matches and replays across the venue." },
        { title: "Member retention", desc: "Encourage players to return and book again." },
        { title: "Content inventory", desc: "Create clips and recaps for promotion and events." },
        { title: "System continuity", desc: "Extend Rosa without replacing live scoring." },
      ],
      footerTitle: "Built as an extension of the Rosa stack",
      footerBody:
        "Vision builds on Rosa scoring and HD output for replay, content, and insights.",
    },
    tournaments: {
      label: "Tournaments & Events",
      title: "Run Events Without the Chaos.",
      futureLabel: "Vision expansion",
      body:
        "Rosa gives organizers a live view of every court, match, and assignment.",
      benefits: [
        {
          title: "Court Status Board",
          desc: "See every court status on club screens or your device.",
        },
        {
          title: "Smart Court Allocation",
          desc: "Assign matches to courts from one screen.",
        },
        {
          title: "ETA & Wait Times",
          desc: "Show estimated wait times based on match progress.",
        },
        {
          title: "Live Draw on Club Screens",
          desc: "Display live brackets and court assignments across Rosa screens.",
        },
      ],
      highlightTitle: "Replay and Screen Output",
      highlightBody:
        "Rosa Vision adds replay, shareable clips, and venue content to tournaments.",
    },
    clubRoi: {
      label: "Club ROI",
      title: "Designed for Padel Players. Built for Clubs.",
      body:
        "Improve player engagement, operations, and revenue opportunities.",
      metrics: [
        {
          value: "Up",
          label: "Player Retention",
          desc: "Encourage rebooking and longer engagement",
        },
        {
          value: "Pro",
          label: "Match Experience",
          desc: "Live scoring, replays, and stats for every match",
        },
        {
          value: "3+",
          label: "New Revenue Streams",
          desc: "Sponsorships, analytics, and premium events",
        },
      ],
    },
    partners: {
      label: "Backed By",
      body: "Building the future of padel",
    },
    contact: {
      title: "Upgrade Your ",
      accent: "Facility",
      body:
        "See Rosa in action and find the right tier for your club.",
      successTitle: "We'll be in touch!",
      successBody: "Thanks for your interest. Our team will reach out shortly.",
      fields: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@club.com",
        organization: "Club / Organization",
        organizationPlaceholder: "Your club or organization name",
        objective: "What are you looking for?",
        objectivePlaceholder: "Select an option",
      },
      objectives: {
        scoring: "Automated Scoring",
        tournaments: "Tournament Experience",
        analytics: "Player Analytics & Replay",
        full: "Full Smart Court Setup",
        other: "Other",
      },
      consentPrefix: "I agree to the processing of my data as outlined in the ",
      consentLink: "Privacy Policy",
      consentSuffix: ".",
      submit: "Book a Demo",
      submitting: "Submitting...",
      validation: {
        nameRequired: "Name is required",
        emailInvalid: "Invalid email address",
      },
      messages: {
        genericError: "Something went wrong. Please try again.",
        success: "Thanks! We'll be in touch soon.",
      },
    },
    footer: {
      tagline: "The pro experience. Any court.",
      productsTitle: "Products",
      companyTitle: "Company",
      legalTitle: "Legal",
      companyLinks: {
        home: "Home",
        howItWorks: "How It Works",
        contact: "Contact",
      },
      legalLinks: {
        privacy: "Privacy Policy",
        imprint: "Imprint",
        cookies: "Cookie Policy",
      },
      rights: "All rights reserved.",
      social: {
        linkedin: "LinkedIn",
        instagram: "Instagram",
      },
    },
    legal: {
      backHome: "Back to Home",
      lastUpdatedPrefix: "Last updated",
      introNote:
        "This page reflects the current website setup and should be reviewed against your final legal and operational setup before production use.",
      imprint: {
        title: "Imprint",
        description: "Provider information and mandatory disclosures for the Rosa padel website.",
        sections: {
          providerTitle: "Provider Information",
          providerRows: [
            ["Brand / Website", "Rosa padel"],
            ["Represented by", "Rodrigo Ponce"],
            ["Address", "Bildungscampus 1, 74076 Heilbronn, Germany"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Phone", "+49 15730721287"],
          ],
          registerTitle: "Register and VAT",
          registerBody:
            "Commercial register details and VAT ID should be added here once the final company registration data is confirmed.",
          contentTitle: "Responsible for Content",
          contentBody:
            "Responsible for editorial content under Section 18 MStV: Rodrigo Ponce, Bildungscampus 1, 74076 Heilbronn, Germany.",
          disputeTitle: "Consumer Dispute Resolution",
          disputeBody:
            "Rosa padel is neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board unless legally required. The former EU Online Dispute Resolution platform was discontinued on July 20, 2025.",
        },
      },
      privacy: {
        title: "Privacy Policy",
        description: "Information on how personal data is processed on the Rosa padel website.",
        sections: {
          controllerTitle: "1. Controller",
          controllerRows: [
            ["Controller", "Rosa padel, represented by Rodrigo Ponce"],
            ["Address", "Bildungscampus 1, 74076 Heilbronn, Germany"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Data Protection Officer", "No data protection officer has been appointed unless legally required."],
          ],
          dataTitle: "2. Data We Process",
          dataList: [
            "Contact form data such as name, email address, organization, and selected objective.",
            "Technical connection data that may appear in server or hosting logs, such as IP address, request time, and user agent.",
            "Functional browser storage entries for theme and language preferences.",
          ],
          purposesTitle: "3. Purposes and Legal Bases",
          purposesTable: {
            headers: ["Purpose", "Legal basis"],
            rows: [
              ["Responding to demo or contact requests", "Art. 6(1)(b) GDPR and, where applicable, Art. 6(1)(a) GDPR"],
              ["Operating and securing the website", "Art. 6(1)(f) GDPR"],
              ["Saving language and theme preferences", "Art. 6(1)(f) GDPR"],
            ],
          },
          processorsTitle: "4. Processors and Third-Party Services",
          processorsBody:
            "Contact requests are currently submitted via FormSubmit. Review processor terms, processing locations, and any required data processing agreements before relying on this setup in production.",
          transfersTitle: "5. International Transfers",
          transfersBody:
            "If personal data is transferred outside the EEA, the applicable transfer mechanism and safeguards should be documented here, such as adequacy decisions or standard contractual clauses.",
          retentionTitle: "6. Retention",
          retentionBody:
            "Contact requests should only be stored for as long as needed to process the inquiry and any resulting business communication, unless longer retention is required by law.",
          rightsTitle: "7. Your Rights",
          rightsBody:
            "Data subjects may have rights of access, rectification, erasure, restriction, objection, data portability, and complaint to a competent supervisory authority.",
          contactTitle: "8. Privacy Contact",
          contactBody: "For privacy-related requests, contact rodrigo@rosapadel.com.",
        },
      },
      cookies: {
        title: "Cookie Policy",
        description: "Information on cookies and local storage used by the Rosa padel website.",
        sections: {
          storageTitle: "Storage Currently in Use",
          storageTable: {
            headers: ["Key", "Type", "Purpose", "Duration"],
            rows: [
              ["rosa-theme", "localStorage", "Stores the selected light or dark theme.", "Until manually cleared"],
              ["rosa-theme-manual", "localStorage", "Stores whether the user manually changed the theme.", "Until manually cleared"],
              ["rosa-language", "localStorage", "Stores the selected site language.", "Until manually cleared"],
            ],
          },
          analyticsTitle: "No Non-Essential Tracking by Default",
          analyticsBody:
            "The current implementation does not intentionally set analytics or marketing cookies by default. If tracking tools are added later, this page and the consent logic should be updated before release.",
          manageTitle: "How Users Can Manage Storage",
          manageBody:
            "Users can clear cookies and local storage through their browser settings at any time. If non-essential tracking is introduced in the future, a visible cookie-settings control should also be added.",
        },
      },
    },
    productFamily: {
      label: "The Rosa Ecosystem",
      title: "One system. Every court.",
      subtitle: "Two connected products, from basic scoring to match replay and analytics.",
      carouselHint: "Swipe products",
      viewProduct: "View product",
      items: [
        {
          num: "01",
          tier: "Advanced",
          name: "Rosa Vision",
          tagline: "Replay. Analyze. Share.",
          status: "Pre-sale",
          statusType: "available",
          href: "/products/vision",
          features: ["Camera Integration", "Instant Replay", "Court Heatmaps", "Player History"],
        },
        {
          num: "02",
          tier: "Entry",
          name: "Core LED",
          tagline: "Plug in. Score on.",
          status: "Production ready",
          statusType: "available",
          href: "/products/core-led",
          features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play"],
        },
      ],
    },
    audiencePortals: {
      label: "Built for your game",
      title: "Who is Rosa for?",
      items: [
        {
          id: "players",
          title: "Players",
          desc: "Track your stats, replay your best moments, and improve with every match.",
          cta: "Explore Player Features",
          href: "/#how-it-works",
        },
        {
          id: "clubs",
          title: "Clubs & Venues",
          desc: "Retain more members, run smoother tournaments, and unlock new revenue streams.",
          cta: "See Club ROI",
          href: "/for-clubs",
        },
        {
          id: "investors",
          title: "Investors",
          desc: "Hardware-led court intelligence at the intersection of padel's global boom.",
          cta: "View Investor Overview",
          href: "/investors",
        },
      ],
    },
    gameModes: {
      label: "Scoreboards",
      title: "Game Modes",
      description:
        "Choose the format that best fits your match and keep track of the score.",

      items: [
        {
          id: "normal",
          title: "NORMAL",
          desc:
            "A best-of-3 sets match. The player or team that wins 2 sets wins the match.",
        },

        {
          id: "quick-match",
          title: "QUICK MATCH",
          desc:
            "Two sets are played. If the score is tied 1–1, a third set is played as a 10-point sudden death.",
        },

        {
          id: "league-mode",
          title: "LEAGUE MODE",
          desc:
            "Four players compete across 3 rounds. Each player partners with the others and accumulates points. The player with the most points at the end wins.",

          rounds: [
            "R1: J1 + J4 vs J2 + J3",
            "R2: J1 + J3 vs J2 + J4",
            "R3: J1 + J2 vs J3 + J4",
          ],
        },

        {
          id: "americana",
          title: "AMERICANA",
          desc:
            "The match is played until a predefined number of points is reached or for a set amount of time. For example, players can set a 10-point target or use a timer.",
        },
      ],
    },
    roiCalculator: {
      label: "Club ROI",
      title: "Estimated Club Upside",
      subtitle: "Estimate the extra revenue Rosa can help your club create.",
      courtLabel: "Number of courts",
      bookingsLabel: "Average bookings per court / month",
      priceLabel: "Average booking price (€)",
      monthlyLabel: "Potential added club revenue per month",
      numberContext: "This is estimated upside for your club, not Rosa pricing.",
      annualPrefix: "≈",
      annualSuffix: "additional club revenue per year",
      streamsTitle: "Where the upside comes from",
      streams: [
        "Sponsorship displays on court screens",
        "Analytics subscription revenue",
        "Premium match recording packages",
        "Tournament content and highlights",
      ],
      disclaimer: "Estimate reflects booking uplift only and excludes sponsorship, content, or other complementary income. Actual results vary by club.",
      cta: "Get Rosa now",
    },
    notFound: {
      title: "404",
      body: "Oops! Page not found",
      cta: "Return to Home",
    },
  },
  es: {
    meta: {
      homeTitle: "Rosa padel | Pistas inteligentes para cada club",
      homeDescription:
        "Marcador profesional, VAR, repetición instantánea y analítica de partido para clubes, jugadores y torneos de pádel.",
      imprintTitle: "Rosa padel | Aviso legal",
      privacyTitle: "Rosa padel | Política de privacidad",
      cookiesTitle: "Rosa padel | Política de cookies",
    },
    nav: {
      products: "Productos",
      howItWorks: "Cómo funciona",
      contact: "Contacto",
      bookDemo: "Reservar demo",
      languageLabel: "Idioma",
      toggleTheme: "Cambiar tema",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      forClubs: "Para clubes",
      forInvestors: "Para inversores",
    },
    hero: {
      headlines: [
        { prefix: "La experiencia ", accent: "Pro", suffix: ".", secondLine: "En cualquier pista." },
        { prefix: "La pista más ", accent: "inteligente", suffix: "", secondLine: "del planeta." },
      ],
      subtitle:
        "Marcador profesional, repetición instantánea y analítica de partido, pensado para jugadores y construido para cualquier pista.",
      primaryCta: "Reservar demo",
      secondaryCta: "Ver productos",
      badges: ["Marcador en vivo", "Repetición instantánea", "Analítica de partido"],
    },
    problemSolution: {
      gapLabel: "La brecha",
      gapTitle: "Las apps básicas de marcador no dan la talla. Los sistemas pro cuestan demasiado.",
      gapBody:
        "Los clubes de pádel se ven obligados a elegir entre apps gratuitas poco fiables y montajes de calidad broadcast demasiado caros. Los jugadores no reciben analítica. Los clubes pierden ingresos. Los torneos siguen siendo manuales.",
      solutionLabel: "Rosa lo cubre",
      solutionTitle: "Un sistema modular de pista inteligente que funciona con cualquier presupuesto.",
      solutionBody:
        "Empieza con marcador LED y escala a replay HD y analítica visual con IA. Cada nivel está pensado para dar una experiencia profesional desde el primer partido.",
      stats: [
        { label: "Marcador en vivo", desc: "Puntuación en tiempo real en pista para cada punto" },
        { label: "Salida de vídeo", desc: "Vídeo completo del partido con marcador y estadísticas por set" },
        { label: "Insights del partido", desc: "Mapas de calor, desglose de golpes y analítica por jugador" },
      ],
    },
    products: {
      label: "Productos modulares",
      title: "Un sistema. Tres niveles.",
      subtitle: "Empieza donde estás. Escala cuando quieras. Cada nivel funciona por separado o en conjunto.",
      popular: "Popular",
      items: [
        {
          tier: "Entrada",
          name: "Core LED",
          description:
            "Marcador LED portátil para cualquier pista. Control por touchpad, funcionamiento offline e instalación plug and play.",
          features: ["Marcador LED", "Control por touchpad", "Modo offline", "Plug and play"],
        },
        {
          tier: "Crecimiento",
          name: "Core HD",
          description:
            "Pantalla HD con configuración del partido por QR o web, modo árbitro y capacidades premium de branding para eventos.",
          features: ["Pantalla HD", "Configuración QR/Web", "Modo árbitro", "Branding personalizado", "Gestión de eventos", "Sincronización en la nube"],
        },
        {
          tier: "Avanzado",
          name: "Rosa Vision",
          status: "Ecosistema planificado",
          description:
            "La capa planificada que integra cámaras para replay, historial de partidos e insights de jugador dentro del sistema completo de Rosa.",
          features: ["Todo lo de Core HD", "Replay con cámaras integradas", "Highlights del partido + clasificacion de golpes", "Historial del jugador", "Pantallas del club", "Insights postpartido", "Capa roadmap Vision"],
          note: "Pensado para ampliar Rosa desde el marcador en vivo hacia replay, revisión y retención.",
        },
      ],
    },
    howItWorks: {
      label: "Cómo funciona",
      title: "Tres pasos hacia una pista inteligente",
      steps: [
        {
          num: "01",
          title: "Despliega en pista",
          description:
            "Core LED es plug and play y se instala en cualquier pista de pádel en menos de un minuto. HD y Vision también tienen una instalación muy rápida y sencilla, y solo requieren un monitor y alimentación eléctrica.",
        },
        {
          num: "02",
          title: "Juega partidos en vivo",
          description:
            "Los jugadores ven la puntuación en tiempo real. Los espectadores tienen visibilidad clara. Los torneos funcionan sin interrupciones.",
        },
        {
          num: "03",
          title: "Revisa y mejora",
          description:
            "Accede a replay instantáneo, mapas de calor, analítica de golpes y resúmenes de partido. Comparte highlights con clasificacion de golpes al instante.",
        },
      ],
    },
    playerExperience: {
      label: "Experiencia del jugador",
      title: "Cada partido cuenta una historia.",
      accent: "Rosa",
      titleSuffix: " la captura.",
      status: "Roadmap Vision",
      demoCtaLabel: "Abrir demo de Vision Coach",
      demoCtaHint: "Explora el mockup de ratings de golpes y filtros por tipo de golpe.",
      body:
        "Los jugadores pasan del seguimiento en vivo al replay, la revisión y los momentos compartibles. Rosa Vision está pensado para convertir cada partido en algo que puedas revisar, entender y comentar después de salir de la pista.",
      features: [
        { label: "Repetición instantánea", desc: "Vuelve a los puntos que cambiaron el partido" },
        { label: "Flujo del partido", desc: "Revisa contexto de marcador, momentum y momentos clave" },
        { label: "Insights del jugador", desc: "Sigue patrones, tendencias y resúmenes postpartido" },
        { label: "Clips compartibles", desc: "Guarda puntos destacados y envía recapitulaciones" },
      ],
      mockup: {
        liveMatch: "Partido en vivo",
        tabs: ["Partido", "Set 1", "Set 2", "Set 3"],
        teamStats: ["Puntos ganados", "Golpes ganadores", "Errores no forzados", "Bolas de break"],
        shotBreakdown: "Desglose de golpes",
        courtHeatmap: "Mapa de calor",
        rallyAverage: "Prom. rally",
        lastRally: "Último",
        longestRally: "Más largo",
        lastTenPoints: "Últimos 10 puntos",
        highlights: "Highlights del partido + clasificacion de golpes",
      },
    },
    visionEcosystem: {
      label: "Rosa Vision",
      title: "De la pista al club.",
      body:
        "Rosa Vision es la capa planificada que integra cámaras para conectar juego en vivo, replay, historial del jugador y pantallas del club en un solo sistema.",
      status: "Ecosistema planificado",
      playerTitle: "Para jugadores",
      playerBody:
        "Convierte un partido en un bucle repetible que mantiene a los jugadores conectados después de salir de la pista.",
      playerItems: [
        { title: "Captura el partido", desc: "Graba la sesión completa sobre el marcador y la salida HD de Rosa." },
        { title: "Revisa momentos clave", desc: "Vuelve a rallies, puntos y patrones que marcaron el partido." },
        { title: "Crea historial", desc: "Genera un archivo personal de vídeos, clips y resúmenes postpartido." },
        { title: "Comparte los mejores puntos", desc: "Envía clips y recapitulaciones que alargan la vida del partido." },
      ],
      clubTitle: "Para clubes",
      clubBody:
        "Usa la misma capa de partido para crear una experiencia premium de sede y un mejor bucle de retención.",
      clubItems: [
        { title: "Pantallas del club", desc: "Convierte partidos en vivo y replays en contenido para toda la instalación." },
        { title: "Retención de socios", desc: "Da más razones para volver, comparar y reservar otra vez." },
        { title: "Inventario de contenido", desc: "Genera clips y resúmenes para promoción, sponsors y eventos." },
        { title: "Continuidad del sistema", desc: "Amplía el stack de Rosa sin reemplazar el flujo de marcador en vivo." },
      ],
      footerTitle: "Construido como extensión del stack de Rosa",
      footerBody:
        "Vision está pensado para apoyarse sobre el scoring y la salida HD de Rosa, de modo que los clubes crezcan desde la operación en vivo hacia replay, contenido e insights sin cambiar el resto de su setup.",
    },
    tournaments: {
      label: "Torneos y eventos",
      title: "Gestiona eventos como los profesionales",
      futureLabel: "Expansión Vision",
      body:
        "Desde torneos locales de pádel hasta eventos premium, Rosa se ocupa hoy de la experiencia en vivo mientras Rosa Vision amplía el sistema con replay, highlights y contenido preparado para pantallas.",
      benefits: [
        {
          title: "Visibilidad en pista",
          desc: "Marcadores en tiempo real visibles en pista y en remoto. Espectadores y organizadores siempre saben el estado del partido.",
        },
        {
          title: "Experiencia preparada para Vision",
          desc: "Cada partido puede crecer desde el marcador en vivo hacia replay, generación de clips y revisión postpartido para jugadores y espectadores.",
        },
        {
          title: "Contenido postpartido",
          desc: "Los jugadores reciben momentos compartibles. Los organizadores consiguen contenido para redes, pantallas del club y promoción del evento.",
        },
        {
          title: "Preparado para varias pistas",
          desc: "Escala de una sola pista a eventos de todo el recinto. Cada pista funciona de forma independiente con Rosa Vision.",
        },
      ],
      highlightTitle: "Replay y salida para pantallas",
      highlightBody:
        "Rosa Vision está pensado para añadir replay listo para revisar, clips compartibles y momentos para pantallas del recinto sobre la capa de scoring en vivo de Rosa sin sustituir las herramientas de gestión del torneo.",
    },
    clubRoi: {
      label: "ROI para clubes",
      title: "Diseñado para jugadores de pádel. Construido para clubes.",
      body:
        "Rosa mejora la experiencia del jugador mientras ayuda al club a crecer. Mejor engagement, operaciones más fluidas y nuevas oportunidades de ingresos.",
      metrics: [
        {
          value: "Más",
          label: "Retención de jugadores",
          desc: "Las pistas inteligentes impulsan más reservas repetidas y una mayor vinculación del jugador",
        },
        {
          value: "Pro",
          label: "Experiencia de partido",
          desc: "Marcador en vivo, replays y estadísticas que elevan cada partido de torneo",
        },
        {
          value: "3+",
          label: "Nuevas vías de ingreso",
          desc: "Pantallas patrocinadas, suscripciones de analítica y eventos premium",
        },
      ],
    },
    partners: {
      label: "Con el respaldo de",
      body: "Construyendo el futuro del pádel",
    },
    contact: {
      title: "Mejora tu ",
      accent: "instalación",
      body:
        "Ponte en contacto para ver Rosa en acción. Te guiaremos hacia el nivel adecuado para tu club.",
      successTitle: "Nos pondremos en contacto",
      successBody: "Gracias por tu interés. Nuestro equipo te escribirá pronto.",
      fields: {
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Email",
        emailPlaceholder: "tu@club.com",
        organization: "Club / Organización",
        organizationPlaceholder: "Nombre de tu club u organización",
        objective: "¿Qué estás buscando?",
        objectivePlaceholder: "Selecciona una opción",
      },
      objectives: {
        scoring: "Marcador automatizado",
        tournaments: "Experiencia para torneos",
        analytics: "Analítica y replay",
        full: "Configuración completa de pista inteligente",
        other: "Otro",
      },
      consentPrefix: "Acepto el tratamiento de mis datos según la ",
      consentLink: "Política de privacidad",
      consentSuffix: ".",
      submit: "Reservar demo",
      submitting: "Enviando...",
      validation: {
        nameRequired: "El nombre es obligatorio",
        emailInvalid: "Dirección de correo no válida",
      },
      messages: {
        genericError: "Algo salió mal. Inténtalo de nuevo.",
        success: "Gracias. Nos pondremos en contacto pronto.",
      },
    },
    footer: {
      tagline: "La experiencia pro. En cualquier pista.",
      productsTitle: "Productos",
      companyTitle: "Empresa",
      legalTitle: "Legal",
      companyLinks: {
        home: "Inicio",
        howItWorks: "Cómo funciona",
        contact: "Contacto",
      },
      legalLinks: {
        privacy: "Política de privacidad",
        imprint: "Aviso legal",
        cookies: "Política de cookies",
      },
      rights: "Todos los derechos reservados.",
      social: {
        linkedin: "LinkedIn",
        instagram: "Instagram",
      },
    },
    legal: {
      backHome: "Volver al inicio",
      lastUpdatedPrefix: "Última actualización",
      introNote:
        "Esta página refleja la configuración actual del sitio y debería revisarse con la estructura legal y operativa final antes de usarla en producción.",
      imprint: {
        title: "Aviso legal",
        description: "Información del proveedor y datos obligatorios del sitio web de Rosa padel.",
        sections: {
          providerTitle: "Información del proveedor",
          providerRows: [
            ["Marca / sitio web", "Rosa padel"],
            ["Representado por", "Rodrigo Ponce"],
            ["Dirección", "Bildungscampus 1, 74076 Heilbronn, Alemania"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Teléfono", "+49 15730721287"],
          ],
          registerTitle: "Registro e IVA",
          registerBody:
            "Los datos del registro mercantil y el NIF intracomunitario deberían añadirse aquí una vez confirmados los datos finales de la empresa.",
          contentTitle: "Responsable del contenido",
          contentBody:
            "Responsable editorial según la Sección 18 MStV: Rodrigo Ponce, Bildungscampus 1, 74076 Heilbronn, Alemania.",
          disputeTitle: "Resolución de litigios de consumo",
          disputeBody:
            "Rosa padel no está dispuesto ni obligado a participar en procedimientos de arbitraje ante una junta arbitral de consumo salvo obligación legal. La antigua plataforma europea de resolución online de litigios fue discontinuada el 20 de julio de 2025.",
        },
      },
      privacy: {
        title: "Política de privacidad",
        description: "Información sobre cómo se procesan los datos personales en el sitio web de Rosa padel.",
        sections: {
          controllerTitle: "1. Responsable",
          controllerRows: [
            ["Responsable", "Rosa padel, representado por Rodrigo Ponce"],
            ["Dirección", "Bildungscampus 1, 74076 Heilbronn, Alemania"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Delegado de protección de datos", "No se ha designado delegado salvo obligación legal."],
          ],
          dataTitle: "2. Datos que tratamos",
          dataList: [
            "Datos del formulario de contacto como nombre, email, organización y objetivo seleccionado.",
            "Datos técnicos de conexión que pueden aparecer en logs del servidor o del hosting, como IP, hora de la solicitud y agente de usuario.",
            "Entradas funcionales de almacenamiento del navegador para idioma y tema.",
          ],
          purposesTitle: "3. Finalidades y bases legales",
          purposesTable: {
            headers: ["Finalidad", "Base legal"],
            rows: [
              ["Responder a solicitudes de demo o contacto", "Art. 6(1)(b) RGPD y, cuando aplique, Art. 6(1)(a) RGPD"],
              ["Operar y asegurar el sitio web", "Art. 6(1)(f) RGPD"],
              ["Guardar preferencias de idioma y tema", "Art. 6(1)(f) RGPD"],
            ],
          },
          processorsTitle: "4. Encargados y servicios de terceros",
          processorsBody:
            "Actualmente las solicitudes de contacto se envían a través de FormSubmit. Antes de depender de esta configuración en producción, revisa las condiciones del proveedor, los lugares de tratamiento y cualquier contrato de encargo necesario.",
          transfersTitle: "5. Transferencias internacionales",
          transfersBody:
            "Si se transfieren datos personales fuera del EEE, aquí debería documentarse el mecanismo de transferencia y sus salvaguardas, como decisiones de adecuación o cláusulas contractuales tipo.",
          retentionTitle: "6. Conservación",
          retentionBody:
            "Las solicitudes de contacto solo deberían conservarse el tiempo necesario para tramitar la consulta y cualquier comunicación comercial derivada, salvo que la ley exija un plazo mayor.",
          rightsTitle: "7. Tus derechos",
          rightsBody:
            "Los interesados pueden tener derechos de acceso, rectificación, supresión, limitación, oposición, portabilidad y reclamación ante la autoridad de control competente.",
          contactTitle: "8. Contacto de privacidad",
          contactBody: "Para solicitudes relacionadas con privacidad, escribe a rodrigo@rosapadel.com.",
        },
      },
      cookies: {
        title: "Política de cookies",
        description: "Información sobre cookies y almacenamiento local usados en el sitio web de Rosa padel.",
        sections: {
          storageTitle: "Almacenamiento actualmente en uso",
          storageTable: {
            headers: ["Clave", "Tipo", "Finalidad", "Duración"],
            rows: [
              ["rosa-theme", "localStorage", "Guarda el tema claro u oscuro seleccionado.", "Hasta borrado manual"],
              ["rosa-theme-manual", "localStorage", "Guarda si el usuario cambió el tema manualmente.", "Hasta borrado manual"],
              ["rosa-language", "localStorage", "Guarda el idioma seleccionado del sitio.", "Hasta borrado manual"],
            ],
          },
          analyticsTitle: "Sin seguimiento no esencial por defecto",
          analyticsBody:
            "La implementación actual no establece cookies de analítica o marketing de forma intencionada por defecto. Si se añaden herramientas de seguimiento más adelante, esta página y la lógica de consentimiento deberían actualizarse antes del lanzamiento.",
          manageTitle: "Cómo gestionar el almacenamiento",
          manageBody:
            "Los usuarios pueden borrar cookies y almacenamiento local desde la configuración del navegador en cualquier momento. Si en el futuro se añade seguimiento no esencial, también debería incorporarse un control visible de configuración de cookies.",
        },
      },
    },
    productFamily: {
      label: "El ecosistema Rosa",
      title: "Un sistema. Cada pista.",
      subtitle: "Cuatro productos interconectados que llevan cualquier pista de pádel del marcador básico a la inteligencia de partido completa con IA.",
      carouselHint: "Desliza productos",
      viewProduct: "Ver producto",
      items: [
        {
          num: "01",
          tier: "Avanzado",
          name: "Rosa Vision",
          tagline: "Replay. Analiza. Comparte.",
          status: "Piloto disponible",
          statusType: "pilot",
          href: "/products/vision",
          features: ["Integración cámara", "Replay instantáneo", "Mapas de calor", "Historial jugador"],
        },
        {
          num: "02",
          tier: "Entrada",
          name: "Core LED",
          tagline: "Conéctalo. Marca en vivo.",
          status: "Listo para producir",
          statusType: "available",
          href: "/products/core-led",
          features: ["Marcador LED", "Control touchpad", "Modo offline", "Plug & Play"],
        },
      ],
    },
    audiencePortals: {
      label: "Hecho para tu juego",
      title: "¿Para quién es Rosa?",
      items: [
        {
          id: "players",
          title: "Jugadores",
          desc: "Sigue tus estadísticas, revive tus mejores momentos y mejora partido a partido.",
          cta: "Ver funciones para jugadores",
          href: "/#how-it-works",
        },
        {
          id: "clubs",
          title: "Clubes y recintos",
          desc: "Retén más socios, gestiona torneos con fluidez y desbloquea nuevas fuentes de ingresos.",
          cta: "Ver ROI para clubes",
          href: "/for-clubs",
        },
        {
          id: "investors",
          title: "Inversores",
          desc: "Inteligencia de pista basada en hardware en el corazón del boom global del pádel.",
          cta: "Ver visión para inversores",
          href: "/investors",
        },
      ],
    },
    gameModes: {
      label: "Marcadores",
      title: "Modos de juego",
      description:
        "Elige el formato que mejor se adapte a tu partido y lleva el marcador.",

      items: [
        {
          id: "normal",
          title: "NORMAL",
          desc:
            "Partido al mejor de 3 sets. Gana el jugador o equipo que consiga 2 sets.",
        },

        {
          id: "quick-match",
          title: "QUICK MATCH",
          desc:
            "Se juegan 2 sets. Si hay empate 1–1, el tercer set se resuelve con muerte súbita a 10 puntos.",
        },

        {
          id: "league-mode",
          title: "LEAGUE MODE",
          desc:
            "Cuatro jugadores compiten en 3 rondas. Cada uno juega 1 set con cada uno de los demás como pareja y acumula puntos. Gana quien tenga más puntos al final.",

          rounds: [
            "R1: J1 + J4 vs J2 + J3",
            "R2: J1 + J3 vs J2 + J4",
            "R3: J1 + J2 vs J3 + J4",
          ],
        },

        {
          id: "americana",
          title: "AMERICANA",
          desc:
            "Se juega hasta una meta de puntos predefinida o por tiempo. Por ejemplo, un máximo de 10 puntos o un timer, sin sets ni juegos. El jugador define la meta o el timer.",
        },
      ],
    },
    roiCalculator: {
      label: "ROI para clubes",
      title: "Ingresos extra estimados",
      subtitle: "Estima los ingresos adicionales que Rosa puede ayudar a crear para tu club.",
      courtLabel: "Número de pistas",
      bookingsLabel: "Reservas promedio por pista / mes",
      priceLabel: "Precio promedio de reserva (€)",
      monthlyLabel: "Ingresos adicionales potenciales para el club / mes",
      numberContext: "Esto es upside estimado para tu club, no el precio de Rosa.",
      annualPrefix: "≈",
      annualSuffix: "de ingresos adicionales para el club / año",
      streamsTitle: "De dónde viene el upside",
      streams: [
        "Pantallas de patrocinio en pistas",
        "Ingresos por suscripción de analítica",
        "Paquetes premium de grabación",
        "Contenido y highlights de torneos",
      ],
      disclaimer: "La estimación refleja solo el incremento en reservas y no incluye patrocinios, contenido u otras fuentes complementarias. Los resultados reales varían según el club.",
      cta: "Obtener Rosa ahora",
    },
    notFound: {
      title: "404",
      body: "Uy. No encontramos esta página",
      cta: "Volver al inicio",
    },
  },
  de: {
    meta: {
      homeTitle: "Rosa padel | Smarte Courts fuer jeden Club",
      homeDescription:
        "Professionelles Padel-Scoring, Instant Replay und Match-Analysen fuer Clubs, Spieler und Turniere.",
      imprintTitle: "Rosa padel | Impressum",
      privacyTitle: "Rosa padel | Datenschutz",
      cookiesTitle: "Rosa padel | Cookie-Richtlinie",
    },
    nav: {
      products: "Produkte",
      howItWorks: "So funktioniert es",
      contact: "Kontakt",
      bookDemo: "Demo buchen",
      languageLabel: "Sprache",
      toggleTheme: "Theme wechseln",
      openMenu: "Menue oeffnen",
      closeMenu: "Menue schliessen",
      forClubs: "Für Clubs",
      forInvestors: "Für Investoren",
    },
    hero: {
      headlines: [
        { prefix: "Das ", accent: "Profi", suffix: "-Erlebnis.", secondLine: "Auf jedem Court." },
        { prefix: "Der ", accent: "smarteste", suffix: " Court", secondLine: "ueberhaupt." },
      ],
      subtitle:
        "Professionelles Padel-Scoring, Instant Replay und Match-Analysen, fuer Spieler entwickelt und fuer jeden Court gebaut.",
      primaryCta: "Demo buchen",
      secondaryCta: "Produkte ansehen",
      badges: ["Live-Scoring", "Instant Replay", "Match-Analyse"],
    },
    problemSolution: {
      gapLabel: "Die Luecke",
      gapTitle: "Einfache Scoring-Apps reichen nicht aus. Pro-Systeme sind zu teuer.",
      gapBody:
        "Padel-Clubs muessen heute zwischen unzuverlaessigen Gratis-Apps und teuren Broadcast-Loesungen waehlen. Spieler erhalten keine Analysen. Clubs verlieren Umsatz. Turniere bleiben manuell.",
      solutionLabel: "Rosa schliesst sie",
      solutionTitle: "Ein modulares Smart-Court-System, das mit jedem Budget funktioniert.",
      solutionBody:
        "Starte mit LED-Scoring und skaliere zu HD-Replay und KI-gestuetzter Vision-Analyse. Jede Stufe ist darauf ausgelegt, vom ersten Match an ein professionelles Erlebnis zu schaffen.",
      stats: [
        { label: "Live-Scoring", desc: "Echtzeit-Score auf dem Court fuer jeden Punkt" },
        { label: "Video-Ausgabe", desc: "Vollstaendiges Match-Video mit Score-Overlay und Satzstatistiken" },
        { label: "Match-Insights", desc: "Heatmaps, Schlaganalysen und Spielerstatistiken" },
      ],
    },
    products: {
      label: "Modulare Produkte",
      title: "Ein System. Drei Stufen.",
      subtitle: "Starte dort, wo du stehst. Skaliere, wenn du bereit bist. Jede Stufe funktioniert allein oder zusammen.",
      popular: "Beliebt",
      items: [
        {
          tier: "Einstieg",
          name: "Core LED",
          description:
            "Tragbares LED-Scoring fuer jeden Court. Touchpad-Steuerung, Offline-Betrieb und Plug-and-Play-Installation.",
          features: ["LED-Scoreboard", "Touchpad-Steuerung", "Offline-Modus", "Plug and Play"],
        },
        {
          tier: "Wachstum",
          name: "Core HD",
          description:
            "HD-Display mit QR- oder Web-Match-Setup, Schiedsrichtermodus und Premium-Branding fuer Events.",
          features: ["HD-Monitor", "QR/Web-Setup", "Schiedsrichtermodus", "Individuelles Branding", "Event-Management", "Cloud-Sync"],
        },
        {
          tier: "Fortgeschritten",
          name: "Rosa Vision",
          status: "Geplantes Oekosystem",
          description:
            "Die geplante kamera-integrierte Ebene fuer Replay, Match-Historie und Spieler-Insights im gesamten Rosa System.",
          features: ["Alles aus Core HD", "Kamera-integriertes Replay", "Match-Highlights + Schlagklassifizierung", "Spieler-Historie", "Club-Screens", "Post-Match-Insights", "Vision-Roadmap-Ebene"],
          note: "Entwickelt, um Rosa von Live-Scoring zu Replay, Review und Retention zu erweitern.",
        },
      ],
    },
    howItWorks: {
      label: "So funktioniert es",
      title: "Drei Schritte zum Smart Court",
      steps: [
        {
          num: "01",
          title: "Auf dem Court einsetzen",
          description:
            "Core LED ist Plug-and-Play und auf jedem Padel-Court in weniger als einer Minute einsatzbereit. Auch HD und Vision lassen sich sehr schnell und einfach installieren und benoetigen nur einen Monitor und Stromanschluss.",
        },
        {
          num: "02",
          title: "Live-Matches spielen",
          description:
            "Spieler sehen Echtzeit-Scoring. Zuschauer haben klare Sicht. Turniere laufen ohne Unterbrechungen.",
        },
        {
          num: "03",
          title: "Auswerten und verbessern",
          description:
            "Greife auf Instant Replay, Heatmaps, Schlaganalysen und Match-Zusammenfassungen zu. Teile Highlights mit Schlagklassifizierung direkt.",
        },
      ],
    },
    playerExperience: {
      label: "Spielererlebnis",
      title: "Jedes Match erzaehlt eine Geschichte.",
      accent: "Rosa",
      titleSuffix: " haelt sie fest.",
      status: "Vision-Roadmap",
      demoCtaLabel: "Vision-Coach-Demo oeffnen",
      demoCtaHint: "Entdecke das Mockup fuer Schlagratings und Filter nach Schlagtyp.",
      body:
        "Spieler gehen von Live-Tracking zu Replay, Review und teilbaren Momenten ueber. Rosa Vision ist darauf ausgelegt, jedes Match zu etwas zu machen, das man spaeter erneut ansehen, verstehen und weitergeben kann.",
      features: [
        { label: "Instant Replay", desc: "Gehe zu den Punkten zurueck, die das Match entschieden haben" },
        { label: "Match-Verlauf", desc: "Pruefe Score-Kontext, Momentum und Schluesselmomente" },
        { label: "Spieler-Insights", desc: "Verfolge Muster, Tendenzen und Post-Match-Zusammenfassungen" },
        { label: "Teilbare Clips", desc: "Speichere starke Punkte und teile Match-Recaps" },
      ],
      mockup: {
        liveMatch: "Live-Match",
        tabs: ["Match", "Satz 1", "Satz 2", "Satz 3"],
        teamStats: ["Gewonnene Punkte", "Winner", "Unforced Errors", "Breakbaelle"],
        shotBreakdown: "Schlaganalyse",
        courtHeatmap: "Court-Heatmap",
        rallyAverage: "Rallye-Schnitt",
        lastRally: "Letzte",
        longestRally: "Laengste",
        lastTenPoints: "Letzte 10 Punkte",
        highlights: "Match-Highlights + Schlagklassifizierung",
      },
    },
    visionEcosystem: {
      label: "Rosa Vision",
      title: "Vom Court ins Clubhaus.",
      body:
        "Rosa Vision ist die geplante kamera-integrierte Ebene, die Live-Spiel, Replay, Spieler-Historie und Club-Screens in einem System verbindet.",
      status: "Geplantes Oekosystem",
      playerTitle: "Fuer Spieler",
      playerBody:
        "Verwandle ein Match in einen wiederholbaren Loop, der Spieler auch nach dem Verlassen des Courts bindet.",
      playerItems: [
        { title: "Match aufzeichnen", desc: "Erfasse die komplette Session auf Basis von Rosa Scoring und HD-Ausgabe." },
        { title: "Schluesselmomente reviewen", desc: "Springe zu Rallyes, Punkten und Mustern zurueck, die wichtig waren." },
        { title: "Historie aufbauen", desc: "Erstelle ein persoenliches Archiv aus Videos, Clips und Post-Match-Recaps." },
        { title: "Highlights teilen", desc: "Sende Clips und Zusammenfassungen, die das Match ueber den Court hinaus weitertragen." },
      ],
      clubTitle: "Fuer Clubs",
      clubBody:
        "Nutze dieselbe Match-Ebene fuer ein hochwertiges Venue-Erlebnis und einen staerkeren Retention-Loop.",
      clubItems: [
        { title: "Club-Screens", desc: "Nutze Live-Matches und Replays als Content fuer die gesamte Anlage." },
        { title: "Mitgliederbindung", desc: "Gib Spielern mehr Gruende, zurueckzukommen, zu vergleichen und erneut zu buchen." },
        { title: "Content-Inventar", desc: "Erzeuge Clips und Recaps fuer Promotion, Sponsoren und Events." },
        { title: "System-Kontinuitaet", desc: "Erweitere den Rosa Stack, ohne den Live-Scoring-Workflow zu ersetzen." },
      ],
      footerTitle: "Als Erweiterung des Rosa Stacks gebaut",
      footerBody:
        "Vision ist darauf ausgelegt, auf Rosa Scoring und HD-Ausgabe aufzubauen, damit Clubs von Live-Betrieb zu Replay, Content und Insights wachsen koennen, ohne ihr restliches Setup auszutauschen.",
    },
    tournaments: {
      label: "Turniere & Events",
      title: "Veranstalte Events wie die Profis",
      futureLabel: "Vision-Erweiterung",
      body:
        "Von lokalen Padel-Turnieren bis zu Premium-Events uebernimmt Rosa heute das Live-Matcherlebnis, waehrend Rosa Vision das System um Replay, Highlights und Screen-Content erweitert.",
      benefits: [
        {
          title: "Live-Sichtbarkeit auf dem Court",
          desc: "Echtzeit-Scores auf dem Court und remote sichtbar. Zuschauer und Veranstalter kennen jederzeit den Match-Status.",
        },
        {
          title: "Vision-bereites Matcherlebnis",
          desc: "Jedes Match kann von Live-Scoring zu Replay, Clip-Erstellung und Post-Match-Review fuer Spieler und Zuschauer wachsen.",
        },
        {
          title: "Content nach dem Match",
          desc: "Spieler erhalten teilbare Match-Momente. Veranstalter erhalten Content fuer Social Media, Club-Screens und Event-Promotion.",
        },
        {
          title: "Bereit fuer mehrere Courts",
          desc: "Skaliere von einem einzelnen Court bis zu Events ueber den gesamten Standort. Jeder Court laeuft mit Rosa Vision eigenstaendig.",
        },
      ],
      highlightTitle: "Replay- und Screen-Ausgabe",
      highlightBody:
        "Rosa Vision soll replay-faehige Ausgaben, teilbare Clips und Venue-Screen-Momente ueber die Rosa Live-Scoring-Ebene legen, ohne Turnier-Management-Tools zu ersetzen.",
    },
    clubRoi: {
      label: "Club-ROI",
      title: "Fuer Padel-Spieler entwickelt. Fuer Clubs gebaut.",
      body:
        "Rosa verbessert das Spielerlebnis und hilft Clubs beim Wachstum. Mehr Bindung, reibungslosere Ablaeufe und neue Umsatzchancen.",
      metrics: [
        {
          value: "Mehr",
          label: "Spielerbindung",
          desc: "Smarte Courts sorgen fuer mehr Wiederbuchungen und eine laengere Spielerbindung",
        },
        {
          value: "Pro",
          label: "Matcherlebnis",
          desc: "Live-Scoring, Replays und Statistiken, die jedes Turniermatch aufwerten",
        },
        {
          value: "3+",
          label: "Neue Umsatzquellen",
          desc: "Sponsoring-Displays, Analyse-Abos und Premium-Events",
        },
      ],
    },
    partners: {
      label: "Unterstuetzt von",
      body: "Wir bauen die Zukunft des Padels",
    },
    contact: {
      title: "Bringe deine ",
      accent: "Anlage",
      body:
        "Nimm Kontakt auf und erlebe Rosa in Aktion. Wir zeigen dir die passende Stufe fuer deinen Club.",
      successTitle: "Wir melden uns",
      successBody: "Danke fuer dein Interesse. Unser Team meldet sich in Kuerze.",
      fields: {
        name: "Name",
        namePlaceholder: "Dein Name",
        email: "E-Mail",
        emailPlaceholder: "du@club.com",
        organization: "Club / Organisation",
        organizationPlaceholder: "Name deines Clubs oder deiner Organisation",
        objective: "Wonach suchst du?",
        objectivePlaceholder: "Option auswaehlen",
      },
      objectives: {
        scoring: "Automatisches Scoring",
        tournaments: "Turniererlebnis",
        analytics: "Spieleranalysen & Replay",
        full: "Komplettes Smart-Court-Setup",
        other: "Sonstiges",
      },
      consentPrefix: "Ich stimme der Verarbeitung meiner Daten gemaess der ",
      consentLink: "Datenschutzerklaerung",
      consentSuffix: " zu.",
      submit: "Demo buchen",
      submitting: "Wird gesendet...",
      validation: {
        nameRequired: "Name ist erforderlich",
        emailInvalid: "Ungueltige E-Mail-Adresse",
      },
      messages: {
        genericError: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
        success: "Danke. Wir melden uns bald.",
      },
    },
    footer: {
      tagline: "Das Profi-Erlebnis. Auf jedem Court.",
      productsTitle: "Produkte",
      companyTitle: "Unternehmen",
      legalTitle: "Rechtliches",
      companyLinks: {
        home: "Startseite",
        howItWorks: "So funktioniert es",
        contact: "Kontakt",
      },
      legalLinks: {
        privacy: "Datenschutz",
        imprint: "Impressum",
        cookies: "Cookie-Richtlinie",
      },
      rights: "Alle Rechte vorbehalten.",
      social: {
        linkedin: "LinkedIn",
        instagram: "Instagram",
      },
    },
    legal: {
      backHome: "Zurueck zur Startseite",
      lastUpdatedPrefix: "Zuletzt aktualisiert",
      introNote:
        "Diese Seite spiegelt den aktuellen Website-Stand wider und sollte vor dem produktiven Einsatz mit der finalen rechtlichen und operativen Struktur abgeglichen werden.",
      imprint: {
        title: "Impressum",
        description: "Anbieterinformationen und Pflichtangaben fuer die Website von Rosa padel.",
        sections: {
          providerTitle: "Anbieterinformationen",
          providerRows: [
            ["Marke / Website", "Rosa padel"],
            ["Vertreten durch", "Rodrigo Ponce"],
            ["Adresse", "Bildungscampus 1, 74076 Heilbronn, Deutschland"],
            ["E-Mail", "rodrigo@rosapadel.com"],
            ["Telefon", "+49 15730721287"],
          ],
          registerTitle: "Register und USt-ID",
          registerBody:
            "Handelsregisterdaten und USt-IdNr. sollten hier ergaenzt werden, sobald die finalen Unternehmensdaten feststehen.",
          contentTitle: "Verantwortlich fuer Inhalte",
          contentBody:
            "Verantwortlich fuer redaktionelle Inhalte gemaess Section 18 MStV: Rodrigo Ponce, Bildungscampus 1, 74076 Heilbronn, Deutschland.",
          disputeTitle: "Verbraucherstreitbeilegung",
          disputeBody:
            "Rosa padel ist weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Pflicht besteht. Die fruehere EU-Online-Streitbeilegungsplattform wurde am 20. Juli 2025 eingestellt.",
        },
      },
      privacy: {
        title: "Datenschutzerklaerung",
        description: "Informationen darueber, wie personenbezogene Daten auf der Website von Rosa padel verarbeitet werden.",
        sections: {
          controllerTitle: "1. Verantwortlicher",
          controllerRows: [
            ["Verantwortlicher", "Rosa padel, vertreten durch Rodrigo Ponce"],
            ["Adresse", "Bildungscampus 1, 74076 Heilbronn, Deutschland"],
            ["E-Mail", "rodrigo@rosapadel.com"],
            ["Datenschutzbeauftragter", "Es wurde kein Datenschutzbeauftragter benannt, sofern dies nicht gesetzlich erforderlich ist."],
          ],
          dataTitle: "2. Verarbeitete Daten",
          dataList: [
            "Kontaktdaten aus dem Formular wie Name, E-Mail-Adresse, Organisation und gewaehltes Anliegen.",
            "Technische Verbindungsdaten, die in Server- oder Hosting-Logs erscheinen koennen, etwa IP-Adresse, Anfragezeit und User-Agent.",
            "Funktionale Browser-Speichereintraege fuer Sprach- und Theme-Praeferenzen.",
          ],
          purposesTitle: "3. Zwecke und Rechtsgrundlagen",
          purposesTable: {
            headers: ["Zweck", "Rechtsgrundlage"],
            rows: [
              ["Beantwortung von Demo- oder Kontaktanfragen", "Art. 6 Abs. 1 lit. b DSGVO und, soweit einschlaegig, Art. 6 Abs. 1 lit. a DSGVO"],
              ["Betrieb und Absicherung der Website", "Art. 6 Abs. 1 lit. f DSGVO"],
              ["Speicherung von Sprach- und Theme-Praeferenzen", "Art. 6 Abs. 1 lit. f DSGVO"],
            ],
          },
          processorsTitle: "4. Auftragsverarbeiter und Drittanbieter",
          processorsBody:
            "Kontaktanfragen werden aktuell ueber FormSubmit uebermittelt. Vor dem produktiven Einsatz sollten die Anbieterbedingungen, Verarbeitungsorte und etwaige erforderliche Auftragsverarbeitungsvertraege geprueft werden.",
          transfersTitle: "5. Internationale Datenuebermittlungen",
          transfersBody:
            "Werden personenbezogene Daten ausserhalb des EWR uebermittelt, sollten hier der Uebermittlungsmechanismus und die eingesetzten Schutzmassnahmen dokumentiert werden, etwa Angemessenheitsbeschluesse oder Standardvertragsklauseln.",
          retentionTitle: "6. Speicherdauer",
          retentionBody:
            "Kontaktanfragen sollten nur so lange gespeichert werden, wie dies fuer die Bearbeitung der Anfrage und der daraus resultierenden Geschaeftskommunikation erforderlich ist, sofern keine laengeren gesetzlichen Aufbewahrungspflichten bestehen.",
          rightsTitle: "7. Rechte betroffener Personen",
          rightsBody:
            "Betroffene Personen koennen insbesondere Rechte auf Auskunft, Berichtigung, Loeschung, Einschraenkung, Widerspruch, Datenuebertragbarkeit und Beschwerde bei der zustaendigen Aufsichtsbehoerde haben.",
          contactTitle: "8. Datenschutz-Kontakt",
          contactBody: "Datenschutzbezogene Anfragen bitte an rodrigo@rosapadel.com senden.",
        },
      },
      cookies: {
        title: "Cookie-Richtlinie",
        description: "Informationen zu Cookies und lokalem Speicher auf der Website von Rosa padel.",
        sections: {
          storageTitle: "Derzeit genutzter Speicher",
          storageTable: {
            headers: ["Schluessel", "Typ", "Zweck", "Dauer"],
            rows: [
              ["rosa-theme", "localStorage", "Speichert das gewaehlte helle oder dunkle Theme.", "Bis zur manuellen Loeschung"],
              ["rosa-theme-manual", "localStorage", "Speichert, ob das Theme manuell geaendert wurde.", "Bis zur manuellen Loeschung"],
              ["rosa-language", "localStorage", "Speichert die gewaehlte Website-Sprache.", "Bis zur manuellen Loeschung"],
            ],
          },
          analyticsTitle: "Standardmaessig kein nicht notwendiges Tracking",
          analyticsBody:
            "Die aktuelle Implementierung setzt standardmaessig keine Analyse- oder Marketing-Cookies. Werden spaeter Tracking-Tools eingebunden, sollten diese Seite und die Consent-Logik vor dem Start aktualisiert werden.",
          manageTitle: "Wie Nutzer den Speicher verwalten koennen",
          manageBody:
            "Nutzer koennen Cookies und lokalen Speicher jederzeit ueber ihre Browser-Einstellungen loeschen. Wenn spaeter nicht notwendiges Tracking eingefuehrt wird, sollte zusaetzlich eine sichtbare Cookie-Einstellungsfunktion bereitgestellt werden.",
        },
      },
    },
    productFamily: {
      label: "Das Rosa-Ökosystem",
      title: "Ein System. Jeder Court.",
      subtitle: "Vier verknüpfte Produkte, die jeden Padel-Court von einfachem Scoring zur vollständigen KI-gestützten Match-Intelligenz bringen.",
      carouselHint: "Produkte wischen",
      viewProduct: "Produkt ansehen",
      items: [
        {
          num: "01",
           tier: "Fortgeschritten",
          name: "Rosa Vision",
          tagline: "Replay. Analyse. Teilen.",
          status: "Pilot verfügbar",
          statusType: "pilot",
          href: "/products/vision",
          features: ["Kamera-Integration", "Instant Replay", "Court-Heatmaps", "Spieler-Historie"],
        },
        {
          num: "02",
          tier: "Einstieg",
          name: "Core LED",
          tagline: "Einstecken. Spielen. Punkten.",
          status: "Produktionsbereit",
          statusType: "available",
          href: "/products/core-led",
          features: ["LED-Scoreboard", "Touchpad-Steuerung", "Offline-Modus", "Plug & Play"],
        },
      ],
    },
    audiencePortals: {
      label: "Für dein Spiel gemacht",
      title: "Für wen ist Rosa?",
      items: [
        {
          id: "players",
          title: "Spieler",
          desc: "Verfolge deine Stats, erlebe deine besten Momente erneut und verbessere dich mit jedem Match.",
          cta: "Spieler-Features entdecken",
          href: "/#how-it-works",
        },
        {
          id: "clubs",
          title: "Clubs & Venues",
          desc: "Binde mehr Mitglieder, führe Turniere reibungsloser durch und erschließe neue Umsatzquellen.",
          cta: "Club-ROI ansehen",
          href: "/for-clubs",
        },
        {
          id: "investors",
          title: "Investoren",
          desc: "Hardware-geführte Court-Intelligenz an der Schnittstelle des globalen Padel-Booms.",
          cta: "Investor-Übersicht",
          href: "/investors",
        },
      ],
    },
    gameModes: {
      label: "Scoreboards",
      title: "Spielmodi",
      description:
        "Wähle das Format, das am besten zu deinem Match passt, und behalte den Spielstand im Blick.",

      items: [
        {
          id: "normal",
          title: "NORMAL",
          desc:
            "Ein Match im Best-of-3-Modus. Wer zuerst 2 Sätze gewinnt, gewinnt das Match.",
        },

        {
          id: "quick-match",
          title: "QUICK MATCH",
          desc:
            "Es werden 2 Sätze gespielt. Steht es 1:1, entscheidet ein dritter Satz als Sudden Death bis 10 Punkte.",
        },

        {
          id: "league-mode",
          title: "LEAGUE MODE",
          desc:
            "Vier Spieler treten in 3 Runden an. Jeder spielt einen Satz mit jedem anderen als Partner und sammelt Punkte. Wer am Ende die meisten Punkte hat, gewinnt.",

          rounds: [
            "R1: S1 + S4 vs S2 + S3",
            "R2: S1 + S3 vs S2 + S4",
            "R3: S1 + S2 vs S3 + S4",
          ],
        },

        {
          id: "americana",
          title: "AMERICANA",
          desc:
            "Gespielt wird bis zu einer festgelegten Punktzahl oder auf Zeit. Zum Beispiel ein Ziel von 10 Punkten oder ein Timer, ohne Sätze. Die Spieler legen Punktziel oder Timer selbst fest.",
        },
      ],
    },
    roiCalculator: {
      label: "Club-ROI",
      title: "Geschätzter Club-Upside",
      subtitle: "Schätze den zusätzlichen Umsatz, den Rosa fuer deinen Club schaffen kann.",
      courtLabel: "Anzahl Courts",
      bookingsLabel: "Durchschnittliche Buchungen pro Court / Monat",
      priceLabel: "Durchschnittlicher Buchungspreis (€)",
      monthlyLabel: "Potenzieller zusätzlicher Club-Umsatz pro Monat",
      numberContext: "Das ist geschätzter Upside fuer deinen Club, nicht der Rosa-Preis.",
      annualPrefix: "≈",
      annualSuffix: "zusätzlicher Club-Umsatz pro Jahr",
      streamsTitle: "Woher der Upside kommt",
      streams: [
        "Sponsoring-Displays auf Court-Screens",
        "Analyse-Abonnements",
        "Premium-Aufnahmepakete",
        "Turnier-Content und Highlights",
      ],
      disclaimer: "Schätzung berücksichtigt nur Buchungszuwächse und excludiert Sponsoring, Content oder andere ergänzende Einnahmen. Tatsächliche Ergebnisse variieren je Club.",
      cta: "Rosa jetzt holen",
    },
    notFound: {
      title: "404",
      body: "Ups. Diese Seite wurde nicht gefunden",
      cta: "Zurueck zur Startseite",
    },
  },
} as const;

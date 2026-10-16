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
      homeTitle: "rosa padel | Smart Courts for Every Club",
      homeDescription:
        "Professional scoring, instant replay, and match analytics for clubs, players, and tournaments.",
      imprintTitle: "rosa padel | Imprint",
      privacyTitle: "rosa padel | Privacy Policy",
      cookiesTitle: "rosa padel | Cookie Policy",
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
      origin: { technology: "German technology.", heart: "Mexican heart." },
    },
    problemSolution: {
      gapLabel: "The Gap",
      gapTitle: "Basic scoring apps can't keep up. Pro systems cost a fortune.",
      gapBody:
        "Clubs choose between basic apps and expensive pro systems. Players lack analytics, while clubs and tournaments stay limited.",
      solutionLabel: "rosa fills it",
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
      title: "Two products. One ecosystem.",
      subtitle: "Choose rosa portable for LED scoring or rosa vision for the connected court. rosa coach is the AI software layer.",
      popular: "Popular",
      items: [
        {
          tier: "Portable scoring",
          name: "rosa portable",
          description:
            "Portable LED scoring with touchpad control and plug-and-play setup.",
          features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play"],
        },
        {
          tier: "Connected court",
          name: "rosa vision",
          status: "Pre-sale",
          description:
            "HD scoring, pads and video in one connected court system.",
          features: ["HD Scoring", "Pads Through the Glass", "Replay & VAR", "Tournament Management"],
          note: "rosa coach adds the AI layer to the match experience.",
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
            "Set up rosa portable for LED scoring or rosa vision for HD scoring, pads and video on a connected court.",
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
      accent: "rosa",
      titleSuffix: " captures it.",
      status: "Match experience + AI layer",
      demoCtaLabel: "Explore rosa coach",
      demoCtaHint: "Discover the AI layer for shot analysis and tactical insights.",
      body:
        "rosa vision connects scoring, replay and review. rosa coach adds the AI layer for deeper match analysis.",
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
      label: "rosa vision",
      title: "From Court to Clubhouse.",
      body:
        "rosa vision connects live play, replay, player history, and club screens.",
      status: "Connected court system",
      playerTitle: "For players",
      playerBody:
        "Keep players engaged after the match ends.",
      playerItems: [
        { title: "Capture the match", desc: "Record the session with rosa scoring and HD output." },
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
        { title: "System continuity", desc: "Extend rosa without replacing live scoring." },
      ],
      footerTitle: "Built as an extension of the rosa stack",
      footerBody:
        "Vision builds on rosa scoring and HD output for replay, content, and insights.",
    },
    tournaments: {
      label: "Tournaments & Events",
      title: "Run Events Without the Chaos.",
      futureLabel: "Vision expansion",
      body:
        "rosa gives organizers a live view of every court, match, and assignment.",
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
          desc: "Display live brackets and court assignments across rosa screens.",
        },
      ],
      highlightTitle: "Replay and Screen Output",
      highlightBody:
        "rosa vision adds replay, shareable clips, and venue content to tournaments.",
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
      modeLabel: "Contact options",
      referral: {
        tab: "Refer a club",
        title: "Your recommendation has a ",
        accent: "reward.",
        body: "Be the first to recommend us to your club. If it purchases rosa vision through you, you receive 2,000 MXN.",
        instructions: "Tell us the following:",
        required: "Required",
        optional: "Optional",
        fields: {
          name: "Full name",
          phone: "Your contact phone number",
          club: "Club you recommend",
          location: "Club city and country",
          administrator: "Administrator / owner name",
          administratorPhone: "Administrator contact phone number",
          website: "Club website or Instagram",
        },
        contactNote: "Only share business contact details you have permission to provide.",
        submit: "Send recommendation",
        successTitle: "Recommendation received.",
        successBody: "Thank you for introducing us to your club. Our team will contact you about the next steps.",
        another: "Send another recommendation",
        requiredError: "Please complete this required field.",
        phoneError: "Enter a valid phone number, including its country code.",
      },
      title: "Upgrade Your ",
      accent: "Facility",
      body:
        "See rosa in action and find the right tier for your club.",
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
        description: "Provider information and mandatory disclosures for the rosa padel website.",
        sections: {
          providerTitle: "Provider Information",
          providerRows: [
            ["Brand / Website", "rosa padel"],
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
            "rosa padel is neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board unless legally required. The former EU Online Dispute Resolution platform was discontinued on July 20, 2025.",
        },
      },
      privacy: {
        title: "Privacy Policy",
        description: "Information on how personal data is processed on the rosa padel website.",
        sections: {
          controllerTitle: "1. Controller",
          controllerRows: [
            ["Controller", "rosa padel, represented by Rodrigo Ponce"],
            ["Address", "Bildungscampus 1, 74076 Heilbronn, Germany"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Data Protection Officer", "No data protection officer has been appointed unless legally required."],
          ],
          dataTitle: "2. Data We Process",
          dataList: [
            "Contact form data such as name, email address, organization, and selected objective.",
            "Club referrals: your name and phone number, the club name, city and country, plus any optional administrator name, business phone number, and club website or Instagram you provide. We use this information to follow up on the recommendation.",
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
        description: "Information on cookies and local storage used by the rosa padel website.",
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
      label: "The rosa Ecosystem",
      title: "One system. Every court.",
      subtitle: "Two hardware products. Portable scoring or a connected court, with rosa coach as the AI layer.",
      carouselHint: "Swipe products",
      viewProduct: "View product",
      items: [
        {
          num: "01",
          tier: "Connected court",
          name: "rosa vision",
          tagline: "Score. Replay. Connect.",
          status: "Pre-sale",
          statusType: "presale",
          href: "/products/vision",
          features: ["HD Scoring", "Pads Through the Glass", "Replay & VAR", "Automated Tournament Management"],
        },
        {
          num: "02",
          tier: "Portable scoring",
          name: "rosa portable",
          tagline: "Plug in. Score on.",
          status: "Production ready",
          statusType: "available",
          href: "/products/portable",
          features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play"],
        },
      ],
      aiLayer: {
        name: "rosa coach",
        tier: "AI layer",
        body: "The AI layer for rosa vision: shot analysis, tactical insights and progress tracking, built on your match footage.",
        status: "In development",
        statusType: "coming",
        href: "/products/coach",
        cta: "Explore rosa coach",
      },
    },
    audiencePortals: {
      label: "Built for your game",
      title: "Who is rosa for?",
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
      subtitle: "Estimate the extra revenue rosa can help your club create.",
      courtLabel: "Number of courts",
      bookingsLabel: "Average bookings per court / month",
      priceLabel: "Average booking price (€)",
      monthlyLabel: "Potential added club revenue per month",
      numberContext: "This is estimated upside for your club, not rosa pricing.",
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
      cta: "Get rosa now",
    },
    notFound: {
      title: "404",
      body: "Oops! Page not found",
      cta: "Return to Home",
    },
  },
  es: {
    meta: {
      homeTitle: "rosa padel | Pistas inteligentes para cada club",
      homeDescription:
        "Marcador profesional, VAR, repetición instantánea y analítica de partido para clubes, jugadores y torneos de pádel.",
      imprintTitle: "rosa padel | Aviso legal",
      privacyTitle: "rosa padel | Política de privacidad",
      cookiesTitle: "rosa padel | Política de cookies",
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
      newTab: "Torneos",
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
      origin: { technology: "Tecnología alemana.", heart: "Corazón mexicano." },
    },
    problemSolution: {
      gapLabel: "La brecha",
      gapTitle: "Las apps básicas de marcador no dan la talla. Los sistemas pro cuestan demasiado.",
      gapBody:
        "Los clubes de pádel se ven obligados a elegir entre apps gratuitas poco fiables y montajes de calidad broadcast demasiado caros. Los jugadores no reciben analítica. Los clubes pierden ingresos. Los torneos siguen siendo manuales.",
      solutionLabel: "rosa lo cubre",
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
      title: "Dos productos. Un ecosistema.",
      subtitle: "rosa portable para el marcador LED y rosa vision para la pista conectada. rosa coach es la capa de software con IA.",
      popular: "Popular",
      items: [
        {
          tier: "Marcador portátil",
          name: "rosa portable",
          description:
            "Marcador LED portátil para cualquier pista. Control por touchpad, funcionamiento offline e instalación plug and play.",
          features: ["Marcador LED", "Control por touchpad", "Modo offline", "Plug and play"],
        },
        {
          tier: "Pista conectada",
          name: "rosa vision",
          status: "Preventa",
          description:
            "Marcador HD, pads y vídeo en un mismo sistema de pista conectada.",
          features: ["Marcador HD", "Pads a través del cristal", "Replay y VAR", "Gestión de torneos"],
          note: "rosa coach añade la capa de inteligencia artificial al partido.",
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
            "Instala rosa portable para el marcador LED o rosa vision para combinar marcador HD, pads y vídeo en una pista conectada.",
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
      accent: "rosa",
      titleSuffix: " la captura.",
      status: "Experiencia de partido + capa de IA",
      demoCtaLabel: "Conocer rosa coach",
      demoCtaHint: "Descubre la capa de IA para análisis de golpes y lectura táctica.",
      body:
        "rosa vision conecta marcador, replay y revisión. rosa coach añade la capa de inteligencia artificial para profundizar en el análisis del partido.",
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
      label: "rosa vision",
      title: "De la pista al club.",
      body:
        "rosa vision combina marcador HD, pads y vídeo para conectar el juego en vivo, replay, historial del jugador y pantallas del club en un solo sistema.",
      status: "Sistema de pista conectada",
      playerTitle: "Para jugadores",
      playerBody:
        "Convierte un partido en un bucle repetible que mantiene a los jugadores conectados después de salir de la pista.",
      playerItems: [
        { title: "Captura el partido", desc: "Graba la sesión completa sobre el marcador y la salida HD de rosa." },
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
        { title: "Continuidad del sistema", desc: "Amplía el stack de rosa sin reemplazar el flujo de marcador en vivo." },
      ],
      footerTitle: "Construido como extensión del stack de rosa",
      footerBody:
        "Vision está pensado para apoyarse sobre el scoring y la salida HD de rosa, de modo que los clubes crezcan desde la operación en vivo hacia replay, contenido e insights sin cambiar el resto de su setup.",
    },
    tournaments: {
      label: "Torneos y eventos",
      title: "Gestiona eventos como los profesionales",
      futureLabel: "Expansión Vision",
      body:
        "Desde torneos locales de pádel hasta eventos premium, rosa se ocupa hoy de la experiencia en vivo mientras rosa vision amplía el sistema con replay, highlights y contenido preparado para pantallas.",
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
          desc: "Escala de una sola pista a eventos de todo el recinto. Cada pista funciona de forma independiente con rosa vision.",
        },
      ],
      highlightTitle: "Replay y salida para pantallas",
      highlightBody:
        "rosa vision está pensado para añadir replay listo para revisar, clips compartibles y momentos para pantallas del recinto sobre la capa de scoring en vivo de rosa sin sustituir las herramientas de gestión del torneo.",
    },
    clubRoi: {
      label: "ROI para clubes",
      title: "Diseñado para jugadores de pádel. Construido para clubes.",
      body:
        "rosa mejora la experiencia del jugador mientras ayuda al club a crecer. Mejor engagement, operaciones más fluidas y nuevas oportunidades de ingresos.",
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
      modeLabel: "Opciones de contacto",
      referral: {
        tab: "Recomendar un club",
        title: "Tu recomendación tiene ",
        accent: "recompensa.",
        body: "Sé el primero en recomendarnos a tu club. Si contrata rosa vision a través de ti, recibes 2,000 MXN.",
        instructions: "Indícanos los siguientes datos:",
        required: "Obligatorio",
        optional: "Opcional",
        fields: {
          name: "Nombre completo",
          phone: "Teléfono de contacto",
          club: "Nombre del club a recomendar",
          location: "Ciudad y país en donde opera el club",
          administrator: "Nombre del administrador / dueño",
          administratorPhone: "Teléfono de contacto del administrador",
          website: "Página web o IG del club",
        },
        contactNote: "Comparte únicamente datos de contacto profesionales que tengas permiso de proporcionar.",
        submit: "Enviar recomendación",
        successTitle: "Recibimos tu recomendación.",
        successBody: "Gracias por presentarnos a tu club. Nuestro equipo te contactará para los siguientes pasos.",
        another: "Enviar otra recomendación",
        requiredError: "Completa este campo obligatorio.",
        phoneError: "Introduce un teléfono válido, incluyendo el código de país.",
      },
      title: "Mejora tu ",
      accent: "instalación",
      body:
        "Ponte en contacto para ver rosa en acción. Te guiaremos hacia el nivel adecuado para tu club.",
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
        description: "Información del proveedor y datos obligatorios del sitio web de rosa padel.",
        sections: {
          providerTitle: "Información del proveedor",
          providerRows: [
            ["Marca / sitio web", "rosa padel"],
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
            "rosa padel no está dispuesto ni obligado a participar en procedimientos de arbitraje ante una junta arbitral de consumo salvo obligación legal. La antigua plataforma europea de resolución online de litigios fue discontinuada el 20 de julio de 2025.",
        },
      },
      privacy: {
        title: "Política de privacidad",
        description: "Información sobre cómo se procesan los datos personales en el sitio web de rosa padel.",
        sections: {
          controllerTitle: "1. Responsable",
          controllerRows: [
            ["Responsable", "rosa padel, representado por Rodrigo Ponce"],
            ["Dirección", "Bildungscampus 1, 74076 Heilbronn, Alemania"],
            ["Email", "rodrigo@rosapadel.com"],
            ["Delegado de protección de datos", "No se ha designado delegado salvo obligación legal."],
          ],
          dataTitle: "2. Datos que tratamos",
          dataList: [
            "Datos del formulario de contacto como nombre, email, organización y objetivo seleccionado.",
            "Recomendaciones de clubes: tu nombre y teléfono, nombre del club, ciudad y país, además del nombre y teléfono profesional del administrador y la web o Instagram del club que proporciones de forma opcional. Usamos estos datos para dar seguimiento a la recomendación.",
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
        description: "Información sobre cookies y almacenamiento local usados en el sitio web de rosa padel.",
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
      label: "El ecosistema rosa",
      title: "Un sistema. Cada pista.",
      subtitle: "Dos productos de hardware: marcador portátil o pista conectada, con rosa coach como capa de inteligencia artificial.",
      carouselHint: "Desliza productos",
      viewProduct: "Ver producto",
      items: [
        {
          num: "01",
          tier: "Marcador portátil",
          name: "rosa portable",
          tagline: "Conéctalo. Marca en vivo.",
          status: "Listo para producir",
          statusType: "available",
          href: "/products/portable",
          features: ["Marcador LED", "Control touchpad", "Modo offline", "Plug & Play"],
        },
        {
          num: "02",
          tier: "Pista conectada",
          name: "rosa vision",
          tagline: "Marcador. Replay. Conexión.",
          status: "Preventa",
          statusType: "presale",
          href: "/products/vision",
          features: ["Marcador HD", "Pads a través del cristal", "Replay y VAR", "Gestión automática de torneos"],
        },
      ],
      aiLayer: {
        name: "rosa coach",
        tier: "Capa de IA",
        body: "La capa de inteligencia de rosa vision: análisis de golpes, lectura táctica y seguimiento de progreso. Software que amplía la experiencia del partido.",
        status: "En desarrollo",
        statusType: "coming",
        href: "/products/coach",
        cta: "Conocer rosa coach",
      },
    },
    audiencePortals: {
      label: "Hecho para tu juego",
      title: "¿Para quién es rosa?",
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
      subtitle: "Estima los ingresos adicionales que rosa puede ayudar a crear para tu club.",
      courtLabel: "Número de pistas",
      bookingsLabel: "Reservas promedio por pista / mes",
      priceLabel: "Precio promedio de reserva (€)",
      monthlyLabel: "Ingresos adicionales potenciales para el club / mes",
      numberContext: "Esto es upside estimado para tu club, no el precio de rosa.",
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
      cta: "Obtener rosa ahora",
    },
    notFound: {
      title: "404",
      body: "Uy. No encontramos esta página",
      cta: "Volver al inicio",
    },
  },
  de: {
    meta: {
      homeTitle: "rosa padel | Smarte Courts fuer jeden Club",
      homeDescription:
        "Professionelles Padel-Scoring, Instant Replay und Match-Analysen fuer Clubs, Spieler und Turniere.",
      imprintTitle: "rosa padel | Impressum",
      privacyTitle: "rosa padel | Datenschutz",
      cookiesTitle: "rosa padel | Cookie-Richtlinie",
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
      newTab: "Turniere",
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
      origin: { technology: "Deutsche Technologie.", heart: "Mexikanisches Herz." },
    },
    problemSolution: {
      gapLabel: "Die Luecke",
      gapTitle: "Einfache Scoring-Apps reichen nicht aus. Pro-Systeme sind zu teuer.",
      gapBody:
        "Padel-Clubs muessen heute zwischen unzuverlaessigen Gratis-Apps und teuren Broadcast-Loesungen waehlen. Spieler erhalten keine Analysen. Clubs verlieren Umsatz. Turniere bleiben manuell.",
      solutionLabel: "rosa schliesst sie",
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
      title: "Zwei Produkte. Ein Ökosystem.",
      subtitle: "rosa portable für LED-Scoring und rosa vision für den vernetzten Court. rosa coach ist die KI-Software-Ebene.",
      popular: "Beliebt",
      items: [
        {
          tier: "Mobiles Scoring",
          name: "rosa portable",
          description:
            "Tragbares LED-Scoring fuer jeden Court. Touchpad-Steuerung, Offline-Betrieb und Plug-and-Play-Installation.",
          features: ["LED-Scoreboard", "Touchpad-Steuerung", "Offline-Modus", "Plug and Play"],
        },
        {
          tier: "Vernetzter Court",
          name: "rosa vision",
          status: "Vorverkauf",
          description:
            "HD-Scoring, Pads und Video in einem vernetzten Court-System.",
          features: ["HD-Scoring", "Pads durch das Glas", "Replay & VAR", "Turniermanagement"],
          note: "rosa coach ergänzt das Matcherlebnis um die KI-Ebene.",
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
            "rosa portable für LED-Scoring oder rosa vision für HD-Scoring, Pads und Video auf dem vernetzten Court einrichten.",
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
      accent: "rosa",
      titleSuffix: " haelt sie fest.",
      status: "Matcherlebnis + KI-Ebene",
      demoCtaLabel: "rosa coach entdecken",
      demoCtaHint: "Entdecke die KI-Ebene für Schlaganalyse und taktische Einblicke.",
      body:
        "Spieler gehen von Live-Tracking zu Replay, Review und teilbaren Momenten ueber. rosa vision ist darauf ausgelegt, jedes Match zu etwas zu machen, das man spaeter erneut ansehen, verstehen und weitergeben kann.",
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
      label: "rosa vision",
      title: "Vom Court ins Clubhaus.",
      body:
        "rosa vision verbindet HD-Scoring, Pads und Video mit Live-Spiel, Replay, Spieler-Historie und Club-Screens.",
      status: "Vernetztes Court-System",
      playerTitle: "Fuer Spieler",
      playerBody:
        "Verwandle ein Match in einen wiederholbaren Loop, der Spieler auch nach dem Verlassen des Courts bindet.",
      playerItems: [
        { title: "Match aufzeichnen", desc: "Erfasse die komplette Session auf Basis von rosa Scoring und HD-Ausgabe." },
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
        { title: "System-Kontinuitaet", desc: "Erweitere den rosa Stack, ohne den Live-Scoring-Workflow zu ersetzen." },
      ],
      footerTitle: "Als Erweiterung des rosa Stacks gebaut",
      footerBody:
        "Vision ist darauf ausgelegt, auf rosa Scoring und HD-Ausgabe aufzubauen, damit Clubs von Live-Betrieb zu Replay, Content und Insights wachsen koennen, ohne ihr restliches Setup auszutauschen.",
    },
    tournaments: {
      label: "Turniere & Events",
      title: "Veranstalte Events wie die Profis",
      futureLabel: "Vision-Erweiterung",
      body:
        "Von lokalen Padel-Turnieren bis zu Premium-Events uebernimmt rosa heute das Live-Matcherlebnis, waehrend rosa vision das System um Replay, Highlights und Screen-Content erweitert.",
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
          desc: "Skaliere von einem einzelnen Court bis zu Events ueber den gesamten Standort. Jeder Court laeuft mit rosa vision eigenstaendig.",
        },
      ],
      highlightTitle: "Replay- und Screen-Ausgabe",
      highlightBody:
        "rosa vision soll replay-faehige Ausgaben, teilbare Clips und Venue-Screen-Momente ueber die rosa Live-Scoring-Ebene legen, ohne Turnier-Management-Tools zu ersetzen.",
    },
    clubRoi: {
      label: "Club-ROI",
      title: "Fuer Padel-Spieler entwickelt. Fuer Clubs gebaut.",
      body:
        "rosa verbessert das Spielerlebnis und hilft Clubs beim Wachstum. Mehr Bindung, reibungslosere Ablaeufe und neue Umsatzchancen.",
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
      modeLabel: "Kontaktoptionen",
      referral: {
        tab: "Club empfehlen",
        title: "Deine Empfehlung wird ",
        accent: "belohnt.",
        body: "Empfiehl uns deinem Club als Erster. Kauft er rosa vision über deine Empfehlung, erhältst du 2.000 MXN.",
        instructions: "Teile uns diese Angaben mit:",
        required: "Pflichtfeld",
        optional: "Optional",
        fields: {
          name: "Vollständiger Name",
          phone: "Deine Telefonnummer",
          club: "Name des empfohlenen Clubs",
          location: "Stadt und Land des Clubs",
          administrator: "Name der Clubleitung / des Eigentümers",
          administratorPhone: "Telefonnummer der Clubleitung",
          website: "Website oder Instagram des Clubs",
        },
        contactNote: "Gib nur geschäftliche Kontaktdaten weiter, die du mit Erlaubnis teilen darfst.",
        submit: "Empfehlung senden",
        successTitle: "Empfehlung erhalten.",
        successBody: "Danke für die Vorstellung deines Clubs. Unser Team meldet sich bei dir zu den nächsten Schritten.",
        another: "Weitere Empfehlung senden",
        requiredError: "Bitte fülle dieses Pflichtfeld aus.",
        phoneError: "Gib eine gültige Telefonnummer mit Ländervorwahl ein.",
      },
      title: "Bringe deine ",
      accent: "Anlage",
      body:
        "Nimm Kontakt auf und erlebe rosa in Aktion. Wir zeigen dir die passende Stufe fuer deinen Club.",
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
        description: "Anbieterinformationen und Pflichtangaben fuer die Website von rosa padel.",
        sections: {
          providerTitle: "Anbieterinformationen",
          providerRows: [
            ["Marke / Website", "rosa padel"],
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
            "rosa padel ist weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Pflicht besteht. Die fruehere EU-Online-Streitbeilegungsplattform wurde am 20. Juli 2025 eingestellt.",
        },
      },
      privacy: {
        title: "Datenschutzerklaerung",
        description: "Informationen darueber, wie personenbezogene Daten auf der Website von rosa padel verarbeitet werden.",
        sections: {
          controllerTitle: "1. Verantwortlicher",
          controllerRows: [
            ["Verantwortlicher", "rosa padel, vertreten durch Rodrigo Ponce"],
            ["Adresse", "Bildungscampus 1, 74076 Heilbronn, Deutschland"],
            ["E-Mail", "rodrigo@rosapadel.com"],
            ["Datenschutzbeauftragter", "Es wurde kein Datenschutzbeauftragter benannt, sofern dies nicht gesetzlich erforderlich ist."],
          ],
          dataTitle: "2. Verarbeitete Daten",
          dataList: [
            "Kontaktdaten aus dem Formular wie Name, E-Mail-Adresse, Organisation und gewaehltes Anliegen.",
            "Clubempfehlungen: dein Name und deine Telefonnummer, Clubname, Stadt und Land sowie freiwillige Angaben zur Clubleitung, deren geschäftlicher Telefonnummer und zur Website oder zum Instagram-Profil des Clubs. Wir nutzen diese Angaben zur Bearbeitung der Empfehlung.",
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
        description: "Informationen zu Cookies und lokalem Speicher auf der Website von rosa padel.",
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
      label: "Das rosa-Ökosystem",
      title: "Ein System. Jeder Court.",
      subtitle: "Zwei Hardware-Produkte: mobiles Scoring oder der vernetzte Court. rosa coach ergänzt die KI-Ebene.",
      carouselHint: "Produkte wischen",
      viewProduct: "Produkt ansehen",
      items: [
        {
          num: "01",
          tier: "Mobiles Scoring",
          name: "rosa portable",
          tagline: "Einstecken. Spielen. Punkten.",
          status: "Produktionsbereit",
          statusType: "available",
          href: "/products/portable",
          features: ["LED-Scoreboard", "Touchpad-Steuerung", "Offline-Modus", "Plug & Play"],
        },
        {
          num: "02",
          tier: "Vernetzter Court",
          name: "rosa vision",
          tagline: "Scoring. Replay. Vernetzung.",
          status: "Vorverkauf",
          statusType: "presale",
          href: "/products/vision",
          features: ["HD-Scoring", "Pads durch das Glas", "Replay & VAR", "Automatisches Turniermanagement"],
        },
      ],
      aiLayer: {
        name: "rosa coach",
        tier: "KI-Ebene",
        body: "Die Intelligenz-Ebene für rosa vision: Schlaganalyse, taktische Einblicke und Fortschrittsverfolgung als Software-Erweiterung des Matcherlebnisses.",
        status: "In Entwicklung",
        statusType: "coming",
        href: "/products/coach",
        cta: "rosa coach entdecken",
      },
    },
    audiencePortals: {
      label: "Für dein Spiel gemacht",
      title: "Für wen ist rosa?",
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
      subtitle: "Schätze den zusätzlichen Umsatz, den rosa fuer deinen Club schaffen kann.",
      courtLabel: "Anzahl Courts",
      bookingsLabel: "Durchschnittliche Buchungen pro Court / Monat",
      priceLabel: "Durchschnittlicher Buchungspreis (€)",
      monthlyLabel: "Potenzieller zusätzlicher Club-Umsatz pro Monat",
      numberContext: "Das ist geschätzter Upside fuer deinen Club, nicht der rosa-Preis.",
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
      cta: "rosa jetzt holen",
    },
    notFound: {
      title: "404",
      body: "Ups. Diese Seite wurde nicht gefunden",
      cta: "Zurueck zur Startseite",
    },
  },
} as const;

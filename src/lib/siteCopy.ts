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
        "Professional padel scoring, instant replay, and match analytics built for clubs, players, and tournaments.",
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
    },
    hero: {
      headlines: [
        { prefix: "The ", accent: "Pro", suffix: " Experience.", secondLine: "Any Court." },
        { prefix: "The ", accent: "Smartest", suffix: " Court", secondLine: "On Earth." },
      ],
      subtitle:
        "Professional padel scoring, instant replay, and match analytics designed for players, built for any court.",
      primaryCta: "Book a Demo",
      secondaryCta: "See Products",
      badges: ["Live Scoring", "Instant Replay", "Match Analytics"],
    },
    problemSolution: {
      gapLabel: "The Gap",
      gapTitle: "Basic scoring apps can't keep up. Pro systems cost a fortune.",
      gapBody:
        "Padel clubs are stuck choosing between unreliable free apps and expensive broadcast-grade setups designed for pro tours. Players get no analytics. Clubs miss revenue. Tournaments stay manual.",
      solutionLabel: "rosa fills it",
      solutionTitle: "A modular smart padel court system that works on any budget.",
      solutionBody:
        "Start with LED scoring, scale to HD replay and AI-powered vision analytics. Every tier is designed to give players a professional experience from the first match.",
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
            "Portable LED scoring for any court. Touchpad control, offline operation, and plug-and-play installation.",
          features: ["LED Scoreboard", "Touchpad Control", "Offline Mode", "Plug & Play", "Tournament Ready"],
        },
        {
          tier: "Growth",
          name: "Core HD",
          description:
            "HD display with QR or web match setup, referee mode, and premium event branding capabilities.",
          features: ["HD Monitor Display", "QR/Web Setup", "Referee Mode", "Custom Branding", "Event Management", "Cloud Sync"],
        },
        {
          tier: "Advanced",
          name: "rosa Vision",
          description:
            "AI-powered analysis with video replay, heatmaps, and shot classification. Access your full match video and stats online after every game.",
          features: ["Everything in Core HD", "AI Video Analysis", "Instant Replay", "Heatmaps", "Shot Classification", "Player Stats", "Online Match Access"],
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
            "Core LED is plug-and-play and sets up on any padel court in under a minute. HD and Vision also use a very quick, simple installation, with only a monitor and power connection required.",
        },
        {
          num: "02",
          title: "Run Live Matches",
          description:
            "Players see real-time scoring. Spectators get clear visibility. Tournaments run without downtime.",
        },
        {
          num: "03",
          title: "Review & Improve",
          description:
            "Access instant replay, heatmaps, shot analytics, and match summaries. Share highlights directly.",
        },
      ],
    },
    playerExperience: {
      label: "Player Experience",
      title: "Every match tells a story.",
      accent: "rosa",
      titleSuffix: " captures it.",
      body:
        "From casual padel rallies to competitive tournaments, replay your best shots, understand your patterns, and share highlights with your team.",
      features: [
        { label: "Instant Replay", desc: "Relive every point in HD" },
        { label: "Shot Breakdown", desc: "Smashes, bandejas, viboras per player" },
        { label: "Match Summary", desc: "Full stats per set with comparisons" },
        { label: "Video Output", desc: "Auto-generated match highlights" },
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
        highlights: "Match Highlights",
      },
    },
    tournaments: {
      label: "Tournaments & Events",
      title: "Run Events Like the Pros",
      body:
        "From local padel tournaments to premium events, rosa handles the match experience so organizers can focus on the event.",
      benefits: [
        {
          title: "Live Court Visibility",
          desc: "Real-time scores visible on court and remotely. Spectators and organizers always know the match status.",
        },
        {
          title: "Pro Match Experience",
          desc: "Every match feels premium with live scoring, instant replays, and post-match stats for players and spectators.",
        },
        {
          title: "Post-Match Content",
          desc: "Players get shareable match videos and stats. Organizers get content for social media and event promotion.",
        },
        {
          title: "Multi-Court Ready",
          desc: "Scale from a single court to full-venue events. Each court runs independently with rosa Vision.",
        },
      ],
      highlightTitle: "TV-Style Video Output",
      highlightBody:
        "Every match generates a full video with live score overlay throughout the game and complete statistics at the end of each set, just like a professional broadcast. Players can share and relive their matches instantly.",
    },
    clubRoi: {
      label: "Club ROI",
      title: "Designed for Padel Players. Built for Clubs.",
      body:
        "rosa elevates the player experience while helping clubs grow. Better engagement, smoother operations, and new revenue opportunities.",
      metrics: [
        {
          value: "Up",
          label: "Player Retention",
          desc: "Smart courts drive higher rebooking and longer player engagement",
        },
        {
          value: "Pro",
          label: "Match Experience",
          desc: "Live scoring, replays, and stats that elevate every tournament match",
        },
        {
          value: "3+",
          label: "New Revenue Streams",
          desc: "Sponsorship displays, analytics subscriptions, and premium events",
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
        "Get in touch to see rosa in action. We'll walk you through the right tier for your club.",
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
        "Marcador profesional, repetición instantánea y analítica de partido para clubes, jugadores y torneos de pádel.",
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
      title: "Un sistema. Tres niveles.",
      subtitle: "Empieza donde estás. Escala cuando quieras. Cada nivel funciona por separado o en conjunto.",
      popular: "Popular",
      items: [
        {
          tier: "Entrada",
          name: "Core LED",
          description:
            "Marcador LED portátil para cualquier pista. Control por touchpad, funcionamiento offline e instalación plug and play.",
          features: ["Marcador LED", "Control por touchpad", "Modo offline", "Plug and play", "Listo para torneos"],
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
          name: "rosa Vision",
          description:
            "Analítica con IA, replay en vídeo, mapas de calor y clasificación de golpes. Accede al vídeo completo y a las estadísticas online después de cada partido.",
          features: ["Todo lo de Core HD", "Analítica de vídeo con IA", "Repetición instantánea", "Mapas de calor", "Clasificación de golpes", "Estadísticas por jugador", "Acceso online al partido"],
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
            "Accede a replay instantáneo, mapas de calor, analítica de golpes y resúmenes de partido. Comparte highlights al instante.",
        },
      ],
    },
    playerExperience: {
      label: "Experiencia del jugador",
      title: "Cada partido cuenta una historia.",
      accent: "rosa",
      titleSuffix: " la captura.",
      body:
        "Desde pachangas hasta torneos competitivos, revive tus mejores golpes, entiende tus patrones y comparte highlights con tu equipo.",
      features: [
        { label: "Repetición instantánea", desc: "Revive cada punto en HD" },
        { label: "Desglose de golpes", desc: "Remates, bandejas y víboras por jugador" },
        { label: "Resumen del partido", desc: "Estadísticas completas por set con comparaciones" },
        { label: "Salida de vídeo", desc: "Highlights generados automáticamente" },
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
        highlights: "Highlights del partido",
      },
    },
    tournaments: {
      label: "Torneos y eventos",
      title: "Gestiona eventos como los profesionales",
      body:
        "Desde torneos locales de pádel hasta eventos premium, rosa se ocupa de la experiencia del partido para que los organizadores se centren en el evento.",
      benefits: [
        {
          title: "Visibilidad en pista",
          desc: "Marcadores en tiempo real visibles en pista y en remoto. Espectadores y organizadores siempre saben el estado del partido.",
        },
        {
          title: "Experiencia pro de partido",
          desc: "Cada partido se siente premium con marcador en vivo, replays instantáneos y estadísticas postpartido para jugadores y espectadores.",
        },
        {
          title: "Contenido postpartido",
          desc: "Los jugadores reciben vídeos y estadísticas para compartir. Los organizadores consiguen contenido para redes sociales y promoción del evento.",
        },
        {
          title: "Preparado para varias pistas",
          desc: "Escala de una sola pista a eventos de todo el recinto. Cada pista funciona de forma independiente con rosa Vision.",
        },
      ],
      highlightTitle: "Salida de vídeo estilo TV",
      highlightBody:
        "Cada partido genera un vídeo completo con marcador en vivo durante el juego y estadísticas al final de cada set, como una retransmisión profesional. Los jugadores pueden compartir y revivir sus partidos al instante.",
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
      title: "Ein System. Drei Stufen.",
      subtitle: "Starte dort, wo du stehst. Skaliere, wenn du bereit bist. Jede Stufe funktioniert allein oder zusammen.",
      popular: "Beliebt",
      items: [
        {
          tier: "Einstieg",
          name: "Core LED",
          description:
            "Tragbares LED-Scoring fuer jeden Court. Touchpad-Steuerung, Offline-Betrieb und Plug-and-Play-Installation.",
          features: ["LED-Scoreboard", "Touchpad-Steuerung", "Offline-Modus", "Plug and Play", "Turnierbereit"],
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
          name: "rosa Vision",
          description:
            "KI-gestuetzte Analyse mit Video-Replay, Heatmaps und Schlagklassifizierung. Greife nach jedem Match online auf Video und Statistiken zu.",
          features: ["Alles aus Core HD", "KI-Videoanalyse", "Instant Replay", "Heatmaps", "Schlagklassifizierung", "Spielerstatistiken", "Online-Matchzugang"],
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
            "Greife auf Instant Replay, Heatmaps, Schlaganalysen und Match-Zusammenfassungen zu. Teile Highlights direkt.",
        },
      ],
    },
    playerExperience: {
      label: "Spielererlebnis",
      title: "Jedes Match erzaehlt eine Geschichte.",
      accent: "rosa",
      titleSuffix: " haelt sie fest.",
      body:
        "Von lockeren Ballwechseln bis zu kompetitiven Turnieren: Spiele deine besten Punkte erneut ab, erkenne Muster und teile Highlights mit deinem Team.",
      features: [
        { label: "Instant Replay", desc: "Erlebe jeden Punkt in HD erneut" },
        { label: "Schlaganalyse", desc: "Smashes, Bandejas und Viboras pro Spieler" },
        { label: "Match-Zusammenfassung", desc: "Vollstaendige Satzstatistiken mit Vergleichen" },
        { label: "Video-Ausgabe", desc: "Automatisch erzeugte Match-Highlights" },
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
        highlights: "Match-Highlights",
      },
    },
    tournaments: {
      label: "Turniere & Events",
      title: "Veranstalte Events wie die Profis",
      body:
        "Von lokalen Padel-Turnieren bis zu Premium-Events uebernimmt rosa das Matcherlebnis, damit sich Veranstalter auf das Event konzentrieren koennen.",
      benefits: [
        {
          title: "Live-Sichtbarkeit auf dem Court",
          desc: "Echtzeit-Scores auf dem Court und remote sichtbar. Zuschauer und Veranstalter kennen jederzeit den Match-Status.",
        },
        {
          title: "Professionelles Matcherlebnis",
          desc: "Jedes Match wirkt hochwertig mit Live-Scoring, Instant Replays und Nach-Match-Statistiken fuer Spieler und Zuschauer.",
        },
        {
          title: "Content nach dem Match",
          desc: "Spieler erhalten teilbare Match-Videos und Statistiken. Veranstalter erhalten Content fuer Social Media und Event-Promotion.",
        },
        {
          title: "Bereit fuer mehrere Courts",
          desc: "Skaliere von einem einzelnen Court bis zu Events ueber den gesamten Standort. Jeder Court laeuft mit rosa Vision eigenstaendig.",
        },
      ],
      highlightTitle: "TV-aehnliche Video-Ausgabe",
      highlightBody:
        "Jedes Match erzeugt ein vollstaendiges Video mit Live-Score-Overlay waehrend des Spiels und kompletten Statistiken am Ende jedes Satzes, ganz wie bei einer professionellen Uebertragung. Spieler koennen ihre Matches sofort teilen und erneut ansehen.",
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
    notFound: {
      title: "404",
      body: "Ups. Diese Seite wurde nicht gefunden",
      cta: "Zurueck zur Startseite",
    },
  },
} as const;

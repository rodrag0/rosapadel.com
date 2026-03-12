(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const languageButtons = document.querySelectorAll('.lang-btn');
  const langSwitch = document.getElementById('lang-switch');
  const primaryNav = document.getElementById('primary-nav');
  const heroPoints = document.getElementById('hero-points');
  const brandLink = document.getElementById('brand-link');

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieEssentialButton = document.getElementById('cookie-essential');
  const cookieAcceptButton = document.getElementById('cookie-accept');

  const brandWordmark = document.getElementById('brand-wordmark');
  const footerWordmark = document.getElementById('footer-wordmark');
  const favicon = document.getElementById('site-favicon');
  const yearEl = document.getElementById('year');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metaTitle = document.getElementById('meta-title');
  const metaDescription = document.getElementById('meta-description');
  const metaKeywords = document.getElementById('meta-keywords');
  const metaOgTitle = document.getElementById('meta-og-title');
  const metaOgDescription = document.getElementById('meta-og-description');

  const assets = {
    dark: {
      wordmark: 'assets/brand/rosa-wordmark-dark.png',
      icon: 'assets/brand/rosa-icon-dark.svg',
    },
    light: {
      wordmark: 'assets/brand/rosa-wordmark-light.png',
      icon: 'assets/brand/rosa-icon-light.svg',
    },
  };

  const translations = {
    en: {
      meta: {
        title: 'ROSA | Smart Padel Infrastructure',
        description:
          'ROSA turns padel courts into professional match environments with real-time scoring, replay, and advanced match intelligence.',
        keywords: 'padel technology, smart scoreboard, padel analytics, tournament scoring, rosa padel',
        ogTitle: 'ROSA | Smart Padel Infrastructure',
        ogDescription:
          'Most systems stop at score. ROSA delivers real-time control, replay, and analytics in one platform.',
      },
      strings: {
        navProducts: 'Products',
        nav3d: '3D Court',
        navWhyRosa: 'Why ROSA',
        navBookDemo: 'Book Demo',

        heroEyebrow: 'Smart Padel Infrastructure',
        heroTitleMain: 'From scorekeeping to',
        heroTitleAccent: 'match intelligence.',
        heroSub:
          'Most alternatives stop at basic core scoring. ROSA gives clubs and tournaments a full progression: reliable in-game control, premium event experience, and AI-powered post-match insight.',
        heroCtaPrimary: 'Book a Demo',
        heroCtaSecondary: 'See Product Ladder',
        heroPoint1: 'Built for clubs, tournaments, and performance-focused players',
        heroPoint2: 'Single system from Core LED to advanced analytics',
        heroPoint3: 'Designed to improve operations and player experience at once',

        cardEyebrow: 'Live Match',
        cardSet: 'SET 2',
        cardCourt: 'COURT A',
        cardStatRally: 'Rally IQ',
        cardStatErrors: 'Unforced Errors',
        cardStatHeatmap: 'Heatmap Accuracy',

        proofLine: 'Pilot and partner momentum with clubs and court ecosystem players',

        diffEyebrow: 'Differentiation',
        diffTitle: 'Why ROSA outperforms scoreboard-only alternatives',
        diffCompTitle: 'Typical competitor offer',
        diffComp1: 'Basic score display',
        diffComp2: 'Limited event control',
        diffComp3: 'No meaningful post-match intelligence',
        diffRosaTitle: 'ROSA integrated system',
        diffRosa1: 'Reliable real-time score control',
        diffRosa2: 'Professional presentation for players and spectators',
        diffRosa3: 'Replay, stats, and AI-enabled performance insights',

        ladderEyebrow: 'Product Ladder',
        ladderTitle: 'Start where you are. Upgrade when you are ready.',
        tierEntry: 'Entry',
        tierGrowth: 'Growth',
        tierAdvanced: 'Advanced',
        tier1Desc: 'Portable, robust scoring for clubs that need plug-and-play reliability.',
        tier1a: 'LED matrix live score',
        tier1b: 'Touchpad point control',
        tier1c: 'Game mode and court change logic',
        tier2Desc: 'Richer display and smoother operations for premium events and club experiences.',
        tier2a: 'HD monitor interface',
        tier2b: 'QR or web setup flow',
        tier2c: 'Referee mode support',
        tier3Desc: 'Replay and analytics stack for clubs and players that want measurable improvement.',
        tier3a: 'Video replay and highlights',
        tier3b: 'Player stats and heatmaps',
        tier3c: 'AI-assisted match analysis',

        courtEyebrow: 'Interactive 3D',
        courtTitle: 'Explore a rotating padel court and highlight ROSA hardware',
        courtSub:
          'Use the controls to focus hardware, monitor, and cameras. Scroll through this section for a deconstruction effect.',
        courtTargetHardware: 'Highlight Hardware',
        courtTargetMonitor: 'Highlight Monitor',
        courtTargetCameras: 'Highlight Cameras',
        courtNote:
          'Tip: if you provide your own .glb models, this section can be swapped from primitives to production assets.',

        howEyebrow: 'How It Works',
        howTitle: 'Fast implementation, immediate value',
        step1Title: 'Deploy on court',
        step1Desc: 'Install the ROSA unit and configure game flow for your club or tournament format.',
        step2Title: 'Run live matches',
        step2Desc: 'Use practical controls built for uninterrupted play and clear spectator visibility.',
        step3Title: 'Review and improve',
        step3Desc: 'Turn replay and analytics into coaching, event quality, and player retention improvements.',

        actionEyebrow: 'Primary Action',
        actionTitle: 'Book your ROSA demo',
        actionSub: 'Share your club or tournament setup and we will recommend the right ROSA starting point.',
        formWorkEmail: 'Work Email',
        formName: 'Name',
        formOrganization: 'Club or Organization',
        formObjective: 'Main objective',
        objectivePlaceholder: 'Select an objective',
        objective1: 'Reliable score operations',
        objective2: 'Premium event experience',
        objective3: 'Replay and player analytics',
        formConsentPrefix: 'I have read the',
        formConsentSuffix: 'and agree to the processing of my data for demo contact.',
        formSubmit: 'Request My Demo',

        footerContact: 'Contact',
        footerTagline: 'Built for clubs, tournaments, and players ready for more than scorekeeping.',
        footerRights: 'All rights reserved.',

        legalImprint: 'Imprint',
        legalPrivacy: 'Privacy Policy',
        legalCookies: 'Cookies',

        cookieBannerText:
          'We use essential storage for language, theme, and consent preferences. No tracking cookies are set by default.',
        cookieEssential: 'Essential only',
        cookieAccept: 'Accept',

        demoSuccessToast: 'Demo request received. The ROSA team will contact you soon.',

        themeToLight: 'Light mode',
        themeToDark: 'Dark mode',
        ariaPrimaryNav: 'Primary',
        ariaLanguage: 'Language selector',
        ariaThemeToggle: 'Switch color theme',
        ariaHeroPoints: 'Key value points',
        ariaHomeLink: 'ROSA home',
      },
    },
    es: {
      meta: {
        title: 'ROSA | Infraestructura Inteligente para Padel',
        description:
          'ROSA convierte las pistas de padel en entornos profesionales con marcación en tiempo real, repetición y analítica avanzada del partido.',
        keywords: 'tecnologia padel, marcador inteligente, analitica padel, torneos padel, rosa padel',
        ogTitle: 'ROSA | Infraestructura Inteligente para Padel',
        ogDescription:
          'La mayoría se queda en el marcador. ROSA integra control en tiempo real, repetición y analítica en una sola plataforma.',
      },
      strings: {
        navProducts: 'Productos',
        nav3d: 'Pista 3D',
        navWhyRosa: 'Por qué ROSA',
        navBookDemo: 'Agendar demo',

        heroEyebrow: 'Infraestructura Inteligente para Padel',
        heroTitleMain: 'Del marcador básico a la',
        heroTitleAccent: 'inteligencia de partido.',
        heroSub:
          'La mayoría de alternativas se queda en el marcador core. ROSA ofrece una progresión completa para clubes y torneos: control fiable en juego, experiencia premium en evento y análisis postpartido con IA.',
        heroCtaPrimary: 'Agendar una demo',
        heroCtaSecondary: 'Ver niveles de producto',
        heroPoint1: 'Pensado para clubes, torneos y jugadores orientados al rendimiento',
        heroPoint2: 'Un solo sistema: de Core LED a analítica avanzada',
        heroPoint3: 'Mejora operaciones y experiencia del jugador al mismo tiempo',

        cardEyebrow: 'Partido en vivo',
        cardSet: 'SET 2',
        cardCourt: 'PISTA A',
        cardStatRally: 'IQ de rally',
        cardStatErrors: 'Errores no forzados',
        cardStatHeatmap: 'Precisión del mapa de calor',

        proofLine: 'Tracción inicial con clubes y socios del ecosistema de pistas',

        diffEyebrow: 'Diferenciación',
        diffTitle: 'Por qué ROSA supera a las opciones que solo muestran el marcador',
        diffCompTitle: 'Oferta típica de la competencia',
        diffComp1: 'Visualización básica del marcador',
        diffComp2: 'Control limitado del evento',
        diffComp3: 'Sin inteligencia útil postpartido',
        diffRosaTitle: 'Sistema integrado ROSA',
        diffRosa1: 'Control fiable del marcador en tiempo real',
        diffRosa2: 'Presentación profesional para jugadores y espectadores',
        diffRosa3: 'Repetición, estadísticas e insights con IA',

        ladderEyebrow: 'Escalera de producto',
        ladderTitle: 'Empieza donde estás hoy. Escala cuando lo necesites.',
        tierEntry: 'Entrada',
        tierGrowth: 'Crecimiento',
        tierAdvanced: 'Avanzado',
        tier1Desc: 'Marcación portátil y robusta para clubes que necesitan fiabilidad plug-and-play.',
        tier1a: 'Marcador LED en vivo',
        tier1b: 'Control de puntos con touchpad',
        tier1c: 'Modos de juego y lógica de cambio de pista',
        tier2Desc: 'Visualización HD y operación más fluida para eventos y clubes premium.',
        tier2a: 'Interfaz en monitor HD',
        tier2b: 'Configuración por QR o web',
        tier2c: 'Soporte para modo árbitro',
        tier3Desc: 'Capa de repetición y analítica para clubes y jugadores que buscan mejora medible.',
        tier3a: 'Repetición y highlights en video',
        tier3b: 'Estadísticas de jugador y mapas de calor',
        tier3c: 'Análisis asistido por IA',

        courtEyebrow: '3D interactivo',
        courtTitle: 'Explora una pista de padel giratoria y destaca el hardware de ROSA',
        courtSub:
          'Usa los controles para destacar hardware, monitor y cámaras. Haz scroll en esta sección para ver una deconstrucción.',
        courtTargetHardware: 'Destacar hardware',
        courtTargetMonitor: 'Destacar monitor',
        courtTargetCameras: 'Destacar cámaras',
        courtNote:
          'Tip: si compartes tus propios modelos .glb, esta sección se puede cambiar de primitivas a assets finales.',

        howEyebrow: 'Cómo funciona',
        howTitle: 'Implementación rápida, valor inmediato',
        step1Title: 'Instala en pista',
        step1Desc: 'Instala la unidad ROSA y configura el flujo de juego para tu club o torneo.',
        step2Title: 'Ejecuta partidos en vivo',
        step2Desc: 'Usa controles prácticos que no interrumpen el juego y mejoran la visibilidad.',
        step3Title: 'Analiza y mejora',
        step3Desc: 'Convierte repetición y analítica en mejor coaching, mejor evento y mayor retención.',

        actionEyebrow: 'Acción principal',
        actionTitle: 'Agenda tu demo de ROSA',
        actionSub: 'Cuéntanos tu operación de club o torneo y te recomendamos el punto de partida ideal.',
        formWorkEmail: 'Correo de trabajo',
        formName: 'Nombre',
        formOrganization: 'Club u organización',
        formObjective: 'Objetivo principal',
        objectivePlaceholder: 'Selecciona un objetivo',
        objective1: 'Operación fiable del marcador',
        objective2: 'Experiencia premium de evento',
        objective3: 'Repetición y analítica de jugadores',
        formConsentPrefix: 'He leído la',
        formConsentSuffix: 'y acepto el tratamiento de mis datos para contacto de demo.',
        formSubmit: 'Solicitar demo',

        footerContact: 'Contacto',
        footerTagline: 'Creado para clubes, torneos y jugadores que quieren más que un marcador.',
        footerRights: 'Todos los derechos reservados.',

        legalImprint: 'Aviso legal',
        legalPrivacy: 'Política de privacidad',
        legalCookies: 'Cookies',

        cookieBannerText:
          'Usamos almacenamiento esencial para idioma, tema y preferencias de consentimiento. No activamos cookies de seguimiento por defecto.',
        cookieEssential: 'Solo esenciales',
        cookieAccept: 'Aceptar',

        demoSuccessToast: 'Solicitud de demo recibida. El equipo de ROSA te contactará pronto.',

        themeToLight: 'Modo claro',
        themeToDark: 'Modo oscuro',
        ariaPrimaryNav: 'Navegación principal',
        ariaLanguage: 'Selector de idioma',
        ariaThemeToggle: 'Cambiar tema de color',
        ariaHeroPoints: 'Puntos clave de valor',
        ariaHomeLink: 'Inicio ROSA',
      },
    },
    de: {
      meta: {
        title: 'ROSA | Intelligente Padel-Infrastruktur',
        description:
          'ROSA verwandelt Padel-Plätze in professionelle Match-Umgebungen mit Live-Scoring, Replay und fortschrittlicher Match-Analyse.',
        keywords: 'padel technologie, smartes scoreboard, padel analyse, padel turniere, rosa padel',
        ogTitle: 'ROSA | Intelligente Padel-Infrastruktur',
        ogDescription:
          'Die meisten Systeme enden beim Scoreboard. ROSA vereint Echtzeitsteuerung, Replay und Analyse in einer Plattform.',
      },
      strings: {
        navProducts: 'Produkte',
        nav3d: '3D Court',
        navWhyRosa: 'Warum ROSA',
        navBookDemo: 'Demo buchen',

        heroEyebrow: 'Intelligente Padel-Infrastruktur',
        heroTitleMain: 'Vom Scoreboard zur',
        heroTitleAccent: 'Match-Intelligenz.',
        heroSub:
          'Viele Alternativen bleiben beim einfachen Core-Scoring stehen. ROSA bietet Clubs und Turnieren einen kompletten Ausbaupfad: zuverlässige In-Game-Steuerung, Premium-Event-Erlebnis und KI-gestützte Post-Match-Insights.',
        heroCtaPrimary: 'Demo buchen',
        heroCtaSecondary: 'Produktstufen ansehen',
        heroPoint1: 'Für Clubs, Turniere und leistungsorientierte Spieler entwickelt',
        heroPoint2: 'Ein System von Core LED bis zu fortschrittlicher Analyse',
        heroPoint3: 'Verbessert Betrieb und Spielererlebnis gleichzeitig',

        cardEyebrow: 'Live-Match',
        cardSet: 'SATZ 2',
        cardCourt: 'PLATZ A',
        cardStatRally: 'Rally-IQ',
        cardStatErrors: 'Unforced Errors',
        cardStatHeatmap: 'Heatmap-Genauigkeit',

        proofLine: 'Erste Traktion mit Clubs und Partnern aus dem Court-Ökosystem',

        diffEyebrow: 'Differenzierung',
        diffTitle: 'Warum ROSA besser ist als reine Scoreboard-Lösungen',
        diffCompTitle: 'Typisches Wettbewerbsangebot',
        diffComp1: 'Einfache Score-Anzeige',
        diffComp2: 'Begrenzte Event-Steuerung',
        diffComp3: 'Keine verwertbare Post-Match-Intelligenz',
        diffRosaTitle: 'Integriertes ROSA-System',
        diffRosa1: 'Zuverlässige Echtzeit-Score-Steuerung',
        diffRosa2: 'Professionelle Darstellung für Spieler und Zuschauer',
        diffRosa3: 'Replay, Statistiken und KI-gestützte Insights',

        ladderEyebrow: 'Produktstufen',
        ladderTitle: 'Starten Sie dort, wo Sie heute stehen. Erweitern Sie bei Bedarf.',
        tierEntry: 'Einstieg',
        tierGrowth: 'Wachstum',
        tierAdvanced: 'Fortgeschritten',
        tier1Desc: 'Portables, robustes Scoring für Clubs mit Bedarf an Plug-and-Play-Zuverlässigkeit.',
        tier1a: 'LED-Live-Scoreboard',
        tier1b: 'Punktsteuerung per Touchpad',
        tier1c: 'Spielmodi und Platzwechsel-Logik',
        tier2Desc: 'HD-Darstellung und reibungsloser Betrieb für Premium-Events und Clubs.',
        tier2a: 'HD-Monitor-Interface',
        tier2b: 'Setup per QR oder Web',
        tier2c: 'Unterstützung für Schiedsrichtermodus',
        tier3Desc: 'Replay- und Analyse-Ebene für Clubs und Spieler mit messbarem Verbesserungsziel.',
        tier3a: 'Video-Replay und Highlights',
        tier3b: 'Spielerstatistiken und Heatmaps',
        tier3c: 'KI-gestützte Match-Analyse',

        courtEyebrow: 'Interaktives 3D',
        courtTitle: 'Erkunde einen rotierenden Padel-Court und markiere ROSA-Hardware',
        courtSub:
          'Mit den Controls kannst du Hardware, Monitor und Kameras hervorheben. Beim Scrollen wird ein Deconstruction-Effekt ausgelöst.',
        courtTargetHardware: 'Hardware hervorheben',
        courtTargetMonitor: 'Monitor hervorheben',
        courtTargetCameras: 'Kameras hervorheben',
        courtNote:
          'Hinweis: Mit eigenen .glb-Modellen kann dieser Bereich von Platzhaltern auf Produktionsassets umgestellt werden.',

        howEyebrow: 'So funktioniert es',
        howTitle: 'Schnelle Umsetzung, sofortiger Mehrwert',
        step1Title: 'Am Court installieren',
        step1Desc: 'ROSA-Einheit installieren und Spielablauf für Club oder Turnier konfigurieren.',
        step2Title: 'Live-Matches durchführen',
        step2Desc: 'Praktische Bedienung ohne Spielunterbrechung und mit klarer Sichtbarkeit.',
        step3Title: 'Auswerten und verbessern',
        step3Desc: 'Replay und Analysen in besseres Coaching, bessere Events und höhere Bindung umsetzen.',

        actionEyebrow: 'Primäre Aktion',
        actionTitle: 'ROSA-Demo buchen',
        actionSub: 'Teile dein Club- oder Turnier-Setup und wir empfehlen den passenden ROSA-Startpunkt.',
        formWorkEmail: 'Geschäftliche E-Mail',
        formName: 'Name',
        formOrganization: 'Club oder Organisation',
        formObjective: 'Hauptziel',
        objectivePlaceholder: 'Ziel auswählen',
        objective1: 'Zuverlässiger Scoreboard-Betrieb',
        objective2: 'Premium-Event-Erlebnis',
        objective3: 'Replay und Spieleranalyse',
        formConsentPrefix: 'Ich habe die',
        formConsentSuffix: 'gelesen und stimme der Verarbeitung meiner Daten zur Demo-Kontaktaufnahme zu.',
        formSubmit: 'Demo anfragen',

        footerContact: 'Kontakt',
        footerTagline: 'Für Clubs, Turniere und Spieler, die mehr als nur ein Scoreboard wollen.',
        footerRights: 'Alle Rechte vorbehalten.',

        legalImprint: 'Impressum',
        legalPrivacy: 'Datenschutz',
        legalCookies: 'Cookies',

        cookieBannerText:
          'Wir verwenden nur essenziellen Speicher für Sprache, Theme und Einwilligungsstatus. Standardmäßig werden keine Tracking-Cookies gesetzt.',
        cookieEssential: 'Nur essenziell',
        cookieAccept: 'Akzeptieren',

        demoSuccessToast: 'Demo-Anfrage erhalten. Das ROSA-Team meldet sich in Kürze.',

        themeToLight: 'Heller Modus',
        themeToDark: 'Dunkler Modus',
        ariaPrimaryNav: 'Hauptnavigation',
        ariaLanguage: 'Sprachauswahl',
        ariaThemeToggle: 'Farbmodus wechseln',
        ariaHeroPoints: 'Wichtige Nutzenpunkte',
        ariaHomeLink: 'ROSA Startseite',
      },
    },
  };

  function getLanguagePack() {
    const language = root.getAttribute('lang');
    return translations[language] || translations.en;
  }

  function updateThemeToggleLabel() {
    if (!toggle) {
      return;
    }

    const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const pack = getLanguagePack();
    toggle.textContent = currentTheme === 'dark' ? pack.strings.themeToLight : pack.strings.themeToDark;
  }

  function updateLanguageButtons(language) {
    languageButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.lang === language);
      button.setAttribute('aria-pressed', button.dataset.lang === language ? 'true' : 'false');
    });
  }

  function applyTranslations(language) {
    const pack = translations[language] || translations.en;
    root.setAttribute('lang', language);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      const value = pack.strings[key];
      if (typeof value === 'string') {
        element.textContent = value;
      }
    });

    if (metaTitle) {
      metaTitle.textContent = pack.meta.title;
    }
    if (metaDescription) {
      metaDescription.setAttribute('content', pack.meta.description);
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', pack.meta.keywords);
    }
    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', pack.meta.ogTitle);
    }
    if (metaOgDescription) {
      metaOgDescription.setAttribute('content', pack.meta.ogDescription);
    }

    if (primaryNav) {
      primaryNav.setAttribute('aria-label', pack.strings.ariaPrimaryNav);
    }
    if (langSwitch) {
      langSwitch.setAttribute('aria-label', pack.strings.ariaLanguage);
    }
    if (toggle) {
      toggle.setAttribute('aria-label', pack.strings.ariaThemeToggle);
    }
    if (heroPoints) {
      heroPoints.setAttribute('aria-label', pack.strings.ariaHeroPoints);
    }
    if (brandLink) {
      brandLink.setAttribute('aria-label', pack.strings.ariaHomeLink);
    }

    updateLanguageButtons(language);
    updateThemeToggleLabel();
  }

  function setLanguage(language, persist) {
    const nextLanguage = ['en', 'es', 'de'].includes(language) ? language : 'en';
    applyTranslations(nextLanguage);

    if (persist) {
      localStorage.setItem('rosa-language', nextLanguage);
    }
  }

  function initLanguage() {
    const saved = localStorage.getItem('rosa-language');
    if (saved && ['en', 'es', 'de'].includes(saved)) {
      setLanguage(saved, false);
      return;
    }

    const browserLanguage = (navigator.language || 'en').slice(0, 2).toLowerCase();
    setLanguage(['en', 'es', 'de'].includes(browserLanguage) ? browserLanguage : 'en', false);
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('rosa-theme', theme);

    const mapping = assets[theme] || assets.dark;
    if (brandWordmark) {
      brandWordmark.src = mapping.wordmark;
    }
    if (footerWordmark) {
      footerWordmark.src = mapping.wordmark;
    }
    if (favicon) {
      favicon.href = mapping.icon;
    }

    updateThemeToggleLabel();
  }

  function initTheme() {
    const saved = localStorage.getItem('rosa-theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      return;
    }

    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }

  function initReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) {
      return;
    }

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  function initHeroTilt() {
    const stage = document.getElementById('hero-stage');
    const card = document.getElementById('stage-card');
    if (!stage || !card || reducedMotion) {
      return;
    }

    let rafId = null;
    let targetX = -6;
    let targetY = 8;

    function draw() {
      card.style.setProperty('--tilt-x', targetX.toFixed(2) + 'deg');
      card.style.setProperty('--tilt-y', targetY.toFixed(2) + 'deg');
      rafId = null;
    }

    function queueDraw() {
      if (rafId == null) {
        rafId = window.requestAnimationFrame(draw);
      }
    }

    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      targetY = (px - 0.5) * 18;
      targetX = (0.5 - py) * 14;
      queueDraw();
    });

    stage.addEventListener('pointerleave', () => {
      targetX = -6;
      targetY = 8;
      queueDraw();
    });
  }

  function closeCookieBanner(choice) {
    localStorage.setItem('rosa-cookie-consent', choice);
    if (!cookieBanner) {
      return;
    }

    cookieBanner.hidden = true;
  }

  function initCookieBanner() {
    if (!cookieBanner) {
      return;
    }

    const consent = localStorage.getItem('rosa-cookie-consent');
    if (consent === 'essential' || consent === 'all') {
      cookieBanner.hidden = true;
      return;
    }

    cookieBanner.hidden = false;

    if (cookieEssentialButton) {
      cookieEssentialButton.addEventListener('click', () => {
        closeCookieBanner('essential');
      });
    }

    if (cookieAcceptButton) {
      cookieAcceptButton.addEventListener('click', () => {
        closeCookieBanner('all');
      });
    }
  }

  function initToast() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') !== 'success') {
      return;
    }

    const toast = document.getElementById('demo-success');
    if (!toast) {
      return;
    }

    toast.hidden = false;
    window.setTimeout(() => {
      toast.classList.add('hide');
    }, 3800);

    window.history.replaceState({}, document.title, window.location.pathname);
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  initLanguage();
  initTheme();
  initReveal();
  initHeroTilt();
  initCookieBanner();
  initToast();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.lang;
      setLanguage(selected, true);
    });
  });
})();

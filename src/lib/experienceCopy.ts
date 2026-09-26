import type { Language } from "./siteCopy";

type Item = { title: string; body: string };
type EventFormat = Item & {
  id: string;
  label: string;
  points: string[];
  round: string;
  rows: { court: string; match: string; stage: string }[];
};

interface ExperienceCopy {
  nav: { events: string; players: string; explore: string };
  hero: {
    label: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
    photo: string;
  };
  values: Item[];
  flow: { label: string; title: string; steps: Item[]; note: string };
  audiences: {
    label: string;
    title: string;
    clubs: Item & { points: string[]; cta: string };
    players: Item & { points: string[]; cta: string };
  };
  eventsTeaser: {
    label: string;
    title: string;
    body: string;
    cta: string;
    formats: Item[];
  };
  proof: {
    label: string;
    title: string;
    body: string;
    play: string;
    videoLabel: string;
    caption: string;
    error: string;
    email: string;
    social: string;
    socialBody: string;
  };
  contact: { label: string; title: string; body: string; points: string[] };
  events: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
    capabilities: Item[];
    connectionLabel: string;
    connectionTitle: string;
    connectionBody: string;
    connection: Item[];
    formatLabel: string;
    formatTitle: string;
    formatBody: string;
    formats: EventFormat[];
    example: string;
    exampleNote: string;
    court: string;
    match: string;
    stage: string;
    compatibilityLabel: string;
    compatibilityTitle: string;
    hdBody: string;
    visionBody: string;
    ledNote: string;
    faqTitle: string;
    faqs: Item[];
  };
}

export const experienceCopy: Record<Language, ExperienceCopy> = {
  es: {
    nav: {
      events: "Eventos y torneos",
      players: "Para jugadores",
      explore: "Explora",
    },
    hero: {
      label: "Tecnología de pista. Experiencia de club.",
      title: "Cada punto cuenta. También fuera de la pista.",
      body: "Marcador en directo, replay, revisión VAR y análisis. La experiencia conectada de rosa para jugadores, clubes y sus próximos eventos.",
      primary: "Hablemos de tu club",
      secondary: "Ver un partido real",
      note: "Vision en fase piloto. Descubre la configuración para tu club.",
      photo: "Un partido real con rosa",
    },
    values: [
      {
        title: "Marca el punto",
        body: "Pads que responden a través del cristal.",
      },
      {
        title: "Vuelve a la jugada",
        body: "Replay y revisión VAR con Vision.",
      },
      {
        title: "Conoce tu partido",
        body: "Vídeo, contexto e información para mejorar.",
      },
      { title: "Activa tu club", body: "Eventos conectados al marcador." },
    ],
    flow: {
      label: "Así funciona",
      title: "Toca. Juega. Vuelve a verlo.",
      steps: [
        {
          title: "El punto empieza contigo",
          body: "Los jugadores actualizan el marcador tocando los pads de rosa a través del cristal. Sin sacar el móvil ni abrir una app.",
        },
        {
          title: "La jugada, en contexto",
          body: "El marcador acompaña al vídeo. Vision incorpora replay y revisión VAR para volver a una jugada con jugadores o árbitro.",
        },
        {
          title: "El partido sigue",
          body: "Revisa momentos, consulta tu historial y comparte lo mejor. En un evento, el resultado alimenta la siguiente fase.",
        },
      ],
      note: "Las funciones de vídeo y análisis dependen de la configuración y los servicios contratados. La decisión sobre la jugada sigue siendo de jugadores o árbitro.",
    },
    audiences: {
      label: "Una pista. Más posibilidades.",
      title: "Bueno para quien juega. Bueno para tu club.",
      clubs: {
        title: "Un club al que apetece volver.",
        body: "Una experiencia que acompaña al jugador y una operación más sencilla para tu equipo.",
        points: [
          "Menos captura manual de resultados",
          "Más contenido para comunidad y patrocinadores",
          "Eventos que conectan a tus jugadores",
        ],
        cta: "Descubrir rosa para clubes",
      },
      players: {
        title: "Tu partido merece una segunda mirada.",
        body: "Concéntrate en jugar. El marcador está a la vista y Vision abre la puerta a revivir el partido después.",
        points: [
          "Marca sin interrumpir el ritmo",
          "Revisa una jugada con vídeo",
          "Conserva y comparte tus mejores momentos",
        ],
        cta: "Explorar rosa Vision",
      },
    },
    eventsTeaser: {
      label: "Eventos y torneos",
      title: "Más pádel. Menos trabajo entre partidos.",
      body: "Conecta el marcador de la pista con rondas, resultados y pantallas del club. Una misma experiencia, desde la inscripción hasta la última final.",
      cta: "Explorar eventos y torneos",
      formats: [
        { title: "Torneos", body: "Cuadros, cruces y asignación de pistas." },
        { title: "Ligas", body: "Jornadas, resultados y clasificación." },
        {
          title: "Americanos y sociales",
          body: "Rondas, rotación de parejas y comunidad.",
        },
      ],
    },
    proof: {
      label: "En la pista, de verdad",
      title: "Un partido. Pads. Marcador en directo.",
      body: "Este es un partido jugado con rosa. Los jugadores marcan con los pads y el resultado se actualiza sobre el vídeo de la cámara.",
      play: "Ver el partido",
      videoLabel: "Partido real con marcador rosa",
      caption: "Grabación real · Pads y marcador conectado al vídeo",
      error: "El vídeo no está disponible en este momento.",
      email: "Solicitar una demostración",
      social: "Seguimos jugando.",
      socialBody: "Pruebas, partidos y novedades del equipo de rosa.",
    },
    contact: {
      label: "Tu próximo paso",
      title: "Hablemos de tu club.",
      body: "Cuéntanos cómo jugáis y qué quieres mejorar. Te enseñamos la configuración de rosa que tiene sentido para ti.",
      points: [
        "Una conversación con nuestro equipo",
        "Una configuración para tus pistas",
        "Disponibilidad y próximos pasos claros",
      ],
    },
    events: {
      metaTitle: "rosa padel | Eventos y torneos",
      metaDescription:
        "Conecta el marcador rosa con la organización de torneos, ligas y jornadas sociales: pistas, rondas, resultados y pantallas del club.",
      label: "rosa Vision + herramientas para tu club",
      title: "Eventos y torneos.",
      body: "Del punto en la pista a la clasificación. Conecta el juego con la organización y dedica más tiempo a tu comunidad.",
      primary: "Planear mi evento",
      secondary: "Explorar formatos",
      note: "Configuramos contigo los formatos y funciones que necesita tu club.",
      capabilities: [
        { title: "Organiza", body: "Participantes, formato y pistas." },
        { title: "Conecta", body: "El marcador alimenta los resultados." },
        { title: "Coordina", body: "Rondas y próximos encuentros." },
        { title: "Comparte", body: "La jornada en las pantallas del club." },
      ],
      connectionLabel: "La diferencia está en la pista",
      connectionTitle: "El resultado no tiene que viajar en papel.",
      connectionBody:
        "Los pads, rosa Vision y la gestión del evento trabajan sobre el mismo flujo de marcador. El organizador mantiene la supervisión y valida los resultados.",
      connection: [
        {
          title: "El jugador toca el pad",
          body: "Registra el punto a través del cristal, sin usar el móvil durante el partido.",
        },
        {
          title: "rosa Vision actualiza",
          body: "El marcador de la pista refleja el estado del partido y proporciona el flujo de puntuación.",
        },
        {
          title: "El evento avanza",
          body: "El software recibe los resultados para actualizar la jornada y preparar los siguientes encuentros.",
        },
        {
          title: "Todo el club lo sigue",
          body: "Pantallas con partidos, asignaciones y clasificación ayudan a cada jugador a situarse.",
        },
      ],
      formatLabel: "Encuentra tu formato",
      formatTitle: "Una final. Una liga. Un sábado de pádel.",
      formatBody:
        "Cada club compite a su manera. Estos ejemplos muestran cómo organizar la jornada; concretamos la disponibilidad de cada formato en la demo.",
      formats: [
        {
          id: "tournaments",
          label: "Torneos",
          title: "De los primeros cruces a la final.",
          body: "Organiza parejas, pistas y fases con una vista común del torneo.",
          points: [
            "Cuadro y progresión de encuentros",
            "Asignación de pistas y supervisión de resultados",
            "Información de la siguiente ronda",
          ],
          round: "Torneo del club · Cuartos de final",
          rows: [
            {
              court: "01",
              match: "Pareja A / Pareja B",
              stage: "Cuartos de final",
            },
            {
              court: "02",
              match: "Pareja C / Pareja D",
              stage: "Cuartos de final",
            },
            {
              court: "03",
              match: "Ganador 1 / Ganador 2",
              stage: "Siguiente ronda",
            },
          ],
        },
        {
          id: "leagues",
          label: "Ligas",
          title: "Una comunidad que vuelve cada jornada.",
          body: "Da continuidad a la competición con calendario, resultados y una clasificación compartida.",
          points: [
            "Calendario por jornadas",
            "Resultados asociados a cada encuentro",
            "Seguimiento de la clasificación",
          ],
          round: "Liga del club · Jornada 4",
          rows: [
            {
              court: "01",
              match: "Equipo Norte / Equipo Sur",
              stage: "Jornada 4",
            },
            {
              court: "02",
              match: "Equipo Este / Equipo Oeste",
              stage: "Jornada 4",
            },
            {
              court: "03",
              match: "Equipo Centro / Equipo Costa",
              stage: "Jornada 5",
            },
          ],
        },
        {
          id: "social",
          label: "Americanos",
          title: "Más compañeros. Más partidos.",
          body: "Jornadas sociales con rondas cortas y rotación de parejas para que todos participen.",
          points: [
            "Distribución de jugadores por ronda",
            "Rotación de parejas y pistas",
            "Resultados de una jornada compartida",
          ],
          round: "Americano del sábado · Ronda 2",
          rows: [
            {
              court: "01",
              match: "Ana y Luis / Sara y Pablo",
              stage: "Ronda 2",
            },
            {
              court: "02",
              match: "Eva y Nico / Inés y Hugo",
              stage: "Ronda 2",
            },
            { court: "03", match: "Nuevas parejas", stage: "Ronda 3" },
          ],
        },
      ],
      example: "Ejemplo de jornada",
      exampleNote: "Datos ilustrativos. No es un evento en directo.",
      court: "Pista",
      match: "Encuentro",
      stage: "Fase",
      compatibilityLabel: "Un sistema, dos capas",
      compatibilityTitle: "Marcador y vídeo en un mismo sistema.",
      hdBody:
        "Pads, marcador en pantalla y herramientas de gestión. Es la base para conectar los puntos con la operación del evento.",
      visionBody:
        "Vídeo, replay y revisión VAR añaden otra perspectiva para jugadores y árbitros. Funciones en fase piloto.",
      ledNote:
        "rosa Portable está pensado para el marcador independiente. Actualmente no incluye gestión de torneos.",
      faqTitle: "Antes de tu próximo evento.",
      faqs: [
        {
          title: "¿Necesito cámaras para organizar un torneo?",
          body: "La gestión del evento utiliza el marcador de rosa Vision y las herramientas del club. Las cámaras se usan para vídeo y revisión de jugadas, no para organizar los cuadros.",
        },
        {
          title: "¿Qué formatos puedo usar?",
          body: "Torneos, ligas y americanas son formas de organizar la experiencia. Revisamos contigo el formato, las reglas y las funciones disponibles antes de preparar tu evento.",
        },
        {
          title: "¿Puede conectarse con mi software de gestión?",
          body: "El estado del marcador está disponible para integraciones con socios. Nuestro equipo revisa contigo la compatibilidad y el trabajo necesario para tu sistema.",
        },
        {
          title: "¿El VAR decide automáticamente una jugada?",
          body: "No. La revisión con vídeo ayuda a jugadores o árbitros a volver a una jugada. No se presenta como arbitraje automático ni como sistema certificado de canto de líneas.",
        },
      ],
    },
  },
  en: {
    nav: {
      events: "Events & tournaments",
      players: "For players",
      explore: "Explore",
    },
    hero: {
      label: "Court technology. Club experience.",
      title: "Every point matters. On and off court.",
      body: "Live scoring, replay, VAR review and insights. The connected rosa experience for players, clubs and their next events.",
      primary: "Let's talk about your club",
      secondary: "Watch a real match",
      note: "Vision is in pilot. Find the right setup for your club.",
      photo: "A real match with rosa",
    },
    values: [
      {
        title: "Score the point",
        body: "Pads that respond through the glass.",
      },
      { title: "Revisit the play", body: "Replay and VAR review with Vision." },
      {
        title: "Know your match",
        body: "Video, context and insights to improve.",
      },
      {
        title: "Bring your club together",
        body: "Events connected to the scoreboard.",
      },
    ],
    flow: {
      label: "How it works",
      title: "Tap. Play. Play it back.",
      steps: [
        {
          title: "The point starts with you",
          body: "Players update the score by touching the rosa pads through the glass. No phone to take out, no app to open.",
        },
        {
          title: "The play, in context",
          body: "The score stays with the video. Vision brings replay and VAR review so players or a referee can revisit a play.",
        },
        {
          title: "The match lives on",
          body: "Review moments, follow your history and share the best points. At an event, the result feeds into the next stage.",
        },
      ],
      note: "Video and analytics features depend on the configuration and selected services. Decisions on a play remain with the players or referee.",
    },
    audiences: {
      label: "One court. More possibilities.",
      title: "Good for the players. Good for your club.",
      clubs: {
        title: "A club worth coming back to.",
        body: "A better player experience and simpler operations for your team.",
        points: [
          "Less manual result entry",
          "More content for your community and sponsors",
          "Events that bring players together",
        ],
        cta: "Explore rosa for clubs",
      },
      players: {
        title: "Your match deserves another look.",
        body: "Focus on playing. Keep the score in sight, then let Vision help you revisit the match afterwards.",
        points: [
          "Score without breaking your rhythm",
          "Review a play with video",
          "Keep and share your best moments",
        ],
        cta: "Explore rosa Vision",
      },
    },
    eventsTeaser: {
      label: "Events & tournaments",
      title: "More padel. Less work between matches.",
      body: "Connect on-court scoring to rounds, results and club screens. One experience, from registration to the final.",
      cta: "Explore events & tournaments",
      formats: [
        {
          title: "Tournaments",
          body: "Draws, matchups and court assignments.",
        },
        { title: "Leagues", body: "Matchdays, results and standings." },
        {
          title: "Americano & socials",
          body: "Rounds, rotating partners and community.",
        },
      ],
    },
    proof: {
      label: "On a real court",
      title: "One match. Pads. Live scoring.",
      body: "This match was played with rosa. Players score with the pads and the result updates over the camera video.",
      play: "Watch the match",
      videoLabel: "Real match with rosa scoring",
      caption: "Real match footage · Pads and scoring connected to video",
      error: "The video is currently unavailable.",
      email: "Request a demonstration",
      social: "Still playing.",
      socialBody: "Tests, matches and updates from the rosa team.",
    },
    contact: {
      label: "Your next step",
      title: "Let's talk about your club.",
      body: "Tell us how you play and what you want to improve. We'll show you the rosa setup that makes sense for you.",
      points: [
        "A conversation with our team",
        "A setup for your courts",
        "Clear availability and next steps",
      ],
    },
    events: {
      metaTitle: "rosa padel | Events & tournaments",
      metaDescription:
        "Connect rosa scoring to tournaments, leagues and social matchdays: courts, rounds, results and club screens.",
      label: "rosa Vision + tools for your club",
      title: "Events & tournaments.",
      body: "From the point on court to the standings. Connect play with operations and spend more time with your community.",
      primary: "Plan my event",
      secondary: "Explore formats",
      note: "We configure the formats and features your club needs together.",
      capabilities: [
        { title: "Organize", body: "Participants, format and courts." },
        { title: "Connect", body: "On-court scoring feeds the results." },
        { title: "Coordinate", body: "Rounds and upcoming matches." },
        { title: "Share", body: "The matchday on your club screens." },
      ],
      connectionLabel: "It starts on court",
      connectionTitle: "Results shouldn't travel on paper.",
      connectionBody:
        "The pads, rosa Vision and event management share the same score feed. The organizer stays in control and validates the results.",
      connection: [
        {
          title: "The player taps the pad",
          body: "Register a point through the glass, without using a phone during the match.",
        },
        {
          title: "rosa Vision updates",
          body: "The courtside scoreboard reflects the match and provides the score feed.",
        },
        {
          title: "The event moves forward",
          body: "Software receives results to update the matchday and prepare upcoming matches.",
        },
        {
          title: "The whole club follows",
          body: "Screens showing matches, assignments and standings help everyone find their place.",
        },
      ],
      formatLabel: "Find your format",
      formatTitle: "A final. A league. A Saturday of padel.",
      formatBody:
        "Every club competes its own way. These examples show how a matchday can work; we confirm format availability during your demo.",
      formats: [
        {
          id: "tournaments",
          label: "Tournaments",
          title: "From the first draw to the final.",
          body: "Organize pairs, courts and stages with a shared view of the tournament.",
          points: [
            "Draws and match progression",
            "Court assignments and result oversight",
            "Information for the next round",
          ],
          round: "Club tournament · Quarterfinals",
          rows: [
            { court: "01", match: "Pair A / Pair B", stage: "Quarterfinals" },
            { court: "02", match: "Pair C / Pair D", stage: "Quarterfinals" },
            { court: "03", match: "Winner 1 / Winner 2", stage: "Next round" },
          ],
        },
        {
          id: "leagues",
          label: "Leagues",
          title: "A community that returns every matchday.",
          body: "Keep the competition going with a schedule, results and shared standings.",
          points: [
            "Matchday schedules",
            "Results attached to each match",
            "Standings across the season",
          ],
          round: "Club league · Matchday 4",
          rows: [
            {
              court: "01",
              match: "Team North / Team South",
              stage: "Matchday 4",
            },
            {
              court: "02",
              match: "Team East / Team West",
              stage: "Matchday 4",
            },
            {
              court: "03",
              match: "Team Central / Team Coast",
              stage: "Matchday 5",
            },
          ],
        },
        {
          id: "social",
          label: "Americano",
          title: "More partners. More matches.",
          body: "Social matchdays with short rounds and rotating partners so everyone takes part.",
          points: [
            "Player assignments per round",
            "Rotating partners and courts",
            "Results from a shared matchday",
          ],
          round: "Saturday Americano · Round 2",
          rows: [
            {
              court: "01",
              match: "Ana & Luis / Sara & Pablo",
              stage: "Round 2",
            },
            {
              court: "02",
              match: "Eva & Nico / Inés & Hugo",
              stage: "Round 2",
            },
            { court: "03", match: "New partners", stage: "Round 3" },
          ],
        },
      ],
      example: "Matchday example",
      exampleNote: "Illustrative data. Not a live event.",
      court: "Court",
      match: "Match",
      stage: "Stage",
      compatibilityLabel: "One system, two layers",
      compatibilityTitle: "Scoring and video in one system.",
      hdBody:
        "Pads, on-screen scoring and management tools. The foundation connecting points with event operations.",
      visionBody:
        "Video, replay and VAR review bring another perspective for players and referees. Features in pilot.",
      ledNote:
        "rosa Portable is designed for standalone scoring. It does not currently include tournament management.",
      faqTitle: "Before your next event.",
      faqs: [
        {
          title: "Do I need cameras to organize a tournament?",
          body: "Event management uses rosa Vision scoring and club tools. Cameras support video and play review; they are not needed to organize the draw.",
        },
        {
          title: "Which formats can I use?",
          body: "Tournaments, leagues and Americano are ways to organize the experience. We review your format, rules and available features together before preparing the event.",
        },
        {
          title: "Can it connect to my management software?",
          body: "Score state is available for partner integrations. Our team reviews compatibility and the work needed for your system with you.",
        },
        {
          title: "Does VAR automatically decide a play?",
          body: "No. Video review helps players or referees revisit a play. It is not presented as automated refereeing or a certified line-calling system.",
        },
      ],
    },
  },
  de: {
    nav: {
      events: "Events & Turniere",
      players: "Für Spieler",
      explore: "Entdecken",
    },
    hero: {
      label: "Court-Technologie. Club-Erlebnis.",
      title: "Jeder Punkt zählt. Auch neben dem Court.",
      body: "Live-Spielstand, Replay, VAR-Videoprüfung und Analysen. Das vernetzte rosa Erlebnis für Spieler, Clubs und ihre nächsten Events.",
      primary: "Über deinen Club sprechen",
      secondary: "Ein echtes Match ansehen",
      note: "Vision in der Pilotphase. Finde die passende Lösung für deinen Club.",
      photo: "Ein echtes Match mit rosa",
    },
    values: [
      { title: "Punkt erfassen", body: "Pads, die durch das Glas reagieren." },
      {
        title: "Spielzug erneut ansehen",
        body: "Replay und VAR-Videoprüfung mit Vision.",
      },
      {
        title: "Dein Match verstehen",
        body: "Video, Kontext und Einblicke zum Lernen.",
      },
      { title: "Den Club verbinden", body: "Events mit direktem Spielstand." },
    ],
    flow: {
      label: "So funktioniert es",
      title: "Tippen. Spielen. Wieder ansehen.",
      steps: [
        {
          title: "Der Punkt beginnt bei dir",
          body: "Spieler aktualisieren den Spielstand durch Berühren der rosa Pads durch das Glas. Ohne Handy oder App während des Spiels.",
        },
        {
          title: "Der Spielzug im Kontext",
          body: "Der Spielstand begleitet das Video. Vision ergänzt Replay und VAR-Videoprüfung, damit Spieler oder Schiedsrichter einen Spielzug erneut ansehen können.",
        },
        {
          title: "Das Match geht weiter",
          body: "Momente ansehen, den Verlauf verfolgen und die besten Punkte teilen. Bei Events fließt das Ergebnis in die nächste Phase ein.",
        },
      ],
      note: "Video- und Analysefunktionen hängen von Konfiguration und gebuchten Leistungen ab. Die Entscheidung über einen Spielzug bleibt bei Spielern oder Schiedsrichter.",
    },
    audiences: {
      label: "Ein Court. Mehr Möglichkeiten.",
      title: "Gut für die Spieler. Gut für deinen Club.",
      clubs: {
        title: "Ein Club, in den man zurückkehrt.",
        body: "Ein besseres Spielerlebnis und einfachere Abläufe für dein Team.",
        points: [
          "Weniger manuelle Ergebniseingabe",
          "Mehr Inhalte für Community und Sponsoren",
          "Events, die Spieler zusammenbringen",
        ],
        cta: "rosa für Clubs entdecken",
      },
      players: {
        title: "Dein Match verdient einen zweiten Blick.",
        body: "Konzentriere dich aufs Spielen. Der Spielstand bleibt sichtbar, Vision eröffnet danach den Rückblick auf dein Match.",
        points: [
          "Punkte ohne Unterbrechung erfassen",
          "Spielzüge per Video prüfen",
          "Die besten Momente behalten und teilen",
        ],
        cta: "rosa Vision entdecken",
      },
    },
    eventsTeaser: {
      label: "Events & Turniere",
      title: "Mehr Padel. Weniger Aufwand zwischen Matches.",
      body: "Verbinde den Spielstand mit Runden, Ergebnissen und Club-Bildschirmen. Ein Erlebnis von der Anmeldung bis zum Finale.",
      cta: "Events & Turniere entdecken",
      formats: [
        { title: "Turniere", body: "Turnierbäume, Begegnungen und Courts." },
        { title: "Ligen", body: "Spieltage, Ergebnisse und Tabellen." },
        {
          title: "Americano & Socials",
          body: "Runden, wechselnde Partner und Community.",
        },
      ],
    },
    proof: {
      label: "Auf einem echten Court",
      title: "Ein Match. Pads. Live-Spielstand.",
      body: "Dieses Match wurde mit rosa gespielt. Spieler erfassen die Punkte über Pads, der Spielstand aktualisiert sich im Kameravideo.",
      play: "Match ansehen",
      videoLabel: "Echtes Match mit rosa Spielstand",
      caption: "Echte Matchaufnahme · Pads und Spielstand im Video",
      error: "Das Video ist momentan nicht verfügbar.",
      email: "Vorführung anfragen",
      social: "Wir spielen weiter.",
      socialBody: "Tests, Matches und Neuigkeiten vom rosa Team.",
    },
    contact: {
      label: "Dein nächster Schritt",
      title: "Sprechen wir über deinen Club.",
      body: "Erzähl uns, wie ihr spielt und was du verbessern möchtest. Wir zeigen dir die passende rosa Konfiguration.",
      points: [
        "Ein Gespräch mit unserem Team",
        "Eine Lösung für deine Courts",
        "Klare Verfügbarkeit und nächste Schritte",
      ],
    },
    events: {
      metaTitle: "rosa padel | Events & Turniere",
      metaDescription:
        "Verbinde rosa Spielstände mit Turnieren, Ligen und Social-Events: Courts, Runden, Ergebnisse und Club-Bildschirme.",
      label: "rosa Vision + Werkzeuge für deinen Club",
      title: "Events & Turniere.",
      body: "Vom Punkt auf dem Court bis zur Tabelle. Verbinde Spiel und Organisation und gewinne Zeit für deine Community.",
      primary: "Mein Event planen",
      secondary: "Formate entdecken",
      note: "Gemeinsam konfigurieren wir die Formate und Funktionen für deinen Club.",
      capabilities: [
        { title: "Organisieren", body: "Teilnehmer, Format und Courts." },
        { title: "Verbinden", body: "Der Spielstand liefert Ergebnisse." },
        { title: "Koordinieren", body: "Runden und nächste Begegnungen." },
        { title: "Teilen", body: "Der Spieltag auf Club-Bildschirmen." },
      ],
      connectionLabel: "Es beginnt auf dem Court",
      connectionTitle: "Ergebnisse brauchen keinen Papierweg.",
      connectionBody:
        "Pads, rosa Vision und Eventverwaltung nutzen denselben Spielstand. Der Organisator behält den Überblick und bestätigt die Ergebnisse.",
      connection: [
        {
          title: "Der Spieler tippt auf das Pad",
          body: "Ein Punkt wird durch das Glas erfasst, ohne Handy während des Matches.",
        },
        {
          title: "rosa Vision aktualisiert",
          body: "Die Anzeige am Court zeigt das Match und stellt die Punktedaten bereit.",
        },
        {
          title: "Das Event geht weiter",
          body: "Die Software übernimmt Ergebnisse für den Spieltag und die nächsten Begegnungen.",
        },
        {
          title: "Der ganze Club folgt",
          body: "Bildschirme mit Matches, Zuteilungen und Tabellen geben allen Orientierung.",
        },
      ],
      formatLabel: "Finde dein Format",
      formatTitle: "Ein Finale. Eine Liga. Ein Samstag mit Padel.",
      formatBody:
        "Jeder Club spielt anders. Diese Beispiele zeigen mögliche Abläufe; die Verfügbarkeit der Formate klären wir in deiner Demo.",
      formats: [
        {
          id: "tournaments",
          label: "Turniere",
          title: "Von der Auslosung bis ins Finale.",
          body: "Paare, Courts und Phasen mit einer gemeinsamen Turnierübersicht organisieren.",
          points: [
            "Turnierbaum und Matchfortschritt",
            "Court-Zuteilung und Ergebnisprüfung",
            "Informationen zur nächsten Runde",
          ],
          round: "Clubturnier · Viertelfinale",
          rows: [
            { court: "01", match: "Paar A / Paar B", stage: "Viertelfinale" },
            { court: "02", match: "Paar C / Paar D", stage: "Viertelfinale" },
            {
              court: "03",
              match: "Sieger 1 / Sieger 2",
              stage: "Nächste Runde",
            },
          ],
        },
        {
          id: "leagues",
          label: "Ligen",
          title: "Eine Community, die jeden Spieltag wiederkommt.",
          body: "Spielplan, Ergebnisse und Tabellen halten den Wettbewerb über die Saison lebendig.",
          points: [
            "Spielplan nach Spieltagen",
            "Ergebnisse je Begegnung",
            "Tabellenverlauf der Saison",
          ],
          round: "Clubliga · Spieltag 4",
          rows: [
            { court: "01", match: "Team Nord / Team Süd", stage: "Spieltag 4" },
            { court: "02", match: "Team Ost / Team West", stage: "Spieltag 4" },
            {
              court: "03",
              match: "Team Mitte / Team Küste",
              stage: "Spieltag 5",
            },
          ],
        },
        {
          id: "social",
          label: "Americano",
          title: "Mehr Partner. Mehr Matches.",
          body: "Gesellige Spieltage mit kurzen Runden und wechselnden Partnern für alle.",
          points: [
            "Spielerzuteilung pro Runde",
            "Wechselnde Partner und Courts",
            "Ergebnisse eines gemeinsamen Spieltags",
          ],
          round: "Samstags-Americano · Runde 2",
          rows: [
            {
              court: "01",
              match: "Ana & Luis / Sara & Pablo",
              stage: "Runde 2",
            },
            {
              court: "02",
              match: "Eva & Nico / Inés & Hugo",
              stage: "Runde 2",
            },
            { court: "03", match: "Neue Paare", stage: "Runde 3" },
          ],
        },
      ],
      example: "Beispiel-Spieltag",
      exampleNote: "Illustrative Daten. Kein Live-Event.",
      court: "Court",
      match: "Begegnung",
      stage: "Phase",
      compatibilityLabel: "Ein System, zwei Ebenen",
      compatibilityTitle: "Spielstand und Video in einem System.",
      hdBody:
        "Pads, Spielstand am Bildschirm und Verwaltungswerkzeuge. Die Basis zwischen Punkten und Eventorganisation.",
      visionBody:
        "Video, Replay und VAR-Videoprüfung ergänzen die Sicht von Spielern und Schiedsrichtern. Funktionen in der Pilotphase.",
      ledNote:
        "rosa Portable ist für eigenständige Spielstandsanzeigen gedacht. Es enthält derzeit keine Turnierverwaltung.",
      faqTitle: "Vor deinem nächsten Event.",
      faqs: [
        {
          title: "Brauche ich Kameras für ein Turnier?",
          body: "Die Eventverwaltung nutzt die Spielstände von rosa Vision und die Club-Werkzeuge. Kameras dienen Video und Spielzugprüfung, nicht der Organisation des Turnierbaums.",
        },
        {
          title: "Welche Formate kann ich nutzen?",
          body: "Turniere, Ligen und Americano sind mögliche Organisationsformen. Format, Regeln und verfügbare Funktionen besprechen wir vor der Vorbereitung deines Events.",
        },
        {
          title: "Lässt sich meine Verwaltungssoftware verbinden?",
          body: "Der Spielstand steht für Partnerintegrationen bereit. Unser Team prüft mit dir die Kompatibilität und den Aufwand für dein System.",
        },
        {
          title: "Entscheidet VAR einen Spielzug automatisch?",
          body: "Nein. Die Videoprüfung hilft Spielern oder Schiedsrichtern, einen Spielzug erneut anzusehen. Sie ist weder automatische Spielleitung noch ein zertifiziertes Linienerkennungssystem.",
        },
      ],
    },
  },
};

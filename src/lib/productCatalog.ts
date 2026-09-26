import type { Language } from "./siteCopy";

// Commercial names, not firmware/repository names. See docs/PRODUCT-CATALOG.md.
export const hardwareProducts = [
  { id: "vision", name: "rosa Vision", href: "/products/vision" },
  { id: "portable", name: "rosa Portable", href: "/products/portable" },
] as const;

export type HardwareProduct = (typeof hardwareProducts)[number]["id"];

type ProductDescription = { body: string; features: string[]; note: string };
type CatalogCopy = {
  label: string;
  title: string;
  body: string;
  discover: string;
  contact: string;
  features: string;
  vision: ProductDescription;
  portable: ProductDescription;
  subscriptions: string;
  subscriptionTitle: string;
  subscriptionBody: string;
  subscriptionNote: string;
  clubName: string;
  clubBody: string;
  playerBody: string;
  clubAudience: string;
  playerAudience: string;
};

export const productCatalog: Record<Language, CatalogCopy> = {
  es: {
    label: "El ecosistema rosa",
    title: "Dos productos. Tu forma de jugar.",
    body: "rosa Vision para la experiencia conectada de la pista. rosa Portable para llevar el marcador contigo. Suscripciones para clubes y jugadores, por separado.",
    discover: "Conocer el producto",
    contact: "Consultar configuración",
    features: "En la pista",
    vision: {
      body: "Marcador HD, pads y vídeo en un mismo sistema. Sigue el partido, vuelve a una jugada y conecta los resultados con la gestión del club.",
      features: ["Marcador en directo con pads a través del cristal", "Pantalla HD, configuración de partidos y control del árbitro", "Vídeo, replay y revisión de jugadas (VAR)", "Conexión con torneos, ligas y americanos"],
      note: "Las funciones de vídeo, análisis y gestión dependen de la configuración y los servicios contratados. La revisión VAR ayuda a jugadores o árbitro; no decide automáticamente.",
    },
    portable: {
      body: "El marcador LED portátil de rosa. Control con pads y funcionamiento sin conexión para centrarse en el partido.",
      features: ["Marcador LED portátil", "Control del marcador con pads", "Funcionamiento sin conexión", "Para clubes y jugadores"],
      note: "Centrado en el marcador: no incluye cámara, vídeo ni gestión de torneos.",
    },
    subscriptions: "Suscripciones",
    subscriptionTitle: "Para el club. Para quien juega.",
    subscriptionBody: "El hardware y los servicios se eligen por separado. Consulta los planes según lo que tu club y tus jugadores necesitan.",
    subscriptionNote: "Consulta qué incluye cada plan, su disponibilidad y sus condiciones. Las suscripciones de club y jugador no son equivalentes ni incluyen automáticamente todos los servicios.",
    clubName: "Suscripción para clubes",
    clubAudience: "Clubes",
    clubBody: "Software y servicios para la operación del club, la experiencia del partido y sus eventos. Define con nosotros la configuración de tu instalación.",
    playerAudience: "Jugadores",
    playerBody: "La suscripción para seguir el partido fuera de la pista: vídeo, momentos y herramientas de análisis. Padel Chess Engine forma parte de esta capa para jugadores.",
  },
  en: {
    label: "The rosa ecosystem",
    title: "Two products. Your way to play.",
    body: "rosa Vision for the connected court experience. rosa Portable for scoring on the move. Separate subscriptions for clubs and players.",
    discover: "Explore product",
    contact: "Discuss your setup",
    features: "On court",
    vision: {
      body: "HD scoring, pads and video in one system. Follow the match, revisit a play and connect results to club operations.",
      features: ["Live scoring with pads through the glass", "HD display, match setup and referee control", "Video, replay and play review (VAR)", "Connection to tournaments, leagues and Americano"],
      note: "Video, analytics and management features depend on the configuration and selected services. VAR review supports players or a referee; it does not make automated decisions.",
    },
    portable: {
      body: "The portable LED scoreboard from rosa. Pad controls and offline operation keep the focus on the match.",
      features: ["Portable LED scoreboard", "Pad-controlled scoring", "Offline operation", "For clubs and players"],
      note: "Focused on scoring: camera, video and tournament management are not included.",
    },
    subscriptions: "Subscriptions",
    subscriptionTitle: "For the club. For the player.",
    subscriptionBody: "Hardware and services are chosen separately. Discuss the plans that fit your club and your players.",
    subscriptionNote: "Ask about each plan's inclusions, availability and terms. Club and player subscriptions are distinct and do not automatically include every service.",
    clubName: "Club subscription",
    clubAudience: "Clubs",
    clubBody: "Software and services for club operations, the match experience and events. Work with us to define your installation's setup.",
    playerAudience: "Players",
    playerBody: "The subscription for your match beyond the court: video, moments and analysis tools. Padel Chess Engine is part of this player layer.",
  },
  de: {
    label: "Das rosa Ökosystem",
    title: "Zwei Produkte. Dein Spiel.",
    body: "rosa Vision für den vernetzten Court. rosa Portable für den mobilen Spielstand. Separate Abonnements für Clubs und Spieler.",
    discover: "Produkt entdecken",
    contact: "Konfiguration anfragen",
    features: "Auf dem Court",
    vision: {
      body: "HD-Spielstand, Pads und Video in einem System. Das Match verfolgen, Spielzüge prüfen und Ergebnisse mit der Cluborganisation verbinden.",
      features: ["Live-Spielstand mit Pads durch das Glas", "HD-Anzeige, Match-Einrichtung und Schiedsrichtersteuerung", "Video, Replay und Spielzugprüfung (VAR)", "Anbindung an Turniere, Ligen und Americano"],
      note: "Video-, Analyse- und Verwaltungsfunktionen hängen von Konfiguration und gebuchten Leistungen ab. VAR unterstützt Spieler oder Schiedsrichter, trifft aber keine automatischen Entscheidungen.",
    },
    portable: {
      body: "Die mobile LED-Spielstandsanzeige von rosa. Pad-Steuerung und Offline-Betrieb halten den Fokus auf dem Match.",
      features: ["Mobile LED-Spielstandsanzeige", "Spielstand per Pad steuern", "Offline-Betrieb", "Für Clubs und Spieler"],
      note: "Auf den Spielstand konzentriert: Kamera, Video und Turnierverwaltung sind nicht enthalten.",
    },
    subscriptions: "Abonnements",
    subscriptionTitle: "Für den Club. Für die Spieler.",
    subscriptionBody: "Hardware und Leistungen werden separat gewählt. Wir besprechen die passenden Pläne für deinen Club und deine Spieler.",
    subscriptionNote: "Frage nach Leistungsumfang, Verfügbarkeit und Konditionen der Pläne. Club- und Spieler-Abonnements sind eigenständige Angebote und enthalten nicht automatisch alle Leistungen.",
    clubName: "Club-Abonnement",
    clubAudience: "Clubs",
    clubBody: "Software und Leistungen für Cluborganisation, Matcherlebnis und Events. Gemeinsam legen wir die Konfiguration deiner Installation fest.",
    playerAudience: "Spieler",
    playerBody: "Das Abonnement für dein Match nach dem Spiel: Video, Momente und Analysewerkzeuge. Padel Chess Engine gehört zu dieser Spieler-Ebene.",
  },
};

export function getProductLinks(language: Language) {
  return [...hardwareProducts, { name: productCatalog[language].subscriptions, href: "/subscriptions" }];
}

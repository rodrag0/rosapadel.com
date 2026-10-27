import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Mount the interactive app after pre-rendered first paint, preserving browser
// language/theme preferences without SSR hydration mismatches.
createRoot(document.getElementById("root")!).render(<App />);

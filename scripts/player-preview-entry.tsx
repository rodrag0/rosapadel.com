import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DemoApp from "./DemoApp";
import "./styles.css";
import "./shot-demo.css";
import "./premium.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><DemoApp /></StrictMode>,
);

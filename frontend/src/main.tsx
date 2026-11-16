import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import { observarTabelasResponsivas } from "./utils/tabelaResponsiva";

// rotulos das tabelas para o modo cartao das telas estreitas (ver utils/tabelaResponsiva.ts)
observarTabelasResponsivas();

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

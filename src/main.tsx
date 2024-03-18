import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/main.scss";
import { ColorProvider } from "./context/ColorContext.tsx";
import { FontProvider } from "./context/FontContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { TimerProvider } from "./context/TimerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorProvider>
      <FontProvider>
        <TimerProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </TimerProvider>
      </FontProvider>
    </ColorProvider>
  </React.StrictMode>
);

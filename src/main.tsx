import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ColorProvider, FontProvider, ModalProvider } from "./features/settings";
import { TimerProvider } from "./features/timer";

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

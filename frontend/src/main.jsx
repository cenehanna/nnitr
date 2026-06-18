import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Додаємо імпорт
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Обгортаємо App у BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);

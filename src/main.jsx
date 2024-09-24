import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <div className="antialiased">
    <App />
    <Toaster />
  </div>
);

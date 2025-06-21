import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import AppWrapper from "./providers/AppWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper>
          <App />
        </AppWrapper>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

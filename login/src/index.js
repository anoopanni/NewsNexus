import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
// client-id:
// 167380039775-cqfkpfg5vui029p0l6693t6fa106r9e0.apps.googleusercontent.com

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="167380039775-cqfkpfg5vui029p0l6693t6fa106r9e0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);

reportWebVitals();

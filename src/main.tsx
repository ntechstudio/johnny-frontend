import './johnny.css';
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";

// ✅ Fix mobile 100vh issue by setting --vh dynamically
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
setVh();
window.addEventListener("resize", setVh);

// ✅ Auth screen without Tailwind classes
const Auth = () => (
  <div
    style={{
      height: "100vh",
      background: "#F9FAFB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
        Welcome to Johnny Assistant
      </h1>
      <button
        style={{
          background: "#7C3AED",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.setItem("mdbi_authenticated", "true");
          window.location.href = "/";
        }}
      >
        Enter as guest
      </button>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


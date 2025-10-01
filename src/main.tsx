import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import "./index.css";

const Auth = () => (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Johnny Assistant</h1>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
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


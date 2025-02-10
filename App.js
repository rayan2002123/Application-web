import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenue sur MarvelStore</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;

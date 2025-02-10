// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Bienvenue sur l'application e-commerce</h1>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/admin/orders">Commandes Admin</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erreur de chargement des produits:", error));
  }, []);

  return (
    <div>
      <h2>Nos Produits</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px", maxWidth: "200px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "5px" }} />
              <h3>{product.name}</h3>
              <p>{product.price} €</p>
              <button onClick={() => alert("Ajouté au panier")}>Ajouter au panier</button>
            </div>
          ))
        ) : (
          <p>Chargement des produits...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

// frontend/src/pages/AdminOrdersPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrdersPage() {
  const API_URL = "http://localhost:5000/api";
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/orders/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Erreur lors de la récupération des commandes:", error));
  }, [navigate]);

  const updateStatus = (orderId, status) => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/orders/update-status/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) => prevOrders.map((order) => order._id === orderId ? { ...order, status: updatedOrder.order.status } : order));
      })
      .catch((error) => console.error("Erreur lors de la mise à jour du statut:", error));
  };

  return (
    <div>
      <h2>Gestion des commandes</h2>
      {orders.length > 0 ? (
        <table border="1" style={{ width: "80%", margin: "auto" }}>
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>Total (€)</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalAmount} €</td>
                <td>
                  <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status}>
                    <option value="Paid">Payée</option>
                    <option value="Processing">En traitement</option>
                    <option value="Shipped">Expédiée</option>
                    <option value="Delivered">Livrée</option>
                    <option value="Cancelled">Annulée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
}

export default AdminOrdersPage;

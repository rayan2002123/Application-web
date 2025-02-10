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
      .catch((error) =>
        console.error("Erreur lors de la récupération des commandes:", error)
      );
  }, [navigate]);

  return (
    <div>
      <h2>Gestion des commandes</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <p>Commande #{order._id} - Total: {order.totalAmount} USD - Statut: {order.status}</p>
          </div>
        ))
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
}

export default AdminOrdersPage;

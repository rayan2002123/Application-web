import React from "react";

function HomePage() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundImage: `url('/magasin_store_design-interieur.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
      }}
    >
      <h1>Bienvenue sur l'application e-commerce</h1>
      <p>Ajoutez vos produits et profitez du shopping en ligne !</p>
      <button onClick={() => alert("Boutique bientôt disponible !")}>
        Voir les produits
      </button>
    </div>
  );
}

export default HomePage;

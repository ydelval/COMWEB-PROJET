import React, { useState } from 'react';

function App() {
  const [role, setRole] = useState(null); // null | "eleve" | "prof"
  const [username, setUsername] = useState(""); // Déclaration de l'état pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // Déclaration de l'état pour le mot de passe

  const handleChooseRole = (choix) => {
    setRole(choix);
  };

  const handleConnexion = async () => {
    // Envoie une requête pour vérifier le login et mot de passe
    const response = await fetch("http://localhost/api/projet.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username, // Assure-toi que cette variable est bien utilisée
        password: password,
        role: role, // On envoie aussi le rôle ici si nécessaire
      }),
    });

    const data = await response.json();

    // Traitement de la réponse pour afficher un message ou rediriger
    if (data.success) {
      alert(`${role} connecté avec succès !`);
      // rediriger l'utilisateur ou changer de page ici
    } else {
      alert("Identifiants incorrects !");
    }
  };

  const handleRetour = () => {
    setRole(null);
    setUsername("");
    setPassword("");
  };

  if (!role) {
    // Page d’accueil pour choisir le rôle
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1>Se connecter</h1>
        <button onClick={() => handleChooseRole('eleve')} style={btnStyle}>Élève</button>
        <button onClick={() => handleChooseRole('prof')} style={btnStyle}>Professeur</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Connexion en tant que {role}</h2>
      <input
        type="text"
        placeholder="Identifiant"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // ici, on met à jour username
        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // ici, on met à jour password
        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
      />
      <br />
      <button onClick={handleConnexion} style={btnStyle}>Se connecter</button>
      <br />
      <button onClick={handleRetour}>Retour</button>
    </div>
  );
}

const btnStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default App;

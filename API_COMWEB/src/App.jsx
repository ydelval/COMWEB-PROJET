import React, { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState(null); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState([]); // Ajouté pour éviter une erreur si on appelle setNotes

  const handleChooseRole = (choix) => {
    setRole(choix);
  };

  const handleConnexion = async () => {
    try {
      const response = await fetch("http://localhost/api/projet.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`${role} connecté avec succès !`);
        // Redirection ou action supplémentaire ici
      } else {
        alert("Identifiants incorrects !");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur lors de la tentative de connexion.");
    }
  };

  const handleRetour = () => {
    setRole(null);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (role === 'prof') {
      fetch('http://localhost/projet_y/get_notes.php')
        .then(res => res.json())
        .then(data => setNotes(data))
        .catch(err => console.error("Erreur de récupération des notes :", err));
    }
  }, [role]);

  const btnStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  if (!role) {
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
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
      />
      <br />
      <button onClick={handleConnexion} style={btnStyle}>Se connecter</button>
      <br />
      <button onClick={handleRetour} style={{ ...btnStyle, backgroundColor: "#eee" }}>Retour</button>
    </div>
  );
}

export default App;

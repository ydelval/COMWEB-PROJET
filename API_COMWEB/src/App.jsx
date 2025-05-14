import React, { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [role, setRole] = useState(null); // rôle sélectionné dans l'UI
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const fetchNotes = () => {
    fetch('http://localhost/projet_y/get_notes.php')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur de récupération des notes :", err));
  };

  const handleLogin = () => {
    if (username && password) {
      fetch('http://localhost/projet_y/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, mot_de_passe: password })
      })
        .then(res => res.json())
        .then(data => {
          if (data.statut === "ok") {
            const utilisateur = data.eleve;

            if (utilisateur.role !== role) {
              setError("Vous n'avez pas sélectionné le bon rôle.");
              return;
            }

            setRole(utilisateur.role);
            setLoggedIn(true);
            setUsername('');
            setPassword('');
            setError('');

            if (utilisateur.role === 'eleve') {
              setNotes(data.notes);
            } else {
              fetchNotes();
            }
          } else {
            setError(data.message);
          }
        })
        .catch(err => {
          setError("Erreur lors de la connexion.");
          console.error("Erreur de connexion : ", err);
        });
    } else {
      setError("Identifiant ou mot de passe incorrect.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
    setNotes([]);
    setUsername('');
    setPassword('');
    setError('');
  };

  const btnStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  if (loggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Espace {role === 'prof' ? 'Professeur' : 'Élève'}</h2>
        <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: "#eee" }}>Déconnexion</button>

        <div>
          <h3>Liste des notes</h3>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index}>
                {role === 'prof' && (
                  <p><strong>Élève :</strong> {note.eleve}</p>
                )}
                <p><strong>Matière :</strong> {note.matiere} — <strong>Note :</strong> {note.note}</p>
              </div>
            ))
          ) : (
            <p>Aucune note à afficher.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Se connecter</h1>
      <button onClick={() => setRole('prof')} style={btnStyle}>Professeur</button>
      <button onClick={() => setRole('eleve')} style={btnStyle}>Élève</button>

      {role && (
        <div style={{ marginTop: '20px' }}>
          <h3>Connexion {role === 'prof' ? 'Professeur' : 'Élève'}</h3>
          <input
            type="text"
            placeholder="Identifiant"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '5px', margin: '5px' }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px', margin: '5px' }}
          />
          <button onClick={handleLogin} style={{ ...btnStyle, backgroundColor: "#4CAF50", color: 'white' }}>
            Valider
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;

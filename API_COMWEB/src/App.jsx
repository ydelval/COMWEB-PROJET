import React, { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [nomProf, setNomProf] = useState('');

  const fetchNotes = () => {
    fetch('http://localhost/projet_y/get_notes.php')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => {
        console.error("Erreur récupération notes :", err);
        setError("Erreur lors du chargement des notes.");
      });
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError("Veuillez entrer un identifiant et un mot de passe.");
      return;
    }

    fetch('http://localhost/projet_y/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, mot_de_passe: password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.statut === "ok") {
          const utilisateur = data.eleve;

          if ((utilisateur.role === 'professeur' && role !== 'prof') ||
              (utilisateur.role === 'eleve' && role !== 'eleve')) {
            setError("Rôle sélectionné incorrect.");
            return;
          }

          setLoggedIn(true);
          setUsername('');
          setPassword('');
          setError('');
          if (utilisateur.role === 'eleve') {
            setNotes(data.notes);
          } else if (utilisateur.role === 'professeur') {
            setNomProf(utilisateur.nom_complet);
            fetchNotes();
          }
        } else {
          setError(data.message);
        }
      })
      .catch(err => {
        setError("Erreur de connexion.");
        console.error("Erreur :", err);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
    setNotes([]);
    setUsername('');
    setPassword('');
    setError('');
    setNomProf('');
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
        <h2>Espace {role === 'prof' ? `Professeur (${nomProf})` : 'Élève'}</h2>
        <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: "#eee" }}>Déconnexion</button>

        <h3>Liste des notes</h3>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {role === 'prof' && <p><strong>Élève :</strong> {note.nom_complet}</p>}
              <p><strong>Matière :</strong> {note.matiere} — <strong>Note :</strong> {note.note}</p>
            </div>
          ))
        ) : (
          <p>Aucune note à afficher.</p>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Connexion</h1>
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

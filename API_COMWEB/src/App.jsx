import React, { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState(null);
  const [notes, setNotes] = useState([]);

  const handleChooseRole = (choix) => {
    setRole(choix);
  };

  const handleRetour = () => {
    setRole(null);
    setNotes([]);
  };

  useEffect(() => {
    if (role === 'prof') {
      fetch('http://localhost/projet_y/get_notes.php')
        .then(res => res.json())
        .then(data => setNotes(data))
        .catch(err => console.error("Erreur de récupération :", err));
    }
  }, [role]);

  if (!role) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1>Se connecter</h1>
        <button onClick={() => handleChooseRole('eleve')} style={btnStyle}>Élève</button>
        <button onClick={() => handleChooseRole('prof')} style={btnStyle}>Professeur</button>
      </div>
    );
  }

  if (role === 'eleve') {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Espace Élève</h2>
        <p>Bienvenue sur votre interface.</p>
        <ul>
          <li>Maths : 14</li>
          <li>Physique : 16</li>
        </ul>
        <button onClick={handleRetour}>Retour</button>
      </div>
    );
  }

  if (role === 'prof') {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Espace Professeur</h2>
        <p>Bienvenue sur votre interface.</p>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {note.eleve} - {note.matiere} : {note.note}
            </li>
          ))}
        </ul>
        <button onClick={handleRetour}>Retour</button>
      </div>
    );
  }
}

const btnStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default App;

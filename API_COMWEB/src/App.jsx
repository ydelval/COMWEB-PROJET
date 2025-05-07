import React, { useState } from 'react';



function App() {
  const [role, setRole] = useState(null); // null | "eleve" | "prof"

  const handleChooseRole = (choix) => {
    setRole(choix);
  };

  const handleRetour = () => {
    setRole(null);
  };

  if (!role) {
    // Page d’accueil
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
          <li>Alice - Maths : 14</li>
          <li>Bob - Physique : 15</li>
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


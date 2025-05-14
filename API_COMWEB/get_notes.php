<?php
// Autorisations CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Réponse préliminaire aux requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Fonction pour envoyer une réponse JSON
function envoiJSON($tab){
    header('Content-Type: application/json');
    echo json_encode($tab, JSON_UNESCAPED_UNICODE);
}

// Connexion à la base de données
function connexionBDD() {
    $host = 'localhost';
    $dbname = 'projet_notes';
    $username_db = 'root';
    $password_db = '';

    try {
        return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username_db, $password_db);
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }
}

// Récupère toutes les notes pour tous les élèves
function recupererToutesLesNotes() {
    $bdd = connexionBDD();
    $sql = "SELECT utilisateurs.username AS eleve, matieres.nom AS matiere, notes.note 
            FROM notes
            JOIN utilisateurs ON notes.eleve_id = utilisateurs.id
            JOIN matieres ON notes.matiere_id = matieres.id";
    $stmt = $bdd->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Récupérer toutes les notes
$notes = recupererToutesLesNotes();

// Envoi des notes
envoiJSON($notes);
?>

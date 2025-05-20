<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit(0);

function envoiJSON($tab){
    header('Content-Type: application/json');
    echo json_encode($tab, JSON_UNESCAPED_UNICODE);
}

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

function recupererToutesLesNotes() {
    $bdd = connexionBDD();
    $sql = "SELECT utilisateurs.nom_complet, matieres.nom AS matiere, notes.note 
            FROM notes
            JOIN utilisateurs ON notes.eleve_id = utilisateurs.id
            JOIN matieres ON notes.matiere_id = matieres.id
            WHERE utilisateurs.role = 'eleve'";
    $stmt = $bdd->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$notes = recupererToutesLesNotes();
envoiJSON($notes);
?>

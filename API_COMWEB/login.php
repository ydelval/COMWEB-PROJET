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

function verifierConnexion($username, $mdp) {
    $bdd = connexionBDD();
    $sql = "SELECT * FROM utilisateurs WHERE username = :username";
    $stmt = $bdd->prepare($sql);
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $mdp === $user['mdp']) {
        return $user;
    }
    return false;
}

function recupererNotes($eleve_id) {
    $bdd = connexionBDD();
    $sql = "SELECT matieres.nom AS matiere, notes.note 
            FROM notes
            JOIN matieres ON notes.matiere_id = matieres.id
            WHERE notes.eleve_id = :eleve_id";
    $stmt = $bdd->prepare($sql);
    $stmt->execute(['eleve_id' => $eleve_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['username']) || empty($input['mot_de_passe'])) {
    envoiJSON(["statut" => "erreur", "message" => "Paramètres manquants"]);
    exit;
}

$username = $input['username'];
$mdp = $input['mot_de_passe'];

$utilisateur = verifierConnexion($username, $mdp);

if ($utilisateur) {
    if ($utilisateur['role'] === 'eleve') {
        $notes = recupererNotes($utilisateur['id']);
    } else {
        $notes = []; // Les profs récupèrent les notes via get_notes.php
    }

    envoiJSON([
        "statut" => "ok",
        "eleve" => $utilisateur,
        "notes" => $notes
    ]);
} else {
    envoiJSON(["statut" => "erreur", "message" => "Identifiants incorrects"]);
}
?>

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

// Vérifie l'identifiant et le mot de passe
function verifierConnexion($username, $mdp) {
    $bdd = connexionBDD();
    $sql = "SELECT * FROM utilisateurs WHERE username = :username";
    $stmt = $bdd->prepare($sql);
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Mot de passe en clair (sans hash ici volontairement)
    if ($user && $mdp === $user['mdp']) {
        return $user;
    }
    return false;
}

// Récupère les notes d'un élève par ID
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

// Lecture du JSON envoyé
$input = json_decode(file_get_contents('php://input'), true);

// Vérification des champs requis
if (empty($input['username']) || empty($input['mot_de_passe'])) {
    envoiJSON(["statut" => "erreur", "message" => "Paramètres manquants"]);
    exit;
}

$username = $input['username'];
$mdp = $input['mot_de_passe'];

// Vérification de l'utilisateur
$utilisateur = verifierConnexion($username, $mdp);

if ($utilisateur) {
    if ($utilisateur['role'] === 'eleve') {
        $notes = recupererNotes($utilisateur['id']);
    } else {
        $notes = []; // Prof : pas de notes ici, il passera par get_notes.php
    }

    // Réponse réussie
    envoiJSON([
        "statut" => "ok",
        "eleve" => $utilisateur,
        "notes" => $notes
    ]);
} else {
    envoiJSON(["statut" => "erreur", "message" => "Identifiants incorrects"]);
}
?>

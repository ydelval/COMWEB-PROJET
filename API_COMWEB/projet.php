<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'projet_notes';
$username = 'root';
$password = '';

try {
    // Connexion à la base de données
    $bdd = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des données envoyées en POST
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;
    $role = $data->role;

    // Requête pour vérifier l'utilisateur
    $requete = "SELECT * FROM utilisateurs WHERE username = :username AND role = :role";
    $stmt = $bdd->prepare($requete);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':role', $role);
    $stmt->execute();
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérification du mot de passe en clair
    if ($utilisateur && $utilisateur['mdp'] === $password) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>

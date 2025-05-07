
<?php
header("Access-Control-Allow-Origin: *"); // autorise les requêtes depuis React
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'projet_notes';
$username = 'root';
$password = '';

try {
    $bdd = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $requete = "SELECT * FROM utilisateurs";
    $resultat = $bdd->query($requete);
    $utilisateurs = $resultat->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($utilisateurs);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>


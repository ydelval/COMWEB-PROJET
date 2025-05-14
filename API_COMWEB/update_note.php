<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'projet_notes';
$username = 'root';
$password = '';

try {
    $bdd = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Gestion du POST JSON ou formulaire
    $data = json_decode(file_get_contents("php://input"));
    
    if ($data && isset($data->id) && isset($data->note)) {
        // JSON envoyé
        $id = $data->id;
        $note = $data->note;
    } elseif (isset($_POST['id']) && isset($_POST['note'])) {
        // Formulaire classique
        $id = $_POST['id'];
        $note = $_POST['note'];
    } else {
        echo json_encode(["success" => false, "message" => "Données manquantes ou malformées"]);
        exit;
    }

    $stmt = $bdd->prepare("UPDATE notes SET note = :note WHERE id = :id");
    $stmt->bindParam(':note', $note);
    $stmt->bindParam(':id', $id);
    $success = $stmt->execute();

    echo json_encode(["success" => $success]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>

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

    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $role = $data->role;

    if ($role === "prof") {
        $stmt = $bdd->prepare("SELECT n.id, u.username AS eleve, n.matiere, n.note 
                               FROM notes n JOIN utilisateurs u ON n.id_eleve = u.id 
                               WHERE u.role = 'eleve'");
        $stmt->execute();
    } else {
        $stmt = $bdd->prepare("SELECT n.id, n.matiere, n.note 
                               FROM notes n JOIN utilisateurs u ON n.id_eleve = u.id 
                               WHERE u.username = :username");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
    }

    $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($notes);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>

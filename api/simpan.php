<?php
require("conn.php");

foreach ($_POST as $field => $value) $$field = $value;

if ($idpelajar == 0) {
    $sql = "INSERT INTO pelajar VALUES (null, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nama, $nokp, $nomatrik);
} else {
    $sql = "UPDATE pelajar SET nama = ?, nokp = ?, nomatrik = ? WHERE idpelajar = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nama, $nokp, $nomatrik, $idpelajar);
}
$stmt->execute();
$stmt->close();

header("Access-Control-Allow-Origin: *");
echo 'ok';
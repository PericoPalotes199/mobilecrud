<?php
require("conn.php");
require('hashids/vendor/autoload.php');
header("Access-Control-Allow-Origin: *");

use Hashids\Hashids;

$hashids = new Hashids('Mobile CRUD', 8);
$id = $hashids->decode($_GET['idpelajar']);
$idpelajar = $id[0];

$sql = "DELETE FROM pelajar WHERE idpelajar = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $idpelajar);
$stmt->execute();
$stmt->close();

echo 'ok';
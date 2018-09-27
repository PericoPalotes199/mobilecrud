<?php
require("conn.php");

$data = null;
$sql = "SELECT * FROM pelajar ORDER BY nama";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$myJSON = json_encode($data);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo $myJSON;
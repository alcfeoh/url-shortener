<?php
header("Access-Control-Allow-Origin: *");

$url = $_GET["q"];
echo file_get_contents($url);

exit;

?>
<?php

$prefix = "/s";
$uri = $_SERVER[REQUEST_URI];
$uri= str_replace($prefix, "", $uri);
$url = file_get_contents("https://short-url-i21.firebaseio.com/$uri.json");

if ($url != "null"){
	$url = str_replace('"', "", $url);
	header("Location: $url");
} else 
	echo "Wrong url";
exit;

?>
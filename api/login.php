<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require 'db_connection.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


if (isset($request->name) && !empty($request->name) && isset($request->password) && !empty($request->password)) {
    $name = mysqli_real_escape_string($db_conn, trim($request->name));
    $pwd = mysqli_real_escape_string($db_conn, trim($request->password));
    $result = mysqli_query($db_conn,"SELECT * FROM `users` where name='$name' and password='$pwd'");
    $rows = mysqli_num_rows($result);
    if($rows==1){
        $user = mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode(["success"=>1,"user"=>$user]);
    }
    else{
        echo json_encode(["success"=>0, "msg"=>"Your username/password is incorrect"]);
    }      
        
    }
else{
	echo json_encode(["success"=>0, "msg"=>"Your username/password is empty"]);
}
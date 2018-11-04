<?php 
require "../../config/datab.php";
session_start();
 if(!isset($_SESSION['adminemail']) & empty($_SESSION['adminemail'])) {
    header('location: login.php');
 }
 if(isset($_GET['id']) & !empty($_GET['id'])){
    $id = $_GET['id'];
    $res = mysqli_query($mysqli, $sql);
    $r = mysqli_fetch_assoc($res);
    
        $delsql="DELETE FROM clientdetails WHERE id='$id'";
        if(mysqli_query($mysqli, $delsql)){
            header("location: index.php");
    }
 } else {
 	header("location: index.php");
 }
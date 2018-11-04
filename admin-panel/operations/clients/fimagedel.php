<?php 
require "../../config/datab.php";
session_start();
 if(!isset($_SESSION['adminemail']) & empty($_SESSION['adminemail'])) {
    header('location: login.php');
 }
 if(isset($_GET['id']) & !empty($_GET['id'])){
    $id = $_GET['id'];
    $sql = "SELECT image_upload FROM articles WHERE id='$id'";
    $res = mysqli_query($mysqli, $sql);
    $r = mysqli_fetch_assoc($res);
    if(unlink($r['image_upload'])){
		$delsql="UPDATE articles SET image_upload='' WHERE id='$id'";
		if(mysqli_query($mysqli, $delsql)){
			header("location: edit-article.php?id=$id");
		}
    } else {
        $delsql="UPDATE articles SET image_upload='' WHERE id='$id'";
        if(mysqli_query($mysqli, $delsql)){
            header("location: edit-article.php?id=$id");
        }
    }
 } else {
 	header("location: index.php");
 }
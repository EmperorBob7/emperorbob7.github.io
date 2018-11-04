<?php 
require "../admin-panel/config/datab.php";
if(isset($_POST) & !empty($_POST)){
    $email = mysqli_real_escape_string($mysqli, $_POST['email']);
    date_default_timezone_set("Asia/Kolkata");
    $updatetime = date("Y-m-d H:i:s");
    $query = "INSERT INTO subscription (emailsubscriber, created) VALUES ('$email', '$updatetime')";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $lid = mysqli_insert_id($mysqli);
    if($result){
      header("location: ../success-subscription.html");
   } else {
      $fmsm = "Form Submission Failed";
    }
}
?>
<?php 
require "../admin-panel/config/datab.php";
if(isset($_POST) & !empty($_POST)){
	$cname = mysqli_real_escape_string($mysqli, $_POST['cname']);
    $email = mysqli_real_escape_string($mysqli, $_POST['email']);
    $phonenum = mysqli_real_escape_string($mysqli, $_POST['phone']);
    $pannum = mysqli_real_escape_string($mysqli, $_POST['pannum']);
    $incometaxnum = mysqli_real_escape_string($mysqli, $_POST['incometaxnum']);
    $gstnum = mysqli_real_escape_string($mysqli, $_POST['gstnum']);
    $gsttype = mysqli_real_escape_string($mysqli, $_POST['gsttype']);
    date_default_timezone_set("Asia/Kolkata");
    $updatetime = date("Y-m-d H:i:s");
    $query = "INSERT INTO clientdetails (fname, clientemail, phonenum, pannumber, incometaxnum, gstnum, gsttype, clientstatus, userid, created, modified) VALUES ('$cname', '$email', '$phonenum', '$pannum', '$incometaxnum', '$gstnum', '$gsttype', '$status', 101, '$updatetime', '$updatetime')";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $lid = mysqli_insert_id($mysqli);
    if($result){
      header("location: ../thank-you.html");
   } else {
      $fmsm = "Form Submission Failed";
    }
}
?>
<?php 
require "../../config/datab.php";
session_start();
 if(!isset($_SESSION['adminemail']) & empty($_SESSION['adminemail'])) {
    header('location: login.php');
 }
 $email = $mysqli->escape_string($_SESSION['adminemail']);
        $result = $mysqli->query("SELECT * FROM admin_user WHERE admin_email='$email'");
        $user = $result->fetch_assoc();

        $username = $user['admin_name'];
        $email = $user['admin_email'];
        $roll = $user['admin_roll'];
        $userid = $user['id'];
        //get value for edit page
 if(isset($_GET['id']) & !empty($_GET['id'])){
  $id = $_GET['id'];
  $query = "SELECT * FROM clientdetails WHERE id='$id'";
  $res = mysqli_query($mysqli, $query);
  $getpro = mysqli_fetch_assoc($res);
  if(mysqli_num_rows($res) <= 1){
    //redirect to view content
  }
 } else {
  //redirect to view content
 }
 
 if(isset($_POST) & !empty($_POST)){
   $cname = mysqli_real_escape_string($mysqli, $_POST['cname']);
   $email = mysqli_real_escape_string($mysqli, $_POST['email']);
    $phonenum = mysqli_real_escape_string($mysqli, $_POST['phone']);
    $pannum = mysqli_real_escape_string($mysqli, $_POST['pannum']);
    $incometaxnum = mysqli_real_escape_string($mysqli, $_POST['incometaxnum']);
    $gstnum = mysqli_real_escape_string($mysqli, $_POST['gstnum']);
    $gsttype = mysqli_real_escape_string($mysqli, $_POST['gsttype']);
    $status = $_POST['status'];
    date_default_timezone_set("Asia/Kolkata");
    $updatetime = date("Y-m-d H:i:s");
      $query = "UPDATE clientdetails SET fname='$cname', clientemail='$email', phonenum='$phonenum', pannumber='$pannum', incometaxnum='$incometaxnum', gstnum='$gstnum', gsttype='$gsttype', userid='$userid', modified='$updatetime' WHERE id=$id";

    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    //$lid = mysqli_insert_id($connection);
    if($result){
      $smsm = "Client Updated Successfully.";
      header("location: edit-client.php?id=$id");
    } else {
      $fmsm = "Form Updation Failed";
    }
 }
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin Panel - Edit Article</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../../css/bootstrap.min.css" />
<link rel="stylesheet" href="../../css/bootstrap-responsive.min.css" />
<link rel="stylesheet" href="../../css/uniform.css" />
<link rel="stylesheet" href="../../css/select2.css" />
<link rel="stylesheet" href="../../css/matrix-style.css" />
<link rel="stylesheet" href="../../css/matrix-media.css" />
<link href="../../font-awesome/css/font-awesome.css" rel="stylesheet" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>
<script src="../../ckeditor/ckeditor.js"></script>
</head>
<body>
<?php $nav = "Inner"; $active = "client-page"; ?>
  <?php require "../../inc/top-navigation.php"; ?>

<!--sidebar-menu-->

<div id="sidebar"> <a href="#" class="visible-phone"><i class="icon icon-th"></i>Tables</a>
 <?php require "../../inc/left-navigation.php"; ?>
</div>
<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Articles</a> </div>
    <h1>Edit Article</h1>
  </div>
  <div class="container-fluid">
    <hr>
    <div class="row-fluid">
      <div class="span10">
        <div class="widget-box">
        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
        </div>
        <?php if(isset($smsm)){    ?><div class="alert alert-success">
              <button class="close" data-dismiss="alert">×</button>
              <strong>Success.</strong> <?php echo $smsm; ?> </div><?php } ?>
              <?php if(isset($fmsm)){    ?><div class="alert alert-error">
              <button class="close" data-dismiss="alert">×</button>
              <strong>Error!</strong> <?php echo $fmsm; ?> </div><?php } ?>
          <form action="#" method="POST" class="form-horizontal" enctype="multipart/form-data">
             <div class="control-group">
              <label class="control-label">  Full Name :</label>
              <div class="controls">
                <input type="text" class="span11" name="cname" value="<?php echo $getpro['fname']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Email :</label>
              <div class="controls">
                <input type="email" class="span11" name="email" value="<?php echo $getpro['clientemail']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Phone :</label>
              <div class="controls">
                <input type="text" class="span11" name="phone" value="<?php echo $getpro['phonenum']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Pan Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="pannum" value="<?php echo $getpro['pannumber']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Income Tax Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="incometaxnum" value="<?php echo $getpro['incometaxnum']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">GST Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="gstnum" value="<?php echo $getpro['gstnum']; ?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">GST Type :</label>
              <div class="controls">
                <input type="text" class="span11" name="gsttype" value="<?php echo $getpro['gsttype']; ?>" />
              </div>
            </div>
            
           
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <div class="span6">
        
      </div>
      <div class="span6">
        
      </div>
    </div>
  </div>
</div>
<!--Footer-part-->

<!--end-Footer-part-->
<script>
        ClassicEditor
    .create( document.querySelector( '#editor' ), {
        removePlugins: [ 'Heading', 'Link' ],
        toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ]
    } )
    .catch( error => {
        console.log( error );
    } );
    </script>
<script src="../../js/jquery.min.js"></script> 
<script src="../../js/jquery.ui.custom.js"></script> 
<script src="../../js/bootstrap.min.js"></script> 
<script src="../../js/jquery.uniform.js"></script> 
<script src="../../js/select2.min.js"></script> 
<script src="../../js/jquery.dataTables.min.js"></script> 
<script src="../../js/matrix.js"></script> 
<script src="../../js/matrix.tables.js"></script>
</body>
</html>

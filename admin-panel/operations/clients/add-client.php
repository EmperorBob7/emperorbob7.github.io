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
    $query = "INSERT INTO clientdetails (fname, clientemail, phonenum, pannumber, incometaxnum, gstnum, gsttype, clientstatus, userid, created, modified) VALUES ('$cname', '$email', '$phonenum', '$pannum', '$incometaxnum', '$gstnum', '$gsttype', '$status', '$userid', '$updatetime', '$updatetime')";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $lid = mysqli_insert_id($mysqli);
    if($result){
      $smsm = "Client Added Successfully.";
      header("location: edit-client.php?id=$lid");
   } else {
      $fmsm = "Form Submission Failed";
    }
 }
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin Panel - Add Client</title>
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
<style type="text/css">
  #ckeditor, .ck-content  {height: 200px;}
</style>
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
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Client</a> </div>
    <h1>Add Client details</h1>
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
                <input type="text" class="span11" name="cname" placeholder=" Enter name here" />
                <br/> 
                <small id="emailHelp" class="form-text text-muted">Enter the Full name of Client</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Email :</label>
              <div class="controls">
                <input type="email" class="span11" name="email" placeholder="Enter Email of Client" />
                <br/> 
                <small id="emailHelp" class="form-text text-muted">Enter Email address of client</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Phone :</label>
              <div class="controls">
                <input type="text" class="span11" name="phone" placeholder="Enter Phone number of client" />
                <br/> 
                <small id="phoneHelp" class="form-text text-muted">Enter Phone Number of Client</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Pan Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="pannum" placeholder="Enter Pan Number of Client" />
                <br/> 
                <small id="pannumHelp" class="form-text text-muted">Enter Pan number of client</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Income Tax Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="incometaxnum" placeholder="Enter Income Tax Number" />
                <br/> 
                <small id="pannumHelp" class="form-text text-muted">Enter income Tax number of client</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">GST Number :</label>
              <div class="controls">
                <input type="text" class="span11" name="gstnum" placeholder="Enter GST Number" />
                <br/> 
                <small id="pannumHelp" class="form-text text-muted">Enter GST number details</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">GST Type :</label>
              <div class="controls">
                <input type="text" class="span11" name="gsttype" placeholder="GST Type" />
                <br/> 
                <small id="pannumHelp" class="form-text text-muted">Enter GST type details</small>
              </div>
            </div>
            
            <div class="control-group">
              <div class="row">
                <div class="span6">
                  <label class="control-label">Client Status</label>
                  <div class="controls"> 
                    <select class="form-control" name="status" class="span4 m-wrap">
                      <option value="">Select</option>
                      <option value="declined">Declined</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                </div>
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
<div class="row-fluid">
  <div id="footer" class="span12"> 2018 &copy; CA Admin Panel  </div>
</div>
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

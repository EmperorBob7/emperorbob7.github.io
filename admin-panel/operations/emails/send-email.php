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
   $cemail = mysqli_real_escape_string($mysqli, $_POST['client']);
   $subject = mysqli_real_escape_string($mysqli, $_POST['subject']);
   $link = mysqli_real_escape_string($mysqli, $_POST['position']);
    $description = mysqli_real_escape_string($mysqli, $_POST['editor']);
    date_default_timezone_set("Asia/Kolkata");
    $updatetime = date("Y-m-d H:i:s");
    $query = "INSERT INTO emaillist (client, subject, message, userid, created, modified) VALUES ('$cemail', '$subject', '$description', '$userid', '$updatetime', '$updatetime')";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $lid = mysqli_insert_id($mysqli);
    if($result){
      $name = "CA";
    $email = "ca@ca.com";
    $from = $email;
    $to = 'satsaiinfo@gmail.com';  // please change this email id
    $subject = 'Contact Form : CA - Message Alert';

    $body = "From: $name\n E-Mail: $email\n Message:\n $description";

    $headers = "From: ".$from;


    //send the email
    $result = '';
    if (mail ($cemail, $subject, $body, $headers)) {
      $smsm = "Email Sent Successfully.";
      header("location: index.php?id=$lid");
    }

   } else {
      $fmsm = "Form Submission Failed";
    }
 }
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin Panel - Send Email</title>
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
<?php $nav = "Inner"; $active = "email-page"; ?>
<?php require "../../inc/top-navigation.php"; ?>

<!--sidebar-menu-->

<div id="sidebar"> <a href="#" class="visible-phone"><i class="icon icon-th"></i>Tables</a>
<?php require "../../inc/left-navigation.php"; ?>
</div>
<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Emails</a> </div>
    <h1>Compose Email</h1>
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
              <label class="control-label">  Client Email :</label>
              <div class="controls">
                <select class="form-control" name="client" class="span4 m-wrap">
                  <?php 
                  $queryies = mysqli_query($mysqli, "SELECT fname, clientemail FROM clientdetails");
                  while($getalldate = mysqli_fetch_assoc($queryies)) {
                  ?>
                      <option value="">Select Client Name</option>
                      <option value="<?php echo $getalldate['clientemail']; ?>"><?php echo $getalldate['fname']; ?>: <?php echo $getalldate['clientemail']; ?></option>
                    <?php } ?>
                    </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">  Subject :</label>
              <div class="controls">
                <input type="text" class="span11" name="subject" placeholder=" Enter here" />
                <br/> 
                <small id="emailHelp" class="form-text text-muted">Enter the title of Subject</small>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Attachment link :</label>
              <div class="controls">
                <input type="text" class="span11" name="position" placeholder="Enter your attached file shared link" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Description :</label>
              <div class="controls">  
                <textarea class="form-control" id="editor" name="editor" style="height: 200px;"></textarea>
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
  <div id="footer" class="span12"> 2018 &copy; Adbizmart Admin Panel Brought to you by <a href="https://www.satsaiinfocom.com">Sat Sai Infocom</a> </div>
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

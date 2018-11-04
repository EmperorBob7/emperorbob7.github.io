<?php 
require "config/datab.php";
$nav = ""; 
$active = "home-page";
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
          $url = mysqli_real_escape_string($_POST['url']);
          $title = mysqli_real_escape_string($_POST['title']);
          date_default_timezone_set("Asia/Kolkata");
          $updatetime = date("Y-m-d H:i:s");
          $query = "INSERT INTO settings (websiteurl, homepagetitle, user_id, created, modified) VALUES ('$url', '$title', '$$userid', '$updatetime', '$updatetime')";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $lid = mysqli_insert_id($mysqli);
    if($result){
      $smsm = "Settings Updated Successfully.";
      header("location: settings.php?id=$lid");
   } else {
      $fmsm = "Form Submission Failed";
    }
        }
        //$active = $user['active'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin - Settings</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="css/bootstrap.min.css" />
<link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
<link rel="stylesheet" href="css/fullcalendar.css" />
<link rel="stylesheet" href="css/matrix-style.css" />
<link rel="stylesheet" href="css/matrix-media.css" />
<link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
<link rel="stylesheet" href="css/jquery.gritter.css" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>
</head>
<body>
  
  <?php require "inc/setting-navigation.php"; ?>

<!--close-top-Header-menu-->
<!--start-top-serch-->
<!--close-top-serch-->
<!--sidebar-menu-->
<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
  <?php require "inc/left-navigation.php"; ?>
</div>
<!--sidebar-menu-->

<!--main-container-part-->
<div id="content">
<!--breadcrumbs-->
  <div id="content-header">
    <div id="breadcrumb"> <a href="index.php" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a></div>
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
              <label class="control-label">Home Page url :</label>
              <div class="controls">
                <input type="text" class="span11" name="url" placeholder="Home Page url" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Home Page Title :</label>
              <div class="controls">
                <input type="text" class="span11" name="title" placeholder="Home Page Title" />
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
    <hr/>
  </div>
</div>

<!--end-main-container-part-->

<!--Footer-part-->

<div class="row-fluid">
  <div id="footer" class="span12"> 2018 &copy; Adbizmart Admin Panel. Brought to you by <a href="https://www.satsaiinfocom.com">Sat Sai Infocom</a> </div>
</div>

<!--end-Footer-part-->

<script src="js/excanvas.min.js"></script> 
<script src="js/jquery.min.js"></script> 
<script src="js/jquery.ui.custom.js"></script> 
<script src="js/bootstrap.min.js"></script> 
<script src="js/jquery.flot.min.js"></script> 
<script src="js/jquery.flot.resize.min.js"></script> 
<script src="js/jquery.peity.min.js"></script> 
<script src="js/fullcalendar.min.js"></script> 
<script src="js/matrix.js"></script> 
<script src="js/matrix.dashboard.js"></script> 
<script src="js/jquery.gritter.min.js"></script> 
<script src="js/matrix.interface.js"></script> 
<script src="js/matrix.chat.js"></script> 
<script src="js/jquery.validate.js"></script> 
<script src="js/matrix.form_validation.js"></script> 
<script src="js/jquery.wizard.js"></script> 
<script src="js/jquery.uniform.js"></script> 
<script src="js/select2.min.js"></script> 
<script src="js/matrix.popover.js"></script> 
<script src="js/jquery.dataTables.min.js"></script> 
<script src="js/matrix.tables.js"></script> 

<script type="text/javascript">
  // This function is called from the pop-up menus to transfer to
  // a different page. Ignore if the value returned is a null string:
  function goPage (newURL) {

      // if url is empty, skip the menu dividers and reset the menu selection to default
      if (newURL != "") {
      
          // if url is "-", it is this page -- reset the menu:
          if (newURL == "-" ) {
              resetMenu();            
          } 
          // else, send page to designated URL            
          else {  
            document.location.href = newURL;
          }
      }
  }

// resets the menu selection upon entry to this page:
function resetMenu() {
   document.gomenu.selector.selectedIndex = 2;
}
</script>
</body>
</html>

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
        //$active = $user['active'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin</title>
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
  
  <?php require "inc/indextop.php"; ?>
<!--close-top-Header-menu-->
<!--sidebar-menu-->
<div id="sidebar"><a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
  <?php require "inc/left-navigation.php"; ?>
</div>
<!--sidebar-menu-->

<!--main-container-part-->
<div id="content">
<!--breadcrumbs-->
  <div id="content-header">
    <div id="breadcrumb"> <a href="index.html" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a></div>
  </div>
<!--End-breadcrumbs-->

<!--Action boxes-->
  <div class="container-fluid">
    <div class="quick-actions_homepage">
      <ul class="quick-actions">
        <li class="bg_lb"> <a href="index.php"> <i class="icon-dashboard"></i> 
          <span class="label label-important"></span> My Dashboard </a> </li>
        <li class="bg_lg "> <a href="operations/clients/index.php"> <i class="icon-signal"></i> <span class="label label-important"><?php 
              $sql="SELECT * FROM clientdetails";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?></span>Clients</a> </li>
              <li class="bg_lg"> <a href="operations/emails/index.php"> <i class="icon-signal"></i> <span class="label label-important"><?php 
              $sql="SELECT * FROM emaillist";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?></span>Emails</a> </li>
              <li class="bg_lg"> <a href="operations/faq/index.php"> <i class="icon-signal"></i> <span class="label label-important"><?php 
              $sql="SELECT * FROM faq_master";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?></span>FAQ</a> </li>
              <li class="bg_lg"> <a href="operations/subscriptions/index.php"> <i class="icon-signal"></i> <span class="label label-important"><?php 
              $sql="SELECT * FROM subscription";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?></span>Subscriptions</a> </li>

      </ul>
    </div>
<!--End-Action boxes-->    

<!--End-Chart-box--> 
    <hr/>
  </div>
</div>

<!--end-main-container-part-->

<!--Footer-part-->

<div class="row-fluid">
  <div id="footer" class="span12"> 2018 &copy; CA Admin Panel. Brought to you by <a href="https://www.satsaiinfocom.com">Sat Sai Infocom</a> </div>
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

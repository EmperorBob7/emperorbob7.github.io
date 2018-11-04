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
        //$active = $user['active'];
        $query = "SELECT * FROM clientdetails ORDER BY id DESC";
        $res = mysqli_query($mysqli, $query);
        
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin Panel - Clients</title>
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
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Tables</a> </div>
    <h1>Client List</h1>
  </div>
  <div class="container-fluid">
    <hr>
    <div class="row-fluid">
      <div class="span12">
       
        <div class="widget-box">
          <div class="widget-title"> <span class="icon"><i class="icon-th"></i></span>
            <h5>Clients</h5>
          </div>
          <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pan Number</th>
                  <th>Income Tax Number</th>
                  <th>GST Number</th>
                  <th>GST Type</th>
                  <th>Create Time</th>
                  <th>Update Time</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                <?php 
                  while($getpro = mysqli_fetch_assoc($res)){
                ?>
                <tr class="gradeX">
                  <td>1</td>
                  <td><?php echo $getpro['fname']; ?></td>
                  <td><?php echo $getpro['clientemail']; ?></td>
                  <td><?php echo $getpro['phonenum']; ?></td>
                  <td style="text-align: center;"><?php echo $getpro['pannumber']; ?></td>
                  <td style="text-align: center;"><?php echo $getpro['incometaxnum']; ?></td>
                  <td style="text-align: center;"><?php echo $getpro['gstnum']; ?></td>
                  <td style="text-align: center;"><?php echo $getpro['gsttype']; ?></td>
                  <td><?php echo $getpro['created']; ?></td>
                  <td class="center"><?php echo $getpro['modified']; ?></td>
                  <td>
                    <a href="edit-client.php?id=<?php echo $getpro['id']; ?>" class="btn btn-inverse">Edit</a>
                    <a href="delete-client.php?id=<?php echo $getpro['id']; ?>" class="btn btn-danger">Delete</a></td>
                </tr>
                <?php } ?>
               
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!--Footer-part-->
<div class="row-fluid">
  <div id="footer" class="span12"> 2013 &copy; Adbizmart Admin Panel Brought to you by <a href="https://www.satsaiinfocom.com">Sat Sai Infocom</a> </div>
</div>
<!--end-Footer-part-->
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

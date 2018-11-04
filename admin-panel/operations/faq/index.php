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
        $query = "SELECT * FROM faq_master ORDER BY id DESC";
        $res = mysqli_query($mysqli, $query);
        // Start function
        function shorter($text, $chars_limit)
        {
            // Check if length is larger than the character limit
            if (strlen($text) > $chars_limit)
            {
                // If so, cut the string at the character limit
                $new_text = substr($text, 0, $chars_limit);
                // Trim off white space
                $new_text = trim($new_text);
                // Add at end of text ...
                return $new_text . "...";
            }
            // If not just return the text as is
            else
            {
            return $text;
            }
        }
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CA Admin Panel - FAQ List</title>
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
<?php $nav = "Inner"; $active = "faq-page"; ?>
<?php require "../../inc/top-navigation.php"; ?>

<!--sidebar-menu-->

<div id="sidebar"> <a href="#" class="visible-phone"><i class="icon icon-th"></i>Tables</a>
 <?php require "../../inc/left-navigation.php"; ?>
</div>
<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Tables</a> </div>
    <h1>FAQ List</h1>
  </div>
  <div class="container-fluid">
    <hr>
    <div class="row-fluid">
      <div class="span12">
       
        <div class="widget-box">
          <div class="widget-title"> <span class="icon"><i class="icon-th"></i></span>
            <h5>FAQ</h5>
          </div>
          <div class="widget-content nopadding">
            <table class="table table-bordered data-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Created</th>
                  <th>Modified</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                <?php 
                  while($getpro = mysqli_fetch_assoc($res)){
                    $chars_limit = 100;
                ?>
                <tr class="gradeX">
                  <td>1</td>
                  <td><?php echo shorter($getpro['title'], 30); ?></td>
                  <td><?php echo shorter($getpro['description'], $chars_limit); ?></td>
                  <td><?php echo $getpro['created']; ?></td>
                  <td style="text-align: center;"><?php echo $getpro['modified']; ?></td>
                  <td>
                    <a href="edit-faq.php?id=<?php echo $getpro['id']; ?>" class="btn btn-inverse">Edit</a>
                    <a href="delete-faq.php?id=<?php echo $getpro['id']; ?>" class="btn btn-danger">Delete</a></td>
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
  <div id="footer" class="span12"> 2013 &copy; CA Admin Panel  </div>
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

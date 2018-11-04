<?php 
    session_start();
    require 'config/datab.php';

    if(isset($_SESSION['adminemail']) & !empty($_SESSION['adminemail'])) {
    header('location: index.php');
 }

    if (isset($_COOKIE['adminemail']))
    {
        $_SESSION['adminemail'] = $_COOKIE['adminemail'];
        $_SESSION['logged_in'] = 1;
        header('location: index.php');
    }

    if (isset($_POST) && !empty($_POST))
    {
        $email = mysqli_real_escape_string($mysqli, $_POST['email']);
        $password = md5(mysqli_real_escape_string($mysqli, $_POST['password']));
        //3.1.2 Checking the values are existing in the database or not
        $query = "SELECT * FROM `admin_user` WHERE admin_email='$email' and admin_password='$password'";
         
        $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
        $count = mysqli_num_rows($result);
        //3.1.2 If the posted values are equal to the database values, then session will be created for the user.
        if ($count == 1){
        $_SESSION['adminemail'] = $email;
        header('location: index.php');
        }else{
        //3.1.3 If the login credentials doesn't match, he will be shown with an error message.
        $fmsg = "Invalid Login Credentials.";
        }
        }
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
        <title>CA Admin Panel Login</title><meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
        <link rel="stylesheet" href="css/matrix-login.css" />
        <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>

    </head>
    <body>
        <div id="loginbox">  
        <div class="control-group normal_text"> <h3><img src="../images/logo.png" alt="Logo" /></h3></div>       
            <form id="loginform" class="form-vertical form-signin" method="POST" action="#">
                 <?php if(isset($fmsg)){    ?><div class="alert alert-error">
              <button class="close" data-dismiss="alert">×</button>
              <strong>Error!</strong> <?php echo $fmsg; ?> </div><?php } ?>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lg"><i class="icon-user"> </i></span><input type="text" placeholder="Email" name="email" required="" />
                        </div>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_ly"><i class="icon-lock"></i></span><input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required="" />
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <center><button class="btn btn-success" type="submit" id="submit" name="submit">Login</button></center>
                </div>
            </form>
        </div>
        
        <script src="js/jquery.min.js"></script>  
        <script src="js/matrix.login.js"></script> 
    </body>

</html>

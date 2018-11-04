<?php 
require "admin-panel/config/datab.php";
$query = "SELECT * FROM faq_master ORDER BY id DESC";
$res = mysqli_query($mysqli, $query);
?>
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CA</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="stylesheet" href="css/foundation.css" />
    <link rel="stylesheet" type="text/css" href="slick/slick.css"/>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/responsive.css" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <script src="js/vendor/modernizr.js"></script>
  </head>
  <body>
    <div id="loader-wrapper">
      <div id="loader"></div>

      <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>

    </div>
    <div class="row">
    <div class="large-4 medium-4 small-12 columns">
    <div id="logo"><a href="index.html"><img src="images/logo.png" alt="Conmpany Name"></a></div>
    </div>
    <div class="large-8 medium-8 small-12 columns">
    <nav class="top-bar" data-topbar role="navigation">
  <ul class="title-area">
    <li class="name"> </li>
     <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
  </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li><a href="index.html">Home</a></li>
      <li><a href="about-us.html">About Us</a></li>
      <li class="active"><a href="faq.php">FAQs</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="contact.html">Contact</a></li> 
      <li><a href="register.html">Register</a></li>    
      </ul>
      </li>
    </ul>
  </section>
</nav>
    </div>
    </div>
    
    
<div class="inner-banner">
  <img src="images/about-banner.jpg" alt="About Us"> </div>
    
 <div class="content-sec inner-sec">
 <div class="row">
 <div class="large-12 columns">
 <h2>FREQUENTLY ASKED QUESTIONS</h2>
 </div>
 <div class="clearfix"></div>
 <?php 
    while($getpro = mysqli_fetch_assoc($res)){
 ?>      
 <div class="large-6 medium-6 small-12 columns faq">
   <h3><?php echo $getpro['title']; ?></h3>
   <?php echo $getpro['description']; ?>
 </div>
 <?php } ?>
 
 
 </div>
 </div>   
 
 
 
 <div class="newsletter">
 <div class="row">
 <div class="large-12 columns">
 <h2 class="white">Subscribe to our newsletter</h2>
 <p>Sign up for our mailing list to get latest updates and offers.</p>
 </div>
 <div class="large-2 medium-2 columns hide-for-small">&nbsp;</div>
 <div class="large-8 medium-8 small-12 columns">
 <form id="subscribeForm" role="form" method="post" action="actions/subscribe.php" class="frm">
   <input placeholder="Email Address..." class="radius" type="text" name="email">
   <input name="" class="button radius" value="Subscribe" type="submit">
 </form>
 
 </div>
 <div class="large-2 medium-2 columns hide-for-small">&nbsp;</div>
 
 </div>
 </div>
 
 <div class="footer-sec">
 <div class="row">
 <div class="large-3 medium-3 small-12 columns">
 <div class="foot-1">
 <h4>Quick Links</h4>
 <ul>
 <li><a href="index.html" title="Home">Home</a></li>
 <li><a href="about-us.html" title="About Us">About Us</a></li>
 <li><a href="faq.php">FAQs</a></li>
 <li><a href="services.html" title="Services">Services</a></li>
 <li><a href="contact.html" title="Contact">Contact</a></li>
 </ul>
 </div>
 </div>
 
 <div class="large-3 medium-3 small-12 columns">
 <div class="foot-1">
 <h4>Services</h4>
 <ul>
 <li><a href="services.html" title="Services">Lorem Ipsum</a></li>
 <li><a href="services.html" title="Services">Lorem Ipsum</a></li>
 <li><a href="services.html" title="Services">Lorem Ipsum</a></li>
 <li><a href="services.html" title="Services">Lorem Ipsum</a></li>
 <li><a href="services.html" title="Services">Lorem Ipsum</a></li>
 </ul>
 </div>
 </div>
 
  <div class="large-4 medium-3 small-12 columns">
 <div class="foot-1">
 <h4>Address</h4>
 <p>lorem ipsum is dummy text.<br>
+0000 0000 000 </p>
 <ul>
 <li><a href="mailto:info@companyname.com" target="_blank">info@companyname.com</a></li>
 <li><a href="tel:0000 0000 00" target="_blank">0000 0000 00</a></li>
 </ul>
 </div>
 </div>
 
 <div class="large-2 medium-3 small-12 columns">
 <div class="foot-1">
 <h4>Follow Us</h4>
 <div class="social">
 <div class="facebook"><a href="#" class="facebook"></a></div>
 <div class="twitter"><a href="#" class="twitter"></a></div>
 <div class="gplus"><a href="#" class="gplus"></a></div>
 </div>
 </div>
 </div>
 
 </div>
 </div>
 
 <div class="copy">
 <div class="row">
 <div class="large-12 columns">
 <a href="#">CA</a>
 </div>
 </div>
 </div>
 
 
 
    
    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>
    <script type="text/javascript" src="js/all.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        
        setTimeout(function(){
          $('body').addClass('loaded');
          $('h1').css('color','#222222');
        }, 1000);
        
      });
    </script>
    
  </body>
</html>

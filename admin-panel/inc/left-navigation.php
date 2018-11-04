<?php if(isset($nav)) { ?> 
<ul>
    <li class="<?php if($active == "home-page") { echo "active"; } else {} ?>"><a href="<?php if($active == "home-page") { echo "index.php"; } else { echo "../../index.php";} ?>"><i class="icon icon-home"></i> <span>Dashboard</span></a> </li>
    
    <li class="<?php if($active == "client-page") { echo "active"; } else {} ?> submenu"><a href="#"><i class="icon icon-th-list"></i><span>Client Master</span><span class="label label-important">
      <?php 
              $sql="SELECT * FROM clientdetails";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?>
    </span></a> 
      <ul>
        <li><a href="<?php if($active == "client-page") { echo "index.php"; } else if($active == "email-page" || $active == "subscribe-page" || $active == "faq-page") {echo "../clients/index.php";} else { echo "operations/clients/index.php";} ?>">Clients List</a></li>
        <li><a href="<?php if($active == "client-page") { echo "add-client.php"; } else if($active == "email-page" || $active == "subscribe-page" || $active == "faq-page") { echo "../clients/add-client.php"; } else { echo "operations/clients/add-client.php";} ?>">Add Client</a></li>
      </ul>
    </li>
    <li class="<?php if($active == "email-page") { echo "active"; } else {} ?> submenu"><a href="#"><i class="icon icon-th-list"></i><span>Email Master</span><span class="label label-important">
      <?php 
              $sql="SELECT * FROM emaillist";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?>
    </span></a> 
      <ul>
        <li><a href="<?php if($active == "email-page") { echo "index.php"; } else if($active == "client-page" || $active == "faq-page" || $active == "subscribe-page") {echo "../emails/index.php";} else { echo "operations/emails/index.php";} ?>">Email List</a></li>
        <li><a href="<?php if($active == "email-page") { echo "send-email.php"; } else if($active == "client-page") {echo "../emails/send-email.php";} else { echo "operations/emails/send-email.php";} ?>">Send Email</a></li>
      </ul>
    </li>
    <?php /* For FAQ List */ ?>
    <li class="<?php if($active == "faq-page") { echo "active"; } else {} ?> submenu"><a href="#"><i class="icon icon-th-list"></i><span>Faq Lists</span><span class="label label-important">
      <?php 
              $sql="SELECT * FROM faq_master";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?>
    </span></a> 
      <ul>
        <li><a href="<?php if($active == "faq-page") { echo "index.php"; } else if($active == "client-page" || $active == "email-page" || $active == "subscribe-page") {echo "../faq/index.php";} else { echo "operations/emails/index.php";} ?>">Faq List</a></li>
        <li><a href="<?php if($active == "faq-page") { echo "add-faq.php"; } else if($active == "client-page" || $active == "email-page" || $active == "subscribe-page") {echo "../faq/add-faq.php";} else { echo "operations/faq/add-faq.php";} ?>">Add FAQ</a></li>
      </ul>
    </li>
    <?php /*     for subscriber    */ ?>
    <li class="<?php if($active == "subscribe-page") { echo "active"; } else {} ?> submenu"><a href="#"><i class="icon icon-th-list"></i><span>Subscriber Lists</span><span class="label label-important">
      <?php 
              $sql="SELECT * FROM subscription";
              if ($result=mysqli_query($mysqli,$sql))
                {
                    $rowcount=mysqli_num_rows($result);
                    printf($rowcount);
                    mysqli_free_result($result);
                }
              ?>
    </span></a> 
      <ul>
        <li><a href="<?php if($active == "subscribe-page") { echo "index.php"; } else if($active == "client-page" || $active == "email-page" || $active == "faq-page") {echo "../subscriptions/index.php";} else { echo "operations/subscriptions/index.php";} ?>">Subscriber List</a></li>
      </ul>
    </li>
    
</ul>
<?php } ?>
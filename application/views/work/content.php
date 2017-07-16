<?php
$logged_In_user_id = $this->session->userdata("loginuserID");
$user_type = $this->session->userdata("user_type");
$myworkURL = 'work/student';
$returnURL = 'work/script';
$course_menu_img_path = '';

if($user_type=='2'){

    $myworkURL = 'work/script';
    if($content_type_id == '1')
    {
        $returnURL = $myworkURL;
    }else{///this mean $content_type_id is 3 , head work
        $returnURL = 'work/head';
    }
}


?>
<link rel = "stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/menu_manage.css')?>">
<link rel = "stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/work_view.css')?>">
<div class="bg">
    <img src="<?= base_url('assets/images/frontend/mywork/scriptview_bg.png')?>" class="background_image">
</div>
<div class="hdmenu">
    <div style="position: relative; height: 100%">
        <img class = "hdmenu_img" src="<?= base_url('assets/images/frontend/coursewares/hdmenu_normal.png')?>" usemap="#hdmenu_map">
        <a id = "hdmenu_studentwork" href="<?= base_url($myworkURL).'/'.$logged_In_user_id;?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
        <a id = "hdmenu_profile" href="<?= base_url().'users/profile/'.$logged_In_user_id;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
        <a id = "hdmenu_community" href="<?= base_url().'community/index';?>" style="top: 27.2%; left: 67%; width: 31.9%; height: 48.5%;"></a>
    </div>
</div>
<div class="exit-btn">
    <?php if($this->session->userdata("loggedin") == FALSE): ?>
        <a href="<?= base_url('signin/index')?>">
            <img  class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/register.png')?>""></a>
    <?php else: ?>
        <a href="<?= base_url('signin/signout')?>">
            <img class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>""></a>
    <?php endif; ?>
</div>
<!---------$user_id is owner of content---------->
<a  href="<?php echo base_url($returnURL).'/'.$user_id;?>"
    class="return_btn"
    style="background:url(<?= base_url('assets/images/frontend/studentwork/back.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<?php if($user_id == $logged_In_user_id ){?><!---------if visitor is user that wrote content..------------->
<a  href="#" id="shareContent_Btn"
    class="share_content_btn"
    style="background:url(<?= base_url('assets/images/frontend/mywork/workshare.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<?php } ?>
<?php  if($content_type_id =='1'){?>
    <a  href="#" class="scriptPrint_Icon"
        style="background:url(<?= base_url('assets/images/frontend/mywork/scriptprint.png')?>) no-repeat;background-size: 100% 100%;">
    </a>
<?php }else{?>
    <a  href="#" class = "headImgPrint_Icon"
        style="background:url(<?= base_url('assets/images/frontend/mywork/headprint.png')?>) no-repeat;background-size: 100% 100%;">
    </a>
<?php } ?>

<div class="work_view_area" style="overflow:auto">
    <?php if($content_type_id=='1') { ?>
        <div style="text-align: center;">
            <h1 class="scriptwork_title"  style="font-weight: bold;color:#ee4331;"><?php echo $content_title; ?></h1>
        </div>
        </br></br>
        <?php foreach ($scriptText as $scripttext):
            echo '<p class="scriptwork-content">' . $scripttext . '</p></br>';
        endforeach;
    }else if($content_type_id=='3'){?>
<!--        <div style="text-align: center;">-->
<!--            <h1 style="font-weight: bold;color:#ee4331;">--><?php //echo $content_title; ?><!--</h1>-->
<!--        </div>-->
        <div style="text-align: center;" id="headImage_wrapper">
            <img id = "headImage" src="<?= base_url().$headImagePath;?>">
        </div>
    <?php }?>
</div>

<!-----share confirm modal----->
<div class="modal fade" id="share_content_modal">
    <div class="modal-dialog modal-sm" role="document" style="margin-top: 300px">
        <form action="" method="post">
            <div class="modal-content">
                <div class="modal-header" style="padding-right:20px;padding-top: 3px;padding-bottom: 10px;text-align: center">
                    <h5 class="modal-title" style="margin-top: 5px;font-weight: bold"><?php echo $this->lang->line('ShareConfirmMsg')?></h5>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-md-6" style="text-align: center">
                            <button type="button" class="btn btn-primary"
                                    content_id = "<?php echo $content_id;?>"
                                    id="share_content_confirm_btn">
                                <?php echo $this->lang->line('Yes');?>
                            </button>
                        </div>
                        <div class="col-md-6" style="text-align: center">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"><?php echo $this->lang->line('No');?></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
    var contentTitle = '<?php echo $content_title;?>';
</script>
<script src="<?= base_url('assets/js/frontend/menu_manage.js') ?>" type="text/javascript"></script>
<script src="<?= base_url('assets/js/frontend/work_view.js') ?>" type="text/javascript"></script>

<?php
    $loged_In_user_id = $this->session->userdata("loginuserID");
    $user_type = $this->session->userdata("user_type");
    $myworkURL = 'work/student';
    $returnURL = 'work/student';
    $course_menu_img_path = '';
    if($user_type=='2'){
        $myworkURL = 'work/script';
        $returnURL = 'coursewares/index';
    }
?>
<link rel = "stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/menu_manage.css')?>">
<link rel = "stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/community_manage.css')?>">
<div class="bg">
    <img src="<?= base_url('assets/images/frontend/community/comm_bg.png')?>" class="background_image">
</div>
<div class="hdmenu">
    <div style="position: relative; height: 100%">
        <img class = "hdmenu_img" src="<?= base_url('assets/images/frontend/coursewares/hdmenu_normal.png')?>" usemap="#hdmenu_map">
        <a id = "hdmenu_studentwork" href="<?= base_url($myworkURL).'/'.$loged_In_user_id;?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
        <a id = "hdmenu_profile" href="<?= base_url().'users/profile/'.$loged_In_user_id;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
        <a id = "hdmenu_community" href="<?= base_url().'community/index';?>" style="top: 27.2%; left: 67%; width: 31.9%; height: 48.5%;"></a>
    </div>
</div>
<div class="exit-btn">
    <?php if($this->session->userdata("loggedin") == FALSE): ?>
        <a href="<?= base_url('signin/index')?>"><img  class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/register.png')?>""></a>
    <?php else: ?>
        <a href="<?= base_url('signin/signout')?>"><img class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>""></a>
    <?php endif; ?>
</div>
<a  href="<?php echo base_url('coursewares/index')?>"
    class="return_btn"
    style="background:url(<?= base_url('assets/images/frontend/studentwork/back.png')?>) no-repeat;background-size: 100% 100%;">
</a>

<a  href="#"
    class="orderByCreateTime_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/latestpub.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<div class="latestlist" style="display:none">
    <div style="position: relative; height: 100%">
        <img class = "latestlist_img" src="<?=  base_url('assets/images/frontend/community/latestlist_none.png')?>" usemap="#latestlist_map">
        <a id = "latestlist_btn0" href="#" style="top:0; left:0; width:100%; height: 29%;"></a>
        <a id = "latestlist_btn1" href="#" style="top:32.14%; left:13.04%; width: 81.3%; height: 29%;"></a>
        <a id = "latestlist_btn2" href="#" style="top:64.28%; right:13.04%; width: 81.3%; height: 29%;"></a>
    </div>
</div>

<a  href="#"
    class="orderByMaxReviews_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/maxreview.png')?>) no-repeat;background-size: 100% 100%;display:none">
</a>
<div class="maxreviewslist" style="display:none">
    <div style="position: relative; height: 100%">
        <img class = "maxreviewslist_img" src="<?=  base_url('assets/images/frontend/community/maxreviewslist_none.png')?>" usemap="#maxreviewslist_map">
        <a id = "maxreviewslist_btn0" href="#" style="top:0; left:0; width:100%; height: 29%;"></a>
        <a id = "maxreviewslist_btn1" href="#" style="top:32.14%; left:13.04%; width: 81.3%; height: 29%;"></a>
        <a id = "maxreviewslist_btn2" href="#" style="top:64.28%; right:13.04%; width: 81.3%; height: 29%;"></a>
    </div>
</div>
<!----------------------------------------------------------Filter Buttons By Work Types--------------------------------------------------------------------------->
<a  href="#"
    class="filterByScript_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/scriptwork.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<a  href="#"
    class="filterByDubbing_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/dubbingwork.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<a  href="#"
    class="filterByHead_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/headwork.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<a  href="#"
    class="filterByShooting_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/shootingwork.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<!----------------------------------------------------------Content Area--------------------------------------------------------------->

<div class="community_list_wrapper" id="community_list_area">
</div>
<style>
    .comm_item_wrapper
    {
        position: absolute;
        left:0;top:0;
        width:100%;
        height:8.99%;
        background: url(<?= base_url('assets/images/frontend/community/item_bg.png')?>) no-repeat ;
        background-size: 100% 100%;
        display: table;
    }
</style>
<!----------------------------------------------------------Content Area--------------------------------------------------------------->
<!----------------------------------------------------------Pagination BUTTONS--------------------------------------------------------------------------->
<a  href="#"
    class="previous_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/prev.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<a  href="#"
    class="next_Btn"
    style="background:url(<?= base_url('assets/images/frontend/community/next.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<script>
    var cur_workstatus = '1';
    var initStatus = 'NOCLICKEDTYPE';
    var contentSets = '<?php echo json_encode($contentList);?>';

</script>
<script src="<?= base_url('assets/js/frontend/menu_manage.js') ?>" type="text/javascript"></script>
<script src="<?= base_url('assets/js/frontend/community_manage.js') ?>" type="text/javascript"></script>
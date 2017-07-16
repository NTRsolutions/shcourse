<?php $user_id = $this->session->userdata("loginuserID");?>
<link rel = "stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/student_work.css')?>">
<div class="bg">
    <img src="<?= base_url('assets/images/frontend/studentwork/empty_bg.png')?>" class="background_image">
</div>
<!-----------Course type Menu for teacher work--------------------------------->
<div class="course_type_menu">
    <div style="position: relative; height: 100%">
        <img id="course_menu_img" src="<?= base_url('assets/images/frontend/studentwork/scriptwork.png')?>" usemap="#course_type_menu_map">
        <a href="#" id = "script_ATag_Btn"  style="top: 8.51%; left: 1.219%; width: 21.18%; height: 81%;"></a>
        <a href="#" id = "dubbing_ATag_Btn"  style="top: 8.51%; left: 26.829%; width: 21.18%; height: 81%;"></a>
        <a href="#" id = "head_ATag_Btn"  style="top: 8.51%; left: 52.29%; width: 21.18%; height: 81%;"></a>
        <a href="#" id = "shooting_ATag_Btn" style="top: 8.51%; left: 77.82%; width: 21%; height: 81%;"></a>
    </div>
</div>
<!-------------Head Menu------------------------------------------------------->
<div class="hdmenu">
    <div style="position: relative; height: 100%">
        <img class = "hdmenu_img" src="<?= base_url('assets/images/frontend/coursewares/hdmenu_normal.png')?>" usemap="#hdmenu_map">
        <a id = "hdmenu_studentwork" href="<?= base_url().'work/script/'.$user_id;;?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
        <a id = "hdmenu_profile" href="<?= base_url().'users/profile/'.$user_id;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
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
<!--------------Head Menu-------------------------------------------------------->
<!-------------------Return Button---------------->
<a  href="<?php echo base_url('coursewares/index')?>"
    class="return_btn"
    style="background:url(<?= base_url('assets/images/frontend/studentwork/back.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<!-------------------Class list area--------------------------------------------->
<div class="teacher_assign_class" style="text-align:-webkit-center;overflow: auto">
    <?php foreach ($classlists as $classlist):?>
        <div class="class_name_btn_wrapper" style="background: url('<?php echo base_url()."assets/images/frontend/studentwork/".$classlist->image_name;?>') no-repeat;background-size: 100% 100% ">
           <button type="button"  data-class_name ="<?php echo $classlist->attr_name;?>" class="custom_classlist_btn"></button>
        </div>
    <?php endforeach;?>
</div>
<div id="class_member_area" style="position: absolute;">
    <div class="class_member_tbl_area">
        <div class="left-block-member">
            <div class="member_item_wrapper">
            </div>
        </div>
        <div class="right-block-member">
        </div>
    </div>
<!--    <div class="pagenation_button_area" style="margin-top:25px;">-->
<!--        <button type="button" class="btn btn-default" id = "prevPage_Btn" >--><?php //echo $this->lang->line('PrevPage');?><!--</button>-->
<!--        <button type="button" class="btn btn-default" id = "nextPage_Btn" style="margin-left: 20px;">--><?php //echo $this->lang->line('NextPage');?><!--</button>-->
<!--    </div>-->
</div>

<script>
var content_type_id = '1';
var current_className = '';
var curPageNo = 0;
var totalPageCount = 0;
var prev_btn = $('.previous_Btn');
var next_btn = $('.next_Btn');
var imageDir = base_url+'assets/images/frontend/mywork/';
prev_btn.mouseover(function(){
    $(this).css({"background":"url("+imageDir+"prev_hover.png) no-repeat",'background-size' :'100% 100%'});
});
prev_btn.mouseout(function(){
    $(this).css({"background":"url("+imageDir+"prev.png) no-repeat",'background-size' :'100% 100%'});
});
next_btn.mouseover(function(){
    $(this).css({"background":"url("+imageDir+"next_hover.png) no-repeat",'background-size' :'100% 100%'});
});
next_btn.mouseout(function(){
    $(this).css({"background":"url("+imageDir+"next.png) no-repeat",'background-size' :'100% 100%'});
});
</script>
<script src="<?= base_url('assets/js/frontend/personal_teacher.js') ?>" type="text/javascript"></script>

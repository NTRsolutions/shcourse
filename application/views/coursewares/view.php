<?php
$login_status =  $this->session->userdata("loggedin");
$loged_In_user_id = $this->session->userdata("loginuserID");
if($this->session->userdata('loggedin')) {
    $user_type = $this->session->userdata("user_type");
    $workUrl = '';
    if ($user_type == '1') {
        $workUrl = 'work/student';
    } else {
        $workUrl = 'work/script/' . $loged_In_user_id;
    }
}
?>

<style>
    body, html {
        height: 100%;
        margin: 0;
    }
    .background_image {
        position: absolute;
        top: 0;left: 0;
        width:100%;height:100%;
        background-size: contain;
        z-index: -1;
    }

    .hdmenu{ position: absolute; left: 69.32%; top: 1%; width: 18%; height: 8.8%; }
    .hdmenu img{ width: 100%; height: 100% }
    .hdmenu a{ display: block; position: absolute; cursor: pointer}

    .exit-btn{ position: absolute; left: 87.9%; top: 2.78%; width: 5.31%; height: 4.81%; }
    .exit-btn img{ width: 100%; height: 100% }

    .back-btn{ position: absolute; left: 93.84%; top: 1.37%; width: 4.31%; height: 7.8%; }
    .back-btn img{ width: 100%; height: 100% }

    .subware-script{ position: absolute; left: 2.61%; top: 0.73%; width: 8.02%; height: 9.65%; }
    .subware-script img{ width: 100%; height: 100% }
    .subware-script a{ display: block; height: 100%; cursor: pointer; }

    .subware-flash{ position: absolute; left: 13.34%; top: 0.73%; width: 8.02%; height: 9.15%; }
    .subware-flash img{ width: 100%; height: 100% }
    .subware-flash a{ display: block; height: 100%; cursor: pointer; }

    .subware-dubbing{ position: absolute; left: 24.16%; top: 0.73%; width: 8.02%; height: 9.65%; }
    .subware-dubbing img{ width: 100%; height: 100% }
    .subware-dubbing a{ display: block; height: 100%; cursor: pointer; }

    .subware-shooting{ position: absolute; left: 35.14%; top: 0.73%; width: 8.02%; height: 9.65%; }
    .subware-shooting img{ width: 100%; height: 100% }
    .subware-shooting a{ display: block; height: 100%; cursor: pointer; }

    .script-content{ position: absolute; left: 0%; top: 10.83%; width: 100%; height: 88.8%; }
    .script-content iframe{ width: 100%; height: 100% }

</style>
<input type="hidden" id="base_url" value="<?= base_url()?>">

<div class="bg">
    <img src="<?= base_url('assets/images/frontend/coursewares/view/bg.png')?>" class="background_image">
</div>


<div class="hdmenu">
    <?php if($this->session->userdata("loggedin") != FALSE): ?>
        <div style="position: relative; height: 100%">
            <img id="course_menu_img" src="<?= base_url('assets/images/frontend/coursewares/hdmenu_normal.png')?>">
            <a onmouseover="hover_work()" onmouseout="out_work()" href="<?= base_url($workUrl);?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
            <a onmouseover="hover_profile()" onmouseout="out_profile()" href="<?= base_url().'users/profile/'.$loged_In_user_id;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
            <a onmouseover="hover_comm()" onmouseout="out_comm()" href="<?= base_url().'community/index';?>" style="top: 27.2%; left: 67%; width: 31.9%; height: 48.5%;"></a>
        </div>
    <?php endif; ?>
</div>

<div class="exit-btn">
    <?php if($this->session->userdata("loggedin") == FALSE): ?>
        <a onmouseover="hover_register()" onmouseout="out_register()" href="<?= base_url('signin/index')?>">
            <img id = "register_image" src="<?= base_url('assets/images/frontend/coursewares/register.png')?>"></a>
    <?php else: ?>
        <a onmouseover="hover_exit()" onmouseout="out_exit()" href="<?= base_url('signin/signout')?>">
            <img id = "exit_image" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>">
        </a>
    <?php endif; ?>
</div>

<div class="back-btn">
    <a onmouseover="hover_back()" onmouseout="out_back()" href="<?= base_url() . 'community/index'?>">
        <img id="back_btn_image" src="<?= base_url('assets/images/frontend/community/script/back.png')?>">
    </a>
</div>

<?php $subware_isexist = array(
    'script' => 0,
    'flash' => 0,
    'dubbing' => 0,
    'shooting' => 0
);?>

<?php foreach ($subwares as $subware):?>
    <?php if( $subware->subware_type_slug == 'script' ) : ?>
        <?php $subware_isexist['script'] = 1;?>
        <div class="subware-script">
            <a id="<?= $subware->subware_type_slug ?>"
               data-courseware_id = "<?= $courseware_id ?>"
               subware_path = "<?= base_url().$subware->subware_file ?>">
                <img id="script_image" src="<?= base_url('assets/images/frontend/coursewares/view/script.png')?>">
            </a>
        </div>
    <?php elseif( $subware->subware_type_slug == 'flash' ) : ?>
        <?php $subware_isexist['flash'] = 1;?>
        <div class="subware-flash">
            <a id="<?= $subware->subware_type_slug ?>"
               data-courseware_id = "<?= $courseware_id ?>"
               subware_path = "<?= base_url().$subware->subware_file ?>">
                <img id="flash_image" src="<?= base_url('assets/images/frontend/coursewares/view/flash.png')?>">
            </a>
        </div>
    <?php elseif( $subware->subware_type_slug == 'dubbing' ) : ?>
        <?php $subware_isexist['dubbing'] = 1;?>
        <div class="subware-dubbing">
            <a id="<?= $subware->subware_type_slug ?>"
               data-courseware_id = "<?= $courseware_id ?>"
               subware_path = "<?= base_url().$subware->subware_file ?>">
                <img id="dubbing_image" src="<?= base_url('assets/images/frontend/coursewares/view/dubbing.png')?>">
            </a>
        </div>
    <?php elseif( $subware->subware_type_slug == 'shooting' ) : ?>
        <?php $subware_isexist['shooting'] = 1;?>
        <div class="subware-shooting">
            <a id="<?= $subware->subware_type_slug ?>"
               data-courseware_id = "<?= $courseware_id ?>"
               subware_path = "<?= base_url().$subware->subware_file ?>">
                <img id="shooting_image" src="<?= base_url('assets/images/frontend/coursewares/view/shooting.png')?>">
            </a>
        </div>
    <?php endif; ?>

<?php endforeach;?>

<?php if($subware_isexist['script'] == 0) : ?>
    <div class="subware-script">
        <a onclick="alert('No contents')"><img src="<?= base_url('assets/images/frontend/coursewares/view/script.png')?>"></a>
    </div>
<?php endif;?>

<?php if($subware_isexist['flash'] == 0) : ?>
    <div class="subware-flash">
        <a onclick="alert('No contents')"><img src="<?= base_url('assets/images/frontend/coursewares/view/flash.png')?>"></a>
    </div>
<?php endif; ?>

<?php if($subware_isexist['dubbing'] == 0) : ?>
    <div class="subware-dubbing">
        <a onclick="alert('No contents')"><img src="<?= base_url('assets/images/frontend/coursewares/view/dubbing.png')?>"></a>
    </div>
<?php endif; ?>

<?php if($subware_isexist['shooting'] == 0) : ?>
    <div class="subware-shooting">
        <a onclick="alert('No contents')"><img src="<?= base_url('assets/images/frontend/coursewares/view/shooting.png')?>"></a>
    </div>
<?php endif; ?>


<div class="script-content">
    <iframe src="" id="courseware_iframe"></iframe>
</div>
<script>
    var login_status = '<?php echo $login_status?>';
    var imageDir = baseURL + "assets/images/frontend";
    function hover_work() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_mywork_sel.png'); }
    function out_work() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png'); }
    function hover_profile() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_profile_sel.png'); }
    function out_profile() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png'); }
    function hover_comm() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_comm_sel.png'); }
    function out_comm() { $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png');}

    function hover_exit() { $('#exit_image').attr('src',imageDir+'/studentwork/exit_hover.png'); }
    function out_exit() { $('#exit_image').attr('src',imageDir+'/studentwork/exit.png');}

    function hover_register() { $('#register_image').attr('src',imageDir+'/studentwork/register_sel.png'); }
    function out_register() { $('#register_image').attr('src',imageDir+'/studentwork/register.png');}

    function hover_back() { $('#back_btn_image').attr('src',imageDir+'/studentwork/back_hover.png'); }
    function out_back() { $('#back_btn_image').attr('src',imageDir+'/studentwork/back.png');}

</script>
<script src="<?= base_url() ?>assets/js/courseware.js"></script>
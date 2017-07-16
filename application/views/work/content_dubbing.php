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
    <img src="<?= base_url('assets/images/frontend/community/dubbingview_bg.png')?>" class="background_image">
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
        <a href="<?= base_url('signin/index')?>"><img  class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/register.png')?>""></a>
    <?php else: ?>
        <a href="<?= base_url('signin/signout')?>"><img class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>""></a>
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

<div class="dubbing-content">
    <div style="height: 100%; overflow: auto">
        <div class="col-md-offset-1 col-md-10" style="text-align: center;">
            <img src="<?php echo base_url('uploads/courseware').'/'.$courseware_id.'/dubbing/images/script_view.png';?>">
            <!------------------------Audio Area------------------>
        </div>
    </div>
</div>

<div class="player">
    <audio id="music" preload="true">
        <source src="<?php echo base_url().$scriptWavPath;?>">
    </audio>
    <a id="pButton" class="play">
        <img src="<?= base_url('assets/images/frontend/community/dubbing/player_play.png')?>"">
    </a>
    <div id="timeline">
        <img src="<?= base_url('assets/images/frontend/community/dubbing/player_sliderbar.png')?>"">
    </div>
    <div id="playhead">
        <img src="<?= base_url('assets/images/frontend/community/dubbing/player_slidertap.png')?>"">
    </div>
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
    var music = document.getElementById('music'); // id for audio element
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // play button event listenter
    pButton.addEventListener("click", play);

    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

    // makes timeline clickable
    timeline.addEventListener("click", function(event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
    }, false);

    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;

    // mouseDown EventListener
    function mouseDown() {
        onplayhead = true;
        window.addEventListener('mousemove', moveplayhead, true);
        music.removeEventListener('timeupdate', timeUpdate, false);
    }

    // mouseUp EventListener
    // getting input from all mouse clicks
    function mouseUp(event) {
        if (onplayhead == true) {
            moveplayhead(event);
            window.removeEventListener('mousemove', moveplayhead, true);
            // change current time
            music.currentTime = duration * clickPercent(event);
            music.addEventListener('timeupdate', timeUpdate, false);
        }
        onplayhead = false;
    }
    // mousemove EventListener
    // Moves playhead as user drags
    function moveplayhead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);

        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }

    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
        var playPercent = timelineWidth * (music.currentTime / duration);
        playhead.style.marginLeft = playPercent + "px";
        if (music.currentTime == duration) {
            pButton.className = "";
            pButton.className = "play";
        }
    }

    //Play and Pause
    function play() {
        // start music
        if (music.paused) {
            music.play();
            // remove play, add pause
            pButton.className = "";
            pButton.className = "pause";
        } else { // pause music
            music.pause();
            // remove pause, add play
            pButton.className = "";
            pButton.className = "play";
        }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function() {
        duration = music.duration;
    }, false);

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
</script>
<script src="<?= base_url('assets/js/frontend/menu_manage.js') ?>" type="text/javascript"></script>
<script src="<?= base_url('assets/js/frontend/work_view.js') ?>" type="text/javascript"></script>

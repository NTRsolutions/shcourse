<?php $listCount = sizeof($cwSets);
 $loged_In_user_id = $this->session->userdata("loginuserID");
 $user_type = '3';
 if($this->session->userdata("loggedin")==TRUE)
 {
     $user_type = $this->session->userdata('user_type');
 }


?>
<style>
    body, html {
        height: 100%;
        margin: 0;
    }
    .background_image {
        position: fixed;
        top: 0;left: 0;
        width:100%;height:100%;
        background-size: contain;
        z-index: -1;
    }
    .switch{ position: absolute; left: 38.8%; top: 0.9%; width: 21.61%; height: 7.87%; }
    .switch img{ width: 100%; height: 100% }
    .switch a{ display: block; position: absolute; cursor: pointer}

    .hdmenu{ position: absolute; left: 74.47%; top: 0.6%; width: 18%; height: 8.8%; }
    .hdmenu img{ width: 100%; height: 100% }
    .hdmenu a{ display: block; position: absolute; cursor: pointer}

    .exit-btn{ position: absolute; left: 93.75%; top: 2.78%; width: 5.31%; height: 4.81%; }
    .exit-btn img{ width: 100%; height: 100% }

    .coursewarelist-wrapper{ position: absolute; left: 11.72%; top: 15%; width: 77.34%; height: 72.22%; }
    .coursewarelist-wrapper .courseware-list{ width: 30.5%; height: 48.97%; display: inline-block; float: left; margin-right: 2.6%; margin-bottom: 1.15%; position: relative}
    .coursewarelist-wrapper .courseware-list img{ position: absolute; width: 100%; height: 100%; left: 0; top: 0; }
    .coursewarelist-wrapper .courseware-list img.courseware-image-item{ width: 94.5%; height: 89.52%; left: 2.6%; top: 3.66%; }

    .coursewarelist-prevpage{ position: absolute; left: 2.4%; top: 46.48%; width: 5.15%; height: 9.7%; }
    .coursewarelist-prevpage img{ width: 100%; height: 100% }
    .coursewarelist-nextpage{ position: absolute; left: 92.34%; top: 46.48%; width: 5.15%; height: 9.7%; }
    .coursewarelist-nextpage img{ width: 100%; height: 100% }

</style>
<div class="bg">
    <img src="<?= base_url('assets/images/frontend/coursewares/bg.png')?>" class="background_image">
</div>

<div class="switch">
    <div style="position: relative; height: 100%">
        <img src="<?= base_url('assets/images/frontend/coursewares/country_cn.png')?>" id="select_country_img" data-baseurl="<?= base_url('assets/images/frontend/coursewares')?>" data-country="cn">
        <a onclick="selectOnChina()" style="top: 0%; left: 0%; width: 50%; height: 100%;"></a>
        <a onclick="selectWestern()" style="top: 0%; left: 50%; width: 50%; height: 100%;"></a>
    </div>
</div>

<div class="hdmenu">
    <?php if($this->session->userdata("loggedin") != FALSE){?>
        <div style="position: relative; height: 100%">
            <?php if($user_type=='2'){?>
            <img id="course_menu_img" src="<?= base_url('assets/images/frontend/coursewares/hdmenu_normal.png')?>">
            <?php }else{?>
            <img id="course_menu_img" src="<?= base_url('assets/images/frontend/coursewares/stu_hdmenu_normal.png')?>">
            <?php }?>
            <a onmouseover="hover_work()" onmouseout="out_work()" href="<?= $workPageUrl;?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
            <a onmouseover="hover_profile()" onmouseout="out_profile()" href="<?= base_url().'users/profile/'.$loged_In_user_id;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
            <a onmouseover="hover_comm()" onmouseout="out_comm()" href="<?= base_url().'community/index';?>" style="top: 27.2%; left: 67%; width: 31.9%; height: 48.5%;"></a>
        </div>
    <?php } ?>

</div>

<div class="exit-btn">
    <?php if($this->session->userdata("loggedin") == FALSE): ?>
        <a onmouseover="hover_register()" onmouseout="out_register()" href="<?= base_url('signin/index')?>">
            <img id = "register_image" src="<?= base_url('assets/images/frontend/coursewares/register.png')?>"">
        </a>
    <?php else: ?>
        <a onmouseover="hover_exit()" onmouseout="out_exit()" href="<?= base_url('signin/signout')?>">
            <img id = "exit_image" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>"">
        </a>
    <?php endif; ?>
</div>

<div class="coursewarelist-wrapper">
    <?php foreach($cwSets as $cw): ?>
        <?php $imageUrl = $cw->courseware_photo; ?>
        <a href = "<?=base_url()?>coursewares/view/<?= $cw->courseware_id?>" class="courseware-list" unit_type_id="<?php echo $cw->unit_type_id?>" style="display:none">
            <img src="<?=base_url().$imageUrl?>" class = "courseware-image-item">
            <img src="<?= base_url('assets/images/frontend/coursewares/frame.png')?>">
        </a>
    <?php endforeach; ?>
</div>
<div class="coursewarelist-prevpage">
        <a onclick="prevPageElems();" onmouseover="hover_prev()" onmouseout="out_prev()">
            <img id = "prev_image" src="<?= base_url('assets/images/frontend/coursewares/prev.png')?>">
        </a>
</div>
<div class="coursewarelist-nextpage">
        <a onclick="nextPageElems();" onmouseover="hover_next()" onmouseout="out_next()">
            <img id = "next_image" src="<?= base_url('assets/images/frontend/coursewares/next.png')?>"">
        </a>
</div>

<!-------------------Border manage function --------------------------->
<script>
    var imgArr = new Array();
    var curPage = 0;
    var elemsPerPage = 6;
    var totalElems = 0;
    var totalPages = 0;
    var imageDir = baseURL + "assets/images/frontend";
    var userType = '<?php echo $user_type?>';
    window.addEventListener('load', function(){
        var imageList = document.getElementsByClassName('courseware-list');
        initPage();
    });
    function selectOnChina(){
        var baseUrl =  $('#select_country_img').data('baseurl');
        $('#select_country_img').attr('src', baseUrl+'/country_cn.png');
        $('#select_country_img').data('country', 'cn');

        initPage();
    }
    function selectWestern() {
        var baseUrl =  $('#select_country_img').data('baseurl');
        $('#select_country_img').attr('src', baseUrl+'/country_eu.png');
        $('#select_country_img').data('country', 'eu');
        initPage();
    }
    function initPage(){
        var country = $('#select_country_img').data('country');
        var imageList = document.getElementsByClassName('courseware-list');
        imgArr = new Array();
        curPage = 0;

        country = ( country == 'cn' )? '1' : '2';

        for(i = 0;i<imageList.length;i++)
        {
            var imgTag = imageList[i];
            if(imgTag.getAttribute('unit_type_id')==country){
                imgArr.push( imgTag );
            }
        }

        totalElems = imgArr.length;
        totalPages = Math.ceil( imgArr.length/elemsPerPage );
        showPage( curPage );
    }
    function showPage( page ){
        $('.courseware-list').hide();
        for( var i=0; i<totalElems; i++ ){
            if( i>=page*elemsPerPage && i<(page+1)*elemsPerPage ){
                var img = imgArr[i];
                $(img).show();
            }
        }
    }
    function nextPageElems(){
        curPage++;
        if( curPage >= totalPages-1  )
            curPage = totalPages-1;
        showPage(curPage);
    }
    function prevPageElems(){
        curPage--;
        if( curPage <= 0 )
            curPage = 0;
        showPage(curPage);
    }
    function hover_work() {
        if(userType=='1'){
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_mywork_sel.png');
        }else{
            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_mywork_sel.png');
        }
    }
    function out_work() {
        if(userType=='1')
        {
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_normal.png');
        }else{
            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png');
        }

    }
    function hover_profile() {
        if(userType=='1')
        {
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_profile_sel.png');
        }else{
            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_profile_sel.png');
        }

    }
    function out_profile() {
        if(userType=='1')
        {
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_normal.png');

        }else{

            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png');
        }
    }
    function hover_comm() {
        if(userType=='1')
        {
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_comm_sel.png');
        }else{
            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_comm_sel.png');
        }

    }
    function out_comm() {
        if(userType=='1')
        {
            $('#course_menu_img').attr('src',imageDir+'/studentwork/stu_hdmenu_normal.png');
        }else{
            $('#course_menu_img').attr('src',imageDir+'/studentwork/hdmenu_normal.png');
        }

    }

    function hover_exit() { $('#exit_image').attr('src',imageDir+'/studentwork/exit_hover.png'); }
    function out_exit() { $('#exit_image').attr('src',imageDir+'/studentwork/exit.png');}

    function hover_register() { $('#register_image').attr('src',imageDir+'/studentwork/register_sel.png'); }
    function out_register() { $('#register_image').attr('src',imageDir+'/studentwork/register.png');}

    function hover_prev() { $('#prev_image').attr('src',imageDir+'/coursewares/prev_sel.png'); }
    function out_prev() { $('#prev_image').attr('src',imageDir+'/coursewares/prev.png');}

    function hover_next() { $('#next_image').attr('src',imageDir+'/coursewares/next_sel.png'); }
    function out_next() { $('#next_image').attr('src',imageDir+'/coursewares/next.png');}
</script>

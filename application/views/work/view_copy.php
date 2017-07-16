<?php
$loggedIn_UserID = $this->session->userdata("loginuserID");
$user_type = $this->session->userdata("user_type");
$ownerSt = TRUE;
$imageAbsDir =  base_url().'assets/images/frontend/';
$bac_img_path = $imageAbsDir.'mywork/empty_bg.png';
if($loggedIn_UserID != $user_id)//if current user is not owner of work.
{
    $ownerSt = FALSE;
    $bac_img_path = $imageAbsDir.'mywork/empty_bg1.png';
}
$myworkURL = 'work/student';
$returnURL = 'work/student';
$course_menu_img_path = '';
if($user_type=='2'){
    $myworkURL = 'work/script/'.$loggedIn_UserID;
    $returnURL = 'coursewares/index';
}
?>
<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/frontend/work_list_view.css')?>"  />

<div class="bg">
    <img src="<?=$bac_img_path ?>" class="background_image">
</div>
<div class="course_type_menu">
    <div style="position: relative; height: 100%">
        <img id="course_menu_img" src="<?= $menu_img_path;?>" usemap="#course_type_menu_map">
        <a href="<?=base_url('work/script').'/'.$user_id;?>"   style="top: 8.51%; left: 1.219%; width: 21.18%; height: 81%;"></a>
        <a href="<?=base_url('work/dubbing').'/'.$user_id;?>"  style="top: 8.51%; left: 26.829%; width: 21.18%; height: 81%;"></a>
        <a href="<?=base_url('work/head').'/'.$user_id;?>"   style="top: 8.51%; left: 52.29%; width: 21.18%; height: 81%;"></a>
        <a href="<?=base_url('work/shooting').'/'.$user_id;?>"  style="top: 8.51%; left: 77.82%; width: 21%; height: 81%;"></a>
    </div>
</div>
<!-------------Head Menu------------------------------------------------------->
<div class="hdmenu">
    <div style="position: relative; height: 100%">
        <img class = "hdmenu_img" src="<?= $imageAbsDir.'coursewares/hdmenu_normal.png';?>" usemap="#hdmenu_map">
        <a id = "hdmenu_studentwork" href="<?= base_url($myworkURL);?>" style="top: 27.2%; left: 1.1%; width: 31.9%; height: 48.5%;"></a>
        <a id = "hdmenu_profile" href="<?= base_url().'users/profile/'.$loggedIn_UserID;?>" style="top: 3.9%; left: 37.1%; width: 26.1%; height: 90.4%;"></a>
        <a id = "hdmenu_community" href="<?= base_url().'community/index';?>" style="top: 27.2%; left: 67%; width: 31.9%; height: 48.5%;"></a>
    </div>
</div>
<div class="exit-btn">
    <?php if($this->session->userdata("loggedin") == FALSE): ?>
        <a href="<?= base_url('signin/index')?>"><img  class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>""></a>
    <?php else: ?>
        <a href="<?= base_url('signin/signout')?>"><img class= "exit_btn_img" src="<?= base_url('assets/images/frontend/coursewares/exit.png')?>""></a>
    <?php endif; ?>
</div>
<a  href="<?php echo base_url($returnURL)?>"
    class="return_btn"
    style="background:url(<?= base_url('assets/images/frontend/studentwork/back.png')?>) no-repeat;background-size: 100% 100%;">
</a>
<div class="content_list_wrapper" >
    <div class="contetn_list_virtual_wrapper" style="position: relative">
        <table  id="contentsInfo_tbl" style="width: 100%; margin-top: 18px;">
            <?php $recordCnt = 0;
            foreach ($contents as $content):
          if($user_type=='2'){ ///if user is student
            if($recordCnt>7) echo '<tr style="display: none">';
            else echo '<tr>';
            ?>
                  <td class = "content_filed" style="width:6%;text-align: center;" >
                      <?php if($content->local=='1'){?>
                          <img class = 'mark_img' src="<?= $imageAbsDir.'mywork/localmark.png'?>"
                               onmouseover="hiddenImageMark(this)" onmouseout="showImageMark(this)">
                      <?php }?>
                  </td>
                  <td class = "content_filed" style="width:6%;" >
                      <?php if($content->public=='1'){?>
                          <img class = 'mark_img' src="<?= $imageAbsDir.'mywork/cloudmark.png'?>"
                               onmouseover="hiddenImageMarkCloud(this)" onmouseout="showImageMarkCloud(this)">
                      <?php } ?>
                  </td>
                  <td  class = "content_filed" style="width:64%;"><!----------link for work view---------------->
                      <div  class = "content_title" style="background: url(<?= $imageAbsDir.'mywork/item_bg.png'?>) no-repeat; background-size: 100% 100%;">
                          <a href="<?= base_url()?>work/view/<?= $content->content_id;?>">
                              <?php echo $content->content_title;?>
                          </a>
                      </div>
                  </td>
                  <td class = "content_filed" style="width:15%;text-align: right;">
                      <a href="#" onclick="uploadWork(this)"
                         content_id = "<?php echo $content->content_id;?>">
                          <?php if($content->public=='0'){?>
                              <img class = 'mark_img upload_image' src="<?=$imageAbsDir.'mywork/upload.png'?>"
                                   onmouseover="changeUploadOver(this)"
                                   onmouseout ="changeUploadOut(this)" >
                          <?php }?>
                      </a>
                  </td>
                  <td class = "content_filed" style="width:6%;text-align: right">
                      <a href="#" onclick="deleteContentItem(this)"
                         content_id = "<?php echo $content->content_id;?>"
                         content_local="<?php echo $content->local;?>"
                         content_cloud="<?php echo $content->public;?>">
                          <img class = 'mark_img' src="<?= $imageAbsDir.'mywork/delete.png'?>"
                                 onmouseover="changeDeleteImgOver(this)" onmouseout= "changeDeleteImgOut(this)" >
                          <a>
                  </td>
                  <td  class = "content_filed"style="width:6%;">
                      <a href="#" onclick="shareContentModal(this)" content_id = "<?php echo $content->content_id;?>">
                          <img class="mark_img" src="<?= $imageAbsDir.'mywork/share.png' ?>"
                                 onmouseover="changeShareImgOver(this)" onmouseout= "changeShareImgOut(this)"

                              >
                      </a>
                  </td>
              </tr>
              <?php }else{///this is teacher
              if($content->public=='1'){
              if($recordCnt>7) echo '<tr style="display: none">';
               else echo '<tr>';
              ?>
                  <td style="width:6%;" >
                          <?php if($content->public=='1'){?>
                              <img class = 'mark_img' src="<?= $imageAbsDir.'mywork/cloudmark.png'?>"
                                   onmouseover="hiddenImageMarkCloud(this)" onmouseout="showImageMarkCloud(this)"
                                  >
                          <?php } ?>
                      </td>
                      <td style="width:59%"><!----------link for work view---------------->
                           <div  class = "content_title" style="background: url(<?= $imageAbsDir.'mywork/item_bg.png'?>) no-repeat; background-size: 100% 100%;">
                              <a href="<?= base_url()?>work/view/<?= $content->content_id;?>" >
                                  <?php echo $content->content_title;?>
                              </a>
                          </div>
                      </td>
                      <td style="width:30%;text-align: center">
                          <a href="#" onclick="deleteContentItem(this)"
                             content_id = "<?php echo $content->content_id;?>"
                             content_local="<?php echo $content->local;?>"
                             content_cloud="<?php echo $content->public;?>">
                              <img class = 'mark_img' src="<?= $imageAbsDir.'mywork/delete.png'?>"
                                   onmouseover="changeDeleteImgOver(this)" onmouseout= "changeDeleteImgOut(this)">
                              <a>
                      </td>
                      <td style="width:7%"></td>
                  </tr>
              <?php  }
          }?>
      <?php $recordCnt ++;  endforeach;?>
        </table>
    </div>
</div>
<div id="contentspageNavPosition" ></div>
<!-----------delete modal------------------>
<div class="modal fade" id="delete_contentItem_modal">
    <div class="modal-dialog modal-sm" role="document" style="margin-top: 300px">
        <form action="" method="post" id="content_delete_form">
            <div class="modal-content">
                <div class="modal-header" style="padding-right:20px;padding-top: 3px;padding-bottom: 10px;text-align: center">
                    <h5 class="modal-title" style="margin-top: 5px;font-weight: bold"><?php echo $this->lang->line('DeleteConfirmMsg')?></h5>
                </div>
                <?php if($loggedIn_UserID==$user_id){///current logged in user is student?>
                    <div class="modal-body" style="text-align: center">
                        <label class="checkbox-inline"><input type="checkbox" value="" id="localfile_chk"><?php echo $this->lang->line('LocalFile');?></label>
                        <label class="checkbox-inline" style="margin-left: 30px;"><input type="checkbox" value="" id="cloudfile_chk"><?php echo $this->lang->line('CloudFile');?></label>
                    </div>
                <?php } ?>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-md-6" style="text-align: center">
                            <button type="submit" class="btn btn-primary" id="content_delete_btn"><?php echo $this->lang->line('Yes');?></button>
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
<!-----------Share content Modal------------>
<div class="modal fade" id="share_contentItem_modal">
    <div class="modal-dialog modal-sm" role="document" style="margin-top: 300px">
        <div class="modal-content">
            <div class="modal-header" style="padding-right:20px;padding-top: 3px;padding-bottom: 10px;text-align: center">
                <h5 class="modal-title" style="margin-top: 5px;font-weight: bold"><?php echo $this->lang->line('ShareConfirmMsg')?></h5>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-6" style="text-align: center">
                        <button type="button" class="btn btn-primary" id="content_share_btn"><?php echo $this->lang->line('Yes');?></button>
                    </div>
                    <div class="col-md-6" style="text-align: center">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><?php echo $this->lang->line('No');?></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-----------share content Modal------------>
<script>
    ///at first mouseover effects
    var content_type_id = '<?php echo $content_type_id;?>';
    var loggedUserId = '<?php echo $loggedIn_UserID;?>';
    var contentUserId = '<?php echo $user_id;?>';
    var logedInUsertype = '<?php if($loggedIn_UserID!=$user_id) echo '1' ;else echo '2' ?>' ;
    var studentId = '<?php echo $user_id;?>';

    var prevstr = "<?php echo $this->lang->line('PrevPage');?>";
    var nextstr = "<?php echo $this->lang->line('NextPage');?>";
    var currentShowedPage = 1;
    var showedItems = 7;
    function Pager(tableName, itemsPerPage) {

        this.tableName = tableName;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.pages = 0;
        this.inited = false;

        this.showRecords = function(from, to) {
            var rows = document.getElementById(tableName).rows;
            // i starts from 1 to skip table header row
            for (var i = 1; i < rows.length; i++) {
                if (i < from || i > to)
                    rows[i].style.display = 'none';
                else
                    rows[i].style.display = '';
            }
        }

        this.showPage = function(pageNumber) {
            if (! this.inited) {
                alert("not inited");
                return;
            }
            var oldPageAnchor = document.getElementById('pg'+this.currentPage);

            if ( typeof oldPageAnchor === 'undefined' || !oldPageAnchor ) {
                return;
            }
            oldPageAnchor.className = 'pg-normal';
            this.currentPage = pageNumber;
            var newPageAnchor = document.getElementById('pg'+this.currentPage);
            newPageAnchor.className = 'pg-selected';
            var from = (pageNumber - 1) * itemsPerPage + 1;
            var to = from + itemsPerPage - 1;
            this.showRecords(from, to);
        }

        this.prev = function() {
            if (this.currentPage > 1){

                currentShowedPage = this.currentPage - 1;
                this.showPage(this.currentPage - 1);
            }

        }

        this.next = function() {
            if (this.currentPage < this.pages) {

                currentShowedPage = this.currentPage + 1;
                this.showPage(this.currentPage + 1);
            }
        }

        this.init = function() {
            var rows = document.getElementById(tableName).rows;
            var records = (rows.length - 1);
            this.pages = Math.ceil(records / itemsPerPage);
            this.inited = true;
        }
        this.showPageNav = function(pagerName, positionId) {
            if (! this.inited) {
                alert("not inited");
                return;
            }
            var element = document.getElementById(positionId);

            var pagerHtml = '<button class = "btn btn-primary pagerBtn" onclick="' + pagerName + '.prev();" class="pg-normal">'+prevstr+ '</button>  ';
            for (var page = 1; page <= this.pages; page++)
                pagerHtml += '<button hidden id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</button>  ';
            pagerHtml += '<button  class = "btn  btn-primary pagerBtn" onclick="'+pagerName+'.next();" class="pg-normal">'+nextstr+'</button>';

            element.innerHTML = pagerHtml;
        }
    }
    var pager = new Pager('contentsInfo_tbl', showedItems);
    pager.init();
    pager.showPageNav('pager', 'contentspageNavPosition');
    pager.showPage(currentShowedPage);
    function executionPageNation()
    {
        pager.showPageNav('pager', 'contentspageNavPosition');
        pager.showPage(currentShowedPage);
    }
    function fitWindow()
    {
        var itemHeight = (window.innerHeight*0.05);
        var itemwidth = (window.innerWidth*0.06);
        $('.content_title').css('height',itemHeight+'px');
        $('.mark_img').css('height',itemHeight+'px');
        $('.upload_image').css('width',itemwidth+'px');
        itemHeight = (window.innerHeight*0.07);
        $('#contentsInfo_tbl  tr td ').css('height',itemHeight+'px');
    }
    fitWindow();
    jQuery('#content_delete_form').submit(function (e) {

        e.preventDefault();

        var contentDelBtn = $('#content_delete_btn');
        var contentId = contentDelBtn.attr('content_id');
        var contentLocal  = contentDelBtn.attr('content_local');
        var contentCloud = contentDelBtn.attr('content_cloud');

        var ajaxURL = '';
        var ajaxData = {student_id:studentId,content_type_id:content_type_id,content_id: contentId};

        if(logedInUsertype=='2'){///this mean current user is student
            if ($('#localfile_chk').is(':checked')) contentLocal = '0';
            if ($('#cloudfile_chk').is(':checked')) contentCloud = '0';
            if (contentLocal == '0' && contentCloud == '0') {
                ajaxURL = baseURL + "work/delete_content";
            } else {
                ajaxURL = baseURL + "work/update_content";
                ajaxData.content_local = contentLocal;
                ajaxData.content_cloud = contentCloud;
            }
        }else {
            ajaxData.content_cloud = '0';
            ajaxData.content_local = contentLocal;
            ajaxURL = baseURL+"work/update_content";
            if(contentLocal=='0')
            {
                ajaxURL = baseURL+"work/delete_content";
            }
        }
        jQuery.ajax({
            type: "post",
            url: ajaxURL,
            dataType: "json",
            data: ajaxData,
            success: function(res) {
                if(res.status=='success') {
                    var table = document.getElementById("contentsInfo_tbl");
                    var tbody = table.getElementsByTagName("tbody")[0];
                    table.innerHTML = res.data;
                    $('#delete_contentItem_modal').modal('toggle');
                    fitWindow();
                    executionPageNation();
                }
                else//failed
                {
                    alert("Cannot Delete work.");
                }
            }
        });
    });
    function hiddenImageMark(self) { self.setAttribute('src',"<?= $imageAbsDir.'mywork/localmark_hover.png'?>");}
    function showImageMark(self) {self.setAttribute('src',"<?= $imageAbsDir.'mywork/localmark.png'?>");}
    function hiddenImageMarkCloud(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/cloudmark_hover.png'?>");}
    function showImageMarkCloud(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/cloudmark.png'?>");}
    function changeUploadOver(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/upload_hover.png'?>");}
    function changeUploadOut(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/upload.png'?>");}
    function changeDeleteImgOver(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/delete_hover.png'?>");}
    function changeDeleteImgOut(self){ self.setAttribute('src',"<?= $imageAbsDir.'mywork/delete.png'?>");}
    function changeShareImgOver(self){self.setAttribute('src',"<?= $imageAbsDir.'mywork/share_hover.png'?>");}
    function changeShareImgOut(self){ self.setAttribute('src',"<?= $imageAbsDir.'mywork/share.png'?>");}

    function deleteContentItem(self)
    {
        var contentDelBtn = $('#content_delete_btn');
        var content_id = self.getAttribute('content_id');
        var content_local = self.getAttribute('content_local');
        var content_cloud = self.getAttribute('content_cloud');

        contentDelBtn.attr('content_id',content_id);
        contentDelBtn.attr('content_local',content_local);
        contentDelBtn.attr('content_cloud',content_cloud);

        $('#delete_contentItem_modal').modal({
            backdrop: 'static',keyboard: false
        });
    }
    function shareContentItem(content_id)
    {
        jQuery.ajax({
            type: "post",
            url: baseURL+"work/share_content",
            dataType: "json",
            data: {student_id:studentId,content_type_id:content_type_id,content_id: content_id},
            success: function(res) {
                if(res.status=='success') {
                    var table = document.getElementById("contentsInfo_tbl");
                    var tbody = table.getElementsByTagName("tbody")[0];
                    tbody.innerHTML = res.data;
                    fitWindow();
                    $('#share_contentItem_modal').modal('toggle');
                }
                else//failed
                {
                    alert("Cannot Upload work.");
                }
            }
        });
    }
    $('#content_share_btn').click(function(){

        var content_id = $(this).attr('content_id');
        shareContentItem(content_id);
    });
    function shareContentModal(self)
    {
        var content_id = self.getAttribute('content_id');
        $('#content_share_btn').attr('content_id',content_id);
        $('#share_contentItem_modal').modal({
            backdrop: 'static',keyboard: false
        });
    }
    function uploadWork(self) {
        var content_id = self.getAttribute('content_id');
        ///set status of cloud in content table as 1 and hide "UploadJob"
        jQuery.ajax({
            type: "post",
            url: baseURL+"work/uploadJob",
            dataType: "json",
            data: {student_id:studentId,content_type_id:content_type_id,content_id: content_id},
            success: function(res) {
                if(res.status=='success') {
                    var table = document.getElementById("contentsInfo_tbl");
                    var tbody = table.getElementsByTagName("tbody")[0];
                    tbody.innerHTML = res.data;
                    fitWindow();
                }
                else//failed
                {
                    alert("Cannot Upload work.");
                }
            }
        });
    }
</script>
<script src="<?= base_url('assets/js/frontend/work_list_view.js') ?>" type="text/javascript"></script>


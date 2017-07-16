<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 7/6/2017
 * Time: 1:55 AM
 */
?>
<h1 style="font-weight: bold">
            <?php if($loggedIn_UserID!=$user_id)
{
    echo $fullname.$this->lang->line('Work');
}else{
    echo $this->lang->line('MyWorkList');
}
            ?>
</h1>
<div class="" id="table_container" >
    <?php foreach ($contents as $content):
        if($user_type=='2'){///if user is student ?>
            <tr>
                <td style="width:5%" onmouseover="hiddenImageMark(this)" onmouseleave="showImageMark(this)">
                    <?php if($content->local=='1'){?>
                        <img src="<?= base_url()?>assets/images/frontend/local_mark.png" width="20" height="20">
                    <?php }?>
                </td>
                <td style="width:5%" onmouseover="hiddenImageMarkCloud(this)" onmouseleave="showImageMarkCloud(this)">
                    <?php if($content->public=='1'){?>
                        <img src="<?= base_url()?>assets/images/frontend/cloud_mark.png" width="25" height="20">
                    <?php } ?>
                </td>
                <td style="width:60%;margin-top: 3px;margin-bottom: 3px;"><!----------link for work view---------------->
                    <div  id = "content_title">
                        <a href="<?= base_url()?>work/view/<?= $content->content_id;?>" style=" color: #000;">
                            <?php echo $content->content_title;?>
                        </a>
                    </div>
                </td>
                <td style="width:15%">
                    <a href="#" onclick="uploadWork(this)" content_id = "<?php echo $content->content_id;?>">
                        <?php if($content->public=='0') {
                            echo $this->lang->line('UploadJob');
                        }?>
                    </a>
                </td>
                <td style="width:7%">
                    <a href="#" onclick="deleteContentItem(this)"
                       content_id = "<?php echo $content->content_id;?>"
                       content_local="<?php echo $content->local;?>"
                       content_cloud="<?php echo $content->public;?>"
                        >
                        <img src="<?= base_url()?>assets/images/frontend/delete_mark.png" width="25" height="20">
                        <a>
                </td>
                <td style="width:7%">
                    <a href="#" onclick="shareContentModal(this)" content_id = "<?php echo $content->content_id;?>">
                        <img src="<?= base_url()?>assets/images/frontend/share_mark.png" width="25" height="20">
                    </a>
                </td>
            </tr>
            <?php
        }else{///this is teacher
            if($content->public=='1'){?>
                <tr>
                    <td style="width:5%"></td>
                    <td style="width:5%" onmouseover="hiddenImageMarkCloud(this)" onmouseleave="showImageMarkCloud(this)">
                        <img src="<?= base_url()?>assets/images/frontend/cloud_mark.png" width="25" height="20">
                    </td>
                    <td style="width:60%"><!----------link for work view---------------->
                        <a href="<?= base_url()?>work/view/<?= $content->content_id;?>">
                            <?php echo $content->content_title;?>
                            <a>
                    </td>
                    <td style="width:15%"></td>
                    <td style="width:7%">
                        <a href="#" onclick="deleteContentItem(this)"
                           content_id = "<?php echo $content->content_id;?>"
                           content_local="<?php echo $content->local;?>"
                           content_cloud="<?php echo $content->public;?>"
                            >
                            <img src="<?= base_url()?>assets/images/frontend/delete_mark.png" width="25" height="20">
                            <a>
                    </td>
                    <td style="width:7%"></td>
                </tr>
            <?php }
        }?>
    <?php endforeach;?>
</div>
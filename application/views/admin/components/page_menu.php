<?php
//$usertype = $this->session->userdata("user_type");
?>
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <ul class="page-sidebar-menu  page-header-fixed" data-keep-expanded="true" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
            <li class="sidebar-toggler-wrapper hide">
                <div class="sidebar-toggler">
                    <span></span>
                </div>
            </li>
            <!----------Course Manage Side Menu------------>
            <li class="nav-item  ">
                <a href="javascript:;" class="nav-link" style="background:#6291d6">
                    <i class="icon-home"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title'); ?></span>
                </a>
            </li>
            <li class="nav-item">
                <a href="<?= base_url('admin/courses/index') ?>" class="nav-link" id="course_menu">
                    <i class="icon-docs"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_course'); ?></span>
                </a>
            </li>
            <li class="nav-item ">
                <a href="<?= base_url('admin/units/index') ?>" class="nav-link" id="unit_menu">
                    <i class="fa fa-tasks"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_unit'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/coursewares/index') ?>" class="nav-link" id="courseware_menu">
                    <i class="icon-layers"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_courseware'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/subwares/index') ?>" class="nav-link " id="subware_menu">
                    <i class="icon-link"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_subware'); ?></span>
                </a>
            </li>
           <!----------Account Manage Menu---------------->
            <li class="nav-item  ">
                <a href="javascript:;" class="nav-link " style="background:#6291d6">
                    <i class="icon-user"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_account'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/schools/index') ?>" class="nav-link " id="school_menu">
                    <i class="fa fa-university"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_school'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/users/index') ?>" class="nav-link " id="user_menu">
                    <i class="icon-users"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_user'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/admins/index') ?>" class="nav-link " id="admin_menu">
                    <i class="icon-user"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_character'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/statistics/index') ?>" class="nav-link " id="statistics_menu">
                    <i class="fa fa-line-chart"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_datastatistics'); ?></span>
                </a>
            </li>
            <!----------Community Manage------------------->
            <li class="nav-item  ">
                <a href="javascript:;" class="nav-link " style="background:#6291d6">
                    <i class="fa fa-object-group"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_community'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/contents/index') ?>" class="nav-link " id="content_menu">
                    <i class="icon-notebook"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_content'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/comments/index') ?>" class="nav-link " id="comment_menu">
                    <i class="fa fa-commenting-o"></i>
                    <span class="title"><?php echo $this->lang->line('sub_panel_title_comment'); ?></span>
                </a>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</div>
<!-- END SIDEBAR -->



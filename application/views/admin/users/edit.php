<!-- BEGIN CONTENT -->

<div class="page-content-wrapper">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content" style="min-height: 1305px;">

        <h1 class="page-title"> Edit Users
            <small></small>
        </h1>

        <?php $success = $this->session->flashdata("success");?>
        <?php if( !empty( $success ) ) : ?>
        <div class="custom-alerts alert alert-success fade in">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>
            <?= $success ?>
        </div>
        <?php endif; ?>

        <div class="row">
            <form action="<?= base_url('admin/users/edit/' . $user->user_id) ?>" class="form-horizontal" method="post" enctype="multipart/form-data">
                <div class="col-md-9">
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject font-dark sbold uppercase">Main Information</span>
                            </div>
                        </div>
                        <div class="portlet-body form">
                            <div class="form-body">
                                <div class="form-group" style="margin-bottom: 0">
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="fullname">Full Name</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" name="fullname" id="fullname" value="<?= $user->fullname ?>"/>
                                            <?php echo form_error('fullname', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="username">Username</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" name="username" id="username" value="<?= $user->username ?>"/>
                                            <?php echo form_error('username', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="email">Email</label>
                                        <div class="col-md-10">
                                            <input type="email" class="form-control" name="email" id="email" value="<?= $user->email ?>" />
                                            <?php echo form_error('email', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="user_type">User Type</label>
                                        <div class="col-md-10">
                                            <select class="bs-select form-control" name="user_type">
                                                <option value=""></option>
                                                <?php foreach( $roles as $role ) : ?>
                                                    <option value="<?= $role->role_id ?>" <?= ( $role->role_id == $user->user_type )? 'selected' : '' ?>><?= $role->name ?></option>
                                                <?php endforeach; ?>
                                            </select>
                                            <?php echo form_error('user_type', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="description"></label>
                                        <div class="col-md-10">
                                            <button type="submit" class="btn green" style="padding: 10px 20px">Edit</button>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="row">
            <form action="<?= base_url('admin/users/change_pwd/' . $user->user_id) ?>" class="form-horizontal" method="post">
                <div class="col-md-9">
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject font-dark sbold uppercase">Change Password</span>
                            </div>
                        </div>
                        <div class="portlet-body form">
                            <div class="form-body">
                                <div class="form-group" style="margin-bottom: 0">
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="fullname">Password</label>
                                        <div class="col-md-10">
                                            <input type="password" class="form-control" name="password" id="password"/>
                                            <?php echo form_error('password', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="username">Confirm Password</label>
                                        <div class="col-md-10">
                                            <input type="password" class="form-control" name="confirm_pwd" id="confirm_pwd""/>
                                            <?php echo form_error('confirm_pwd', '<span class="form-error">', '</span>'); ?>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-2" for="description"></label>
                                        <div class="col-md-10">
                                            <button type="submit" class="btn green" style="padding: 10px 20px">Change Password</button>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- END CONTENT -->
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Users extends Admin_Controller
{

	function __construct()
	{
		parent::__construct();
		$language = 'chinese';
        $this->load->model("users_m");
        $this->load->model("schools_m");
        $this->lang->load('accounts',$language);
		$this->load->library("pagination");
	}
	public function index()
	{
	    $this->data['schools'] = $this->schools_m->get_all_schools();
        $this->data['users'] = $this->users_m->get_users();
        $this->data["subview"] = "admin/accounts/users";
        $this->data["subscript"] = "admin/settings/script";
        $this->data["subcss"] = "admin/settings/css";
        $this->load->view('admin/_layout_main', $this->data);
	}
	public function  add()
    {
        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST) {
            $fullname = $_POST['add_fullname'];
            $username = $_POST['add_username'];
            $password = $_POST['add_userpassword'];
            $sex_name = $_POST['add_user_sex'];
            $school_name = $_POST['add_user_school_name'];
            $user_type_id = $_POST['add_user_type_id'];
            $user_class = $_POST['add_grade_class'];

            $dt = new DateTime();
            $currentTime = $dt->format('Y-m-d H:i:s');
            $param = array(
                'fullname' => $fullname,
                'username' => $username,
                'password' => $password,
                'sex' => $sex_name,
                'school_name' => $school_name,
                'user_type_id' => $user_type_id,
                'user_class_name' => $user_class,
                'reg_time' => $currentTime,
                'publish'=>'0'
            );
            $this->data['users'] = $this->users_m->add($param);
            $ret['data'] = $this->output_content($this->data['users']);
            $ret['status']='success';
        }
        echo json_encode($ret);
    }
	public function edit()
	{
		$ret = array(
			'data'=>'None Data',
			'status'=>'success'
		);
		if($_POST)
        {
           $password = '';
           $userId = $_POST['user_id'];
           $fullname = $_POST['edit_fullname'];
           $sex = $_POST['edit_user_sex'];
           $school_name = $_POST['edit_user_school_name'];
           $user_type_id = $_POST['edit_user_type_id'];
           $user_class =  $_POST['edit_grade_class'];
           $password_status = $_POST['password_status'];

           $dt = new DateTime();
           $currentTime = $dt->format('Y-m-d H:i:s');

           if($password_status==='1')
           {
                 $password = $_POST['edit_usernewpassword'];
           }
           $param = array(
               'user_id'=>$userId,
               'fullname'=>$fullname,
               'sex'=>$sex,
               'school_name'=>$school_name,
               'user_type_id'=>$user_type_id,
               'class'=>$user_class,
               'password_status'=>$password_status,
               'password'=>$password,
               'reg_time'=>$currentTime
           );

           $this->data['users'] = $this->users_m->edit($param);
           $ret['data'] = $this->output_content($this->data['users']);
           $ret['status'] = 'success';

        }
		echo json_encode($ret);
	}
	public function delete()///this function is to delete multiple
    {
        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST)
        {
            $userIds = $_POST['userIds'];
            foreach ($userIds as $userId):
                $this->users_m->delete($userId);
            endforeach;
            $this->data['users'] = $this->users_m->get_users();
            $ret['data'] = $this->output_content($this->data['users']);
            $ret['status'] = 'success';

        }
        echo json_encode($ret);
    }
    public function delete_single()//this function is to delete single items
    {
        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST)
        {
            $user_id = $_POST['user_id'];
            $this->users_m->delete($user_id);
            $this->data['users'] = $this->users_m->get_users();
            $ret['data'] = $this->output_content($this->data['users']);
            $ret['status'] = 'success';

        }
        echo json_encode($ret);
    }
    public function publish()
    {
        $ret = array(
            'data'=>'',
            'status'=>'success'
        );
        if($_POST)
        {
            $user_id = $_POST['user_id'];
            $publish_st = $_POST['publish_st'];
            $this->users_m->publish($user_id,$publish_st);
            //$ret['data'] = $this->output_content($this->data['swsets']);
            $ret['status'] = 'success';
        }
       echo json_encode($ret);
    }
    public function bulk_add()
    {
        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST) {
            $studentStr = $this->lang->line('Student');
            $school_name = $_POST['add_bulk_user_school_name'];
            $user_type_name = $_POST['add_bulk_user_type'];
            $this->data['classList'] = $this->schools_m->get_classLists($school_name);
            if($studentStr==$user_type_name) ///for student bulk add action
            {
                $arr = $this->bulkAddStudents($user_type_name,$this->data['classList']);
                $this->data['users'] = $this->users_m->bulkAddUsers($arr);
                $ret['data'] = $this->output_content($this->data['users']);
                $ret['status']='success';
            }else{///for teacher bulk add action

                $class_name = $_POST['add_bulk_grade_class'];
                $teacher_num = $_POST['add_bulk_quantity'];
                $arr = $this->bulkAddTeachers($user_type_name,$teacher_num,$class_name,$school_name);
                $this->data['users'] = $this->users_m->bulkAddUsers($arr);
                $ret['data'] = $this->output_content($this->data['users']);
                $ret['status']='success';
            }
        }
        echo json_encode($ret);
    }
    public function bulk_download()
    {
        if($_POST) {
            $arr = array();
            $studentStr = $this->lang->line('Student');
            $school_name = $_POST['add_bulk_user_school_name'];
            $user_type_name = $_POST['add_bulk_user_type'];
            $this->data['classList'] = $this->schools_m->get_classLists($school_name);
            if($studentStr==$user_type_name) ///for student bulk add action
            {
                $arr = $this->bulkAddStudents($user_type_name,$this->data['classList']);
                $this->data['users'] = $this->users_m->bulkAddUsers($arr);
                $ret['data'] = $this->output_content($this->data['users']);
                $ret['status']='success';
            }else{///for teacher bulk add action

                $class_name = $_POST['add_bulk_grade_class'];
                $teacher_num = $_POST['add_bulk_quantity'];
                $arr = $this->bulkAddTeachers($user_type_name,$teacher_num,$class_name,$school_name);
                $this->data['users'] = $this->users_m->bulkAddUsers($arr);
                $ret['data'] = $this->output_content($this->data['users']);
                $ret['status']='success';
            }

            $arr['school_name'] = $school_name;
            $arr['user_type_name'] = $user_type_name;
            $this->data['users'] = $arr;
            $this->data["subview"] = "admin/accounts/users_download";
            $this->data["subscript"] = "admin/settings/script";
            $this->data["subcss"] = "admin/settings/css";
            $this->load->view('admin/_layout_main', $this->data);
        }
    }
    public function userinfo_download()
    {
        if($_POST)
        {
            $searchArr = array();
            $similarData = array();
            $defaultStr = $this->lang->line('PlaceChoose');
            $searchArr['username'] = (empty($_POST['username']))? '' : $_POST['username'];
            $searchArr['fullname'] = (empty($_POST['fullname']))? '' : $_POST['fullname'];

            $searchArr['sex'] = ($_POST['sex_search'] == $defaultStr)? '': $_POST['sex'];

            if($_POST['school_search'] != $defaultStr)
            {
                $school_id = $this->schools_m->getSchoolIdFromName($_POST['school_search']);
                $searchArr['school_id'] = $school_id;
            }else{
                $searchArr['school_id'] = '';
            }
            if($_POST['user_type_search']!=$defaultStr)
            {
                $searchArr['user_type_id'] = $this->users_m->get_userTypeIdFromName($_POST['user_type_search']);
            }else{
                $searchArr['user_type_id'] = '';
            }
            if($_POST['grade_search'] != $defaultStr)
            {
                $searchArr['class'] = $_POST['grade_search'];
            }else{
                $searchArr['class'] = '';
            }

            $startTime = (empty($_POST['startTime']))? '2000-00-00 00:00:00':$_POST['startTime'];
            $endTime   = (empty($_POST['endTime']))? '3000-00-00 00:00:00':$_POST['endTime'];
            $this->data['users'] = $this->users_m->user_search($searchArr,$startTime,$endTime);

            $this->data["subview"] = "admin/accounts/users_search";
            $this->data["subscript"] = "admin/settings/script";
            $this->data["subcss"] = "admin/settings/css";
            $this->load->view('admin/_layout_main', $this->data);
        }

    }
    public function output_content($users)
    {
        $output= '';
        foreach( $users as $user):
            $pub = '';
            if($user->publish=='1')  $pub = $this->lang->line('UnPublish');
            else   $pub = $this->lang->line('Publish');

            $output .= '<tr>';
            $output .= '<td colspan="2">';
            $output .=  '<label class="mt-checkbox mt-checkbox-outline">';
            $output .=  '<input type="checkbox" onclick="selectEachItem(this);" class="user-select-chk" user_id='.$user->user_id.' checkSt = "unchecked" >';
            $output .=  '<span></span>';
            $output .=  '</label>';
            $output .= '</td>';
            $output .= '<td>'.$user->user_id.'</td>';
            $output .= '<td>'.$user->username.'</td>';
            $output .= '<td>'.$user->fullname.'</td>';
            $output .= '<td>'.$user->sex.'</td>';
            if($user->user_type_id=='1') $output .= '<td></td>';
            else $output .= '<td>'.$user->class.'</td>';
            $output .= '<td>'.$user->school_name.'</td>';
            $output .= '<td>'.$user->user_type_name.'</td>';
            $output .= '<td>'.$user->reg_time.'</td>';
            $output .= '<td>';
            $output .=  '<button class="btn btn-sm btn-success" onclick = "edit_user(this);" user_id = '.$user->user_id.'>'.$this->lang->line('Modify').'</button>';
            $output .=  '<button class="btn btn-sm btn-warning" onclick = "delete_user(this);" user_id = '.$user->user_id.'>'.$this->lang->line('Delete').'</button>';
            $output .=  '<button style="width:70px;" class="btn btn-sm btn-danger" onclick = "publish_user(this);" user_id = '.$user->user_id.'>'.$pub.'</button>';
            $output .= '</td>';
            $output .= '</tr>';
        endforeach;
        return $output;
    }
    public function getclass()
    {
        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST)
        {
            $school_name = $_POST['school_name'];
            $bulk_type =   $_POST['bulk_type'];
            $this->data['classList'] = $this->schools_m->get_classLists($school_name);
            $classStr = $this->lang->line('Class');
            $gradeStr = $this->lang->line('Grade');
            $output = '';
            if($bulk_type==1) {///add bulk users for teachers
                foreach ($this->data['classList'] as $school):
                    $jsonStr = $school->class_arr;
                    $classArr = json_decode($jsonStr);
                    foreach ($classArr as $class_info):
                        $gradeNo = $class_info->grade;
                        $realStr = $this->lang->line($gradeNo - 1);
                        for ($i = 1; $i <= $class_info->class; $i++) {
                            $realClassStr = $this->lang->line($i-1);
                            $output .= '<option>';
                            $output .= $realStr . $gradeStr . $realClassStr . $classStr;
                            $output .= '</option>';
                        }
                    endforeach;
                endforeach;
            }else{///add bulk users for student
                $marginValue = 15;
                foreach ($this->data['classList'] as $school):
                    $jsonStr = $school->class_arr;
                    $classArr = json_decode($jsonStr);
                    $ren = $this->lang->line('Ren');///(人)
                    //$marginValue = 180/(+1);
                    if(count($classArr)==1) $marginValue = 0;
                    if(count($classArr)==2) $marginValue = 80;
                    if(count($classArr)==3) $marginValue = 70;
                    if(count($classArr)==4) $marginValue = 25;
                    if(count($classArr)==5) $marginValue = 10;
                    $output .= '<div style="text-align:center">';

                    foreach ($classArr as $class_info):
                        $gradeNo = $class_info->grade;
                        $realStr = $this->lang->line($gradeNo - 1);
                        $output .= '<div style="display: inline-block;vertical-align:top;margin-left:'.$marginValue.'px;">';
                        for ($i = 1; $i <= $class_info->class; $i++) {
                            $output .= '<div style="margin-top:5px;">';
                            $output .= '<label>';
                            $output .= $realStr . $gradeStr . $i . $classStr."&nbsp";
                            $output .= '</label>';
                            $output .= '<input type="text" style="width:25px;font-weight:bold;text-align:center;" value="" name ="'.$gradeNo.','.$i.'">';
                            $output .= '<label>'.'&nbsp'.$ren.'</label>';
                            $output .= '</label>';
                            $output .= '</br>';
                            $output .= '</div>';
                        }
                        $output .= '</div>';
                    endforeach;
                    $output .= '</div>';
                endforeach;
            }
            $ret['data'] = $output;
            $ret['status']='success';
        }
        echo json_encode($ret);
    }
    public function getRandomString($length = 6)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    public function bulkAddStudents($user_type_name,$classArray)
    {
        $dt = new DateTime();
        $currentTime = $dt->format('Y-m-d H:i:s');

        $sex_name = $this->lang->line('Male');
        $user_type_id = $this->users_m->get_userTypeIdFromName($user_type_name);

        $classStr = $this->lang->line('Class');
        $gradeStr = $this->lang->line('Grade');

        $bulkUsers = array();

        foreach ($classArray as $school)://for all grade

            $jsonStr = $school->class_arr;
            $classArr = json_decode($jsonStr);
            $school_id = $school->school_id;

            foreach ($classArr as $class_info):///for all class
                $gradeNo = $class_info->grade;
                $realStr = $this->lang->line($gradeNo - 1);
                for ($i = 1; $i <= $class_info->class; $i++) {/// for each class
                    $className = $realStr . $gradeStr . $i . $classStr;
                    $inTagName = $gradeNo.','.$i;
                    $userCounts = 0 ;
                    if(isset($_POST[$inTagName])){
                        $userCounts = $_POST[$inTagName];
                    }
                    for($j = 0;$j<$userCounts; $j++)///bulk users counts
                    {
                        $username = $this->getRandomString();
                        $eachUser = array(
                            'fullname'=>'',
                            'username'=>$username,
                            'password'=>$this->users_m->hash('1'),
                            /*'sex'=>$sex_name,*/
                            'sex'=>'',
                            'school_id'=>$school_id,
                            'user_type_id'=>$user_type_id,
                            'class'=>$className,
                            'reg_time'=>$currentTime,
                            /*'Community' =>'0'*/
                            'publish'=>'1'
                        );
                        array_push($bulkUsers,$eachUser);
                        ///user insert action
                    }
                }
            endforeach;
        endforeach;

        //var_dump($bulkUsers) ;
        return $bulkUsers;

    }
    public function bulkAddTeachers($user_type_name,$teachers_num,$class_name,$school_name)
    {
        $dt = new DateTime();
        $currentTime = $dt->format('Y-m-d H:i:s');
        $user_type_id = $this->users_m->get_userTypeIdFromName($user_type_name);
        $sex_name = $this->lang->line('Male');
        $school_id = $this->schools_m->getSchoolIdFromName($school_name);
        $bulkUsers = array();
        for($j = 0;$j<$teachers_num; $j++)///bulk users counts
        {
            $username = $this->getRandomString();
            $eachUser = array(
                'fullname'=>'',
                'username'=>$username,
                'password'=>$this->users_m->hash('1'),////default password
                /*'sex'=>$sex_name,*/
                'sex'=>'',
                'school_id'=>$school_id,
                'user_type_id'=>$user_type_id,
                'class'=>$class_name,
                'reg_time'=>$currentTime,
                /*'Community' =>'0'*/
                'publish'=>'1'
            );
            array_push($bulkUsers,$eachUser);
            ///user insert action
        }
        return $bulkUsers;
    }
    public function search()
    {
        $ret = array(
          'data'=>'No data to show',
          'status'=>'fail'
        );
        if($_POST)
        {
            $searchArr = array();
            $similarData = array();
            $defaultStr = $this->lang->line('PlaceChoose');
            $searchArr['username'] = (empty($_POST['username']))? '' : $_POST['username'];
            $searchArr['fullname'] = (empty($_POST['fullname']))? '' : $_POST['fullname'];

            $searchArr['sex'] = ($_POST['sex'] == $defaultStr)? '': $_POST['sex'];

            if($_POST['schoolname'] != $defaultStr)
            {
                $school_id = $this->schools_m->getSchoolIdFromName($_POST['schoolname']);
                $searchArr['school_id'] = $school_id;
            }else{
                $searchArr['school_id'] = '';
            }
            if($_POST['usertype']!=$defaultStr)
            {
                $searchArr['user_type_id'] = $this->users_m->get_userTypeIdFromName($_POST['usertype']);
            }else{
                $searchArr['user_type_id'] = '';
            }
            if($_POST['grade'] != $defaultStr)
            {
                $searchArr['class'] = $_POST['grade'];
            }else{
                $searchArr['class'] = '';
            }

            $startTime = (empty($_POST['startTime']))? '2000-00-00 00:00:00':$_POST['startTime'];
            $endTime   = (empty($_POST['endTime']))? '3000-00-00 00:00:00':$_POST['endTime'];
            $this->data['users'] = $this->users_m->user_search($searchArr,$startTime,$endTime);
            $ret['data'] = $this->output_content($this->arrayToObject($this->data['users']));
            $ret['status']='success';
        }
        echo json_encode($ret);
    }
    public  function array_to_obj($array, &$obj)
    {
        foreach ($array as $key => $value)
        {
            if (is_array($value))
            {
                $obj->$key = new stdClass();
                $this->array_to_obj($value, $obj->$key);
            }
            else
            {
                $obj->$key = $value;
            }
        }
        return $obj;
    }
    public function arrayToObject($array)
    {
        $object= new stdClass();
        return $this->array_to_obj($array,$object);
    }
    public function checkIdOfUsers($users,$searchIds)
    {

    }
}

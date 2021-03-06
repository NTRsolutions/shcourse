<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users_m extends MY_Model {

    protected $_table_name = 'users';
    protected $_primary_key = 'user_id';
    protected $_primary_filter = 'intval';
    protected $_order_by = "user_id asc";

    function __construct() {
        parent::__construct();
    }
    public function get_users()
    {
        $users_data = array();
        $SQL = "SELECT  user_id,users.user_type_id,fullname,username,school_name,
                        user_type_name,class,users.publish,sex,reg_time
                FROM users
                INNER JOIN user_types ON users.user_type_id = user_types.user_type_id
                INNER JOIN schools ON users.school_id = schools.school_id ORDER By user_id ASC 
                ;";
        $query = $this->db->query($SQL);
        $users_data = $query->result();
        return $users_data;
    }
    public function get_single_user($user_id)
    {
        $user_data = array();
        $SQL = 'SELECT  user_id,users.user_type_id,fullname,username,nickname,school_name,schools.stop
                        user_type_name,class,users.publish,sex,reg_time,class_arr,serial_no
                FROM users
                INNER JOIN user_types ON users.user_type_id = user_types.user_type_id
                INNER JOIN schools ON users.school_id = schools.school_id WHERE user_id = '.$user_id.' 
                ;';
        $query = $this->db->query($SQL);
        $user_data = $query->row();
        return $user_data;
    }
    public function edit($param)
    {
       $school_id = $this->getSchoolIdFromName($param['school_name']);
       $arr = array(
           'fullname'=>$param['fullname'],
           'sex'=>$param['sex'],
           'school_id'=>$school_id,
           'user_type_id'=>$param['user_type_id'],
           'reg_time'=>$param['reg_time'],
           'class'=>$param['class']
           /*'Community' =>'0',*/
       );
       if($param['password_status']=='1')
       {
          $arr['password'] = $this->hash($param['password']);
       }
       $this->db->where('user_id', $param['user_id']);
       $this->db->update('users', $arr);
       return $this->get_users();
    }
    function update_user($data, $id = NULL)///for update session of login time
    {
        $this->db->where('user_id', $id);
        $this->db->update('users', $data);
    }
    function update_user_login_num($id)///for update session of login time
    {
        $this->db->set('login_num', 'login_num+1', FALSE);
        $this->db->where('user_id', $id);
        $this->db->update('users');
    }
    public function add($param)
    {
        $school_id = $this->getSchoolIdFromName($param['school_name']);
        //$user_type_id = $this->get_userTypeIdFromName($param['user_type_name']);
        $user_type_id = $param['user_type_id'];

        $arr = array(
            'fullname'=>$param['fullname'],
            'username'=>$param['username'],
            'password'=>$this->hash($param['password']),
            'sex'=>$param['sex'],
            'school_id'=>$school_id,
            'user_type_id'=>$user_type_id,
            'reg_time'=>$param['reg_time'],
            'class'=>$param['user_class_name'],
            'publish' =>'0'
        );

        if($user_type_id == '1')///this is teacher and don't add class field when register user account
        $arr['class'] = '';

        $this->db->insert('users', $arr);
        return $this->get_users();

    }
    public function delete($delete_user_id)
    {
        $this -> db -> where('user_id', $delete_user_id);
        $this -> db -> delete('users');
    }
    public function publish($user_id,$publish_st)//$pub_st==1 then publish state, $pub_sd == 0 then unpublish
    {
        $this->db->set('publish', $publish_st);
        $this->db->where('user_id', $user_id);
        $this->db->update('users');
    }
    public function user_search($arr,$startTime,$endTime)
    {
        if(!empty($arr)){

            $this->db->select()->from('users')->like($arr);
            $query = $this->db->get();
            $middleData = $query->result();
            return $this->searchByTime($arr,$middleData,$startTime,$endTime);
        }
        return NULL;
    }
    public function getSchoolIdFromName($school_name)
    {
        $this->db->select('school_id')->from('schools')->where('school_name',$school_name);
        $query = $this->db->get();
        $ret = $query->row();
        return $ret->school_id;
    }
    public function getSchoolNameFromID($school_id)
    {
        $this->db->select('school_name')->from('schools')->where('school_id',$school_id);
        $query = $this->db->get();
        $ret = $query->row();
        return $ret->school_name;
    }
    public function get_userTypeIdFromName($user_type_name)
    {
        $this->db->select('user_type_id')->from('user_types')->where('user_type_name',$user_type_name);
        $query = $this->db->get();
        $ret = $query->row();
        return $ret->user_type_id;
    }
    public function get_userTypeNameFromID($user_type_id)
    {
        $this->db->select('user_type_name')->from('user_types')->where('user_type_id',$user_type_id);
        $query = $this->db->get();
        $ret = $query->row();
        return $ret->user_type_name;
    }
    public function getSchoolIdFromUserId($userId)
    {
        $arr = array('user_id'=>$userId);
        $query=parent::get_single($arr);
        return  $query->school_id;
    }
    public function getFullNameFromUserId($userId)
    {
        $arr = array('user_id'=>$userId);
        $query=parent::get_single($arr);
        return  $query->fullname;
    }
    public function bulkAddUsers($arr)
    {
        if(!empty($arr)){
            $this->db->insert_batch('users', $arr);
        }
        return $this->get_users();
    }
    public function searchByTime($queryData,$middleData,$startTime,$endTime)
    {
        $ret = array();
        foreach ($middleData as $user):

            $reg_time = new DateTime($user->reg_time);
            $before_time = new DateTime($startTime);
            $after_time = new DateTime($endTime);
            if($before_time<$reg_time&&$reg_time<$after_time)
            {
                $tempArr['user_id'] = $user->user_id;
                $tempArr['username'] = ($queryData['username'] != '')? $queryData['username']:$user->username;
                $tempArr['fullname'] = ($queryData['fullname'] != '')? $queryData['fullname']:$user->fullname;
                $tempArr['sex'] = ($queryData['sex'] !='')? $queryData['sex']: $user->sex;
                $tempArr['reg_time'] = $user->reg_time;
                $tempArr['school_name'] = $this->getSchoolNameFromID($user->school_id);
                $tempArr['user_type_id'] = $user->user_type_id;
                $tempArr['user_type_name'] = $this->get_userTypeNameFromID($user->user_type_id);
                $tempArr['class'] = $user->class;
                $tempArr['publish'] = $user->publish;

                array_push($ret,$tempArr);
            }
        endforeach;
        return $ret;
    }
    public function hash($string) {
        return parent::hash($string);
    }
    public function get_where($array = NULL)
    {
        return parent::get_where($array); // TODO: Change the autogenerated stub
    }
   public function hasContents($content_user_id,$contentTypeId)
   {
       $arr = array(
         'content_user_id'=>$content_user_id,
         'content_type_id'=>$contentTypeId
       );
       $this->db->select()->from('contents')->where($arr);
       $query = $this->db->get();
       $ret = $query->row();
       if(empty($ret))return false;
       return true;

   }

}

<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Coursewares extends CI_Controller {

	function __construct() {
		parent::__construct();

		$language = 'chinese';
		$this->lang->load('frontend', $language);
		$this->load->model('coursewares_m');
        $this->load->model('subwares_m');
        $this->load->model('statistics_m');
        $this->load->model('units_m');
		$this->load->model('signin_m');
		$this->load->library("pagination");
		$this->load->library("session");
	}
	public function index(){

        $user_type = $this->session->userdata("user_type");
        $user_id = $this->session->userdata("loginuserID");
        if($this->signin_m->loggedin())
        {
            $this->data['user_type'] = $user_type;
            $this->data['user_id'] = $user_id;
            $workPageUrl = '';
            $myworkStr = '';

            if($user_type=='1'){///this user is teacher
                $workPageUrl = base_url().'work/student';
                $myworkStr = $this->lang->line('StudentWork');;
            }else{//this user is student
                $workPageUrl = base_url().'work/script/'.$user_id;
                $myworkStr = $this->lang->line('MyWork');
            }
            $this->data['workPageUrl'] = $workPageUrl;
            $this->data['myworkStr'] = $myworkStr;

        }
        $this->data['cwSets'] = $this->coursewares_m->get_cw();
        $this->data['unitSets']= $this->units_m->get_units();
        $this->data["subview"] = "coursewares/courseware";
        $this->load->view('_layout_main', $this->data);
    }
    public function view($id)
    {
        //whenever this function is called..
        ///we have to add access time and update curseware_access table of database.
        $arr = array(
          'cw_id'=>$id,
          'cw_access_time'=>date('Y-m-d H:i:s'),
        );
        $this->db->insert('courseware_accesses',$arr);

        $this->data['courseware_id'] = $id;
        $this->data['subwares'] = $this->subwares_m->get_swForFrontend($id);
        $this->data["subview"] = "coursewares/view";
        $this->load->view('_layout_main', $this->data);

    }
    function update_SW_Access(){

        $ret = array(
            'data'=>'',
            'status'=>'fail'
        );
        if($_POST){
            $swTypeId = $_POST['subware_type_id'];
            $arr = array(
                'sw_type_id'=>$swTypeId,
                'sw_access_time'=>date('Y-m-d H:i:s')
            );
            $this->db->insert('subware_accesses',$arr);
           $ret['status'] = 'success';
           $ret['data']='success';
        }
        echo json_encode($ret);

    }
}
?>
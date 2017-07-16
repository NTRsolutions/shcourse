<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Signin extends CI_Controller {

    function __construct() {
        parent::__construct();

        $language = 'chinese';
        $this->lang->load('frontend', $language);
        $this->load->library("pagination");
        $this->load->model("users_m");
        $this->load->model("signin_m");
        $this->load->library("session");
        $this->load->library('form_validation');
    }

    public function index() {

        $this->signin_m->loggedin() == FALSE || redirect(base_url('coursewares/index'));
        $this->data['form_validation'] = 'No';
        if($_POST)
        {
            $rules = $this->rules();
            $this->form_validation->set_rules($rules);
            if ($this->form_validation->run() == FALSE) {
                $this->data['form_validation'] = validation_errors();
                $this->data["subview"] = "signin/login";
                $this->load->view('_layout_main', $this->data);
            } else {
                if($this->signin_m->signin() == TRUE) {
                    $user_id = $this->session->userdata("loginuserID");
                    $arr = array();
                    $arr['last_login'] = date('Y-m-d H:i:s');
                    $arr['ip_addr'] = $this->get_client_ip();

                    $this->users_m->update_user( $arr, $user_id );
                    $this->users_m->update_user_login_num($user_id);

                    redirect(base_url('coursewares/index'));
                } else {
                    $this->session->set_flashdata("errors", "That user does not signin");
                    $this->data['form_validation'] = "Incorrect Signin";
                    $this->data["subview"] = "signin/login";
                    $this->load->view('_layout_main', $this->data);
                }
            }

        }else{

            $this->data["subview"] = "signin/login";
            $this->load->view('_layout_main', $this->data);
        }
    }
    public function signout() {
        $this->signin_m->signout();
        redirect(base_url("signin/index"));
    }
    protected function rules() {
        $rules = array(
            array(
                'field' => 'username',
                'label' => "Username",
                'rules' => 'trim|required|max_length[30]'
            ),
            array(
                'field' => 'password',
                'label' => "Password",
                'rules' => 'trim|required|max_length[30]'
            )
        );
        return $rules;
    }
    public function get_client_ip()
    {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
?>
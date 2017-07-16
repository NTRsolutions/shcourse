<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Home extends CI_Controller {

	function __construct() {
		parent::__construct();

		$language = 'chinese';
		$this->lang->load('frontend', $language);
		$this->load->library("pagination");
		$this->load->library("session");
	}

	public function index(){

        $this->data["subview"] = "home/index";
        $this->load->view('_layout_main', $this->data);

	}
}
?>
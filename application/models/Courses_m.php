<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Courses_m extends MY_Model {


    function __construct() {
        parent::__construct();
    }
    public function get_courses()
    {
        $this->db->select('*');
        $this->db->from('courses');
        $this->db->join('school_types', 'courses.school_type_id = school_types.school_type_id','inner');
        $query = $this->db->get();
        return $query->result();
    }
    public function edit($cs_id,$cs_desc,$cs_school_type_name)
    {
        $this->db->set('course_desc', $cs_desc);
        $this->db->where('course_id', $cs_id);
        $this->db->update('courses');
        return $this->get_courses();
    }

}

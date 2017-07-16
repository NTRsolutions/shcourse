<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Contents extends CI_Controller {

    function __construct() {
        parent::__construct();

        $this->load->model("contents_m");
        $language = 'english';
        $this->load->model("signin_m");
        $this->load->library("pagination");
        $this->load->library("session");
    }
    public function upload(){

        $user_id = 1;
        if(!($this->signin_m->loggedin()))
        {
            return;
        }else{
            $user_id = $this->session->userdata("loginuserID");
        }
        if(!($_POST)){
            $error = 'File Type or file name is mistake.';
            $output = array(
                'status' => 'fail',
                'error' => $error
            );
            echo json_encode($output);
            return;
        }
        $type = $_POST['type'];
        $new_filename = $_POST['new_filename'];
        $coursewareId = $_POST['coursewareId'];
        if( $type == 'script' ){

            $uploadDirectory = FCPATH . 'uploads/work/script';
            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }
            $path = FCPATH . 'uploads/work/script/' . $new_filename . '.txt';
            $path1 = 'uploads/work/script/' . $new_filename . '.txt';
            $file = fopen($path,"w");
            fwrite($file, $_POST['content']);
            fclose($file);
            $data = array(
                'content_title' => $_POST['title'],
                'content_type_id' => '1',
                'content_user_id' => $user_id,
                'courseware_id'=>$coursewareId,
                'local' => '1',
                'public' => '0',
                'file_name' => $path1,
            );
            $this->contents_m->insert_contents($data);
            ///return success message
            $output = array(
                'status' => 'success',
                'error' => ''
            );
            echo json_encode($output);
            return;
        } else if( $type == 'head' ){
            $uploadDirectory = FCPATH . 'uploads/work/head';
            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            $img = $_POST['imgBase64'];
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $fileData = base64_decode($img);

            $path = FCPATH . 'uploads/work/head/' . $new_filename . '.png';
            $path1 = 'uploads/work/head/' . $new_filename . '.png';
            file_put_contents($path, $fileData);

            $data = array(
                'content_title' => $_POST['title'],
                'content_type_id' => '3',
                'content_user_id' => $user_id,
                'courseware_id'=>$coursewareId,
                'local' => '1',
                'public' => '0',
                'file_name' => $path1,
            );

            $this->contents_m->insert_contents( $data );

        } else if( $type == 'shooting' ){
            if($_FILES["file"]['name'] !="") {
                $file_name = $_FILES["file"]['name'];
                $file_name_rename = $new_filename;
                $explode = explode('.', $file_name);
                if(count($explode) >= 2) {
                    $uploadDirectory = FCPATH . 'uploads/work/shooting';
                    if (!is_dir($uploadDirectory)) {
                        mkdir($uploadDirectory, 0777, true);
                    }
                    $new_file = $file_name_rename.'.'.$explode[1];
                    $config['upload_path'] = "./uploads/work/shooting";
                    $config['allowed_types'] = "mp4";
                    $config['file_name'] = $new_file;
                    $this->load->library('upload', $config);
                    if(!$this->upload->do_upload("file")) {
                        $error = $this->upload->display_errors();
                        echo $error;
                    } else {
                        $path = FCPATH . 'uploads/work/shooting/' . $new_file;
                        $path1 = 'uploads/work/shooting/' . $new_file;
                        $data = array(
                            'content_title' => $file_name_rename,
                            'content_type_id' => '4',
                            'content_user_id' => $user_id,
                            'courseware_id'=>$coursewareId,
                            'local' => '1',
                            'public' => '0',
                            'file_name' => $path1,
                        );

                        $this->contents_m->insert_contents( $data );
                    }
                } else {
                    echo 'File type error.';
                }
            } else {
                echo 'File name error.';
            }
        } else if( $type == 'record' ){
            $OSList = array
            (
                'Windows 3.11' => 'Win16',
                'Windows 95' => '(Windows 95)|(Win95)|(Windows_95)',
                'Windows 98' => '(Windows 98)|(Win98)',
                'Windows 2000' => '(Windows NT 5.0)|(Windows 2000)',
                'Windows XP' => '(Windows NT 5.1)|(Windows XP)',
                'Windows Server 2003' => '(Windows NT 5.2)',
                'Windows Vista' => '(Windows NT 6.0)',
                'Windows 7' => '(Windows NT 7.0)',
                'Windows NT 4.0' => '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
                'Windows ME' => 'Windows ME',
                'Open BSD' => 'OpenBSD',
                'Sun OS' => 'SunOS',
                'Linux' => '(Linux)|(X11)',
                'Mac OS' => '(Mac_PowerPC)|(Macintosh)',
                'QNX' => 'QNX',
                'BeOS' => 'BeOS',
                'OS/2' => 'OS/2',
                'Search Bot'=>'(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves/Teoma)|(ia_archiver)'
            );
            // Loop through the array of user agents and matching operating systems
            foreach($OSList as $CurrOS=>$Match)
            {
                // Find a match
                if (preg_match("/".$Match."/i", $_SERVER['HTTP_USER_AGENT']))
                {
                    // We found the correct match
                    break;
                }
            }
            // if it is audio-blob
            if (isset($_FILES["audio-blob"])) {
                $uploadDirectory = FCPATH . 'uploads/work/shooting';
                if (!is_dir($uploadDirectory)) {
                    mkdir($uploadDirectory, 0777, true);
                }

                $file_name_rename = $_POST['new_filename'];

                $uploadDirectory = 'uploads/work/shooting/'.$file_name_rename.'.wav';
                if (!move_uploaded_file($_FILES["audio-blob"]["tmp_name"], $uploadDirectory)) {
                    $error = "Problem writing audio file to disk!";

                    $output = array(
                        'status' => 'fail',
                        'error' => $error
                    );

                    echo json_encode($output);
                }
                else {
                    // if it is video-blob
                    if (isset($_FILES["video-blob"])) {
                        $uploadDirectory = 'uploads/work/shooting/'.$file_name_rename.'.webm';
                        if (!move_uploaded_file($_FILES["video-blob"]["tmp_name"], $uploadDirectory)) {
                            $error = "Problem writing video file to disk!";

                            $output = array(
                                'status' => 'fail',
                                'error' => $error
                            );

                            echo json_encode($output);
                        }
                        else {
                            $audioFile = 'uploads/work/shooting/'.$file_name_rename.'.wav';
                            $videoFile = 'uploads/work/shooting/'.$file_name_rename.'.webm';

                            $mergedFile = 'uploads/work/shooting/'.$file_name_rename.'.mp4';

                            // ffmpeg depends on yasm
                            // libvpx depends on libvorbis
                            // libvorbis depends on libogg
                            // make sure that you're using newest ffmpeg version!

                            if(!strrpos($CurrOS, "Windows")) {
                                $cmd = '-i '.$audioFile.' -i '.$videoFile.' -map 0:0 -map 1:0 '.$mergedFile;
                            }
                            else {
                                $cmd = ' -i '.$audioFile.' -i '.$videoFile.' -c:v mpeg4 -c:a vorbis -b:v 64k -b:a 12k -strict experimental '.$mergedFile;
                            }

                            exec('ffmpeg '.$cmd.' 2>&1', $out, $ret);
                            if ($ret){
                                $error = "There was a problem!\n" . $cmd . '\n' . var_export($out, true);

                                $output = array(
                                    'status' => 'fail',
                                    'error' => $error
                                );

                                echo json_encode($output);
                            } else {
                                $path = FCPATH . $mergedFile;
                                $path1 = $mergedFile;
                                $data = array(
                                    'content_title' => $file_name_rename,
                                    'content_type_id' => '4',
                                    'content_user_id' => $user_id,
                                    'courseware_id'=>$coursewareId,
                                    'local' => '1',
                                    'public' => '0',
                                    'file_name' => $path1,
                                );

                                $this->contents_m->insert_contents( $data );

                                $output = array(
                                    'status' => 'success',
                                    'filename' => $mergedFile
                                );

                                echo json_encode($output);

                                unlink($audioFile);
                                unlink($videoFile);
                            }
                        }
                    } else {
                        $error = "no video blob";

                        $output = array(
                            'status' => 'fail',
                            'error' => $error
                        );
                    }
                }
            }
        } else if( $type == 'dubbing' ){
            $OSList = array
            (
                'Windows 3.11' => 'Win16',
                'Windows 95' => '(Windows 95)|(Win95)|(Windows_95)',
                'Windows 98' => '(Windows 98)|(Win98)',
                'Windows 2000' => '(Windows NT 5.0)|(Windows 2000)',
                'Windows XP' => '(Windows NT 5.1)|(Windows XP)',
                'Windows Server 2003' => '(Windows NT 5.2)',
                'Windows Vista' => '(Windows NT 6.0)',
                'Windows 7' => '(Windows NT 7.0)',
                'Windows NT 4.0' => '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
                'Windows ME' => 'Windows ME',
                'Open BSD' => 'OpenBSD',
                'Sun OS' => 'SunOS',
                'Linux' => '(Linux)|(X11)',
                'Mac OS' => '(Mac_PowerPC)|(Macintosh)',
                'QNX' => 'QNX',
                'BeOS' => 'BeOS',
                'OS/2' => 'OS/2',
                'Search Bot'=>'(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves/Teoma)|(ia_archiver)'
            );
            // Loop through the array of user agents and matching operating systems
            foreach($OSList as $CurrOS=>$Match)
            {
                // Find a match
                if (preg_match("/".$Match."/i", $_SERVER['HTTP_USER_AGENT']))
                {
                    // We found the correct match
                    break;
                }
            }
            // if it is read-blob
            if (isset($_FILES["read-blob"])) {
                $uploadDirectory = FCPATH . 'uploads/work/dubbing';
                if (!is_dir($uploadDirectory)) {
                    mkdir($uploadDirectory, 0777, true);
                }

                $file_name_rename = $_POST['new_filename'];

                $uploadDirectory = 'uploads/work/dubbing/'.$file_name_rename.'_read.wav';
                if (!move_uploaded_file($_FILES["read-blob"]["tmp_name"], $uploadDirectory)) {
                    $error = "Problem writing read audio file to disk!";

                    $output = array(
                        'status' => 'fail',
                        'error' => $error
                    );

                    echo json_encode($output);
                }
                else {
                    // if it is song-blob
                    if (isset($_FILES["song-blob"])) {
                        $file_name_rename = $_POST['new_filename'];

                        $uploadDirectory = 'uploads/work/dubbing/'.$file_name_rename.'_song.wav';
                        if (!move_uploaded_file($_FILES["song-blob"]["tmp_name"], $uploadDirectory)) {
                            $error = "Problem writing song audio file to disk!";

                            $output = array(
                                'status' => 'fail',
                                'error' => $error
                            );

                            echo json_encode($output);
                        }
                        else {
                            // if it is script-blob
                            if (isset($_FILES["script-blob"])) {
                                $file_name_rename = $_POST['new_filename'];

                                $uploadDirectory = 'uploads/work/dubbing/'.$file_name_rename.'_script.wav';
                                if (!move_uploaded_file($_FILES["script-blob"]["tmp_name"], $uploadDirectory)) {
                                    $error = "Problem writing script audio file to disk!";

                                    $output = array(
                                        'status' => 'fail',
                                        'error' => $error
                                    );

                                    echo json_encode($output);
                                }
                                else {
                                    if (isset($_POST["head-base64"])) {
                                        $file_name_rename = $_POST['new_filename'];

                                        $uploadDirectory = 'uploads/work/dubbing/'.$file_name_rename.'_head';
                                        $this->save_base64_image($_POST['head-base64'], $uploadDirectory );
                                        $path = FCPATH . 'uploads/work/dubbing/'.$file_name_rename;
                                        $path1 = 'uploads/work/dubbing/'.$file_name_rename;
                                        $data = array(
                                            'content_title' => $file_name_rename,
                                            'content_type_id' => '2',
                                            'courseware_id'=>$coursewareId,
                                            'content_user_id' => $user_id,
                                            'local' => '1',
                                            'public' => '0',
                                            'file_name' => $path1,
                                        );

                                        $this->contents_m->insert_contents( $data );

                                        $output = array(
                                            'status' => 'success',
                                            'filename' => $path1
                                        );

                                        echo json_encode($output);
                                    } else{
                                        $error = "There are no script audio file";

                                        $output = array(
                                            'status' => 'fail',
                                            'error' => $error
                                        );

                                        echo json_encode($output);
                                    }
                                }
                            } else {
                                $error = "There are no script audio file";

                                $output = array(
                                    'status' => 'fail',
                                    'error' => $error
                                );

                                echo json_encode($output);
                            }
                        }
                    } else {
                        $error = "There are no song audio file";

                        $output = array(
                            'status' => 'fail',
                            'error' => $error
                        );

                        echo json_encode($output);
                    }
                }
            } else {
                $error = "There are no read audio file";

                $output = array(
                    'status' => 'fail',
                    'error' => $error
                );

                echo json_encode($output);
            }
        }

    }

    public function view( $id ){

        $this->data['content_id'] = $id;
        $this->data['subwares'] = $this->subwares_m->get_where( array('content_id'=>$id) );

        $this->data["subview"] = "contents/view";
        $this->load->view('_layout_main', $this->data);
    }

    private function save_base64_image($base64_image_string, $output_file_without_extension, $path_with_end_slash="" ) {
        //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }
        //
        //data is like:    data:image/png;base64,asdfasdfasdf
        $splited = explode(',', substr( $base64_image_string , 5 ) , 2);
        $mime=$splited[0];
        $data=$splited[1];

        $mime_split_without_base64=explode(';', $mime,2);
        $mime_split=explode('/', $mime_split_without_base64[0],2);
        if(count($mime_split)==2)
        {
            $extension=$mime_split[1];
            if($extension=='jpeg')$extension='jpg';
            //if($extension=='javascript')$extension='js';
            //if($extension=='text')$extension='txt';
            $output_file_with_extension=$output_file_without_extension.'.'.$extension;
        }
        file_put_contents( $path_with_end_slash . $output_file_with_extension, base64_decode($data) );
        return $output_file_with_extension;
    }
}


?>
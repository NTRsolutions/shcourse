function PostBlob(audioBlob, videoBlob, fileName) {
    var formData = new FormData();
    var new_filename = $('#rcfilename').val();
    console.log(audioBlob);
    console.log(videoBlob);

    formData.append('file', fileName);
    formData.append('audio-blob', audioBlob);
    formData.append('video-blob', videoBlob);
    formData.append("type", "record");
    formData.append("new_filename", new_filename);
    $('#ajax_loader').show();
    ajax_url = base_url + 'contents/upload';
    xhr(ajax_url, formData, function(ffmpeg_output){
        //document.querySelector('h1').innerHTML = ffmpeg_output.replace(/\\n/g, '<br />');
        console.log(ffmpeg_output);
        var result = JSON.parse( ffmpeg_output );
        if( result.status == 'success' ){
            $('#ajax_loader').hide();
            preview.src = base_url + result.filename;
            preview.play();
            preview.muted = false;
        } else {
            console.log(result.error);
        }
    });
}

$('#record-btn').click(function(){
    if( $(this).hasClass('record') ){
        recordStop();
    } else {
        recordStart();
    }
});

function recordStart(){
    recorded = false;
    $('#record-btn').addClass('record');
    record();
    $('#play').hide();
    $('#save').hide();
}

function recordStop(){
    $('#record-btn').removeClass('record');
    stop();
    clearInterval(recCounter);
    initTimeCounter();
    $('#play').show();
    $('#save').show();
}
function setPreviewBackground()//This function is for video preview
{
    //$('#shooting_bg').attr('src',"images/shooting_play_bg.png");
}
var recorded = false;
$('#play').click(function(){
    if(recorded == true){
        $('#play').hide();
        $('#save').hide();
        $('#record-btn').hide();
        $('video').attr('controls', 'true');
        //setPreviewBackground();
        playPreview();
    } else {
        alert(alert_norecord);
    }

});
$('#play').mouseover(function(){
    $(this).css('background','url(../shooting/images/preview_sel.png) no-repeat');
    $(this).css('background-size','100% 100%');
});
$('#play').mouseout(function(){
    $(this).css('background','url(../shooting/images/preview.png) no-repeat');
    $(this).css('background-size','100% 100%');
});

$('#save_btn').click(function(){
    if(recorded == true){

        PostBlob(recordAudio.getBlob(), recordVideo.getBlob(), fileName);
        $('#rcfilename').val( '' );
        $('#rcfilenameModal').modal('hide');
    } else {
        alert(alert_norecord);
    }

});
function hover_save_btn()
{
    $('#save').css('background','url(../shooting/images/save_sel.png) no-repeat');
    $('#save').css('background-size','100% 100%');
}
function out_save_btn()
{
    $('#save').css('background','url(../shooting/images/save.png) no-repeat');
    $('#save').css('background-size','100% 100%');
}
var audio = document.querySelector('audio');

var recordVideo = document.getElementById('record-video');
var preview = document.getElementById('preview');

var container = document.getElementById('container');

var recordAudio, recordVideo;

function showCaptureBackground()
{
    $('#shooting_bg').attr('src',"images/capture_bg.png");
}
preview.onplay = function(){
    if( recorded == true ){
        $('#play').hide();
        $('#save').hide();
        $('#record-btn').hide();
        $('video').attr('controls', 'true');
    }
}

preview.onended  = function(){
    //showCaptureBackground();
    $('#play').show();
    $('#save').show();
    $('#record-btn').show();

    $('video').attr('controls', false);
}

var recCounter;
function record() {
    !window.stream && navigator.getUserMedia({
        audio: true,
        video: true
    }, function(stream) {
        window.stream = stream;
        onstream();
    }, function(error) {
        alert(JSON.stringify(error, null, '\t'));
    });

    window.stream && onstream();

    function onstream() {
        preview.src = window.URL.createObjectURL(stream);
        preview.play();
        preview.muted = true;

        recordAudio = RecordRTC(stream, {
            type: 'audio',
            bitsPerSecond: 128000,
            bufferSize: 512,
            numberOfAudioChannels: 1,
            recorderType: StereoAudioRecorder,
            // bufferSize: 16384,
            onAudioProcessStarted: function() {
                recordVideo.startRecording();
            }
        });

        var videoOnlyStream = new MediaStream();
        videoOnlyStream.addTrack(stream.getVideoTracks()[0]);
        recordVideo = RecordRTC(videoOnlyStream, {
            type: 'video',
            //recorderType: MediaStreamRecorder || WhammyRecorder
        });

        recordAudio.startRecording();

        var counter1 = counter+1;
        recCounter = setInterval(function(){

            counter1--;
            var min = parseInt((counter1)/60);
            var sec = (counter1) - min*60;
            if(min<10) min = '0'+min;
            if(sec<10) sec = '0'+sec;
            $('#time_counter').text(min + ':' + sec);
            if( counter1 <= 0 ){
                console.log('cleartimer');
                //$('#record-btn').trigger('click');
                //$('#record-btn').focus();
                //$('#record-btn').trigger('click');
                recordStop();
            }
        }, 1000);
    }
};

var fileName;
function stop() {
    //document.querySelector('h1').innerHTML = 'Getting Blobs...';

    preview.src = '';
    //preview.poster = 'images/ajax-loader.gif';

    fileName = Math.round(Math.random() * 99999999) + 99999999;

    recordAudio.stopRecording(function() {
        //document.querySelector('h1').innerHTML = 'Got audio-blob. Getting video-blob...';
        recordVideo.stopRecording(function() {
            //document.querySelector('h1').innerHTML = 'Uploading to server...';
            //PostBlob(recordAudio.getBlob(), recordVideo.getBlob(), fileName);
            recorded = true;
        });
    });
};

function xhr(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };
    request.open('POST', url);
    request.send(data);
}

var audio;
function playPreview(){
    audio = new Audio();
    audio.src = recordAudio.toURL();
    audio.style.position= 'absolute';
    audio.style.left = '150%';
    audio.controls = true;
    audio.autoplay = true;
    audio.play();

    audio.onloadedmetadata = function() {
        preview.src = recordVideo.toURL();
        preview.play();
    };

    //preview.parentNode.appendChild(document.createElement('hr'));
    preview.parentNode.appendChild(audio);



}

function shooting_save()
{
    var filename = $('#rcfilename').val();

    if( filename == '' ){
        filename = 'shooting' + Math.round(new Date().getTime()) + courseware_id;
        $('#rcfilename').val( filename );
    }
    $('#rcfilenameModal').modal('show');
}
function initTimeCounter(){
    var min = parseInt(counter/60);
    var sec = counter - min*60;
    if(min<10) min = '0'+min;
    if(sec<10) sec = '0'+sec;
    $('#time_counter').text(min + ':' + sec);
}

window.addEventListener('load',function(){
    initTimeCounter();
});
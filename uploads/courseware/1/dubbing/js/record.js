function PostBlob(readBlob, songBlob, scriptBlob, fileName) {
    var formData = new FormData();
    var new_filename = $('#dbfilename').val();

    formData.append('file', fileName);
    formData.append('read-blob', readBlob);
    formData.append('song-blob', songBlob);
    formData.append('script-blob', scriptBlob);
    formData.append('head-base64', head_base64);
    formData.append("type", "dubbing");
    formData.append('coursewareId',courseware_id);
    formData.append("new_filename", new_filename);

    $('#ajax_loader').show();
    ajax_url = base_url + 'contents/upload';
    xhr(ajax_url, formData, function(ffmpeg_output) {
        //document.querySelector('h1').innerHTML = ffmpeg_output.replace(/\\n/g, '<br />');
        console.log(ffmpeg_output);
        var result = JSON.parse( ffmpeg_output );
        if( result.status == 'success' ){
            $('#ajax_loader').hide();
        } else {
            console.log(result.error);
        }

    });
}
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



var audio = document.querySelector('audio');
var recordAudio_read, recordAudio_song, recordAudio_script;
var recorded = {
    read: false,
    song: false,
    script: false
};
var fileName;
var audio;
var cur_stage;

$('#record-btn').click(function(){
    if( $(this).hasClass('record') ){
        recordStop();
        vplayer.pause();
        vplayer.currentTime(0);
    } else {
        recordStart();
        vplayer.play();
    }
});

$('#play').click(function(){
    if( $(this).hasClass('disabled') ){
        alert('return');
        return;
    }

    if( $(this).hasClass('playing') ){
        stopPreview();
        $(this).removeClass('playing');
    } else {
        if(recorded[cur_stage] == true){
            playPreview();
            $(this).addClass('playing');
        } else {
            alert(alert_norecord);
        }
    }
})
$('#save_btn').click(function(){
    if(recorded['read'] == true && recorded['song'] == true && recorded['script'] == true){
        PostBlob(recordAudio_read.getBlob(), recordAudio_song.getBlob(), recordAudio_script.getBlob(), fileName);
        $('#dbfilename').val( '' );
        $('#dbfilenameModal').modal('hide');
    } else {
        var output = new Array();
        if( recorded['read'] == false ){
            output.push(read_txt);
        }
        if( recorded['song'] == false ){
            output.push(song_txt);
        }
        if( recorded['script'] == false ){
            output.push(script_txt);
        }
        output = output.join(',');
        output += alert_dubbing;
        alert(output);
    }
})
function dubbing_save(){

    var filename = $('#dbfilename').val();

    if( filename == '' ){
        filename = 'dubbing' + Math.round(new Date().getTime()) + courseware_id;
        $('#dbfilename').val( filename );
    }
    $('#dbfilenameModal').modal('show');
}
function recordStart(){
    recorded[cur_stage] = false;
    $('#record-btn').addClass('record');
    $('#play').addClass('disabled');
    record();
}

function recordStop(){
    $('#record-btn').removeClass('record');
    $('#play').removeClass('disabled');
    stop();
}

function record() {
    !window.stream && navigator.getUserMedia({
        audio: true,
        video: false
    }, function(stream) {
        window.stream = stream;
        onstream();
    }, function(error) {
        alert(JSON.stringify(error, null, '\t'));
    });

    window.stream && onstream();

    function onstream() {

        if( cur_stage == 'read' ){
            recordAudio_read = RecordRTC(stream, {
                type: 'audio',
                bitsPerSecond: 128000,
                bufferSize: 512,
                numberOfAudioChannels: 1,
                recorderType: StereoAudioRecorder,
                // bufferSize: 16384,

            });
            recordAudio_read.startRecording();
        } else if( cur_stage == 'song' ){
            recordAudio_song = RecordRTC(stream, {
                type: 'audio',
                bitsPerSecond: 128000,
                bufferSize: 512,
                numberOfAudioChannels: 1,
                recorderType: StereoAudioRecorder,
                // bufferSize: 16384,

            });
            recordAudio_song.startRecording();
        } else if( cur_stage == 'script' ){
            recordAudio_script = RecordRTC(stream, {
                type: 'audio',
                bitsPerSecond: 128000,
                bufferSize: 512,
                numberOfAudioChannels: 1,
                recorderType: StereoAudioRecorder,
                // bufferSize: 16384,

            });
            recordAudio_script.startRecording();
        }

    }
};

function stop() {
    fileName = Math.round(Math.random() * 99999999) + 99999999;

    if( cur_stage == 'read' ){
        recordAudio_read.stopRecording(function() {
            recorded[cur_stage] = true;
            $('#play').removeClass('disabled');
            $('#play').removeClass('playing');
        });
    } else if( cur_stage == 'song' ){
        recordAudio_song.stopRecording(function() {
            recorded[cur_stage] = true;
            $('#play').removeClass('disabled');
            $('#play').removeClass('playing');
        });
    } else if( cur_stage == 'script' ){
        recordAudio_script.stopRecording(function() {
            recorded[cur_stage] = true;
            $('#play').removeClass('disabled');
            $('#play').removeClass('playing');
        });
    }

};

function playPreview(){
    audio = new Audio();

    if( cur_stage == 'read' ){
        audio.src = recordAudio_read.toURL();
    } else if( cur_stage == 'song' ){
        audio.src = recordAudio_song.toURL();
    } else if( cur_stage == 'script' ){
        audio.src = recordAudio_script.toURL();
    }
    audio.controls = true;
    audio.autoplay = true;
    audio.play();

    vplayer.play();
    $('#play').addClass('playing');
    //preview.parentNode.appendChild(audio);
}
function stopPreview(){
    audio.pause();
    vplayer.pause();
    vplayer.currentTime(0);
    $('#play').removeClass('playing');
    //preview.parentNode.appendChild(audio);
}

function clearFileInput(ctrl) {
    try {
        ctrl.value = null;
    } catch(ex) { }
    if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
}


var head_img;
var head_blob, head_base64;
window.addEventListener('load',function(){
    recordStart();
    cur_stage = 'read';

    var head_file = document.getElementById('head-file');
    head_file.addEventListener('change', function( event ){
        var reader = new FileReader();
        reader.addEventListener('load', function( e ){
            var file = e.target.result;
            //$('#head_img').attr('src', file);

            var el = document.getElementById('head_img');
            head_img = new Croppie(el, {
                viewport: { width: 130, height: 130, type: 'circle' },
                boundary: { width: 300, height: 300 },
                showZoomer: true,
                enableExif: true,
                enableOrientation: true
            });
            head_img.bind({
                url: file,
            });
            //head_img = $('#head_img').croppie({
            //
            //    enableExif: true,
            //    enableOrientation: true,
            //    viewport: {
            //        width: 200,
            //        height: 200,
            //        type: 'circle'
            //    },
            //    boundary: {
            //        width: 300,
            //        height: 300
            //    },
            //    url: file
            //});

            $('#imgcropModal').modal('show');

        });

        var files = event.target.files;
        reader.readAsDataURL(files[0]);

    })

});

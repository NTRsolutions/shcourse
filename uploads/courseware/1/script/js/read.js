var read_arr;
var audio = new Audio();

var current_page = 0;
var pos = {left:0, top:0};



window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var recIndex = 0;
var newSource;




window.addEventListener('load',function(){

    getPagesData();
    initAudio();

    $('#language_status_btn').click(function () {

        if(cur_language=='_en'){
            $(this).attr('data-language','western');
            $(this).text('英文');
            $('.page_en').hide();
            $('.page_cn').show();
            cur_language = '_cn';
        }else {

            $(this).attr('data-language','china');
            $(this).text('中文');
            $('.page_en').show();
            $('.page_cn').hide();
            cur_language = '_en';
        }
    });

    $('#read_close').click(function(){
        hideReadModal();
    })

    $('.read_text').hover(function () {

        if(cur_language=='_cn')
        {
            $(this).css('background-color','rgba(255,255,255,0)');
            $(this).css('color','#000');
        }
    });
    $('.read_text').click(function(e){

        if(cur_language=='_cn')return;

        audio.pause();
        var idx = $(this).attr('id');
        var arr = idx.split('_');
        var dir = arr[1];
        var fname = arr[2];

        audio.src = 'sound/read/' + dir + '/' + fname + '.mp3';
        audio.play();
        audio.onended = function(){};

        highlightText(idx);

        var pos_x = e.clientX;
        var pos_y = e.clientY;
        pos = getModalPos( pos_x, pos_y );
        showReadModal();
    });

    $('#read-play-btn').click(function(){
        var disabled = $(this).attr('disabled');
        if( disabled == 'disabled' ){
            alert('disabled');
            return;
        }
        audio.pause();
        togglePlay();
    });

    $('#read-record-btn').click(function(){
        var disabled = $(this).attr('disabled');
        if( disabled == 'disabled' ){
            alert('disabled');
            return;
        }

        audio.pause();
        toggleRecording(this);
    });
});


function getPagesData(){
    read_arr = new Array();

    var page_elems = $('.page');

    for( var i=0; i<page_elems.length; i++ ){
        var s_arr = new Array();

        var page_id = $(page_elems[i]).attr('id');
        var read_elems = $(page_elems[i]).find('.read_text');

        for( var j=0; j<read_elems.length; j++ ){
            var read_id = $(read_elems[j]).attr('id');
            var sound =  $(read_elems[j]).data('sound');
            s_arr.push({
                id: read_id,
                sound: sound
            })
        }

        read_arr.push({
            id: page_id,
            dialog: s_arr
        })
    }
}
function getDialogData( s_id ){
    s_id = s_id+cur_language;
    if( read_arr[current_page] === undefined || read_arr[current_page] === null )
        return false;
    var dialogs = read_arr[current_page].dialog;
    for( var i=0; i<dialogs.length; i++ ){
        if(dialogs[i].id == s_id){
            return dialogs[i];
        }
    }
    return false;
}
function highlightText(s_id){
    $('.read_text').removeClass('sel');
    $('#'+s_id).addClass('sel');
}
function prevPage(){
    audio.pause();
    if( current_page-1 < 0 )
        return ;
    current_page--;
    displayPage(current_page);
}

function nextPage(){
    audio.pause();
    if( current_page+1 >= read_arr.length )
        return ;
    current_page++;
    displayPage(current_page);
}


function displayPage(i){
    var pages = $('.page');
    if( i >= pages.length )
        return;

    $('.page').hide();
    $(pages[i]).show();

}

function showReadModal(){
    $('#read_modal').show();
    $('#read_modal').css({left: pos.left+'px', top: pos.top+'px'});
}

function hideReadModal(){
    $('#read_modal').hide();
}

function getModalPos( pos_x, pos_y ){
    var left=0, top=0;
    if(pos_x < 150)
        left = 0;
    else
        left = pos_x-150;

    if( pos_y > 720-200 )
        top = pos_y-230
    else
        top = pos_y+30

    return {left:left, top:top}
}

function togglePlay(){
    if(is_play == true){
        if( newSource != undefined && newSource != null )
            newSource.stop(0);
        $('#read-play-btn img').attr('src', 'images/read-play.png')
        is_play = false;

        $('#read-record-btn').attr('disabled', false);
        $('#read-record-btn').css('opacity', 1);
    } else {
        audioRecorder.getBuffers( playGotBuffers );
        $('#read-play-btn img').attr('src', 'images/read-playstop.png')
        is_play = true;

        $('#read-record-btn').attr('disabled', true);
        $('#read-record-btn').css('opacity', 0.3);
    }
}


function playGotBuffers( buffers ){
    newSource = audioContext.createBufferSource();
    var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
    newBuffer.getChannelData(0).set(buffers[0]);
    newBuffer.getChannelData(1).set(buffers[1]);
    newSource.buffer = newBuffer;

    newSource.connect( audioContext.destination );
    newSource.onended = onPlayEnded;
    newSource.start(0);
}

function onPlayEnded(){
    $('#read-play-btn').trigger('click');
};

function gotBuffers( buffers ) {
    console.log('--------------------------');
    console.log(buffers);
    console.log('--------------------------');

    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    //Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    //recIndex++;
}


function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
        $('#read-record-btn img').attr('src', 'images/read-record.png');
        $('#read-play-btn').attr('disabled', false);
        $('#read-play-btn').css('opacity', 1);
        $('.recording-tooltip').hide();
    } else {
        // start recording
        if (!audioRecorder)
            return;

        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();

        $('#read-record-btn img').attr('src', 'images/read-recordstop.png');
        $('#read-play-btn').attr('disabled', true);
        $('#read-play-btn').css('opacity', 0.3);
        $('.recording-tooltip').show();
    }
}


function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}


function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}


function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );
    audioRecorder = new Recorder( inputPoint );

}


function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

var is_play = false;
$('.boxclose').click(function(){
    close_box();
});
var introVideo = document.getElementById('scriptread_video');
introVideo.onended = function(){
    close_box();
};
showIntroVideo

function showIntroVideo()
{
    $('.backdrop_scriptread, .box').animate({'opacity':'.8'}, 300, 'linear');
    $('.box').animate({'opacity':'1.00'}, 300, 'linear');
    $('.backdrop_scriptread, .box').css('display', 'block');
}
function close_box()
{
    $('.backdrop_scriptread, .box').animate({'opacity':'0'}, 300, 'linear', function(){
        $('.backdrop_scriptread, .box').css('display', 'none');
    });
}
showIntroVideo();




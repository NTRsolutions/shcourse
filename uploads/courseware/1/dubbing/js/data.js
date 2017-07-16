var base_url = '';
var courseware_id;
var counter = 0.4 * 60;
var alert_norecord = '你还没拍摄视频。';
var read_txt = '表演配音';
var song_txt = '歌曲欢唱';
var script_txt = '剧本朗诵';
var alert_dubbing = '还没了';
var login_status = '0';

window.addEventListener('load',function(){
    var msg = {
        type: "get-courseware-id",
        data: ""
    };
    window.parent.postMessage( JSON.stringify(msg), '*' );


    if( window.addEventListener ){
        window.addEventListener( 'message', receiveMessage, false );
    } else {
        window.attachEvent( 'onmessage', receiveMessage );
    }

    function receiveMessage(event) {

        //var source = event.source.frameElement; //this is the iframe that sent the message
        var message = event.data; //this is the message
        message = JSON.parse(message);
        if (message.type == 'courseware-id') {
            courseware_id = message.value;
            login_status = message.login_status;
            base_url = message.base_URL;
        }
        if(login_status=="1")
        {
            $( '<a id="save" class="disabled" onclick="dubbing_save();"></a>' ).insertAfter('.recorder-btn');
        }
    }
});
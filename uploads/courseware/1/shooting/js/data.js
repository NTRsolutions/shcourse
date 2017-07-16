var base_url = 'https://shcourse.com/';
var courseware_id;
var counter = 0.4 * 60;
var alert_norecord = '你还没拍摄视频。';
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
            $('<a id="save" style="display: none" onmouseover="hover_save_btn();" onmouseout="out_save_btn();" onclick="shooting_save();"></a>' ).insertAfter('.recorder-btn');
        }
    }
});
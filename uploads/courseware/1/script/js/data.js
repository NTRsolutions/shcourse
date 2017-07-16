var new_words = {
    title: '生词本',
    words: [{
        word: 'bleat',
        comment: 'to make a sound like a sheep makes'
    }, {
        word: 'fate',
        comment: 'fortune,lot,or desting'
    }]
};

var song_video = 'video/2.mp4';

var characters = [
    {
        name: 'narrator',
        img: "images/characters/narrator.png"
    }, {
        name: 'monkey',
        img: "images/characters/monkey.png"
    }, {
        name: 'rabbit',
        img: "images/characters/rabbit.png"
    }, {
        name: 'elephont',
        img: "images/characters/elephont.png"
    }, {
        name: 'mouse',
        img: "images/characters/mouse.png"
    }
];

var base_url = '';
var courseware_id;
var login_status = '0';
var message='';

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
        message = event.data; //this is the message
        message = JSON.parse(message);
        if (message.type == 'courseware-id') {
            courseware_id = message.value;
            login_status = message.login_status;
            base_url = message.base_URL;
        }
        if(login_status=="1")
        {
            //$( '<a id="makescript_save" onclick="save_script()"><img src="images/makescript/save.png" width="50px"></a>' ).insertAfter('#script_name')
            $('.save-wrap').show();
            //$( '<a id="makehead_save" onclick="save_head();"><img src="images/save-btn.png" width="50px"></a>' ).insertAfter('#pencil_blue')

        }
    }
});

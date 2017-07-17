var new_words = {
    title: '生词本',
    words: [
        {word: '单词:', comment: '' },
        {word: '', comment: '&nbsp' },
        {word: 'silly', comment: 'adj. 愚蠢的' },
        {word: 'bottom', comment: 'n. 底部'},
        {word: 'audience',comment: 'n. 观众'},
        {word: 'pour', comment: 'v. 倒；灌'},
        {word: 'perfect', comment: 'adj. 完美的'},
        {word: 'drown', comment: 'v. 淹死'},
        {word: 'dizzy', comment: 'adj. 晕眩的'},
        {word: 'storm', comment: 'n. 暴风雨'},
        {word: 'fear', comment: 'v. 害怕'},
        {word: 'burrow', comment: 'n. 洞穴'},
        {word: 'shelter', comment: 'n. 庇护'},
        {word: 'plan', comment: 'n. 计划'},
        {word: 'still', comment: 'adv. 仍然'},
        {word: 'hammer', comment: 'n. 锤子'},
        {word: 'nail', comment: 'n. 钉子'},
        {word: 'wood', comment: 'n. 木材'},
        {word: 'instead', comment: 'adv. 代替'},
        {word: 'nasty', comment: 'adj. 讨厌的；令人生厌的'},
        {word: 'upset', comment: 'adj. 苦恼的；不安的'},
        {word: 'regret', comment: 'n. 后悔'},
        {word: 'soaking', comment: 'adv. 湿透地'},
        {word: '', comment: '&nbsp' },
        {word: '短语:', comment: '' },
        {word: '', comment: '&nbsp' },
        {word: 'up and down', comment: '上上下下'},
        {word: 'wake up', comment: '醒来'},
        {word: 'make sb do sth', comment: '让某人做某事'},
        {word: 'think about', comment: '考虑'},
        {word: 'be good for', comment: '对……有益处'},
        {word: 'get wet', comment: '淋湿'},
        {word: 'take shelter', comment: '安身；躲避；寻求庇护'},
        {word: 'takes a nap', comment: '打盹儿'},
        {word: 'all day', comment: '整天'}
    ]
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

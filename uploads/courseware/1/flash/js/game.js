if (LGlobal.canTouch) {
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);
}
//var is_down = false;
var current_page;
var sel_num=0;

if(window.innerHeight > window.innerWidth){
    LInit(50, "game", 768, 1024, main);
} else {
    LInit(50, "game", 1024, 768, main);
}


var GameClass = {
    curGame:null,
    images:{
        getImg:function(key) {
            //var a = new LBitmap(new LBitmapData(imglist[key]));
            //a.setWidth
            return new LBitmap(new LBitmapData(imglist[key]))
        }
    },
    sounds:{
        soundInstance:{},
        wait2Play:"",
        try2Play:function(id){
            if(this.wait2Play == id) {
                this.play(id);
            }
        },

        preload:function(sList){
            for(var i = 0; i < sList.length; i ++) {

                var o =sList[i];
                if(this.soundInstance.hasOwnProperty(o.id)) {
                    continue;
                }
                var s = new LSound();
                s.load(o.path);
                s.id = o.id;
                s.callback = null;
                s.addEventListener(LEvent.SOUND_COMPLETE, this.onSoundComplete);
                s.addEventListener(LEvent.COMPLETE, this.onSoundLoaded)
                this.soundInstance[o.id] = s;

            }
        },
        onSoundComplete:function(e) {
            if(e.currentTarget.callback) {
                e.currentTarget.callback();
            }
        },
        onSoundLoaded:function(e){
            GameClass.sounds.try2Play(e.currentTarget.id);
        },
        play:function(id, startOffset, loop, callback,volume) {
            if(arguments.length < 2) {
                startOffset = 0;
            }
            if(arguments.length < 3) {
                loop = 0;
            }
            callback = callback || null;
            //console.log("playsounds",arguments,this.soundInstance)
            this.soundInstance[id].callback = callback;
            this.soundInstance[id].play(startOffset, loop);
            if(!isNaN(volume)) {
                this.soundInstance[id].setVolume(volume)
            }
        },
        stop:function(id) {
            try{
                this.soundInstance[id].stop();
            }catch(err){}
        },
        clean:function(){
            for(var m in this.soundInstance) {
                try{
                    this.soundInstance[m].stop();
                }catch(err){

                }
            }
        }
    },
    createNew:function(id, _dataObj){
        var game = {};
        game.bgLayer = null;
        game.gameLayer = null;
        game.btnLayer = null;
        game.effectLayer = null;
        game.topLayer = null;
        game.container = null;
        game._id = id;
        game._dataObj = _dataObj;
        //var dragedItem = null;
        var dragObj = {};
        function onItemDown(e) {
            dragObj.curItem = e.currentTarget;
            dragObj.curItem.startDrag();
            if(dragObj.curItem.infoObj.onDragStart)
            {
                dragObj.curItem.infoObj.onDragStart.func.apply(dragObj.curItem.infoObj.onDragStart.thisObj,[dragObj.curItem]);
            }
        }
        function onItemStop(e) {
            dragObj.curItem.stopDrag();
            var isClick = LPoint.distance2(dragObj.curItem.x, dragObj.curItem.y,dragObj.curItem.infoObj.x, dragObj.curItem.infoObj.y) < 10;
            if(dragObj.curItem.infoObj.onDragStop) {
                dragObj.curItem.infoObj.onDragStop.func.apply(dragObj.curItem.infoObj.onDragStop.thisObj, [dragObj.curItem, isClick]);
            }

            if(dragObj.curItem.infoObj.autoReset) {
                dragObj.curItem.x = dragObj.curItem.infoObj.x;
                dragObj.curItem.y = dragObj.curItem.infoObj.y;
            }
        }
        /**
         * onDragStart(dragItem){};
         * onDragStop(dragItem,isClick){}
         * autoReset true/false
         */
        game.initDrag = function(arr, onDragStart, onDragStop, autoReset){
            var len = arr.length;
            for(var i = 0; i < len; i ++) {
                var item = arr[i];
                item.infoObj = {x:item.x,y:item.y, autoReset:autoReset,onDragStart:onDragStart,onDragStop:onDragStop};
                item.addEventListener(LMouseEvent.MOUSE_DOWN, onItemDown);
                item.addEventListener(LMouseEvent.MOUSE_UP, onItemStop)
            }
        };
        game.clearDrag = function(arr) {
            for(var i = arr.length - 1; i >= 0; i --) {
                var item = arr[i];
                item.removeEventListener(LMouseEvent.MOUSE_DOWN, onItemDown);
                item.removeEventListener(LMouseEvent.MOUSE_UP, onItemStop);
            }
            dragObj = {};
        };
        var _this = game;
        game.init = function(){
            LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
            LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
            LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
            GameClass.curGame = this;
            this.container = new LSprite();
            addChild(this.container);
            this.bgLayer = new LSprite();
            this.container.addChild(this.bgLayer);
            this.gameLayer = new LSprite();
            this.container.addChild(this.gameLayer);
            this.btnLayer = new LSprite();
            this.container.addChild(this.btnLayer);
            this.effectLayer = new LSprite();
            this.container.addChild(this.effectLayer);
            this.actionLayer = new LSprite();
            this.container.addChild(this.actionLayer);
            this.topLayer = new LSprite();
            this.container.addChild(this.topLayer);
        };
        game.destroy = function(){
            GameClass.sounds.clean();
            this.container.parent.removeChild(this.container);
            this.container = null;
        };
        return game;
    },
    clean:function(){
        if(GameClass.curGame) {
            GameClass.curGame.destroy();
            GameClass.curGame = null;
        }
    },
    startGame:function(tClass) {
        $('#down').css('display','none');
        $('#game').css('cursor','auto');
        GameClass.clean();
        current_page = null;
        var t = window[tClass].createNew();
        t.init();
        setTimeout(function(){switchVideo(false);},800);
        //switchVideo(false);
        return t;
    }
};

var loadingLayer;
//读取完的图片数组
var imglist = {};
var s_backgound, s_btn_click, s_btn_hover,s_win;
var selection;
var cur_page;

//图片path数组
var imgData = new Array(
    { name: 'hdend_bg', path: 'images/end.png' },
    { name: 'btn_replay', path: 'images/replay.png' }

);

//var read1,read2,read3;
function main() {
    var sdList = [
        {id:'right',path:'sound/right.mp3'},
        {id:'wrong',path:'sound/wrong.mp3'},
    ];
    LGlobal.setDebug(true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
    GameClass.sounds.preload(sdList);
    loadingLayer = new LoadingSample2();
    //addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            // loadingLayer.setProgress(progress);
        },
        function (result) {
            // console.log('loaded')
            imglist = result;
            // console.log(loadingLayer)
            //removeChild(loadingLayer);
            loadingLayer = null;
            cur_page = current_page
            sel_part('' + cur_page);
        }
    );
}



var GameHdend = {
    _data:{},
    createNew:function(){
        var game = GameClass.createNew("Hdend", {});
        game._pInit = game.init;
        var bg;
        game.init = function(){
            this._pInit();

            bg = GameClass.images.getImg('hdend_bg');
            this.bgLayer.addChild(bg);

            reply_btn = new LButton(GameClass.images.getImg("btn_replay"));
            reply_btn.x = 420;
            reply_btn.y = 340;
            this.btnLayer.addChild(reply_btn);
            reply_btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
                setTimeout(function(){
                    showPart('' + cur_page)
                },500);

            });


        };
        return game;
    }
};


if (LGlobal.canTouch) {
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);
}

var current_page;

LInit(50, "game", 1280, 720, main);

var _clickArr = new Array();
var _boxArr = new Array();
var _lineArr = new Array();

var hd15_cnt = [];

var GameClass = {
    curGame:null,
    images:{
    	getImg:function(key) {
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
        GameClass.clean();
        current_page = null;
    	var t = window[tClass].createNew();
        t.init();
        setTimeout(function(){switchVideo(false);},800);
        return t;
    }
};

var loadingLayer;
//读取完的图片数组
var imglist = {};
var s_backgound, s_btn_click, s_btn_hover,s_win;
var selection;
//图片path数组
var imgData;
imgData = new Array(
    { name: 'makehead_bg', path: 'images/makehead/bg.png' },   //背景
    { name: 'makehead_bucket', path: 'images/makehead/bucket.png' },
    { name: 'makehead_complete', path: 'images/makehead/print.png' },
    { name: 'makehead_eraser', path: 'images/makehead/eraser.png' },
    { name: 'makehead_palette', path: 'images/makehead/palette.png' },
    { name: 'makehead_pencil', path: 'images/makehead/pencil.png' },
    { name: 'makehead_character_narrator', path: 'images/characters/narrator-bk.png' },
    { name: 'makehead_character_monkey', path: 'images/characters/monkey-bk.png' },
    { name: 'makehead_character_rabbit', path: 'images/characters/rabbit-bk.png' },
    { name: 'makehead_character_elephont', path: 'images/characters/elephont-bk.png' },
    { name: 'makehead_tile', path: 'images/makehead/tile.png' }
);

var image8 = null;

function main() {
    var sdList = [
    ];
    LGlobal.setDebug(true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
    GameClass.sounds.preload(sdList);
    loadingLayer = new LoadingSample2();

    var loader = new LLoader();
    loader.addEventListener(LEvent.COMPLETE,loadBitmap);
    loader.load('images/characters/monkey-bk.png','bitmapData');
    function loadBitmap(e){
        var temp = new LBitmapData(e.target);
        image8 = temp;
    }

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
            showPart('1');
        }
    );
}


var GameHd4 = {
    _data:{},
    createNew:function(){
        console.log('GameHd4');
        var game = GameClass.createNew('Hd4',{});
        game._pInit = game.init;
        var bucket, pencil, eraser, tool_type = -1, nextBtn, clearBtn, palette;
        var tile = [], hex_color;
        var rgb_curcolor = {r:255, g:255 ,b:255};   //rgb_color is the structure of the (r,g,b)
        var tile_color = ['#ffed6d','#ffcc00','#ff6600','#ff0000','#fc3d3d','#848400','#cccc00','#66cc00','#33cccc','#009999','#71e2ff','#3cb0ff',
            '#0075ea','#aaaaff','#b93eb9','#d37ed3','#e10038','#e17100','#dba500','#000000'];
        var drawLayer;
        var width = 420, height = 450;   // the value of the paint range
        var offsetX = 50, offsetY = 75, minWidth = 270, minHeight = 250;

        var imageData, initData ,  iscolor = false, isClickStarted;  //
        var drawingAreaX = 0,drawingAreaY = 0;
        game.init = function(){
            console.log('GameHd4-1');
            this._pInit();
            var bg = GameClass.images.getImg('makehead_bg');
            this.bgLayer.addChild(bg);
            /*
             this.bgLayer.addEventListener(LMouseEvent.MOUSE_OVER,function(){
             console.log("bglayer over");
             game.curChange();
             });

             this.bgLayer.addEventListener(LMouseEvent.MOUSE_OUT,function(){
             $('#game').css('cursor','default');
             console.log("layer out");
             });*/

            bucket = new LButton(GameClass.images.getImg('makehead_bucket'));
            bucket.x = 855.5;
            bucket.y = 191;
            this.btnLayer.addChild(bucket);
            bucket.addEventListener(LMouseEvent.MOUSE_UP,function(e){game.bucketClick();});
            console.log('GameHd4-2');
            pencil = new LButton(GameClass.images.getImg('makehead_pencil'));
            pencil.x = 997;
            pencil.y = 198;
            this.btnLayer.addChild(pencil);
            pencil.addEventListener(LMouseEvent.MOUSE_UP,function(e){game.pencilClick()});
            console.log('GameHd4-3');
            eraser = new LButton(GameClass.images.getImg("makehead_eraser"));
            eraser.x = 1122;
            eraser.y = 198;
            this.btnLayer.addChild(eraser);
            eraser.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                game.eraserClick();
            })
            console.log('GameHd4-4');
            nextBtn = new LButton(GameClass.images.getImg('makehead_complete'));
            nextBtn.x = 229;
            nextBtn.y = 615;
            this.btnLayer.addChild(nextBtn);
            // nextBtn.setState(LButton.STATE_DISABLE);
            nextBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){game.nextPage()});
            nextBtn.addEventListener(LMouseEvent.MOUSE_MOVE,function(){
                $('#game').css('cursor','default');
            });

            console.log('GameHd4-5');
            clearBtn = new LButton(GameClass.images.getImg('makehead_delete'));
            clearBtn.x = 417;
            clearBtn.y = 615;
            this.btnLayer.addChild(clearBtn);
            clearBtn.addEventListener(LMouseEvent.MOUSE_UP,function(){game.onMyClear()});
            clearBtn.addEventListener(LMouseEvent.MOUSE_MOVE,function(){
                $('#game').css('cursor','default');
            });

            console.log('GameHd4-6');
            drawLayer = new LSprite();
            drawLayer.x = 206;
            drawLayer.y = 150;
            this.bgLayer.addChild(drawLayer);
            console.log('GameHd4-7');
            image8.lock();
            console.log('GameHd4-71');
            imageData = image8.getPixels(new LRectangle(0, 0, width, height));
            console.log('GameHd4-72');
            var dataCopy = new Uint8ClampedArray(imageData.data);
            console.log('GameHd4-73');
            initData = new ImageData(width,height);
            initData.data.set(dataCopy);console.log('GameHd4-8');
            console.log('GameHd4-74');
            image8.unlock();
            console.log('GameHd4-75');
            drawLayer.graphics.beginBitmapFill(image8);
            drawLayer.graphics.beginPath();
            drawLayer.graphics.drawRect(1, '#ffffff', [0,0, width, height]);
            drawLayer.graphics.closePath();
            console.log('GameHd4-2');
            //.............draw the image............
            drawLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
                if(e.offsetX < (drawLayer.x + offsetX) || e.offsetX > (drawLayer.x + offsetX + minWidth) || e.offsetY < (drawLayer.y + offsetY) || e.offsetY > (drawLayer.y + offsetY + minHeight) ) {
                    return;
                }

                if(tool_type == 3 || tool_type == 2){                                             //.....tool type 1 is bucket, 2 is erase, 3, pencil
                    drawLayer.graphics.beginPath();
                    drawLayer.graphics.moveTo((e.offsetX - drawLayer.x) , (e.offsetY - drawLayer.y));
                    isClickStarted = true;
                }
                else {
                    drawLayer.graphics.beginPath();
                    drawLayer.graphics.moveTo((e.offsetX - drawLayer.x) , (e.offsetY - drawLayer.y));
                    //console.log("e.offsetX : e.offsetY " + (e.offsetX - drawLayer.x) + " : " + (e.offsetY - drawLayer.y));
                    var base64Data = drawLayer.getDataURL();
                    var tempImage = new Image();
                    tempImage.src = base64Data;
                    var bitmapdata = new LBitmapData(tempImage, 0, 0, width, height, LBitmapData.DATA_CANVAS);
                    var tempData = bitmapdata.getPixels(new LRectangle(0, 0,width, height));
                    //var pixelpos = ((e.offsetY - drawLayer.y) * width + (e.offsetX - drawLayer.x)) * 4;
                    //console.log("temp image : {0}  {1}  {2} {3}" ,tempData.data[pixelpos], tempData.data[pixelpos + 1], tempData.data[pixelpos + 2],tempData.data[pixelpos + 3] );
                    //console.log("original image : {0}  {1}  {2} {3}" ,initData.data[pixelpos], initData.data[pixelpos + 1], initData.data[pixelpos + 2],initData.data[pixelpos + 3] );
                    //console.log("before image : {0}  {1}  {2} {3}" ,imageData.data[pixelpos], imageData.data[pixelpos + 1], imageData.data[pixelpos + 2],imageData.data[pixelpos + 3] );
                    imageData.data.set(tempData.data);
                    game.fill_Color(e);
                    isClickStarted = false;
                }
            });
            // check out of cursor.
            this.bgLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {

                if(e.offsetX < (drawLayer.x ) || e.offsetX > (drawLayer.x + width) || e.offsetY < (drawLayer.y ) || e.offsetY > (drawLayer.y + height) ) {
                    game.curChange();                }

                if(e.offsetX < (drawLayer.x + offsetX) || e.offsetX > (drawLayer.x + offsetX + minWidth) || e.offsetY < (drawLayer.y + offsetY) || e.offsetY > (drawLayer.y + offsetY + minHeight) ) {
                    isClickStarted = false;
                }
            });

            drawLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
                game.onMyMouseMove(e);
            });
            drawLayer.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                //.............to draw ......
                isClickStarted = false;
                //............if sprite is changed, continue button is displayed  .........
                if(initData != imageData)
                    nextBtn.setState(LButton.STATE_ENABLE);
            });
            //..........................

            palette = GameClass.images.getImg('makehead_palette');
            palette.x = 878;
            palette.y = 366;
            this.bgLayer.addChild(palette);

            var n = 0;
            for(var i = 0;i < 4;i++){
                for(var j = 0;j < 5;j++){
                    tile[n] = new LButton(GameClass.images.getImg('makehead_tile'));
                    tile[n].x = 878 + 59 * j;
                    tile[n].y = 368 + 59 * i;
                    this.topLayer.addChild(tile[n]);
                    n++;
                }
            }
            tile[0].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(0);});
            tile[1].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(1);});
            tile[2].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(2);});
            tile[3].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(3);});
            tile[4].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(4);});
            tile[5].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(5);});
            tile[6].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(6);});
            tile[7].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(7);});
            tile[8].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(8);});
            tile[9].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(9);});
            tile[10].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(10);});
            tile[11].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(11);});
            tile[12].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(12);});
            tile[13].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(13);});
            tile[14].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(14);});
            tile[15].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(15);});
            tile[16].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(16);});
            tile[17].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(17);});
            tile[18].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(18);});
            tile[19].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(19);});
            //  tile[20].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(20);});
            //  tile[21].addEventListener(LMouseEvent.MOUSE_UP,function(e){game.color_click(21);});

        }
        game.floodFill = function (startX, startY, startR, startG, startB) {

            var newPos,
                x,
                y,
                pixelPos,
                reachLeft,
                reachRight,
                drawingBoundLeft = drawingAreaX,
                drawingBoundTop = drawingAreaY,
                drawingBoundRight = drawingAreaX + width - 1,
                drawingBoundBottom = drawingAreaY + height - 1,
                pixelStack = [[startX, startY]];

            while (pixelStack.length) {

                newPos = pixelStack.pop();
                x = newPos[0];
                y = newPos[1];

                // Get current pixel position
                pixelPos = (y * width + x) * 4;

                // Go up as long as the color matches and are inside the canvas
                while (y >= drawingBoundTop && game.matchStartColor(pixelPos, startR, startG, startB)) {
                    y -= 1;
                    pixelPos -= width * 4;
                }

                pixelPos += width * 4;
                y += 1;
                reachLeft = false;
                reachRight = false;

                // Go down as long as the color matches and in inside the canvas
                while (y <= drawingBoundBottom && game.matchStartColor(pixelPos, startR, startG, startB)) {
                    y += 1;
                    game.colorPixel(pixelPos, rgb_curcolor.r, rgb_curcolor.g, rgb_curcolor.b);

                    if (x > drawingBoundLeft) {
                        if (game.matchStartColor(pixelPos - 4, startR, startG, startB)) {
                            if (!reachLeft) {
                                // Add pixel to stack
                                pixelStack.push([x - 1, y]);
                                reachLeft = true;
                            }
                        } else if (reachLeft) {
                            reachLeft = false;
                        }
                    }

                    if (x < drawingBoundRight) {
                        if (game.matchStartColor(pixelPos + 4, startR, startG, startB)) {
                            if (!reachRight) {
                                // Add pixel to stack
                                pixelStack.push([x + 1, y]);
                                reachRight = true;
                            }
                        } else if (reachRight) {
                            reachRight = false;
                        }
                    }

                    pixelPos += width * 4;
                }
            }
        }
        game.onMyMouseMove = function (e) {
            if(isClickStarted){
                switch (tool_type){
                    case 2:   // eraser case
                        drawLayer.graphics.lineTo((e.offsetX - drawLayer.x), (e.offsetY - drawLayer.y));
                        drawLayer.graphics.lineWidth(8);
                        drawLayer.graphics.strokeStyle('#fffef3');
                        drawLayer.graphics.stroke();
                        break;
                    case 3:    // pencil case
                        drawLayer.graphics.lineTo((e.offsetX - drawLayer.x), (e.offsetY - drawLayer.y));
                        drawLayer.graphics.lineWidth(1);
                        drawLayer.graphics.strokeStyle(hex_color);
                        drawLayer.graphics.stroke();
                        break;
                }
            }
        }
        game.redraw = function () {
            var imagetemp = new LBitmapData(null,0,0,width,height, LBitmapData.DATA_CANVAS);
            imagetemp.putPixels(new LRectangle(0,0,width,height), imageData);
            drawLayer.graphics.clear();
            drawLayer.graphics.beginBitmapFill(imagetemp);
            drawLayer.graphics.beginPath();
            drawLayer.graphics.drawRect(1, '#ffffff', [0,0, width, height]);
            drawLayer.graphics.closePath();
        }
        game.colorPixel = function (pixelPos, r, g, b, a) {
            imageData.data[pixelPos] = r;
            imageData.data[pixelPos + 1] = g;
            imageData.data[pixelPos + 2] = b;
            imageData.data[pixelPos + 3] = a !== undefined ? a : 255;
        }
        game.onMyClear = function () {
            var imagetemp = new LBitmapData(null,0,0,width,height, LBitmapData.DATA_CANVAS);
            imagetemp.putPixels(new LRectangle(0,0,width,height), initData);
            drawLayer.graphics.clear();
            drawLayer.graphics.beginBitmapFill(imagetemp);
            drawLayer.graphics.beginPath();
            drawLayer.graphics.drawRect(1, '#ffffff', [0,0, width, height]);
            drawLayer.graphics.closePath();
        }
        game.matchOutlineColor = function (r, g, b, a, startR, startG, startB) {

            return !(startR - 10 <= r && r <= startR + 10 && startG - 10 <= g && g <= startG + 10 && startB - 10 <= b && b <= startB + 10 && a === 255);
        }
        game.matchStartColor = function (pixelPos, startR, startG, startB) {

            var r = imageData.data[pixelPos],
                g = imageData.data[pixelPos + 1],
                b = imageData.data[pixelPos + 2],
                a = imageData.data[pixelPos + 3];

            // If current pixel of the outline image is black
            if (game.matchOutlineColor(r, g, b, a, startR, startG, startB)) {
                return false;
            }

            r = imageData.data[pixelPos];
            g = imageData.data[pixelPos + 1];
            b = imageData.data[pixelPos + 2];

            // If the current pixel matches the clicked color
            if (r === startR && g === startG && b === startB) {
                return true;
            }

            // If current pixel matches the new color
            if (r === rgb_curcolor.r && g === rgb_curcolor.g && b === rgb_curcolor.b) {
                return false;
            }
            return true;
        }
        game.setColor = function(value) {
            var color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
            rgb_curcolor.r = parseInt(color[1], 16);
            rgb_curcolor.g = parseInt(color[2], 16);
            rgb_curcolor.b = parseInt(color[3], 16);
        }
        game.paintAt = function (startX, startY) {

            var pixelPos = (startY * width + startX) * 4,
                r = imageData.data[pixelPos],
                g = imageData.data[pixelPos + 1],
                b = imageData.data[pixelPos + 2],
                a = imageData.data[pixelPos + 3];
            /*if(tool_type != 1){
             rgb_curcolor.r = 255;
             rgb_curcolor.g = 255;
             rgb_curcolor.b = 255;
             }*/
            if (r === rgb_curcolor.r && g === rgb_curcolor.g && b === rgb_curcolor.b) {
                // Return because trying to fill with the same color
                return;
            }

            /*if (game.matchOutlineColor(r, g, b, a, r, g, b)) {
             // Return because clicked outline
             return;
             }*/
            game.floodFill(startX, startY, r, g, b);
            game.redraw();
        }
        game.fill_Color = function(e){
            // console.log("fill color event");
            if((e.offsetX > drawLayer.x) && (e.offsetY > drawLayer.y))
                game.paintAt(e.offsetX - drawLayer.x, e.offsetY - drawLayer.y);
        }
        game.bucketClick = function(){
            tool_type = 1;                // if tool_type is 1, fill color with bucket
            $('#game').css({'cursor':'url(./images/4hd/bucket.cur),auto'});
        }
        game.eraserClick = function(){
            tool_type = 2;                //if too_type is 2, erase the range
            $('#game').css({'cursor':'url(./images/4hd/eraser.cur),auto'});
        }
        game.pencilClick = function () {
            tool_type = 3;
            $('#game').css({'cursor':'url(./images/4hd/pencil.cur),auto'});
        }
        game.color_click = function(no){
            hex_color = tile_color[no];
            game.setColor(hex_color);
        }
        game.nextPage = function(){
            $('#game').css('cursor','default');
            $('#p5').css("display", "block");
            Inheritance("completed");
            showPart("5");
        }
        game.curChange = function(){
            if(tool_type == 1)
                $('#game').css({'cursor':'url(./images/4hd/bucket.cur),auto'});
            else if(tool_type == 2)
                $('#game').css({'cursor':'url(./images/4hd/eraser.cur),auto'});
            else if(tool_type == 3)
                $('#game').css({'cursor':'url(./images/4hd/pencil.cur),auto'});
            else
                $('#game').css('cursor','default');
        }

        return game;
    }
};


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}



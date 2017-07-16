
function switchVideo(b) {
	try {
		GameClass.sounds.clean();
	}catch(err){}
	if(b) {
		$('.videoContent').show();        
		$('.gameContent').hide();
		
	} else {
		$('.gameContent').show();
        vplayer.pause();
        $('.videoContent').hide();
    }
}
var vplayer;
var screenApi = {} ;
var currentID = -1;

(function(lib){

	lib.onScreenChange = function(){
		onresize();
	};

	var initRatio,lastRatio,bodyScale;
	function getDevicePixelRatio() {
		if(window.devicePixelRatio) {
			return window.devicePixelRatio;
		}
		return screen.deviceXDPI / screen.logicalXDPI;
	}
	lib.init = function(){
		document.addEventListener("fullscreenchange", this.onScreenChange);
		document.addEventListener("webkitfullscreenchange", this.onScreenChange);
		document.addEventListener("mozfullscreenchange", this.onScreenChange);
		document.addEventListener("MSFullscreenChange", this.onScreenChange);
        document.addEventListener("orientationchange",this.onScreenChange);
		window.addEventListener('resize',function(e){
			onresize(e);
		});
        initRatio = getDevicePixelRatio();
		lastRatio = initRatio;
		bodyScale = 1/initRatio;
		//$('body').css({width:window.innerWidth * initRatio, height:window.innerHeight * initRatio,transform:'scale(' +(bodyScale)+')'})
		onresize(null);
	};

    function onresize(e) {
		var ratio = getDevicePixelRatio()/initRatio;
		var w = window.innerWidth;
		var h = window.innerHeight;
		var scale = Math.min(w/1280,h/720) * ratio;
		var scale1 = Math.min(1280/1280,1020) * ratio;
		var fsize = 9 + 1/getDevicePixelRatio()*13;


		$('.wrap').css({width:Math.round(1280*scale),height:Math.round(720*scale),left:Math.round(w*ratio-1280*scale)/2});
		$('.title').css({width:Math.round(1280*scale),height:Math.round(720*scale),right:0});
		$('.content').css({width:Math.round(1280*scale*scale1),height:Math.round(720*scale*scale1),'margin-left':Math.round(0*scale), 'margin-top':Math.round(0*scale)});
		$('.contentWrap').css({position:'relative',width:Math.round(1280*scale*scale1),height:Math.round(720*scale*scale1)});
		$('.gameContent').css({width:Math.round(1280),height:Math.round(720),transform:'scale(' + 1 * scale * scale1 + ',' + 1 * scale * scale1 + ')','margin-left':0});
		$('.gameContent').css({width:Math.round(1280),height:Math.round(720),'-webkit-transform':'scale(' + 1 * scale * scale1 + ',' + 1 * scale * scale1 + ')','margin-left':0});
		$('#game_canvas').css({width:1280,height:720,margin:0});
		//$('#videoPlayer').css({'margin-left':Math.round(0*scale), 'margin-top':Math.round(0*scale)});
		try {
			vplayer.width(Math.round(1280*scale*scale1));
			vplayer.height(Math.round(720*scale*scale1));

		}catch(err){

		}

		return;
		if(ratio != lastRatio) {
			var w = window.innerWidth *initRatio;
			var h = window.innerHeight *initRatio;
			$('body').css({transform:'scale(' + ratio/initRatio*bodyScale + ')'});
			lastRatio = ratio;
			return;
		}

		//initRatio = ratio;
		var w = window.innerWidth * ratio;
		var h = window.innerHeight * ratio;
		var scale = Math.min(w/1280,h/720);

		scale = Math.round(scale * 100) / 100;
		if(lib.isFullscreen()) {

			$('.wrap').css({'transform':'none'});
			$('.videoContent').css({width:'100%',height:'100%','transform':'none'});

			$('.gameContent').css({width:'100%',height:'100%','transform':'none'});

		} else {

			$('.wrap').css({'transform':'scale('+scale+')','left':(w-1280*scale)/2});

			$('.gameContent').css({width:1280,height:720,'transform':'scale('+(initRatio/scale)+')'});
			/*$('.nav').css({height:70*scale,top:650*scale})
			 $('.nav ul').css({transform:'scale(' + scale + ')','margin-left':(w-1145*scale)/2})*/
		}
		try {
			if(lib.isFullscreen()) {
				vplayer.width(w/ratio);
				vplayer.height(h/ratio);
			} else {
				vplayer.width(1280*scale/initRatio);
				vplayer.height(720*scale/initRatio)
			}

		} catch(err) {
			setTimeout(function(){
				if(lib.isFullscreen()) {
					vplayer.width(w);
					vplayer.height(h);
				} else {
					vplayer.width(1280*scale);
					vplayer.height(720*scale)
				}
			},1000)
		}
	};
	
})(screenApi);

function gloalHandle(e) {
	screenApi.toggleFullscreen();
}
window.addEventListener('load',function(){
	screenApi.init();
});


function showPart(id) {
    $('.nav').css('display','block');
    $('#game').css('cursor','default');
    GameClass.clean();
    switch(id){
		case "1":
			currentID = id;
			if(currentID == id){
				GameClass.startGame("GameHd4");
			}
			break;
	}
}


function switchVideo(b) {
	try {
		GameClass.sounds.clean();
	}catch(err){}
	if(b) {
		$('.videoContent').show();
		$('.gameContent').hide();

	} else {
		switch (current_page){
			case '13':
			// GameClass.sounds.play('fx13-1');
			// break;
			case '18':
			// GameClass.sounds.play('fx18-1');
			// break;
		}
		$('.gameContent').show();
		vplayer.pause();
		$('.videoContent').hide();
	}
}
var vplayer;
var screenApi = {} ;
var currentID = -1;

(function(lib){
	lib.isFullscreen = function(){
		if(document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen  || document.isFullscreen || document.msIsFullscreen|| document.msFullscreenElement) {
			return true;
		}
		return false
	};

	lib.requestFullscreen = function(){
		alert('fullscreen');
		if(this.isFullscreen()) {
			return;
		}
		var dom = document.getElementById('contentWrap');
		if (dom.requestFullscreen) {
			dom.requestFullscreen();
		} else if (dom.mozRequestFullScreen) {
			dom.mozRequestFullScreen();
		} else if (dom.webkitRequestFullscreen) {
			dom.webkitRequestFullscreen();
		} else if(dom.msRequestFullscreen) {
			dom.msRequestFullscreen();
		}
	};
	lib.quitFullscreen = function(){
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	};
	lib.toggleFullscreen = function(){

		if(this.isFullscreen()) {
			this.quitFullscreen();
		} else {
			this.requestFullscreen();
		}
	};
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
		onresize(null);

		//lib.requestFullscreen();
	};

	function onresize(e) {
		var ratio = getDevicePixelRatio()/initRatio;
		var w = window.innerWidth;
		var h = window.innerHeight;
		var scale = Math.min(w/1280,h/720) * ratio;
		var scale1 = Math.min(1000/1280,1280) * ratio;
		var fsize = 9 + 1/getDevicePixelRatio()*13;
		$('.vjs-control').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'3em'});
		$('.vjs-control-bar').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'3em',bottom:0});
		if(lib.isFullscreen()) {
			$('.contentWrap').css({width:w,height:h,position:'absoulte','top':0,'left':0});
			$('#videoPlayer').css({'margin-left':'0', 'margin-top':'0'});
			try {
				vplayer.width(w);
				vplayer.height(h);
			}catch(err) {

			}
			var scale = Math.min(w/1280,h/720);
			//$('.gameContent').css({width:1280,height:720,transform:'scale(' +scale + ',' + scale + ')','margin-left':0})
			$('.gameContent').css({width:1280,height:720,transform:'scale(' +scale + ',' + scale + ')','margin-left':(w-1280*scale)/2});
			return;
		}

		$('.wrap').css({width:Math.round(1280*scale),height:Math.round(720*scale),left:Math.round(w*ratio-1280*scale)/2});
		$('.title').css({width:Math.round(1280*scale),height:Math.round(720*scale),right:0});
		//$('.content').css({width:Math.round(1280*scale*scale1),height:Math.round(720*scale*scale1),'margin-left':Math.round(112*scale), 'margin-top':Math.round(131*scale)});
		$('.content').css({width:Math.round(1280*scale*scale1),height:Math.round(720*scale*scale1),'margin-left':Math.round(90*scale), 'margin-top':Math.round(80*scale)});
		$('.contentWrap').css({position:'relative',width:Math.round(1280*scale*scale1),height:Math.round(712*scale*scale1)});
		$('.gameContent').css({width:Math.round(1280),height:Math.round(720),transform:'scale(' + 1 * scale * scale1 + ',' + 1 * scale * scale1 + ')','margin-left':0});
		$('.gameContent').css({width:Math.round(1280),height:Math.round(720),'-webkit-transform':'scale(' + 1 * scale * scale1 + ',' + 1 * scale * scale1 + ')','margin-left':0});
		$('#game_canvas').css({width:1280,height:720,margin:0});
		//$('#videoPlayer').css({'margin-left':Math.round(132*scale), 'margin-top':Math.round(67*scale)});
		try {
			vplayer.width(Math.round(1280*scale*scale1));
			vplayer.height(Math.round(712*scale*scale1));

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
				vplayer.height(712*scale/initRatio)
			}

		} catch(err) {
			setTimeout(function(){
				if(lib.isFullscreen()) {
					vplayer.width(w);
					vplayer.height(h);
				} else {
					vplayer.width(1280*scale);
					vplayer.height(712*scale)
				}
			},1000)
		}


	};

})(screenApi);

function gloalHandle(e) {
	screenApi.toggleFullscreen();
}
window.addEventListener('load',function(){
	vplayer = videojs('videoPlayer',{controls:true,width:1280,height:712,preload:'auto',loop:false},function(){
		vplayer.on('play', function(){
			console.log('play');
		});
		vplayer.on("pause",function(){
			console.log('stop');
		});
	});

	vplayer.play();
	$('#btn-detail').click(function(){

		if( $(this).hasClass('sel') ){
			$(this).removeClass('sel');
			sel_part('6');
			$('#btn-next').hide();
		} else {
			$(this).addClass('sel');
			sel_part('6-1');
			$('#btn-next').show();
		}

	});

	$('#btn-next').click(function(){
		if( currentID == '6-1' )
			showPart('6-2');
		else if( currentID == '6-2' )
			showPart('6-3');
		else if( currentID == '6-3' )
			showPart('6-4');
		else if( currentID == '6-4' ){
			showPart('6-5');
			$('#btn-next').hide();
		}
	});

	$('#replay').click(function(){
		vplayer.controls(true);
		showPart('' + currentID);
	});

	if( localStorage.login != 'true' ){
		$('.back-btn').attr('href', 'start.html');
	}

	screenApi.init();
});
function sel_part(n) {
	//switch(n){
	//	case 2:
	//		break;
	//	case 3:
	//		break;
	//	case 7:
	//		break;
	//	case 8:
	//		break;
	//}

	showPart(n);
}
function showVideo(vfile, onComplete) {
	$('#replay').hide();
	switchVideo(true);
	vplayer.src({type:'video/mp4',src:vfile});
	vplayer.play();
	var callback = function(){
		vplayer.off("ended", arguments.callee);
		if(onComplete) {
			onComplete();
		}
		$('#replay').show();
		vplayer.controls(false);
	}
	vplayer.on("ended", callback);
}

function showPart(id) {
	$('#down').css('display','none');
	GameClass.clean();
	switch(id) {
		case '1':
			currentID = id;
			if(currentID == id) showVideo("video/tomorrow001.mp4",function(){
				//console.log('end')
				//if(currentID == id) GameClass.startGame('GameHdend');
			});
			break;
	}
}

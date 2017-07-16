
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
		//vplayer.pause();
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
	};

	function onresize(e) {
		if(window.innerHeight > window.innerWidth){

			onresize_portrait(e);
		} else {

			onresize_landscape(e);
		}
	}

	function onresize_landscape(e) {
		var ratio = getDevicePixelRatio()/initRatio;
		var w = window.innerWidth;
		var h = window.innerHeight;
		var scale = Math.min(w/768,h/1024) * ratio;
		var fsize = 9 + 1/getDevicePixelRatio()*13;
		$('.vjs-control').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'4em'});
		$('.vjs-control-bar').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'4em',bottom:0});
		if(lib.isFullscreen()) {
			$('.contentWrap').css({width:w,height:h,position:'absoulte','top':0,'left':0});
			$('#videoPlayer').css({'margin-left':'0', 'margin-top':'0'});
			try {
				vplayer.width(w);
				vplayer.height(h);
			}catch(err) {

			}
			var scale = Math.min(w/1024,h/768);
			//$('.gameContent').css({width:1024,height:768,transform:'scale(' +scale + ',' + scale + ')','margin-left':0})
			$('.gameContent').css({width:1024,height:768,transform:'scale(' +scale + ',' + scale + ')'});
			return;
		}

		$('.wrap').css({width:768*scale,height:1024*scale,left:Math.round(w*ratio-768*scale)/2});
		$('.title').css({width:768*scale,height:1024*scale,right:0});
		$('.content').css({width:768*scale,height:1024*scale});
		$('.contentWrap').css({position:'relative',width:768*scale,height:1024*scale});
		$('.gameContent').css({width:768,height:1024,transform:'scale(' + 1 * scale + ',' + 1 * scale + ')','margin-left':0});
		$('.gameContent').css({width:768,height:1024,'-webkit-transform':'scale(' + 1 * scale + ',' + 1 * scale + ')','margin-left':0});
		$('#game_canvas').css({width:768,height:1024,margin:0});
		$('#game_canvas').attr('width', '768px');
		$('#game_canvas').attr('height', '1024px');
		//$('#videoPlayer').css({'margin-left':Math.round(132*scale), 'margin-top':Math.round(67*scale)});
		try {
			vplayer.width(Math.round(1024*scale));
			vplayer.height(Math.round(768*scale));

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
		var scale = Math.min(w/1024,h/768);

		scale = Math.round(scale * 100) / 100;
		if(lib.isFullscreen()) {

			$('.wrap').css({'transform':'none'});
			$('.videoContent').css({width:'100%',height:'100%','transform':'none'});

			$('.gameContent').css({width:'100%',height:'100%','transform':'none'});

		} else {

			$('.wrap').css({'transform':'scale('+scale+')','left':(w-1024*scale)/2});

			$('.gameContent').css({width:768,height:1024,'transform':'scale('+(initRatio/scale)+')'});
			/*$('.nav').css({height:70*scale,top:650*scale})
			 $('.nav ul').css({transform:'scale(' + scale + ')','margin-left':(w-1145*scale)/2})*/
		}
		try {
			if(lib.isFullscreen()) {
				vplayer.width(w/ratio);
				vplayer.height(h/ratio);
			} else {
				vplayer.width(1024*scale/initRatio);
				vplayer.height(768*scale/initRatio)
			}

		} catch(err) {
			setTimeout(function(){
				if(lib.isFullscreen()) {
					vplayer.width(w);
					vplayer.height(h);
				} else {
					vplayer.width(1024*scale);
					vplayer.height(768*scale)
				}
			},1000)
		}
	};

	function onresize_portrait(e) {
		var ratio = getDevicePixelRatio()/initRatio;
		var w = window.innerWidth;
		var h = window.innerHeight;
		console.log(w);
		console.log(h);
		var scale = Math.min(w/768,h/1024) * ratio;
		var fsize = 9 + 1/getDevicePixelRatio()*13;
		$('.vjs-control').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'4em'});
		$('.vjs-control-bar').css({height:getDevicePixelRatio() > 1?((4 - getDevicePixelRatio() + 1 ) + 'em'):'4em',bottom:0});
		if(lib.isFullscreen()) {
			$('.contentWrap').css({width:w,height:h,position:'absoulte','top':0,'left':0});
			$('#videoPlayer').css({'margin-left':'0', 'margin-top':'0'});
			try {
				vplayer.width(w);
				vplayer.height(h);
			}catch(err) {

			}
			var scale = Math.min(w/768,h/1024);
			//$('.gameContent').css({width:768,height:1024,transform:'scale(' +scale + ',' + scale + ')','margin-left':0})
			$('.gameContent').css({width:768,height:1024,transform:'scale(' +scale + ',' + scale + ')'});
			return;
		}

		$('.wrap').css({width:Math.round(768*scale),height:Math.round(1024*scale),left:Math.round(w*ratio-768*scale)/2});
		$('.title').css({width:Math.round(768*scale),height:Math.round(1024*scale),right:0});
		$('.content').css({width:Math.round(768*scale),height:Math.round(1024*scale)});
		$('.contentWrap').css({position:'relative',width:Math.round(768*scale),height:Math.round(1024*scale)});
		$('.gameContent').css({width:Math.round(768),height:Math.round(1024),transform:'scale(' + 1 * scale + ',' + 1 * scale + ')','margin-left':0});
		$('.gameContent').css({width:Math.round(768),height:Math.round(1024),'-webkit-transform':'scale(' + 1 * scale + ',' + 1 * scale + ')','margin-left':0});
		$('#game_canvas').css({width:768,height:1024,margin:0});
		$('#game_canvas').attr('width', '768px');
		$('#game_canvas').attr('height', '1024px');
		//$('#videoPlayer').css({'margin-left':Math.round(132*scale), 'margin-top':Math.round(67*scale)});
		try {
			vplayer.width(Math.round(768*scale));
			vplayer.height(Math.round(1024*scale));

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
		var scale = Math.min(w/768,h/1024);

		scale = Math.round(scale * 100) / 100;
		if(lib.isFullscreen()) {

			$('.wrap').css({'transform':'none'});
			$('.videoContent').css({width:'100%',height:'100%','transform':'none'});

			$('.gameContent').css({width:'100%',height:'100%','transform':'none'});

		} else {

			$('.wrap').css({'transform':'scale('+scale+')','left':(w-768*scale)/2});

			$('.gameContent').css({width:768,height:1024,'transform':'scale('+(initRatio/scale)+')'});
			/*$('.nav').css({height:70*scale,top:650*scale})
			 $('.nav ul').css({transform:'scale(' + scale + ')','margin-left':(w-1145*scale)/2})*/
		}
		try {
			if(lib.isFullscreen()) {
				vplayer.width(w/ratio);
				vplayer.height(h/ratio);
			} else {
				vplayer.width(768*scale/initRatio);
				vplayer.height(1024*scale/initRatio)
			}

		} catch(err) {
			setTimeout(function(){
				if(lib.isFullscreen()) {
					vplayer.width(w);
					vplayer.height(h);
				} else {
					vplayer.width(768*scale);
					vplayer.height(1024*scale)
				}
			},1000)
		}
	};

})(screenApi);

function gloalHandle(e) {
	screenApi.toggleFullscreen();
}
window.addEventListener('load',function(){
	//vplayer = videojs('videoPlayer',{controls:true,width:768,height:1024,preload:'auto',autoplay:true,loop:false},function(){
	//	vplayer.on('play', function(){
	//		console.log('play');
	//	});
	//	vplayer.on("pause",function(){
	//		console.log('stop');
	//	});
	//});

	var isMobile = window.matchMedia("only screen and (max-width: 1000px)");
	if (!isMobile.matches) {
		$('#download_btn').show();
	} else {
		$('#download_btn').hide();
	}

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
	switchVideo(true);
	vplayer.src({type:'video/mp4',src:vfile});
	var callback = function(){
		vplayer.off("ended", arguments.callee);
		if(onComplete) {
			onComplete();
		}
	}
	vplayer.on("ended", callback);
}

function showPart(id) {
	$('#down').css('display','none');
	GameClass.clean();
	switch(id) {
		case '2-1':
			currentID = id;
			if(currentID == id) GameClass.startGame('GameHd21');
			break;
		case '2-2':
			currentID = id;
			if(currentID == id) GameClass.startGame('GameHd22');
			break;
		case '8-1':
			currentID = id;
			if(currentID == id) GameClass.startGame('GameHd81');
			break;
	}
}

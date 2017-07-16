window.addEventListener('load',function(){
    vplayer = videojs('videoPlayer',{controls:true,width:640,height:360,pxpreload:'auto',loop:false},function(){
        vplayer.on('play', function(){
            console.log('play');
        });
        vplayer.on("pause",function(){
            console.log('stop');
        });
    });

    vplayer.src({type:'video/mp4',src:'video/tomorrow001.mp4'});
    vplayer.play();
});
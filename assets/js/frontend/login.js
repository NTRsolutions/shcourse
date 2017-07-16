/**
 * Created by Administrator on 7/4/2017.
 */

$(window).load(function(){

    //fitWindow();
    var loginBtnImg = $('.login_button_image');
    var bacHomeBtn = $('.back_home_btn');
    bacHomeBtn.mouseover(function(){
        $('#back_image').attr('src',base_url+'assets/images/frontend/login/back_home_hover.png');
    });
    bacHomeBtn.mouseout(function(){
        $('#back_image').attr('src',base_url+'assets/images/frontend/login/back_home.png');
    });
    loginBtnImg.mouseover(function(){
        $(this).attr('src', base_url+'assets/images/frontend/login/login_hover.png');
    });
    loginBtnImg.mouseout(function(){
        $(this).attr('src', base_url+'assets/images/frontend/login/login.png');
    });
    $(window).resize(function(){
       fitWindow();
    });
    $('#username').focus();
    function fitWindow()
    {
        var fontHeight = window.innerHeight*0.027;
        var fontWidth = window.innerWidth*0.015;
        var realFontSize = (fontHeight>fontWidth)? fontWidth:fontHeight;
        $('#username').css('font-size',realFontSize+'px');
        $('#password').css('font-size',realFontSize+'px');
    }
    fitWindow();
});

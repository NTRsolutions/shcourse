var mode = 'both_fix'; // vertical_fix, both_fix

var img_w, img_h, scale;
//var page_num, offset_page;
var transform_y;
var myElement;

var current_page = window.location.hash;
if( current_page != '' )
    current_page = current_page.substring(6);
else
    current_page = 1;


var is_mobile = true;

function doOnOrientationChange() {
    console.log(window.orientation);

    resize();
}
window.addEventListener('orientationchange', doOnOrientationChange);

//window.addEventListener("beforeunload", function (e) {
//    var confirmationMessage = "\o/";
//
//    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//    return confirmationMessage;                            //Webkit, Safari, Chrome
//});

window.addEventListener('load',function(){

    var cur_href = window.location.href;
    if( cur_href.indexOf('page01.html') >= 0  ){
        if (localStorage.login != 'true' ) {
            window.location = 'start.html';
        }
    }


    var isMobile = window.matchMedia("only screen and (max-width: 768px)");
    if (!isMobile.matches) {
        $('#ico_31').attr('href', 'page03_vidd01.html');
        $('#ico_61').attr('href', 'page06_vidd01.html');
        $('#ico_81').attr('href', 'page08_vidd01.html');
        $('#ico_83').attr('href', 'page08_vidd02.html');

        is_mobile = false;
    }

    var direction;
    transform_y = 0;
    myElement = document.getElementById('content');

    var mc = new Hammer(myElement);

    mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

    mc.on("panup press pandown", function(ev) {
        direction = ev.type;

        if( mode == 'both_fix' ){
            if(is_mobile)
                page_slide(ev.deltaY);
        }

    });

    mc.on("panend", function(ev) {
        console.log('panend');

        if( mode == 'both_fix' ){
            transform_y = ypos( transform_y + ev.deltaY );
        }

        if( direction == 'pandown' ){
            if( mode == 'vertical_fix' ) {
                page_up();
            }
        } else {
            if( mode == 'vertical_fix' ) {
                page_down();
            }
        }
    });

    var img_arr = document.getElementsByClassName("page_img");
    for (var i = 0, len = img_arr.length; i < len; i++) {
        img_arr[i].addEventListener('click', myFunction, false);
    }

    resize();

    if( localStorage.login != 'true' ){
        $('.back-btn').attr('href', 'start.html');
    }
});



function resize(){
    var w = window.innerWidth;
    var h = window.innerHeight;

    switch(window.orientation) {
        case 90:
            mode = 'both_fix';
            break;
        case -90:
            mode = 'both_fix';
            break;
        default:
            mode = 'vertical_fix';
            break;
    }

    if( mode == 'vertical_fix' ){
        scale = h/1024;
        img_w = 768*scale;
        img_h = h;
    } else if( mode == 'both_fix' ){
        scale = w/768;
        img_h = 1024*w/768;
        img_w = w;
    }

    if (is_mobile == false) {
        scale = h/1024;
        img_w = 768*h/1024;
        img_h = h;
    }

    var scale1 = 1;
    if( is_mobile ){
        var w = window.innerWidth;
        scale1 = w/img_w;
    }

    $('.content-wrap').css('width', img_w*scale1);
    $('.content').css('width', img_w*scale1);

    $(".page_img").attr('width', img_w*scale1);
    $(".page_img").attr('height', img_h);

    $('#ico_11').css({ 'left': (600*scale*scale1)+'px', 'top': (618*scale)+'px' });

    $('#ico_21').css({ 'left': (40*scale*scale1)+'px', 'top': (1*(img_h+4)+670*scale)+'px' });
    $('#ico_22').css({ 'left': (40*scale*scale1)+'px', 'top': (1*(img_h+4)+290*scale)+'px' });

    $('#ico_31').css({ 'left': (545*scale*scale1)+'px', 'top': (2*(img_h+4)+175*scale)+'px' });
    $('#ico_32').css({ 'left': (625*scale*scale1)+'px', 'top': (2*(img_h+4)+175*scale)+'px' });
    $('#ico_33').css({ 'left': (545*scale*scale1)+'px', 'top': (2*(img_h+4)+295*scale)+'px' });

    $('#ico_51').css({ 'left': (680*scale*scale1)+'px', 'top': (4*(img_h+4)+480*scale)+'px' });
    $('#ico_52').css({ 'left': (680*scale*scale1)+'px', 'top': (4*(img_h+4)+640*scale)+'px' });
    $('#ico_53').css({ 'left': (680*scale*scale1)+'px', 'top': (4*(img_h+4)+780*scale)+'px' });

    $('#ico_61').css({ 'left': (40*scale*scale1)+'px', 'top': (5*(img_h+4)+760*scale)+'px' });
    $('#ico_62').css({ 'left': (40*scale*scale1)+'px', 'top': (5*(img_h+4)+130*scale)+'px' });

    $('#ico_81').css({ 'left': (40*scale*scale1)+'px', 'top': (7*(img_h+4)+685*scale)+'px' });
    $('#ico_82').css({ 'left': (40*scale*scale1)+'px', 'top': (7*(img_h+4)+485*scale)+'px' });
    $('#ico_83').css({ 'left': (40*scale*scale1)+'px', 'top': (7*(img_h+4)+860*scale)+'px' });
    $('#ico_84').css({ 'left': (40*scale*scale1)+'px', 'top': (7*(img_h+4)+130*scale)+'px' });
    $('#ico_85').css({ 'left': (110*scale*scale1)+'px', 'top': (7*(img_h+4)+485*scale)+'px' });
    $('#ico_86').css({ 'left': (180*scale*scale1)+'px', 'top': (7*(img_h+4)+485*scale)+'px' });

    var img_width =  $('#scan').width();

    if( is_mobile ){
        $('#scan').css({ 'left': ((w/2-img_width)/2)+'px' });
        $('#ebook').css({ 'right': ((w/2-img_width)/2)+'px' });
    }
    $('#scan').css({ 'top': (80*scale)+'px' });
    $('#ebook').css({ 'top': (80*scale)+'px' });

    page_navigation(current_page);
}

function page_down(){
    if( current_page >= total_pages ){
            return;
    }

    current_page++;
    transform_y = -(current_page-1) * (img_h + 4);

    var value = 'translate3d(0px, ' + transform_y + 'px, 0)';
    $('.content').css('-webkit-transition','-webkit-transform 1s');
    $('.content').css('transition','transform 1s');
    $('.content').css('webkitTransform',value);
    $('.content').css('mozTransform',value);
    $('.content').css('transform',value);

    //$('.back-btn').css('top', (-transform_y+20)+'px');
};

function page_up(){
    if( current_page <= 1 ){
        if( transform_y == -(current_page-1)*(img_h + 4) )
            return
    }

    if( transform_y == -(current_page-1)*(img_h + 4) )
        current_page--;
    transform_y = -(current_page-1) * (img_h + 4);
    console.log(transform_y);

    var value = 'translate3d(0px, ' + transform_y + 'px, 0)';
    $('.content').css('-webkit-transition','-webkit-transform 1s');
    $('.content').css('transition','transform 1s');
    $('.content').css('webkitTransform',value);
    $('.content').css('mozTransform',value);
    $('.content').css('transform',value);

    //$('.back-btn').css('top', (-transform_y+20)+'px');
}

function page_slide(delta_y){
    var trans_y = ypos( transform_y + delta_y );
    current_page = get_page(trans_y);
    console.log(current_page);

    var value = 'translate3d(0px, ' + trans_y + 'px, 0)';
    $('.content').css('-webkit-transition','-webkit-transform 0.5s');
    $('.content').css('transition','transform 0.5s');
    $('.content').css('webkitTransform',value);
    $('.content').css('mozTransform',value);
    $('.content').css('transform',value);
    //myElement.style.webkitTransform = value;
    //myElement.style.mozTransform = value;
    //myElement.style.transform = value;

    //$('.back-btn').css('top', (-transform_y+offset_page * (img_h + 4)+20)+'px');
};

function page_navigation( page_num ){
    transform_y = -(page_num-1) * (img_h + 4);

    var value = 'translate3d(0px, ' + transform_y + 'px, 0)';
    $('.content').css('webkitTransform',value);
    $('.content').css('mozTransform',value);
    $('.content').css('transform',value);
    //myElement.style.webkitTransform = value;
    //myElement.style.mozTransform = value;
    //myElement.style.transform = value;
};

function get_page( ypos ){
    var page_num = Math.trunc(-ypos/(img_h+4)+1);
    return page_num;
}

function ypos( ypos ){
    if( ypos < -((total_pages)*(img_h + 4)-(window.innerHeight+4)) ){
        return -((total_pages)*(img_h + 4)-(window.innerHeight+4));
    } else if( ypos > 0 ){
        return 0;
    }

    return ypos;
};

function myFunction(e) {
    var pos_y = e.clientY;
    if( pos_y < 50*scale ){
        page_up();
    } else if(pos_y > 974*scale) {
        page_down();
    }
}
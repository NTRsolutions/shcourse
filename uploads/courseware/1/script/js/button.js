

window.addEventListener('load',function(){
    $('#page_nav_prev').click(function(){
        prevPage();
    });
    $('#page_nav_next').click(function () {
        nextPage();
    });

    $('#btn_comment').click(function(){
        select_effect($(this));

        if(cur_language=='_cn')
        {
            return;
        }
        if( typeof current_page == 'undefined' || current_page == null ){
            window.location = 'index.html?comment';
            return;
        }
        changeMode( 'comment' );
    });

    $('#btn_words').click(function(){
        select_effect($(this));
        changeMode( 'words' );
    });
    $('#btn_scriptread').click(function(){
        select_effect($(this));
        window.location = 'read.html';
     });

    $('#btn_song').click(function(){
        select_effect($(this));
        window.location = 'song.html'
    });

    $('#btn_scriptmake').click(function(){
        select_effect($(this));
        window.location = 'makescript.html'
    });

    $('#btn_headmake').click(function(){
        select_effect($(this));
        window.location = 'makehead.html'
    });


});

function select_effect(elem){
    remove_select_effect();
    var img_src = $(elem).find('img').attr('src');
    img_src = img_src.replace('.png', '') + '_hover.png';
    $(elem).find('img').attr('src', img_src);
}
function remove_select_effect(){
    var elems = $('.btn_elem img');
    for( var i=0; i<elems.length; i++ ){
        var elem = elems[i];
        var img_src = $(elem).attr('src');
        img_src = img_src.replace('_hover', '');
        //alert(img_src);
        $(elem).attr('src', img_src);
    }
}


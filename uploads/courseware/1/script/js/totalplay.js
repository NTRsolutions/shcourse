var page_arr;
var audio = new Audio();

var current_page = 0;
var highlighter;
var cur_language = '_en';
var total_paly_status = true;

window.addEventListener('load',function(){
    getPagesData();

    $('#sound_play_btn').click(function(){
        if(total_paly_status)
        {
            $(this).attr('src','images/sound_playing.gif');
            soundTotalPlay('d_0');
            total_paly_status = false;
        }else
        {
            $(this).attr('src','images/sound.png');
            audio.pause();
            total_paly_status = true;
        }

    });

    var param = window.location.search.substr(1);
    if( param == 'comment' ){
        changeMode('comment')
    } else {
       // soundTotalPlay('d_0');
        if( total_paly_status == true )
            $('#sound_play_btn').trigger('click');
    }
    $('.dialog_text').click(function(){

        if(cur_language=='_cn')
        {
            return;
        }

        if( current_mode == 'sound' ){
            audio.pause();
            var idx = $(this).attr('id');
            idx = parseInt(idx.substr(2));

            audio.src = 'sound/script/' + $(this).data('sound');
            audio.play();
            audio.onended = function(){};

            highlightText(idx);
        } else if( current_mode == 'comment' ){
            var idx = $(this).attr('id');
        }
    });

    $('.read_text').click(function(e){
        var pos_x = e.clientX;
        var pos_y = e.clientY;
        pos = getModalPos( pos_x, pos_y );
        showReadModal();
    });
    $('#language_status_btn').click(function () {

        if(cur_language=='_en'){
            $(this).attr('data-language','western');
            $(this).text('英文');
            $('.page_en').hide();
            $('.page_cn').show();
            cur_language = '_cn';
            clicked_translate = '1';
            audio.pause();
            //soundTotalPlay('d_'+current_page);
        }else {

            $(this).attr('data-language','china');
            $(this).text('中文');
            $('.page_en').show();
            $('.page_cn').hide();
            cur_language = '_en';
            audio.play();
           // soundTotalPlay('d_'+current_page);
        }
    });
    $('#btn_print').click(function(){

        var oldWidth = $('#page_'+current_page).width();
        html2canvas($('#page_'+current_page), {
            onrendered: function(canvas) {
                // canvas is the final rendered <canvas> element
                $('#page_'+current_page).width(oldWidth);
                var myImage = canvas.toDataURL("image/png");
                //window.open(myImage);
                var doc1 = new jsPDF('p', 'mm', [900, 485]);
                doc1.addImage(myImage, 'PNG',10,100);
                //doc1.save('script.pdf');
                doc1.autoPrint();
                window.open(doc1.output('bloburl'), '_blank');
            },width:1920,height:1500
        });

    });
});
function getPagesData(){
    page_arr = new Array();

    var page_elems = $('.page');

    for( var i=0; i<page_elems.length; i++ ){
        var d_arr = new Array();

        var page_id = $(page_elems[i]).attr('id');
        var dialog_elems = $(page_elems[i]).find('.dialog_text');
        for( var j=0; j<dialog_elems.length; j++ ){
            var dialog_id = $(dialog_elems[j]).attr('id');
            var sound =  $(dialog_elems[j]).data('sound');
            d_arr.push({
                id: dialog_id,
                sound: sound
            })
        }
        page_arr.push({
            id: page_id,
            dialog: d_arr
        })
    }

}
function getDialogData( d_id ){
    d_id = d_id+cur_language;
    if( page_arr[current_page] === undefined || page_arr[current_page] === null )
        return false;
    var dialogs = page_arr[current_page].dialog;
    for( var i=0; i<dialogs.length; i++ ){
        if(dialogs[i].id == d_id){
            return dialogs[i];
        }
    }
    return false;
}
function soundTotalPlay(d_id){
    var dialogs = page_arr[current_page].dialog;
    var dialog = getDialogData( d_id );
    if( dialog != false ){

        audio.src = 'sound/script/' + dialog.sound;
        audio.play();
        highlightText(d_id);

    }
    var a = "" + d_id;
    var num = parseInt(a.substr(2));
    num++;
    d_id = 'd_' + num;
    var new_dialog = getDialogData( d_id );
    if( new_dialog != false ){
        audio.onended = function(){
            setTimeout( soundTotalPlay.bind(null, d_id), 100);
        }
    }else{
        current_page++;
        new_dialog = getDialogData( d_id );
        current_page--;
        if( new_dialog != false ){
            audio.onended = function(){
                current_page++;
                displayPage(current_page);
                soundTotalPlay(d_id);
            }

        } else {
            current_page--;
            audio.onended = null;
        }
    }
}
function highlightText(d_id){
    $('.dialog_text').removeClass('sel');
    $('#'+d_id+cur_language).addClass('sel');
}


function prevPage(){
    if( total_paly_status == false )
        $('#sound_play_btn').trigger('click');
    audio.pause();

    if( current_page-1 < 0 )
        return ;
    current_page--;
    displayPage(current_page);
}

function nextPage(){
    if( total_paly_status == false )
        $('#sound_play_btn').trigger('click');
    audio.pause();

    if( current_page+1 >= page_arr.length )
        return ;
    current_page++;
    displayPage(current_page);
}





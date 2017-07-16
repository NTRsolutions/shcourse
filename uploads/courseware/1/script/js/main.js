var current_course = '';
var current_mode = 'sound';
var cur_language = '_en';
var word_modal_status = true;


window.addEventListener('load',function(){
    current_course = $('#course_name').val();

    $('#words_modal').click(function(){
        $(this).hide();
    })
});


function changeMode( mode ){
    hideWords();
    current_mode = mode;

    if( current_mode == 'sound' ){
        audio.pause();
        $('.dialog_text').css('user-select', 'none');
        $('.dialog_text').css('cursor', 'pointer');
        $('.dialog_text').hover(function(){
            $(this).css('color', '#f99');
        });
    } else if( current_mode == 'comment' ){
        if( total_paly_status == false )
            $('#sound_play_btn').trigger('click');
        audio.pause();
        $('.dialog_text').removeClass('sel');
        $('.dialog_text').css('user-select', 'text');
        $('.dialog_text').css('cursor', 'text');
        $('.dialog_text').hover(function(){
            $(this).css('color', '#000');
        });

        displayPage( current_page );
    } else if( current_mode == 'words' ){
        if( total_paly_status == false )
            $('#sound_play_btn').trigger('click');
        audio.pause();
        if(word_modal_status)
        {
            showWords();
            word_modal_status = false;
        }else{
            hideWords();
            word_modal_status = true;
        }
    } else if( current_mode == 'print' ){

    }
}





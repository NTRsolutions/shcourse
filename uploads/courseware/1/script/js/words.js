
window.addEventListener('load',function(){
    var wrap = $('.wrap');
    var words_modal = $('<div id="words_modal"></div>');
    var modal_header = $('<div class="modal-header">' + new_words.title + '<span class="close" id="words_close">&times;</span></div>');
    var modal_content = $('<div class="modal-body"></div>');
    var words_sec = $('<div class="word_sec"></div>');

    for( var i=0; i<new_words.words.length; i++ ){
        words_sec.append('<p><span style="font-weight: bold">' + new_words.words[i].word + '</span> - <span>' + new_words.words[i].comment + '</span></p>');
    }

    modal_content.append(words_sec);
    words_modal.append(modal_header, modal_content);
    wrap.append(words_modal);

    $('#words_close').click(function(){
        hideWords();
    })
});

function showWords(){
    $('#words_modal').show();
}

function hideWords(){
    $('#words_modal').hide();
}



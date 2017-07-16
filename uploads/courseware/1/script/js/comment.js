var selection;
var sel_text = '';
var is_commentopen = false;
var current_comment = '';
var current_note;
var modal;
var pos = {left:0, top:0};

window.addEventListener('load',function(){
    rangy.init();
    highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));

    highlighter.addClassApplier(rangy.createClassApplier("note", {
        ignoreWhiteSpace: true,
        elementTagName: "a",
        elementProperties: {
            onmouseup: function(e) {
                e.preventDefault();

                is_commentopen = true;
                current_note = $(this);
                current_note = current_note[0];
                selection = rangy.getSelection();
                $('#old_selected_text').text($(this).text());
                $('#modal_text').val($(this).attr('data-comment'));
                var pos_x = e.clientX;
                var pos_y = e.clientY;
                pos = getModalPos( pos_x, pos_y );
                openModal();
            }
        },
        elementAttributes: {
            'data-comment':''
        }
    }));

    var serializedHighlights = localStorage.getItem('kbjComment');

    displayPage(0);

    modal = document.getElementById('comment_modal');
    $('.dialog_text').mouseup(function(e){

        if(cur_language=='_cn') return;
        if( is_commentopen == true ) return;
        var pos_x = e.clientX;
        var pos_y = e.clientY;

        //console.log(pos_x+':'+pos_y);

        pos = getModalPos( pos_x, pos_y );
        openModal();
        //noteSelectedText();
    });
    var close = document.getElementById("comment_close");
    close.onclick = function() {
        modal.style.display = "none";
        saveComment();
        is_commentopen = false;
    }
});
function displayPage(i){
    var pages = $('.page');
    if( i >= pages.length )
        return;

    $('.page').hide();
    $(pages[i]).show();

    if ( current_mode == 'comment' && typeof(Storage) !== "undefined") {
        var serializedHighlights = localStorage.getItem('kbjComment');

        if (serializedHighlights != undefined && serializedHighlights != null) {
            highlighter.deserialize(serializedHighlights);
        }
    }
}
function openModal(){
    var d_id = $(this).attr('id');
    if( current_mode == 'comment' ){
        if( is_commentopen == false ){
            if( !isValidationSelect())
                return;
            sel_text = snapSelectionToWord();
            $('#old_selected_text').text(sel_text);
            $('#modal_text').val('');
        }
        modal.style.display = "block";
        $('.modal-content').css({left: pos.left+'px', top: pos.top+'px'});
    }
}
function isValidationSelect(){
    var sel = rangy.getSelection();
    var sel_string = sel.toString();
    if( sel_string == '')
        return false;

    return true;
}

function snapSelectionToWord() {
    selection = rangy.getSelection();
    selection.expand("word");
    noteSelectedText();
    return selection.toString();
}
function getModalPos( pos_x, pos_y ){
    var left=0, top=0;
    if(pos_x < 150)
        left = 0;
    else
        left = pos_x-150;

    if( pos_y > 720-300 )
        top = pos_y-330;
    else
        top = pos_y+30;

    return {left:pos_x-50, top:pos_y+20};
    //return {left:left, top:top}
}
function saveComment(){
    current_comment = $('#modal_text').val();
    var node = current_note;
    $(node).attr('data-comment', current_comment);

    if( sel_text == '' || current_comment == '' ){
        if( is_commentopen == true && sel_text == '' && current_comment != '' ){
            console.log('skip');
        } else {
            var sel = localStorage.getItem('kbjSelection');
            highlighter.unhighlightSelection(selection);
            return;
        }
    }
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('kbjComment', highlighter.serialize());
    } else {
        // Sorry! No Web Storage support..
    }
}

function noteSelectedText() {
    highlighter.highlightSelection("note");
    current_note = selection.getRangeAt(0).getNodes([1], function(el) {
        return el.tagName == "A" && el.className == "note";
    });
    current_note = current_note[0];
}
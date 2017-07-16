var character_pages = 0;
var cur_character_page = 0;
var cur_character = '';
var canvas;

var canvas_w = 0;
var canvas_h = 0;
window.addEventListener('load',function(){
    canvas_w = $('#sheet').width();
    canvas_h = $('#sheet').height();
    $('#sheet').attr('width', canvas_w);
    $('#sheet').attr('height', canvas_h);

    generateCharacters();

    canvas = new fabric.Canvas('sheet');
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#ff0000";

    cur_character = $('.character-elem');
    cur_character = $(cur_character[0]).data('name');
    fabric.Image.fromURL('images/characters/monkey-bk.png', function(myImg) {
        console.log(myImg.width);
        var pos_x = (canvas_w-myImg.width)/2;
        var pos_y = (canvas_h-myImg.height)/2;
        //i create an extra var for to change some image properties
        var img = myImg.set({ left: pos_x, top: pos_y});
        canvas.add(img);
    });

    $('#pagedown').click( function(){
        cur_character_page++;
        if( cur_character_page >= character_pages )
            cur_character_page = character_pages-1;

        $('.characters-page').hide();
        var pages = $('.characters-page');
        $(pages[cur_character_page]).show();
    } );

    $('#pageup').click( function(){
        cur_character_page--;
        if( cur_character_page < 0 )
            cur_character_page = 0;

        $('.characters-page').hide();
        var pages = $('.characters-page');
        $(pages[cur_character_page]).show();
    } );
    $('#head_save_btn').click(function () {
        var filename = $('#dbfilename').val();
        var dataURL = canvas.toDataURL();
        ajax_url = base_url + 'contents/upload';
        data = {
            courseware_id: courseware_id,
            type: 'head',
            /*title: cur_character,*/
            title:filename,
            new_filename:filename,
            imgBase64: dataURL
        };
        $.post(
            ajax_url,
            data,
            function( data, status ){
                if( status == 'success' && typeof(data) != 'undefined' ){
                    $('#dbheadModal').modal('toggle');
                }else{
                    $('#dbheadModal').modal('toggle');
                    alert('无法保存脚本文件!');
                }
            }
        );
    });
    $('#dbfilename').keyup(function(){

        if($(this).val()=='')
        {
            $(this).css({"border-color": "#f00",
                "border-width":"1px",
                "border-style":"solid"});
        }else
        {
            $(this).css({"border-color": "#ccc",
                "border-width":"1px",
                "border-style":"solid"});
        }
    });
    $('.character-elem').click(function(){
        cur_character = $(this).data('name');
        canvas.clear();
        fabric.Image.fromURL('images/characters/' + cur_character + '-bk.png', function(myImg) {
            console.log(myImg.width);
            var pos_x = (canvas_w-myImg.width)/2;
            var pos_y = (canvas_h-myImg.height)/2;
            //i create an extra var for to change some image properties
            var img = myImg.set({ left: pos_x, top: pos_y});
            canvas.add(img);
        });
    })

    $('#pencil_red').click(function(){
        canvas.freeDrawingBrush.color = "#ff0000";
        $('#sheet').css({'cursor':'url(./images/makehead/bucket.cur),auto'});
    })
    $('#pencil_yellow').click(function(){
        canvas.freeDrawingBrush.color = "#ffff00";
    })
    $('#pencil_green').click(function(){
        canvas.freeDrawingBrush.color = "#00ff00";
    })
    $('#pencil_blue').click(function(){
        canvas.freeDrawingBrush.color = "#0000ff";
    })
});

function generateCharacters(){

    var elem = '';

    for( var i=0; i<characters.length; i++ ){
        if( characters.length>3 && (i%3 == 0) ){
            character_pages++;
            elem += '<div class="characters-page" style="display: none">';
        }

        var elem = elem + '<div class="character-elem" data-name="' + characters[i].name + '"><img src="' + characters[i].img + '"></div>';

        if( characters.length>3 && (i%3 == 2) ){
            elem += '</div>';
        }
    }
    var chrarcterImg = $( elem );
    $('#characters').append(chrarcterImg);

    $('.characters-page').hide();
    var pages = $('.characters-page');
    $(pages[cur_character_page]).show();

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function save_head()
{
    var filename = 'head' + Math.round(new Date().getTime()) + courseware_id;
    jQuery.noConflict();
    $('#dbfilename').val(filename);
    $('#dbheadModal').modal('show');
}
$('#makehead_print').click(function () {


    html2canvas($('.canvas-container'), {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            // window.open(myImage);
            var doc = new jsPDF('p', 'mm', [280, 260]);
            doc.addImage(myImage, 'PNG', 5,5);
            /*doc.save('head.pdf');*/
            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');

        }
    });

});





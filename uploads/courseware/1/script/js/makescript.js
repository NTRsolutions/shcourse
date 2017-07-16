var character_pages = 0;
var cur_character_page = 0;

window.addEventListener('load',function(){
    generateCharacters();

    if(login_status=="1")
    {
        $('.save-wrap').show();
    }
});
function save_script()
{
    jQuery.noConflict();
    var filename = 'script' + Math.round(new Date().getTime()) + courseware_id;
    $('#dbfilename').val( filename );
    $('#dbscriptModal').modal('show');
}
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

    $('#script_save_btn').click(function () {
        var filename = $('#dbfilename').val();
        var title = $('#script_name').val();
        var content = $('#script_content').val();
        ajax_url = base_url + 'contents/upload';
        script_text = {
            coursewareId: courseware_id,
            new_filename:filename,
            type: 'script',
            title: title,
            content: content
        };
        $.ajax({
            type:'post',
            url:ajax_url,
            dataType: "json",
            data:script_text,
            success:function(res){
                if(res.status=='success'){
                    $('#dbscriptModal').modal('toggle');
                }else{
                    $('#dbscriptModal').modal('toggle');
                    alert('无法保存脚本文件!');
                }
            }
        });
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
        var name = $(this).data('name');

        var cursorPos = $('#script_content').prop('selectionStart');
        var v = $('#script_content').val();
        var textBefore = v.substring(0, cursorPos);
        var textAfter  = v.substring(cursorPos, v.length);

        $('#script_content').val(textBefore + capitalizeFirstLetter(name) + ': ' + textAfter);
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$('#makescript_print').click(function () {

    var doc = new jsPDF();
    doc.addFont('yanhai.ttf', 'HanYiXiJianHeiJian', 'normal', 'Identity-H');

    //doc.setFont('MsGothic');        // set font
    doc.setFontSize(20);
    doc.setTextColor(0,0,0);
    doc.setCharSpace(1);

    doc.setDefaultFonts(0, 'Times');    //English default
    //doc.setDefaultFonts(1, 'MagicR');    //Korean default
    doc.setDefaultFonts(3, 'HanYiXiJianHeiJian');         //Chinese default
    // doc.setDefaultFonts(2, 'MsGothic');        //Japanese default

    var scriptTitle = $('#script_name').val();
    if(scriptTitle.length==0)
    {
        alert('标题为空!');
        return;
    }
    var script_dialog_text = $('#script_content').val();
    var scripts_lines = script_dialog_text.split('\n');
    doc.drawText(80,15,scriptTitle);
    doc.setFontSize(13);
    var linesRowCnt  = 3;
    var onePageHeight = doc.internal.pageSize.height-20;
    for(var i=0;i<scripts_lines.length;i++)
    {
        if(scripts_lines[i].length!=0){
            var pageHeight = linesRowCnt*10;
            if(pageHeight>onePageHeight)
            {
                doc.addPage();
                pageHeight = 20;
                linesRowCnt =2;
            }
            doc.drawText(10,pageHeight,scripts_lines[i]);
            linesRowCnt++;
        }
    }
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
});





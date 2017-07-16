/**
 * Created by Administrator on 7/8/2017.
 */
$(window).ready(function(){

    var imageDir = baseURL + "assets/images/frontend";
    var shareBtn = $('.share_content_btn');
    var scriptPrintBtn = $('.scriptPrint_Icon');
    var headImgPrintBtn = $('.headImgPrint_Icon');
    shareBtn.mouseover(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/workshare_hover.png) no-repeat",'background-size' :'100% 100%'});
    });
    shareBtn.mouseout(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/workshare.png) no-repeat",'background-size' :'100% 100%'});
    });
    scriptPrintBtn.mouseover(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/scriptprint_hover.png) no-repeat",'background-size' :'100% 100%'});
    });
    scriptPrintBtn.mouseout(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/scriptprint.png) no-repeat",'background-size' :'100% 100%'});
    });
    headImgPrintBtn.mouseover(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/headprint_hover.png) no-repeat",'background-size' :'100% 100%'});
    });
    headImgPrintBtn.mouseout(function(){
        $(this).css({"background":"url("+imageDir+"/mywork/headprint.png) no-repeat",'background-size' :'100% 100%'});
    });
    scriptPrintBtn.click(function () {

        var doc = new jsPDF();
        doc.addFont('yanhai.ttf', 'HanYiXiJianHeiJian', 'normal', 'Identity-H');

        //doc.setFont('MsGothic');        // set font
        doc.setFontSize(20);
        doc.setTextColor(255,0,0);
        doc.setCharSpace(1);

        doc.setDefaultFonts(0, 'Times');    //English default
        //doc.setDefaultFonts(1, 'MagicR');    //Korean default
        doc.setDefaultFonts(3, 'HanYiXiJianHeiJian');         //Chinese default
        // doc.setDefaultFonts(2, 'MsGothic');        //Japanese default
        var scriptTitle = $('.scriptwork_title').text();
        if(scriptTitle.length==0)
        {
            alert('????!');
            return;
        }
        doc.drawText(80,15,scriptTitle);
        doc.setTextColor(0,0,0);
        doc.setFontSize(13);
        var script_content = $('.scriptwork-content');
        var linesRowCnt  = 3;
        var onePageHeight = doc.internal.pageSize.height-20;
        script_content.each(function(){

            var lineScript = $(this).text();
            var tempScript = lineScript.trim();
            if(tempScript.length!=0)
            {

                console.log(tempScript.length+tempScript);
                var pageHeight = linesRowCnt*10;
                        if(pageHeight>onePageHeight)
                        {
                            doc.addPage();
                            pageHeight = 20;
                            linesRowCnt =2;
                        }
                        doc.drawText(10,pageHeight,tempScript);
                        linesRowCnt++;
            }
        });
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    });
    headImgPrintBtn.click(function(){

        html2canvas($(".work_view_area"), {
            onrendered: function(canvas) {
                // canvas is the final rendered <canvas> element
                var myImage = canvas.toDataURL("image/png");
                // window.open(myImage);
                var doc = new jsPDF('p', 'mm', [700, 500]);
                doc.addImage(myImage, 'PNG',0,0);
                //doc.save(contentTitle+'.pdf');
                doc.autoPrint();
                window.open(doc.output('bloburl'), '_blank');
            },width:700,height:500
        });
    });
    function shareContent(contentId)
    {
        $.ajax({
            type: "post",
            url: base_url+"work/share_work",
            dataType: "json",
            data: {content_id: contentId},
            success: function(res) {
                if(res.status=='success') {
                    $('#share_content_modal').modal('toggle');
                }
                else//failed
                {
                    alert("Cannot Share Work.");
                }
            }
        });
    }
    shareBtn.click(function(){
        $('#share_content_modal').modal({backdrop: 'static', keyboard: false});
    });
    $('#share_content_confirm_btn').click(function () {
        var contentId = $(this).attr('content_id');
        shareContent(contentId);
    });
    $('.shooting_share_content').click(function(){
        $('#share_content_modal').modal({backdrop: 'static', keyboard: false});
    });

});
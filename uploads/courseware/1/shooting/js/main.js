var Upload = function (file) {
    this.file = file;
};

Upload.prototype.getType = function() {
    return this.file.type;
};
Upload.prototype.getSize = function() {
    return this.file.size;
};
Upload.prototype.getName = function() {
    return this.file.name;
};
Upload.prototype.doUpload = function () {
    var that = this;
    var formData = new FormData();

    var new_filename = this.getName();
    new_filename = new_filename.split('.');
    new_filename = new_filename[0];

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);
    formData.append("type", "shooting");
    formData.append("courseware_id", courseware_id);
    formData.append("new_filename", new_filename);

    ajax_url = base_url + 'contents/upload';
    $.ajax({
        type: "POST",
        url: ajax_url,
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }
            return myXhr;
        },
        success: function (data) {
            // your callback here
        },
        error: function (error) {
            // handle error
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        //contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        processData: false,
        timeout: 60000
    });
};
Upload.prototype.progressHandling = function (event) {
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    var progress_bar_id = "#progress-wrp";
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(progress_bar_id + " .status").text(percent + "%");
};

window.addEventListener('load',function(){
    $('#file').click(function(){
        $('#video_file').trigger('click');
    })
    $('#video_file').change(function() {
        var vid = document.createElement('video');
        var fileURL = URL.createObjectURL(this.files[0]);
        vid.src = fileURL;
        vid.ondurationchange = function() {
            if( this.duration > 9*60 ){
                alert('You can\'t upload this video file. The file\'s duration is over 3mins.');
            } else {
                var file = $('#video_file')[0].files[0];
                var upload = new Upload(file);
                upload.doUpload();
            }
        };
    });
});
$('.index-btn-local').mouseover(function(){

    //$(this).css('background','url(./images/upload_hover.png');
    //$(this).css('background-size','100% 100%');

});



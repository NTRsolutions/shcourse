/**
 * Created by Administrator on 6/12/2017.
 */
var registerBtn = $('#sh_register_btn');
var nonregisterBtn = $('#sh_non_register_btn');
var imageDir = baseURL + "assets/images/frontend";
function imageResize(self) {
    self.height = window.innerHeight;
    self.width = window.innerWidth;
}
$('body').resize(function(){
    $('#bac_image').css({'width':window.innerWidth,'height':window.innerHeight});
});
registerBtn.mouseover(function () {
    registerBtn.css({"background":"url("+imageDir+"/home/login_hover.png) no-repeat",'background-size' :'100% 100%'});
});
registerBtn.mouseout(function () {
    registerBtn.css({"background":"url("+imageDir+"/home/login.png) no-repeat","background-size" : "100% 100%"});
});
nonregisterBtn.mouseover(function () {
    nonregisterBtn.css({"background":"url("+imageDir+"/home/jinru_hover.png) no-repeat","background-size" : "100% 100%"});
});
nonregisterBtn.mouseout(function () {
    nonregisterBtn.css({"background":"url("+imageDir+"/home/jinru.png) no-repeat","background-size" : "100% 100%"});
});

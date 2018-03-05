var deviceid=getUrlParam('deviceid');
var name=decodeURI(getUrlParam('name'));
$(function(){
	var $mainWrap=$('.main-wrap');
	$mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());

})

var Get_ClassDeclaration = {
                    url: "XAWebBanpai/Get_ClassDeclaration",
                    type: "Get",
                    data:{
                    deviceid:deviceid,
                    schoolid:window.schoolid
                }
            };
            commonFn(Get_ClassDeclaration, function(json) {
                if(json!=null)
                {
                    $("#detail").val(json.detail);
                    $(".signname").val(json.signName);
                    document.getElementById('declareid').value=json.id;
                    $('.main-wrap').contents().find('.text-box td').html(json.detail);
                    $('.main-wrap').contents().find('.bottom-class .name').html(json.signName);
                    $(".logo").attr("src",json.logo);
                }
                else
                    document.getElementById('declareid').value="0";
            })

$('.context-set textarea').keyup(function() {
    var _contextTxt = $(this).val();
    _contextTxt = _contextTxt.replace(/\r/gm, "<br/>");
    _contextTxt = _contextTxt.replace(/\n/gm, "<br/>");

    $('.main-wrap').contents().find('.text-box td').html(_contextTxt);
});
$('.context-set .signname').keyup(function () {
    var _signName = $(this).val();
    $('.main-wrap').contents().find('.bottom-class .name').html(_signName);
});

$("#save").click(function(){
    var declareid=$("#declareid").val();
    if(declareid=="0") declareid=0;
    var Update_ClassDeclaration = {
                    url: "XAWebBanpai/Update_ClassDeclaration",
                    type: "Get",
                    data:{
                    declareid:declareid,
                    deviceId:deviceid,
                    detail:$("#detail").val(),
                    signnane:$(".signname").val()
                }
            };
            commonFn(Update_ClassDeclaration, function(json) {
                if(json=="添加成功"||json=="修改成功")
                {
                    layer.msg(json, { time: 1000 }, function() {  
                        window.location.href="template.html?id="+deviceid+"&name="+name+"";
                  });
                }
                else
                {
                    layer.msg(json, { time: 1000 }, function() {  
                  });
                }
            })
})
$("#return").click(function(){
    window.location.href="template.html?id="+deviceid+"&name="+name+"";
})
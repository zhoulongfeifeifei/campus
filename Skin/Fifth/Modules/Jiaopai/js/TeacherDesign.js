var deviceid=getUrlParam('deviceid');
var name=decodeURI(getUrlParam('name'));
var scene=decodeURI(getUrlParam('scene'));
var sceneId=decodeURI(getUrlParam('sceneId'));
var userid=decodeURI(getUrlParam('userid'));
document.getElementById("classname").innerText=name;
$(function(){
	var $mainWrap=$('.main-wrap');
	$mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());

})

layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val(res.data);
      $("#teacherimg").attr("src",img);
    }
  });
});

$("#return").click(function(){
	window.location.href="ShangKe.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
})

$("#returnt").click(function(){
	window.location.href="ShangKe.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
})

var Get_TeacherImg = {
                    url: "XAWebBanpai/Get_TeacherImg",
                    type: "Get",
                    data:{
                    userid:userid,
                    deviceid:deviceid
                }
            };
            commonFn(Get_TeacherImg, function(json) {
            	document.getElementById("uname").innerText=decodeURI(getUrlParam('username'));
            	$("#userimg").attr("src",json.img);
            	$("#filename").val(json.img);
            	$("#detail").val(json.detail);
            	if(json.img=="") $("#teacherimg").attr("src","img/default.jpg");
            	else $("#teacherimg").attr("src",json.img);
            	if(json.detail=="") document.getElementById("info").innerText="请输入简介";
            	else document.getElementById("info").innerText=json.detail;
            	document.getElementById("username").innerText=decodeURI(getUrlParam('username'));
            	if(json.isCheck==0)
            	{
            		document.getElementById("kaoqing").innerHTML="<div class='box-right-3 font-fzxk' style=''>"+
          															"<img width='100%' src='img/class-1-right-3.jpg'/>"+
          															"<div class='text-box'>"+
            															"<table><tr><td>"+
                  															"<h3>"+json.subjectName+"</h3>"+
                  															"<p>已上时间：30分钟</p>"+
              															"</td></tr></table>"+
          															"</div>"+
     															 "</div>";
            	}
            	else
            	{
            		document.getElementById("kaoqing").innerHTML="<div class='box-right-1 font-fzxk' style=''>"+
        															"<img width='100%'' src='img/class-1-right-bg.jpg'/>"+
          															"<div class='text-box'>"+
            															"<table><tr><td>"+
                  															"<h3>"+json.subjectName+"</h3>"+
                  															"<p>已上时间：30分钟</p>"+
              															"</td></tr></table>"+
          															"</div>"+
      															"</div>"+
      															"<div class='box-right-2' style=''>"+
        															"<img width='100%'' src='img/index-1-right-3.jpg'/>"+
      															"</div>"
            	}
            })

$('#detail').keyup(function () {
    var detail = $(this).val();
    document.getElementById("info").innerText=detail;
});

$("#save").click(function(){
    var model={};
    model.userId=userid;
    model.img=$("#filename").val();
    model.detail=$("#detail").val();
    model.deviceId=deviceid;
	var Update_TeacherImg = {
                    url: "XAWebBanpai/Update_TeacherImg",
                    type: "Post",
                    data:model
            };
            commonFn(Update_TeacherImg, function(json) {
                if(json=="修改成功")
                {
                    layer.msg(json, { time: 1000 }, function() {  
                        window.location.href="ShangKe.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
                  });
                }
                else
                {
                    layer.msg(json, { time: 1000 }, function() {  
                  });
                }
            })
})
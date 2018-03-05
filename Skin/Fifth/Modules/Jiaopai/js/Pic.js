var deviceid=getUrlParam('deviceid');
var name=decodeURI(getUrlParam('name'));
var scene=decodeURI(getUrlParam('scene'));
var sceneId=decodeURI(getUrlParam('sceneId'));
var img = '';
document.getElementById("scene").innerText=scene+"设置";
document.getElementById("classname").innerText=name;
$(function(){
	var $mainWrap=$('.main-wrap');
	$mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());

})

//上传图片

layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val(res.data);
      $('.main-wrap').contents().find('.fullbox-bg').attr('src', res.data);
    }
  });
});

var Get_SceneInfo = {
                    url: "XAWebBanpai/Get_SceneInfo",
                    type: "Get",
                    data:{
                    deviceid:deviceid,
                    scene:sceneId
                }
            };
            commonFn(Get_SceneInfo, function(json) {
            	$("#previewImg").attr("src",json.previewImg);
              document.getElementById('filelist').innerHTML = '<img src="' + json.previewImg + '" style="width:250px" />';
            })

$("#reset").click(function(){
  var defaultimg="";
  if(sceneId==6) defaultimg="http://sincere-xiaoxin.oss-cn-hangzhou.aliyuncs.com/Template/6/升旗仪式.jpg";
  else if(sceneId==7) defaultimg="http://sincere-xiaoxin.oss-cn-hangzhou.aliyuncs.com/Template/7/广播体操.jpg";
  else if(sceneId==10) defaultimg="http://sincere-xiaoxin.oss-cn-hangzhou.aliyuncs.com/Template/10/平安回家.jpg";
  else if(sceneId==12) defaultimg="http://sincere-xiaoxin.oss-cn-hangzhou.aliyuncs.com/Template/12/眼保健操.png";
  document.getElementById('filelist').innerHTML = '<img src="' + defaultimg + '" style="width:250px" />';
  $('.main-wrap').contents().find('.fullbox-bg').attr('src', defaultimg);
});

$("#save").click(function(){
  var Update_SceneInfo = {
                    url: "XAWebBanpai/Update_SceneInfo",
                    type: "Get",
                    data:{
                    deviceid:deviceid,
                    sceneid:sceneId,
                    img:$("#previewImg").attr("src")
                }
            };
            commonFn(Update_SceneInfo, function(json) {
              if(json=="修改成功")
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
var deviceid=getUrlParam('id');
var name=decodeURI(getUrlParam('name'));
var scene=decodeURI(getUrlParam('scene'));
var sceneId=decodeURI(getUrlParam('sceneId'));
var honorid=decodeURI(getUrlParam('honorid'));
document.getElementById("classname").innerText=name;
$(function(){
	var $mainWrap=$('.main-wrap');
	$mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());
    var $hislder = $('.hiSlider');
    $hislder.find('li').css('height', $hislder.width() * 0.6379);
})

layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val(res.data);
      $("#himg").attr("src",img);
    }
  });
});

$("#return").click(function(){
	 window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
})


var Get_Honor = {
                    url: "XAWebBanpai/Get_Honor",
                    type: "Get",
                    data:{
                    honorid:honorid
                }
            };
            commonFn(Get_Honor, function(json) {
            	if(json==null) $("#himg").attr("src","img/honor-1.jpg");
            	else
            	{
            		if(json.img!="") $("#himg").attr("src",json.img);
            	    else $("#himg").attr("src","img/honor-1.jpg");
            	}
            	$("#honorname").val(json.title);
            	$("#filename").val(json.img);
            	$("#honorimg").attr("src",json.img);
            })

$("#save").click(function(){	
	var Update_Honor = {
	                url: "XAWebBanpai/Update_Honor",
	                type: "Get",
	                data:{
	                honorid:honorid,
	                honorname:$("#honorname").val(),
	                img:$("#himg").attr("src"),
	                deviceid:deviceid,
	                schoolid:window.schoolid
	            }
	        };
	        commonFn(Update_Honor, function(json) {
	        	if(json=="添加成功"||json=="修改成功")
                {
                    layer.msg(json, { time: 1000 }, function() {  
                        window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
                  });
                }
                else
                {
                    layer.msg(json, { time: 1000 }, function() {  
                  });
                }
	        })
})
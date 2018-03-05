var deviceid=getUrlParam('id');
var name=decodeURI(getUrlParam('name'));
var scene=decodeURI(getUrlParam('scene'));
var sceneId=decodeURI(getUrlParam('sceneId'));
var noticeid=decodeURI(getUrlParam('noticeid'));
document.getElementById("classname").innerText=name;
$(function(){
	var $mainWrap=$('.main-wrap');
	$mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());
    var $hislder = $('.hiSlider');
    $hislder.find('li').css('height', $hislder.width() * 0.6379);

    $('#title').keyup(function() {
        var title = $(this).val();
        $('.main-wrap').contents().find('.hiSlider-item .t').html(title);
    });

    $('#detail').keyup(function() {
        var _contextTxt = $(this).val();
        _contextTxt = _contextTxt.replace(/\r/gm, "<br/>");
        _contextTxt = _contextTxt.replace(/\n/gm, "<br/>");

        $('.main-wrap').contents().find('.hiSlider-item .info td').html(_contextTxt);
    });

    $('#sn').keyup(function() {
        var signname = $(this).val();
        $('.main-wrap').contents().find('.hiSlider-item .bottom .s1').html(signname);
    });
})

if(noticeid!=0)
{
var Get_Notice = {
                url: "XAWebCommon/Get_Notice",
                type: "Get",
                data:{
                id:noticeid
            }
        };
        commonFn(Get_Notice, function(json) {
        	$("#endtime").val(new Date(json.endTime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
        	$("#title").val(json.title)
        	$("#detail").val(json.detail);
        	$("#sn").val(json.signName);
        	$('.main-wrap').contents().find('.hiSlider-item .t').html(json.title);
        	$('.main-wrap').contents().find('.hiSlider-item .info td').html(json.detail);
        	$('.main-wrap').contents().find('.hiSlider-item .bottom .s1').html(json.signname);
        })
}


getCookieByUserInfo();
if (getCookieByUserInfo().logintype == 'teacher') {
    role = 1
} if (getCookieByUserInfo().logintype == 'admin') {
    role = 10
}

$("#save").click(function(){
	var model={};
	model.id=noticeid;
	model.detail=$("#detail").val();
	model.flag=0;
	model.endTime=$("#endtime").val();
	model.deviceType = 2;
	model.schoolId = window.schoolid;
	model.userId = getCookieByUserInfo().userid;
	model.roleType = role;
	model.title=$("#title").val();
	model.device=deviceid;
	model.type=0;
	model.signName=$("#sn").val();
	if(model.signName=="") model.signName="0";
	var endtime=$("#endtime").val();
	var title=$("#title").val();
	var detail=$("#detail").val();
	if(endtime==""&&title==""&&detail=="")
	{
		layer.msg("请输入结束时间", { time: 1000 }, function() { 
	    });
	}
	else if(endtime==""&&title!=""&&detail!="")
	{
		layer.msg("请输入结束时间", { time: 1000 }, function() { 
	    });
	}
	else if(endtime!=""&&title==""&&detail!="")
	{
		layer.msg("请输入标题", { time: 1000 }, function() { 
	    });
	}
	else if(endtime!=""&&title!=""&&detail=="")
	{
		layer.msg("请输入内容", { time: 1000 }, function() { 
	    });
	}
	else if(endtime==""&&title==""&&detail!="")
	{
		layer.msg("请输入结束时间", { time: 1000 }, function() { 
	    });
	}
	else if(endtime==""&&title!=""&&detail=="")
	{
		layer.msg("请输入结束时间", { time: 1000 }, function() { 
	    });
	}
	else if(endtime!=""&&title==""&&detail=="")
	{
		layer.msg("请输入标题", { time: 1000 }, function() { 
	    });
	}
	else
	{
		var Update_Notice = {
	                url: "XAWebCommon/Update_Notice",
	                type: "Post",
	                data:model
	        };
	        commonFn(Update_Notice, function(json) {
	        	var modelt={};
				modelt.deviceId=deviceid;
				modelt.sceneId=15;
				modelt.newState=1;
	        	if(json==true&&noticeid==0)
	        	{
	        		var Update_Scene = {
					                    url: "XAWebBanpai/Update_Scene",
					                    type: "Post",
					                    data:modelt
					            };
					            commonFn(Update_Scene, function(json) {
					              if(json==true)
					              {

					                  layer.msg("添加发布成功", { time: 1000 }, function() {  
					                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
					                });
					              }
					              else
					              {
					                  layer.msg("添加成功，失败失败", { time: 1000 }, function() {  
					                });
					              }
					            })
	        	}
	        	else if(json==true&&noticeid>0)
                {
                    var Update_Scene = {
					                    url: "XAWebBanpai/Update_Scene",
					                    type: "Post",
					                    data:modelt
					            };
					            commonFn(Update_Scene, function(json) {
					              if(json==true)
					              {

					                  layer.msg("修改发布成功", { time: 1000 }, function() {  
					                     window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
					                });
					              }
					              else
					              {
					                  layer.msg("修改成功，发布失败", { time: 1000 }, function() {  
					                });
					              }
					            })
                }
                else if(json==false&&noticeid==0)
                {
                	layer.msg("添加失败", { time: 1000 }, function() {  
                  });
                }
                else 
                {
                	layer.msg("修改失败", { time: 1000 }, function() {  
                  });
                }
	        })
	}
})

$("#return").click(function(){
	 window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";
})
var img = '';
var id=getUrlParam('id');
var cid=getUrlParam('cid');
//上传图片

layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val(res.data);

    }
  });
});


if(id==null)
{
	$("#fou").attr("checked", true);
}
else
{
	var Get_App = {
                    url: "XAWebBanpai/Get_App",
                    type: "Get",
                    data:{
                    id:id
                }
            };
            commonFn(Get_App, function(json) {
            	$("#appname").val(json.appName);
            	$("#appimg").attr("src",json.appImg);
            	$("#filename").val(json.appImg);
            	$("#appurl").val(json.appUrl);
            	if(json.isLogin==1) $("#shi").attr("checked", true);
            	else $("#fou").attr("checked", true);
            })
}


$("#save").click(function(){
	var model={};
	if(id==null) id=0;
	model.id=id;
	model.appName=$("#appname").val();
	model.appImg=$("#filename").val();
	model.appUrl=$("#appurl").val();
	model.schoolId=window.schoolid;
	if($("#shi").checked="checked") model.isLogin=1;
    else model.isLogin=0;
	var Update_App = {
                    url: "XAWebBanpai/Update_App",
                    type: "Post",
                    data: model
                };
            commonFn(Update_App, function(json) {
            	if(json=="添加成功"||json=="修改成功")
            	{
            		layer.msg(json, { time: 1000 }, function() {  
            			window.location.href="Classcard.html?id="+cid+"";
                  });
            	}
                else if(json=="添加失败"||"修改失败")
                {
                    layer.msg(json, { time: 1000 }, function() {  
                        
                  });
                }
            })
})
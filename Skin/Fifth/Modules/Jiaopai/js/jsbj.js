var userid=getUrlParam('userid');
var username=getUrlParam('teachername');
var id=getUrlParam('id');

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

var Get_TeacherImg = {
                    url: "XAWebBanpai/Get_TeacherImg",
                    type: "Get",
                    data:{
                    userid:userid,
                    deviceid:0
                }
            };
            commonFn(Get_TeacherImg, function(json) {
            	document.getElementById("username").innerText=decodeURI(username);
            	$("#userimg").attr("src",json.img);
            	$("#filename").val(json.img);
            	$("#detail").val(json.detail);
            })

$("#save").click(function(){
    var model={};
    model.userId=userid;
    model.img=$("#filename").val();
    model.detail=$("#detail").val();
    model.deviceId=0;
    model.schoolId=window.schoolid;
	var Update_TeacherImg = {
                    url: "XAWebBanpai/Update_TeacherImg",
                    type: "Post",
                    data:model
            };
            commonFn(Update_TeacherImg, function(json) {
                if(json=="修改成功"||json=="添加成功")
                {
                    layer.msg(json, { time: 1000 }, function() {  
                        window.location.href="teacher.html?id="+id+"";
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
    window.location.href="teacher.html?id="+id+"";
})
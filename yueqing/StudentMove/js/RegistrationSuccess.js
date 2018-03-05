var form=layui.form(),
   layer =layui.layer;
var studentId=getUrlParam('id');
$.ajax({
	type:"get",
  	url:"/api/Signup/GetModelTongZhiShu",
  	data:{
          studentId:studentId
      },
      async:true,
      success:function(data){
      	var res=data.data;
      	$('.content-infor p').html(res);
      }
})
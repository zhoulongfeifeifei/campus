 var form=layui.form(),
   layer =layui.layer;
var Id=getUrlParam('pid');
  //自定义验证规则
form.verify({
     lqm: [/\b\d{6}\b/, '录取码为6位数字'],
      zkz: [/\b\d{10}\b/, '准考证为10位'],
      username: function(value){
      if(value.length < 1){
        return '姓名不能为空';
      }
    }
});

//form.on('submit(sava)', function() {
//	layer.msg("登录成功", { time: 1000 }, function() {
//		 location.href = "SignUp.html";
//	});
//});
//判断是否能登录
function nonLogin(){
//$('input[name=number]').attr('disabled','disabled');
//$('input[name=username]').attr('disabled','disabled');
//$('input[name=lqm]').attr('disabled','disabled');
}
//if(Id==undefined){
//layer.msg('登录条件不健全',{time:3000});
//nonLogin();
//}else{
  $.ajax({
  	type:"get",
  	url:"/api/Signup/GetModelProject",
  	data:{
          id:Id
      },
      async:true,
      success:function(data){
      	var res=data.data;
      if(data.data==null){
        layer.msg('找不到项目',{time:1000});
        $('.shuoming p').eq(1).hide();
        nonLogin();
        return false;
//      }else if(data.status!=1){
//       layer.msg('不能进行报名',{time:1000});
//       nonLogin();
//        return false;
//    }else if(res==''){
//      $('.login').hide();
//      layer.msg('无效的报名项目',{time:1000});
//      nonLogin();
//      return false;
    }else{
        var aa=1;
        var startTime=res.startTime;
        var endTime=res.endTime;
        var today= Date.parse(new Date()); 
        var timestamp1 = Date.parse(new Date(startTime));
        var timestamp2 = Date.parse(new Date(endTime));
 //     today<timestamp1 || today>timestamp2       
//      if(aa==3){
//         layer.msg('报名时间以过期',{time:1000});
//         nonLogin();
//         return false;
//      }else{
			$('.miaoshu').html(res.descript);

		}	
        	login(res.volunteerNum);
     
 
    }  
  });
  function login(volunteerNum){
//	$('#sava').click(function(){
    form.on('submit(sava)', function() {
    	var zhunKaoZheng=$("#zhunkao").val();
    	var xingMing=$("#username").val();
    	var luQuMa=$('#lqm').val();
    	var zk=zhunKaoZheng.slice(0,2);
    	if(zk!=17){
	  		layer.msg('学生证为17开头才能登录',{time:1000});
	  	}else{
	    	$.ajax({
	    		type:"get",
	    		url:'/api/Signup/Login',
	    		async:true,
	  		data:{
	        	projectId:Id,
	  			zhunKaoZheng:zhunKaoZheng,
	  			xingMing:xingMing,
	  			luQuMa:luQuMa
	  		},
	    		success:function(data){
	    			var res=data.data; 	
	    			if(res.error==''){
	    				layer.msg("登录成功", { time: 1000 }, function() {
	  					window.location.href = "SignUp.html?id="+res.studentId+'&volunteerNum='+volunteerNum+'&projectId='+Id+'&zhunKaoZheng='+zhunKaoZheng+'&xingMing='+xingMing+'&luQuMa='+luQuMa;
	  					});
	    			}else{
	    				 layer.msg(res.error, { time: 1000 });
	    			}
	    		}
	    	});
    	}
    });
  } 
//}
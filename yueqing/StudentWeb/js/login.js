//input输入框的兼容
   $(function(){
   	 $('input, textarea').placeholder();
   });
   var form=layui.form(),
   layer =layui.layer;
   var Id=getUrlParam('pid');
  //自定义验证规则
form.verify({
	lqm: [/\b\d{6}\b/, '录取码为6位数字'],
      zhunKaoZheng: [/\b\d{10}\b/, '准考证为10位'],
      username: function(value){
      if(value.length < 1){
        return '姓名不能为空';
      }
    }
});
//判断是否能登录
function nonLogin(){
//	$('input[name=number]').attr('disabled','disabled');
//	$('input[name=username]').attr('disabled','disabled');
//	$('input[name=lqm]').attr('disabled','disabled');
}
//if(Id==undefined){
//	layer.msg('登录条件不健全',{time:3000});
//	nonLogin();
//}else{
//左侧招生声明
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
//  	}else if(data.status!=1){
//  		 layer.msg('不能进行报名',{time:1000});
//  		 nonLogin();
////  			return false;
  	}else{
    		var aa=1;
    		var startTime=res.startTime;
    		var endTime=res.endTime;
    		var today= Date.parse(new Date()); 
    		var timestamp1 = Date.parse(new Date(startTime));
    		var timestamp2 = Date.parse(new Date(endTime));
//  		today<timestamp1 || today>timestamp2
//  		if(today<timestamp1 || today>timestamp2){
//  			 layer.msg('超过截止时间',{time:1000});
//  			 nonLogin();
//  			 return false;
//  		}else{
    			$('.shuoming').html(res.descript);		    	
		    	
  		}
    		 
//  	};
    	login(res.volunteerNum);
    }
});
 
function login(volunteerNum){
	 form.on('submit(sava)', function() {
  	var zhunKaoZheng=$("#zhunKaoZheng").val();
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
						location.href = "SignUp.html?id="+res.studentId+'&volunteerNum='+volunteerNum+'&projectId='+Id+'&zhunKaoZheng='+zhunKaoZheng+'&xingMing='+xingMing+'&luQuMa='+luQuMa;
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
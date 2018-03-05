   var form=layui.form(),
   		layer =layui.layer;

//input输入框的兼容
   $(function(){
   	 $('input, textarea').placeholder();
   });
   form.verify({
      name: function(value){
      if(value.length < 1){
        return '不能为空';
      }
    }
});
var aa=0,por;
xiangmu();
   		 
function xiangmu(){
	$.ajax({
		type:"get",
		url:"/api/Signup/GetListProject",
		async:true,
		success:function(data){
			var por;
			var res=data.data;
			var xiangmuHtml='';
			$.each(res, function(k,v) {
				xiangmuHtml+='<option value='+v.id+'>'+v.name+'</option>'
			});
			$('#xiangmu').empty();
			$('#xiangmu').append(xiangmuHtml);
			form.render();
			por=$('#xiangmu').val();
			login(por); 
			form.on('select(xiangmu)',function(data){
				por=data.value;
				login(por); 
			});
			 
		}
	});	
}	
  //登录
   function login(por){
   		$.ajax({
   			type:"get",
   			url:"/api/Signup/GetModelProject",
   			async:true,
   			data:{
   				id:por
   			},
   			success:function(data){
   				var res=data.data;
   				logins(res.volunteerNum);
   			}
   		});
   		function logins(volunteerNum){
   			form.on('submit(sava)',function(){
			var userName=$('input[name=name]').val();
	   		var userPass=$('input[name=password]').val();
			   $.ajax({
				   	type:"get",
				   	url:"/api/Signup/AdminLogin",
				   	async:true,
				   	data:{
				   		userName:userName,
				   		userPass:userPass
				   	},
				   	success:function(data){
				   		var res=data.data; 	
				   		if(res.error==''){
							layer.msg("登录成功", { time: 1000 }, function() {
								location.href = "SignUp.html?projectId="+por+'&id=0'+'&volunteerNum='+volunteerNum;
							});
						}else{
							 layer.msg(res.error, { time: 1000 });
						}
				   	}
			   });
			});
   		}
   		 
   }
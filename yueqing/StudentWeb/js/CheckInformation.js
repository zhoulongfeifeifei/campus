//input输入框的兼容
$(function() {
	$('input, textarea').placeholder();
});
var form = layui.form(),
	layer = layui.layer;
var Id = getUrlParam('id');
var volunteerNum = getUrlParam('volunteerNum');
var projectId = getUrlParam('projectId');
var arr=[],publishTime;
//获取发布时间
$.ajax({
	type:"get",
   	url:"/api/Signup/GetModelProject",
   	data:{
   		id:projectId
   	},
   	async:true,
   	success:function(data){
   		var res=data.data;
   		publishTime=solveTime(res.publishTime);
   		$('.f-title').find('span').text(publishTime);
   	}
})
//获取志愿
	var zhiyuanHtml = '';
	var r = ''; 	
   $.ajax({
   	type:"get",
   	url:"/api/Signup/GetModelStudent",
   	data:{
   		studentId:Id,
   		projectId:projectId
   	},
   	async:true,
   	success:function(data){
   		var res=data.data;
   		var volumnteerTmpObject=res.volumnteerTmpObject;
   		var isFuCong=volumnteerTmpObject.isFuCong;
   		var isZhuXiao=volumnteerTmpObject.isZhuXiao;
   		var zhiyuanHtml = '';
		var r = '';
   		if(isFuCong==1){
   			$('input[name=tiao]').attr("checked",'checked');
   			form.render();
   		}else{
			$('input[name=tiao1]').attr("checked",'checked');
			form.render();
   		};
   		if(isZhuXiao==1){
			$('input[name=sleep]').attr("checked",'checked');
			form.render();
   		}else{
			$('input[name=sleep1]').attr("checked",'checked');
			form.render();
   		};
		 $("input:radio").attr("disabled","disabled");
		var ziV;
		$.each(volumnteerTmpObject.zhiYuanList,function(i,y) {
			arr.push(y.zhiYuanId);
			if(i == 0) {
			r = '一';
			} else if(i == 1) {
				r = '二';
			} else if(i == 2) {
				r = '三';
			} else if(i == 3) {
				r = '四';
			} else if(i == 4) {
				r = '五';
			} else {
				r = i + 1;
			};
   			if(y.zhiYuanId==0){
   				ziV="请选择";
   			}else{
   				ziV=y.zhiYuanName;
   			};
   			zhiyuanHtml += '<div class="layui-form-item"><label class="layui-form-label">第' + r + '志愿：</label><div class="layui-input-inline"><input class="layui-input zyx" zhiYuanId='+y.zhiYuanId+' sort='+y.sort+' sort='+(i+1)+' type="text" name="zy1" value='+ziV+' disabled></div></div>';
   		});		 
		$('.zhiyuan').html(zhiyuanHtml);
		$('input[name=lqm]').val(volumnteerTmpObject.luQuCode);
		$('input[name=phone]').val(volumnteerTmpObject.mobile); 
//		$('.sftj input').each(function(data){
//			if($(this).val()==volumnteerTmpObject.isFuCong){
////				$(this).checked=true;
//			}
//			$(this).attr('disabled','disabled');
//		});
		
//		$('.zhuxiao input').each(function(a,b){
//			if($(this).val()==volumnteerTmpObject.isZhuXiao){
//				$("input:radio[name='sleep']").eq(a).attr("checked",true);
//				form.render();
//			}
//			$(this).attr('disabled', 'disabled');
//		});			
		form.on('submit(sava)', function() {
			$.ajax({
				type:"get",
				url:"/api/Signup/SaveBaoMingSure",
				data:{
					studentId:Id
				},
				async:true,
				success:function(data){
					layer.msg("提交成功", { time: 1000 }, function() {
						location.href = "AdmissionSuccess.html?id="+Id+'&projectId='+projectId+'&volunteerNum='+volunteerNum;
					});
				}
			});
	});
   	}
   });
form.on('submit(edit)', function() {
	layer.msg("返回修改", { time: 1000 }, function() {
		location.href = "SignUp.html?id="+Id+'&projectId='+projectId+'&volunteerNum='+volunteerNum+'&arr='+arr;		  
	});
});
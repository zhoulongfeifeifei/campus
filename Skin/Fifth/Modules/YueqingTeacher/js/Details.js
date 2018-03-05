var layer = layui.layer,
    form = layui.form(),
    laypage = layui.laypage;
var studentId=getUrlParam('id'),
	projectId=getUrlParam('projectId');
 var GetModelStudent = {
	type:'get',
    url: 'Signup/GetModelStudent',
    data: {
    	projectId:projectId,
    	studentId:studentId
    }
}
 commonFn(GetModelStudent,function(data){
	//志愿相关
	var volumnteerTmpObject=data.volumnteerTmpObject;
	if(volumnteerTmpObject ==null){
		$('.zy').html('未添加志愿');
		$('.zy').addClass('zyk');
	}else{
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
				if(y.zhiYuanName==''){
					ziV="请选择";
				}else{
					ziV=y.zhiYuanName;
				}				 
			};
			zhiyuanHtml+='<div class="layui-form-item"><label class="layui-form-label">第' + r + '志愿：</label><div class="layui-input-inline"><input class="layui-input zyx" zhiYuanId='+y.zhiYuanId+' sort='+y.sort+' sort='+(i+1)+' type="text" name="zy1" value='+ziV+' disabled></div></div>';
		});		 
		$('.zy').html(zhiyuanHtml);
		$('input[name=lqm]').val(volumnteerTmpObject.luQuCode);
		$('input[name=phone]').val(volumnteerTmpObject.mobile); 
	}	
	//个人信息
	var studentInfoObject=data.studentInfoObject;
	$('input[name=zhunakozheng]').val(data.zhunKaoZheng);
	$('input[name=username]').val(data.xingMing);
	if(studentInfoObject !=null){
		if(studentInfoObject.gender==1){
			$("input:radio[name='xb']").attr("checked",'checked');
			form.render();
		}else if(studentInfoObject.gender==2){
			$("input:radio[name='xb2']").attr("checked",'checked');
			form.render();
		}
		$('input[name=schoolName]').val(studentInfoObject.school);
		$('input[name=jtzz]').val(studentInfoObject.homeAddress);
		$('input[name=jhp]').val(studentInfoObject.parentMobile);
	}
	var scoreInfoObject=data.scoreInfoObject;
	$('input[name=zf]').val(data.allScore);
	 if(scoreInfoObject !=null){
	 	$('input[name=zf]').val(scoreInfoObject.allScore);
	 	$('input[name=yw]').val(scoreInfoObject.yuWen);
	 	$('input[name=sx]').val(scoreInfoObject.shuXue);
	 	$('input[name=english]').val(scoreInfoObject.yingYu);
	 	$('input[name=kx]').val(scoreInfoObject.keXue);
	 	$('input[name=sh]').val(scoreInfoObject.sheHui);
	 	$('input[name=ty]').val(scoreInfoObject.tiYu);
	 };
	 //核对
		form.on('submit(save)',function(){
			var HeDuiStudent={
				type: "get",
				url: "SignupManage/HeDuiStudent",
				data: {
					studentid:studentId
				}
			};
			commonFn(HeDuiStudent,function(data){
				layer.msg('已核对',{time:1000},function(){
					window.history.go(-1);
				});
			})
		})
 })

var layer = layui.layer,
	form = layui.form(),
    laypage = layui.laypage;
var	studentId=getUrlParam('id'),
	projectId=getUrlParam('projectId');
var	volunteerNum=0,
	zhiYuanList = [],
	LuQu, 
	zhiYuanList1,
	IsHeDdui,arr1=[];
	
	GetModelProject();	
	//单选获取
var tiao =1,sleep =1,xb =1,allScore=0;
form.on('radio(tiao)', function(data) {
	tiao = data.value;
});
form.on('radio(sleep)', function(data) {
	sleep = data.value;
});
form.on('radio(xb)', function(data) {
	xb = data.value;
});
//获取志愿个数
function GetModelProject(){
	var GetModelProject={
		type:'get',
	    url: 'SignupManage/GetModelProject',
	    data: {
	    	id:projectId
	    }
	}
	commonFn(GetModelProject,function(data){
		volunteerNum=data.volunteerNum;
		studentIfo(volunteerNum);
	})
}
//学生相关信息
function studentIfo(volunteerNum) {
	var studentIfo={
		type: "get",
		url: "Signup/GetModelStudent",
		data:{
			studentId: studentId,
			projectId:projectId
		}
	}
	commonFn(studentIfo,function(res){
		LuQu = res.isLuQu;
		IsHeDdui = res.isHeDui;
		//志愿选择
		if(IsHeDdui == 1) {
			if(res.volumnteerObject!=null){
				zhiYuanList1 = res.volumnteerObject.zhiYuanList;	
			}
		};
		$('input[name=zhunakozheng]').val(res.zhunKaoZheng);			 
		$('input[name=username]').val(res.xingMing);
		$('input[name=zhunakozheng]').attr('disabled','disabled');
		$('input[name=username]').attr('disabled','disabled');
		var volumnteerTmpObject = res.volumnteerTmpObject;
		if(volumnteerTmpObject!=null){
			$.each(volumnteerTmpObject.zhiYuanList, function(p,m) {
				arr1.push(m.zhiYuanId);
			});
			tiao=volumnteerTmpObject.isFuCong;
			sleep=volumnteerTmpObject.isZhuXiao;
			if(volumnteerTmpObject.isFuCong ==1){
				$("input:radio[name='tiao']").eq(0).attr("checked",true);
				form.render();
			}else if(volumnteerTmpObject.isFuCong==2){
				$("input:radio[name='tiao']").eq(1).attr("checked",true);
				form.render();
			}else{
				$("input:radio[name='tiao']").attr('checked',false);
				form.render();
			}
			if(volumnteerTmpObject.isZhuXiao==1){
				$("input:radio[name='sleep']").eq(0).attr("checked",true);
				form.render();
			}else if(volumnteerTmpObject.isZhuXiao==2){
				$("input:radio[name='sleep']").eq(1).attr("checked",true);
				form.render();
			}else{
				$("input:radio[name='sleep']").attr('checked',false);
				form.render();
			} 
			if(volumnteerTmpObject.luQuCode != '') {
				$('input[name=lqm]').val(volumnteerTmpObject.luQuCode);
				$('input[name=lqm]').attr('disabled','disabled');
			}
			if(volumnteerTmpObject.mobile != '') {
				$('input[name=lqphone]').val(volumnteerTmpObject.mobile);
			}
		};
		//个人信息栏
		var studentInfoObject = res.studentInfoObject;
		if(studentInfoObject !=null){
			if(studentInfoObject.gender==1){
				$("input:radio[name='xb']").eq(0).attr("checked",true);
				form.render();
			}else if(studentInfoObject.gender==2){
				$("input:radio[name='xb']").eq(1).attr("checked",true);
				form.render();
			}else{
				$("input:radio[name='xb']").attr('checked',false);
				form.render();
			}
			if(studentInfoObject.school != '') {
				$('input[name=schoolName]').val(studentInfoObject.school);				 
			}
			if(studentInfoObject.homeAddress != '') {
				$('input[name=jtzz]').val(studentInfoObject.homeAddress);				 
			}
			if(studentInfoObject.parentMobile != '') {
				$('input[name=jhp]').val(studentInfoObject.parentMobile);				 
			}
		};
		//学生成绩
		var scoreInfoObject = res.scoreInfoObject;
		if(scoreInfoObject !=null){
			allScore=scoreInfoObject.allScore;
			$('input[name=zf]').val(scoreInfoObject.allScore);
			$('input[name=yw]').val(scoreInfoObject.yuWen);
			$('input[name=sx]').val(scoreInfoObject.shuXue);
			$('input[name=english]').val(scoreInfoObject.yingYu);
			$('input[name=kx]').val(scoreInfoObject.keXue);
			$('input[name=sh]').val(scoreInfoObject.sheHui);
			$('input[name=ty]').val(scoreInfoObject.tiYu);
//			$('input[name=yw]').attr('disabled','disabled');
//			$('input[name=sx]').attr('disabled','disabled');
//			$('input[name=english]').attr('disabled','disabled');
//			$('input[name=kx]').attr('disabled','disabled');
//			$('input[name=sh]').attr('disabled','disabled');
//			$('input[name=ty]').attr('disabled','disabled');
		};
			zhiyuan(allScore);
			$('input[name=zf]').change(function(){
				allScore=$(this).val();
				zhiyuan(allScore);
			})
	});
}
//志愿填报
function zhiyuan(allScore){
	var GetListZhiYuan={
		type: "get",
		url: "Signup/GetListZhiYuan",
		data: {
			allScore:allScore,
			projectId: projectId
		}
	};
	commonFn(GetListZhiYuan,function(res){
		var zhiyuanHtml = '';
		var r = '';
		for(var i = 0; i < volunteerNum; i++) {
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
				}
				zhiyuanHtml += '<div class="layui-form-item"><label class="layui-form-label">第' + r + '志愿：</label><div class="layui-input-inline"><select class="zyx" style="display:block;" name="" id="select' + (i + 1) + '" lay-filter="zhiyuan1" sort=' + (i + 1) + ' ><option value="0" sort=' + (i + 1) + '>请选择</option>';
				$.each(res, function(x, y) {
					zhiyuanHtml += '<option value="' + y.id + '" planNum=' + y.planNum + ' luQuNum=' + y.luQuNum + ' scoreLine=' + y.scoreLine + ' sort=' + (i + 1) + '>' + y.name + '</option>';
				});
				zhiyuanHtml += '</select></div></div>';
			};
			$('.zy').html(zhiyuanHtml);
			if(IsHeDdui==0){
				//志愿选择,此时不是首次进入
				if(arr1.length>0){
					$('.zyx').each(function(k,y){
						$(this).find("option[value='" + arr1[k] + "']").attr("selected", 'selected');
					});				 
 				};
 				//首次进入
 				function selectZhi() {
					$(".zyx").each(function(k, v) {
						var zhiYuanId = $(this).find("option:selected").val();
						var sort = $(this).find("option:selected").attr('sort');
						var isLuQu = 0;
						var str = { zhiYuanId: zhiYuanId, sort: sort, isLuQu: isLuQu };
						zhiYuanList.push(str);
						str = {};
					});
				};
			}else{
//				$('#save').hide();
				$("input").attr("disabled","disabled");
				$('select').attr('disabled','disabled');
				$('.zyx').each(function(k, v) {
					var zhiYuanId = $(this).find("option").eq(0).val();
					var sort = $(this).attr('sort');
					$(this).attr('disabled', 'disabled');
					$.each(zhiYuanList1, function(x, y) {
						if(y.sort == sort) {
							if(y.zhiYuanId==0){
								y.zhiYuanName='请选择';
							}
							$('.zyx').eq(k).html('<option sort=' + sort + ' value=' + y.zhiYuanId + '>' + y.zhiYuanName + '</option>');
							zhiYuanId = y.zhiYuanId;
						}
					});
					var isLuQu = LuQu;
					var str = { zhiYuanId: zhiYuanId, sort: sort, isLuQu: isLuQu };
					zhiYuanList.push(str);
					str = {};
				});
			};
			form.on('submit(edit)',function(){
				selectZhi();
				var volunteerInfoTmp = {};
				volunteerInfoTmp.zhiYuanList = zhiYuanList;
				volunteerInfoTmp.isFuCong = tiao;
				volunteerInfoTmp.isZhuXiao = sleep;
				volunteerInfoTmp.mobile = $('input[name=lqphone]').val();
				volunteerInfoTmp.luQuCode = $('input[name="lqm"]').val();
				//学生个人信息
				var studentInfo = {};
				studentInfo.zhunKaoZheng = $('input[name=zhunakozheng]').val();
				studentInfo.xingMing = $('input[name=username]').val();
				studentInfo.gender = xb;
				studentInfo.school = $('input[name=schoolName]').val();
				studentInfo.homeAddress = $('input[name=jtzz]').val();
				studentInfo.parentMobile = $('input[name=jhp]').val();
				//学生成绩
				var scoreInfo = {};
				scoreInfo.allScore = $('input[name=zf]').val();
				scoreInfo.yuWen = $('input[name=yw]').val();
				scoreInfo.shuXue = $('input[name=sx]').val();
				scoreInfo.yingYu = $('input[name=english]').val();
				scoreInfo.keXue = $('input[name=kx]').val();
				scoreInfo.sheHui = $('input[name=sh]').val();
				scoreInfo.tiYu = $('input[name=ty]').val();
				var UpdateStudent={					 
					url: "SignupManage/UpdateStudent",
					type: "post",
					data:{
						id: studentId,
						volunteerInfoTmp: volunteerInfoTmp,
						studentInfo: studentInfo,
						scoreInfo: scoreInfo
					}
				};
				commonFn(UpdateStudent,function(res){
					layer.msg("保存成功", { time: 1000 },function(){
						window.history.go(-1);
					});
				})
			});
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
//						window.history.go(-1);
					});
				})
			})
	})
}
	
	
	
	

var Scroll = new iScroll('wrapper',{hScrollbar:false, vScrollbar:false});
var form=layui.form(),
   layer =layui.layer;
//自定义验证规则
form.verify({
	  lqm: [/\b\d{6}\b/, '录取码为6位数字'],
	  zkz: [/\b\d{10}\b/, '准考证为10位'],
	  phone: [/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|170[0-9]{8}$|14[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/, '手机格式不正确'],
      username: function(value){
      if(value.length < 1){
        return '必填项不能为空';
      }
    },
    fen:function(value){
      if(value.length < 1){
        return '成绩不能为空';
      }
    }
});
var Id=getUrlParam('id');
var volunteerNum=getUrlParam('volunteerNum');
var projectId=getUrlParam('projectId');
var zhunKaoZheng =getUrlParam('zhunKaoZheng');
var xingMing =getUrlParam('xingMing');
var luQuMa =getUrlParam('luQuMa');
var allScore=0;
if(luQuMa !=null){
	$('input[name=lqm]').val(luQuMa);
	$('input[name=lqm]').attr('disabled','disabled');
}
if(zhunKaoZheng !=null){
	$('input[name=zhunKaoZheng]').val(zhunKaoZheng);
	$('input[name=zhunKaoZheng]').attr('disabled', 'disabled');
}
if(xingMing !=null){
	$('input[name=username]').val(xingMing); 
	$('input[name=username]').attr('disabled','disabled');
}
var Ids=getUrlParam('arr');
var Idss;
if(Ids!=undefined){
	Idss=Ids.split(',');
};
var zhiYuanList=[],LuQu,zhiYuanList1,isSure,arr1=[];
studentIfo();
//单选获取
var tiao=1,sleep=1,xb=1;
form.on('radio(tiao)',function(data){
	tiao=data.value;
});
form.on('radio(sleep)',function(data){
	sleep=data.value;
});
form.on('radio(xb)',function(data){
	xb=data.value;
});
//填写志愿
function zhiyuan(allScore){
	$.ajax({
		type:"get",
		url:"/api/Signup/GetListZhiYuan",
		async:true,
		data:{
			allScore:allScore,
			projectId: projectId
		},
		success:function(data){
			var res=data.data;
			var zhiyuanHtml='';
			var r='';
			for(var i=0;i<volunteerNum;i++){
				if(i==0){
					r='一';
				}else if(i==1){
					r='二';
				}else if(i==2){
					r='三';
				}else if(i==3){
					r='四';
				}else if(i==4){
					r='五';
				}else{
					r=i+1;
				}
				zhiyuanHtml+='<div class="layui-form-item"><label class="layui-form-label">第'+r+'志愿：</label><br><div class="layui-input-block"><select class="zyx" style="display:block;" name="" id="select'+(i+1)+'" lay-filter="zhiyuan1" sort='+(i+1)+'><option value="0" sort='+(i+1)+'>请选择</option>';
				$.each(res, function(x,y) {
					zhiyuanHtml+='<option value="'+y.id+'" planNum='+y.planNum+' luQuNum='+y.luQuNum+' scoreLine='+y.scoreLine+' sort='+(i+1)+'>'+y.name+'</option>';
				});
				zhiyuanHtml+='</select></div></div>';
			};
			$('.zhiyuan').html(zhiyuanHtml); 
			if(Idss!=undefined){
				$('.zyx').each(function(a){
					$(this).find("option[value='" + Idss[a] + "']").attr("selected", 'selected');
				})
			}
			if(isSure==0){
				//志愿选择
				////此时不是首次进入
				if(arr1.length>0){
						$('.zyx').each(function(k,y){
//							console.log(arr1[k])
							$(this).find("option[value='" + arr1[k] + "']").attr("selected", 'selected');
//							var zhiYuanId = $(this).find("option:selected").val();
//							var sort = $(this).find("option:selected").attr('sort');
//							var isLuQu = 0;
//							var str = { zhiYuanId: zhiYuanId, sort: sort, isLuQu: isLuQu };
//							zhiYuanList.push(str);
//							str = {};
						});				 
				}
//				else{
					function selectZhi(){				 
						$(".zyx").each(function(k,v){					
				  			var zhiYuanId = $(this).find("option:selected").val();
							var sort =$(this).find("option:selected").attr('sort');
							var isLuQu=0;
							var str={zhiYuanId:zhiYuanId,sort:sort,isLuQu:isLuQu};
							zhiYuanList.push(str);
							str={};	  		
						});	
					}								
//				}
			}else{			
				$('#save').hide();
				$('input[name=zhunKaoZheng]').attr('disabled','disabled');
				$('input[name=username]').attr('disabled','disabled');
				$('input[name=lqm]').attr('disabled','disabled');
				$('input[name=lqphone]').attr('disabled','disabled');
				$('input[name=schoolName]').attr('disabled','disabled');
				$('input[name=jtzz]').attr('disabled','disabled');
				$('input[name=jhp]').attr('disabled','disabled');
				$('input[name=zf]').attr('disabled','disabled');
				$('input[name=yw]').attr('disabled','disabled');
				$('input[name=sx]').attr('disabled', 'disabled');
				$('input[name=english]').attr('disabled', 'disabled');
				$('input[name=kx]').attr('disabled', 'disabled');
				$('input[name=sh]').attr('disabled', 'disabled');
				$('input[name=ty]').attr('disabled', 'disabled');
				$("input:radio").attr("disabled","disabled");
//				$('input').attr('disabled','disabled');
				$('.zyx').each(function(k,v){
					var zhiYuanId= $(this).find("option").eq(0).val();
					var sort =$(this).attr('sort');	
					$(this).attr('disabled','disabled');
					$.each(zhiYuanList1, function(x,y) {
						if(y.sort==sort){
							if(y.zhiYuanId==0){
								y.zhiYuanName='请选择';
							}
							$('.zyx').eq(k).html('<option sort='+sort+' value='+y.zhiYuanId+'>'+y.zhiYuanName+'</option>');
							zhiYuanId=y.zhiYuanId;
						}
					});	
//					var isLuQu=LuQu;
//					var str={zhiYuanId:zhiYuanId,sort:sort,isLuQu:isLuQu};
//					zhiYuanList.push(str);
//					str={};
				})			
			}
//			$('#save').click(function(){
//			})
			form.on('submit(save)', function() {
			  	//志愿选择
			  	selectZhi();
			 //  	$(".zyx").each(function(k,v){
				// 	var zhiYuanId = $(this).find("option:selected").val();
				// 	var sort =$(this).find("option:selected").attr('sort');
				// 	var isLuQu=0;
				// 	var str={zhiYuanId:zhiYuanId,sort:sort,isLuQu:isLuQu};
				// 	zhiYuanList.push(str);
				// 	str={};
				// });
				var volunteerInfoTmp={};
				volunteerInfoTmp.zhiYuanList=zhiYuanList;
				volunteerInfoTmp.isFuCong=tiao;
		  		volunteerInfoTmp.isZhuXiao=sleep;
		  		volunteerInfoTmp.mobile=$('input[name=lqphone]').val();
		  		volunteerInfoTmp.luQuCode=$('input[name="lqm"]').val();	
		  		//学生个人信息
		  		var studentInfo={}; 
		  		studentInfo.zhunKaoZheng=$('input[name=zhunKaoZheng]').val();
		  		studentInfo.XingMing=$('input[name=username]').val();
		  		studentInfo.gender=xb;
		  		studentInfo.school=$('input[name=schoolName]').val();	
		  		studentInfo.homeAddress=$('input[name=jtzz]').val();
		  		studentInfo.parentMobile=$('input[name=jhp]').val();	
		  		//学生成绩
		  		var scoreInfo={};
		  		scoreInfo.allScore=$('input[name=zf]').val();
		  		scoreInfo.yuWen=$('input[name=yw]').val();
		  		scoreInfo.shuXue=$('input[name=sx]').val();	
		  		scoreInfo.yingYu=$('input[name=english]').val();	
		  		scoreInfo.keXue=$('input[name=kx]').val();	
		  		scoreInfo.sheHui=$('input[name=sh]').val();
		  		scoreInfo.tiYu=$('input[name=ty]').val();	
		  		$.ajax({
		  			type:"post",
		  			url:"/api/Signup/SaveBaoMing",
		  			async:true,
		  			data:{ 		
		  				id:Id,		 
						ProjectId:projectId,
		  				volunteerInfoTmp:volunteerInfoTmp,
		  				studentInfo:studentInfo,
		  				scoreInfo:scoreInfo
		  			},
		  			success:function(data){
						if(data.status==1){
							if(data.data){
								if(data.data.studentId>0){
									layer.msg("保存成功", { time: 1000 }, function() {
										location.href = "CheckInformation.html?id=" + data.data.studentId + '&projectId=' + projectId + '&volunteerNum=' + volunteerNum;
									});
								}else{
									layer.msg(data.data.error)
								}
							}
						}
		  			}
		  		});	 
			 });
		}
	});
};
//学生相关信息
function studentIfo(){
	$.ajax({
	type:"get",
	url:"/api/Signup/GetModelStudent",
	async:true,
	data:{
		studentId:Id,
		projectId:projectId
	},
	success:function(data){
		var res=data.data;
		LuQu=res.isLuQu;
		isSure=res.isSure;
		//志愿选择
		if(isSure == 1) {
			zhiYuanList1 = res.volumnteerObject.zhiYuanList;
		}
		if(res.zhunKaoZheng != '') {
			$('input[name=zhunKaoZheng]').val(res.zhunKaoZheng);
//			$('input[name=zhunKaoZheng]').attr('disabled','disabled'); 
		};			 
		if(res.xingMing != '') {
			$('input[name=username]').val(res.xingMing);
//			$('input[name=username]').attr('disabled','disabled'); 
		};
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
//				$('input[name=lqm]').attr('disabled','disabled'); 
			}
			if(volumnteerTmpObject.mobile != '') {
				$('input[name=lqphone]').val(volumnteerTmpObject.mobile);
			}
		}	
		//个人信息栏
		var studentInfoObject=res.studentInfoObject;
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
		}
		//学生成绩
		var scoreInfoObject=res.scoreInfoObject;
		if(scoreInfoObject !=null){
			if(scoreInfoObject.allScore!=''){
				allScore=scoreInfoObject.allScore;
				$('input[name=zf]').val(scoreInfoObject.allScore);			
				$('input[name=zf]').attr('disabled','disabled');
			}
			if(scoreInfoObject.yuWen!=''){
				$('input[name=yw]').val(scoreInfoObject.yuWen);			
				$('input[name=yw]').attr('disabled','disabled');
			}
			if(scoreInfoObject.shuXue!=''){
				$('input[name=sx]').val(scoreInfoObject.shuXue);			
				$('input[name=sx]').attr('disabled','disabled');
			}
			if(scoreInfoObject.yingYu!=''){
				$('input[name=english]').val(scoreInfoObject.yingYu);			
				$('input[name=english]').attr('disabled','disabled');
			}
			if(scoreInfoObject.keXue!=''){
				$('input[name=kx]').val(scoreInfoObject.keXue);			
				$('input[name=kx]').attr('disabled','disabled');
			}
			if(scoreInfoObject.sheHui!=''){
				$('input[name=sh]').val(scoreInfoObject.sheHui);			
				$('input[name=sh]').attr('disabled','disabled');
			}
			if(scoreInfoObject.tiYu!=''){
				$('input[name=ty]').val(scoreInfoObject.tiYu);			
				$('input[name=ty]').attr('disabled','disabled');
			};
		}
		zhiyuan(allScore);
		$('input[name=zf]').change(function(){
			allScore=$(this).val();
			zhiyuan(allScore);
		})
	}
});
};
//$('#sava1').click(function(){	
//})
   form.on('submit(sava1)', function() {
	if(LuQu==1){
		$.ajax({
			type:"get",
			url:"/api/Signup/GetModelProject",
			data:{
				id:projectId
			},
			async:true,
			success:function(data){
				var res=data.data;
				if(data.data!=null){
					if(res.status==5){
						layer.msg("恭喜您被我校录取", { time: 1000 }, function() {
							location.href = "RegistrationSuccess.html?id=" + Id;
						}); 
					}else {
						layer.msg('报名录取未公布',{time:3000});
					}
				} 
				else{
					layer.msg('找不到报名项目',{time:3000});
				}
			}
		});

			
	}else if(LuQu==2){
		$.ajax({
			type:"get",
			url:"/api/Signup/GetModelProject",
			data:{
				id:projectId
			},
			async:true,
			success:function(data){
				var res=data.data;
				if(data.data!=null){
					if(res.status==5){
						layer.msg("很遗憾您未被我校录取", { time: 1000 }, function() {
							location.href="AdmissionFailure.html?id="+Id;
						});	
					}else {
						layer.msg('报名录取未公布',{time:3000});
					}
				} 
				else{
					layer.msg('找不到报名项目',{time:3000});
				}
			}
		});

		
	}else{
		layer.msg('未开始录取',{time:1000});
	}
})
var Status = 1;
var Isfinish = 0;
var ClassId = '';
var Urls;
//var GradeIds='';
var SCHOOLID=getCookieByUserInfo("schoolid");

//自定义验证规则
form.verify({
    phone: [/^$|^[1][358][0-9]{9}$/, '手机号格式不正确']
  });
  //及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})
//切换
$("div[data-id='zybj'],div[data-id='ybybj']").on("click", function() {
	var tar = $(this).attr("data-id");
	$("." + tar).addClass("active").siblings().removeClass("active");
	$(".text-title span").html("学生信息>" + $(this).html());
	if(tar == 'zybj') {
		ClassId = "";
		Isfinish = 0;
		Status = 1;
		var pageindex = window.localStorage.getItem("PageIndex");
		yx(pageindex, Status, ClassId, Isfinish);
	} else if(tar == 'ybybj') {
		ClassId = "";
		Isfinish = 1;
		Status = 1;
		var pageindex = window.localStorage.getItem("PageIndex");
		yx(pageindex, Status, ClassId, Isfinish);
	}
})
//模态框tab切换
$("#nav_tab li").on("click", function() {
	$(this).addClass("active").siblings().removeClass("active");
	var tar = $(this).attr("data-toggle");
	$("." + tar).addClass("active").siblings().removeClass("active");
	if(tar == "ok") {
		Status = 1;
		var pageindex = window.localStorage.getItem("PageIndex");
		yx(pageindex, Status, ClassId, Isfinish);
	} else if(tar == "no") {
		Status = 0;
		var pageindex = window.localStorage.getItem("PageIndex");
		yx(pageindex, Status, ClassId, Isfinish);
	}
})
//左侧导航
var index = 1;
nav(0, $("#nav_top")); //  在用毕业班级
nav(1, $("#nav_bottom")); //   已毕业班级
function nav(num, sele) {
	var gettree ={url:"ClassRoom/GetListClassTree",data: { isfinish: num ,schoolId:SCHOOLID},type:"get"};
	commonFn(gettree,function(data){
			index = 1;
			if(data) {
				$(sele).ligerTree({
					data: data,
					checkbox: false,
					isExpand: false,
					autoCheckboxEven:false,
					idFieldName: 'id',
					parentIDFieldName: 'pid',
					onSelect: function(note) {
						var ids = '"' + note.data.id + '"'
						ClassId = (ids.substring(3, 10000)).replace(/[^0-9]/ig, "");
						$(".text-title span").html("学生信息>" + note.data.text);
						var pageindex = window.localStorage.getItem("PageIndex");
						Isfinish=num;
						yx(pageindex, Status, ClassId, Isfinish);
					},
				});
				//							
			}
			manager = $(sele).ligerGetTreeManager();
			manager.expandAll();
	});
}

////		
/**************学生列表信息显示*********************/
$(".search").on('click', function() {
	var name = $(this).prev("input").val();
	yx(1, Status, ClassId, Isfinish, name);
})
yx(1, Status, '', Isfinish,'');
function yx(current, status, classid, isfinish, name) {
	var getstulist ={
						url:"Student/GetStudentList",
						data:{PageIndex:current,stu_status:status,ClassId:classid,isfinish:isfinish,Key:name,schoolId:SCHOOLID},
						type:"post"
					};
	commonFn(getstulist,function(data){
				laypage({
					cont: 'page',
					pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
					curr: data.pageIndex,
					groups: 5,
					jump: function(e, first) { //触发分页后的回调
						if(!first) { //一定要加此判断，否则初始时会无限刷
							yx(e.curr, status, classid, isfinish,name);
						}
					},
					skin: 'molv', //皮肤
					first: '首页', //将首页显示为数字1,。若不显示，设置false即可
					last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
					prev: false, //若不显示，设置false即可
					next: false //若不显示，设置false即可
				});
				window.localStorage.setItem("PageIndex",data.pageIndex);
				$("#tbody").empty();
				$("thead").empty();
				var data = data.resultData;
				if(isfinish == 0) {
					index = 1;
					var czn = '';
					var czs = ''
					if(status == 1) {
						czn = "stop";
						//czs=' glyphicon glyphicon-lock';
						czs = '停用';
					} else {
						czn = "sc";
						//czs=' glyphicon glyphicon-trash';
						czs = ' 彻底删除';
					}
					$("thead").append('<tr><th>序号</th>' +
						'<th><input type="checkbox" name="" id="qx" value="" /></th>' +
						'<th>名称</th>' +
						'<th>性别</th>' +
						'<th>学号</th>' +
						'<th>班级</th>' +
						'<th>学籍号</th>' +
						'<th>就读方式</th>' +
//						'<th>入学年份</th>' +
						'<th>操作</th>' +
						'</tr>');
					$.each(data, function(i, n) {
						$("#tbody").append(
							'<tr data-id="' + n.id + '">' +
							'<td >' + (i+1) + '</td>' +
							'<td ><input type="checkbox"  data-puid="' + n.pUserId + '" data-uid="' + n.userId + '" data-cid="' + n.classId + '"  data-id="' + n.id + '" id="" value="" /></td>' +
							'<td >' + isNull(n.name) + '</td>' +
							'<td >' + isNull(n.gender) + '</td>' +
							'<td >' + isNull(n.stuNumber )+ '</td>' +
							'<td >' + isNull(n.className) + '</td>' +
							'<td >' + isNull(n.studentCode) + '</td>' +
							'<td >' + isNull(n.studentType) + '</td>' +
//							'<td >' + isNull(n.schoolYear) + '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;" data-operation="AjaxStudent.NewAddStudent"  data-id="' + n.id + '" data-toggle="modal" data-target="#myModal" class="layui-btn layui-btn-mini bj  yinc">编辑</a>' +
							'<a href="javascript:;" data-operation="AjaxStudent.DeleteNewStudent" data-id="' + n.id + '" data-uid="' + n.userId + '"  data-puid="' + n.pUserId + '" data-cid="' + n.classId + '" class=" text-danger ' + czn + ' yinc layui-btn layui-btn-mini layui-btn-danger">' + czs + '</a>' +
							'</td>' +
							'</tr>'
						);
					});
				} else if(isfinish == 1) {
					$("thead").append('<tr>' +
						'<th>序号</th>' +
						'<th><input type="checkbox" name="" id="qx" value="" /></th>' +
						'<th>名称</th>' +
						'<th>性别</th>' +
						'<th>学号</th>' +
						'<th>毕业班级</th>' +
						'<th>学籍号</th>' +
						'<th>所属届次</th>' +
						'<th>毕业去向</th>' +
						'<th>操作</th>' +
						'</tr>');

					$.each(data, function(i, n) {
						$("#tbody").append(
							'<tr data-id="' + n.Id + '">' +
							'<td >' + (i+1) + '</td>' +
							'<td ><input type="checkbox"  data-puid="' + n.pUserId + '" data-uid="' + n.userId + '" data-cid="' + n.classId + '"  data-id="' + n.id + '"  /></td>' +
							'<td >' + isNull(n.name) + '</td>' +
							'<td >' + isNull(n.gender) + '</td>' +
							'<td >' + isNull(n.stuNumber) + '</td>' +
							'<td >' + isNull(n.className) + '</td>' +
							'<td >' + isNull(n.studentCode) + '</td>' +
							'<td >' + isNull(n.period) + '</td>' +
							'<td >无</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;" data-operation="AjaxStudent.NewAddStudent" data-id="' + n.id + '" data-toggle="modal" data-target="#myModal" class="layui-btn layui-btn-mini bj yinc">编辑</a>' +
							'<a href="javascript:;"  data-operation="AjaxStudent.DeleteStudent" data-id="' + n.id + '" data-uid="' + n.userId + '" data-puid="' + n.pUserId + '" data-cid="' + n.classId + '" class="layui-btn layui-btn-mini layui-btndanger sc yinc">删除</a>' +
							'</td>' +
							'</tr>'
						);
					});
				}
				quanxian();
	});
}

//全选 
$("body").on("change","#qx" ,function() {
	AllSelect(this);
})
  
///************有效列表停用列表一条记录*******************/
$("body").on("click", ".Operation .stop", function() {
	var uId = $(this).attr("data-uid");
	var pId = $(this).attr("data-puid");
	layer.confirm('你确定要停用该学生吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Student/StopStudent",data:{
				userid: uId,
				puserid: pId,
				schoolid:SCHOOLID
			},type:"post"};
	  commonFn(dele,function(data){
		  	layer.msg('停用成功',{time:1000},function(){
		  		var pageindex = window.localStorage.getItem("PageIndex");
				yx(pageindex, Status, '', Isfinish);
		  	});
	  })
	}, function(){
	  layer.closeAll();
	});
})

///*有效列表批量停用*/
$("#plstop").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一条记录");
	} else {
		layer.confirm('你确定要停用这些学生吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var UId='';
			var PId='';
			$.each(inputs,function(i, n) {
				var uId=$(n).attr("data-uid");
				var pId=$(n).attr("data-puid");
				if(i==0){
					UId=uId;
					PId=pId;
				}else if(i>0){
					UId+=","+uId;
					PId+=","+pId;
				}
			});
			  var dele ={url:"Student/StopStudent",data:{userid: UId,
				puserid: PId,
				schoolid:SCHOOLID},type:"post"};
			  commonFn(dele,function(data){
			  	layer.msg("停用成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
				yx(pageindex, Status, '', Isfinish);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
			
		}, function(){
		  layer.closeAll();
		});
	}
})

/************已删除列表彻底删除列表一条记录*******************/
$("body").on("click", ".Operation .sc", function() {
	var Id = $(this).attr("data-id");
	var Uid = $(this).attr("data-uid");
	var Puid = $(this).attr("data-puid");
	var Cid = $(this).attr("data-cid");
	layer.confirm('你确定要删除该学生吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	 var dele ={url:"Student/DeleteStudent",data:{userid :Uid,puserid :Puid,studentid :Id,classid:Cid,schoolid:SCHOOLID},type:"post"};
	  commonFn(dele,function(data){
		  	layer.msg('删除成功',{time:1000},function(){
		  		var pageindex = window.localStorage.getItem("PageIndex");
				yx(pageindex, Status, '', Isfinish);
		  	});
	  })
	}, function(){
	  layer.closeAll();
	});
})

////已删除列表批量彻底删除
$(".yplsc").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一个条记录");
	} else {
		layer.confirm('你确定要删除这些学生吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Ids='';
			var Uids='';
			var Puids='';
			var Cids='';
			$.each(inputs,function(i, n) {
				console.log(n)
				var Id = $(n).attr("data-id");
			  var Uid = $(n).attr("data-uid");
			  var Puid = $(n).attr("data-puid");
			  var Cid = $(n).attr("data-cid");
				if(i==0){
					Ids=Id;
					Uids=Uid;
					Puids=Puid;
					Cids=Cid;
				}else if(i>0){
					Ids+=","+Id;
					Uids+=","+Uid;
					Puids+=","+Puid;
					Cids+=","+Cid;
				} 
			});
			$.each(inputs,function(i, n) {
			  var dele ={url:"Student/DeleteStudent",data:{userid :Uids,puserid :Puids,studentid :Ids,classid:Cids,schoolid:SCHOOLID},type:"post"};
			  commonFn(dele,function(data){
			  	layer.msg("删除成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
				    yx(pageindex, Status, '', Isfinish);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
			})
		}, function(){
		  layer.closeAll();
		});
	}
})

//


///*批量还原学生*/
$(".plhy").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一个条记录");
	} else {
		layer.confirm('你确定要还原这些学生吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Teaid='';
			var Userid='';
			$.each(inputs,function(i, n) {
				var teaid = $(n).attr("data-puid");
			  var userid = $(n).attr("data-uid");
				if(i==0){
					Teaid=teaid
					Userid=userid;
				}else if(i>0){
					Teaid+=","+teaid;
					Userid+=","+userid
				}
			});
			  var dele ={url:"Student/BackStudent",data:{
			  	  userid: Userid,
				  puserid: Teaid
			  },type:"post"};
			  commonFn(dele,function(data){
			  	layer.msg("还原成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
				    yx(pageindex, Status, '', Isfinish);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
		}, function(){
		  layer.closeAll();
		});
	}
})

///*批量修改列表*/
$("#xg").on("click", function() {
	var che = $('tbody input[type="checkbox"]:checked').length;
	if(che > 0) {
		layer.open({
		  type:1,
	        title:"批量修改",
	        content:$('#plxg'),
	        area:['400px','200px'],
	        cancel: function(){ 
        	$('#plxg').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
		});
		getgrade();
	} else {
		layer.msg("至少选择一位学生");
	}
})

//批量修改保存
$("#plxg_save").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	var obj={};
	obj.gradeid=$("#plxg .Grade").val();	
	obj.classid=$("#plxg .Class").val();
	$.each(inputs,function(i, n) {
		var ids = $(n).attr("data-id");
		if(i==0){
			obj.id=ids;
		}else if(i>0){
			obj.id+=","+ids
		}
	});
	  var dele ={url:"Student/BatchEditStudent",data:obj,type:"get"};
	  commonFn(dele,function(data){
	  	layer.msg("修改成功", { time: 1000 }, function() {
			var pageindex = window.localStorage.getItem("PageIndex");
			yx(pageindex, Status, '', Isfinish);
			$('thead input').removeAttr("checked");
			$('tbody input').removeAttr("checked");
			layer.closeAll();
			$('#plxg').hide();
		});
	  })
		
})


////添加学生初始化
$("#addstu").on("click", function() {
	layer.open({
	  type:1,
        title:"添加学生",
        content:$('#myModal'),
        area:['700px','520px'],
        cancel: function(){ 
        	$('#myModal').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
        
	});
	$("#form0 input").val("");
	$("#form0 select").removeAttr("disabled");
	$("#form0 select[name='classId']").html("<option value=''></option>");
	$("input[name='id']").val("0");
	form.render();
	getgrade();
	var getyear ={url:"School/GetCurrentYear",data:{schoolId:SCHOOLID},type:"get"};
	commonFn(getyear,function(rel){
		Selects('','','','',rel);
		form.render();
	})
})
////添加学生信息
form.on('submit(save1)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var addstu ={url:"Student/AddEditStudent",data: bb,type:"post"};
	commonFn(addstu,function(data){
				layer.msg("操作成功", { time: 1000 }, function() {
					layer.closeAll();
					yx(1, Status, '', Isfinish);
					$('#myModal').hide();
				});
		})
    return false;
});


//
/*编辑学生信息*/
$("body").on("click", ".Operation .bj", function() {
	layer.open({
	  type:1,
        title:"编辑学生",
        content:$('#myModal'),
        area:['700px','520px'],
        cancel: function(){ 
        	$('#myModal').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
	$("#myModal input").val("");
	var Id = $(this).attr("data-id");
	var getstu ={url:"Student/GetAStudent",data:  {
			studentid: Id,
			schoolId:SCHOOLID
		},type:"get"};
	commonFn(getstu,function(data){
			for(key in data) {
				$("#form0 input[name='" + key + "']").val(data[key]);
			}
			$("#form0 #Name").val(data.name);
			$("#form0 #StudentCode").val(data.studentCode);
			getgrade(data.gradeId);
			clAss(data.gradeId,data.classId);
			Selects(data.gender,data.pGender,data.studyType,data.studentType,data.schoolYear,data.period,data.relation,data.isGuardian,data.isLive)
			$("#form0 #gradeId").attr("disabled", "disabled");
			$("#form0 #ClassId").attr("disabled", "disabled");
			$("#myModal input[name='pName']").attr("disabled", "disabled");
			$("#myModal input[name='mobile']").attr("disabled", "disabled");
			$("#myModal select[name='pGender']").attr("disabled", "disabled");
			$("#myModal select[name='relation']").attr("disabled", "disabled");
			$("#myModal select[name='isGuardian']").attr("disabled", "disabled");
			$("#myModal select[name='islive']").attr("disabled", "disabled");
			form.render();
	})
})
///***************************获取所有年段***********************/
function getgrade(num) {
	var getgrade ={url:"School/GetGradeList",data:  {
			schoolId:SCHOOLID
		},type:"get"};
	commonFn(getgrade,function(data){
			GradeIds=data;
			$(".Grade").html("<option value=''></option>");
			$.each(data, function(i, n) {
				$(".Grade").append('<option value="' + n.id + '">' + n.grade + '</option>');
			})
			$(".Grade").find("option[value='"+num+"']").attr("selected","selected");
			form.render();
	})
}
/*******************获取所有班级********************************/
form.on('select(Grade)', function(data){
	var val=data.value;
	var schoolyear="";
	$.each(GradeIds, function(i,n) {
		if(n.id==val){
			$("#SchoolYear").find("option[value='"+n.schoolYear+"']").attr("selected","selected").siblings().removeAttr("selected");
			form.render();
			return false;
		}
	});
    clAss(val);
    $("#myModal .Class").html("<option value=''></option>");
    form.render();
}); 
form.on('select(Grade2)', function(data){
  clAss(data.value);
  $("#plxg .Class").html("<option value=''></option>");
  form.render();
}); 

function clAss(Ids,num) {
	var getgrade ={url:"ClassRoom/GetClassRoomListByGrade",data:  {
			id: Ids,
			isfinish: 0,
			schoolId:SCHOOLID
		},type:"get"};
	commonFn(getgrade,function(data){
		$(".Class").html("<option value=''></option>");
			if(data.length > 0) {
				$.each(data, function(i, n) {
					var row = '<option value="' + n.class_id + '">' + n.class_name + '</option>';
					$(".Class").append(row);
				})
				$(".Class").find("option[value='"+num+"']").attr("selected","selected");
				form.render();
			}
	})
}




//批量上传照片模态框
$("#scphoto").on("click", function() {
	layer.open({
	  type:1,
        title:"批量上传照片",
        content:$('#plzp'),
        area:['400px','300px'],
        cancel: function(){ 
        	$('#plzp').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
})
/////批量上传照片
layui.upload({
   	url: window.apiUrl+'Common/UploadFile'
    ,elem: '#scwj' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,ext: 'zip|rar'
    ,success: function(res){
    	if(res.status==1){
			layer.msg("上传成功！", { time: 1000 }, function() {
				$("#zip").val(res.data[0]);
			});
    	}
    	
    }
 });


////批量上传照片保存
form.on('submit(plzp_save)',function(data){
	var bb=data.field;
	var plxg ={url:'Student/PicturesImport',data:bb,type:"get"};
	commonFn(plxg,function(){
			layer.closeAll();
	})
    return false;
});


////导出所有选中的学生
$(".pldc").on("click", function() {
	var arr = [];
	var che = $('tbody input[type="checkbox"]:checked').length;
	if(che > 0) {
		$('tbody input[type="checkbox"]:checked').each(function(i, n) {
			var id = $(this).attr("data-id");
			arr.push(id);
		})
		var ids = arr.join(",");
		window.location.href=window.siteHost+"Filedown/StuTemplateExport?id="+ids+"&schoolId="+SCHOOLID; 
		$('thead input').removeAttr("checked");
		$('tbody input').removeAttr("checked");
	} else {
		layer.msg("至少选择一位学生");
	}
})

//下载模板
$("#xzmb").on("click",function(){
	window.location.href=window.siteHost+"Filedown/GetModelTemplate?alias=student";
})

//批量导入学生
$("#drstu").on("click",function(){
	layer.open({
	  type:1,
        title:"批量导入学生",
        content:$('#drxs'),
        area:['360px','160px'],
        cancel: function(){ 
        	$('#drxs').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
})

layui.upload({
    url: window.apiUrl+'Common/ImportFile'
    ,elem: '#file_stu' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,title:'选择文件上传'
    ,ext: 'xls'
    ,success: function(res){
    	var data=res.data;
    	var URLs ={url:'Student/StudentTemplateImport',data:{schoolid:SCHOOLID,url:data},type:"get"};
		commonFn(URLs,function(){
			layer.msg("上传成功！", { time: 1000 }, function() {
				layer.closeAll();
				yx(1, Status, '', Isfinish);
				$('#drxs').hide();
			});
		})
    }
 });

// 获取数据字典中的数据
 function Selects(gender,pGender,studyType,studentType,SchoolYear,period,relation,isGuardian,islive) {
	DataCenter("性别", $("#form0 select[name='gender']"),gender,"str");
	DataCenter("性别", $("#form0 select[name='pGender']"),pGender,"str");
	DataCenter("就读方式", $("#form0 select[name='studyType']"),studyType,"str");
	DataCenter("学生类别", $("#form0 select[name='studentType']"),studentType,"str");
	DataCenter("入学年份", $("#form0 #SchoolYear"),SchoolYear,"str");
	DataCenter("所属届次", $("#form0 select[name='period']"),period,"str");
	DataCenter("成员关系", $("#form0 select[name='relation']"),relation,"str");
	DataCenter("是否监护人", $("#form0 select[name='isGuardian']"),isGuardian,"str");
	DataCenter("是否生活在一起", $("#form0 select[name='islive']"),islive,"str");
}
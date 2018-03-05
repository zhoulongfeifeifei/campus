var Status = 1;
var Isfinish = 0;
var ClassId = '';
var addstatus = 0;
var searchName='';
var SCHOOLID=getCookieByUserInfo("schoolid");

//自定义验证规则
form.verify({
    phone: [/^$|^[1][358][0-9]{9}$/, '手机号格式不正确']
    ,email: [/^$|^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确']
});

//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();                  //当前input的值
	validate(name, vlaue,$this);		//验证方法调用
})

//切换
$("div[data-id='zybj'],div[data-id='ybybj']").on("click", function() {
	var tar = $(this).attr("data-id");
	$("." + tar).addClass("active").siblings().removeClass("active");
	$(".text-title span").html("家长信息>" + $(this).html());
	if(tar == 'zybj') {
		ClassId = "";
		Isfinish = 0;
		var pageindex = window.localStorage.getItem("PageIndex");
		parents(pageindex, Status, ClassId, Isfinish);
	} else if(tar == 'ybybj') {
		ClassId = "";
		Isfinish = 1;
		var pageindex = window.localStorage.getItem("PageIndex");
		parents(pageindex, Status, ClassId, Isfinish);
	}
})
//模态框tab切换
$("#nav_tab li").on("click", function() {
	var tar = $(this).attr("data-toggle");
	$("#" + tar).addClass("active").siblings().removeClass("active");
	if(tar == "ok") {
		Status = 1;
		var pageindex = window.localStorage.getItem("PageIndex");
		parents(pageindex, Status, ClassId, Isfinish);
	} else if(tar == "no") {
		Status = 0;
		var pageindex = window.localStorage.getItem("PageIndex");
		parents(pageindex, Status, ClassId, Isfinish);
	}
})
//左侧导航
var index = 1;
nav(0, $("#nav_top")); //  在用毕业班级
nav(1, $("#nav_bottom")); //   已毕业班级
function nav(num, a) {
	var gettree ={url:"ClassRoom/GetListClassTree",data: { isfinish: num ,schoolId:SCHOOLID},type:"get"};
	commonFn(gettree,function(data){
			index = 1;
			if(data) {
				$(a).ligerTree({
					data: data,
					checkbox: false,
						isExpand: false,
					autoCheckboxEven:false,
					idFieldName: 'id',
					parentIDFieldName: 'pid',
					onSelect: function(note) {
						var ids = '"' + note.data.id + '"'
						ClassId = (ids.substring(3, 10000)).replace(/[^0-9]/ig, "");
						var pageindex = window.localStorage.getItem("PageIndex");
						parents(pageindex, Status, ClassId, Isfinish,searchName);
					},
				});
			}
			manager = $(a).ligerGetTreeManager();
			manager.expandAll();
	});
}

/**************学生列表信息显示*********************/
$(".search").on('click', function() {
	var searchName = $(this).prev("input").val();
	parents(1, Status, ClassId, Isfinish, searchName);
})

/**************家长列表信息显示*********************/
parents(1, Status, ClassId, Isfinish,searchName);
function parents(current, status, classid, isfinish, name) {
	var getparlist ={
						url:"Student/GetParentList",
						data: {
							PageIndex: current,
							status: status,
							classId: classid,
							isfinish: isfinish,
							Key: name,
							schoolId:SCHOOLID
						},
						type:"post"
					};
	commonFn(getparlist,function(data){
				laypage({
					cont: 'page',
					pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
					curr: data.pageIndex,
					groups: 5,
					jump: function(e, first) { //触发分页后的回调
						if(!first) { //一定要加此判断，否则初始时会无限刷
							parents(e.curr,status,classid, isfinish, name);
						}
					},
					skin: 'molv', //皮肤
					first: '首页', //将首页显示为数字1,。若不显示，设置false即可
					last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
					prev: false, //若不显示，设置false即可
					next: false //若不显示，设置false即可
				});
				window.localStorage.setItem("PageIndex",data.pageIndex);
				$("tbody").empty();
				$("thead").empty();
				var data = data.resultData;
				if(status == 1) {
					$("thead").append('<th>序号</th>' +
						'<th><input type="checkbox" name="" id="qx" value="" /></th>' +
						'<th>家长名称</th>' +
						'<th>学生姓名</th>' +
						'<th>班级</th>' +
//						'<th>学籍号</th>' +
						'<th>手机号</th>' +
						'<th>成员关系</th>' +
//						'<th>是否监护人</th>' +
						'<th>操作</th>')
					$.each(data, function(i, n) {
						$("tbody").append(
							'<tr data-id="' + n.id + '">' +
							'<td >' + (i+1) + '</td>' +
							'<td ><input type="checkbox"  data-cid="' + n.classId + '"  data-id="' + n.id + '" id="" value="" /></td>' +
							'<td >' + isNull(n.name) + '</td>' +
							'<td >' +isNull( n.studentName) + '</td>' +
							'<td >' + isNull(n.className) + '</td>' +
//							'<td >' + isNull(n.studentCode) + '</td>' +
							'<td >' + isNull(n.phoneNum) + '</td>' +
							'<td >' + isNull(n.relation) + '</td>' +
//							'<td >' + isNull(n.isGuardian) + '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxStudent.NewAddParent" data-toggle="modal" data-target="#myModal" class="layui-btn layui-btn-mini bj yinc">编辑</a>' +
							'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxStudent.NewDeleteParent" data-uid="' + n.userId + '" data-puid="' + n.pUserId + '" data-cid="' + n.classId + '" class="layui-btn layui-btn-mini layui-btn-danger stop yinc">停用</a>' +
							'</td>' +
							'</tr>'
						);
					});
				} else if(status == 0) {
					$("thead").append('<tr>' +
						'<th>序号</th>' +
						'<th><input type="checkbox"  id="qx" value="" /></th>' +
						'<th>家长姓名</th>' +
						'<th>学生姓名</th>' +
						'<th>毕业班级</th>' +
//						'<th>所属届次</th>' +
						'<th>手机号</th>' +
						'<th>成员关系</th>' +
//						'<th>是否监护人</th>' +
						'<th>操作</th>' +
						'</tr>');

					$.each(data, function(i, n) {
						$("tbody").append(
							'<tr data-id="' + n.id + '">' +
							'<td >' + (i+1) + '</td>' +
							'<td ><input type="checkbox" name="" data-cid="' + n.classId + '" data-stuid="' + n.studentId + '"  data-id="' + n.id + '" id="" value="" /></td>' +
							'<td >' + isNull(n.name) + '</td>' +
							'<td >' + isNull(n.studentName) + '</td>' +
							'<td >' + isNull(n.className) + '</td>' +
//							'<td >' + isNull(n.className) + '</td>' +
							'<td >' + isNull(n.phoneNum) + '</td>' +
//							'<td >' + isNull(n.relation) + '</td>' +
							'<td >' + isNull(n.isGuardian) + '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxStudent.NewAddParent" data-toggle="modal" data-target="#myModal" class="layui-btn layui-btn-mini bj yinc">编辑</a>' +
							'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxStudent.NewDeleteParentS"  data-cid="' + n.classId + '" data-stuid="' + n.studentId + '" class="layui-btn layui-btn-mini layui-btn-danger sc yinc">删除</a>' +
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

  
  
//添加编辑时获取所有学生列表
function getallstu(num){
	var getallstu ={
			url:"Student/GetStudentList",
			data: {
				stu_status: 1,
				Isfinish: 0,
				schoolId:SCHOOLID
			},
			type:"post"
		};
	commonFn(getallstu,function(data){
			var data = data.resultData;
			$("#basic").html("<option value=''></option>")
			$.each(data, function(i, n) {
				$("#basic").append('<option value="' + n.id + '">' + n.name + '</option>');
			});
			$("#basic").find("option[value='"+num+"']").attr("selected","selected");
			form.render();
	})
}
//查找学生信息
form.on('select(allstudent)', function(data){
  getstu(data.value);
}); 

function getstu(Id) {
	var getstu ={url:"Student/GetAStudent",data:  {
			studentid: Id,
			schoolId:SCHOOLID
		},type:"get"};
	commonFn(getstu,function(data){
				for(key in data) {
					$("#form99 input[name=StudentId]").val(data.id);
					$(".stu_xx ." + key).val(data[key]);
				}
	})
}
//添加初始化
$("#add_par").on("click", function() {
	layer.open({
	  type:1,
        title:"添加家长",
        content:$('#myModal'),
        area:['700px','520px'],
        cancel: function(){ 
        	$('#myModal').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
	$("#form99 .cont input").val("");
	$("input[name='id']").val("0");
	getallstu();
	Selects();
})

////添加编辑家长
form.on('submit(save1)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var saveper ={url:'Student/AddEditParent',data: bb,type:"post"};
	commonFn(saveper,function(data){
			layer.msg("保存成功！", {
				time: 1000
			}, function() {
				layer.closeAll();
				var pageindex = window.localStorage.getItem("PageIndex");
				parents(pageindex, Status, ClassId, Isfinish,searchName);
			});
	})
});

//
/*编辑获取一名家长信息*/
$("body").on("click", ".Operation .bj", function() {
	layer.open({
	  type:1,
        title:"编辑学生",
        content:$('#myModal'),
        area:['700px','520px'],
	});
	$("#myModal input").val('');
	var Id = $(this).attr("data-id");
	$("#myModal input[name='id']").val(Id);
	var getpar ={url:'Student/GetParent',data: {id: Id},type:"get"};
	commonFn(getpar,function(data){
			getallstu(data.studentId);
			getstu(data.studentId);
			for(key in data) {
				$("#form99 input[name='" + key + "']").val(data[key]);
			}
			Selects(data.gender,data.relation,data.isGuardian,data.islive,data.education);
			$("#cz_stu").hide();
	})
})


///************有效列表停用列表一条记录*******************/
$("body").on("click", ".Operation .stop", function() {
	var uId = $(this).attr("data-id");
	layer.confirm('你确定要停用该家长吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Student/StopParent",data:{
				id: uId
			},type:"get"};
	  commonFn(dele,function(data){
			layer.msg("停用成功", {
				time: 1000
			}, function() {
				var pageindex = window.localStorage.getItem("PageIndex");
				parents(pageindex, Status, ClassId, Isfinish,searchName);
			});
	  })
	})
	
})

/*有效列表批量停用*/
$(".plstop").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一条记录");
	} else {
		layer.confirm('你确定要停用这些家长吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Ids='';
			$.each(inputs,function(i, n) {
				var id=$(n).attr("data-id");
				if(i==0){
					Ids=id;
				}else if(i>0){
					Ids+=","+id;
				}
			});
			  var dele ={url:"Student/StopParent",data:{
				id: Ids
			},type:"get"};
	  		commonFn(dele,function(data){
			  	layer.msg("停用成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
					parents(pageindex, Status, ClassId, Isfinish,searchName);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
		}, function(){
		  layer.closeAll();
		});
	}
})

///************已删除列表彻底删除列表一条记录*******************/
$("body").on("click", ".Operation .sc", function() {
	var Id = $(this).attr("data-id");
	var stuid = $(this).attr("data-stuid");
	var Cid = $(this).attr("data-cid");
	layer.confirm('你确定要删除该家长吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Student/DeleteParent",data:{studentid:stuid,parentid:Id,classid:Cid},type:"post"};
	  commonFn(dele,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		var pageindex = window.localStorage.getItem("PageIndex");
			parents(pageindex, Status, ClassId, Isfinish,searchName);
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
		layer.confirm('你确定要停用这些家长吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Id='';
			var Stuid='';
			var Cid='';
			$.each(inputs,function(i, n) {
				var id=$(n).attr("data-id");
				var stuid = $(n).attr("data-stuid");
				var cid = $(n).attr("data-cid");
				if(i==0){
					Id=id;
					Stuid=stuid;
					Cid=cid;
				}else if(i>0){
					Id+=","+id;
					Stuid+=","+stuid;
					Cid+=","+cid;
				}
			});
			
			  var dele ={url:"Student/DeleteParent",data:{studentid:Stuid,parentid:Id,classid:Cid},type:"post"};
	 		 commonFn(dele,function(data){
			  	layer.msg("删除成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
				parents(pageindex, Status, ClassId, Isfinish,searchName);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
			
		}, function(){
		  layer.closeAll();
		});
	}
})



//导出所有选中的学生
$(".pldc").on("click", function() {
	var arr = [];
	var che = $('tbody input[type="checkbox"]:checked').length;
	if(che > 0) {
		$('tbody input[type="checkbox"]:checked').each(function(i, n) {
			var id = $(this).attr("data-id");
			arr.push(id);
		})
		var ids = arr.join(",");
		window.location.href=window.siteHost+"Filedown/ParentTemplateExport?id="+ids+"&schoolId="+SCHOOLID; 
		$('thead input').removeAttr("checked");
		$('tbody input').removeAttr("checked");
	} else {
		layer.msg("至少选择一位家长");
	}
})


//全选 
$("#qx").on("change", function() {
	AllSelect()
})


/*批量还原家长*/
$(".plhy").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一条记录");
	} else {
		layer.confirm('你确定要还原这些家长吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Ids='';
			$.each(inputs,function(i, n) {
				var id=$(n).attr("data-id");
				if(i==0){
					Ids=id;
				}else if(i>0){
					Ids+=","+id;
				}
			});
			  var hy ={url:"Student/BackParent",data:{
				id: Ids
			},type:"get"};
	  		commonFn(hy,function(data){
			  	layer.msg("还原成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
				    parents(pageindex, Status, ClassId, Isfinish,searchName);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
			
		}, function(){
		  layer.closeAll();
		});
	}
})
// 获取数据字典中的数据
function Selects(gender,relation,isGuardian,islive,education) {
	DataCenter("性别", $("#form99 select[name='gender']"),gender,"str");
	DataCenter("成员关系", $("#form99 select[name='relation']"),relation,"str");
	DataCenter("是否监护人", $("#form99 select[name='isGuardian']"),isGuardian,"str");
	DataCenter("是否生活在一起", $("#form99 select[name='isLive']"),islive,"str");
	DataCenter("最高学历", $("#form99 select[name='education']"),education,"str");
}

//下载模板
$("#xzmb").on("click",function(){
	window.location.href=window.siteHost+"Filedown/GetModelTemplate?alias=parent";
})

//批量导入家长
$("#drpar").on("click",function(){
	layer.open({
	  type:1,
        title:"批量导入学生",
        content:$('#drjz'),
        area:['360px','160px'],
        cancel: function(){ 
        	$('#drjz').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
        
	});
})

//批量导入家长上传
layui.upload({
    url: window.apiUrl+'Common/ImportFile'
    ,elem: '#file_par' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,title:'选择文件上传'
    ,ext: 'xls'
    ,success: function(res){
    	var data=res.data;
    	var URLs ={url:'Student/ParentTemplateImport',data:{schoolid:SCHOOLID,url:data},type:"get"};
		commonFn(URLs,function(){
			layer.msg("上传成功！", { time: 1000 }, function() {
				layer.closeAll();
				parents(1, Status, ClassId, Isfinish,searchName);
			});
		})
    }
 });

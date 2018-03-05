var SCHOOLID=getCookieByUserInfo("schoolid");
//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})
/**************班级列表信息显示*********************/
getClassroom(0);
function getClassroom(Grade) {
	$("#tbody").empty();
	var getclasslist ={url:"ClassRoom/GetClassRoomListWithTeacher",data:{schoolId:SCHOOLID,grade:Grade},type:"get"};
	commonFn(getclasslist,function(data){
			var aa;
			var IsFinish;
			$.each(data, function(i, n) {
				var splice = n.splice;
				aa = splice.slice(0, 4);
				if(n.isFinish == 1) {
					IsFinish = "是";
				} else {
					IsFinish = "否";
				}
				$("#tbody").append(
					'<tr data-id="' + n.id + '">' +
					'<td >' + (i+1) + '</td>' +
					'<td ><input type="checkbox" name="" data-id="' + n.id + '" id="" value="" /></td>' +
					'<td >' + isNull(n.name) + '</td>' +
					'<td >' + isNull(n.shortName) + '</td>' +
					'<td >' + isNull(n.splice) + '</td>' +
					'<td data-id="' + n.type + '" >' + isNull(n.typeName) + '</td>' +
//					'<td >' + aa + '</td>' +
					'<td >' + isNull(n.gradeName) + '</td>' +
					'<td >' + IsFinish + '</td>' +
					'<td class="Operation">' +
					'<a href="javascript:;" data-operation="AjaxClassRoom.EditClassRoom" data-id="' + n.id + '" data-toggle="modal" data-target="#myModal2" class="layui-btn layui-btn-mini bj yinc">编辑</a>' +
					'<a href="javascript:;" data-operation="AjaxClassRoom.DeleteClassRoom" data-id="' + n.id + '" class="layui-btn layui-btn-mini layui-btn-danger stop yinc">删除</a>' +
					'</td>' +
					'</tr>'
				);
			});
		
		quanxian();
	});
}
//全选 
$("#qx").on("change", function() {
	AllSelect(this);
})


/************删除一条记录*******************/
$("body").on("click", ".Operation .stop", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该班级吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"ClassRoom/DeleteClassRoom?id="+roId+"&schoolId="+SCHOOLID,type:"delete"};
	  commonFn(dele,function(data){
			layer.msg("删除成功", {
				time: 1000
			}, function() {
				getClassroom(0);
			});
		
	  })
	})
})
///*批量删除*/
$("#plsc").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一条记录");
	} else {
		layer.confirm('你确定要删除该班级吗？', {
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
		  var dele ={url:"ClassRoom/DeleteClassRoom?id="+Ids+"&schoolId="+SCHOOLID,type:"DELETE"};
		  commonFn(dele,function(data){
			layer.msg("删除成功", { time: 1000 }, function() {
					getClassroom(0);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
		  	})
		}, function(){
		  layer.closeAll();
		});
	}
})
//批量建班
$("#pladd").on("click",function(){
	layer.open({
	  type:1,
        title:"批量建班",
        content:$('#myModal3'),
        area:['360px','300px'],
	});
	$('#myModal3 input').val("");
	gettype();
	getgrade();
})
///保存-批量添加班级
form.on('submit(save3)',function(data){
	var bb=data.field;
	bb.school=1;
	var saveclass ={url:'ClassRoom/AddClassRoomBatch',data: bb,type:"post"};
	commonFn(saveclass,function(data){
		layer.msg("保存成功！", {
			time: 1000
		}, function() {
			layer.closeAll();
			getClassroom(0);
		});
		
	})
});
/*批量毕业班级*/
$("#plby").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一条记录");
	} else {
		layer.confirm('你确定要将这些班级设置成毕业吗？', {
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
			  var dele ={url:"ClassRoom/ClassGraduate",data:{classid:Ids,schoolId:SCHOOLID},type:"get"};
			  commonFn(dele,function(data){
				layer.msg("设置成功", { time: 1000 }, function() {
					getClassroom(0);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
			
		},function(){
		  layer.closeAll();
		});
	}

})

//添加班级模态框
$("#addclass").on("click",function(){
	layer.open({
	  type:1,
        title:"添加班级",
        content:$('#myModal'),
        area:['360px','360px'],
	});
	$('#myModal input').val("");
	gettype();
	getgrade();
})

///保存-添加班级
form.on('submit(save)',function(data){
	var bb=data.field;
	bb.schoolId=1;
	var saveper ={url:"ClassRoom/AddClassRoom",data: bb,type:"post"};
	commonFn(saveper,function(data){
			layer.msg("保存成功！", {
				time: 1000
			}, function() {
				 layer.closeAll();
				getClassroom(0);
			});
	})
});

/*编辑获取一个班级的信息*/
$("body").on("click", ".Operation .bj", function() {
	layer.open({
	  type:1,
        title:"编辑建班",
        content:$('#myModal2'),
        area:['360px','360px'],
	});
	$('#myModal input').val("");
	var Id = $(this).attr("data-id");
	var getclass ={url:'ClassRoom/GetClassRoom',data: { classid: Id,schoolId:SCHOOLID },type:"get"};
	commonFn(getclass,function(data){
			for(key in data) {
				$("#" + key).val(data[key]);
			}
			gettype(data.class_type);
			getgrade(data.grade);
	})
})
///保存-编辑班级
form.on('submit(save1)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var saveper ={url:"ClassRoom/EditClassRoom",data: bb,type:"post"};
	commonFn(saveper,function(data){
			layer.msg("保存成功！", {
				time: 1000
			}, function() {
				 layer.closeAll();
				getClassroom(0);
			});
	})
});

$("#Splice").on("keyup",function(){
	var gradeval=$("#myModal select[name='Grade']").val();
	var gradename=$("#myModal select[name='Grade']").find("option[value='"+gradeval+"']").text();
	var calssname=$(this).val();
	$("#myModal #Name").val(gradename+"("+calssname.substr(calssname.length-2)+")"+"班");
	
})





//添加类型设置复制
$("#addtype").on("click", function() {
	$("#type_tbody").append('<tr>' +
		'<td><input type="text" name="TypeName"  value="" /></td>' +
		'<td><input type="number" name="sort"  value="" /></td>' +
		'<td><input type="hidden" name="Id"  value="0" /><a class=" del" style="color: red;">删除</a></td>' +
		'</tr>');
})

//删除一条类型
$("body").on("click", ".del", function() {
	var roId = $(this).siblings("input").val();
	var $this = $(this);
	var roId = $(this).attr("data-id");
	if(roId == 0) {
			$this.parent().parent().remove();
	} else {
		layer.confirm('你确定要删除该班级类型吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
		  var dele ={url:"ClassRoom/DeleteClassType?id="+roId+"&schoolId="+SCHOOLID,type:"DELETE"};
		  commonFn(dele,function(data){
				layer.msg("删除成功", {
					time: 1000
				}, function() {
					$this.parent().parent().remove();
				});
		  })
		})
	}
})

//获取类型数据
$("#type_sz").on("click", function() {
	layer.open({
	  type:1,
        title:"班级类型设置",
        content:$('#myModal1'),
        area:['400px','400px'],
	});
	addeidttype();
})

//类型设置保存
$("#save2").on("click", function() {
	var tr = $("#type_tbody tr");
	var arr = [];
	$.each(tr, function(i, n) {
		var obj = {};
		obj.Name = $(n).find("td:eq(0) input").val();
		obj.SortId = $(n).find("td:eq(1) input").val();
		obj.id = $(n).find("td:eq(2) input").val();
		arr.push(obj);
	})
	var Data = JSON.stringify(arr);
	var savetype={url:'ClassRoom/AddEditClassType',data: { classes: Data ,schoolId:SCHOOLID},type:"get"};
	commonFn(savetype,function(data){
			layer.msg("保存成功", { time: 1000 }, function() {
				addeidttype();
			});
	});
})
//班级类型
function gettype(num){
	var gettypes={url:'ClassRoom/GetClassType',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(gettypes,function(data){
			$(".Type").html("<option value=''></option>")
			$.each(data, function(i, n) {
				$(".Type").append('<option value="' + n.id + '">' + n.name + '</option>');
			});
			$(".Type").find("option[value='"+num+"']").attr('selected',"selected");
			form.render();
	});
}

/*获取所有年段*/
function getgrade(num){
	$(".Grade").html("<option value=''></option>")
	var getgarde={url:'School/GetAllGradeList',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(getgarde,function(data){
		$.each(data, function(i, n) {
			var row = '<option value="' + n.id + '">' + n.grade + '</option>';
			$(".Grade").append(row);
		})
		$(".Grade").find("option[value='"+num+"']").attr('selected',"selected");
		form.render();
	}) 
	$(".Grade option:first-child").remove();

}

function addeidttype(){
	var gettype={url:'ClassRoom/GetClassType',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(gettype,function(data){
		$("#type_tbody").empty();
		$.each(data, function(i, n) {
			$("#type_tbody").append('<tr>' +
				'<td><input type="text" name="TypeName"  value="' + n.name + '" /></td>' +
				'<td><input type="number" name="sort"  value="' + n.sortId + '" /></td>' +
				'<td><input type="hidden" name="Id"  value="' + n.id + '" /><a class=" del" data-id="'+n.id+'" style="color: red;">删除</a></td>' +
				'</tr>');
		})
	});
}

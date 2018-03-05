var Url;
var issc=true;
var SCHOOLID=getCookieByUserInfo("schoolid");
/**************年段列表信息显示*********************/
getgrade();
function getgrade() {
	var state="";
	var getgradelist ={url:"School/GetAllGradeList",type:"get",data:{schoolId:SCHOOLID}};
	commonFn(getgradelist,function(data){
		$("#tbody").empty();
			$.each(data, function(i, n) {
				if(n.status == 0) {
					state = "停用";
				} else if(n.status == 1) {
					state = "正常";
				} else if(n.status == 2) {
					state = "空";
				}
				$("#tbody").append(
					'<tr data-id="' + n.id + '">' +
					'<td >' + (i+1) + '</td>' +
					'<td ><input type="checkbox" name="" data-id="' + n.id + '" id="" value="" /></td>' +
					'<td >' + isNull(n.grade) + '</td>' +
					'<td >' + isNull(n.shortName) + '</td>' +
					'<td >' + isNull(n.schoolYearStr) + '</td>' +
					'<td >' + isNull(n.year) + '</td>' +
					'<td >' + state + '</td>' +
					'<td ></td>' +
					'<td ></td>' +
					'<td >' + isNull(n.remark) + '</td>' +
					'<td class="Operation">' +
					'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxSchool.UpdateGrade" data-toggle="modal" data-target="#myModal" class="yinc layui-btn layui-btn-mini bj">编辑</a>' +
					'<a href="javascript:;" data-id="' + n.id + '" data-operation="AjaxSchool.DeleteGrade" class="layui-btn layui-btn-mini layui-btn-danger yinc stop">删除</a>' +
					'</td>' +
					'</tr>'
				);
			});
		quanxian();
	});
}


  
/************删除一条记录*******************/
$("body").on("click", ".Operation .stop", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该年段吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"School/DeleteGrade?ids="+roId+"&schoolId="+SCHOOLID,type:"DELETE"};
	  commonFn(dele,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		getgrade();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
})

//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})

///*批量删除*/
$("#plsc").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一个年段");
	} else {
		layer.confirm('你确定要停用这些年段吗？', {
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
		  var dele ={url:"School/DeleteGrade?ids="+Ids+"&schoolId="+SCHOOLID,type:"DELETE"};
		  commonFn(dele,function(data){
		  	layer.msg("删除成功", { time: 1000 }, function() {
				getgrade();
				$('thead input').removeAttr("checked");
				$('tbody input').removeAttr("checked");
			});
		  })
		}, function(){
		  layer.closeAll();
		});
	}
})

//初始化
$("#add").on("click", function() {
	layer.open({
	  type:1,
        title:"添加年段",
        content:$('#myModal'),
        area:['400px','440px'],
	});
	Url="School/AddGrade";
	$("#form0 input").val("");
	$("#form0 input[name='id']").val("0");
	$("#form0 textarea").val("");
	var d = new Date();
	var year = d.getFullYear()
	$("#form0 input[name='grade']").attr("placeholder", year + "届");
	DataCenter("入学年份", $("#form0 select[name='schoolYear']"));
	//DataCenter("最高学制", $("#form0 select[name='Year']"));
	var getyear ={url:"School/GetCurrentYear",data:{schoolId:SCHOOLID},type:"get"};
	commonFn(getyear,function(rel){
		//$("#form0 input[name='grade']").attr("placeholder",rel);
		var opt = $("#form0 select[name='schoolYear'] option");
		$.each(opt, function(i, n) {
			var t = $(n).text();
			if(t == rel) {
				$(n).prop("selected", true);
				form.render();
				return false;
			}
		});
		
	})
})

  //保存--添加
form.on('submit(save)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var AddGrade ={url:Url,data: bb,type:"post"};
	commonFn(AddGrade,function(data){
		layer.msg("保存成功", { time: 1000 }, function() {
			layer.closeAll();
			 getgrade();
		});
	})
    return false;
});

/*编辑获取详细信息*/
$("body").on("click", ".Operation .bj", function() {
	layer.open({
	  type:1,
        title:"编辑年段",
        content:$('#myModal'),
        area:['400px','440px'],
	});
	$("#form0 input").val("");
	Url="School/UpdateGrade";
	var Id = $(this).attr("data-id");
	var getGrade ={url:"School/GetAGrade",data: { id: Id,schoolId:SCHOOLID },type:"get"};
	commonFn(getGrade,function(data){
		for(key in data) {
			$("#" + key).val(data[key]);
		}
		DataCenter("入学年份", $("#form0 select[name='schoolYear']"),data.schoolYear);
		//DataCenter("最高学制", $("#form0 select[name='Year']"),data.Year);
		$("#Status option[value='" + data.Status + "']").attr("selected", "selected").siblings().attr("selected", false);
		form.render();
	})

})
//save($("#save1"), Url);

//全选 
$("#qx").on("change", function() {
	AllSelect(this);
})




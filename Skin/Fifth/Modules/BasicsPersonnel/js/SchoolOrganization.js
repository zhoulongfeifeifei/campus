var menu;
var actionNodeID;
var actionNodeName;
var groupid=0;
var t; //修改部门树
var arr = [];
/**************侧导航*********************/
var index = 1;
var URL = "Teacher/AddTeacherGroup"; //添加部门 
var SCHOOLID=getCookieByUserInfo("schoolid");

  
//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})

//教师列表
navlist();
function navlist(){
	var getgrouptree ={url:"Teacher/GetTeaGroupListTree",data:{schoolId:SCHOOLID},type:"get"};
	commonFn(getgrouptree,function(res){
		$(".nav_list").empty();
		menu = $.ligerMenu({
			top: 100,
			left: 100,
			width: 120,
			items:            [            //{ text: '增加', click: add  },
				           { text: '编辑', click: edit },             { line: true },             { text: '删除', click: dele }           
			]
		});
		$(".nav_list").ligerTree({
			data: res,
			checkbox: false,
			isExpand: false,
			autoCheckboxEven:false,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onSelect: function(note) {
				actionNodeID = note.data.id;
				var name = note.data.text;
				$(".text-title span").html("组织架构 > " + name);
				var pageindex = window.localStorage.getItem("PageIndex");
				zzjg(pageindex, actionNodeID);
			},
			onContextmenu: function(node, e) {               
				actionNodeName = node.data.text;               
				actionNodeID = node.data.id;               
				menu.show({ top: e.pageY, left: e.pageX });               
				return false;           
			}
		})
	});
}
//function add(){
//	$("#form88 input").val("");
//	$("#form88 input[name='appid']").val("140");
//	$("#myModalLabel").html("新增部门");
// 	$('#myModal').modal('show');
//}
function edit() {
	layer.open({
	  type:1,
        title:"编辑部门",
        content:$('#myModal'),
        area:['360px','360px'],
	});
	$("#form88 input[name='group_id']").val(actionNodeID);
	URL = "Teacher/EditTeacherGroup";
	var editgroup ={url:"Teacher/GetTeacherGroup",data: { id: actionNodeID,schoolId:SCHOOLID },type:"get"};
	commonFn(editgroup,function(data){
		for(key in data) {
			$("#form88 input[name='" + key + "']").val(data[key]);
		}
		getgroupselect(data.pid);
		getallleader(data.leader);
	})
}

function dele() {
	layer.confirm('你确定要该部门吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Teacher/DeleteTeacherGroup?id="+actionNodeID+"&schoolId="+window.schoolid,type:"delete"};
	  commonFn(dele,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		navlist();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}


//搜索老师
$(".ssls").on("click", function() {
	var name = $(this).prev().find("input").val();
	zzjg(1, 0, name);
})
/**************老师列表*********************/
var index = 1;
zzjg();
function zzjg(current, id, Name) {
	var gettealist ={url:"Teacher/GetTeacherList",data: { PageIndex: current, groupid: id, name: Name, status: 1, isout: 0 ,schoolId:SCHOOLID},type:"post"};
	commonFn(gettealist,function(data){
			laypage({
				cont: 'page',
				pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) { //触发分页后的回调
					if(!first) { //一定要加此判断，否则初始时会无限刷
						zzjg(e.curr, id, Name);
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
			index = 1;
			var data = data.resultData;
			$.each(data, function(i, n) {
				var xmls = $(n.groupXml)
				var GroupXml = '';
				var GroupId = [];
				xmls.each(function(i, ele) {
					var id = $(ele).find("groupid").text(); //each是循环执行，即多次弹出。 
					var name = $(ele).find("groupname").text(); //取得属性的方法 
					GroupXml += '<span>' + name + '</span><br/>';
					GroupId.push(id);
				})

				//RoleXml
				var roleXmls = $(n.roleXml)
				var RoldId = [];
				roleXmls.each(function(i, ele) {
					var id = $(ele).find("usertype").text(); //each是循环执行，即多次弹出。 
					RoldId.push(id);
				})

				$("#tbody").append(
					'<tr data-id="' + n.teacherId + '">' +
					'<td >' + index + '</td>' +
					'<td ><input type="checkbox" data-user="' + n.userId + '" data-id="' + n.teacherId + '"  /></td>' +
					'<td >' + isNull(n.name) + '</td>' +
					'<td >' + isNull(n.number) + '</td>' +
					'<td >' + isNull(n.gender) + '</td>' +
					'<td >' + isNull(n.phone) + '</td>' +
					'<td >' + GroupXml + '</td>' +
					'<td ></td>' +
					'<td class="Operation" >' +
					'<a href="javascript:;" data-operation="AjaxTeacher.NewEditTeaToGroup" data-id="' + n.teacherId + '" data-name="' + n.name + '" data-userid="' + n.userId + '" data-groupid="' + GroupId + '"  class="layui-btn layui-btn-green layui-btn-mini bumen yinc">修改部门</a>&nbsp;&nbsp;' +
					'<a href="javascript:;" data-operation="AjaxTeacher.NewEditTeaToRole" data-id="' + n.teacherId + '" data-name="' + n.name + '" data-userid="' + n.userId + '" data-roldid="' + RoldId + '"   class="layui-btn layui-btn-green layui-btn-mini userRole yinc">修改角色</a>' +
					'</td>' +
					'</tr>'

				);
				index++;
			});
			quanxian();
	});
}

//全选 
$("body").on("change", "#qx",function() {
	AllSelect(this);
})


//部门添加编辑所属部门
function getgroupselect(num){
	var parentgroup ={url:'Teacher/GetTeaGroupListTree',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(parentgroup,function(rel){
		$("#myModal select[name='pid']").html("<option value='0'></option><option value='0'>无</option>");
		$.each(rel, function(i, n) {
			$("#myModal select[name='pid']").append('<option value="' + n.id + '">' + n.text + '</option>');
		});
		$("#myModal select[name='pid']").find("option[value='"+num+"']").attr('selected',"selected");
		form.render();
	})
}  

//获取部门领导列表
function getallleader(num){
	var getgroups={url:"Teacher/GetTeacherList",data: { pageSize: 99999,schoolId:SCHOOLID,status: 1, isout: 0 },type:"post"};
	commonFn(getgroups,function(data){
		$("#form88 select[name='leader']").html("<option value='0'></option>");
		var data = data.resultData;
		$.each(data, function(i, n) {
			$("#form88 select[name='leader']").append(
				'<option value="' + n.teacherId + '">' + n.name + '</option>'
			);
		});
		$("#form88 select[name='leader']").find("option[value='"+num+"']").attr('selected',"selected");
		form.render();
	});
}
///*批量删除列表里教师部门关系*/
$("#plsc").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一名教师");
	} else {
		layer.confirm('你确定要删除该记录吗？', {
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
			  var dele ={url:"Teacher/BatchDelTeacherGroup",data:{
			teacherid: Ids,
			schoolId:SCHOOLID
		},type:"get"};
			  commonFn(dele,function(data){
			  	layer.msg("删除成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
					zzjg(pageindex);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
		}, function(){
		  layer.closeAll();
		});
	}
})

//添加部门表单弹窗
$("#addbm").on("click",function(){
	layer.open({
	  type:1,
        title:"添加部门",
        content:$('#myModal'),
        area:['360px','360px'],
	});
	$('#myModal').find("input").val('');
	$('#myModal').find("input[name='group_id']").val('0');
	URL = "Teacher/AddTeacherGroup";
	getgroupselect();
	getallleader();
})

//添加部门
form.on('submit(save)',function(data){
	var bb=data.field;
	bb.schoolid=SCHOOLID;
	var addgroup ={url:URL,data: bb,type:"post"};
	commonFn(addgroup,function(data){
            layer.msg('添加成功', { time: 1000 }, function() {
                navlist();
                layer.closeAll();
            });
		})
    return false;
});


//左侧导航筛选全部老师
$("body").on('click', ".nav_title", function() {
	var pageindex = window.localStorage.getItem("PageIndex");
	zzjg(pageindex);
})

//修改所在部门
var Teacherid;
var Userid;
$("body").on('click', ".bumen", function() {
	layer.open({
	  type:1,
        title:"修改所在部门",
        content:$('#myModal1'),
        area:['360px','360px'],
	});
	$("#form99 input").val('');
	Teacherid = $(this).attr("data-id");
	var name = $(this).attr("data-name");
	Userid = $(this).attr("data-userid");
	var groupid = $(this).attr("data-groupid");
	xgbm(groupid);
	$("#form99 input[name='teacherid'] ").val(Teacherid);
	$("#form99 input[name='userid'] ").val(Userid);
	$("#form99 input[name='teacherName'] ").val(name);
})

function xgbm(num) {
	console.log(num)
	var addgroup ={url:'Teacher/GetTeaGroupListTree',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(addgroup,function(data){
		t = $(".xg_list").ligerTree({
			data: data,
			checkbox: true,
			autoCheckboxEven:false,
			idFieldName: 'id',
			parentIDFieldName: 'pid'
		})
		if(num){
			var groupid = num.split(",");
			console.log(groupid)
			for(var i = 0; i < groupid.length; i++) {
				var div=$(".xg_list  li[id='" + groupid[i] + "']").children("div").get(0);
				$(div).find("div.l-checkbox").removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
			}
		}
	});
}

$.ligerui.controls.Tree.prototype.alert = function() {
	arr.splice(0,arr.length);
	var data = this.getChecked();
	for(var i = 0; i < data.length; i++) {
		arr.push(data[i].data.id);
	}
};

$("body").on('click', "#save1", function() {
	t.alert();
	var groupids=arr.join(",");
	if(!groupid){
		groupid = groupids;
	}else{
		groupid = 0;
	}
	var addgroup ={url:'Teacher/ChangeTeacherGroup',data: { teacherid: Teacherid, userid: Userid, groupid ,schoolId:SCHOOLID},type:"get"};
	if(!groupid){groupid}
	commonFn(addgroup,function(data){
		layer.msg("修改成功！", { time: 1000 }, function() {
			layer.closeAll();
			var pageindex = window.localStorage.getItem("PageIndex");
			zzjg(pageindex);
		})
	})
})

//修改角色初始化弹窗

$("body").on('click', ".userRole", function() {
	layer.open({
	  type:1,
        title:"修改角色",
        content:$('#myModal2'),
        area:['360px','360px'],
	});
	$("#formUserRole input").val('');
	Teacherid = $(this).attr("data-id");
	var name = $(this).attr("data-name");
	Userid = $(this).attr("data-userid");
	var roldid = $(this).attr("data-roldid");
	$("#formUserRole input[name='teacherid'] ").val(Teacherid);
	$("#formUserRole input[name='userid'] ").val(Userid);
	$("#formUserRole input[name='teacherName'] ").val(name);
	var roldids = roldid.split(",");
	userRoleList(roldids);
});

//修改角色 所有角色列表
function userRoleList(num) {
	var CurrentSchoolRole ={url:'Account/GetRoleList',data:{schoolId:SCHOOLID},type:"get"};
	$(".ulRoleList").html('');
	commonFn(CurrentSchoolRole,function(data){
		$.each(data, function(i, n) {
			$(".ulRoleList").append('<li class="zj_box">' +
				'<div class="zj_title" ><span class="name">' + n.roleName + '</span><input type="checkbox" name="pid" value="' + n.roleId + '"></div>' +
				'</li>');
			index++;
		}); 
		for(var i = 0; i < num.length; i++) {
			$(".ulRoleList li").find("input[value='" + num[i] + "']").attr("checked", "checked");
		}
	});
}

$("body").on('click', "#btnSaveRole", function() {
	var arr = [];
	var inputs = $("#formUserRole input:checked");
	$.each(inputs, function(i, n) {
		arr.push($(n).val());
	})
	var rolesid = arr.join(",");
	var addgroup ={url:'Teacher/EditTeaToRole',data: { rolesid:rolesid, userid: Userid,schoolId:SCHOOLID  },type:"get"};
	commonFn(addgroup,function(data){
		layer.msg("设置成功", { time: 1000 }, function() {
			layer.closeAll();
			var pageindex = window.localStorage.getItem("PageIndex");
			zzjg(pageindex);
		})
	})
})

//设置老师加入部门
var szgroup ={url:'Teacher/GetTeaGroupListTree',data:{schoolId:SCHOOLID},type:"get"};
commonFn(szgroup,function(rel){
			  $("#test2").ligerComboBox({
                width: 190,
                height:30,
                autoCheckboxEven:false,
                selectBoxWidth: 200,
                selectBoxHeight: 200, valueField: 'id',treeLeafOnly:false,
                tree: {
                    data:rel, checkbox: false, ajaxType: 'get'
                },
                initIsTriggerEvent: false,
                onSelected: function (note){
					var arr = [];
					var inputs=$('input[type="checkbox"]:checked');
					if(inputs.length>0){
						$(inputs).each(function(i, n) {
							var obj = {};
							obj.Tid = $(n).attr("data-id");
							obj.UserId = $(n).attr("data-user");
							obj.IsIn = false;
							arr.push(obj);
						});
						var Str = JSON.stringify(arr);
						var AddTeaToGroup ={url:'Teacher/AddTeaToGroup',data:{
								schoolId:SCHOOLID,
								str: Str,
								groupid: note
							},type:"get"};
						commonFn(AddTeaToGroup,function(data){
								layer.msg("设置成功", { time: 1000 }, function() {
									var pageindex = window.localStorage.getItem("PageIndex");
									zzjg(pageindex);
								});
							}); //这里返回的类型有：json,html,xml,text
					}else{
						layer.msg("至少选择一名老师", { time: 1000 });
					}
				}
            });
})


//下载模板
$("#xzmb").on("click",function(){
	window.location.href=window.siteHost+"Filedown/GetModelTemplate?alias=group";
})

//批量导入部门教师
$("#pldr").on("click",function(){
	layer.open({
	  type:1,
        title:"批量导入部门教师",
        content:$('#importtea'),
        area:['360px','160px'],
	});
})
//p批量导入教师上传
layui.upload({
    url: window.apiUrl+'Common/ImportFile'
    ,elem: '#file_tea' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,title:'选择文件上传'
    ,ext: 'xls'
    ,success: function(res){
    	var data=res.data;
    	var URLs ={url:'Teacher/TeaGroupTemplateImport',data:{schoolid:SCHOOLID,url:data},type:"get"};
		commonFn(URLs,function(){
			layer.msg("上传成功！", { time: 1000 }, function() {
				layer.closeAll();
				var pageindex = window.localStorage.getItem("PageIndex");
									zzjg(pageindex);
			});
		})
    }
 });

 


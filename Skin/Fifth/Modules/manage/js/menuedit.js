 var layer = layui.layer,
 	laypage = layui.laypage;
 var IDs; //修改部门树
 //获取模块名列表
 var treeId = "";

 function gettree() {
 	//  $.ajax({
 	// 	type: "get",
 	// 	dataType: "Json",
 	// 	data:{id:treeId},
 	// 	url: "Manage/GetListAdminUserMenuTree",
 	// 	async: false,
 	// 	success: function(data) {
 	// 		$("#ModulePid").ligerTree({
 	// 			data: data.Data,
 	// 			checkbox: true,
 	// 			single:true,
 	// 			idFieldName: 'id',
 	// 			parentIDFieldName: 'pid',
 	// 			onCheck: function(note) {
 	// 				IDs = note.data.id;
 	// 				$("#form0 input[name='ModulePid']").val(IDs);
 	// 			},
 	// 		})
 	// 	}
 	// });
 	commonFn({
 		url: "Manage/GetListAdminUserMenuTree",
 		data: {
 			id: treeId || 0,
 			schoolId : getCookieByUserInfo('schoolid')
 		}
 	}, function(data) {
 		$("#modulePid").ligerTree({
 			data: data,
 			checkbox: true,
 			single: true,
 			idFieldName: 'id',
 			parentIDFieldName: 'pid',
 			onCheck: function(note) {
 				IDs = note.data.id;
 				$("#form0 input[name='modulePid']").val(IDs);
 			},
 		})
 	})
 }

 /*****************获取信息**********************/
 var parameters = window.location.href.split("?")[1];
 var id;
 if (parameters)
 	id = parameters.split("=")[1];

 var postUrl = "Manage/Add";
 if (id) {
 	postUrl = "Manage/Update";
 	// $.ajax({
 	// 	type: "post",
 	// 	dataType: "Json",
 	// 	data: {
 	// 		id: id
 	// 	},
 	// 	url: "Manage/GetModel",
 	// 	success: function(data) {

 	// 		var data = data.Data;
 	// 		for (key in data) {
 	// 			$("#" + key).val(data[key]);
 	// 		}
 	// 		$("#ModulePid option[value=" + data.ModulePid + "]").attr("selected", "selected").siblings().attr("selected", false);
 	// 		$("#TypeId option[value=" + data.TypeId + "]").attr("selected", "selected").siblings().attr("selected", false);
 	// 	$("#form0 input[name='ModulePid']").val(data.ModulePid);
 	// 		check(data.ShowAppCenter, $("#ShowAppCenter"));
 	// 		check(data.ShowMyClass, $("#ShowMyClass"));
 	// 		check(data.ShowMyApp, $("#ShowMyApp"));
 	// 		check(data.IsSendDynamic, $("#IsSendDynamic"));
 	// 		treeId=data.ModulePid;
 	// 	gettree();
 	// 	}
 	// });

 	commonFn({
 		url: "Manage/GetModel",
 		data: {
 			id: id
 		}
 	}, function(data) {
 		for (key in data) {
 			$("#" + key).val(data[key]);
 		}
 		$("#modulePid option[value=" + data.modulePid + "]").attr("selected", "selected").siblings().attr("selected", false);
 		$("#typeId option[value=" + data.typeId + "]").attr("selected", "selected").siblings().attr("selected", false);
 		$("#form0 input[name='modulePid']").val(data.modulePid);
 		check(data.showAppCenter, $("#showAppCenter"));
 		check(data.showMyClass, $("#showMyClass"));
 		check(data.showMyApp, $("#showMyApp"));
 		check(data.isSendDynamic, $("#isSendDynamic"));
 		layui.form().render();
 		treeId = data.modulePid;
 		gettree();
 	})
 } else {
 	gettree();
 }

 function check(a, b) {
 	if (a == 1) {
 		b.attr("checked", "checked");
 	} else {
 		b.checked = false;
 	}
 }
 ///保存
 $("#save").on("click", function() {
 	var va = $("#modulePid").val();
 	if (va == id) {
 		layer.msg("父级栏目不能选择自身");
 	} else {
 		$("input[type='checkbox']:checked").val(1);
 		var bb = aa($("#form0"));
 		bb.orderId = bb.orderId ? bb.orderId : 0;
 		// $.ajax({
 		// 	type: "post",
 		// 	dataType: "Json",
 		// 	url: postUrl,
 		// 	data: bb,
 		// 	success: function(data) {
 		// 		if (data.Status == 1) {
 		// 			layer.msg("保存成功！", {
 		// 				time: 1000
 		// 			}, function() {
 		// 				window.location.href = "menulist.html";
 		// 			});
 		// 		} else {
 		// 			layer.msg(data.Message);
 		// 		}
 		// 	}
 		// })

 		commonFn({
 			url: postUrl,
 			type: "post",
 			data: bb
 		}, function(data) {
 			location.href = "menulist.html";
 		})
 	}
 })
 var aa = function(form) {
 	var o = {};
 	$.each(form.serializeArray(), function(index) {
 		if (o[this['name']]) {
 			o[this['name']] = o[this['name']] + "," + this['value'];
 		} else {
 			o[this['name']] = this['value'];
 		}
 	});
 	return o;
 }


 $('select[name="modulePid"]').change(function() {
 	var va = $(this).val();
 	if (va == id) {
 		layer.msg("父级栏目不能选择自身");
 	}
 })
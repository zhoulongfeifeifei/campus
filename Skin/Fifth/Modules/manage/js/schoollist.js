 var layer = layui.layer,
 	laypage = layui.laypage,
 	state, school_type;
 /***************获取学校列表信息***********************/
 obtainList();

 function obtainList(current) {
 	$('tbody tr').each(function() {
 		$(this).remove();
 	});
 	commonFn({
 		url: 'Manage/GetListSchool'
 	}, function(res) {
 		if (res && res.length > 0) {
 			$.each(res, function(i, n) {
 				if (n.state == 1) {
 					state = "正常";
 				} else {
 					state = "-";
 				}
 				if (n.school_type == 1) {
 					school_type = "小学";
 				} else if (n.school_type == 2) {
 					school_type = "初中";
 				} else if (n.school_type == 3) {
 					school_type = "高中";
 				} else if (n.school_type == 4) {
 					school_type = "大学";
 				}

 				$("#roleTable").append('<tr data-id="' + n.school_id + '" id="roleRow">' +
 					'<td >' + n.school_id + '</td>' +
 					'<td >' + n.school_name + '</td>' +
 					'<td >' + n.school_address + '</td>' +
 					'<td >' + school_type + '</td>' +
 					'<td >' + state + '</td>' +
 					'<td >' + solveTime (n.intime) + '</td>' +
 					'<td class="edit">' +
 					'<a href="schooledit.html?id=' + n.school_id + '" class="layui-btn layui-btn-mini">编辑</a>' +
 					'<a href="adminedit.html?id=' + n.school_id + '" class="layui-btn layui-btn-mini" >管理员</a>' +
 					//'<a href="userlist.html?SchoolId=' + n.school_id + '" class="layui-btn layui-btn-mini" >用户管理</a>' +
 					'<a href="schoolrole.html?id=' + n.school_id + '" class="layui-btn layui-btn-mini" >权限分配</a>' +
 					'<a href="manageLog.html?schoolid=' + n.school_id + '" class="layui-btn layui-btn-mini" >操作日志</a>' +
 					'<a data-id="' + n.school_id + '" class="layui-btn layui-btn-mini stop">删除</a>' +
 					'</td>' +
 					'</tr>');
 			});
 		}
 	})
 }
 /************删除班级列表*******************/
 $("body").on("click", ".edit .stop", function() {
 	var schoolId = $(this).attr("data-id");
 	layer.confirm('你确定要删除吗？', function(index) {
 			layer.close(index);
 			commonFn({
 				url: 'Manage/DeleteSchool',
 				data: {
 					id: schoolId
 				},
 				type: 'delete'
 			}, function() {
 				location.href = "schoollist.html";
 			})
 	})
 })

 function yesno(num) {
 	var yes;
 	if (num == 1) {
 		yse = "是";
 	} else {
 		yse = "否";
 	}
 	return yse;
 }
 //退出登录
 $("#out").on("click", function() {
 	clearToken();
 })
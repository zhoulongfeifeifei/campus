var layer = layui.layer,
	laypage = layui.laypage,
	form = layui.form(),
	SchoolIds = 0,
	Type = getUrlParam("Type"),
	ClassIds = 0,
	GroupIds = 0,
	keys = "",
	IsLock;
/***************获取学生列表信息***********************/


commonFn({
	url: 'Manage/GetListSchool',
}, function(data) {
	if (data && data.length > 0)
		$(".school").empty(),
		$.each(data, function(i, n) {
			$(".school").append('<option value="' + n.school_id + '" >' + n.school_name + '</option>');
		});
	
	SchoolIds = $(".school").val();
	Type == 1 ? getgroup(SchoolIds) : getclass(SchoolIds);
	form.render();
})



form.on('select(school)',function(data){
	$('#seach').val('');
	SchoolIds = data.value;
	obtainList(1, Type, SchoolIds, ClassIds, GroupIds, $('#seach').val());
})
form.on('select(classs)',function(data){
	$('#seach').val('');
	ClassIds = data.value;
	obtainList(1, Type, SchoolIds, ClassIds, GroupIds, $('#seach').val());
})
form.on('select(organization)',function(data){
	$('#seach').val('');
	GroupIds = data.value;
	obtainList(1, Type, SchoolIds, ClassIds, GroupIds, $('#seach').val());
})
$(".ss").on("click", function() {
	obtainList(1, Type, SchoolIds, ClassIds, GroupIds, $('#seach').val());
})




function yesno(num) {
	var yes = num == 1 ? "是" : "否"
	return yse;
}
function getgroup(SchoolId) {
	commonFn({
		url: 'Manage/GetListTeacherGroup',
		data: {
			schoolId: SchoolId
		},
	}, function(data) {
		$(".organization").html('<option value="">全部老师</option>');
		$.each(data, function(i, n) {
			$(".organization").append('<option value="' + n.group_id + '" >' + n.group_name + '</option>');
		});
		GroupIds = $(".organization").val();
		form.render();
		obtainList('', Type, SchoolIds, ClassIds, GroupIds, keys);
	})
}
function getclass(SchoolId) {
	commonFn({
		url: 'Manage/GetListClass',
		data: {
			schoolId: SchoolId
		},
	}, function(data) {
		$(".classs").empty();
		$.each(data, function(i, n) {
			$(".classs").append('<option value="' + n.class_id + '" >' + n.class_name + '</option>');
		});
		GroupIds = $(".classs").val();
		form.render();
		obtainList('', Type, SchoolIds, ClassIds, GroupIds, keys);
	})
}
function obtainList(current, Type, SchoolIds, ClassIds, GroupIds, keys) {
	$("#roleTable").empty();
	commonFn({
		url: 'Manage/GetListUser',
		data: {
			PageIndex: current || 1,
			type: Type, //学生，家长，老师的类型
			SchoolId: SchoolIds || 0, //学校id 
			ClassId: ClassIds || 0, //班级id
			GroupId: GroupIds || 0, //组织架构部门id
			name: keys
		},
		type:'post'
	}, function(res) {
		laypageOk(res.PageCount,res.PageIndex,function(curr){
			obtainList(curr, Type, SchoolIds,ClassIds,GroupIds,keys);
		})
		if (res && res.resultData && res.resultData.length > 0) {
			$.each(res.resultData, function(i, n) {
				var IsLock = n.isLock = 1 ? "正常" : "-" ;
				$("#roleTable").append('<tr data-id="' + n.user_id + '" id="roleRow">' +
					'<td >' + n.user_id + '</td>' +
					'<td >' + n.name + '</td>' +
					'<td >' + n.gender + '</td>' +
					'<td >' + n.xMobile + '</td>' +
					'<td >' + n.userRoles + '</td>' +
					'<td >' + IsLock + '</td>' +
					'<td >' + solveTime(n.intime) + '</td>' +
					'</tr>');
			});
		}
	})
}

/*
//删除班级列表
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
	});
})
$("body").on("click", ".edit .lock", function() {
	var userId = $(this).attr("data-id");
	var userType = $(this).attr("data-type");
	layer.confirm('你确定要锁定吗？', function(index) {
		layer.close(index)
		commonFn({
			url: 'Manage/LockUser?userid=' + userId + '&usertype=' + userType + '&islock=1',
			// data:{
			// 	userid: userId,
			// 	usertype: userType,
			// 	islock: 1
			// },
			type: 'delete'
		}, function(res) {
			location.href = "userlist.html?id=" + schoolId;
		})
	})
})
	//表格的左侧绿色的边框
$('tbody tr').click(function() {
	$('tbody tr').css('background', '#fff');
	$(this).css('background', '#f2f2f2');

	$('tr td').removeClass('td-left')
	$(this).children('td').eq(0).addClass('td-left');
})
*/
/////保存id

function local(a) {
	localStorage.removeItem("modelId", '');
	localStorage.removeItem("Title", '');
	var modelId = $(a).parent().parent().attr("data-id");
	var Title = $(a).parent().parent().attr("data-toggle");
	localStorage.setItem("modelId", modelId);
	localStorage.setItem("Title", Title);
}
/**********************审批管理列表显示************************/
getmodellist();

function getmodellist(current) {
	$("tbody").empty();
	var GetChaoSongToMeList = {
		url: "Examine/GetListTemplate",
		type: "get",
		data: {
			PageIndex: current,
			PageSize: 10,
			schoolId: window.schoolid
		}
	};
	commonFn(GetChaoSongToMeList, function(data) {
		$.each(data, function(i, n) {
			var l_state = '';
			var r_state = '';
			var bgcolor = '';
			var istrue = '';
			if(n.canStop == true && n.canStart == false) {
				l_state = "启用";
				r_state = '停用';
				bgcolor = "blue";
				istrue = 0;
			} else if(n.canStop == false && n.canStart == true) {
				l_state = "停用";
				r_state = '启用';
				bgcolor = "red";
				istrue = 1;
			}
			$("tbody").append('<tr data-userid="' + n.userId + '" data-id="' + n.id + '" id="roleRow">' +
				'<td id="Title">' + n.title + '<span class="state"><b class="' + bgcolor + '">' + l_state + '</b></span></td>' +
				'<td id="Remark">' + n.remark + '</td>' +
				'<td id="EditTime">' + solveTime(n.editTime) + '</td>' +
				'<td id="Order">' +
				'<a href="EditCreate.html?id=' + n.id + '" data-operation="Examine.Edit" id="bj" class="link text yinc" target="_blank">编辑 </a>' +
				'<a href="AllHistoryApproval.html" onclick="local(this);" class="link text blue">历史数据 </a>' +
				'<a href="javascript:;" data-operation="Examine.Start" class="link text change yinc" data-istrue="' + istrue + '">' + r_state + ' </a>' +
				'<a href="javascript:;"  data-operation="Examine.DeleteTemplate" class="sc yinc" > 删除 </a>' +
				'</td>' +
				'</tr>');

		});
		quanxian();
	});
}

$("body").on('click', '.change', function() {
	var id = $(this).parent().parent().attr("data-id");
	var userid = $(this).parent().parent().attr("data-userid");
	var name = $(this).attr("data-istrue");
	if(name == 0) {
		var Stop = {
			url: "Examine/Stop",
			type: "get",
			data: {
				id: id,
				userid: userid,
				schoolId: window.schoolid
			}
		};
		commonFn(Stop, function(data) {
			layer.msg("停用成功", {
				time: 1000
			}, function() {
				getmodellist();
			});

		})
	} else if(name == 1) {
		var Start = {
			url: "Examine/Start",
			type: "get",
			data: {
				id: id,
				userid: userid,
				schoolId: window.schoolid
			}
		};
		commonFn(Start, function(data) {
			layer.msg("启用成功", {
				time: 1000
			}, function() {
				getmodellist();
			});

		})
	}
});

$("body").on("click", ".sc", function() {
	var modelid = $(this).parent().parent().attr("data-id");
	layer.confirm('你确定要删除该模板吗？', {
		icon: 3,
		title: false
	}, function(index) {
		layer.close(index);
		var DeleteTemplate = {
			url: "Examine/DeleteTemplate?",
			data: {
				templateId: modelid,
				schoolId: window.schoolid
			},
			type: "get"
		};
		commonFn(DeleteTemplate, function(data) {
			layer.msg("删除成功", {
				time: 1000
			}, function() {
				getmodellist();
			});
		});

	})
})

function local(a) {
	localStorage.removeItem("Tjid", '');
	localStorage.removeItem("TjTitle", '');
	var Tjid = $(a).parent().parent().attr("data-id");
	var TjTitle = $(a).parent().parent().attr("data-toggle");
	localStorage.setItem("Tjid", Tjid);
	localStorage.setItem("TjTitle", TjTitle);
}
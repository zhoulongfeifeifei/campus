/******************所有我的历史审批列表***************************/
var UserId = localStorage.getItem("UserId");
var TjTitle = localStorage.getItem("TjTitle");
var Tjid = localStorage.getItem("Tjid");
$(".toptitle").html("[" + TjTitle + "]使用详情");
obtainList();

function obtainList(current) {
	var Statistics = {
		url: "Examine/StatisticsUserApply",
		type: "post",
		data: {
			PageIndex: current,
			PageSize: 10,
			templateId: Tjid,
			UserId: UserId,
			schoolid: window.schoolid
		}
	};
	commonFn(Statistics, function(data) {
		laypage({
			cont: 'page',
			pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			curr: data.pageIndex,
			groups: 5,
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷
					obtainList(e.curr)
				}
			},
			skin: 'molv', //皮肤
			first: '首页', //将首页显示为数字1,。若不显示，设置false即可
			last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
			prev: false, //若不显示，设置false即可
			next: false //若不显示，设置false即可
		});
		$("#roleTable").empty();
		var data = data.history.applies;
		$.each(data, function(i, n) {
			var row = '<tr  data-id="' + n.id + '" id="roleRow">' +
				'<td id="InTime">' + solveTime(n.inTime) + '</td>' +
				'<td id="ExamNo">' + n.examNo + '</td>' +
				'<td id="UserId"data-id="' + n.fromUserId + '" >' + n.fromUserName + '</td>' +
				'<td id="State">' + getstate(n.state) + '</td>' +
				'<td id="Operation">' +
				'<a href="ApplyDetail.html" onclick="local(this)" data-id="xq" class="link text blue">详情</a> ' +
				'</td>' +
				'</tr>';
			$("#roleTable").append(row);
		});
	});
}


/*******详情******/
function local(a) {
	localStorage.removeItem("Id", '');
	var Id = $(a).parent().parent().attr("data-id");
	localStorage.setItem("Id", Id);
}
/*******打印******/
function dy(a) {
	local(a);
	var html = $("#iframe2").contents().find("#form-data").html();
	onprint(html);
}

function getstate(state){
	switch (state){
		case 1:
		return "审批中"
			break;
		case 2:
		return "审批通过"
			break;
		case 3:
		return "已撤回"
			break;
		case 4:
		return "审批不通过"
			break;
	}
}
////搜索
//$("#save").on("click", function() {
//	layer.load();
//	var bb = formSerialize($("#form0"));
//	bb.schoolid=window.schoolid;
//	var Statistics = {
//	url: "Examine/Statistics",
//	type: "post"
//	};
//	commonFn(Statistics, function(data) {
//		obtainList(1);
//	})
//})

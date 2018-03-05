var Tjid = localStorage.getItem("Tjid");
var TjTitle = localStorage.getItem("TjTitle");
$(".toptitle").html("[" + TjTitle + "]使用统计");

function local(a) {
	localStorage.removeItem("UserId", '');
	var UserId = $(a).parent().parent().attr("data-id");
	localStorage.setItem("UserId", UserId);
}
//获取统计列表
var Statistics = {
	url: "Examine/StatisticsUser",
	type: "post",
	data: {
		FormId: Tjid,
		schoolid: window.schoolid
	}
};
commonFn(Statistics, function(data) {
	$.each(data, function(i, n) {
		$("tbody").append('<tr data-id="' + n.userId + '">' +
			'<td>' + n.userName + '</td>' +
			'<td>' + n.amount + '</td>' +
			'<td>' +
			'<a href="UserDetailsl.html" onclick="local(this)" class="link text blue" >详情</a>' +
			'</td>' +
			'</tr>');
	});
});

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
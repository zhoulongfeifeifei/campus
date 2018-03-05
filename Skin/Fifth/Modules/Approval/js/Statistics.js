
//获取统计列表
var Statistics = {
	url: "Examine/Statistics",
	type: "post",
	data:{
		schoolid:window.schoolid
	}
};
commonFn(Statistics, function(data) {
	$.each(data, function(i, n) {
		var qy;
		if(n.state == 1) {
			qy = "<b>启用</b>";
		} else {
			qy = "";
		}
		$("tbody").append('<tr  data-toggle="' + n.title + '" data-id="' + n.id + '">' +
			'<td>' + n.title + '<span class="state">' + qy + '</span></td>' +
			'<td>' + n.remark + '</td>' +
			'<td>' + n.useNum + '</td>' +
			'<td>' +
			'<a href="StatisticsDetails.html" onclick="local(this)" class="link text blue" >详情</a>' +
			'</td>' +
			'</tr>');

	});
});
function local(a) {
	localStorage.removeItem("Tjid", '');
	localStorage.removeItem("TjTitle", '');
	var Tjid = $(a).parent().parent().attr("data-id");
	var TjTitle = $(a).parent().parent().attr("data-toggle");
	localStorage.setItem("Tjid", Tjid);
	localStorage.setItem("TjTitle", TjTitle);
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

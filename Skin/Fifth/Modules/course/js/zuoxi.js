/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:49:28
 * @version $Id$
 */
var GetTimeSheetList = {
	url: "OpenCourse/GetTimeSheetList",
	data:{schoolid:getCookieByUserInfo('schoolid')}
};
commonFn(GetTimeSheetList, function(result) {
	var tbody = "";
	for(var i = 0; i < result.length; i++) {
		tbody += "<tr>" +
			"<td>" +result[i].sheetName +"</td>" +
			"<td>" +solveTime(result[i].beginTime) +"</td>" +
			"<td>" +solveTime(result[i].endTime) +"</td>" +
			"<td>" +result[i].weekDays +"</td>" +
			"<td>" +GetLevelStatus(result[i].Level) +"</td>" +
			"<td class='edit'>" +
			"<a class='layui-btn layui-btn-mini' href='restsetedit.html?id=" +result[i].sheetId +"' title='编辑'>编辑</a>" +
			"<a class='layui-btn layui-btn-mini layui-btn-danger del' val='" +result[i].sheetId +"' title='删除'>删除</a>" +
			"</td>" +
			"</tr>";
	}
	$('tbody').html(tbody);
})

//删除
$('tbody').on("click", ".del", function() {
	var id = $(this).attr("val");
	var par = $(this).parent().parent();
	if(confirm("确认删除学科？请谨慎操作，删除后无法恢复。")) {
		var DelTimeSheet = {
			url: "OpenCourse/DelTimeSheet?id="+id,
			type: "delete"
		};
		commonFn(DelTimeSheet, function(json) {
			layer.msg("删除成功");
			par.remove();
		});
	}
});

function GetLevelStatus(level) {
	if(level == 1) {
		return "优先";
	}
	return "普通";
}
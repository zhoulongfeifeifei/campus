/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:35:25
 * @version $Id$
 */

var form =layui.form();

getpage()
function getpage(page) {
	//获取数据
	var GetCourseTableList = {
		url: "OpenCourse/GetCourseTableList",
		data: {
			schoolid: getCookieByUserInfo('schoolid'),
			pageindex: page || 1
		},
	};
	commonFn(GetCourseTableList, function(data) {
		if (data.pageCount && data.PageIndex) {
			layui.laypage({
				cont: 'page',
				pages: data.pageCount,
				curr: data.PageIndex,
				groups: 5,
				jump: function(e, first) {
					if (!first) {
						getpage(e.curr)
					}
				},
				first: '首页',
				last: '尾页',
				prev: false,
				next: false
			})
		}
		var lists = data.courseTableList;
		if (lists && lists.length > 0) {
			var tbody;
			for (var i = 0; i < lists.length; i++) {
				tbody += "<tr>" +
					"<td>" + (i + 1) + "</td>" +
					"<td>" + lists[i].tableName + "</td>" +
					"<td>" + solveTime(lists[i].startTime) + "</td>" +
					"<td>" + lists[i].weeks + "</td>" +
					"<td>" + GetWeekType(lists[i].weekType) + "</td>" +
					"<td>" + getState(lists[i].state) + "</td>" +
					"<td class='edit'>" +
					" <a class='layui-btn layui-btn-mini' href='javascript:editOrAnd(" + lists[i].id + ")' title='编辑'>编辑</a>" +
					"<a class='layui-btn layui-btn-mini' href='chakankebiao.html?tableid=" + lists[i].id + "'title='查看课表'>查看课表</a>" +
					"<a class='layui-btn layui-btn-mini layui-btn-danger del' val='" + lists[i].id + "'title='删除'>删除</a>" +
					"</td>" +
					"</tr>";
			}
			$('tbody').empty();
			$('tbody').append(tbody);
		}
		//处理课程

	})
}

//删除
$('tbody').on("click", ".del", function() {
	var id = $(this).attr("val");
	var par = $(this).parent().parent();
	layer.confirm("确认删除?", {
		icon: 3,
		title: false
	}, function(index) {
		layer.close(index)
		var DelCourseTable = {
			url: "OpenCourse/DelCourseTable",
			data: {
				id: id
			}
		};
		commonFn(DelCourseTable, function(json) {
			layer.msg(json.Message);
			getpage();
		});
	})
});


function editOrAnd(id) {
	id = id ? id : 0;
	$('#id').val(id)
	layer.open({
		type: '1',
		title: "课程添加/编辑",
		content: $('#form1'),
		btn: ["确定", "取消"],
		success: function() {
			var GetCourseTableModel = {
				url: "OpenCourse/GetCourseTableModel",
				data: {
					id: id,
				},
			},getmodelload = layer.load();
			commonFn(GetCourseTableModel, function(result) {
				layer.close(getmodelload);
				$('#id').val(result.id);
				$('#tablename').val(result.tableName);
				if($('#id').val() == "0") {
					var date = new Date();
					$('#starttime').val(date.toLocaleDateString());
				} else {
					$('#starttime').val(result.startTime);
				}
				$('#weeknums').val(result.weeks);
				$('#weektype').val(result.weekType);
			})
		},
		yes: function(index, layero) {
			var d = formSerialize($('#form1'));
			d.schoolId = window.schoolid;
			reload = layer.load();
			var save = {
				url: "OpenCourse/AddCourseTable",
				data: d,
				type: "post"
			};
			commonFn(save, function(result) {
				getpage();
				layer.close(index);
				layer.close(reload);
			});
		}
	})
}



function GetWeekType(wtype) {
	switch (wtype) {
		case 0:
			return "全周";
		case 1:
			return "单周";
		case 2:
			return "双周";
		default:
			return "";
	}
}

function getState(wtype) {
	switch (wtype) {
		case 0:
			return "没过期";
		case 1:
			return "过期";
		case 2:
			return "失效";
		default:
			return "";
	}
}

function GetTimeStatus(value) {
	//通过正则拿到里面数字。
	var timestamp = value.replace(/\/Date\((\d+)\)\//gi, '$1');
	timestamp = timestamp / 1000;
	//获取当前时间戳
	var timestampnow = Date.parse(new Date());
	timestampnow = timestampnow / 1000;

	if (timestamp > timestampnow) {
		return "<span color=\"green\">正常</span>";
	}
	return "<span color=\"red\">已过期</span>";
}
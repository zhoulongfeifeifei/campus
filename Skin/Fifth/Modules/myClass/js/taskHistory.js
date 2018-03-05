/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-22 15:26:53
 * @version $Id$
 */

var userType = 10;
// 历史作业列表
getListHistory(1, userType);
// 科目列表
getSubjectList();

function getListHistory(curr, userType, subjectid, classid) {
	subjectid == -1 ? 0 : subjectid;
	classid == -1 ? 0 : classid;
	var GetHomeworkList = {
		url: "Homework/GetHomeworkListS",
		data: {
			PageIndex: curr,
			userType: userType,
			subjectid: subjectid,
			classid: classid,
			PageSize: 10,
			schoolId: window.schoolid
		},
		type: "post"
	};
	commonFn(GetHomeworkList, function(t) {
		laypage({
			cont: 'page',
			pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			curr: t.pageIndex,
			groups: 5,
			jump: function(e, first) { //触发分页后的回调                
				if(!first) { //一定要加此判断，否则初始时会无限刷 
					getListHistory(e.curr, userType, $('#Subject').parent().val() == -1 ? 0 : $('#Subject').parent().val(), $('#Class').parent().val() == -1 ? 0 : $('#Class').parent().val());
				}
			},
			skin: 'molv', //皮肤
			first: '首页', //将首页显示为数字1,。若不显示，设置false即可
			last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
			prev: false, //若不显示，设置false即可
			next: false //若不显示，设置false即可
		});
		if(t.resultData && t.resultData.length > 0) {
			$('tbody').empty();
			$.each(t.resultData, function(i, el) {
				// 排序
				var i2 = i + 1
				if(i2 < 10) {
					if(curr == undefined) {
						var p2 = ''
						i2 = i2 * 1
					} else {
						var p2 = curr - 1
					}
				} else {
					if(curr == undefined) {
						var p2 = ''
						i2 = i2 * 1
					} else {
						i2 = i2 * curr
						var p2 = ''
					}
				}
				$('tbody').append('<tr>' +
					'<td>' + p2 + i2 + '</td>' +
					'<td>' + solveTime(el.inTime) + '</td>' +
					'<td>' + el.name + '</td>' +
					'<td>' + el.subject_name + '</td>' +
					'<td>' + el.class_name + '</td>' +
					'<td data-id=' + el.workId + '><a class="layui-btn layui-btn-mini viewDetail">查看详情</a></td>' +

					'</tr>');
			});
		}

		form.render();
		$('.viewDetail').click(function() {
			var id = $(this).parent().attr('data-id');
			var GetModel = {
				url: "Homework/GetModel",
				data: {
					workid: id,
					schoolid: window.schoolid
				},
				type: "get"
			};
			commonFn(GetModel, function(res) {
				layer.open({
					type: 1,
					title: "作业详情",
					closeBtn: 2,
					area: ['600px', "300px"],
					shadeClose: true,
					content: res.content
				});
			})
		});

	})
}


// 请求科目的api
function getSubjectList() {
	var GetSubjectByuser = {
		url: "Homework/GetSubjectByuser",
		data: {
			schoolid: window.schoolid
		},
		type: "post"
	};
	commonFn(GetSubjectByuser, function(res) {
		$('#Subject').nextAll().empty();
		$.each(res, function(i, el) {
			$('#Subject').after('<option value=' + el.subject_id + '>' + el.subject_name + '</option>')
		});
		form.render();
		form.on('select(subject)', function(data) {
			getListHistory(1, userType, data.value);
			getClassList(data.value);
		})
	})
}
getClassList(0);

function getClassList(data) {
	var $data = data
	$data == -1 ? 0 : $data;
	var GetSubjectByuser = {
		url: "Homework/GetClassList",
		data: {
			schoolid: window.schoolid,
			subjectid: $data
		},
		type: "get"
	};
	commonFn(GetSubjectByuser, function(t) {
		$('#Class').nextAll().empty();
		$.each(t, function(i, el) {
			$('#Class').after('<option value=' + el.class_id + '>' + el.class_name + '</option>')
		});
		form.render();
		form.on('select(class)', function(data) {
			getListHistory(1, userType, $data, data.value);
		})
	})
}


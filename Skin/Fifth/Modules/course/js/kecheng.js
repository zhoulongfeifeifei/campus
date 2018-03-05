/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:41:28
 * @version $Id$
 */

var form = layui.form();
getList();


function getList() {
	var getlistload = layer.load(),
		GetSubjectList = {
			url: "OpenCourse/GetSubjectList?schoolid=" + getCookieByUserInfo('schoolid'),
		};
	commonFn(GetSubjectList, function(result) {
		layer.close(getlistload);
		$('tbody').empty()
		for (var i = 0; i < result.length; i++) {
			$('tbody').append("<tr><td>" + (i + 1) + "</td>" +
				"<td>" + result[i].subject_name + "</td>" +
				"<td>" + isNull(result[i].typeName) + "</td>" +
				"<td>" + GetElectiveStauts(result[i].isElective) + "</td>" +
				"<td class='edit'>" +
				"<a class='layui-btn layui-btn-mini' href='javascript:editOrAnd(" + result[i].subject_id + ")' title='编辑'>编辑</a>" +
				"<a class='layui-btn layui-btn-mini layui-btn-danger' onclick='deleteData(" + result[i].subject_id + ")' title='删除'>删除</a>" +
				"</td>" +
				"</tr>");
		}
	})
}

function deleteData(id) {
	layer.confirm("确认删除学科？请谨慎操作，删除后无法恢复。", function() {
		var DelSubject = {
			url: "OpenCourse/DelSubject?id=" + id,
			type: "delete"
		};
		layer.load();
		commonFn(DelSubject, function(json) {
			layer.closeAll();
			layer.msg("删除成功");
			getList()
		});
	})
}

function editOrAnd(id) {
	id = id ? id : 0;
	$('#id').val(id)
	layer.open({
		type: '1',
		title: "课程添加/编辑",
		content: $('#form1'),
		btn: ["确定", "取消"],
		success: function() {
			var GetSubjectModel = {
				url: "OpenCourse/GetSubjectModel",
				data: {
					id: id,
					schoolid: getCookieByUserInfo('schoolid')
				}
			};
			commonFn(GetSubjectModel, function(result) {
				var optionhtml = "<option value=0>无</option>";
				for (var i = 0; i < result.typeList.length; i++) {
					optionhtml += "<option value=" + result.typeList[i].id + ">" + result.typeList[i].typeName + "</option>";
				}
				$('#typeid').empty();
				$('#typeid').html(optionhtml);
				$('#subjectname').val(result.subject_name);
				$('#iselcetive').val(result.isElective);
				$('#id').val(result.subject_id);
				$('#typeid').val(result.typeId);
				form.render();
			})
		},
		yes: function(index, layero) {
			var savaLoad = layer.load();
			var d = {};
			d.subject_name = $('input[name="subject_name"]').val();
			d.isElective = $('#iselcetive').val();
			d.typeId = $('#typeid').val();
			d.subject_id = id;
			d.schoolid = getCookieByUserInfo('schoolid');
			var EditSubject = {
				url: "OpenCourse/EditSubject",
				data: d,
				type: "post"
			};
			commonFn(EditSubject, function(json) {
				getList();
				layer.close(index);
				layer.close(savaLoad);
			});
		}
	})
}

function daoru() {
	layer.open({
		type: '1',
		title: "课程导入",
		content: $('#form2'),
		success: function(layero, index) {
			var uploadload;
			layui.upload({
				url: window.apiUrl + 'Common/ImportFile',
				elem: '#pickfiles',
				title: "上传模板",
				before: function(input) {
					uploadload = layer.load();
				},
				success: function(json) {
					if (json.status == 1) {
						$('#filename').val(json.data);
						var SubjectImport = {
							url: "OpenCourse/SubjectImport",
							data: {
								filename: $('#filename').val(),
								schoolid:window.schoolid
							}
						};
						commonFn(SubjectImport, function(result) {
							layer.close(index);
							layer.msg("上传成功");
							getList();
						})
					} else {
						layer.msg("上传失败" + json.message)
					}
					layer.close(uploadload);
				}
			});
			$('.download').attr('href', window.siteHost + 'Filedown/GetModelTemplate?alias=subject');
		}
	})
}

function GetElectiveStauts(value) {
	if (value == 1) {
		return "是";
	} else {
		return "否";
	}
}
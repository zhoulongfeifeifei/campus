/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:23:58
 * @version $Id$
 */

var tableid,
	classid,
	element = layui.element(),
	form = layui.form();

getList(0, 0);
//获取后台数据
function getList(tableid, classid) {
	var getList = {
		url: "OpenCourse/GetClassCourse",
		data: {
			tableid: tableid || 0,
			classid: classid || 0,
			schoolid: getCookieByUserInfo('schoolid')
		},
	};
	commonFn(getList, function(result) {
		//标题数据
		$('.layui-this').text(result.curClass.class_name + "课表");
		element.init();
		//切换班级
		$('#classid').empty();
		var classlists = result.classList;
		if (classlists && classlists.length) {
			for (var i = 0; i < classlists.length; i++) {
				$('#classid')
					.append("<option value='" + classlists[i].class_id + "' >" + classlists[i].class_name + "</option>");
			}
		}
		$('#classid').val(result.curClass.class_id);
		//切换总课表
		$('#tablename').empty();
		var tablename = "";
		var courseTableLists = result.courseTableList;
		if (courseTableLists && courseTableLists.length) {
			for (var j = 0; j < courseTableLists.length; j++) {
				tablename += "<option value='" + courseTableLists[j].id + "'>" + courseTableLists[j].tableName + "</option>";
			}
		}
		$('#tablename').html(tablename);
		$('#tablename').val(result.tableId);

		//处理课程
		var tbody;
		commonFn({
			url: 'OpenCourse/GetSubjectList',
			async: false,
			data: {
				schoolid: getCookieByUserInfo('schoolid')
			}
		}, function(res) {
			var option = '<option value></option>';
			$.each(res, function(index, val) {
				option += '<option value="' + val.subject_name + '">' + val.subject_name + '</option>'
			});
			for (var ti = 1; ti < 16; ti++) {
				tbody += "<tr>" + "<td>第" + ti + "节</td>";
				for (var tj = 0; tj < 7; tj++) {
					var curcourse = result.courseContentList.find(function(obj) {
						if (obj.sheetOrder == ti && obj.weekDays == tj)
							return obj;
					});
					tbody += "<td>" +
						"<input type='hidden' name='sheetorder' value='" +
						ti +
						"'/>" +
						"<input type='hidden' name='weeks' value='" +
						tj +
						"'/>";
					if (curcourse) {
						tbody += "<input type='hidden' name='contentid' value='" +curcourse.id +"'/>" +
							"<select name='coursename' data-id=" +curcourse.id +" lay-filter='subject' lay-search>" + option + "</select>";
					} else {
						tbody += "<input type='hidden' name='contentid' value=0 />" +
							"<select name='coursename' lay-filter='subject' lay-search>" + option + "</select>"
					}
					tbody += "</td>";
				}
				tbody += "</tr>";
				$('tbody').empty();
				$('tbody').append(tbody);
				
				// form.render();
			}
			$.each(result.courseContentList, function(i, el) {
				$.each($('select'), function(index, val) {
					if ($(val).attr('data-id') ==  el.id) {
						$(val).val(el.courseName);
					}
				});
			});
			form.render();
		})

	})
}
form.on('select(classid)', function(data) {
	var id = $('#tablename').val();
	id = !id ? 0 : id;
	getList(id, data.value);
})
form.on('select(tableid)', function(data) {
	var id = $('#classid').val();
	id = !id ? 0 : id;
	getList(data.value, id);
})
$('#save').click(function() {
	var d = $('#form1').serializeArray();
	var model = {};
		sheetorderarr = [],
		weeksarr = [],
		contentidarr = [],
		coursenamearr = [],	
		console.log(d);
	$.each(d, function(index, val) {
		switch (val.name) {
			case "classid":
				model.classid = val.value;
				break
			case "tableid":
				model.tableid = val.value;
				break
			case "sheetorder":
				sheetorderarr.push(val.value);
				break
			case "weeks":
				weeksarr.push(val.value);
				break
			case "contentid":
				contentidarr.push(val.value);
				break
			case "coursename":
				coursenamearr.push(val.value);
				break
		}
	});
	model.sheetorder = sheetorderarr.join(',');
	model.weeks = weeksarr.join(',');
	model.contentid = contentidarr.join(',');
	model.coursename = coursenamearr.join(',');
	model.schoolId = getCookieByUserInfo('schoolid');
	var savecourse = {
		url: "OpenCourse/EditCourseContent",
		data: model,
		type: "post"
	};
	commonFn(savecourse, function(json) {
		getList();
		layer.msg("保存成功");
	})
});

function daoru() {
    layer.open({
        type: '1',
        title: "教室导入",
        content: $('#form2'),
        offset:"100px",
        success: function(layero, index) {
            var uploadload;
            layui.upload({
                url: window.apiUrl + 'Common/ImportFile',
                elem: '#daoru',
                title: "上传模板",
                success: function(json) {
                    if (json.status == 1) {
                    	$('#filename').val(json.data);
                    	commonFn({
                    		url:'OpenCourse/ClassCourseImport',
                    		data:{
                    			filename : json.data,
                    			schoolid : window.schoolid,
                    			classid : $('#classid').val(),
                    			tableid : $('#tablename').val()
                    		}
                    	},function(res){
                    		layer.close(index);
                    		parent.layer.msg("上传成功");
                			getList();
                    	}) 
                    } else {
                        layer.msg("上传失败" + json.message)
                    }
                    layer.close(uploadload);
                }
            });
            $('.download').attr('href', window.siteHost + 'Filedown/GetModelTemplate?alias=banjikebiao');
        },
    })
}

// function from_clipBoard() {
// 	var _clipBoardContext; //剪贴板内容
// 	if(window.clipboardData) {
// 		//for IE
// 		_clipBoardContext = window.clipboardData.getData('Text');
// 		putInTable(_clipBoardContext,
// 			function() {
// 				top.parent.showTips('粘贴完成', 4);
// 			});

// 	} else {
// 		//for not IE
// 		$.AlerMsg({
// 			title: '粘贴剪切板',
// 			msg: '请将内容粘贴到下面的输入框',
// 			type: 'textarea', //confirm , textarea
// 			placeholder: "ctrl+v 或 右键粘贴",
// 			okColor: '#38be35',
// 			cancelColor: '#999',
// 			ok: function(textareaVal) {
// 				putInTable(textareaVal,
// 					function() {
// 						top.parent.showTips('粘贴完成', 4);
// 					});
// 			}
// 		});
// 	}

// }

//将粘贴板内容 切分成数组 放入表格
// function putInTable(Str, callback) {
// 	var textArr = new Array();
// 	var tempArr = new Array();
// 	tempArr = Str.split('\n');
// 	$.each(tempArr,
// 		function(i) {
// 			textArr[i] = tempArr[i].split('\t');
// 		});

// 	var $tbodytr = $('tbody tr');
// 	$.each(textArr,
// 		function(i) {
// 			$.each(textArr[i],
// 				function(j) {
// 					$tbodytr.eq(i).find('td').eq(j + 1).find('input.coursename').val(textArr[i][j]);
// 					if(i == textArr.length - 1 && j == textArr[i].length - 1) {
// 						callback();
// 					}
// 				});
// 		});

// }
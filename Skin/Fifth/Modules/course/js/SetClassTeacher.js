/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:57:44
 * @version $Id$
 */
var teachers = [],
	teacherInfo;
var SetClassTeacherBatch = {
	url: "Teacher/SetClassTeacherBatch",
	data: {
		schoolid: 1
	}
};
commonFn(SetClassTeacherBatch, function(data) {
		var grades = data.grades;
		for (var i = 0; i < grades.length; i++) {
			$('<option value="' + grades[i].id + '" >' + grades[i].grade + '</option>').appendTo($('#selectClass'))
		}
		var lists = data.list
		for (var i = 0; i < lists.length; i++) {
			var xmlVal = $(lists[i].headTeacher);
			var className = [];
			var classId = [];
			xmlVal.each(function(i, ele) {
				var cName = $(ele).find('name').text();
				var cId = $(ele).find('Id').text();
				className.push(cName);
				classId.push(cId);
			})
			$('<tr data-grade="' + lists[i].grade + '" data-subid=0 data-id="' + lists[i].id + '"><td>' + lists[i].name + '</td><td class="teachers"><span></span><a class="add link green" href="javascript:;"><i class="alIcon">&#xe69b;</i></a></td></tr>').appendTo('tbody')
			for (var c = 0; c < className.length; c++) {
				$('tbody tr:eq(' + i + ') td:eq(1) span').append('<a class="teacher" data-id="' + classId[c] + '" href="javascript:;">' + className[c] + '</a>')
			}

		}
		var Subjects = data.subject;
		for (var i = 0; i < Subjects.length; i++) {

			$('#classRoom').append('<th data-subid="' + Subjects[i].subject_id + '">' + Subjects[i].subject_name + '</th>')
			$('<td class="teachers" data-subid="' + Subjects[i].subject_id + '"><span></span><a class="add link green" href="javascript:;"><i class="alIcon">&#xe69b;</i></a></td>').appendTo($('tbody tr'));
		}
		teachers = [];
		teacherInfo = data.teachers;
		var classteachers = data.classTeachers
		for (var i = 0; i < classteachers.length; i++) {
			$('<a class="teacher" data-id="' + classteachers[i].userId + '" href="javascript:;">' + classteachers[i].name + '</a>')
			.appendTo('tbody tr[data-id="' + classteachers[i].classId + '"] td[data-subid="' + classteachers[i].subjectId + '"] span');
			teachers.push({
				"Id": classteachers[i].userId,
				"Name": classteachers[i].name
			})
		}
	})
	//切换年级控制显示的班级.
$('#selectClass').on('change',function() {
	if ($('#selectClass').val() == "-1") {
		$('tbody tr').show();
		return
	}
	for (var i = 0; i < $('tbody tr').length; i++) {
		if ($('tbody tr:eq(' + i + ')').attr('data-grade') == $('#selectClass').val()) {
			$('tbody tr:eq(' + i + ')').show()
		} else {
			$('tbody tr:eq(' + i + ')').hide()
		}
	}
})

var $table = $('table');
var $divTeacherBox = $('#divTeacher');

$("#sltTeacher").on("select2:open", function() {
	$('.select2-search__field').attr('placeholder', '搜索老师');
});

$table.on('click', 'td.teachers .add', function() {
	$("td.teachers .add").removeClass("keep");
	$(this).addClass("keep");
	addTeacher($(this));
});

$('body').on('dblclick', ".teacher",function() {
	delTeacher(this);
});

function addTeacher(e) {
	var $this = e;
	var $thisTr = $this.parents('tr');
	if (!$thisTr.hasClass('tr-statusEdit-on')) {
		//显示编辑框
		$('.tr-statusEdit-on').removeClass('tr-statusEdit-on'); //取消其他地方的选中状态
		$thisTr.addClass('tr-statusEdit-on');
		var ids = new Array();
		$this.parent().find(".teacher").each(function() {
			ids.push($(this).attr("data-id"));
		});
		$("#sltTeacher").empty();
		for (var index in teacherInfo) {
			var teacher = teacherInfo[index];
			if (ids.indexOf(teacher.Id) == -1) {
				$("#sltTeacher").append('<option value="' + teacher.userId + '">' + teacher.name + '</option>');
			}
		}
		$("#sltTeacher").select2({
			placeholder: "搜索老师",
			language: "zh-CN"
		});
		var full = $(document).width();
		var left = $this.offset().left - 10;
		var right = full - left;
		if (right < 256) {
			$divTeacherBox.css({
				'left': $this.offset().left - 235,
				'top': $this.offset().top + 24
			}).show();
			$("#divTeacher .before").removeAttr("style");
			$('#divTeacher .before').css({
				'right': '5px'
			});
		} else {
			$divTeacherBox.css({
				'left': $this.offset().left - 10,
				'top': $this.offset().top + 24
			}).show();
			$("#divTeacher .before").removeAttr("style");
			$('#divTeacher .before').css({
				'left': '8px'
			});
		}
	} else {
		//隐藏编辑框
		$thisTr.removeClass('tr-statusEdit-on');
		$divTeacherBox.hide();
	}
}

$(document).on('click', 'body', function(e) {
	if (!$(e.target).is('#divTeacher,#divTeacher *,.divTeacher,.divTeacher *,.teachers .add,.teachers .add *')) {
		$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
		$divTeacherBox.hide();
		$("td.teachers .add").removeClass("keep");
	}
});

$divTeacherBox.find('.cancel').click(function() {
	//隐藏编辑框
	$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
	$divTeacherBox.hide();
});

$divTeacherBox.find('.ok').click(function() {
	var value = $("#sltTeacher").val();
	var name = $("#sltTeacher").find("option:selected").text();
	var classid = $('.tr-statusEdit-on').attr("data-id");
	var subjectid = $('.tr-statusEdit-on').find(".keep").parent().attr("data-subid");
	commonFn({
		url: 'Teacher/AddTeacherForClass',
		data: {
			userid: value,
			classid: classid,
			subject: subjectid || 0,
			schoolid: 1
		}
	}, function(data) {
		$('<a class="teacher" data-id="' + value + '" href="javascript:;">' + name + '</a>').appendTo($('.tr-statusEdit-on .teachers .keep').parent().find("span")).dblclick(function() {
			delTeacher(this);
		});
		$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
		$divTeacherBox.hide();
		layer.msg("添加成功。");
	})
})

function delTeacher(e) {
	var name = $(e).html();
	layer.confirm("是否删除[" + name + "]的身份", function(index) {
		layer.close(index)
		flag = true;
		var id = $(e).attr("data-id");
		var classid = $(e).parent().parent().parent().attr("data-id");
		var subjectid = $(e).parent().parent().attr("data-subid");
		var DelTeacherForClass = {
			url: "Teacher/DelTeacherForClass?userid="+id+"&classid="+classid+"&subject="+subjectid+"&schoolid=1",
			type: "delete"
		};
		commonFn(DelTeacherForClass, function(data) {
			flag = false;
			if (data) {
				location.reload();
			}
		})
	})

}
/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:59:55
 * @version $Id$
 */
//var SCHOOLID=getCookieByUserInfo("schoolid");
var logintype = getCookieByUserInfo("logintype");
var SchoolId = 0;
var UserId = [];
var TypeId = [];
var num = getUrlParam("state"); //单选多选用
var s_type = getUrlParam("type");
var SchoolId_;
var GetListArticles = {
	url: "Common/Receiver",
	data: {
		loginType: logintype,
		schoolid: 0
	},
	type: "get"
};
commonFn(GetListArticles, function(data) {
	var index = 1;
	var ca = 1;
	var num = 2;

	$.each(data, function(j, k) {
		if(data.length>2){
			$("#Schools").append('<li class="school' + index + '" data-type="all-School" data-id="' + k.schoolId + '">' +
				'<em class="switch"></em>' +
				'<span>' + k.schoolName + '</span>' +
				//                                              '<span class="num">(' + data.Data.length + ')</span>'+
				'<ul id="School' + index + '">' +
				'<li data-type="all-teacher"  data-id="">' +
				'<em class="switch"></em>' +
				'<span>所有教师</span>' +
				'<span data-isyd="0"  data-schoolid='+k.schoolId+'    class="num ls">(2)</span>' +
				'<ul id="Teachers' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li data-type="all-student"  data-id="">' +
				'<em class="switch"></em>' +
				'<span>所有学生</span>' +
				'<span  data-isyd="0"  data-schoolid='+k.schoolId+'  class="num xs">(5)</span>' +
				'<ul id="Students' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li>' +
				'<em class="switch"></em>' +
				'<span>按教研组发送</span>' +
				'<ul id="TeacherGroup' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li data-type="all-students">' +
				'<em class="switch"></em>' +
				'<span>按年级发送</span>' +
				'<ul id="Grade' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'</ul>' +
				'</li>');
			if(s_type == 1) {
				$("li[data-type='all-student']").hide();
				$("li[data-type='all-students']").hide();
			}
			var schoolId = k.schoolId;
			$("#School" + index).find("li[data-type='all-teacher']").attr("data-usertype", "1");
			$("#School" + index).find("li[data-type='all-student']").attr("data-usertype", "2");
			$("#School" + index).find("li[data-type='all-teacher']").attr("data-schoolid", schoolId);
			$("#School" + index).find("li[data-type='all-student']").attr("data-schoolid", schoolId);
			var Teachers = k.receiver.teachers;
			$(".school" + index).find(".ls").html("(" + Teachers.length + ")");
			var Students = k.receiver.students;
			$(".school" + index).find(".xs").html("(" + Students.length + ")");
			var TeacherGroup = k.receiver.teacherGroup;
			var Grade = k.receiver.grade;
			$.each(Teachers, function(i, n) {
				$("#Teachers" + index).append('<li class="teacher"  data-schoolid="' + schoolId + '" data-id="' + n.userId + '" data-teacherid="'+n.teacherId+'">' +
					'<a href="javascript:void(0)">' + n.name + '</a>' +
					'<span class="remove">移除</span>' +
					'</li>');
			})
			$.each(Students, function(i, n) {
				$("#Students" + index).append('<li data-type="class" data-schoolid="' + schoolId + '" >' +
					'<em class="switch"></em>' +
					'<span>' + n.classRoom + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="student' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#student" + ca).append('<li class="student"  data-schoolid="' + schoolId + '" data-class="' + k.classId + '" data-grade="' + k.gradeId + '" data-id="' + k.userId + '" data-studentid="'+k.id+'">' +
							'<a href="javascript:void(0)"  data-id=' + k.userId + '>' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			$.each(TeacherGroup, function(i, n) {
				$("#TeacherGroup" + index).append('<li data-type="group" >' +
					'<em class="switch"></em>' +
					'<span>' + n.name + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="Group' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#Group" + ca).append('<li class="teacher" data-id="' + k.userId + '" data-teacherid="' + k.teacherId + '">' +
							'<a href="javascript:void(0)">' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			$.each(Grade, function(i, n) {
				$("#Grade" + index).append('<li data-type="grade" >' +
					'<em class="switch"></em>' +
					'<span>' + n.name + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="Grades' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#Grades" + ca).append('<li class="student"  data-class="' + k.classId + '" data-grade="' + k.gradeId + '" data-id="' + k.userId + '" data-studentid="' + k.id + '">' +
							'<a href="javascript:void(0)">' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			index++;
		}else{
			$("#Schools").append(
				'<li data-type="all-teacher"  data-id="">' +
				'<em class="switch"></em>' +
				'<span>所有教师</span>' +
				'<span data-isyd="0"  data-schoolid='+k.schoolId+'    class="num ls">(2)</span>' +
				'<ul id="Teachers' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li data-type="all-student"  data-id="">' +
				'<em class="switch"></em>' +
				'<span>所有学生</span>' +
				'<span  data-isyd="0"  data-schoolid='+k.schoolId+'  class="num xs">(5)</span>' +
				'<ul id="Students' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li>' +
				'<em class="switch"></em>' +
				'<span>按教研组发送</span>' +
				'<ul id="TeacherGroup' + index + '">' +
	
				'</ul>' +
				'</li>' +
				'<li data-type="all-students">' +
				'<em class="switch"></em>' +
				'<span>按年级发送</span>' +
				'<ul id="Grade' + index + '">' +
	
				'</ul>' +
				'</li>');
			if(s_type == 1) {
				$("li[data-type='all-student']").hide();
				$("li[data-type='all-students']").hide();
			}
			var schoolId = k.schoolId;
			$("#School" + index).find("li[data-type='all-teacher']").attr("data-usertype", "1");
			$("#School" + index).find("li[data-type='all-student']").attr("data-usertype", "2");
			$("#School" + index).find("li[data-type='all-teacher']").attr("data-schoolid", schoolId);
			$("#School" + index).find("li[data-type='all-student']").attr("data-schoolid", schoolId);
			var Teachers = k.receiver.teachers;
			$(".school" + index).find(".ls").html("(" + Teachers.length + ")");
			var Students = k.receiver.students;
			$(".school" + index).find(".xs").html("(" + Students.length + ")");
			var TeacherGroup = k.receiver.teacherGroup;
			var Grade = k.receiver.grade;
			$.each(Teachers, function(i, n) {
				$("#Teachers" + index).append('<li class="teacher"  data-schoolid="' + schoolId + '" data-id="' + n.userId + '" data-teacherid="'+n.teacherId+'">' +
					'<a href="javascript:void(0)">' + n.name + '</a>' +
					'<span class="remove">移除</span>' +
					'</li>');
			})
			$.each(Students, function(i, n) {
				$("#Students" + index).append('<li data-type="class" data-schoolid="' + schoolId + '" >' +
					'<em class="switch"></em>' +
					'<span>' + n.classRoom + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="student' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#student" + ca).append('<li class="student"  data-schoolid="' + schoolId + '" data-class="' + k.classId + '" data-grade="' + k.gradeId + '" data-id="' + k.userId + '" data-studentid="'+k.id+'">' +
							'<a href="javascript:void(0)"  data-id=' + k.userId + '>' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			$.each(TeacherGroup, function(i, n) {
				$("#TeacherGroup" + index).append('<li data-type="group" >' +
					'<em class="switch"></em>' +
					'<span>' + n.name + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="Group' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#Group" + ca).append('<li class="teacher" data-id="' + k.userId + '" data-teacherid="' + k.teacherId + '">' +
							'<a href="javascript:void(0)">' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			$.each(Grade, function(i, n) {
				$("#Grade" + index).append('<li data-type="grade" >' +
					'<em class="switch"></em>' +
					'<span>' + n.name + '</span>' +
					'<span data-isyd="0"  data-schoolid='+schoolId+'  class="num">(' + n.people.length + ')</span>' +
					'<ul id="Grades' + ca + '">' +
	
					'</ul>' +
					'</li>');
				if(n.people.length > 0) {
					$.each(n.people, function(j, k) {
						$("#Grades" + ca).append('<li class="student"  data-class="' + k.classId + '" data-grade="' + k.gradeId + '" data-id="' + k.userId + '" data-studentid="' + k.id + '">' +
							'<a href="javascript:void(0)">' + k.name + '</a>' +
							'<span class="remove">移除</span>' +
							'</li>');
	
					})
				}
				ca++;
			})
			index++;
		}
	})
})
/***************************  jashddsfdhs gdas*******************************/
//计数
$("#Schools ").on("click", '.switch', function() {
	if($(this).parent().hasClass("expand")) {
		$(this).parent().removeClass("expand");
	} else {
		$(this).parent().addClass("expand");
	}
});
//选择组
$("#choose-list ").on("click", '.num', function() {
	if(num == 1) {
		alert('只能选择一个人');
	} else {
		var lls = $(this).siblings("ul").find("a").parent();
		$.each(lls,function(i,n){
			var userid=$(n).attr("data-id");
			$("#choosed-list ul").find("li[data-id='"+userid+"']").remove();
			$("#choosed-list ul").prepend($(n).prop("outerHTML"));
			$(n).find("a").addClass("selected");
		})
		$(this).attr("data-isyd",'1');
		$('#SchoolId').val($(this).attr('data-schoolId'))
//		var schoolid = $(this).parent().attr("data-schoolid");
//		$("#SchoolId").val(schoolid);
//		var li = $(this).parent();
//		var type = li.attr("data-type");
//		var id = li.attr("data-id");
//		var datatype = type + id;
//		//判断是否存在
//		if(li.hasClass("red")) {
//			//$("#choosed-list ul li[data-type='" + type + "']").remove();
//			//$("#choosed-list ul li[data-group='" + datatype + "']").remove();
//			//遍历成员
//			if(type == "all-teacher" || type == "all-student") {
//				$("#choosed-list ul li[data-type='" + type + "']").remove();
//			} else if(type == "group") {
//				li.find("li.teacher").each(function() {
//					//移除已选列表
//					$("#choosed-list li[class='teacher'][data-id='" + $(this).attr("data-id") + "']").remove();
//					//移除已选样式
//					$("#choose-list li[class='teacher'][data-id='" + $(this).attr("data-id") + "'] a").removeClass("selected");
//				});
//			} else {
//				li.find("li.student").each(function() {
//					//移除已选列表
//					$("#choosed-list li[class='student'][data-id='" + $(this).attr("data-id") + "']").remove();
//					//移除已选样式
//					$("#choose-list li[class='student'][data-id='" + $(this).attr("data-id") + "'] a").removeClass("selected");
//				});
//			}
//			li.removeClass("red");
//			group_count();
//			return false;
//		}
//
//		li.addClass("red");
//		if(type == "all-student") {
//			//移除所有学生
//			$("#choosed-list ul li.student").remove();
//			//移除班级和年级的颜色
//			$("#choose-list li[data-type='class']").removeClass("red");
//			$("#choose-list li[data-type='grade']").removeClass("red");
//			//移除已选样式
//			$("#choose-list li[class='student'] a").removeClass("selected");
//			var txt = "<li class='all all-student' data-usertype='2'  data-type='all-student'><a href='javascript:void(0)' >全校学生</a><span class='remove'>移除</span></li>";
//			$("#choosed-list ul").prepend(txt);
//		} else if(type == "all-teacher") {
//			//移除所有教师
//			$("#choosed-list ul li.teacher").remove();
//			//移除教研组颜色
//			$("#choose-list li[data-type='group']").removeClass("red");
//			//移除已选样式
//			$("#choose-list li[class='teacher'] a").removeClass("selected");
//			var txt = "<li class='all all-teacher' data-usertype='1'  data-type='all-teacher'><a href='javascript:void(0)' >全校教师</a><span class='remove'>移除</span></li>";
//			$("#choosed-list ul").prepend(txt);
//		} else if(type == "group") {
//			//移除全校老师/颜色
//			$("#choosed-list ul li[data-type='all-teacher']").remove();
//			$("#choose-list li[data-type='all-teacher']").removeClass("red");
//			//添加成员，遍历
//			li.find("li.teacher").each(function() {
//				if($("#choosed-list li[class='teacher'][data-id='" + $(this).attr("data-id") + "']").length <= 0) {
//					//添加
//					$("#choosed-list ul").prepend($(this).prop("outerHTML"));
//					$("#choose-list li[class='teacher'][data-id='" + $(this).attr("data-id") + "'] a").addClass("selected");
//				}
//			});
//		} else {
//			//移除全校老师/颜色
//			$("#choosed-list ul li[data-type='all-student']").remove();
//			$("#choose-list li[data-type='all-student']").removeClass("red");
//			//添加成员，遍历
//			li.find("li.student").each(function() {
//				if($("#choosed-list li[class='student'][data-id='" + $(this).attr("data-id") + "']").length <= 0) {
//					//添加
//					$("#choosed-list ul").prepend($(this).prop("outerHTML"));
//					$("#choose-list li[class='student'][data-id='" + $(this).attr("data-id") + "'] a").addClass("selected");
//				}
//			});
//		}
//		group_count();
	}
});
//选择成员
$(" body").on("click", '#Schools a', function() {
	var len = $("#Peoples li").length;
	var lid = $(this).parent().attr("data-id");
	var rid = $('#Peoples li:first-child').attr("data-id");
	if(num == 1 && len > 0 && lid != rid) {
		layer.msg('只能选择一个人');
	} else {
		var schoolid = $(this).parents('.expand').attr("data-schoolid");
		$("#SchoolId").val(schoolid);
		var li = $(this).parent();
		var type = li.attr("class");
		var id = li.attr("data-id");
		var pli = li.parent().parent();
		//判断是否存在全组
		if($("#choosed-list li[data-type='all-" + type + "']").length > 0) {
			return false;
		}
		//判断是否存在该成员
		var slt = $("#choosed-list li[class='" + type + "'][data-id='" + id + "']");
		if(slt.length > 0) {
			slt.remove();
			$("#choose-list li[class='" + type + "'][data-id='" + id + "'] a").removeClass("selected");
			$("#choose-list li[class='" + type + "'][data-id='" + id + "']").parent().parent().removeClass("red");
			
		} else {
			if(num == 1 && $("#Peoples li").length > 0) {
				alert("只能选择一个人");
			} else {
				$("#choosed-list ul").prepend(li.prop("outerHTML"));
				$("#choose-list li[class='" + type + "'][data-id='" + id + "'] a").addClass("selected");
			}
		}
		group_count();
	}

});
$("#choosed-list").on("click", '.remove', function() {
	var li = $(this).parent();
	if(li.hasClass("all-teacher")) {
		$("#choose-list li[data-type='all-teacher']").removeClass("red");
	} else if(li.hasClass("all-student")) {
		$("#choose-list li[data-type='all-student']").removeClass("red");
	} else if(li.hasClass("teacher")) {
		$("#choose-list li[class='teacher'][data-id='" + li.attr("data-id") + "'] a").removeClass("selected");
		$("#choose-list li[class='teacher'][data-id='" + li.attr("data-id") + "']").parent().parent().removeClass("red");
	} else if(li.hasClass("student")) {
		$("#choose-list li[class='student'][data-id='" + li.attr("data-id") + "'] a").removeClass("selected");
		$("#choose-list li[class='student'][data-id='" + li.attr("data-id") + "']").parent().parent().removeClass("red");
	}
	li.remove();
	group_count();
});
$("#btnClear").on("click", function() {
	$("#choosed-list ul li").remove();
	$("#choose-list li").removeClass("red");
	$("#choose-list li a").removeClass("selected");
	$("#amount").text(0);
});

//跳过and确定
$("#btnSelect, #btnSkip").on("click", function() {
	var result = [];
	var group = [];
	var teacher = [];
	var student = [];
	if($("#choosed-list li.all-teacher").length > 0) {
		group.push({
			id: 1,
			name: "全校教师"
		});
	} else {
		//获取教师
		$("#choosed-list li.teacher").each(function() {
			teacher.push({
				id: $(this).attr("data-id"),
				name: $(this).find("a").text()
			});
		});
	}
	if($("#choosed-list li.all-student").length > 0) {
		group.push({
			id: 2,
			name: "全校学生"
		});
	} else {
		//获取学生
		$("#choosed-list li.student").each(function() {
			student.push({
				id: $(this).attr("data-id"),
				name: $(this).find("a").text()
			});
		});
	}
	result.push({
		group: group,
		teacher: teacher,
		student: student
	});

	// var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	// parent.layer.close(index);
});

//  $("#shishi").on("click",function(){
//          //取数据方法
//          var usertypes=[];
//          var userlists=[];
//          var usernames=[];
//          $("#Peoples li").each(function(i,n){
//              var usertype=$(n).attr("data-usertype");
//              var schoolid=$(n).attr("data-schoolid");
//              var userid=$(n).attr("data-id");
//              var username=$(n).find('a').html();
//              if(usertype){
//                  usertypes.push(usertype);
//              }else if(userid){
//                  userlists.push(userid);
//              }
//              usernames.push(username);
//          })
//          var obj={};
//              obj.schoolid=$('#SchoolId').val();
//              obj.usertype=usertypes;
//              obj.userlist=userlists;
//  })      

function group_count() {
	var groupLen = $("#choosed-list").find("li.all").length;

	var patten = /\d+/g;
	var studentNum = parseInt(patten.exec($("#choose-list li[data-type='all-student']").find(".num").text()));
	var pattens = /\d+/g;
	var teacherNum = parseInt(pattens.exec($("#choose-list li[data-type='all-teacher']").find(".num").text()));
	var resultNum = teacherNum + studentNum;

	var choosedLen = $("#choosed-list ul li").length;

	if(groupLen > 1) {
		$("#amount").text(resultNum);
	} else if(groupLen == 1) {
		if($("#choosed-list").find("li[data-type='all-student']").length > 0) {
			var rnum = studentNum + choosedLen - 1;
			$("#amount").text(rnum);
		} else {
			var rnum = teacherNum + choosedLen - 1;
			$("#amount").text(rnum);
		}
	} else {
		$("#amount").text(choosedLen);
	}
}
$(function(){ 
var JiaoCaiId = localStorage.getItem("JiaoCaiId");
var GradeId = localStorage.getItem("GradeId");
var SubjectId = localStorage.getItem("SubjectId");
var schoolid = getCookieByUserInfo('schoolid');
var Url;
/*****************获取栏目信息**********************/
var GetListResBook = {
	url: "Resource/GetListResBook",
	data:{schoolId:schoolid},
	type: 'get'
}
commonFn(GetListResBook, function(data) {
	$.each(data, function(i, n) {
		$("#JiaoCaiId").append("<option value='" + n.id + "'>" + n.name + "</option>");
	})
	$("#JiaoCaiId").find("option[value='" + JiaoCaiId + "']").attr("selected", 'selected').siblings().attr("selected", false);
	layui.form().render();


});
/****************获取教材**************/
var ajaxinfor = {
	url: 'OpenCourse/GetSubjectList?schoolId=' + schoolid,
	type: 'get'
}
commonFn(ajaxinfor, function(data) {
	$.each(data, function(i, n) {
		$("#SubjectId").append("<option value='" + n.subject_id + "'>" + n.subject_name + "</option>");
	})
	$("#SubjectId").find("option[value='" + SubjectId + "']").attr("selected", "selected").siblings().attr("selected", false);
	layui.form().render();
})
/*****获取年级******/
var ajaxGetGradeList = {
	url: 'SchoolResources/GetListResGrade?schoolId=' + schoolid,
	type: 'get'
}
commonFn(ajaxGetGradeList, function(data) {
//	console.log(data)
	$.each(data, function(i, n) {
		$("#GradeId").append("<option value='" + n.id + "'>" + n.name+ "</option>");
	})
	$("#GradeId").find("option[value='" + GradeId + "']").attr("selected", "selected").siblings().attr("selected", false);
	layui.form().render();
})
if(window.location.href.indexOf("?") > -1) {
	$("input[name='OldJiaoCaiId']").val(JiaoCaiId);
	$("input[name='OldSubjectId']").val(SubjectId);
	$("input[name='OldGradeId']").val(GradeId);
	$(".toptitle").html("编辑教材");
	Url = "Resource/ChangeResTeaBook";
} else {
	$(".toptitle").html("添加教材");
	Url = "Resource/AddResBook";
}
layui.form().render();
//保存
$("#save").on("click", function() {
	var bb = aa($("#form0"));
	// console.log(bb);
	var ajaxbaocun = {
		url:'Resource/ChangeResTeaBook?OldJiaoCaiId='+JiaoCaiId+'&OldGradeId='+GradeId+'&OldSubjectId='+SubjectId+'&schoolId='+schoolid,
		type: 'get'
	}
	ajaxbaocun.data=bb;
	commonFn(ajaxbaocun, function(data){
		location.href = "JiaoCai.html";
	})
	
});
function aa(form) {
		var o = {};
		$.each(form.serializeArray(), function(index) {
			if(o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		});
		return o;
	}
})
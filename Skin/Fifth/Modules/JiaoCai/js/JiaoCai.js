/**************教材列表*********************/
var jiaocaiName =0;
var JiaoCaiId = 0;
var GradeId = 0;
var SubjectId = 0;
var schoolid = getCookieByUserInfo('schoolid');
$("#search").on("click", function() {
	var name = $(this).prev().val();
	jiaoc(name);
})
function jiaoc(a) {
	var ajaxGetListResBook = {
		url: 'Resource/GetTeaBookList?jiaocaiid='+JiaoCaiId+'&gradeid='+GradeId+'&subjectid='+SubjectId+'&schoolId='+schoolid,
		type: 'get',
		data: {
			name: a
		}
	}
	commonFn(ajaxGetListResBook, function(res) {
			$("#tbody").empty();
			$.each(res, function(i, n) {
				$("#tbody").append(
					'<tr data-id="' + n.id + '" id="roleRow">' +
					'<td>'+ n.subjectId + '&nbsp;&nbsp;&nbsp;' + n.gradeId+ '&nbsp;&nbsp;&nbsp;' + n.jiaoCaiId+'</td>'+
					'<td >' + n.name + '&nbsp;&nbsp;&nbsp;' + n.gradename+ '&nbsp;&nbsp;&nbsp;' +n.subject_name+ '</td>' +
					'<input type="hidden" name="GradeId" value="' + n.gradeId + '">' +
					'<input type="hidden" name="JiaoCaiId" value="' + n.jiaoCaiId + '">' +
					'<input type="hidden" name="SubjectId" value="' + n.subjectId + '">' +
					'<td class="Operation">' +
					'<a href="ChapterLists.html?id=' + n.id + '"class="layui-btn layui-btn-mini zjgl">章节管理</a>&nbsp;&nbsp;&nbsp;' +
					'<a href="Knowledge.html?id=' + n.id + '"class="layui-btn layui-btn-mini zjgl">知识点管理</a>&nbsp;&nbsp;&nbsp;' +
					'<a href="TestList.html?id=' + n.id + '"class="layui-btn layui-btn-mini zjgl">考点管理</a>&nbsp;&nbsp;&nbsp;' +
					'<a href="EditJiaoCai.html?id=' + n.id + '"  class="layui-btn layui-btn-mini zjgl">编辑</a>&nbsp;&nbsp;&nbsp;' +
					'<a href="javascript:;"  class="layui-btn layui-btn-mini layui-btn-danger zjgl del">删除</a>' +
					'</td>' +
					'</tr>'
				);
			});
		})
}
jiaoc();
$("body").on("click", ".zjgl", function() {
		jiaocaiName = $(this).parent().parent().find("td:eq(0)").html();
		JiaoCaiId = $(this).parent().siblings("input[name='JiaoCaiId']").val();
		GradeId = $(this).parent().siblings("input[name='GradeId']").val();
		SubjectId = $(this).parent().siblings("input[name='SubjectId']").val();
		localStorage.setItem("JiaoCaiId", JiaoCaiId);
		localStorage.setItem("GradeId", GradeId);
		localStorage.setItem("SubjectId", SubjectId);
		localStorage.setItem("jiaocaiName", jiaocaiName);
	})
	/************删除一条记录*******************/
$("body").on("click", ".del", function() {
	layer.confirm('你确定要删除该栏目吗？',{icon:3,title:'提示'},function(index){
		var ajaxinfor = {
			url:'Resource/DeleteAllChapter?jiaocaiid='+JiaoCaiId+'&gradeid='+GradeId+'&subjectid='+SubjectId+'&schoolId='+schoolid,
			type: 'delete'
		}
		commonFn(ajaxinfor,function(res) {
				layer.msg("删除成功",{time:1000});
				location.href = 'JiaoCai.html';
			})
	}) 
});
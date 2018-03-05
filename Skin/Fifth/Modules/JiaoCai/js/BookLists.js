/**************教材列表*********************/

$("#search").on("click", function() {
		var name = $(this).prev().val();
		jiaoc(name);
	})
	/**************版本信息显示*********************/

var schoolid = getCookieByUserInfo('schoolid');
banben(schoolid);
function banben(schoolid) {
	var ajaxGetListResBook = {
		url: 'Resource/GetListResBook',
		type: 'get',
		data: {schoolId: schoolid}
	}
	commonFn(ajaxGetListResBook, function(data) {
		$.each(data, function(i, n){
//			var addTime = parseInt(n.addTime.replace(/[^0-9]+/g, ''));
//			var addTimes = new Date(addTime);
//			var AddTime = formatDate(addTimes);
			$('#tbody').append(
				'<tr data-id="' + n.id + '" id="roleRow">' +
				'<td>' + n.name + '</td>' +
				'<td>' + solveTime(n.addTime) + '</td>' +
				'<td data-id="' + n.userId + '">' + n.userName + '</td>' +
				'<td class="Operation">' +
				'<a href="AddEditBook.html?id=' + n.id + '"class="binaji btn layui-btn layui-btn-mini">编辑</a>' +
				'<a data-id="' + n.id + '" class="stop btn layui-btn layui-btn-mini layui-btn-danger">删除</a>' +
				'</td>' +
				'</tr>'
			);
		});
	})
}
/************删除一条记录*******************/
$("body").on("click", ".stop", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该栏目吗？',{icon:3,title:'提示'},function(index){
		var  ajaxDeleteResBook = {
			url:'Resource/DeleteResBook?id='+roId+'&schoolId='+schoolid,
			type:'delete'
			
		}
		commonFn(ajaxDeleteResBook,function(data) {
			location.href = "BookLists.html?id=42";
		}); 
		layer.close(index);
	});
});
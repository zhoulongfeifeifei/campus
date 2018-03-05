/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 18:43:46
 * @version $Id$
 */
var Name;
var IDs;
var SCHOOLID=getCookieByUserInfo("schoolid");
$("#save").on("click", function() {
	Name = $('#stuName').val();
	obtainList();
})

/***************获取学生列表信息***********************/
obtainList(1,0);
function obtainList(current, ids) {
	var GetListArticles = {
		url: "Portal/GetListCatalogs",
		data: {
			title: Name,
			pageIndex: current,
			pageSize: 10,
			id: ids,
			schoolid:SCHOOLID
		},
		type: "post"
	};
		commonFn(GetListArticles, function(data) {
			laypage({
					cont: 'page',
					pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
					curr: data.pageIndex,
					groups: 5,
					jump: function(e, first) { //触发分页后的回调
						if(!first) { //一定要加此判断，否则初始时会无限刷
							obtainList(e.curr, ids);
						}
					},
					skin: 'molv', //皮肤
					first: '首页', //将首页显示为数字1,。若不显示，设置false即可
					last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
					prev: false, //若不显示，设置false即可
					next: false //若不显示，设置false即可
				});
				$('tbody').empty();
				var data = data.resultData;
				$.each(data, function(i, n) {
					var ParentName;
					if(n.parentName) {
						ParentName = n.parentName;
					} else {
						ParentName = "-";
					}
					$("#roleTable").append('<tr data-id="' + n.id + '" id="roleRow">' +
						'<td >' + n.title + '</td>' +
						'<td data-id="' + n.parentId + '" >' + ParentName + '</td>' +
						'<td data-Id="' + n.channel + '" >' + n.channelName + '</td>' +
						'<td >' + yesno(n.isInner) + '</td>' +
						'<td >' + yesno(n.isNew) + '</td>' +
						'<td >' + yesno(n.showOnHomepage) + '</td>' +
						'<td >' + yesno(n.showOnNav) + '</td>' +
						'<td >' + yesno(n.isTop) + '</td>' +
						'<td >' + yesno(n.isNotify) + '</td>' +
						'<td >' + n.sort + '</td>' +
						'<td >' + solveTime(n.addTime) + '</td>' +
						'<td class="edit">' +
						'<a href="editColumn.html?id=' + n.id + '"class="layui-btn layui-btn-mini yinc"  data-operation="AjaxJianGong.UpdateCatalog" title="编辑">编辑</a>' +
						'<a href="addColumn.html?id=' + n.id + '"class="layui-btn layui-btn-mini yinc" data-operation="AjaxJianGong.AddCatalog" title="增加子类" >增加子类</a>' +
						'<a href="jgAuditer.html?id=' + n.id + '"class="layui-btn layui-btn-mini yinc" data-operation="AjaxJianGong.UpdateCatalog" title="增加栏目管理员" >管理员</a>' +
						'<a data-id="' + n.id + '" class="layui-btn layui-btn-mini layui-btn-danger stop yinc" data-operation="AjaxJianGong.DeleteCatalog" title="删除">删除</a>' +
						'</td>' +
						'</tr>');

				});
				quanxian();
	})
}
//获取侧导航
gettree();
function gettree(){
	var GetListCatalogsTree = {
			url: "Portal/GetListCatalogsTree",
			data: {
				id:0,
				channel: 1,
				schoolid:window.schoolid
			},
				type: "post"
			};
	commonFn(GetListCatalogsTree, function(data) {
		$(".c_left .c_left_tree").ligerTree({
			data: data,
			checkbox: false,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onSelect: function(note) {
				IDs = note.data.id;
				obtainList(1, IDs);
			},
		})
	});
}

/************删除班级列表*******************/
$("body").on("click", ".stop", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该栏目吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
		  var DeleteArticle ={url:"Portal/DeleteCatalog?id="+roId+"&schoolId="+SCHOOLID,type:"DELETE"};
		  commonFn(DeleteArticle,function(data){
		  	layer.msg('删除成功',{time:1000},function(){
		  		obtainList();
		  		gettree()
		  	});
		  })
		}, function(){
		  layer.closeAll();
		});
})


function yesno(num) {
	var yes;
	if(num == 1) {
		yse = "是";
	} else {
		yse = "否";
	}
	return yse;
}
$("body").on('click',".nav_title",function(){
	obtainList();	
})
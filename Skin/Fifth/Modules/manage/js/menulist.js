var layer = layui.layer;
//关键字搜索
var Name;
$("#save").on("click", function() {
	Name = $('#stuName').val();
	lists(Name);
})

/***************获取列表信息***********************/
var index = 1;
var a = 1;
var b = 1;
var c = 1;
lists();

function lists(schoolId) {
	commonFn({
		url:'Manage/GetListAdminUserMenuTree',
		data:{schoolId: schoolId || 1,id:0}
	},function(data){
		var menu = $.ligerMenu({
			top: 100,left: 100,width: 120,
			items: [{text: '修改',click: remove,icon: 'add'}, 
				{text: '删除',click: remove,icon: 'remove'}, ]
		});
		$("#roleTable").ligerTree({
			data: data,
			checkbox: false,
			nodeWidth : 90 ,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			isExpand: true,
			onContextmenu: function(node, e) {
				actionNodeID = node.data;
				menu.show({
					top: e.pageY,
					left: e.pageX
				});
				return false;
			}
		});
	})
}

var isShow = false;
$(".extend").on("click", function() {
	var parentid = $(this).attr("data-id");
	if (isShow) {
		$(".child" + parentid).hide();
		isShow = false;
	} else {
		$(".child" + parentid).show();
		isShow = true;
	}
	var spa = $(this).find("span");
	if ($(spa).hasClass("glyphicon-plus-sign")) {
		$(spa).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
	} else {
		$(spa).removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");

	}
});
$("body").on("click", '.name', function() {
	$(this).parent().next().toggle();
	var i = $(this).find("i");
	if ($(i).hasClass("glyphicon-plus-sign")) {
		$(i).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
	} else {
		$(i).removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
	}
})

function remove(item, i) {
	var roId = actionNodeID.id;
	if (item.text == "删除") {
		layer.confirm('你确定要删除吗？', {
			icon: 3,
			title: "删除提示"
		}, 
		function(index) {
			layer.close(index);
			commonFn({url:'Manage/Delete?id='+roId,type:'delete'},function(res){
				layer.msg("删除成功");
				location.reload();
			})
		})
	}else if(item.text == "修改"){
		location.href='menuedit.html?id=' + roId;
	}
}
/************删除列表*******************/
// $("body").on("click", ".stop", function() {
// 	var roId = $(this).attr("data-id");
// 	layer.confirm('你确定要删除吗？', {
// 		icon: 3,
// 		title: "删除提示"
// 	}, function(index) {
// 		layer.close(index);
// 		commonFn({url:'Manage/Delete',data:{id: roId},type:'delete'},function(res){
// 			layer.msg("删除成功");
// 			location.reload();
// 		})
// 	})
// })
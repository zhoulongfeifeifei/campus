
var Name;
$("#search").on("click", function() {
	Name = $('#stuName').val();
	obtainList();
})
/***************获取栏目资源信息***********************/
obtainList();
function obtainList(curr,search){
	var GetListResCatalog = {
	url: "SchoolResources/GetListResCatalog",
	data: {
			PageIndex: curr||1,
			keyword:search,
			schoolid:window.schoolid
		},
	type: "get"
};
commonFn(GetListResCatalog, function(data) {
			layui.laypage({
				cont: 'page',
				pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) { //触发分页后的回调
					if(!first) { //一定要加此判断，否则初始时会无限刷
						obtainList(e.curr);
					}
				},
				skin: 'molv', //皮肤
				first: '首页', //将首页显示为数字1,。若不显示，设置false即可
				last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
				prev: false, //若不显示，设置false即可
				next: false //若不显示，设置false即可
			});
				$("#roleTable").empty();
				$.each(data, function(i, n) {
					$("#roleTable").append('<tr data-id="' + isNull(n.id) + '" id="roleRow">' +
                        '<td >' + n.id + '</td>' +
						'<td >' + isNull(n.name) + '</td>' +
						'<td data-id="' + isNull(n.userId) + '" >' + isNull(n.userName) + '</td>' +
						'<td >' + solveTime(n.addTime) + '</td>' +
						'<td class="edit">' +
						'<a href="javascript:;" data-id="' + n.id + '" data-operation="SchoolResources.UpdateResCatalog" class="yinc layui-btn layui-btn-mini bianji">编辑</a>' +
						'<a data-id="' + n.id + '" data-operation="SchoolResources.DeleteResCatalog" class="yinc layui-btn layui-btn-mini layui-btn-danger sc ">删除</a>' +
						'</td>' +
						'</tr>');
				});
				quanxian();
	})
}

//添加栏目

$("#addnigao").on("click",function(){
	$("#model #name").val('');
	layer.open({
	  type:1,
        title:"栏目管理",
        content:$('#model'),
        area:['400px','200px'],
        cancel: function(){ 
    		$('#model').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
		 	var name = $('#name').val();
		 	if (name.length > 0) {
		 		var AddResCatalog = {
				url: "SchoolResources/AddResCatalog",
				data:{
					schoolid:window.schoolid,
					name:name
				},
				type: "post"
			};
			commonFn(AddResCatalog, function(data) {
				layer.msg("添加成功",{time:1000},function(){
					layer.closeAll();
					obtainList();
				});
			})
		 	} else{
		 		layer.msg('不能为空')
		 	}	
		},
		btn2:function(){
			layer.closeAll();
		}
	})
})


//编辑栏目
$("body").on("click",'.bianji',function(){
	var ids=$(this).attr("data-id");
	var GetResType = {
		url: "SchoolResources/GetResCatalog",
		data: {
			id: ids,
			schoolid:window.schoolid
		},
		type: "get"
	};
	commonFn(GetResType, function(data) {
		$("#model #name").val(data.name);
	})
	layer.open({
	  type:1,
        title:"编辑栏目",
        content:$('#model'),
        area:['400px','200px'],
        cancel: function(){ 
    		$('#model').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
			var UpdateResCatalog = {
				url: "SchoolResources/UpdateResCatalog",
				data:{
					schoolid:window.schoolid,
					id:ids,
					name:$("#model #name").val()
				},
				type: "post"
			};
			commonFn(UpdateResCatalog, function(data) {
				layer.msg("保存成功",{time:1000},function(){
					layer.closeAll();
					obtainList();
				});
			})
		},
		btn2:function(){
			layer.closeAll();
		}
	})
})






/************删除一条记录*******************/
$("body").on("click", " .sc", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该栏目吗？', {
		icon: 3,
		title: "删除提示"
	}, function() {
		var removeload = layer.load();
		var DeleteResCatalog = {
			url: "SchoolResources/DeleteResCatalog?id=" + roId +"&schoolid=" + window.schoolid,
			type: "delete"
		};
		commonFn(DeleteResCatalog, function(data) {
				layer.close(removeload);
					layer.msg("删除成功",{time:1000},function(){
						obtainList();
					});
			});
	})
})
//搜索栏目信息
$('body').on('click','#seach',function(event){
	console.log('我被点击了');
	var seadata = $.trim($(this).prev().val())
		console.log(seadata)
	    if ($.trim(seadata)) {
       obtainList(1,seadata);
    }	
})

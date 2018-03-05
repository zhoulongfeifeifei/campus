
/**************班级列表信息显示*********************/
getgradelist();
function getgradelist(){
	var GetListResGrade = {
				url: "SchoolResources/GetListResGrade",
				data:{schoolid:window.schoolid},
				type: "get"
			};
			commonFn(GetListResGrade, function(data) {
				$("#tbody").empty();
	        $.each(data, function(i, n) {
	            $("#tbody").append(
	                    '<tr data-id="'+n.id+'" id="roleRow">'+
                       	 	'<td >'+n.id+'</td>'+
	                        '<td >'+n.name+'</td>'+
	                        '<td data-id="'+n.userId+'" >'+n.userName+'</td>'+
	                        '<td >'+solveTime(n.addTime)+'</td>'+
	                        '<td class="Operation">'+
	                            '<a href="javascript:;" data-id="' + n.id + '" data-operation="SchoolResources.UpdateResGrade" class="yinc layui-btn layui-btn-mini bianji" title="编辑" >编辑</a>' +
	                            '<a data-id="' + n.id + '" data-operation="SchoolResources.DeleteResGrade" class="yinc layui-btn layui-btn-mini layui-btn-danger stop" title="删除" >删除</a>' +
	                        '</td>'+
	                    '</tr>'
	                );
	        });
	        quanxian();
	});
}
//添加资源年段
$("#addnigao").on("click",function(){
	$("#model #name").val('');
	layer.open({
	  type:1,
        title:"资源年段管理",
        content:$('#model'),
        area:['400px','200px'],
        cancel: function(){ 
    		$('#model').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
		 	var value = $('input[type="text"]').val();
		 	if (value.length>0) {
		 		var AddResCatalog = {
				url: "SchoolResources/AddResGrade",
				data:{
					schoolid:window.schoolid,
					name:value
				},
				type: "post"
			};
			commonFn(AddResCatalog, function(data) {
				layer.msg("添加成功",{time:1000},function(){
					layer.closeAll();
					getgradelist();
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


//编辑资源年段
$("body").on("click",'.bianji',function(){
	var ids=$(this).attr("data-id");
	var GetResType = {
		url: "SchoolResources/GetResGrade",
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
        title:"编辑资源年段",
        content:$('#model'),
        area:['400px','200px'],
        cancel: function(){ 
    		$('#model').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
			var UpdateResCatalog = {
				url: "SchoolResources/UpdateResGrade",
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
					getgradelist();
				});
			})
		},
		btn2:function(){
			layer.closeAll();
		}
	})
})




/************删除一条记录*******************/
$("body").on("click", ".stop", function() {
    var roId = $(this).attr("data-id");
    layer.confirm('你确定要删除该栏目吗？',{},function() {
        var removeload = layer.load();
        var DeleteResGrade = {
			url: "SchoolResources/DeleteResGrade?id=" + roId +"&schoolid=" + window.schoolid,
			type: "delete"
		};
		commonFn(DeleteResGrade, function(data) {
                layer.close(removeload);
                    layer.msg("删除成功",{time:1000},function(){
                    	getgradelist();
                    });
            });
    })
})
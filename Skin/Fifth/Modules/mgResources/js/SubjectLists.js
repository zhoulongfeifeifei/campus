/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-16 14:54:29
 * @version $Id$
 */


/**************班级列表信息显示*********************/
getlist();
function getlist(){
	var GetListSubject = {
		url: "SchoolResources/GetListSubject",
		data: {
			schoolid:window.schoolid
		},
		type: "get"
	};
	//var getlistload= layer.load();
	commonFn(GetListSubject, function(data) {
	            //layer.close(getlistload);
	            $("#tbody").empty();
	            $.each(data, function(i, n) {
	                $("#tbody").append(
	                        '<tr data-id="'+isNull(n.subject_id)+'" id="roleRow">'+
								'<td >'+isNull(n.subject_id)+'</td>'+
	                            '<td >'+isNull(n.subject_name)+'</td>'+
	                            '<td >'+solveTime(n.intime)+'</td>'+
	                            '<td class="Operation">'+
	                                '<a href="javascript:;" data-id="' + n.subject_id + '" data-operation="SchoolResources.UpdateSubject" class="yinc layui-btn layui-btn-mini bianji" title="编辑" >编辑</a>' +
	                                '<a data-id="' + n.subject_id + '" data-operation="SchoolResources.DeleteSubject" class="yinc layui-btn layui-btn-mini layui-btn-danger stop" title="删除" >删除</a>' +
	                            '</td>'+
	                        '</tr>'
	                    );
	            });
	            quanxian();
	});
}

//添加资源学科
$("#addnigao").on("click",function(){
	$("#model #name").val('');
	layer.open({
	  type:1,
        title:"资源学科管理",
        content:$('#model'),
        area:['400px','200px'],
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
	  		var name = $("#model #name").val();
	  		if(name.length>0){
			var AddResCatalog = {
				url: "SchoolResources/AddSubject",
				data:{
					school_id:window.schoolid,
					subject_name:name
				},
				type: "post"
			};
			commonFn(AddResCatalog, function(data) {
				layer.msg("添加成功",{time:800},function(){
					layer.closeAll();
					getlist()
					});
				})
            }else{
	  			layer.msg('不能为空')
			}
		},
		btn2:function(){
			layer.closeAll();
		}
	})
})


//编辑资源学科
$("body").on("click",'.bianji',function(){
	var ids=$(this).attr("data-id");
	var GetResType = {
		url: "SchoolResources/GetSubject",
		data: {
			id: ids,
			schoolid:window.schoolid
		},
		type: "get"
	};
	commonFn(GetResType, function(data) {
		$("#model #name").val(data.subject_name);
	})
	layer.open({
	  type:1,
        title:"编辑资源学科",
        content:$('#model'),
        area:['400px','200px'],
        cancel: function(){ 
    		$('#model').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
			var UpdateResCatalog = {
				url: "SchoolResources/UpdateSubject",
				data:{
					schoolid:window.schoolid,
					subject_id:ids,
					subject_name:$("#model #name").val()
				},
				type: "post"
			};
			commonFn(UpdateResCatalog, function(data) {
				layer.msg("保存成功",{time:500},function(){
					layer.closeAll();
					getlist()
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
    layer.confirm('你确定要删除该栏目吗？', function(index){
        layer.close(index)
        var reload = layer.load();
        var Delete = {
			url: "SchoolResources/DeleteSubject?id="+roId+"&schoolid="+window.schoolid,
				type: "delete"
			};
			commonFn(Delete, function(data) {
                    layer.msg("删除成功",{time:700},function(){
                    	getlist()
                    });
           });
    })
})
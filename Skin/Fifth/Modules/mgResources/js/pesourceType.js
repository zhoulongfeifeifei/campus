
obtainList();
function obtainList(current ,search) {
    $('#tbody tr').each(function() {
        $(this).remove();
    });
    var GetListResType = {
			url: "SchoolResources/GetListResType",
			data: {
				schoolid:window.schoolid,
			},
			type: "get"
		};
		commonFn(GetListResType, function(data) {
                var Types = data;
                $.each(Types, function(i, n) {
                    $("#tbody").append('<tr>' +
                    	'<td>' + n.id + '</td>'+
                        '<td>' + n.name + '</td>' +
                        '<td data-id="'+n.userId+'">' + n.userName + '</td>' +
                        '<td>' + solveTime(n.addTime) + '</td>' +
                        '<td class="order">' +
                        '<a href="javascript:;" data-id="' + n.id + '" class="layui-btn layui-btn-mini bianji" title="编辑" >编辑</a>' +
                        '<a href="javascript:;" onclick="delRole(this)" data-id="' + n.id + '" class="layui-btn layui-btn-mini layui-btn-danger" title="删除" >删除</a>' +
                        '</td>' +
                        '</tr>');
                })
    })
}

//添加类型模态框
$("#addnigao").on("click",function(){
	layer.open({
	  type:1,
        title:"创建资源类型",
        content:$('#myModal'),
        area:['450px','280px'],
        btn:['保存','取消'],
        yes:function(){
        	layer.closeAll();
        	obtainList();
        },
        cancel: function(){ 
    		$('#myModal').hide();
		 }  
	})
})
///模态框添加多条记录
$("#Add_td").on("click",function(){
    $(".mo_body").append(
    	'<tr>'+
            '<td><span></span><input type="text" name="Name" class="names" value=""/></td>'+
            '<td>'+
                '<a class="layui-btn layui-btn-small bc">保存</a>'+
                '<a class="layui-btn layui-btn-small qx">取消</a>'+
            '</td>'+
        '</tr>');
})
$("body").on("click",".qx",function(){
    $(this).parent().parent().remove();
    $.each('.name_list li').hide();
})
$("body").on("click",".bc",function(){
    var value=$(this).parent().siblings().find(".names").val();  
    var obj={};
    obj.Name=value;
    obj.schoolid=window.schoolid;
    var $this=$(this);
    var AddResType = {
		url: "SchoolResources/AddResType",
		data: obj,
		type: "post"
	};
	commonFn(AddResType, function(data) {
		if (value.length > 0) {
			layer.msg("保存成功",{time:1000},function(){
        	$this.parent().siblings().find("span").html(value);
    		$this.parent().siblings().find(".names").hide();
    		$this.hide();
    		$this.siblings().show();
        	$(".name_list").append("<li>"+value+"</li>");
       		});
       		
		} else{
			layer.msg('不能为空')
		}      
});
})

    ///添加保存
$("#save,#close").on("click", function() {
    $(".mo_body").html('<tr>'+
            '<td><span></span><input type="text" name="Name" class="names" value="" /></td>'+
            '<td>'+
                '<a class="text link red qx"><span class="glyphicon glyphicon-remove"></span>取消</a>'+
                '<a class="link blue bc" ><span class="glyphicon glyphicon-ok"></span>保存</a>'+
            '</td>'+
        '</tr>');
})
//编辑类型
$("body").on("click",'.bianji',function(){
	var ids=$(this).attr("data-id");
	var GetResType = {
		url: "SchoolResources/GetResType",
		data: {
			id: ids,
			schoolid:window.schoolid
		},
		type: "get"
	};
	commonFn(GetResType, function(data) {
		$("#myModal2 #name").val(data.name);
	})
	layer.open({
	  type:1,
        title:"创建资源类型",
        content:$('#myModal2'),
        area:['400px','250px'],
        cancel: function(){ 
    		$('#myModal2').hide();
		 },
		 btn: ['保存', '取消'],
		 yes: function(index, layero){
		 	var bb ={};
			bb.id=ids;
			bb.name=$("#myModal2 #name").val();
			bb.schoolid=window.schoolid;
			var UpdateResType = {
				url: "SchoolResources/UpdateResType",
				data:bb,
				type: "post"
			};
			commonFn(UpdateResType, function(data) {
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
    /********删除资产类型*************/
function delRole(a) {
    var id = $(a).attr("data-id");
    layer.confirm('你确定要删除该记录吗？',{icon:3 ,title:"删除提示"},function(index){
        layer.close(index);
        var removeload = layer.load();
         var DeleteResType = {
			url: "SchoolResources/DeleteResType?Id="+id+"&schoolid="+window.schoolid,
				type: "delete"
			};
			commonFn(DeleteResType, function(data) {
                layer.close(removeload);
                    layer.msg("删除成功",{time:1000},function(){
                    	
                    	$(a).parent().parent().remove();
                    });
        });
    })  
}

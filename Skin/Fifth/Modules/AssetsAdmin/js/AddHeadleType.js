/************数据列表显示*****************/
var layer = layui.layer,
laypage = layui.laypage;
obtainList();
function obtainList(current) {
    $('tbody tr').each(function() {
        $(this).remove();
    });
    var GetListAssetsHandlerType={
    	url: "/Assets/GetListAssetsHandlerType",
    	data: {
            PageIndex: current,
            PageSize: 1
        },
        type: "post"
    }
    commonFn(GetListAssetsHandlerType,function(data){
    	laypage({
            cont: 'page',
            pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: data.pageIndex,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷
                    obtainList(e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
         var Types = data.resultData;
            $.each(Types, function(i, n) {
                $("#tbody").append('<tr>' +
                    '<td>' + n.handlerType + '</td>' +
                    '<td>' + n.name + '</td>' +
                    '<td>' + n.descript + '</td>' +
                    '<td class="order">' +
                    '<a href="javascript:;" data-id="' + n.id + '" data-toggle="modal" data-target="#myModal"><span class="layui-btn layui-btn-mini" >修改</span></a>' +
                    '<a href="javascript:;" onclick="delRole(this)" data-id="' + n.id + '"><span class="layui-btn layui-btn-mini layui-btn-danger" style="margin-left:10px;">删除</span></a>' +
                    '</td>' +
                    '</tr>');
            });
        
    })
}
/*********模态框弹出************/
$("body").on("click", '.add', function() {
    $("#myModal .lauyi-form").attr("action", "/Assets/AddAssetHandlerType");
    $("#myModal input,#myModal textarea").val("");
    layer.open({
		type: 1,
		title:'增加处理类型"',
		anim: 1,
		btn:['保存','关闭'],
		shadeClose: true,
		area: ['600px', '470px'], //宽高
		content: $('#myModal'),
		btn1:function(){
			var bb = aa($("#form0"));
			bb.Id=0;
		    var cc = $("#form0").attr("action");
		    var bcSave={
		    	url: cc,
		    	dataType: "Json",
		    	type: "post"
		    }
		    bcSave.data=bb;
		    if(!$('#HandlerType').val()){
		    	layer.msg('请先填写类别')
		    }else if(!$('#Name').val()){
		    	layer.msg('请先填写名称')
		    }else{
		    	commonFn(bcSave,function(data){
			    	layer.msg("保存成功！",{time:1000},function(){	
				        window.location.reload();
			        });
			    })
		    }
		     
		}
	})
})
$("body").on("click", '.order a:first-child', function() {
        $("#myModal .lauyi-form").attr("action", "/Assets/UpdateAssetHandlerType");
        var id = $(this).attr("data-id");
        var handType=$(this).parent().parent().find('td').eq(0).text();
        var handName=$(this).parent().parent().find('td').eq(1).text();
        var descript=$(this).parent().parent().find('td').eq(2).text();
        $("input[name='HandlerType']").val(handType);
        $("input[name='Name']").val(handName);
        $("textarea[name='Descript']").val(descript);
        /************修改显示信息***********/
         layer.open({
        	type: 1,
			title:'修改处理类型',
			anim: 1,
			btn:['保存','关闭'],
			shadeClose: true,
			area: ['600px', '470px'], //宽高
			content: $('#myModal'),
			btn1:function(){
				 /************修改显示信息***********/
		       	var GetMaintainRecored={
		       		url: "/Assets/GetAssetHandlerType",
		       		data: {
		                id: id
		           },
		            type: "get"
		       	}
		       	commonFn(GetMaintainRecored,function(data){
		             for (key in data) {
	                    $("#" + key).val(data[key]);
	                }
		            var bb = aa($("#form0"));
   		 			var cc = $("#form0").attr("action");	
   		 			bb.Id=id;
   		 			var bcSave={
				    	url: cc,
				    	dataType: "Json",
				    	type: "post"
				    }
				    bcSave.data=bb;
				    commonFn(bcSave,function(data){
				    	layer.msg("保存成功！",{time:1000},function(){	
					        window.location.reload();
				        });
				    })
		       	})
		        
		       	
			}
        })
   })
//对form表单里面的各种值进行获取
var aa = function(form) {
        var o = {};
        $.each(form.serializeArray(), function(index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }
    /********删除资产类型*************/
function delRole(a) {
    var id = $(a).attr("data-id");
    layer.confirm('你确定要删除该记录吗?',{icon: 3, title:'提示'}, function(){
    	var DeleteMaintainRecored={
    		url: "/Assets/DeleteAssetHandlerType",
    		data: {
                id: id
           },
            type: "get"
    	}
    	commonFn(DeleteMaintainRecored,function(data){
    		layer.msg("删除成功！",{time:1000},function(){	
                $(a).parent().parent().remove();
            });
            layer.closeAll('loading'); 
    	})
    })
}
 var layer = layui.layer,form=layui.form();
 laypage = layui.laypage;
 var schoolid = getCookieByUserInfo('schoolid');
 
    function GetListAssetsType(){
    	  /****************获取资产名称列表1**********************/
		var GetListAssetsType={
		   	url: "/Assets/GetListMaintainRecored",
		   	data:{id:0},
		   	type: "post"
		}
		commonFn(GetListAssetsType,function(data){
			var name=data.resultData;
			$.each(name, function(i, n) {
		        $("#Name").append('<option value="' + n.id + '">' + n.name + '</option>');
		   });
		    form.render();
		});
    	 /****************获取维护人员列表3**********************/
		var GetTeacherListBySchool={
			url: "/Assets/GetListAssetsAttribute",
		    data:{
		        schoolId:schoolid
		    },
			 type: "get"
		}
		commonFn(GetTeacherListBySchool,function(data){
		    var keeper=data.keeperList;
			$.each(keeper, function(i, n) {
		     $("#UserId").append('<option value="' + n.user_id + '">' + n.name + '</option>');
			});
			 form.render();
		})
	}	
    /****************获取处理类型列表2**********************/
var	GetListAssetsHandlerType={
	url: "/Assets/GetListAssetsHandlerType",
	data:{
		id:0
	},
	type: "post" 
}
commonFn(GetListAssetsHandlerType,function(data){
	var users = data.resultData;
    $.each(users, function(i, n) {
        $("#MaintainType").append('<option value="' + n.id + '">' + n.name + '</option>');
    });
    form.render();
})
    //搜索
var name;
$("#search").on("click", function() {
    name = $("#ss").val();
    obtainList(name);
})
    /************数据列表显示*****************/
obtainList();

function obtainList(name, current) {
    $('tbody tr').each(function() {
        $(this).remove();
    });
    var GetListMaintainRecored={
    	url: "/Assets/GetListMaintainRecored",
    	data:{
    		id:0,
    		name:name,
    		pageIndex:current
    	},
    	type: "post"
    }
    commonFn(GetListMaintainRecored,function(data){
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
            if (n.maintainResult == null) {
                n.maintainResult = "未填";
            }
            $("#tbody").append('<tr>' +
                '<td id="'+n.id+'">' + n.name + '</td>' +
                '<td>' + n.handlerTypeName + '</td>' +
                '<td userId="'+n.userId+'">' + n.userName + '</td>' +
                '<td>' + solveTime(n.addTime) + '</td>' +
                '<td class="jg">' + n.maintainResult + '</td>' +
                '<td class="order">' +
                '<a href="javascript:;" data-id="' + n.id + '" data-toggle="modal" data-target="#myModal" class="layui-btn layui-btn-mini" title="编辑">编辑</a> ' +
                '<a href="javascript:;" data-id="' + n.id + '" name="jg" data-toggle="modal" data-target="#myModal2" class="layui-btn layui-btn-mini" title="维护结果">维护结果</a>' +
                '<a href="javascript:;" class="layui-btn layui-btn-mini layui-btn-danger" onclick="delRole(this)" data-id="' + n.id + '" title="删除">删除</a>' +
                '</td>' +
                '</tr>');
        });
    })
}

/*********增加修改模态框弹出************/
$("body").on("click", '.add', function() {
	$("#myModal form").attr("action", "/Assets/AddMaintainRecored");
	$('#InTime').val(' ');
	$('#Name').html('<option value=""></option>');
	$('#UserId').html('<option value=""></option>');
	GetListAssetsType();
	layer.open({
		type: 1,
		title:'新增维护记录',
		anim: 1,
		btn:['保存','关闭'],
		shadeClose: true,
		area: ['600px', '470px'], //宽高
		content: $('#myModal'),
		btn1:function(){
			var bb = aa($("#form0"));
			bb.Id=0;
		    var cc = $("#form0").attr("action");
		    var Name=$('#Name option:selected').text();
		    var userId=$('#UserId option:selected').text();
		    bb.Name=Name;
		    var bcSave={
		    	url: cc,
		    	dataType: "Json",
		    	type: "post"
		    }
		    bcSave.data=bb;
		    if(!Name){
		    	layer.msg('请先选择资产名称');
		    }else if(!$('#MaintainType option:selected').text()){
		    	layer.msg('请先选择维护类型')
		    }else if(!$('#InTime').val()){
		    	layer.msg('请选择维护时间')
		    }else if(!userId){
		    	layer.msg('请选择维护人员')
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
$("table").on("click", '.order a:first-child', function() {
        $("#myModal form").attr("action", "/Assets/EditMaintainRecored");
         var id = $(this).attr("data-id");
         var ziNameId=$(this).parent().parent().find('td').eq(0).attr('id');
          
         var weiName=$(this).parent().parent().find('td').eq(2).attr('userId');
         var oldTime=$(this).parent().parent().find('td').eq(3).text();
         $('#InTime').val(oldTime);
          /****************获取资产名称列表1**********************/
		var GetListAssetsType={
		   	url: "/Assets/GetListMaintainRecored",
		   	data:{id:0},
		   	type: "post"
		}
		commonFn(GetListAssetsType,function(data){
			var name=data.resultData;
			$.each(name, function(i, n) {
		        $("#Name").append('<option value="' + n.id + '">' + n.name + '</option>');
		    });
		    $("#Name").find("option[value='" + ziNameId + "']").attr("selected", 'selected');
		    form.render();
		});
         /****************获取维护人员列表3**********************/
		var GetTeacherListBySchool={
			url: "/Assets/GetListAssetsAttribute",
		    data:{
		        schoolId:schoolid
		    },
			 type: "get"
		}
		commonFn(GetTeacherListBySchool,function(data){
		    var keeper=data.keeperList;
			$.each(keeper, function(i, n) {
		     $("#UserId").append('<option value="' + n.user_id + '">' + n.name + '</option>');
			 });
			 $("#UserId").find("option[value='" + weiName + "']").attr("selected", 'selected');
			 form.render();
		})
        layer.open({
        	type: 1,
			title:'修改维护记录',
			anim: 1,
			btn:['保存','关闭'],
			shadeClose: true,
			area: ['600px', '470px'], //宽高
			content: $('#myModal'),
			btn1:function(){
				 /************修改显示信息***********/
		       	var GetMaintainRecored={
		       		url: "/Assets/GetMaintainRecored",
		       		data: {
		                id: id
		            },
		            dataType: "Json",
		            type: "get"
		       	}
		       	commonFn(GetMaintainRecored,function(data){                              
		            $("#form0 input[name='Id']").val(data.id);
		            $("#form0 #Name").children("option[value=" + data.name + "]").attr("selected", "selected");
		            $("#form0 #Name").children("option[value=" + data.name + "]").siblings().attr("selected", false);
		            $("#form0 #InTime").val(solveTime(data.inTime));
		            $("#form0 #Remark").val(data.remark);
		            $("#form0 #MaintainType").children("option[value=" + data.maintainType + "]").attr("selected", "selected");
		            $("#form0 #MaintainType").children("option[value=" + data.maintainType + "]").siblings().attr("selected", false);
		            $("#form0 #UserId").children("option[value=" + data.userId + "]").attr("selected", "selected");
		            $("#form0 #UserId").children("option[value=" + data.userId + "]").siblings().attr("selected", false);
		       	})
		       	var bb = aa($("#form0"));
			    var cc = $("#form0").attr("action");			    
			    bb.Id=id;
			    var Name=$('#Name option:selected').text();
			    var userId=$('#UserId option:selected').text();
			    bb.Name=Name;
			    var bcSave={
			    	url: cc,
			    	type: "post"
			    }
			    bcSave.data=bb;
			    if(!Name){
		    		layer.msg('请先选择资产名称');
			    }else if(!$('#MaintainType option:selected').text()){
			    	layer.msg('请先选择维护类型')
			    }else if(!$('#InTime').val()){
			    	layer.msg('请选择维护时间')
			    }else if(!userId){
			    	layer.msg('请选择维护人员')
			    }else{
			    	commonFn(bcSave,function(data){
				    	layer.msg("编辑成功！",{time:1000},function(){	
					        window.location.reload();
				        });
				    })
			    }		       	
			}
        })
        

        
 
    })
    /*********维护结果模态框弹出************/
$("body").on("click", '.order a[name="jg"]', function() {
    $("#myModal2 form").attr("action", "/Assets/EditMaintainRecored");
    var Id = $(this).attr("data-id");
    layer.open({
    	type: 1,
		title:'维护结果',
		anim: 1,
		btn:['保存','关闭'],
		shadeClose: true,
		area: ['600px', '470px'], //宽高
		content: $('#myModal2'),
		btn1:function(){			
			$("#jgId").val(Id);
		    var jg = $(this).parent().siblings(".jg").html();
		    var bb = aa($("#form1"));
		    var maintainResult=$('#Result').val();
		    var cc = $("#form1").attr("action");
		    var bcSave2={
		    	url: cc,
		    	data:{
		    		id:Id,
		    		maintainResult:maintainResult
		    	},
		    	type: "post"
		    }
		    if(!$('#Result').val()){
		    	layer.msg('请先填写维护结果')
		    }else{
		    	commonFn(bcSave2,function(data){
			    	layer.msg("保存成功！",{time:1000},function(){
				        window.location.reload();
			        });
			    })
		    }
		     
		}
    })
     
})
  
//获取form表单的内容
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
    /********删除一条记录*************/
function delRole(a) {
    var id = $(a).attr("data-id");
    layer.confirm('你确定要删除该记录吗?',{icon: 3, title:'提示'}, function(){
    	var DeleteMaintainRecored={
    		url: "/Assets/DeleteMaintainRecored",
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
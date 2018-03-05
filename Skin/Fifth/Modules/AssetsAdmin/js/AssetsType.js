var layer = layui.layer,
		laypage = layui.laypage;
var schoolid = getCookieByUserInfo('schoolid');		
//资产类别信息展示		
var GetListAssetsType={
    url: "/Assets/GetListAssetsType",
    type: "get"
}
commonFn(GetListAssetsType,function(data){
    $.each(data, function(i, n) {
        $("#tbody").append('<tr>' +'<td>' + n.sort + '</td>' +'<td>' + n.typeName + '</td>' +'<td class="order">' +'<a href="javascript:;" data-id="' + n.id + '"  class="layui-btn layui-btn-mini" data-toggle="modal" data-target="#myModal">修改</a> '
        +'<a href="javascript:;" onclick="delRole(this)" class="layui-btn layui-btn-mini layui-btn-danger delete" data-id="' + n.id + '">删除</a> ' +'</td>' +'</tr>');
    });
});

/*********模态框弹出************/
$('body').on('click','.add',function(){
	layui.use('layer', function() {
		var layer = layui.layer;
		layer.open({
			type: 1,
			anim: 1,
			title:false,
			shadeClose: true,
			area: ['600px', '260px'], //宽高
			content: $('.layer-box')
		});
	});
})
//上传文件
layui.upload({
    url:window.apiUrl+'Common/UploadFile',
    type:'file',
    before:function(input){
    	fileName=input.files[0].name;
    },
    success:function(res){
        $('#txtfiles').val(fileName);
//      layer.msg('上传成功'); 
		var ImportAssets={
			url:'/Assets/ImportAssets',
			data:{
				schoolId:schoolid,
				fileUrl:res.data[0]
			},
			type:'get'
		}
		commonFn(ImportAssets,function(data){
			layer.msg('上传成功');
			 setTimeout(function(){
				window.history.go(-1); 
			 },800);
		})
    }
})
////上传文件
//layui.upload({
//  url:window.apiUrl+'Common/UploadFile',
//  type:'file',
//  before:function(input){
//  	fileName=input.files[0].name;
//  },
//  success:function(res){
////      $('input[name="path"]').val(res.data[0]);
//      $('#txtfiles').val(fileName);
//      layer.msg('上传成功'); 
//  }
//})
//function getFileName(u){
//  var arr = u.split('/');
//  return arr[arr.length-1];
//}
//资产类别和序号的修改
$("body").on("click", '.order a:first-child', function() {
        $("#form0").attr("action", "/Assets/EditAssetType");
        var id = $(this).attr("data-id");
        //得到名称和url地址值
		var name1 = $(this).parent().parent().find('td').eq(1).text();
		var sort1 = $(this).parent().parent().find('td').eq(0).text();
		$("input[name='TypeName']").val(name1);
		$("input[name='Sort']").val(sort1);
        /************修改显示信息***********/
       layer.open({
	       	type: 1,
	       	title:'修改资产类型',
	        closeBtn: 1,
	        shadeClose: true,
	        skin: 'yourclass',
	        area: ['500px', '300px'],
	        content: $('#myModal'), //这里content是一个DOM
	        btn: ['保存', '取消'],
	        btn1:function(){
	        	var GetAssetType={
       			url: "/Assets/GetAssetType",
       			data: { id: id},
            	type: "get"	
       		}
       		commonFn(GetAssetType,function(data){
	   			for (key in data) {
	            	$("#" + key).val(data[key]);
	        	}
       		})
       		var TypeName=$("input[name='TypeName']").val();
       		var	Sort=$("input[name='Sort']").val();
		    var cc = $("#form0").attr("action");
		    var Bcsave={
		    	url: cc,
		        data: {
		        	id:id,
		        	typeName:TypeName,
		        	sort:Sort
		        },
		        type: "post"
		    }
		    commonFn(Bcsave,function(data){
		    	layer.msg("保存成功！",{time:1000},function(){ 
			        window.location.reload();
		        });
		    })
	    }
       })
     })
    /********删除资产类型*************/
function delRole(a){
	var id = $(a).attr("data-id");
	layer.confirm('是否删除?',{icon: 3, title:'提示'},function(){
		var DeleteAssetType={
    		url: "/Assets/DeleteAssetType?id="+id,
            type: "get"
    	}
    	commonFn(DeleteAssetType,function(data){
    		layer.msg("删除成功！",{time:1000},function(){
	            $(a).parent().parent().remove();
            });
    	})
	})
};
//下载模板
$('.layer-box').on('click',".link",function () {
    window.location.href = window.siteHost+"Filedown/GetModelTemplate?alias=assets";      
});
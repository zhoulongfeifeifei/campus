var upload = layui.upload,
laydate = layui.laydate,
element = layui.element(),
form =layui.form(),
$ = layui.jquery,
layedit = layui.layedit,
Id = getUrlParam('id'),
classid=getUrlParam('classid'),
assetsTyp=getUrlParam('assetsType'),
addtyp=getUrlParam('addtype'),
assetsNatur=getUrlParam('assetsNature');
var schoolid = getCookieByUserInfo('schoolid');
var GetListAssetsAttribut={
	url:'/Assets/GetListAssetsAttribute',
	data:{schoolId:schoolid},
    type:'get'
}
commonFn(GetListAssetsAttribut,function(data){                   
    var addType , dept , xzlist ,assetsType ;
    addType = data.addTypeList;
    dept = data.deptList;
    xzlist = data.xzList;
    assetsType = data.typeList;
    keeper = data.keeperList;
    for (var o = 0; o < addType.length; o++) {
//      if(addType[o].handlerType.substring(0,1)=="A"){
        $('#addtype').append('<option value="'+addType[o].id+'">'+addType[o].name+'</option>');
        $("#addtype").find("option[value='" + addtyp + "']").attr("selected", 'selected');
		form.render();
//      }
    }
    for (var p = 0; p < dept.length; p++) {
        $('#dept').append('<option value="'+dept[p].class_id+'">'+dept[p].class_name+'</option>');
        $("#dept").find("option[value='" + classid + "']").attr("selected", 'selected');
		form.render();
    }
    for (var q = 0; q < xzlist.length; q++) {                      
        $('#assetsNature').append('<option value="'+xzlist[q].id+'">'+xzlist[q].name+'</option>');
        $("#assetsNature").find("option[value='" + assetsNatur + "']").attr("selected", 'selected');
		form.render();
   }
    for (var r = 0; r < assetsType.length; r++) { $('#assetsType').append('<option value="'+assetsType[r].id+'">'+assetsType[r].typeName+'</option>');
     	$("#assetsType").find("option[value='" + assetsTyp + "']").attr("selected", 'selected');
		form.render();
    }
    for (var i = 0; i < keeper.length; i++) {
        if (KeerperId == keeper[i].user_id) {
            $('input[name="zvbgr"]').val(keeper[i].name)
            $('input[name="zvbgr"]').attr('data-id', keeper[i].user_id)   
        }
    }
    form.render();
    struDeit();
    $('.choice').click(function(){                                             
        layer.open({
            type: 1,
            title: "选择资产保管人",
            closeBtn: 1,
            shadeClose: true,
            skin: 'yourclass',
            area: ['300px', '200px'],
            content: $('#renwu'), //这里content是一个DOM
            btn:['确定'],
            success:function(){
            	$('#renwu ul').empty();
            	for (var i = 0; i < keeper.length; i++) {
            		$('<li><label><input id="'+keeper[i].user_id+'" name = "keep" type="radio"><span>'+keeper[i].name+'</span></label></li>').appendTo('#renwu ul');
            	}
            	$('#renwu').css('margin-top','10px')
            	$('#renwu li').css({'margin':'2% 4%','width' : '40%','display':'inline-block'})
            },
            yes:function(index, layero){
                var dataid = $('#renwu').find('input:checked').attr('id');                                				$('input[name="zvbgr"]').val($('#renwu').find('input:checked').next().html())
                $('input[name="zvbgr"]').attr('data-id',dataid) 
                layer.close(index);
            }
        })
    })
});
 
if (Id==null) {

}else{
$(".layui-this").text("编辑资产");
element.init();
var KeerperId ;
var AssPhoto ;
//资产进行编辑
var GetModelAssets={
	url:'/Assets/GetModelAssets',
    data:{ id :Id },
    type:'get'
}
commonFn(GetModelAssets,function(data){                        
    $('input[name="zcbh"]').val(data.assCode);
    $('#assetsType').val(data.typeCode);
    $('input[name="zjlv"]').val(data.depreRate);
    $('input[name="zcname"]').val(data.assName);
    $('#dept').val(data.deptCode)
    $('input[name="zjnx"]').val(data.depreYear);
    $('input[name="ljzj"]').val(data.accumDepre);
    $('input[name="moonzj"]').val(data.depreMonth);
    $('input[name="zj"][value='+data.depre+']').attr('checked','checked');
    $('#BeginTime').val(solveTime(data.receiveDate));
    $('input[name="zvbgr"]').val(data.keeperName);
    $('input[name="zvbgr"]').attr('data-id',data.keeper);
    KeerperId=data.keeper;
    $('input[name="assetsyz"]').val(data.assOriginal);
    $('#assetsNature').val(data.xinZhi);
    $('#addtype').val(data.addType);
    AssPhoto =data.assPhoto;
    $('#Notes').text(data.notes);
    $('#zichanzhaopian').attr('src',data.assPhoto)
        struDeit();
        form.render();  
   layer.closeAll('loading')
})

}  
//上传图片
upload({
    url: window.apiUrl+'Common/UploadFile',
    async : false,
    ext: 'jpg|png|gif' ,//那么，就只会支持这三种格式的上传。注意是用|分割。
    type:'post',
    success: function(res){
        if (res.status) {
            AssPhoto = res.data;
            layer.msg("图片上传成功");
            $('#zichanzhaopian').attr('src',AssPhoto);

        }else{
            layer.msg("图片上传失败",{
                shift:6 ,
                time : 1000
            })
        }
        
    }
}); 
//进行编辑之后的保存
$('#Sava').click(function() {
    var model = {};
    model.AssCode  = $('input[name="zcbh"]').val();
    model.AssName  = $('input[name="zcname"]').val();
    model.TypeCode    = $('#assetsType').val();
    model.DeptCode  = $('#dept').val();
    model.XinZhi  = $('#assetsNature').val();
    model.AddType = $('#addtype').val();
    // 资产原值 
    model.AssOriginal  = $('input[name="assetsyz"]').val();
    model.DepreRate  = $('input[name="zjlv"]').val();
    model.DepreYear  = $('input[name="zjnx"]').val();
    model.AccumDepre  = $('input[name="ljzj"]').val();
    model.DepreMonth  = $('input[name="moonzj"]').val();
    model.Depre  = $('input[name="zj"]:checked').val();

    // 领用时间
    model.ReceiveDate  = $('input[name="BeginTime"]').val();
    // model.Keeper  = ($('input[name="zvbgr"]').attr('data-id')).split(',');
    model.Keeper  = ($('input[name="zvbgr"]').attr('data-id'));

    model.AssPhoto  = AssPhoto;
    model.Notes = $('#Notes').val();
    var $url = '/Assets/AddAssets' ,
    $ok = "添加";
    if (Id) {
        $ok = "编辑";
        model.Id = Id;
        $url = '/Assets/UpdateAssets';   
    }
    if(!model.AssCode){
    	layer.msg('请先填写资产编号');
    }else if(!model.AssName){
    	layer.msg('请先填写资产名称');
    }else if(!model.TypeCode){
    	layer.msg('请先选择资产类别');
    }else if(!model.DeptCode){
    	layer.msg('请先选择所属班级')
    }else if(!model.XinZhi){
    	layer.msg('请先选择资产性质');
    }else if(!model.ReceiveDate){
    	layer.msg('请先选择领用时间')
    }else if(!model.Keeper){
    	layer.msg('请先选择保管人')
    }else{
	    var Auassets={
	    	url:$url,
	    	data:model,
	    	type:'post'
	    }
	    commonFn(Auassets,function(data){
	    	layer.msg($ok+"成功",{
	            shift : 5 ,
	            time : 1000
	        },function(){
	            location.href="AssetsInfo.html"
	        })
	    });
	}
}); 

function struDeit(){
    layedit.build('Notes',{
        tool: [
            'face' //表情
            ,'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'link' //超链接
            ,'unlink' //清除链接
        ]
    }); //建立编辑器
}


function clearKeeper(){
    $('input[name="zvbgr"]').val("");
    $('input[name="zvbgr"]').removeAttr("data-id")
}

function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return (r[2]); return null; //返回参数值
} 
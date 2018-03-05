  /**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 16:47:18
 * @version $Id$
 */

var AdUrl,
Id = getUrlParam('id');
if (Id==null) {
    $('.toptitle').text('添加广告')
    element.init();
}else{
    $('.toptitle').text('编辑广告');
    element.init();
    var index = layer.load();
	var GetAdbanner = {
		url: "Portal/GetAdbanner",
		data: {
			id:Id,
			schoolid:window.schoolid
		},
		type: "get"
	};
	commonFn(GetAdbanner, function(data) {
        layer.close(index);
        $('input[name="adname"]').val(data.title);
        $('#adimg').attr('src',data.adUrl);
        $('input[name="linkurl"]').val(data.linkUrl);
        // 领用时间
        $('#SortId').val(data.sortId);
        $('#Notes').val(data.adRemark);
        form.render();
    })
}
upload({
    url: window.apiUrl+'Common/UploadFile',
    ext: 'jpg|png|gif' ,//那么，就只会支持这三种格式的上传。注意是用|分割。
    success: function(res){
        if (res.status==1) {
            AdUrl = res.data[0];
            layer.msg("图片上传成功",{
                shift:6 ,
                time : 1000
            },function(){
                $('#adimg').attr('src',AdUrl);
            })
        }else{
            layer.msg("图片上传失败",{
                shift:6 ,
                time : 1000
            })
        }   
    }
}); 




var indexDit = layedit.build('Notes',{
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
var areacon
var active ={
    content :function(){
        areacon = layedit.getContent(indexDit);
    }
}

$('input[name=linkurl]').blur(function(event) {
    if ($.trim($('input[name=linkurl]').val()).length > 0) {
        $('input[name=linkurl]').attr('lay-verify' , 'url');
    }else{
        $('input[name=linkurl]').removeAttr('lay-verify')
    }
});

form.on('submit(Sava)',function() {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
    if (Id ==null) {
        // 保存
        var index2 = layer.load();
		var AddAdbanner = {
			url: "Portal/AddAdbanner",
			data: {
				Title: $('input[name="adname"]').val(),
			    AdUrl : $('#adimg').attr('src'),
			    LinkUrl  : $('input[name="linkurl"]').val(),
			    SortId  : $('#SortId').val(),
			    AdRemark : areacon,
			    schoolid : window.schoolid
			},
			type: "post"
		};
		commonFn(AddAdbanner, function(data) {
            layer.close(index2); 
            layer.msg("添加成功",{
                shift : 5 ,
                time : 1000
            },function(){
                location.href="adList.html?id="+window.localStorage.getItem("menuid");
                layer.close(index2); 
            }) 
        })
    }else{
        // 编辑
        var index3 = layer.load();
		var UpdateAdbanner = {
			url: "Portal/UpdateAdbanner",
			data: {
				Id : Id,
				Title: $('input[name="adname"]').val(),
			    AdUrl : $('#adimg').attr('src'),
			    LinkUrl  : $('input[name="linkurl"]').val(),
			    SortId  : $('#SortId').val(),
			    AdRemark : areacon,
			    schoolid : window.schoolid
			},
			type: "post"
		};
		commonFn(UpdateAdbanner, function(data) {
            layer.msg("编辑成功",{
                shift : 5 ,
                time : 1000
            },function(){
            	layer.close(index3); 
                location.href="adList.html?id="+window.localStorage.getItem("menuid");
            })

        })
    }       
});

$('#cancel').click(function(event) {
    layer.confirm("确定要取消吗?" , {icon : 3 ,title:"提示"} ,function(){
        location.href="adList.html?id="+window.localStorage.getItem("menuid");
    })
});



/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 17:21:03
 * @version $Id$
 */
Id = getUrlParam('id'),
AdUrl='';
if (Id==null) {
    $('.toptitle').text('添加链接');
    element.init();
}else{
    $('.toptitle').text('编辑链接');
    element.init();
    var GetLinks ={url:"Portal/GetLinks",data:{id:Id,schoolid:window.schoolid},type:"get"};
	commonFn(GetLinks,function(data){
        $('input[name="Title"]').val(data.title);
        $('#adimg').attr('src',data.imgUrl);
        $('input[name="WebUrl"]').val(data.webUrl);
        $("select[name='Type']").find("option[value='"+data.type+"']").attr("selected","selected");
        form.render();
        AdUrl=data.imgUrl;
    })
}

$('input[name=WebUrl]').blur(function(event) {
    if ($.trim($('input[name=WebUrl]').val()).length > 0) {
        $('input[name=WebUrl]').attr('lay-verify' , 'url');
    }else{
        $('input[name=WebUrl]').removeAttr('lay-verify')
    }
});
layui.upload({
    url: window.apiUrl+'Common/UploadFile',
    title: '上传图片',
    ext: 'jpg|png|gif' ,//那么，就只会支持这三种格式的上传。注意是用|分割。
    success: function(res){
        if (res.status==1) {
            AdUrl = res.data[0];
            layer.msg("图片上传成功",{
                time : 1000
            },function(){
                $('#adimg').attr('src',AdUrl);
            })
        }else{
            layer.msg("图片上传失败")
        }
        
    }
}); 
$("#tolist").on("click",function(){
    location.href="LinkLists.html?id="+window.localStorage.getItem("menuid");
})
form.on('submit(Sava)',function(data){
    if(Id==null){//保存
    	var AddLink ={url:"Portal/AddLink",data:{
    		title:$('input[name="Title"]').val(), 
    		webUrl:$('input[name="WebUrl"]').val(), 
    		type:$('select[name="Type"]').val(), 
    		imgUrl:$('#adimg').attr('src'), 
    		schoolid:window.schoolid 
    	},type:"post"};
		commonFn(AddLink,function(data){
			layer.msg("添加成功",{time:1000},function(){
				location.href="linkLists.html?id="+window.localStorage.getItem("menuid");
			})
        })
    }else{//编辑
        var UpdateLink ={url:"Portal/UpdateLink",data:{
        	id:Id, 
        	title:$('input[name="Title"]').val(), 
    		webUrl:$('input[name="WebUrl"]').val(), 
    		type:$('select[name="Type"]').val(), 
    		imgUrl:AdUrl, 
    		schoolid:window.schoolid 
        },type:"post"};
		commonFn(UpdateLink,function(data){
			layer.msg("添加成功",{time:1000},function(){
            	location.href="LinkLists.html?id="+window.localStorage.getItem("menuid");
            })
        })
    }
})



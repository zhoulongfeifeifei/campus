   var SCHOOLID=getCookieByUserInfo("schoolid"); 
    /*****************获取父级栏目列表**********************/
        if(window.location.href.indexOf("?")>-1){
            var num = window.location.href.split("?")[1];
            var nums = num.split("=")[1];
            $("#Id").val(nums);
            $(".toptitle").html("添加子级栏目");
            var cao=layer.load();
            var GetCatalog = {
					url: "Portal/GetCatalog",
					data:{id: nums,schoolid:SCHOOLID},
					type: "get"
					};
			commonFn(GetCatalog, function(data) {
                    layer.close(cao);
                    var data = data.catalog;
                    $("#Parentid").attr("data-id",data.id).val(data.title);
                    $("#ParentId").val(data.id);
            })
        }
        //获取模块名列表
        var GetListChannels = {
					url: "Portal/GetListChannels",
					data:{schoolid: SCHOOLID},
					type: "get"
					};
		commonFn(GetListChannels, function(data) {
             $("#Channel").empty();
            $.each(data,function(i,n){
                $("#Channel").append('<option value="'+n.id+'">'+n.channelName+'</option>');
            })
            form.render('select');
        })
                ///保存
        
        $('#save').on('click',function(){
    	if($('#Title').val()){
	        $("input[type='checkbox']:checked").val(1);
	        var bb = formSerialize($("#form0"));
	        bb.schoolid=SCHOOLID;
	        var cao3=layer.load();
	        var UpdateCatalog = {
					url: "Portal/AddCatalog",
					data:bb,
					type: "post"
					};
			commonFn(UpdateCatalog,function(data) {
	            layer.msg("保存成功", { time: 1000 }, function() {
					window.location.href="Column.html?id="+window.localStorage.getItem("menuid");
				});
	                
	        })
		}else{
            layer.msg("栏目名称不能为空！");
        }
    })
      
upload({
   url: window.apiUrl+'Common/UploadFile',
    title :'上传图片' ,
    async : false, 
    elem : '.local',
    success: function(res){
        if (res.status ==1) {
            $("#yulan").attr("src",res.data[0]).show();
            $("#ImgUrl").val(res.data[0]);
        }else{
            layer.msg("文件上传失败")
        }
    }
});        


//限制多行输入框字数
$("#Descript").keyup(function(){
    var len = $(this).val().length;
     if(len > 499){
        $(this).val($(this).val().substring(0,500));
       }
})
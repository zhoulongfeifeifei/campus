/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 18:59:49
 * @version $Id$
 */
var SCHOOLID=getCookieByUserInfo("schoolid");
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
/*****************获取栏目信息**********************/
var num = window.location.href.split("?")[1];
var nums = num.split("=")[1];
$('input[name="id"]').val(nums);
var GetCatalog = {
		url: "Portal/GetCatalog",
		data:{id: nums,schoolid:SCHOOLID},
		type: "get"
		};
commonFn(GetCatalog, function(data) {
	
            var parents = data.parentses;
            var data = data.catalog;
            for(key in data) {
                $("form").find("input[name='"+key+"']").val(data[key]);
            }
            $("#ShowType option[value="+data.showType+"]").attr("selected","selected").siblings().attr("selected",false);
            $("#Channel option[value="+data.channel+"]").attr("selected","selected").siblings().attr("selected",false);
            $("#yulan").attr("src",data.imgUrl).show();
            $("#Imgurl").val(data.imgUrl);
            $("#ImgUrl").val(data.imgUrl);
            check(data.isInner,$("#IsInner"));
            check(data.isNew,$("#IsNew"));
            check(data.showOnHomepage,$("#ShowOnHomepage"));
            check(data.showOnNav,$("#ShowOnNav"));
            check(data.isTop,$("#IsTop"));
            check(data.isNotify,$("#IsNotify"));
            form.render();
            if(data.parentId>0){
            	$("#ParentId").empty();
                $.each(parents,function(i,n){
                    $("#ParentId").append('<option value="'+n.id+'">'+n.title+'</option>');
                })
                $("#ParentId option[value="+data.parentId+"]").attr("selected","selected").siblings().attr("selected",false);
            }
            form.render('select')
        
    })
    
    function check(a,b){
        
        if(a==1){
            b.attr("checked","checked");
            b.val(1);
        }else{
            b.checked=false;
        }
    }
    
    ///保存
    $('#save').on('click',function(){
    	if($('#Title').val()){
	        $("input[type='checkbox']:checked").val(1);
	        var bb = formSerialize($("#form0"));
	        bb.schoolid=SCHOOLID;
	        var cao3=layer.load();
	        var UpdateCatalog = {
					url: "Portal/UpdateCatalog",
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
    
    
    /**********自定义图标********************/
var icourl;
layui.upload({
	url: window.apiUrl+'Common/UploadFile',
	async: false,
	title: '上传图片',
	elem: '.Albums',
	ext: 'jpg|png|gif', //那么，就只会支持这三种格式的上传。注意是用|分割。
	success: function(res) {
		if(res.status==1) {
			layer.msg("图片上传成功", {
				shift: 6,
				time: 1000
			}, function() {
				icourl=res.data[0];
                $("#yulan").attr("src",icourl).show();
                $("#Imgurl").val(icourl);
                $("#ImgUrl").val(icourl);
			})
		} else {
			layer.msg("图片上传失败", {
				shift: 6,
				time: 1000
			})
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
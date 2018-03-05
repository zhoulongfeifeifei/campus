var userId=getCookieByUserInfo('userid');
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var Id = getUrlParam('Id'),
    layer = layui.layer;
    var userIds=getUrlParam('userIds');   
getphotolist(Id);   
if(userId!=userIds){
	$('.uploadAlbum').hide();
	$('.removeAlbum').hide();
}else{
	$('.uploadAlbum').show();
	$('.removeAlbum').show();
}
//选择图片进行填充
function getphotolist(id){
	$('.album_c').empty();
	var GetPhotosList={
		url: '/Album/GetPhotosList',
		async: false,
		data: {albumId:id},
		type:'get'
	};
	commonFn(GetPhotosList,function(data){
		var alid = data.albumId;
		for (var i = 0; i < data.resultData.length; i++) {
            var photourl;
            if (data.resultData[i].photoUrl == "请选择图片") {
                photourl = "../img/touxiang.png";
            } else {
                photourl = data.resultData[i].photoUrl;
            }
            $('<li data-pootoid=' + data.resultData[i].id + '><a class="phonePIC" target="_self"><img class="PIC" src="' + photourl + '" alt=""><input class="upname" name ="' + data.resultData[i].id + '" type="text" value="' + data.resultData[i].photoName + '"/><img src="../../Common/img/removeAlbum.png" class="removeimg" alt=""><p class="Comment"><i class="iconfontyyy hand_success hand">&#xe7a8;</i><span class="zan" style="width:5%;color:#8c8262;margin-right:2%"></span><i class="iconfontyyy newing">&#xe61b;</i></p><font class="infome"></font><p class="commenting"><img src="img/touxiang.png"/><input class="saying" placeholder="写点什么吧~" type="text"/><span class="submits">发表</span></p></a></li>').appendTo('.album_c')
        };
        $('.top_img img').attr('src', data.photoUrl);
        $('.album_top >p ').text(data.albumName);
        $('.removeimg').click(function(event) {
            var id = $(this).parent().parent().attr('data-pootoid');
            var dom = $(this).parent().parent();
            	layer.confirm('确定删除该照片?', { icon: 3, title: '提示' }, function(index) {
					var DeletePhotos={
						url: "/Album/DeletePhotos?id="+id+"&albumId="+alid+"",
						type:'delete'
					}
					commonFn(DeletePhotos,function(data){
						 layer.msg('删除成功');
	                     dom.remove();
	                     layer.close(index);
					});                
            	});           
        });
        //显示大图
	    $('.PIC').click(function(){
	        var id = $(this).parent().parent().attr("data-pootoid");
	       layer.open({
	            type: 2,
	            title: false,
	            offset: '5%',
	            area: ['80%', '90%'],
	            closeBtn: 1,
	            shadeClose: true,
	            skin: 'yourclass',
	            content: 'AlbumbagPic.html?id='+id +'',
	        });
	    });
	    //点击评论
    $('.phonePIC').on('mouseover ',function(){
        $(this).children('.Comment').show();
    })
    $('.album_c li').on('mouseout',function(){
        $('.Comment').hide();
    })
    $('.newing').click(function(){
        if($(this).parents('a').children('.infome').css("display")=='none'){
            $(this).parents('a').children('.infome').css('display','block');
            $(this).parents('a').children('.commenting').css('display','block');
        
        }else{
            $(this).parents('a').children('.infome').css('display','none');
            $(this).parents('a').children('.commenting').css('display','none');
        }
    })
    $('.submits').click(function(){
        	var id=$(this).parent().parent().parent().attr('data-pootoid');
        	var comment=$('.saying').val();
        	if(comment==''){
        		layer.msg('请说点什么吧');
        	}else{
        		var AddComment={
        			url:'/Album/AddComment',
        			data:{
        				id:id,
        				photoId:id,
        				Comment:comment,
        				userId:userId
        			},
        			type:'post'
        		}
        		commonFn(AddComment,function(data){
        			 
		            layer.msg('评论发表成功');
		            $('.saying').val('');
        		})
        	}
        	$(this).parents('a').children('.infome').css('display','none');
		    $(this).parents('a').children('.commenting').css('display','none');
             
    });
    //点赞功能
    $('.hand').click(function(){
        if($(this).hasClass('hand_success')){
            $(this).css('color','red');
            
             $(this).removeClass('hand_success');
             $(this).siblings('.zan').html('1');
        }else{
            $(this).css('color','#fff');
            $(this).addClass('hand_success');
            $(this).siblings('.zan').html('');
        }
    })
    //设置相册的封面
     $('.top_img img').click(function(){
        layer.open({
            type: 2,
            title: false,
            offset: '5%',
            area: ['80%', '90%'],
            closeBtn: 1,
            shadeClose: true,
            skin: 'yourclass',
            content: 'Albumcover.html?id='+Id+'',
        });
     })
        
	});
}
var name;
var id;
$('.upname').on('focus', function() {
    name = $(this).val()
    id = $(this).attr('name');
})
var oname;
$('.upname').on('blur', function() {
    oname = $(this).val();
    if (name == oname) {
    } else {
    	var UpdatePhotoName={
    		 url: '/Album/UpdatePhotoName',
            data: { id: id, photoName: oname },
            type:'get'
    	}
    	commonFn(UpdatePhotoName,function(data){
    		layer.msg(data.message);
    	})
    }

})
//删除照片
$('.removeAlbum').click(function(event) {
		if ($('.removeAlbum').text() == "删除照片") {
        $('.album_c .removeimg').addClass('block');
        $('.removeAlbum').text('退出');
	    } else if ($('.removeAlbum').text() == "退出") {
	        $('.album_c .removeimg').removeClass('block');
	        $('.removeAlbum').text('删除照片');
	    }
});

//图片上传
layui.upload({
    url: window.apiUrl+'Common/UploadFile',
    title: '选择图片',
    async: false,
    type:'post',
    success: function(res) {
        if (res.status == 1) {
         
            $('.previewimg').append('<img src="' + res.data + '">');

        } else {
            layer.msg("文件上传失败", {
                shift: 6,
                time: 1000
            })
        }

    }
});

//选择照片进行上传
$('.uploadAlbum').click(function(event) {
		$('#ssi-previewBox table').remove();
	    $('#ssi-uploadBtn').remove();
	    $('#ssi-clearBtn').remove();
	    var photoname;
	    layer.open({
        type: 1,
        btn: ["确定"],
        area: ['650px', '460px'],
        content: $('#uploadAlbum'), //这里content是一个DOM
        btn1: function(index, layor) {
            var fileurl = Array();
            $('.previewimg img').each(function(index, el) {
                fileurl.push($(el).attr('src'));
            });
            if (fileurl.length < 1) {
                layer.msg('请选择照片');
            } else {
                a = fileurl.join(',');
                var AddAlbumPhotos={
                	url: '/Album/AddAlbumPhotos',
                    data: { photoUrl: a, albumId: Id },
                    type:'post'
                }
                commonFn(AddAlbumPhotos,function(res){
                            layer.msg('上传成功', {
                                time: 1000
                            }, function() {
                                getphotolist(Id);
                                $('.previewimg').html('');
                            })                        
                })
                layer.closeAll();
            }
        }
    });  
});
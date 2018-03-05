var userId=getCookieByUserInfo('userid');
var layer =layui.layer,
$ = layui.jquery,
upload = layui.upload;
albumlist();
function albumlist(){
	$('.album_c').empty();
	var GetAlbumList={
		url:'/Album/GetAlbumList',
		type:'get'
	}
	commonFn(GetAlbumList,function(data){
		for (var i = 0; i < data.resultData.length; i++) {
            var url;
            url = data.resultData[i].photoUrl ==null ? "../img/7.png" :data.resultData[i].photoUrl;
            $('<li id='+data.resultData[i].id+' userId='+data.resultData[i].userId+'><a href="AlbumDetail.html?Id='+data.resultData[i].id+'&userIds='+data.resultData[i].userId+'" target="_self"><img src="'+url+'" alt=""><p>'+data.resultData[i].albumName+'</p></a><img src="../../Common/img/removeAlbum.png" class="removeimg" alt=""></li>').appendTo('.album_c');
            if(data.resultData[i].userId==userId){
            	$('select[name="sAlbumName"]').append('<option value="'+data.resultData[i].id+'">'+data.resultData[i].albumName+'</option>');
            }           
       };
       layui.form().render();
       //删除相册
       $('.removeimg').click(function(event) {
            var id = $(this).parent().attr('id');
            var userIds=$(this).parent().attr('userId');
            if(userId!=userIds){
            	layer.msg('您无权对该相册进行删除');
            }else{
            	var dom = $(this).parent();
	            layer.confirm('确定删除该照片?', { icon: 3, title: '提示' }, function(index) {
					var DeleteAlbum={
						url: "Album/DeleteAlbum?id="+id+"",
						type:'get'
					}
					commonFn(DeleteAlbum,function(data){
						 layer.msg('删除成功');
	                     dom.remove();                    
	                     layer.close(index);                    
					});               
	            });
            }            
        });
       //新建相册
$('.addAlbum').click(function(event) {		 
    layer.open({
        type: 1,
        closeBtn :1,
        btn:["确定"],
        area :['350px','260px'],
        content: $('#addAlbum'), //这里content是一个DOM
        yes:function(index ,layor){
        	 var albumPermissions=$('#AlbumPow').val();
            var name =$('input[name="AlbumName"]').val();
            var nameAdd=0;
            $(data.resultData).each(function(m,n){
            	if(n.albumName==name){
            		nameAdd=1;           		 
            	}
            })
            if(nameAdd==1){
            	layer.msg('此名字已经存在');
            }else if(!name){
            	layer.msg('请创建名字')
            }else{
            	addAlbum(name,albumPermissions);           	 
            	layer.close(index);
            }
             
        }
    });
});
	})
}
//增加图片文件
function addAlbum(name,albumPermissions){
	var AddAlbum={
		url:'/Album/AddAlbum',
		data:{
			userId:userId,
			albumName : name,
			albumPermissions:albumPermissions
		},
		type:'post'
	}
	commonFn(AddAlbum,function(data){
		albumlist();
		layer.msg('创建成功')
		layui.form().render();
	});
}

 

//上传图片
upload({
    url:window.apiUrl+'Common/UploadFile',
    title :'选择图片',
    async : false,
    type:'post',
    success: function(res){
        if (res.status==1) {
               layer.msg("文件上传成功",{
                   shift:6 ,
                   time : 1000
               },function(){
                $('.previewimg').append('<img src="'+res.data+'">');
               })
        }else{
            layer.msg("文件上传失败",{
                shift:6 ,
                time : 1000
            })
        }  
    }
}); 
//删除照片
$('.removeAlbum').click(function(event) {
    if ($('.removeAlbum').text() == "删除相册") {
        $('.album_c .removeimg').addClass('block');
        $('.removeAlbum').text('退出');
    } else if ($('.removeAlbum').text() == "退出") {
        $('.album_c .removeimg').removeClass('block');
        $('.removeAlbum').text('删除相册');
    }
});
//上传照片
$('.uploadAlbum').click(function() {
    $('#ssi-previewBox table').remove();
    $('#ssi-uploadBtn').remove();
    $('#ssi-clearBtn').remove();
    layer.open({
        type: 1,
        btn:["确定" ,"取消"],
        area :['650px','460px'],
        content: $('#uploadAlbum'), //这里content是一个DOM
        yes:function(index ,layor){
            
            var fileurl =Array();

            $('.previewimg img').each(function(index, el) {
                fileurl.push($(el).attr('src')); 
            });
            
            if (fileurl.length < 1 ) {
                layer.msg('请选择照片');
            } else{
                a = fileurl.join(',');
                var id =$('#uploadAlbum select[name="sAlbumName"]').val();
                
                if (id=="") {
                    id = 8;
                }
                var AddAlbumPhotos={
                	url:'/Album/AddAlbumPhotos',
                    data:{photoUrl :a,albumId : id},
                    type:'post'
                }
                commonFn(AddAlbumPhotos,function(data){
                	 layer.msg('上传成功',{
                        time: 1200
                    },function(){
                        layer.close(index);    
                    })
                })
            }  
        },
        btn2:function(index){
            layer.close(index);
        }
    });
});

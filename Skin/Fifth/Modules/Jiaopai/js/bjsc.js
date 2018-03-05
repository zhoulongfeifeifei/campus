var img = '';
var IMG = '';
//上传图片

layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val('上传成功');

    }
  });
});
$('#bt').blur(function(){
	$('#tian').css('display','none');
})
$('#save').click(function(){
	if($('#bt').val() == ''){
        $('#tian').css('display','block');
        return
	}else if(c != ''){
        var model = {}
	    model.id = 0;
	    model.schoolId = window.schoolid;
	    model.name = $('#bt').val();
	    model.type = c;
	    model.img = img;
	    model.insertType = 1;
	    // console.log(1)
	    // console.log(model.schoolId)
		var Update_KnowledgeType = {
		        url: "XAWebBanpai/Update_KnowledgeType",
		        type: "POST",
		        async: false,
		        data:model
		};
		commonFn(Update_KnowledgeType, function(json) {
		    // console.log(json)	    
		    window.location.href="resource.html" ;
		    window.close();  	      
		});
	}else{
		// console.log(IMG)
		var node = {}	   
		    node.name = $('#bt').val();	    
		    node.img = $('#filelist img').attr('src');
		    node.id = str
		   
		var Update_KnowledgeType = {
		        url: "XAWebBanpai/Update_KnowledgeType",
		        type: "POST",
		        async: false,
		        data:node
		};
		commonFn(Update_KnowledgeType, function(json) {
		    // console.log(json)			       
		    window.location.href="resource.html" ;
		    window.close();  	      
		});
	}
	

	
})

//修改
var a = window.location.search
var c = (a.substring(6))
var str = (a.substring(4))
console.log(str)
if(c == ''){
  // console.log(str)
   // console.log(1)
   var Get_KnowledgeType = {
   	        url: "XAWebBanpai/Get_KnowledgeType",
   	        type: "get",
   	        async: false,
   	        data:{
                   id : str
   	        }
   	};
   commonFn(Get_KnowledgeType, function(json) {
   	console.log(json)
       $('#bt').val(json.name) 
       IMG = json.img
       $('#filelist img').attr('src',IMG);
        
   });
}

 console.log($('#bt').val() )



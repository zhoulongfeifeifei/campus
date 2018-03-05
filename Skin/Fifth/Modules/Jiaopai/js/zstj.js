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
      $('#eboardFrame').contents().find('.text-box img').attr('src',img); 
      $('#eboardFrame').contents().find('.bgPic').attr('src',img);
    }
  });
});
$('#bt').blur(function(){
	$('#tian').css('display','none');
})
console.log(getUrlParam('type'))
$('#save').click(function(){
	if($('#bt').val() == ''){
        $('#tian').css('display','block');
        return
	}else if(getUrlParam('type')){	
	   if(getUrlParam('type') == ''){
	   	  getUrlParam('type') == 0
 	   }	
        var model = {}
	    model.id = 0;
	    model.schoolId = window.schoolid;
	    model.name = $('#bt').val();
	    model.type = getUrlParam('type')
	    model.img = img;
	    model.insertType = 1;
	    // console.log(1)
	    // console.log(model.schoolId)
		var Update_KnowledgeType = {
		        url: "XAWebBanpai/Update_KnowledgeType",
		        type: "POST",
		        data:model
		};
		commonFn(Update_KnowledgeType, function(json) {
		    if(getUrlParam('type') == 0||getUrlParam('type') == 1||getUrlParam('type') ==''){
               window.location.href='XiaKe.html?deviceid='+ getUrlParam('deviceid') +'&type='+ getUrlParam('type') +'&classname='+getUrlParam('classname')+'' ;
		    }else{
		    	window.location.href='ZaoDu.html?deviceid='+ getUrlParam('deviceid') +'' ;
		    }	    
		    
		    window.close();  	      
		});
	}else{
		console.log(getUrlParam('id'))
		var node = {}	   
		    node.name = $('#bt').val();	    
		    node.img = $('#filelist img').attr('src');
		    node.id = getUrlParam('id')
		   
		var Update_KnowledgeType = {
		        url: "XAWebBanpai/Update_KnowledgeType",
		        type: "POST",
		        data:node
		};
		commonFn(Update_KnowledgeType, function(json) {
		    if(getUrlParam('type') == 0||getUrlParam('type') == 1||getUrlParam('type') ==''){
               window.location.href='XiaKe.html?deviceid='+ getUrlParam('deviceid') +'&type='+ getUrlParam('type') +'&classname='+getUrlParam('classname')+'' ;
		    }else{
               window.location.href='ZaoDu.html?deviceid='+ getUrlParam('deviceid') +'' ;
		    }			       
		    window.close();  	      
		});
	}
	

	
})

//修改编辑

// console.log(str)
if(getUrlParam('id')){
   var Get_KnowledgeType = {
   	        url: "XAWebBanpai/Get_KnowledgeType",
   	        type: "get",
   	        data:{
                   id : getUrlParam('id')
   	        }
   	};
   commonFn(Get_KnowledgeType, function(json) {
   	// console.log(1)
       $('#bt').val(json.name) 
       IMG = json.img
       $('#filelist img').attr('src',IMG);
        
   });
}
$('#cancel').click(function(){
	history.go(-1)
})
console.log(getUrlParam('type'))
if(getUrlParam('type') == 0 ||getUrlParam('type') ==1||getUrlParam('type') ==''){
	$('.muban-wrap').html('<iframe id="eboardFrame" src="xklb.html?id='+ getUrlParam('id') +'&classname='+getUrlParam('classname')+'"></iframe>')
}else{
	$('.muban-wrap').html('<iframe id="eboardFrame" src="lunbo.html?id='+ getUrlParam('id') +'&classname='+getUrlParam('classname')+'"></iframe>')
}


//所见即所得
// console.log($('#bt').val())
setTimeout(function(){
  var x = $('#bt').val();
  var q = $('#detail').val();
  var y = $('#qm').val();
  var p = $('#filelist img').attr('src');
  $('#eboardFrame').contents().find('.text-box img').attr('src',p);
  $('#eboardFrame').contents().find('.text-box h3').html(x);
  $('#eboardFrame').contents().find('.text-box span').html(q);
  $('#eboardFrame').contents().find('.text-box p').html(y);
  $('#eboardFrame').contents().find('.word h1').html(x);
  $('#eboardFrame').contents().find('.word p').html(q);
  $('#eboardFrame').contents().find('.bgPic').attr('src',p);
  $('#eboardFrame').contents().find('.everyMain').html(q);

},50)
$('#bt').keyup(function () {
    var title = $(this).val();
    $('#eboardFrame').contents().find('.text-box h3').html(title); 
    $('#eboardFrame').contents().find('.word h1').html(title)   
});
$('#detail').keyup(function () {
    var title = $(this).val();
    $('#eboardFrame').contents().find('.text-box span').html(title);  
    $('#eboardFrame').contents().find('.word p').html(title) 
});
$('#qm').keyup(function () {
    var title = $(this).val();
    $('#eboardFrame').contents().find('.text-box p').html(title);    
});
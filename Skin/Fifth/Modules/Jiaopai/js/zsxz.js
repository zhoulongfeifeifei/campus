$('.label').html(decodeURI(getUrlParam('name')))
//上传图片
var img ='';
var IMG ='';
layui.use('upload', function(){
  layui.upload({
    url: '/api/Common/UploadFile' //上传接口
    ,success: function(res){ //上传成功后的回调
      // console.log(res);
      img = res.data
      $('#filelist img').attr('src',img);
      $('#filename').val('上传成功');
      $('.ts').css('display','none');
      $('#eboardFrame').contents().find('.text-box img').attr('src',img); 
      $('#eboardFrame').contents().find('.bgPic').attr('src',img);
    }
  });
});
$('#detail').blur(function(){
	$('#tian').css('display','none');
})
	
$('#save').click(function(){
	if($('#bt').val() == ''){
     $('#tsxi').html('请输入标题');
     $('#tsxi').css('display','block');
     setTimeout(function(){
       $('#tsxi').css('display','none');
     },1000);
     return
  }
	if($('#filelist img').attr('src') == ''){
		// console.log(222)
        $('.ts').css('display','block');
        return
    }else if($('#detail').val() == ''){
        $('#tian').css('display','block');
        return
    }
    if(getUrlParam('img') != 0){
        var model = {}
    	    model.title = $('#bt').val();
    	    model.typeid = getUrlParam('typeId')
    	    model.detail = $('#detail').val();
    	    model.type = getUrlParam('type');
    	    model.img = img;
    	    model.signName = $('#qm').val();
    	    // console.log(1)
    	    // console.log(model.schoolId)
    		var Update_Knowledge = {
    		        url: "XAWebBanpai/Update_Knowledge",
    		        type: "POST",
                async: false,
    		        data:model
    		};
    		commonFn(Update_Knowledge, function(json) {
    		    	
    		  if(getUrlParam('type') == 0 || getUrlParam('type') == 1){
                      window.location.href="xkbg.html?id=" + getUrlParam('id') +"&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
                     }else{
                       window.location.href="zslb.html?id=" + getUrlParam('id') +"&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
                               
                     }      
    		});
    }else{
          
    	    var model = {}
    		    model.title = $('#bt').val();
    		    model.typeid = getUrlParam('typeId');
    		    model.detail = $('#detail').val();
    		    model.type = getUrlParam('type');
    		    model.img = $('#filelist img').attr('src');
    		    model.signName = $('#qm').val();
    		    model.id = getUrlParam('num')   		  
    			var Update_Knowledge = {
    			        url: "XAWebBanpai/Update_Knowledge",
    			        type: "POST",
                  async: false,
    			        data:model
    			};
    			commonFn(Update_Knowledge, function(json) {
            if(getUrlParam('type') == 0 || getUrlParam('type') == 1){
                window.location.href="xkbg.html?id=" + getUrlParam('id') +"&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
            }else{
              window.location.href="zslb.html?id=" + getUrlParam('id') +"&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
                      
            }
    			       			       
    			  
    			});
    }
    
});
 // console.log(getUrlParam('type'))
//修改编辑
if(getUrlParam('img') == 0){
  // console.log(str)
   // console.log(1)
   var Get_Knowledge = {
   	        url: "XAWebBanpai/Get_Knowledge",
   	        type: "get",
            async: false,
   	        data:{
                   id : getUrlParam('num')
   	        }
   	};
   commonFn(Get_Knowledge, function(json) {
   	   // console.log(json)
       $('#bt').val(json.title) ;
       IMG = json.img;
       $('#filelist img').attr('src',IMG);
       $('#qm').val(json.signName);
       $('#detail').val(json.detail)
       
   });
}
  $('.muban-wrap').html('<iframe id="eboardFrame" src="xklb.html?id='+ getUrlParam('id') +'&idm='+getUrlParam('idm')+'&classname='+getUrlParam('classname')+'"></iframe>')

//所见即所得

// setTimeout(function(){
//   var x = $('#bt').val();
//   var q = $('#detail').val();
//   var y = $('#qm').val();
//   var p = $('#filelist img').attr('src');
//   $('#eboardFrame').contents().find('.text-box img').attr('src',p);
//   $('#eboardFrame').contents().find('.text-box h3').html(x);
//   $('#eboardFrame').contents().find('.text-box span').html(q);
//   $('#eboardFrame').contents().find('.text-box p').html(y);
//   $('#eboardFrame').contents().find('.word h1').html(x);
//   $('#eboardFrame').contents().find('.word p').html(q);
//   $('#eboardFrame').contents().find('.bgPic').attr('src',p);
//   $('#eboardFrame').contents().find('.everyMain').html(q);

// },50)
if(getUrlParam('type')==0)
{
  $('#bt').keyup(function () {
    var title = $(this).val();
    $('#eboardFrame').contents().find('.word h1').html(title);   
});
  $('#detail').keyup(function () {
    var detail = $(this).val();
     $('#eboardFrame').contents().find('.word p').html(detail)    
});
}
else
{
  $('#detail').keyup(function () {
    var detail = $(this).val();
     $('#eboardFrame').contents().find('.everyMain').html(detail)    
});
}



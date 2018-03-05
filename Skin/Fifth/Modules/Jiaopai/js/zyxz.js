$('.label').html(decodeURI(getUrlParam('name')))
console.log(getUrlParam('type'))
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
    }
  });
});
$('#detail').blur(function(){
	$('#tian').css('display','none');
})
	
$('#save').click(function(){
	// console.log($('#bt').val())
	// console.log($('#qm').val())
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
    		    	
    		       
    		    window.location.href="bjlb.html?id=" + getUrlParam('id') + "&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
    		    // location.reload();  	      
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
    		    // console.log(1)
    		    // console.log(model.schoolId)
    			var Update_Knowledge = {
    			        url: "XAWebBanpai/Update_Knowledge",
    			        type: "POST",
                  async: false,
    			        data:model
    			};
    			commonFn(Update_Knowledge, function(json) {
    			   
    			       
    			    window.location.href="bjlb.html?id=" + getUrlParam('id') +"&schoolId="+ getUrlParam('schoolid') + "&name=" +getUrlParam('name') + "&typeid=" + getUrlParam('type');
    			    // location.reload();  	      
    			});
    }
    
});
 
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
   	   console.log(json)
       $('#bt').val(json.title) ;
       IMG = json.img;
       $('#filelist img').attr('src',IMG);
       $('#qm').val(json.signName);
       $('#detail').val(json.detail)
   });
}
console.log($('#bt').val())
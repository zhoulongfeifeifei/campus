var num = '';
var GetList_BanTemplate = {
            url: 'XAWebBanpai/GetList_BanTemplate',
            type: "Post"                
    };      
    commonFn(GetList_BanTemplate, function(data) {
           console.log(data)
           var html = '';
           var str = '';
           var res ='';
           $.each(data,function(i,n){
              // console.log(n)
              num = n
              html += '<input type="radio" class="tempid" value="'+ n.templateId +'" checked="checked">'+ n.name +'';             
           }) 
           console.log(num)
           $.each(num.scene,function(name,key){
              	// console.log(key.previewImg)
                  str +='<li><a href="javascript:;"><img src="'+ key.previewImg+'"/></a></li>';
                  res +='<li></li>';                 

            }); 
            
           $('.bottom-check').html(html);
           $('.bd_ul').html(str);
           $('.hd_ul').html(res)
           $(".slideBox").slide({mainCell:".bd .bd_ul",autoPlay:true});
           
    });         
    // console.log(getUrlParam('name'))                         
var a = '<span class="text font-16">'+ decodeURI(getUrlParam('name')) +'</span>'+
        '<span class="text font-16">'+ getUrlParam('sbid') +'</span>'+
        '<a class="btn btn-blue" id="save">保存</a>'
$('.fr').html(a);

//  var ary = location.href.split("&");
// $(".slideBox").slide( { mainCell:".bd ul", effect:ary[1],autoPlay:ary[2],trigger:ary[3],easing:ary[4],delayTime:ary[5],mouseOverStop:ary[6],pnLoop:ary[7] });


$('#save').click(function(){
	var model = {}
	    model.templateId = $('input:radio:checked').val();
	    model.deviceId = getUrlParam('sbid')
	var Update_BanTemplate = {
	            url: 'XAWebBanpai/Update_BanTemplate',
	            type: "POST",
	            data:model

	    };      
	    commonFn(Update_BanTemplate, function(data) {
	        //提示信息 
              
          $('#tsxi').html('模版切换成功');
          $('#tsxi').css('display','block');
          setTimeout(function(){
             $('#tsxi').css('display','none');
              window.location.href='brand.html';
          },600);

	         
	    });
})


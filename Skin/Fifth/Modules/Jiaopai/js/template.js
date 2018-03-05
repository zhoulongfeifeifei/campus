// var scene = ''
var GetList_SceneByDevice = {
          url:"XAWebBanpai/GetList_SceneByDevice",
          type:"GET",
          data:{
            deviceid:getUrlParam('id')
          }
    };
    commonFn(GetList_SceneByDevice,function(json){             
          
        var html = '';
        var color;
        var sty;
        $.each(json,function(i,n){
          if(n.state == 1){
              color="green"; 
              sty = 'background:#FFF;'            
          }else if(n.state == 2){
              color="red";               
              sty = 'background:#333;'
              // console.log(3)            
          }
          // console.log(n)
          // scene = n.sceneId
          if(n.sceneId == 1 || n.sceneId == 14){
            // console.log(1)
              html += '<div class="custom-item">'+
                          '<input type="hidden" value="1">'+
                          '<img class="bg" src="'+ n.previewImg +'">'+
                          '<div class="t">'+ n.name +'</div>'+
                          '<div class="custom-edit">'+                   
                              '<a href="'+geturl(n.sceneId)+'?deviceid='+ getUrlParam('id') +'&name='+ getUrlParam('name') +'&scene='+ n.name +'&sceneId='+ n.sceneId +'">编辑</a>'+    
                          '</div>'+
                      '</div>'
          }else if(n.sceneId == 13 && n.state == 2){
              html += '<div class="custom-item" style="' + sty + '">' +
                  '<input type="hidden" value="1">' +
                  '<img class="bg" src="' + n.previewImg + '">' +
                  '<div class="t">' + n.name + '</div>' +
                  '<div class="custom-edit">' +
                  '<a class="qy ' + color + '" data-id="' + n.sceneId + '" href="javascript:;">' + lqy(n.state) + '</a>' +
                  '</div>' +
                  '</div>'
          }else{
             html += '<div class="custom-item" style="'+ sty +'">'+                       
                        '<input type="hidden" value="1">'+
                        '<img class="bg" src="'+ n.previewImg +'">'+
                        '<div class="t">'+ n.name +'</div>'+
                        '<div class="custom-edit">'+                   
                            '<a href="'+geturl(n.sceneId)+'?deviceid='+ getUrlParam('id') +'&name='+ getUrlParam('name') +'&scene='+ n.name +'&sceneId='+ n.sceneId +'">编辑</a>'+ 
                            '<a class="qy '+color +'" data-id="'+ n.sceneId+'" href="javascript:;">'+ lqy(n.state) +'</a>'+   
                        '</div>'+
                    '</div>'
          }
             // console.log(lqy(n.state))           
        })   
        $('.customList').html(html)       
       
    });
   
var a = '<span class="text font-16">'+ decodeURI(getUrlParam('name')) +'</span>'+
        '<span class="text font-16">'+ getUrlParam('id') +'</span>'
        // console.log(a)
$('.bjsb').html(a)

function geturl(sceneid)
{
  if(sceneid==1) return "PingBao.html";
  else if(sceneid==2) return "ZaoDu.html";
  else if(sceneid==3) return "ShangKe.html";
  else if(sceneid==4) return "XiaKe.html";
  else if(sceneid==6||sceneid==7||sceneid==10||sceneid==12) return "Pic.html";
  else if(sceneid==11) return "JinJi.html";
  else if(sceneid==13) return "BaPing.html";
  else if(sceneid==14) return "XianShi.html";
}
function lqy(state){
  if(state == 1){
     return '已启用'     
  }else if(state == 2){    
     return '已停用'
  }
}
$('.customList').on('click','.qy',function(){
// console.log(1)
 var num='';
   if($(this).html() == '已启用'){
      num = 2;
   }else{
     num = 1;
   }
   var $this=$(this);

      // console.log(scene)
var scene=$(this).attr("data-id");
    var model = {}
        model.deviceId = getUrlParam('id');
        model.sceneId = scene;
        model.newState = num;
    var Update_BanTemplate = {
                            url: 'XAWebBanpai/Update_Scene',
                            type: "POST",
                            data:model
                    };      
                    commonFn(Update_BanTemplate, function(data) {
                           // console.log(2)
                           // 
                           console.log(num)
                           if(num == 1){
                               $($this).html("已启用")
                              $($this).css("color","green");
                              $($this).parents('.custom-item').css('background','#fff')
                           }else{
                              $($this).html("已停用")
                              $($this).css("color","red");
                              $($this).parents('.custom-item').css('background','#333')
                           }
                           
                    });
                    history.go(0);
})
  
     

var tzym = '<a class="a b" href="XiaKe.html?type=0&deviceid='+ getUrlParam('deviceid') +'&sceneId='+  getUrlParam('sceneId') +'&name='+  getUrlParam('name') +'"><i class="fa fa fa-list"></i>课外知识</a>'+
           '<a class="c" href="XiaKe.html?type=1&deviceid='+ getUrlParam('deviceid') +'&sceneId='+  getUrlParam('sceneId') +'&name='+  getUrlParam('name') +'"><i class="fa fa fa-list"></i>每日一练</a>'
  $('.tzym').html(tzym)  
 document.getElementById("kewai").style.display = "";
 document.getElementById("meiri").style.display = "none";

 var typeid = '';
var typeidm='';
 var GetList_KnowledgeType = {
              url: 'XAWebBanpai/GetList_KnowledgeType',
              type: "get",
              async: false,
              data:{
                schoolid:window.schoolid,
                type:0,
                deviceid:getUrlParam('deviceid')               
              }                
      };      
      commonFn(GetList_KnowledgeType, function(data) { 
        if(data.classKnowledgeType != ''){
                 $.each(data.classKnowledgeType,function(i,n){                     
                 if(n.isShow == 1){
                  $("#typeid").val(n.id);
                  typeid=n.id;
                 }         
                     
                 })
             }else if(data.publicKnowledgeType != ''){
                   $.each(data.publicKnowledgeType,function(name,key){
                    // console.log(key)
                    if(key.isShow == 1){
                      $("#typeid").val(key.id);
                      typeid=key.id;
                    }
                   })
             } 
      });

      var GetList_KnowledgeType = {
              url: 'XAWebBanpai/GetList_KnowledgeType',
              type: "get",
              async: false,
              data:{
                schoolid:window.schoolid,
                type:1,
                deviceid:getUrlParam('deviceid')               
              }                
      };      
      commonFn(GetList_KnowledgeType, function(data) {                            
             if(data.classKnowledgeType != ''){
                 $.each(data.classKnowledgeType,function(i,n){                     
                 if(n.isShow == 1){
                  $("#typeidm").val(n.id);
                  typeidm=n.id;
                 }         
                     
                 })
             }else if(data.publicKnowledgeType != ''){
                   $.each(data.publicKnowledgeType,function(name,key){
                    // console.log(key)
                    if(key.isShow == 1){
                      $("#typeidm").val(key.id);
                      typeidm=key.id;
                    }
                   })
             }           
      });
       bbb(0);bbb(1);
//导航跳转
var url = window.location.href;
    $('.tab-wrap a').each(function () {
        if (returnUrl($(this).attr('href'))== returnUrl(url)){
            $(this).addClass('a').siblings().removeClass('a');
        }
    });
//以下为截取url的方法
    function returnUrl(href){
        var number=href.lastIndexOf("/");
        return href.substring(number+1);
    }
    function returnFileName(href){
        var number1=href.lastIndexOf("/");
        var number2= href.substring(0,number1).lastIndexOf("/");
        return href.substring(number1,number2+1);
    }

//内容渲染

var a = '';
var qyx = '';
if(!getUrlParam('type') || getUrlParam('type') == 0){
   document.getElementById("kewai").style.display = "";
   document.getElementById("meiri").style.display = "none";

}else if(getUrlParam('type') == 1){
   document.getElementById("kewai").style.display = "none";
   document.getElementById("meiri").style.display = "";
}

function bbb(qyx){
  if(qyx==0)
  {
    var GetList_KnowledgeType = {
              url: 'XAWebBanpai/GetList_KnowledgeType',
              type: "get",
              async: false,
              data:{
                schoolid:window.schoolid,
                type:qyx,
                deviceid:getUrlParam('deviceid')               
              }                
      };      
      commonFn(GetList_KnowledgeType, function(data) { 
        // console.log(data)                            
             if(data.classKnowledgeType != ''){
              var html = '';
                 $.each(data.classKnowledgeType,function(i,n){                     
                 if(n.isShow == 1){
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu" checked="">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href="xkbg.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }else{
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href=xkbg.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }            
                     
                 })
                 $('.knowledgetype').prepend(html)
             }else if(data.publicKnowledgeType != ''){
                   var str = '';
                   $.each(data.publicKnowledgeType,function(name,key){
                    // console.log(key)
                    if(key.isShow == 1){
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu" checked="">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="xkbg.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&classname='+getUrlParam('name')+'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }else{
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="xkbg.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&classname='+getUrlParam('name')+'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }
                   })
                   $('.knowledgetype').prepend(str)
             }           
      });
  }
  else
  {
    var GetList_KnowledgeType = {
              url: 'XAWebBanpai/GetList_KnowledgeType',
              type: "get",
              async: false,
              data:{
                schoolid:window.schoolid,
                type:qyx,
                deviceid:getUrlParam('deviceid')               
              }                
      };      
      commonFn(GetList_KnowledgeType, function(data) { 
        // console.log(data)                            
             if(data.classKnowledgeType != ''){
              var html = '';
                 $.each(data.classKnowledgeType,function(i,n){                     
                 if(n.isShow == 1){
                  $("#typeidm").val(n.id);
                  typeidm=$("#typeidm").val();
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu" checked="">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href="xkbg.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }else{
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href=xkbg.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }            
                     
                 })
                 $('.knowledgetypem').prepend(html)
             }else if(data.publicKnowledgeType != ''){
                   var str = '';
                   $.each(data.publicKnowledgeType,function(name,key){
                    // console.log(key)
                    if(key.isShow == 1){
                      $("#typeidm").val(key.id);
                      typeidm=$("#typeidm").val();
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu" checked="">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="xkbg.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&classname='+getUrlParam('name')+'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }else{
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="xkbg.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'&typeid='+ key.type +'&tid='+typeid+'&typeidm='+typeidm+'&classname='+getUrlParam('name')+'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }
                   })
                   $('.knowledgetypem').prepend(str)
             }           
      });
  }
}
//删除
    function del(id){
        if(confirm('确定删除？')) {
          var Delete_KnowledgeType = {
                          url:"XAWebBanpai/Delete_KnowledgeType",
                          type:"GET",
                          data:{
                            id:id
                          }
                    };
                    commonFn(Delete_KnowledgeType, function(json) {
                      // console.log(json)
                      if(json=='删除成功'){                          
                           history.go(0);                          
                      }
                    });
        }
      
    }
 var tid=document.getElementById('typeid').value;
 var tidm=document.getElementById('typeidm').value;
 console.log(tid);
 console.log(tidm);
// console.log(getUrlParam('sceneId')) // console.log(getUrlParam('type'))
 $('.muban-wrap').html('<iframe id="eboardFrame" src="xklb.html?deviceid='+ getUrlParam('deviceid') +'&id='+ typeid +'&idm='+typeidm+'&classname='+decodeURI(getUrlParam('name'))+'&type='+getUrlParam('type')+'"></iframe>');
// 推送
  if(!getUrlParam('type')||getUrlParam('type') == 0){
       $('.knowledgetype').on('click','.check',function(){
         var scene=$(this).attr("data-id");
         console.log(scene)
         console.log(getUrlParam('sceneId'))
         if($(this).is(':checked')){
           var $this = $(this)
             if(confirm('更改类别后，会直接推送最新分类图片，确定需要修改吗？')) {
               var Push_KnowledgeType = {
                               url:"XAWebBanpai/Push_KnowledgeType",
                               type:"GET",
                               data:{
                                 type:0,
                                 schoolid:window.schoolid,
                                 typeid:scene,
                                 deviceid:getUrlParam('deviceid'),
                                 sceneid:getUrlParam('sceneId'),
                                 iskaoqin:0,
                                 leixing:0
                               }
                         };
                         commonFn(Push_KnowledgeType, function(json) {
                           if(json == true){                                                                      
                             history.go(0);                                                                                                                           
                           }
                         });
              }else{
                     $this.removeAttr("checked")
              }
           
           }
       })
  }else if(getUrlParam('type') == 1){
     $('.knowledgetypem').on('click','.check',function(){
       var scene = $(this).attr("data-id");
        // console.log(scene)
       if($(this).is(':checked')){
         var $this = $(this)
           if(confirm('更改类别后，会直接推送最新分类图片，确定需要修改吗？')) {
             var Push_KnowledgeType = {
                             url:"XAWebBanpai/Push_KnowledgeType",
                             type:"GET",
                             data:{
                               type:1,
                               schoolid:window.schoolid,
                               typeid:scene,
                               deviceid:getUrlParam('deviceid'),
                               sceneid:getUrlParam('sceneId'),
                               iskaoqin:0,
                               leixing:0
                             }
                       };
                       commonFn(Push_KnowledgeType, function(json) {
                         if(json == true){                                                                      
                           history.go(0);                                                                                                                           
                         }
                       });
            }else{
                   $this.removeAttr("checked")
            }
         
         }
     })
  }
    

$('.tz').click(function(){
    window.location.href='zstj.html?type='+ getUrlParam('type') +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name');
})

$('.btn').click(function(){
  window.location.href='template.html?id='+getUrlParam('deviceid')
})

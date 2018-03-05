
var a = '';
var typeid = '';
bbb()
function bbb(){
  var GetList_KnowledgeType = {
              url: 'XAWebBanpai/GetList_KnowledgeType',
              type: "get",
              async: false,
              data:{
                schoolid:window.schoolid,
                type:2,
                deviceid:getUrlParam('deviceid')
                
              }                
      };      
      commonFn(GetList_KnowledgeType, function(data) { 
              if(data.isKaoQin == 0){
                $('#kaoqin').find('option').eq(0).attr('selected','selected').siblings().removeAttr('selected');
              }else{
                $('#kaoqin').find('option').eq(1).attr('selected','selected').siblings().removeAttr('selected');
              }                    
             if(data.classKnowledgeType != ''){
              var html = '';
                 $.each(data.classKnowledgeType,function(i,n){                     
                 if(n.isShow == 1){
                  $("#typeid").val(n.id);
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu" checked="">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href="zslb.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }else{
                    html +='<div class="dv system">'+
                                '<input type="checkbox" class="check" data-id="'+ n.id +'" data-isshow="0" data-roomid="25" name="zaodu">'+
                                '<div class="explorer">'+
                                    '<img src="'+ n.img +'" alt="">'+
                                    '<span class="count">'+ n.knowledgeCount +'</span>'+
                                '</div>'+
                                '<a href="zslb.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&name='+ n.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ n.name +'</a>'+
                            '</div>'
                 }            
                     
                 })
                 $('.knowledgetype').prepend(html)
             }else if(data.publicKnowledgeType != ''){
                   var str = '';
                   $.each(data.publicKnowledgeType,function(name,key){
                    // console.log(key)
                    if(key.isShow == 1){
                      $("#typeid").val(key.id);
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu" checked="">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="zslb.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }else{
                       str +='<div class="dv school">'+
                                     '<input type="checkbox" class="check" data-id="'+ key.id +'" data-isshow="1" data-roomid="25" name="zaodu">'+
                                     '<div class="explorer">'+
                                         '<img src="'+ key.img +'" alt="">'+
                                         '<span class="count">'+ key.knowledgeCount +'</span>'+
                                     '</div>'+
                                     '<a href="zslb.html?id='+ key.id +'&schoolid='+ key.schoolId +'&typeid='+ key.type +'&name='+ key.name +'&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+'" style="font-size: 16px; font-weight: 600;">'+ key.name +'</a>'+
                                     '<a href="zstj.html?id='+ key.id +'&deviceid='+ getUrlParam('deviceid') +'" style="display: block; margin-top: 5px;">编辑类别</a><div class="radio" data-id="38" data-isshow="1"><a href=javascript:del("'+key.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: 0px;">&#x1007;</i></a></div>'+
                                 '</div>'
                    }
                   })
                   $('.knowledgetype').prepend(str)
             }
           
      });
}
//删除
    function del(id){
        if(confirm('确定删除？')) {
          var Delete_KnowledgeType = {
                          url:"XAWebBanpai/Delete_KnowledgeType",
                          type:"GET",
                          async: false,
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
    // console.log(tid)
//是否开启考勤模版
    $('#kaoqin').change(function(){
      console.log($('#kaoqin').val())
      // 立即发布
      $('#save').click(function(){
        // console.log($('#kaoqin').val())
        var Push_KnowledgeType = {
                        url:"XAWebBanpai/Push_KnowledgeType",
                        type:"GET",
                        async: false,
                        data:{
                          type:2,
                          schoolid:window.schoolid,
                          typeid:0,
                          deviceid:getUrlParam('deviceid'),
                          sceneid:getUrlParam('sceneId'),
                          iskaoqin:$('#kaoqin').val(),
                          leixing:1
                        }
                  };
                  commonFn(Push_KnowledgeType, function(json) {
                    // console.log($('#kaoqin').val())
                    if(json == true){                                                           
                      location.href='template.html?id='+ getUrlParam('deviceid') +''                                                                     
                    }
                  });
      })
      if($('#kaoqin').val() == 0){
        a = 0
      }else{
        a = 1
      }
      $('.muban-wrap').html('<iframe id="eboardFrame" src="lunbo.html?val='+ a +'&deviceid='+ getUrlParam('deviceid') +'&id='+tid+'&classname='+getUrlParam('name')+'"></iframe>')
  })
   
$('.muban-wrap').html('<iframe id="eboardFrame" src="lunbo.html?deviceid='+ getUrlParam('deviceid') +'&id='+tid+'&classname='+getUrlParam('name')+'&val='+ $('#kaoqin').val() +'"></iframe>');


// 推送
    $('.knowledgetype').on('click','.check',function(){
      var scene=$(this).attr("data-id");
      if($(this).is(':checked')){
        var $this = $(this)
          if(confirm('更改类别后，会直接推送最新分类图片，确定需要修改吗？')) {
            var Push_KnowledgeType = {
                            url:"XAWebBanpai/Push_KnowledgeType",
                            type:"GET",
                            async: false,
                            data:{
                              type:2,
                              schoolid:window.schoolid,
                              typeid:scene,
                              deviceid:getUrlParam('deviceid'),
                              sceneid:getUrlParam('sceneId'),
                              iskaoqin:$('#kaoqin').val(),
                              leixing:0
                            }
                      };
                      commonFn(Push_KnowledgeType, function(json) {
                        if(json == true){  
                          $("#typeid").attr("value",scene);                                           
                          history.go(0);                                                                                                                           
                        }
                      });
           }else{
                  $this.removeAttr("checked")
           }
        
        }
    })

$('.tz').click(function(){
    window.location.href='zstj.html?type=2&deviceid='+ getUrlParam('deviceid') +'&classname='+getUrlParam('name')+''
})

var sbid = '';
var sum = '';
var GetList_ClassRoom = {
            url: 'XAWebCommon/GetList_ClassRoom?schoolid=' + window.schoolid,
            type: "get",
            dataType: "Json",
            async: false          
    };      
    commonFn(GetList_ClassRoom, function(data) {
        getlist(data.roomId,data.roomName);
       // console.log(data)
        $("#demo1").ligerTree({
            data: data.classRoom,
            checkbox: false, 
            ajaxType: 'get',
            idFieldName: 'id', 
           onSelect: function (node,e){
            // console.log(node.data.roomId)
              if(node.data.id) {
                getlist(node.data.id,node.data.name)
              }                                      
           }
       }) 
    });

  function getlist(id,name){
  var GetList_DeviceByRoomid = {
          url: "XAWebBanpai/GetList_DeviceByRoomid",
          type: "Get",
          data:{
            schoolid : window.schoolid,
            roomid  :  id 
          }
  };
  commonFn(GetList_DeviceByRoomid, function(json){  
    
       var html = '';
      $('#div').remove()
      if(json == ''){
            var str ='<div id="div" style="font-size: 20px;text-align: center;background:#5fb878;color:#FFF;"> Oh No! 该教室下没有任何设备</div>'
            $('.layui-form').after(str)
      }else{
         $.each(json, function(i, n) {
          // console.log(name)
          sum = n.appConnectState
            html += '<tr>'+
                       '<td>'+ name +'</td>'+
                       '<td>'+ n.clint_id +'</td>'+
                       '<td id="td">'+a(sum)+'</td>'+
                       '<td>'+n.version+'</td>'+
                       '<td>'+
                          '<a href="javascript:;" class="update" data-id='+ n.clint_id +'>版本更新</a>'+
                          '<a href="javascript:;" class="restart" data-id='+ n.clint_id +'>重启</a>'+
                          '<a href="javascript:;" class="log" data-id='+ n.clint_id +'>传日志</a>'+
                          '<a href="javascript:;" class="screencut" data-id='+ n.clint_id +'>屏幕截图</a>'+
                          '<a href="mbgl.html?name='+ name +'&sbid='+ n.clint_id +'" class="templatecut">模板切换</a>'+
                          '<a href="template.html?id='+ n.clint_id +'&name='+ name +'" class="contentset">内容管理</a>'+
                       '</td>'+
                     '</tr>'
         
        })      
      } 
        
        function a(sum){
          // console.log(sum)
           if(sum == 1){
              return '<label class="green"><i class="fa fa-check-circle"></i> 已连接</label>'
           }else if(sum == 0){
              return '<label class="red"><i class="fa fa-minus-circle"></i> 未连接</label>'
           }  
        }
        $('tbody').html(html)       
        
   })   
 }  
        
      
$('tbody').on('click','.update',function(){
        var sbid =$(this).attr("data-id"); 
       if(confirm('是否更新到最新版本？')) {
         var DevideUpdate = {
                         url:"XAWebXiaopai/DevideUpdate",
                         type:"get",
                         data:{
                           deviceId:sbid
                         }
                   };
                   commonFn(DevideUpdate, function(json) {
                     console.log(json.status)
                     if(json.status == 1){
                       // alert('更新成功')
                       $('#tsxi').html('已更新到最新版本');
                       $('#tsxi').css('display','block');
                       setTimeout(function(){
                         $('#tsxi').css('display','none');
                       },1000);
                     }
                   });
       }
})
  
$('tbody').on('click','.restart',function(){
        var a =$(this).attr("data-id");
      if(confirm('是否重启？')) {
        var DevideRestart = {
                        url:"XAWebXiaopai/DevideRestart",
                        type:"get",
                        data:{
                          deviceId:a
                        }
                  };
                  commonFn(DevideRestart, function(json) {                    
                    $('#tsxi').html('设备已经重启');
                    $('#tsxi').css('display','block');
                    setTimeout(function(){
                      $('#tsxi').css('display','none');
                    },1000);
                  });
      }
  })
$('tbody').on('click','.log',function(){
        var b =$(this).attr("data-id");
        var DevideLogs = {
                        url:"XAWebXiaopai/DevideLogs",
                        type:"get",
                        data:{
                          deviceId:b
                        }
                  };
                  commonFn(DevideLogs, function(json) {
                    console.log(json)
                     $('#tsxi').html('日志上传成功');
                     $('#tsxi').css('display','block');
                    setTimeout(function(){
                      $('#tsxi').css('display','none');
                    },1000);
                  });
  })
$('tbody').on('click','.screencut',function(){
        var v =$(this).attr("data-id");
        var DevideImgLogs = {
                        url:"XAWebXiaopai/DevideImgLogs",
                        type:"get",
                        data:{
                          deviceId:v
                        }
                  };
                  commonFn(DevideImgLogs, function(json) {
                    console.log(json)
                     $('#tsxi').html('截图上传成功');
                     $('#tsxi').css('display','block');
                    setTimeout(function(){
                      $('#tsxi').css('display','none');
                    },1000);
                  });
  })

 


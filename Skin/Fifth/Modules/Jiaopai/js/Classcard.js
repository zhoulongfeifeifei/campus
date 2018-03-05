var id=getUrlParam('id');
var _id;
var $customEditbox = $('.main_footer');
applist();
function applist()
{
  var GetList_App = {
                    url: "XAWebBanpai/GetList_App",
                    type: "Get",
                    data:{
                    schoolid:window.schoolid
                }
            };
            commonFn(GetList_App, function(json) {
                 var html='';
                 $.each(json, function(i, n) {
                  if(n.appType==0)
                  {
                    if(n.isShow==1)
                    {
                      html+="<div class='custom-item' id='"+n.id+"'>"+
                        "<img class='bg' src='"+n.appImg+"' style='height: 110px;'>"+
                        "<div class='t'><span>"+n.appName+"</span></div>"+
                        "<div class='custom-edit'>"+
                          "<a class='set'>修改名称</a>"+
                          "<a class='status green'>停用</a>"+
                        "</div>"+
                      "</div>";
                    }
                    else
                    {
                      html+="<div class='custom-item custom-item-disabled' id='"+n.id+"'>"+
                        "<img class='bg' src='"+n.appImg+"' style='height: 110px;'>"+
                        "<div class='t'><span>"+n.appName+"</span></div>"+
                        "<div class='custom-edit'>"+
                          "<a class='set'>修改名称</a>"+
                          "<a class='status red'>启用</a>"+
                        "</div>"+
                      "</div>";
                    }
                  }
                  else
                  {
                    if(n.isShow==1)
                    {
                      html+="<div class='custom-item custom-user' id='"+n.id+"'>"+
                        "<img class='bg' src='"+n.appImg+"' style='height: 110px;'>"+
                        "<div class='hover'><a href='AppDesign.html?id="+n.id+"&cid="+id+"'>编辑应用</a></div>"+
                        "<div class='t'><span>"+n.appName+"</span></div>"+
                        "<div class='custom-edit'>"+
                          "<a class='del'>删除</a>"+
                          "<a class='status green'>停用</a>"+
                        "</div>"+
                      "</div>";
                    }
                    else
                    {
                      html+="<div class='custom-item custom-user custom-item-disabled' id='"+n.id+"'>"+
                        "<img class='bg' src='"+n.appImg+"' style='height: 110px;'>"+
                        "<div class='hover'><a href='AppDesign.html?id="+n.id+"&cid="+id+"'>编辑应用</a></div>"+
                        "<div class='t'><span>"+n.appName+"</span></div>"+
                        "<div class='custom-edit'>"+
                          "<a class='del'>删除</a>"+
                          "<a class='status red'>启用</a>"+
                        "</div>"+
                      "</div>";
                    }
                  }
                }) 
                 html+="<div class='custom-item' id='add'>"+
                         "<img class='bg' src='img/tanjia.png' style='height: 110px;'>"+
                         "<div class='hover'>"+
                         "<a class='addItem' id='addItem' href='AppDesign.html?cid="+id+"'>添加</a>"+
                         "</div>"+
                         "<div class='t'>添加自定义应用</div>"+
                         "<div class='custom-edit'>"+
                          "<a class='set'></a>"+
                         "</div>"+
                       "</div>";
                document.getElementById("add").innerHTML=html;     
                 
            })
}

$("body").on('click', '.custom-item .set', function (){
  var $curItem = $(this).parent().parent();
  var _name = $curItem.find('.t').text();
   _id=$curItem.attr('id');
  $(".main_footer").show();
  $customEditbox.find('.name').val(_name);   
})
  $customEditbox.find('.f .ok').click(function (){
    var Update_AppName = {
                    url: "XAWebBanpai/Update_AppName",
                    type: "Get",
                    data:{
                    id:_id,
                    name:$customEditbox.find('.name').val(),
                    schoolid:window.schoolid
                }
            };
            commonFn(Update_AppName, function(json) {
              console.log("123");
              if(json=="修改成功") 
              {
                layer.msg(json, { time: 1000 }, function() {  
                        $(".main_footer").hide();
                      applist();
console.log("123");

                  });
              }
              else{
                layer.msg(json, { time: 1000 }, function() {  
                  });
              }
            })
  });
  $customEditbox.find('.f .cancel').click(function (){
      $(".main_footer").hide();
    });

$("body").on('click', '.custom-item .del', function (){
  var $curItem = $(this).parent().parent();
  var _id=$curItem.attr('id');
  if (confirm('确定删除该栏目？')) {
    var Delete_App = {
                    url: "XAWebBanpai/Delete_App",
                    type: "Get",
                    data:{
                    id:_id,
                    schoolid:window.schoolid
                }
            };
            commonFn(Delete_App, function(json) {
              if(json==true)
              {
                layer.msg("删除成功", { time: 1000 }, function() {  
                  applist();
                  });
              }
              else
              {
                layer.msg("删除失败", { time: 1000 }, function() {  
                  });
              }
            })
  }
  });

$("body").on('click', '.custom-item .status', function (){
  var $this = $(this);
  var $par = $this.parents('.custom-item');
  var curItemID = $par.attr("id");
  if ($par.hasClass('custom-item-disabled')) {
    //设为启用状态
    var Change_AppStatus = {
                    url: "XAWebBanpai/Change_AppStatus",
                    type: "Get",
                    data:{
                    id:curItemID,
                    isshow:1,
                    schoolid:window.schoolid
                }
            };
            commonFn(Change_AppStatus, function(json) {
              if(json==true)
              {
                layer.msg("启用成功", { time: 1000 }, function() {  
                  $par.removeClass('custom-item-disabled');
                  $this.text('停用').attr('class', 'status green');
                  applist();
                  });
              }
              else
              {
                layer.msg("启用失败", { time: 1000 }, function() {  
                  });
              }
            })
  }
  else
  {
    //设为停用状态
    var Change_AppStatus = {
                    url: "XAWebBanpai/Change_AppStatus",
                    type: "Get",
                    data:{
                    id:curItemID,
                    isshow:0,
                    schoolid:window.schoolid
                }
            };
            commonFn(Change_AppStatus, function(json) {
              if(json==true)
              {
                layer.msg("停用成功", { time: 1000 }, function() {  
                  $par.addClass('custom-item-disabled');
                  $this.text('启用').attr('class', 'status red');
                  applist();
                  });
              }
              else
              {
                layer.msg("停用失败", { time: 1000 }, function() {  
                  });
              }
            })
  }
});

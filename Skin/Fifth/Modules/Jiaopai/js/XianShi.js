var deviceid=getUrlParam('deviceid');
var name=decodeURI(getUrlParam('name'));
var scene=decodeURI(getUrlParam('scene'));
var sceneId=decodeURI(getUrlParam('sceneId'));
var laypage =layui.laypage;
document.getElementById("classname").innerText=name;
$(function(){
	var $mainWrap=$('.main-wrap');
	 $mainWrap.height($mainWrap.width()*9/16);
    $mainWrap.width($mainWrap.width());
    var $hislder = $('.hiSlider');
    $hislder.find('li').css('height', $hislder.width() * 0.6379);
    $('.hiSlider').hiSlider({
                isShowPage:false,
                isShowTitle:false,
                isShowControls:false
              });
})

document.getElementById("title").checked = "checked";
document.getElementById("honor").style.display = "none";
document.getElementById("notice").style.display = "";
document.getElementById("vid").style.display = "none";

$(".return").click(function(){
	 window.location.href="template.html?id="+deviceid+"&name="+name+"";
})

honorlist();
function honorlist(current)
{
	var model={};
model.deviceId=deviceid;
model.schoolId=window.schoolid;
model.pageIndex=current;
var GetList_Honor = {
                    url: "XAWebBanpai/GetList_Honor",
                    type: "Post",
                    data:model
            };
            commonFn(GetList_Honor, function(json) {
            	var html="";
                var honoimg="";
                var notice="";
              laypage({
                          cont: 'page1',
                          pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                          curr : json.pageIndex,
                          groups: 5,
                          jump: function(e, first){ //触发分页后的回调                
                              if(!first){ //一定要加此判断，否则初始时会无限刷 
                                  honorlist(e.curr);
                              }
                          },
                          skin: 'molv', //皮肤
                          first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                          last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                          prev: false, //若不显示，设置false即可
                          next: false //若不显示，设置false即可
                      });
              $("#tbody1").empty();
              if(json.resultData!=null)
              {
                $.each(json.resultData, function(i, n) {
                html+="<tr>"+
                  "<td>"+(i+1)+"</td>"+
                  "<td>"+n.title+"</td>"+
                  "<td><img class='w-100 honimg' src='"+n.img+"' /></td>"+
                  "<td><a class='text link' href='HonorDesign.html?id="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"&honorid="+n.honorId+"'>编辑</a>&nbsp;<a class='text link delhonor' data-id='"+n.honorId+"'>删除</a></td>"+
                "</tr>";
                honoimg+="<li 'hiSlider-item'><img src='"+n.img+"' /></li>";
              });
                document.getElementById("tbody1").innerHTML=html;
              }
              else
              {
                honoimg+="<li class='hiSlider-item'><img src='img/honor-1.jpg' /></li>";
              }
              if(json.noticeList.length)
              {
                $.each(json.noticeList, function(i, n) {
                  if(i==0)
                  {
                    notice="<li class='hiSlider-item' style='height:210px;'>"+
                          "<img src='img/notice-bg.png'/>"+
                          "<span class='t' id='title'>"+n.title+"</span>"+
                          "<div class='info'>"+
                            "<table><tr><td id='detail'>"+n.detail+""+
                            "</td></tr></table>"+
                          "</div>"+
                          "<div class='bottom'>"+
                            "<span class='s1' id='signname'>"+n.signName+"</span>"+
                            "<span class='s2'>2017年5月18日</span>"+
                          "</div>"+
                        "</li>";
                  }
              });
              }
              else
              {
                notice="<li class='hiSlider-item' style='height:210px;'>"+
                          "<img src='img/notice-bg.png'/>"+
                          "<span class='t' id='title'></span>"+
                          "<div class='info'>"+
                            "<table><tr><td id='detail'>"+
                            "</td></tr></table>"+
                          "</div>"+
                          "<div class='bottom'>"+
                            "<span class='s1' id='signname'></span>"+
                            "<span class='s2'>2017年5月18日</span>"+
                          "</div>"+
                        "</li>";
              }
              $("#img").click(function () {
                document.getElementById("honor").style.display = "";
                document.getElementById("notice").style.display = "none";
                document.getElementById("vid").style.display = "none";
                document.getElementById("slider").innerHTML=honoimg;
              });
              $("#video").click(function () {
                document.getElementById("honor").style.display = "none";
                document.getElementById("notice").style.display = "none";
                document.getElementById("vid").style.display = "";
                document.getElementById("slider").innerHTML="<li class='hiSlider-item'><img src='img/视频.jpg' /></li>";
              })
              $("#title").click(function () {
                document.getElementById("honor").style.display = "none";
                document.getElementById("notice").style.display = "";
                document.getElementById("vid").style.display = "none";
                document.getElementById("slider").innerHTML=notice;
              })
               if(json.type==1)
               {
                document.getElementById("img").checked = "checked";
                document.getElementById("honor").style.display = "";
                document.getElementById("notice").style.display = "none";
                document.getElementById("vid").style.display = "none";
                document.getElementById("slider").innerHTML=honoimg;                
               }
               else if(json.type==2)
               {
                document.getElementById("title").checked = "checked";
                document.getElementById("honor").style.display = "none";
                document.getElementById("notice").style.display = "";
                document.getElementById("vid").style.display = "none";
                document.getElementById("slider").innerHTML=notice;
               }
               else
               {
                document.getElementById("video").checked = "checked";
                document.getElementById("honor").style.display = "none";
                document.getElementById("notice").style.display = "none";
                document.getElementById("vid").style.display = "";
                document.getElementById("slider").innerHTML="<li class='hiSlider-item'><img src='img/视频.jpg' /></li>";
               }
            })
}

noticelist();
function noticelist(current)
{
    var model={};
    model.flag=0;
    model.deviceId=deviceid;
    model.schoolId=window.schoolid;
    model.pageIndex=current;
    var GetList_Honor = {
                    url: "XAWebCommon/GetList_NoticeByDevice",
                    type: "Post",
                    data:model
            };
            commonFn(GetList_Honor, function(json) {
                var html="";
              laypage({
                          cont: 'page2',
                          pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                          curr : json.pageIndex,
                          groups: 5,
                          jump: function(e, first){ //触发分页后的回调                
                              if(!first){ //一定要加此判断，否则初始时会无限刷 
                                  noticelist(e.curr);
                              }
                          },
                          skin: 'molv', //皮肤
                          first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                          last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                          prev: false, //若不显示，设置false即可
                          next: false //若不显示，设置false即可
                      });
              $("#tbody2").empty();
              $.each(json.resultData, function(i, n) {
                html+="<tr>"+
                  "<td>"+(i+1)+"</td>"+
                  "<td>"+n.title+"</td>"+
                  "<td>"+n.signName+"</td>"+
                  "<td>"+edit(n.userId,n.id)+"</td>"+
                "</tr>";
              });
               document.getElementById("tbody2").innerHTML=html;
            })
}

function edit(userid,id)
{
   var user=getCookieByUserInfo().userid;
   if(user==userid) return "<a class='text link' href='NOticeDesign.html?id="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"&noticeid="+id+"'>编辑</a>&nbsp;<a class='text link del' data-id='"+id+"'>删除</a>";
   else return "<a>本人可编辑</a>";
}

$("body").on('click', '.del', function(){
  if (confirm("是否确认删除\n请谨慎操作")) {
  var id=$(this).attr("data-id");
  console.log(id);
  var Delete_Notice = {
                    url: "XAWebCommon/Delete_Notice",
                    type: "Get",
                    data:{
                      id:id
                    }
            };
            commonFn(Delete_Notice, function(json) {
              if(json==true)
              {

                  layer.msg("删除成功", { time: 1000 }, function() {  
                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";;
                });
              }
              else
              {
                  layer.msg("删除失败", { time: 1000 }, function() {  
                });
              }
            })
  }
})

$("body").on('click', '.delhonor', function(){
  if (confirm("是否确认删除\n请谨慎操作")) {
  var id=$(this).attr("data-id");
  console.log(id);
  var Delete_Honor = {
                    url: "XAWebBanpai/Delete_Honor",
                    type: "Get",
                    data:{
                      id:id,
                      deviceid:deviceid
                    }
            };
            commonFn(Delete_Honor, function(json) {
              if(json==true)
              {

                  layer.msg("删除成功", { time: 1000 }, function() {  
                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";;
                });
              }
              else
              {
                  layer.msg("删除失败", { time: 1000 }, function() {  
                });
              }
            })
  }
})

$("#honoradd").click(function(){
    $(this).attr("href","HonorDesign.html?id="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"&honorid=0");
})

$("#addnotice").click(function(){
    $(this).attr("href","NOticeDesign.html?id="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"&noticeid=0");
})

$("#publishr").click(function(){
  var model={};
  model.deviceId=deviceid;
  model.sceneId=5;
  model.newState=1;
  var Update_Scene = {
                    url: "XAWebBanpai/Update_Scene",
                    type: "Post",
                    data:model
            };
            commonFn(Update_Scene, function(json) {
              if(json==true)
              {

                  layer.msg("发布成功", { time: 1000 }, function() {  
                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";;
                });
              }
              else
              {
                  layer.msg("发布失败", { time: 1000 }, function() {  
                });
              }
            })
})

$("#publishp").click(function(){
  var model={};
  model.deviceId=deviceid;
  model.sceneId=8;
  model.newState=1;
  var Update_Scene = {
                    url: "XAWebBanpai/Update_Scene",
                    type: "Post",
                    data:model
            };
            commonFn(Update_Scene, function(json) {
              if(json==true)
              {

                  layer.msg("发布成功", { time: 1000 }, function() {  
                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";;
                });
              }
              else
              {
                  layer.msg("发布失败", { time: 1000 }, function() {  
                });
              }
            })
})


$("#publishn").click(function(){
  var model={};
  model.deviceId=deviceid;
  model.sceneId=15;
  model.newState=1;
  var Update_Scene = {
                    url: "XAWebBanpai/Update_Scene",
                    type: "Post",
                    data:model
            };
            commonFn(Update_Scene, function(json) {
              if(json==true)
              {

                  layer.msg("发布成功", { time: 1000 }, function() {  
                      window.location.href="XianShi.html?deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"";;
                });
              }
              else
              {
                  layer.msg("发布失败", { time: 1000 }, function() {  
                });
              }
            })
})


        


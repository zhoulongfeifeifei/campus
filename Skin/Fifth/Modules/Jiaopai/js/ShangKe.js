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

})

teacherlist();
function teacherlist(current)
{
	var model={};
	model.schoolId=window.schoolid;
	model.deviceId=deviceid;
	model.pageIndex=current;
	var GetList_TeacherImgs = {
	                    url: "XAWebBanpai/GetList_TeacherImgs",
	                    type: "Post",
	                    data:model
	            };
	            commonFn(GetList_TeacherImgs, function(json) {
	              var html="";
	              laypage({
	                          cont: 'page',
	                          pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
	                          curr : json.pageIndex,
	                          groups: 5,
	                          jump: function(e, first){ //触发分页后的回调                
	                              if(!first){ //一定要加此判断，否则初始时会无限刷 
	                                  teacherlist(e.curr);
	                                  console.log(e.curr);
	                              }
	                          },
	                          skin: 'molv', //皮肤
	                          first: '首页', //将首页显示为数字1,。若不显示，设置false即可
	                          last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
	                          prev: false, //若不显示，设置false即可
	                          next: false //若不显示，设置false即可
	                      });
              $("#tbody").empty();
              $.each(json.resultData, function(i, n) {
                html+="<tr>"+
                  "<td>"+n.name+"</td>"+
                  "<td><img src='"+n.img+"' style='width: 100px;' /></td>"+
                  "<td><a class='text link' href='TeacherDesign.html?userid="+n.userId+"&deviceid="+deviceid+"&name="+name+"&scene="+scene+"&sceneId="+sceneId+"&username="+n.name+"'>编辑</a></td>"+
                "</tr>";
              });
               document.getElementById("tbody").innerHTML=html;
	            })

}
var model={};
	model.schoolId=window.schoolid;
	model.deviceId=deviceid;
	model.pageIndex=1;
var Get_TeacherImgByOne = {
                    url: "XAWebBanpai/Get_TeacherImgByOne",
                    type: "Post",
                    data:model
            };
            commonFn(Get_TeacherImgByOne, function(json) {
            	if(json.img=="") $("#teacherimg").attr("src","img/default.jpg");
            	else $("#teacherimg").attr("src",json.img);
            	if(json.detail=="") document.getElementById("info").innerText="请输入简介";
            	else document.getElementById("info").innerText=json.detail;
            	document.getElementById("username").innerText=json.name;
            	if(json.isCheck==0)
            	{
            		document.getElementById("kaoqing").innerHTML="<div class='box-right-3 font-fzxk' style=''>"+
          															"<img width='100%' src='img/class-1-right-3.jpg'/>"+
          															"<div class='text-box'>"+
            															"<table><tr><td>"+
                  															"<h3>"+json.subjectName+"</h3>"+
                  															"<p>已上时间：30分钟</p>"+
              															"</td></tr></table>"+
          															"</div>"+
     															 "</div>";
            	}
            	else
            	{
            		document.getElementById("kaoqing").innerHTML="<div class='box-right-1 font-fzxk' style=''>"+
        															"<img width='100%'' src='img/class-1-right-bg.jpg'/>"+
          															"<div class='text-box'>"+
            															"<table><tr><td>"+
                  															"<h3>"+json.subjectName+"</h3>"+
                  															"<p>已上时间：30分钟</p>"+
              															"</td></tr></table>"+
          															"</div>"+
      															"</div>"+
      															"<div class='box-right-2' style=''>"+
        															"<img width='100%'' src='img/index-1-right-3.jpg'/>"+
      															"</div>"
            	}
            })

$("#return").click(function(){
	window.location.href="template.html?id="+deviceid+"&name="+name+"";
})

var laypage =layui.laypage;
var id=getUrlParam('id');
teacherlist();
function teacherlist(current)
{
  var model={};
 model.schoolId=window.schoolid;
 model.pageIndex=current;
 var GetList_UserInfo = {
                    url: "XAWebSchool/GetList_UserInfo",
                    type: "Post",
                    data:model
            };
            commonFn(GetList_UserInfo, function(json) {
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
                  "<td>"+n.phone+"</td>"+
                  "<td>"+n.classXml+"</td>"+
                  "<td><img src='"+n.img+"' style='width: 100px;' /></td>"+
                  "<td>"+n.detail+"</td>"+
                  "<td><a class='text link' href='jsbj.html?userid="+n.userId+"&teachername="+n.name+"&id="+id+"'>编辑</a></td>"+
                "</tr>";
              });
               document.getElementById("tbody").innerHTML=html;
            })
}
 
var a = window.location.search
var str = (a.substring(6))
if(str == 5 || str == ''){
   str = 0
}

// console.log(window.schoolid)
  var GetList_KnowledgeTypeByType = {
        url: "XAWebBanpai/GetList_KnowledgeTypeByType",
        type: "Get",
        data:{
          schoolid : window.schoolid,
          type  : str 
        }
    };
    commonFn(GetList_KnowledgeTypeByType, function(json) {
      console.log(json)
       var html = '';
       $.each(json, function(i, n) {
        if(n.img == ''){
          n.img = 'img/4.png'
        }
        if(n.schoolId == 1){
          if(n.isShow == 0){
          html += '<div class="dv system">'+
                       '<a href=javascript:del("'+n.id+'")><i class="layui-icon" style="position: absolute;z-index: 1;right: -8px;top: -7px;">&#x1007;</i></a>'+
                      '<div class="explorer">'+
                         '<img src="' + n.img + '" alt="">'+
                         '<span class="count">'+ n.knowledgeCount +'</span>'+
                      '</div>'+
                      '<a href="bjlb.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&name='+ n.name +'">' + n.name + '</a>'+
                      '<div><a href="bjsc.html?id='+n.id +'">编辑</a></div>'+  
                  '</div>'
          }else if(n.isShow == 1){
            html += '<div class="dv system">'+
                        '<div class="explorer">'+
                           '<img src="' + n.img + '" alt="">'+
                           '<span class="count">'+ n.knowledgeCount +'</span>'+
                        '</div>'+
                        '<a href="bjlb.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&name='+ n.name +'">' + n.name + '</a>'+
                        '<div><a href="bjsc.html?id='+n.id +'">编辑</a></div>'+  
                    '</div>'
          }
          
        }else if(n.schoolId == 0){
          html += '<div class="dv system">'+
                      '<div class="explorer">'+
                         '<img src="img/4.png" alt="">'+
                         '<span class="count">'+ n.knowledgeCount +'</span>'+
                      '</div>'+
                      '<a href="bjlb.html?id='+ n.id +'&schoolid='+ n.schoolId +'&typeid='+ n.type +'&name='+ n.name +'">' + n.name + '</a>'+                      
                  '</div>'
        }
          
      })      
         
        $('#main_cent').html(html)
    })

$('#tz').click(function(){
  if(str==0){
    window.location.href="bjsc.html?type=0"
  }else if(str==1){
    window.location.href="bjsc.html?type=1"
  }else{
    window.location.href="bjsc.html?type=2"
  }
})
var url = window.location.href;
    $('.nav_header a').each(function () {
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
                      
                      window.location.replace('resource.html');
                  }
                });
    }
  
}
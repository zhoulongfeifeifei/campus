/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-10 20:13:46
 * @version $Id$
 */
commonFn({
    url: 'School/SchoolInfo',
    data: {schoolId: window.schoolid }
}, function(res) {
    $('.logo').attr('src',res.logo);
})
var element =layui.element() , 
id = getUrlParam('id'),
name = decodeURI(getUrlParam('name'));
top.document.title =name+"-->应用中心";
if (IsLogin()) {
    commonFn({url:'Common/GetListChildrenMenu',data:{schoolId:window.schoolid,loginType:getCookieByUserInfo('logintype'),menuid :id}},function(data){
            if (data.length>0){
                $('.layui-tab-title').empty();
                $.each( data,function(index, el) {
                    $('.layui-tab-title').append('<li data-url="/Web/Skin/Fifth/'+el.moduleUrl+'?id='+el.moduleId+'">'+el.moduleName+'</li>');
                })

                // 默认第一条是选中的
                $('.layui-tab-title').find('li:eq(0)').addClass('layui-this')

                $('#ifbox2').attr('src', '/Web/Skin/Fifth/'+data[0].moduleUrl+'?id='+data[0].moduleId);
            }
            $('.Crumbs').append('<a href="'+document.location+'">'+name+'</a>')
            $('.Crumbs').append('<a><cite>'+$('.layui-tab-title .layui-this').text()+'</cite></a>')

            element.init();
            element.on('tab(docDemoTabBrief)', function(data){
                $('cite').text($(this).text());
                $('#ifbox2').attr('src',$(this).attr('data-url'));
            });
    })
    // $.ajax({
    //     url:'/AjaxUser/GetListChildrenMenu',
    //     data:{menuid :id},
    //     success:function(data){
            
    //         if (data.Status==1) {
    //             if (data.data.length>0){
    //                 $('.layui-tab-title').empty();
    //                 $.each( data.Data,function(index, el) {
    //                     $('.layui-tab-title').append('<li data-url="/Skin/Fifth/'+el.ModuleUrl+'?id='+el.ModuleId+'">'+el.ModuleName+'</li>');
    //                 })

    //                 // 默认第一条是选中的
    //                 $('.layui-tab-title').find('li:eq(0)').addClass('layui-this')

    //                 $('#ifbox2').attr('src', '/Skin/Fifth/'+data.Data[0].ModuleUrl+'?id='+data.Data[0].ModuleId);
    //             }
    //             $('.Crumbs').append('<a href="">'+name+'</a>')
    //             $('.Crumbs').append('<a><cite>'+$('.layui-tab-title .layui-this').text()+'</cite></a>')

    //             element.init();
    //             element.on('tab(docDemoTabBrief)', function(data){
    //                 $('cite').text($(this).text());
    //                 $('#ifbox2').attr('src',$(this).attr('data-url'));
    //             });
    //         }else if(data.Status==4){
    //             layer.msg('您尚未登录',{
    //                 time:1200
    //             },function(){
    //                 top.location.href = '../../login.html';
    //             });
    //         } else{
    //             layer.msg(data.Message);
    //         }
    //     }
    // })
    // var userid = getUserId();
    // commonFn({url:'GetModelUser' ,data:{userid:getCookie('userId')}},function(res){
    //     var s =data.Data.school_id;
    //     $('.top>img').attr('src' ,'../../Common/img/logo'+s+'.png');
    // })
    // commonFn({url:'Account/CurrentSchoolRole',type:'post'},function(res){
        
    // })
    // $.ajax({
    //     url:'/AjaxUser/GetModelUser',
    //     data:{userid:userid},
    //     success:function(data){
    //         var s =data.Data.school_id;
    //         $('.top>img').attr('src' ,'../../Common/img/logo'+s+'.png');
    //     }
    // })

}else{
    location.href = "../../login.html";   
}

// iframe 自适应高度
function iFrameHeight() {
    var ifm = document.getElementById("ifbox2");
    var subWeb = document.iframe ? document.iframe["ifbox2"].document : ifm.contentDocument;
    
    if (ifm && subWeb) {
        if (subWeb.body)
        ifm.height = subWeb.body.offsetHeight;
    }
}
$(function(){
    setInterval(iFrameHeight,30);
})


$('#SignOut').click(function(event) {
    clearToken();
});
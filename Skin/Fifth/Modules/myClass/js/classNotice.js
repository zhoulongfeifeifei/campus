/**
 * 班级通知前台js
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-26 10:42:44
 * @version $Id$
 */

var laypage = layui.laypage,
    userType, userId;
schoolid = getCookieByUserInfo('schoolid');
userType = getCookieByUserInfo('logintype');
userId = getCookieByUserInfo('userid');

getNoticeList();
function getNoticeList(curr) {
    var ajaxGetList={
        url: 'MessageNotify/GetList',
        data: {
            isiSend: 2,
            PageIndex: curr || 1,
            PageSize: 4,
            schoolid:schoolid
        },
        type:'post'
    };
    commonFn(ajaxGetList, function(res) {
        // console.log(res.resultData);
        if (res.resultData){
            $('#Notice').empty();
            var t = res.resultData;
            laypage({
                cont: 'page',
                pages: res.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: res.pageIndex,
                groups: 5,
                jump: function(e, first) { //触发分页后的回调                
                    if (!first) { //一定要加此判断，否则初始时会无限刷 
                        sgetNoticeList(e.curr);
                    }
                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            $.each( t ,function(index, el) {
                $('#Notice').append('<li>'+
                    '<div class="topimg">'+
                    '<img src='+el.fromUser.face+' alt="这是个头像">'+
                    '</div>'+
                    '<div class="content">'+
                    '<h3>'+el.fromUser.name+'</h3>'+
                    '<span>'+solveTime(el.inTime)+'</span>'+
                    '<p>'+el.msgContent+'</p>'+
                    '</div>'+
                    '</li>')
            });
        }
    })
}
// isiSend  老师身份给1 家长和学生身份给2
if (userType == 'parent' || userType == 'student') {
    $('.addNotice').css('display', 'none');
}
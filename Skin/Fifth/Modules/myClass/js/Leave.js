
/**
 * 请假
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-26 15:58:24
 * @version $Id$
 */

var layer = layui.layer,
    laypage = layui.laypage,
    form = layui.form,
    laydate = layui.laydate,
    userType, userId;
schoolid = getCookieByUserInfo('schoolid');
userType = getCookieByUserInfo('logintype');
userId = getCookieByUserInfo('userid');

if (userType == 'parent' || userType == 'student') {
    $('.addNotice').css('display', 'inline-block');
}
getNoticeList();
var start = {
    min: laydate.now(),
    max: '2099-06-16 23:59:59',
    istime: true,
    format: 'YYYY-MM-DD hh:mm:ss',
    istoday: false,
    choose: function(datas) {
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas //将结束日的初始值设定为开始日
    }
};

var end = {
    min: laydate.now(),
    max: '2099-06-16 23:59:59',
    istime: true,
    format: 'YYYY-MM-DD hh:mm:ss',
    istoday: false,
    choose: function(datas) {
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
};
$('#LAY_demorange_s').click(function(event) {
    start.elem = this;
    laydate(start);
});
$('#LAY_demorange_e').click(function(event) {
    start.elem = this;
    laydate(start);
});


//定义一个函数渲染页面数据
function getNoticeList(curr,sele) {
    var ajaxinfor = {
        url: 'Examine/GetListExamineFromMe',
        data: {
            pageIndex: curr || 1,
            pageSize: 4,
            schoolid:schoolid,
            HadShenpi:sele||0,
            name:'请假模版',
        },
        type:'post'
    }
    commonFn(ajaxinfor, function(data) {
        if (data.resultData) {
            $('#Leave').empty();
            var t = data.resultData;
            laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: data.pageIndex,
                groups: 5,
                jump: function(e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷
                        getNoticeList(e.curr,sele);
                    }
                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            $.each(t, function(index, el) {
                var pDom = '';

                $.each(eval(el.modelData), function(i, e) {
                    pDom += '<p>' +e.Title + ':<span>' + e.Value + '</span></p>'
                });
                $('#Leave').append('<li>' +
                    '<div class="topimg">' +
                    '<img src="../../Common/img/usertx.png" alt="">' +
                    '</div>' +
                    '<div class="content" data-state ='+el.state+'>' +
                    '<h3>' + el.fromUserName + '</h3>' +
                    '<span style="margin-bottom: 8px">' + solveTime(el.inTime) + '</span>' + pDom +
                    '<div class="right stateBtn" id='+index+'></div></li>'
                )
                state(el.state,index);
            });
        }
    })
}
/******审批的状态接口*****/
function state(type,index) {
    var ax='#'+index;
    var ajaxState = {
        url: 'Examine/GetListStatus',
        data: {type: type}
    }
    commonFn(ajaxState, function (res) {
            $.each(res, function (i, n) {
                if (n.key==type){
                    $(ax).html('<div class="layui-btn layui-btn-small" data-state="' + n.key + '">' + n.value + '</div>');
                }
            })

    })
}





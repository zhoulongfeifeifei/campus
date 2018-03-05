/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 16:11:46
 * @version $Id$
 */

var layer = layui.layer,
    laypage = layui.laypage;

obtainList();
getStatusList(2);

$('.search').click(function() {
    // var obj={};
    // obj.Title =$('input[name="Title"]').val();
    // obj.BeginTime = $('#BeginTime').val();
    // obj.EndTime = $('#EndTime').val();
    // obtainList(JSON.stringify(obj));
    Title = $('input[name="Title"]').val()
    obtainList(Title);

});
layui.form().on('select(condition)', function(data) {
    obtainList($('input[name="Key"]').val(), 1, data.value);
})

function obtainList(obj, curr, status) {
    obj = obj ? obj : '';
    commonFn({
        url: 'Offic/GetListToPublic',
        data: {
            Title: obj,
            PageIndex: curr,
            PageSize: 10,
            Status: status
        },
        type:'post'
    }, function(data) {
        $('tbody').empty();
        laypage({
            cont: 'page',
            pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: data.pageIndex,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷 
                    obtainList(obj, e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });


        if (data.resultData && data.resultData.length > 0) {
            var d = data;
            var i2;
            for (var i = 0; i < d.resultData.length; i++) {
                $('tbody').append('<tr><td>' + isNull(d.resultData[i].id) + '</td><td>' + isNull(d.resultData[i].title) + '</td><td>' + isNull(d.resultData[i].officialNo) + '</td><td>' + isNull(d.resultData[i].fromUserName) + '</td><td>' + isNull(d.resultData[i].stateStr) + '</td>' +
                    '<td>' + solveTime(d.resultData[i].inTime) + '</td>' +
                    '<td>' +

                    '<a href="documentdetail.html?id=' + d.resultData[i].id + '" class="layui-btn layui-btn-mini" title="查看详情" >查看详情</a>' +
                    (d.resultData[i].state == 2 ? '<a href="javascript:reDraft(' + d.resultData[i].id + ')" class="layui-btn layui-btn-mini"  title="发布">发布</a>' : '') +
                    '</td></tr>')
            }
        }
        quanxian();

    })
}

// 发布公文
function reDraft(id) {

    layer.confirm("确定发布吗?", {
        icon: 3,
        title: "发布公文提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/PublicChaoSong',
            data: {
                id: id
            },
        }, function() {
            layer.msg("发布成功");
            obtainList();
        })
    })
}



// 转交
function Print(id) {
    layer.open({
        type: 2,
        title: "转交人选择",
        closeBtn: 1,
        shadeClose: true,
        area: ['600px', '500px'],
        content: '../../Common/Receiver/Receiver.html?id=1', //这里content是一个DOM
        btn: '确定',
        yes: function(index, layero) {
            //取数据方法
            var usertypes = [];
            var userlists = [];
            var usernames = [];
            $("#layui-layer-iframe" + index).contents().find("#Peoples li").each(function(i, n) {
                var usertype = $(n).attr("data-usertype");
                var schoolid = $(n).attr("data-schoolid");
                var userid = $(n).attr("data-id");
                var username = $(n).find('a').html();
                if (usertype) {
                    usertypes.push(usertype);
                } else if (userid) {
                    userlists.push(userid);
                }
                usernames.push(username);
                inputDom.val(usernames.join(','));
            });
            var obj = {};
            obj.SchoolId = $("#layui-layer-iframe" + index).contents().find('#SchoolId').val();
            obj.UserTypeList = usertypes;
            obj.UserIdList = userlists;
            commonFn({
                url: '转交',
                data: {
                    id: id,
                    userInfo: obj
                },
            }, function() {
                layer.msg("转交成功");
            })
            layer.close(index);
        }
    })
}
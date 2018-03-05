/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 16:11:46
 * @version $Id$
 */

var layer = layui.layer,
    form = layui.form(),
    id = getUrlParam('id'),
    laypage = layui.laypage;

obtainList();
getStatusList(1);
$('.search').click(function() {
    // var obj={};
    // obj.Title =$('input[name="Title"]').val();
    // obj.BeginTime = $('#BeginTime').val();
    // obj.EndTime = $('#EndTime').val();
    // obtainList(JSON.stringify(obj));
    Title = $('input[name="Title"]').val()
    obtainList(Title);

});
form.on('select(condition)', function(data) {
    obtainList($('input[name="Title"]').val(), 1, data.value);
})
function obtainList(obj, curr, Status) {
    obj = obj ? obj : '';
    var listLoad = layer.load();
    commonFn({
        url: 'Offic/GetListFromMe',
        data: {
            Title: obj,
            PageIndex: curr,
            PageSize: 10,
            Status: Status
        },
        type: 'post'
    }, function(data) {
        layer.close(listLoad);
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
            for (var i = 0; i < d.resultData.length; i++) {
                var removeDom = '';
                if (d.resultData[i].state == 3 || d.resultData[i].stateStr == "审批不通过") {
                    removeDom = '<a href="javascript:removeDraft(' + d.resultData[i].id + ')" class="layui-btn layui-btn-mini layui-btn-danger">删除</a>'
                }
                $('tbody').append('<tr><td>' + isNull(d.resultData[i].id) + '</td><td>' + isNull(d.resultData[i].title) + '</td><td>' + isNull(d.resultData[i].officialNo) + '</td><td>' + isNull(d.resultData[i].fromUserName) + '</td><td>' + isNull(d.resultData[i].stateStr) + '</td>' +
                    '<td>' + solveTime(d.resultData[i].inTime) + '</td>' +
                    '<td>' +
                    // '<a href="detailDraft.html?id='+d.resultData[i].id+'" style="display:inline-block; width:3em;" title="查看详情" ><i class="alIcon">&#xe60e;</i></a>'+
                    //  (d.resultData[i].State==1?'<a href="javascript:remove('+d.resultData[i].id+')" style="display:inline-block; width:3em;" title="撤回"><i class="alIcon">&#xe619;</i></a>':"")+
                    '<a href="documentdetail.html?id=' + d.resultData[i].id + '" class="layui-btn layui-btn-mini" title="查看详情" >查看详情</a>' +
                    (d.resultData[i].state == 1 ? '<a href="javascript:remove(' + d.resultData[i].id + ')" class="layui-btn layui-btn-mini layui-btn-warm" title="撤回">撤回</a>' : "") + removeDom +
                    '</td></tr>')
            }
        }
        quanxian();
    },function(){layer.close(stateLoad);})
}

// 删除列表的一条
function remove(id) {
    layer.confirm("确定撤回吗?", {
        icon: 3,
        title: "撤回提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/UndoExamine?id='+id,
            type:'delete'
        }, function() {
            obtainList();
            layer.msg("撤回成功");
        })
    })
}

function removeDraft(id) {
    layer.confirm("确定删除吗?", {
        icon: 3,
        title: "删除提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/DeleteOfficial?id='+id,
            type:'delete'
        }, function() {
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
                obtainList()
                layer.msg("转交成功");
            })
            layer.close(index);
        }
    })
}
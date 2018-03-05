/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 14:31:18
 * @version $id$
 */

var layer = layui.layer,
    laypage = layui.laypage;
ajaxList();

$('.search').click(function() {
    ajaxList($('input[name="Key"]').val());
});
function ajaxList(seach, page) {
    commonFn({
            url: "MessageNotify/GetList",
            data: {
            PageIndex: page,
            Title: seach,
            IsISend: 2
        },
            type: 'post'
        }, function(data) {
            $('tbody').empty();
            laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: data.pageIndex,
                groups: 5,
                jump: function(e, first) { //触发分页后的回调

                    if (!first) { //一定要加此判断，否则初始时会无限刷 
                        ajaxList($('input[name="Key"]').val(), e.curr)
                    }

                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });

            for (var i = 0; i < data.resultData.length; i++) {
                // var classDom =  
                var i2 = i + 1
                if (i2 < 10) {
                    if (page == undefined) {
                        var p2 = ''
                        i2 = i2 * 1
                    } else {
                        var p2 = page - 1
                    }
                } else {
                    if (page == undefined) {
                        var p2 = ''
                        i2 = i2 * 1
                    } else {
                        i2 = i2 * page
                        var p2 = ''
                    }

                }
                var status, idDom;
                if (data.resultData[i].isRead == 1) {
                    status = "已读";
                    idDom = '<td>' + i2 + p2 + '</td>';
                } else {
                    status = "未读";
                    idDom = '<td><span></span>' + i2 + p2 + '</td>';
                }
                $('<tr data-id="' + data.resultData[i].msgId + '">' + idDom + '<td>' + data.resultData[i].msgContent + '</td>' +
                    
                    '<td>' + data.resultData[i].fromUser.name + '</td><td>' + solveTime(data.resultData[i].inTime)   + '</td>' +
                    '<td><a class="layui-btn layui-btn-mini" href="noticedetail.html?id=' + data.resultData[i].msgId + '" title="查看">查看</a>' +
                    '<a class="layui-btn layui-btn-mini layui-btn-danger" onclick="delRole(' + data.resultData[i].msgId + ')" title="删除">删除</td></tr>').appendTo('tbody');
            }
        
        })

}
function delRole(a) {
    layer.confirm('你确定要删除该通知公告吗？', {
        icon: 3,
        title: '提示'
    }, function(index) {

        layer.close(index)
        commonFn({
            url: "MessageNotify/Delete?id=" + a,
            type: 'delete'
        }, function() {
            ajaxList();
            layer.msg('删除成功')
        })
    })
}
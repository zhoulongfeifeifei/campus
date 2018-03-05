/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 14:26:43
 * @version $Id$
 */


var layer = layui.layer,
    laypage = layui.laypage,
    Id = getUrlParam('id');

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
            IsISend: 2,
            userid: Id
        },
        type:'post'
    }, function(data) {
        $('tbody').empty();
        laypageOk(data.pageCount,data.pageIndex,function(curr){
            ajaxList($('input[name="Key"]').val(), curr)
        })
        for (var i = 0; i < data.resultData.length; i++) {
                var i2 = i + 1;
                var p2 = 0;
                if (i2 < 10) {
                    if (page) p2 = page - 1;
                } else {
                    if (!page) p2 ='';
                    else i2 = i2 * page,  p2 = '';
                }
                $('<tr data-id="' + data.resultData[i].id + '"><td>' + data.resultData[i].msgId + '</td>' +
                    '<td>' + data.resultData[i].msgTitle + '</td>' +
                    '<td>' + solveTime(data.resultData[i].inTime) + '</td><td><a href="noticedetail.html?id=' + data.resultData[i].msgId + '" class="layui-btn layui-btn-mini" title="查看">查看</a>' +
                    '</td></tr>').appendTo('tbody');
            }
    })
}

function delRole(a,b,c) {
    layer.confirm('你确定要删除该通知公告吗？', {
        icon: 3,
        title: '提示'
    }, function(index) {

        layer.close(index)
        commonFn({
            url: "MessageNotify/Delete?id=" + a,
            type: 'delete'
        }, function() {
            ajaxList(b,c);
            layer.msg('删除成功')
        })
    })
}
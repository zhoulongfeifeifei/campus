/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:42:15
 * @version $Id$
 */

var form = layui.form();
form.on('select', function(data) {

    dataAjax(data.value);
})
dataAjax()
$('.search').click(function() {
    dataAjax($('#select').val(), $('input[name="Title"]').val());
})

function dataAjax(status, title, curr) {
    $('tbody').empty();
    commonFn({
        url: 'CloudForm/Over',
        data: {
            status: status || 0,
            Title: title,
            PageIndex: curr || 1
        },
        type: 'post'
    }, function(data) {
        layui.laypage({
            cont: 'page1',
            pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: data.pageIndex,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷 
                    dataAjax($('#select').val(), $('input[name="Title"]').val(), e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        for (var i = 0; i < data.resultsData.length; i++) {
            var isrepeat = data.resultsData[i].isRepeat;
            var username = data.resultsData[i].userName
            if (isrepeat == 1) {
                isrepeat = "是";
            } else if (isrepeat == 0) {
                isrepeat = "否";
            }
            if (username == null) {
                username = ""
            } else {
                username = username
            }
            $('<tr data-id="' + data.resultsData[i].formId + '"><td><a href="formongoingedit    .html?did=' + data.resultsData[i].formId + '">' + data.resultsData[i].title + '</a></td>' +
                // '<td>'+username+'</td>'+
                '<td>' + data.resultsData[i].validTime + '</td>' +
                '<td>' + isrepeat + '</td>' +
                '<td>' + data.resultsData[i].isReadName + '</td>' +
                '<td>' +
                '<a href="formongoingedit    .html?did=' + data.resultsData[i].formId + '" class="layui-btn layui-btn-mini">查看</a>' +
                '<a onclick="delRole(' + data.resultsData[i].formId + ',' + curr + ')" class="layui-btn layui-btn-mini layui-btn-danger" title="">删除</a></td></tr>').appendTo('tbody');
        }
    })
}

function delRole(id, curr) {
    layer.confirm("确定删除?", {
        icon: 3,
        title: "删除提示"
    }, function(index) {
        layer.close(index);
        var delLoad = layer.load();
        commonFn({
            url: 'CloudForm/Delete?id=' + id,
            type: 'delete'
        }, function(data) {
            dataAjax($('#select').val(), $('input[name="Title"]').val(), curr)
            layer.msg("删除成功");
        }, function() {
            layer.close(delLoad);
        })
    })
}
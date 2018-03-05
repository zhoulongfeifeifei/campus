/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 16:01:42
 * @version $Id$
 */
obtainList(1);
getStatusList(4);
layui.form().on('select(condition)', function(data) {
    obtainList(1, data.value);
})

function obtainList(curr, Status) {
    commonFn({
        url: 'Offic/GetListToMeChaoSong',
        data: {
            PageIndex: curr || 0,
            PageSize: 10,
            Status: Status || 0
        },
        type: 'post'
    }, function(data) {
        $('tbody').empty();
        layui.laypage({
            cont: 'page11',
            pages: data.PageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: data.PageIndex,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷 
                    obtainList(undefined, e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        console.log(1);
        if ($.isArray(data.resultData)) {
        console.log(2);

            var d = data.resultData
            $.each(data.resultData, function(index, val) {
                 var isid = 'sid';
                if (val.stateStr && val.stateStr == '已查阅') isid = 'yid';

                $('tbody').append('<tr><td>' + val.id + '</td><td>' + val.title + '</td><td>' + val.fromUserName + '</td><td>' + val.stateStr + '</td>' +
                    '<td>' + solveTime(val.inTime) + '</td>' +
                    '<td><a href="documentdetail.html?' + isid + '=' + val.id + '" class="layui-btn layui-btn-mini" title="查看详情" >查看详情</a>' +
                    '</td> </tr>')
            });
        }
    })
}
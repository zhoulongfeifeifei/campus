/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 16:05:32
 * @version $Id$
 */


ajaxList();
getStatusList(3);
$('.search').click(function() {
    ajaxList($('input[name="Key"]').val());
});
layui.form().on('select(condition)', function(data) {
    ajaxList($('input[name="Key"]').val(),1 , data.value);
})
function ajaxList(seach,page,status){
    $('tbody').empty();
    commonFn({
            url: 'Offic/GetListToMe',
            data:{PageIndex : page||1 ,Title : seach , Status :status||0},
            type:'post'
        }, function(data) {
                var t =data;
                layui.laypage({
                    cont: 'page',
                    pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr : t.pageIndex,
                    groups: 5,
                    jump: function(e, first){ //触发分页后的回调
                        if(!first){ //一定要加此判断，否则初始时会无限刷 
                            ajaxList($('input[name="Key"]').val() , e.curr)
                        }
                    },
                    skin: 'molv', //皮肤
                    first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                    last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                    prev: false, //若不显示，设置false即可
                    next: false //若不显示，设置false即可
                });

                for (var i = 0; i < t.resultData.length; i++) {
                    $('<tr data-id="'+t.resultData[i].teacherId+'"><td>'+t.resultData[i].id+'</td><td>'+t.resultData[i].title+'</td><td>'+t.resultData[i].fromUserName+'</td><td>'+t.resultData[i].stateStr+'</td>'+
                        '<td>'+solveTime(t.resultData[i].inTime)+'</td>'+
                        '<td>'+
                        '<a href="approve.html?id='+t.resultData[i].id+'" class="layui-btn layui-btn-mini" title="查看详情" >查看详情</a>'+
                    '</td></tr>').appendTo('tbody');
                }
        })
} 


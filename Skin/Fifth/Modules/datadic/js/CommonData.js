var laypage = layui.laypage;

var dad;
Treelist();
function Treelist(curr) {
    var GetAllData = {
        url: "DataDic/GetListByPid",
        data: {
            pid:0,
            pagesize:7,
            pageIndex:curr||1
        },
        type: "Post"
    };
    $('tbody').empty();
    var ll;
    commonFn(GetAllData, function (data) {
        ll = data.resultData;
        // console.log(ll);
        $.each(ll,function(k,v){
            dad =v.dataText;
            //分页
            laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: data.pageIndex,
                groups: 5,
                jump: function(e, first) { //触发分页后的回调
                    if(!first) { //一定要加此判断，否则初始时会无限刷
                        Treelist(e.curr);
                    }
                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            $('tbody').append(
                '<tr data-id="'+v.id+'">'+
                    '<td>'+ v.id +'</td>'+
                    '<td>'+ v.dataText +'</td>'+
                    '<td>'+ v.dataValue +'</td>'+
                    '<td>'+ solveTime(v.inTime) +'</td>'+
                    '<td>'+
                        '<a class="layui-btn layui-btn-small" id="add">增加</a>'+
                        '<a class="layui-btn layui-btn-small" id="del">删除</a>'+
                        '<a class="layui-btn layui-btn-small" id="xiugai">修改</a>'+
                        '<a class="layui-btn layui-btn-small" href="#">查看</a>'+
                    '</td>'+
                +'</tr>'
            )
        })
        $("#list").ligerTree({
            data: ll.dataText, //数据
            checkbox: false,//是否复选框
            idFieldName: 'dataTypeId', //ID字段名
            parentIDFieldName: 'pid',//父节点字段
            isExpand: false, //是否展开
        });

    })
}
//增加
$('body').on('click','#add',function(){
    layer.open({

    })
})
//删除
$('body').on('click','#del',function () {
    var ids = $(this).parents('tr').attr("data-id");
    var ajaxinfor = {
        url:'DataDic/Delete?id='+ids
    }
    commonFn(ajaxinfor,function (res) {
        layer.confirm({icon: 3, title:'您确定要删除吗?'},function(index){
            layer.close(index);
            layer.msg('删除成功')
        });
    })
})
//修改
$('body').on('click','#xiugai',function(){
    layer.open({

    })
})
//查看

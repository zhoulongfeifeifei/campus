var layer = layui.layer,
    form = layui.form(),
    laypage = layui.laypage;
var id = getUrlParam('id');
// console.log(id)
// //定义一个函数,根据返回的状态码,渲染成是否
function kk(num) {
    if (num === 1) {
        var fn = '是';
        return fn;
    } else if(num===0){
        var fz = '否';
        return fz;
    }
}
// //根据状态码,判断显示分值,还是赋分
function Ak(num) {
    if (num===1 || num ===0){
        var dnf = '分值';
        return dnf;
    }else if(num===2){
        var ddf='赋分';
        return ddf;
    }
}
ZhuanYe(id);
function ZhuanYe(id,cur) {
    var ajaxinfor = {
        url: 'SignupManage/GetListProfession',
        data:{
            projectid:id,
            pageIndex:cur||1 ,
            pageSize: 10,
        },
        type:'post',
    }
    $('tbody').empty();
    commonFn(ajaxinfor, function (res) {
        $.each(res.dataList, function (k, v) {{
            laypage({
                cont: 'page',
                pages: res.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: res.pageIndex,
                groups: 5,
                jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷
                        ZhuanYe(id,e.curr);
                    }
                },
                skin: '#009688', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            if (v.isInterviewer==1){
                $('tbody').append('<tr data-id="' + v.id + '">' +
                    '<td>' + v.id + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.scoreLine + '</td>' +
                    '<td>' + v.planNum + '</td>' +
                    '<td>' +kk(v.isInterviewer)+ '</td>' +
                    '<td>'+ Ak(v.scoreType)+'</td>' +
                    '<td>' +
                    '<div class="btnhezi">'+
                        '<a class="layui-btn layui-btn-mini btn" id="bianji">编辑</a>' +
                        '<a class="layui-btn layui-btn-mini btn" style="background-color: #ff9100" id="delect">删除</a>' +
                    '</div>'+
                    '</td>' +
                    +'<tr>'
                     );
                }
                else{
                $('tbody').append('<tr data-id="' + v.id + '">' +
                    '<td>' + v.id + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.scoreLine + '</td>' +
                    '<td>' + v.planNum + '</td>' +
                    '<td>' +kk(v.isInterviewer)+ '</td>' +
                    '<td>'+'</td>' +
                    '<td>' +
                        '<div class="btnhezi">'+
                            '<a class="layui-btn layui-btn-mini btn" id="bianji">编辑</a>' +
                            '<a class="layui-btn layui-btn-mini btn" style="background-color: #ff9100" id="delect">删除</a>' +
                        '</div>'+
                    '</td>' +
                    +'<tr>'
                );
            }
            }
        });
    })
}
// 删除一条数据
$('body').on('click', '#delect', function () {
    var idd = $(this).parents('tr').attr('data-id');
    layer.confirm('你确定要删除该栏目吗？', {icon: 3, title: '提示'}, function (index) {
        var ajaxdel = {
            url: 'SignupManage/DeleteProfession?id=' + idd,
        }
        commonFn(ajaxdel, function (res) {
            layer.msg("删除成功", {time: 1000});
            ZhuanYe();
        })
        layer.close(index);
        location.href='ZhuanYeShuJu.html?id='+id
    })
});
//编辑一条数据
$('body').on('click', '#bianji', function () {
    //获取一条专业的数据
    var ids = $(this).parents('tr').attr('data-id');
    var ajaxinfor = {
        url: 'SignupManage/GetModelProfession?id=' + ids
    }
    commonFn(ajaxinfor, function (res) {
        $('input[name="name"]').val(res.name)
        $('input[name="zhaosheng"]').val(res.planNum)
        $('input[name="fenshu"]').val(res.scoreLine);
        $('select[name="mianshi"]').val(res.isInterviewer);
        // $('select[name="mianshi"][value="'+(res.isInterviewer)+'"]').attr("selected","selected");
        $('input[name="fenzhi"]').val();
        form.render();
    })
    layer.open({
        type: 1,
        title: '专业数据编辑',
        area: ['420px', '395px'],
        content: $('#layout'),
        btn: ['保存','取消'],
        yes: function (index) {
            var dd = {};
            dd.id = ids;
            dd.name = $('input[name="name"]').val()
            dd.planNum = $('input[name="zhaosheng"]').val();
            dd.scoreLine = $('input[name="fenshu"]').val();
            dd.isInterviewer = $('select[name="mianshi"]').val();
            dd.scoreType=$('input[name="fenzhi"]:checked').val();
            var ajaxinfor = {
                url: 'SignupManage/UpdateProfession',
                data: dd,
                type: 'POST'
            }
            commonFn(ajaxinfor, function (res) {
                layer.msg('编辑成功');
                ZhuanYe();
                layer.close(index)
                location.href='ZhuanYeShuJu.html?id='+id
            })
        }
    })
})


























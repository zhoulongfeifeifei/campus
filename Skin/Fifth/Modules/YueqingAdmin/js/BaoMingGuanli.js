var layer = layui.layer,
    form = layui.form(),
    laypage = layui.laypage;
/*******渲染表格数据***获取一个报名项目*****/
var yingjieul;
Biao();
function Biao(current) {
    var ajaxinfor = {
        url: 'SignupManage/GetListPagePrpject',
        data: {
            pageIndex: current || 1,
            pageSize: 6,
        },
        type: 'POST',
    }
    commonFn(ajaxinfor, function (data) {
        $('#table tbody').empty();
        $.each(data.dataList, function (k, v) {
            laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: data.pageIndex,
                groups: 5,
                jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷
                        Biao(e.curr)
                    }
                },
                skin: '#009688', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            $('#table tbody').append('<tr data-id="' + v.id + '">' +
                '<td>' + v.id + '</td>' +
                '<td>' + v.name + '</td>' +
                '<td>' + solveTime(v.startTime) + '<span>至</span>' + solveTime(v.endTime) + '</td>' +
                '<td>' + solveTime(v.publishTime) + '</td>' +
                '<td>' + v.volunteerNum + '</td>' +
                '<td><a href="ZhuanYeShuJu.html?id=' + v.id + '" class="chakan">查看</a></td>' +
                '<td><a href="StudentZhongKao.html?id=' + v.id + '" class="chakan">查看</a></td>' +
                '<td>' + v.baoMingNum + '</td>' +
                '<td>' + v.yiLuQuNum + '</td>' +
                '<td>' + v.statusName + '</td>' +
                '<td style="min-width: 210px">' +
                '<div class="box">' +
                '<a class="layui-btn-mini layui-cha layui-btn" href="Luqu.html?id=' + v.id + '">查看录取情况</a>' +
                '<a class="layui-btn-mini layui-Btn1 layui-btn" id="ADcode" data-url="http://yueq.shunzhi.net/yueqing/StudentMove/indexs.html?pid=' + v.id +'">报名录取二维码</a>' +
                '</div>' +
                '<div class="box">' +
                '<a class="layui-btn-mini layui-Bt1 layui-btn" target="_blank" href="http://yueq.shunzhi.net/yueqing/studentweb/index.html?pid=' + v.id + '">报名录取地址</a>' +
                '<a class="layui-btn-mini layui-caozuo layui-btn" href="Operationlog.html?id=' + v.id + '">查看操作日志</a>' +
                '</div>' +
                '<div class="box">' +
                '<a class="layui-btn-mini layui-Ti layui-btn" href="xiugai.html?id=' + v.id + '">编辑</a>' +
                '<a class="layui-btn-mini layui-dan layui-btn" id="delect">删除所有数据</a>' +
                '</div>' +
                '</td>' +
                '</tr>'
            )
        })
    })
}
// 获取每一行的id
//删除一行的所有数据
$('body').on('click', '#delect', function () {
    var ids = $(this).parents('tr').attr("data-id");
    layer.confirm('你确定要删除该栏目吗？', {icon: 3, title: '提示'}, function (index) {
        var ajaxinfor = {
            url: 'SignupManage/DeleteProject?id=' + ids,
            type: 'get'
        }
        commonFn(ajaxinfor, function (res) {
            layer.msg("删除成功", {time: 1000});
            $('tbody').empty();
            Biao(1)
            location.href = 'BaoMingGuanli.html'
        })
        layer.close(index);
    })
});
/*二维码的弹窗事件*/
$('body').on('click', '#ADcode', function () {
    var ll = $(this).attr('data-url');
    // console.log(ll);
    $('#code').empty();
    $("#code").qrcode({
        correctLevel:0,
        width: 320, //宽度
        height: 320, //高度
        text: ll //任意内容
    })
    layer.open({
        type: 1,
        title: '报名录取二维码',
        shade: [0.4, '#000'],
        maxmin: true,
        area: ['600px', '500px'],
        content: $('#erweima')
    })
})
//模板下载
$('body').on('click', '#yingjiesheng', function () {
    window.location.href = window.siteHost + "Filedown/GetModelTemplate?alias=dailijiaoshi";
})
//应届教师数据上传
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload3'
    , title: '应届代填账户上传'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        yingjieul = res.data;
        // console.log(yingjieul);
        Yingjie(yingjieul);
        $('input[name="zhuanye"]').val(yingjieul);
        $('#txtfiles').val(getFileName(yingjieul));
        $('#txtfiles').attr('url', getFileName(yingjieul));
        $('input[name="yingjiesheng"]').show();
        layer.msg('上传成功', {time: 500})
    }
});
function getFileName(u) {
    var arr = u.split('/');
    return arr[arr.length - 1];
}
//将数据地址上传到教师接口

function Yingjie(url){
    commonFn({
        url: "SignupManage/AgentTeacherImport?url="+url,
    },function(res){
        layer.msg(res)
    },function(){
    	layer.closeAll();
    	layer.msg("未找到有效导入数据");
    })
};

function layout() {
    layer.open({
        type: 1,
        title: '报名录取二维码',
        shade: [0.4, '#000'],
        area: ['600px', '500px'],
        content: $('.phoneCode')
    })
}




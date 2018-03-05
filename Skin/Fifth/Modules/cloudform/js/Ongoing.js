/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:30:39
 * @version $Id$
 */
var form = layui.form(),
    userid = userid = getCookieByUserInfo('userid');
dataAjax();
$('.search').click(function() {
    dataAjax($('#select').val(), $('input[name="Title"]').val());
})

function dataAjax(status, title, curr) {
    commonFn({
        url: 'CloudForm/Ongoing',
        data: {
            status: status || -1,
            Title: title,
            PageIndex: curr || 1
        },
        type: 'post'
    }, function(data) {
        $('tbody').empty();
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
        var t = data.resultsData;
        for (var i = 0; i < t.length; i++) {
            var isrepeat = t[i].isRepeat,
                IsOpen = t[i].isOpen
            username = t[i].userName,
                isPartake = t[i].isReadName,
                isPartakeOk = '', look = '', modify = '', seflUrl = t[i].htmlData, num = GetSkin(),
                copyUrl = '<a class="layui-btn layui-btn-mini copy" data-clipboard-text="http://' + seflUrl + '/Web/Skin/' + num + '/Modules/CloudForm/formobsoleteedit.html?ids=' + t[i].formId + '&formmanage=1&schoolid=' + window.schoolid + '">复制地址</a>';

            if (IsOpen == 1) {
                IsOpen = "是";
            } else if (IsOpen == 0) {
                IsOpen = "否";
                copyUrl = '';
            }

            if (username == null) {
                username = ""
            } else {
                username = username
            }

            if (isPartake == "未参与") {
                isPartakeOk = '<a href="formongoingedit.html?id=' + t[i].formId + '" class="layui-btn layui-btn-normal layui-btn-mini">参与</a>'
            } else {
                look = '<a href="formongoingedit.html?did=' + t[i].formId + '" class="layui-btn layui-btn-mini">查看</a>';
                if (isrepeat == 1) {
                    modify = '<a href="formongoingedit.html?sid=' + t[i].formId + '&isEdit=1" class="layui-btn layui-btn-normal layui-btn-mini">修改</a>';
                }
            }

            $('<tr data-id="' + t[i].formId + '">' +
                '<td>' + t[i].formId + '</td>' +
                '<td>' + t[i].title + '</td>' +
                '<td>' + t[i].validTime + '</td>' +
                '<td>' + IsOpen + '</td>' +
                '<td>' + t[i].isReadName + '</td>' +
                '<td>' + look + isPartakeOk + modify + copyUrl + '<a class="layui-btn layui-btn-mini qrcode" data-title="' + t[i].title + '" data-qrcodeurl="http://' + seflUrl + '/Web/Skin/' + num + '/Modules/CloudForm/formobsoleteedit.html?ids=' + t[i].formId + '&formmanage=1&schoolid=' + window.schoolid + '" >扫二维码</a>' +
                '</td>' +
                '</tr>').appendTo('tbody');
        }
        var clip = new ZeroClipboard($(".copy"));
        clip.on("copy", function() {
            layer.msg("复制成功");
        });
        $('.qrcode').on('click', function() {
            var $this = $(this);
            $('#qrcode').empty();
            $('#qrcode').append('<h3 style="font-size:28px;text-align:center; color:#000;" id="codeTitle">' + $this.attr('data-title') + '</h3>');
            $('#qrcode').qrcode({
                width: 250,
                height: 214,
                text: $this.attr('data-qrcodeurl')
            });
            layer.open({
                title: false,
                type: 1,
                shadeClose: true,
                closeBtn: 0,
                area: ['260px', '280px'],
                content: $('#qrcode')
            })
        })
    })
}
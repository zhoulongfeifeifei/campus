
console.log(window.location.search)
var curr = new Date();
var y = curr.getFullYear(),
    M = curr.getMonth() + 1,
    d = curr.getDate();
var stm = window.location.search.split('&')
var num = stm[0].replace('?deviceid=', '');
var name = decodeURI(stm[1].replace('name=', ''));
$('.main-wrap .topbar .classname').html(name);
$('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .bottom .s1').html(name);
$('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .bottom .s2').html(y + '年' + M + '月' + d + '日')

$('#return').click(function(){
    $(this).attr('href','template.html?id=' + num + '&name=' + name)
})

var data = {};
data.flag = 1;
data.schoolId = window.schoolid;
data.deviceId = num;
// data.pageIndex = 1;

commonFn({ url: 'XAWebCommon/GetList_NoticeByDevice', type: 'POST', data: data }, function (res) {
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .t').html(res.resultData[0].title);
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .info table tr td').html(res.resultData[0].detail);
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .bottom .s1').html(res.resultData[0].signName);
    var laypage = layui.laypage;
    aa();
    function aa(current) {
        var total = res.pageCount;
        data.pageIndex = current;
        commonFn({ url: 'XAWebCommon/GetList_NoticeByDevice', type: 'POST', data: data }, function (res) {
            var info = res.resultData;
            laypage({
                cont: 'page',
                pages: total,
                curr: current,
                groups: 5,
                jump: function (e, first) {
                    if (!first) {
                        aa(e.curr);
                    }
                },
                skin: '#319c65',
                first: '首页',
                last: '尾页',
                prev: false,
                next: false
            });
            $('#box-con #form1 .table table tbody').empty();
            $.each(info, function (i) {
                $('#box-con #form1 .table table tbody').append('<tr><td>' + (i + 1) + '</td><td class="w-150"><p class="text-shenglue w-150">' + info[i].detail +
                    '</p></td><td>' + info[i].signName +
                    '</td><td class="caozuo"><a class="text link edit" data_id="' + info[i].id + '">编辑</a>&nbsp;&nbsp;<a class="text red link del" data_id="' + info[i].id + '">删除</a></td></tr>')
            })

            $(".del").click(function () {
                var id = $(this).attr("data_id");
                var tr = $(this).parent().parent("tr");
                if (confirm("确定删除吗？")) {
                    commonFn({ url: 'XAWebCommon/Delete_Notice?id=' + id, type: 'GET' }, function (res) {
                        if (res == true) $(tr).remove();
                    })
                }
            });
            $(".edit").click(function () {
                $('#box-add').css('display','inline-block');
                $('#box-con').css('display','none');
                var id = $(this).attr("data_id");
                commonFn({ url: 'XAWebCommon/Get_Notice?id=' + id, type: 'GET' }, function (res) {
                    console.log(res)
                    // $('#box-add #endtimeint').val();
                    $('#box-add #title').val(res.title);
                    $('#box-add #detail').val(res.detail);
                    $('#box-add #signname').val(res.signName);
                    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .t').html($('#box-add #title').val());
                    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .info table tr td').html($('#box-add #detail').val());
                    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .bottom .s1').html($('#box-add #signname').val());
                })
                
                $('#save').click(function () {
                    commonFn({ url: 'XAWebCommon/Delete_Notice?id=' + id, type: 'GET' }, function (res) {
                        // if (res == true) $(tr).remove();
                    })
                })
            });

        })
    }
})


if (getCookieByUserInfo().logintype == 'teacher') {
    role = 1
} if (getCookieByUserInfo().logintype == 'admin') {
    role = 10
}
var model = {};
model.id = 0;
model.flag = 1;
model.deviceType = 2;
model.schoolId = window.schoolid;
model.userId = getCookieByUserInfo().userid;
model.roleType = role;
model.device = num;
$('#save').click(function(){
    var time = $('#box-add #endtimeint').val();
    var title = $('#box-add #title').val();
    var cont = $('#box-add #detail').val();
    var sign = $('#box-add #signname').val() ? $('#box-add #signname').val() : '0';
    if (time == '') {
        alert('持续时间必须填写');
        return;
    } if (title == '') {
        alert('标题必须填写');
        return;
    } if (cont == '') {
        alert('内容必须填写');
        return;
    } else {
        
        model.detail = cont;
        model.seconds = time;
        model.title = title;
        model.signName = sign;
        model.type = 0;
        commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: model }, function (res) {
            console.log(res);
            if (res == true) {
                $('#box-add').css('display','none');
                $('#box-con').css('display','inline-block');
                // window.onresize = function () { location = location };
                history.go(0)
            }
        })
    }
})

$('#box-add #form1 .form #title').keyup(function(){
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .t').html($(this).val());
})
$('#box-add #form1 .form #detail').keyup(function(){
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .info table tr td').html($(this).val());
})
$('#box-add #form1 .form #signname').keyup(function(){
    $('.main-wrap .fullbox .lunbo-box .hiSlider .hiSlider-item .bottom .s1').html($(this).val());
})







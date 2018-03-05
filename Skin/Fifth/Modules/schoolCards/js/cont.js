
var temp = window.location.search;
var str1 = temp.split("&");
var num = str1[0].replace('?clint_id=', '');
var pos = decodeURI(str1[1].replace('position=', ''));
var temid = str1[2].replace('temid=', '');
$('#num').html('设备编号：' + num);
$('#po').html('设备位置：' + pos);
var date = new Date();
var y = date.getFullYear(),
    M = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    m = (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes(),
    w = date.getDay();
if (w == 0) {
    w = '星期天'
} if (w == 1) {
    w = '星期一'
} if (w == 2) {
    w = '星期二'
} if (w == 3) {
    w = '星期三'
} if (w == 4) {
    w = '星期四'
} if (w == 5) {
    w = '星期五'
} if (w == 6) {
    w = '星期六'
}

commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
    if (res == null) {
        $("head").append("<link>");
        css = $("head").children(":last");
        css.attr({
            rel: "stylesheet",
            type: "text/css",
            href: "css/cont.css"
        });

        $('.vF-panel .box').append('<div class="container"><div class="tuwenlunbo hover">图文轮播</div><div class="Notice">通知公告</div>' +
            '<div class="date"><img src="img/clock.png" alt=""><p class="today"></p><p class="datenow"></p><p class="weeknow"></p></div>' +
            '<div class="weather"><img src="img/camera.png" alt=""><p class="tianqipz">天气/拍照</p></div><div class="clear"></div>' +
            '<div class="attendance">考勤统计区</div><div class="emergent">紧急插播</div></div><iframe src="Lunbo.html" frameborder="0"></iframe>')
        $('.vF-panel .box .container .date .today').html(y + '年' + M + '月' + d + '日');
        $('.vF-panel .box .container .date .datenow').html(h + ':' + m);
        $('.vF-panel .box .container .date .weeknow').html(w);
        $('.Notice').click(function (event) {
            $(this).addClass('hover').siblings().removeClass('hover')
            $('iframe').attr('src', 'Notice.html?clint_id=' + num);
        });
    } else {
        if (res.templateId == 1 || res.templateId == 0 || res.templateId == null || res.templateId == '') {
            $("head").append("<link>");
            css = $("head").children(":last");
            css.attr({
                rel: "stylesheet",
                type: "text/css",
                href: "css/cont.css"
            });

            $('.vF-panel .box').append('<div class="container"><div class="tuwenlunbo hover">图文轮播</div><div class="Notice">通知公告</div>' +
                '<div class="date"><img src="img/clock.png" alt=""><p class="today"></p><p class="datenow"></p><p class="weeknow"></p></div>' +
                '<div class="weather"><img src="img/camera.png" alt=""><p class="tianqipz">天气/拍照</p></div><div class="clear"></div>' +
                '<div class="attendance">考勤统计区</div><div class="emergent">紧急插播</div></div><iframe src="Lunbo.html" frameborder="0"></iframe>')
            $('.vF-panel .box .container .date .today').html(y + '年' + M + '月' + d + '日');
            $('.vF-panel .box .container .date .datenow').html(h + ':' + m);
            $('.vF-panel .box .container .date .weeknow').html(w);
            $('.Notice').click(function (event) {
                $(this).addClass('hover').siblings().removeClass('hover')
                $('iframe').attr('src', 'Notice.html?clint_id=' + num);
            });
        } if (res.templateId == 2) {
            $("head").append("<link>");
            css = $("head").children(":last");
            css.attr({
                rel: "stylesheet",
                type: "text/css",
                href: "css/cont2.css"
            });

            $('.vF-panel .box').append('<div class="container"><div class="tuwenlunbo hover">图文轮播</div>' +
                '<div class="date"><p class="week"></p><p class="datenow">16:01</p><p class="datetoday"></p></div>' +
                '<div class="weather"><img src="img/weather.png" alt=""><p class="duoyun" style="line-height: 20px;">多云</p><p style="line-height: 20px;">9~4℃</p></div>' +
                '<div class="camera"><img src="img/camera.png" alt=""><p style="line-height: 30px;">摄像头</p></div><div class="Notice ">通知公告</div>' +
                '<div class="emergent">紧急插播</div></div><iframe src="Lunbo.html" frameborder="0"></iframe>')
            $('.vF-panel .box .container .date .datetoday').html(y + '-' + M + '-' + d);
            $('.vF-panel .box .container .date .datenow').html(h + ':' + m);
            $('.vF-panel .box .container .date .week').html(w);
            $('.Notice').click(function (event) {
                $(this).addClass('hover').siblings().removeClass('hover')
                $('iframe').attr('src', 'notice2.html?clint_id=' + num);
            });
        }
    }
    
    
    $('iframe').attr('src', 'Lunbo.html?clint_id=' + num);
    $('.tuwenlunbo').click(function (event) {
        $(this).addClass('hover').siblings().removeClass('hover')
        $('iframe').attr('src', 'Lunbo.html?clint_id=' + num);
    });

    $('.emergent').click(function (event) {
        $(this).addClass('hover').siblings().removeClass('hover')
        $('iframe').attr('src', 'Emergent.html?clint_id=' + num);
    });
})














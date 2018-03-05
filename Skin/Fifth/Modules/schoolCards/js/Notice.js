

var date = new Date();
var y = date.getFullYear(),
    M = ((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1),
    d = date.getDate(),
    h = date.getHours(),
    m = (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes(),
    s = (date.getSeconds() < 10) ? ('0' + date.getSeconds()) : date.getSeconds();
var curr = y + '-' + M + '-' + d + 'T' + h + ':' + m + ':' + s;


console.log(window.location.href)

if (window.location.search.indexOf('?id=') != -1) {

    var data = {};
    data.flag = 0;
    data.schoolId = window.schoolid;
    data.deviceType = 1;
    // data.pageIndex = 1;

    commonFn({ url: 'XAWebCommon/GetList_Notice', type: 'POST', data: data }, function (res) {
        var laypage = layui.laypage;
        aa();
        function aa(current) {
            var total = res.pageCount;
            data.pageIndex = current;
            commonFn({ url: 'XAWebCommon/GetList_Notice', type: 'POST', data: data }, function (res) {
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
                $('.table table tbody').empty();
                $.each(info, function (i) {
                    if (info[i].endTime < curr) {
                        t = '(<label class="red">已过期</label>)';
                    } else {
                        t = '';
                    }
                    if (info[i].state == 1) {
                        st = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>';
                    } if (info[i].state == 2) {
                        st = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>';
                    }
                    var intime = info[i].intime.replace('T', ' ').substr(0, 19);
                    var publishDate = info[i].publishDate.replace('T', ' ').substr(0, 19);
                    $('.table table tbody').append('<tr><td>' + info[i].title + '</td><td ><p class="text-shenglue" style="width: 300px;">' + info[i].detail +
                        '</p></td><td>' + intime + '</td><td>' + publishDate + '</td><td>' + st + t + '</td><td>' +
                        info[i].name + '</td><td class="edit"><a class="text link" href="addNotice.html?clint=' + info[i].device + '&id=' + info[i].id + '&sta=' + info[i].state + '">编辑</a>' +
                        '<a class="text green link publish" val="' + info[i].id + '" data_id="' + info[i].device + '">重新发布</a>' +
                        '<a class="text red link del" val="' + info[i].id + '">删除</a></td></tr>')
                })

                $(".del").click(function () {
                    var id = $(this).attr("val");
                    var tr = $(this).parent().parent("tr");
                    if (confirm("确定删除吗？")) {
                        commonFn({ url: 'XAWebCommon/Delete_Notice?id=' + id, type: 'GET' }, function (res) {
                            if (res == true) $(tr).remove();
                        })
                    }
                });

                $(".publish").click(function () {
                    var model = {}
                    model.device = $(this).attr('data_id');
                    model.state = 2;
                    model.type = 1;
                    model.id = $(this).attr('val');
                    commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: model }, function (res) {
                        console.log(res);
                        // if (window.location.href.indexOf('Notice.html') != -1) {
                        //     location.href = 'Notice.html' + window.location.search;
                        // } if (window.location.href.indexOf('notice2.html') != -1) {
                        //     location.href = 'notice2.html' + window.location.search;
                        // } 
                        location.href = 'Notice.html' + window.location.search;
                        // window.history.back(-1)
                    })
                });
            })
        }
    })

} else {
    var num = window.location.search.replace('?clint_id=', '');
    $('#add').attr('href', 'addNotice.html?clint_id=' + num);

    var data = {};
    data.flag = 0;
    data.schoolId = window.schoolid;
    data.deviceId = num;
    // data.pageIndex = 1;

    commonFn({ url: 'XAWebCommon/GetList_NoticeByDevice', type: 'POST', data: data }, function (res) {
        var laypage = layui.laypage;
        aa();
        function aa(current) {
            var total = res.pageCount;
            data.pageIndex = current;
            commonFn({ url: 'XAWebCommon/GetList_NoticeByDevice', type: 'POST', data: data }, function (res) {
                var info = res.resultData;
                console.log(info)
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
                $('.table table tbody').empty();
                $.each(info, function (i) {
                    if (info[i].endTime < curr) {
                        t = '(<label class="red">已过期</label>)';
                    } else {
                        t = '';
                    }
                    if (info[i].state == 1) {
                        st = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>';
                    } if (info[i].state == 2) {
                        st = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>';
                    }
                    var intime = info[i].intime.replace('T', ' ').substr(0, 19);
                    var publishDate = info[i].publishDate.replace('T', ' ').substr(0, 19);
                    $('.table table tbody').append('<tr><td>' + info[i].title + '</td><td ><p class="text-shenglue" style="width: 300px;">' + info[i].detail +
                        '</p></td><td>' + intime + '</td><td>' + publishDate + '</td><td>' + st + t + '</td><td>' +
                        info[i].name + '</td><td class="edit"><a class="text link" href="addNotice.html?clint_id=' + num + '&id=' + info[i].id + '&sta=' + info[i].state + '">编辑</a>' +
                        '<a class="text green link publish" val="' + info[i].id + '">重新发布</a>' +
                        '<a class="text red link del" val="' + info[i].id + '">删除</a></td></tr>')
                })

                $(".del").click(function () {
                    var id = $(this).attr("val");
                    var tr = $(this).parent().parent("tr");
                    if (confirm("确定删除吗？")) {
                        commonFn({ url: 'XAWebCommon/Delete_Notice?id=' + id, type: 'GET' }, function (res) {
                            if (res == true) $(tr).remove();
                        })
                    }
                });

                // 重新发布
                $(".publish").click(function () {
                    var model = {}
                    model.device = num;
                    model.state = 2;
                    model.type = 1;
                    model.id = $(this).attr('val');
                    commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: model }, function (res) {
                        console.log(res);

                        // window.history.back(-1)
                    })
                    commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
                        templaid = res.templateId
                        commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=2', type: 'GET' }, function (res) {
                            console.log(res);
                            if (window.location.href.indexOf('Notice.html') != -1) {
                                location.href = 'Notice.html' + window.location.search;
                            } if (window.location.href.indexOf('notice2.html') != -1) {
                                location.href = 'notice2.html' + window.location.search;
                            }
                            type = 2;
                        })
                    })

                });

            })
        }
    })

}





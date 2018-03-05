
console.log(window.location.href)
var temp = window.location.search;
var str1 = temp.split("&");
var num = str1[0].replace('?clint_id=', '');
if (str1.length > 1) {
    id = str1[1].replace('id=', '');
    sta = str1[2].replace('sta=', '');
}
var model = {};
model.schoolId = window.schoolid;

commonFn({ url: 'XAWebBanpai/Get_AttendanceExts', type: 'POST', data: model }, function (res) {
    // $('#wei').empty().append('<span class="text">选择您本次编辑的电子屏设备位置</span><br />' +
    // '<div class="clearfix w-550" style="padding-bottom: 16px;"><input placeholder="班级名称" id="txtLocal" /><a class="btn btn-blue" id="search">搜索</a></div> ')
    $.each(res, function (i) {
        $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
            '"  />&nbsp;' + res[i].roomName + '（' + res[i].clint_id + '）</span>')
    })
    var isid = str1[0].replace('?clint=', '');
    console.log(isid);
    for (j = 0; j < $('#wei input[type="checkbox"]').length; j++) {
        if (isid.indexOf($('#wei input[type="checkbox"]')[j].value) != -1) {
            $('#wei input[type="checkbox"]').eq(j).prop('checked', true);
        }
    }
})


$('#search').click(function () {
    var val = $('#txtLocal').val();
    if ($('#txtLocal').val() != '') {
        var model = {};
        model.schoolId = window.schoolid;
        model.roomName = val;
        commonFn({ url: 'XAWebBanpai/Get_AttendanceExts', type: 'POST', data: model }, function (res) {
            $('#wei div+br~span').remove()
            $.each(res, function (i) {
                $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
                    '"  />&nbsp;' + res[i].roomName + '（' + res[i].clint_id + '）</span>')
            })
        })
    } else {
        var model = {};
        model.schoolId = window.schoolid;
        commonFn({ url: 'XAWebBanpai/Get_AttendanceExts', type: 'POST', data: model }, function (res) {
            $('#wei div+br~span').remove()
            $.each(res, function (i) {
                $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
                    '"  />&nbsp;' + res[i].roomName + '（' + res[i].clint_id + '）</span>')
            })
        })
    }
})







if (window.location.href.indexOf('&id') != -1 && sta == 2) {
    $('#Nopublish').css('display', 'inline-block');
    commonFn({ url: 'XAWebCommon/Get_Notice?id=' + id, type: 'GET' }, function (res) {
        console.log(res)
        // $('#endTime').val(res.seconds);
        $('input[name="title"]').val(res.title);
        $('#detail').val(res.detail);
    })
    $('#save').click(function () {
        data.id = id;
    })

    $('#saveNotPub').click(function () {
        data.id = id;
    });
    $('#Nopublish').click(function () {
        var devices = "";
        var devicelen = $('.device:checked').length - 1;
        $('.device:checked').each(function (i) {
            var $this = $(this);
            if ($('.device:checked').length > 0) {
                // console.log($this.val())
                devices += $this.val();
                if (i != devicelen) {
                    devices += ",";
                }
            }
        });

        var time = $('#endtimeint').val();
        var title = $('input[name="title"]').val();
        var cont = $('#detail').val();
        var sign = $('input[name="signname"]').val() ? $('input[name="signname"]').val() : '0';
        if (time == '') {
            alert('持续时间必须填写');
            return;
        } if (title == '') {
            alert('标题必须填写');
            return;
        } if (cont == '') {
            alert('内容必须填写');
            return;
        } if ($('input[type="checkbox"]:checked').length <= 0) {
            alert('请至少选择一个电子屏');
            return;
        } else {
            data.device = devices;
            data.state = 1;
            data.type = 1;
            data.id = id;
            data.detail = cont;
            data.seconds = time;
            data.title = title;
            data.signName = sign;
            commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
                console.log(res);
                // location.href = 'Notice.html?clint_id=' + num;
                window.history.back(-1)
            })
        }


    });
}

if (window.location.href.indexOf('&id') != -1 && sta == 1) {
    $('#publish').css('display', 'inline-block');
    commonFn({ url: 'XAWebCommon/Get_Notice?id=' + id, type: 'GET' }, function (res) {
        console.log(res)
        // $('#endTime').val(res.seconds);
        $('input[name="title"]').val(res.title);
        $('#detail').val(res.detail);
    })
    $('#save').click(function () {
        data.id = id;
    })

    $('#saveNotPub').click(function () {
        data.id = id;
    });
    $('#publish').click(function () {
        var devices = "";
        var devicelen = $('.device:checked').length - 1;
        $('.device:checked').each(function (i) {
            var $this = $(this);
            if ($('.device:checked').length > 0) {
                // console.log($this.val())
                devices += $this.val();
                if (i != devicelen) {
                    devices += ",";
                }
            }
        });

        var time = $('#endtimeint').val();
        var title = $('input[name="title"]').val();
        var cont = $('#detail').val();
        var sign = $('input[name="signname"]').val() ? $('input[name="signname"]').val() : '0';
        if (time == '') {
            alert('持续时间必须填写');
            return;
        } if (title == '') {
            alert('标题必须填写');
            return;
        } if (cont == '') {
            alert('内容必须填写');
            return;
        } if ($('input[type="checkbox"]:checked').length <= 0) {
            alert('请至少选择一个电子屏');
            return;
        } else {
            data.device = devices;
            data.state = 2;
            data.type = 1;
            data.id = id;
            data.detail = cont;
            data.seconds = time;
            data.title = title;
            data.signName = sign;
            commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
                console.log(res);
                // location.href = 'Notice.html?clint_id=' + num;
                window.history.back(-1)
                
            })
            
        }


    });
}



getCookieByUserInfo();
if (getCookieByUserInfo().logintype == 'teacher') {
    role = 1
} if (getCookieByUserInfo().logintype == 'admin') {
    role = 10
}

var data = {};
data.id = 0;
data.flag = 1;
data.deviceType = 2;
data.schoolId = window.schoolid;
data.userId = getCookieByUserInfo().userid;
data.roleType = role;


$('#save').click(function () {
    var devices = "";
    var devicelen = $('.device:checked').length - 1;
    $('.device:checked').each(function (i) {
        var $this = $(this);
        if ($('.device:checked').length > 0) {
            // console.log($this.val())
            devices += $this.val();
            if (i != devicelen) {
                devices += ",";
            }
        }
    });
    // console.log(devices);

    var time = $('#endtimeint').val();
    var title = $('input[name="title"]').val();
    var cont = $('#detail').val();
    var sign = $('input[name="signname"]').val() ? $('input[name="signname"]').val() : '0';
    if (time == '') {
        alert('持续时间必须填写');
        return;
    } if (title == '') {
        alert('标题必须填写');
        return;
    } if (cont == '') {
        alert('内容必须填写');
        return;
    } if ($('input[type="checkbox"]:checked').length <= 0) {
        alert('请至少选择一个电子屏');
        return;
    } else {
        data.device = devices;
        data.detail = cont;
        data.seconds = time;
        data.title = title;
        data.signName = sign;
        data.type = 0;
        commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
            console.log(res);
            window.history.back(-1)
        })
    }
})

$('#saveNotPub').click(function () {
    var devices = "";
    var devicelen = $('.device:checked').length - 1;
    $('.device:checked').each(function (i) {
        var $this = $(this);
        if ($('.device:checked').length > 0) {
            // console.log($this.val())
            devices += $this.val();
            if (i != devicelen) {
                devices += ",";
            }
        }
    });

    var time = $('#endtimeint').val();
    console.log(time)
    var title = $('input[name="title"]').val();
    var cont = $('#detail').val();
    var sign = $('input[name="signname"]').val() ? $('input[name="signname"]').val() : '0';
    if (time == '') {
        alert('持续时间必须填写');
        return;
    } if (title == '') {
        alert('标题必须填写');
        return;
    } if (cont == '') {
        alert('内容必须填写');
        return;
    } if ($('input[type="checkbox"]:checked').length <= 0) {
        alert('请至少选择一个电子屏');
        return;
    } else {
        data.device = devices;
        data.detail = cont;
        data.seconds = time;
        data.title = title;
        data.signName = sign;
        data.type = 2;
        console.log(data.seconds)
        commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
            console.log(res);
            window.history.back(-1)
        })
    }

});


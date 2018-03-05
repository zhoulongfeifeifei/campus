
console.log(window.location.href)
var temp = window.location.search;
var str1 = temp.split("&");
var num = str1[0].replace('?clint_id=', '');
if (str1.length > 1) {
    id = str1[1].replace('id=', '');
    sta = str1[2].replace('sta=', '');
}
if (window.location.search.indexOf('?clint_id=') != -1) {
    $('#wei').append('<span style="margin-right: 24px; white-space: nowrap;"><input class="device" type="checkbox" checked="checked" name="device" value="' + num +
        '"  />&nbsp;' + num + '</span>')
} else {
    commonFn({ url: 'XAWebXiaopai/GetList_Device?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
        $.each(res, function (i) {
            $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
                '"  />&nbsp;' + res[i].clint_id + '</span>')
        })
        var isid = str1[0].replace('?clint=', '');
        console.log(isid);
        for (j = 0; j < $('#wei input[type="checkbox"]').length; j++) {
            if (isid.indexOf($('#wei input[type="checkbox"]')[j].value) != -1) {
                $('#wei input[type="checkbox"]').eq(j).prop('checked', true);
            }
        }
    })


}



if (window.location.href.indexOf('&id') != -1 && sta == 2) {
    $('#Nopublish').css('display', 'inline-block');
    commonFn({ url: 'XAWebCommon/Get_Notice?id=' + id, type: 'GET' }, function (res) {
        var endTime = res.endTime.replace('T', ' ').substr(0, 19);
        $('.layui-input').val(endTime);
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

         if ($('input[type="checkbox"]:checked').length <= 0) {
            alert('请至少选择一个电子屏');
            return;
        } else {
            data.device = devices;
            data.state = 1;
            data.type = 1;
            data.id = id;
            commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
                console.log(res);
                // location.href = 'Notice.html?clint_id=' + num;
                window.history.back(-1)
                type = 2;
            })
        }


    });
}

if (window.location.href.indexOf('&id') != -1 && sta == 1) {
    $('#publish').css('display', 'inline-block');
    commonFn({ url: 'XAWebCommon/Get_Notice?id=' + id, type: 'GET' }, function (res) {
        var endTime = res.endTime.replace('T', ' ').substr(0, 19);
        $('.layui-input').val(endTime);
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

        if ($('input[type="checkbox"]:checked').length <= 0) {
            alert('请至少选择一个电子屏');
            return;
        } else {
            data.device = devices;
            data.state = 2;
            data.type = 1;
            data.id = id;
            commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
                console.log(res);
                // location.href = 'Notice.html?clint_id=' + num;
                
            })
            commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
                templaid = res.templateId
                commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=2', type: 'GET' }, function (res) {
                    console.log(res);
                    window.history.back(-1)
                    type = 2;
                })
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
data.flag = 0;
data.deviceType = 1;
data.schoolId = window.schoolid;
data.userId = getCookieByUserInfo().userid;
data.roleType = role;
data.signName = '0';

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

    var time = $('.layui-input').val();
    var title = $('input[name="title"]').val();
    var cont = $('#detail').val();
    if (time == '') {
        alert('截止时间必须填写');
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
        data.endTime = time;
        data.title = title;
        data.type = 0;
        commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
            console.log(res);            
            window.history.back(-1)
            
        })
        if (window.location.href.indexOf('&id') != -1) {
            commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
                templaid = res.templateId
                commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=2', type: 'GET' }, function (res) {
                    console.log(res);
                    window.history.back(-1)
                    type = 2;
                })
            })
        }
        

        
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

    var time = $('.layui-input').val();
    var title = $('input[name="title"]').val();
    var cont = $('#detail').val();
    if (time == '') {
        alert('截止时间必须填写');
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
        data.endTime = time;
        data.title = title;
        data.type = 2;
        commonFn({ url: 'XAWebCommon/Update_Notice', type: 'POST', data: data }, function (res) {
            console.log(res);
            window.history.back(-1)
            type = 2;
        })
    }

});


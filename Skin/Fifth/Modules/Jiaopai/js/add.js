
var dada = {};
dada.schoolId = window.schoolid;
commonFn({ url: 'XAWebBanpai/Get_AttendanceExts', type: 'POST', data:dada }, function (res) {
    $.each(res, function (i) {
        $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
            '"  />&nbsp;' + res[i].roomName + '（' + res[i].clint_id + '）</span>')
    })
})
/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:27:38
 * @version $Id$
 */

var id = getUrlParam('id'),
    form = layui.form(),
    ForEver,
    IsRepeat,
    IsOpen;

commonFn({
    url: 'CloudForm/SettingShow',
    data: {
        Id: id,
        formmanage: 2
    }
}, function(data) {
    // 标题
    $('input[name="Title"]').val(data.title);
    // 开始时间
    $('#BeginTime').val(data.beginTime ? solveTime(data.beginTime) : conversionTime2(new Date()));
    var endtime = solveTime(data.endTime);
    if (!endtime) {
        $('#ForEver').attr('checked', 'checked');
        $('#EndTime').attr('disabled', 'disabled');
        ForEver = true;
    } else {
        $('#ForEver').removeAttr('checked');
        $('#EndTime').removeAttr('disabled');
        $('#EndTime').val(endtime);
        ForEver = false;
    }

    if (data.isOpen == 0) {
        // 不开放;
        $('#IsOpen').removeAttr('checked');
        IsOpen = false
    } else {
        $('#IsOpen').attr('checked', 'checked');
        IsOpen = true
    }
    if (data.isRepeat == 0) {
        // 不允许重复
        $('#IsRepeat').removeAttr('checked');
        IsRepeat = false
    } else {
        $('#IsRepeat').attr('checked', 'checked');
        IsRepeat = true
    }
    form.render()

})
$(".forever").change(function() {
    if ($(this).attr("checked")) {
        $("#EndTime").attr("disabled", "disabled");
    } else {
        $("#EndTime").removeAttr("disabled");
    }
});
$(".isopen").change(function() {
    if ($(this).attr("checked")) {
        $(".isrepeat").attr("checked", "checked");
    }
});
$(".isrepeat").change(function() {
    if ($(".isopen").attr("checked")) {
        $(".isrepeat").attr("checked", "checked");
    }
});

form.on('switch(ForEver)', function(data) {

    ForEver = data.elem.checked; //开关是否开启，true或者false
    if (ForEver) {
        $('#EndTime').attr('disabled', 'disabled')
    } else {

        $('#EndTime').removeAttr('disabled')
    }
});
form.on('switch(IsRepeat)', function(data) {

    IsRepeat = data.elem.checked; //开关是否开启，true或者false

});
form.on('switch(IsOpen)', function(data) {
    IsOpen = data.elem.checked; //开关是否开启，true或者false
});

$('#Sava').click(function() {
    var model = {};
    model.Id = id;
    model.Title = $('input[name="Title"]').val();
    model.BeginTime = $('#BeginTime').val();
    // 是否永久
    model.ForEver = ForEver;

    if (!model.ForEver) {
        model.EndTime = $('#EndTime').val();
    }
    model.isnow = undefined;
    model.IsOpen = IsOpen;
    model.IsRepeat = IsRepeat;
    commonFn({
        url: 'CloudForm/Setting',
        type: 'post',
        data: model
    }, function(data) {
        layer.msg("设置成功", {
            offset: 0,
            shift: 5,
            time: 1000
        }, function() {
            location.href = "History.html";
        })
    })
});


commonFn({ url: 'XAWebXiaopai/GetList_Device?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
    $.each(res,function(i){
        $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input type="checkbox" name="device" class="device" value="' +
        res[i].clint_id + '"  />&nbsp;' + res[i].clint_id + '</span>');
    })
})


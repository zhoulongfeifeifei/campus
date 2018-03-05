

console.log(window.location.href);
var num = window.location.search.replace('?sno=', '');
$('#upload').attr('href','upload.html' + window.location.search)
commonFn({ url: 'XAWebBanpai/Get_AllScreen?sno=' + num + '&deviceid=0', type: 'GET' }, function (res) {
    console.log(res)
    if (res.state == 1) {
        sta = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>'
    } if (res.state == 2) {
        sta = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>'
    }
    $('#sta').prepend(sta)
    var str1 = res.deviceids.split(",");
    var sc = res.allScreen;
    console.log(str1)
    $.each(str1,function(i){
        $('#num').append('<input type="checkbox" name="device" class="device" value="' + str1[i] + '" />' + str1[i]);
    })
    for (j = 0; j < $('#num input[type="checkbox"]').length; j++) {
        if (str1.indexOf($('#num input[type="checkbox"]')[j].value) != -1) {
            $('#num input[type="checkbox"]').eq(j).prop('checked', true);
        }
    }
    $.each(sc,function(i){
        $('.ace-thumbnails').append('<li style="padding-bottom: 25px; border: 0"><a href="' + sc[i].img +
                '" data-rel="colorbox"></a><img width="150" height="84" style="display: block;" src="' + sc[i].img +
                '" /><div class="tools tools-bottom" data-id="' + sc[i].id +
                '"><a href="javascript:;" class="delete"><i class="ace-icon fa fa-times red"></i></a></div></li>');
    })
    $(".delete").click(function () {
        var id = $(this).parent().attr("data-id");
        var li = $(this).parent().parent("li");
        if (confirm("是否删除该照片")) {
            commonFn({ url: 'XAWebBanpai/Delete_BaPing?id=' + id, type: 'GET' }, function (res) {
                // console.log(res)
                if (res == true) $(li).remove();
            })
        }
    });
    
    $('#publish').click(function () {
        var devices = "";
        var devicelen = $('#num .device:checked').length - 1;
        $('#num .device').each(function (i) {
            var $this = $(this);
            if ($this.is(':checked')) {
                devices += $this.val();
                console.log(devices)
                if (i != devicelen) {
                    devices += ",";
                    console.log(devices)
                }
            }
        });
        console.log(devices)
        commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + devices + '&img=0&sno=' + num + '&message=0&schoolid=' + window.schoolid + '&type=3', type: 'GET' }, function (res) {
            alert(res);
            // history.go(-1)
            location.href = 'screen.html?id=296'
        })
    });

})


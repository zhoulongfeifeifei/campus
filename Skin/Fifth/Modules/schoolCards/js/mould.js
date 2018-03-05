


var temp = window.location.search;
var str1 = temp.split("&");
var num = str1[0].replace('?clint_id=', '');
var pos = decodeURI(str1[1].replace('position=', ''));
var temid = str1[2].replace('temid=', '');
$('#num').html('设备编号：' + num);
$('#po').html('设备位置：' + pos);

commonFn({ url: 'XAWebXiaopai/GetList_XpTemplate', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('.vF-panel .listContainer').append('<li class="singleBox" data-templateid="' + res[i].id + '" id="template' + (i + 1) + '"><img src="' +
            res[i].img + '" alt="" /><div class="textbom"><p>' + res[i].name + '</p></div></li>')
    });
    

    // var templateid = 1;
    // $('ul').find('li').each(function () {
    //     if (templateid == 0)
    //         $("#template1").addClass('bg');
    //     var tid = $(this).attr('data-templateid');
    //     if (tid == templateid)
    //         $(this).addClass('bg');
    // });
    $('ul').find('li').each(function () {
        if($(this).attr('data-templateid') == temid){
            $(this).addClass('bg');
        }
    })
    $('ul li').click(function () {
        $(this).addClass('check').siblings().removeClass('check');
        $(this).addClass('bg');
        $(this).siblings().removeClass('bg');
    });

    $('.save').click(function () {
        var templateid = "";
        $('ul').find('li').each(function () {
            if ($(this).hasClass('bg')) {
                templateid = $(this).attr('data-templateid');
            }
        });
        if (templateid == 0 || templateid == null) {
            alert("请选择模板");
            return false;
        }
        // $.post("/common/Ajax.aspx", { action: "template.save", templateid: templateid, deviceid: "109CB00B375A8D7E" }, function (json) {
        //     if (json.status) {
        //         top.parent.showTips(json.message, 4);
        //         location.href = "BasicSettings.aspx";
        //     } else top.parent.showTips(json.message, 5);
        // }, 'json');
        commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templateid + '&save=0&type=0', type: 'GET' }, function (res) {
            alert(res);
        })
    });


})






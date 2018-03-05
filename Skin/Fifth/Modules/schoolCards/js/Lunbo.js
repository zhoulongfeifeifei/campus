

console.log(window.location.href);
var temp = window.location.href;
var str1 = temp.split("?");
console.log(str1);
var num = str1[0].replace('?clint_id=', '');
// var pos = str1[1].replace('position=', '');

var num = window.location.search.replace('?clint_id=', '');
$('#num').append('<input type="checkbox" name="device" class="device" value="' + num + '" checked="checked" />' + num);
if (window.location.href.indexOf('Lunbo.html') != -1) {
    $('#upload').attr('href', 'upload.html?clint_id=' + num);
    pop = 1;
} if (window.location.href.indexOf('notice2.html') != -1) {
    $('#upload').attr('href', 'upload.html?clint_id=' + num + '&posi=00');
    pop = 2;
}


commonFn({ url: 'XAWebCommon/GetList_LunboByDevice?deviceid=' + num + '&position=' + pop, type: 'GET' }, function (res) {
    if (res == null) {
        $('#sta').empty().append('<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label><br /><label class="text"></label><div class="clr"></div>')
    } else {
        $.each(res, function (i) {
            if (res[i].title == '0') {
                title = ''
            } else {
                title = res[i].title
            }
            $('.ace-thumbnails').append('<li style="padding-bottom: 25px; border: 0"><a href="' + res[i].img +
                '" data-rel="colorbox"></a><img width="150" height="84" style="display: block;" src="' + res[i].img +
                '" /><div class="tools tools-bottom" data-id="' + res[i].id +
                '"><a href="javascript:;" class="delete"><i class="ace-icon fa fa-times red"></i></a></div><input class="title" value="'
                + title + '" style="width: 150px;" /></li>')

        })

        $(".delete").click(function () {
            var id = $(this).parent().attr("data-id");
            var li = $(this).parent().parent("li");
            if (confirm("是否删除该照片")) {
                // $.post("/common/Ajax.aspx", { action: "delimg", "id": id }, function (msg) {
                //     var r = eval("(" + msg + ")");
                //     if (r.status == 1) $(li).remove();
                // });
                commonFn({ url: 'XAWebCommon/Delete_LunboImg?id=' + id, type: 'GET' }, function (res) {
                    if (res == true) $(li).remove();
                })
            }
        });

        $('.title').change(function(){
            var id = $(this).prev().attr("data-id");
            var title = $(this).val() ? $(this).val() : '0';
            commonFn({ url: 'XAWebCommon/Update_ImgTitle?id=' + id + '&title=' + title, type: 'GET' }, function (res) {
                console.log(res);
            })
        })
    }


})

$('#publish').click(function () {
    commonFn({ url: 'XAWebCommon/Update_LunboImg?devideids=' + num + '&img=" "&title=" "&type=0&position=' + pop, type: 'GET' }, function (res) {
        alert(res);
        
    })
});
$('#publisht').click(function () {
    commonFn({ url: 'XAWebCommon/Update_LunboImg?devideids=' + num + '&img=" "&title=" "&type=0&position=' + pop, type: 'GET' }, function (res) {
        // alert(res);

    })
    commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
        templaid = res.templateId
        commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=1', type: 'GET' }, function (res) {
            alert(res);
            type = 1;
        })
    })
    
});
$('#publishr').click(function () {
    
    commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
        templaid = res.templateId
        commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=3', type: 'GET' }, function (res) {
            alert(res);
            type = 3;
        })
    })
    
});

// commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
//     console.log(res);
//     typeid = res.type
//     $('.vF-panel .bar-header input[type="radio"]')
//     if(typeid == 1){
//         $('#img').checked = "checked";
//     }if(typeid == 2){
//         $('#title').checked = "checked";
//     }if(typeid == 3){
//         $('#video').checked = "checked";
//     }else{
//         $('#img').checked = "checked";
//     }
// })


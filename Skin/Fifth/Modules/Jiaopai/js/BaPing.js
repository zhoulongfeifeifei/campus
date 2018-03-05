

$(function () {
    var $mubanWrap = $('.muban-wrap');
    var _mubanWidth = $mubanWrap.width();
    $mubanWrap.width($mubanWrap.width())
    $mubanWrap.height($mubanWrap.width() * 9 / 16);
    // var deviceid = "0BFC8690DB84F51E";
    // if (deviceid != "") {
    //     $("#device").val("0BFC8690DB84F51E");
    // }
})


var stm = window.location.search.split('&')
var deviceid = stm[0].replace('?deviceid=', '');
var name = decodeURI(stm[1].replace('name=', ''));

$('#return').click(function(){
    $(this).attr('href','template.html?id=' + deviceid + '&name=' + name)
})
console.log(window.location.search)

commonFn({ url: 'XAWebBanpai/Get_AllScreen?sno=0&deviceid=' + deviceid, type: 'GET' }, function (res) {
    console.log(res)
    if (res.state == 1 || res.state == 0 || res.state == '' || res.state == null) {
        sta = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>'
    } if (res.state == 2) {
        sta = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>&nbsp;&nbsp;<a class="text link red cancel" val="">取消发布</a>'
        
    }
    $('#device').after(sta)
    if (res.allScreen == null || res.allScreen == '') {
        $('.muban-wrap .imgList').append('<li><a href="#"><img class="muban-wrap" src="img/baping.jpg" alt="图片" /></a></li>')
        sno = '0'
    }
    if (res.allScreen != null && res.allScreen != '') {
        var imgs = res.allScreen;
        sno = imgs[0].sno
        $('.muban-wrap .imgList').empty();
        $.each(imgs, function (i) {
            $('.ace-thumbnails').append('<li style="padding-bottom: 25px; border: 0"><a href="' + imgs[i].img +
                '" data-rel="colorbox"></a><img width="150" height="84" style="display: block;" src="' + imgs[i].img +
                '" /><div class="tools tools-bottom" data-id="' + imgs[i].id +
                '"><a href="javascript:;" class="delete"><i class="ace-icon fa fa-times red"></i></a></div></li>')

            $('.muban-wrap .imgList').append('<li><a href="#"><img class="muban-wrap" src="' + imgs[i].img + '" alt="图片" /></a></li>')
        })
    }

    $('.w_60').attr('href', 'up.html' + stm[0] + '&name=' + name + '&sno=' + sno);
    
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

    var curIndex = 0; //当前index
    var firstimg = $('.imgList li').first().clone(); //复制第一张图片  
    $('.imgList').append(firstimg).width($('.imgList li').length * ($('.imgList img').width()));
    var imgLen = $(".imgList li").length; //图片总数
    var width = imgLen * 700;
    $(".imgList").css("width", width + "px");
    // 定时器自动变换2.5秒每次
    var autoChange = setInterval(function () {
        if (curIndex < imgLen - 1) {
            curIndex++;
        } else {
            curIndex = 0;
            $('.imgList').css({ left: 0 });
        }
        //调用变换处理函数
        changeTo(curIndex);
    }, 2500);
    function changeTo(num) {
        var goLeft = num * 700;
        var picNum = imgLen - 1
        $(".imgList").animate({ left: "-" + goLeft + "px" }, 500);
    }

    $('#publish').click(function () {

        commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + deviceid + '&img=0&sno=' + imgs[0].sno + '&message=0&schoolid=' + window.schoolid + '&type=3', type: 'GET' }, function (res) {
            alert(res);
            history.go(0)
        })
    });
    $('.cancel').click(function () {

        commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + deviceid + '&img=0&sno=' + imgs[0].sno + '&message=0&schoolid=' + window.schoolid + '&type=2', type: 'GET' }, function (res) {
            alert(res);
            history.go(0)
        })
    });

})


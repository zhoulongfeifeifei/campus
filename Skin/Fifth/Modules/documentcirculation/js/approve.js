/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 14:56:09
 * @version $Id$
 */
var form = layui.form(),

    id = getUrlParam('id'),
    $form = $('.layui-form');

commonFn({
    url: 'Offic/GetModel',
    data: {
        id: id
    },
}, function(res) {
    if (res) {
        $form.find('.state').html(res.stateStr);
        $form.find('.date').html(solveTime(res.inTime));
        $form.find('.biaoti').html(res.title);
        $form.find('.faqi').html(res.fromUserName);
        $form.find('.bianhao').html(res.officialNo);
        $form.find('.Content').html(res.content);
        var stepList = res.stepList,
            chaosongList = res.chaoSongList,
            fileList = res.localFileList,
            cloudFileList = res.yunPanFileList;

        // 是只有一个人,所以状态就用当前的状态
        if (stepList && stepList.length > 0) {
            $.each(stepList, function(index, el) {
                $('.shenhe').append('<div>' + el.userName + ':' + el.stateStr + '</div>');
                if (el.userId == localStorage.userId) { //待我审批的
                    if (el.state == 1) { //只有流转中 才能操作
                        $('.btn1,.btn2').css('display', 'inline-block');
                        $('.btn3').css('display', 'none');
                    } else if (el.State == 4) { //只有流转中 才能操作
                        $('.btn1,.btn2').css('display', 'none')
                        $('.btn3').css('display', 'inline-block')
                    } else {
                        $('.btn1,.btn2,.btn3').css('display', 'none')
                    }
                }
            });
        }
        if (chaosongList && chaosongList.length > 0) {
            $.each(chaosongList, function(index, el) {
                $('.chaosong').append('<div>' + el.userName + ';</div>')
            });
        }
        if (fileList && fileList.length > 0) {
            $.each(fileList, function(index, el) {
                $('.fujian').append('<a href=' + el.fileUrl + '>' + el.fileName + '</a>')
            });
        }
        if (cloudFileList && cloudFileList.length > 0) {
            $.each(cloudFileList, function(index, el) {
                $('.fujian').append('<a href=' + el.ossUrl + '>' + el.fileName + '</a>')
            });
        }
        if (!fileList && !cloudFileList) {
            $('#fujian').remove();
        }
    }
})



// 打印按钮  ,jqprint 引用的一个插件 jquery.jqprint-0.3.js
$('.print').click(function(event) {
    $('.layui-form').jqprint();
});

function agreeOfficial(text) {
    layer.confirm("确定" + text + "么", {
        icon: 3,
        title: "提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/AgreeOfficial',
            data: {
                ExamID: id,
                State: 2
            },
            type:'post'
        }, function() {
            location.href = "waitformetoread.html";
        })
    })
}

function refuseOfficial(text) {
    layer.confirm("确定" + text + "么", {
        icon: 3,
        title: "提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/RefuseOfficial',
            data: {
                ExamID: id,
                State: 4
            },
            type:'post'
        }, function() {
            location.href = "waitformetoread.html";
        })
    })
}

function removeOfficial(text) {
    layer.confirm("确定" + text + "么", {
        icon: 3,
        title: "提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/RemoveOfficial?ExamID='+id+'&State='+4,
            type:'delete'
        }, function() {
            location.href = "waitformetoread.html";
        })
    })
}

function xiazai() {
    location.href = "/Home/DownloadOfficial.aspx?id=" + id;
}
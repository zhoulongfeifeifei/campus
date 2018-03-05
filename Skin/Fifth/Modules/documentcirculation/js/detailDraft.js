/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 14:56:09
 * @version $Id$
 */
var form = layui.form(),
    id = getUrlParam('id'),
    sid = getUrlParam('sid'),
    yid = getUrlParam('yid'),
    $form = $('.layui-form');
if (yid) id = yid, $('.print').before('<input type="button" class="layui-btn layui-btn-small layui-btn-disabled" value="已查阅">');
else if (sid) id = sid, $('.print').before('<input type="button" class="layui-btn layui-btn-small consult" value="查阅">');
$('.consult').on('click', function() {
    commonFn({
        url: 'Offic/ReadOfficial',
        data: {
            id: id
        }
    }, function() {
        layer.msg("已查阅");
        $('.consult').remove();
        $('.print').before('<input type="button" class="layui-btn layui-btn-small layui-btn-disabled" value="已查阅">');
    })
})
commonFn({
    url: 'Offic/GetModel',
    data: {
        id: id
    }
}, function(res) {
    if (res) {
        if($(res.stateStr=="审批通过")){
            $('.btn3').hide();
        }
        $form.find('.state').html(res.stateStr);
        $form.find('.date').html(res.inTime);
        $form.find('.biaoti').html(res.title);
        $form.find('.faqi').html(res.fromUserName);
        $form.find('.bianhao').html(res.officialNo);

        $form.find('.Content').html(res.content);
        var stepList = res.stepList,
            chaosongList = res.chaoSongList,

            // 本地文件
            fileList = res.localFileList,
            // 云盘文件
            cloudFileList = res.yunPanFileList;
        // 是只有一个人,所以状态就用当前的状态
        if (stepList && stepList.length > 0) {
            $.each(stepList, function(index, el) {
                $('.shenhe').append('<div>' + el.userName + ':' + el.stateStr + '</div>')
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
                $('.fujian').append('<a href=' + el.oSSUrl + '>' + el.fileName + '</a>')
            });
        }
        if (!fileList && !cloudFileList) {
            $('#fujian').remove();
        }
        if (res.isPublisher == 1 && res.state == 1) { //发布者
            $('.btn3').css('display', 'inline-block')
        }
        if (res.isRead == 1) { //发布者
            $('.consult').css('display', 'none')
        }
    }
})

// 打印按钮  ,jqprint 引用的一个插件 jquery.jqprint-0.3.js
$('.print').click(function(event) {
    $('.layui-form').jqprint();
});

function fuck() {
    layer.confirm("确定撤回么", {
        icon: 3,
        title: "提示"
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'Offic/UndoExamine?id='+id,
            
             type:'delete'
        }, function() {
            layer.msg("撤回成功");
        })
    })
}

function xiazai() {
    location.href = "/Home/DownloadOfficial.aspx?id=" + id;
}
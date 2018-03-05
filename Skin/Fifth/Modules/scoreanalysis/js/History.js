getHistoryList();


$(".view").click(function() {
    var $form = $(this).parent();
    if ($form.hasClass("showview")) {
        $form.removeClass("showview");
    } else {
        $(".showview").each(function() {
            $(this).removeClass("showview");
        });
        $form.addClass("showview");
    }
});
$(document).on('click', 'body', function(e) {
    if (!$(e.target).is('.view')) {
        $(".showview").each(function() {
            $(this).removeClass("showview");
        });
    }
});


function getHistoryList(curr) {
    commonFn({
        url: 'ScoreAnalysis/History',
        data: {
            PageIndex: curr,
            schoolId : getCookieByUserInfo('schoolid')
        },
        type:'post'
    }, function(response) {
        $('tbody').empty();
        if (response.resultData) {
            layui.laypage({
                cont: 'page',
                pages: response.pageCount,
                curr: response.pageIndex,
                groups: 5,
                jump: function(e, first) {
                    if (!first) {
                        getHistoryList(e.curr)
                    }
                },
                skin: '#028843',
                first: '首页',
                last: '尾页',
                prev: false,
                next: false
            });
            var t = response.resultData
            for (var i = 0; i < t.length; i++) {

                $('<tr><td>' + isNull(t[i].gradeName) + '</td>' +
                    '<td>' + isNull(t[i].scoreTypeName) + '</td>' +
                    '<td>' +
                    '<a href="Release.html?id=1">' + isNull(t[i].subjectName) + '</a>' +
                    '</td>' +
                    '<td>' + isNull(t[i].className) + '</td>' +
                    '<td>' + solveTime(t[i].inTime) + '</td>' +
                    '<td>' +
                    '<a href="scoreset.html?scoreid=1" class="selectField layui-btn layui-btn-mini">选择字段下载</a>' +
                    '</td>' +
                    '<td>' +
                    //'<a href="'+window.siteHost+'ScoreDownload/ScoreAnalysisExport?schoolId='+window.schoolid+'&scoreid=' + t[i].scoreId + '" target="_blank" class="layui-btn layui-btn-mini">下载</a>' +
                    '<a href="javascript:remove(' + t[i].scoreId + ')" class="layui-btn layui-btn-mini layui-btn-danger">删除</a></td>' +
                    '</tr>').appendTo('tbody');
            }
        }
    })
}

function remove(id) {
    layer.confirm("是否删除?", {
        icon: 3,
        title: '提示'
    }, function(index) {
        layer.close(index);
        commonFn({
            url: 'ScoreAnalysis/DeleteScoreByScoreId?id=' + id,
            type: 'delete'
        }, function() {
            layer.msg("删除成功");
            getHistoryList();
        })
    })
}
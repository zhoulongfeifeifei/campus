
commonFn({ url: 'XAWebXiaopai/GetList_Device?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
    $.each(res, function (i) {
        var time = res[i].lastlogin_time.replace('T', ' ');
        if (res[i].appConnectState == 0) {
            ast = '<label class="red"><i class="fa fa-minus-circle"></i></label>';
        } if (res[i].appConnectState == 1) {
            ast = '<label class="green"><i class="fa fa-check-circle"></i></label>';
        }
        $('#roleTable').append('<tr data_id="' + res[i].clint_id + '"><td>' + (i + 1) + '</td><td>' + res[i].clint_id + '</td><td>' + res[i].position + '</td><td>' +
            res[i].kqStatus + '</td><td>' + time + '</td><td>' + ast + '</td><td>' + res[i].clientType + '</td><td>' + res[i].version + '</td><td>' +
            '<a href="checkonMould.html?clint_id=' + res[i].clint_id + '" class="layui-btn layui-btn-mini" title="考勤模板" style="background-color: #666">考勤模板</a>' +
            '<a href="" class="layui-btn layui-btn-mini update" title="版本更新" style="background-color: #47a447">版本更新</a>' +
            '<a href="" class="layui-btn layui-btn-mini restart" title="重启" style="background-color: #f00">重启</a>' +
            '<a href="" class="layui-btn layui-btn-mini logs" title="传日志" style="background-color: #ff9100">传日志</a>' +
            '<a href="" class="layui-btn layui-btn-mini imglogs" title="日志图片" style="background-color: #666">日志图片</a>' +
            '<a href="mould.html?clint_id=' + res[i].clint_id + '&position=' + res[i].position + '&temid=' + res[i].templateId + '" class="layui-btn layui-btn-mini" title="选择模板" style="background-color: #551a8b">模板选择</a>' +
            '<a href="cont.html?clint_id=' + res[i].clint_id + '&position=' + res[i].position + '&temid=' + res[i].templateId + '" class="layui-btn layui-btn-mini" title="内容管理" style="background-color: #551a8b">内容管理</a></td></tr>')
    })
    $(".update").click(function () {
        var id = $(this).parent().parent('tr').attr('data_id');
        // console.log(id);
        if (confirm("是否需要更新到最新版本?")) {
            commonFn({ url: 'XAWebXiaopai/DevideUpdate?deviceid=' + id, type: 'GET' }, function (res) {
                console.log(res);
                if (res.status == 1) {
                    alert('更新成功！');
                }
            })
        }
    });
    $(".restart").click(function () {
        var id = $(this).parent().parent('tr').attr('data_id');
        if (confirm("是否重启?")) {
            commonFn({ url: 'XAWebXiaopai/DevideRestart?deviceid=' + id, type: 'GET' }, function (res) {
                if (res.status == 1) {
                    alert('重启成功！');
                }

            })
        }
    });
    $(".logs").click(function () {
        var id = $(this).parent().parent('tr').attr('data_id');
        commonFn({ url: 'XAWebXiaopai/DevideLogs?deviceid=' + id, type: 'GET' }, function (res) {
            if (res.status == 1) {
                alert('上传成功！');
            }
        })
    });
    $(".imglogs").click(function () {
        var id = $(this).parent().parent('tr').attr('data_id');
        commonFn({ url: 'XAWebXiaopai/DevideImgLogs?deviceid=' + id, type: 'GET' }, function (res) {
            if (res.status == 1) {
                alert('上传成功！');
            }
        })
    });
})




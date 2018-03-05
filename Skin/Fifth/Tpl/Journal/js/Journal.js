var form = layui.form(),
    layer = layui.layer,
    upload = layui.upload(),
    laypage = layui.laypage;
userId = getCookieByUserInfo('userid')
// console.log(userId);

getJournalList();
/******************显示内容********************/
function getJournalList(search, curr,logstypeid) {
    var ajaxLogsInfo = {
        url: 'Blog/LogsList',
        data: {
            keyWords: search,
            pageIndex: curr || 1,
            pageSize: 10,
            logstypeid: logstypeid || -1
        },
        type: 'post'
    }
    commonFn(ajaxLogsInfo, function (data) {
        var t = data;
        $('#journalList , #journalType').empty();
        $('#journalTypeSelect').nextAll().remove();
        laypage({
            cont: 'page',
            pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: t.pageIndex,
            groups: 5,
            jump: function (e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷
                    getJournalList($('#search').prev().val(), e.curr)
                }
            },
            skin: '#028843', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        /************发表的日志展示数据***********/
        $.each(t.logsList, function (index, el) {
            //根据用户id判断当前用户的权限
            /*
             1.拿到日志的作者的id(即写这篇日志的账号的id)
             2.比较登录用户的id和发布这篇日志的作者的id是否相同,如果相同,则他具有增/删/改/查/的全部功能
             而如果id不同,则代表这个人不是作者,那么此人只有查看和评论的功能
             */
            if(el.log.user_Id==userId){
                $('#journalList').append(
                    '<li data-userId="' + el.log.user_Id + '">' +
                    '<a href="detailJournal.html?id=' + el.log.id + '">' + el.log.logs_Title + '</a>' +
                    '<div class="li_right">' +
                    '<span>' + solveTime(el.log.createTime) + '（' + el.comCount + '/' + el.log.logs_CheckCount + '）</span>' +
                    '<a href="addJournal.html?id=' + el.log.id + '" title="编辑" style="disabled:true"><i class="alIcon">&#xe69b;</i></a>' +
                    '<a href="javascript:removeJournal(' + el.log.id + ')" title="删除"><i class="alIcon">&#xe66a;</i></a>' +
                    '</div>' +
                    '</li>'
                )
            }else{
                $('#journalList').append(
                    '<li data-userId="' + el.log.user_Id + '">' +
                    '<a href="detailJournal.html?id=' + el.log.id + '">' + el.log.logs_Title + '</a>' +
                    '<div class="li_right" style="margin-right: 95px">' +
                    '<span>' + solveTime(el.log.createTime) + '（' + el.comCount + '/' + el.log.logs_CheckCount + '）</span>' +
                    '<a href="addJournal.html?id=' + el.log.id + '" title="编辑" style="display: none;"><i class="alIcon">&#xe69b;</i></a>' +
                    '<a href="javascript:removeJournal(' + el.log.id + ')" title="删除" style="display: none;"><i class="alIcon">&#xe66a;</i></a>' +
                    '</div>' +
                    '</li>'
                )
            }
        });
        /***********日志分类页面展示数据***********/
        $.each(t.logsTypes, function (index, el) {
            var name = el.logsTypeItem.typeName;
            var id = el.logsTypeItem.id;
            $('#journalType').append('<li data-id="' + id + '" ><a href="#">' + name + '</a><span class="right">(' + el.logsCount + ')</span></li>')
            $('#journalTypeSelect').after('<option value=' + id + '>' + name + '</option>');
            $('.manageLogType ul').append(
                '<li>' + name +
                '<div><a href="javascript:" data-id=' + id + ' data-name="' + name + '" class="editLog">编辑</a><a href="javascript:removeLogType(' + id + ')">删除</a></div>' +
                '</li>'
            )
        });
    })
}

/***************日志的搜索*****************/
$('#search').click(function (event) {
    // console.log(123);
    var seadata = $.trim($(this).prev().val())
    if (seadata.length > 0) {
        getJournalList(seadata, 1,'');
    }
});

/*********右边日志分类的筛选**********/
$('body').on('click','#journalType li',function () {
    var id = $(this).attr("data-id");
    // console.log(id)
    $('.manageLogType ul').empty();
    getJournalList('', 1,id);
})

/**************编辑{(editLog)}点击事件*******/
    $('body').on('click','.editLog', function () {
        //拿到要编辑的内容的id,name
        var id = $(this).attr('data-id');
        var $val = $(this).attr('data-name');
        // console.log($val)
        parent.layer.prompt({title: '修改分类名称', value: $val}, function (value, index) {
            if ($.trim(value).length > 0) {
                if ($.trim(value) == $val) {
                    layer.msg('不能与原先的分类名称相同');
                } else {
                    var ajaxEditLogsType = {
                        url: 'Blog/EditLogsType',
                        type: 'POST',
                        data: {
                            typeName: value,
                            id: id
                        }
                    };
                    commonFn(ajaxEditLogsType, function (res) {
                        $('.manageLogType ul').empty();
                        getJournalList('', 1);
                        layer.close(index);
                        parent.layer.msg("修改成功");
                    })
                }
            } else {
                layer.msg("请输入分类名称");
            }
            form.render();
            $('.pushJournal').click(function () {
                journalModal("发表日志")
            });
        })
    })

 /********************删除日志的方法**************/
    function removeJournal(id) {
        layer.confirm("确定删除此日志吗?", {icon: 3, title: "删除提示信息"}, function (index) {
            layer.close(index);
            var ajaxDeleteLogs = {
                type: 'get',
                url: 'Blog/DeleteLogs',
                data: {
                    ids: id
                }
            };
            commonFn(ajaxDeleteLogs, function (res) {
                layer.msg('删除成功');
                getJournalList('',1);
                window.location.href='Journal.html';
            })
        })
    }
    /*******************管理日志弹窗**********************/
    function ManageLog() {
        layer.open({
            type: 1,
            title: "日志分类管理",
            area: ["300px", "400px"],
            content: $('.manageLogType')
        })
    }

    /************添加分类日志*************/
    $('.addType').click(function () {
        parent.layer.prompt({title: '输入分类名称',maxlength:15}, function (value, index) {
            if ($.trim(value).length > 0) {
                var ajaxAddLogsType = {
                    url: 'Blog/AddLogsType',
                    data: {typeName: value},
                    type: 'post'
                }
                commonFn(ajaxAddLogsType, function (res) {
                    parent.layer.msg("添加成功", {time: 1000}, function () {
                        parent.layer.close(index);
                    })
                    $('.manageLogType ul').empty();
                    getJournalList();
                })
            } else {
                layer.msg("请输入分类名称");
            }
        })
    });
    /***************** 删除分类日志***********************/
    function removeLogType(id) {
        layer.confirm("确定删除此分类吗?", {icon: 3, title: "删除提示信息"}, function (index) {
            layer.close(index);
            var ajaxDeleteLogsType = {
                type: 'get',
                url: 'Blog/DeleteLogsType',
                data: {id: id}
            };
            commonFn(ajaxDeleteLogsType, function () {
                layer.msg("删除成功");
                $('.manageLogType ul').empty();
                getJournalList('',1);
            })
        })
    }

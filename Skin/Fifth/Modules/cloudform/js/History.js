/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 08:51:54
 * @version $Id$
 */
var form = layui.form(),
    laypage = layui.laypage,
    userid = getCookieByUserInfo('userid'),
    schoolId = window.schoolid;
obtainList();
// var obj={};
$('.search').click(function() {
    var Title = $('input[name="Title"]').val();
    if ($('#selectForm').val() == "全部表单") {

    } else {
        var StateName = $('#selectForm').val();
    }


    var BeginTime = $('#BeginTime').val();
    var EndTime = $('#EndTime').val();
    // JSON.stringify(obj)
    obtainList(Title, StateName, BeginTime, EndTime);
});
form.on('select', function(data) {
    var Title = $('input[name="Title"]').val();
    if ($('#selectForm').val() == "全部表单") {

    } else {
        var StateName = data.value;
    }
    var BeginTime = $('#BeginTime').val();
    var EndTime = $('#EndTime').val();
    // JSON.stringify(obj)
    obtainList(Title, StateName, BeginTime, EndTime);
})

function obtainList(Title, StateName, BeginTime, EndTime, curr) {
    $('tbody').empty();
    var getList = layer.load();

    commonFn({
        url: 'CloudForm/History',
        typy: 'post',
        data: {
            Title: Title,
            StateName: StateName,
            BeginTime: BeginTime,
            EndTime: EndTime,
            PageIndex: curr,
            PageSize: 10
        },
        type: 'post'
    }, function(data) {
        layer.close(getList);
        laypage({
            cont: 'page11',
            pages: data.PageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: data.PageIndex,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷
                    var Title = $('input[name="Title"]').val(),
                        StateName = '',
                        BeginTime = $('#BeginTime').val(),
                        EndTime = $('#EndTime').val();
                    if ($('#selectForm').val() == "全部表单") {

                    } else {
                        StateName = $('#selectForm').val();
                    }

                    obtainList(Title, StateName, BeginTime, EndTime, e.curr);
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        // 定义列表里所有的有用的参数名  按照列表顺序来.
        var PublishTime, FormId, Title, ValidTime,
            IsOpen, IsRepeat, StateName, SendAmount, SubmitAmount, SendUnSubmitAmount, UnSendSubmitAmount,
            EndTime, BeginTime, Can, stateStop, isWhat, isWhatValue, isWhatStatus, copyUrl,
            sendNotice, delForm, htmldata, num = GetSkin(),
            qrcode;
        for (var i = 0; i < data.resultsData.length; i++) {
            // 发布时间
            PublishTime = solveTime(data.resultsData[i].publishTime);
            // form标识
            FormId = data.resultsData[i].formId;
            // 名称
            Title = data.resultsData[i].title;
            // 有效期
            ValidTime = data.resultsData[i].validTime;

            BeginTime = solveTime(data.resultsData[i].beginTime);
            EndTime = solveTime(data.resultsData[i].endTime);
            // 是否开放
            IsOpen = data.resultsData[i].isOpen
                // 是否重复填写
            IsRepeat = data.resultsData[i].isRepeat
                // 状态
            StateName = data.resultsData[i].stateName
                // 发送人数
            SendAmount = data.resultsData[i].sendAmount
                // 填写数量
            SubmitAmount = data.resultsData[i].submitAmount
                // 未填人数
            SendUnSubmitAmount = data.resultsData[i].sendUnSubmitAmount
                // 外来数量
            UnSendSubmitAmount = data.resultsData[i].unSendSubmitAmount;
            htmldata = data.resultsData[i].htmlData
            Can = data.resultsData[i].canStop;
            qrcode = '';
            copyUrl = '';
            delForm = '';
            if (Can) {
                Can = "停用";
            } else {
                Can = "启用";
            }
            // 是否开放
            if (IsOpen == 1) {
                UnSendSubmitAmount = UnSendSubmitAmount
                IsOpen = "是";
            } else {
                IsOpen = "否";
                UnSendSubmitAmount = "-"
            }
            if (IsRepeat == 1) {
                IsRepeat = "是";
            } else {
                IsRepeat = "否";
            }

            if (StateName == "已结束") {
                stateStop = '';

                sendNotice = '';

                isWhatValue = "再次发起";
                isWhatStatus = 1;
                delForm = '<a class="layui-btn layui-btn-mini layui-btn-danger removeform">删除</a>';
            } else if (StateName == "未开始") {
                stateStop = '';

                sendNotice = '';

                isWhatValue = "现在开始";
                isWhatStatus = 2;

                // copyUrl = '<a class="layui-btn layui-btn-mini copy" data-clipboard-text="http://'+htmldata+'/Web/Skin/'+num+'/Modules/CloudForm/formobsoleteedit.html?ids='+FormId+'&formmanage=1">复制表单地址</a>'

                delForm = '<a class="layui-btn layui-btn-mini layui-btn-danger removeform">删除</a>';
            } else {

                isWhatValue = "现在结束";
                isWhatStatus = 0;
                qrcode = ''
                stateStop = '<input type="submit" value="' + Can + '" class="layui-btn layui-btn-mini startform" />';

                copyUrl = '<a class="layui-btn layui-btn-mini copy" data-clipboard-text="http://' + htmldata + '/Web/Skin/' + num + '/Modules/CloudForm/formobsoleteedit.html?ids=' + FormId + '&formmanage=1&schoolid=' + schoolId + '">复制地址</a>';

                sendNotice = '<a class="layui-btn layui-btn-mini publish" data-id=' + FormId + '>通知提醒</a>';

                qrcode = '<a class="layui-btn layui-btn-mini qrcode" data-title="' + data.resultsData[i].title + '" data-qrcodeurl ="http://' + htmldata + '/Web/Skin/' + num + '/Modules/CloudForm/formobsoleteedit.html?ids=' + FormId + '&formmanage=1&schoolid=' + schoolId + '" >扫二维码</a>';
            }
            isWhat = '<a class="layui-btn layui-btn-mini layui-btn-normal" onclick="changeStatus(this,' + isWhatStatus + ' )" data-status=' + isWhatStatus + '>' + isWhatValue + '</a>'
            $('<tr data-id="' + FormId + '"><td>' + PublishTime + '</td>' +
                '<td><a href="formongoingedit.html?iid=' + FormId + '" style="color:blue;">' + data.resultsData[i].title + '</a></td>' +
                '<td>' + ValidTime + '</td><td>' + IsOpen + '</td>' +
                '<td>' + IsRepeat + '</td><td>' + StateName + '</td>' +
                '<td><a style="color:blue;" href="javascript:getUser(' + FormId + ')">' + SendAmount + '</a></td>' +
                '<td>' + SubmitAmount + '</td>' +
                '<td>' + SendUnSubmitAmount + '</td>' +
                '<td>' + UnSendSubmitAmount + '</td>' +
                '<td>' + isWhat
                //+stateStop 启用功能, 目前废弃.(可能会再有)
                + sendNotice +
                '<a href="'+window.siteHost+'Filedown/CloudFormExport?id=' + FormId + '&UserId='+getCookieByUserInfo('userid')+'" class="layui-btn layui-btn-mini layui-btn-warm" target="_blank">数据导出</a>' +
                copyUrl + qrcode + delForm +
                '</td></tr>').appendTo('tbody');
        }
        $('.qrcode').on('click', function() {
            var $this = $(this);
            $('#qrcode').empty();
            $('#qrcode').append('<h3 style="font-size:28px;text-align:center; color:#000;" id="codeTitle">' + $this.attr('data-title') + '</h3>');
            $('#qrcode').qrcode({
                render: "canvas",
                width: 250,
                height: 214,
                // text : "this plugin is great"
                text: $this.attr('data-qrcodeurl')
            });
            layer.open({
                title: false,
                type: 1,
                shadeClose: true,
                closeBtn: 0,
                area: ['260px', '280px'],
                content: $('#qrcode')
            })
        })
        var clip = new ZeroClipboard($(".copy"));
        clip.on("copy", function() {
            layer.msg("复制成功");
        })
        $('tbody tr').each(function(index, el) {
            if ($(el).find('.startform').val() == "停用") {
                $(el).find('.startform').addClass('red').removeClass('green')
            };
        });
        // 删除
        $('.removeform').click(function() {
            var id = $(this).parent().parent().attr('data-id');
            layer.confirm("确认要删除？", {
                icon: 3,
                title: "删除提示"
            }, function(index) {
                var removeload = layer.load();
                commonFn({
                    url: 'CloudForm/Delete?id=' + id,
                    type: 'delete'
                }, function(data) {
                    layer.close(removeload);
                    layer.msg('已删除');
                    obtainList();
                },function() {
                    layer.close(removeload);
                })
            })

        });
        // 启用停用 
        $('.startform').click(function() {
            var stateLoad = layer.load(),
                id = $(this).parent().parent().attr('data-id'),
                startOrStop = {},
                messageInfo;
            if ($(this).val() == "启用") {
                startOrStop.url = 'CloudForm/Start';
                messageInfo = '已启用'
            } else if ($(this).val() == "停用") {
                startOrStop.url = 'CloudForm/Stop'
                messageInfo = '已停用'
            }
            commonFn(startOrStop, function(data) {
                layer.close(stateLoad);
                layer.msg(data);
                obtainList();
            },function() {
                layer.close(stateLoad);
            })
        });
        $(".publish").click(function() {
            var model = {};
            model.FormId = $(this).attr('data-id');
            layer.open({
                type: 2,
                title: "选择通知人",
                area: ['600px', '500px'],
                content: '../../Common/Receiver/Receiver.html?id=2',
                btn: ['确定'],
                yes: function(index, layero) {
                    //取数据方法
                    var usertypes = [];
                    var userlists = [];
                    var usernames = [];
                    $("#layui-layer-iframe" + index).contents().find("#Peoples li").each(function(i, n) {

                        var usertype = $(n).attr("data-usertype");
                        var schoolid = $(n).attr("data-schoolid");
                        var userid = $(n).attr("data-id");
                        var username = $(n).find('a').html();
                        if (usertype) {
                            usertypes.push(usertype);
                        } else if (userid) {
                            userlists.push(userid);
                        }
                        usernames.push(username);

                        $('input[name="openObject"]').val(usernames.join(','));
                    });

                    var obj = {};
                    obj.SchoolId = $("#layui-layer-iframe" + index).contents().find('#SchoolId').val();
                    obj.UserTypeList = usertypes;
                    obj.UserIdList = userlists;
                    model.Users = obj;
                    var notifyload = layer.load();
                    commonFn({
                        url: 'CloudForm/Notify',
                        data: {
                            str: JSON.stringify(model),
                            schoolid:window.schoolid
                        }
                    }, function(res) {
                        layer.close(notifyload);
                        console.log(res);
                        if (res.Status == 1) {
                            layer.msg("成功发送通知")
                        } else if (res.Status == 4) {
                            top.location.href = "../../login.html";
                        } else {
                            if (res.Message) {
                                layer.msg(res.Message);
                            }
                        }
                    }, function() {
                        layer.close(notifyload);
                    })
                    layer.close(index);
                }
            });
        });
    }, function(data) {
        layer.close(getList);
        layer.msg("请求失败");
    })
}

function export2(id){
    commonFn({
        url:'Filedown/CloudFormExport',
        data:{id:id,UserId:getCookieByUserInfo('userid')}
    })
}


function getUser(id) {
    $('body').append('<div style="display:none ;height=260px; overflow:auto" id="userBox"><ul style="height=260px; overflow:auto;"></ul></div>')
    commonFn({
        url: 'CloudForm/GetNotifiedPeople',
        data: {
            id: id
        }
    }, function(res) {
        if (res && res.length > 0) {
            var htmldata = '';
            $.each(res, function(index, el) {
                htmldata += '<li style="text-align:center;">' + el.userName + '</li>'
            });
            $('#userBox ul').append(htmldata);
            layer.open({
                type: 1,
                title: "发送人名单",
                area: ['200px', '300px'],
                shadeClose: true,
                content: $('#userBox'),
                end: function() {
                    $('#userBox').remove();
                }
            })
        }
    })
}
var setLoad, datas;

function changeStatus(bbb, status) {
    console.log(111);
    $this = $(bbb);
    var model = {};
    model.Id = $this.parent().parent().attr('data-id');
    model.Title = $this.parent().parent().find('td:eq(1) a').text();
    if (status == 1) {
        layer.confirm("再次发起需要设置一下表单有效期!", {
            icon: 3,
            title: "再次发起"
        }, function(index) {
            layer.close(index);
            location.href = "formedit.html?id=" + model.Id;
        })
    } else {
        if ($this.parent().parent().find('td:eq(3) a').text() == "是") {
            model.IsOpen = true;
        } else {
            model.IsOpen = false;
        }
        if ($this.parent().parent().find('td:eq(4) a').text() == "是") {
            model.IsRepeat = true;
        } else {
            model.IsRepeat = false;
        }
        commonFn({
            url: 'CloudForm/SettingShow',
            data: {
                Id: $this.parent().parent().attr('data-id'),
                formmanage: 1
            }

        }, function(data) {
            model.EndTime = data.EndTime;
            model.BeginTime = data.BeginTime;
            model.isnow = undefined;
            if (status == 0) {
                model.EndTime = '';
                model.isnow = 2;
            } else if (status == 2) {
                model.BeginTime = '';
                model.isnow = 1;
            }
            if (model.EndTime) {
                model.ForEver = false;
            } else {
                model.ForEver = true;
            }
            setLoad = layer.load();
            commonFn({
                url: 'CloudForm/Setting',
                type: 'post',
                data: model
            }, function(datas) {
                layer.msg('停用中', {
                    time: 5000
                })
                setTimeout('settimeout(setLoad,datas)', 5000)
            }, function(data) {
                layer.close(setLoad);
                layer.msg("请求失败");
            })
        })
    }
}

function settimeout(a, b) {
    layer.close(a);
    obtainList();
}
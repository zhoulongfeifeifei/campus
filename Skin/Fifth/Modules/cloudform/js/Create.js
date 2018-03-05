/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:14:58
 * @version $Id$
 */
var flag = false,
    dialog = Dialog,
    form = layui.form(),
    users;

$('#ifbox2', window.parent.document).css('min-width', 950);
$(".save").click(function() {
    if (flag) {
        alert("正在发布, 请稍后");
        return;
    }
    var args = init();
    if (args.Title == "") {
        layer.msg('表单名称不能为空', {
            offset: 0,
            shift: 6
        })
        return
    }
    if (args.Items.length <= 0) {
        layer.msg('控件不能为空', {
            offset: 0,
            shift: 6
        })
        return
    }
    var falg = false;

    $('.input-text').each(function(index, el) {
        if ($(el).val().indexOf(',') != -1) {　　
            layer.msg("   ,   为非法符号");
            falg = true;
            return false;　　
        }
    });
    if (falg) return;
    if (!args.BeginTime) {
        layer.msg("必须有开始时间");
        return
    }
    // if (!$('#ForEver').prop("checked")) {
    //     if (!args.EndTime) {
    //         layer.msg("必须有永久或者结束时间");
    //         return
    //     }
    // }
    args.Users = users;
    if (!args.Users || args.Users == undefined) {
        layer.msg("选择人不能为空")
        return
    }
    postData(args);
});
$(".preview").click(function() {
    if (flag) {
        alert("正在发布, 请稍后");
        return;
    }
    var args = init();
    args.IsPreview = true;
    postData(args);
});
$('.selectPeople').click(function(event) {
    $(this).val('重新选择')
    $('input[name="Participant"]').val('');
    $('input[name="Participant"]').attr('data-id', '')
    layer.open({
        type: 2,
        title: "请选择接收者",
        area: ['800px', '500px'],
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

                $('input[name="Participant"]').val(usernames.join(','));
            });

            var obj = {};
            obj.SchoolId = $("#layui-layer-iframe" + index).contents().find('#SchoolId').val();
            obj.UserTypeList = usertypes;
            obj.UserIdList = userlists;
            users = obj;
            layer.close(index);
        }
    });
});

function postData(args) {
    flag = true;
    args = JSON.stringify(args);
    // AjaxUrlProcess("/AjaxCloudForm/Create", {
    //     'str': args
    // }, function(data) {
    //     flag = false;
    //     if (data) {
    //         layer.msg('保存成功', {
    //             time: 1200
    //         }, function() {
    //             location.href = "History.html";
    //         })
    //     }
    // }, function(status, message) {
    //     flag = false;
    // });
    commonFn({
        url: 'CloudForm/Create',
        data: {
            'str': args,
            schoolid:window.schoolid
        },
        type:'post'
    }, function() {
        flag = false;
        layer.msg('保存成功', {
            time: 1200
        }, function() {
            location.href = "formhistorylist.html";
        })
    },function(){
        flag = false;
    })
}
var sort;
form.on('checkbox(ForEver)', function(data) {
        if (data.elem.checked) $("#EndTime").attr("disabled", "disabled");
        else $("#EndTime").removeAttr("disabled");
    })
    // $(".forever").change(function () {
    //     if ($(this)[0].checked) {
    //         $("#EndTime").attr("disabled", "disabled");
    //     } else {
    //         $("#EndTime").removeAttr("disabled");
    //     }
    // });
    // $("#IsOpen").change(function () {
    //     if ($(this)[0].checked) {
    //         $("#IsRepeat").attr("checked", "checked");
    //     }
    // });
    // $("#IsRepeat").change(function () {
    //     if ($("#IsOpen")[0].checked) {
    //         $("#IsRepeat")[0].checked = true;
    //     }
    // });
function init() {
    sort = 0;
    var args = {};
    args.Title = $("#Title").val();
    args.BeginTime = $("#BeginTime").val();
    args.EndTime = $("#ForEver")[0].checked ? "" : $("#EndTime").val();
    args.IsRepeat = $("#IsRepeat")[0].checked;
    args.IsOpen = $("#IsOpen")[0].checked;
    args.IsPreview = false;
    args.Items = getControls($(".mid-wrap .list"));
    args.Users = null;
    return args;
}

function getControls(items) {
    var controls = new Array();
    if (items.children().length <= 0) return controls;
    items.children().each(function() {
        var control = getControl($(this));
        if (control.Title === "") control.Title = getDefaultTitle(control.Type);
        controls.push(control);
    });
    return controls;
}

function getControl(item) {
    var control = new FormControl();
    control.Sort = sort++;
    control.Type = item.attr("data-typeid");
    if (control.Type === "8") {
        control.Items = getControls($(item.find(".list-in")[0]));
    }
    var value = item.find('.input-hidden').val();
    if (typeof(value) === 'undefined') return control;
    var values = value.split('&,');
    values.shift(); //删除第一项
    values.pop(); //删除最后一项
    var titles = new Array();
    $.each(values, function(i, val) {
        var _valArr = val.split('&:');
        var _rid = _valArr[0];
        var _val = _valArr[1];
        switch (_rid) {
            case '0':
                titles.push(_val);
                break;
            case '1':
                control.Tips = _val;
                break;
            case '2':
                _val = _val.substring(1, _val.length - 1);
                control.Unit = _val;
                break;
            case '3':
                var _valArr_3 = _valArr[1].split('&;');
                _valArr_3.pop();
                $.each(_valArr_3, function(ai, aval) {
                    if (aval !== "" && aval !== "undefined" && aval !== null) {
                        var option = new FormControlOption();
                        option.Value = aval;
                        option.Text = aval;
                        option.Sort = ai;
                        control.Options.push(option);
                    }
                });
                break;
            case '4':
                control.MaxLength = parseInt(_val) + 1;
                break; //注意一下
            case '5':
                if (_val === '0') control.Format = "yyyy-MM";
                else if (_val === '1') control.Format = "yyyy-MM-dd";
                else if (_val === '2') control.Format = "yyyy-MM-dd HH:mm";
                break;
            case '7':
                control.Required = (_valArr[1] === 'true');
                break;
        }
    });
    if (control.Type === "5") {
        var start = $.extend(true, {}, control);
        var end = $.extend(true, {}, control);
        start.Title = titles.length >= 1 ? titles[0] : "开始时间";
        start.Sort = sort++;
        control.Items.push(start);
        end.Title = titles.length >= 2 ? titles[1] : "结束时间";
        end.Sort = sort++;
        control.Title = "日期区间";
        control.Items.push(end);
    } else if (control.Type === "8") {
        control.Title = "嵌套框";
    } else if (control.Type === "4") {
        if (control.MaxLength < 2) control.MaxLength = 2;
    } else {
        control.Title = titles[0];
    }
    return control;
}

function getDefaultTitle(type) {
    switch (type) {
        case "0":
            return "单行输入框";
        case "1":
            return "多行输入框";
        case "2":
            return "数字输入框";
        case "3":
            return "单选框";
        case "4":
            return "多选框";
        case "5":
            return "日期区间";
        case "6":
            return "日期";
        case "7":
            return "照片";
        case "8":
            return "嵌套框";
        default:
            return "";
    }
}
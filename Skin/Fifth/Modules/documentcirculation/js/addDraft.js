/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 16:42:55
 * @version $Id$
 */
var layer = layui.layer,
    upload = layui.upload,
    form = layui.form(),
    tree = layui.tree,
    $ = layui.jquery,
    layedit = layui.layedit,
    YunFileList = [],
    chaosongid,
    piyueid,
    editor;
KindEditor.ready(function(K) {
    editor = K.create("#Notes", {
        allowFileManager: true,
        width: '99.8%',
        items: [
            'undo', 'redo', '|', 'code', 'cut', 'copy', 'paste',
            'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
            'superscript', '|', 'fullscreen', '/',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
            'insertfile', 'table', 'hr', 'pagebreak',
            'anchor', 'link', 'unlink', '|', 'about'
        ],
        uploadJson: window.apiUrl + 'Common/UploadFile',
        fileManagerJson: window.apiUrl + 'Common/UploadFile',
        allowFileManager: false,
    });
})
upload({
    url: window.apiUrl + 'Common/UploadFile',
    title: '本地文件',
    async: false,
    elem: '.local',
    before: function(input) {
        fileName = input.files[0].name;
    },
    success: function(res) {
        if (res.status == 1) {
            $('.selfUpload').append('<div class="layui-form-mid layui-word-aux wenjian" data-url=' + res.data + ' data-id=0>' + fileName+ '<i class="layui-icon">&#x1006;</i></div>')
            $('.wenjian i').on('click', function() {
                $(this).parent().remove();
            })
        } else {
            layer.msg("文件上传失败", {
                shift: 6,
                time: 1000
            })
        }
    }
});
// var index = layedit.build('Notes');
form.on('submit(Sava)', function() {
    var modal = {}
        // 内容
    modal.Title = $('input[name="Title"]').val();
    // modal.Content = editor.html(); //$('#Notes').val();
    modal.Content = editor.html();
    // 文件
    var strFileList = [];
    $('.selfUpload .wenjian').each(function(index, el) {
        var filename = $(el).text();
        var fileurl = $(el).attr('data-url');
        var fileid = $(el).attr('data-id');
        strFileList.push({
            filename: filename,
            fileurl: fileurl,
            fileid: fileid
        });
    });
    modal.FileList = JSON.stringify(strFileList);
    // 云盘的文件
    modal.YunFileList = JSON.stringify(YunFileList);

    // 批阅

    modal.ToUserIds = JSON.stringify(piyueid);
    // 抄送
    modal.ChaoSongToUserIds = JSON.stringify(chaosongid);
    commonFn({
        url: 'Offic/Add',
        data: modal,
        type: 'post'
    }, function() {
        location.href = "documentapproval.html?id=38"
    })
});

$('.cloudDisk').click(function(event) {
    YunFileList = [];
    $(this).val("重新选择");
    $('.yunpanFile').empty();
    $('.reSelect').css('display', 'inline');
    $('#Personal ,#Public , #OK').empty();
    layer.open({
        type: 1,
        title: "云盘选择文件",
        content: $('#Tree'),
        area: ['900px', '500px'],
        btn: "确定",
        success: function() {
            $('#Personal ,#Public , #OK').empty();
            commonFn({
                url: 'CloudPan/GetFileList',
                data:{schoolId : window.schoolid}
            }, function(res) {
                // 个人盘
                if ($.isArray(res.personal)) {
                    var nodes = [],
                        t = res.personal;
                    $.each(t, function(index, el) {
                        var obj = {};
                        obj.name = el.folderName;
                        obj.children = [];
                        if ($.isArray(el.files)) {
                            $.each(el.files, function(index1, el1) {
                                var obj1 = {};
                                obj1.name = el1.fileName;
                                obj1.id = el1.id;
                                obj.children.push(obj1);
                            });
                        }
                        if ($.isArray(el.childFolders)) {
                            obj.children = $.merge(loop(el.childFolders), obj.children);
                        }
                        nodes.push(obj);
                    });

                    tree({
                        elem: '#Personal',
                        nodes: nodes,
                        click: function(e) {
                            clickFile(e);
                        }
                    })
                }
                // 班级盘
                if (res.public && res.public.length > 0) {
                    var nodes = [],
                        t = res.public;
                    $.each(t, function(index, el) {
                        var obj = {};
                        obj.name = el.className;
                        obj.children = [];
                        if (el.Files && el.Files.length > 0) {
                            $.each(el.Files, function(index1, el1) {
                                var obj1 = {};
                                obj1.name = el1.fileName;
                                obj1.id = el1.id;
                                obj.children.push(obj1);
                            });
                        }
                        if (el.childFolders && el.childFolders.length > 0) {
                            obj.children = $.merge(loop(el.childFolders), obj.children);
                        }
                        nodes.push(obj);
                    });
                    tree({
                        elem: '#Public',
                        nodes: nodes,
                        click: function(e) {
                            clickFile(e);
                        }
                    })
                }
            })
        },
        yes: function(index, layero) {

            var idName = $(layero).find('#OK');
            $(idName).children('li').each(function(index, el) {
                var obj = {}
                obj.fileid = $(el).attr('data-id');
                obj.filename = $(el).text();
                YunFileList.push(obj);
                $('.yunpanFile').append('<p>' + obj.filename + '</p>')
            });
            layer.close(index);
        }
    })
});

// 这是循环云盘的文件和文件夹的列表的递归方法
function loop(arr) {
    if (arr && arr.length > 0) {
        var obj, nodes = [];
        $.each(arr, function(index, el) {
            obj = {};
            obj.name = el.folderName;
            obj.children = [];
            if (el.Files && el.Files.length > 0) {
                $.each(el.Files, function(index1, el1) {
                    var obj1 = {};
                    obj1.name = el1.fileName;
                    obj1.id = el1.Id;
                    obj.children.push(obj1)
                });
            }
            if (el.childFolders && el.childFolders.length > 0) {
                obj.children = $.merge(loop(el.childFolders), obj.children);
            }
            nodes.push(obj)
        });
        return nodes;
    }
}

// 选择之后  提供删除重新选的功能
function removeIcon(a) {
    $(a).parent().remove();
}
// 选择文件的处理方式
function clickFile(e) {
    if (e.children) {
        layer.msg("目前不支持导入文件夹全部文件,请选择文件");
    } else {
        // 只能增加十个
        if ($('#OK li').length < 10) {
            // 判断当有选择文件的时候,现在选的文件在已经选的文件里是否存在
            if ($('#OK li').length > 0) {
                $('#OK li').each(function(index, el) {
                    if (e.id == $(el).attr('data-id')) {
                        layer.msg("这个文件已经选择过了");
                        return false;
                    } else if (index + 1 == $('#OK li').length) {
                        $('#OK').append('<li data-id=' + e.id + '>' + e.name + '<i class="layui-icon" onclick="javascript:removeIcon(this)">&#x1006;</i> </li>')
                    }
                });
            } else {
                $('#OK').append('<li data-id=' + e.id + '>' + e.name + '<i class="layui-icon" onclick="javascript:removeIcon(this)">&#x1006;</i> </li>')
            }

        } else {
            layer.msg('最多选择十个云盘文件')
        }
    }
}



function clearKeeper(i) { //清空已经选择的人
    if (i == 1) {
        $('input[name="piyue"]').val('');
        piyueid = '';
    };
    if (i == 2) {
        $('input[name="chaosong"]').val('');
        chaosongid = '';
    };

}

$('.piyue').click(function() {
    selectPeople(1);
    $(this).val('重新选择')
});
$('.chaosong').click(function() {
    selectPeople(2);
    $(this).val('重新选择')
});

function selectPeople(i) {

    var inputDom, title, $ID = 1;

    if (i == 1) {
        inputDom = $('input[name="piyue"]');
        title = "选择批阅人";
        $ID = 2;
    }
    if (i == 2) {
        inputDom = $('input[name="chaosong"]');
        title = "选择抄送人";
        $ID = 2;
    }
    inputDom.val('');
    inputDom.attr('data-id', '')
    layer.open({
        type: 2,
        title: title,
        closeBtn: 1,
        shadeClose: true,
        area: ['600px', '500px'],
        content: '../../Common/Receiver/Receiver.html?id=' + $ID, //这里content是一个DOM
        btn: '确定',
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
                inputDom.val(usernames.join(','));
            });

            var obj = {};
            obj.SchoolId = $("#layui-layer-iframe" + index).contents().find('#SchoolId').val();
            obj.UserTypeList = usertypes;
            obj.UserIdList = userlists;
            // users = obj;     
            if (i == 1) {
                piyueid = obj;
            }
            if (i == 2) {
                chaosongid = obj;
            }
            layer.close(index);
        }
    })
}
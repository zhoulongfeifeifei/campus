/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-02 17:53:15
 * @version $Id$
 */
var $ = layui.jquery,
    layer = layui.layer,
    upload = layui.upload,
    laypage = layui.laypage,
    tree = layui.tree,
    num = window.location.href.split("?")[1],
    qxid = num.split("=")[1];
obtainList();
$('.search').click(function() {
    var Title = $('input[name="Title"]').val();
    if ($.trim(Title).length > 0) {
        obtainList(0, Title, 99);
    } else {
        obtainList();
    }
});
quanxian(qxid);

function obtainList(id, key, sb) {
    var listload = layer.load(),data;
    data =  key ? {folderId: id || 0,
            keyword: key,
            search: sb || 0} :{folderId: id || 0,
            search: sb || 0}

    
    commonFn({
        url: 'CloudPan/Personal',
        data: data
    }, function(data) {
        layer.close(listload);
        $('#Pid').val(data.pid);
        $('tbody').empty();
        $('#nvfTable tr').empty();
        $('#FileList').empty();
        // 云盘的空间的计算
        $('#filenum').text(data.fileCount);
        $('#fileall').text(data.totalSize / 1048576);
        $('#filenow').text((data.userdSize / 1048576).toFixed(3));
        $('.progressNum').css('width', (data.userdSize / 1048576) / (data.totalSize / 1048576) + '%')
        var str = "<td width='100%'  align='left'>  <a  href= 'javascript:obtainList(0);'   class='btn btn-green'>  根目录</a>  ";
        var info = data.folderNav;
        if (info && info.length > 0) {
            for (var i = 0; i < info.length; i++) {
                str += "   <a  href='javascript:obtainList(" + info[i].id + ");'   class='btn btn-green'>  >" + info[i].folderName + "</a>   ";
            }
        }
        $('#nvfTable tr').append(str + '</td>');
        // 循环文件夹
        if (!sb) {
            if ($.isArray(data.folders)) {
                var folder = data.folders;
                for (var i = 0; i < folder.length; i++) {
                    $('#FileList').append('<tr  data-id="' + folder[i].id + '">' +
                        '<td style="margin-left:40%;"><a></a></td><td align="left"><i class="floderIcon">&#xe697;</i>' +
                        '<a  href="javascript:obtainList(' + folder[i].id + ');"   class="filename">  ' + folder[i].folderName + '</a>  ' +
                        '</td><td></td><td>' + solveTime(folder[i].createTime) + '</td>' +
                        '<td><span class="editDraft layui-btn layui-btn-mini">修改名称</span>' +
                        '<span class="layui-btn layui-btn-mini layui-btn-danger del">删除</span></td></tr>');
                }

            }
        }
        if ($.isArray(data.files)) {
            var d = data.files;
            for (var i = 0; i < d.length; i++) {
                $('#FileList').append('<tr  data-id="' + d[i].id + '">');
                $('#FileList').append('<td class="checkbox"><input type="checkbox" value="' + d[i].id + '" class="w-40 file-item" /></td>');
                $('#FileList').append('<td align="left">' + d[i].fileName + '</td>');
                $('#FileList').append('<td>' + String(d[i].fileSize).substring(0, 4) + ' KB</td>');
                $('#FileList').append('<td>' + solveTime(d[i].createTime) + '</td>');
                $('#FileList').append('<td><a class="layui-btn layui-btn-mini" download href="' + d[i].ossUrl + '">下载</a>' +
                    '<a class="layui-btn layui-btn-mini layui-btn-danger" onclick="delFiles(' + d[i].id + ')">删除</a>' +
                    '<a class="layui-btn layui-btn-mini yulan" data-url="' + d[i].ossUrl + '" data-id=' + d[i].id + '>预览</a></td>');
            }
            $('.yulan').on('click', function() {
                var isurl = $(this).attr('data-url'),
                    id = $(this).attr('data-id');
                if (isurl && (isurl.endsWith("txt") || isurl.endsWith("png") || isurl.endsWith("jpg") || isurl.endsWith("gif"))) {
                    window.open(isurl);
                } else {
                    commonFn({
                        url: 'CloudPan/Change2Swf',
                        data: {
                            fileid: id,
                            schoolid: window.schoolid
                        }
                    }, function(res) {
                        window.open(res);
                    })
                }
            })
        }
    })
}

// 更改文件夹名称
$('body').on('click', '.editDraft', function(event) {
    var id = $(this).parents().parents().attr('data-id');
    var oldname = $(this).parents('tr').find('.filename').html();
    $('p.oldfoldName').text(oldname);
    $('input[name="newfoldName"]').val('');
    layer.open({
        type: 1,
        title: "修改文件夹名称",
        area: ['400px', '200px'],
        btn: ['确定'],
        content: $('#Draftedit'),
        yes: function(modifyFolder) {

            var name = $('input[name="newfoldName"]').val();
            if ($.trim(name).length > 0) {
                layer.close(modifyFolder);
                var editname = layer.load();
                commonFn({
                    url: 'CloudPan/ProEditFolder',
                    data: {
                        Id: id,
                        FolderName: name
                    },
                    type: 'post'
                }, function(data) {
                    layer.msg('名称修改成功');
                    obtainList();
                })
            } else {
                layer.msg("文件夹名称不能为空")
            }
        }
    });
});
// 删除
$('body').on('click', '.del', function(event) {
    var dom = $(this).parents().parents()
    var id = dom.attr('data-id');
    layer.confirm('是否删除?', {
        icon: 3,
        title: '提示'
    }, function(index) {
        layer.close(index)
        var modal = layer.load(1);
        commonFn({
            url: 'CloudPan/ProDelete?ids=' + id,
            type: 'delete'
        }, function(data) {
            layer.msg('删除成功')
            obtainList();
        })
    })
});


// 新建文件夹
function goDraft() {
    layer.open({
        type: 1,
        title: "新建文件夹",
        area: ['400px', '200px'],
        btn: ['确定', '取消'],
        content: $('#Draft'),
        yes: function(addFolder) {
            layer.close(addFolder);
            var model = {};
            model.FolderName = $('input[name="folder"]').val();
            if ($.trim(model.FolderName).length > 0) {
                model.Pid = $('#Pid').val();
                model.OwnnerType = 1;
                add(model);
                $('input[name="folder"]').val('');
            } else {
                layer.msg("文件夹名称不能为空")
            }
        },
        btn2: function() {
            $('input[name="folder"]').val('');
        }
    });
};

function add(data) {
    commonFn({
        url: 'CloudPan/ProAddFolder',
        data: data,
        type: 'post'
    }, function(data) {
        layer.msg("新建成功")
        obtainList();
    })
}

var Dialog = top.Dialog;

function delFiles(ids) {
    layer.confirm('是否删除?', {
        icon: 3,
        title: '提示'
    }, function(index) {
        layer.close(index)
        var modal = layer.load(1);
        commonFn({
            url: 'CloudPan/ProDelete?ids=' + ids,
            type: 'delete'
        }, function(data) {
            layer.msg('删除成功')
            obtainList();
        })
    })
}
$(".removefolder").click(function() {
    var ids = new Array();
    ids.push($(this).parent().parent().attr("data-id"));
    delFolder(ids);
});

function delFolder(ids) {
    AjaxUrlProcess("CloudPan/ProDelete", {
        ids: ids
    }, function(data) {
        top.parent.showTips("操作成功", 4);
        for (var i = 0; i < ids.length; i++) {
            $("tr[data-id='" + ids[i] + "']").remove();
        }
        location.reload();
    }, function(status, message) {
        top.parent.showTips(message, 5);
    });
}
$(".remove").click(function() {
    var ids = "";
    //ids.push($(this).parent().parent().attr("data-id"));
    ids = $(this).parent().parent().attr("data-id");
    delFiles(ids);
});
$(".removeall").click(function() {
    var ids = "";
    $("td.checkbox input:checked").each(function() {
        ids += $(this).val() + ",";
        //ids.push($(this).val());
    });
    if (ids.length <= 0) {
        layer.msg("您尚未选择文件");
        return;
    }
    delFiles(ids);
});

$(".table thead input").click(function() {
    if (this.checked) {
        $("tbody :checkbox").attr("checked", true);
    } else {
        $("tbody :checkbox").attr("checked", false);
    }
});
$(".Expansion").click(function() {
    layer.msg("【扩容服务敬请期待】");
});

$(".copyall").click(function() {
    var title = "复制文件";
    var files = new Array();
    $("td.checkbox input:checked")
        .each(function() {
            files.push($(this).val());
        });
    if (files.length <= 0) {
        layer.msg("您尚未选择文件");
        return;
    }
    getFolderList(title);
    moveOrCopy(files, true, title);
});
// $(".move").click(function () {
//     var files = new Array();
//     files.push($(this).parent().parent().attr("data-id"));
//     moveOrCopy(files, false);
// });
$(".moveall").click(function() {
    var title = "移动文件";
    var files = new Array();

    $("td.checkbox input:checked")
        .each(function() {
            files.push($(this).val());
        });
    if (files.length <= 0) {
        layer.msg("您尚未选择文件");
        return;
    }
    getFolderList(title);
    moveOrCopy(files, false, title);
});
$(".file-item").click(function() {

    if (!this.checked) {
        $(".table thead input").removeAttr("checked");
    }
});

function moveOrCopy(files, isCopy, title) {
    var index = layer.open({
        type: 1,
        title: title,
        area: '300px',
        btn: ['确定'],
        content: $('#Catalog'),
        yes: function(index, layero) {
            var model = {}
            model.IsCopy = isCopy;
            model.FileIds = files.join(',');
            var ClassIds = [$('#Pid').val()]
            if (!$('.tocatalog').children('.foldid').attr('data-id')) {
                layer.msg("请选择文件夹");
                return
            }
            ClassIds.push($('.tocatalog').children('.foldid').attr('data-id'));
            model.ClassIds = ClassIds.join(',')
            var ispan = $('#left .active').text();
            model.ToPersonal = true;
            commonFn({
                url: 'CloudPan/MoveOrCopy',
                data: model,
                type: 'post'
            }, function(data) {
                obtainList();
                layer.msg('成功')
                layer.close(index);
            })

        },
    });
}


function getFolderList(title) {
    $('#demo').empty();
    $('.tocatalog').html('');
    commonFn({
        url: 'CloudPan/getFolderList',
        data: {
            schoolid: window.schoolid
        }
    }, function(response) {
        var t = response.personal;
        var nodes = [{name:"根目录",id:0}];
        if (t && t.length > 0) {
            for (var i = 0; i < t.length; i++) {
                var obj = {};
                obj.name = t[i].folderName;
                obj.id = t[i].id;

                if (t[i].childFolders && t[i].childFolders.length > 0) {
                    obj.children = [];
                    obj.children = loop(t[i].childFolders);
                }
                nodes.push(obj);
            }
            tree({
                elem: '#demo',
                click: function(event) {
                    $('.tocatalog').html('确定<span class="red">' + title + '</span>到<span data-id=' + event.id + ' class="red foldid">' + event.name + '</span>吗?');
                },
                nodes: nodes
            })
        }
    })
}

function loop(arr) {
    if (arr && arr.length > 0) {
        var obj, nodes = [];
        $.each(arr, function(index, el) {
            obj = {};
            obj.name = el.folderName;
            obj.id = el.id;
            if (el.childFolders && el.childFolders.length > 0) {
                obj.children = [];
                obj.children = loop(el.childFolders);
            }
            nodes.push(obj);
        });
        return nodes;
    }
}

var $model = {};
// 文件上传
upload({
    url: '/api/CloudPan/PanUploadFiles?userid=' + getCookieByUserInfo('userid') + '&schoolid=' + window.schoolid,
    title: '文件上传',
    before: function(input) {
        $model.FileSize = input.files[0].size / 1024;
    },
    success: function(res) {
        if (res.status) {
            $model.FolderId = $('#Pid').val();
            $model.OSSUrl = res.data.ossUrl;
            $model.FileName = res.data.fileName;
            $model.Guid = res.data.guid;
            // $model.FileSize = res.data.fileSize;
            commonFn({
                url: 'CloudPan/ProUploadFiles',
                data: $model,
                type: 'post'
            }, function(res) {
                var Pid = $('#Pid').val();
                obtainList(Pid);
            })
        } else {
            layer.msg("文件上传失败", {
                shift: 2,
                time: 1000
            })
        }
    }
});
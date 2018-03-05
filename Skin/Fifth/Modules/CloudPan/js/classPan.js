/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-02 17:58:34
 * @version $Id$
 */

var $ = layui.jquery,
    form = layui.form(),
    layer = layui.layer,
    upload = layui.upload,
    classId;
commonFn({
    url: 'CloudPan/PublicInfo',
    async: false,
    data: {
        folderId: 0,
        classId: 0,
        // keyword: 0,
        search: 0,
        usertype: getCookieByUserInfo('logintype')
    }
}, function(response) {
    if (response.classes && response.classes.length > 0) {
        // 循环班级
        $('#GradeS').empty();
        for (var i = 0; i < response.classes.length; i++) {
            var dom = '<option value=' + response.classes[i].classId + '>' + response.classes[i].className + '</option>'
            $('#GradeS').append(dom);
            // $('#GradeS').val(response.currentClass);
            $('#GradeS').val(response.classPan.classId);
        }

        // form渲染数据
        form.render();
        getAllData(0, response.classPan.classId);
        // 监听select选择变更
        form.on('select(GradeS)', function(item) {

            getAllData(0, item.value);
        });
    }
})


function getAllData(folderid, classid, keyword, sb) {
    var getlistload = layer.load(),
        data = keyword ? {
            folderId: folderid || 0,
            classId: classid || 0,
            keyword: keyword,
            search: sb || 0,
            usertype: getCookieByUserInfo('logintype')
        } : {
            folderId: folderid || 0,
            classId: classid || 0,
            search: sb || 0,
            usertype: getCookieByUserInfo('logintype')
        };
    commonFn({
        url: 'CloudPan/PublicInfo',
        async: false,
        data: data,
    }, function(response) {
        layer.close(getlistload);
        $('#Classid').val(response.currentClass);
        if (response.classes && response.classes.length > 0) {
            $('#Pid').val(response.classPan.pid);
            $('tbody').empty();
            $('#nvfTable tr').empty();
            $('#FileList').empty();
            // end 列表数据清空重新获取

            // start 云盘的空间的计算
            $('#filenum').text(response.classPan.fileCount);
            $('#fileall').text(response.classPan.totalSize / 1048576);
            $('#filenow').text((response.classPan.userdSize / 1048576).toFixed(3));
            $('.progressNum').css('width', response.classPan.userdSize / 1048576 / response.classPan.totalSize / 1048576 + '%')
                // end 云盘的空间的计算

            // start 目录的操作
            var str = "<td width='100%'  align='left'>  <a  href='javascript:getAllData(0 ," + response.classPan.classId + ");'   class='btn btn-green'>  根目录</a>  ";
            var info = response.classPan.folderNav;
            if (info && info.length > 0) {
                for (var i = 0; i < info.length; i++) {
                    str += "   <a  href='javascript:getAllData(" + info[i].id + ", " + response.classPan.classId + ");'   class='btn btn-green'>  >" + info[i].folderName + "</a>   ";
                }
            }
            $('#nvfTable tr').append(str + '</td>');
            // end 目录的操作

            //start  循环文件夹
            if (!sb) {
                if (response.classPan.folders && response.classPan.folders.length > 0) {
                    var folder = response.classPan.folders;
                    for (var i = 0; i < folder.length; i++) {
                        $('#FileList').append('<tr  data-id="' + folder[i].id + '"><td style="margin-left:40%;"><a></a></td>' +
                            '<td align="left"><i class="floderIcon">&#xe697;</i><a  href="javascript:getAllData(' + folder[i].id + ' , ' + response.classPan.classId + ');"   class="link blue">  ' + folder[i].folderName + '</a></td>' +
                            '<td></td><td>' + solveTime(folder[i].createTime) + '</td><td></td>' +
                            '<td><span class="editDraft layui-btn layui-btn-mini yinc" data-operation="AjaxCloudPan.AddFolder" title="">修改名称</span>' +
                            '<span class="layui-btn layui-btn-mini layui-btn-danger del yinc" data-operation="AjaxCloudPan.Delete">删除</span></td></tr>');
                    }
                }
            }

            //end 循环文件夹

            //strat 循环文件
            if ($.isArray(response.classPan.files)) {
                var d = response.classPan.files;
                for (var i = 0; i < d.length; i++) {
                    var $btn = '<a class="layui-btn layui-btn-mini"  target="_blank" href="../mgResources/onLinePreview.html?id=' + d[i].id + '&Surl=' + d[i].ossUrl + '&type=1">预览</a>';
                    $('#FileList').append('<tr  data-id="' + d[i].id + '">');
                    $('#FileList').append('<td class="checkbox"><input type="checkbox" value="' + d[i].id + '" class="w-40 file-item" /></td>');
                    $('#FileList').append('<td align="left">' + d[i].fileName + '</td>');
                    $('#FileList').append('<td>' + String(d[i].fileSize).substring(0, 4) + ' KB</td>');
                    $('#FileList').append('<td>' + solveTime(d[i].createTime) + '</td><td>' + d[i].ownnerName + '</td>');
                    $('#FileList').append('<td><a class="layui-btn layui-btn-mini" download href="' + d[i].ossUrl + '">下载</a>' +
                        '<a class="layui-btn layui-btn-mini layui-btn-danger" onclick="delFiles(' + d[i].id + ',' + response.currentClass + ')">删除</a>' +
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

            //end 循环文件


            // 删除功能
            $('.del').click(function(event) {
                var dom = $(this).parents().parents()
                var id = dom.attr('data-id');
                var classId = $('#Classid').val();
                layer.confirm('是否删除?', {
                    icon: 3,
                    title: '删除提示'
                }, function(index) {
                    layer.close(index)
                    var modal = layer.load(1);
                    commonFn({
                        url: 'CloudPan/DeleteFolder?Ids=' + id + '&classId=' + classId,
                        data: {
                            Id: id,
                            FolderName: name,
                            classId: classId
                        },
                        type: 'delete'
                    }, function() {
                        layer.msg('删除成功');

                        getAllData(0, classId);
                        layer.close(modal);
                    })
                })
            });


            // 更改文件夹名称
            $('.editDraft').click(function(event) {
                var id = $(this).parents().parents().attr('data-id');
                var oldname = $(this).prev().text();

                $('p.oldfoldName').text(oldname);
                $('input[name="newfoldName"]').val('');
                var index = layer.open({
                    type: 1,
                    title: "修改文件夹名称",
                    area: ['400px', '200px'],
                    btn: ['确定'],
                    content: $('#Draftedit'),
                    yes: function(index) {
                        var name = $('input[name="newfoldName"]').val();
                        if ($.trim(name).length > 0) {
                            var classId = $('#Classid').val(),
                                edirname = layer.load();
                            commonFn({
                                url: 'CloudPan/EditFolder',
                                data: {
                                    Id: id,
                                    FolderName: name,
                                    classId: classId
                                },
                                type: 'post'
                            }, function() {
                                layer.msg('名称修改成功');

                                getAllData(0, classId);
                                layer.close(index);
                            })
                        } else {
                            layer.msg("文件夹名称不能为空")
                        }
                    }
                });
            });
        } else {
            $('#GradeS').append(' <option value></option>');
        }
        quanxian();
    })
}

function isYulan(isurl, id) {
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
}
var $model = {};
upload({
    url: '/api/CloudPan/ClassPanUploadFiles?userid=' + getCookieByUserInfo('userid') + '&classid=' + $('#GradeS').val() + '&schoolid=' + window.schoolid,
    title: '文件上传',
    before: function(input) {
        $model.FileSize = input.files[0].size / 1024;
    },
    success: function(res) {
        console.log(res);
        $model.FolderId = $('#Pid').val();
        $model.OSSUrl = res.data.ossUrl;
        $model.FileName = res.data.fileName;
        $model.Guid = res.data.guid;
        $model.ClassId = $('#GradeS').val();
        console.log($model, res.ossUrl, res.fileName, res.guid);
        commonFn({
            url: 'CloudPan/UploadFiles',
            data: $model,
            type: 'post'
        }, function(res) {
            layer.msg("文件上传成功")
            var Pid = $('#Pid').val();
            getAllData(Pid, $model.ClassId);
        })
    }
});

$('.search').click(function() {
    var Title = $('input[name="Title"]').val();
    if ($.trim(Title).length > 0) {
        getAllData(0, $('#Classid').val(), Title, 99);
    } else {
        getAllData(0, $('#Classid').val());
    }
});

// 新建文件夹
var modal;

function goDraft() {
    modal = layer.open({
        type: 1,
        title: "新建文件夹",
        area: ['400px', '200px'],
        btn: ['确定', '取消'],
        content: $('#Draft'),
        yes: function(index) {

            var model = {};
            model.FolderName = $('input[name="folder"]').val();
            if ($.trim(model.FolderName).length > 0) {
                layer.close(index);
                model.Pid = $('#Pid').val();;
                // model.Pid =$('#Pid').val();               
                model.OwnnerType = 2;
                model.OwnnerClass = $('#Classid').val();
                add(model, index);
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

function add(data, index) {
    commonFn({
        url: 'CloudPan/AddFolder',
        data: data,
        type: 'post'
    }, function() {
        var classId = $('#Classid').val();
        getAllData(0, classId);
        layer.msg('新建成功')
    })

}

// 删除文件
function delFiles(ids) {
    layer.confirm('是否删除?', {
        icon: 3,
        title: '提示'
    }, function(index) {
        layer.close(index)
        var modal = layer.load(1);
        commonFn({
            url: 'CloudPan/Delete?ids=' + ids,
            type: 'delete'
        }, function() {
            layer.msg('删除成功')
            getAllData(0, $('#Classid').val());
        })
    })
}
$(".removefolder").click(function() {
    var ids = new Array();
    ids.push($(this).parent().parent().attr("data-id"));
    delFolder(ids, $('#Classid').val());
});
// 删除文件夹
function delFolder(ids, classId) {
    AjaxUrlProcess("CloudPan/DeleteFolder", {
        ids: ids,
        classId: classId
    }, function(data) {
        layer.msg("操作成功");
        for (var i = 0; i < ids.length; i++) {
            $("tr[data-id='" + ids[i] + "']").remove();
        }
        location.reload();
    }, function(status, message) {
        layer.msg(message);
    });
}
$(".remove").click(function() {
    var ids = "";
    //ids.push($(this).parent().parent().attr("data-id"));
    ids = $(this).parent().parent().attr("data-id");
    delFiles(ids, $('#Classid').val());
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
    delFiles(ids, $('#Classid').val());
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
            var ClassIds = [$('#Pid').val() + '_' + $('#Classid').val()]
            ClassIds.push($('.tocatalog').children('.foldid').attr('data-id') + '_' + $('#Classid').val());
            if (!$('#Classid').val() || !$('.tocatalog').children('.foldid').attr('data-id')) {
                layer.msg('请选择班级和文件夹');
                return
            }
            model.ClassIds = ClassIds.join(',')
            model.classId = $('#Classid').val()
            var ispan = $('#left .active').text();
            model.ToPersonal = false;
            commonFn({
                url: 'CloudPan/MoveOrCopy',
                data: model,
                type: 'post'
            }, function() {
                getAllData(0, $('#Classid').val());
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
        url: 'CloudPan/GetFolderList?schoolid=' + window.schoolid,
        async: false
    }, function(response) {
        var nodes = [{
            name: "根目录",
            id: 0
        }];
        if (response.publics && response.publics.length > 0) {
            for (var i = 0; i < response.publics.length; i++) {
                var obj = {};
                obj.name = response.publics[i].className;
                obj.id = 0;
                if (response.publics[i].public != null) {
                    obj.children = [];
                    for (var d = 0; d < response.publics[i].public.length; d++) {
                        var obj1 = {};
                        obj1.name = response.publics[i].public[d].folderName;
                        obj1.id = response.publics[i].public[d].Id;
                        if (response.publics[i].public[d].childFolders != null) {
                            obj1.children = [];
                            obj1.children = loop(response.publics[i].public[d].childFolders)
                        }
                        obj.children.push(obj1);
                    }
                }
                nodes.push(obj);
            }
        }
        layui.tree({
            elem: '#demo',
            click: function(event) {
                $('.tocatalog').html('确定<span class="red">' + title + '</span>到<span data-id=' + event.id + ' class="red foldid">' + event.name + '</span>吗?');
            },
            nodes: nodes
        })
    })
}

function loop(arr) {
    if (arr && arr.length > 0) {
        var obj, nodes = [];
        $.each(arr, function(index, el) {
            obj = {};
            obj.name = el.folderName;
            obj.id = el.Id;
            if (el.childFolders && el.childFolders.length > 0) {
                obj.children = [];
                obj.children = loop(el.childFolders, obj.children);
            }
            nodes.push(obj);
        });
        return nodes;
    }
}
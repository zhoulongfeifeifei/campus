/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:32:09
 * @version $Id$
 */
getlist();

function getlist() {
    $('tbody').empty();
    commonFn({
        url: "OpenCourse/GetClassRoomType?schoolid=" + getCookieByUserInfo('schoolid')
    }, function(result) {
        if (result && result.length) {
            var tbody;
            for (var i = 0; i < result.length; i++) {
                tbody += "<tr><td>" + (i + 1) + "</td>" +
                    "<td>" + result[i].typeName + "</td>" +
                    "<td class='edit'>" +
                    "<a class=' layui-btn layui-btn-mini' href='javascript:editOrAnd(" + result[i].id + ")' title='编辑'>编辑</a>" +
                    "<a class='layui-btn layui-btn-mini layui-btn-danger' onclick='deleteData(" + result[i].id + ")' title='删除'>删除</a>" +
                    "</td>" +
                    "</tr>";
            }
            $('tbody').append(tbody);
        }

    })
}

function deleteData(id) {
    layer.confirm("确认删除学科？请谨慎操作，删除后无法恢复。", function(index) {
        layer.close(index);
        var reload = layer.load();
        commonFn({
            url: "OpenCourse/DelClassRoomType?id=" + id,
            type: "delete"
        }, function(json) {
            location.reload();
        }, function() {
            layer.close(reload);
        });
    })
}
function editOrAnd(id) {
    id = id ? id : 0;
    $('#id').val(id)
    layer.open({
        type: '1',
        title: "课程添加/编辑",
        content: $('#form1'),
        btn: ["确定", "取消"],
        success: function() {
            var getmodelload = layer.load();
            commonFn({
                url: "OpenCourse/GetClassRoomTypeModel",
                data: {
                    id: id
                }
            }, function(result) {
                layer.close(getmodelload);
                $('#typename').val(result.typeName);
                $('#id').val(result.id);
            })
        },
        yes: function(index, layero) {
            var d = {
                    typeName: $('input[name="TypeName"]').val(),
                    id: id,
                    schoolid: window.schoolid
                },
                reload = layer.load(),
                EditClassRoomTypeType = {
                    url: "OpenCourse/EditClassRoomTypeType",
                    data: d,
                    type: "post"
                };
            commonFn(EditClassRoomTypeType, function(json) {
                getlist();
                layer.close(reload);
                layer.close(index);
            });
        }
    })
}
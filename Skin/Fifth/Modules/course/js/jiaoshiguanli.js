/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:29:08
 * @version $Id$
 */
var name = getUrlParam("name"),
    form = layui.form();
getList(name);

function getList(name, typeId) {
    $('tbody').empty();
    var GetClassRoomByPage = {
        url: "OpenCourse/GetClassRoomByPage",
        data: {
            schoolid: getCookieByUserInfo('schoolid'),
            name: name,
            typeId: typeId || 0
        },
        type: 'post'
    };
    commonFn(GetClassRoomByPage, function(result) {
        //填充分类数据
        if (result.typeList && result.typeList.length) {
            $('.typeid').empty();
            var option = "<option value>教师类型</option>";
            for (var j = 0; j < result.typeList.length; j++) {
                option += "<option value=" + result.typeList[j].id + ">" + result.typeList[j].typeName + "</option>";
            }
            $('.typeid').append(option);
            if (typeId) $('.typeid').val(typeId);
            form.render('select');
        }
        //填充body
        if (result.classRoomList && result.classRoomList.length) {
            var tbody;
            for (var i = 0; i < result.classRoomList.length; i++) {
                tbody += "<tr><td>" + (i + 1) + "</td>" +
                    "<td>" + result.classRoomList[i].roomName + "</td>" +
                    "<td>" + result.classRoomList[i].typeName + "</td>" +
                    "<td>" + result.classRoomList[i].className + "</td>" +
                    "<td>" + result.classRoomList[i].name + "</td>" +
                    "<td>" + result.classRoomList[i].maxSeats + "</td>" +
                    "<td>" + result.classRoomList[i].buildingName + "</td>" +
                    "<td>" + result.classRoomList[i].floorName + "</td>" +
                    "<td>" + result.classRoomList[i].validSeats + "</td>" +
                    "<td>" + result.classRoomList[i].scoreSeats + "</td>" +
                    "<td>" + GetElectiveStauts(result.classRoomList[i].isElective) + "</td>" +
                    "<td class='edit'>" +
                    "<a class='layui-btn layui-btn-mini' href='javascript:editOrAnd(" + result.classRoomList[i].id + ")' title='编辑'>编辑</a>" +
                    "<a class='layui-btn layui-btn-mini layui-btn-danger' onclick='deleteData(" + result.classRoomList[i].id + ")' title='删除'>删除</a>" +
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
            url: "OpenCourse/DelClassRoom?id=" + id,
            type: "delete"
        }, function(json) {
            location.reload();
        }, function() {
            layer.close(reload);
        });
    })
}
var Name = "";
$('.search').on('click', function() {
    getList($('input[name="Title"]').val(), $('.typeid').val());
})
form.on('select(classType)', function(data) {
    getList($('input[name="Title"]').val(), data.value);
})

function editOrAnd(id) {
    id = id ? id : 0;
    $('#id').val(id)
    layer.open({
        type: '1',
        title: "教室添加/编辑",
        content: $('#form1'),
        area:"500px",
        btn: ["确定", "取消"],
        success: function() {

            var getClassRoom = {
                    url: "OpenCourse/GetClassRoomModel",
                    data: {
                        id: id,
                        schoolid: getCookieByUserInfo('schoolid')
                    }
                },
                getmodelload = layer.load();
            commonFn(getClassRoom, function(result) {
                layer.close(getmodelload);
                //教室类型
                if (result.typeList && result.typeList.length) {
                    var optionhtml = "<option value=0>教室类型</option>";
                    for (var i = 0; i < result.typeList.length; i++) {
                        optionhtml += "<option value=\"" + result.typeList[i].id + "\">" + result.typeList[i].typeName + "</option>";
                    }
                    $('.typeid').empty();
                    $('.typeid').append(optionhtml);
                }
                //选择班级
                if (result.classList && result.classList.length) {}
                var optionclasshtml = "<option value=0>无对应班级</option>";
                for (var j = 0; j < result.classList.length; j++) {
                    optionclasshtml += "<option value=" + result.classList[j].class_id + ">" + result.classList[j].class_name + "</option>";
                }
                $('#ClassId').empty();
                $('#ClassId').html(optionclasshtml);
                if (id != 0) {
                    //赋值
                    $('#RoomName').val(result.roomName);
                    $('#iselcetive').val(result.isElective);
                    $('#id').val(result.id);
                    $('.typeid').val(result.typeId);
                    $('#BuildingName').val(result.buildingName);
                    $('#FloorName').val(result.floorName);
                    $('#Name').val(result.name);
                    $('#ValidSeats').val(result.validSeats);
                    $('#ScoreSeats').val(result.scoreSeats);
                    $('#MaxSeats').val(result.maxSeats);
                    $('#ClassId').val(result.classId);
                    $('#Remarks').val(result.remarks);
                    form.render('select');
                }
            })

        },
        yes: function(index, layero) {
            // var savaLoad = layer.load(),
            var d = formSerialize($('#form1'));
            d.schoolId = getCookieByUserInfo('schoolid');
            console.log(d);
            var save = {
                url: "OpenCourse/EditClassRoom",
                data: d,
                type: "post"
            };
            commonFn(save, function(result) {
                getList();
                layer.close(index);
                layer.close(savaLoad);
            })
        }
    })
}

function GetElectiveStauts(value) {
    if (value == 1) {
        return "是";
    } else {
        return "否";
    }
}


function daoru() {
    layer.open({
        type: '1',
        title: "教室导入",
        content: $('#form2'),
        success: function(layero, index) {
            var uploadload;
            layui.upload({
                url: window.apiUrl + 'Common/ImportFile',
                elem: '#daoru',
                title: "上传模板",
                success: function(json) {
                    if (json.status == 1) {
                        $('#filename').val(json.data);
                        var SubjectImport = {
                            url: "OpenCourse/ClassRoomTemplateImport",
                            data: {
                                url: json.data,
                                schoolid:window.schoolid
                            }
                        };
                        commonFn(SubjectImport, function(result) {
                            layer.close(index);
                            layer.msg("上传成功");
                            getList();
                        })
                        
                    } else {
                        layer.msg("上传失败" + json.message)
                    }
                    layer.close(uploadload);
                }
            });
            $('.download').attr('href', window.siteHost + 'Filedown/GetModelTemplate?alias=classroom');
        }
    })
}
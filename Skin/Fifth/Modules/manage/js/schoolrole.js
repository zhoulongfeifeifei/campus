var layer = layui.layer,
    laypage = layui.laypage,
    form = layui.form(),
    schoolId = getCookieByUserInfo('schoolid'),
    roleId = 0;
getList(schoolId);

function getList(schoolId) {
    $('tbody').empty();
    commonFn({
        url: 'Manage/GetListRole',
        data: {
            schoolId: schoolId
        }
    }, function(t) {
        if (t && t.length > 0) {
            $.each(t, function(i, el) {
                $('tbody').append(`<tr>
                    <td>` + el.roleId + `</td>
                    <td>` + el.roleName + `</td>
                    <td>` + el.detail + `</td>
                    <td>
                        <span style="cursor: pointer;" data-id=`+el.roleId+` class="layui-btn layui-btn-mini rolebtn">权限</span>
                        <a class="layui-btn layui-btn-mini" onclick="delRole(`+el.roleId+`,`+el.schoolId+`)">删除</a>
                    </td>
                </tr>`)
            });
        }
    })
}


/********全选/全不选****************/
form.on('checkbox(allCheckbox)',function(data){
    var inps = $(".Role_ul input[type='checkbox']");
    if (data.elem.checked) {
        $(data.elem).removeAttr("checked", false);
        $.each(inps, function(i, n) {
            $(n).removeAttr("checked", false);
        })
    } else {
        $(data.elem).prop("checked", true);
        $(data.elem).attr("checked", true);
        $.each(inps, function(i, n) {
            $(n).prop("checked", true);
            $(n).attr("checked", true);
        })
    }
    form.render('checkbox')
})


/*******************编辑角色权限请求显示*********************/

$("body").on('click', '.rolebtn', function() {
    // $(".Role_zzc").show(); 
    // $('.Role_ul').empty();
    roleId = $(this).attr('data-id');
    layer.open({
        type: 1,
        title:"设置权限", 
        btn:["确定","取消"],
        offset: 't',
        area:['400px','500px'],
        content: $('#setPower'),
        success:function(){
            $('.Role_ul').empty();
            commonFn({
                url: 'Manage/GetTreeMenuByRole',
                data: {schoolId: schoolId,roleId: roleId}
            }, function(t) {
                // if (t && t.length > 0) {
                //     $.each(t, function(i, el) {
                //         $('<li>' + el.moduleName + '<input ModuleId="' + el.moduleId + '"  type="checkbox" ' + (el.hadRole == 1 ? "checked" : "") + '/></li>').appendTo('.Role_ul');
                //         var s = showRoles("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", el);
                //         $(s).appendTo('.Role_ul');
                //     });
                // }
                $("#Role_ul").ligerTree({
                    data: t,
                    idFieldName: 'id',
                    slide: false,
                    enabledCompleteCheckbox:false, 
                    parentIDFieldName: 'pid'
               });
            })
        },
        btn1:function(index,layero){
           console.log(getChecked());
           commonFn({
                url: 'Manage/SaveRole',
                data: {
                    schoolId: schoolId,
                    roleId: roleId,
                    roleList:getChecked()
                },
                type:'post'
            }, function(t) {
                parent.layer.msg("保存成功");
                layer.close(index);
            })
        }
    }); 
})
// 获取选中的权限
function getChecked(){
    var notes = $("#Role_ul").ligerGetTreeManager().getChecked();
    var id =[];
    for (var i = 0; i < notes.length; i++){   
       id.push(notes[i].data.id);
    }
    return id;
}
    //      /****************权限分配弹出层取消按钮***********************/

/* $('.power_ok').click(function() {
//     var inputLenght = $('.Role_ul input:checked').length;
//     var checkedArray = new Array();

//     for (var p = 0; p < inputLenght; p++) {
//         checkedArray.push($('.Role_ul input:checked:eq(' + p + ')').attr('moduleid'));
//     }
//     var model = {
//         schoolId: schoolId,
//         roleId: roleId,
//         roleList: checkedArray
//     }
//     var strmodel = JSON.stringify(model);
//     commonFn({
//         url: 'Manage/SaveRole',
//         data: {
//             role: strmodel
//         }
//     }, function() {
//         layer.msg('添加成功');
//         $(".Role_zzc").hide();
//         $('.Role_ul').empty();
//     })
 });

$("body").on("click", ".power_no", function() {
    $(".Role_zzc").hide();
    $('.Role_ul').empty();
})*/

$('.adder').click(function() {
    var Name = $('input[name="jsName"]').val();
    var Detail = $('input[name="jsDetail"]').val();
    if (Name == '') {
        layer.msg('角色名称不能为空');
        return
    }
    commonFn({
        url: 'Manage/AddRole',
        data: {
            schoolId: schoolId,
            roleName: Name,
            detail: Detail
        },
        type: 'post'
    }, function() {
        $('input[name="jsName"],input[name="jsDetail"]').val('');
        layer.msg('添加成功');
        getList(schoolId);
    })
});

/********************页面加载角色列表显示****************************/

function showRoles(space, role) {
    var li = "";
    if (role.Children != null) {
        $.each(role.Children, function(j, z) {
            li += '<li>' + space + z.ModuleName + '<input ModuleId="' + z.ModuleId + '"  type="checkbox" ' + (z.HadRole == 1 ? "checked" : "") + '/></li>';
            li += showRoles(space + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", z);
        });
    }
    return li;
}

function delRole(a,schoolId) {
    layer.confirm('你确定要删除吗？', function(index) {
        layer.close(index);
        commonFn({
            url: 'Manage/DelRole?roleId='+a,
            type: 'delete'
        }, function() {
            layer.msg("删除成功")
            getList(schoolId);
        })
    })
}
//退出登录
$("#out").on("click", function() {
    clearToken();
})
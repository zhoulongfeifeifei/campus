/**
 *
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 17:54:19
 * @version $Id$
 */

var form = layui.form(),
    upload = layui.upload,
    layer = layui.layer,
    element = layui.element(),
    Id = getUrlParam('id'),
    userIdList, TargetUrl,
    getinit = layer.load();
var zjTree;
var zjTreeArr=[];
GetListAllselect();
function GetListAllselect(catalog,type,grade,subject,jiaoCai){
    var GetListAllAttribute = {
        url: "SchoolResources/GetListAllAttribute",
        data: {
            schoolid: window.schoolid
        },
        type: "get"
    };
    commonFn(GetListAllAttribute, function(data) {

        layer.close(getinit);
        var d = data;
        // 资源栏目
        if(d.catalogs != null) {
            $('#reColumn').html("<option value=''></option>");
            for(var h = 0; h < d.catalogs.length; h++) {
                $('#reColumn').append('<option value="' + d.catalogs[h].id + '">' + d.catalogs[h].name + '</option>')
            }
            $('#reColumn').find("option[value='"+catalog+"']").attr("selected","selected");

        }
        if(d.types != null) {
            // 资源类型
            $('#reType').html("<option value=''></option>");
            for(var i = 0; i < d.types.length; i++) {
                $('#reType').append('<option value="' + d.types[i].id + '">' + d.types[i].name + '</option>')
            }
            $('#reType').find("option[value='"+type+"']").attr("selected","selected");

        }
        if(d.grade != null) {
            //班级
            $('#juniorGrade').html("<option value=''></option>");
            for(var j = 0; j < d.grade.length; j++) {
                $('#juniorGrade').append('<option value="' + d.grade[j].id + '">' + d.grade[j].name + '</option>')
            }
            $('#juniorGrade').find("option[value='"+grade+"']").attr("selected","selected");

        }
        if(Id) {
            if(d.subjects != null) {
                $('#theSubject').html("<option value=''></option>");
                for(var c = 0; c < d.subjects.length; c++) {
                    $('#theSubject').append('<option value="' + d.subjects[c].subject_id + '">' + d.subjects[c].subject_name + '</option>')
                }
                $('#theSubject').find("option[value='"+subject+"']").attr("selected","selected");

            }
            if(d.jiaoCais != null) {
                $('#teachMaterial').html("<option value=''></option>");
                for(var cc = 0; cc < d.jiaoCais.length; cc++) {
                    $('#teachMaterial').append('<option value="' + d.jiaoCais[cc].id + '">' + d.jiaoCais[cc].name + '</option>')
                }
                $('#teachMaterial').find("option[value='"+jiaoCai+"']").attr("selected","selected");
            }
        }
        form.render();
    })
}
$('#uploadTree').on('click', function() {
    var gradeid = $('#juniorGrade').val();
    var subjects = $('#theSubject').val();
    var jiaocais = $('#teachMaterial').val();
    if(!gradeid) layer.msg("需指定年级");
    else if(!subjects) layer.msg("需指定学科");
    else if(!jiaocais) layer.msg("需指定教材");
    else $('#treeDemo').empty(), getChaper(gradeid, subjects, jiaocais);
})
// 选择年级
form.on('select(juniorGrade)', function(data) {
    getCondtion(1, data.value, -1);
})
// 选择科目
form.on('select(theSubject)', function(data) {
    getCondtion(2, $('#juniorGrade').val(), data.value);
})
// 选择教材
form.on('select(teachMaterial)', function(data) {
})



function getCondtion(a, b, c) {
    var GetConditions = {
        url: "SchoolResources/GetConditions",
        data: {
            condition: a,
            grade: b,
            subject: c,
            schoolid: window.schoolid
        },
        type: "get"
    };
    commonFn(GetConditions, function(res) {
        if(a == 1) {
            // 学科
            $('#theSubject').html("<option value='0'></option>");
            $('#teachMaterial').html("<option value='0'></option>");
            if(res.length>0){
                for(var j = 0; j < res.length; j++) {
                    $('#theSubject').append('<option value="' + res[j].subject_id + '">' + res[j].subject_name + '</option>')
                }
                $('#theSubject').find("option[value='"+res[0].subject_id+"']").attr('selected',"selected");
                getCondtion(2, b, res[0].subject_id);
            }
            getChaper($('#juniorGrade').val(), $('#theSubject').val(), $('#teachMaterial').val());
            form.render('select');
        }else if(a == 2) {
            // 教材
            $('#teachMaterial').html("<option value='0'></option>");
            if(res.length>0){
                for(var j = 0; j < res.length; j++) {
                    $('#teachMaterial').append('<option value="' + res[j].id + '">' + res[j].name + '</option>')
                }
                $('#teachMaterial').find("option[value='"+res[0].id+"']").attr('selected',"selected");

            }
            getChaper($('#juniorGrade').val(), $('#theSubject').val(), $('#teachMaterial').val());
            form.render('select');
        }

    })

}

if(Id) {
    $('select').removeAttr('disabled');
    form.render();
    var GetModel = {
        url: "SchoolResources/GetModel",
        data: {
            Id: Id,
            schoolid: window.schoolid
        },
        type: "get"
    };
    commonFn(GetModel, function(res) {
        $('input[name="reName"]').val(res.name);
        GetListAllselect(res.catalogId,res.typeId,res.gradeId,res.subjectId,res.jiaoCaiId);
        $('#Notes').val(res.descript);
        $('input[name="keyword"]').val(res.keywords);
        TargetUrl = res.targetUrl;
        var strChar = res.charpterId;
        getChaper(res.gradeId, res.subjectId, res.jiaoCaiId, strChar);
        $('#file').append('<span class="sb" data-url="' + res.fileUrl + '" style="color:red;display:block">' + res.name + '</span>')
        var username = [];
        var userid = [];
        if(res.userLists != null) {
            for(var i = 0; i < res.userLists.length; i++) {
                username.push(res.userLists[i].userName);
            }
            $('input[name="openObject"]').val(username.join(';'))
            userIdList = res.userList;
        }
        form.render();
    })
}

var uploadmodal;

upload({
    url: window.apiUrl + 'Common/UploadFile',
    title: '选择文件',
    type: 'file',
    ext: 'txt|jpg|png|gif|zip|rar|ppt|doc|docx|rtf|xls|xlsx|csv|pptx|pps|ppsx|pdf',
    before: function(input) {
        fileName = input.files[0].name;
    },
    success: function(res) {
        layer.close(uploadmodal)
        if(res.status == 1) {
            TargetUrl = '';
            var urls = (res.data[0]).split("/");
            var urlname = urls[urls.length - 1];
            $('#file').find('.sb').remove();
            $('input[name="reName"]').val(fileName);
            $('#file').append('<span class="sb" data-url="' + res.data + '" style="color:#000;display:block">' + fileName + '</span>');
            layer.msg("文件上传成功");

        } else {
            layer.msg("文件上传失败")
        }
    }
});

form.on('submit(Sava)', function() {
    var modal = {}
    modal.FileUrl = $('#file').find('.sb').attr('data-url');
    if(!modal.FileUrl) {
        layer.msg("必须上传文件", {
            icon: 5,
            shift: 6
        });
        return;
    }
    zjTree.alert();
    if(zjTreeArr.length>0){
        modal.CharpterId = zjTreeArr.join(",");
    }else{
        layer.msg("请选择章节目录", {
            icon: 5,
            shift: 6
        });
        return;
    }
    modal.Name = $('input[name="reName"]').val();
    // 栏目
    modal.CatalogId = $('#reColumn').val();
    // 类型
    modal.TypeId = $('#reType').val();
    // 年级
    modal.GradeId = $('#juniorGrade').val();
    // 科目
    modal.SubjectId = $('#theSubject').val();
    // 教材
    modal.JiaoCaiId = $('#teachMaterial').val();
    // 对象
    modal.ReceiveUsers = userIdList; //这可能是个对象也可能是个字符串, 需要以字符串的形式给他
    if(typeof userIdList != 'string') modal.ReceiveUsers = JSON.stringify(userIdList);
    // 说明
    modal.Descript = $('#Notes').val();
    // 关键字
    modal.Keywords = $('input[name="keyword"]').val();
    modal.schoolid = window.schoolid;

    var urls, adup;
    if(Id) {
        modal.Id = Id;
        modal.TargetUrl = TargetUrl;
        urls = 'SchoolResources/UpdateResFile';
        adup = "修改成功"
    } else {
        urls = 'SchoolResources/AddResFiles'
        adup = "添加成功"
    }
    var GetModel = {
        url: urls,
        data: modal,
        type: "post"
    };
    commonFn(GetModel, function(res) {
        layer.msg(adup, {
            shift: 5,
            time: 1000
        }, function() {
        	var muid=window.localStorage.getItem("menuid");
            location.href = "mgResourceAll.html?id="+muid;
        })
    })
});

// 选择人的操作
$('.choice').click(function() {
    $(this).text("重新选择");
    $('input[name="openObject"]').val('');
    layer.open({
        type: 2,
        title: "选择公开对象",
        closeBtn: 1,
        shadeClose: true,
        skin: 'yourclass',
        area: ['600px', '500px'],
        content: '../../Common/Receiver/Receiver.html?id=2', //这里content是一个DOM
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
                if(usertype) {
                    usertypes.push(usertype);
                } else if(userid) {
                    userlists.push(userid);
                }
                usernames.push(username);
                $('input[name="openObject"]').val(usernames.join(','));
            });

            var obj = {};
            obj.SchoolId = window.schoolid;
            // obj.SchoolId = $("#layui-layer-iframe" + index).contents().find('#SchoolId').val();
            obj.UserTypeList = usertypes;
            obj.UserIdList = userlists;
            userIdList = obj;

            layer.close(index);
        }
    })
})

function clearKeeper() { //清空选择人
    $('input[name="openObject"]').val("");
    userIdList = '';
}

function getChaper(GradeId,SubjectId,JiaoCaiId,num) {
    var ajaxGetAllChapterTree = {
        url: 'Resource/GetAllChapterTree',
        type: 'get',
        data: {
            jiaocaiid: JiaoCaiId,
            gradeid: GradeId,
            subjectid: SubjectId,
            schoolid:window.schoolid,
            id:0
        }
    }
    $('#treeDemo').empty();
    commonFn(ajaxGetAllChapterTree, function(data) {
        zjTree=$('#treeDemo').ligerTree({
            data: data,
            checkbox: true,
            idFieldName: 'id',
            parentIDFieldName: 'pid',
            autoCheckboxEven:false
        })
        if(num){
            var charid = num.split(",");
            for(var i = 0; i < charid.length; i++) {
                $("#treeDemo li[id='" + charid[i] + "'] ").find("div.l-checkbox").removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
            }
        }
    })
}

//获取树选中的节点id
$.ligerui.controls.Tree.prototype.alert = function() {
    zjTreeArr.splice(0,zjTreeArr.length);
    var data = this.getChecked();
    for(var i = 0; i < data.length; i++) {
        zjTreeArr.push(data[i].data.id);
    }
};

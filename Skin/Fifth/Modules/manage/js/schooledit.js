
/*****************获取学生信息**********************/
var saveUrl = "/Manage/AddSchool",
id = getUrlParam('id'),
form= layui.form();

if (id) {
    $("legend").html("编辑学校");
    $("#school_id").val(id);
    saveUrl = "Manage/UpdateSchool";
    commonFn({
        url: 'Manage/GetModelSchool',
        data: {schoolId: id},
    }, function(res) {
        for (key in res) {
            $("#" + key).val(res[key]);
            $("#school_type option[value='" + key.school_type + "']").attr("selected", "selected");
        }
        check(res.state, $("#State"));
        form.render();
    })
}
function check(a, b) {

    if (a == 1) {
        b.attr("checked", "checked");
    } else {
        b.checked = false;
    }
}

///保存
$("#save").on("click", function() {
    $("input[type='checkbox']:checked").val(1);
    var bb = aa($("#form0"));
    commonFn({
        url: saveUrl,
        data:bb,
        type:'post'
    }, function(res) {
         window.location.href = "schoollist.html";
    })
})
var aa = function(form) {
        var o = {};
        $.each(form.serializeArray(), function(index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }
    //退出登录
$("#out").on("click", function() {
    // $.ajax({
    //  url: '/AjaxUser/LoginOut',
    //  snysc: false,
    //  success: function(data) {
    //      if(data.Status==1){
    //          location.href = "/Skin/5/login.html";
    //      }
    //  }
    // })
    clearToken();
})
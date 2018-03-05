var layer = layui.layer,
    laypage = layui.laypage;
/*****************获取学生信息**********************/
var id = getUrlParam('id');
if (id) {
    $("#schoolid").val(id);
    commonFn({
        url: 'Manage/GetModelAdmin',
        data: {
            schoolId: id
        }
    }, function(data) {
        location.href = "adminselect.html?id=" + id;
    })
}
///保存
$("#save").on("click", function() {
    $("input[type='checkbox']:checked").val(1);
    var bb = aa($("#form0"));
    commonFn({
        url: 'Manage/AddSchoolAdmin',
        data:bb
    }, function(res) {
         window.location.href = "schoollist.html";
    })
})

function aa(form) {
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
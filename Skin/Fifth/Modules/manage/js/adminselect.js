var form =layui.form(),
/*****************获取信息**********************/
id = getUrlParam('id');
if (id) {
    commonFn({
        url: 'Manage/GetModelAdmin',
        data: {schoolId: id}
    }, function(data) {
        $.each(data.teacherList, function(i, n) {
            $("#userId").append('<option value="' + n.user_id + '">' + n.name + '</option>');
        })
        $("#name").val(data.admin.name);
        $("#name").attr('data-id',data.admin.user_id);
        form.render();
    })
}
///保存
$("#save").on("click", function() {
    var model={
        schoolId : id,
        oldUserId : $('#name').attr('data-id'),
        userId : $("#userId").val()
    }
    commonFn({
        url: 'Manage/SelectSchoolAdmin',
        data:model,
        type:'post'
    }, function(res) {
        window.location.href = "schoollist.html";
    })
})

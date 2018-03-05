// $('#bar li').click(function () {
//     $('#bar .sty').removeClass('sty').siblings().addClass('sty')
// })

//教师表单验证
layui.use('form', function () {
    var form = layui.form()
    // 密码验证
    form.verify({
        req:function (value) {
            if (value.length<0){
                layer.msg('账号不能为空')
            }
        },
        Adminpass: [/(.+){7,12}$/, '密码必须7到12位'],
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        content: function (value) {
            layedit.sync(editIndex);
        }
    });
})

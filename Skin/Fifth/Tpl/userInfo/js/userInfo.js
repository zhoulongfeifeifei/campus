/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-28 14:53:55
 * @version $Id$
 */

var form = layui.form(),
    layer = layui.layer,
    upload = layui.upload,
    laydate = layui.laydate,
    $form = $('form'),
    $pass = $('.setPass'),
    $faceUrl;
getUserInfo();
layui.upload({
    url: window.apiUrl +'Common/UploadFile',
    title: '上传图片',
    success: function(res) {
        $('#userFace').attr('src', res.data[0]);
    }
})
$('#Sava').click(function(event) {
    layer.confirm("确定更新吗?", {
        icon: 3,
        title: "提示"
    }, function(ha) {
        layer.close(ha);
        var model = {};
        model.face =$('#userFace').attr('src');
        model.sex = $form.find('input[name="sex"]:checked').val();
        model.address = $form.find('input[name="address"]').val();
        model.homephone = $form.find('input[name="homephone"]').val();
        model.mobile = $form.find('input[name="mobile"]').val();
        model.birthday = $form.find('input[name="birthday"]').val();
        model.name = $form.find('input[name="Name"]').val();
        commonFn({
            url: 'Account/ZXEditUserInfo',
            data: model,
            type:'post'
        },function(){
            layer.msg("更新成功");
            getUserInfo();
            parent.getUserInfo();

        })
    })
});
// 修改密码
$('.Password').click(function(event) {
    layer.open({
        type: 1,
        btn: "确定修改",
        content: $('.setPass'),
        yes: function(index) {
            var $index = index;
            var OldPassword = $pass.find('input[name="newpass0"]').val();
            var NewPassword = $pass.find('input[name="newpass1"]').val();
            var ConfirmPassword = $pass.find('input[name="newpass2"]').val();
            if (!OldPassword || !NewPassword || !ConfirmPassword) {
                layer.msg("输入框不能为空");
            } else if (NewPassword === ConfirmPassword) {
                layer.confirm("确定修改密码吗?", {
                    icon: 3,
                    title: "修改密码"
                }, function(okno) {
                    layer.close(okno);
                    commonFn({
                        url: 'Account/ZXChangePassword',
                        type: 'post',
                        data: {
                            OldPassword: OldPassword,
                            NewPassword: NewPassword,
                            ConfirmPassword: ConfirmPassword
                        }
                    }, function(res) {
                        layer.alert("修改成功,请重新登录!", {

                        }, function(index) {
                            layer.close(index);
                            top.location.href = window.apiHost + "Skin/login.html"
                        });
                    })
                })
            } else {
                layer.msg("输入的两次密码不一致")
            }
        }
    })
});

function getUserInfo() {
    commonFn({
        url: 'Account/CurrentInfo',
        type: 'post',
    }, function(res) {
        // $('#displayUserFace').attr('src', res.image ? res.image : '../../Common/img/7.png');
        $('.userinfo').find('h3').text(isNull(res.name));
        $('.userinfo').find('div').text(isNull(res.user_name));
        $('#userFace').attr('src', res.image ? res.image : '../../Common/img/7.png');
        $form.find('input[name="Name"]').val(isNull(res.name));
        $form.find('input[name="sex"][value=' + res.sex + ']').attr('checked', true);
        $form.find('input[name="birthday"]').val(solveTime(res.birthday));
        $form.find('input[name="address"]').val(isNull(res.address));
        $form.find('input[name="mobile"]').val(isNull(res.mobile));
        $form.find('input[name="homephone"]').val(isNull(res.homePhone));
        form.render();
    })
}
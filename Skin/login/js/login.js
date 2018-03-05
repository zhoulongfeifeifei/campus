/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-13 13:44:27
 * @version $Id$
 */
$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        if ($('.selectRole').hasClass('disnone') && !$('.appleId').hasClass('disnone'))
            postAppleId()
        else
            signIn();      
    }
});
$('#selectIdentity').on('click','li',function(){
    $(this).addClass('greenBorder').siblings().removeClass('greenBorder');
});

function postAppleId(){
    getToken(data().userName, data().password,function(token,status){
        if (status) { $(".error").html(token); return }
        var $token = token.access_token;
        setCookie(window.skinKey, "Fifth", window.tokenExpire);
        setCookie(window.tokenKey, $token, window.tokenExpire);
        console.log(getCookie(window.tokenKey));
        commonFn({url:'Account/CurrentSchoolRole',type:'post'},function(res){
            if (res && res.length > 1) {
                $('.appleId').addClass('disnone').siblings('.selectRole').removeClass('disnone'); 
                eachRole(res);
            }else{
                if (res[0].usertype.length > 1) {
                    $('.appleId').addClass('disnone').siblings('.selectRole').removeClass('disnone');
                    eachRole(res);
                }else{
                    setCookieObj(res);
                }
            } 
        })
    });// 获取token
}
function eachRole(res){
    $('#selectSchool , #selectIdentity').empty();
    $.each(res, function(index, val) {
        // if (index == 0) { checked = 'checked' }
        var checked = index == 0 ? 'checked' : ''
        $('#selectSchool').append('<li>'+
            '<label>'+
                '<img src="login/img/school.png" alt="">'+
                '<p>'+val.school_name+'</p>'+
                '<input type="radio" name="school" value='+val.school_id+' '+checked+'>'+
            '</label>'+
        '</li>')
        $.each(val.usertype, function(index2, val2) {
            // if (index2 == 0) { greenBorder = 'greenBorder' }
            var greenBorder = index2 == 0 ? 'greenBorder' : ''
            $('#selectIdentity').append('<li class="'+greenBorder+'" data-role='+val2+'>'+
                '<img src="login/img/teacher.png" alt="">'+
                '<p>我是'+sbderena(val2)+'</p>'+
            '</li>')
        });
    });
}
// 登录的方法;
function signIn() {
    var res = [{
        school_id : data().schoolid,
        school_name : data().school_name,
        usertype:[data().logintype]
    }];
    setCookieObj(res , data())
}
// 请求个人信息存储cookie的方法
function setCookieObj(res,datafn){
    commonFn({url:'Account/CurrentInfo',type:'post'},function(data){
        var cookieObj = {
            userid:data.id,
            name:data.name,
            logintype:res[0].usertype[0],
            schoolid:res[0].school_id
        }
        setCookie(window.userObj, JSON.stringify(cookieObj), window.tokenExpire);
        LoginIn(res[0].usertype[0]);
    })
}

function sbderena(a){
    switch(a){
        case "parent":
        return "家长";
        break
        case "student":
        return "学生";
        break
        case "admin":
        return "管理";
        break
        case "teacher":
        return "老师";
        break
    }
}

// data处理的方法
function data(){
    var model = {};
    model.userName = $("input[name='userName']").val();
    model.password = $("input[name='password']").val();
    if (!model.userName) {
        $(".error").html("请输入账号！");
        return false;
    }
    if (!model.password) {
        $(".error").html("请输入密码！");
        return false;
    }
    model.school_name = $('input[name="school"]:checked').prev().text();
    model.schoolid = $('input[name="school"]:checked').val();
    model.logintype = $('.greenBorder').attr('data-role');
    return model;
}

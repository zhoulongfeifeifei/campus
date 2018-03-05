
var form = layui.form(),
    userType, userId, $url;
schoolid = getCookieByUserInfo('schoolid');
userType = getCookieByUserInfo('logintype');
userId = getCookieByUserInfo('userid');
// console.log(userType);
listInfor();
function listInfor(){
    var Score = {
        url:'Score/HistoryScoreBySubject',
        data:{
            schoolId:schoolid
        },
        type:'post'
    }
    commonFn(Score,function (res) {
        var t = res.historyScoreBySubjectList;
        $.each(t,function (k,el) {
            $('#babyScore').append(
                '<li>' +
                    '<div class="topimg">' +
                         '<img src="../../Common/img/usertx.png" alt="">' +
                    '</div>' +
                '<div class="content">' +
                    '<h3>' + el.userName + '</h3>' +
                    '<p>' + solveTime(el.inTime) + ' 提交 ' + el.scoreTypeName + ' 成绩</p>' +
                '</div>' +
                '<div class="clear select" id="select">' +
                    '<a href="../../Modules/EduRelease/Release.html?id=' + el.scoreId + '" class="layui-btn layui-btn-small layui-btn-normal right">查看详情</a>' +
                '</div></li>')

        })
        $('#select').css('display','block');
    })
}
//判断登录类型的





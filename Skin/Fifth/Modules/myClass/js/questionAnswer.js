/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-26 15:58:24
 * @version $Id$
 */

/**
 * 班级通知前台js
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-26 10:42:44
 * @version $Id$
 */

var form = layui.form(),
    laypage = layui.laypage,
    element = layui.element(),
    userType, userId;


userType = getCookieByUserInfo('logintype');
userId = getCookieByUserInfo('userid');
if (userType == 'parent' || userType == 'student') {
    $('.quest').css('display', 'block');
    $('.Q-A').css('display', 'none');
    commonFn({
        url: 'Question/GetTeacherByStudent',
        data:{logintype:userType}
    }, function(res) {
        if (res && res.length > 0) {
            $.each(res, function(index, el) {
                $('#teacherList').append('<option value=' + el.user_id + '>' + el.name + '</option>')
            });
        }
        form.render(); //更新全部
        $('.Sava').click(function(event) {
            var question = $.trim($('#question').val());
            var ToUserId = $('#teacherList').val();
            if (question.length > 0) {
                if (ToUserId) {
                    commonFn({
                        url: 'Question/AddQuestion',
                        data: {
                            Question: question,
                            ToUserId: ToUserId
                        },
                        type:'post'
                    }, function() {
                        $('#question').val('');
                        $('#teacherList').val('');
                        layer.msg('提问成功', {
                            time: 1000
                        }, function() {
                            getNoticeList(1)
                        })
                    })
                } else {
                    layer.msg("请选择老师");
                }
            } else {
                layer.msg("请输入问题");
            }
        });

    })
}
getNoticeList();

// 监听tab切换
element.on('tab', function(data) {
    getNoticeList(data.index + 1);
});

// 请求接口的方法
function getNoticeList(stateId, curr) {
    stateId = stateId ? stateId : 1;
    commonFn({
        url: 'Question/GetQuestionList',
        data: {
            state: stateId,
            logintype : userType
        }
    }, function(res) {
        $('#noQuestionList').empty();
        $('#okQuestionList').empty();
        if (res.resultData) {
            var t = res.resultData;

            if (stateId == 1) {
                $.each(t, function(index, el) {
                    $('#noQuestionList').append(' <li>' +
                        '<div class="topimg">' +
                        '<img src="../../Common/img/usertx.png" alt="">' +
                        '</div>' +
                        '<div class="content">' +
                        '<h3>' + el.fromUserName + '</h3> ' +
                        '<span>' + solveTime(el.answerTime) + '</span>' +
                        '<p>' + el.question + '</p>' +
                        '<div class="Q-A">' +
                        '<input class="Q" type="text">' +
                        '<input data-qid=' + el.qId + ' class="A" type="button" value="回答">' +
                        '</div>' +
                        '</div>' +
                        '</li>')
                });
                if (userType == 'parent' || userType == 'student') {
                    $('.quest').css('display', 'block');
                    $('.Q-A').css('display', 'none');
                }   
            } else if (stateId == 2) {
                $.each(t, function(index, el) {
                    $('#okQuestionList').append(' <li>' +
                        '<div class="topimg">' +
                        '<img src="../../Common/img/usertx.png" alt="">' +
                        '</div>' +
                        '<div class="content">' +
                        '<h3>' + el.fromUserName + '</h3> ' +
                        '<span>' + solveTime(el.answerTime) + '</span>' +
                        '<p>' + el.question + '</p>' +
                        '<div class="Q-A">' +
                        '<span>' + el.toUserName + '</span>:' +
                        '<span>' + el.answer + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</li>')
                });
                
            }

            
        }
        $('.A').click(function() {
            var answer = $.trim($(this).prev('.Q').val());
            var qid = $(this).attr('data-qid');
            if (answer.length > 0) {
                commonFn({
                    url: 'Question/UpdateQuesAnswer',
                    data: {
                        QId: qid,
                        Answer: answer
                    },
                    type:'post'
                }, function(res) {
                    layer.msg('回答成功', {
                        time: 1000
                    }, function() {
                        getNoticeList()
                    })
                })
            } else {
                layer.msg('请输入答案');
            }

        });

    })
}
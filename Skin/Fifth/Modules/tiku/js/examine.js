var form = layui.form();
var schoolid = window.schoolid;
var gradeArray = [];
var optionStr = "";
getUserArray();
getGradeArray();
//添加各科目
var subjectAjax = {
    url: 'TKCommon/GetSubjectList',
    data: {
        schoolid: schoolid,
        gradeid: 0
    },
    async: false
};
commonFn(subjectAjax,
    function (result) {
        $('.subjectlist').empty();
        $('.content').empty();
        for (var i = 0; i < result.length; i++) {
            var cursubjectid = result[i].subject_id;
            if (i == 0) {
                $('.subjectlist').append('<li class="layui-this" data-id="' +
                    result[i].subject_id +
                    '">' +
                    result[i].subject_name +
                    "</li>");

                $('.content').append('<div class="layui-tab-item layui-show clearfix">' +
                    getGrade(cursubjectid) +
                    '</div>');
            } else {
                $('.subjectlist').append('<li data-id="' +
                    result[i].subject_id +
                    '">' +
                    result[i].subject_name +
                    "</li>");

                $('.content').append('<div class="layui-tab-item">' + getGrade(cursubjectid) + '</div>');

            }
            form.render();
        }
    });
//setTimeout(function () {
        
//    },
//    500);


function getGrade(subjectId) {
    var retStr = getSubjectExamine(subjectId, 0, "");
    $.each(gradeArray,function(i, val) {
        retStr += getSubjectExamine(subjectId, val.id, val.grade);
    })
    return retStr;
}

///获取年级列表
function getGradeArray() {
    var gradeAjax = {
        url: 'TKCommon/GetGradeList',
        data: {
            schoolid: schoolid
        },
        async: false
};
    commonFn(gradeAjax, function (result) {
        gradeArray = result;
    })
    return gradeArray;
}

function getSubjectExamine(subjectid,gradeid,gradename) {
    var htmlStr="";
    if (gradeid == 0) {
        htmlStr = '<div class="layui-form"><span class="tele" data-id="0">学科负责人：</span>';
    } else {
        htmlStr = '<div class="layui-form"><span class="tele" data-id="' +
            gradeid +
            '">' +
            gradename +
            '试题审核人：</span>';
    }
    var str = getExamineUser(subjectid, gradeid);
    htmlStr += str; 
    htmlStr += '<div class="layui-form-item"><div class="layui-input-inline">';
    htmlStr += '<select name="quiz1" class="addUserid">';
    htmlStr += optionStr;
    htmlStr += '</select>';
    htmlStr += '</div>' + '</div>';
    htmlStr += '<a><span class="tianja" onclick="addUser(this,' + subjectid + ',' + gradeid + ')">添加审核人</span></a>';
    htmlStr += '</div>';
    return htmlStr;
}

function getExamineUser(subjectid, gradeid) {
    var htmlStr = "";
    var userAjax = {
        url: 'TKMyQuestion/GetExamineContrls',
        data: {
            subjectId: subjectid,
            gradeId: gradeid
        },
        async: false
    };
    commonFn(userAjax,
        function (json) {
            for (var j = 0; j < json.length; j++) {
                htmlStr += '<input type="text" class="text" value="' + json[j].userName + '">';
                htmlStr += '<span class="text_span"><a href="javascript:;" onclick="delUser(' +
                        json[j].userId +
                        ',' +
                        subjectid +
                        ',' + gradeid + ')"><i class="layui-icon">&#xe640;</i></a></span>';
            }
        });
    return htmlStr;
}
function getUserArray() {
    var teacherArgs = {
        url: 'Teacher/GetTeacherList',
        type: 'post',
        data: {
            status: 1,
            schoolid: schoolid,
            pageIndex: 1,
            pageSize: 99999
        },
        async: false
    };
    commonFn(teacherArgs,
        function (teacherJson) {
            for (var t = 0; t < teacherJson.resultData.length; t++) {
                optionStr += '<option value="' + teacherJson.resultData[t].userId + '">' + teacherJson.resultData[t].name + '</option>';
            }
            
        });
    return optionStr;
}

function addUser(th,subjectid, gradeid) {
    var selectVal = $(th).parent().find('.addUserid').val();
    //console.log(selectVal);
    var postuserData = {
        url: 'TKMyQuestion/AddExaminePeople',
        type: 'post',
        data: {
            userId: selectVal,
            subjectId: subjectid,
            gradeId: gradeid
        }
    };
    commonFn(postuserData, function (json) {
        if (json) {
            layer.msg('保存成功', { time: 1000 }, function () {
                layer.closeAll();
                location.reload();
            });
        }
    })
}

function delUser(userid, subjectid, gradeid) {
    var postData = {
        url: 'TKMyQuestion/DelExaminePeople',
        type: 'post',
        data: {
            userId: userid,
            subjectId: subjectid,
            gradeId: gradeid
        }
    };
    commonFn(postData,function(json) {
        if (json) {
            layer.msg('删除成功', { time: 1000 }, function () {
                layer.closeAll();
                location.reload();
            });
        }
    })
}


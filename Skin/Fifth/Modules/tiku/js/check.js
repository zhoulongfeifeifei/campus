var tid = 0;
var sid = 0;
var qtid = 0;
var did = 0;
var tid2 = 0;
var sid2 = 0;
var qtid2 = 0;
var did2 = 0;
var laypage = layui.laypage;
questionlist(0, 0, 0, 0, 0, 1);
$('.main .con').click(function () {
    $(this).css('border', 'solid 1px green');
    $(this).parent().siblings().find('.con').css('border', 'solid 1px #ddd');
})


var GetTestResourceList = {
    url: "TKCommon/GetTestResourceList",
    type: "POST"
};
commonFn(GetTestResourceList, function (json) {
    var html = "";
    $.each(json, function (i, n) {
        html += "<span data-id='" + n.id + "'>" + n.sourceName + "</span>";
    });
    $("#all1").after(html);
    $("#all5").after(html);
})

var GetExamineControl = {
    url: "TKQuestionCreate/GetExamineControl",
    type: "Get",
    data: {
        subjectid: 0
    }
};
commonFn(GetExamineControl, function (json) {
    var html = "";
    $.each(json, function (i, n) {
        html += "<span data-id='" + n.subjectId + "'>" + n.subjectName + "</span>";
    });
    $("#all2").after(html);
    $("#all6").after(html);
})

var GetQuestionTypeList = {
    url: "TKCommon/GetQuestionTypeList",
    type: "Get",
    data: {
        subjectid: 0
    }
};
commonFn(GetQuestionTypeList, function (json) {
    var html = "";
    $.each(json, function (i, n) {
        html += "<span data-id='" + n.id + "'>" + n.typeName + "</span>";
    });
    $("#all3").after(html);
    $("#all7").after(html);
})

var GetDifficultyList = {
    url: "TKCommon/GetDifficultyList",
    type: "POST"
};
commonFn(GetDifficultyList, function (json) {
    var html = "";
    $.each(json, function (i, n) {
        html += "<span data-id='" + n.id + "'>" + n.difficuteName + "</span>";
    });
    $("#all4").after(html);
    $("#all8").after(html);
})

function questionlist(testSourceId, questionTypeId, difficultyId, flag, subjectid, current) {
    var model = {};
    model.testSourceId = testSourceId;
    model.questionTypeId = questionTypeId;
    model.difficultyId = difficultyId;
    model.examineFlag = flag;
    model.subjectId = subjectid;
    model.schoolId = window.schoolid;
    model.pageIndex = current;
    var GetQuestionsByPage = {
        url: "TKQuestionCreate/GetQuestionsByPage",
        type: "POST",
        data: model
    };
    commonFn(GetQuestionsByPage, function (json) {
        var html1 = "";
        var html2 = "";
        laypage({
            cont: 'page1',
            pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: json.pageIndex,
            groups: 5,
            jump: function (e, first) { //触发分页后的回调                
                if (!first) { //一定要加此判断，否则初始时会无限刷 
                    questionlist(0, 0, 0, 0, 0, e.curr);
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        $(".main_top").siblings("section").empty();
        $("#main2").children("section").empty();
        if (json.resultData != null) {
            $.each(json.resultData, function (i, n) {
                time = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                html1 += "<section>" +
                    "<input type='checkbox' name='question' data-id=" + n.id + " value=''>" +
                    "<div class='con'>" +
                    "<p class='info'>" +
                    "题号：<span>" + n.id + "</span>" +
                    "题型：<span>" + n.typeName + "</span>" +
                    "日期：<span class='red'>" + time + "</span>" +
                    "试题难度：<span class='red'>" + n.difficuteName + "</span>" +
                    "答题时间：<span class='red'>" + n.suggestionTime + "分钟</span>" +
                    "<span>" + GetFlag(n.examineFlag) + "</span>" +
                    "<span>" + n.sourceName + "</span>" +
                    "</p>" +
                    "<div class='que'>" +
                    "<p class='p1'>" +
                    "" + GetSource(n.questionSource) + "" +
                    "<span>分享者：<i class='green'>" + n.createUserName + "</i></span>" +
                    "</p>" +
                    "" + n.question + "" +
                    "<p class='p2'>" +
                    "<span class='nopass' data-id=" + n.id + ">审批驳回</span>" +
                    "<span class='pass' data-id=" + n.id + ">审批通过</span>" +
                    "</p>" +
                    "</div>" +
                    "<div class='ans'>" +
                    "<p class='daan'>" +
                    "<span>答案</span>" + n.correctAnswer + "" +
                    "</p>" +
                    "<p class='jiexi'>" +
                    "<span>解析</span>" +
                    "" + n.analysis + "" +
                    "</p>" +
                    "<p class='zhishi'>" +
                    "<span>知识点</span>" +
                    "<span>" + n.knowledgeName + "</span>" +
                    "</p>" +
                    "<p class='zhangjie'>" +
                    "<span>章节</span>" +
                    "<span>" + n.chapterName + "</span>" +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</section>";
                html2 += "<section>" +
                    "<div class='con'>" +
                    "<p class='info'>" +
                    "题号：<span>" + n.id + "</span>" +
                    "题型：<span>" + n.typeName + "</span>" +
                    "日期：<span class='red'>" + time + "</span>" +
                    "试题难度：<span class='red'>" + n.difficuteName + "</span>" +
                    "答题时间：<span class='red'>" + n.suggestionTime + "分钟</span>" +
                    "<span>审批人：" + n.examineUserName + "</span>" +
                    "<span>" + GetFlag(n.examineFlag) + "</span>" +
                    "</p>" +
                    "<div class='que'>" +
                    "<p class='p1'>" +
                    "" + GetSource(n.questionSource) + "" +
                    "<span>分享者：<i class='green'>" + n.createUserName + "</i></span>" +
                    "</p>" +
                    "" + n.question + "" +
                    "<p class='p2'>" +
                    "<span class='delete' data-id=" + n.id + ">删除试题</span>" +
                    "</p>" +
                    "</div>" +
                    "<div class='ans'>" +
                    "<p class='daan'>" +
                    "<span>答案</span>" + n.correctAnswer + "" +
                    "</p>" +
                    "<p class='jiexi'>" +
                    "<span>解析</span>" +
                    "" + n.analysis + "" +
                    "</p>" +
                    "<p class='zhishi'>" +
                    "<span>知识点</span>" +
                    "<span>" + n.knowledgeName + "</span>" +
                    "</p>" +
                    "<p class='zhangjie'>" +
                    "<span>章节</span>" +
                    "<span>" + n.chapterName + "</span>" +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</section>";
            });
            if (flag == 0) $(".main_top").after(html1);
            else $("#main2").prepend(html2);
        }
    })
}

function GetFlag(flag) {
    if (flag == 0) return "待审批";
    else if (flag == 1) return "审批通过";
    else if (flag == 2) return "审批不通过";
}

function GetSource(questionsource) {
    if (questionsource != "") return "来源：<span>" + questionsource + "</span>";
    else return "";
}

$("body").on('click', '.top_p1 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var testSourceId = $(this).attr("data-id");
    tid = testSourceId;
    questionlist(testSourceId, qtid, did, 0, sid, 1);
});

$("body").on('click', '.top_p2 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var subjectid = $(this).attr("data-id");
    sid = subjectid;
    var GetQuestionTypeList = {
        url: "TKCommon/GetQuestionTypeList",
        type: "Get",
        data: {
            subjectid: subjectid
        }
    };
    commonFn(GetQuestionTypeList, function (json) {
        var html = "";
        $("#all3").siblings('span').empty();
        $.each(json, function (i, n) {
            html += "<span data-id='" + n.id + "'>" + n.typeName + "</span>";
        });
        $("#all3").after(html);
    })
    questionlist(tid, qtid, did, 0, subjectid, 1);
});
$("body").on('click', '.top_p3 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var questionTypeId = $(this).attr("data-id");
    qtid = questionTypeId;
    questionlist(tid, questionTypeId, did, 0, sid, 1);
});
$("body").on('click', '.top_p4 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var difficultyId = $(this).attr("data-id");
    did = difficultyId;
    questionlist(tid, qtid, difficultyId, 0, sid, 1);
});

$("body").on('click', '.top_p5 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var testSourceId = $(this).attr("data-id");
    tid2 = testSourceId;
    questionlist(testSourceId, qtid2, did2, 1, sid2, 1);
});

$("body").on('click', '.top_p6 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var subjectid = $(this).attr("data-id");
    sid2 = subjectid;
    var GetQuestionTypeList = {
        url: "TKCommon/GetQuestionTypeList",
        type: "Get",
        data: {
            subjectid: subjectid
        }
    };
    commonFn(GetQuestionTypeList, function (json) {
        var html = "";
        $("#all3").siblings('span').empty();
        $.each(json, function (i, n) {
            html += "<span data-id='" + n.id + "'>" + n.typeName + "</span>";
        });
        $("#all3").after(html);
    })
    questionlist(tid2, qtid2, did2, 1, subjectid, 1);
});
$("body").on('click', '.top_p7 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var questionTypeId = $(this).attr("data-id");
    qtid2 = questionTypeId;
    questionlist(tid2, questionTypeId, did2, 1, sid2, 1);
});
$("body").on('click', '.top_p8 span', function () {
    $(this).attr("class", "on");
    $(this).siblings('span').removeAttr("class", "on");
    var difficultyId = $(this).attr("data-id");
    did2 = difficultyId;
    questionlist(tid2, qtid2, difficultyId, 1, sid2, 1);
});

$("body").on('click', '.nopass', function () {
    var id = $(this).attr("data-id");
    if (confirm('你确定要驳回该试题吗？')) {
        var ExamineQuestion = {
            url: "TKQuestionCreate/ExamineQuestion",
            type: "Get",
            data: {
                ids: id,
                examineflag: 2
            }
        };
        commonFn(ExamineQuestion, function (json) {
            if (json) {
                layer.msg("审核驳回成功", { time: 1000 }, function () {
                    questionlist(tid, qtid, did, 0, sid, 1);
                });
            }
        })
    }
});

$("body").on('click', '.pass', function () {
    var id = $(this).attr("data-id");
    if (confirm('你确定要通过该试题吗？')) {
        var ExamineQuestion = {
            url: "TKQuestionCreate/ExamineQuestion",
            type: "Get",
            data: {
                ids: id,
                examineflag: 1
            }
        };
        commonFn(ExamineQuestion, function (json) {
            if (json) {
                layer.msg("审核通过成功", { time: 1000 }, function () {
                    questionlist(tid, qtid, did, 0, sid, 1);
                });
            }
            else {
                layer.msg("审核通过失败", { time: 1000 }, function () {
                });
            }
        })
    }
});

$("#allcheck1").click(function () {
    if (this.checked) {
        $("#main1 :checkbox").prop("checked", true);
    } else {
        $("#main1 :checkbox").prop("checked", false);
    }
})

$(".main_top_s1").click(function () {
    var id = "";
    $('input[name="question"]:checked').each(function (i, n) {
        id = id + $(n).attr("data-id") + ',';
    })
    if (id.length > 1) {
        if (confirm('你确定要通过这些试题吗？')) {
            id = id.substr(0, id.length - 1);
            var ExamineQuestion = {
                url: "TKQuestionCreate/ExamineQuestion",
                type: "Get",
                data: {
                    ids: id,
                    examineflag: 1
                }
            };
            commonFn(ExamineQuestion, function (json) {
                if (json) {
                    layer.msg("批量审核通过成功", { time: 1000, offset: "100px" }, function () {
                        if (('input[name="allcheck"]:checked')) $("#main1 :checkbox").removeAttr("checked");
                        questionlist(tid, qtid, did, 0, sid, 1);
                    });
                }
                else {
                    layer.msg("批量审核通过失败", { time: 1000, offset: "100px" }, function () {
                    });
                }
            })
        }
    }
    else {
        layer.msg("请至少选择一道试题", { time: 1000, offset: "100px" }, function () {
        });
    }
})

$(".main_top_s2").click(function () {
    var id = "";
    $('input[name="question"]:checked').each(function (i, n) {
        id = id + $(n).attr("data-id") + ',';
    })
    if (id.length > 1) {
        if (confirm('你确定要驳回这些试题吗？')) {
            id = id.substr(0, id.length - 1);
            var ExamineQuestion = {
                url: "TKQuestionCreate/ExamineQuestion",
                type: "Get",
                data: {
                    ids: id,
                    examineflag: 2
                }
            };
            commonFn(ExamineQuestion, function (json) {
                if (json) {
                    layer.msg("批量审核驳回成功", { time: 1000, offset: "100px" }, function () {
                        if (('input[name="allcheck"]:checked')) $("#main1 :checkbox").removeAttr("checked");
                        questionlist(tid, qtid, did, 0, sid, 1);
                    });
                }
                else {
                    layer.msg("批量审核驳回失败", { time: 1000, offset: "100px" }, function () {
                    });
                }
            })
        }
    }
    else {
        layer.msg("请至少选择一道试题", { time: 1000, offset: "100px" }, function () {
        });
    }
})

$("#dai").click(function () {
    questionlist(0, 0, 0, 0, 0, 1);
})
$("#yi").click(function () {
    questionlist(0, 0, 0, 1, 0, 1);
})

$("body").on('click', '.delete', function () {
    var id = $(this).attr("data-id");
    if (confirm('你确定要删除该试题吗？')) {
        var DeleteQuestion = {
            url: "TKQuestionCreate/DeleteQuestion",
            type: "Get",
            data: {
                id: id
            }
        };
        commonFn(DeleteQuestion, function (json) {
            if (json) {
                layer.msg("删除成功", { time: 1000 }, function () {
                    questionlist(tid2, qtid2, did2, 1, sid2, 1);
                });
            }
            else {
                layer.msg("删除失败", { time: 1000 }, function () {
                });
            }
        })
    }
})





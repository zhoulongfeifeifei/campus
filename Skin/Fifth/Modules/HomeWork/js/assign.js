
var subjectid, gradeid,grade, jiaocaiid, kemuid, workt;
var zhiId, zhiName, kaoId, kaoName, jiaoId, jiaoName;
var source, type, difficulty;
var dan = [], duo = [], pan = [], tian = [], jie = [], zongti = [];
var dan00 = [], duo00 = [], pan00 = [], tian00 = [], jie00 = [], account = [];
var a = 0, b = 0, c = 0, d = 0, e = 0;
var coun = 0;
var str_shi, str_zong;
var num, numzong;
var dant = [], duot = [], pant = [], tiant = [], jiet = [], zongtime = [];
var tingli;
var laypage = layui.laypage;


aa('ben')
function aa(questionSource) {
    if ($('#zujuan .top1 .on').attr('data-id') == 'ben') {
        source = 0;
        commonFn({ url: 'TKCommon/GetAllGrade?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
            $('#zujuan .top3').empty().append('<b>年级：</b>');
            $.each(res, function (i) {
                $('#zujuan .top3').append('<span data-id="' + res[i].id + '">' + res[i].grade + '</span>')
            })
        })
        commonFn({ url: 'OpenCourse/GetSubjectList?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
            $('#zujuan .top2').empty().append('<b>科目：</b>');
            $.each(res, function (i) {
                $('#zujuan .top2').append('<span data-id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>')
            })
        })
    }
    if ($('#zujuan .top1 .on').attr('data-id') == 'wo') {
        source = 1;
        commonFn({ url: 'TKCommon/GetGradeList?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
            $('#zujuan .top3').empty().append('<b>年级：</b>');
            $.each(res, function (i) {
                $('#zujuan .top3').append('<span data-id="' + res[i].id + '">' + res[i].grade + '</span>')
            })
        })
        $('#zujuan .top3').on('click', 'span', function () {
            $(this).addClass('on').siblings().removeClass('on');
            gradeid = $(this).attr('data-id');
            commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + gradeid, type: 'GET' }, function (res) {
                $('#zujuan .top2').empty().append('<b>科目：</b>');
                $.each(res, function (i) {
                    $('#zujuan .top2').append('<span data-id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>')
                })
            })
        })
    }
}
function jiaocai(kemuid) {
    commonFn({ url: 'ZYHomeWorkWeb/GetTeaBookList?schoolid=' + window.schoolid + '&subjectid=' + kemuid, type: 'GET' }, function (res) {
        $('#zujuan .top4').empty().append('<b>教材：</b>');
        $.each(res, function (i) {
            $('#zujuan .top4').append('<span data_gra="' + res[i].gradeId + '" data_sub="' + res[i].subjectId + '" data_jiao="' + res[i].jiaoCaiId + '">' + res[i].name + res[i].gradename + res[i].subject_name + '</span>');
        })
    })
    commonFn({ url: 'TKCommon/GetQuestionTypeList?subjectid=' + kemuid, type: 'GET' }, function (res) {
        $('#zujuan .right .lei').empty().append('<b>试题类型：</b><span class="on" data-id="0">全部</span>');
        $.each(res, function (i) {
            $('#zujuan .right .lei').append('<span data-id="' + res[i].id + '">' + res[i].typeName + '</span>');
        })
    })
}
content(0, 0, 0, 0, 0, 0, null, null, null,1,0);
function content(questionSource, questionTypeId, difficultyId, gradeId, subjectId, type, jiaoId, kaoId, zhiId, current, worktype, laiyuan) {
    var model = {};
    var sear = $('#sea').val();
    model.questionSource = questionSource;
    model.schoolId = window.schoolid;
    model.questionTypeId = questionTypeId;
    model.difficultyId = difficultyId;
    model.gradeId = gradeId;
    model.subjectId = subjectId;
    model.pageIndex = current;
    model.type = type;
    model.workType = worktype;
    model.source = laiyuan;
    
    if (zhiId != '' && zhiId != 0 && zhiId != null && zhiId != undefined) model.knowledgeId = zhiId;
    if (kaoId != '' && kaoId != 0 && kaoId != null && kaoId != undefined) model.testId = kaoId;
    if (jiaoId != '' && jiaoId != 0 && jiaoId != null && jiaoId != undefined) model.chapterId = jiaoId;
    commonFn({ url: 'ZYHomeWorkWeb/GetQuestions', type: 'POST', data: model }, function (res) {
        var resdata = res.resultData;
        var text = '';
        laypage({
            cont: 'page1',
            pages: res.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: res.pageIndex,
            groups: 5,
            jump: function (e, first) { //触发分页后的回调                
                if (!first) { //一定要加此判断，否则初始时会无限刷 
                    // content(e.curr);
                    if (kemuid == undefined || kemuid == null) kemuid = 0;
                    if (difficulty == undefined || difficulty == null) difficulty = 0;
                    if (gradeid == undefined || gradeid == null) gradeid = 0;
                    if (workt == undefined || workt == null) workt = 0;
                    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, e.curr,workt, sear);
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        // $("#zujuan .main_top").siblings("section").remove();
        $("#zujuan .in").siblings("section").remove();
        if (resdata != null) {
            $.each(resdata, function (i) {
                // http://60.190.202.57:1001//f0i5l7e5/0/alluser/20170627/ac594612aadf478a8b55681deda04111.mp3
                if (worktype == 2) tingli = '<audio controls><source src="' + resdata[i].audio + '" type="audio/mpeg"></audio>';
                else tingli = '';
                time = new Date(resdata[i].intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                // <input type="checkbox" name="ques">
                text += '<section data_id="' + resdata[i].id + '"><input type="checkbox" name="ques" data_qt="' + resdata[i].qtype + '" data_time="' + resdata[i].suggestionTime + '"><div class="con"><p class="info">题号：<span>' + ((current - 1) * 10 + (i + 1)) + '</span>题型：<span>' +
                    resdata[i].typeName + '</span>日期：<span>' + time + '</span>难度：<span>' + resdata[i].difficuteName + '</span>正确率：<span>' +
                    resdata[i].accuracy + '%</span>答题时间：<span>' + resdata[i].suggestionTime + '分钟</span></p><div class="que"><p class="p1">来源：<span class="red">' +
                    resdata[i].questionSource + '</span><span class="jia" data_id="' + resdata[i].qtype + '" data_time="' + resdata[i].suggestionTime + '">加入试卷</span></p><div class="tigan">' + resdata[i].question + '</div></div>' + tingli + '<div class="ans"><p class="daan"><span>答案</span>' +
                    resdata[i].correctAnswer + '</p><p class="jiexi"><span>解析</span>' + resdata[i].analysis + '</p></div></div></section>'
            })
            $("#zujuan .main_top").after(text);
            // $("#zujuan .in").after(text);
        }

    })
}

$('#zujuan .right .lei').on('click', 'span', function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    type = $(this).attr('data-id');
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
})
$('#zujuan .right .zuo').on('click', 'span', function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    workt = $(this).attr('data-id');
    if (type == undefined || type == null) type = 0;
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
})
$('#zujuan .right .nan').on('click', 'span', function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    difficulty = $(this).attr('data-id');
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
})
$('#zujuan .top3').on('click', 'span', function () {
    $(this).addClass('on').siblings().removeClass('on');
    gradeid = $(this).attr('data-id');
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    content(source, type, difficulty, gradeid, kemuid, 0, null, null, null, 1,workt);
})
jiaocai(31);

$('#zujuan .top2').on('click', 'span', function () {
    $(this).addClass('on').siblings().removeClass('on');
    kemuid = $(this).attr('data-id');
    jiaocai(kemuid);
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    content(source, type, difficulty, gradeid, kemuid, 0, null, null, null, 1,workt);
})

$('#zujuan .title .zhang').click(function () {
    alert('请先选择教材')
})
$('#zujuan .title .kao').click(function () {
    alert('请先选择教材')
})
$('#zujuan .title .zhi').click(function () {
    alert('请先选择教材')
})
$('#zujuan .top4').on('click', 'span', function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    var subjectid = $(this).attr('data_sub');
    var grade = $(this).attr('data_gra');
    var jiaocaiid = $(this).attr('data_jiao');
    commonFn({ url: 'TKResource/GetListResChapter?schoolid=' + window.schoolid + '&subjectid=' + subjectid + '&gradeid=' + grade + '&jiaocaiid=' + jiaocaiid, type: "get" }, function (data) {
        // $("#demo").empty();
        $("#demo").ligerTree({
            data: data,
            checkbox: false,
            //ajaxType: 'get',
            idFieldName: 'id',
            onSelect: function (node, e) {
                jiaoName = node.data.name;
                jiaoId = node.data.id;
                if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
                if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
                content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
            }
        })
    });
    $('#zujuan .title .zhang').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('#zujuan .left p').html('章节');
        $("#demo").empty();
        commonFn({ url: 'TKResource/GetListResChapter?schoolid=' + window.schoolid + '&subjectid=' + subjectid + '&gradeid=' + grade + '&jiaocaiid=' + jiaocaiid, type: "get" }, function (data) {

            $("#demo").ligerTree({
                data: data,
                checkbox: false,
                //ajaxType: 'get',
                idFieldName: 'id',
                onSelect: function (node, e) {
                    jiaoName = node.data.name;
                    jiaoId = node.data.id;
                    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
                    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
                    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
                }
            })
        });
    })
    $('#zujuan .title .kao').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('#zujuan .left p').html('考点');
        $("#demo").empty();
        commonFn({ url: 'TKResource/GetListResTestTree?schoolid=' + window.schoolid + '&subjectid=' + subjectid + '&gradeid=' + grade + '&jiaocaiid=' + jiaocaiid, type: "get" }, function (data) {
            $("#demo").ligerTree({
                data: data,
                checkbox: false,
                //ajaxType: 'get',
                idFieldName: 'id',
                onSelect: function (node, e) {
                    kaoName = node.data.name;
                    kaoId = node.data.id;
                    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
                    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
                    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
                }
            })
        });
    })
    $('#zujuan .title .zhi').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('#zujuan .left p').html('知识点');
        $("#demo").empty();
        commonFn({ url: 'TKResource/GetListResKnowledgeTree?schoolid=' + window.schoolid + '&subjectid=' + subjectid + '&gradeid=' + grade + '&jiaocaiid=' + jiaocaiid, type: "get" }, function (data) {
            $("#demo").ligerTree({
                data: data,
                checkbox: false,
                //ajaxType: 'get',
                idFieldName: 'id',
                onSelect: function (node, e) {
                    zhiName = node.data.name;
                    zhiId = node.data.id;
                    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
                    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
                    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
                }
            })
        });
    })
});

commonFn({ url: 'TKCommon/GetDifficultyList', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('#zujuan .right .nan').append('<span data-id="' + res[i].id + '">' + res[i].difficuteName + '</span>');
    })
})

$('#zujuan .top1 span').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
    var questionSource = $(this).attr('data-id');
    aa(questionSource);
})
$('#zujuan .top1').on('click', 'span', function () {
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    content(source, type, difficulty, gradeid, kemuid, 0, null, null, null, 1,workt);
});
$('#zujuan .right .xin').click(function () {
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt);
})
$('#zujuan .right .zheng').click(function () {
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 1, jiaoId, kaoId, zhiId, 1,workt);
})
$('#zujuan .main_top img').click(function(){
    var sear = $('#sea').val();
    if (kemuid == undefined || kemuid == null) kemuid = 0;
    if (workt == undefined || workt == null) workt = 0;
    if (type == undefined || type == null) type = 0;
    if (gradeid == undefined || gradeid == null) gradeid = 0;
    if (difficulty == undefined || difficulty == null) difficulty = 0;
    if (jiaoId == undefined || jiaoId == '' || jiaoId == 0) jiaoId = null;
    if (kaoId == undefined || kaoId == '' || kaoId == 0) kaoId = null;
    if (zhiId == undefined || zhiId == '' || zhiId == 0) zhiId = null;
    content(source, type, difficulty, gradeid, kemuid, 0, jiaoId, kaoId, zhiId, 1,workt, sear);
})


$('#main1').on('click', '.jia', function () {
    var timuid = $(this).parent().parent().parent().parent('section').attr('data_id');
    var timu = $(this).parent().next('.tigan').html();
    var qid = $(this).attr('data_id');
    var timeid = Number($(this).attr('data_time'));
    coun += timeid;
    if (jQuery.inArray(timuid, account) != -1) {
        alert('请不要重复添加！');
        return;
    } else {
        zongti.push(timu);
        zongtime.push(timeid);
        account.push(timuid);
        if (qid == 1) {
            a++;
        } if (qid == 2) {
            b++;
        } if (qid == 3) {
            c++;
        } if (qid == 4) {
            d++;
        } if (qid == 5) {
            e++;
        }
    }

    $('#zujuan .fixed .num').html(a + b + c + d + e);
    $('#yulan .top .zong').empty().append('共' + (a + b + c + d + e) + '题&nbsp;&nbsp;');
    $('#yulan .top .shi').empty().append('推荐用时' + coun + '分钟');
    if (zongti != '') {
        $('#yulan .main .sec').empty();
        $.each(zongti, function (i) {
            var text = zongti[i].replace(/<.*?>/ig, "");
            $('#yulan .sec').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_id="' + i + '">删除</span></div>');
            $('#yulan .sec div').eq(i).find('.del').attr('data_time', zongtime[i]);
        })
        $('#yulan .sec div').eq(0).find('.up').css('display', 'none')
        $('#yulan .sec div').eq(zongti.length - 1).find('.down').css('display', 'none')
    }
})
$('#zujuan .main .main_top_s1').on('click', function () {
    $("#zujuan #main1>section input").each(function (i) {
        if ($(this).prop('checked') == true) {
            var timuid = $(this).parent('section').attr('data_id');
            var timu = $(this).next('.con').find('.que').find('.tigan').html();
            var qid = $(this).attr('data_qt');
            var timeid = Number($(this).attr('data_time'));
            coun += timeid;
            zongti.push(timu);
            zongtime.push(timeid);
            account.push(timuid);
            if (qid == 1) {
                a++;
            } if (qid == 2) {
                b++;
            } if (qid == 3) {
                c++;
            } if (qid == 4) {
                d++;
            } if (qid == 5) {
                e++;
            }

            $('#zujuan .fixed .num').html(a + b + c + d + e);
            $('#yulan .top .zong').empty().append('共' + (a + b + c + d + e) + '题&nbsp;&nbsp;');
            $('#yulan .top .shi').empty().append('推荐用时' + coun + '分钟');
            if (zongti != '') {
                $('#yulan .main .sec').empty();
                $.each(zongti, function (i) {
                    var text = zongti[i].replace(/<.*?>/ig, "");
                    $('#yulan .sec').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_id="' + i + '">删除</span></div>');
                    $('#yulan .sec div').eq(i).find('.del').attr('data_time', zongtime[i]);
                })
                $('#yulan .sec div').eq(0).find('.up').css('display', 'none')
                $('#yulan .sec div').eq(zongti.length - 1).find('.down').css('display', 'none')
            }
        }
    })
})
$('#yulan .main .sec').on('click', '.del', function () {
    str_shi = $('#yulan .top .shi').html();
    num = parseInt(str_shi.replace(/[^0-9]/ig, ""));
    str_zong = $('#yulan .top .zong').html();
    numzong = Number(parseInt(str_zong.replace(/[^0-9]/ig, ""))) || 0;

    numzong--;
    // a = numzong;

    zongti.splice($(this).attr('data_id'), 1)
    zongtime.splice($(this).attr('data_id'), 1)
    account.splice($(this).attr('data_id'), 1)
    $('#yulan .main .sec').empty();
    $.each(zongti, function (i) {
        var text = zongti[i].replace(/<.*?>/ig, "");
        $('#yulan .sec').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_id="' + i + '">删除</span></div>');
        $('#yulan .sec div').eq(i).find('.del').attr('data_time', zongtime[i]);
    })
    $('#yulan .sec div').eq(0).find('.up').css('display', 'none')
    $('#yulan .sec div').eq(zongti.length - 1).find('.down').css('display', 'none')

    if (numzong > 0) {
        $('#yulan .top .zong').html('共' + numzong + '题&nbsp;&nbsp;');
    } else {
        $('#yulan .top .zong').html('');
    }
    
    $('#yulan .top .shi').html('推荐用时' + (num - $(this).attr('data_time')) + '分钟');
    coun = num - $(this).attr('data_time');
})

$('#yulan .main .sec').on('click', '.up', function () {
    // if ($(this).attr('data_qt') == 1) {
        $('#yulan .main .sec').empty();
        // $('#yulan .main .sec').append('<p class="title">单选题</p>');
        var tt = zongti[$(this).attr('data_id')]
        zongti[$(this).attr('data_id')] = zongti[$(this).attr('data_id') - 1]
        zongti[$(this).attr('data_id') - 1] = tt;
        var aaa = account[$(this).attr('data_id')]
        account[$(this).attr('data_id')] = account[$(this).attr('data_id') - 1]
        account[$(this).attr('data_id') - 1] = aaa;
        $.each(zongti, function (i) {
            var text = zongti[i].replace(/<.*?>/ig, "");
            $('#yulan .sec').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_id="' + i + '">删除</span></div>');
            $('#yulan .sec div').eq(i).find('.del').attr('data_time', zongtime[i]);
        })
        $('#yulan .sec div').eq(0).find('.up').css('display', 'none')
        $('#yulan .sec div').eq(zongti.length - 1).find('.down').css('display', 'none')
    // }
})

$('#yulan .main .sec').on('click', '.down', function () {

    $('#yulan .main .sec').empty();
    var index = Number($(this).attr('data_id'));
    var tt = zongti[index]
    zongti[index] = zongti[index + 1]
    zongti[index + 1] = tt;
    var aaa = account[index]
    account[index] = account[index + 1]
    account[index + 1] = aaa;
    $.each(zongti, function (i) {
        var text = zongti[i].replace(/<.*?>/ig, "");
        $('#yulan .sec').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_id="' + i + '">删除</span></div>');
        $('#yulan .sec div').eq(i).find('.del').attr('data_time', zongtime[i]);
    })
    $('#yulan .sec div').eq(0).find('.up').css('display', 'none')
    $('#yulan .sec div').eq(zongti.length - 1).find('.down').css('display', 'none')

})

if (window.location.search.indexOf('type=0') != -1) {
    $('#yulan .que').css('display', 'none');
    $('#yulan .xia').on('click', function () {
        // var account = dan00.concat(duo00).concat(pan00).concat(tian00).concat(jie00);
        var questionids = '';
        var idlen = account.length - 1;
        var shijuan = {};
        $.each(account, function (i) {
            questionids += account[i]
            if (i != idlen) {
                questionids += ",";
            }
        })
        var shiname = $('#yulan .middle input[type="text"]').val();
        var recommen = $('#yulan .middle input[type="radio"]:checked').val();
        if (recommen == '' || recommen == undefined || recommen == null) recommen = 0;
        shijuan.questionIds = questionids;
        shijuan.name = shiname;
        shijuan.isRecommend = recommen;
        if (questionids != '' && questionids != null) {
            commonFn({ url: 'ZYHomeWorkWeb/AddTestPaper', type: 'POST', data: shijuan }, function (res) {
                if (res != '' && res != null) location.href = 'Marking.html?id=' + res;
            })
        }
    })
} else {
    $('#yulan .xia').css('display', 'none');
    $('#yulan .que').on('click', function () {
        // var account = dan00.concat(duo00).concat(pan00).concat(tian00).concat(jie00);
        var questionids = '';
        var idlen = account.length - 1;
        var shijuan = {};
        $.each(account, function (i) {
            questionids += account[i]
            if (i != idlen) {
                questionids += ",";
            }
        })
        var shiname = $('#yulan .middle input[type="text"]').val();
        var recommen = $('#yulan .middle input[type="radio"]:checked').val();
        if (recommen == '' || recommen == undefined || recommen == null) recommen = 0;
        shijuan.questionIds = questionids;
        shijuan.name = shiname;
        shijuan.isRecommend = recommen;
        if (questionids != '' && questionids != null) {
            commonFn({ url: 'ZYHomeWorkWeb/AddTestPaper', type: 'POST', data: shijuan }, function (res) {
                if (res != '' && res != null) alert('组卷成功！')
            })
        }
    })
}

$("#allcheck1").click(function () {
    if (this.checked) {
        $("#main1 :checkbox").prop("checked", true);
    } else {
        $("#main1 :checkbox").prop("checked", false);
    }
})
// $("#allcheck1").click(function () {
//     if (this.checked) {
//         $('#main1 section input[type="checkbox"]').prop("checked", true);
//     } else {
//         $('#main1 section input[type="checkbox"]').prop("checked", false);
//     }
// })

// var box = document.getElementById('box');
// var top0 = box.getBoundingClientRect().top;
// console.log(top0);
// var ttt = $('#box').scrollTop();
// console.log(ttt);
// console.log(window.pageYOffset)


$('#zujuan .fixed .yu').click(function () {
    $('#zujuan').css('display', 'none');
    $('#yulan').css('display', 'block');
})
$('#yulan .top img').click(function () {
    $('#zujuan').css('display', 'block');
    $('#yulan').css('display', 'none');
})

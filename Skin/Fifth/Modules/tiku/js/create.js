
document.cookie = 'a = 0';
document.cookie = 'b = 0';
document.cookie = 'c = 0';
document.cookie = 'd = 0';
document.cookie = 'e = 0';
$('#dddd').css('display','none');

var model = {};
var answer;
var zhiId, zhiName, kaoId, kaoName, jiaoId, jiaoName;
var groupid = 0;
var t; //修改部门树
var subid;
var subname;
var filename;
var a = 0, b = 0, c = 0, d = 0, e = 0;
var acc;
var text;
var sub, gra, jiao;
var gradeid, subjectid, qtype, nianid, kemuid;
var subjectid,gradeid,jiaocaiid;
var width = ($(window).width()) / 2 - 180;
var zuoye, yinpin;
// var arr = [];
$('.top .top_l').click(function () {
    $('#main').css('display', 'block');
    $('#daoru').css('display', 'none');
    $(this).css('background-color', '#27ae61');
    $(this).find('img').attr('src', 'img/check.png');
    $('.top .top_r').css('background-color', '#c1c1c1');
    $('.top .top_r').find('img').attr('src', '');
})
$('.top .top_r').click(function () {
    $('#daoru').css('display', 'block');
    $('#main').css('display', 'none');
    $(this).css('background-color', '#27ae61');
    $(this).find('img').attr('src', 'img/check.png');
    $('.top .top_l').css('background-color', '#c1c1c1');
    $('.top .top_l').find('img').attr('src', '');
})

$('#main .cont .s1 p').click(function () {
    alert('请先选择题目类型')
})
commonFn({ url: 'TKCommon/GetGradeList?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
    $.each(res, function (i) {
        $('#main .middle .m4').append('<span data_id="' + res[i].id + '">' + res[i].grade + '</span>');
        $('#daoru .nianji').append('<span data_id="' + res[i].id + '">' + res[i].grade + '</span>');
    })
    commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $('#main .middle .m4 span').eq(0).attr('data_id'), type: 'GET' }, function (res) {
        $.each(res, function (i) {
            $('#main .middle .m1').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
            $('#daoru .kemu').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
        })
        var kemuid = $('.kemu span').eq(0).attr('data_id');
        commonFn({ url: 'ZYHomeWorkWeb/GetTeaBookList?schoolid=' + window.schoolid + '&subjectid=' + kemuid, type: 'GET' }, function (res) {
            $('#daoru .jiaocai').empty();
            $.each(res, function (i) {
                $('#daoru .jiaocai').append('<span data_gra="' + res[i].gradeId + '" data_sub="' + res[i].subjectId + '" data_jiao="' + res[i].jiaoCaiId + '">' + res[i].name + res[i].gradename + res[i].subject_name + '</span>')
            })
            $('#daoru .jiaocai span').click(function () {
                $(this).addClass('on').siblings().removeClass('on');
                sub = $(this).attr('data_sub');
                gra = $(this).attr('data_gra');
                jiao = $(this).attr('data_jiao');
            })
        })
        commonFn({ url: 'TKCommon/GetQuestionTypeList?subjectid=' + $('#main .middle .m1 span').eq(0).attr('data_id'), type: 'GET' }, function (res) {
            // $('#main .middle .m2').empty().append('<b class="green">题目类型</b>');
            $.each(res, function (i) {
                $('#main .middle .m2').append('<span data_id="' + res[i].id + '">' + res[i].typeName + '</span>');
            })
            $('#main .middle .m2 span').click(function () {
                $(this).addClass('on').siblings('span').removeClass('on');
                if ($(this).attr('data_id') == 1) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    $('#main .cont .s1 p').remove();
                    $('#main .cont .s1').append('<b><input type="radio" value="A" name="dana">A</b>' +
                        '<b><input type="radio" value="B" name="dana">B</b>' +
                        '<b><input type="radio" value="C" name="dana">C</b>' +
                        '<b><input type="radio" value="D" name="dana">D</b><p>添加</p>')
                    var clicknum = 0;
                    $('#main .cont .s1 p').click(function () {
                        clicknum += 1;
                        var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                        if (clicknum <= 10) {
                            if (confirm("确定添加吗?")) {
                                $(this).before('<b><input type="radio" value="' + daan[(clicknum - 1)] + '" name="dana">' + daan[(clicknum - 1)] + '</b>')
                            }
                        }
                    })
                } if ($(this).attr('data_id') == 2) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    $('#main .cont .s1 p').remove();
                    $('#main .cont .s1').append('<b><input type="checkbox" value="A" name="dana">A</b>' +
                        '<b><input type="checkbox" value="B" name="dana">B</b>' +
                        '<b><input type="checkbox" value="C" name="dana">C</b>' +
                        '<b><input type="checkbox" value="D" name="dana">D</b><p>添加</p>')
                    var clicknum = 0;
                    $('#main .cont .s1 p').click(function () {
                        clicknum += 1;
                        var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                        if (clicknum <= 10) {
                            if (confirm("确定添加吗?")) {
                                $(this).before('<b><input type="checkbox" value="' + daan[(clicknum - 1)] + '" name="dana">' + daan[(clicknum - 1)] + '</b>')
                            }
                        }
                    })
                } if ($(this).attr('data_id') == 3) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    $('#main .cont .s1 p').remove();
                    $('#main .cont .s1').append('<b><input type="radio" value="对" name="dana">对</b>' +
                        '<b><input type="radio" value="错" name="dana">错</b>')
                } if ($(this).attr('data_id') == 4 || $(this).attr('data_id') == 5) {
                    $('#main .cont .s1 b').remove();
                    $('#main .cont .s1 p').remove();
                    // $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>');
                    $('#dddd').css('display','block');
                }
            })
        })
    })
    $('#main .middle .m4 span').click(function () {
        $(this).addClass('on').siblings('span').removeClass('on');
        gradeid = $(this).attr('data_id')
        commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $(this).attr('data_id'), type: 'GET' }, function (res) {
            $('#main .middle .m1').empty().append('<b class="green">教学科目</b>');
            $.each(res, function (i) {
                $('#main .middle .m1').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
            })
            $('#main .middle .m1 span').click(function () {
                $(this).addClass('on').siblings('span').removeClass('on');
                subjectid = $(this).attr('data_id')
                commonFn({ url: 'TKCommon/GetQuestionTypeList?subjectid=' + $(this).attr('data_id'), type: 'GET' }, function (res) {
                    $('#main .middle .m2').empty().append('<b class="green">题目类型</b>');
                    $.each(res, function (i) {
                        $('#main .middle .m2').append('<span data_id="' + res[i].id + '">' + res[i].typeName + '</span>');
                    })
                    $('#main .middle .m2 span').click(function () {
                        $(this).addClass('on').siblings('span').removeClass('on');
                        qtype = $(this).attr('data_id')
                        if ($(this).attr('data_id') == 1) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            $('#main .cont .s1 p').remove();
                            $('#main .cont .s1').append('<b><input type="radio" value="A" name="dana">A</b>' +
                                '<b><input type="radio" value="B" name="dana">B</b>' +
                                '<b><input type="radio" value="C" name="dana">C</b>' +
                                '<b><input type="radio" value="D" name="dana">D</b><p>添加</p>')
                            var clicknum = 0;
                            $('#main .cont .s1 p').click(function () {
                                clicknum += 1;
                                var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                                if (clicknum <= 10) {
                                    if (confirm("确定添加吗?")) {
                                        $(this).before('<b><input type="radio" value="' + daan[(clicknum - 1)] + '" name="dana">' + daan[(clicknum - 1)] + '</b>')
                                    }
                                }
                            })
                        } if ($(this).attr('data_id') == 2) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            $('#main .cont .s1 p').remove();
                            $('#main .cont .s1').append('<b><input type="checkbox" value="A" name="dana">A</b>' +
                                '<b><input type="checkbox" value="B" name="dana">B</b>' +
                                '<b><input type="checkbox" value="C" name="dana">C</b>' +
                                '<b><input type="checkbox" value="D" name="dana">D</b><p>添加</p>')
                            var clicknum = 0;
                            $('#main .cont .s1 p').click(function () {
                                clicknum += 1;
                                var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                                if (clicknum <= 10) {
                                    if (confirm("确定添加吗?")) {
                                        $(this).before('<b><input type="checkbox" value="' + daan[(clicknum - 1)] + '" name="dana">' + daan[(clicknum - 1)] + '</b>')
                                    }
                                }
                            })
                            // answer = $('#main .cont .s1 input[name="dana"]:checked').val();
                        } if ($(this).attr('data_id') == 3) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            $('#main .cont .s1 p').remove();
                             $('#main .cont .s1').append('<b><input type="radio" value="对" name="dana">对</b>' +
                                '<b><input type="radio" value="错" name="dana">错</b>')
                        } if ($(this).attr('data_id') == 4 || $(this).attr('data_id') == 5) {
                            $('#main .cont .s1 b').remove();
                            $('#main .cont .s1 p').remove();
                            // $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>');
                            $('#dddd').css('display','block');
                        }

                    })
                })
                commonFn({ url: 'ZYHomeWorkWeb/GetTeaBookList?schoolid=' + window.schoolid + '&subjectid=' + subjectid, type: 'GET' }, function (res) {
                    $('#main .middle .m3').empty().append('<b class="green">教&emsp;&emsp;材</b>');
                    $.each(res, function (i) {
                        $('#main .middle .m3').append('<span data_gra="' + res[i].gradeId + '" data_sub="' + res[i].subjectId + '" data_jiao="' + res[i].jiaoCaiId + '">' + res[i].name + res[i].gradename + res[i].subject_name + '</span>');
                    })
                    $('#main .middle .m3 span').click(function () {
                        $(this).addClass('on').siblings('span').removeClass('on');
                        var zhishidian = {
                            url: 'TKResource/GetListResKnowledgeTree',
                            type: "get",
                            dataType: "Json",
                            async: false,
                            data: {
                                schoolid: window.schoolid,
                                subjectid: $(this).attr('data_sub'),
                                gradeid: $(this).attr('data_gra'),
                                jiaocaiid: $(this).attr('data_jiao')
                            }
                        };
                        commonFn(zhishidian, function (data) {
                            $("#demo1").ligerTree({
                                data: data,
                                checkbox: false,
                                //ajaxType: 'get',
                                idFieldName: 'id',
                                onSelect: function (node, e) {
                                    zhiName = node.data.name;
                                    zhiId = node.data.id;
                                    // layer.closeAll();
                                }
                            })

                        });
                        var kaodian = {
                            url: 'TKResource/GetListResTestTree',
                            type: "get",
                            dataType: "Json",
                            async: false,
                            data: {
                                schoolid: window.schoolid,
                                subjectid: $(this).attr('data_sub'),
                                gradeid: $(this).attr('data_gra'),
                                jiaocaiid: $(this).attr('data_jiao')
                            }
                        };
                        commonFn(kaodian, function (data) {
                            $("#demo2").ligerTree({
                                data: data,
                                checkbox: false,
                                //ajaxType: 'get',
                                idFieldName: 'id',
                                onSelect: function (node, e) {
                                    kaoName = node.data.name;
                                    kaoId = node.data.id;
                                }
                            })

                        });
                        var jiaocai = {
                            url: 'TKResource/GetListResChapter',
                            type: "get",
                            dataType: "Json",
                            async: false,
                            data: {
                                schoolid: window.schoolid,
                                subjectid: $(this).attr('data_sub'),
                                gradeid: $(this).attr('data_gra'),
                                jiaocaiid: $(this).attr('data_jiao')
                            }
                        };
                        commonFn(jiaocai, function (data) {
                            $("#demo3").ligerTree({
                                data: data,
                                checkbox: false,
                                //ajaxType: 'get',
                                idFieldName: 'id',
                                onSelect: function (node, e) {
                                    jiaoName = node.data.name;
                                    jiaoId = node.data.id;
                                    // layer.closeAll();
                                }
                            })

                        });

                    });

                    // $.ligerui.controls.Tree.prototype.alert = function () {
                    //     arr.splice(0, arr.length);
                    //     var data = this.getChecked();
                    //     for (var i = 0; i < data.length; i++) {
                    //         arr.push(data[i].data.id);
                    //     }
                    // };
                })
            })
        })
    })
    $('#daoru .nianji span').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        nianid = $(this).attr('data_id');
        commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $(this).attr('data_id'), type: 'GET' }, function (res) {
            $('#daoru .kemu').empty();
            $.each(res, function (i) {
                $('#daoru .kemu').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
            })
            $('#daoru .kemu span').click(function () {
                $(this).addClass('on').siblings().removeClass('on');
                subid = $(this).attr('data_id');
                subname = $(this).html();
                commonFn({ url: 'ZYHomeWorkWeb/GetTeaBookList?schoolid=' + window.schoolid + '&subjectid=' + subid, type: 'GET' }, function (res) {
                    $('#daoru .jiaocai').empty();
                    $.each(res, function (i) {
                        $('#daoru .jiaocai').append('<span data_gra="' + res[i].gradeId + '" data_sub="' + res[i].subjectId + '" data_jiao="' + res[i].jiaoCaiId + '">' + res[i].name + res[i].gradename + res[i].subject_name + '</span>')
                    })
                    $('#daoru .jiaocai span').click(function () {
                        $(this).addClass('on').siblings().removeClass('on');
                        sub = $(this).attr('data_sub');
                        gra = $(this).attr('data_gra');
                        jiao = $(this).attr('data_jiao');
                    })
                })
            })
        })
    })
})



// 难度
commonFn({ url: 'TKCommon/GetDifficultyList', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('#main .cont .s3').append('<input type="radio" value="' + res[i].id + '" name="nandu">' + res[i].difficuteName);
    })
})
// 答题时间
commonFn({ url: 'TKCommon/GetSuggestTimeList', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('#main .cont .s4 p').before('<b><input type="radio" value="' + res[i].suggestionTime + '" name="time">' + res[i].suggestionTime + '分钟</b>');
    })
    var clicknum = 0;
    $('#main .cont .s4 p').click(function () {
        
        layer.open({
            type: 1,
            title: "时间",
            btn: ["确定", "取消"],
            content: $('#shijian'),
            area: ['360px', '160px'],
            offset: ['1600px',width],
            yes: function () {
                if ($('#shijian .layui-form-item input').val() != '' && $('#shijian .layui-form-item input').val() != null && $('#shijian .layui-form-item input').val() != undefined) {
                    clicknum++;
                    if (clicknum == 1) {
                        var $val = $('#shijian .layui-form-item input').val();
                        $('#main .cont .s4 p').before('<b><input type="radio" value="' + $val + '" name="time">' + $val + '分钟</b>');
                    } else {
                        var $val = $('#shijian .layui-form-item input').val();
                        $('#main .cont .s4 b').last().remove();
                        $('#main .cont .s4 p').before('<b><input type="radio" value="' + $val + '" name="time">' + $val + '分钟</b>');
                    }
                }
                layer.closeAll();
            }
        });
    })
})
// 试题来源
// commonFn({ url: 'TKCommon/GetTestResourceList', type: 'POST' }, function (res) {
//     $.each(res, function (i) {
//         $('#main .cont .s8').append('<input type="radio" value="' + res[i].id + '" name="come">' + res[i].sourceName);
//     })
// })
$('#main .middle .m5 span').click(function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    zuoye = $(this).attr('data-id');
    if (zuoye == 2) $('#audio').css('display','block');
    else $('#audio').css('display','none');
})
layui.use('upload', function () {

    layui.upload({
        url: '/api/Common/UploadFile', //上传接口
        elem: '#yin',
        offset: ['100px', '100px'],
        success: function (res) { //上传成功后的回调
            if (res.status == 1) {
                yinpin = res.data[0];
                // layer.msg("上传成功！", { time: 10000 });
                layer.open({
                    type: 1,
                    btn: ["确定"],
                    content: $('#upp'),
                    area: ['360px', '160px'],
                    offset: ['150px', width],
                    yes: function () {
                        layer.closeAll();
                        $('#audio input[type="text"]').val(yinpin)
                    }
                });
                
            } else {
                layer.msg(res.message, { time: 1000 });
            }
        }
    });
});

$('#main .cont .s5 span a').on('click', function () {
     var ddd = $('#main .m3 .on').html()
    var demo1 = $("#demo1").html().replace(/\s/ig, '');
    if (ddd == '' || ddd == null || ddd == undefined) {
        alert('请选择教材');
        return;
    } else {
        layer.open({
            type: 1,
            title: "知识点目录",
            btn: ["确定", "取消"],
            content: $('#myModal1'),
            area: ['360px', '360px'],
            offset: ['1700px', width],
            yes: function () {
                layer.closeAll();
                if (zhiName != '' && zhiName != null && zhiName != undefined) {
                    $('#main .cont .s5').find('p').remove();
                    $('#main .cont .s5').find('div').remove();
                    $('#main .cont .s5').append('<div data_id="' + zhiId + '">' + zhiName + '</div>')
                }
            }
        });
    }
})
$('#main .cont .s6 span a').on('click', function () {
    var demo1 = $("#demo2").html().replace(/\s/ig, '');
    var ddd = $('#main .m3 .on').html()
    if (ddd == '' || ddd == null || ddd == undefined) {
        alert('请选择教材');
        return;
    } else {
        layer.open({
            type: 1,
            title: "考点目录",
            btn: ["确定", "取消"],
            content: $('#myModal2'),
            area: ['360px', '360px'],
            offset: ['1700px', width],
            yes: function () {
                // t.alert();
                layer.closeAll();
                if (kaoName != '' && kaoName != null && kaoName != undefined) {
                    $('#main .cont .s6').find('p').remove();
                    $('#main .cont .s6').find('div').remove();
                    $('#main .cont .s6').append('<div data_id="' + kaoId + '">' + kaoName + '</div>')
                }
            }
        });
    }  
})
$('#main .cont .s7 span a').on('click', function () {
    var demo1 = $("#demo2").html().replace(/\s/ig, '');
    var ddd = $('#main .m3 .on').html()
    if (ddd == '' || ddd == null || ddd == undefined) {
        alert('请选择教材');
        return;
    } else {
        layer.open({
            type: 1,
            title: "教材目录",
            btn: ["确定", "取消"],
            content: $('#myModal3'),
            area: ['360px', '360px'],
            offset: ['1700px', width],
            yes: function () {
                // t.alert();
                layer.closeAll();
                if (jiaoName != '' && jiaoName != null && jiaoName != undefined) {
                    $('#main .cont .s7').find('p').remove();
                    $('#main .cont .s7').find('div').remove();
                    $('#main .cont .s7').append('<div data_id="' + jiaoId + '">' + jiaoName + '</div>')
                }
            }
        });
    }
})


var editor_a = UE.getEditor('editor');
var editor_b = UE.getEditor('editor2');
var editor_c = UE.getEditor('editor3');

$('#main .bottom .xia').click(function () {
    var d_detail = editor_c.getContent();
    if ($('#main .cont .s1 input[type="radio"]').length > 0) {
        answer = $('input[name="dana"]:checked').val();
        var ans = "";
        var anslen = $('#main .cont .s1 input[type="radio"]').length - 1;
        $('#main .cont .s1 input[type="radio"]').each(function (k) {
            var $this = $(this);
            ans += $this.val();
            if (k != anslen) {
                ans += ",";
            }
        });
        model.answer = ans;
    } if ($('#main .cont .s1 input[type="checkbox"]').length > 0) {
        answer = "";
        var ans = "";
        var answerlen = $('#main .cont .s1 input[type="checkbox"]:checked').length - 1;
        var anslen = $('#main .cont .s1 input[type="checkbox"]').length - 1;
        $('#main .cont .s1 input[type="checkbox"]:checked').each(function (k) {
            var $this = $(this);
            // if ($this.attr('checked')) {
            answer += $this.val();
            if (k != answerlen) {
                answer += ",";
            }
            // }
        });
        $('#main .cont .s1 input[type="checkbox"]').each(function (k) {
            var $this = $(this);
            ans += $this.val();
            if (k != anslen) {
                ans += ",";
            }
        });
        model.answer = ans;
    } if ($('#dddd').css('display') != 'none') {
        answer = d_detail;
    }

    var difficulteid = $('input[name="nandu"]:checked').val();
    var suggestiontime = $('input[name="time"]:checked').val();
    // var sourceid = $('input[name="come"]:checked').val();
    var questionsource = $('#main .cont .s8 input').val();
    var f_detail = editor_a.getContent();
    var j_detail = editor_b.getContent();
    
    if (questionsource != '' && questionsource != null && questionsource != undefined) {
        model.questionSource = questionsource;
    }
    if (gradeid == 0 || gradeid == '' || gradeid == null || gradeid == undefined) {
        alert('请选择年级');
        return;
    } if (subjectid == 0 || subjectid == '' || subjectid == null || subjectid == undefined) {
        alert('请选择科目');
        return;
    } if (f_detail == '' || f_detail == null || f_detail == undefined) {
        alert('请设置题干');
        return;
    } if (j_detail == '' || j_detail == null || j_detail == undefined) {
        alert('请填写解析');
        return;
    } if (qtype == 0 || qtype == '' || qtype == null || qtype == undefined) {
        alert('请选择题目类型');
        return;
    } if (suggestiontime == 0 || suggestiontime == '' || suggestiontime == null || suggestiontime == undefined) {
        alert('请选择建议答题时间');
        return;
    } if (difficulteid == 0 || difficulteid == '' || difficulteid == null || difficulteid == undefined) {
        alert('请选择难度');
        return;
    } 
    if ($('#main .cont .s5 div').length > 0 && $('#main .cont .s5 div').html() != undefined && $('#main .cont .s5 div').html() != null && $('#main .cont .s5 div').html() != '') {
        model.knowledgeId = $('#main .cont .s5 div').attr('data_id');
    } else {
        // alert('请选择知识点');
        // return;
    }
    if ($('#main .cont .s6 div').length > 0 && $('#main .cont .s6 div').html() != undefined && $('#main .cont .s6 div').html() != null && $('#main .cont .s6 div').html() != '') {
        model.testId = $('#main .cont .s6 div').attr('data_id');
    } else {
        // alert('请选择考点');
        // return;
    }
    if ($('#main .cont .s7 div').length > 0 && $('#main .cont .s7 div').html() != undefined && $('#main .cont .s7 div').html() != null && $('#main .cont .s7 div').html() != '') {
        model.chapterId = $('#main .cont .s7 div').attr('data_id');
    } else {
        // alert('请选择章节目录');
        // return;
    }
    if (zuoye == undefined || zuoye == null || zuoye == '') zuoye = 0;
    if (zuoye == 2) model.audio = yinpin
    model.workType = zuoye;
    model.question = f_detail;
    model.qtype = qtype;
    model.correctAnswer = answer;
    model.analysis = j_detail;
    model.subjectId = subjectid;
    model.suggestionTime = suggestiontime;
    model.schoolId = window.schoolid;
    model.difficulteId = difficulteid;
    model.gradeId = gradeid
    model.sourceId = 1;
    
    commonFn({ url: 'TKQuestionCreate/UpdateQuestion', type: 'POST', data: model }, function (res) {
        if (res == true) {
            if (model.qtype == 1) {
                a++;

            } if (model.qtype == 2) {
                b++;
            } if (model.qtype == 3) {
                c++;
            } if (model.qtype == 4) {
                d++;
            } if (model.qtype == 5) {
                e++;
            }
            document.cookie = 'a = ' + escape(a);
            document.cookie = 'b = ' + escape(b);
            document.cookie = 'c = ' + escape(c);
            document.cookie = 'd = ' + escape(d);
            document.cookie = 'e = ' + escape(e);
            history.go(0)
        }
    })

})
// console.log(a,b,c,d,e)
var arr = document.cookie.split("; "); 
a = unescape(arr[0]).replace('a=','');
b = unescape(arr[1]).replace('b=','');
c = unescape(arr[2]).replace('c=','');
d = unescape(arr[3]).replace('d=','');
e = unescape(arr[4]).replace('e=','');
// console.log(a,b,c,d,e)

$('.yu').click(function () {
    $('.tigan').html(editor_a.getContent());
    $('.yulan').css('display', 'block');
})

$('.quxiao').click(function () {
    $('.yulan').css('display', 'none');
})

$('#main .bottom .wan').click(function () {
    var d_detail = editor_c.getContent();
    if ($('#main .cont .s1 input[type="radio"]').length > 0) {
        answer = $('#main .cont .s1 input[type="radio"]:checked').val();
        var ans = "";
        var anslen = $('#main .cont .s1 input[type="radio"]').length - 1;
        $('#main .cont .s1 input[type="radio"]').each(function (k) {
            var $this = $(this);
            ans += $this.val();
            if (k != anslen) {
                ans += ",";
            }
        });
        model.answer = ans;
    } if ($('#main .cont .s1 input[type="checkbox"]').length > 0) {
        answer = "";
        var ans = "";
        var answerlen = $('#main .cont .s1 input[type="checkbox"]:checked').length - 1;
        var anslen = $('#main .cont .s1 input[type="checkbox"]').length - 1;
        $('#main .cont .s1 input[type="checkbox"]:checked').each(function (k) {
            var $this = $(this);
            // if ($this.attr('checked')) {
            answer += $this.val();
            if (k != answerlen) {
                answer += ",";
            }
            // }
        });
        $('#main .cont .s1 input[type="checkbox"]').each(function (k) {
            var $this = $(this);
            ans += $this.val();
            if (k != anslen) {
                ans += ",";
            }
        });
        model.answer = ans;
    } if ($('#dddd').css('display') != 'none') {
        answer = d_detail;
    }

    var difficulteid = $('input[name="nandu"]:checked').val();
    var suggestiontime = $('input[name="time"]:checked').val();
    // var sourceid = $('input[name="come"]:checked').val();
    var questionsource = $('#main .cont .s8 input').val();
    var f_detail = editor_a.getContent();
    var j_detail = editor_b.getContent();
    
    if (questionsource != '' && questionsource != null && questionsource != undefined) {
        model.questionSource = questionsource;
    }
    if (gradeid == 0 || gradeid == '' || gradeid == null || gradeid == undefined) {
        alert('请选择年级');
        return;
    } if (subjectid == 0 || subjectid == '' || subjectid == null || subjectid == undefined) {
        alert('请选择科目');
        return;
    } if (f_detail == '' || f_detail == null || f_detail == undefined) {
        alert('请设置题干');
        return;
    } if (j_detail == '' || j_detail == null || j_detail == undefined) {
        alert('请填写解析');
        return;
    } if (qtype == 0 || qtype == '' || qtype == null || qtype == undefined) {
        alert('请选择题目类型');
        return;
    } if (suggestiontime == 0 || suggestiontime == '' || suggestiontime == null || suggestiontime == undefined) {
        alert('请选择建议答题时间');
        return;
    } if (difficulteid == 0 || difficulteid == '' || difficulteid == null || difficulteid == undefined) {
        alert('请选择难度');
        return;
    } 
    if ($('#main .cont .s5 div').length > 0 && $('#main .cont .s5 div').html() != undefined && $('#main .cont .s5 div').html() != null && $('#main .cont .s5 div').html() != '') {
        model.knowledgeId = $('#main .cont .s5 div').attr('data_id');
    } else {
        // alert('请选择知识点');
        // return;
    }
    if ($('#main .cont .s6 div').length > 0 && $('#main .cont .s6 div').html() != undefined && $('#main .cont .s6 div').html() != null && $('#main .cont .s6 div').html() != '') {
        model.testId = $('#main .cont .s6 div').attr('data_id');
    } else {
        // alert('请选择考点');
        // return;
    }
    if ($('#main .cont .s7 div').length > 0 && $('#main .cont .s7 div').html() != undefined && $('#main .cont .s7 div').html() != null && $('#main .cont .s7 div').html() != '') {
        model.chapterId = $('#main .cont .s7 div').attr('data_id');
    } else {
        // alert('请选择章节目录');
        // return;
    }
    if (zuoye == undefined || zuoye == null || zuoye == '') zuoye = 0;
    if (zuoye == 2) model.audio = yinpin
    model.workType = zuoye;
    model.question = f_detail;
    model.qtype = qtype;
    model.correctAnswer = answer;
    model.analysis = j_detail;
    model.subjectId = subjectid;
    model.suggestionTime = suggestiontime;
    model.schoolId = window.schoolid;
    model.difficulteId = difficulteid;
    model.gradeId = gradeid
    model.sourceId = 1;
    // console.log(difficulteid,suggestiontime,sourceid,gradeid,subjectid,qtype)
    // console.log(answer);
    // console.log(model);
    commonFn({ url: 'TKQuestionCreate/UpdateQuestion', type: 'POST', data: model }, function (res) {
        if (res == true) {
            if (model.qtype == 1) {
                a++;

            } if (model.qtype == 2) {
                b++;
            } if (model.qtype == 3) {
                c++;
            } if (model.qtype == 4) {
                d++;
            } if (model.qtype == 5) {
                e++;
            }
            location.href = 'complete.html?a=' + a + '&b=' + b + '&c=' + c + '&d=' + d + '&e=' + e;

        }
    })
})





/************** 批量导入 *****************/

$('#daoru .moban a').click(function(){
    window.location.href = '/Web/Skin/Fifth/Modules/tiku/doc/timu.doc'
})

layui.use('upload', function () {

    layui.upload({
        url: '/api/Common/ImportFile', //上传接口
        elem: '#up',
        success: function (res) { //上传成功后的回调
            if (nianid == '' || nianid == null || nianid == undefined || nianid == 0) {
                alert('请选择年级！');
                return false;
            } if (subid == '' || subid == null || subid == undefined || subid == 0) {
                alert('请选择科目！');
                return false;
            } if (jiao == '' || jiao == null || jiao == undefined || jiao == 0) {
                alert('请选择教材！');
                return false;
            } else {
                if (res.status == 1) {
                    layer.msg("导入成功！", { time: 1000 }, function () {
                        filename = res.data;
                        location.href = 'leadin.html?subid=' + subid + '&sub=' + sub + '&gra=' + gra + '&jiao=' + jiao + '&filename=' + filename + '&subname=' + subname + '&gradeid=' + nianid;

                    });
                } else {
                    layer.msg(res.message, { time: 1000 });
                }
            }
        }
    });
});


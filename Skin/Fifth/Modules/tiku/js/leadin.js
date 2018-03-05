
$('#dddd').css('display','none');
var answer;
var zhiId, zhiName, kaoId, kaoName, jiaoId, jiaoName;
var groupid = 0;
var t; //修改部门树
var subid;
var subname;
var filename;
var a = 0, b = 0, c = 0, d = 0, e = 0;
var a0 = 0, b0 = 0, c0 = 0, d0 = 0, e0 = 0;
var acc;
var text;
var dan = [], duo = [], pan = [], tian = [], jie = [], current = [], save = [];
var qtype;
var curr = 0;
var width = ($(window).width()) / 2 - 180;
var number = 0;
var zuoye;
$('.top .top_l').click(function () {
    location.href = 'create.html';
})
var string0 = window.location.search.split('&');
var subid = string0[0].replace('?subid=', '');
var sub = string0[1].replace('sub=', '');
var gra = string0[2].replace('gra=', '');
var jiao = string0[3].replace('jiao=', '');
var filename = decodeURI(string0[4].replace('filename=', ''));
var subname = decodeURI(string0[5].replace('subname=', ''));
var gradeid = string0[6].replace('gradeid=', '')
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
            offset: ['1000px',width],
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

$('#main .cont .s5 span a').on('click', function () {
    var zhishidian = {
        url: 'TKResource/GetListResKnowledgeTree',
        type: "get",
        dataType: "Json",
        async: false,
        data: {
            schoolid: window.schoolid,
            subjectid: sub,
            gradeid: gra,
            jiaocaiid: jiao
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
    layer.open({
        type: 1,
        title: "知识点目录",
        btn: ["确定", "取消"],
        content: $('#myModal1'),
        area: ['360px', '360px'],
        offset: ['1100px',width],
        yes: function () {
            // t.alert();
            layer.closeAll();
            if (zhiName != '' && zhiName != null && zhiName != undefined) {
                $('#main .cont .s5').find('p').remove();
                $('#main .cont .s5').find('div').remove();
                $('#main .cont .s5').append('<div data_id="' + zhiId + '">' + zhiName + '</div>')
            }
        }
    });
})
$('#main .cont .s6 span a').on('click', function () {
    var kaodian = {
        url: 'TKResource/GetListResTestTree',
        type: "get",
        dataType: "Json",
        async: false,
        data: {
            schoolid: window.schoolid,
            subjectid: sub,
            gradeid: gra,
            jiaocaiid: jiao
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
    layer.open({
        type: 1,
        title: "考点目录",
        btn: ["确定", "取消"],
        content: $('#myModal2'),
        area: ['360px', '360px'],
        offset: ['1200px',width],
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
})
$('#main .cont .s7 span a').on('click', function () {
    var jiaocai = {
        url: 'TKResource/GetListResChapter',
        type: "get",
        dataType: "Json",
        async: false,
        data: {
            schoolid: window.schoolid,
            subjectid: sub,
            gradeid: gra,
            jiaocaiid: jiao
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
    layer.open({
        type: 1,
        title: "教材目录",
        btn: ["确定", "取消"],
        content: $('#myModal3'),
        area: ['360px', '360px'],
        offset: ['1200px',width],
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
})

$('#main .middle .m5 span').click(function () {
    $(this).addClass('on').siblings('span').removeClass('on');
    zuoye = $(this).attr('data-id');
})
var editor_a = UE.getEditor('editor');
var editor_j = UE.getEditor('editor_j');
var editor_d = UE.getEditor('editor_d');
commonFn({ url: 'TKQuestionCreate/ImportQuestion?subjectid=' + subid + '&filename=' + filename, type: 'GET' }, function (res) {
    var types = res.types;
    var questions = res.questions;

    $('#main .middle .m1').append('<span class="on" data_id="' + subid + '">' + subname + '</span>');
    $('#main .middle .m2').append('<span class="on quan">全部(' + questions.length + ')</span>');

    $.each(questions, function (i) {
        $('#page').append('<span data_type="' + questions[i].qtype + '" data_id="' + (i + 1) + '">' + (i + 1) + '</span>');

        if (questions[i].qtype == 1) {
            a++;
            dan.push(questions[i]);
        } if (questions[i].qtype == 2) {
            b++;
            duo.push(questions[i]);
        } if (questions[i].qtype == 3) {
            c++;
            pan.push(questions[i]);
        } if (questions[i].qtype == 4) {
            d++;
            tian.push(questions[i]);
        } if (questions[i].qtype == 5) {
            e++;
            jie.push(questions[i]);
        }
    })

    $.each(types, function (i) {
        if (types[i].id == 1) {
            acc = a;
        } if (types[i].id == 2) {
            acc = b;
        } if (types[i].id == 3) {
            acc = c;
        } if (types[i].id == 4) {
            acc = d;
        } if (types[i].id == 5) {
            acc = e;
        }
        $('#main .middle .m2').append('<span class="lei' + types[i].id + '" data_id="' + types[i].id + '">' + types[i].typeName + '(' + acc + ')</span>');

    })
    // current = questions;
    $('#main .middle .m2 .quan').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = questions;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '" data_id="' + (i + 1) + '">' + (i + 1) + '</span>');
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            if ($(this).attr('data_type') == 1) {
                $('#dddd').css('display','none');
                $('#main .cont .s1 b').remove();
                var str1 = current[0].answer.split(",");
                text = '';
                $.each(str1, function (k) {
                    str1[k] = str1[k].replace(/\s/ig, '');
                    text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                })
                $('#main .cont .s1').append(text);
            } if ($(this).attr('data_type') == 2) {
                $('#dddd').css('display','none');
                $('#main .cont .s1 b').remove();
                var str2 = current[0].answer.split(",");
                text = '';
                $.each(str2, function (k) {
                    str2[k] = str2[k].replace(/\s/ig, '');
                    text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                })
                $('#main .cont .s1').append(text);
            } if ($(this).attr('data_type') == 3) {
                $('#dddd').css('display','none');
                $('#main .cont .s1 b').remove();
                text = '';
                text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                $('#main .cont .s1').append(text);
            } if ($(this).attr('data_type') == 4) {
                $('#dddd').css('display','block');
                $('#main .cont .s1 b').remove();
                editor_d.ready(function () {
                    editor_d.setContent(current[0].correctAnswer);
                })
            } if ($(this).attr('data_type') == 5) {
                $('#dddd').css('display','block');
                $('#main .cont .s1 b').remove();
                editor_d.ready(function () {
                    editor_d.setContent(current[0].correctAnswer);
                })
            }
            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            

            if ($('input[type="radio"]')) {
                $('input[value="' + current[0].correctAnswer + '"]').prop('checked', true)
            } if ($('input[type="checkbox"]')) {
                for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                    if ((current[0].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                        $('input[type="checkbox"]').eq(n).prop('checked', true);
                    }
                }
            }
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            if (save[k].qtype == 1) {
                                $('#dddd').css('display','none');
                                $('#main .cont .s1 b').remove();
                                var str1 = current[i].answer.split(",");
                                text = '';
                                $.each(str1, function (k) {
                                    str1[k] = str1[k].replace(/\s/ig, '');
                                    text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                                })
                                $('#main .cont .s1').append(text);
                            } if (save[k].qtype == 2) {
                                $('#dddd').css('display','none');
                                $('#main .cont .s1 b').remove();
                                var str2 = current[i].answer.split(",");
                                text = '';
                                $.each(str2, function (k) {
                                    str2[k] = str2[k].replace(/\s/ig, '');
                                    text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                                })
                                $('#main .cont .s1').append(text);
                            } if (save[k].qtype == 3) {
                                $('#dddd').css('display','none');
                                $('#main .cont .s1 b').remove();
                                text = '';
                                text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                                $('#main .cont .s1').append(text);
                            } if (save[k].qtype == 4) {
                                $('#dddd').css('display', 'block');
                                $('#main .cont .s1 b').remove();
                                editor_d.ready(function () {
                                    editor_d.setContent(save[k].correctAnswer);
                                })
                            } if (save[k].qtype == 5) {
                                $('#dddd').css('display', 'block');
                                $('#main .cont .s1 b').remove();
                                editor_d.ready(function () {
                                    editor_d.setContent(save[k].correctAnswer);
                                })
                            }
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)

                            if ($('input[type="radio"]')) {
                                $('input[value="' + save[k].correctAnswer + '"]').prop('checked', true)
                            } if ($('input[type="checkbox"]')) {
                                for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                                    if ((save[k].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                                        $('input[type="checkbox"]').eq(n).prop('checked', true);
                                    }
                                }
                            }
                            
                            
                            // model.suggestionTime = suggestiontime;
                            // model.difficulteId = difficulteid;
                            return
                        }
                    })
                } else {
                    if ($(this).attr('data_type') == 1) {
                        $('#dddd').css('display','none');
                        $('#main .cont .s1 b').remove();
                        var str1 = current[i].answer.split(",");
                        text = '';
                        $.each(str1, function (k) {
                            str1[k] = str1[k].replace(/\s/ig, '');
                            text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                        })
                        $('#main .cont .s1').append(text);
                    } if ($(this).attr('data_type') == 2) {
                        $('#dddd').css('display','none');
                        $('#main .cont .s1 b').remove();
                        var str2 = current[i].answer.split(",");
                        text = '';
                        $.each(str2, function (k) {
                            str2[k] = str2[k].replace(/\s/ig, '');
                            text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                        })
                        $('#main .cont .s1').append(text);
                    } if ($(this).attr('data_type') == 3) {
                        $('#dddd').css('display','none');
                        $('#main .cont .s1 b').remove();
                        text = '';
                        text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                        $('#main .cont .s1').append(text);
                    } if ($(this).attr('data_type') == 4) {
                        $('#dddd').css('display', 'block');
                        $('#main .cont .s1 b').remove();
                        editor_d.ready(function () {
                            editor_d.setContent(current[i].correctAnswer);
                        })
                    } if ($(this).attr('data_type') == 5) {
                        $('#dddd').css('display', 'block');
                        $('#main .cont .s1 b').remove();
                        editor_d.ready(function () {
                            editor_d.setContent(current[i].correctAnswer);
                        })
                    }
                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);

                    if ($('input[type="radio"]')) {
                        $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
                    } if ($('input[type="checkbox"]')) {
                        for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                            if ((current[i].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                                $('input[type="checkbox"]').eq(n).prop('checked', true);
                            }
                        }
                    }
                }


            })
        })

    })
    $('#main .middle .m2 .lei1').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = dan;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
            $.each(questions,function(n){
                if (current[i] == questions[n]) {
                    $('#page span').eq(i).attr('data_id',(n + 1));
                }
            })
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            var str11 = current[0].answer.split(",");
            text = '';
            $.each(str11, function (k) {
                str11[k] = str11[k].replace(/\s/ig, '');
                text += '<b><input type="radio" value="' + str11[k] + '" name="dana">' + str11[k] + '</b>';
            })
            // $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            $('#dddd').css('display','none');
            $('#main .cont .s1 b').remove()
            $('#main .cont .s1').append(text);
            $('input[value="' + current[0].correctAnswer + '"]').prop('checked', true);
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            var str1 = current[i].answer.split(",");
                            text = '';
                            $.each(str1, function (k) {
                                str1[k] = str1[k].replace(/\s/ig, '');
                                text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                            })
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove()
                            $('#main .cont .s1').append(text);
                            $('input[value="' + save[k].correctAnswer + '"]').prop('checked', true);
                            return
                        }
                    })
                } else {
                    var str1 = current[i].answer.split(",");
                    text = '';
                    $.each(str1, function (k) {
                        str1[k] = str1[k].replace(/\s/ig, '');
                        text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                    })
                    // $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove()
                    $('#main .cont .s1').append(text);
                    $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true);
                }

            })
        })
    })
    $('#main .middle .m2 .lei2').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = duo;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
            $.each(questions,function(n){
                if (current[i] == questions[n]) {
                    $('#page span').eq(i).attr('data_id',(n + 1));
                }
            })
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            var str22 = current[0].answer.split(",");
            text = '';
            $.each(str22, function (k) {
                str22[k] = str22[k].replace(/\s/ig, '');
                text += '<b><input type="checkbox" value="' + str22[k] + '" name="dana">' + str22[k] + '</b>';

            })
            // $('input[value="' + current[0].correctAnswer + '"]').prop('checked', true)

            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            $('#dddd').css('display','none');
            $('#main .cont .s1 b').remove()
            $('#main .cont .s1').append(text);
            for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                if ((current[0].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                    $('input[type="checkbox"]').eq(n).prop('checked', true);
                }
            }
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            var str2 = current[i].answer.split(",");
                            text = '';
                            $.each(str2, function (k) {
                                str2[k] = str2[k].replace(/\s/ig, '');
                                text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                            })
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove()
                            $('#main .cont .s1').append(text);
                            for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                                if ((save[k].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                                    $('input[type="checkbox"]').eq(n).prop('checked', true);
                                }
                            }
                            return
                        }
                    })
                } else {
                    var str2 = current[i].answer.split(",");
                    text = '';
                    $.each(str2, function (k) {
                        str2[k] = str2[k].replace(/\s/ig, '');
                        text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                    })
                    $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)

                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove()
                    $('#main .cont .s1').append(text);
                    for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                        if ((current[i].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                            $('input[type="checkbox"]').eq(n).prop('checked', true);
                        }
                    }
                }

            })
        })
    })
    $('#main .middle .m2 .lei3').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = pan;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
            $.each(questions,function(n){
                if (current[i] == questions[n]) {
                    $('#page span').eq(i).attr('data_id',(n + 1));
                }
            })
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            text = '';
            text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
            // $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            $('#dddd').css('display','none');
            $('#main .cont .s1 b').remove()
            $('#main .cont .s1').append(text);

            $('input[value="' + current[0].correctAnswer + '"]').prop('checked', true)
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            var str3 = current[i].answer.split(",");
                            text = '';
                            $.each(str3, function (k) {
                                str3[k] = str3[k].replace(/\s/ig, '');
                                text += '<b><input type="radio" value="' + str3[k] + '" name="dana">' + str3[k] + '</b>';
                            })
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove()
                            $('#main .cont .s1').append(text);
                            $('input[value="' + save[k].correctAnswer + '"]').prop('checked', true);
                            return
                        }
                    })
                } else {
                    var str3 = current[i].answer.split(",");
                    text = '';
                    $.each(str3, function (k) {
                        str3[k] = str3[k].replace(/\s/ig, '');
                        text += '<b><input type="radio" value="' + str3[k] + '" name="dana">' + str3[k] + '</b>';
                    })
                    // $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove()
                    $('#main .cont .s1').append(text);

                    $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
                }
                
            })
        })
    })
    $('#main .middle .m2 .lei4').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = tian;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
            $.each(questions,function(n){
                if (current[i] == questions[n]) {
                    $('#page span').eq(i).attr('data_id',(n + 1));
                }
            })
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            $('#dddd').css('display', 'block');
            $('#main .cont .s1 b').remove();
            editor_d.ready(function () {
                editor_d.setContent(current[0].correctAnswer);
            })
            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            $('#dddd').css('display', 'block');
                            $('#main .cont .s1 b').remove();
                            editor_d.ready(function () {
                                editor_d.setContent(save[k].correctAnswer);
                            })
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                            return
                        }
                    })
                } else {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[i].correctAnswer);
                    })
                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);
                }
                
            })
        })
    })
    $('#main .middle .m2 .lei5').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        current = jie;
        curr = 0;
        $('#page').empty();
        $.each(current, function (i) {
            $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
            $.each(questions,function(n){
                if (current[i] == questions[n]) {
                    $('#page span').eq(i).attr('data_id',(n + 1));
                }
            })
            $.each($('#page span'), function (i) {
                $.each(save,function(k){
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        $('#page span').eq(i).addClass('on');
                    }
                })
                
            })
            $('#dddd').css('display', 'block');
            $('#main .cont .s1 b').remove();
            editor_d.ready(function () {
                editor_d.setContent(current[0].correctAnswer);
            })
            editor_a.ready(function () {
                editor_a.setContent(current[0].question);
            })
            editor_j.ready(function () {
                editor_j.setContent(current[0].analysis);
            })
            // $('#main .cont .s2 p').html(current[0].analysis);
            $('#page span').eq(i).click(function () {
                curr = i;
                if ($(this).hasClass('on')) {
                    $.each(save, function (k) {
                        if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                            $('#dddd').css('display', 'block');
                            $('#main .cont .s1 b').remove();
                            editor_d.ready(function () {
                                editor_d.setContent(save[k].correctAnswer);
                            })
                            editor_a.ready(function () {
                                editor_a.setContent(save[k].question);
                            })
                            editor_j.ready(function () {
                                editor_j.setContent(save[k].analysis);
                            })
                            $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                            $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                            return
                        }
                    })
                } else {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[i].correctAnswer);
                    })
                    editor_a.ready(function () {
                        editor_a.setContent(current[i].question);
                    })
                    editor_j.ready(function () {
                        editor_j.setContent(current[i].analysis);
                    })
                    // $('#main .cont .s2 p').html(current[i].analysis);
                }
            })
        })
    })

    editor_a.ready(function () {
        editor_a.setContent(questions[0].question);
    })
    editor_j.ready(function () {
        editor_j.setContent(questions[0].analysis);
    })
    // $('#main .cont .s2 p').html(questions[0].analysis);

    var str0 = questions[0].answer.split(",");
    var text0 = '';
    $.each(str0, function (k) {
        text0 += '<b><input type="radio" value="' + str0[k] + '" name="dana">' + str0[k] + '</b>';
    })
    $('#main .cont .s1 b').remove();
    $('#main .cont .s1').append(text0);
    $('input[value="' + questions[0].correctAnswer + '"]').prop('checked', true)


    $('#page').empty();
    current = questions;
    curr = 0;
    $.each(current, function (i) {
        $('#page').append('<span data_type="' + current[i].qtype + '" data_id="' + (i + 1) + '">' + (i + 1) + '</span>');

        $('#page span').eq(i).click(function () {
            curr = i;
            if ($(this).hasClass('on')) {
                $.each(save, function (k) {
                    if (save[k].id == $('#page span').eq(i).attr('data_id')) {
                        if (save[k].qtype == 1) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            var str1 = current[i].answer.split(",");
                            text = '';
                            $.each(str1, function (k) {
                                str1[k] = str1[k].replace(/\s/ig, '');
                                text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                            })
                            $('#main .cont .s1').append(text);
                        } if (save[k].qtype == 2) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            var str2 = current[i].answer.split(",");
                            text = '';
                            $.each(str2, function (k) {
                                str2[k] = str2[k].replace(/\s/ig, '');
                                text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                            })
                            $('#main .cont .s1').append(text);
                        } if (save[k].qtype == 3) {
                            $('#dddd').css('display','none');
                            $('#main .cont .s1 b').remove();
                            text = '';
                            text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                            $('#main .cont .s1').append(text);
                        } if (save[k].qtype == 4) {
                            $('#dddd').css('display', 'block');
                            $('#main .cont .s1 b').remove();
                            editor_d.ready(function () {
                                editor_d.setContent(save[k].correctAnswer);
                            })
                        } if (save[k].qtype == 5) {
                            $('#dddd').css('display', 'block');
                            $('#main .cont .s1 b').remove();
                            editor_d.ready(function () {
                                editor_d.setContent(save[k].correctAnswer);
                            })
                        }
                        editor_a.ready(function () {
                            editor_a.setContent(save[k].question);
                        })
                        editor_j.ready(function () {
                            editor_j.setContent(save[k].analysis);
                        })
                        $('#main .cont .s3 input[value="' + save[k].difficulteId + '"]').prop('checked', true)
                        $('#main .cont .s4 input[value="' + save[k].suggestionTime + '"]').prop('checked', true)
                        if ($('input[type="radio"]')) {
                            $('input[value="' + save[k].correctAnswer + '"]').prop('checked', true)
                        } if ($('input[type="checkbox"]')) {
                            for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                                if ((save[k].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                                    $('input[type="checkbox"]').eq(n).prop('checked', true);
                                }
                            }
                        }
                        return
                    } 
                })
            } else {
                if ($(this).attr('data_type') == 1) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str1 = current[i].answer.split(",");
                    text = '';
                    $.each(str1, function (k) {
                        str1[k] = str1[k].replace(/\s/ig, '');
                        text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                    })
                    $('#main .cont .s1').append(text);
                } if ($(this).attr('data_type') == 2) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str2 = current[i].answer.split(",");
                    text = '';
                    $.each(str2, function (k) {
                        str2[k] = str2[k].replace(/\s/ig, '');
                        text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                    })
                    $('#main .cont .s1').append(text);
                } if ($(this).attr('data_type') == 3) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    text = '';
                    text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                    $('#main .cont .s1').append(text);
                } if ($(this).attr('data_type') == 4) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[i].correctAnswer);
                    })
                } if ($(this).attr('data_type') == 5) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[i].correctAnswer);
                    })
                }
                editor_a.ready(function () {
                    editor_a.setContent(current[i].question);
                })
                editor_j.ready(function () {
                    editor_j.setContent(current[i].analysis);
                })
                

                if ($('input[type="radio"]')) {
                    $('input[value="' + current[i].correctAnswer + '"]').prop('checked', true)
                } if ($('input[type="checkbox"]')) {
                    for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                        if ((current[i].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                            $('input[type="checkbox"]').eq(n).prop('checked', true);
                        }
                    }
                }
            }            
            // $('#main .cont .s2 p').html(current[i].analysis);
            
        })
    })

    // editor_j.ready(function () {
    //     editor_j.setContent($('#main .cont .s2 p').html());
    // })
    // $('#main .cont .s2 p').click(function () {
    //     layer.open({
    //         type: 1,
    //         title: "解析",
    //         btn: ["确定", "取消"],
    //         content: $('#jiexi'),
    //         area: ['1024px', '400px'],
    //         yes: function () {
    //             layer.closeAll();
    //             // editor_j.ready(function () {
    //                 var j_detail = editor_j.getContent();
    //                 $('#main .cont .s2 p').html(j_detail);
    //             // })

    //         }
    //     });
    // })

    $('#main .bottom .shan').click(function(){
        if (confirm("是否删除本题?")) {
            if (current[curr].qtype == 1){
                a--;
                current = dan;
                var num = $('#main .middle .m2 .lei1').html().split('(')
                if (a != 0) {
                    $('#main .middle .m2 .lei1').html(num[0] + '(' + a + ')')
                } if (a == 0) {
                    $('#main .middle .m2 .lei1').remove();
                }
                
            } if (current[curr].qtype == 2){
                b--;
                current = duo;
                var num = $('#main .middle .m2 .lei2').html().split('(')
                if (b != 0) {
                    $('#main .middle .m2 .lei2').html(num[0] + '(' + b + ')')
                } if (b == 0) {
                    $('#main .middle .m2 .lei2').remove();
                }
                
            } if (current[curr].qtype == 3){
                c--;
                current = pan;
                var num = $('#main .middle .m2 .lei3').html().split('(')
                if (c != 0) {
                    $('#main .middle .m2 .lei3').html(num[0] + '(' + c + ')')
                } if (c == 0) {
                    $('#main .middle .m2 .lei3').remove();
                }
                
            } if (current[curr].qtype == 4){
                d--;
                current = tian;
                var num = $('#main .middle .m2 .lei4').html().split('(')
                if (d != 0) {
                    $('#main .middle .m2 .lei4').html(num[0] + '(' + d + ')')
                } if (d == 0) {
                    $('#main .middle .m2 .lei4').remove();
                }
                
            } if (current[curr].qtype == 5){
                e--;
                current = jie;
                var num = $('#main .middle .m2 .lei5').html().split('(')
                if (e != 0) {
                    $('#main .middle .m2 .lei5').html(num[0] + '(' + e + ')')
                } if (e == 0) {
                    $('#main .middle .m2 .lei5').remove();
                }
                
            } 
            $('#main .middle .m2 .quan').html('全部(' + (a + b + c + d + e) + ')')
            
            // questions.splice(curr, 1);
            $.each(questions,function(k){
                
                if (questions[k] == current[curr]) {
                    questions.splice(k, 1);
                }
            })
            current.splice(curr, 1);
            
            $('#page').empty();
            $.each(current, function (i) {
                $('#page').append('<span data_type="' + current[i].qtype + '">' + (i + 1) + '</span>');
                // $.each(questions, function (n) {
                //     if (current[i] == questions[n]) {
                //         $('#page span').eq(i).attr('data_id', (n + 1));
                //     }
                // })
                // curr = i;
            })
            
            if (curr > 0) {
                curr--;
            } if (curr = 0 && current.length > 0) {
                curr++;
            } 
            commonFn({ url: 'TKQuestionCreate/ImportQuestion?subjectid=' + subid + '&filename=' + filename, type: 'GET' }, function (res) {
                var types = res.types;
                var questions = res.questions;

                editor_a.ready(function () {
                    editor_a.setContent(current[curr].question);
                })
                editor_j.ready(function () {
                    editor_j.setContent(current[curr].analysis);
                })
                // $('#main .cont .s2 p').html(current[curr].analysis);

                if (current[curr].qtype == 1) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str1 = current[curr].answer.split(",");
                    text = '';
                    $.each(str1, function (k) {
                        str1[k] = str1[k].replace(/\s/ig, '');
                        text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                    })
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 2) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str2 = current[curr].answer.split(",");
                    text = '';
                    $.each(str2, function (k) {
                        str2[k] = str2[k].replace(/\s/ig, '');
                        text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                    })
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 3) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    text = '';
                    text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 4) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[curr].correctAnswer);
                    })
                } if (current[curr].qtype == 5) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[curr].correctAnswer);
                    })
                }

                

                if ($('input[type="radio"]')) {
                    $('input[value="' + current[curr].correctAnswer + '"]').prop('checked', true)
                } if ($('input[type="checkbox"]')) {
                    for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                        if ((current[curr].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                            $('input[type="checkbox"]').eq(n).prop('checked', true);
                        }
                    }
                }
            })
            
        }
        
    })
    
    $('#main .bottom .cun').click(function baocun() {
        var model = {};
        var d_detail = editor_d.getContent();
        if ($('#main .cont .s1 input[type="radio"]').length > 0) {
            answer = $('input[type="radio"]:checked').val();
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
        } if ($('#main .cont .s1 div').css("display") != 'none') {
            answer = d_detail;
        }
        var difficulteid = $('input[name="nandu"]:checked').val();
        var suggestiontime = $('input[name="time"]:checked').val();
        // var sourceid = $('input[name="come"]:checked').val();
        var questionsource = $('#main .cont .s8 input').val();
        var f_detail = editor_a.getContent();
        var j_detail = editor_j.getContent();
        if (f_detail == '' || f_detail == null) {
            alert('请设置题干');
            return;
        } if (j_detail == '' || j_detail == null) {
            alert('请填写解析');
            return;
        } if (current[curr].qtype == 0 || current[curr].qtype == '' || current[curr].qtype == null || current[curr].qtype == undefined) {
            return;
        } if (suggestiontime == 0 || suggestiontime == '' || suggestiontime == null || suggestiontime == undefined) {
            alert('请选择建议答题时间');
            return;
        } if (difficulteid == 0 || difficulteid == '' || difficulteid == null || difficulteid == undefined) {
            alert('请选择难度');
            return;
        } 
        if (questionsource != '' && questionsource != null && questionsource != undefined) {
            model.questionSource = questionsource;
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
        model.workType = zuoye;
        model.question = f_detail;
        model.qtype = current[curr].qtype
        model.correctAnswer = answer;
        model.analysis = j_detail;
        model.subjectId = subid;
        model.suggestionTime = suggestiontime;
        model.schoolId = window.schoolid;
        model.difficulteId = difficulteid;
        model.gradeId = gradeid;
        model.sourceId = 1;
        model.id = $('#page span').eq(curr).attr('data_id');

        if ($('#page span').eq(curr).hasClass('on')) {
            for (var k = 0; k < save.length; k++) {
                if (save[k].id == $('#page span').eq(curr).attr('data_id')) {
                    // save.splice(k, 1);
                    save[k].workType = zuoye;
                    save[k].question = f_detail;
                    save[k].qtype = current[curr].qtype
                    save[k].correctAnswer = answer;
                    save[k].analysis = j_detail;
                    save[k].subjectId = subid;
                    save[k].suggestionTime = suggestiontime;
                    save[k].schoolId = window.schoolid;
                    save[k].difficulteId = difficulteid;
                    save[k].gradeId = gradeid;
                    save[k].sourceId = 1;
                    save[k].id = $('#page span').eq(curr).attr('data_id');
                }
            }
        } else {
            save.push(model);
        }
        // console.log(save);
        // $('#page span').eq(curr).addClass('on');
        $.each($('#page span'),function(i){
            if ($(this).attr('data_id') == $('#page span').eq(curr).attr('data_id')) {
                $(this).addClass('on');
            }
        })
        curr++;

        if (curr < current.length) {
            commonFn({ url: 'TKQuestionCreate/ImportQuestion?subjectid=' + subid + '&filename=' + filename, type: 'GET' }, function (res) {
                var types = res.types;
                var questions = res.questions;

                editor_a.ready(function () {
                    editor_a.setContent(current[curr].question);
                })
                editor_j.ready(function () {
                    editor_j.setContent(current[curr].analysis);
                })
                // $('#main .cont .s2 p').html(current[curr].analysis);

                if (current[curr].qtype == 1) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str1 = current[curr].answer.split(",");
                    text = '';
                    $.each(str1, function (k) {
                        str1[k] = str1[k].replace(/\s/ig, '');
                        text += '<b><input type="radio" value="' + str1[k] + '" name="dana">' + str1[k] + '</b>';
                    })
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 2) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    var str2 = current[curr].answer.split(",");
                    text = '';
                    $.each(str2, function (k) {
                        str2[k] = str2[k].replace(/\s/ig, '');
                        text += '<b><input type="checkbox" value="' + str2[k] + '" name="dana">' + str2[k] + '</b>';

                    })
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 3) {
                    $('#dddd').css('display','none');
                    $('#main .cont .s1 b').remove();
                    text = '';
                    text += '<b><input type="radio" value="对" name="dana">对</b><b><input type="radio" value="错" name="dana">错</b>';
                    $('#main .cont .s1').append(text);
                } if (current[curr].qtype == 4) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[curr].correctAnswer);
                    })
                } if (current[curr].qtype == 5) {
                    $('#dddd').css('display', 'block');
                    $('#main .cont .s1 b').remove();
                    editor_d.ready(function () {
                        editor_d.setContent(current[curr].correctAnswer);
                    })
                }

                
                if ($('input[type="radio"]')) {
                    $('input[value="' + current[curr].correctAnswer + '"]').prop('checked', true)
                } if ($('input[type="checkbox"]')) {
                    for (var n = 0; n < $('input[type="checkbox"]').length; n++) {
                        if ((current[curr].correctAnswer.indexOf($('input[type="checkbox"]')[n].value)) != -1) {
                            $('input[type="checkbox"]').eq(n).prop('checked', true);
                        }
                    }
                }
            })
        } else {
            // alert('已经是最后一题');
            for (var k = 0; k < save.length; k++) {
                save[k].id = 0;
                if (save[k].qtype == 1) {
                    a0++;
                } if (save[k].qtype == 2) {
                    b0++;
                } if (save[k].qtype == 3) {
                    c0++;
                } if (save[k].qtype == 4) {
                    d0++;
                } if (save[k].qtype == 5) {
                    e0++;
                }
                commonFn({ url: 'TKQuestionCreate/UpdateQuestion', type: 'POST', async: false, data: save[k] }, function (res) {
                    if (res == true) {
                        number += 1;
                    }
                })
            }
            if (number == save.length) {
                location.href = 'complete.html?a=' + a0 + '&b=' + b0 + '&c=' + c0 + '&d=' + d0 + '&e=' + e0;
            }
        }
        
    })

    //题目预览

    $('.yu').click(function () {
        $('.tigan').html(editor_a.getContent());
        $('.yulan').css('display', 'block');
    })

    $('.quxiao').click(function () {
        $('.yulan').css('display', 'none');
    })


})



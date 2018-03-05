
var gradeid ='';
var subjectid ='';
var jiaocaiid = '';
var qtype ='';
var model = {};
var answer;
var actionNodeID;
var actionNodeName;
var groupid = 0;
var t; //修改部门树
var subid;
var subname;
var filename;
var a = 0, b = 0, c = 0, d = 0, e = 0;
var acc;
var text;
var correctAnswer = '';
var difficulteId = '';
var suggestionTime = '';
var question = '';
var analysis = '';
var knowledgeId = '';
var testId ='';
var chapterId ='';
var questionSource = '';
var workType = '';
var width = ($(window).width()) / 2 - 180;
var zuoye = '';
var yinpin = '';
//获取题目详细信息
var GetQuestion = {
                 url: "TKMyQuestion/GetQuestion",
                 type: "GET", 
                 async: false,
                 data:{
                    id:getUrlParam('id')
                 }   
         };
         commonFn(GetQuestion, function(json) { 

                gradeid = json.gradeId;
                subjectid = json.subjectId; 
                qtype = json.qtype;     
                correctAnswer = json.correctAnswer;
                difficulteId = json.difficulteId;
                suggestionTime = json.suggestionTime;
                question = json.question;
                analysis = json.analysis;
                subjectId = json.subjectId;
                knowledgeId = json.knowledgeId;
                testId = json.testId;
                questionSource = json.questionSource;
                chapterId = json.chapterId;
                workType = json.workType;

         })                      
// =======================
commonFn({ url: 'TKCommon/GetGradeList?schoolid=' + window.schoolid, type: 'GET',async: false}, function (res) {
    $.each(res, function (i) {
        $('.m4').append('<span data_id="' + res[i].id + '">' + res[i].grade + '</span>');             
    })
    $('.m4').find("span[data_id='"+ gradeid+"']").addClass("on");
    commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $('#main .middle .m4 span').eq(0).attr('data_id'), type: 'GET' ,async: false}, function (res) {
        $.each(res, function (i) {
            $('.m1').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
        })
            $('.m1').find("span[data_id='"+ subjectid +"']").addClass("on");
        $('#daoru .kemu span').click(function(){
            $(this).addClass('on').siblings().removeClass('on');
        })
        commonFn({ url: 'TKCommon/GetQuestionTypeList?subjectid=' + $('#main .middle .m1 span').eq(0).attr('data_id'), type: 'GET' ,async: false}, function (res) {           
            $.each(res, function (i) {
                $('.m2').append('<span data_id="' + res[i].id + '">' + res[i].typeName + '</span>');
            })
              $('.m2').find("span[data_id='"+ qtype +"']").addClass("on");
             if (qtype == 1) {
                         $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                             '<input type="radio" value="A" name="dana">A' +
                             '<input type="radio" value="B" name="dana">B' +
                             '<input type="radio" value="C" name="dana">C' +
                             '<input type="radio" value="D" name="dana">D<p>添加</p>')
                         var clicknum = 0;
                         $('#main .cont .s1 p').click(function () {
                             clicknum += 1;
                             var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                             if (clicknum <= 10) {
                                 if (confirm("确定添加吗?")) {
                                     $(this).before('<input type="radio" value="" name="dana">' + daan[(clicknum - 1)])
                                 }
                             }
                         })
                     } if (qtype == 2) {
                         $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                             '<input type="checkbox" value="A" name="dana">A' +
                             '<input type="checkbox" value="B" name="dana">B' +
                             '<input type="checkbox" value="C" name="dana">C' +
                             '<input type="checkbox" value="D" name="dana">D<p>添加</p>')
                         var clicknum = 0;
                         $('#main .cont .s1 p').click(function () {
                             clicknum += 1;
                             var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                             if (clicknum <= 10) {
                                 if (confirm("确定添加吗?")) {
                                     $(this).before('<input type="checkbox" value="" name="dana">' + daan[(clicknum - 1)])
                                 }
                             }
                         })
                     } if (qtype == 3) {
                         $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                             '<input type="radio" value="对" name="dana">对'+
                             '<input type="radio" value="错" name="dana">错')
                     } if (qtype == 4 || qtype == 5) {
                         // $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span><input name="input" id="input2" placeholder="'+ correctAnswer +'">')
                         $('#dddd').css('display','block');
                         
                     }
            $('#main .middle .m2 span').click(function () {
                $(this).addClass('on').siblings('span').removeClass('on');
                if ($(this).attr('data_id') == 1) {
                    $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                        '<input type="radio" value="A" name="dana">' +
                        '<input type="radio" value="B" name="dana">B' +
                        '<input type="radio" value="C" name="dana">C' +
                        '<input type="radio" value="D" name="dana">D<p>添加</p>')
                    var clicknum = 0;
                    $('#main .cont .s1 p').click(function () {
                        clicknum += 1;
                        var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                        if (clicknum <= 10) {
                            if (confirm("确定添加吗?")) {
                                $(this).before('<input type="radio" value="" name="dana">' + daan[(clicknum - 1)])
                            }
                        }
                    })
                } if ($(this).attr('data_id') == 2) {
                    $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                        '<input type="checkbox" value="A" name="dana">A' +
                        '<input type="checkbox" value="B" name="dana">B' +
                        '<input type="checkbox" value="C" name="dana">C' +
                        '<input type="checkbox" value="D" name="dana">D<p>添加</p>')
                    var clicknum = 0;
                    $('#main .cont .s1 p').click(function () {
                        clicknum += 1;
                        var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                        if (clicknum <= 10) {
                            if (confirm("确定添加吗?")) {
                                $(this).before('<input type="checkbox" value="" name="dana">' + daan[(clicknum - 1)])
                            }
                        }
                    })
                } if ($(this).attr('data_id') == 3) {
                    $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                        '<input type="radio" value="对" name="dana">对' +
                        '<input type="radio" value="错" name="dana">错')
                } if ($(this).attr('data_id') == 4 || $(this).attr('data_id') == 5) {
                    // $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span><input name="input" id="input2">')
                     $('#dddd').css('display','block');
                }
            })
        })
    })
    $('#main .middle .m4 span').click(function () {
        $(this).addClass('on').siblings('span').removeClass('on');
        gradeid = $(this).attr('data_id')
        commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $(this).attr('data_id'), type: 'GET' ,async: false}, function (res) {
            $('#main .middle .m1').empty().append('<b class="green">教学科目</b>');
            $.each(res, function (i) {
                $('#main .middle .m1').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
            })
            $('#main .middle .m1 span').click(function () {
                $(this).addClass('on').siblings('span').removeClass('on');
                subjectid = $(this).attr('data_id');
                aa(subjectid);
                commonFn({ url: 'TKCommon/GetQuestionTypeList?subjectid=' + $(this).attr('data_id'), type: 'GET' ,async: false}, function (res) {
                    $('#main .middle .m2').empty().append('<b class="green">题目类型</b>');
                    $.each(res, function (i) {
                        $('#main .middle .m2').append('<span data_id="' + res[i].id + '">' + res[i].typeName + '</span>');
                    })
                    $('#main .middle .m2 span').click(function () {
                        $(this).addClass('on').siblings('span').removeClass('on');
                        qtype = $(this).attr('data_id')
                        if ($(this).attr('data_id') == 1) {
                            $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                                '<input type="radio" value="A" name="dan">A' +
                                '<input type="radio" value="B" name="dan">B' +
                                '<input type="radio" value="C" name="dan">C' +
                                '<input type="radio" value="D" name="dan">D<p>添加</p>')
                            var clicknum = 0;
                            $('#main .cont .s1 p').click(function () {
                                clicknum += 1;
                                var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                                if (clicknum <= 10) {
                                    if (confirm("确定添加吗?")) {
                                        $(this).before('<input type="radio" value="' + daan[(clicknum - 1)] + '" name="dan">' + daan[(clicknum - 1)])
                                    }
                                }
                            })
                            $('#main .cont .s1 input[type="radio"]').each(function (j) {

                            })
                            // answer = $('#main .cont .s1 input[name="dana"]:checked').val();
                        } if ($(this).attr('data_id') == 2) {
                            $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                                '<input type="checkbox" value="A" name="duo">A' +
                                '<input type="checkbox" value="B" name="duo">B' +
                                '<input type="checkbox" value="C" name="duo">C' +
                                '<input type="checkbox" value="D" name="duo">D<p>添加</p>')
                            var clicknum = 0;
                            $('#main .cont .s1 p').click(function () {
                                clicknum += 1;
                                var daan = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
                                if (clicknum <= 10) {
                                    if (confirm("确定添加吗?")) {
                                        $(this).before('<input type="checkbox" value="' + daan[(clicknum - 1)] + '" name="duo">' + daan[(clicknum - 1)])
                                    }
                                }
                            })
                            // answer = $('#main .cont .s1 input[name="dana"]:checked').val();
                        } if ($(this).attr('data_id') == 3) {
                            $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span>' +
                                '<input type="radio" value="对" name="dan">对' +
                                '<input type="radio" value="错" name="dan">错')
                        } if ($(this).attr('data_id') == 4 || $(this).attr('data_id') == 5) {
                            // $('#main .cont .s1').empty().append('<span>答案<i class="red">*</i></span><input name="input" id="input2">')
                             $('#dddd').css('display','block');
                        }

                      

                    })
                })
            })
        })
    })
    $('#daoru .nianji span').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        commonFn({ url: 'TKCommon/GetSubjectList?schoolid=' + window.schoolid + '&gradeid=' + $(this).attr('data_id'), type: 'GET' ,async: false}, function (res) {
            $('#daoru .kemu').empty();
            $.each(res, function (i) {
                $('#daoru .kemu').append('<span data_id="' + res[i].subject_id + '">' + res[i].subject_name + '</span>');
            })
            $('#daoru .kemu span').click(function(){
                $(this).addClass('on').siblings().removeClass('on');
                subid = $(this) .attr('data_id');
                subname = $(this).html();
            })
        })
    })
})
//获取教材
aa(subjectId)
function aa(num){
    commonFn({ url: 'ZYHomeWorkWeb/GetTeaBookList?schoolid=' + window.schoolid + '&subjectid=' + num, type: 'GET' }, function (res) {
    $('#main .middle .m3').empty().append('<b class="green">教&emsp;&emsp;材</b>');
    $.each(res, function (i) {
        $('#main .middle .m3').append('<span data_gra="' + res[i].gradeId + '" data_sub="' + res[i].subjectId + '" data_jiao="' + res[i].jiaoCaiId + '">' + res[i].name + res[i].gradename + res[i].subject_name + '</span>');
    })
    $('#main .middle .m3 span').click(function () {

        $(this).addClass('on').siblings('span').removeClass('on');
          console.log()
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
            // getlist(data.roomId,data.roomName);
            // console.log(data)
            $("#demo1").ligerTree({
                data: data,
                checkbox: false,
                //ajaxType: 'get',
                idFieldName: 'id',
                onSelect: function (node, e) {
                    actionNodeName = node.data.name;
                    actionNodeID = node.data.id;
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
                    actionNodeName = node.data.name;
                    actionNodeID = node.data.id;
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
                    actionNodeName = node.data.name;
                    actionNodeID = node.data.id;
                    // layer.closeAll();
                }
            })

        });

    });

    
})
}

//作业类型

$('.hah').find("span[data-id='"+ workType +"']").addClass("on");
$('.hah').on('click','span',function(){
    workType = $(this).attr('data-id');
    $(this).addClass("on").siblings().removeClass("on");
    if($(this).attr('data-id') == 2){
       $('#audio').css('display','block')
    }else{
       $('#audio').css('display','none')
    }
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

// 难度
commonFn({ url: 'TKCommon/GetDifficultyList', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('#main .cont .s3').append('<input type="radio" value="' + res[i].id + '" name="nandu">' + res[i].difficuteName);        
    })
    $('#main .cont .s3').find("input[value="+ difficulteId +"]").attr("checked","checked");
})
// 答题时间;
commonFn({ url: 'TKCommon/GetSuggestTimeList', type: 'POST' }, function (res) {
    $.each(res, function (i) {
        $('#main .cont .s4').append('<input type="radio" value="' + res[i].id + '" name="time">' + res[i].suggestionTime + '分钟');
    })
    $('#main .cont .s4').find("input[value="+ suggestionTime +"]").attr("checked","checked")
})

$('#main .cont .s5 span a').on('click', function () {
    var demo1 = $("#demo1").html().replace(/\s/ig, ''); 
    var ddd = $('#main .m3 .on').html()  
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
            yes: function () {
                // t.alert();
                layer.closeAll();
                $('#main .cont .s5').find('p').remove();
                $('#main .cont .s5').find('div').remove();
                $('#main .cont .s5').append('<div data-id="'+ actionNodeID +'">' + actionNodeName + '</div>')
                $('#myModal1').css('display','none')
                if($('.s5 div').html() == 'undefined'){
                  alert('请选择请选择知识点目录')
                }
            },
            btn2: function(index, layero){
                 $('#myModal1').css('display','none')
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
            yes: function () {
                // t.alert();
                layer.closeAll();
                $('#main .cont .s6').find('p').remove();
                $('#main .cont .s6').find('div').remove();
                $('#main .cont .s6').append('<div data-id="'+ actionNodeID +'">' + actionNodeName + '</div>');
                $('#myModal2').css('display','none')
                if($('.s6 div').html() == 'undefined'){
                   alert('请选择请选择考点目录')
                }
            },
            btn2: function(index, layero){
                 $('#myModal2').css('display','none')
               }

        });
         
    }
    
})
$('#main .cont .s7 span a').on('click', function () {
     var demo1 = $("#demo3").html().replace(/\s/ig, '');
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
            yes: function () {
                // t.alert();
                layer.closeAll();
                $('#main .cont .s7').find('p').remove();
                $('#main .cont .s7').find('div').remove();
                $('#main .cont .s7').append('<div data-id="'+ actionNodeID +'">' + actionNodeName + '</div>');
                $('#myModal3').css('display','none')
                // console.log($('.s7 div').html())
                if($('.s7 div').html() == 'undefined'){
                   alert('请选择请选择章节目录')
                }
            },
            btn2: function(index, layero){
                 $('#myModal3').css('display','none')
               }            
        });
       
    }
    
})

//答案解析
var editor_j = UE.getEditor('editor_j');
editor_j.ready(function () {
    editor_j.setContent($('#6666').html());
    var j_detail = editor_j.getPlainTxt();
})
$('#6666').html(analysis);
$('#6666').click(function(){
   layer.open({
       type: 1,
       title: "解析",
       btn: ["确定", "取消"],
       content: $('#jiexi'),
       area: ['1024px', '500px'],
       yes: function () {
           layer.closeAll();
           editor_j.ready(function () {
               var j_detail = editor_j.getPlainTxt();
               // console.log(j_detail)
               $('#6666').html(j_detail);
                $('#jiexi').css('display','none')
               
           })
       },
       btn2: function(index, layero){
         $('#jiexi').css('display','none')
       }
   });   
})

var editor_a = UE.getEditor('editor');
var editor_b = UE.getEditor('editor2');
var editor_c = UE.getEditor('editor3');
editor_a.ready(function () {
    //设置编辑器的内容
    editor_a.setContent(question);
    //获取html内容，返回: <p>hello</p>
    var html = editor_a.getContent();
    //获取纯文本内容，返回: hello
    var txt = editor_a.getContentTxt();
});
editor_b.ready(function () {
    //设置编辑器的内容
    editor_b.setContent(analysis);
    //获取html内容，返回: <p>hello</p>
    var html = editor_b.getContent();
    //获取纯文本内容，返回: hello
    var txt = editor_b.getContentTxt();
});
editor_c.ready(function () {
    //设置编辑器的内容
    editor_c.setContent(correctAnswer);
    //获取html内容，返回: <p>hello</p>
    var html = editor_c.getContent();
    //获取纯文本内容，返回: hello
    var txt = editor_c.getContentTxt();
});
//试题来源
$('#input').val(questionSource)

$('#main .bottom .wan').click(function () {  
            if(qtype == 1|| qtype == 2 || qtype == 3){
               answer = $('.s1 input:checked').val()
            }else if(qtype == 4|| qtype == 5){
               answer = editor_c.getContent()
            }
            var difficulteid = $('input[name="nandu"]:checked').val();
            var suggestiontime = $('input[name="time"]:checked').val();
            var questionsource = $('#main .cont .s8 input').val();
            var f_detail = editor_a.getContent();
            var j_detail = $('#6666').html();
            if (questionsource != '' && questionsource != null && questionsource != undefined) {
                model.questionSource = questionsource;
            }if (gradeid == 0 || gradeid == '' || gradeid == null || gradeid == undefined) {
                alert('请选择年级');
                return;
            } if (subjectid == 0 || subjectid == '' || subjectid == null || subjectid == undefined) {
                alert('请选择科目');
                return;
            }
            if (f_detail == '' || f_detail == null || f_detail == undefined) {
                alert('请设置题干');
                return;
            } if (j_detail == '' || j_detail == null || j_detail == undefined) {
                alert('请填写解析');
                return;
            } if (suggestiontime == 0 || suggestiontime == '' || suggestiontime == null || suggestiontime == undefined) {
                alert('请选择建议答题时间');
                return;
            } if (difficulteid == 0 || difficulteid == '' || difficulteid == null || difficulteid == undefined) {
                alert('请选择难度');
                return;
            } 
            if (!$('.s5 div').attr('data-id')) {
                alert('请选择知识点');
                return;
            }
            if (!$('.s6 div').attr('data-id')) {
                 alert('请选择考点');
                 return;
            }
            if (!$('.s7 div').attr('data-id')) {
                 alert('请选择章节目录');
                 return;
            }
        if(workType != 2){
            yinpin = '';
        }

        model.id = getUrlParam('id');
        model.workType = workType;
        model.audio = yinpin;
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
        model.knowledgeId = $('.s5 div').attr('data-id');
        model.testId  = $('.s6 div').attr('data-id');
        model.chapterId = $('.s7 div').attr('data-id');
        model.questionSource = $('#input').val()
        commonFn({ url: 'TKQuestionCreate/UpdateQuestion', type: 'POST', async: false, data: model }, function (res) {
            // console.log(res)
            if (res == true) {
                window.location.href='question2.html'
            }
        })   
})

// 渲染知识点
if(knowledgeId != 0 || testId != 0 || chapterId !=0){
    var GetResKnowledge = {
                     url: "TKResource/GetResKnowledge",
                     type: "GET", 
                     async: false,
                     data:{
                        schoolId:window.schoolid,
                        id:knowledgeId
                     }              
             };
             commonFn(GetResKnowledge, function(json) { 
                // console.log(json)
                  $('.s5 p').html(json.name)
             })
    //渲染考点
    var GetResTest = {
                     url: "TKResource/GetResTest",
                     type: "GET", 
                     async: false,
                     data:{
                        schoolId:window.schoolid,
                        id:testId
                     }              
             };
             commonFn(GetResTest, function(json) { 
                // console.log(json)
                  $('.s6 p').html(json.name)
             })
    //渲染章节目录
    var GetResTest = {
                     url: "Resource/GetResChapter",
                     type: "GET", 
                     async: false,
                     data:{
                        schoolId:window.schoolid,
                        id:chapterId
                     }              
             };
             commonFn(GetResTest, function(json) { 
                // console.log(json)
                  $('.s7 p').html(json.name)
             })
}

//题目预览

$('.yu').click(function(){
    $('.tigan').html(editor_a.getContent());
    $('.yulan').css('display','block');
})

$('.quxiao').click(function(){
    $('.yulan').css('display','none');
})
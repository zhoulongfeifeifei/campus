var form = layui.form(),
    layer = layui.layer,
    layedit = layui.layedit,
    upload = layui.upload,

    Id = getUrlParam('id'),
    ClassId = getUrlParam('classid');
var schoolid = getCookieByUserInfo('schoolid');
var contentScore;
//var usertype=getCookie('usertype');
var usertype=getCookieByUserInfo('logintype');
var users,classid,phones,msgTypes = window.localStorage.getItem('msgTypes');
var studentName=new Array(),subjectChoose=new Array();
var exaimType="考试";
var ax=0;
//form.on('radio', function(data){
//if (data.value == 0) {
//  $('.scoreType').hide()
//}else{
//  $('.scoreType').show()
//}
//});
form.on("select(adminGrade)",function(data){
    ax=1;
    getExamInfo(Id,false , data.value,ax);
    $('.textarea').empty();
})
if (ClassId) {
    getExamInfo(Id,true,ClassId );
}else{
    getExamInfo(Id , false);
}
//发信息相关
//if (msgTypes) {
//  msgTypes = msgTypes.split(",");
//  $.each(msgTypes, function(index, val) {
//      if (val == 2) {$('.msgExclusive').removeClass('none')}
//      $.each($('.sentype'), function(i, el) {
//          if ($(el).val() == val)
//              $(el).prop('checked','true');
//      });
//  });
//  form.render('checkbox');
//  form.render('radio');
//
//}
form.on('radio(timedshortmsg)',function(data){
    if (data.value == 4) {
        $('.selectTime').removeClass('none')
    }else{
        $('.selectTime').addClass('none')
    }
})
form.on('checkbox(shortmsg)',function(data){
    if (data.elem.checked) {
        $('.msgExclusive').removeClass('none')
    }else{
        $('.msgExclusive').addClass('none')
    }
})


function getExamInfo(Id,isadmin ,ClassId,ax){
    var agrs ;
    if (ClassId) {
        args = {Id:Id , ClassId:ClassId}
    }else{
        args = {Id:Id}
    }
    args.schoolId=schoolid;
    args.usertype=usertype;
    if(!IsLogin()){
        top.location.href="../../login.html"
    }else{
        var ViewScoreNew={
            url:'/Score/ViewScoreNew',
            data:args,
            type:'post'
        }
        commonFn(ViewScoreNew,function(res){
            $('tbody').empty();
            $('thead tr').children(':not(:eq(0))').remove();
            if (res.publishState == 0) {
                $('.Sava , .Submit').css('display','inline-block');
                $('.xianshide').css('display','none');
            }
            // 老师或者管理员
            if (isadmin) {
                // start 老师的罗列
                $('.toptitle').text('成绩列表');
                $('.teacher').css('display', 'block');
                $('#whichclass').text(res.className);
                $('#examtype').text(res.title);
                $('#examdate').text(res.Date);
                $('#okexam').text(res.totalAmount-res.flagAmount);
                $('#noexam').text(res.flagAmount);
                // end
            }else{
                // start 管理员的罗列
                var term ;
                if (res.term == 1) {
                    term ="上学期";
                }else if(res.term == 2){
                    term ="下学期";
                }
                $('.toptitle').text(res.year+'学年'+term+res.title);
                $('.admin').css('display', 'block');
                if (res.classes && res.classes.length>0) {
                    $('#adminGrade').empty();
                    for (var i = 0; i < res.classes.length; i++) {
                        $('#adminGrade').append('<option value='+res.classes[i].classId+'>'+res.classes[i].className+'</option>')
                    }
                    form.render('select');
                    if(ax!=1){
                        $('#adminGrade').find('option').eq(0).attr('selected','selected');
                        ClassId=res.classes[0].classId;

                    }

                    $('#adminGrade').val(ClassId);
                    if(ax!=1){
                        getExamInfo(Id,true,ClassId );
                        return false;
                    }

                }
                $('#classnum').text(res.classes.length);
                $('#ernum').text(res.totalAmount);
                // end
            }
            //是否添加考试分类
            form.on('checkbox(WithType)',function(data){

                if(data.elem.checked){
                    exaimType=res.title;
                }else{
                    exaimType='考试';
                }
            });
            //考试时间
            var exaimTime=solveTime(res.date)
            // 监控短信内容里的两个checkbox
            form.on('checkbox(cont)',function(data){
                if (data.value==0) {
                    if (data.elem.checked) {
                        $(".textarea .name").show();
                    }else{
                        $(".textarea .name").hide();
                    }
                }
                if (data.value==1) {
                    if (data.elem.checked) {
                        $(".textarea .type").html(t.Title);
                    }else{
                        $(".textarea .type").html("考试");
                    }
                }
            })
            $('.subChoose').empty();
            for (var o in res.subjects) {
                $('<th date-id="'+res.subjects[o]+'">'+o+'</th>').appendTo('thead tr');
                $('<input type="checkbox" name="Subject" lay-skin="primary" title="'+o+'" value="'+res.subjects[o]+'" lay-filter="Subject">').appendTo('.subChoose');
            }
            form.render();

            // 循环学生
            var userIds=[],classIds= [],phones=[];
            for (var i = 0; i < res.students.length; i++) {
                var erScore;
                var xfstate=1;

                $.each(res.students[i].score , function(index, el) {
                    var noClass;
                    if(el.score==-1){
                        xfstate=0;
                        noClass="none"
                    }else{
                        xfstate=1;
                        noClass='has'
                    }
                    erScore +='<td class="scorebox" data-isq="'+xfstate+'" subjId='+el.subjectid+'>'+
                        '<input type="text" class="newscore noClass" name="StudentScore" value="'+el.score+'" />'+
                        '<input type="hidden" class="oldscore noClass" name="StudentScore" value="'+el.score+'" />'+
                        '<a href="javascript:;" class="noscore">缺考</a></td>'

                });
                userIds.push(res.students[i].userid);
                classIds.push(res.students[i].classId);

                $('<tr data-id='+res.students[i].student_id+'><td data-userid='+res.students[i].userid+' data-classId='+res.students[i].classId+' data-schoolid='+res.students[i].schoolid+'>'+res.students[i].student_name+'</td>'+erScore+'</tr>').appendTo('tbody');
                studentName.push(res.students[i].student_name);
                erScore='';

            }
            users=userIds;
            classid=classIds;
            //获取选中的科目id
            var subId=new Array();
            var subName=new Array();
            form.on('checkbox(Subject)',function(data){
                subId=[];
                subName=[];
                var val=$(".subChoose input:checked");
                $.each(val, function(i,n) {
                    subId.push(n.value);
                    subName.push(n.title);
                });
                smsCheng(subId,subName,exaimType)
            });
            function smsCheng(subId,subName,exaimType){
                var textareaHtml='';
                $('.textarea').empty();
                $.each($('tbody tr'),function(j,k){
                    var name=$(k).find("td:eq(0)").html();
                    var k=k;
                    var XF='';
                    var chengji=' ';
                    $.each(subId,function(i,n){
                        var state=$(k).find("td[subjid='"+n+"']").attr("data-isq");
                        if(state==1){
                            XF=$(k).find("td[subjid='"+n+"']").find("input").val();
                        }else{
                            XF='缺考';
                        }
                        chengji+=subName[i]+':'+XF+',';
                    })
                    if(subId.length==0){
                        $('.textarea').html('请选择学生科目')
                    }else{
                        $('.textarea').append('您的孩子<span class="name">'+name+'</span>在<span class="exaimTime">'+exaimTime+'</span><span class="exaimType">'+exaimType+'</span>中<span class="course">'+chengji+'</span>;</br>');
                        contentScore=$('.textarea').text().split(';');
                    }

                })

            }
            $('.scorebox').mouseover(function(){
                $(this).addClass("showlink")
            })
            $('.scorebox').mouseout(function(){
                $(this).removeClass("showlink")
            })

            // 缺考
            $("a.noscore").click(function () {
                var $td = $(this).parent(); //.removeClass('showlink')

                if ($td.hasClass("noscore")) {
                    var old = parseInt($td.find(".oldscore").val());
                    $td.find(".newscore").val(old < 0 ? 0 : old);
                    $td.removeClass('noscore');
                } else {
                    $td.find(".newscore").val(-1);
                    $td.addClass('noscore');
                }
            });

            $('.Sava').click(function() {
                var List =new Array();
                $('tbody tr').each(function(index, el) {
                    $('thead tr th:not(:eq(0))').each(function(i2, el2) {
                        var Student ={};
                        Student.Id = $(el).attr('data-id');
                        Student.SubjectId = $(el2).attr('date-id');
                        Student.SubjectName = $(el2).text();
                        if (true) {}
                        Student.Score = $(el).find('td.scorebox:eq('+(i2)+')').find('.newscore').val();
                        Student.OldScore = $(el).find('td.scorebox:eq('+(i2)+')').find('.oldscore').val();
                        List.push(Student);
                    });
                });

                strList = JSON.stringify(List);
                var ChangeScoreBatch={
                    url:'/Score/ChangeScoreBatch',
                    data:{scoreId : Id , student : strList,schoolid:schoolid},
                    type:'post'
                }
                commonFn(ChangeScoreBatch,function(data){
                    layer.msg("修改成功",{
                        time:1000
                    },function(){
                        getExamInfo(Id,isadmin ,ClassId);
                        return false;
                    });
                })
            });

            $('.Submit').click(function() {
                layer.confirm("发布后不可以再修改,确定要发布吗?", {
                    icon:3,title:"发布成绩提醒"
                },function(index){
                    layer.close(index);
                    var ToPublishScore={
                        url:'/Score/ToPublishScore',
                        data:{score_id :Id},
                        type:'get'
                    }
                    commonFn(ToPublishScore,function(data){
                        layer.msg("发布成功",{
                            time:1200
                        },function(){
                            location.href="History.html"
                        })
                    })
                })

            });
            //消息发送
            form.on('submit(demo1)',function(){

                if(classid[0]==0){
                    layer.msg('请选择班级');
                }else if(subId.length==0){
                    layer.msg('请选择科目');
                }else{
                    //发送给每一个学生

                    $('.pushType  input[type="checkbox"]:checked').each(function(index,el){
                        if($(el).val()==1){
                            if(contentScore.length>1){
                                contentScore.pop();
                            };
                            var contents;
                            for(var x=0;x<users.length;x++){
                                contents=contentScore[x];
                                sendBatchAttachMsg(solveSaveData2And3(contents,x,subId),function(res){
                                    if(x==users.length){
                                        layer.msg('发送成功');
                                    }

                                    return false;
                                })
                            }

                        }else if($(el).val()==2){
                            $('.msgExclusive input:checked').each(function(index2, ell) {
                                // 即时短信
                                if ($(ell).val()==3) {
                                    // 定是短信   -- 信息站点不一样
                                    layer.msg('待完成');
                                }else if($(ell).val()==4){
                                    layer.msg('待完成')
                                }
                            })
                        }else if($(el).val()==0){
                            layer.msg('待完成')
//								var modal = {};
//								 modal.signature = $('#Signature').val();
//								 modal.content=$('.textarea').html();
                        }
                    })
                }
                return false;
            })
        })
    }
}

function solveSaveData2And3(contents,indexx,subId){
    var obj = {
        toAccids:users[indexx],
        /*     toReces : [{
         toAccid: "102687",
         class_id:0,
         type : 1  ,
         receiveId :0,
         toPhone: "15638179576",
         numType: window.localStorage.getItem('numtype')
         }],*/

        toReces : [],
        attach:JSON.stringify({
            type:'score',
            title : contents + '————' + $('#Signature').val(),
            subjectid:subId,
            scoreid:Id,
            classid:$('#adminGrade').val(),
            isSelectedCityCard : false,
            isGroup :users.length > 1 ? 1 : 0
        })
    }
    $.each(users, function(index, val) {
        if(index === indexx){
            obj.toReces.push({
                toAccid:val,
                class_id:$('#adminGrade').val(),
                type : 0  ,
                receiveId :0,
                toPhone:  $.isArray(phones) ? phones[index-1] : 0,
                numType: window.localStorage.getItem('numtype')
            })
        }
    });
    return obj;
}
// 增加署名
$('.addSignature').click(function(event) {
    addsigmodal = layer.open({
        type: 1,
        title: '增加署名',
        closeBtn: 1,
        shadeClose: true,
        btn: "确定",
        area: ['300px', '180px'],
        content: $('#sig'), //这里content是一个DOM
        yes: function() {
            var strname = $('input[name="sign"]').val(),
                falg = true;
            $('#Signature option').each(function(index, el) {
                if ($(el).val() == strname) {
                    layer.msg("已存在该署名");
                    falg = false
                }
            });
            if (falg) {
                $('#Signature').append('<option value="' + strname + '">' + strname + '</option>');
                form.render();
                if ($.trim(strname).length > 0) {
                    updateSigns("增加", addsigmodal);
                } else {
                    layer.msg("署名不能为空");
                }
            }
        }
    })
});
$('.removeSignature').click(function(event) {
    var sign = $('#Signature').val();
    if (sign) {
        layer.confirm('确定删除"' + sign + '"署名吗?', {
            icon: 3,
            title: "删除署名提示"
        }, function(index) {
            $('#Signature').append('<option></option>')
            $('#Signature').find('option[value="' + sign + '"]').remove();
            form.render();
            updateSigns("删除", index);
        })
    }
});
getSign();

function updateSigns(fuck, index) {
    var signArr = [];
    $('#Signature option[value]').each(function(index, el) {
        signArr.push($(el).val());
    });
    var signStr = '';
    if (signArr.length > 0) {
        signStr = signArr.join(',')
    }
    var removeSignLoad = layer.load();
    commonFn({
        url: '/Teacher/UpdateSigns',
        data: {
            sign: signStr
        }
    }, function(res) {
        $('input[name="sign"]').val('')
        layer.close(removeSignLoad);
        layer.msg(fuck + "成功")
        getSign();
    })
    layer.close(index);
}
//
//
function getSign() {
//  var getsingload = layer.load();
    $('#Signature').empty();
    commonFn({
        url: '/Teacher/GetTeacherSign',
        type:'post'
    }, function(res) {
//      layer.close(getsingload);
        if (res && res.length > 0) {
            $.each(res, function(index, el) {
                $('#Signature').append('<option value="' + el + '">' + el + '</option>')
            });
            form.render('select');
        }

    })
}


// 得到URl路径的一个方法
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return (r[2]); return null; //返回参数值
}
// 转换时间的一个方法
function oktime(isoktime){
    if (isoktime) {
        isoktime = eval(isoktime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))
        isoktime = new Date(isoktime);
        isoktime = isoktime.getFullYear() + '-' + (isoktime.getMonth() + 1) + '-' + isoktime.getDate() + ' ' + isoktime.getHours() + ':' + isoktime.getMinutes() + ':' + isoktime.getSeconds();
        return isoktime;
    }else if(isoktime == null ){
        return ""
    }
    else{
        return "";
    }
}
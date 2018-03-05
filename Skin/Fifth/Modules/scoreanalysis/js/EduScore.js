 // 开始进入页面时候的请求的api--成绩设置

 $("#select2").on('change', function() {
     if ($(this).val() == "zdy") {
         $("#zdy").show();
     } else {
         $("#zdy").hide();
     }
 });
 var scoreid = getUrlParam('scoreid'),
     id = getUrlParam('id'),
     layer = layui.layer;
 if (scoreid) {
     $('.page1').removeClass('showpage');
     $('.page2').removeClass('showpage');
     $('.page3').addClass('showpage'); 
 }else{
    scoreid = id;
 }
 $('#page3downexcel').on('click',function() {
     window.open(window.siteHost+"ScoreDownload/ScoreAnalysisExport?schoolId="+window.schoolid+'&scoreid='+scoreid);
 })
 commonFn({
     url: 'ScoreAnalysis/GetBasicData',
     data: {
         schoolId: window.schoolid
     }
 }, function(data) {
     // 全部科目数组
     var SubjctList = data.subjctList;
     //全部年级数组
     var ExamObjectList = data.examObjectList;

     // 罗列初始数据
     if (SubjctList && SubjctList.length > 0) {
         for (var i = 0; i < SubjctList.length; i) {
             $('#subjctlist').append('<label style="line-height: 34px"><input class="subClass" type="checkbox" name="subjct" value=' + SubjctList[i].id + ' ><span>' + SubjctList[i].name + '</span></label>');
             i++;
         }
     }
     if (ExamObjectList && ExamObjectList.length > 0) {
         for (var p = 0; p < ExamObjectList.length; p) {
             $('#examobj').append('<label class="examobj"><input type="radio" name="radio3" class="level-type" value=' + ExamObjectList[p].id + '><span>' + ExamObjectList[p].name + '</span></label>')
             p++;
         }
     }
     if (data.scorePar) {
         var oversubjctlist, oversubjctchildren, overexamobjlist, threeList
             // 选中的科目数组

         oversubjctlist = data.scorePar.subjctList
         if (oversubjctlist.length > 1) {
             oversubjctchildren = oversubjctlist[0].subjectSettingList
         }
         if (data.scorePar.examObjectList) {
             //选中的年级数组
             overexamobjlist = data.scorePar.examObjectList;
         }
         if (data.exportWord) {
             //第三页面
             var threeList = data.exportWord;
         }
         // 还原上次设置

         // 科目
         for (var m = 0; m < oversubjctlist.length; m++) {

             $('#subjctlist').find('input[name="subjct"]').each(function() {

                 if ($(this).val() == oversubjctlist[m].id) {
                     $(this).attr('checked', true);
                 }
             })
             var domlist1 = '<li class="a' + oversubjctlist[m].id + '"><label><span>' + oversubjctlist[m].name + '：<span><span class="noFail">不及格</span>分:<span class="nofailval"></span><input type="text">)    </label></li>';
             $('#d2 ul').append(domlist1);
             var numVal2 = $('.parametricform input[name="radio1"]:checked').val();
             switch (numVal2) {
                 case '0':

                     fractionfn();
                     break;

                 case '1':
                     proprotionfn();
                     break;

                 case '2':
                     rankfn();
                     break;
             }
         }
         // 年级
         $('#examobj').find('input[name="radio3"]').each(function() {
             if ($(this).val() == overexamobjlist.id) {
                 $(this).attr('checked', true)
             }
         })

         // 参数形式
         $('.parametricform').find('input[name="radio1"]').each(function() {
             if ($(this).val() == data.scorePar.assessType) {
                 $(this).attr('checked', true);
             }
         })


         // 根据形式不同显示字段不同
         switch (data.scorePar.assessType) {
             case 0:
                 fractionfn();
                 break;

             case 1:
                 proprotionfn();
                 break;

             case 3:
                 rankfn();
                 break;
         }

         // 参数类型
         if (oversubjctchildren && oversubjctchildren.length > 0) {
             for (var k = 0; k < oversubjctchildren.length - 1; k++) {
                 var noFailobj = {};
                 noFailobj.pVal = oversubjctchildren[0].parValue
                 noFailobj.cVal = oversubjctchildren[0].compValue;
                 $('.noFail').nextAll('input').val(noFailobj.pVal);
                 $('.CompValue input[name="text"]').val(noFailobj.cVal);
                 var targ = {};
                 targ.aVal = oversubjctchildren[k + 1].parName;
                 targ.pVal = oversubjctchildren[k + 1].parValue;
                 targ.cVal = oversubjctchildren[k + 1].compValue;
                 addtypefn(k, targ);
                 modifytext(targ.aVal, k);
             }
         }

         // 设置范围
         if (data.scorePar.setType == 0) {
             $('.i1 input[name="radio2"]').attr('checked', true);
             i1fn();
         } else if (data.scorePar.setType == 1) {
             $('.i2 input[name="radio2"]').attr('checked', true);
             i2fn();
         }

         // 第三页面
         // 基础字段
         if (threeList) {
             if (threeList.basicWord) {
                 $('#Basicsaa input[name="Name"]').each(function() {
                     for (var u = 0; u < threeList.basicWord.length; u++) {
                         if ($(this).val() == threeList.basicWord[u]) {
                             $(this).attr('checked', true);
                         }
                     }
                 })
             }
             // 参数字段
             if (threeList.parWord !== null) {

                 $('#threechecked input[name="Name"]').each(function() {
                     for (var v = 0; v < threeList.parWord.length; v++) {
                         if ($(this).parent().text() == threeList.parWord[v]) {
                             $(this).attr('checked', true);
                         }
                     }
                 })
             }
             // 年级前多少名
             if (threeList.ranking !== null) {

                 $('#firstFew input[name="Name"]').each(function() {
                     for (var w = 0; w < threeList.ranking.length; w++) {
                         if ($(this).val() == threeList.ranking[w]) {
                             $(this).attr('checked', true);
                         }
                     }
                 })
             }
         }
     }
     var z = 99999;
     // 自定义添加
     $('#addType').click(function() {
         if ($('#subjctlist').find('input[name="subjct"]:checked').length < 1) {
             layer.msg("请选择科目");
             return;
         }
         var targ = {}
         addtypefn(z, targ);
         z++;
     })


     // 单科设置根据选中科目和参数类型的情况而变化
     $('#subjctlist input[name="subjct"]').on('change', function() {
         if ($('#subjctlist input[name="subjct"]:checked').length == 0) {
             $(this).prop('checked', true);
             layer.msg("至少有一门科目");
         } else {
             var subjctName = $(this).next().text();
             var subjctValue = $(this).val();

             if ($(this).prop("checked")) {
                 if ($('#d2 li').length > 0) {
                     var aaa = $('#d2 li:eq(0)')[0].innerHTML;
                     aaa = aaa.substr(123);
                     var unified_set = '<li class="a' + subjctValue + '"><label><span>' + subjctName + '</span>：<span><span class="noFail">不及格</span>分:<span class="nofailval"></span><input type="text">)    </label>' + aaa + '</li>'
                 } else {

                     var unified_set = '<li class="a' + subjctValue + '"><label><span>' + subjctName + '</span>：<span><span class="noFail">不及格</span>分:<span class="nofailval"></span><input type="text">)    </label></li>'
                 }
                 $('#d2 ul').append(unified_set);
                 var numVal1 = $('.parametricform input[name="radio1"]:checked').val();
                 switch (numVal1) {
                     case '0':
                         fractionfn();
                         break;

                     case '1':
                         proprotionfn();

                         break;

                     case '2':
                         rankfn();
                         break;
                 }

             } else {
                 $('#d2 ul li').remove(".a" + subjctValue);
             };
         }
     })
 })

 //增加类型
 function addtypefn(z, targ) {
     if (targ.aVal == undefined) {
         targ.aVal = '';
     }
     if (targ.pVal == undefined) {
         targ.pVal = '';
     }
     if (targ.cVal == undefined) {
         targ.cVal = '';
     }

     var addtype = '<label id="a' + z + '" class="parameterType"><input type="text" onblur="modifytext(this.value,' + z + ')" name="name" value=' + targ.aVal + '>分<span class="removeself" onclick="deleteHA(' + z + ')">×</span></label>';
     var zfen = "";
     var inpval = $(".parametricform input[name='radio1']:checked").val();
     switch (inpval) {
         case '0':
             zfen = "总分*"
             break;

         case '1':
             zfen = "总排名*";
             break;

         case '2':
             zfen = "年段名次≤";
             break;
     }
     var setrange = '<label id="b' + z + '"><span></span>分:<span class="formset">' + zfen + '</span><input type="text" value=' + targ.pVal + '></label>';
     var setparametype = '<label id="c' + z + '"><span></span>分:<span class="formset">' + zfen + '</span><input type="text" value=' + targ.pVal + '></label>';
     var allsetran = '<label id="d' + z + '" class="CompValue">+<span></span>率 * 100 *<input type="text" value=' + targ.cVal + '></label>';
     var threeDom = '<li id="e' + z + '"><label class="w-120"><input type="checkbox" name="Name" value=""  /><span></span>人数</label><label class="w-120"><input type="checkbox" name="Name" value  /><span></span>率</label></li>'

     $('.formset').text(zfen);

     $('#ParameterType').append(addtype);
     $('#d1').append(setrange);
     $('#d2 ul li').append(setparametype);
     $('#allsetran').append(allsetran);
     $('#threechecked').append(threeDom);
 }


 //参数类型的删除功能
 function deleteHA(z) {
     $('#ParameterType').find('#a' + z).remove();
     $('#d1').find('#b' + z).remove();
     $('#d2 ul li').find('#c' + z).remove();
     $('#allsetran').find('#d' + z).remove();
     if ($('#ParameterType').find('label').length < 2) {
         $('#subjctlist input').attr("disabled", false);
     }
     $('#threechecked').find('#e' + z).remove();
 }


 function modifytext(vl, z) {
     // body...
     $('#d1').find('#b' + z).children('span:eq(0)').text(vl);
     $('#d2 ul li').each(function() {
         $(this).find('#c' + z).children('span:eq(0)').text(vl);
     })
     $('#allsetran').find('#d' + z).children('span:eq(0)').text(vl);
     $('#threechecked').find('#e' + z).find('span').text(vl);
     $('#threechecked').find('#e' + z).find('input').val(vl);

 }
 //设置范围的选择性功能
 function i1fn(argument) {
     $('.i1').addClass('isetRange');
     $('.i2').removeClass('isetRange');
     $('#d1').addClass('displayblcok ParValue');
     $('#d2').removeClass('displayblcok ParValue')
 }

 function i2fn(argument) {
     $('.i2').addClass('isetRange');
     $('.i1').removeClass('isetRange');
     $('#d1').removeClass('displayblcok ParValue');
     $('#d2').addClass('displayblcok ParValue');
 }
 $('.i1').click(function() {
     i1fn();
 })
 $('.i2').click(function() {
     i2fn();
 })

 //参数形式的选择性功能
 //按分数
 function fractionfn(argument) {
     // body...
     $('.formset').html('总分*');
     $('.noFail').next().text('总分*（1）');
     $('.nofailval').html('总分*（1-');
 }
 //按占比
 function proprotionfn(argument) {
     $('.formset').html('总排名*');
     $('.nofailval').text('总分*（1-');

 }
 //按排名
 function rankfn(argument) {
     $('.formset').html('年段名次≤')
     $('.nofailval').text('年段名次≥');
 }
 $('#fraction').click(function() {
     fractionfn();
 })

 $('#proprotion').click(function() {
     proprotionfn();
 })

 $('#rank').click(function() {
     rankfn();
 })

 // 保存首页设置
 // 点击保存`  

 $('#savaset').on('click', function() {
     var savaload = layer.load();
     $('#subjctDom').children().remove();
     // 设置范围
     var setType = $('.isetRange input[name="radio2"]:checked').val();
     // 参数形式
     var assessType = $('.parametricform input[name="radio1"]:checked').val();
     //设置科目
     var SubjctList = []
     for (var k = 0; k < $('#subjctlist label input[type="checkbox"]:checked').length; k) {

         var id = $('#subjctlist label input[name="subjct"]:checked:eq(' + k + ')').attr('value');

         var Name = $('#subjctlist input[name="subjct"]:checked:eq(' + k + ')').next().text();

         //导入教务考试的科目元素
         var subjctnamedom = '<span class="w-120">' + Name + '</span>'
         $('#subjctDom').append(subjctnamedom);
         // 参数类型、形式、范围    计算公式所要参数
         var SubjectSettingList = [];

         for (var i = 0; i < $('.parameterType').length; i) {
             // 请求的json赋值
             var ParName = $('.parameterType:eq(' + i + ')').children('input[type="text"]').val();
             var ParValue = $('.ParValue').find('input[type="text"]:eq(' + i + ')').val();
             var CompValue = $('.CompValue:eq(' + i + ')').children('input[type="text"]').val();
             var obj = {
                 ParName: ParName,
                 ParValue: ParValue,
                 CompValue: CompValue
             }
             SubjectSettingList.push(obj);
             // 动态添加元素
             // 通过类型显示的设置范围

             i++;
         }

         var aobj = {
                 Id: id,
                 Name: Name,
                 SubjectSettingList: SubjectSettingList
             }
             // 科目数组
         SubjctList.push(aobj);
         k++;

     }

     var ExamObjectList = {
         Id: $('.examobj input[name="radio3"]:checked').attr('value'),
         Name: $('.examobj input[name="radio3"]:checked').next().text()
     }
     var gradeval = ExamObjectList.Name;

     $('#gradeDom').text(gradeval);
     var model = {
         // schoolId: window.schoolid,
         setType: setType,
         assessType: assessType,
         SubjctList: SubjctList,
         ExamObjectList: ExamObjectList
     }
     
     var strModel = JSON.stringify(model)
     commonFn({
         url: 'ScoreAnalysis/SavaSetting',
         data:{
            schoolId:window.schoolid,
            arg: model
         },
         type: 'post'
     }, function(data) {
         layer.close(savaload);
         $('.page1').removeClass('showpage');
         $('.page2').addClass('showpage');
         $('.page3').removeClass('showpage');

         function fixZero(num, length) {
             var str = "" + num;
             var len = str.length;
             var s = "";
             for (var i = length; i-- > len;) {
                 s += "0";
             }
             return s + str;
         }
         var todayDate = new Date();
         var vYear = todayDate.getFullYear()
         var vMon = todayDate.getMonth() + 1
         var vDay = todayDate.getDate()
         $('#demo').val(vYear + "-" + fixZero(vMon, 2) + "-" + fixZero(vDay, 2));
     }, function() {
        layer.close(savaload);
     })
 })

 $('#downexcel').click(function() {
     location.href = window.siteHost+"ScoreDownload/ScoreAnalysisTemplateExport?schoolId="+window.schoolid;
 })

 $('#uploadfiles').on('click', function() {
     var args = new Object();
     args.Year = $("#select1").find("option:selected").text();
     if ($("#select2").find("option:selected").text() == "自定义") {
         args.Term = $('#zdy').val();
     } else {
         args.Term = $("#select2").find("option:selected").val()
     }
     args.ScoreTypeId = 0;
     args.ScoreTypeName = $('#ScoreTypeName').val();
     args.ScoreTime = $('#demo').val();
     args.GradeId = $('#examobj').find('input[name="radio3"]:checked').val();
     
     // args.scoreFile = $('input[name="path"]').val();
     args.scoreFile = $('#txtfiles').text();

     args.schoolId =window.schoolid;
     // args.userType =getCookieByUserInfo('logintype');
     args.userType =10;
     
     commonFn({
        url:'ScoreAnalysis/UploadExcel',
        type:'post',
        data:args
     },function(res){
        $("#uploadfiles").text("上传成功");
        layer.alert("发布成功。",function(index){
            layer.close(index);
            $('.page1').removeClass('showpage');
            $('.page2').removeClass('showpage');
            $('.page3').addClass('showpage');
        });
     })
 })


 $('#Preservation').click(function() {
     var model = {}
     model.BasicWord = [];
     model.ParWord = [];
     model.Ranking = [];

     $('#Basicsaa input:checkbox[name="Name"]:checked').each(function() {
         var Basic = $(this).val()
         model.BasicWord.push(Basic)
     })
     $('#threechecked input:checkbox[name="Name"]:checked').each(function() {
         var threche = $(this).val()
         model.ParWord.push(threche);
     })
     $('#firstFew input:checkbox[name="Name"]:checked').each(function() {
         var firstFew = $(this).val()
         model.Ranking.push(firstFew)
     })
     var strmodel = JSON.stringify(model)
     commonFn({
         type: 'post',
         url: 'ScoreAnalysis/SavaExport',
         data: {
             arg: model,
             schoolId:window.schoolid
         }
     }, function() {
         $("#page3downexcel").removeClass("none");
     })


 })
 $('#old').click(function() {
     $('.page1').addClass('showpage');
     $('.page2').removeClass('showpage');
     $('.page3').removeClass('showpage');
 })
 $('#page3old').click(function() {
     $('.page2').addClass('showpage');
     $('.page1').removeClass('showpage');
     $('.page3').removeClass('showpage');
 })

 // 上传
 layui.upload({
     url: window.apiUrl + 'Common/ImportFile',
     type: 'file',
     success: function(res) {
         $('input[name="path"]').val(res.data);
         $('#txtfiles').text(getFileName(res.data));
     }
 })

 function CheckScoreType() {
     var isMultiple = $("#ScoreTypeId").find("option:selected").attr("data-multiple") == "True";
     var isTimes = $("#ScoreTypeId").find("option:selected").attr("data-times") == "True";
     var text = $("#ScoreTypeId").find("option:selected").text();
     var value = $("#SubjectId").val();
     if (value == 0 && !isMultiple) {
         top.parent.showTips(text + "不支持多科导入", 5);
         return false;
     }
     return true;
 }

 function getFileName(u) {
     var arr = u.split('/');
     return arr[arr.length - 1];
 }
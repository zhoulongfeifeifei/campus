/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:13:59
 * @version $Id$
 */

var thead = "<th style=\"width: 15%;\"></th>";
for (var i = 0; i < 7; i++) {
    for (var si = 1; si < 16; si++) {
        thead += "<th>" + si + "</th>";
    }
}
$('#demoTable thead tr').html(thead);

var tableid = getUrlParam("tableid");
if (tableid == null || tableid == '') tableid = 0;
var getlist ={url:"OpenCourse/GetAllCourseContent",data: { tableid: tableid,schoolid:getCookieByUserInfo('schoolid')}};
commonFn(getlist,function(result){

        $('.bar-header span').text(result.courseTableName);
        
        var classlists = result.classList;
        if (classlists && classlists.length) {
            var tbody = "";
            for (var i = 0; i < classlists.length; i++) {
                tbody += "<tr><td>" +classlists[i].class_name +"</td>";
                var courseArray = result.contentList;
                for (var wi = 0; wi < 7; wi++) {
                    for (var j = 1; j < 16; j++) {
                        var curcourse = courseArray.find(function(obj) {
                            if (obj.sheetOrder == j &&
                                obj.weekDays == wi &&
                                obj.classId == classlists[i].class_id)
                                return obj;
                        });
                        if (curcourse != null && curcourse != "undefined") {
                            tbody += "<td><label title='" +curcourse.courseName +"'>" +curcourse.courseName + "</label></td>";
                        } else {
                            tbody += "<td><label title=''></label</td>";
                        }
                    }
                }
                tbody += "</tr>";
            } //end for classlist
            $('#demoTable tbody').html(tbody);

        }
        
        // setTimeout(function() {
        //         var _demoGridHeight = $(window).height() - 40 - 40 - 60 - 10;
        //         if (_demoGridHeight > 400) {
        //             $('#demoGrid').css('height', _demoGridHeight);
        //         }
        //     },
        //     800);
        var grid = new Grid("demoGrid",
        {
            srcType: "dom",
            srcData: "demoTable",
            allowGridResize: true,
            allowColumnResize: true,
            showSelectionColumn: true,
            supportMultipleGridsInView: true,
            fixedCols: 1,
            onLoad: function() {
                var dayArr = ['日', '一', '二', '三', '四', '五', '六'];
                $('.g_HeadFixed .g_RS').after('<div class="g_C g_HR g_RX">周</div>');
                $('.g_HeadFixed .g_R0').html('节');
                $('.g_HeadStatic .g_RS').after('<div class="g_C g_HR g_RX">&nbsp;</div>');
                var $gCL = $('.g_HeadStatic .g_Cl');
                for (var ci = 1; ci < $gCL.length; ci = ci + 15) {
                    $gCL.eq(ci).find('.g_RX').css('border-left', '1px solid #ccc');
                    $gCL.eq((ci + 7)).find('.g_RX').html(dayArr[parseInt(ci / 15)]);
                }
            }
        });
})

    function from_clipBoard() {
        var _clipBoardContext; //剪贴板内容
        if (window.clipboardData) {
            //for IE
            _clipBoardContext = window.clipboardData.getData('Text');
            putInTable(_clipBoardContext,
                function() {
                    top.parent.showTips('粘贴完成', 4);
                });

        } else {
            //for not IE
            $.AlerMsg({
                title: '粘贴剪切板',
                msg: '请将内容粘贴到下面的输入框',
                type: 'textarea', //confirm , textarea
                placeholder: "ctrl+v 或 右键粘贴",
                okColor: '#38be35',
                cancelColor: '#999',
                ok: function(textareaVal) {
                    putInTable(textareaVal,
                        function() {
                            top.parent.showTips('粘贴完成', 4);
                        });
                }
            });
        }

    }

    //将粘贴板内容 切分成数组 放入表格
    function putInTable(Str, callback) {

        var textArr = new Array();
        var tempArr = new Array();
        tempArr = Str.split('\n');
        $.each(tempArr,
            function(i) {
                textArr[i] = tempArr[i].split('\t');
            });

        var $tbodytr = $('tbody tr');
        $.each(textArr,
            function(i) {
                $.each(textArr[i],
                    function(j) {
                        $tbodytr.eq(i).find('td').eq(j + 1).find('input.coursename').val(textArr[i][j]);
                        if (i == textArr.length - 1 && j == textArr[i].length - 1) {
                            callback();
                        }
                    });
            });


    }
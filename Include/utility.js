//是否是IE
function IsIE() {
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) || /MSIE(\d+\.\d+);/.test(navigator.userAgent)) {
        return true;
    }
    return false;
}
//某个字段是否为null  or undefined  if true ''
function isNull(a) {
    if (a == null && a == undefined) {
        return '';
    } else {
        return a;
    }
}
//打印方法 ,该页面需要有iframe
function printHtml(html) {
    var bodyHtml = document.body.innerHTML;
    document.body.innerHTML = html;
    window.print();
    document.body.innerHTML = bodyHtml;
}

function onprint(html) {
    printHtml(html);
} 

// 打印所有    
function printAll() {
    var body = "<style>table {border-collapse: collapse;border-spacing: 0;}table, caption, tbody, tfoot, thead, tr, th, td{ vertical-align:middle;}.info{ margin: 10px 0; font-size: 14px;}.table table tr td{border: 1px solid #ddd; text-align: left; font-size: 14px;}.table table tr td.title{width: 150px;}.table table{ border:1px solid #ddd; border-left:0\\9; border-top:0\\9; width:100%; background:#fff;  text-align:center; line-height:22px;}.table table td.checkbox,.table table th.checkbox{ width:30px; padding:0; -webkit-user-select:none;}.table table td.checkbox label,.table table th.checkbox label{ display:block; padding:6px 5px;}.table table th,.table table td{ border-left:1px solid #eee\\9; border-top:1px solid #ddd; padding:6px 5px;}.table table th{font-size:14px; padding:8px 5px;}.table table th.thsort{ cursor:pointer;}.table table th .fa-sort-up{ font-size:12px; margin:5px 5px 0; vertical-align:middle;}.table table th .fa-sort-down{ font-size:12px; margin:0 5px 5px; vertical-align:middle;}.table-normal table th{ background:#ddd;}.table table .edit a{ padding:0 10px;}</style>";
    $("iframe").each(function(i) {
        var pageNextStr = '<div style="page-break-after: always;"></div>';
        var pageNext = $(pageNextStr);
        pageNext.append($(this).contents()[0].body.outerHTML);
        body += pageNext[0].outerHTML;
    });
    var win = window.open('about:blank');
    win.document.body.innerHTML += body;
    win.print();
    win.close();
}

function from_clipBoard() {
    var _clipBoardContext;  //剪贴板内容
    if (window.clipboardData) {
        //for IE
        _clipBoardContext = window.clipboardData.getData('Text');
        putInTable(_clipBoardContext,
            function() {
                alert('粘贴完成', 4);
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
                        alert('粘贴完成', 4);
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

/*
power调用方法;
再所有的按钮全都出来之后执行  quanxian(id);
事先权限全部隐藏, .yinc
增加data-operation 根据该按钮功能接口名称 例 AjaxScore.SaveScore
*/
function quanxian(id) {
    $.ajax({
        url: "/AjaxUser/GetListChildrenMenu",
        data: {
            menuid: id
        },
        success: function(data) {
            $.each(data.Data, function(i, n) {
                if (n.Alias) {
                    $("*[data-operation='" + n.Alias + "']").removeClass("yinc");
                }
            })
        }
    });
}


// url的截取字符串 getUrlParam(id);
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return (r[2]);
    return null; //返回参数值
}

// 全部选中的方法
function SelectAll(name) {
    if (name && typeof name === 'string')
        $('*[name=' + name + ']').prop('checked', 'checked');
}

// 获取数据字典的数据1  传数字
function DataCenter(names, selects,num) {
	var getBaseData ={url:"Common/GetBaseData", data:{field: names },type:"get",async:false};
	commonFn(getBaseData,function(data){
		$(selects).html("<option value=''></option>");
		$.each(data, function(i, n) {
			$(selects).append('<option value="' + n.dataValue + '">' + n.dataText + '</option>');
		})
		$(selects).children('[value="'+num+'"]').attr("selected",true);
		form.render("select");
	})
}
// 获取数据字典的数据2  传中文
function DataCenter2(names, selects,num) {
	var getBaseData ={url:"Common/GetBaseData", data:{field: names },type:"get",async:false};
	commonFn(getBaseData,function(data){
		$(selects).html("<option value=''></option>");
		$.each(data, function(i, n) {
			$(selects).append('<option value="' + n.dataText + '">' + n.dataText + '</option>');
		})
		$(selects).children('[value="'+num+'"]').attr("selected",true);
		form.render("select");
	})
}

//列表全选全不选方法
function AllSelect(){
	var inps = $("tbody input[type='checkbox']");
	if($(this).attr("checked")) {
		$(this).removeAttr("checked", false);
		$.each(inps, function(i, n) {
			$(n).removeAttr("checked", false);
		})
	} else {
		$(this).prop("checked", true);
		$(this).attr("checked", true);
		$.each(inps, function(i, n) {
			$(n).prop("checked", true);
			$(n).attr("checked", true);
		})
	}
}

//获取地区的通用方法
function diqu(ID,sele,num) {
	var getPlace ={url:"Common/GetPlace",data: { id: ID },type:"get",async:false};
	commonFn(getPlace,function(data){
		$(sele).html("<option value=''></option>");
		$.each(data,function(i,n) {
			$(sele).append('<option value="' + n.dataValue + '">' + n.dataText + '</option>');
		})
		$(sele).children('[value="'+num+'"]').attr("selected",true);
		form.render();
	})
}
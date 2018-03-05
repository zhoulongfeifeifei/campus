/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-04-20 10:38:46
 * @version $Id$
 */
window.apiHost = "http://60.190.202.49:1000/Web/"; //项目地址
window.apiUrl = "http://60.190.202.49:1000/api/"; //接口地址
window.siteHost = "http://60.190.202.49:1000/"; //站点地址
window.pageRoot = window.apiHost + "Skin";

window.tokenApi = "Token"; //token的接口
window.tokenKey = "_token_"; //取到的token
window.tokenExpire = "1"; //token到期
window.skinKey = "_skin_";
window.userObj;
window.numtype;
//window.token = localStorage.getItem('token') || undefined ; //获取localStorage里的token,如果没存就取 ''

(function() {
    window.commonFn = commonFn;
    window.sendBatchAttachMsg = sendBatchAttachMsg;


    window.setCookie = setCookie;
    window.getCookie = getCookie;
    window.deleteCookie = deleteCookie;

    window.getUserId = getUserId;
    window.getUserName = getUserName;
    window.getCookieByUserInfo = getCookieByUserInfo;
    window.getUserInfo = getUserInfo;

    window.IsLogin = IsLogin;
    window.GetSkin = GetSkin;
    window.LoginIn = LoginIn;
    window.LoginCheck = LoginCheck;
    window.clearToken = clearToken;


    window.conversionTime = conversionTime;
    window.conversionTime2 = conversionTime2;
    window.formatTen = formatTen;

    window.solveTime = solveTime; //新框架解决时间格式的方法;
    window.GetTimeFromTimeStamp = GetTimeFromTimeStamp;
    window.GetTimeDateFromTimeStamp = GetTimeDateFromTimeStamp;
    window.GetWeekDays = GetWeekDays;


    window.IsIE = IsIE;
    window.isNull = isNull;
    window.printHtml = printHtml;
    window.printAll = printAll;
    window.from_clipBoard = from_clipBoard;
    window.quanxian = quanxian; //权限方法
    window.getUrlParam = getUrlParam; //截取字符串
    window.laypageOk = laypageOk; //分页方法
    window.SelectAll = SelectAll;
    window.DataCenter = DataCenter;
    window.AllSelect = AllSelect;
    window.diqu = diqu;
    window.formSerialize = formSerialize;

    window.schoolid = getCookieByUserInfo('schoolid'); //定义一个易得到的schoolid -->window.schoolid

    // window.cookie={
    //     setCookie : setCookie,
    //     getCookie : getCookie,
    //     deleteCookie : deleteCookie
    // }



    /************************** sincere start  ******** commonFn *********************************/
    // 通用ajax 的 commonFn
    function commonFn(ajaxInfo, callback, errorCallback, Token) {
        var dataOk, isTrue = true,
            async = ajaxInfo.async === false ? false : true;
        var token = getCookie(window.tokenKey);
        if (!token || token.length <= 10) {
            top.location.href = window.pageRoot + "/login.html";
        }
        (ajaxInfo.url) ? ajaxInfo.url = window.apiUrl + ajaxInfo.url: ajaxInfo.url = ''
        $.ajax({
            url: ajaxInfo.url || '',
            data: ajaxInfo.data || '',
            type: ajaxInfo.type || 'get',
            async: async,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function(res) {
                dataOk = res;
                if (res.status == 1) {
                    if (typeof callback === "function") {
                        callback(res.data);
                    }
                } else if (res.status == 4) {
                    //直接去登录页面
                } else if (res.status == 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg(res.message);
                }

            },
            error: function(res) {
                // layer.msg("请求接口失败");
                layer.msg(res.responseText);
                if (typeof errorCallback === "function") {
                    errorCallback(res.data);
                }
                isTrue = false;
            }
        })
    }


    /* 发通知的方法 具体用法见 sincere.js注释
     */
    function sendBatchAttachMsg(obj, callback) {
        if (!obj.attach || !obj.toAccids) {
            console.log("信息不全,无法调用!");
            return
        }
        var token = getCookie(window.tokenKey);
        if (!token || token.length <= 10) {
            console.log("commonFn（） no token");
            return
        }
        obj.attach = JSON.parse(obj.attach);
        obj.attach.msgId = new  Date().getTime();
        obj.attach = JSON.stringify(obj.attach);
        $.ajax({
            url: window.apiUrl + 'NimServer/SendBatchAttachMsg',
            data: obj,
            type: 'post',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function(res) {
                callback(res)
            }
        })
    }
    /************************** sincere end  ******** commonFn *********************************/


    /************************** storage start  ******** cookie操作 *********************************/
    // 存储cookie
    function setCookie(name, value, expiredays) {
        var argv = setCookie.arguments;
        var argc = setCookie.arguments.length;
        var LargeExpDate = new Date();
        var expires = (argc > 2) ? argv[2] : expiredays;
        if (expires != null) {
            LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
        }
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : (";path=/;expires=" + LargeExpDate.toGMTString()));
    }

    // 获取cookies
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    // 删除cookies
    function deleteCookie(name) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        setCookie(name, "", expdate);
    }
    /************************** storage start  *****************************************/

    /************************** sincere.user start  *****************************************/
    // 判断是否登录方法
    function IsLogin() {
        var token = getCookie(window.tokenKey);
        if (token && token.length > 0) return true;
        return false
    }
    // 获取皮肤名称
    function GetSkin() {
        return getCookie(window.skinKey) || '';
    }
    //根据皮肤进入主页
    function LoginIn(logintype) {

        var skin = GetSkin();
        var path = ""
        if (logintype === "admin") {
            path = window.pageRoot + "/Fifth/Modules/manage/manage.html";
        } else {
            if (skin) {
                path = window.pageRoot + "/" + skin; //跳到skin/xx下面的index.html
            } else {
                path = window.pageRoot + "/Fifth";
            }
        }
        //$('#iframe').attr('src', path);
        location.href = path;
    }
    // 进入主页之后的回调函数
    function LoginCheck(callback) {
        if (IsLogin()) {
            callback();
        }
    }
    // 从cookie获取用户的id
    function getUserId() {
        if (getCookie('userid')) {
            return getCookie('userid')
        }
    }
    // 从cookie获取用户的name
    function getUserName() {
        if (getCookie('userName')) {
            return getCookie('userName')
        }
    }
    /* 从cookie获取userInfo   
        具体用法: 
        getCookieByUserInfo('userid')  => userid
        getCookieByUserInfo() => userInfo{}
    */
    function getCookieByUserInfo(a) {
        if (getCookie(window.userObj)) {
            var userInfo = JSON.parse(getCookie(window.userObj));
            if (userInfo) {
                if (a && typeof a == 'string')
                    return userInfo[a];
                else
                    return userInfo;
            }
        }

    }

    /*
        获取当前登录人的身份信息; getUserInfo()
        通过传来的用户Id 获取这个用户的身份信息 getUserInfo(12)
    */
    function getUserInfo(userId) {
        if (!userId) userId = $.cookie('userid');
        var ajaxInfo = {
            url: '',
            data: userId,
            type: 'post',
            async: false
        }
        commonFn(ajaxInfo, function(res) {
            if (res.Status == 1) {
                return res;
            } else {
                return res.Message;
            }
        })
    }

    /*
    备用
        0是个人信息
        1是学校信息
        2是其他
    */
    function getInfo(Id, type) {
        if (type == 0 && !Id) {
            Id = $.cookie('userid');
        } else if (type == 1 && !Id) {
            '给Id 附上默认的学校id'
        }
        var ajaxInfo = {
            url: '',
            data: Id,
            type: 'post',
            async: false
        }
        commonFn(ajaxInfo, function(res) {
            if (res.Status == 1) {
                return res;
            } else {
                return res.Message;
            }
        })
    }

    // 
    /*
    第三种
        id 是请求ajax传递的参数, 
        type :{
            0:个人信息,
            1:学校信息,
            2:其他
        }
        url:只有type=2的时候用得到
    */
    function getInfo(Id, type, callback, url) {
        var ajaxInfo = {}
        switch (type) {
            case 0:
                ajaxInfo.url = '个人信息的url';
                if (id) ajaxInfo.data = Id;
                else ajaxInfo.data = $.cookie('userid');
                break;
            case 1:
                ajaxInfo.url = '学校信息的url';
                if (id) ajaxInfo.data = Id;
                else ajaxInfo.data = '默认学校的id';
                break;
            case 2:
                ajaxInfo.url = url;
                if (id) ajaxInfo.data = Id;
                break;
        }
        ajaxInfo.type = 'post';
        ajaxInfo.async = false;

        if (typeof callback === "function") {
            ajaxInfo.async = true;
        }

        commonFn(ajaxInfo, function(res) {
            if (ajaxInfo.async) {
                callback(res)
            } else if (res.Status == 1) {
                return res;
            } else {
                return res.Message;
            }
        })
    }

    /* 
    清除token
        清楚token列表: token,skinName,userInfo{};
    */
    function clearToken() {
        deleteCookie(window.tokenKey);
        deleteCookie(window.skinKey);
        deleteCookie(window.userObj);
        location.href = window.pageRoot + "/login.html";
    }
    /*************************** sincere.user end  *****************************************/


    /**************************** strat datetime  *******************************/
    // 格式化时间1·¨
    function conversionTime(isoktime) {
        if (isoktime) {
            isoktime = eval(isoktime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))
            isoktime = new Date(isoktime);
            isoktime = isoktime.getFullYear() + '-' + solve((isoktime.getMonth() + 1)) + '-' + solve(isoktime.getDate()) + ' ' + solve(isoktime.getHours()) + ':' + solve(isoktime.getMinutes()) + ':' + solve(isoktime.getSeconds());
            return isoktime;
        } else if (isoktime == null) {
            return ""
        } else {
            return "";
        }
    }
    function conversionTime2(isoktime) {
        if (isoktime) {
            isoktime = new Date(isoktime);
            isoktime = isoktime.getFullYear() + '-' + solve((isoktime.getMonth() + 1)) + '-' + solve(isoktime.getDate()) + ' ' + solve(isoktime.getHours()) + ':' + solve(isoktime.getMinutes()) + ':' + solve(isoktime.getSeconds());
            return isoktime;
        } else if (isoktime == null) {
            return ""
        } else {
            return "";
        }
    }
    function solve(a) {
        if (parseInt(a) < 10) {
            return '0' + a;
        } else {
            return a;
        }
    }
    /**********格式化时间2¨*************/
    function formatTen(num) {
        return num > 9 ? (num + "") : ("0" + num);
    }

    function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
    }

    function GetTimeFromTimeStamp(value) {
        var timestamp = value.replace(/\/Date\((\d+)\)\//gi, '$1');
        timestamp = timestamp / 1000;
        if (!timestamp) return "";
        var newDate = new Date();
        newDate.setTime(timestamp * 1000);
        return newDate.toLocaleDateString();
    }
    // 新框架解决时间格式方法
    function solveTime(datetime) {
        if (datetime) {
            datetime = datetime.substring(0, 19)
            datetime = datetime.replace(/T/, ' ');
        }
        return datetime;
    }
    // 作息在用
    function GetTimeDateFromTimeStamp(value) {
        if (!value) return "";
        var newDate = new Date();
        newDate.setTime(value * 1000);
        return newDate;
    }
    //old
    function GetTimeDateFromTimeStamp1(value) {
        var timestamp = value.replace(/\/Date\((\d+)\)\//gi, '$1');
        timestamp = timestamp / 1000;
        var timestamp = value;
        if (!timestamp) return "";
        var newDate = new Date();
        newDate.setTime(timestamp * 1000);
        return newDate;
    }


    function GetWeekDays(weeks) {
        if (!weeks){return "";} 
        weeks = weeks.replace("1", "星期一");
        weeks = weeks.replace("2", "星期二");
        weeks = weeks.replace("3", "星期三");
        weeks = weeks.replace("4", "星期四");
        weeks = weeks.replace("5", "星期五");
        weeks = weeks.replace("6", "星期六");
        weeks = weeks.replace("0", "星期日");
        return weeks;
    }
    /**************************** end datetime  *******************************/


    /**************************** start utility.js  *******************************/
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
        var _clipBoardContext; //剪贴板内容
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
    function quanxian() {
    	window.localStorage.setItem("menuid",getUrlParam('id'));
        commonFn({
            url: "Common/GetListChildrenMenu",
            data: {
                menuid: getUrlParam('id'),
                schoolId: getCookieByUserInfo('schoolid'),
                loginType: getCookieByUserInfo('logintype')
            }
        }, function(data) {
            $.each(data, function(i, n) {
                if (n.alias) {
                    $("*[data-operation='" + n.alias + "']").removeClass("yinc");
                }
            })
        })
    }
    //表单序列化方法
    function formSerialize(form) {
        var o = {};
        console.log(form.serializeArray());
        $.each(form.serializeArray(), function(index) {
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });
        return o;
    }

    // url的截取字符串 getUrlParam(id);
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return (r[2]);
        return null; //返回参数值
    }

    /*
    layui.laypage   分页方法
        count:总页数,
        index:当前页,
        callback 执行分页函数
    */
    function laypageOk(count, index, callback) {
        layui.laypage({
            cont: 'page',
            pages: count, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr: index,
            groups: 5,
            jump: function(e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷
                    callback(e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
    }
    // 全部选中的方法
    function SelectAll(name) {
        if (name && typeof name === 'string')
            $('*[name=' + name + ']').prop('checked', 'checked');
    }

    // 获取数据字典的数据1  getDictionaries1(function(res){res是数据字典的数据})
    function DataCenter(names, selects, num, types) {
        var getBaseData = {
            url: "Common/GetBaseData",
            data: {
                field: names
            },
            type: "get",
            async: false
        };
        commonFn(getBaseData, function(data) {
            $(selects).html("<option value=''></option>");
            $.each(data, function(i, n) {
                if (types == "str") {
                    $(selects).append('<option value="' + n.dataText + '">' + n.dataText + '</option>');
                } else {
                    $(selects).append('<option value="' + n.dataValue + '">' + n.dataText + '</option>');
                }
            })
            $(selects).children('[value="' + num + '"]').attr("selected", true);
            form.render("select");
        })
    }


    // 获取数据字典的数据2   var data = getDictionaries2(); data 是数据字典的数据;
    //function getDictionaries2() {
    //  var ajaxInfo = {
    //      url: '1000的上面没有这个接口地址',
    //      async: false
    //  }
    //  commonFn(ajaxInfo, function(res) {
    //      return res;
    //  })
    //}

    //列表全选全不选方法
    function AllSelect(a) {
        var inps = $("tbody input[type='checkbox']");
        if ($(a).attr("checked")) {
            $(a).removeAttr("checked");
            $.each(inps, function(i, n) {
                $(n).removeAttr("checked");
            })
        } else {
            $(a).prop("checked", true);
            $(a).attr("checked", 'checked');
            $.each(inps, function(i, n) {
                $(n).prop("checked", true);
                $(n).attr("checked", true);
            })
        }
    }

    //获取地区的通用方法
    function diqu(ID, sele, num) {
        var getPlace = {
            url: "Common/GetPlace",
            data: {
                id: ID
            },
            type: "get",
            async: false
        };
        commonFn(getPlace, function(data) {
            $(sele).html("<option value=''></option>");
            $.each(data, function(i, n) {
                $(sele).append('<option value="' + n.dataValue + '">' + n.dataText + '</option>');
            })
            $(sele).children('[value="' + num + '"]').attr("selected", true);
            form.render();
        })
    }
    /**************************** end utility.js  *******************************/
})();

// 未登录不可打开页面
// (function() {
//     if (!IsLogin()) {
//         console.log("no login");
//         window.location.href = window.pageRoot + "/login.html";
//     };
//     console.log("login");
//     return false;
// })();
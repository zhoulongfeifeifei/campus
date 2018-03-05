/// <reference path="/Lzone.aspx" />

Ljs.Import("AlphaPanel", true);
Ljs.Import("Messages.Tip", true);
Ljs.Import("Messages.Dialogiframe", true);



//#region 空间主对象
var Lzone = window["LZONE"] = {
    InitList: ["Ready", "User", "URL", "navigationBar", "Frame"],
    Init: function () {
        var fun;
        while (fun = this.InitList.pop()) {
            this[fun]["init"].call(this[fun])
        }

    },
    lz_style: "",
    appParams: function (url) {
        return Lzone.URL.AppendParams(url, {
            Learn: Lzone.User.LearnID
        });
    }

};
//#endregion

//#region 代码构建完成后
Lzone.Ready = {
    init: function () {
        //Lzone.User.ResolveData();      
        //document.getElementById("commentListTmp").text = $("#commentList").html().replace("&lt;", "<").replace("&gt;", ">");
        $("#commentList").html("");
        Lzone.URL.Go();
    }
}
//#endregion

//#region 用户登录信息
Lzone.User = {
    //初始化
    init: function () {
    },
    //用户XML
    XML: "",
    //被访问者ID
    LearnID: null,
    //访问者的ID        
    LoginID: null,
    LoginName: "",
    LoginFace: "",
    //是否登陆
    isLogin: function () {
        return this.LoginID != "" && this.LoginID != null;
    },
    //是否自身
    isSelf: function () {
        return this.isLogin() && this.LoginID == this.LearnID;
    },
    //专区信息
    AreaInfo: {
        IdentityNum: 0
    },
    //存储信息   
    saveData: function (d) {
        document.getElementById("IdentityData").text = d;
        this.ResolveData(true);
    },
    //解析信息
    ResolveData: function (bol) {
        var xml = document.getElementById("IdentityData").text;
        if (Ljs.String.Tirm(xml) != "") {
            this.XML = $.xml(xml);
            var userinfo = this.XML.find("region > userinfo");
            this.LoginID = userinfo.attr("Learn");
            this.LoginName = userinfo.attr("name");
            this.LoginFace = userinfo.attr("Face");
            $("#ulAppList").html(StaticTmp("appTmp", this.XML))
            var cls = this.XML.find("class").add(this.XML.find("school:empty"));
            var _this = this;
            this.IdentData.count = cls.length;
            this.IdentData.list.length = 0;
            this.IdentData.master.length = 0;
            cls.each(function (i) {
                var item = { cn: [], sf: [] }, dom = this;
                _this.IdentData.list.push(item);
                var isHead;
                while (dom.nodeName.toLowerCase() != "identity") {
                    switch (dom.nodeName.toLowerCase()) {
                        case "class":
                            item.sf.push(dom.getAttribute("id"));
                            item.cn.push(dom.getAttribute("name"))
                            isHead = dom.getAttribute("ishead") == "1" ? true : false;
                            dom.getAttribute("student_id") != null && item.sf.push(dom.getAttribute("student_id"));
                            break;
                        case "school":
                            item.sf.unshift(dom.getAttribute("id"));
                            item.cn.unshift(dom.getAttribute("name"));
                            break;
                        case "roles":
                            item.sf.unshift(_this.IdentTable[dom.getAttribute("type")][1]);
                            if (isHead) item.cn.push("班主任")
                            else item.cn.push(_this.IdentTable[dom.getAttribute("type")][1])
                            break;
                        case "student":
                            item.cn.push(dom.getAttribute("name"));
                            break;
                    }
                    dom = dom.parentNode;
                }
            })
            var defaultSelect = this.XML.find("Identity ").attr("defaultSelect");
            if (defaultSelect != undefined) {
                this.IdentData.now = defaultSelect
            }
            this.XML.find("school[ismaster=1]").each(function () {
                _this.IdentData.master.push({ name: $(this).attr("name"), id: $(this).attr("id") });
            })
            this.IdentData.count = this.IdentData.list.length + this.IdentData.master.length
            this.IdentData.key = this.XML.find("Identity").attr("key");

        } else {
            this.LoginID = null
            this.LoginName = null
            this.LoginFace = null
        }
        Lzone.navigationBar.StructureNav();
        if (bol && !this.isSelf()) {
            Lzone.Frame.reload();
        }
    },
    //登出
    clearData: function () {
        this.LearnID = null
        this.LoginName = null
        this.LoginFace = null
        Lzone.navigationBar.StructureNav();
    },
    //身份信息
    IdentData: {
        count: 0,
        list: [],
        master: [],
        now: -1,
        key: ""
    },
    //返回当前选择的身份的字符串
    GetNowSelect: function () {
        if (this.IdentData.now < 0) return "<未选择>";
        if (this.IdentData.now >= this.IdentData.list.length) return "<未选择>"
        return "&nbsp;" + this.IdentData.list[this.IdentData.now].cn.join("<br />&nbsp;")
        //return "&lt;" + this.IdentData.list[this.IdentData.now].cn.join("&gt;<br />&lt;") + "&gt;";

    },
    //身份转换表
    IdentTable: {
        parents: ["par", "家长"],
        teachers: ["tea", "教师"],
        students: ["stu", "学生"]
    }
};
//#endregion

//#region 主框架
Lzone.Frame = {
    iframe: null,
    iframeWin: null,
    iframeDoc: null,
    timer: null,
    init: function () {
        var frame = Lzone.Frame;
        this.iframe = window["iframe"] = document.createElement("iframe");
        this.iframe.id = "bodyframe"
        this.iframe.scrolling = "no";
        this.iframe.width = "100%"
        this.iframe.frameBorder = "0"
        this.iframe.setAttribute("allowtransparency", "allowtransparency");
        //document.getElementById("lay_pageContainer").appendChild(this.iframe);
        this.iframe.onload = frame.frameLoad;
        //this.iframeWin = this.iframe.contentWindow;
        //this.iframeDoc = this.iframe.contentWindow.document;
        //this.iframe.src = "/UserHome.aspx"
        Lzone.Frame.timer = setInterval(function () { Lzone.Frame.setHeight() }, 200);


    },
    frameLoad: function () {
        //Lzone.Frame.setHeight();
        //clearInterval(Lzone.Frame.timer);
    },
    lastHeight: 300,
    setHeight: function () {

        try {

            var height;
            if (true || Ljs.browser.isIE) {
                if (Ljs.browser.isIE8 || Ljs.browser.isIE9 || Ljs.browser.isIE10) {
                    height = 2000;
                } else {
                    height = Lzone.Frame.iframe.contentWindow.document.body.offsetHeight;
                }
                //alert(height);
                //height = Lzone.Frame.iframe.contentWindow.document.body.clientWidth;
            } else {
                $("#lay_pageContainer").height(Lzone.Frame.lastHeight);
                Lzone.Frame.iframe.style.height = "";
                height = $(Lzone.Frame.iframe.contentWindow.document).height()
                Lzone.Frame.lastHeight = height;
                $("#lay_pageContainer").height("");
            }
            height = Math.max(height, 300);
            Lzone.Frame.iframe.style.height = height + "px"
        } catch (e) { }

    },
    src: function (src) {
        Lzone.Frame.iframe.src = src;
        $(document).scrollTop(0);
    },
    checkHeight: function () {
        //Lzone.Frame.timer = setInterval(Lzone.Frame.setHeight, 30);
    },
    reload: function () {
        this.iframe.contentWindow.location.reload();
        //this.iframe.contentWindow.document.location.reload
    },
    user: null,
    RelativelyURL: function (url) {
        var m, n, m2, reg, reg2
        reg = /^http:/;

        if (/^http:|^\//.test(url)) {
            return url;
        }

        try {
            var loc = this.iframe.contentWindow.document.location;
            if (/^#|^\?/.test(url)) {
                return loc.pathname + url;
            }
            var protocol = loc.protocol + "//" + loc.host;
            if (/^about:/.test(loc.protocol)) {
                protocol = ""
            }
            var thisSrc = loc.pathname;
            m = /((?:.+)?\/)/.exec(thisSrc);
            thisSrc = m[1]
            reg = /(..\/)(.+)/;
            reg2 = /^(.+)?\/([^\/:]+)?$/
            while (reg.exec(""), m = reg.exec(url)) {
                url = m[2]
                if (/^(?:)$|^\/$|^[^\/]+$|\/[^\/]+/.test(thisSrc)) {
                    thisSrc = "/"
                    break;
                }
                m2 = /(.+\/)([^\/]+\/(?:[^\/]+)?)/.exec(thisSrc);
                thisSrc = m2[1];
            }

            thisSrc = protocol + thisSrc + url;
            return thisSrc;
        } catch (ee) {
            return url;
        }
    }
}
//#endregion

//#region 空间导航
Lzone.navigationBar = {
    timer: null,
    init: function () {
        Lzone.navigationBar.navEvent("#changeBg", "#divBackgroundBox");
        //Lzone.navigationBar.navEvent("#liAppCenter", "#divAppBox")
    },
    toApp: function (code) {
        Lzone.URL.app = code;
        location.hash = "!app=" + code
        Lzone.URL.src(Lzone.URL.apps[code.toLowerCase()]);

    },
    navEvts: [],
    navEvent: function (elm, telm) {
        var nav = Lzone.navigationBar;
        nav.navEvts.push(telm);
        $(elm)
        .mouseover(function () {
            nav.hideEvts(telm);
            clearTimeout(nav.timer);
            nav.timer = setTimeout(function () {
                $(telm).removeClass("none");
            }, 500)
        })
        .mouseout(function (e) {
            var elem = e.toElement || e.currentTarget
            if ($(elem).parents(elm).length != 0) {
                return;
            }
            clearTimeout(nav.timer);
            nav.timer = setTimeout(function () {
                $(telm).addClass("none")
            }, 1000);
        });

        $(telm)
        .mouseover(function () {
            clearTimeout(nav.timer);
        })
        .mouseout(function (e) {
            var elem = e.toElement || e.currentTarget;
            if ($(elem).parents(telm).length != 0) {
                return;
            }
            clearTimeout(nav.timer);
            nav.timer = setTimeout(function () {
                $(telm).addClass("none")
            }, 500);
        })
    },
    hideEvts: function (elm) {
        for (var i = 0; i < this.navEvts.length; i++) {
            if (this.navEvts[i] != elm) $(this.navEvts[i]).addClass("none")
        }
    },
    StructureNav: function () {
        var islogin = Lzone.User.isLogin();
        var isself = Lzone.User.isSelf();
        $("#userinfo,#DivUserInfo,#divUserManage").toggleClass("none", !islogin);
        $("#DivUserLogin").toggleClass("none", islogin)
        $("#aNavLogin").click(function () {
            User.Login(function () {
                location.reload();
            })
        })
        if (Lzone.User.isLogin()) {
            $("#spanUserNick").html(Lzone.User.LoginName)
            .prev().find("img").attr("src", Lzone.User.LoginFace);
        }
        $("#aIcenter").parent().add("#liAppCenter").toggleClass("none", !isself);
        $("#liMainPage").find("span").html((isself ? "我" : "他") + '的主页<b class="a_trig"></b>')
        $("#changeBg").toggle(isself);
        $("#yyzx").toggle(isself);

    }
}
//#endregion

//#region URL解析
Lzone.URL = {
    loginUrl: "/Default.aspx",
    app: "",
    init: function () {
        var m;
        var url = location.hash;
        //获取UserID        
        m = this.Reg.app.exec(url);
        if (m) {
            this.app = m[1];
        }

    },
    Reg: {
        app: /!app=([^&]+)/,
        user: /^\/(\d{6,20}x?)/i,
        append: /([^?#]+)(?:\?([^#]+))?(#.+)?/,
        src: /(.+)?src=(.+)/i,
        ResolveURL: /([^&]+)=([^&]+)/g
    },
    apps: {
        "30456": "/Photos/PhotoList.aspx",  //相册
        "33521": "/Area/Mschool.aspx?url=/English/ESchool.aspx",  // 英语
        "21338": "/Blog/Blog_List.aspx",    // 日志
        "22909": "/Friends/Friend_list.aspx", //好友
        "22908": "/area/", //专区
        "20027": "/UserHome.aspx",   //个人首页
        "29677": "/Class/Myclass.aspx", //班级
        "29676": "/Userinfo/UserSetting_Show.aspx", // 个人资料 
        "29675": "/Userinfo/EnforceChangePw.aspx", // 强制修改密码 
        "23313": "/UserInfo.aspx", //个人中心
        "9999": "/Photos/PhotoView.aspx?aid=46&id=131&name=ceshi",
        "86032": "/Area/Mschool.aspx", //家校互动
        "1": "/area/Teacher/StudentList.aspx",  //专区
        "14001": "/area/Teacher/MessageUp.aspx",  //短信上行
        "14000": "/LeaveMessage.aspx", //留言版
        "15000": "/Say/Say.aspx", //说说
        "16000": "/Score/MsSchool.aspx", //成绩管理
        "93070": "/message/msgList.aspx", //站内邮箱
        "87065": "/Contacts/Contacts.aspx", //通讯录
        "11111": "/photos/FriendPhotoList.aspx", //临时测试用
        "12222": "/ClassCircle/ClassDynamic.aspx", //班级圈子
        "12223": "/ClassCircle/ClassIdentSelect.aspx", //班级圈子选择身份
        "40000": "/Userinfo/MoreModules.aspx",
        "50000": "/APP/ApplicationList.aspx", //学习应用选择
        "51000": "/Area/Mschool.aspx?url=/APP/Onecard/LibraryCard.aspx", //一卡通/Area/Mschool.aspx?url=/APP/ApplicationList.aspx
        "52000": "/Area/Mschool.aspx?url=/APP/video/VideoClass.aspx",  //视频课堂
        "53000": "/Area/Mschool.aspx?url=/APP/Courseware/Courseware.aspx", //资料下载
        "54000": "/APP/SchoolBusMonitor/RealtimeMonitor.aspx",  //校车监控
        "55000": "/APP/Shb/SHBtest.aspx",  //守护宝
        "56000": "/APP/RenRen/Login.aspx",  //人人通
        "payment": "/PaymentCenter/MsSchool.aspx",
        "wrongtopic": "/APP/WrongTopic/Default.aspx"
        //        "teahelp":"/Area/Teacher/help.aspx"//帮助文档
    },
    Go: function (hash) {
        hash = hash || location.hash;
        var m;
        m = this.Reg.src.exec(hash);
        if (m) {
            Lzone.Frame.src(Lzone.appParams(unescape(m[2])));
            return;
        } else if (Lzone.URL.app != "") {
            Lzone.Frame.src(Lzone.appParams(Lzone.URL.apps[this.app.toLowerCase()]));
        } else {
            if (Lzone.User.isSelf()) {
                Lzone.URL.src("/UserInfo.aspx");
            } else {
                Lzone.URL.src("/UserHome.aspx");
            }

        }
    },
    AppendParams: function (url, o) {
        if (typeof o != "object") {
            o = this.toObject(o);
        }
        url = url.replace(Lzone.URL.Reg.append, function (m, p1, p2, p3) {
            var result = p1;
            if (p2 != undefined) {
                Ljs.copy(o, Lzone.URL.toObject(p2));
            }
            p2 = Lzone.URL.toURL(o);
            p3 = p3 === undefined ? "" : p3
            return p1 + "?" + p2 + p3;

        })
        return url;
    },
    toObject: function (url) {
        var m, result = {}; ;
        this.Reg.ResolveURL.exec("");
        while (m = this.Reg.ResolveURL.exec(url), m != null) {
            result[m[1]] = m[2]
        }
        return result;

    },
    toURL: function (obj) {
        var result = [];
        for (var e in obj) {
            if (obj.hasOwnProperty(e)) {
                result.push(e + "=" + obj[e])
            }
        }
        return result.join("&")
    },
    src: function (url, b) {
        url = unescape(Ljs.String.Tirm(url));
        url = encodeURI(Lzone.Frame.RelativelyURL(Lzone.appParams(url)));
        Lzone.Frame.src(url);
        if (b) {
            location.hash = "!app=" + this.app + "&src=" + escape(url);
        }
    }
}
//#endregion

//#region 拖动框架
var Dialog = Lzone.Dialog = new Dialogiframe();
var TmpDialog = {
    dom: null,
    timer: null,
    show: function () {
        var dom = document.getElementById("tmpDialog");
        if (!dom) {
            $('<div id="tmpDialog" class="tmpDialog" ><span onclick="TmpDialog.hide()">关闭</span><img src="/images/Dialog.jpg"></div>').appendTo("body");
        }
        dom = $("#tmpDialog");
        var cfg = {
            top: function () {
                return ($(window).height() - dom.height()) / 2 + $(window).scrollTop();
            } (),
            left: function () {
                return ($(window).width() - dom.width()) / 2 + $(window).scrollLeft();
            } ()
        }
        dom.css(cfg)
        dom.show();
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            dom.hide();
        }, 2500)

    },
    hide: function () {
        $("#tmpDialog").hide();
    }
}
//#endregion

//#region 空间播放器

var FlashInteractive = Lzone.Music = Flash({
    id: "MusicFlash",
    send: function (obj) {
        this.Interaction("Interaction", [obj])
        return this;
    },
    isRead: false,
    Play: function () {
        this.send({
            action: "play"
        })
    },
    newPlay: function (file) {
        this.send({
            action: "file",
            file: file,
            play: true
        });
    },
    pause: function () {
        this.send({
            action: "pause"
        })
    },
    stop: function () {
        this.send({
            action: "stop"
        })
    }
});

//#endregion

//#region 遮罩层
var AlphaPanel = Lzone.AlphaPanel = Ljs.classes.AlphaPanel

//#endregion

//#region 提示框
var Tip = Lzone.Tip = Ljs.classes.Messages.Tip;
Tip.confirm = function (msg, callback, width, height) {
    width = width || 250
    height = height || 130
    Dialog.show({
        width: width,
        height: height,
        src: "/DialogTmp/confirm.html",
        data: { msg: msg },
        callback: callback,
        closeed: function () {
            callback(false);
        }
    })
}
//#endregion

//#region 初始化
$(function () {
    Lzone.Init();
})
//#endregion




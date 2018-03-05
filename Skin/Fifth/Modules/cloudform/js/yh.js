/*
@author 小杨
@version 1.1
*/

//核心部分
(function () {

    //#region 框架核心
    if (typeof Ljs === "undefined")
        window.Ljs = {};
    else
        return;

    Ljs.copy = function (obj, config, deft, hasOwn) {
        ///拷贝对象, 
        if (deft) { Ljs.copy(obj, deft, hasOwn) }
        if (obj && config) {
            for (var k in config) {
                if (!hasOwn || config.hasOwnProperty(k)) {
                    obj[k] = config[k];
                }
            }
        }
        return obj;
    };
    Ljs.copy(Ljs, {
        copyIf: function (obj, config) {
            for (var k in config) {
                if (obj[k] === undefined) {
                    obj[k] == config[k];
                }
            }
        },
        classes: {},
        $: function (s) {
            return document.getElementById(s);
        },
        emptyFn: function () { }
    });

    //扩展函数功能
    Ljs.Function = {
        alias: function (Met, Obj) {
            return function () {
                Met.apply(Obj, arguments);
            }
        }
    }

    //扩展数组功能
    Ljs.Array = function (arg) {
        return Array.prototype.slice.call(arg);
    }
    Ljs.copy(Ljs.Array, {
        each: function (arr, fn) {
            for (var i = 0; i < arr.length; i++) {
                if (fn.call(arr[i], i, arr) === false) {
                    return arr;
                }
            }
            return arr;
        },
        replace: function (arr, obj) {
            return arr.join("\n").replace(/\{(.+?)\}/g, function (m, s) {
                return obj[s];
            })
        }
    });

    //扩展字符串功能
    Ljs.String = function () {
    }
    Ljs.copy(Ljs.String, {
        Tirm: function (str) {
            return Ljs.String.TrimEnd(Ljs.String.TrimStart(str));
        },
        TrimStart: function (str) {
            if (str == null || str == undefined) {
                return ""
            }
            return str.replace(/^\s+/, "");
        },
        TrimEnd: function (str) {
            if (str == null || str == undefined) {
                return ""
            }
            return str.replace(/\s+$/, "")
        },
        getRequest: function (p, win) {
            win = win || window;
            var paraStr = win.location.search.slice(1);
            var paraList = paraStr.split(/\&/g);
            for (var i = 0; i < paraList.length; i++) {
                var pattern = new RegExp("^" + p + "[?=\\=](.+)", "g");
                var mh = pattern.exec(paraList[i]);
                if (mh) {
                    return decodeURIComponent(mh[1])
                }
            }
            return "";
        },
        HtmlEncode: function (txt) {
            return txt.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        HtmlDecode: function () {
            return txt.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); 
        }

    });

    //扩展对象功能
    Ljs.Object = function () { }
    Ljs.copy(Ljs.Object, {
        toArray: function (obj) {
            var result = [];
            for (var e in obj) {
                if (obj.hasOwnProperty(e)) {
                    result.push(e)
                }
            }
        }
    });
    //#endregion    

    //#region 命名空间管理
    Ljs.namespaces = {
        ns: function (name, obj) {
            name = name.split(".");
            var cDom = Ljs.classes;
            for (var i = 0; i < name.length; i++) {
                var cName = name[i];
                if (obj && i == name.length - 1) {
                    if (cDom[cName]) {
                        Ljs.copy(obj, cDom[cName], false, true);
                    }
                    cDom[cName] = obj;
                } else if (!cDom[cName]) {
                    cDom[cName] = {};
                }
                cDom = cDom[cName];
            }
            return cDom;
        },
        using: function (name, al) {
            if (name === undefined) return;
            name = name.split(".");
            var cDom = Ljs.classes;
            for (var i = 0; i < name.length; i++) {
                var cName = name[i];
                if (!cDom[cName]) {
                    //alert("不存在命名空间" + name.join["."]); return;
                }
                cDom = cDom[cName];
            }
            cName = al || cName;
            if (window[cName] === cDom) return;
            if (window[cName]) {
                alert("已存在当前类" + cName)
                return;
            }
            window[cName] = cDom;

        },
        getClass: function (name) {
            name = name.split(".");
            var cDom = Ljs.classes;
            for (var i = 0; i < name.length; i++) {
                var cName = name[i];
                if (!cDom[cName]) { alert("继承的类不存在"); return; }
                cDom = cDom[cName];
            }
            return cDom;

        },
        check: function (name) {
            name = name.split(".");
            var cDom = Ljs.classes;
            for (var i = 0; i < name.length; i++) {
                var cName = name[i];
                if (!cDom[cName]) return false;
                cDom = cDom[cName];
            }
            return true;
        },
        Import: function (name, bol) {
            if (Ljs.namespaces.check(name)) {
                Ljs.namespaces.using(name);
                return;
            }
            Ljs.classes.Loader.Load(name);
            if (bol !== undefined) {
                Ljs.namespaces.using(name)
            }
        },
        set: function (name, obj, dom) {
            name = name.split(".");
            var cDom = dom || document;
            for (var i = 0; i < name.length; i++) {
                var cName = name[i];
                if (i == name.length - 1) {
                    if (obj) cDom[cName] = obj;
                } else if (!cDom[cName]) {
                    cDom[cName] = {};
                }
                cDom = cDom[cName]
            }
            return cDom;
        },
        get: function (name, dom) {
            return this.set(name, null, dom);
        }
    }
    Ljs.using = Ljs.namespaces.using;
    Ljs.ns = Ljs.namespaces.ns;
    Ljs.Import = Ljs.namespaces.Import;
    //#endregion 

    //#region 浏览器判断
    Ljs.browser = function () {
        var ua = navigator.userAgent.toLowerCase();
        var check = function (regex) {
            return regex.test(ua);
        },
        docMode = document.documentMode,
        isOpera = check(/opera/),
        isOpera10_5 = isOpera && check(/version\/10\.5/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/),
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && (check(/msie 7/) || docMode == 7),
        isIE8 = isIE && (check(/msie 8/) && docMode != 7 && docMode != 9 || docMode == 8),
        isIE9 = isIE && (check(/msie 9/) && docMode != 7 && docMode != 8 || docMode == 9),
        isIE6 = isIE && check(/msie 6/),
        isGecko = !isWebKit && check(/gecko/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isGecko4 = isGecko && check(/rv:2\.0/),
        isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
        isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
        isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isLinux = check(/linux/),
        scrollWidth = null;
        return {
            docMode: docMode,
            isOpera: isOpera,
            isOpera10_5: isOpera10_5,
            isWebKit: isWebKit,
            isChrome: isChrome,
            isSafari: isSafari,
            isSafari3: isSafari3,
            isSafari4: isSafari4,
            isSafari2: isSafari2,
            isIE: isIE,
            isIE6: isIE6,
            isIE7: isIE7,
            isIE8: isIE8,
            isIE9: isIE9,
            isGecko: isGecko,
            isGecko3: isGecko3,
            isGecko4: isGecko4,
            isFF3_0: isFF3_0,
            isFF3_5: isFF3_5,
            isFF3_6: isFF3_6,
            isLinux: isLinux,
            isWindows: isWindows,
            isMac: isMac
        }
    } ();
    //#endregion

    Ljs.alias = Ljs.Function.alias;


})();

//共用文档操作
(function () {
    Ljs.document = function () {

    }
    Ljs.copy(Ljs.document, {
        WinInfo: function (win) {
            var elem = win.document;
            return {
                docHeight: Ljs.document.docWH(win.document, "Height"),
                docWidth: Ljs.document.docWH(win.document, "Width"),
                winHeight: Ljs.document.winWH(win.document, "Height"),
                winWidth: Ljs.document.winWH(win.document, "Width")

            }
        },
        docWH: function (elem, name) {
            return Math.max(
                        elem.documentElement["client" + name],
                        elem.body["scroll" + name],
                        elem.documentElement["scroll" + name],
                        elem.body["offset" + name],
                        elem.documentElement["offset" + name])
        },
        winWH: function (elem, name) {
            var docElemProp = elem.documentElement["client" + name],
				    body = elem.body;
            return elem.compatMode === "CSS1Compat" && docElemProp || body && body["client" + name] || docElemProp;
        },
        GetCookie: function (name) {
            var reg = new RegExp(name + "=(.+?);|" + name + "=(.+?)$");
            var cval = document.cookie;
            var m = reg.exec(cval);
            if (m) {
                return m[1] || m[2];
            } else {
                return m;
            }
        },
        RemoveCookie: function (name) {
            var reg = new RegExp(name + "=(.+?);|" + name + "=(.+?)$", "g");
            var cval = document.cookie;
            var m = reg.exec(cval);
            var t = new Date();
            t.setTime(t.getTime() - 1);
            if (m) {
                document.cookie = m[0] + (m[1] ? "" : ";") + "expires=" + t.toGMTString() + ";";
            }
        },
        SetCookie: function (name, value) {
            var t = new Date();
            t.setTime(t.getTime() + 1000 * 60 * 60 * 24 * 31)
            document.cookie = name + "=" + value + ";expires=" + t.toGMTString() + ";";
        }
    });
})();

//继承机制
(function () {
    //#region 继承机制 
    var Class = Ljs.Class = function (config) {
        config = config || {};
        var init = config.init || function () { };
        var superclass = config.inherit || Object;
        var $static = config.$static || {};
        delete config.init;
        delete config.inherit;
        delete config.$static;
        var $class = Class.bridge(superclass, init); //封装原始构造函数
        Class.superSyntax($class.prototype, config); //添加方法|属性并实现$super语法
        Ljs.copy($class, $static); //给类添加静态方法 || 属性
        return $class;
    }
    Ljs.copy(Ljs.Class, {
        reSuper: /function(?:\s+)?\(.*(\$super)+.*?\)/,
        bridge: function (superclass, initialize) {
            var cls = function () {
                superclass.apply(this, arguments);
                initialize.apply(this, arguments);
            }
            var f = function () { }
            f.prototype = superclass.prototype;
            cls.prototype = new f();
            cls.prototype.superclass = superclass;
            cls.prototype.constructor = cls;
            cls.superclass = superclass;
            cls.constructor = initialize;
            return cls;
        },
        superSyntax: function (obj, options) {
            for (var k in options) {
                if (options.hasOwnProperty(k)) {
                    Class.reSuper.test.lastIndex = 0;
                    if ((obj[k] != undefined) && (typeof (options[k]) === "function") && (Class.reSuper.test(options[k].toString()))) {
                        Class.superSyntaxFn(obj, k, options[k]);
                    } else {
                        obj[k] = options[k];
                    }
                }
            }
        },
        superSyntaxFn: function (obj, kk, met) {
            obj[kk] = function () {
                var $super = Ljs.alias(this.superclass.prototype[kk], this);
                return met.apply(this, Array($super).concat(Ljs.Array(arguments)));
            }
        }
    });

    var Manager = Ljs.ClassManager = {
        define: function (classname, config) {
            ///	<summary>
            ///		Ljs.define(classname,config) 创建自定义类并放入Ljs命名空间下 
            ///	</summary>
            ///	<param name="classname" type="String">
            ///	     classname 类名 包括命名空间 namespace.youclass
            ///	</param>
            ///	<param name="config" type="Object">
            ///	     config 配置文件 init 类的构造函数 , inherit 继承的父类 $static 类的静态方法和属性 其余都为类的方法
            ///	</param>
            if (classname == undefined) throw ("缺少类名");
            config.classname = classname;
            if (typeof config.inherit === "string") {
                config.inherit = Manager.getClass(config.inherit)
            }
            var newClass = Ljs.Class(config);
            Ljs.namespaces.ns(classname, newClass);
            return newClass;
        },
        getClass: Ljs.namespaces.getClass
    }
    Ljs.define = Ljs.ClassManager.define;
    //#endregion

})();

//动态载入类
(function () {

    Ljs.define("Loader", {
        $static: {
            Load: function (file, Asyn) {
                file = this.Path + "classes/" + file.replace(".", "/") + ".js?t=" + Math.random();
                if (Asyn === undefined) {
                    this.ScriptJs(file);
                }
            },
            WriteJs: function () {

            },
            HeadJs: function (file) {
                var script = document.createElement("script");
                script.src = this.Path + file
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            ScriptJs: function (file) {
                var xhttp = this.createHttp();
                xhttp.open("GET", file, false)
                xhttp.send(null);
                if (xhttp.status == 200) {
                    var s = document.createElement("script");
                    s.type = "text/javascript"
                    //s.defer = true
                    s.text = xhttp.responseText;
                    document.getElementsByTagName("head")[0].appendChild(s);
                } else {
                    alert("加载文件" + file + "失败")
                }

            },
            Path: "",
            init: function () {
                var script = document.getElementsByTagName("script");
                var reg = /(.+)?yh\.js/ig;
                var math;
                for (var i = 0; i < script.length; i++) {
                    if (math = reg.exec(script[i].src)) {
                        this.Path = math[1];
                        this.readConfig(script[i]);
                        break;
                    }
                }
            },
            readConfig: function (script) {
            },
            using: function (namescpace) {
                alert(namescpace);
            },
            createHttp: function () {
                if (window.XMLHttpRequest)
                    return new XMLHttpRequest();
                else if (window.ActiveXObject)
                    return new ActiveXObject("MsXml2.XmlHttp");
            },
            LoadCss: function (file) {
                var csses = document.getElementsByTagName("link");
                var href = Ljs.classes.Loader.Path + "../css/" + file;
                for (var i = 0; i < csses.length; i++) {
                    var elm = csses[i];
                    if (elm.href == href) {
                        return;
                    }
                }
                var css = document.createElement("link");
                css.type = "text/css";
                css.rel = "stylesheet"
                css.href = href;
                document.getElementsByTagName("head")[0].appendChild(css);
            }

        }
    })
    Ljs.LoadCss = Ljs.classes.Loader.LoadCss;
    Ljs.classes.Loader.init();


})();
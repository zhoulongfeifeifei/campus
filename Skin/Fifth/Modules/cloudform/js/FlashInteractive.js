var Flash = function (config) {
    return new Flash.fn.init(config);
}
Flash.NullFun = function () { }
Flash.NullArr = [];
Flash.Apply = function (obj, config, deft) {
    if (deft) Flash.Apply(obj, deft);
    for (var e in config) {
        obj[e] = config[e]
    };
}
Flash.Config = {
    id: "FlashPlay",
    callback: function () {

    }
}
Flash.GetObj = function (movieName) {
    //return document.getElementById(movieName)
    return document[movieName];
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}
Flash.Interaction = function (id, met, params, callback) {
    var o = Flash.GetObj(id);
    if (o === undefined) {
        alert("交互出错,捕获不到FLASH")
    }
    params = params || Flash.NullArr;
    callback = callback || Flash.NullFun;
    var result;
    try {
        result = o.Interaction(params[0])
    } catch (e) {
        setTimeout(function () {
            Flash.Interaction(id, met, params, callback);
        }, 100);
    }
}
Flash.getFlashHtml = function (pconfig) {
    var config = {};
    Flash.Apply(config, pconfig,Flash.isIE ? Flash.iEParams : Flash.OtherParams);

    var result = Flash.isIE ?
        '<object id={id} name={id} classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width={width} height={height} >' :
        '<object data="{src}" width="{width}" height="{height}" id="{id}" name="{id}" type="application/x-shockwave-flash" >'

    result = [result.replace(/\{(.+?)\}/g, function (m, s) {
        if (config[s] === undefined) return ""
        return config[s];
    })]


    for (var e in config) {
        if (Flash.Reflection[e] === undefined) {
            result.push('<param name="' + e + '" value="' + config[e] + '">')
        }
    }
    if (Flash.isIE) {
        result.push('<param name="Movie" value="' + config["src"] + '" >');
        result.push('<param name="Src"  value="' + config["src"] + '">');
    }
    result.push("</object>")
    return result.join("\n");


}
Flash.isIE = function () {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = /opera/.test(ua);
    var msie = /msie/.test(ua)
    return !isOpera && msie;
} ()
Flash.ResolveParams = function (k, v) {
    if (Flash.isIE) {
        return '<param name="' + k + '" value="' + v + '" />'
    } else {
        return k + '="' + v + '" ';
    }
}
Flash.iEParams = {
    AllowFullScreen: "false",
    AllowNetworking: "all",
    ProfilePort: "0",
    ProfileAddress: "",
    Profile: "0",
    SeamlessTabbing: "1",
    MovieData: "",
    SWRemote: "",
    BGColor: "",
    EmbedMovie: "",
    DeviceFont: "",
    Scale: "NoScale",
    AllowScriptAccess: "always",
    Base: "",
    Menu: "-1",
    SAlign: "LT",
    Quality: "High",
    Loop: "-1",
    Play: "0",
    WMode: "Opaque"
}
Flash.OtherParams = {
    WMode: Flash.iEParams.WMode,
    Quality: Flash.iEParams.Quality
}
Flash.Reflection = {
    width: "",
    height: "",
    src: "",
    id: "",
    name: ""
}

Flash.fn = {};
Flash.fn.init = function (config) {
    Flash.Apply(this, config, Flash.Config);
}
Flash.fn.Timer = null;
Flash.fn.RegCallBack = function (fn) {
    return this.callback = fn;
}
Flash.fn.Interaction = function (met, params) {
    if (Object.prototype.toString.call(params) != "[object Array]") {
        params = [params]
    }
    Flash.Interaction(this.id, met, params, this.callback);
    return this;
}
Flash.fn.init.prototype = Flash.fn;







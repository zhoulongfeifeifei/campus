/// <reference path="../../Yh.js" />
(function () {
    Ljs.LoadCss("plugins.css");
    Ljs.define("Messages.Tip", {});
    var Tip = Ljs.classes.Messages.Tip;
    Ljs.copy(Ljs.classes.Messages.Tip, {
        dom: null,
        Type: {
            Error: "error",
            Success: "succcess",
            Prompt: "prompt",
            Loader: "loader"
        },
        timer: null,
        InitDocument: function () {
            this.dom = $(['<div id="YhFw_MessagesBox" class="YhFw_MessagesBox">',
                    '<div class="wBox">',
                        '<div class="wS"></div>',
                        '<div class="wLoad"><span></span></div>',
                        '<div class="wC"></div>',
                        '<div class="wE"></div>',
                    '</div>',
                 '</div>'].join("\n"));
            this.dom.appendTo("body")
        },
        show: function (msg, type, time, other) {
            msg = msg || ""
            type = type || Tip.Type.Prompt,
            time = time === undefined ? 2 : time;
            time = time * 1000
            clearTimeout(Tip.Timer);
            if (!Tip.dom) {
                Tip.InitDocument();
            }
            this.dom.hide();
            this.dom.find(".wC").html(msg);
            this.dom.find(".wLoad").removeClass().addClass("wLoad " + type);
            this.center(other)
            this.dom.show();

            if (time != 0) {
                Tip.Timer = setTimeout(function () {
                    Tip.hide();
                }, time)
            }

        },
        center: function (config) {
            var y = $(Ljs.browser.isIE ? document.documentElement : document).scrollTop() + ($(window).height() - this.dom.height()) / 2;
            var x = $(Ljs.browser.isIE ? document.documentElement : document).scrollLeft() + ($(window).width() - this.dom.width()) / 2;
            if (config) {
                config.offsetX && (x += config.offsetX);
                config.offsetY && (y += config.offsetY);
            }
            this.dom.css({
                top: y,
                left: x
            });
            return this;
        },
        hide: function () {
            this.dom.hide();
        }
    })
})();






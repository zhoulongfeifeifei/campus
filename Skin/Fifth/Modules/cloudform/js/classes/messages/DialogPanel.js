Ljs.LoadCss("plugins.css");
Ljs.Import("AlphaPanel",true);
/// <reference path="../../Yh.js" />


Ljs.define("Messages.DialogPanel", {
    init: function (arg) {
        arg = arg || {}
        Ljs.copy(this, arg, this.constructor.config);
    },
    Layer: null, //最外层DIV
    body: null, //内容显示DIV
    create: function () {
        return Ljs.Array.replace([
            '<div class="qz_dialog_layer" id="{id}" >',
                '<div class="qz_dialog_layer_main">',
                    '<div style="cursor: move" class="qz_dialog_layer_title">',
                        '<h3>{title}</h3>',
                        '<button class="qz_dialog_btn_close" title="关闭" type="submit"> <span class="none">╳</span></button>',
                    '</div>',
                    '<div class="qz_dialog_layer_cont">',
                    '</div>',
                '</div>',
                '<div class="qz_popup_hidden_iframe"><iframe  frameborder="no" scrolling="no" width="100%" height="100%" style="background-color:transparent;z-index:-1" ></iframe></div>',
            '</div>'
        ], this);
    },
    show: function (config) {
        config = config || {};
        if (config) Ljs.copy(this, config);
        if (!config.callback) config.callback = function () { };
        if (!config.closeed) config.closeed = function () { };
        this.ConstructorDocument();
        this.setTitle(this.title)
        this.setSize(this.width, this.height);
        this.Layer.find(".qz_dialog_btn_close").toggle(!config.isclose);
        this.Layer.show();
        AlphaPanel.show()
        return this;
    },
    ConstructorDocument: function () {
        var _this = this;
        if (!this.Layer) {
            this.Layer = $(this.create()).appendTo("body");
            this.body = this.Layer.find(".qz_dialog_layer_cont")
            //绑定事件
            this.Layer.find(".qz_dialog_btn_close").
            click(function (event) {
                _this.close();
                return false;
            }).
            mouseover(function () {
                $(this).addClass("qz_dialog_btn_close_on");
            }).
            mouseout(function () {
                $(this).removeClass("qz_dialog_btn_close_on");
            }).
            mousedown(function () {
                return false;
            });
            this.Layer.find(".qz_dialog_layer_title").mousedown(function (event) {
                if (this.setCapture) {
                    this.setCapture()
                } else {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                _this.MouseDown = true;
                _this.MouseX = event.offsetX || event.layerX;
                _this.MouseY = event.offsetY || event.layerY;

                return false;
            });
            $(document).mousemove(function (event) {
                if (_this.MouseDown) {
                    var y = event.clientY + $(window).scrollTop() - _this.MouseY,
                        x = event.clientX + $(window).scrollLeft() - _this.MouseX;

                  
                    _this.Layer.css({
                        top: y,
                        left: x
                    });
                }
            }).
            mouseup(function () {
                var d = _this.Layer.find(".qz_dialog_layer_title")[0]
                if (d.releaseCapture) {
                    d.releaseCapture();
                } else {
                    window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                _this.MouseDown = false;
            })
        }
    },
    setSize: function (w, h) {
        if (!this.Layer) return;
        this.Layer.css({
            width: w,
            height: h
        });
        this.Layer.find(".qz_dialog_layer_cont").css({
            height: h - 28
        })
        return this;
    },
    setPostion: function (x, y) {
        if (!this.Layer) return;
        this.Layer.css({
            top: y,
            left: x

        })
        return this;
    },
    setTitle: function (str) {
        this.Layer.find(".qz_dialog_layer_title h3").html(str);
        return this;
    },
    center: function () {
        var y = $(Ljs.browser.isIE ? document.documentElement : document).scrollTop() + ($(window).height() - this.Layer.height()) / 2;
        var x = $(Ljs.browser.isIE ? document.documentElement : document).scrollLeft() + ($(window).width() - this.Layer.width()) / 2;
        this.Layer.css({
            top: y,
            left: x
        });
        return this;
    },
    close: function () {
        this.Layer.hide();
        AlphaPanel.close();
        this.closeed()
        return this;
    },
    closeed: function () {

    },
    id: "qz_dialog_instance_qzdialog1",
    parent: null,
    $static: {
        config: {
            title: "",
            width: 300,
            height: 300,
            autoCenter: true,
            MouseDown: false,
            MouseX: 0,
            MouseY: 0
        }
    }
})

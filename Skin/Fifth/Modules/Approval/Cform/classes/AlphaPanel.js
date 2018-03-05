/// <reference path="../Yh.js" />

Ljs.LoadCss("plugins.css");


Ljs.define("AlphaPanel", {
    $static: {
        id: "AlphaPanelBox",
        timer: null,
        dom: null,
        show: function (config) {
            config = config || {}
            Ljs.copy(config, this.defaultConfig);
            if (!this.dom) {
                this.dom = $('<div id="' + this.id + '" style="position:absolute; left:0; top:0; width:100%; display:none; background:#000000; z-index:10000;opacity: 0.2; filter:alpha(opacity=20);-moz-opacity:0.2;-khtml-opacity: 0.2" ></div>');
                this.dom.appendTo("body");
            }
            var info = Ljs.document.WinInfo(window);
            this.dom.css({
                height: info.docHeight,
                zIndex: config.zIndex
            })
            this.dom.show();
            var _this = this;
            window.onresize = function () {
                _this.resize(config)
            }
        },
        resize: function (config) {
            var info = Ljs.document.WinInfo(window)
            this.dom.css({
                height: info.docHeight,
                zIndex: config.zIndex
            });
        },
        hide: function () {
            this.dom.hide();
        },
        maxHeight: function () {

        },
        defaultConfig: {
            isMax: true,
            zIndex: 500
        },
        close: function () {
            this.dom.hide();
        }
    }
});


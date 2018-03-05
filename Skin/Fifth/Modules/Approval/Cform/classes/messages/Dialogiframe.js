/// <reference path="../../Yh.js" />


Ljs.Import("Messages.DialogPanel");


Ljs.define("Messages.Dialogiframe", {
    init: function (arg) {
        Ljs.copy(this, arg, this.constructor.config);
    },
    inherit: "Messages.DialogPanel",
    iframe: null,
    show: function ($super, config) {
        var _this = this;
        config = config || {};
        $super(config);
        this.Layer.hide();
        this.body.find(".qz_popup_inner_mask").show();
        this.iframe.unbind("load");
        this.iframe.load(function () {
            _this.body.find(".qz_popup_inner_mask").hide();
            if (this.contentWindow.ready) {
                this.contentWindow.ready.call(_this, config.data)                
            }
        })
        this.setSrc(this.src);
        this.center();
        this.Layer.show()
        return this;
    },
    ConstructorDocument: function ($super) {
        var _this = this;
        $super()
        if (!this.iframe) {
            this.body.append(
                '<div class="qz_popup_inner_mask" ><img src="/Themes/Default/Content/admin/images/loading.gif"/></div>' +
                '<iframe class="qz_popup_inner_iframe" src="#" frameborder="no" scrolling="no" width="100%" height="100%" allowtransparency></iframe>'


            );
            this.iframe = this.body.find(".qz_popup_inner_iframe");
        }
    },
    setSrc: function (src) {
        this.iframe.attr("src", src)
    },
    $static: {
        config: {
            callback: function () { }
        }
    }
})



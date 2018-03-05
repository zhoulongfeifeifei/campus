/// <reference path="../../Yh.js" />

/*
    Flash交互类
*/

Ljs.define("other.FlashInteractive", {
    init: function () {
        window["FlashCallBack"] = this.callback
    },
    callback: function () {
    
    },
    $static: {
        FlashID: "MusicFlash",
        isRead: false,
        getFlash: function (movieName) {
            return document[movieName];
            if (navigator.appName.indexOf("Microsoft") != -1) {
                return window[movieName];
            } else {
                return document[movieName];
            }
        },
        send: function (obj) {
            try {
                Ljs.classes.other.FlashInteractive.getFlash(Ljs.classes.other.FlashInteractive.FlashID).Interaction(obj)
            } catch (e) {
                setTimeout(function () {
                    Ljs.classes.other.FlashInteractive.send(obj);
                }, 100)
            }
        },
        Play: function () {
            Ljs.classes.other.FlashInteractive.send({
                action: "play"
            });
        },
        newPlay: function (file) {
            Ljs.classes.other.FlashInteractive.send({
                action: "file",
                file: file,
                play: true
            });
        },
        pause: function () {
            Ljs.classes.other.FlashInteractive.send({
                action: "pause"
            })
        },
        stop: function () {
            Ljs.classes.other.FlashInteractive.send({
                action: "stop"
            })
        }
    }
})
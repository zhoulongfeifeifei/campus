
Ljs.LoadCss("plugins.css");

Ljs.define("other.MusicPlayer", {
    init: function (o) {
        this.FlashInteractive = o;
    },
    FlashInteractive: null,
    last: null,
    timer: null,
    btnHoverFormMp: function (o, n) {
        o.className = n == 1 ? "pgp_btn_play_onchk" : "pgp_btn_play_unchk";
    },
    play2: function (o, n) {
        if (this.last != null) {
            this.last.show();
            this.last.parents(".music_box_play").next().find("span").show();
        }
        this.last = $(o);
        $(o).hide().parent().append($("#pgp_bar"));
        $("#pgp_title1").html($(o).parents(".music_box_play").next().find("span").hide().html() + "&nbsp;&nbsp;")        
        $("#pgp_title2,#pgp_title3").html( $("#pgp_title").width() < $("#pgp_title1").width() ? $("#pgp_title1").html() : "")        
        //$(",#pgp_title2,#pgp_title3").html();
        this.StartScroll();
        var d = eval($(o).attr("musicdata"));
        $("#pgp_list p").remove();
        var html = ""
        for (var i = 0; i < d.length; i++) {
            html += "<p><a href='javascript:;' file='" + d[i].file + "' onclick='return MusicPlay.play(this);' class='" + (i == 0 ? "On" : "") + "'>" + d[i].title + "</a></p>"
        }
        this.FlashInteractive.newPlay(d[0].file)
        $("#pgp_list").append(html);
        return false;
    },
    play: function (o) {
        this.getSongLyrics()
        if ($(o).hasClass("On")) return false;
        $("#pgp_list a").not($(o).addClass("On")).removeClass("On");
        this.FlashInteractive.newPlay($(o).attr("file"));
        return false;
    },
    hoverClass: function (o) {

    },
    outClass: function () { },
    downClass: function () {
        //alert(222)
    },
    upClass: function () { },
    getSongLyrics: function (o) {
        $("#pgp_list").toggleClass("none");
        return false;
    },
    pauseMiniPlayer: function (o) {
        $(o).toggleClass("pgp_btn_pause").toggleClass("pgp_btn_play").attr("title", $(o).attr("title") == "暂停" ? "播放" : "暂停");
        $(o).attr("title") == "暂停" ? this.FlashInteractive.Play() : this.FlashInteractive.pause()
        return false;
    },
    resetPlayBtn: function (o) {
        $(o).parents(".music_box_play").find(".pgp_btn_play_unchk").show();
        $(o).parents(".music_box_play").next().find("span").show();
        $("#pgp_bar").appendTo("#Hiddens");
        this.StopScroll();
        this.FlashInteractive.stop()
        return false
    },
    StartScroll: function () {
        this.StopScroll();
        this.timer = setInterval(this.ScrollLeft, 50);
    },
    StopScroll: function () {
        clearInterval(this.timer);
    },
    ScrollLeft: function () {
        if ($("#pgp_title").scrollLeft() < $("#pgp_title1").width()) {
            $("#pgp_title").scrollLeft($("#pgp_title").scrollLeft() + 1)
        } else {
            $("#pgp_title").scrollLeft($("#pgp_title").scrollLeft() - $("#pgp_title1").width())
        }
    }
})
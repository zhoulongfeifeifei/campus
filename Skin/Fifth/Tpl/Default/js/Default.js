/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-09 09:56:01
 * @version $Id$
 */
var userId,
    form = layui.form(),
    Type = getCookieByUserInfo('logintype');
if (Type == 2 || Type == 3) {
    $(".schoolnews").hide();
}



// 动态 start

var curr = 1;
$('.loadMore').on('click', function() {
    curr += 1;
    // GetListDynamic(curr);
});

// 动态 end

// 外链
commonFn({
    url: 'Link/GetLinksList',
    type: 'post',
    data: {
        type: 2
    }
}, function(res) {
    if (res.resultData) {
        $.each(res.resultData, function(index, el) {
            $('.publiclink').append('<div>==<a href=' + el.webUrl + ' target="_blank">' + el.title + '</a>==</div>');

        });
    }
})



$('.addApp').click(function(event) {
    var addapption = layer.open({
        type: 1,
        title: false,
        btn: ["确定", "取消"],
        area: ["300px", "260px"],
        content: $('.addMyApp'),
        success: function() {
            $('#selectApp').children(':not(:eq(0))').remove();
            commonFn({
                url: 'HomePage/GetListInApp',
                data:{logintype:getCookieByUserInfo('logintype'),schoolid:window.schoolid}
            }, function(res) {
                if (res && res.length > 0) {
                    $.each(res, function(index, el) {
                        $('#selectApp').append('<option value=' + el.moduleId + '>' + el.moduleName + '</option>')
                    });
                    form.render();
                }
            })
        },
        yes: function(index) {
            var $id = $('#selectApp').val();
            commonFn({
                url: 'HomePage/AddMyApp',
                data: {
                    menuId: $id,
                    sortId: 0
                }
            }, function(res) {
                layer.close(index);
                getLeftMenu();
                parent.layer.msg("添加成功");
            })
        }
    })
});

// 定时器--首页左侧的导航的未读已读
// setInterval(function(){
//   getLeftMenu()  
// } ,20000)  

// 动态
//加载更多

// 云盘
commonFn({
    url: 'CloudPan/PersonalInfo',
    type: 'post'
}, function(res) {
    var total = res.totalSize / 1048576;
    var usersiez = (res.userdSize / 1048576).toFixed(3);
    var userwidth = Math.ceil(usersiez);
    $('.progress div').animate({
        width: userwidth + '%'
    })
    console.info(usersiez, res.userdSize / 1048576);
    $('#capacity').html('容量(' + usersiez + 'G/' + total + 'G <span>共' + res.fileCount + '个文件</span>)')
})

// 首页新闻
commonFn({
        url: 'Portal/GetListArticles',
        data: {
            IsInner: 1,
            pageindex: 1,
        },
        type: 'post'
    },
    function(res) {
        $('#indexNew').empty();
        if (res.resultData && res.resultData.length > 0) {
            $.each(res.resultData, function(index, el) {
                if (index > 5) {
                    return false
                }
                $('<li>' +
                    '<a target="_blank" href="../../Modules/schoolNews/detailNew.html?id=' + el.id + '"><p>' + el.title + '</p><span class="rt"><i class="indexIcon">&#xe608;</i>' + solveTime(el.editTime) + '</span></a>' +
                    '</li>').appendTo('#indexNew')
            });
        }
    })

// 课表
commonFn({
    url: 'OpenCourse/GetCourseTable',
    data: {
        schoolId: window.schoolid,
        logintype: getCookieByUserInfo('logintype')
    }
}, function(res) {
    $('#indexNew').empty();
    var len = 9;
    $('#Schedule tbody').empty();
    for (var i = 1; i < len; i++) {
        $('#Schedule tbody').append('<tr id="table' + i + '">' +
            '<td><span>' + i + '</span></td>' +
            '<td></td>' +
            '<td></td>' +
            '</tr>')
    }
    $.each(res, function(i, el) {
        var today, $text;
        if (el.today == 0) {
            today = 1;
        } else if (el.today == 1) {
            today = 2;
        }
        if (el.className) {
            $text = el.className + '(' + el.courseName + ')';
        } else {
            $text = el.courseName;
        }
        $('#Schedule tbody').find('tr#table' + el.sheetOrder).find('td:eq(' + today + ')').text($text)
    });

})
var leftheight = $('.content_left').height() - 14;
$('.Invisible_right').css('min-height', leftheight)
$('.Invisible_right iframe').css('min-height', leftheight);


function hello(a, ddd) {
    $('.content_middle ,.content_right').addClass('noneblock');
    $('.Invisible_right').addClass('inlineblock');
    $('.Invisible_right .oclass').text(ddd);
    $('.Invisible_right > iframe').attr('src', a)
}
//我的应用的获取数据和显示
getLeftMenu();

function getLeftMenu() {
    commonFn({
        url: 'HomePage/GetListLeftNav',
        data: {
            logintype: getCookieByUserInfo('logintype'),
            schoolid: window.schoolid
        }
    }, function(res) {
        $('#myClass').empty();
        $('#myApp .addApp').prevAll().remove();
        if ($.isArray(res.myAppMenu)) {
            var m = res.myAppMenu
            for (var i = 0; i < m.length; i++) {
                var msgc, icoFont;
                if ($.isArray(m[i].msgCount)) {
                    msgc = '<span class="nub">' + m[i].msgCount + '</span>';
                } else {
                    msgc = '';
                }
                if (m[i].icoFont) {
                    icoFont = "<i class='indexIcon'>" + m[i].icoFont + "</i>";
                } else {
                    icoFont = "<i class='indexIcon'>&#xe6db;</i>";
                }
                $('#myApp .addApp').before('<li>' +
                    '<a href="../childPage/top_nav.html?id=' + m[i].moduleId + '&&name=' + m[i].moduleName + '" target="_blank">' +
                    // '<img src="/Skin/"Fifth'+m[i].IcoUrl+'"/>'+
                    icoFont +
                    '<span>' + m[i].moduleName + '</span>' + msgc + '</a><span><i class="layui-icon remove" onclick="removeNavForLeft(' + m[i].moduleId + ')" style="color: red;" data-id=' + m[i].moduleId + '>ဆ</i></span></li>')
            }
            // $('.remove').click(function(event) {

            //     var id = $(this).attr('data-id');
            //     $.ajax({
            //         url: '/AjaxHomePage/DeleteMyApp',
            //         data: {
            //             menuId: id
            //         },
            //         success: function(res) {
            //                 getLeftMenu();
            //                 layer.msg("删除成功");
            //         }
            //     })
            // });

        }
        if ($.isArray(res.myClassMenu)) {
            var c = res.myClassMenu
            for (var i = 0; i < c.length; i++) {
                var msgc, icoFont;
                if ($.isArray(c[i].msgCount)) {
                    msgc = '<span class="nub">' + c[i].msgCount + '</span>';
                } else {
                    msgc = '';
                }
                if (c[i].icoUrl) {
                    icoFont = "<i class='indexIcon'>" + c[i].icoUrl + "</i>";
                } else {
                    icoFont = "<i class='indexIcon'>&#xe6db;</i>";
                }
                $('#myClass').append('<li>' +
                    '<a href="javascript:void(0)" data-url="/Web/Skin/Fifth' + c[i].moduleUrl + '?id=' + c[i].moduleId + '" class="displayStealth">' +
                    // '<img src="/Skin/Fifth/'+c[i].IcoUrl+'" alt="" />'+
                    icoFont +
                    '<span>' + c[i].moduleName + '</span>' + msgc + '</a></li>')
            }
            $('.displayStealth').on('click', function() {
                var ddd = $(this).children('span').text();
                var $url = $(this).attr('data-url')
                hello($url, ddd)
            })
        }
    })
}

function removeNavForLeft(id) {
    commonFn({
        url: 'HomePage/DeleteMyApp?menuId=' + id
    }, function() {
        getLeftMenu();
        layer.msg("删除成功");
    })

}
// 动态数据的获取和显示
// GetListDynamic(1);
function GetListDynamic(curr) {
    $curr = curr;
    $.ajax({
        url: '/AjaxUser/GetListDynamic',
        async: false,
        data: {
            PageIndex: curr,
            PageSize: 3
        },
        success: function(res) {
            $('.dynamic').nextAll('.ssinfo').remove();
            if (res.Status == 1) {
                var $curr = res.pageIndex;
                if (res.resultData && res.resultData.length > 0) {
                    var t = res.resultData;
                    proData(t);
                    // 点赞
                    $(".click").unbind("click").on("click", function(event) {
                        var id = $(this).attr('data-id');
                        var $this = $(this);
                        if ($this.find('i').is('.ok')) {
                            $.ajax({
                                url: '/AjaxSays/AddSayThumbs',
                                data: {
                                    Say_Id: id
                                },
                                success: function(res) {
                                    if (res.Status == 1) {
                                        $this.find('i').toggleClass("ok");
                                        $this.next('span').children('.nub').html(parseInt($this.next('span').children('.nub').html()) + 1);
                                    } else if (res.Status == 4) {
                                        top.location.href = "/Skin/Fifth/login.html";
                                    } else {
                                        layer.msg(res.Message);
                                    }

                                }
                            })
                        } else {
                            layer.msg("已赞过");
                        }
                    });
                    var comId = 0,
                        replyId = 0,
                        type, touserid;
                    // 光标
                    $('.isFocus').unbind("click").on('click', function(e) {
                        comId = $(this).attr('data-comId');
                        $(this).closest('.comment').children('.commentdiv').removeAttr('data-style')
                        $(this).closest('.comment').children('.commentdiv').toggleClass('block').children('textarea').val('').focus();
                        $(this).closest('.comment').children('.commentdiv').attr('data-comId', comId);
                    });
                    $('.isFocus-a').unbind("click").on('click', function(e) {
                            comId = $(this).attr('data-comid');
                            replyId = $(this).attr('data-redid');
                            type = $(this).attr('data-type');
                            touserid = $(this).attr('data-id')
                            $(this).closest('.comment').children('.commentdiv').toggleClass('block').children('textarea').val('').focus();
                            $(this).closest('.comment').children('.commentdiv').attr({
                                'data-style': type,
                                'data-comId': comId,
                                'data-redid': replyId,
                                'data-userid': touserid
                            });
                        })
                        // 评论
                    $('.commentdiv .pinglun').unbind("click").on('click', function(e) {
                        if ($(this).prev().prev('textarea').val() && $(this).prev().prev('textarea').val() != "") {
                            var addblock, comId, redid, cont, $url = '/AjaxSays/AddSayReply',
                                $data, type;
                            addblock = $(this).parent('.commentdiv');
                            // 动态的id
                            comId = $(this).parents().attr('data-comId');
                            // 评论的Id
                            // 回复的ID
                            redid = $(this).parents().attr('data-redid');
                            cont = $(this).prev().prev('textarea');
                            type = $(this).parent().attr('data-style') //isReplay;
                            touserId = $(this).parent().attr('data-userid')

                            // 得到当前评论的父级的索引
                            var nowIndex = $(this).closest('.ssinfo').index() - 1;
                            // 得到索引之后除以分页的个数 :3 之后向上取整 得到当前页.在评论成功后传当前页的页码参数
                            var nowPage = Math.ceil(nowIndex / 3);

                            if (type == 1) {

                                $data = {
                                    Comments_Id: comId,
                                    Reply_Content: cont.val(),
                                    ReplyToUserId: touserId
                                }
                            } else if (type == 2) {
                                $data = {
                                    Comments_Id: comId,
                                    Reply_Id: replyId,
                                    Reply_Content: cont.val(),
                                    ReplyToUserId: touserId
                                }
                            } else { // 评论
                                $url = '/AjaxSays/AddSayComment';
                                $data = {
                                    Say_Id: comId,
                                    Comments_Content: cont.val()
                                }
                            }
                            $.ajax({
                                url: $url,
                                data: $data,
                                success: function(res) {
                                    if (res.Status == 1) {
                                        // GetListDynamic(1,true);
                                        cont.val('');
                                        addblock.removeClass('block');
                                        layer.msg("评论成功", {
                                            time: 1000
                                        }, function() {
                                            $('.dynamic').next('.ssinfo:eq(' + nowIndex + ')').remove();
                                            $('.dynamic').next('.ssinfo:eq(' + (nowIndex + 1) + ')').remove();
                                            $('.dynamic').next('.ssinfo:eq(' + (nowIndex - 1) + ')').remove();
                                            GetListDynamic(nowPage);
                                        });

                                    } else if (res.Status == 4) {
                                        top.location.href = "../../login.html";
                                    } else {
                                        layer.msg(res.Message);
                                        cont.val('');
                                        addblock.removeClass('block');
                                    }
                                }
                            })
                        } else {
                            layer.msg("请输入内容");
                        }
                    });

                } else {
                    $('.loadMore').text("没有更多动态~")
                }
            } else if (res.Status == 4) {
                top.location.href = "../../login.html";
            } else {
                layer.msg(res.Message);
            }
        }
    })
}
var replyCommentDom;

function proData(t) {
    for (var i = 0; i < t.length; i++) {
        var isok;
        if (isok) {
            $('.dynamic').nextAll('.ssinfo').remove();
            $('.showcomment').empty();
        }
        //Face是头像, commentDom 是评论的dom元素
        var Face, commentDom = '';

        // 有头像的显示头像,没头像的显示默认头像
        if (t[i].User.face) {
            Face = t[i].User.face;
        } else {
            Face = "../../Common/img/usertx.png"
        }
        // 评论区域
        if (t[i].CommentList && t[i].CommentList.length > 0) {
            $.each(t[i].CommentList, function(i1, el) {
                // 回复评论的(二级评论)
                if (el.ReplyList && el.ReplyList.length > 0) {
                    replyCommentDom = ''
                    $.each(el.ReplyList, function(i2, el2) {
                        replyCommentDom += '<div class="s2 com' + el2.ID + '">' +
                            '<img src=' + el2.User.face + ' alt="">' +
                            '<p><span>' + el2.User.name + ' </span>回复了<span>  ' + el.User.name + '</span>:' + el2.Reply_Content + '</p>' +
                            '<div class="isFocus-a" data-type=2 data-comid=' + el.ID + ' data-redid = ' + el2.ID + ' data-id =' + el.User.user_id + '><i class="indexIcon">&#xe619;</i></div>' +
                            '</div>';
                        if (el2.ChildReplyList && el2.ChildReplyList.length > 0) {
                            eachCom(el2.ChildReplyList, replyCommentDom, el2.ID);
                        }

                    });
                } else {
                    replyCommentDom = '';
                }


                // 评论 ( 一级评论 )
                commentDom += '<div class="showcomment">' +
                    '<div class="s1">' +
                    '<img src=' + el.User.face + ' alt="">' +
                    '<p><span>' + el.User.name + '</span>:' + el.Comments_Content + '</p>' +
                    '<div class="isFocus-a" data-type=1 data-comId=' + el.ID + ' data-id=' + el.User.user_id + '><i class="indexIcon">&#xe619;</i></div>' +
                    '</div>' + isNull(replyCommentDom) +
                    '</div>';
            });
        }
        // 是否点赞
        // var hah ='<div class="heart"></div>';
        // if (t[i].IZan ==1) {
        //     hah = '<div class="heart is-active"></div>'
        // }
        var hah = '<i class="ok indexIcon">&#xe66f;</i>';
        if (t[i].IZan == 1) {
            hah = '<i class="indexIcon">&#xe66f;</i>'
        }
        // 这是整个动态的
        $('.loadMore').before('<div class="ssinfo">' +
            '<div class="publisher">' +
            '<img src=' + Face + ' alt="" />' +
            '<div>' +
            '<p><span>' + t[i].User.name + '  </span>发布了<span>  ' + t[i].ModuleName + '</span></p>' +
            '<p>' + oktime(t[i].AddTime) + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="publishnews">' +
            '<div>' +
            '<p class="new">' + t[i].Title + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="comment">' +
            '<ul>' +
            '<li class="isFocus" data-comId=' + t[i].Id + '>' +
            '<i class="indexIcon">&#xe619;</i><span>评论</span>' +
            '</li>' +
            '<li class="click" data-id=' + t[i].Id + '>' + hah + '<span>赞</span>' +
            '</li>' +
            '<span>已有<span class="nub">' + t[i].ZanCount + '</span>个人赞</span>' +
            '</ul>' +
            // '<div class="stro">'+
            // '<div class="click" data-id='+t[i].Id+'></div>'+hah+
            // '<span>已有<span class="nub">'+t[i].ZanCount+'</span>个人赞</span>'+
            // '</div>'+
            '' + isNull(commentDom) + '<div class="commentdiv">' +
            '<textarea></textarea>' +
            '<a href="javascript:"><i class="layui-icon" style="font-size: 30px; color: #028843;">&#xe60c;</i></a><a class="pinglun" href="javascript:">评论</a>' +
            '</div>' +
            '</div>' +
            '</div>');

    }
}

function eachCom(comList, fuckdom, pId) {
    if (comList && comList.length > 0) {
        $.each(comList, function(index, el) {
            replyCommentDom += ('<div class="s2 com' + el.ID + '">' +
                '<img src=' + el.User.face + ' alt="">' +
                '<p><span>' + el.User.name + ' </span>回复了<span>  ' + el.User.name + '</span>:' + el.Reply_Content + '</p>' +
                '<div class="isFocus-a" data-type=2 data-comid=' + pId + ' data-redid = ' + el.ID + ' data-id =' + el.User.user_id + '><img src="../../img/评论.png" alt="" /></div>' +
                '</div>');
            if (el.ChildReplyList && el.ChildReplyList.length > 0) {
                eachCom(el.ChildReplyList, replyCommentDom, el.ID);
            }
        });
        return replyCommentDom;
    }
}
/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 20:12:22
 * @version $Id$
 */

// news();//第一次记获取通知数量
// asyncRequest();//长连接异步获取通知数量

$(".news").on("click",function(){
    $(this).find(".sj").toggle();
    $(this).find(".news_down").toggle();
})

// 定时器--获取消息评论和点赞数量
 //var timer=setInterval(function(){
 //    news();
 //}, 20000)

function asyncRequest() {
    $.ajax({
        type: "POST",
        url: "/asyncResult.asyn",
        data: "time=1",    //请求的超时时间
        success: function (data) {
            if (data != "") {
                var jdata = JSON.parse(data);
                console.log(data);
                
                $(".news_down .pl ").html('');
                $(".news_down .zan ").html('');
                if (jdata.Data.CommentsCount) {
                    $(".news_down .pl ").html('(' + jdata.Data.CommentsCount + ')');
                }
                if (jdata.Data.ThumbsCount) {
                    $(".news_down .zan ").html('(' + jdata.Data.ThumbsCount + ')');
                }

                if (jdata.Data.ThumbsCount) {
                    $(".news i").show();
                }
            }
            asyncRequest(1); //得到服务器响应后继续发一个请求
        },
        error: function () {

            //asyncRequest(); //服务器抛出错误后继续发送一个请求
        }
    });
}


 //获取消息评论与点赞数量
function news(){
    $.ajax({
        type: "get",
        dataType: "Json",
        url: "/AjaxSays/GetCount",
        async:false,
        success: function(data) {
            $(".news_down .pl ").html('');
            $(".news_down .zan ").html('');
            if (data.Data.CommentsCount) {
                $(".news_down .pl ").html('('+data.Data.CommentsCount+')');
            }
            if (data.Data.ThumbsCount) {
                $(".news_down .zan ").html('('+data.Data.ThumbsCount+')');
            }
            
            if(data.Data.ThumbsCount){
                $(".news i").show();
            }
        }
    });
}
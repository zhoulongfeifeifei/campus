var id = getUrlParam('id'),
ajaxLogsInfo = {
    url:'Blog/LogsInfo',
    data:{
        logsId:id,
        userId:getCookieByUserInfo('userid')
    }
};
commonFn(ajaxLogsInfo,function (data) {
        $('body').append(
            '<p class="text-size" style="text-align:center;font-size:20px !important;padding: 30px 0;">'+
            data.log.logs_Title+'</p>'+
            '<p class="text-left">'+data.log.logs_Content+'</p>'
        );
})

//添加评论





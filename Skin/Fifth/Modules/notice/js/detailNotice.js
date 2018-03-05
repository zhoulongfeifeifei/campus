/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 14:37:56
 * @version $Id$
 */


var Id = getUrlParam('id'),
type =getUrlParam('type');
getInfo(Id);
function getInfo(id) {
    commonFn({
        url: 'MessageNotify/GetModel',
        data: {
            Id: id
        }
    }, function(res) {
//      $('.content h3').text(res.msgTitle);
        $('.fasongren').text(res.signature);
        $('.shijian').text(solveTime(res.inTime))
        $('.neirong').html(res.msgContent);
        if (res.localFileList && res.localFileList.length > 0) {
            $.each(res.localFileList, function(index, el) {
                $('<a href=' + el.fileurl + ' class="fileDown">' + el.filename + '</a>').appendTo('.fujian')
            });
        }
        if (res.yunPanFileList && res.yunPanFileList.length > 0) {
            $.each(res.yunPanFileList, function(index, el) {
                $('<a href='+window.siteHost+' + el.fileurl + ' class="fileDown">' + el.filename + '</a>').appendTo('.yunpan')
            });
        }
        if (type &&  type==1) {
            $('.layui-form').append(
            '<div class="layui-form-item">'+
                '<label class="layui-form-label">已读:</label>'+
                '<div class="layui input-block fujian">'+res.readPeople.join('、')+'</div>'+
            '</div>'+
            '<div class="layui-form-item">'+
                '<label class="layui-form-label">未读:</label>'+
                '<div class="layui input-block fujian">'+res.noReadPeople.join('、')+'</div>'+
            '</div>');
        }
    })
}
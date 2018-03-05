/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-02 17:33:59
 * @version $Id$
 */

layer.load();
// 截取 设置表单url上的ID.
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var id = getUrlParam('id');

if (id) {
    id = {
        id: id
    }
}
$.ajax({
    url: '/AjaxAsset/GetModelAssets',
    data: id,
    success: function(data) {
        if (data.Status == 1) {
            function oktime(isoktime) {
                if (isoktime) {
                    isoktime = eval(isoktime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))
                    isoktime = new Date(isoktime);
                    isoktime = isoktime.getFullYear() + '-' + (isoktime.getMonth() + 1) + '-' + isoktime.getDate() + ' ' + isoktime.getHours() + ':' + isoktime.getMinutes() + ':' + isoktime.getSeconds();
                    return isoktime;
                } else if (isoktime == null) {
                    return ""
                } else {
                    return "";
                }
            }
            $('#DeptCode').html(data.Data.DeptCode);
            $('#AssCode').html(data.Data.AssCode);
            $('#DepreRate').html(data.Data.DepreRate);
            $('#AssName').html(data.Data.AssName);
            $('#DepreYear').html(data.Data.DepreYear);
            $('#AccumDepre').html(data.Data.AccumDepre);
            $('#DepreMonth').html(data.Data.DepreMonth);
            $('#Keeper').html(data.Data.Keeper);
            $('#AssOriginal').html(data.Data.AssOriginal);
            $('#XinZhi').html(data.Data.XinZhi);
            $('#AddType').html(data.Data.AddType);
            $('#ReceiveDate').html(oktime(data.Data.InTime));
            $('#reduceType').html(data.Data.AddType);
            $('#reduceDate').html(oktime(data.Data.DuceTime));
            $('#phone').attr('src', data.Data.AssPhoto)
        } else {
            layer.msg(data.Message)
        }

        setTimeout(function() {
            layer.closeAll('loading');
        }, 300);
    }
})
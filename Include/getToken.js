/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-04-07 11:05:38
 * @version $Id$
 */
document.write("<script src='"+window.apiHost+"Include/base64.js'></script>");
// 请求token数据
function getToken(uname, upass,callback) {
    var b = new Base64();
    var str = b.encode("admin:admin");
    $.ajax({
        url: window.siteHost + window.tokenApi,
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + str);
        },
        data: {
            grant_type: 'password',
            username: uname,
            password: upass
        },
        success: function(res) {
            setCookie(window.tokenKey, res.access_token, window.tokenExpire); 
            callback(res);
        },
        error:function(res){
            callback(res.responseText,1);
        }
    });
}
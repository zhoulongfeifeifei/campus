/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-03-20 15:57:39
 * @version $Id$
 */

function commonFn(ajaxInfo,dom , callback , Token){
    var dataOk,isTrue = true;
    $.ajax({
        url : ajaxInfo.url || '',
        data : ajaxInfo.data || '',
        type : ajaxInfo.type  || 'get' ,
        async : ajaxInfo.async || true ,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+Token);
        },
        success:function(res){
            dom.text(JSON.stringify(res))
            dataOk = res;
            if (typeof callback === "function") {
                callback(res);
            } 
        },error:function(){
           isTrue = false;
        }
    })
    // 因为是异步,走到这里还没有拿到值
    // if (typeof callback === "function") {
    //     console.log(dataOk);
    //     if (isTrue) callback(dataOk);  
    // } 
}

// document.write("<script src='"+window.apiHost+"Include/storage.js'></script>");
// document.write("<script src='"+window.apiHost+"Include/sincere.user.js'></script>");
// 通用的ajax调用方法 返回请求成功之后的数据;
function commonFn(ajaxInfo, callback,errorCallback, Token) {
    var  dataOk, isTrue = true;
    var token = getCookie(window.tokenKey);
    if (!token || token.length <= 10) { console.log("commonFn（） no token"); return }
    (ajaxInfo.url) ? ajaxInfo.url = window.apiUrl + ajaxInfo.url : ajaxInfo.url = ''
    $.ajax({
        url: ajaxInfo.url || '',
        data: ajaxInfo.data || '',
        type: ajaxInfo.type || 'get',
        async: ajaxInfo.async || true,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(res) {
            dataOk = res;
            if (res.status == 1) {
                if (typeof callback === "function") {
                    callback(res.data);
                }
            }else if(res.status == 4){
                //直接去登录页面
            }else if(res.status == 0){
                layer.msg(res.message);
            }else{
                layer.msg(res.message);
            }  
        },
        error: function(res) {
            // layer.msg("请求接口失败");
            layer.msg(res.responseText);
            if (typeof errorCallback === "function") {
                errorCallback(res.data);
            }
            isTrue = false;
        }
    })
}

/*  obj={} 以下是obj的属性
        *  formAccid : 代发人的id, 自己发送就不传;  智校里没有代发, 就不传;
    attach : {
        发送作业的格式
        "type":"homework"
        "subjectname":"信息技术",   学科名称
        "content":"05月02日信息技术作业如下:n测试作业",  消息内容
        "classid":412,  班级id
        "workid":98, //发布作业提交接口返回的有个workid
        "date":1493708590  //获取方法 new Date().getTime();
        
        发通知的格式
        "type":"attach"
        "content":"这里是内容 －－ 徐晓杰 老师",
        "files":"http://sincere-app.oss-cn-hangzhou.aliyuncs.com/Images/76a4bea1a61e485faebef3b0095fbb32.jpg",
        "imageHeight":1920,
        "imageWidth":1152,
        "isSelectedCityCard":false,  //市民卡,传false就好了
        "isGroup":1    接收人数大于1 ,isGroup就是1, 否则传 0

        成绩格式
        "type":"score"
        "title":"",
        subjectid:1,
        classid:412,
        scoreid:1

        考勤
        "type":"attend"
        "title":"",
        "image":"",  这个是传图片的url
        "imagewidth":"",
        "imageheight":""

        系统通知
        "type":"system"
        "content":""

        云表单
        "type":"form"
        "content":"",
        "formid":1,
            
        审批
        "type":"examine"
        "content":"",
        "formid":1

        请假审批
        "type":"leaveexamine"
        "content":"",
        "formid":1
    }

    toAccids : 接受人的id 例:[ "766455","112714","946452"] 

    toReces :  接收者信息，可多个, *发送方式为 --> 信息的时候用到的 例: 
    [
        {
          "class_id": 0,
          "toAccid": "112804",
          "type": 0, 接收者类型，分别为0(班主任)，1(老师)，2(学生)，3(家长),
          "receiveId": 0,  接收者的身份Id，根据类型分别为TeacherId,StudentId,ParentId,
          "toPhone": "15305755683",
          "numType": 0   学校状态码  取的方法window.localStorage.getItem('numtype')
        }
    ]
*/
function sendBatchAttachMsg(obj,callback){
    if (|| !obj.attach || !obj.toAccids) {console.log("信息不全,无法调用!"); return}
    var token = getCookie(window.tokenKey);
    if (!token || token.length <= 10) { console.log("commonFn（） no token"); return }
    obj.attach = JSON.parse(obj.attach);
    obj.attach.msgId = new  Date().getTime();
    obj.attach = JSON.stringify(obj.attach);
    $.ajax({
        url:window.apiUrl+'NimServer/SendBatchAttachMsg',
        data:obj,
        type:'post',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success:function(res){
           callback(res)
        }
    })
}

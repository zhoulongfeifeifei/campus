
function IsLogin(){
    var token = getCookie(window.tokenKey);
    console.log("IsLogin():" + token);
	if(token && token.length>0)return true;
	return false
}

function GetSkin() {
    return getCookie(window.skinKey) || '';
}
//根据皮肤进入主页
function LoginIn()
{
    var skin = GetSkin();
    var path = ""
    if (skin) {
        path = window.pageRoot + "/" + skin;//跳到skin/xx下面的index.html
    } else {
        path = window.pageRoot + "/Fifth";
    }
    //$('#iframe').attr('src', path);
   location.href = path;
}

function LoginCheck(callback) 
{    
    if(IsLogin())
	{
		callback(); 
	}
} 
function getUserId(){
    if(getCookie('userid')){
        return getCookie('userid')
    }
}
function getUserName(){
    if(getCookie('userName')){
        return getCookie('userName')
    }
}

function getCookieByUserInfo(a){
    if (getCookie(window.userObj)) {
        var userInfo = JSON.parse(getCookie(window.userObj));
        if (userInfo) {
            if (a && typeof a == 'string')
                return userInfo[a];
            else
                return userInfo;
        }
    } 
}

/*
获取当前登录人的身份信息; getUserInfo()
通过传来的用户Id 获取这个用户的身份信息 getUserInfo(12)
*/
function getUserInfo(userId){
    if (!userId) userId = $.cookie('userid');
    var ajaxInfo = {
        url : '' , 
        data: userId,
        type: 'post',
        async: false
    }
    commonFn(ajaxInfo,function(res){
        if (res.Status == 1){return res;}
        else{return res.Message;}
    })
}

//备用
/*
0是个人信息
1是学校信息
2是其他
*/
function getInfo(Id,type){
    if (type == 0 && !Id) {Id = $.cookie('userid');}
        else if(type == 1 && !Id){  '给Id 附上默认的学校id'}
    var ajaxInfo = {
        url : '' , 
        data: Id,
        type: 'post',
        async: false
    }
    commonFn(ajaxInfo,function(res){
        if (res.Status == 1){return res;}
        else{return res.Message;}
    })
}

// 第三种
/*
id 是请求ajax传递的参数, 
type :{
    0:个人信息,
    1:学校信息,
    2:其他
}

url:只有type=2的时候用得到
*/
function getInfo(Id, type ,callback , url){
    var ajaxInfo = {}
    switch(type){
        case 0 :
            ajaxInfo.url = '个人信息的url' ;
            if (id) ajaxInfo.data = Id;
            else ajaxInfo.data = $.cookie('userid');
        break;
        case 1 :
            ajaxInfo.url = '学校信息的url' ;
            if (id) ajaxInfo.data = Id;
            else ajaxInfo.data = '默认学校的id';
        break;
        case 2 :
            ajaxInfo.url = url ;
            if (id) ajaxInfo.data = Id;
        break;
    }
    ajaxInfo.type = 'post';
    ajaxInfo.async = false;

    if (typeof callback === "function") {
       ajaxInfo.async = true;
    }

    commonFn(ajaxInfo,function(res){
        if (ajaxInfo.async) {callback(res)}
        else if (res.Status == 1){return res;}
        else{return res.Message;}
    })
}

// 清除token
function clearToken() {
    deleteCookie(window.tokenKey);
    deleteCookie(window.skinKey);
    deleteCookie(window.userObj);
    location.href = window.pageRoot+"/login.html";
}
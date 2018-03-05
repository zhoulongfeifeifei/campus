/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 20:10:14
 * @version $Id$
 */


var id;
id = getUrlParam('id');
if (id) {
    url(parseInt(id));
}
$('#SignOut').on('click', function(event) {
    clearToken();
});
commonFn({
    url: 'Link/GetLinksList',
    type: 'post',
    data: {
        type: 1
    }
}, function(res) {
    if (res.resultData) {
        $.each(res.resultData, function(index, el) {
            $('.logo').after('<a href=' + el.webUrl + ' target="_blank">' + el.title + '</a>');
        });
    }
})
commonFn({
    url: 'School/SchoolInfo',
    data: { schoolId: window.schoolid }
}, function(res) {
    window.localStorage.setItem('numtype', res.numtype);
    window.localStorage.setItem('msgTypes', res.msgTypes)
    
    $('.logo').attr('src', res.logo);
})
getUserInfo();
function getUserInfo() {
    commonFn({
        url: 'Account/CurrentInfo',
        type: 'post',
    }, function(res) {
        $('#userFace').attr('src', res.image ? res.image : 'Common/img/7.png');
        $('.userInfo p').text(res.name)
    })
}
function url(a) {
    switch (a) {
        case 1:
            $('#ifbox').attr('src', 'Tpl/Default/default.html');
            break;
        case 2:
            $('#ifbox').attr('src', 'Tpl/appCenter/ApplicationCenter.html');
            break;
        case 3:
            $('#ifbox').attr('src', 'Tpl/Resource/Resource.html');
            break;
        case 4:
            $('#ifbox').attr('src', 'Modules/MailLists/mailList.html');
            break;
        case 5:
            $('#ifbox').attr('src', 'Tpl/Album/Album.html');
            break;
        case 6:
            $('#ifbox').attr('src', 'Tpl/Journal/Journal.html');
            break;
        case 7:
            $('#ifbox').attr('src', 'Tpl/cloudClassRoom/cloudClassRoom.html');
            break;
        case 8:
            $('#ifbox').attr('src', 'Tpl/userInfo/userInfo.html');
            break;
        case 9:
            $('#ifbox').attr('src', 'Modules/NewsCenter/NewsPL.html?id=1');
            break;
    }
}
// iframe 自适应高度
function iFrameHeight() {
    var ifm = document.getElementById("ifbox");
    var subWeb = document.iframe ? document.iframe["ifbox"].document : ifm.contentDocument;

    if (ifm != null && subWeb != null) {

        ifm.height = subWeb.body.offsetHeight;
    }
}

function gogogo() {
    setInterval(iFrameHeight, 30);
}

/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-11 10:24:02
 * @version $Id$
 */
        $('body,html').animate({scrollTop:0},1000);
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
            }
            var ID = getUrlParam('id');
            var GetPhoto={
            	url: '/Album/GetPhoto',
                data: { id: ID},
                type:'get'
            }
            commonFn(GetPhoto,function(data){
            	 $('.pic').append('<img src="'+ data.photoUrl +'"/>');
            })

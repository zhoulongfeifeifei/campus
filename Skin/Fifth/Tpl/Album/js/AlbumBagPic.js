/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-11 10:24:02
 * @version $Id$
 */
        $('body,html').animate({scrollTop:0},1000);
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
                var r = window.location.search.substr(1).match(reg); //ƥ��Ŀ�����
            if (r != null) return unescape(r[2]);
            return null; //���ز���ֵ
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

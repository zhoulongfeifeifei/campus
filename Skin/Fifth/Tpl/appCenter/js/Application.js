/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-04 09:19:01
 * @version $Id$
 */

commonFn({url:'Common/GetUserMenuList?schoolId='+getCookieByUserInfo('schoolid')+'&loginType='+getCookieByUserInfo('logintype'),type:'post'},function(res){
    if (res && res.length > 0) {
        $.each(res,function(i, el) {
            if (el.showAppCenter == 1) {
                var appcenterDom = ''  
                if (el.children && el.children.length) {
                   $.each(el.children ,function(ii, ell){
                        var Target ,url ,IcoUrl ;
                        var name = encodeURI(ell.moduleName);
                        if (ell.target ==1) {
                            // Target = 'target="_blank"';
                            url = ell.moduleUrl;
                        }else{
                            // Target = '' ;
                            url = '../childPage/top_nav.html?id='+ell.moduleId+'&&name='+name
                        }
                        if (!ell.icoUrl) {
                            IcoUrl ="&#xe628;";
                        }else{
                            IcoUrl = ell.icoUrl
                        }
                        if(ell.showAppCenter ==1){
                            appcenterDom +='<li><a target="_blank" href="'+url+'"><span><i class="appInco">'+IcoUrl+'</i></span><p>'+ell.moduleName+'</p></a></li>'
                        }
                        
                    }) 
                }  
                $('body').append('<div data-moduleId="'+el.moduleId+'" class="content"><p><span>'+el.moduleName+'</span></p><ul>'+appcenterDom+'</ul></div>')
            }
        });
    }
    $('.content ul li a img').height($('.content ul li a img').width()*0.75);
})

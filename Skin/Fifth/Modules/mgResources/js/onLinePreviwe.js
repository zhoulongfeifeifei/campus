/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-02-22 09:54:33
 * @version $Id$
 */
var GetUserID=getCookieByUserInfo("userid");
if (GetUserID){
	var Id = getUrlParam('id'),
	Surl = getUrlParam('Surl'),
	type =Surl.substring(Surl.lastIndexOf('.') + 1),
	$url = '/SchoolResources/Change2Swf';
	if (type=="txt" || type=="png" || type=="jpg"  || type=="gif" || type=="gif" || type=="jpeg" ) {
		window.location.href=Surl;
	}else{
		var AddResType = {
			url:$url,
			data: {fileid :Id,schoolid:window.schoolid},
			type: "get"
		};
		commonFn(AddResType, function(data) {
	    	Surl = '';
	        $('iframe').attr('src',data);
   	 	})
	}
}else{
	layer.msg("需登录");
}

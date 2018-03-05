/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 15:14:07
 * @version $Id$
 */
var Id = getUrlParam('id');
getInfo(Id);
function a(){
    getInfo(id);
}
function b(){
    getInfo(id);
}
function getInfo(id){
	var GetArticle ={url:"Portal/GetArticle", data:{
		Id:id,
		schoolid:window.schoolid
	},type:"get"};
	commonFn(GetArticle,function(data){
            $('.content h3').text(data.articleInfo.title);
            $('.author').text(data.articleInfo.userId);
            $('.demiddle').html(data.articleInfo.content);
            $('.readnum span').text(data.articleInfo.clickNum);
            $('defoot ul li:eq(0) span').text();
            $('defoot ul li:eq(1) span').text();
    })   
}

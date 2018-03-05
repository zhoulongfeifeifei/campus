/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-11 10:22:36
 * @version $Id$
 */
var layer = layui.layer;
$('body,html').animate({scrollTop:0},1000);
var index = window.parent.layer.getFrameIndex(window.name); //获取窗口索引
function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
    }
var ID = getUrlParam('id');
getphotolist(ID);
    
//图片展示
function getphotolist(ID){
	 $('.album_c').empty();
	 var GetPhotosList={
	 	 url: '/Album/GetPhotosList',
        async: false,
        data: {albumId:ID},
        type:'get'
	 }
	 commonFn(GetPhotosList,function(data){
	 	 alid = data.albumId;
	 	 for (var i = 0; i < data.resultData.length; i++) {
            var photourl;
            photourl = data.resultData[i].photoUrl;
            $('<li data-pootoid=' + data.resultData[i].id + '><a target="_self"><img src="' + photourl + '" alt=""></a></li>').appendTo('.album_c')
        }
	 })
}
             
$('.album_c li img').on('click',function(){
    var UpdateFace={
    	url: '/Album/UpdateFace',
        type:'get',
        data: { albumid: 8,id: 120}
    };
    commonFn(UpdateFace,function(data){
    })

    parent.layer.close(index);
 }) 

//var uploader = new plupload.Uploader({
//      runtimes: 'html5,flash,silverlight,html4',
//      browse_button: 'pickfiles',
//      url: '/AjaxAsset/ImportAssets',
//      multi_selection: false,
//      filters: {
//          max_file_size: '10mb',
//          mime_types: [
//              { title: "Excel", extensions: "xls" }
//          ]
//      },
//      flash_swf_url: '../../js/plupload/Moxie.swf',
//      silverlight_xap_url: '../../js/plupload/Moxie.xap',
//      init: {
//          PostInit: function() {
//          },
//          BeforeUpload: function(up, file) {
//              $("#pickfiles").attr("disabled", true);
//          },
//          FilesAdded: function(up, files) {
//              uploader.start();
//          },
//          FileUploaded: function(up, file, data) {
//              var json = eval("(" + data.response + ")");
//              $("#pickfiles").removeAttr("disabled");
//              $("#pickfiles").text("上传模板");
//              if (json.Status == 1) {
//                  uploader.removeFile(file);
//                  layer.msg('上传成功',{
//                      shift:3
//                  })
//              } else {
//                  // top.parent.showTips("发布失败。" + json.Message, 5);
//              }
//          },
//          UploadProgress: function(up, file) {
//              $("#pickfiles").text(file.percent + "%");
//          },
//          Error: function(up, err) {
//              // top.parent.showTips("发布失败。" + err.message, 5);
//              $("#pickfiles").removeAttr("disabled");
//              $("#pickfiles").text("上传模板");
//          }
//
//      }
//  });
//  uploader.init();
//layui.use('upload', function(){
//layui.upload({
//  url: 'Assets/ImportAsset'
//  ,elem: '#pickfiles' //指定原始元素，默认直接查找class="layui-upload-file"
//  ,method: 'get' //上传接口的http类型
//  ,success: function(res){
//  	console.log(res);
//  }
//});
//});
//上传文件
//	layui.upload({
//	    url:window.apiUrl+'Common/UploadFile',
//	    type:'file',
//	    before:function(input){
//	    	fileName=input.files[0].name;
//	    },
//	    success:function(res){
//	        $('#txtfiles').val(fileName);
//	      layer.msg('上传成功'); 			 			 
//	    }
//	})
	 
var schoolid = getCookieByUserInfo('schoolid');
//下载模板
$('.layui-tab').on('click',".link",function () {
    window.location.href = window.siteHost+"Filedown/GetModelTemplate?alias=assets";      
});
	//上传文件
	layui.upload({
	    url:window.apiUrl+'Common/UploadFile',
	    type:'file',
	    before:function(input){
	    	fileName=input.files[0].name;
	    },
	    success:function(res){
	        $('#txtfiles').val(fileName);
	//      layer.msg('上传成功'); 
			var ImportAssets={
				url:'/Assets/ImportAssets',
				data:{
					schoolId:schoolid,
					fileUrl:res.data[0]
				},
				type:'get'
			}
			commonFn(ImportAssets,function(data){
				layer.msg('上传成功');
				 setTimeout(function(){
							window.history.go(-1); 
						 },800);
			})
	    }
	})
//function getFileName(u){
//  var arr = u.split('/');
//  return arr[arr.length-1];
//}
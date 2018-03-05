var layer = layui.layer,
	laypage = layui.laypage,
/*****************获取栏目信息**********************/
ajaxinfor={};
var schoolid = getCookieByUserInfo('schoolid');
if(window.location.href.indexOf("?") > -1) {
	$(".page_title span").html("编辑教材");
	ajaxinfor.type='post';
	ajaxinfor.url = "Resource/UpdateResBook";
	var num = window.location.href.split("?")[1];
	var nums = num.split("=")[1];

	$("#id").val(nums);
	//					$.ajax({
	//							type: "post",
	//							dataType: "Json",
	//							data: {id: nums},
	//							url: "/AjaxResourse/GetResBook",
	//							success: function(data) {
	//								var data = data.Data;
	//								for(key in data) {
	//									$("#"+key).val(data[key]);
	//								}
	//								
	//							}
	//					})
	/*调用"得到一个资源教材"接口*/
	var ajaxGetResBook =  {
		url: 'Resource/GetResBook',
//		type: 'get',
		data: {
			id: nums,
			schoolId:schoolid
		}
	}
	commonFn(ajaxGetResBook, function(data) {
		var data = data.data;
		$('#Name').val(data.name);
	});
} else {
	$(".page_title span").html("添加教材");
	ajaxinfor.url = "Resource/AddResBook";
	ajaxinfor.type= 'post';
}

///保存
layui.form().on('submit(Sava)', function() {
	var o = {};	
	o.name = $("input[name='Name']").val();
	o.schoolId = 1;
	o.id = nums;

	ajaxinfor.data = o;
	ajaxinfor.type = 'post';
	commonFn(ajaxinfor,  function(data){
		location.href = "BookLists.html?id=42";
	})
})
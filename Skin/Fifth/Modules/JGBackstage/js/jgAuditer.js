/**
 * 
 * @authors ph 
 * @date    2017-12-08 17:54:19
 * @version $Id$
 */

var num = window.location.href.split("?")[1];
var nums = num.split("=")[1];
 gette();
function gette(){
    var reauload= layer.load();
    var GetResAuditor = {
		url: "Portal/GetResAuditor",
		data: { catalogid :nums,schoolid:window.schoolid},
		type: "get"
		};
	commonFn(GetResAuditor, function(data) {
        layer.close(reauload);
        // 循环选中老师的列表
        $('#teacherAdmin').empty();
        for (var i = 0; i < data.length; i++) {
            $('#teacherAdmin').append('<span class="ad"><span class="btn btn-blue" style="padding:5px 10px;background-color:#009688;color:#fff;position:relative;">' + data[i].teacherName + '</span><i style="top: -10px;right: -6px;font-size: 10px;color: red"  onclick="remobeAdmin(' + data[i].customerId + ')" class="Icon red removeAdmin">&#xe66c;</i></span>');
        }
            
    })
}
var reauload2= layer.load();
var GetTeacherListBySchool = {
		url: "Teacher/GetTeacherList",
		data:{schoolId:window.schoolid,status:1,isout:0},
		type: "post"
	};
commonFn(GetTeacherListBySchool, function(data) {
    layer.close(reauload2);
    var data=data.resultData;
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            $('#idselect').append('<option value="'+data[i].teacherId+'">'+data[i].name+'</option>');
        }
        form.render();
    }
    
})
	

//保存
$('#add').click(function(){
    var sVal = $('#idselect').val();
//  var AddCatalogAuditor = {
//		url: "Portal/AddCatalogAuditor",
//		data:{teacherid:sVal,catalogid:nums,schoolid:window.schoolid},
//		type: "post"
//	};
//	commonFn(AddCatalogAuditor, function(data) {
//          layer.msg("添加成功",{time:1000},function(){
//          	gette();   
//          })
//             
//  });
 	var token = getCookie(window.tokenKey);
	$.ajax({
		type: "post",
		dataType: "Json",
		url: window.apiUrl+"Portal/AddCatalogAuditor",
		data:{teacherid:sVal,catalogid:nums,schoolid:window.schoolid},
		beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
		success: function(data) {
			
		},
		complete:function(){}
	})
})

function remobeAdmin(id){
    var reauload = layer.load();
    layer.confirm('确定删除该管理人员？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var DeleteCatalogAuditor ={url:"Portal/DeleteCatalogAuditor?teacherid="+id+"&catalogid="+nums+"&schoolId="+window.schoolid,type:"DELETE"};
	  commonFn(DeleteCatalogAuditor,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		gette();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}
    
function onComplete(obj) {
    
}
/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:45:49
 * @version $Id$
 */


getList();
function getList(){
	var getlistload = layer.load();
	var GetSubjectTypeList = {
		url: "OpenCourse/GetSubjectTypeList?schoolid="+getCookieByUserInfo('schoolid')
	};
	commonFn(GetSubjectTypeList, function(result) {
		layer.close(getlistload);
		var tbody = "";
		for(var i = 0; i < result.length; i++) {
			tbody += "<tr><td>" +(i + 1) +"</td>" +
				"<td>" +result[i].typeName +"</td>" +
				"<td class='edit'>" +
				"<a class='layui-btn layui-btn-mini' href='javascript:editOrAnd(" +result[i].id +")' title='编辑'>编辑</a>" +
				"<a class='layui-btn layui-btn-mini layui-btn-danger' onclick='deleteData("+result[i].id+")' title='删除'>删除</a>" +
				"</td>" +
				"</tr>";
		}
		$('tbody').html(tbody);
	},function(){
		console.log("error");
		layer.close(getlistload);
	})
}

//删除
function deleteData(id){
	layer.confirm("确认删除学科？请谨慎操作，删除后无法恢复。", function() {
		var reload = layer.load();
		var DelSubjectType = {
			url: "OpenCourse/DelSubjectType?id=" +id,
			type: "delete"
		};
		commonFn(DelSubjectType, function(json) {
			layer.msg("删除成功");
			getList()
		},function(){
			layer.close(reload);
		});
	})
}
function editOrAnd(id){
	id = id ? id : 0;
	layer.open({
		type:'1',
		content:$('#form1'),
		btn:["确定","取消"],
		success:function(){
			var GetSubjectType = {
				url: "OpenCourse/GetSubjectType",
				data: {id: id},
			};
			commonFn(GetSubjectType, function(result) {
				$('#typename').val(result.typeName);
			})
		},
		yes:function(index,layero){
			var savaLoad = layer.load();
			commonFn({url:'OpenCourse/EditSubjectType' ,type:'post',data:{
				id:id,
				schoolId : getCookieByUserInfo('schoolid'),
				typeName :$('input[name="TypeName"]').val()
			}},function(){
				layer.close(savaLoad);
				layer.close(index);
				getList();
			},function(){
				layer.close(savaLoad);
			})
			return false;
		}
	})
	
}


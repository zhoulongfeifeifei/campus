var JiaoCaiId;
var GradeId;
var SubjectId;
var menu;
var actionNodeID;
var actionNodeName;
var schoolid = getCookieByUserInfo('schoolid');
/************锁定*******************/
$("body").on("click", "#sd", function(){
	layer.confirm('您确定要锁定吗?锁定后无法修改',{icon:3,title:'提示'},function(index){
		$("input[name='sd']").val(1);
		$("#form88 select").attr("disabled", "disabled");
		JiaoCaiId = $("#JiaoCaiId").val();
		GradeId = $("#GradeId").val();
		SubjectId = $("#SubjectId").val();
		$("input[name='JiaoCaiId']").val(JiaoCaiId);
		$("input[name='GradeId']").val(GradeId);
		$("input[name='SubjectId']").val(SubjectId);
//		if(JiaoCaiId==undefined){
//			layer.msg('请选择',{time:1000});
//		}else{}
		layui.form().render();
		layer.close(index);
		navlist();	
	})
});
//添加章节前判断是否锁定
$("#addzj").on("click", function() {
	$("#form99 input[name='Name']").val('');
	var zt = $("input[name='sd']").val();
	if(zt == 0) {
		layer.msg("请先点击锁定按钮，锁定以上选择的信息!");
	} else {
		//如果锁定状态则出现弹窗
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.open({
				type: 1,
				btn: ['保存', '取消'],
    			btn1:function(){
    				var addName=$("#form99 input[name='Name']").val();
    				var AddResChapter = {
						url: "Resource/AddResChapter",
						data:{
							name:addName,
							jiaocaiid: JiaoCaiId,
							gradeid: GradeId,
							subjectid: SubjectId,
							schoolId:schoolid,
							pid:0
						},
						type: 'post'
					}
					commonFn(AddResChapter,function(data) {
						layer.msg('保存成功',{time:1000},function(){
							layer.closeAll();
							navlist();	 
						});
					});	
    			},
				anim: 1,
				shadeClose: true,
				btn:['保存','关闭'],
				//		  skin: 'layui-layer-rim', //加上边框
				area: ['600px', '260px'], //宽高
				content: $('.layer-box')
			});
		})
	}
})
/*****************获取教材,年级,学科名称信息**********************/
var aa = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if(o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
}
//获取教材名称
var GetListResBook = {
	url: "Resource/GetListResBook",
	data:{schoolId:schoolid},
	type: 'get'
}
commonFn(GetListResBook, function(data) {
	$.each(data, function(i, n) {
		$("#JiaoCaiId").append("<option value='" + n.id + "'>" + n.name + "</option>");
	})
	layui.form().render();


});
//获取年级名称
var GradeList = {
	url: 'SchoolResources/GetListResGrade',
	data:{schoolId:schoolid},
	type: 'get'
}
commonFn(GradeList, function(data) {
	$.each(data, function(i, n) {
		$('#GradeId').append("<option value='" + n.id + "'>" + n.name+ "</option>");
	})
	layui.form().render();

});
//获取科目名称
var GetSubjectList = {
	url: 'OpenCourse/GetSubjectList',
	data:{schoolId:schoolid},
	type: 'get'
}
commonFn(GetSubjectList, function(data) {
	$.each(data, function(i, n) {
		$('#SubjectId').append("<option value='" + n.subject_id + "'>" + n.subject_name+ "</option>");
	})
	layui.form().render();

});
/******************章节目录*****************/
function navlist() {
	var ajaxGetAllChapterTree = {
		url: 'Resource/GetAllChapterTree',
		type: 'get',
		data: {
			jiaocaiid: JiaoCaiId,
			gradeid: GradeId,
			subjectid: SubjectId,
			schoolId:schoolid,
			id:1
		}
	}
	commonFn(ajaxGetAllChapterTree, function(data) {
		 menu = $.ligerMenu({
			top: 100,
			left: 100,
			width: 200,
			items: [{
					text: '增加子栏目',
					click: add
				},
				{
					line: true
				},
				{
					text: '删除',
					click: dele
				}
			]
		});
		$('#navigation').ligerTree({
			data: data,
			checkbox: false,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onContextmenu: function(node, e) {
				actionNodeName = node.data.text;
				actionNodeID = node.data.id;
				Pid = node.data.pid;
				Pname = node.data.parentname;
				menu.show({
					top: e.pageY,
					left: e.pageX
				});
				return false;
			}
		})
	})
}
function add() {
	$("#form99 input[name='Name']").val('');
	$("#form99 input[name='pid']").val(actionNodeID);
	$("#pid").val(actionNodeName);
		layer.open({
				type: 1,
				btn: ['保存', '取消'],
				title:'增加子章节',
				anim: 1,
				shadeClose: true,
				//		  skin: 'layui-layer-rim', //加上边框
				area: ['600px', '260px'], //宽高
				content: $('.layer-box'),
				btn1:function(){
    				var addName=$("#form99 input[name='Name']").val();
    				var PID=$("#form99 input[name='pid']").val();
    				var AddResChapter = {
						url: "Resource/AddResChapter",
						data:{
							name:addName,
							jiaocaiid: JiaoCaiId,
							gradeid: GradeId,
							subjectid: SubjectId,
							schoolId:schoolid,
							pid:PID
						},
						type: 'post'
					}
					commonFn(AddResChapter,function(data) {
						layer.msg('保存成功',{time:1000},function(){
							layer.closeAll();
							navlist();	 
						});
					});	
    			}
			});
}

function dele() {
		layer.confirm('你确定要删除该栏目吗？',{icon:3,title:'提示'},function(index){
			var  DeleteResChapter = {
				type:'delete',
				url:"Resource/DeleteResChapter?id="+actionNodeID+"&schoolId="+schoolid+""
			}
			commonFn(DeleteResChapter,function(data) {
				layer.msg("删除成功",{time:1000},function(){
						navlist();
					});
			}); 
			layer.close(index);
		});
}
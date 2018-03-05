	var layer = layui.layer,
	laypage = layui.laypage;
	var JiaoCaiId = localStorage.getItem("JiaoCaiId");
	var GradeId = localStorage.getItem("GradeId");
	var SubjectId = localStorage.getItem("SubjectId");
	var jiaocaiName = localStorage.getItem("jiaocaiName");
	var menu;
	var actionNodeID;
	var actionNodeName;
	var Pid;
	var Pname;
	var Url;
	var schoolid = getCookieByUserInfo('schoolid');
	$("input[name='JiaoCaiId']").val(JiaoCaiId);
	$("input[name='GradeId']").val(GradeId);
	$("input[name='SubjectId']").val(SubjectId);
	$("#jiaocaiName").html(jiaocaiName);
//	var JiaoCaiId=$("input[name='JiaoCaiId']").val(JiaoCaiId);
//	var GradeId=$("input[name='GradeId']").val(GradeId);
//	var SubjectId=$("input[name='SubjectId']").val(SubjectId);
	/***********添加顶级知识点按钮的弹窗事件*************/
	$('#tdz').on('click',function(){
		layer.open({
				type: 1,
				title:'新增知识点',
				anim: 1,
				shadeClose: true,
				btn:['保存','关闭'],
				area: ['600px', '260px'],
				content: $('.layer-box'),
				btn1:function(){
    				var addName=$("#form99 input[name='Name']").val();
    				var AddResKnowledge = {
						url: "TKResource/AddResKnowledge",
						data:{
							name:addName,
							jiaoCaiId: JiaoCaiId,
							gradeid: GradeId,
							subjectid: SubjectId,
							schoolId:schoolid,
							pid:0
						},
						type: 'post'
					}
					commonFn(AddResKnowledge,function(data) {
						layer.msg('保存成功',{time:1000},function(){
							layer.closeAll();
							navlist();	 
						});
					});	
    			},
			});
	})
	/**************班级列表信息显示*********************/
	var index = 1;
	navlist();
//	$('#form i').on('click',function(){
//		alert(11);
//	});
	function navlist() {
		var ajaxGetAllKnowledgeTree = {
		url: 'TKResource/GetListResKnowledgeTree',
		type: 'get',
		data: {
			jiaocaiid: JiaoCaiId,
			gradeid: GradeId,
			subjectid: SubjectId,
			schoolId:schoolid
		}
	}
	commonFn(ajaxGetAllKnowledgeTree, function(data) {
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
				},
				{
					text: '编辑',
					click: edit
				},
				{
					text: '移动',
					click: move
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
	$(".addnigao").on("click", function() {
		Url = "TKResource/AddResKnowledge?schoolid="+schoolid;
	})
//添加
	function add() {
		$("#parent").show();
		$("#form99 input[name='Name']").val('');
		$("#form99 input[name='pid']").val(actionNodeID);
		$("#pid").val(actionNodeName);
		layer.open({
				type: 1,
				btn: ['保存', '取消'],
				title:'增加子类',
				anim: 1,
				shadeClose: true,
				//		  skin: 'layui-layer-rim', //加上边框
				area: ['600px', '260px'], //宽高
				content: $('.layer-box'),
				btn1:function(){
    				var addName=$("#form99 input[name='Name']").val();
    				var PID=$("#form99 input[name='pid']").val();
    				var AddResChapter = {
						url: "TKResource/AddResKnowledge",
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
//移动
	function move() {
		$("#form88 input[name='Id']").val(actionNodeID);
		$("#form88 input[name='Name']").val(actionNodeName);
		movelist();
		layer.open({
			type: 1,
				btn: ['保存', '取消'],
				anim: 1,
				title:'移动知识点',
				shadeClose: true,
				//		  skin: 'layui-layer-rim', //加上边框
				area: ['600px', '260px'], //宽高
				content: $('.modal'),
				btn1:function(){
    				if($("#form88 input[name='Pid']").val() === $("#form88 input[name='Id']").val()) {
						layer.msg('不能移动到自身下边');
					} else {
					var PID=$("#form88 input[name='Pid']").val();
					var ID=$("#form88 input[name='Id']").val();
					var moveName=$("#form88 input[name='Name']").val();
					var ajaxinfor = {
						url:'TKResource/UpdateResKnowledge',
						data:{
							id:ID,
							schoolId:schoolid,
							name:moveName,
							pid:PID
							
						},
						type:'post'
					}
					
					commonFn(ajaxinfor, function(data) {
						layer.msg('保存成功',{time:1000},function(){
							layer.closeAll();
							navlist();	 
						});
					})

			}
    			}
		})
	}
//编辑
	function edit() {
		$("#parent").hide();
		$("#form99 input[name='Name']").val(actionNodeName);
		$("#form99 input[name='id']").val(actionNodeID);
		$("#form99 input[name='pid']").val(Pid);
		layer.open({
			type: 1,
				btn: ['保存', '取消'],
				anim: 1,
				shadeClose: true,
				area: ['600px', '260px'], //宽高
				content: $('.layer-box'),
				btn1:function(){
					var PID=$("#form99 input[name='pid']").val();
					var addName=$("#form99 input[name='Name']").val();
					var UpdateResChater={
						url:'TKResource/UpdateResKnowledge',
						data:{
							id:actionNodeID,
							name:addName,
							jiaocaiid: JiaoCaiId,
							gradeid: GradeId,
							subjectid: SubjectId,
							schoolId:schoolid,
							pid:PID
						},
						type: 'post'
					}
					commonFn(UpdateResChater,function(data) {
						layer.msg('保存成功',{time:1000},function(){
							layer.closeAll();
							navlist();	 
						});
					});	
				}
		})
	}
//删除	
function dele() {
	layer.confirm('你确定要删除该栏目吗？',{icon:3,title:'提示'},function(index){
		var  DeleteResChapter = {
			type:'get',
			url:"TKResource/DeleteResKnowledge?id="+actionNodeID+"&schoolId="+schoolid+""
		}
		commonFn(DeleteResChapter,function(data) {
			layer.msg("删除成功",{time:1000},function(){
					navlist();
				});
		}); 
		layer.close(index);
	});
}
//移动
function movelist() {
	var GetAllChapterTree = {
		url: 'TKResource/GetListResKnowledgeTree',
		type: 'get',
		data: {
			jiaocaiid: JiaoCaiId,
			gradeid: GradeId,
			subjectid: SubjectId,
			schoolId:schoolid,
			id:actionNodeID
		}
	}
	commonFn(GetAllChapterTree, function(data) {
		$("#yi_ul").ligerTree({
			data: data,
			checkbox: true,
			single: true,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onCheck: function(node, checked) {
				$("#form88 input[name='Pid']").val(node.data.id);
			}
		})
	})
}


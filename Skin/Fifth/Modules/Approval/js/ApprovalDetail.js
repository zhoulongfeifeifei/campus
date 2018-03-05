/*****************获取详情信息**********************/
var Id = localStorage.getItem("Id");
var olduserid = getCookieByUserInfo('userid'),
getData = layer.load();
var GetModelApprove ={url:"Examine/GetExamine",type:"post",data: {
			ExamId: Id,
			schoolId:window.schoolid
		}
	};
commonFn(GetModelApprove,function(data){
		layer.close(getData);
		    $("#spTitle").text("来自"+data.fromUserName+"的"+data.modelTitle+"审批");
			$("#SchoolName").html(data.schoolName);
			for (key in data) {
				$("#" + key).html(data[key]);
			}
			if (data && data.inTime) {
				$("#InTime").html(solveTime(data.inTime));
			}
			if(data.modelData){
				var modelData=eval('(' + data.modelData + ')');
				$.each(modelData, function(i, n) {
					$("#tbody").append('<tr>' + Controls(n.Type, n.Title, n.Value, n.Items.length + 1) + '</tr>');
					if (n.Type == 8) {
						$.each(n.Items, function(k, v) {
							if (v.Type == 5) {
								v.Value = (v.Items)[0].Value + '~' + (v.Items)[1].Value;
							}
							$("#tbody").append('<tr>' + Controls(v.Type, v.Title, v.Value) + '</tr>');
						})
					}
				})
			}
			$("#tbody").append('<tr>' +
				'<td class="title">审批人</td><td class="spr"></td>' +
				'</tr>');
			if(data.stepList.length>0){
				$.each(data.stepList,function(i,n){
					if(n.userId==olduserid){
						if (n.state == 1||n.state == 5) {
					        $("a[data-id='f_yes']").removeClass("yinc");
					        $("a[data-id='f_no']").removeClass("yinc");
					        $("a[data-id='f_zj']").removeClass("yinc");
					    }
					}
					if(i=="0"){
						htm=solveTime(n.inTime) + '&nbsp;' + n.userName + '&nbsp;' +getstate(n.state)+"<br/>";
					}else{
						htm+=solveTime(n.inTime) + '&nbsp;' + n.userName + '&nbsp;' +getstate(n.state)+"<br/>";
					}
				})
				$(".spr").html(htm);
			}
			$("#tbody").append('<tr>' +
				'<td class="title">抄送人</td><td class="csr"></td>' +
				'</tr>');
			if(data.chaoSongList.length>0){
				var htm='';
				$.each(data.chaoSongList,function(i,n){
					if(i=="0"){
						htm=solveTime(n.inTime) + '&nbsp;' + n.userName + '&nbsp;' +getcsstate(n.state)+"<br/>";
					}else{
						htm+=solveTime(n.inTime) + '&nbsp;' + n.userName + '&nbsp;' +getcsstate(n.state)+"<br/>";
					}
				})
				$(".csr").html(htm);
			}
})
function getstate(state){
	switch (state){
		case 0:
		return ""
			break;
		case 1:
		return "审批中"
			break;
		case 2:
		return "审批完成同意"
			break;
		case 3:
		return "撤回"
			break;
		case 4:
		return "审批完成拒绝"
			break;
		case 5:
		return "转交中"
			break;
		case 6:
		return "已转交"
			break;
	}
}
	function getcsstate(state){
	switch (state){
		case 0:
		return "未开始"
			break;
		case 1:
		return "抄送中"
			break;
		case 2:
		return "抄送同意"
			break;
		case 3:
		return "撤销"
			break;
		case 4:
		return "抄送拒绝"
			break;
		case 5:
		return "转交中"
			break;
		case 6:
		return "已转交"
			break;
	}
}
	
/******定义控件类型********/
function Controls(Types, Title, Value, num) {
	var Type=Number(Types);
	switch (Type) {
		case 0:
			return '<td class="title">' + Title + '</td><td colspan="2">' + Value + '</td>';
			break;

		case 1:
			return '<td class="title">' + Title + '</td><td colspan="2">' + Value + '</td>';
			break;

		case 2:
			return '<td class="title">' + Title + '</td><td colspan="2">' + Value + '</td>';
			break;

		case 3:
			return '<td class="title">' + Title + '</td><td colspan="2">1</td>';
			break;

		case 4:
			return '<td class="title">' + Title + '</td><td colspan="2">1,2</td>';
			break;

		case 5:
			return '<td class="title">' + Title + '</td><td colspan="2">' + Value + '</td>';
			break;

		case 6:
			return '<td class="title">' + Title + '</td><td colspan="2" >' + Value + '</td>';
			break;

		case 7:
			return '<td class="title">' + Title + '</td><td colspan="2"><img src="' + Value + '"/></td>';
			break;

		case 8:
			return '<tr><td class="title" rowspan="' + num + '"> ' + Title + ' 1</td><td colspan="2"></td></tr>';
			break;

	}
}

///头部下载
function xiazai() {
	location.href = window.siteHost+"ExamineDownload/ExamineDetailDownload?url="+window.siteHost+"Web/Skin/Fifth/Modules/Approval/DetailDownload.html?id="+Id+"&title=审批详情&schoolid="+window.schoolid;
}

//打印
function onprint() {
	var html = $("#form-data").html();
	printHtml(html);
}
//状态操作
//同意
$("a[data-id='f_yes']").on("click",function() {
	layer.confirm('你确定要同意该条审批吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
		var chexiaoload = layer.load();
		  var dele ={url:"Examine/PostExamineDetail",data:{
					ExamId: Id,
					State:2,
					schoolid:window.schoolid
				},type:"post"};
		  commonFn(dele,function(data){
		  	layer.close(chexiaoload);
				layer.msg("执行成功", {
					time: 1000
				}, function() {
					window.location.href = "ReceivedApproval.html";
				});
		  })
	})
})
//不同意
$("a[data-id='f_no']").on("click",function() {
	layer.confirm('你确定要拒绝该条审批吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
		var chexiaoload = layer.load();
		  var dele ={url:"Examine/PostExamineDetail",data:{
					ExamId: Id,
					State:4,
					schoolid:window.schoolid
				},type:"post"};
		  commonFn(dele,function(data){
		  	layer.close(chexiaoload);
				layer.msg("执行成功", {
					time: 1000
				}, function() {
					window.location.href = "ReceivedApproval.html";
				});
		  })
	})
})

//转交
$("a[data-id='f_zj']").on("click",function() {
	layer.open({
	  type: 2,
	  title: '选择抄送人',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['500px', '90%'],
	  content: window.siteHost+'Web/Skin/Fifth/Common/Receiver/Receiver.html?state=1' ,
	  btn: ['确定', '取消'],
	  yes:function(index,layor){
	  	var UserID = $(layor).find("iframe").contents().find("#Peoples .teacher").attr("data-id");
	  	if(UserID==olduserid){
	  		layer.msg("不能转交给自己",{time:2000});
	  	}else{
		  	var dele ={url:"Examine/ChangeExamineDetail",data:{
						ExamID:Id,
						UserId:UserID,
						OldUserId:olduserid,
						schoolid:window.schoolid
					},type:"post"};
			  commonFn(dele,function(data){
				layer.msg("转交成功",{time:1000},function(){
					window.location.href="ReceivedApproval.html";
				});
			})
	  	}
	  },
	  btn2:function(){
	  	layer.closeAll();
	  }
	}); 
})
/*****************获取详情信息**********************/
var roIds = window.location.href.split("?")[1];
var Id = roIds.split("=")[1];
getData = layer.load();
var GetModelApprove ={url:"Examine/GetExamine",type:"post",data: {
			ExamId: Id,
			schoolId:window.schoolid
		}
	};
commonFn(GetModelApprove,function(data){
	layer.close(getData);
    $("a[data-id='s_xg']").attr('href',"LaunchApproval.html?id="+data.id);
    if (data.state == 1) {
        $("a[data-id='s_ch']").removeClass("yinc");
    }else if(data.state == 3 || data.state == 4){
    	 $("a[data-id='s_sc']").removeClass("yinc");
    }
    $("#spTitle").text("来自"+data.fromUserName+"的"+data.modelTitle+"审批");
	$("#SchoolName").html(data.schoolName);
	for (key in data) {
		$("#" + key).html(data[key]);
	}
	if (data && data.inTime) {
		$("#InTime").html(solveTime(data.inTime));
	}
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
	
	$("#tbody").append('<tr>' +
		'<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">审批人</td><td class="spr" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;"></td>' +
		'</tr>');
	if(data.stepList.length>0){
		$(".spr").html(solveTime(data.stepList[0].inTime) + '&nbsp;' + data.stepList[0].userName+ '&nbsp;' +data.stepList[0].stateName);
	}
	$("#tbody").append('<tr>' +
		'<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">抄送人</td><td class="csr" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;"></td>' +
		'</tr>');
	if(data.chaoSongList.length>0){
		$(".csr").html(solveTime(data.chaoSongList[0].inTime) + '&nbsp;' + data.chaoSongList[0].userName + '&nbsp;' +data.chaoSongList[0].stateName);
	}
})

/******定义控件类型********/
function Controls(Types, Title, Value, num) {
	var Type=Number(Types);
	if(Type==0){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Value + '</td>';
	}else if(Type==1){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Value + '</td>';
	}else if(Type==2){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Value + '</td>';
	}else if(Type==3){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">1</td>';
	}else if(Type==4){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">1,2</td>';
	}else if(Type==5){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Value + '</td>';
	}else if(Type==6){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2"  style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Value + '</td>';
	}else if(Type==7){
		return '<td class="title" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;">' + Title + '</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;"><img src="' + Value + '"/></td>';
	}else if(Type==8){
		return '<tr><td class="title" rowspan="' + num + '" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;"> ' + Title + ' 1</td><td colspan="2" style="padding: 9px 15px;min-height: 20px;line-height: 20px;border: 1px solid #e2e2e2;font-size: 14px;"></td></tr>';
	}
}

///头部下载
function xiazai() {
	location.href = "/Home/Download.aspx?id=" + Id;
}

//打印
function onprint() {
	var html = $("#form-data").html();
	printHtml(html);
}
//状态操作
//撤回
$("body").on("click", "a[data-id='s_ch']", function() {
	layer.confirm('你确定要撤回该条审批吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
		var chexiaoload = layer.load();
		  var dele ={url:"Examine/RemoveExamine",data:{
					ExamId: Id,
					schoolid:window.schoolid
				},type:"post"};
		  commonFn(dele,function(data){
		  	layer.close(chexiaoload);
				layer.msg("撤回成功", {
					time: 1000
				}, function() {
					window.location.href = "HistoryApproval.html";
				});
		  })
	})
})
//删除
$("body").on("click", "a[data-id='s_sc']", function() {
	layer.confirm('你确定要删除该条审批吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
		var chexiaoload = layer.load();
		  var dele ={url:"Examine/DeleteExamine",data:{approveId:Id,schoolid:window.schoolid},type:"get"};
		  commonFn(dele,function(data){
		  	layer.close(chexiaoload);
				layer.msg("删除成功", {
					time: 1000
				}, function() {
					window.location.href = "HistoryApproval.html";
				});
		  })
	})
})
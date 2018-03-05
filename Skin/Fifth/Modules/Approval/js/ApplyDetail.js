/*****************获取详情信息**********************/
var Id = localStorage.getItem("Id"),
	getData = layer.load();

loadModel();

function loadModel() {
	var GetModelApprove = {
		url: "Examine/ApplyDetail",
		type: "get",
		data: {
			id: Id,
			schoolId: window.schoolid
		}
	};
	commonFn(GetModelApprove, function(data) {
		layer.close(getData);
		//撤回 中，结束
		if(data.state == 2 || data.state == 3 || data.state == 4) { //不可操作
			$(".OK").hide();
			$(".NO").hide();
			$(".Transfer").hide();
		} else if(data.state == 1 && data.toUserId == localStorage.UserId) { //转交给我的，可操作
			$(".OK").show();
			$(".NO").show();
			$(".Transfer").show();
		} else {
			$(".OK").hide();
			$(".NO").hide();
			$(".Transfer").hide();
		}
		$("#spTitle").text(data.modelTitle);

		$("#SchoolName").html(data.schoolName);
		for(key in data) {
			$("#" + key).html(data[key]);
		}
		if(data && data.inTime) {
			$("#InTime").html(solveTime(data.inTime));
		}

		var modelData = eval('(' + data.modelData + ')');
		$.each(modelData, function(i, n) {
			$("#tbody").append('<tr>' + Controls(n.Type, n.Title, n.Value, n.Items.length + 1) + '</tr>');
			if(n.Type == 8) {
				$.each(n.Items, function(k, v) {
					if(v.Type == 5) {
						v.Value = (v.Items)[0].Value + '~' + (v.Items)[1].Value;
					}
					$("#tbody").append('<tr>' + Controls(v.Type, v.Title, v.Value) + '</tr>');
				})
			}
		})
		$("#tbody").append('<tr>' +
			'<td class="title">审批人</td><td class="spr"></td>' +
			'</tr>');
		if(data.stepList.length > 0) {
			olduserid = data.stepList[0].userId;
			$(".spr").html(solveTime(data.stepList[0].inTime) + '&nbsp;' + data.stepList[0].userName + '&nbsp;' + data.stepList[0].stateName);
		}
		$("#tbody").append('<tr>' +
			'<td class="title">抄送人</td><td class="csr"></td>' +
			'</tr>');
		if(data.chaoSongList.length > 0) {
			$(".csr").html(solveTime(data.chaoSongList[0].inTime) + '&nbsp;' + data.chaoSongList[0].userName + '&nbsp;' + data.chaoSongList[0].stateName);
		}
	})

}
/******定义控件类型********/
function Controls(Types, Title, Value, num) {
	var Type = Number(Types);
	switch(Type) {
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
/***********打印*************/

function onprint() {
	var html = $("#form-data").html();
	printHtml(html);
}
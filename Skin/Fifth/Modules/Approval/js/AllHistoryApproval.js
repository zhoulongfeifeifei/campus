var Id = localStorage.getItem("Tjid");
var Title = localStorage.getItem("Title");
$(".toptitle").html("历史审批-" + Title);
/******************所有我的历史审批列表***************************/

obtainList();

function obtainList(current) {
	$('tbody tr').each(function() {
		$(this).remove();
	});
	var History = {
		url: "Examine/History",
		type: "post",
		data: {
			TempLateId: Id,
			schoolid: window.schoolid
		}
	};
	commonFn(History, function(data) {
			laypage({
				cont: 'page',
				pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) { //触发分页后的回调
					if(!first) { //一定要加此判断，否则初始时会无限刷
						obtainList(e.curr)
					}
				},
				skin: 'molv', //皮肤
				first: '首页', //将首页显示为数字1,。若不显示，设置false即可
				last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
				prev: false, //若不显示，设置false即可
				next: false //若不显示，设置false即可
			});
			var data = data.history.applies;
			$.each(data, function(i, n) {
				var row = '<tr data-toggle="' + n.schoolName + '" data-id="' + n.id + '" id="roleRow">' +
					'<td id="InTime">' + solveTime(n.inTime) + '</td>' +
					'<td id="ExamNo">' + isNull(n.examNo) + '</td>' +
					'<td id="UserId"data-id="' + n.fromUserId + '" >' +isNull( n.fromUserName )+ '</td>' +
					'<td id="State">' + isNull(n.stateName) + '</td>' +
					'<td id="Operation">' +
					'<a href="ApplyDetail.html" onclick="local(this)" data-id="xq" class="link text blue">详情</a> ' +
					'<a href="/Home/Download.aspx?id=' + n.id + '" data-id="xz"  class="link text blue" >下载</a> ' +
					'<a href="javascript:;" onclick="dy(this)"  target="_blank" data-id="dy"  class="link text blue" >打印</a> ' +
					'</td>' +
					'</tr>';
				//									
				$("#roleTable").append(row);
			});
	});
}

/*******详情******/
function local(a) {
	localStorage.removeItem("Id", '');
	localStorage.removeItem("SchoolName", '');
	var Id = $(a).parent().parent().attr("data-id");
	var SchoolName = $(a).parent().parent().attr("data-toggle");
	localStorage.setItem("Id", Id);
	localStorage.setItem("SchoolName", SchoolName);
}

/*******打印******/
function dy(a) {
	local(a);
	var html = $("#iframe2").contents().find("#form-data").html();
	onprint(html);
}

//打印全部		
function printAll() {
	var body = "<style>table {border-collapse: collapse;border-spacing: 0;}table, caption, tbody, tfoot, thead, tr, th, td{ vertical-align:middle;}.info{ margin: 10px 0; font-size: 14px;}.table table tr td{border: 1px solid #ddd; text-align: left; font-size: 14px;}.table table tr td.title{width: 150px;}.table table{ border:1px solid #ddd; border-left:0\\9; border-top:0\\9; width:100%; background:#fff;  text-align:center; line-height:22px;}.table table td.checkbox,.table table th.checkbox{ width:30px; padding:0; -webkit-user-select:none;}.table table td.checkbox label,.table table th.checkbox label{ display:block; padding:6px 5px;}.table table th,.table table td{ border-left:1px solid #eee\\9; border-top:1px solid #ddd; padding:6px 5px;}.table table th{font-size:14px; padding:8px 5px;}.table table th.thsort{ cursor:pointer;}.table table th .fa-sort-up{ font-size:12px; margin:5px 5px 0; vertical-align:middle;}.table table th .fa-sort-down{ font-size:12px; margin:0 5px 5px; vertical-align:middle;}.table-normal table th{ background:#ddd;}.table table .edit a{ padding:0 10px;}</style>";
	$("iframe").each(function(i) {
		var pageNextStr = '<div style="page-break-after: always;"></div>';
		var pageNext = $(pageNextStr);
		pageNext.append($(this).contents()[0].body.outerHTML);
		body += pageNext[0].outerHTML;
	});
	var win = window.open('about:blank');
	win.document.body.innerHTML += body;
	win.print();
	win.close();
}


////搜索
//$("#save").on("click", function() {
//	layer.load();
//	var bb = formSerialize($("#form0"));
//	bb.schoolid=window.schoolid;
//	var Statistics = {
//	url: "Examine/Statistics",
//	type: "post"
//	};
//	commonFn(Statistics, function(data) {
//		obtainList(1);
//	})
//})
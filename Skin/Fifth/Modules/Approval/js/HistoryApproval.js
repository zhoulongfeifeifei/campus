
/******************所有我的历史审批列表***************************/
obtainList(1,0);

$('.launchApp').click(function(event) {
	layer.open({
		type:2,
		title: '审批类型',
		area:["650px","400px"],
		content:'TemplateList.html'
	})
});
$("#seach").on("click", function() {
	var name=$("#Title").val();
	var sele=$("#select").val();
	obtainList(1,sele,name);
})
layui.form().on("select(aihao)",function(data){
	var val=data.value;
	obtainList(1,val);
})
function obtainList(current,sele,name) {
	var listload = layer.load();
	$('tbody').empty();
	var GetFromMeExamineList ={url:"Examine/GetListExamineFromMe",type:"post",data: {
			PageIndex: current,
			PageSize: 10,
			HadShenpi: sele,
			Title: name,
			schoolId:window.schoolid
		}
	};
	commonFn(GetFromMeExamineList,function(data){
			layer.close(listload);
			laypage({
				cont: 'page',
				pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) { //触发分页后的回调
					if (!first) { //一定要加此判断，否则初始时会无限刷
						obtainList(e.curr,sele,name)
					}
				},
				skin: 'molv', //皮肤
				first: '首页', //将首页显示为数字1,。若不显示，设置false即可
				last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
				prev: false, //若不显示，设置false即可
				next: false //若不显示，设置false即可
			});
			$.each(data.resultData, function (i, n) {
				var spName='';
				var csName='';
				if(n.stepList.length>0) {
					$.each(n.stepList,function(i,n){
						if(i==0){
							spName=n.userName;
						}else{
							spName+="<br/>"+n.userName;
						}
					})
				}
				if(n.chaoSongList.length>0) {
					$.each(n.chaoSongList,function(i,n){
						if(i==0){
							csName=n.userName;
						}else{
							csName+="<br/>"+n.userName;
						}
					})
				}
				var row = '<tr  data-id="' + n.id + '" id="roleRow">' +
                    '<td id="ExamNo">' + isNull(n.examNo) + '</td>' +
				'<td id="Title" >' + isNull(n.modelTitle) + '</td>' +
					'<td id="">' + spName + '</td>' +
					'<td id="">' + csName + '</td>' +
                    '<td id="">' + getstate(n.state) + '</td>' +
					'<td id=""><p id="InTime">' + solveTime(n.inTime) + '</p></td>' +
					'<td id="Operation"  data-id="' + isNull(n.toUserId) + '">' +
					'<a href="SendDetail.html?id" onclick="local(this)" data-id="xq" class="layui-btn layui-btn-mini">详情</a>' +
					'</td>' +
					'</tr>';
				$("#roleTable").append(row);

			});
	});
}
//点详情存储id
function local(a) {
	localStorage.removeItem("Id", '');
	var Id = $(a).parent().parent().attr("data-id");
	localStorage.setItem("Id", Id);
}

function getstate(state){
	switch (state){
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
	

////获取状态
//var GetFromMeExamineList ={url:"Examine/GetListStatus",type:"get",data: {type:1,schoolid:window.schoolid}};
//	commonFn(GetFromMeExamineList,function(data){
//		$.each(data, function(i,n) {
//			$("#select").append('<option value="'+n.key+'">'+n.value+'</option>').children();
//		});
//		$("#select").find('option:first-child').remove();
//		form.render();
//		
//})

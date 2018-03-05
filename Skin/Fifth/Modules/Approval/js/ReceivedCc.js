var layer = layui.layer,
	laypage = layui.laypage,
	$=jQuery=layui.jquery;
var form = layui.form();
/**************收到的抄送列表*********************/
obtainList(1,1);
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
	var GetChaoSongToMeList ={url:"Examine/GetListChaoSongToMe",type:"post",data: {
			PageIndex: current,
			PageSize: 10,
			chaoSongState: sele,
			Title: name,
			schoolId:window.schoolid
		}
	};
	commonFn(GetChaoSongToMeList,function(data){
			layer.close(listload);
			laypage({
				cont: 'page',
				pages: data.pageCount,
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) {
					if (!first) {
						obtainList(e.curr,sele,name)
					}
				},
				skin: 'molv',
				first: '首页',
				last: '尾页',
				prev: false,
				next: false
			});
			$.each(data.resultData, function(i, n) {
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
					'<td id="Title" >' +isNull( n.modelTitle) + '</td>' +
					'<td id="State">' + spName + '</td>' +
					'<td id="State">' +  csName+ '</td>' +
					'<td id="State">' + isNull(n.fromUserName )+ '</td>' +
					'<td id="State">' + getstate(n.state )+ '</td>' +
                    '<td id="State"><p id="InTime">' +solveTime( n.inTime) + '</p></td>' +
					'<td id="Operation"  data-id="' + n.toUserId + '">' +
					'<a href="CcDetail.html" onclick="local(this)" data-id="xq" class="layui-btn layui-btn-mini">详情</a>' +
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
	

////获取状态
//var GetFromMeExamineList ={url:"Examine/GetListStatus",type:"get",data: {type:3,schoolid:window.schoolid}};
//	commonFn(GetFromMeExamineList,function(data){
//		$.each(data, function(i,n) {
//			$("#select").append('<option value="'+n.key+'">'+n.value+'</option>');
//		});
//		$("#select").find('option:first-child').remove();
//		form.render();
//		
//})

function getstate(state){
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
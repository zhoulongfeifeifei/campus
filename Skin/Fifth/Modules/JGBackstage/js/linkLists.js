/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 19:04:34
 * @version $Id$
 */
//关键字搜索
var WebTitle='',LinkType=0;
$("#search").on("click", function() {
	LinkType = $('#LinkType').val();
	WebTitle = $('input[name="title"]').val();
	obtainList();
})

/***************获取链接列表信息***********************/
obtainList();

function obtainList(current) {
	var getlinklist = {
		url: "Portal/GetListLinks",
		data: {
			Type: LinkType,
			Title: WebTitle,
			PageIndex: current,
			schoolid: window.schoolid
		},
		type: "post"
	};
	commonFn(getlinklist, function(data) {
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
						$("#roleTable").empty();
						var datas = data.resultData;
						var index = 1;
						$.each(datas, function(i, n) {
							var start;
							var startcolor;
							var showpic;
							if(n.type == 1) {
								n.type = "友情链接";
							} else if(n.type == 2) {
								n.type = "应用链接";
							} else if(n.type == 3) {
								n.type = "做文明学生";
							} else if(n.type == 4) {
								n.type = "专题";
							} else if(n.Type == 5) {
								n.type = "占两格";
							}
							if(n.isLock == 0) {
								start = '<i class="alIcon">&#xe652;</i>';
								startcolor = "停用";
							} else if(n.isLock == 1) {
								start = '<i class="alIcon">&#xe65b;</i>';
								startcolor = "启用";
							}
							if(n.imgUrl == "") {
								showpic = "<div style='width:100px;height:80px;'></div>";
							} else {
								showpic = "<img src='" + n.imgUrl + "' style='width:100px;height:80px;margin:0 auto;'>";
							}
							$("#roleTable").append('<tr data-id="244453" id="roleRow">' +
								'<td id="xh">' + index + '</td>' +
								'<td id="title">' + isNull(n.title) + '</td>' +
								'<td id="WebUrl">' + isNull(n.webUrl) + '</td>' +
								'<td id="ImgUrl">' + showpic + '</td>' +
								'<td id="AddTime">' + solveTime(n.addTime) + '</td>' +
								'<td id="Type">' + isNull(n.type) + '</td>' +
								'<td class="edit">' +
								'<a data-islock="' + n.isLock + '" data-operation="Portal.StartLink" class=" yinc layui-btn layui-btn-mini start" title="' + startcolor + '">' + startcolor + '</a>' +
								'<a href="AddLink.html?id=' + n.id + '" data-operation="Portal.UpdateLink" class=" yinc layui-btn layui-btn-mini" title="编辑">编辑</a>' +
								'<a data-id="' + n.id + '" data-operation="Portal.DeleteLink" class="yinc layui-btn layui-btn-mini layui-btn-danger stop" onclick="delRole(' + n.id + ')" title="删除">删除</a>' +
								'</td>' +
								'</tr>');
							index++;
						});
			})
	quanxian();
	}

/************删除链接*******************/
function delRole(a) {
	layer.confirm('你确定要删除该链接吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Portal/DeleteLink?id="+a+"&schoolid="+window.schoolid,type:"DELETE"};
	  commonFn(dele,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		obtainList();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}


	//           启用停用
	$("table").on("click", ".start", function() {
		var id = $(this).siblings('.stop').attr("data-id");
		var islock = $(this).attr("data-islock");
		var me = $(this);
		if(islock == 1) {
			var StartLink ={url:"Portal/StartLink",data:{id: id,schoolid:window.schoolid},type:"get"};
	  		commonFn(StartLink,function(data){
				layer.msg('启用成功')
				obtainList();
			}); //这里返回的类型有：json,html,xml,text
		} else if(islock == 0) {
			var StopLink ={url:"Portal/StopLink",data:{id: id,schoolid:window.schoolid},type:"get"};
	  		commonFn(StopLink,function(data){
					layer.msg('停用成功');
					obtainList();
				}); //这里返回的类型有：json,html,xml,text
		}
	});
form.on('select(LinkType)', function(data){
  LinkType=data.value;
  obtainList();
}); 
// $('.search').click(function() {
//     ajaxList($('input[name="Key"]').val());
// });

ajaxList();
function ajaxList(page) {
	var index = layer.load();
	var GetListAdbanners = {
		url: "Portal/GetListAdbanners",
		data: {
			PageIndex: page,
			schoolid:window.schoolid
		},
		type: "post"
	};
	commonFn(GetListAdbanners, function(data) {
		layer.close(index);
		$('tbody').empty();
		var t = data;
		laypage({
			cont: 'page',
			pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			curr: t.pageIndex,
			groups: 5,
			jump: function(e, first) { //触发分页后的回调                
				if(!first) { //一定要加此判断，否则初始时会无限刷 
					ajaxList(e.curr)
				}
			},
			skin: 'molv', //皮肤
			first: '首页', //将首页显示为数字1,。若不显示，设置false即可
			last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
			prev: false, //若不显示，设置false即可
			next: false //若不显示，设置false即可
		});
		for(var i = 0; i < t.resultData.length; i++) {
			var i2 = i + 1
			if(i2 < 10) {
				if(page == undefined) {
					var p2 = ''
					i2 = i2 * 1
				} else {
					var p2 = page - 1
				}
			} else {
				if(page == undefined) {
					var p2 = ''
					i2 = i2 * 1
				} else {
					i2 = i2 * page
					var p2 = ''
				}
			}
			$('<tr data-id="' + t.resultData[i].id + '">'+
			'<td>' + p2 + i2 + '</td><td class="RoleId">' + isNull(t.resultData[i].title) + '</td>'+
			'<td>' + isNull(t.resultData[i].sortId) + '</td>'+
			'<td class="w-200">' + isNull(t.resultData[i].linkUrl) + '</td>'+
			'<td>' + isNull(t.resultData[i].adRemark) + '</td>' +
			'<td><a href="adAdd.html?id=' + t.resultData[i].id + '"  class="layui-btn layui-btn-mini yinc" data-operation="Portal.UpdateAdbanner" title="编辑">编辑</a>' +
			'<a onclick="delRole(' + t.resultData[i].id + ')" class="layui-btn layui-btn-mini layui-btn-danger yinc" data-operation="Portal.StopAdbanner" title="删除">删除</a></td></tr>').appendTo('tbody');
		}
		quanxian();
	});
}

function delRole(a) {
	layer.confirm('你确定要删除该广告吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var StopAdbanner ={url:"Portal/StopAdbanner?id="+a+"&schoolid="+window.schoolid,type:"DELETE"};
	  commonFn(StopAdbanner,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		ajaxList();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}

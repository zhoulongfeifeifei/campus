/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 17:54:47
 * @version $Id$
 */
$('.search').click(function() {
	ajaxList($('input[name="Key"]').val(),1);
});

ajaxList('',1);
function ajaxList(seach, page) {
	var GetListArticles = {
		url: "Portal/GetListArticles",
		data: {
			pageIndex: page,
			Title: seach,
			pageSize: 10,
			channel: 2,
			auditor: -1,
			schoolid:window.schoolid
		},
		type: "post"
	};
	commonFn(GetListArticles, function(t) {
		$('tbody').empty();
		laypage({
			cont: 'page',
			pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			curr: t.pageIndex,
			groups: 5,
			jump: function(e, first) { //触发分页后的回调                
				if(!first) { //一定要加此判断，否则初始时会无限刷 
					ajaxList($('input[name="Key"]').val(), e.curr)
				}
			},
			skin: 'molv', //皮肤
			first: '首页', //将首页显示为数字1,。若不显示，设置false即可
			last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
			prev: false, //若不显示，设置false即可
			next: false //若不显示，设置false即可
		});
		if(t.resultData !== null){
			

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
			if(t.resultData[i].status == 1) {
				var Status = "已发布";
				var operation = "已审核"
			} else if(t.resultData[i].status == 2) {
				var Status = "待审核"
				var operation = "审核"
			}
			$('<tr data-id="' + t.resultData[i].id + '"><td>' + p2 + i2 + '</td>'+
			'<td class="RoleId">' + t.resultData[i].title + '</td><td>' + Status + '</td>'+
			'<td>' + solveTime(t.resultData[i].addTime) + '</td><td><img src="' + t.resultData[i].imgUrl + '"></td>' +
				'<td><a href="albumAdd.html?aid=' + t.resultData[i].id + '" data-operation="Portal.UpdateArticle" class=" yinc layui-btn layui-btn-mini" title="编辑">编辑</a>' +
				'<a onclick="exam(' + t.resultData[i].id + ',' + t.resultData[i].status + ')" data-operation="Portal.ExamArticle" class="yinc layui-btn layui-btn-mini" title="审核">' + operation + '</a>' +
				'<a onclick="delRole(' + t.resultData[i].id + ')" data-operation="Portal.DeleteArticle" class=" yinc layui-btn layui-btn-mini layui-btn-danger" title="删除">删除</a></td></tr>').appendTo('tbody');
		}
		}
		
		quanxian();
	});
}

function delRole(a) {
	layer.confirm('你确定要删除该文章吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var DeleteArticle ={url:"Portal/DeleteArticle?id="+a+"&schoolId="+window.schoolid,type:"get"};
	  commonFn(DeleteArticle,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		ajaxList("",1);
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}

function exam(b, c) {
	if(c == 2) {
		var ExamArticle = {
			url: "Portal/ExamArticle",
			data: {
				id: b,
				schoolid:window.schoolid
			},
			type: "get"
		};
		commonFn(ExamArticle, function(data) {
			layer.msg('审核成功');
			ajaxList("",1);
		});
	}
}

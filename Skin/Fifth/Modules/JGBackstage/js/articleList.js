/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 18:12:49
 * @version $Id$
 */
var IDs;
var SCHOOLID=getCookieByUserInfo("schoolid");
$('.search').click(function() {
	ajaxList($('input[name="Key"]').val(), 1, IDs);
	$('.searchable-select-holder').text('所有栏目')
});

ajaxList();
function ajaxList(seach, page, catalogid) {
	var $index = layer.load();
	var GetListArticles = {
			url: "Portal/GetListArticles",
		data: {
			channel: 1,
			PageIndex: page,
			Title: seach,
			PageSize: 10,
			CatalogId: catalogid,
			Auditor: -1,
			schoolid:SCHOOLID
		},
		type: "post"
	};
		commonFn(GetListArticles, function(t) {
			layer.close($index);
				$('tbody').empty();
				if(t.resultData) {
					laypage({
						cont: 'page',
						pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
						curr: t.pageIndex,
						groups: 5,
						jump: function(e, first) { //触发分页后的回调                
							if(!first) { //一定要加此判断，否则初始时会无限刷 
								ajaxList($('input[name="Key"]').val(), e.curr, IDs)
							}
						},
						skin: 'molv', //皮肤
						first: '首页', //将首页显示为数字1,。若不显示，设置false即可
						last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
						prev: false, //若不显示，设置false即可
						next: false //若不显示，设置false即可
					});
					var num=1;
					for(var i = 0; i < t.resultData.length; i++) {
						var i2 = i + 1;
						var p2 = 0;
						if(i2 < 10) {
							if(page) p2 = page - 1;
						} else {
							if(!page) p2 = '';
							else i2 = i2 * page, p2 = '';
						}
						if(t.resultData[i].a == 1) {
							var Status = "已发布";
							var operation = "已审核"
						}else if(t.resultData[i].a == 3) {
                            var Status = "待发布";
                            var operation = "已审核"
                        }else if(t.resultData[i].a == 2 || t.resultData[i].a == 0) {
							var Status = "待审核"
							var operation = "审核"
						}
						if(t.resultData[i].downUrl == null || t.resultData[i].downUrl == "") {
							t.resultData[i].downUrl = ""
							var down = ""
						} else {
							down = "下载";
							t.resultData[i].downUrl = t.resultData[i].downUrl;
						}

						$('<tr data-id="' + t.resultData[i].id + '"><td>' + num + '</td><td class="RoleId"><a style="color:blue;" href="javascript:previewArticle(' + t.resultData[i].id + ')"">'+t.resultData[i].title+'</a></td><td></td><td>' + t.resultData[i].clickNum + '</td><td>' +solveTime( t.resultData[i].addTime) + '</td><td>' + Status + '</td>' +
							'<td><a href="articleAdd.html?id=' + t.resultData[i].id + '"class="layui-btn layui-btn-mini  yinc" data-operation="AjaxJianGong.UpdateArticle" title="编辑">编辑</a>' +
							'<a onclick="exam(' + t.resultData[i].id + ',' + t.resultData[i].status + ')" class="layui-btn layui-btn-mini  yinc" data-operation="AjaxJianGong.ExamArticle" title="审核">' + operation + '</a>' +
							'<a onclick="delRole(' + t.resultData[i].id + ')" class="layui-btn layui-btn-mini layui-btn-danger yinc" data-operation="AjaxJianGong.DeleteArticle" title="删除">删除</a></td></tr>').appendTo('tbody');

						for(var c = 0; c < t.resultData[i].catalogs.length; c++) {
							$('<span style="display:inline-block; margin-left:1em">' + t.resultData[i].catalogs[c].title + '</span>').appendTo('tbody tr:eq(' + i + ') td:eq(2)');

						}
						num++;
					}
				} 
			quanxian();
	});
}
//获取侧导航
gettree();
function gettree(){
	var GetListCatalogsTree = {
			url: "Portal/GetListCatalogsTree",
			data: {
				id:0,
				channel: 1,
				schoolid:window.schoolid
			},
				type: "post"
			};
	commonFn(GetListCatalogsTree, function(data) {
		$(".c_left .c_left_tree").ligerTree({
			data: data,
			checkbox: false,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onSelect: function(note) {
				IDs = note.data.id;
				ajaxList('',1,IDs);
			},
		})
	});
}
function delRole(a) {
	layer.confirm('你确定要删除该文章吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var DeleteArticle ={url:"Portal/DeleteArticle?id="+a+"&schoolId="+SCHOOLID,type:"get"};
	  commonFn(DeleteArticle,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		ajaxList();
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
}

function exam(b, c) {
	if(c == 2) {
		layer.confirm('你确定要该文章通过审核吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var ExamArticle = {
				url: "Portal/ExamArticle",
				data: {
					id: b,
					schoolid:SCHOOLID
				},
				type: "get"
			};
			commonFn(ExamArticle, function(data) {
				layer.msg('审核成功');
				ajaxList();
			});
		}, function(){
		  layer.closeAll();
		});
	}
}


$("body").on('click', ".nav_title", function() {
	ajaxList();
})
// previewArticle();
function previewArticle(id){
    var indexId = layer.load();
    var GetArticle = {
		url: "Portal/GetArticle",
		data: {
			id: id,
			schoolid: SCHOOLID
		},
		type: "get"
	};
	commonFn(GetArticle, function(t) {
            layer.close(indexId);
                $('#articleDetail h1').text(t.articleInfo.title);
                $('#articleDetail h3').text(solveTime(t.articleInfo.newsTime));
                $('#articleDetail').append(t.articleInfo.content);
                layer.open({
                    type : 1 ,
                    title:t.articleInfo.title ,
                    area: ['90%', '90%'],
                    content:$('#articleDetail'),
                    cancel: function(){ 
                        $('#articleDetail').empty();    
                    }
                })

    })
}

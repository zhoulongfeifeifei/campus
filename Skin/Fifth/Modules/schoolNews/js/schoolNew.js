/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 15:13:55
 * @version $Id$
 */
$("body").on('click',".nav_title",function(){
	ajaxList('',1);
})

ajaxList('',1);
$('.search').click(function() {
	ajaxList($('input[name="Key"]').val(),1);
});
column();
function ajaxList(seach, page, catalogid) {
	var index = layer.load();
	var GetListArticles ={url:"Portal/GetListArticles",data: { Channel: 1, PageIndex: page, Title: seach, PageSize: 10, CatalogId: catalogid, IsInner: 1 },type:"post"};
	commonFn(GetListArticles,function(data){
			layer.close(index);
				$('tbody').empty();
				var t = data;
				if(t.resultData) {
					laypage({
						cont: 'page',
						pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
						curr: t.pageIndex,
						groups: 5,
						jump: function(e, first) { //触发分页后的回调                
							if(!first) { //一定要加此判断，否则初始时会无限刷 
								ajaxList($('input[name="Key"]').val(), e.curr, $('.selected').attr('data-value'))
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
						if(t.resultData[i].status == 1) {
							var Status = "已发布";
							var operation = "已审核"
						} else if(t.resultData[i].status == 2) {
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
						$('tbody').append('<tr data-id="' + t.resultData[i].id + '">'+
							'<td>' + t.resultData[i].id  + '</td>'+
							'<td class="RoleId"><a href="detailNew.html?id=' + t.resultData[i].id + '">' + t.resultData[i].title + '</a></td>'+
							'<td></td>'+
							'<td>' + Status + '</td>'+
							'<td>' + t.resultData[i].clickNum + '</td>'+
							'<td>' + solveTime(t.resultData[i].addTime) + '</td>'+
							'</tr>')
						

						for(var c = 0; c < t.resultData[i].catalogs.length; c++) {
							$('<span style="display:inline-block; margin-left:1em">' + t.resultData[i].catalogs[c].title + '</span>').appendTo('tbody tr:eq(' + i + ') td:eq(2)');

						}
					}
				}
	});
}
$('.fl h4').click(function(event) {
	ajaxList(1);
});

function column() {
	var columnload = layer.load();
	var GetListCatalogsTree ={url:"Portal/GetListCatalogsTree",data:{IsInner:1,schoolid:window.schoolid},type:"post"};
	commonFn(GetListCatalogsTree,function(data){
		layer.close(columnload);
		$("#tabletree").ligerTree({
			data: data,
			checkbox: false,
			idFieldName: 'id',
			parentIDFieldName: 'pid',
			onSelect:function(note){
             	ajaxList('',1,note.data.id);
            },
		})
			
	});
	
}


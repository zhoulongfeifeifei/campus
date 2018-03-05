/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-02-13 14:47:42
 * @version $Id$
 */

var layer = layui.layer,
	laypage = layui.laypage;
ajaxList();
$('.search').click(function() {
	ajaxList($('input[name="Key"]').val());
});
function ajaxList(seach, page) {
	commonFn({
		url: "MessageNotify/GetListSchoolHistory",
		data: {
			PageIndex: page,
			isiSend: 3,
		},
		type:'post'
	}, function(data) {
		$('tbody').empty();
		laypageOk(data.pageCount,data.pageIndex,function(curr){
			ajaxList($('input[name="Key"]').val(), curr)
		})
		for (var i = 0; i < data.resultData.length; i++) {
			// var classDom = 
			var i2 = i + 1;
			var p2 = 0;
			if (i2 < 10) {
				if (page) p2 = page - 1;
			} else {
				if (!page) p2 = '';
				else i2 = i2 * page, p2 = '';
			}
			$('<tr data-id="' + data.resultData[i].userId + '"><td>' + p2 + i2 + '</td>' +
				'<td>' + data.resultData[i].userName + '</td>' +
				'<td><p class="noticeContent">' + data.resultData[i].msgNum + '</p></td>' +
				'<td><a href="schoolnoticelist.html?id=' + data.resultData[i].userId + '" class="layui-btn layui-btn-mini" title="查看">查看</a></td></tr>').appendTo('tbody');
		}
	})

}
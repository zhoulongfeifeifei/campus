/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-08 17:54:19
 * @version $Id$
 */
var laypage = layui.laypage,
	form = layui.form();
ajaxList();
$('.search').click(function() {
	var search = {
		title: $('input[name="Key"]').val(),
		reColumn: $('#reColumn').val(),
		resourceType: $('#resourceType').val(),
		Subject: $('#Subject').val(),
		Grade: $('#Grade').val(),
		jiaocao: $('#jiaocao').val()
	}
	$('tbody').empty();
	ajaxList(1, search);
})
var GetListAllAttribute = {
	url: "SchoolResources/GetListAllAttribute",
	data: {
		schoolid: window.schoolid
	},
	type: "get"
};
commonFn(GetListAllAttribute, function(data) {
	var d = data;
	// 资源栏目
	if(d.catalogs) {
		for(var h = 0; h < d.catalogs.length; h++) {
			$('#reColumn').append('<option value="' + d.catalogs[h].id + '">' + d.catalogs[h].name + '</option>')
		}
		form.render();
	}
	if(d.types ) {
		// 资源类型
		for(var i = 0; i < d.types.length; i++) {
			$('#resourceType').append('<option value="' + d.types[i].id + '">' + d.types[i].name + '</option>')
		}
		form.render();
	}
	if(d.subjects ) {
		// 学科
		for(var j = 0; j < d.subjects.length; j++) {
			$('#Subject').append('<option value="' + d.subjects[j].subject_id + '">' + d.subjects[j].subject_name + '</option>')
		}
		form.render();
	}

	if(d.grade ) {
		//班级
		for(var j = 0; j < d.grade.length; j++) {
			$('#Grade').append('<option value="' + d.grade[j].id + '">' + d.grade[j].name + '</option>')
		}
		form.render();
	}
	if(d.jiaoCais ) {
		// 教材
		for(var j = 0; j < d.jiaoCais.length; j++) {
			$('#jiaocao').append('<option value="' + d.jiaoCais[j].id + '">' + d.jiaoCais[j].name + '</option>')
		}
		form.render();
	}

})

function ajaxList(page, seach) {
	var listload = layer.load(),
		datas;
	if(seach == undefined) {
		datas = {
			PageIndex: page,
			PageSize: 10,
			Status: -1,
			IsMine: 1,
			schoolid: window.schoolid
		}
	} else {
		datas = {
			PageIndex: page,
			PageSize: 10,
			Name: seach.title,
			CatalogId: seach.reColumn,
			TypeId: seach.resourceType,
			SubjectId: seach.Subject,
			JiaoCaiId: seach.jiaocao,
			GradeId: seach.Grade,
			Status: -1,
			IsMine: 1,
			schoolid: window.schoolid
		}
	}
	var GetList = {
		url: "SchoolResources/GetList",
		data: datas,
		type: "post"
	};
	commonFn(GetList, function(data) {
		layer.close(listload);
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
				var newUrl = 'onLinePreview.html?id=' + t.resultData[i].id + '&Surl=' + t.resultData[i].fileUrl;
				var $btn = '<a target="_blank" href="' + newUrl + '" class="layui-btn layui-btn-mini layui-btn-normal read" title="在线预览">在线预览</a>';
				if(t.resultData[i].fileUrl && (t.resultData[i].fileUrl.endsWith("zip") || t.resultData[i].fileUrl.endsWith("rar"))) {
					$btn = '';
				}
				$('<tr data-id="' + t.resultData[i].id + '"><td class="RoleId">' + isNull(t.resultData[i].name) + '</td>' +
					'<td>' + isNull(t.resultData[i].subjectName) + '</td>' +
					'<td>' + isNull(t.resultData[i].gradeName) + '</td><td>' + isNull(t.resultData[i].resTypeName) + '</td>' +
					'<td>' + isNull(t.resultData[i].jiaoCai) + '</td><td>' + isNull(t.resultData[i].statusName) + '</td>' +
					'<td>' + solveTime(t.resultData[i].addTime) + '</td>' +
					'<td data-fileurl="' + t.resultData[i].fileUrl + '" style="text-algin:center">' + $btn +
					'<a href="addResource.html?id=' + t.resultData[i].id + '"class="layui-btn layui-btn-mini">编辑</a>' +
					'<a onclick="delRole(' + t.resultData[i].id + ')" class="layui-btn layui-btn-mini layui-btn-danger">删除</a></td></tr>').appendTo('tbody');
			}
		} else {
			layer.msg("没有数据", {
				shift: 5
			})
		}
		quanxian();
	});
}
//删除
function delRole(a) {
	layer.confirm('你确定要删除该资源吗？',{icon: 3, title:'提示'}, function() {
		var removeload= layer.load();
		var Delete = {
			url: "SchoolResources/DeleteResFile?id="+a+"&schoolid="+window.schoolid,
				type: "delete"
			};
			commonFn(Delete, function(data) {
				layer.close(removeload);
					layer.msg('删除成功');
					ajaxList();
		});
	})
}

// a是id b是url
function onLinePreview(a, b) {
	var $url;
	if(b && (b.endsWith("txt") || b.endsWith("png") || b.endsWith("jpg") || b.endsWith("gif")) || b.endsWith("pdf")) {
		$url = b;
	} else {
		var Change2Swf = {
			url: "SchoolResources/Change2Swf",
			data: {
				fileid: a
			},
			type: "post"
		};
		commonFn(Change2Swf, function(data) {
			$url = res.Data;
		})
	}

	return $url;

}
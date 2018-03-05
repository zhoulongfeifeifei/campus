/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 18:06:18
 * @version $Id$
 */
var IDs;
var NAme = "";
var editor,
	Id = getUrlParam('id'),
	aid = getUrlParam('aid'),
channel = 1;
//编辑器


KindEditor.ready(function(K) {
	editor = K.create('textarea[id="Notes"]', {
		uploadJson: window.apiUrl+'Common/UploadFileText',
		allowFileManager: false,
		width: '99%'
	});
});


if(aid && aid == "add") {
	Id = null;
	$('.down').hide();
	$('.album').css('display', 'block');
	channel = 2
} else if(aid) {
	Id = aid;
	$('.down').hide();
	$('.album').css('display', 'block');
	channel = 2
}
if(Id == null) {
	$('.toptitle').text('添加相册');
	element.init();
	column();
} else {
	$('.toptitle').text('编辑相册');
	element.init();
	column(Id);
	var indexId = layer.load();
	var GetArticle = {
			url: "Portal/GetArticle",
			data: {
				id: Id,
				schoolid:window.schoolid
			},
			type: "get"
		};
		commonFn(GetArticle, function(t) {
			layer.close(indexId);
			$('input[name="artname"]').val(t.articleInfo.title);
			$('input[name="artnametwo"]').val(t.articleInfo.subTitle);
			check(t.articleInfo.isNotify, $("#IsNotify"));
			form.render();
			$('textarea[name="abstract"]').val(t.articleInfo.descript);
			// 图片
			$('#adimg').attr('src', t.articleInfo.imgUrl)
			$('#downUrl').val(t.articleInfo.downUrl)
			editor.html(t.articleInfo.content);
			$('#Notes').html(t.articleInfo.content);
			$('input[name="addTime"]').val(solveTime(t.articleInfo.addTime));

			var co = t.catalogsInfo;
			for(var i = 0; i < co.length; i++) {
				
				$('#column').append('<span class="ad" id="' + co[i].id + '"><span class="layui-btn layui-btn-small layui-btn-normal">' + co[i].title + '</span><i class="alIcon removeAdmin" onclick="removeColumn(' + co[i].id + ')">&#xe687;</i></span>')
			}
			var ico = t.albumsInfo;
			$.each(ico, function(i, n) {
				$("#Albums").append('<li style="width: 150px">' +
					'<span class="guan">×</span>' +
					'<img src="' + n.imgUrl + '" class="Album" style="width: 150px; height:150px" alt=""><br />' +
					'标题：<input type="text" style="width: 100px" value="' + n.title + '" />' +
					'</li>');
			})
			
	})
}

function check(a, b) {

	if(a == 1) {
		b.attr("checked", "checked");
	} else {
		b.checked = false;
	}
}

// 栏目管理
function column(id) {
	var columnload = layer.load();
	var GetListCatalogsTree = {
			url: "Portal/GetListCatalogsTree",
			data: {
				PageSize: 9999999,
				schoolid:window.schoolid,
				channel: 2
			},
			type: "post"
		};
		commonFn(GetListCatalogsTree, function(Data) {
			layer.close(columnload);
				$("#idselect").ligerTree({
					data:Data, 
					checkbox: false,
					idFieldName: 'id',
					parentIDFieldName: 'pid',
					onSelect: function(note) {
						IDs = note.data.id;
						NAme = note.data.text;
						$("input[name='lm_name']").val(NAme);
						$("#idselect").hide();
					},
				})
				// 增加栏目
				$('#add').click(function() {
					var Id = IDs;
					if($('#column > span').length > 0) {
						$('#column > span').each(function(index, el) {
							if($(el).attr('id') == Id) {
								layer.msg('已经选择过了', {
									shift: 6,
									time: 1200
								})
								return false
							} else {
								if(index === $('#column > span').length - 1) {
									$('#column').append('<span class="ad" id="' + IDs + '"><span class="layui-btn layui-btn-small layui-btn-normal">' + NAme + '</span><i class="alIcon removeAdmin" onclick="removeColumn(' + IDs + ')">&#xe687;</i></span>')
								}
							}
						});
					} else {
						$('#column').append('<span class="ad" id="' + IDs + '"><span class="layui-btn layui-btn-small layui-btn-normal">' + NAme + '</span><i class="alIcon removeAdmin" onclick="removeColumn(' + IDs + ')">&#xe687;</i></span>')
					}
				});
	})
}

var textUrl
// 上传文件

layui.upload({
	url: window.apiUrl+'Common/UploadFile',
	async: false,
	elem: '.filetext',
	success: function(res, input) {
		if(res.status == 1) {
			textUrl = res.data[0];
			layer.msg("文件上传成功", {
				shift: 6,
				time: 1000
			}, function() {
				$('#downUrl').val(textUrl);
			})
		} else {
			layer.msg(res.message, {
				shift: 6,
				time: 1000
			})
		}
	}
});
var imgUrl;
layui.upload({
	url: window.apiUrl+'Common/UploadFile',
	async: false,
	title: '上传图片',
	elem: '.fileimg',
	ext: 'jpg|png|gif', //那么，就只会支持这三种格式的上传。注意是用|分割。
	success: function(res) {
		if(res.status == 1) {
			imgUrl = res.data[0];
			layer.msg("图片上传成功", {
				shift: 6,
				time: 1000
			}, function() {
				$('#adimg').attr('src', imgUrl);
			})
		} else {
			layer.msg(res.message, {
				shift: 6,
				time: 1000
			})
		}

	}
});
//相册
var AdUrl;
layui.upload({
	url: window.apiUrl+'Common/UploadFile',
	async: false,
	title: '上传图片',
	elem: '.Albums',
	ext: 'jpg|png|gif', //那么，就只会支持这三种格式的上传。注意是用|分割。
	success: function(res) {
		if(res.status) {
			AdUrl = res.data[0];
			layer.msg("图片上传成功", {
				shift: 6,
				time: 1000
			}, function() {
				$("#Albums").append('<li style="width: 150px">' +
					'<span class="guan">×</span>' +
					'<img src="' + AdUrl + '" class="Album" style="width: 150px; height:150px" alt=""><br />' +
					'标题：<input type="text" style="width: 100px" />' +
					'</li>');
			})
		} else {
			layer.msg("图片上传失败", {
				shift: 6,
				time: 1000
			})
		}

	}
});

$('#Sava').click(function() {
	$("input[type='checkbox']:checked").val(1);
	var str = [];
	var lis = $("#Albums li")
	$.each(lis, function(i, n) {
		var Albums = {};

		Albums.ImgUrl = $(n).find("img").attr("src");
		Albums.Title = $(n).find("input").val();

		str.push(Albums);
	})
	var strs = JSON.stringify(str);
	var model = {};
	model.Title = $('input[name="artname"]').val();
	model.IsNotify = $('input[name="IsNotify"]').val();
	model.SubTitle = $('input[name="artnametwo"]').val();
	model.Descript = $('textarea[name="abstract"]').val();
	// 文章上传
	model.filetxt = $('#downUrl').val();
	// 封面图片
	model.ImgUrl = $('#adimg').attr('src')
	// 正文
	model.AddTime = '';
	if($('input[name="addTime"]').val()) {
		model.AddTime = $('input[name="addTime"]').val();
	}
	model.Content = editor.html();
	var columnList = [];
	$('#column >span').each(function(index, el) {
		columnList.push($(el).attr('id'));
	});
	strColumnList = columnList.join(',');
	if($('input[name="artname"]').val() == "") {
		layer.msg("文章标题不能为空", {
			icon: 5,
			shift: 6
		})
	} else if($('#column').find('.ad').length < 1) {
		layer.msg("必须有一个已选栏目", {
			icon: 5,
			shift: 6
		})
	} else if(Id == null) {
		var index = layer.load();
		var AddArticle = {
			url: "Portal/AddArticle",
			data: {
				Title: model.Title,
				SubTitle: model.SubTitle,
				Descript: model.Descript,
				ImgUrl: model.ImgUrl,
				DownUrl: model.filetxt,
				Content: model.Content,
				catalog: strColumnList,
				AddTime: model.AddTime,
				IsNotify: model.IsNotify,
				schoolid:window.schoolid,
				str: strs,
				channel: channel
			},
			type: "post"
		};
		commonFn(AddArticle, function(t) {
			if(aid) {
				layer.msg("添加成功",{time:1000},function(){
					
					layer.close(index);
					location.href = "albumList.html?id="+window.localStorage.getItem("menuid");
				})
			} else {
				layer.msg("添加成功",{time:1000},function(){
					
					layer.close(index);
					location.href = "articleList.html?id="+window.localStorage.getItem("menuid");
				})
			}
		})

		// 保存

	} else {
		var index = layer.load();
		// model.Id = Id;
		// 编辑
		var UpdateArticle = {
			url: "Portal/UpdateArticle",
			data: {
				Id: Id,
				Title: model.Title,
				SubTitle: model.SubTitle,
				Descript: model.Descript,
				ImgUrl: model.ImgUrl,
				DownUrl: model.filetxt,
				IsNotify: model.IsNotify,
				Content: model.Content,
				catalog: strColumnList,
				AddTime: model.AddTime,
				schoolid:window.schoolid,
				str: strs
				// channel : channel 
			},
			type: "post"
		};
		commonFn(UpdateArticle, function(t) {
			layer.close(index);
			if(aid) {
				layer.msg("编辑成功",{time:1000},function(){
					location.href = "albumList.html?id="+window.localStorage.getItem("menuid");
				})
			} else {
				layer.msg("编辑成功",{time:1000},function(){
					location.href = "articleList.html?id="+window.localStorage.getItem("menuid");
				})
			}
		})
	}
});

$('#cancel').click(function() {
	layer.confirm("确定取消", {
		icon: 3,
		title: '提示'
	}, function() {
		location.href = "javascript:history.go(-1)"
	})
})

//删除相册里的某一张照片
$("body").on("click", '.guan', function() {
	$(this).parent().remove();
})


// 删除栏目的方法
function removeColumn(a) {
	$('#column > span').each(function(index, el) {
		if($(el).attr('id') == a) {
			layer.confirm('确定删除此栏目?', {
				icon: 3,
				title: '提示',
				offset: 0
			}, function(index) {
				$(el).remove();
				layer.close(index);
			});

		}
	});
}


$("input[name='lm_name']").focus(function() {
	$("#idselect").show();
})

document.onclick = function(e) {　　　　　　　　
	$("#idselect").hide();　　　　　　
}
$('#lm_box').bind("click", function(e) {　　　　　　　　
	e = e || event;
	stopFunc(e);　　　　　　
});　　　　
　　　　
function stopFunc(e) {　　　　　　
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;　　　　
}
var imgUrl,
	YunFileList = [],
	UserType = 10,
	stateType = 0,
	editor;
KindEditor.ready(function(K) {
	editor = K.create("#Notes", {
		allowFileManager: true,
		width: '99.8%',
		items: [
			'undo', 'redo', '|', 'code', 'cut', 'copy', 'paste',
			'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
			'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			'superscript', '|', 'fullscreen', '/',
			'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
			'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
			'insertfile', 'table', 'hr', 'pagebreak',
			'anchor', 'link', 'unlink', '|', 'about'
		],
		uploadJson: window.apiUrl + 'Common/UploadFileName',
		fileManagerJson: window.apiUrl + 'Common/UploadFileName',
		allowFileManager: false,
	});
})
form.on('checkbox(stateType)', function(data) {
	stateType = data.value;
})

upload({
	url: window.apiUrl + 'Common/UploadFileName',
	title: '选择图片',
	elem: '.img',
	success: function(res) {
		if(res.status == 1) {
			$('#imgPreview').append('<div class="singleImg"><img src=' + res.data[0] + '><i class="layui-icon">&#x1006;</i></div>');
			imgMax();
			$('#imgPreview .singleImg i').click(function() {
				if($('#imgPreview img').length < 10) {
					$('#addImg').removeAttr('disabled');
				}
				var $this = $(this);
				layer.confirm("取消保存?", {
					icon: 3,
					title: "删除提醒"
				}, function(index) {
					$this.parent().remove();
					layer.close(index);
				})

			});
		} else if(res.status == 4) {

		} else {
			layer.msg(res.message);
		}

	}
});
upload({
	url: window.apiUrl + 'Common/UploadFileName',
	title: '本地上传',
	elem: '.local',
	success: function(res) {
		if(res.status == 1) {
			$('.localUpload').append('<div class="layui-form-mid layui-word-aux wenjian" data-url=' + res.data[0] + '><p>' + getfilename(res.data[0]) + '</p><i class="layui-icon">&#x1006;</i></div>')
			$('.wenjian i').on('click', function() {
				$(this).parent().remove();
			})
		} else {
			layer.msg("文件上传失败", {
				shift: 6,
				time: 1000
			})
		}
	}
});

$('.cloudDisk').click(function(event) {
	$('.reSelect').css('display', 'inline');
	//$('#Personal ,#Public , #OK').empty();
	layer.open({
		type: 2,
		title: "云盘选择文件",
		content: "/Web/Skin/Fifth/Common/SelectCloudDisk/SelectCloudDisk.html",
		area: ['960px'],
		btn: "确定",
		success: function() {
			//         
		},
		yes: function(index, layero) {
			var idName = $(layero).find("iframe").contents().find('#OK');
			YunFileList = [];
			$(idName).children('li').each(function(index, el) {
				var obj = {}
				obj.fileid = $(el).attr('data-id')
				obj.filename = $(el).find('p').text()
				YunFileList.push(obj);
				$('.cloudList').append('<p data-id =' + obj.fileid + '>' + obj.filename + '</p>')
			});
			$('.cloudDisk').html("重新选择");
			layer.close(index);
		}
	})
});

// 获取科目的列表
var GetListSubject = {
	url: "Homework/GetSubjectList",
	//	data: {
	//		schoolid:window.schoolid
	//	},
	type: "post"
};
commonFn(GetListSubject, function(t) {
	if(t && t.length > 0) {
		$('.subject').empty();
		$.each(t, function(i, el) {
			$('.subject').append('<input type="radio" name="subject" value=' + el.subject_id + ' title=' + el.subject_name + '>')
		});
		$('.subject input:eq(0)').attr('checked', true);
		form.on('radio', function(data) {
			getClass(data.value);

		})
		getClass($('.subject input:eq(0)').val())
		form.render();
	}

})
form.on('submit(Sava)', function() {
	var chelength = $('.pushType input[type="checkbox"]:checked').length;
	$('.pushType input[type="checkbox"]:checked').each(function(index, el) {
		var $index = index + 1;
		if($(el).val() == 1) {
			var sendload = layer.load();
			sendBatchAttachMsg(solveSaveData1And2(), function(res) {
				layer.close(sendload);
				if(chelength == $index) {
					layer.alert("已全部发送,确定跳转...", function() {
						location.href = "noticesend.html?id=116"
					})
				}
			})
		} else if($(el).val() == 2) {
			$('.msgExclusive input:checked').each(function(index2, ell) {
				// 即时短信
				if($(ell).val() == 3) {

					// 定时短信   -- 信息站点不一样
				} else if($(ell).val() == 4) {

				}
			})
		} else if($(el).val() == 0) {
			var model = {};
			// 科目
			model.subjectid = $('.subject input[name="subject"]:checked').val();
			// 班级
			var Classid = [];
			$('.selectClass input[name="Class"]:checked').each(function(index, el) {
				Classid.push($(el).val());
			});
			if(Classid.length < 1) {
				layer.msg("班级不能为空");
				return false;
			}
			model.classid = Classid.join(',');
			// 内容
			model.content = editor.html();
			var IU = new Array();
			// 图片
			$('#imgPreview .singleImg').each(function(index, el) {
				IU.push($(el).children('img').attr('src'));
			});
			model.imgUrl = IU.join(',');
			// 文件
			var strFileList = [];
			$('.localUpload .wenjian').each(function(index, el) {
				var filename = $(el).find('p').text();
				var fileurl = $(el).attr('data-url');
				// var fileid = $(el).attr('data-id');
				strFileList.push({
					filename: filename,
					fileurl: fileurl
				});
			});
			model.FileList = JSON.stringify(strFileList);
			// 云盘的文件
			model.YunFileList = JSON.stringify(YunFileList);
			// 发送方式
			model.state = stateType;
			model.schoolid = window.schoolid;
			model.usertype = UserType;

			var PostHomework = {
				url: "Homework/AddHomework",
				data: model,
				type: "post"
			};
			commonFn(PostHomework, function(res) {
				layer.msg("发布成功", {
					time: 1000
				}, function() {
					location.href = "taskHistory.html";
				});
			})
		};

	});
});

// 通过科目Id获取班级列表
function getClass(id) {
	$('.selectClass').empty();
	var getclasslist = {
		url: "Homework/GetClassList",
		data: {
			schoolId: window.schoolid,
			subjectid: id
		},
		type: "get"
	};
	commonFn(getclasslist, function(t) {
		$.each(t, function(i, el) {
			$('.selectClass').append('<input type="checkbox"  lay-verify="required" name="Class" value=' + el.class_id + ' title=' + el.class_name + '>')
		});
		form.render('checkbox');

	})
}

// 控制选择图片的最大数
function imgMax() {
	if($('#imgPreview img').length > 8) {
		$('#addImg').attr('disabled', true)
	} else {
		$('#addImg').removeAttr('disabled');
	}
}

//获取上传后文件名字
function getfilename(name) {
	if(name) {
		var NAme = name.split("/");
		return NAme[NAme.length - 1]
	}
}
//发送方式
form.on('radio(timedshortmsg)', function(data) {
	if(data.value == 4) {
		$('.selectTime').removeClass('none')
	} else {
		$('.selectTime').addClass('none')
	}
})
form.on('checkbox(shortmsg)', function(data) {
	if(data.elem.checked) {
		$('.msgExclusive').removeClass('none')
	} else {
		$('.msgExclusive').addClass('none')
	}
})

function solveSaveData1And2() {
	var obj = {
		toAccids: users,
		toReces: [],
		// toReces : [{ 
		//     toAccid: "112804",
		//     class_id:0,
		//     type : 0  ,
		//     receiveId :0,
		//     toPhone: "15305755683",
		//     numType: window.localStorage.getItem('numtype')
		// }],
		attach: JSON.stringify({
			type: 'attach',
			content: $('#Notes').val() + '————' + $('#Signature').val(),
			// files : "http://sincere-app.oss-cn-hangzhou.aliyuncs.com/Images/76a4bea1a61e485faebef3b0095fbb32.jpg",
			// imageHeight:1920,
			// imageWidth:1152,
			isSelectedCityCard: false,
			isGroup: users.length > 1 ? 1 : 0
		})
	}
	$.each(users, function(index, val) {
		obj.toReces.push({
			toAccid: val,
			class_id: classid[index - 1],
			type: 0,
			receiveId: 0,
			toPhone: $.isArray(phones) ? phones[index - 1] : 0,
			numType: window.localStorage.getItem('numtype')
		})
	});
	return obj;
}
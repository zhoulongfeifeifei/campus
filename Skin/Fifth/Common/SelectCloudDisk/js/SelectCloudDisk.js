/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 11:16:26
 * @version $Id$
 */

var YunFileList = [],
	users,
	SendType = new Array(),
	addsigmodal,
	editor;

//获取云盘文件
var getclasslist = {
	url: "CloudPan/GetFileList",
	data: {
		schoolId: window.schoolid
	},
	type: "get"
};
commonFn(getclasslist, function(res) {
	if(res.personal && res.personal.length > 0) {
		var nodes = [],
			t = res.personal;
		$.each(t, function(index, el) {
			var obj = {};
			obj.name = el.folderName;
			obj.children = [];
			if(el.files && el.files.length > 0) {
				$.each(el.files, function(index1, el1) {
					var obj1 = {};
					obj1.name = el1.fileName;
					obj1.id = el1.id;
					obj.children.push(obj1);
				});
			}
			if(el.childFolders && el.childFolders.length > 0) {
				obj.children = $.merge(loop(el.childFolders), obj.children);
			}
			nodes.push(obj);
		});

		tree({
			elem: '#Personal',
			nodes: nodes,
			click: function(e) {
				clickFile(e);
			}
		})
	}
	// 班级盘
	if(res.public && res.public.length > 0) {
		var nodes = [],
			t = res.public;
		$.each(t, function(index, el) {
			var obj = {};
			obj.name = el.className;
			obj.children = [];
			if(el.files && el.files.length > 0) {
				$.each(el.Files, function(index1, el1) {
					var obj1 = {};
					obj1.name = el1.fileName;
					obj1.id = el1.id;
					obj.children.push(obj1);
				});
			}
			if(el.childFolders && el.childFolders.length > 0) {

				obj.children = $.merge(loop(el.childFolders), obj.children);

			}
			nodes.push(obj);
		});
		tree({
			elem: '#Public',
			nodes: nodes,
			click: function(e) {
				clickFile(e);
			}
		})
	}

})
//选择完文件保存方法
//$('#OK li').each(function(index, el) {
//	var obj = {}
//	obj.fileid = $(el).attr('data-id')
//	obj.filename = $(el).find('p').text()
//	YunFileList.push(obj);
//});

// 这是循环云盘的文件和文件夹的列表的递归方法
function loop(arr) {
	if(arr && arr.length > 0) {
		var obj, nodes = [];
		$.each(arr, function(index, el) {
			obj = {};
			obj.name = el.folderName;
			obj.children = [];
			if(el.files && el.files.length > 0) {
				$.each(el.files, function(index1, el1) {
					var obj1 = {};
					obj1.name = el1.fileName;
					obj1.id = el1.id;
					obj.children.push(obj1)
				});
			}
			if(el.childFolders && el.childFolders.length > 0) {
				obj.children = $.merge(loop(el.childFolders), obj.children);
			}
			nodes.push(obj)
		});
		return nodes;
	}
}

// 选择之后  提供删除重新选的功能
function removeIcon(a) {
	$(a).parent().remove();
}
// 选择文件的处理方式
function clickFile(e) {
	if(e.children) {
		layer.msg("目前不支持导入文件夹全部文件,请选择文件");
	} else {
		// 只能增加十个
		if($('#OK li').length < 10) {
			// 判断当有选择文件的时候,现在选的文件在已经选的文件里是否存在
			if($('#OK li').length > 0) {
				$('#OK li').each(function(index, el) {
					if(e.id == $(el).attr('data-id')) {
						layer.msg("这个文件已经选择过了");
						return false;
					} else if(index + 1 == $('#OK li').length) {
						$('#OK').append('<li data-id=' + e.id + '><p>' + e.name + '</p><i class="layui-icon" onclick="javascript:removeIcon(this)">&#x1006;</i> </li>')
					}
				});
			} else {
				$('#OK').append('<li data-id=' + e.id + '><p>' + e.name + '</p><i class="layui-icon" onclick="javascript:removeIcon(this)">&#x1006;</i> </li>')
			}

		} else {
			layer.msg('最多选择十个云盘文件')
		}
	}
}
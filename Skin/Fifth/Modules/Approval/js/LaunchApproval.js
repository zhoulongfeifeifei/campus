/*******************呈现出页面模板内容********************/
var index = 1;
var roIds = window.location.href.split("?")[1];
var roId = roIds.split("=")[1];
layer.load();
var userIds = [];  //选择抄送人  抄送人id
var userNames = ''; //选择抄送人  抄送人name
var GetModelApprove = {
	url: "Examine/GetModelTemplate",
	type: "get",
	data: {
		id: roId,
		schoolId: window.schoolid
	}
};
commonFn(GetModelApprove, function(data) {
	layer.closeAll('loading');
	var data = data.controls.items;
	$.each(data, function(i, n) {
		var list = $("#lists");
		lists(n.type, list, n.title, n.id, n.unit, index, n.required);
		shangc('#UploadBtn' + index);
		if(n.type == 8 && n.items.length > 0) { //明细框里的内容控件
			var Items = n.items;
			$.each(Items, function(w, m) {
				var listIn = $("#listIn" + index);
				lists(m.type, listIn, m.title, m.id, m.unit,index);
				shangc('#UploadBtn' + index);
				if(m.type == 3 && m.options.length > 0) {
					var Options = m.options;
					$.each(Options, function(d, l) {
						var rad3 = '<li data-toggle="' + l.sort + '"><input type="radio" name="'+index+'" value="' + l.value + '"  title="' + l.text + '" /></li>';
						$(listIn).find("ul.radios"+index).append(rad3);
					})
					$(listIn).find("ul.radios"+index).find("li:first-child input").attr("checked","checked");
				} else if(m.type == 4 && m.options.length > 0) {
					var Options = m.options;
					$.each(Options, function(d, l) {
						var rad4 = '<li data-toggle="' + l.sort + '"><input type="checkbox" name="'+index+1+'" value="' + l.value + '"  title="' + l.text + '"/> </li>';
						$(listIn).find("ul.checks"+index).append(rad4);
					})
				} else if(m.type == 5 && m.items.length > 0) {
					var Ite = m.items;
					var timel2 = '<label data-id="' + Ite[0].id + '" class="layui-form-label title">' + Ite[0].title + '：</label>' +
						'<div class="layui-input-inline">' +
						'<input class="layui-input BeginTime" onclick="layui.laydate({elem: this, festival: true})" type="text"   value=""/>' +
						'</div>';
					var timer2 = '<label data-id="' + Ite[1].id + '" class="layui-form-label title">' + Ite[1].title + '：</label>' +
						'<div class="layui-input-inline">' +
						'<input class="layui-input EndTime" onclick="layui.laydate({elem: this, festival: true})" type="text"  value=""  />' +
						'</div>';
					$("#listIn" + index + ">li>.timel"+index).append(timel2);
					$("#listIn" + index + ">li>.timer"+index).append(timer2);
				}

			})
		} else if(n.type == 3 && n.options.length > 0) {
			var Options = n.options;
			$.each(Options, function(d, l) {
				var rad = '<li data-id="' + id + '" data-toggle="' + l.sort + '" ><input type="radio" name="'+index+'" value="' + l.value + '" title="' + l.text + '"  /> </li>';
				$("#lists>li>.f-input>.radios"+index).append(rad);
			})
			$("#lists>li>.f-input>.radios"+index).find("li:first-child input").attr("checked","checked");
		} else if(n.Type == 4 && n.Options.length > 0) {
			var Options = n.options;
			$.each(Options, function(d, l) {
				var rad2 = '<li data-id="' + id + '" data-toggle="' + l.sort + '"><input type="checkbox" name="'+index+1+'" value="'+l.value+' " title="' + l.text + '"/> </li>';
				$("#lists>li>.f-input>.checks"+index).append(rad2);
			})
		} else if(n.type == 5 && n.items.length > 0) {
			var Itemss = n.items;
			var timel1 = '<label data-id="' + Itemss[0].id + '" class="layui-form-label title">' + Itemss[0].title + '：</label>' +
				'<div class="layui-input-inline ">' +
				'<input class="layui-input BeginTime" onclick="layui.laydate({elem: this, festival: true})" type="text"  value=""/>' +
				'</div>';
			var timer1 = '<label data-id="' + Itemss[1].id + '" class="layui-form-label title">' + Itemss[1].title + '：</label>' +
				'<div class="layui-input-inline ">' +
				'<input class="layui-input EndTime" onclick="layui.laydate({elem: this, festival: true})" type="text"  value=""  />' +
				'</div>';
			$("#lists>li>.timel"+index).append(timel1);
			$("#lists>li>.timer"+index).append(timer1);
		}

		index++;

	})
	form.render();
})



/**************增加明细:复制明细内容************************/
$("body").on("click", '.bottom', function() {
	$(this).prev().css("margin-bottom", "10px");
	var mx = $(this).prev().clone();
	$(this).before(mx);
})

/**********自定义图标********************/
var icourl;

function shangc(a) {
	layui.upload({
    url: window.apiUrl+'Common/ImportFile'
    ,elem: a //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,title:'选择文件上传'
    ,success: function(res){
    	if(res.status==1){
			layer.msg("上传成功！", { time: 1000 }, function() {
				$(".Photo").attr("src", res.data).show();
			});
    	}else{
    		layer.msg(data.message, { time: 1000 });
    	}
		
    }
 });
//	var uploadflag = false;
//	var uploader = new plupload.Uploader({
//		runtimes: 'html5,flash,silverlight,html4',
//		browse_button: a,
//		url: 'http://60.190.202.49:1000/api/Common/UploadFile',
//		multi_selection: false,
//		filters: {
//			max_file_size: '10mb',
//			mime_types: [{
//				title: "图片",
//				extensions: "png,jpg,jpeg,bmp,gif"
//			}]
//		},
//		flash_swf_url: '/Web/Assets/plupload/Moxie.swf',
//		silverlight_xap_url: '/Web/Assets/plupload/Moxie.xap',
//		init: {
//			PostInit: function() {},
//			FilesAdded: function(up, files) {
//				if(uploadflag) {
//					for(var i = 0; i < files; i++) {
//						uploader.removeFile(files[i]);
//					}
//					return;
//				}
//				uploadflag = true;
//
//				uploader.start();
//			},
//			FileUploaded: function(up, file, data) {
//				uploader.removeFile(file);
//				uploadflag = false;
//				var json = eval("(" + data.response + ")");
//				if(json.Status == 1) {
//					$("#UploadBtn").attr("href", json.Data);
//					layer.msg("上传成功！");
//					icourl = JSON.parse(data.response).Data;
//					$(".Photo").attr("src", icourl).show();
//
//				} else {
//					$("#UploadBtn").attr("alt", "上传失败");
//				}
//			},
//			UploadProgress: function(up, file) {
//				$("#UploadBtn").attr("alt", file.percent + "%");
//			},
//			Error: function(up, err) {
//				uploadflag = false;
//				$("#UploadBtn").attr("alt", "上传失败");
//			}
//		}
//	});
//	uploader.init();
}
/********选择审批人*****/
$("#ApprovalName").on("click", function() {
	layer.open({
		type: 2,
		title: '选择审批人',
		btn: ['确定', '取消'],
		area: ["650px", "400px"],
		content: '/Web/Skin/Fifth/Common/Receiver/Receiver.html?state=1', //只能选择一个人
		yes: function(index, fdata) {
			var UserID = $(fdata).find("iframe").contents().find("#Peoples li").attr("data-id");
			var UserName = $(fdata).find("iframe").contents().find("#Peoples li a").html();
			$("#sp").val(UserName).attr("data-id", UserID);
			layer.closeAll();
		},
		btn2: function() {
			layer.closeAll();
		}
	})
})
//选择抄送人
$("#csName").on("click", function() {
	layer.open({
		type: 2,
		title: '选择抄送人',
		btn: ['确定', '取消'],
		area: ["650px", "400px"],
		content: '/Web/Skin/Fifth/Common/Receiver/Receiver.html?state=2', //可以选择多人
		yes: function(index, fdata) {
			userNames='';
			userIds.splice(0,userIds.length);
			var lis=$(fdata).find("iframe").contents().find("#Peoples li");
			$.each(lis,function(i, n) {
				var userid = $(n).attr("data-id");
				var username = $(n).find('a').html();
				userIds.push(userid);   
				if(i==0){
					userNames=username;
				}else{
					userNames+=','+username;
				}
			})
			$("#cs").val(userNames);
			layer.closeAll();
		},
		btn2: function() {
			layer.closeAll();
		}
	})
})

/////////保存

layui.form().on('submit(Sava)', function() {
	var args = init();
	postData(args);
});
function postData(args) {
	var Addexamine = {
		url: "Examine/Addexamine",
		type: "post",
		data: args,
		
	};
	commonFn(Addexamine, function(data) {
		layer.msg("提交成功", {
			time: 1000
		}, function() {
			window.location.href = "HistoryApproval.html";
		});
	});
	
}
var sort;

function init() {
	sort = 0;
	var chaosong={};
	chaosong.toUserId=" ";
	chaosong.toUserIds=userIds;
	var args = {};
	args.Id = 0;
	args.ModelId = roId;
	args.ToUserId = $("#sp").attr("data-id"); //审批人
	args.chaoSong=chaosong; //抄送人
	args.schoolid = window.schoolid;
	args.modelData = JSON.stringify(getControls($("#lists")));
	return args;
}

function getControls(items) {
	var controls = new Array();
	if(items.children().length <= 0) return controls;
	items.children().each(function() {
		var control = getControl($(this));
		if(control.Title === "") control.Title = getDefaultTitle(control.Type);
		controls.push(control);
	});
	return controls;
}

function getControl(item) {
	var control = new FormControls();
	control.Id = item.attr("data-id");
	control.Type = item.attr("data-typeid");
	control.Title = item.find(".title").html();
	control.Value = item.find("input").val();
	control.Sort++;
	if(control.Type == "1") {
		control.Value = item.find("textarea").val();
	} else if(control.Type == "8") {
		control.Items = getControls($(item.find(".list-in")[0]));
		control.Value = '';
	} else if(control.Type == "5") {
		var start = new FormControls();
		var end = new FormControls();
		control.Id = item.find(".timel lable").attr("data-id");
		start.Title = item.find(".timel lable").html();
		start.Value = item.find(".timel input").val();
		start.Sort = sort++;
		control.Items.push(start);
		control.Id = item.find(".timer lable").attr("data-id");
		end.Title = item.find(".timer lable").html();
		end.Value = item.find(".timer input").val();
		end.Sort = sort++;
		control.Title = "日期区间";
		control.Items.push(end);
	} else if(control.Type == "3") {
		var items = item.find("ul");
		var check=$(items).children().find("input:checked").parent();
		var obj = new FormControlOption();
		obj.Text = $(check).find('input').attr("title");
		obj.Value = $(check).find("input").val();
		obj.Sort = $(check).attr("data-toggle");
		control.Options.push(obj);
	} else if(control.Type == "4") {
		var items = item.find("ul");
		var checks=$(items).children().find("input:checked");
		$.each(checks,function(i,n){
			var lis=$(n).parent();
			var obj = new FormControlOption();
			obj.Text = $(lis).find('input').attr("title");
			obj.Value = $(lis).find("input").val();
			obj.Sort = $(lis).attr("data-toggle");
			control.Options.push(obj);
		})
	}else if(control.Type == "7") {
		control.Value = icourl;
	} else if(control.Type == "3") {
		control.Unit = item.find(".Unit").html();
	}
	return control;
}

//通过控件类型  返回控件名称
function getDefaultTitle(type) {
	switch(type) {
		case "0":
			return "单行输入框";
		case "1":
			return "多行输入框";
		case "2":
			return "数字输入框";
		case "3":
			return "单选框";
		case "4":
			return "多选框";
		case "5":
			return "日期区间";
		case "6":
			return "日期";
		case "7":
			return "照片";
		case "8":
			return "嵌套框";
		default:
			return "";
	}
}
//控件通用
function FormControls() {
	this.Id = '';
	this.Type = 0;
	this.Title = "";
	this.Unit = "";
	this.Value = "",
	this.Sort = 0;
	this.Options = new Array();
	this.Items = new Array();
}
//单选、多选控件通用
function FormControlOption() {
    this.Value = "";
    this.Text = "";
    this.Sort = 0;
    this.checked=false;
}

//控件
function lists(type, uls, Title, Id, Unit, num, Required) {
	var isrequire = '';
	if(Required) {
		isrequire = "required";
	}
	switch(type) {
		case 0:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="0">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<input class="layui-input" lay-verify=' + isrequire + ' type="text" name="" value=""/>' +
				'</div>' +
				'</li>');
			break;
		case 1:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="1">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<textarea class="layui-textarea" name="" lay-verify=' + isrequire + ' value=""></textarea>' +
				'</div>' +
				'</li>');
			break;
		case 2:

			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="2">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<input class="layui-input" lay-verify=' + isrequire + ' type="number" name="" value=""/>' +
				'</div>' +
				'<span class="Unit">' + Unit + '</span>' +
				'</li>');
			break;
		case 3:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="3">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<ul class="radios'+num+'" name="" >' +

				'</ul>' +
				'</div>' +
				'</li>');
			break;
		case 4:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="4">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<ul class="checks'+num+'" name="">' +

				'</ul>' +
				'</div>' +
				'</li>');
			break;

		case 5:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="5">' +
				'<div class="timel'+num+'">' +

				'</div>' +
				'<div class="timer'+num+'">' +

				'</div>' +
				'</li>');
			break;
		case 6:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="6">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-input-inline">' +
				'<input class="layui-input BeginTime" lay-verify="' + isrequire + '" onclick="layui.laydate({elem: this, festival: true})" type="text"  name="" value=""/>' +
				'</div>' +
				'</li>');
			break;

		case 7:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="7">' +
				'<label class="layui-form-label title">' + Title + '：</label>' +
				'<div class="layui-inline">' +
				'<input type="file" name="file" class="layui-upload-file" id="UploadBtn' + num + '">'+
//				'<a  class="layui-btn layui-btn-small " id="UploadBtn' + num + '">选择照片</a>' +
				'<img class="Photo" src="" style="width:150px;height:150px;border:1px solid #ccc;display:none;">' +
				'</div>' +
				'</li>');
			break;
		case 8:
			uls.append('<li class="layui-form-item" data-id="' + Id + '" data-typeid="8">' +
				'<div class="title s-label title">' + Title + '：</div>' +
				'<ul id="listIn' + num + '" class="list-in">' +

				'</ul>' +
				'<div class="bottom">+增加明细</div>' +
				'</li>');
			break;

	}
}
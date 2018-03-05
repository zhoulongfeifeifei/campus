///var flag = false;
    var uploadflag = false;
    var dialog = Dialog;
    $(".save").click(function () {
//      if (flag) {
//          alert("正在发布, 请稍后");
//          return;
//      }
        var args = init();
        args.schoolid=window.schoolid;
        //var arg=JSON.stringify(args);
        postData(args);
    });
    $(".publish").click(function () {
        var args = init();
        args.IsStart = true;
        args.schoolid=window.schoolid;
        postData(args);
    });
    function postData(args) {
        //flag = true;
        var Create ={url:"Examine/Create",type:"post",data: args};
		commonFn(Create,function(data){
            //flag = false;
            layer.msg("保存成功",{time:1000},function(){
            	window.opener = null; window.open('', '_self'); window.close();
            });
        });
    }
    var sort;
    function init() {
        sort = 0;
        var args = new ExamineCreateArgs();
        args.Id = 0;
        args.Title = $("#Title").val();
        args.Remark = $("#Remark").val();
        args.IcoUrl = $("#IcoUrl").val();
        args.ModelType = $("#modelTpye").val();
        args.Controls = JSON.stringify(getControls($(".mid-wrap .list")));
        return args;
    }
    function getControls(items) {
        var controls = new Array();
        if (items.children().length <= 0) return controls;
        items.children().each(function () {
            var control = getControl($(this));
            if (control.Title === "") control.Title = getDefaultTitle(control.Type);
            controls.push(control);
        });
        return controls;
    }
    function getControl(item) {
        var control = new FormControl();
        control.Sort = sort++;
        control.Type = item.attr("data-typeid");
        if (control.Type === "8") {
            control.Items = getControls($(item.find(".list-in")[0]));
        }
        var value = item.find('.input-hidden').val();
        control.HiddenValue = value;
        if (typeof (value) === 'undefined') return control;
        var values = value.split('&,');
        values.shift();//删除第一项
        values.pop();//删除最后一项
        var titles = new Array();
        $.each(values, function (i, val) {
            var _valArr = val.split('&:');
            var _rid = _valArr[0];
            var _val = _valArr[1];
            switch (_rid) {
                case '0': titles.push(_val); break;
                case '1': control.Tips = _val; break;
                case '2': _val = _val.substring(1, _val.length - 1); control.Unit = _val; break;
                case '3':
                    var _valArr_3 = _valArr[1].split('&;');
                    _valArr_3.pop();
                    $.each(_valArr_3, function (ai, aval) {
                        if (aval !== "" && aval !== "undefined" && aval !== null) {
                            var option = new FormControlOption();
                            option.Value = aval;
                            option.Text = aval;
                            option.Sort = ai;
                            control.Options.push(option);
                        }
                    });
                    break;
                case '4': control.MaxLength = parseInt(_val) + 1; break;//注意一下
                case '5':
                    if (_val === '0') control.Format = "yyyy-MM";
                    else if (_val === '1') control.Format = "yyyy-MM-dd";
                    else if (_val === '2') control.Format = "yyyy-MM-dd HH:mm";
                    else control.Format = _val
                    break;
                case '7': control.Required = (_valArr[1] === 'true'); break;
            }
        });
        if (control.Type === "5") {
            var start = $.extend(true, {}, control);
            var end = $.extend(true, {}, control);
            start.Title = titles.length >= 1 ? titles[0] : "开始时间";
            start.Sort = sort++;
            control.Items.push(start);
            end.Title = titles.length >= 2 ? titles[1] : "结束时间";
            end.Sort = sort++;
            control.Title = "日期区间";
            control.Items.push(end);
        } else if (control.Type === "8") {
            control.Title = titles.length >= 1 ? titles[0] : "明细";
            control.Tips = titles.length >= 2 ? titles[1] : "增加明细";
        } else if (control.Type === "4") {
            if (control.MaxLength < 2) control.MaxLength = 2;
        } else {
            control.Title = titles[0];
        }
        return control;
    }
    function getDefaultTitle(type) {
        switch (type) {
            case "0": return "单行输入框";
            case "1": return "多行输入框";
            case "2": return "数字输入框";
            case "3": return "单选框";
            case "4": return "多选框";
            case "5": return "日期区间";
            case "6": return "日期";
            case "7": return "照片";
            case "8": return "嵌套框";
            default: return "";
        }
    }
/**********自定义图标********************/
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'UploadBtn',
        url: 'http://60.190.202.49:1000/api/Common/UploadFile',
        multi_selection: false,
        filters: {
            max_file_size: '10mb',
            mime_types: [
                { title: "图片", extensions: "png,jpg,jpeg,bmp,gif" }
            ]
        },
        flash_swf_url: '/Web/Assets/plupload/Moxie.swf',
        silverlight_xap_url: '/Web/Assets/plupload/Moxie.xap',
        init: {
            PostInit: function () {
            },
            FilesAdded: function (up, files) {
                if (uploadflag) {
                    for (var i = 0; i < files; i++) {
                        uploader.removeFile(files[i]);
                    }
                    alert("正在上传图片，请稍后");
                    return;
                }
                uploadflag = true;
                $("#UploadBtn").attr("src", "");
                uploader.start();
            },
            FileUploaded: function (up, file, data) {
                uploader.removeFile(file);
                uploadflag = false;
                var json = eval("(" + data.response + ")");
                if (json.Status == 1) {
                    $("#IcoUrl").val(json.Data);
                    $("#UploadBtn").attr("src", json.Data);
                } else {
                    $("#UploadBtn").attr("alt", "上传失败");
                }
            },
            UploadProgress: function (up, file) {
                $("#UploadBtn").attr("alt", file.percent + "%");
            },
            Error: function (up, err) {
                uploadflag = false;
                $("#UploadBtn").attr("alt", "上传失败");
            }
        }
    });
    uploader.init();

    $(".icon").click(function () {
        $(this).addClass("chk").siblings().removeClass("chk");
        var SRC=$(this).find("img").attr("data-src");
        $("#IcoUrl").val(SRC);
    });

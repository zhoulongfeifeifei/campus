
var mes = $('#message').val();
console.log(mes)
var dada = {};
dada.schoolId = window.schoolid;
commonFn({ url: 'XAWebBanpai/Get_AttendanceExts', type: 'POST', data: dada }, function (res) {
    $.each(res, function (i) {
        $('#wei').append('<span style="margin-right: 24px; display: inline-block;"><input class="device" type="checkbox" name="device" value="' + res[i].clint_id +
            '"  />&nbsp;' + res[i].roomName + '（' + res[i].clint_id + '）</span>')
    })

})


function deletefile(id) {
    for (var i in uploader.files) {
        if (uploader.files[i].id == id) {
            document.getElementById('filelist').removeChild(document.getElementById(id));
            uploader.removeFile(uploader.files[i]);
            break;
        }
    }
}
var fileamount = 0;

var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'pickfiles', // you can pass in id...
    //container: document.getElementById('container'), // ... or DOM Element itself
    url: '/api/Common/UploadFile',
    filters: {
        max_file_size: '10mb',
        mime_types: [
            { title: "Image files", extensions: "jpg,gif,png,bmp" }
        ]
    },
    resize: {
        height: 608,
        quality: 70,
        preserve_headers: false
    },
    // Flash settings
    flash_swf_url: '/assets/plupload/Moxie.swf',
    // Silverlight settings
    silverlight_xap_url: '/assets/plupload/Moxie.xap',
    init: {
        PostInit: function () {
            document.getElementById('filelist').innerHTML = '';

            document.getElementById('save').onclick = function () {
                uploader.start();
                return false;
            };
        },
        FilesAdded: function (up, files) {
            plupload.each(files, function (file) {
                var preview = '<div id="' + file.id + '" class="dz-preview dz-image-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name="">' + file.name + '</span></div><div class="dz-size" data-dz-size=""><strong>' + plupload.formatSize(file.size) + '</strong></div><img id="img_' + file.id + '" data-dz-thumbnail="" alt="' + file.name + '" src=""></div><div class="progress progress-small progress-striped active"><div id="progress_' + file.id + '" class="progress-bar progress-bar-success" data-dz-uploadprogress=""></div></div><div class="dz-title"><input type="text" id="title_' + file.id + '" class="dz-title-input" value="" placeholder="请输入图片描述"></div><div class="dz-success-mark"><span></span></div><div class="dz-error-mark"><span></span></div><div id="message_' + file.id + '" class="dz-error-message"><span data-dz-errormessage=""></span></div><a id="remove_' + file.id + '" class="dz-remove" href="javascript:deletefile(\'' + file.id + '\');" data-dz-remove="">移除</a></div>';
                document.getElementById('filelist').innerHTML += preview;
                previewImage(file, function (img) {
                    document.getElementById("img_" + file.id).src = img;
                });
            });
        },
        BeforeUpload: function (up, file) {
            file.name = document.getElementById("title_" + file.id).value;
            document.getElementById("remove_" + file.id).innerHTML = "上传中";
            fileamount++;
        },
        UploadProgress: function (up, file) {
            document.getElementById("progress_" + file.id).style.width = file.percent + "%";
        },
        FileUploaded: function (up, file, data) {

            if (mes != '') {
                mes = 'abc'
            } else {
                mes = '0'
            }
            var result = eval("(" + data.response + ")");
            console.log(result);
            if (result.status == 1) {
                var devices = "";
                var devicelen = $('.device:checked').length - 1;
                $('.device[name="device"]:checked').each(function (i) {
                    var $this = $(this);
                    // console.log(e);
                    // console.log($('.device:checked'));
                    // if ($this.attr('checked')) {
                    devices += $this.val();
                    if (i != devicelen) {
                        devices += ",";
                    }
                    // }
                });
                if (devices == null || devices == "") {
                    alert("请选择设备");
                    return false;
                }
                if ($('#title_' + file.id).val() == '') {
                    title = '0';
                } else {
                    title = $('#title_' + file.id).val();
                }
                commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + devices + '&img=' + result.data[0] + '&sno=' + '0' + '&message=' + mes + '&schoolid=' + window.schoolid + '&type=0', type: 'GET' }, function (res) {
                    console.log(res);
                    $('#message').val('abc');
                    document.getElementById(file.id).className = "dz-preview dz-image-preview dz-success";
                    document.getElementById("remove_" + file.id).innerHTML = "移除";
                    fileamount--;
                    // if (res.status) {
                    //     if (fileamount <= 0) {
                    //         $('.s_notice').innerHTML = '上传完毕.';

                    //     }
                    // } else {
                    //     // top.parent.showTips(res.message, 5);
                    // }

                })

            } else {
                fileamount--;
                document.getElementById('message_' + file.id).innerHTML += "<span data-dz-errormessage>" + (result == null ? "上传失败." : result.msg) + "</span>";
                document.getElementById(file.id).className = "dz-preview dz-image-preview dz-error";
                document.getElementById("remove_" + file.id).innerHTML = "删除";
            }
        },
        UploadComplete: function (up, files) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file != null) {
                    var doc = document.getElementById(file.id);
                    if (doc != null && hasClass("dz-success", doc)) {
                        document.getElementById('filelist').removeChild(doc);
                    }
                }

            }

            //上传完成以后发布
            var devices = "";
            var devicelen = $('.device:checked').length - 1;
            // $('.device').each(function (i) {
            //     var $this = $(this);
            //     if ($this.attr('checked')) {
            //         devices += $this.val();
            //         if (i != devicelen) {
            //             devices += ",";
            //         }
            //     }
            // });
            $('.device[name="device"]:checked').each(function (i) {
                var $this = $(this);
                devices += $this.val();
                if (i != devicelen) {
                    devices += ",";
                }
            });
            if (devices == null || devices == "") {
                alert("请选择设备");
                return false;
            }

            commonFn({ url: 'XAWebBanpai/GetList_BaPingByDevice?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
                // console.log(res);
                location.href = 'screen.html';
            })
        },
        Error: function (up, err) {
            document.getElementsByClassName('s_notice').innerHTML = err.code + ": " + err.message;
            //document.getElementById(file.id).getElementsByClassName('message')[0].innerHTML += "<span data-dz-errormessage>" + err.code + ": " + err.message + "</span>";
            //add dz-error
        }
    }
});
uploader.init();

//plupload中为我们提供了mOxie对象
//有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
function previewImage(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数 
    if (!file || !/image\//.test(file.type)) return; //确保文件是图片
    if (file.type == 'image/gif') {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function () {
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    } else {
        var preloader = new mOxie.Image();
        preloader.onload = function () {
            preloader.downsize(140, 140);//先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load(file.getSource());
    }
}
function hasClass(className, node) {
    var classNames = node.className.split(/\s+/);    //步骤1

    for (var i = 0; i < classNames.length; i++) {         //步骤2
        if (classNames[i] == className) {
            return true;
        }
    }

    return false;
}



// $('#save').on('click', function () {
//     commonFn({ url: 'Common/UploadFile', type: 'POST' }, function (res) {
//         console.log(res);
//     })
// })

/** 
layui.upload({
    url: 'http://60.190.202.49:1000/api/Common/UploadFile'
    , elem: '#logo_file' //指定原始元素，默认直接查找class="layui-upload-file"
    , method: 'post' //上传接口的http类型
    , success: function (res) {

        // console.log(filename);
        if (res.status == 1) {
            // var preview = '<div id="' + file.id + '" class="dz-preview dz-image-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name="">' + file.name + '</span></div><div class="dz-size" data-dz-size=""><strong>' + plupload.formatSize(file.size) + '</strong></div><img id="img_' + file.id + '" data-dz-thumbnail="" alt="' + file.name + '" src=""></div><div class="progress progress-small progress-striped active"><div id="progress_' + file.id + '" class="progress-bar progress-bar-success" data-dz-uploadprogress=""></div></div><div class="dz-title"><input type="text" id="title_' + file.id + '" class="dz-title-input" value="" placeholder="请输入图片描述"></div><div class="dz-success-mark"><span></span></div><div class="dz-error-mark"><span></span></div><div id="message_' + file.id + '" class="dz-error-message"><span data-dz-errormessage=""></span></div><a id="remove_' + file.id + '" class="dz-remove" href="javascript:deletefile(\'' + file.id + '\');" data-dz-remove="">移除</a></div>';
            // document.getElementById('filelist').innerHTML += preview;

            // layer.msg("上传成功！", { time: 1000 }, function () {
            //     $("#filelist img").attr("src", res.data)
            //     $("#filename").val(res.data);
            // });
        } else {
            layer.msg(res.message, { time: 1000 });
        }
    }
});
*/

/**
$("#logo_file").change(function () {
    var file = $('#logo_file').get(0).files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024) fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        // console.log(file.name, fileSize, file.type);
    }
    var preview = '<div id="' + file.lastModified + '" class="dz-preview dz-image-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name="">' + file.name + '</span></div><div class="dz-size" data-dz-size=""><strong>' + fileSize + '</strong></div><img id="img_' + file.lastModified + '" data-dz-thumbnail="" alt="' + file.name + '" src=""></div><div class="progress progress-small progress-striped active"><div id="progress_' + file.lastModified + '" class="progress-bar progress-bar-success" data-dz-uploadprogress=""></div></div><div class="dz-title"><input type="text" id="title_' + file.lastModified + '" class="dz-title-input" value="" placeholder="请输入图片描述"></div><div class="dz-success-mark"><span></span></div><div class="dz-error-mark"><span></span></div><div id="message_' + file.lastModified + '" class="dz-error-message"><span data-dz-errormessage=""></span></div><a id="remove_' + file.lastModified + '" class="dz-remove" href="javascript:deletefile(\'' + file.lastModified + '\');" data-dz-remove="">移除</a></div>';
    document.getElementById('filelist').innerHTML += preview;
    previewImage(file, function (img) {
        document.getElementById("img_" + file.lastModified).src = img;
    });
});
 */

console.log(window.location.href);
var temp = window.location.search;
var str1 = temp.split("&");
var num = str1[0].replace('?clint_id=', '');
console.log(str1);
// var num = window.location.search.replace('?clint_id=', '');
$('#num').append('<input type="checkbox" name="device" class="device" value="' + num + '" checked="checked" />' + num);

if (window.location.href.indexOf('&posi=00') != -1) {
    pop = 2
} else {
    pop = 1
}

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
            var result = eval("(" + data.response + ")");
            if (result.status == 1) {
                var devices = "";
                var devicelen = $('.device:checked').length - 1;
                $('.device').each(function (i) {
                    var $this = $(this);
                    if ($this.attr('checked')) {
                        devices += $this.val();
                        if (i != devicelen) {
                            devices += ",";
                        }
                    }
                });
                console.log(devices)
                if (devices == null || devices == "") {
                    alert("请选择设备");
                    return false;
                }
                if ($('#title_' + file.id).val() == '') {
                    title = '0';
                } else {
                    title = $('#title_' + file.id).val();
                }
                
                commonFn({ url: 'XAWebCommon/Update_LunboImg?devideids=' + devices + '&img=' + result.data[0] + '&title=' + title + '&type=1&position=' + pop, type: 'GET' }, function (res) {
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
                commonFn({ url: 'XAWebXiaopai/Get_AttendanceTemplate?deviceid=' + num, type: 'GET' }, function (res) {
                    templaid = res.templateId
                    commonFn({ url: 'XAWebXiaopai/Update_XpTemplate?deviceid=' + num + '&templateid=' + templaid + '&save=1&type=1', type: 'GET' }, function (res) {
                        // alert(res);
                        type = 1;
                    })
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
            $('.device').each(function (i) {
                var $this = $(this);
                if ($this.attr('checked')) {
                    devices += $this.val();
                    if (i != devicelen) {
                        devices += ",";
                    }
                }
            });
            if (devices == null || devices == "") {
                alert("请选择设备");
                return false;
            }
            // $.post("/common/Ajax.aspx", { action: "album.publish", deviceid: devices }, function (json) {
            //     if (json.status) {
            //         top.parent.showTips(json.message, 4);
            //         location.href = "AlbumDesign.aspx?deviceid=109CB00B375A8D7E+&intype=0";
            //     } else top.parent.showTips(json.message, 5);
            // }, 'json');

            commonFn({ url: 'XAWebCommon/GetList_LunboByDevice?deviceid=' + devices + '&position=' + pop, type: 'GET' }, function (res) {
                if (window.location.href.indexOf('&posi=00') != -1) {
                    location.href = 'notice2.html?clint_id=' + num;
                } else {
                    location.href = 'Lunbo.html?clint_id=' + num;
                }
                
                // window.history.back(-1)

                // $.each(res,function(i){
                //     $('.ace-thumbnails').append('<li style="padding-bottom: 25px; border: 0"><a href="' + res[i].img +
                //     '" data-rel="colorbox"></a><img width="150" height="84" style="display: block;" src="' + res[i].img +
                //     '" /><div class="tools tools-bottom" data-id="' + res[i].id +
                //     '"><a href="javascript:;" class="delete"><i class="ace-icon fa fa-times red"></i></a></div><input class="title" value="" style="width: 150px;" /></li>')
                // })
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



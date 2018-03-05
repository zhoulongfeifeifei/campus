

var mes = $('#message').val();
$(function () {
    var $mubanWrap = $('.muban-wrap');
    var _mubanWidth = $mubanWrap.width();
    $mubanWrap.height($mubanWrap.width() * 9 / 16);
    // var deviceid = "0BFC8690DB84F51E";
    // if (deviceid != "") {
    //     $("#device").val("0BFC8690DB84F51E");
    // }
})

console.log(window.location.href);
var mes = $('#message').val();

var stm = window.location.search.split('&')
var num = stm[0].replace('?deviceid=', '');
var name = decodeURI(stm[1].replace('name=', ''));
var sno = stm[2].replace('sno=', '');
$('#return').click(function () {
    $(this).attr('href', 'template.html?id=' + num + '&name=' + name)
})

commonFn({ url: 'XAWebBanpai/Get_AllScreen?sno=0&deviceid=' + num, type: 'GET' }, function (res) {
    console.log(res);
    if (res.state == 1 || res.state == 0 || res.state == '' || res.state == null) {
        sta = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>'
    } if (res.state == 2) {
        sta = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>&nbsp;&nbsp;<a class="text link red cancel" val="20170517083550">取消发布</a>'

    }
    $('#device').after(sta)
    if (res.allScreen != null && res.allScreen != '') {
        var imgs = res.allScreen;
        $.each(imgs, function (i) {
            $('.muban-wrap .imgList').append('<li><a href="#"><img class="muban-wrap" src="' + imgs[i].img + '" alt="图片" /></a></li>')
        })
    }


    var curIndex = 0; //当前index
    var firstimg = $('.imgList li').first().clone(); //复制第一张图片  
    $('.imgList').append(firstimg).width($('.imgList li').length * ($('.imgList img').width()));
    var imgLen = $(".imgList li").length; //图片总数
    var width = imgLen * 700;
    $(".imgList").css("width", width + "px");
    // 定时器自动变换2.5秒每次
    var autoChange = setInterval(function () {
        if (curIndex < imgLen - 1) {
            curIndex++;
        } else {
            curIndex = 0;
            $('.imgList').css({ left: 0 });
        }
        //调用变换处理函数
        changeTo(curIndex);
    }, 2500);
    function changeTo(num) {
        var goLeft = num * 700;
        var picNum = imgLen - 1
        $(".imgList").animate({ left: "-" + goLeft + "px" }, 500);
    }

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
                    //同步预览页的图片
                    $('.imgList li').last().remove();
                    $('.imgList').append("<li><a href=\"#\"><img class=\"muban-wrap\" src=\"" + img + "\" /></a></li>");
                    var firstimg = $('.imgList li').first().clone(); //复制第一张图片  
                    $('.imgList').append(firstimg).width($('.imgList li').length * ($('.imgList img').width()));
                    imgLen = $(".imgList li").length; //图片总数
                    var width = imgLen * 700;
                    $(".imgList").css("width", width + "px");
                });
            });
        },
        BeforeUpload: function (up, file) {
            // file.name = document.getElementById("title_" + file.id).value;
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
            if (result.status == 1) {
                // var devices = "";
                // var devicelen = $('.device:checked').length - 1;
                // $('.device[name="device"]:checked').each(function (i) {
                //     var $this = $(this);
                //     // console.log(e);
                //     // console.log($('.device:checked'));
                //     // if ($this.attr('checked')) {
                //     devices += $this.val();
                //     if (i != devicelen) {
                //         devices += ",";
                //     }
                //     // }
                // });
                // if (devices == null || devices == "") {
                //     alert("请选择设备");
                //     return false;
                // }
                if ($('#title_' + file.id).val() == '') {
                    title = '0';
                } else {
                    title = $('#title_' + file.id).val();
                }
                commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + num + '&img=' + result.data[0] + '&sno=' + sno + '&message=' + mes + '&schoolid=' + window.schoolid + '&type=0', type: 'GET' }, function (res) {
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
            // var devices = "";
            // var devicelen = $('.device:checked').length - 1;
            // $('.device[name="device"]:checked').each(function (i) {
            //     var $this = $(this);
            //     devices += $this.val();
            //     if (i != devicelen) {
            //         devices += ",";
            //     }
            // });
            // if (devices == null || devices == "") {
            //     alert("请选择设备");
            //     return false;
            // }

            commonFn({ url: 'XAWebBanpai/GetList_BaPingByDevice?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
                // console.log(res);
                location.href = 'BaPing.html?deviceid=' + num + '&name=' + name;
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



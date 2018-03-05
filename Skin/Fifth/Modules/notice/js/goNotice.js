
var layer = layui.layer,
    form = layui.form(),
    upload = layui.upload,
    tree = layui.tree,
    $ = layui.jquery,
    YunFileList = [],
    users,classid,phones,
    SendType = new Array(),
    msgTypes = window.localStorage.getItem('msgTypes'),
    addsigmodal,fileName;
getSign();
upload({
    url: window.apiUrl+'Common/ImportFile',
    title: '本地文件',
    async: false,
    elem: '.local',
    before:function(input){
        fileName = input.files[0].name;
    },
    success: function(res) {
        if (res.status) {
        	var strSplit=fileName.split(" ");
        	if(strSplit.length!=1){
        		layer.msg('改地址含有空格，请从新选择',{time:1000});
        	}else{
        		 $('.selfUpload').append('<div class="layui-form-mid layui-word-aux wenjian" data-url=' + res.data + ' data-id=0><p>' + fileName + '</p><i class="layui-icon">&#x1006;</i></div>')
	            $('.wenjian i').on('click', function() {
	                $(this).parent().remove();
	            })
        	}          
        } else {
            layer.msg("文件上传失败", {
                shift: 6,
                time: 1000
            })
        }
    }
});
if (msgTypes) {
    msgTypes = msgTypes.split(",");
    $.each(msgTypes, function(index, val) {
        if (val == 2) {$('.msgExclusive').removeClass('none')}
        $.each($('.sentype'), function(i, el) {
            if ($(el).val() == val)
                $(el).prop('checked','true');
        });
    });
    form.render('checkbox');
    form.render('radio');

}  
form.on('radio(timedshortmsg)',function(data){
    if (data.value == 4) {
        $('.selectTime').removeClass('none')
    }else{
        $('.selectTime').addClass('none')
    }
})
form.on('checkbox(shortmsg)',function(data){
    if (data.elem.checked) {
        $('.msgExclusive').removeClass('none')
    }else{
        $('.msgExclusive').addClass('none')
    }
})

$('.choice').click(function() {
        $(this).val('重新选择')
        $('input[name="openObject"]').val('');
        $('input[name="openObject"]').attr('data-id', '')
        layer.open({
            type: 2,
            title: "选择收件人",
            closeBtn: 1,
            shadeClose: true,
            skin: 'yourclass',
            area: ['600px', '500px'],
            content: '../../Common/Receiver/Receiver.html?id=2', //这里content是一个DOM
            btn: ['确定'],
            yes: function(index, layero) {
                //取数据方法
                var userIds=[],classIds= [],phones=[];
                var userNames="";
                var lis=$(layero).find("iframe").contents().find("#Peoples li");
                $.each(lis,function(i, n) {
                    var userid = $(n).attr("data-id");
                    var username = $(n).find('a').html();
                    userIds.push(userid);   
                    classIds.push($(n).attr("data-classid"))
                    phones.push($(n).attr("data-phone"))
                    if(i==0){
                        userNames=username;
                    }else{
                        userNames+=','+username;
                    }
                })
                $('input[name="openObject"]').val(userNames);
                users = userIds;
                classid = classIds;

                layer.close(index);
            }
        })
    })
    // 增加署名的
$('.addSignature').click(function(event) {
    addsigmodal = layer.open({
        type: 1,
        title: '增加署名',
        closeBtn: 1,
        shadeClose: true,
        btn: "确定",
        area: ['300px', '180px'],
        content: $('#sig'), //这里content是一个DOM
        yes: function() {
            var strname = $('input[name="sign"]').val(),
                falg = true;
            $('#Signature option').each(function(index, el) {
                if ($(el).val() == strname) {
                    layer.msg("已存在该署名");
                    falg = false
                }
            });
            if (falg) {
                $('#Signature').append('<option value="' + strname + '">' + strname + '</option>');
                form.render();
                if ($.trim(strname).length > 0) {
                    updateSigns("增加", addsigmodal);
                } else {
                    layer.msg("署名不能为空");
                }
            }
        }
    })
});
$('.removeSignature').click(function(event) {
    var sign = $('#Signature').val();
    if (sign) {
        layer.confirm('确定删除"' + sign + '"署名吗?', {
            icon: 3,
            title: "删除署名提示"
        }, function(index) {
            $('#Signature').append('<option></option>')
            $('#Signature').find('option[value="' + sign + '"]').remove();
            form.render();
            updateSigns("删除", index);
        })
    }
});

$('.cloudDisk').click(function(event) {
    $(this).val("重新选择");
    $('.cloudList').empty();
    $('.reSelect').css('display', 'inline');
    $('#Personal ,#Public , #OK').empty();
    layer.open({
        type: 1,
        title: "云盘选择文件",
        content: $('#Tree'),
        area: ['900px', '500px'],
        btn: "确定",
        success: function() {
            $('#Personal ,#Public , #OK').empty();
            commonFn({
                url: 'CloudPan/GetFileList',
                data:{schoolId : window.schoolid}
            }, function(res) {
                // 个人盘
                if (res.personal && res.personal.length > 0) {
                    var nodes = [],
                        t = res.personal;
                    $.each(t, function(index, el) {
                        var obj = {};
                        obj.name = el.folderName;
                        obj.children = [];
                        if (el.files && el.files.length > 0) {
                            $.each(el.files, function(index1, el1) {
                                var obj1 = {};
                                obj1.name = el1.fileName;
                                obj1.id = el1.id;
                                obj.children.push(obj1);
                            });
                        }
                        if (el.childFolders && el.childFolders.length > 0) {
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
                if (res.public && res.public.length > 0) {
                    var nodes = [],
                        t = res.public;
                    $.each(t, function(index, el) {
                        var obj = {};
                        obj.name = el.className;
                        obj.children = [];
                        if (el.files && el.files.length > 0) {
                            $.each(el.files, function(index1, el1) {
                                var obj1 = {};
                                obj1.name = el1.fileName;
                                obj1.id = el1.id;
                                obj.children.push(obj1);
                            });
                        }
                        if (el.childFolders && el.childFolders.length > 0) {

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
        },
        yes: function(index, layero) {
            var idName = $(layero).find('#OK');
            $(idName).children('li').each(function(index, el) {
                var obj = {}
                obj.fileid = $(el).attr('data-id')
                obj.filename = $(el).find('p').text()
                YunFileList.push(obj);
                $('.cloudList').parent().removeClass('none')
                $('.cloudList').append('<p data-id =' + obj.fileid + '>' + obj.filename + '</p>')
            });

            layer.close(index);
        }
    })
});

form.on('submit(Sava)', function() {
    var chelength = $('.pushType input[type="checkbox"]:checked').length;
    $('.pushType input[type="checkbox"]:checked').each(function(index, el) {
        var $index = index + 1;
         if ($(el).val() == 1) {
            var sendload =layer.load();
            sendBatchAttachMsg(solveSaveData1And2(),function(res){
                layer.close(sendload);
                if (chelength == $index) {
                    layer.msg("已全部发送App消息",{time:1500},function(){
                        location.href = "noticesend.html?id=116"
                    })
                }    
            })
        }else if($(el).val() == 2){
            if (chelength == $index) {
                layer.msg("已全部发送",{time:1500},function(){
                    location.href = "noticesend.html?id=116"
                })
            }   
           $('.msgExclusive input:checked').each(function(index2, ell) {
                // 即时短信
                if ($(ell).val()==3) {


                // 定时短信   -- 信息站点不一样
                }else if($(ell).val()==4){

                }
           })
        }else if ($(el).val() == 0) {
            var modal = {};
            // 署名
            modal.signature = $('#Signature').val();
            // modal.SendType  = SendType.join(',');
            var strFileList = [];
            $('.selfUpload .wenjian').each(function(index, el) {
                var filename = $(el).find('p').text();
                var fileurl = $(el).attr('data-url');
                var fileid = $(el).attr('data-id');
                strFileList.push({
                    filename: filename,
                    fileurl: fileurl,
                    fileid: fileid||0
                });
            });
            // 人物
            modal.toUsers = users;
            // 文件
            modal.FileList = JSON.stringify(strFileList);
//			console.log(typeof modal.FileList);
            // 云盘的文件
//          modal.YunFileList = YunFileList;
			modal.YunFileList = JSON.stringify(YunFileList);
//			console.log(typeof modal.YunFileList);
            modal.imgFile = $('#uploadimg').attr('src') ||  "url";

            modal.msgContent = $('#Notes').val();
            var savaLoad = layer.load();
            // return;
            commonFn({
                url: 'MessageNotify/add',
                data: modal,
                type: 'post'
            }, function(data) {
                layer.close(savaLoad);
                if (chelength == $index) {
                    layer.msg("已全部发送站内消息",{time:1500},function(){
                        location.href = "noticesend.html?id=116"
                    })
                }   
            })
        };
    });
})

function solveSaveData1And2(){
    var obj = {
        toAccids:users,
        toReces : [],
        // toReces : [{ 
        //     toAccid: "112804",
        //     class_id:0,
        //     type : 0  ,
        //     receiveId :0,
        //     toPhone: "15305755683",
        //     numType: window.localStorage.getItem('numtype')
        // }],
        attach:JSON.stringify({
            type:'attach',
            content : $('#Notes').val() + '————' + $('#Signature').val(),
            // files : "http://sincere-app.oss-cn-hangzhou.aliyuncs.com/Images/76a4bea1a61e485faebef3b0095fbb32.jpg",
            // imageHeight:1920,
            // imageWidth:1152,
            isSelectedCityCard : false,
            isGroup :users.length > 1 ? 1 : 0
        })
    }
    $.each(users, function(index, val) {
         obj.toReces.push({
            toAccid:val,
            class_id:classid[index-1],
            type : 0  ,
            receiveId :0,
            toPhone: $.isArray(phones) ? phones[index-1] : 0,
            numType: window.localStorage.getItem('numtype')
        })
    });
    return obj;
}

function updateSigns(fuck, index) {
    var signArr = [];
    $('#Signature option[value]').each(function(index, el) {
        signArr.push($(el).val());
    });
    var signStr = '';
    if (signArr.length > 0) {
        signStr = signArr.join(',')
    }
    var data = {};
    if(signStr){
        data.sign= signStr;
    }
    var removeSignLoad = layer.load();
    commonFn({
        url: 'Teacher/UpdateSigns',
        data: data
    }, function(res) {
        $('input[name="sign"]').val('')
        layer.close(removeSignLoad);
        if (res.Status == 1) {
            layer.msg(fuck + "成功")
        }
        getSign();
    })
    layer.close(index);
}
function getSign() {
    $('#Signature').empty();
    commonFn({
        url: 'Teacher/GetTeacherSign',
        type:'post'
    }, function(res) {
        if (res && res.length > 0) {
            $.each(res, function(index, el) {
                $('#Signature').append('<option value="' + el + '">' + el + '</option>')
            });
            form.render('select');
        }

    })
}
// 这是循环云盘的文件和文件夹的列表的递归方法
function loop(arr) {
    if (arr && arr.length > 0) {
        var obj, nodes = [];
        $.each(arr, function(index, el) {
            obj = {};
            obj.name = el.folderName;
            obj.children = [];
            if (el.files && el.files.length > 0) {
                $.each(el.files, function(index1, el1) {
                    var obj1 = {};
                    obj1.name = el1.fileName;
                    obj1.id = el1.id;
                    obj.children.push(obj1)
                });
            }
            if (el.fhildFolders && el.fhildFolders.length > 0) {
                obj.children = $.merge(loop(el.fhildFolders), obj.children);
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
    if (e.children) {
        layer.msg("目前不支持导入文件夹全部文件,请选择文件");
    } else {
        // 只能增加十个
        if ($('#OK li').length < 10) {
            // 判断当有选择文件的时候,现在选的文件在已经选的文件里是否存在
            if ($('#OK li').length > 0) {
                $('#OK li').each(function(index, el) {
                    if (e.id == $(el).attr('data-id')) {
                        layer.msg("这个文件已经选择过了");
                        return false;
                    } else if (index + 1 == $('#OK li').length) {
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
function clearKeeper() {
    $('input[name="openObject"]').val("");
    $('input[name="openObject"]').removeAttr("data-id")
}
var form = layui.form(),
    $ = layui.jquery,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
var Id = getUrlParam('id');
var zhuanyeul,zhongkaoul,mianshiul;
//**************/日期问题****************/
var start = {
    min: laydate.now(),
    max: '2099-06-16 23:59:59',
    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
    istime: true, //是否开启时间选择
    isclear: true, //是否显示清空
    istoday: true, //是否显示今天
    issure: true, //是否显示确认
    choose: function (datas) {
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas; //将结束日的初始值设定为开始日
    }
};
var end = {
    min: laydate.now(),
    max: '2099-06-16 23:59:59',
    istoday: true,
    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
    istime: true, //是否开启时间选择
    isclear: true, //是否显示清空
    issure: true, //是否显示确认
    choose: function (datas) {
        start.max = datas; //结束日选好后，重置开始日的最大日期
    }
};
document.getElementById('LAY_demorange_s').onclick = function () {
    start.elem = this;
    start.format = 'YYYY-MM-DD hh:mm:ss';
    laydate(start);
}
document.getElementById('LAY_demorange_e').onclick = function () {
    end.elem = this;
    end.format = 'YYYY-MM-DD hh:mm:ss';
    laydate(end);
}
var tool = {
    tool: [
        'strong' //加粗
        , 'italic' //斜体
        , 'underline' //下划线
        , 'del' //删除线
        , '|' //分割线
        , 'left' //左对齐
        , 'center' //居中对齐
        , 'right' //右对齐
        , 'face' //表情
    ]
}
//描述说明的编辑器
var index1 = layedit.build('miaoshu', tool);
//通知书的编辑器
var index2 = layedit.build('tongzhishu', tool);
//感谢信的编辑器
var index3 = layedit.build('ganxiexin', tool);

XiuGai(Id)
function XiuGai(ids) {
    //拿到一条编辑的数据
    var ajaxinfor = {
        url: 'SignupManage/GetModelProject?id=' + ids,
    }
    commonFn(ajaxinfor, function (res) {
        $('input[name="projectName"]').val(res.name)
        $('input[name="starttime"]').val(solveTime(res.startTime))
        $('input[name="endtime"]').val(solveTime(res.endTime));
        $('input[name="publictime"]').val(solveTime(res.publishTime));
        $('input[name="zhiyuan"]').val(res.volunteerNum);
        $('input[name="Switch"][value=' + res.canUpload + ']').attr('checked', 'checked')
        form.render();
        if (res.canUpload == 0) {
            $('#yincang').hide()
        }
        form.on('radio(rdd)', function (data) {
            console.log(data.value); //被点击的radio的value值
            if (data.value == 1) {
                $('#yincang').show()
            }
            if (data.value == 0) {
                $('#yincang').hide()
            }
        })
        $('#miaoshu').val(res.descript);
        edit1 = layedit.build('miaoshu', tool);
        $('textarea#tongzhishu').val(res.tongZhiShuTemplate);
        edit2 = layedit.build('tongzhishu', tool);
        $('textarea#ganxiexin').val(res.ganXieXinTemplate);
        edit3 = layedit.build('ganxiexin', tool);
    })
    $('body').on('click', '#baocun', function () {
        //拿到新修改的值,重新当参数传到灯芯数据的接口中
        var Date = {};
        Date.id = Id;
        Date.name = $('input[name="projectName"]').val();
        Date.startTime = $('input[name="starttime"]').val();
        Date.endTime = $('input[name="endtime"]').val();
        Date.publishTime = $('input[name="publictime"]').val();
        Date.volunteerNum = $('input[name="zhiyuan"]').val();
        Date.canUpload = $('input[type="radio"]:checked').val();
        Date.descript = '' || layedit.getContent(edit1);
        Date.tongZhiShuTemplate = '' || layedit.getContent(edit2);
        Date.ganXieXinTemplate = '' || layedit.getContent(edit3);
        //判断有木有专业的上传文件url,如果有,上传到更新接口,
        // 如果没有,就不传这个文件地址,
        // 但还要保存其他修改的内容,必须要再次调用这个
        // 更新的接口,以保存其它的内容的更新数据
        //专业的更新
        if (zhongkaoul) {
            Date.zhongkaoUl = zhongkaoul
        }
        ;
        if (zhuanyeul) {
            Date.zhuanyeUl = zhuanyeul;
        }
        ;
        if (mianshiul) {
            Date.mianshiUl = mianshiul;
        }
        //判断6个必选项是否为空,为空时给予提示,都不为空时对接接口,保存数据成功
        if (!Date.name) {
            layer.msg('项目名称不能为空');
            return false;
        } else if (!Date.startTime) {
            layer.msg('开始时间不能为空')
            return false;
        } else if (!Date.endTime) {
            layer.msg('结束时间不能为空')
            return false;
        } else if (!Date.publishTime) {
            layer.msg('公布时间不能为空')
            return false;
        } else if (!Date.volunteerNum) {
            layer.msg('志愿数量不能为空')
            return false;
        } else {
            //进行url判断,当url有值时,调用接口
            var ajaxinfor = {
                url: 'SignupManage/UpdateProject',
                data: Date,
                timeout:99999999,
                type: 'post'
            }
            commonFn(ajaxinfor, function (res) {
                if (zhongkaoul) {
                    ZhongKao(Id, zhongkaoul);
                    layer.msg('保存成功', {time: 1000}, function () {
                        location.href = 'BaoMingGuanli.html'
                    });
                }
                if (zhuanyeul) {
                    ZhuanYe(Id, zhuanyeul);
                    layer.msg('保存成功', {time: 1000}, function () {
                        location.href = 'BaoMingGuanli.html'
                    });
                }
                if (mianshiul) {
                    MianShi(Id, mianshiul);
                    layer.msg('保存成功', {time: 1000}, function () {
                        location.href = 'BaoMingGuanli.html'
                    });
                }
                {
                    layer.msg('保存成功', {time: 1000}, function () {
                        location.href = 'BaoMingGuanli.html'
                    });
                }
            })
            $('body').on('click', '#quxiao', function () {
                location.href = "BaoMingGuanli.html";
            })
        }
    })
}
/*************文件上传***************/
//专业的
$('input[name="zhuanye"]').hide();
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload1'
    , title: '请上传文件'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        zhuanyeul = res.data;
        $('input[name="zhuanye"]').val(zhuanyeul);
        $('#zhuan').val(getFileName(zhuanyeul));
        $('#zhuan').attr('url',getFileName(zhuanyeul));
        $('input[name="zhuanye"]').show();
        layer.msg('上传成功', {time: 500});
    }
});
//学生中考成绩的
$('input[name="zhongkao"]').hide();
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload2'
    , title: '请上传文件'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        zhongkaoul = res.data;
        console.log(zhongkaoul)
        $('input[name="zhongkao"]').val(zhongkaoul);
        $('#zhongkao').val(getFileName(zhongkaoul));
        $('#zhongkao').attr('url',getFileName(zhongkaoul));
        $('input[name="zhongkao"]').show();
        layer.msg('上传成功', {time: 500})
    }
});
//面试专业数据的
$('input[name="mianshi"]').hide()
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload4'
    , title: '请上传文件'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        mianshiul = res.data;
        $('input[name="mianshi"]').val(mianshiul);
        $('#mianshi').val(getFileName(mianshiul));
        $('#mianshi').attr('url',getFileName(mianshiul));
        $('input[name="mianshi"]').show();
        layer.msg('上传成功', {time: 500})
    }
});
function getFileName(u){
    var arr = u.split('/');
    return arr[arr.length-1];
}
//通过id,和上传的文件地址得到,专业数据,学生中考成绩上传到接口
//学生的专业数据对接接口
function ZhuanYe(projectid, ul) {
    var ajaxUp = {
        url: 'SignupManage/ProfessionImport',
        timeout:99999999,
        data: {
            projectid: projectid,
            url: ul || '',
        },
        type: 'Get'
    }
    commonFn(ajaxUp, function (res) {
        zhuanyeurl = res;
        layer.msg('上传成功', {time: 500})
    })
}
//学生的中考成绩对接接口
function ZhongKao(projectid, url) {
    var ajaxZhongKao = {
        url: 'SignupManage/StudentImport',
        timeout:99999999,
        data: {
            projectid: projectid ,
            url: url || ''
        }
    }
    commonFn(ajaxZhongKao, function (res) {
        layer.msg('上传成功', {time: 500})
    })
}
//学生的面试分数对接接口
function MianShi(projectid, url) {
    var ajaxZhongKao = {
        url: 'SignupManage/MianShiImport',
        timeout:99999999,
        data: {
            projectid: projectid,
            url: url || ''
        }
    }
    commonFn(ajaxZhongKao, function (res) {
        layer.msg('上传成功', {time: 500})
    })
}
/*********专业数据,招生教师账号下载***********/
$('body').on('click', '#zhuanye', function () {
    window.location.href = window.siteHost + "Filedown/GetModelTemplate?alias=zhuanyeshuju";
})
$('body').on('click', '#mianshifen', function () {
    window.location.href = window.siteHost + "Filedown/GetModelTemplate?alias=mianshichengji";
})
$('body').on('click', '#jiaoshi', function () {
    window.location.href = window.siteHost + "Filedown/GetModelTemplate?alias=zhaoshengjiaoshi";
})
$('body').on('click', '#student', function () {
    window.location.href = window.siteHost + "Filedown/GetModelTemplate?alias=zhongkaoshuju";
})
//通知书示例的弹窗
$('body').on('click','#tongzhili',function () {
    layer.open({
        type: 1,
        title: '通知书填写示例',
        area: ['900px', '400px'],
        maxmin:true,
        content: $('#shili'),
        btn: ['关闭'],
    })
})
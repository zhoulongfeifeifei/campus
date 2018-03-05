var form = layui.form(),
    $ = layui.jquery,
    layer = layui.layer,
    layedit = layui.layedit,
    laydate = layui.laydate;
var  zhongkaoul,zhuanyeul,mianshiul,pjId;
BaoMIng();
/*********保存管理员选择的数据到接口**********/
function BaoMIng() {
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
        laydate(start);
    }
    document.getElementById('LAY_demorange_e').onclick = function () {
        end.elem = this
        laydate(end);
    };
    //3大编辑器
    var index1 = layedit.build('miaoshu',{
        tool: [
         'strong' //加粗
        ,'italic' //斜体
        ,'underline' //下划线
        ,'del' //删除线
        ,'|' //分割线
        ,'left' //左对齐
        ,'center' //居中对齐
        ,'right' //右对齐
        ,'face' //表情
        ]
    })
    var index2 = layedit.build('tongzhishu',{
        tool: [
            'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'face' //表情
        ]
    })
    var index3 = layedit.build('ganxiexin',{
        tool: [
            'strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线
            ,'|' //分割线
            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'face' //表情
        ]
    })
    //是否的隐藏
    form.on('radio(rad)', function(data){
        console.log(data.value); //被点击的radio的value值
        if(data.value==0){
            console.log(1)
            $('#yincang').hide();
            console.log(2)
            return false;
        }else if (data.value==1){
            $('#yincang').show();
        }
    });

    //保存数据
    $('#baocun').on('click', function () {
        var Data = {};
        Data.name = $('input[name="projectName"]').val();
        Data.startTime = $('input[name="starttime"]').val();
        Data.endTime = $('input[name="endtime"]').val();
        Data.publishTime = $('input[name="publictime"]').val();
        Data.volunteerNum = $('input[name="zhiyuan"]').val();
        Data.canUpload = $('input[type="radio"]:checked').val();
        /**************************传说中的3大tab分页的编辑器*************************/
        Data.descript = '' || layedit.getText(index1);
        Data.tongZhiShuTemplate = '' || layedit.getText(index2);
        Data.ganXieXinTemplate = '' || layedit.getText(index3);
        if (zhongkaoul) {
            Data.zhongkaoUl=zhongkaoul
        };
        if (zhuanyeul){
            Data.zhuanyeUl=zhuanyeul;
        };
        if (mianshiul){
            Data.mianshiUl=mianshiul;
        }
        //判断6个必选项是否为空,为空时给予提示,都不为空时对接接口,保存数据成功
        if (!Data.name) {
            layer.msg('项目名称不能为空');
            return false;
        }else if (!Data.startTime) {
            layer.msg('开始时间不能为空')
            return false;
        } else if (!Data.endTime) {
            layer.msg('结束时间不能为空')
            return false;
        } else if (!Data.publishTime) {
            layer.msg('公布时间不能为空')
            return false;
        } else if (!Data.volunteerNum) {
            layer.msg('志愿数量不能为空')
            return false;
        } else {
            //进行url判断,当url有值时,调用接口
                var ajaxinfor = {
                    url: 'SignupManage/AddProject',
                    data: Data,
                    timeout:99999999,
                    type: 'post'
                }
                commonFn(ajaxinfor, function (res) {
                    pjId = res;
                    if(zhongkaoul){
                        ZhongKao(pjId, zhongkaoul);
                        layer.msg('保存成功', {time: 1000});
                    }
                    if(zhuanyeul){
                        ZhuanYe(pjId, zhuanyeul);
                        layer.msg('保存成功', {time: 1000});
                    }
                    if(mianshiul){
                        MianShi(pjId, mianshiul);
                        layer.msg('保存成功', {time: 1000});
                    }
                    layer.msg('保存成功', {time: 1000},function () {
                        location.href='BaoMingGuanli.html';
                    });

                })
        }
    })
}
$('#quxiao').on('click',function () {
    location.href = 'ChuangjianBM.html'
})
/*************文件上传***************/
//学生中考的
$('input[name="zhongkao"]').hide()
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload2'
    , title: '请上传文件'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        zhongkaoul = res.data;
        console.log(1)
        $('input[name="zhongkao"]').val(zhongkaoul);
        $('#zhongkao').val(getFileName(zhongkaoul));
        $('#zhongkao').attr('url',getFileName(zhongkaoul));
        $('input[name="zhongkao"]').show();
        console.log(zhongkaoul)
        layer.msg('上传成功', {time: 500})
    }
});
$('input[name="zhuanye"]').hide()
//专业的
layui.upload({
    url: window.apiUrl + 'Common/ImportFile',
    elem: '#upload1'
    , title: '请上传文件'
    , ext: 'xls'
    , type: 'file'
    , success: function (res) {
        zhuanyeul = res.data;
        $('input[name="zhuanye"]').val(zhuanyeul);
        $('#txtfiles').val(getFileName(zhuanyeul));
        $('#txtfiles').attr('url',getFileName(zhuanyeul));
        $('input[name="zhuanye"]').show();
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
//学生的中考成绩对接接口
function ZhongKao(projectid, url) {
    var ajaxZhongKao = {
        url: 'SignupManage/StudentImport',
        data: {
            projectid: projectid,
            url: url || ''
        }
    }
    commonFn(ajaxZhongKao, function (res) {
        layer.msg('上传成功', {time: 500})
    })
}
function ZhuanYe(projectid, ul) {
    var ajaxUp = {
        url: 'SignupManage/ProfessionImport',
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

//学生的面试分数对接接口
function MianShi(projectid, url) {
    var ajaxZhongKao = {
        url: 'SignupManage/MianShiImport',
        data: {
            projectid: projectid,
            url: url || ''
        }
    }
    commonFn(ajaxZhongKao, function (res) {
        layer.msg('上传成功', {time: 500})
    })
}
/*********专业数据,面试数据,招生教师账号下载***********/
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
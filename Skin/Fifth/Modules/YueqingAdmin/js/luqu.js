var layer = layui.layer;

//得到专业id
var ids = getUrlParam('id')

//提前结束报名
$('body').on('click', '#endUp', function () {
    layer.confirm('是否确定关闭当前报名录取，学生将不可报名?', {icon: 3, title: '提示'}, function (index) {
        var ajaxinfor = {
            url:'SignupManage/AdvanceEnd?id='+ids,
            type: 'get'
        }
        commonFn(ajaxinfor,function(res) {
            layer.msg("关闭成功",{time:1000});

        })
        layer.close(index);
        $('#endUp').css('color','#ccc')
        $('#endUp').attr('disabled','disabled')
    });

})
//得到预报名的时间
var ajaxinfor = {
    url:'SignupManage/GetListMoniLuQu2',
    data:{
        projectId:ids
    },
    type:'POST'
}
$('#endtime').empty()
commonFn(ajaxinfor,function (res) {
   $('#endtime').append(solveTime(res.project.endTime))
})


//往左
$('#goleft').click(function () {
    location.href='AnalogRecording.html?id='+ids
});
// 往右
$('#goright').click(function () {
    location.href='AdmitSucess.html?id='+ids
});


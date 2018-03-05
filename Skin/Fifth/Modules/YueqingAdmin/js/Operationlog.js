var layer = layui.layer,
    form=layui.form();

var Id = getUrlParam("id");
Log(Id);
/********操作日志数据*********/
function Log(projectid,HandleType,HandleItem){
    var ajaxinfor= {
        url:'SignupManage/GetListPageLog',
        data:{
            projectId:projectid,
            handleType:HandleType,
            handleItem:HandleItem,
        },
        type:'POST'
    };
    $('tbody').empty();
    commonFn(ajaxinfor,function (res) {
        $.each(res,function (k,v) {
            $('tbody').append(
                '<tr>'+
                    '<td>'+v.id+'</td>'+
                    '<td>'+v.teacherName +'</td>'+
                    '<td>'+v.handleTypeName+'&nbsp;&nbsp;&nbsp;'+v.studentName+'&nbsp;&nbsp;&nbsp;'+v.handleItemName +'</td>'+
                    '<td>'+solveTime(v.handleTime)+'</td>'+
                +'</tr>'
            )
             // 渲染老师
            $('#tacher').append(
                '<option value="">'+v.teacherName+'</option>'
            )
        })
        form.render();
    })
}

//筛选功能
// 修改 传    HandleType=1，HandleItem=1
// 删除 传    HandleType=2，HandleItem=1
// 录入面试分数 传    HandleType=3，HandleItem=2
// 修改面试分数  传    HandleType=1，HandleItem=2
// 执行录取  传 HandleType=4
//全部的数据(没问题)
$('body').on('click','#all',function () {
    Log(Id);
})
//修改的数据筛选（没毛病）
$('body').on('click','#xiugai',function () {
    Log(Id,1,1);
})
//删除数据筛选
$('body').on('click','#shanchu',function () {
    Log(Id,2,1);
})
//录入面试分数筛选
$('body').on('click','#lufen',function () {
    Log(Id,3,2);
})
//修改面试分数的筛选（没毛病）
$('body').on('click','#gaifen',function () {
    Log(Id,1,2);
})
//执行录取的筛选
$('body').on('click','#luqu',function () {
    Log(Id,4,0);
})























//操作日志列表背景色转换
$('#navbar li').on('click',function () {
    $(this).addClass('first').siblings().removeClass('first')
})
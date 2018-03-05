var layer = layui.layer,
    form=layui.form();
/********操作日志数据*********/
var Id;
//根据项目名称得到id
TeacherLog(1)
function TeacherLog(current){
    var ajaxinfor={
        url:'SignupManage/GetListPagePrpject',
        data:{
            pageIndex:1||current,
            pageSize:99999
        },
        type:'POST'
    }
    $('select[name="modules"]').empty();
    commonFn(ajaxinfor,function (res) {
        $.each(res.dataList,function (k,v){
            $('select[name="modules"]').append('<option value="'+v.id+'">'+ v.name+'</option>');
            form.render();
        });
    })
};
form.on('select(modules)',function (data) {
     Id=data.value;
     console.log(Id)
    rizhi(Id);
})

/********日志操作的表格数据渲染*********/
//得到id值
function rizhi(projectid,HandleType,HandleItem){
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
        })
    })
}
//筛选功能
// 修改 传    HandleType=1，HandleItem=1
// 删除 传    HandleType=2，HandleItem=1
// 录入面试分数 传    HandleType=3，HandleItem=2
// 修改面试分数  传    HandleType=1，HandleItem=2
// 执行录取  传 HandleType=4
$('body').on('click','#all',function () {
    rizhi(Id);
})
$('body').on('click','#xiugai',function () {
    rizhi(Id,1,1);
})
$('body').on('click','#shanchu',function () {
    rizhi(Id,2,1);
})
$('body').on('click','#lufen',function () {
    rizhi(Id,3,2);
})
$('body').on('click','#gaifen',function () {
    rizhi(Id,1,2);
})
$('body').on('click','#luqu',function () {
    rizhi(Id,4,0);
})

//导航切换
$('#selectBar li').click(function () {
    $(this).addClass('first').siblings().removeClass('first')
})
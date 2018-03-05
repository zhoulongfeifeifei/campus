//重新录取
$('body').on('click','.xin',function () {
    location.href='tiaoji.html';
})
//发布录取
$('body').on('click','.fabu',function () {
    layer.confirm('是否发布录取，一旦发布将不可恢复',{title:'提示',icon:3,offset:'100px'},function (index) {
        layer.close(index)
    })
})


var layer = layui.layer;
$('#select').click(function () {
    layer.open({
        type:1,
        maxmin: true, //开启最大化最小化按钮
        title:'选择专业',
        offset: '100px',
        btn:['保存','取消'],
        area:['430px','300px'],
        content:$('.tj'),
    })
})
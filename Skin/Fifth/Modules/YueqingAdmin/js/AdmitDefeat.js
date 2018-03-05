//重新录取
$('body').on('click','.xin',function () {
    location.href='AdmitDefeat.html';
})
//发布录取
$('body').on('click','.fabu',function () {
    layer.confirm('是否发布录取，一旦发布将不可恢复',{title:'提示',icon:3,offset: '100px'},function (index) {
        layer.close(index)
    })
})

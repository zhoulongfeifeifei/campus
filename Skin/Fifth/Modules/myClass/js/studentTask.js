var layer = layui.layer,
    form= layui.form(),
    laypage = layui.laypage;

//渲染页面进行传参
GetHomeworklist();
function GetHomeworklist(curr, subjectid, classId) {
   var ajaxhomework = {
       url:'Homework/GetHomeworkListS',
       data:{
           pageSize:10,
           pageIndex:curr||1,
           subjectid:subjectid,
           schoolid:window.schoolid,
           classid:classId,
       },
       type:'post'
   }
   commonFn(ajaxhomework,function (res){
       // laypage({
       //     cont: 'page',
       //     pages: res.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
       //     curr: res.pageIndex,
       //     groups: 5,
       //     jump: function(e, first) { //触发分页后的回调
       //         if(!first) { //一定要加此判断，否则初始时会无限刷
       //             GetHomeworklist(e.curr, subjectid, classId);
       //         }
       //     },
       //     skin: 'molv', //皮肤
       //     first: '首页', //将首页显示为数字1,。若不显示，设置false即可
       //     last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
       //     prev: false, //若不显示，设置false即可
       //     next: false //若不显示，设置false即可
       // });

       $('#taskList').empty();
       $.each(res.resultData,function (index,el){
               var imgdom = '',
                   fileDom = '';
               $.each(el.imageInfo, function(index1, el1) {
                   imgdom += '<div class="tashImg"><img src="' + el1.imageUrl + '"/><span>' + el1.imageName + '</span></div>'
               });
               $.each(el.fileInfo, function(index1, el1) {
                   fileDom += '<div class="taskfile"><a href="' + el1.fileUrl + '">' + isNull(el1.fileName) + '</a></div>'
               });
               var face = "../../Common/img/usertx.png";
               if (el.face){
                   face = el.face;
               }
               $('<li>' +
                   '<div class="topimg">' +
                   '<img src=' + face + ' alt="">' +
                   '</div>' +
                   '<div class="content">' +
                   '<h3>' + el.name + '</h3> ' +
                   '<span>' + solveTime(el.inTime) + '</span>' +
                   '<p>' + el.content + '</p>' + imgdom + isNull(fileDom) +
                   '</div></li>').appendTo('#taskList')
           });
       })
    }
/*******获取学科**********/
var ajaxsubject = {
    url: 'Homework/GetSubjectList',
    data:{
        school_id:window.schoolid
    },
    type:'post'
}
commonFn(ajaxsubject,function(res) {
    $('.subject .first').nextAll().remove();
    $.each(res, function(i, el) {
        $('.subject').append('<option value=' + el.subject_id + '>' + el.subject_name + '</option>')
    });

    form.render();
    form.on('select(subject)', function(data) {
        //得到教材的id
        // console.log(data.value)
        GetHomeworklist(1, data.value,getClass(data.value))
    })
    getClass($('.subject').val())
})

/************** 通过科目Id获取班级列表******************/
function getClass(id) {
    var $id = id;
    commonFn({
        url: 'Homework/GetClassList',
        data: {
            subjectid: $id
        },
        type:'get'
    }, function(res) {
        $('.selectClass .first').nextAll().remove();
        var t = res;
        $.each(t, function(i, el) {
            $('.selectClass').append('<option value=' + el.class_id + '>' + el.class_name + '')
        });
        form.render();
        form.on('select(selectClass)', function(data) {
           GetHomeworklist(1,$id,data.value)

        })
    })
}
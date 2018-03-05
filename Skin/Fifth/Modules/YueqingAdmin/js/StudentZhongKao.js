var layer = layui.layer,
    form = layui.form(),
    laypage = layui.laypage;
//学生成绩列表
var Id=getUrlParam('id');
Chengji();
function Chengji(current){
    var GetListPageStudent = {
        url: 'SignupManage/GetListPageStudent',
        data: {
            projectId:Id,
            pageIndex: current || 1,
            isluqu:0,
            pageSize: 30,
        },
        type: 'POST',
    }
    commonFn(GetListPageStudent, function (data) {
        var inner='',score;
        $.each(data.dataList, function (k, v) {
            laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: data.pageIndex,
                groups: data.pageSize,
                jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷
                        Chengji(e.curr)
                    }
                },
                skin: '#009688', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            inner+='<tr data-id="' + v.id + '"><td>' + v.id + '</td><td>' +v.xingMing+'</td><td>' + v.zhunKaoZheng + '</td><td>'+v.luQuCode+'</td>';
            if(v.scoreInfoObject !=null){
                score=v.scoreInfoObject;
                inner+='<td>'+score.yuWen+'</td><td>'+score.shuXue+'</td><td>'+ score.yingYu+'</td><td>'+score.keXue+'</td><td>'+score.sheHui+'</td><td>'+score.tiYu+'</td><td>'+score.allScore+'</td>';
            }else{
                inner+='<td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
            }
            if(v.mianShiObject!=null){
                inner+='<td>';
                $.each(v.mianShiObject,function (j,l) {
                    inner+='<p>'+l.mianShiScore+'</p>';
                });
                inner+='</td>';
                inner+='<td>';
                $.each(v.mianShiObject,function (j,l) {
                   inner+='<p data-id='+l.zhuanYeId+'>'+l.zhuanYeName+'</p>';
                })
                inner+='</td>';
            }else{
                inner+='<td></td><td></td>'
            }

            inner+='</tr>'
          });
        $('.table tbody').html(inner);
    })
}
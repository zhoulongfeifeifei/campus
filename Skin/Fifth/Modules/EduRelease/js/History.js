var layer =layui.layer,
laypage =layui.laypage;
var schoolid = getCookieByUserInfo('schoolid');
var usertype=getCookieByUserInfo('logintype');
//var usertype=10;
if (!IsLogin()) {
	layer.msg('请登录');
    top.location.href="../../login.html"
}else{
    if (usertype !=10) {
        $('<tr>'+
            '<th>学期</th>'+
            '<th>考试名称</th>'+
            '<th>科目</th>'+
            '<th>年段</th>'+
            '<th>上传老师</th>'+
            '<th>录入时间</th>'+
            '<th>操作</th>'+
            '</tr>').appendTo('thead');
        getAdminList()
    }else{
         $('<tr>'+
            'th>学期</th>'+
            '<th>考试名称</th>'+
            '<th>考试类型</th>'+
            '<th>录入时间</th>'+
            '<th>操作</th>'+
            '</tr>').appendTo('thead');
        getTeacherList()
    }
};
function getAdminList(curr){
	var HistoryScoreBySubject={
		url:'/Score/HistoryScoreBySubject',
		 data:{
		 	pageIndex : curr,
		 	schoolId:schoolid
		 },
		 type:'post'
	}
	commonFn(HistoryScoreBySubject,function(response){
		 $('tbody').empty();
            if (response.historyScoreBySubjectList) {
                laypage({
                    cont: 'page',
                    pages: response.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr : response.pageIndex,
                    groups: 5,
                    jump: function(e, first){ //触发分页后的回调                
                        if(!first){ //一定要加此判断，否则初始时会无限刷 
                            getAdminList(e.curr)
                        }
                    },
                    skin: 'molv', //皮肤
                    first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                    last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                    prev: false, //若不显示，设置false即可
                    next: false //若不显示，设置false即可
                });

                var t = response.historyScoreBySubjectList;
                for (var i = 0; i < t.length; i++) {
                    var term;
                    if (t[i].term ==1) {
                        term ="上学期";
                    }else if(t[i].term ==2){
                        term ="下学期";
                    }
                    var caozuo = '<a href="javascript:;" onclick="remove('+t[i].scoreId+')" class="layui-btn layui-btn-mini layui-btn-danger">删除</a>';
                    if (t[i].publishState==1) {
                        caozuo = '<a class="layui-btn layui-btn-mini layui-btn-disabled">已发布</a>';
                    }
                    $('<tr id='+t[i].scoreId+'><td>'+t[i].year+'学年'+term+'</td>'+
                    '<td>'+t[i].scoreTypeName+'</td>'+
                    '<td>'+
                        // '<label>自定义科目</label>'+
                        // '<label></label>'+
                        '<label>'+t[i].subjectName+'</label>'+
                    '</td>'+
                    '<td>'+t[i].gradeName+'</td>'+
                    '<td>'+t[i].userName+'</td>'+
                    '<td>'+solveTime(t[i].inTime)+'</td>'+
                    '<td>'+
                    '<a href="Release.html?id='+t[i].scoreId+'" class="layui-btn layui-btn-mini" title="查看">查看</a>'+caozuo+
                    '</td></tr>').appendTo('tbody')
                }

            }
	})
}
function getTeacherList(curr){
	var HistoryScoreByBill={
		url:'/Score/HistoryScoreBySubject',
        data:{
        	PageIndex : curr,
        	schoolId:schoolid
        },
        type:'post'
	}
	commonFn(HistoryScoreByBill,function(response){
		 			$('tbody').empty();
                    if (response.historyScoreBySubjectList) {
                        laypage({
                            cont: 'page',
                            pages: response.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                            curr : response.pageIndex,
                            groups: 5,
                            jump: function(e, first){ //触发分页后的回调                
                                if(!first){ //一定要加此判断，否则初始时会无限刷 
                                    getAdminList(e.curr)
                                }
                            },
                            skin: 'molv', //皮肤
                            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                            prev: false, //若不显示，设置false即可
                            next: false //若不显示，设置false即可
                        });

                        var t = response.historyScoreByBillList;
                        for (var i = 0; i < t.length; i++) {
                            var term;
                            if (t[i].term ==1) {
                                term ="上学期";
                            }else if(t[i].term ==2){
                                term ="下学期";
                            }                         		                  
                            $('<tr id='+t[i].scoreId+'><td>'+t[i].year+'学年'+term+'</td>'+
                            '<td>'+t[i].scoreTypeName+'</td>'+                             		                     
                            '<td>'+solveTime(t[i].inTime)+'</td>'+
                            '<td>'+
                                '<a href="Release.html?id='+t[i].scoreId+'&classid='+t[i].classId+'" class="layui-btn layui-btn-mini">查看</a>'+
                                '<a href="javascript:;" onclick="remove('+t[i].scoreId+')" class="layui-btn layui-btn-mini layui-btn-danger">删除</a>'+
                            '</td></tr>').appendTo('tbody')
                        }

                    }
	})
}
function remove(id){
    layer.confirm("是否删除?",{icon:3 , title:'提示'},function(index){
        layer.close(index);
        var DeleteScoreByScoreId={
        	url:'/Score/DeleteHistoryScore?id='+id,
        	type:'get'
        }
        commonFn(DeleteScoreByScoreId,function(res){
                    layer.msg("删除成功");
                    getAdminList();
                    getTeacherList(); 
        	})
        })
}


function isNull(a){
   return a == null?'':a;
}

function oktime2(a){
    if (parseInt(a) < 10) {
        return '0'+a;
    }else{
        return a;
    }
}

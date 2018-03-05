var layer = layui.layer,
    form = layui.form(),
    laypage = layui.laypage;
var isinterviewer='',isHeDui='',isLuFen='',projectId;   

GetListPagePrpject();
//根据项目名称搜索
function GetListPagePrpject(){
	var GetListPagePrpject={
		url: 'SignupManage/GetListPagePrpject',
	    data: {	
	        pageIndex: 1,
	        pageSize: 999
	    },
	    type: 'POST'
	}
	commonFn(GetListPagePrpject,function(data){
		var selectHtml='';
		$.each(data.dataList, function(k,v) {
			selectHtml+='<option value='+v.id+'>'+v.name+'</option>';
		});
		$('#xiangmu').empty();
		$('#xiangmu').append(selectHtml);
		form.render();
		projectId=$('#xiangmu').val();
		//姓名搜索
		$('.search').click(function() { 
		    $('tbody').empty();
		    BaoMing(projectId,$('input[name=username]').val(),$('input[name=zkz]').val(),$('input[name=Professional]').val());
		});
		//面试的分类js
		$('#Mianshi .pers').click(function () {
		    $(this).addClass('first').siblings().removeClass('first');
		    isinterviewer=$(this).attr('isinterviewer');
		    BaoMing(projectId,$('input[name=username]').val(),$('input[name=zkz]').val(),$('input[name=Professional]').val(),isinterviewer);
		});
		//信息的js
		$('#message li').click(function () {
		    $(this).addClass('first').siblings().removeClass('first');
		    isHeDui=$(this).attr('isHeDui');
		    BaoMing(projectId,$('input[name=username]').val(),$('input[name=zkz]').val(),$('input[name=Professional]').val(),isinterviewer,isHeDui,isLuFen);
		});
		//面试的js
		$('#all .pers').click(function () {
		    $(this).addClass('first').siblings().removeClass('first');
		    isLuFen=$(this).attr('isLuFen');
		    BaoMing(projectId,$('input[name=username]').val(),$('input[name=zkz]').val(),$('input[name=Professional]').val(),isinterviewer,isHeDui,isLuFen);
		});
		//数据导出
		$('#daochu').click(function(){
			var xingMing=$('input[name=username]').val();
			var zhunKaoZheng=$('input[name=zkz]').val();
			var zhuanYe=$('input[name=Professional]').val();
			window.location.href=window.siteHost+'YueQingDown/YueQingStudentExport?xingMing='+xingMing+'&zhunKaoZheng='+zhunKaoZheng+'&zhuanYe='+zhuanYe+'&isinterviewer='+isinterviewer+'&isHeDui='+isHeDui+'&isLuFen='+isLuFen+'&projectId='+projectId+'&isluqu='+1;
		});
		BaoMing(projectId);
	});
}
form.on('select(xiangmu)',function(data){
	projectId=data.value;
	BaoMing(data.value);
});
$('#j-main').click(function () {
    $('#interview').show();
})
$('#j-mia').click(function () {
    $('#interview').hide();
})

//删除
$('#del').click(function () {
    layer.confirm('您确定要删除吗', {title: '提示', icon: 3, offset: '200px'}, function (index) {
        layer.close(index)
    })
})
//表格数据渲染
function BaoMing(projectId,xingMing,zhunKaoZheng,Professional,isinterviewer,isHeDui,isLuFen,current) {
	layer.load();
    var ajaxinfor = {
        url: 'SignupManage/GetListPageStudent',
        data: {
        	projectId:projectId,
        	xingMing:xingMing,
        	zhunKaoZheng:zhunKaoZheng,
        	zhuanYe:Professional,
        	isinterviewer:isinterviewer,
        	isHeDui:isHeDui,
        	isLuFen:isLuFen,
        	isluqu:1,
            pageIndex: current||1,
            pageSize: 20,
        },
        type: 'POST'
    }
    commonFn(ajaxinfor, function (data) { 
    	var inner='';
    	 $('tbody').empty();
    	 laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                groups: data.pageSize,
                curr: data.pageIndex,                
                jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷
                       BaoMing(projectId,xingMing,zhunKaoZheng,Professional,isinterviewer,isHeDui,isLuFen,e.curr);
                    }
                },
                skin: '#009688', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            }); 
    	$.each(data.dataList, function (k, v) {   
            inner+='<tr data-id="' + v.id + '"><td>' + v.noticeNumber + '</td><td>' +v.xingMing+'</td><td>' + v.zhunKaoZheng + '</td>'; 
            if(v.volumnteerObject==null){	
            	inner+='<td></td><td></td><td></td>';
            }else{
            	var diji;
            	inner+='<td>'+v.volumnteerObject.luQuCode+'</td><td>'+v.volumnteerObject.mobile+'</td>';
            	var luquzhye='';
            	if(v.isLuQu==1 || v.isLuQu==3){
            		$.each(v.volumnteerObject.zhiYuanList, function(a,b) {
            			if(b.isLuQu==1){
            				luquzhye='第'+b.sort+'志愿：'+b.zhiYuanName;
            				inner+='<td>'+luquzhye+'</td>'; 
            				 
            			}else{
            				luquzhye='';
            			}
            			
            		});  	
            	}else{
//          		var a=0;
//          		$.each(v.volumnteerObject.zhiYuanList, function(a,b) {
//          			if(b.isLuQu==1){
//          				a=1;
//          				luquzhye='第'+b.sort+'志愿：'+b.zhiYuanName;
//          				inner+='<td>'+luquzhye+'</td>'; 
//          				 
//          			} 
//          			if(a==0){
//          				inner+='<td></td>'; 
//          			} 
//          		});
            		inner += '<td class="lqzye">';
						$.each(volumnteerObject.zhiYuanList, function(a, b) {
							inner += '<p zhiYuanId=' + b.zhiYuanId + ' sort=' + b.sort + ' isLuQu=' + b.isLuQu + ' class="zy">第' + (a + 1) + '志愿：' + b.zhiYuanName + '</p>';
						});
						inner += '</td>'; 
            	}    
            }
            if(v.scoreInfoObject==null){
            	inner+='<td></td>';
            }else{
            	inner+='<td>'+v.scoreInfoObject.allScore+'</td>';
            }
            inner+='<td>'+v.interviewScore+'</td>';
            var hedui;
            if(v.isHeDui==1){
            	hedui='已核对';
            }else{
            	hedui='未核对';
            }
            inner+='<td>'+hedui+'</td><td><div class="laybox"><a class="layui-btn-mini layui-Btn layui-btn" href="StudentDetails.html?id='+v.id+'&projectId='+v.projectId+'">查看</a><button class="layui-btn-mini layui-Bt layui-btn del" id="del" studentid='+v.id+'>删除</button></div></td></tr>';
    	});
    	$('.table tbody').html(inner);
    	//删除
    	$('.del').click(function(){
            var Id = $(this).parent().parent().parent().attr('data-id');
    		var studentid=$(this).attr('studentid');
    		layer.confirm('你确定要删除该学生吗？',{icon:3,title:'提示'},function(index){
		         var DeleteStudent={
	    			type: 'get',
	    			url: 'SignupManage/DeleteStudent',
				    data: {	
				        studentid:studentid,
						projectid:projectId
				    }
			    }
			    commonFn(DeleteStudent,function(data){
			    	layer.closeAll('loading');
			    	layer.msg('删除成功',{time:1000},function () {
                        $('tbody tr').each(function(index, el) {
                            if ($(this).attr('data-id') == Id) {
                                $(el).remove();
                            }
                        });
                    });
                });
		        layer.close(index);
		    });   		 
    	})
    	layer.closeAll('loading');
    })
}
//数据更新
$('#Update').click(function(){
	layer.msg('数据已更新',{time:1000},function(){
		location.href = "BaoMing.html";
	});
})
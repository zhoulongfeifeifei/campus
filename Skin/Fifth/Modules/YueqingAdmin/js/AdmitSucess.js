
var layer = layui.layer, 
	form = layui.form(),
	laypage = layui.laypage;
//得到专业的id
var projectId = getUrlParam("id");
var isZhengShi=2,isluqu='';
GetListMoniLuQu();
var arr=[];
//查询搜索
$('.selbox').click(function() { 
    $('tbody').empty();
    GetListMoniLuQu($('input[name=lqbm]').val(),$('input[name=username]').val(),$('input[name=zkzh]').val(),$('input[name=Professional]').val());
});
////通知书导出
//$('.tzs').click(function(){
//	window.location.href=window.siteHost+'FileDown/TongZhiShuExport?projectid='+projectId+'&isall='+1;
//});
////数据导出
//$('.shuju').click(function(){
//	window.location.href=window.siteHost+'FileDown/YueQingStudentExportByPro?projectid='+projectId;
//})
//重新录取
//$('.xin').click(function(){
//	isreload=1;
//	layer.msg('重新录取',{time:1000},function(){
//		GetListMoniLuQu();
//	});
//});
//发布录取
//$('.fabulq').click(function(){
//	var PublishLuqu={
//		type: 'get',
//		url: 'SignupManage/PublishLuqu',
//      data: {
//      	projectId:projectId
//      }
//	}
//	commonFn(PublishLuqu,function(data){
//		layer.msg('发布成功！',{time:1000});
//	})
//});
//查看是否录取
$('.lathis').click(function(){
	$(this).addClass('first').siblings().removeClass('first');
	$('.zymc').html('全部');
	$('.zymc').removeClass('addZy');
	 $('tbody').empty();
	isluqu=$(this).attr('luqustatus');
	GetListMoniLuQu($('input[name=lqbm]').val(),$('input[name=username]').val(),$('input[name=zkzh]').val(),$('input[name=Professional]').val(),isluqu);
});
//数据获取与渲染
function GetListMoniLuQu(luquCode,xingMing,zhunKaoZheng,zhuanYe,isluqu,professionId,current){
	layer.load();
	if(isluqu==undefined){
		isluqu=3;
	}
	GetListMoniLuQu2={
		url: 'SignupManage/GetListPageStudent',
        data: {
        	projectId:projectId,
        	luquCode:luquCode,
        	xingMing:xingMing,
        	zhunKaoZheng:zhunKaoZheng,
        	zhuanYe:zhuanYe,
        	isluqu:isluqu,
        	professionId:professionId,
        	isZhengShi:isZhengShi,
            pageIndex: current||1,
            pageSize: 20
        },
        type: 'POST'
	}
	commonFn(GetListMoniLuQu2,function(data){
		if(data==null){
			layer.msg('数据为空',{time:1000});
		}else{	
			laypage({
	                cont: 'page',
	                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
	                curr: data.pageIndex,
	                groups: 5,
	                jump: function (e, first) { //触发分页后的回调
	                    if (!first) { //一定要加此判断，否则初始时会无限刷
	                        GetListMoniLuQu(luquCode,xingMing,zhunKaoZheng,zhuanYe,isluqu,professionId,e.curr);
	                    }
	                },
	                skin: '#009688', //皮肤
	                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
	                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
	                prev: false, //若不显示，设置false即可
	                next: false //若不显示，设置false即可
	            }); 
			//左侧专业			
			var professionList=data.professionList;
			var treeshTML='<li data-id="" style="text-indent: 10px;">全部</li>';
			$.each(professionList, function(k,v) {
				treeshTML+='<li data-id='+v.id+'><span>'+v.name+'('+v.luQuNum+'/'+v.planNum+')</span></li>';
				arr.push(v.id);
			});
		 	$('#tree1').html(treeshTML);
		 	//学生信息渲染
		 	var dataList=data.dataList;
		 	if(dataList.length==0){
		 		a=1;
		 	}else{
		 		a=0;
		 	};
		 	var inner='';
		 	$.each(dataList, function(k,v) {
		 		
	            inner+='<tr data-id="' + v.id + '"><td>'+v.noticeNumber+'</td><td class="namep">'+v.xingMing+'</td><td>'+v.zhunKaoZheng+'</td>';
	            //录取专业
	            var volumnteerObject=v.volumnteerObject;
	            //判断是否录取          
	             if(volumnteerObject==null){
	            	inner+='<td></td><td></td><td></td>';
	//          	$('#moni').html('录取成功');
	            }else{     
	            	inner+='<td>'+volumnteerObject.luQuCode+'</td><td>'+volumnteerObject.mobile+'</td>';
	            	var luquzhye='';
	            	if(v.isLuQu==1 || v.isLuQu==3){            		 
	            		$.each(volumnteerObject.zhiYuanList, function(a,b) {
	            			if(b.isLuQu==1){
	            				luquzhye='第'+b.sort+'志愿：'+b.zhiYuanName;
            					inner+='<td class="zhuanye">'+luquzhye+'</td>'; 
	            			}
	            		});
//	            		if(luquzhye==undefined){
//		            		inner+='<td></td>';
//		            	}else{
//		            		inner+='<td>'+luquzhye+'</td>';
//		            	}   
	            	}else{
	            		inner+='<td class="zhuanye">';
	            		$.each(volumnteerObject.zhiYuanList,function(a,b){
	            			inner+='<p zhiYuanId='+b.zhiYuanId+' sort='+b.sort+' isLuQu='+b.isLuQu+'>'+b.zhiYuanName+'</p>';
	            		});
	            		inner+='</td>';
	            	}
	            	
	            
	           
	//	            $.each(tmpLuquInfoObject.zhiYuanList,function(a,b){
	//	            	if(b.isLuQu==1){
	//	            		luquzhye='第'+b.isLuQu+'志愿：'+a.zhiYuanName;
	////	            		inner+='<td>'+a.zhiYuanName+'</td>';
	//	            	}
	//          	});
	//          	if(luquzhye==undefined){
	//          		inner+='<td></td>';
	//          	}else{
	//          		inner+='<td>'+luquzhye+'</td>';
	//          	}          	 
	            };
	            var project=data.project;
	            var fuzt;
	            if(project !=null){
	            	fuzt=project.statusName;
	            }else{
	            	fuzt='未发布';
	            };
	            inner+='<td>'+v.allScore+'</td><td>'+v.yswScore+'</td>';
	            inner+='<td>'+v.interviewScore+'</td><td class="zhuangtai"><p class="zhuangtai1">'+v.zhuangTai+'</p><p class="layred">'+fuzt+'</p></td><td>';
	            if(v.isLuQu==0){
	            	inner+='<input  class="layui-btn layui-btn layui-btn-gray fabu" studentId='+v.id+' value="通知书导出" disabled> style="width:113px;"';
	            }else{
	            	inner+='<input  class="layui-btn layui-btn layui-btn-small fabu" studentId='+v.id+' value="通知书导出" style="background:#7dc05f;width:113px;">';
	            }
	            inner+='</td></tr>';
		 	});
		 	$('.layui-table tbody').html(inner);
		 	$('.fabu').click(function(){
		 		layer.closeAll('loading'); 
		 		var studentid=$(this).attr('studentId');
				window.location.href=window.siteHost+'YueQingDown/TongZhiShuExport?id='+studentid+'&projectid='+projectId+'&isall='+0;
		 	});
		 	$('.lathis').each(function(){
			  	if($(this).hasClass('first')){
			  		isluqu=$(this).attr('luqustatus');
			  	}
		 	});		 
		 	$('#tree1 li').click(function(){
		 		layer.closeAll('loading'); 
		 		$('.zymc').html($(this).text());
		 		$('.zymc').addClass('addZy');
				$('.lathis').removeClass('first');
		 		var professionIds=$(this).attr('data-id');
		 		GetListMoniLuQu($('input[name=lqbm]').val(),$('input[name=username]').val(),$('input[name=zkzh]').val(),$('input[name=Professional]').val(),isluqu,professionIds);
		 		return false;
//				xc(professionId);
		 	});
		 	 
		 };
		 if(professionId==undefined){
		 	professionId='';
		 };
		 if(luquCode==undefined){
		 	luquCode='';
		 };
		 if(xingMing==undefined){
		 	xingMing='';
		 };
		 if(zhunKaoZheng==undefined){
		 	zhunKaoZheng='';
		 };
		 if(zhuanYe==undefined){
		 	zhuanYe='';
		 };
		 if(isluqu==undefined){
		 	isluqu='';
		 };
		  //通知书导出
//			$('.tzs').click(function(){			 
//				if(a==1){
//					layer.msg('数据为空',{time:1000});
//				}else{
//					window.location.href=window.siteHost+'FileDown/TongZhiShuExport?projectid='+projectId+'&isall='+1+'&luquCode='+luquCode+'&xingMing='+xingMing+'&zhunKaoZheng='+zhunKaoZheng+'&zhuanYe='+zhuanYe+'&luqustatus='+luqustatus+'&professionId='+professionId;
//				}			 
//			});		 
		//数据导出
		 
		$('.shuju').click(function(){
			layer.closeAll('loading'); 
			if(a==1){
				layer.msg('数据为空',{time:1000});
			}else{
				window.location.href=window.siteHost+'YueQingDown/YueQingStudentExportByPro?projectid='+projectId+'&luquCode='+luquCode+'&xingMing='+xingMing+'&zhunKaoZheng='+zhunKaoZheng+'&zhuanYe='+zhuanYe+'&isluqu='+isluqu+'&professionId='+professionId+'&needupdate=1';	
			}
			 
		});
		layer.closeAll('loading'); 
	});
	 
}



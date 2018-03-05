var layer = layui.layer,
	form = layui.form(),
	laypage = layui.laypage;
//得到专业的id
var projectId = getUrlParam("id");
var a = 0,
	isluqu = '',
	needupdate = '';
//var needupdate=1;
GetListMoniLuQu();
var arr = [];

//查询搜索
$('.selbox').click(function() {
	$('tbody').empty();
	GetListMoniLuQu($('input[name=lqbm]').val(), $('input[name=username]').val(), $('input[name=zkzh]').val(), $('input[name=Professional]').val(), 0);
});
//重新录取
$('.xin').click(function() {
	//	needupdate=1;
	//	layer.msg('重新录取',{time:1000},function(){
	GetListMoniLuQu();
	//	});
});
//发布录取
$('.fabulq').click(function() {
	var PublishLuqu = {
		type: 'get',
		url: 'SignupManage/PublishLuqu',
		data: {
			projectId: projectId
		}
	}
	commonFn(PublishLuqu, function(data) {
		layer.msg('发布成功！', {
			time: 1000
		});
	})
});
//查看是否录取 
$('.lathis').click(function() {
	$(this).addClass('first').siblings().removeClass('first');
	$('.zymc').html('全部');
	$('.zymc').removeClass('addZy');
	$('tbody').empty();
	isluqu = $(this).attr('luqustatus');
	GetListMoniLuQu($('input[name=lqbm]').val(), $('input[name=username]').val(), $('input[name=zkzh]').val(), $('input[name=Professional]').val(), 0, isluqu);
})
//数据获取与渲染
function GetListMoniLuQu(luquCode, xingMing, zhunKaoZheng, zhuanYe, needupdate, isluqu, professionId, current) {
	layer.load();
	if(isluqu == undefined) {
		isluqu = 3;
	}
	if(needupdate == undefined) {
		needupdate = 1;
	}
	GetListMoniLuQu2 = {
		url: 'SignupManage/GetListMoniLuQu2',
		data: {
			projectId: projectId,
			luquCode: luquCode,
			xingMing: xingMing,
			zhunKaoZheng: zhunKaoZheng,
			zhuanYe: zhuanYe,
			isluqu: isluqu,
			needupdate: needupdate,
			professionId: professionId,
			pageIndex: current || 1,
			pageSize: 20
		},
		type: 'POST'
	}
	commonFn(GetListMoniLuQu2, function(data) {
		if(data == null) {
			layer.msg('数据为空', {
				time: 1000
			});
		} else {
			laypage({
				cont: 'page',
				pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。
				curr: data.pageIndex,
				groups: 5,
				jump: function(e, first) { //触发分页后的回调
					if(!first) { //一定要加此判断，否则初始时会无限刷
						GetListMoniLuQu(luquCode, xingMing, zhunKaoZheng, zhuanYe, 0, isluqu, professionId, e.curr);
					}
				},
				skin: '#009688', //皮肤
				first: '首页', //将首页显示为数字1,。若不显示，设置false即可
				last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
				prev: false, //若不显示，设置false即可
				next: false //若不显示，设置false即可
			});
			//左侧专业			
			var professionList = data.professionList;
			var treeshTML = '<li data-id="" style="text-indent: 5px;">全部</li>';
			$.each(professionList, function(k, v) {
				treeshTML += '<li data-id=' + v.id + '>' + v.name + '(' + v.luQuNum + '/' + v.planNum + ')</li>';
				arr.push(v.id);
			});
			$('#tree1').html(treeshTML);
			//		 	$("#tree1").ligerTree({ checkbox: true });
			//		 	$('.l-children li').each(function(a,b){
			//		 		$(this).attr('id',arr[a]);
			//		 	})
			//			$("#tree1").ligerTree({		
			//	            data: professionList,
			//	            checkbox: false, 
			//	            ajaxType: 'get',
			//	            idFieldName: 'id', 
			//	           onSelect: function (node,e){
			//	            // console.log(node.data.roomId)
			//	              if(node.data.id) {
			//	                getlist(node.data.id,node.data.name)
			//	              }                                      
			//	           }
			//	       }) 
			//学生信息渲染
			var dataList = data.dataList;
			if(dataList.length == 0) {
				a = 1;
			} else {
				a = 0;
			};
			var inner = '';
			
			$.each(dataList, function(k, v) {

				inner += '<tr data-id="' + v.id + '"><td>' + v.noticeNumber +
					'</td><td>' + v.xingMing + '</td><td>' + v.zhunKaoZheng + '</td>';
				//录取专业
				var volumnteerObject = v.volumnteerObject;
				//判断是否录取          
				if(volumnteerObject == null) {
					inner += '<td></td><td></td><td></td>';
					//          	$('#moni').html('录取成功');
				} else {
					inner += '<td>' + volumnteerObject.luQuCode + '</td><td>' + volumnteerObject.mobile + '</td>';
					var luquzhye = '';
					if(v.isLuQu == 1) {
						$.each(volumnteerObject.zhiYuanList, function(a, b) {
							if(b.isLuQu == 1) {
								luquzhye = '第' + b.sort + '志愿：' + b.zhiYuanName;
								inner += '<td>' + luquzhye + '</td>';
							}
						});
						//	            		if(luquzhye==undefined){
						//		            		inner+='<td></td>';
						//		            	}else{
						//		            		inner+='<td>'+luquzhye+'</td>';
						//		            	}   
					} else {
						inner += '<td class="lqzye">';
						$.each(volumnteerObject.zhiYuanList, function(a, b) {
							inner += '<p zhiYuanId=' + b.zhiYuanId + ' sort=' + b.sort + ' isLuQu=' + b.isLuQu + ' class="zy">第' + (a + 1) + '志愿：' + b.zhiYuanName + '</p>';
						});
						inner += '</td>';
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
				var project = data.project;
				var fuzt;
				if(project != null) {
					fuzt = project.statusName;
				} else {
					fuzt = '未发布';
				};
				inner += '<td>' + v.allScore + '</td><td>' + v.yswScore + '</td>';
				inner += '<td>' + v.interviewScore + '</td><td><p class="zt">' + v.zhuangTai + '</p><p class="layred">' + fuzt + '</p></td><td>';
				if(v.isLuQu == 0) {
					inner += '<input  class="layui-btn layui-btn layui-btn-gray fabu" studentId=' + v.id + ' value="通知书导出" disabled style=width:113px;">';
				} else {
					inner += '<input  class="layui-btn layui-btn layui-btn-small fabu" studentId=' + v.id + ' value="通知书导出" style="background:#7dc05f;width:113px;">';
				}
				inner += '</td></tr>';
			});
			$('.layui-table tbody').html(inner);
			$('.fabu').click(function() {
				layer.closeAll('loading');
				var studentid = $(this).attr('studentId');
				window.location.href = window.siteHost + 'YueQingDown/TongZhiShuExport?id=' + studentid + '&projectid=' + projectId + '&isall=' + 0;
			});
			$('.lathis').each(function() {
				if($(this).hasClass('first')) {
					isluqu = $(this).attr('luqustatus');
				}
			});
			$('#tree1 li').click(function() {
				layer.closeAll('loading');
				$('.zymc').html($(this).text());
				$('.zymc').addClass('addZy');
				$('.lathis').removeClass('first');
				$(this).addClass('addStyle').siblings().removeClass('addStyle');
				var professionIds = $(this).attr('data-id');
				GetListMoniLuQu($('input[name=lqbm]').val(), $('input[name=username]').val(), $('input[name=zkzh]').val(), $('input[name=Professional]').val(), 0, isluqu, professionIds);
				return false;
			});
		};
		if(professionId == undefined) {
			professionId = '';
		};
		if(luquCode == undefined) {
			luquCode = '';
		};
		if(xingMing == undefined) {
			xingMing = '';
		};
		if(zhunKaoZheng == undefined) {
			zhunKaoZheng = '';
		};
		if(zhuanYe == undefined) {
			zhuanYe = '';
		};
		if(isluqu == undefined) {
			isluqu = '';
		};
		//通知书导出
		$('.tzs').click(function() {
			layer.closeAll('loading');
			if(a == 1) {
				layer.msg('数据为空', {
					time: 1000
				});
			} else {

				window.location.href = window.siteHost + 'YueQingDown/TongZhiShuExport?projectid=' + projectId + '&isall=' + 1 + '&luquCode=' + luquCode + '&xingMing=' + xingMing + '&zhunKaoZheng=' + zhunKaoZheng + '&zhuanYe=' + zhuanYe + '&isluqu=' + isluqu + '&professionId=' + professionId;
			}

		});
		//数据导出1
		$('.shuju1').click(function() {
			layer.closeAll('loading');
			if(a == 1) {
				layer.msg('数据为空', {
					time: 1000
				});
			} else {
				window.location.href = window.siteHost + 'YueQingDown/YueQingStudentExportByPro?projectid=' +
					projectId + '&luquCode=' + luquCode + '&xingMing=' + xingMing + '&zhunKaoZheng=' +
					zhunKaoZheng + '&zhuanYe=' + zhuanYe + '&isluqu=' + isluqu + '&professionId='
					+ professionId + '&needupdate=1'+'&ExportBotton=2';
			}
		});
		//数据导出2
        $('.shuju2').click(function() {
            layer.closeAll('loading');
            if(a == 1) {
                layer.msg('数据为空', {
                    time: 1000
                });
            } else {
                window.location.href = window.siteHost + 'YueQingDown/YueQingStudentExportByPro?projectid=' +
                    projectId + '&luquCode=' + luquCode + '&xingMing=' + xingMing + '&zhunKaoZheng=' +
                    zhunKaoZheng + '&zhuanYe=' + zhuanYe + '&isluqu=' + isluqu + '&professionId='
                    + professionId + '&needupdate=1'+'&ExportBotton=1';
            }

        });
		layer.closeAll('loading');
	})

}

//GetListProfession();
//左侧树专业录取
//function GetListProfession(){
//	var GetListProfession = {
//		type: 'get',
//      url: 'SignupManage/GetListProfession',
//      data: {
//      	projectId:47      	
//      }
//  }
//	 commonFn(GetListProfession,function(data){
//	 	var treeshTML='<li><span>全部</span><ul id="trees">';
//	 	$.each(data,function(k,v){
//	 		treeshTML+='<li data-id='+v.id+'><span>'+v.name+'('+v.luQuNum+'/'+v.planNum+')</span></li>'
//	 	});
//	 	treeshTML+='</ul></li>';
//	 	$('#tree1').html(treeshTML);
//	 	$("#tree1").ligerTree({ checkbox: false });
//	 	form.render();
//	 })
//}
////左侧查询
//$('#tree1').click(function(){
////	console.log($(this).attr('data-id'));
//})

//表格数据渲染
//function BaoMing(xingMing,zhunKaoZheng,Professional,current){
//	 var ajaxinfor = {
//      url: 'SignupManage/GetListPageStudent',
//      data: {
//      	xingMing:xingMing,
//      	zhunKaoZheng:zhunKaoZheng,
//      	zhuanYe:Professional,
//          pageIndex: current||1,
//          pageSize: 5,
//      },
//      type: 'POST'
//  }
//	 commonFn(ajaxinfor,function(data){
//	 	var inner='';
//	 	$.each(data.dataList,function(k,v){
//	 		laypage({
//              cont: 'page',
//              pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
//              curr: data.pageIndex,
//              groups: data.pageSize,
//              jump: function (e, first) { //触发分页后的回调
//                  if (!first) { //一定要加此判断，否则初始时会无限刷
//                      BaoMing(xingMing,zhunKaoZheng,Professional,e.curr);
//                  }
//              },
//              skin: '#009688', //皮肤
//              first: '首页', //将首页显示为数字1,。若不显示，设置false即可
//              last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
//              prev: false, //若不显示，设置false即可
//              next: false //若不显示，设置false即可
//          });   
//          inner+='<tr data-id="' + v.id + '"><td>'+v.id+'</td><td>'+v.xingMing+'</td><td>'+v.zhunKaoZheng+'</td>';
//          if(v.volumnteerTmpObject==null){
//          	inner+='<td></td><td></td><td></td>';
//          }else{            				inner+='<td>'+v.volumnteerTmpObject.mobile+'</td><td>'+v.volumnteerTmpObject.luQuNumber+'</td>';
//          	var luquma;
//	            $.each(v.volumnteerTmpObject.zhiYuanList,function(a,b){
//	            	if(a.isLuQu==1){
//	            		luquma=a.zhiYuanName;
////	            		inner+='<td>'+a.zhiYuanName+'</td>';
//	            	}
//          	});
//          	if(luquma==undefined){
//          		inner+='<td></td>';
//          	}else{
//          		inner+='<td>'+luquma+'</td>';
//          	}
//          	 
//          };
//          if(v.scoreInfoObject==null){
//          	inner+='<td></td><td></td>';
//          }else{
//          	inner+='<td>'+v.scoreInfoObject.allScore+'</td><td>'+v.scoreInfoObject.allScore+'</td>';
//          };
//          inner+='<td>'+v.interviewScore+'</td><td><span>'+v.zhuangTai+'</span><span class="layred">未发布</span></td><td><button class="layui-btn layui-btn-mini layui-btn-gray">通知书导出</button></td></tr>';
//          $('.layui-table tbody').html(inner);
//	 	})
//	 })
//}
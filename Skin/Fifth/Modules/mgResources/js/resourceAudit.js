/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-07 19:12:35
 * @version $Id$
 */


// $('.search').click(function() {
// 	ajaxList($('input[name="Key"]').val());
// 	$('.searchable-select-holder').text('全部')
// })
ajaxList();
function ajaxList(seach,curr){
	// var index =layer.load();
	var GetList = {
		url: "SchoolResources/GetList",
		data: {
			schoolid:window.schoolid,
			PageIndex : curr ,
			Name : seach ,
			PageSize :10 ,
			Status:-1,
			IsMine:-1,
		},
		type: "post"
	};
	commonFn(GetList, function(data) {
				$('tbody').empty();
				var t =data;
				if (t.resultData) {
					layui.laypage({
						cont: 'page',
						pages: t.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
						curr : t.pageIndex,
						groups: 5,
						jump: function(e, first){ //触发分页后的回调                
							if(!first){ //一定要加此判断，否则初始时会无限刷 
								ajaxList($('input[name="Key"]').val(), e.curr, $('.selected').attr('data-value'))
							}
						},
						skin: 'molv', //皮肤
						first: '首页', //将首页显示为数字1,。若不显示，设置false即可
						last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
						prev: false, //若不显示，设置false即可
						next: false //若不显示，设置false即可
					});
					for (var i = 0; i < t.resultData.length; i++) {    
						var i2 = i+1
						if (i2<10) {
							if (page == undefined) {
								var p2 = ''
								i2 = i2 * 1
							}else{
								var p2 = page - 1 
							}   
						}else{
							if (page == undefined) {
								var p2 = ''
								i2 = i2 * 1
							}else{
								i2 = i2 * page 
								var p2 = ''
							}
							
						}
						var statuscz ='' ,statuscz2 = '' , nnnnnnn=2 , shenhe = "审核";
						if (t.resultData[i].statusName == "审核通过") {
							statuscz = 'layui-btn-disabled';
							statuscz2 = 'disabled';
							nnnnnnn =1;
							shenhe = "通过"
						}
						
						// 渲染数据的一大段垃圾
						$('<tr data-id="'+t.resultData[i].id+'"><td>'+i2+'</td>'+
						'<td class="RoleId"><a style="color:blue" target="_blank" href="onLinePreview.html?id='+t.resultData[i].id+'&Surl='+t.resultData[i].fileUrl+'">'+isNull(t.resultData[i].name)+'</a></td>'+
						'<td>'+isNull(t.resultData[i].subjectName)+'</td><td>'+isNull(t.resultData[i].gradeName)+'</td>'+
						'<td>'+isNull(t.resultData[i].resTypeName)+'</td>'+
						'<td>'+isNull(t.resultData[i].jiaoCai)+'</td><td>'+solveTime(t.resultData[i].addTime)+'</td>'+
						'<td>'+t.resultData[i].statusName+'</td><td><a '+statuscz2+' onclick="audit('+t.resultData[i].id+','+nnnnnnn+')" data-operation="SchoolResources.Approve" class="yinc layui-btn layui-btn-mini '+statuscz+'">'+shenhe+'</a>'+
						'<a onclick="delRole('+t.resultData[i].id+')" title="删除" data-operation="SchoolResources.DeleteResFile" class="yinc layui-btn layui-btn-mini layui-btn-danger">删除</a>'+
						'</td></tr>').appendTo('tbody');
						
					}
					quanxian();
				}else{
					layer.msg("没有数据",{
						shift : 5 
					})
				}
	});
}
function audit(a,b){
	if (b != 1 ){
		layer.confirm('确定该资源通过审核吗？',
			{
				icon: 3, 
				title:'提示',
				btn:["通过","不通过"],
				btn1:function(){
					var Approve = {
						url: "SchoolResources/Approve",
						data: {
							schoolid:window.schoolid,id: a
						},
						type: "get"
					};
					commonFn(Approve, function(data) {
					            layer.msg('已通过');
					            ajaxList();
					});
				},
				btn2:function(){
					var UnApprove = {
						url: "SchoolResources/UnApprove",
						data: {
							schoolid:window.schoolid,id: a
						},
						type: "get"
					};
					commonFn(UnApprove, function(data) {
					            layer.msg('不通过成功');
					            ajaxList();
					});
				}
			}
		)
	}
}
	
function delRole(a) {
	layer.confirm('你确定要删除该资源吗？',{icon: 3, title:'提示'}, function() {
		var removeload= layer.load();
		var Delete = {
			url: "SchoolResources/DeleteResFile?id="+a+"&schoolid="+window.schoolid,
				type: "delete"
			};
			commonFn(Delete, function(data) {
				layer.close(removeload);
					layer.msg('删除成功');
					ajaxList();
		});
	})
}
/**********搜索筛选,模糊查询************/
$('#search').on('click',function () {
    var seadata = $.trim($(this).prev().val());
    console.log(seadata)
    if ($.trim(seadata)) {
        ajaxList(seadata,1);
    }
})
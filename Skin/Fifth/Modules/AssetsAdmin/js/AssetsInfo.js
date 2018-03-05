var laypage = layui.laypage,
$=layui.jquery,
form=layui.form();
//搜索框的填充
var GetListAssetsType={
	url:'/Assets/GetListAssetsType',
	type:'get'
}
commonFn(GetListAssetsType,function(data){
	for (var i = 0; i < data.length; i++) {
                data[i]
                $('<option value="'+data[i].id+'">'+data[i].typeName+'</option>').appendTo('#select2')
            }
	 layui.form().render();
	 getList(parseInt($('#select2').val()),$('input[name="Title"]').val());
});
form.on('select(type)',function(data){
    
    getList(data.value ,$('input[name="Title"]').val());
})
//搜索不同类型的资产
$('.search').click(function() {
    $('tbody').empty();
    getList( -1 , $('input[name="Title"]').val() );
});

function getList(id ,name ,curr) {
    var Id ;
    if (id == -1) {
        Id == null;
    }else{
        Id = id
    }
    layer.load();
    var GetListAssets={
    	 url:'/Assets/GetListAssets',
        data :{ typeId :Id , name :name , pageIndex:curr },
        type:'post'
    }
    commonFn(GetListAssets,function(data){
    	IsLogin();
            $('tbody').empty();
            laypage({
               	cont: 'page11',
                pages: data.pageCount, //总页数
                groups: 5, // 显示多少个页码
                curr : data.pageIndex,
                jump: function(e, first){ //触发分页后的回调
                    if(!first){ //一定要加此判断，否则初始时会无限刷 
                        getList($('#select2').val() , $('input[name="Title"]').val() , e.curr)
                    }
                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });   
            //资产信息的填充
           for (var i = 0; i < data.list.length; i++) {
                $('<tr id="'+data.list[i].id+'"><td>'+data.list[i].deptName+'</td><td>'+data.list[i].assCode+'</td><td><a href="viewdetail.html?id='+data.list[i].id+'">'
                +data.list[i].assName+'</a></td><td>'+data.list[i].keeperName+'</td><td>'
                +data.list[i].assOriginal+'</td><td>'+data.list[i].xingZhiName+'</td><td>'+data.list[i].typeName+'</td><td>'+solveTime(data.list[i].inTime)+'</td>'+
                        '<td><a href="addAssets.html?id='+data.list[i].id+'&assetsNature='+data.list[i].xinZhi+'&classid='+data.list[i].deptCode+'&assetsType='+data.list[i].typeCode+'&addtype='+data.list[i].addType+'" class="layui-btn layui-btn-mini" title="编辑">编辑</a>'+
                        '<a href="javascript:;"  class="layui-btn layui-btn-mini maintian" title="维护">维护</a>'+
                        '<a href="javascript:;" class="layui-btn layui-btn-mini layui-btn-normal reduce" title="减少">减少</a>'+
                        '<a href="javascript:;" class="layui-btn layui-btn-mini layui-btn-danger remove" title="删除">删除</a>'+
                        '</td></tr>').appendTo('tbody');
                }
           //资产维护
                $('.maintian').click(function() {
                    var Id = $(this).parent().parent().attr('id');
                    var Name = $(this).parent().parent().find('td:eq(2)').text();  
                     layer.open({    
                        type: 2,
                        title: "新建维护登记",
                        closeBtn: 1,
                        shadeClose: true,
                        skin: 'yourclass',
                        area: ['700px', '450px'],
                        content: 'maintain.html?id='+Id+'&name='+Name//这里content是一个DOM
                    })
                });
                //进行资产减少
                $('.reduce').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    var GetListAssetsHandlerType={
	                    url:'Assets/GetListAssetsHandlerType',
	                    data:{id:id},
	                    type:'post'
                    }
                    commonFn(GetListAssetsHandlerType,function(data){
                    	var t = data.resultData;
                    	$('#reduceselect').empty();
                    	for(var i=0;i<t.length;i++){
                    		$('<option value="'+t[i].id+'">'+t[i].name+'</option>').appendTo('#reduceselect');
                    	}
                    	form.render();
                    })
                    layer.open({
                    	type: 1,
                        title: "减少固定资产",
                        closeBtn: 1,
                        shadeClose: true,
                        skin: 'yourclass',
                        area: ['320px', '230px'],
                        content: $('#reduce'), //这里content是一个DOM
                        btn:['确定'],
                         yes:function(index, layero){
		                      	var duceid = $('#reduceselect').val();
	                            var AddAssetsDuce={
	                            	url:'/Assets/AddAssetsDuce',
	                                data : {id :id , duceid :duceid},
	                                type:'get'
	                            }
	                            commonFn(AddAssetsDuce,function(data){
	                            	layer.msg("保存成功",{
	                                    shift : 5 , 
	                                    time : 1200
	                                } , function(){
	                                    layer.close(index);
	                                }) 
	                            })                                                     
                          layer.close(index);
                        } 
                    })                                                
                })
                
                // 删除所选资产
                $('.remove').click(function() {
                    var Id = $(this).parent().parent().attr('id');
                    layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
                    	var DeleteAssets={
                    		url:'/Assets/DeleteAssets?id='+Id,
                            type:'delete'
                    	}
                    	commonFn(DeleteAssets,function(data){
                    		layer.closeAll('loading'); 
                    		IsLogin();
                    		layer.msg("删除成功",{
                                offset: 0,
                                shift: 5 , 
                                time :1500
                            } , function(){
                                $('tbody tr').each(function(index, el) {
                                    if ($(this).attr('id') == Id) {
                                        $(el).remove();
                                    }
                                });
                                layer.close(index);
                            })
                    	})
                    });
                 
                });
              // 关闭等待loading
                layer.closeAll('loading');
    })
}
function nulla(a){
    if (a) {
        return a
    }else{
        return ''
    };
};
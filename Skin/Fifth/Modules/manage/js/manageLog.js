
var SchoolId = getUrlParam('schoolid');
// layui的模块化定义引用;
var layer = layui.layer,
form = layui.form(),
laypage =layui.laypage;
// 获取第一页的日志管理列表
geyListLog( SchoolId ,1);
// 获取所有应用
getAllApp(SchoolId);
// 搜索  name  +  date

$('.search').click(function() {
    var name = $('.operaer').val();
    var date = $('.selectDate').val();
    var appId = $("#App").parent().val();
    var moduleId = $('#Modular').parent().val();
    if (moduleId != -1) {
        geyListLog(SchoolId,1 , moduleId , true , name , date)
    }else{
        geyListLog(SchoolId,1 , appId , false , name , date)
    }
    
});



function geyListLog(SchoolId,curr , appId , isApp , name ,date){
    commonFn({
        url:'Manage/GetListPage',
        data:{SchoolId:SchoolId,PageIndex : curr , AppId :appId , IsApp :isApp , name:name ,date:date},
        type:'post'
    },function(res){

                
                laypage({
                    cont: 'page',
                    pages:res.PageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr :res.PageIndex,
                    groups: 5,
                    jump: function(e, first){ //触发分页后的回调                
                        if(!first){ //一定要加此判断，否则初始时会无限刷 
                            var moduleId = $('#Modular').parent().val().split("_");
                            var appId = $('#App').parent().val();
                                var name = $('.operaer').val();
                                var date = $('.selectDate').val();
                            if (moduleId == -1) {
                                geyListLog(SchoolId,e.curr , appId , false ,  name , date);
                            }else{
                                geyListLog(SchoolId,e.curr , moduleId , true ,  name , date);
                            }
                            
                        }
                    },
                    skin: 'molv', //皮肤
                    first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                    last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                    prev: false, //若不显示，设置false即可
                    next: false //若不显示，设置false即可
                });
                var t =res.resultData
                if (t && t.length > 0) {
                    $('tbody').empty();
                    $.each( t , function(i, el) {
                        // 排序
                        var i2 = i+1
                        if (i2<10) {
                            if (curr == undefined) {
                                var p2 = ''
                                i2 = i2 * 1
                            }else{
                                var p2 = curr - 1 
                            }   
                        }else{
                            if (curr == undefined) {
                                var p2 = ''
                                i2 = i2 * 1
                            }else{
                                i2 = i2 * curr 
                                var p2 = ''
                            }
                        }
                        $('tbody').append('<tr>'+
                            '<td>'+isNull(el.id)+'</td>'+
                            '<td>'+isNull(el.content)+'</td>'+
                            '<td>'+isNull(el.menuName)+'</td>'+
                            '<td>'+isNull(el.appName)+'</td>'+
                            '<td>'+oktime(el.addTime)+'</td>'+
                            '<td>'+isNull(el.userName)+'</a></td>'+
                        '</tr>');
                    });
                }

    })
}
// 获取所有应用
function getAllApp(SchoolId){
    commonFn({
        url:'Manage/GetUserMenuList2',
        data:{
            menuid :0,
            type :0,
            schoolId:SchoolId
        }
    },function(res){
        if (res && res.length > 0) {
            $.each( res , function(i, el) {
                $('#App').after('<option value='+el.moduleId+'>'+el.moduleName+'</option>')
            });
            getAllModular(res);
            form.render('select');
            form.on('select(app)' ,function(data){
                getAllModular(res ,data.value);
                geyListLog( SchoolId,1 ,data.value , false);
            })
        }
    })
}

// 获取所有模块+选择应用 出来相应的模块;
function getAllModular(data ,i){
    $('#Modular').nextAll().remove();
    var $appId = i;
    // 选了应用 > 渲染模块列表
    if (i) {
        $.each(data , function(index, el) {
            if (el.ModuleId == i) {
                $.each( el.Children , function(index2, el2) {
                    $('#Modular').after('<option value='+el2.ModuleId+'_'+el.ModuleId+'>'+el2.ModuleName+'</option>')
                });  
            } 
        });
    //没选应用 > 渲染模块列表
    }else{
        $.each(data , function(index, el) {
            $.each( el.Children , function(index2, el2) {
                $('#Modular').after('<option value='+el2.ModuleId+'_'+el.ModuleId+'>'+el2.ModuleName+'</option>')
            }); 
        });
    }
    form.render('select');
    form.on('select(modular)' , function(data){
        var arr = data.value.split("_");  //分割传来的两个ID  第一个是模块ID  第二个是应用ID;
        var moduleId = arr[0];
        var appId = arr[1];
        if (moduleId == -1) {

            geyListLog(SchoolId, 1 ,$appId , false);  //如果选择所有子模块, 就传给当前应用的ID ,通过IsApp判断,  0是没选子模块,1是选择子模块
        }else{
            $('#App').parent().val(appId);

            geyListLog(SchoolId, 1 ,moduleId , true); //如果选择不是"所有子模块"的子模块, 就传给当前选择模块的ID ,IsApp为1;
        }
        form.render();  
    })
}
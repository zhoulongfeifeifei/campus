/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-06 14:35:42
 * @version $Id$
 */

var laypage =layui.laypage;
    ajaxList();

    $('.search').click(function() {
        ajaxList($('input[name="Key"]').val());
    });


    function ajaxList(seach,page){
        $.ajax({
            url: "/AjaxSendMail/GetListMail",
            data:{PageIndex : page ,Key : seach},
            success: function (data) {
                
                
                $('tbody').empty();
                var t =data.Data;
                laypage({
                    cont: 'page',
                    pages: t.PageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr : t.PageIndex,
                    groups: 5,
                    jump: function(e, first){ //触发分页后的回调
                        
                        if(!first){ //一定要加此判断，否则初始时会无限刷 
                            ajaxList($('input[name="Key"]').val() , e.curr)
                        }

                    },
                    skin: 'molv', //皮肤
                    first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                    last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                    prev: false, //若不显示，设置false即可
                    next: false //若不显示，设置false即可
                });

                for (var i = 0; i < t.ResultData.length; i++) {

                    var classXml = $(t.ResultData[i].ClassXml);
                    var className = [];
                    classXml.each(function(index, ele) {
                        className.push($(ele).find('className').text());
                    });

                    // var classDom = 
                    
                    
                    
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
                    $('<tr data-id="'+t.ResultData[i].TeacherId+'"><td>'+p2+i2+'</td><td class="RoleId">'+t.ResultData[i].UserId+'</td><td>'+t.ResultData[i].Name+'</td><td>'+t.ResultData[i].Phone+'</td><td></td><td></td><td><a href="AddTeacher.html?id='+t.ResultData[i].TeacherId+'" style="display:inline-block; width:4em;" class="link text blue">编辑</a><a onclick="delRole('+t.ResultData[i].TeacherId+')" class="link text red" >删除</a></td></tr>').appendTo('tbody');
                    for (var c = 0; c < className.length; c++) {
                        
                        $('tbody tr:eq('+i+') td:eq(4)').append('<span class="cr">'+className[c]+'</span>')
                    }
                    for (var d = 0; d < t.ResultData[i].Jobs.length; d++) {
                        var gname =t.ResultData[i].Jobs[d].GradeName;
                        if (gname ==null ) {
                            gname ='';
                        }
                        $('tbody tr:eq('+i+') td:eq(5)').append('<span>'+t.ResultData[i].Jobs[d].RoleName+'<span class="red">  '+gname+'</span></span></br>')
                    }

                }
            }
        });
    }
    
    
    function delRole(a) {

        layer.confirm('你确定要删除该通知公告吗？',{icon: 3, title:'提示'}, function() {
            $.ajax({
                url:"/AjaxSendMail/Delete", 
                data:{ id: a },
                success:function (data) {

                    
                    
                    if (data.Status == 1) {
                        $('tbody tr').each(function(index, el) {
                            if($(el).attr('data-id') == a){
                                $(el).remove();
                            };
                        })
                        layer.msg('删除成功',{
                            offset : 0,
                            shife : 5
                        })
                    }else
                    {
                        layer.msg(data.Message,{
                            offset : 0,
                            shife : 5
                        })
                    }
                },
                });
        })
    }  

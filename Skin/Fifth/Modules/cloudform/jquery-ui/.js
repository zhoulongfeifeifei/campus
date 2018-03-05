/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:03:26
 * @version $Id$
 */

    // 截取 进行中表单  或者结束表单过来的时候所携带的ID. 判断 是从哪里进来的
    function getUrlParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 
    var id,
    okId = getUrlParam('id'),
    dsid = getUrlParam('did'),
    form=layui.form();

    if (okId != null) {
        id = okId;
    }else if (dsid != null) {
        id = dsid;
        $('input , textarea').attr('readonly' , "readonly");
        $('#Sava').hide();
        layer.msg("为只读模式",{
            offset: 0,
            shift : 6
        })
    }else{
        
    }
    $.ajax({
        url:'/AjaxCloudForm/SettingShow',
        async : false,
        data:{Id :id},
        success:function(data){
            console.log(data)
            if (data.Status==1) {
                var itemslist = data.Data.Controls.Items;
                for (var i = 0; i < itemslist.length; i++) {
                    addControl(itemslist[i])
                }
                
                // 多选框最多选几个限制
                $('input[type="checkbox"]').click(function() {
                    if ($(this).parent().parent().find('input:checked').length == $(this).attr('data-maxlength')) {
                        $(this).parent().parent().find('input').attr('disabled', true);
                        $(this).attr('disabled', false)
                        layer.msg("最多选"+$(this).attr('data-maxlength')+"个")
                    } else {
                        $(this).parent().parent().find('input').attr('disabled', false);
                    }
                });
                form.on('checkbox',function(data){
                    console.log($(data.elem).siblings('input:checked').length+1);
                    console.log(parseInt($(data.elem).attr('data-maxlength')));
                    if (parseInt($(data.elem).attr('data-maxlength')) > 0 ) {
                        if ($(data.elem).siblings('input:checked').length+1 == $(data.elem).attr('data-maxlength')) {
                            $(data.elem).removeAttr('checked',false);
                            layer.msg("最多选"+$(data.elem).attr('data-maxlength')+"个")
                        }
                    }else{
                        console.log(123);
                        $('input[type="checkbox"]').attr("disabled","disabled")
                    }  
                })
                form.render();
            }else{
                layer.msg(data.Message);
            }
        }
    })



    
    
    $('#Sava').click(function() {
        var obj={}
        obj.FormId = id;
        obj.ItemData = [];
        $('.form .f1>label').each(function(index, el) {
            var Id = $(el).parent().attr('data-id')
            var type = $(el).parent().attr('data-typeId')
            var title = $(el).parent().find('.itemTitle').html();
            var value;
            if (type !=3 &&type !=4 ) {
                valuelist = $(el).next().children('input').val();
            }else{
                valuelist = []
                $(el).parent().each(function(index2, el2) {
                    $(el2).children('div').children('label').each(function(index3, el3) {
                        $(el3).children('input:checked').attr('data-checked',1)
                        var text = $(el3).text();
                        var value = $(el3).children('input').val();
                        var checked = $(el3).children('input').attr('data-checked');
                        if (checked ==undefined) {
                            checked = 0
                        }else{
                            checked=checked
                        }
                        valuelist.push({Text : text  , Value : value,checked: checked})
                    });;
                });
            }
            obj.ItemData.push({Id :Id , Type:type ,Title:title , Value :valuelist})
        })
        obj.ItemData =JSON.stringify(obj.ItemData)
        // obj = JSON.stringify(obj)
        console.log(obj);
        $.ajax({
            url:'/AjaxCloudForm/FillCloudForm',
            //data:{formid : obj.FormId , str :obj.ItemData},
            data: $(".layui-form").serialize(),
            success:function(data){
                console.log(data)
                if (data.Status==1) {
                    layer.msg('保存成功',{
                        time : 1200
                    },function(){
                        location.href = history.go(-1);;
                    })
                }else{
                    layer.msg(data.Message);
                }
            }
        })
    });
    // 根据返回罗列页面内容!!
    function addControl(obj){
        console.log(obj);
        if (obj == null) {
            layer.alert('没有控件',{icon : 5})
        }else{
            switch (obj.Type){
                // 单行
                case 0 : 
                $('<div class="layui-form-item f1" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" name="'+obj.Id+'" maxlength="50" value="'+obj.Tips+'"/><span>最多50个字</span></div></div>').insertBefore('#Sava');
                break;
                // 多行
                case 1 : 
                $('<div class="layui-form-item f1" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-block"><textarea name="'+obj.Id+'" id="" class="layui-textarea">'+obj.Tips+'</textarea></div></div>').insertBefore('#Sava');
                break;
                // 数字
                case 2 : 
                $('<div class="layui-form-item f1" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" name="'+obj.Id+'" value="'+obj.Tips+'"/><span>注:只能输入数字</span></div></div>').insertBefore('#Sava');
                break;
                // 单选
                case 3 : 
                $('<div class="layui-form-item f1" id="Radio'+obj.Sort+'" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-block"></div></div>').insertBefore('#Sava');
                    for (var i = 0; i < obj.Options.length; i++) {
                        obj.Options[i]
                        $('<input type="radio" title="'+obj.Options[i].Value+'" value="'+obj.Options[i].Value+'" name="'+obj.Id+'">'+obj.Options[i].Text).appendTo('#Radio'+obj.Sort+' div');
                    }
                break;
                // 多选
                case 4 : 
                $('<div class="layui-form-item f1" id="Checkbox'+obj.Sort+'" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-block radioitem"></div></div>').insertBefore('#Sava');
                    for (var i = 0; i < obj.Options.length; i++) {
                        $('<input data-maxlength = "'+obj.MaxLength+'" type="checkbox" title="'+obj.Options[i].Value+'" value="'+obj.Options[i].Value+'" name="'+obj.Id+'">'+obj.Options[i].Text).appendTo('#Checkbox'+obj.Sort+' .radioitem');
                    }   
                break;
                // 日期区间
                case 5 : 
                    $('<div class="layui-form-item f1" id="datarange" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"></div>').insertBefore('#Sava');
                    for (var i = 0; i < obj.Items.length; i++) {
                        console.log(1)
                        $('<div class="layui-input-inline"><div class="layui-form-item><label class="layui-form-label"><span class="itemTitle">'+obj.Items[i].Title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" onclick="dateEdit()" name="'+obj.Id+'" value="'+obj.Items[i].Tips+'"/></div></div>').appendTo('#datarange');
                    }   
                break;
                // 日期
                case 6 : 
                $('<div class="layui-form-item f1" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" onclick="dateEdit()" id="Time" name="'+obj.Id+'" value="'+obj.Tips+'"/></div></div>').insertBefore('#Sava');
                break;
                // 照片
                case 7 : 
                $('<div class="layui-form-item f1" data-id="'+obj.Id+'" data-typeId="'+obj.Type+'"><label class="layui-form-label"><input type="hidden" name="'+obj.Id+'" /><span class="red"></span><span class="itemTitle">'+obj.Title+'</span>：</label><div class="layui-input-inline"></div></div>').insertBefore('#Sava');
                break;
            }
             $("input[name='nubmer']").keyup(function(){  //keyup事件处理 
                $(this).val($(this).val().replace(/\D|^0/g,''));  
            }).bind("paste",function(){  //CTR+V事件处理 
                $(this).val($(this).val().replace(/\D|^0/g,''));  
            }).css("ime-mode", "disabled");  //CSS设置输入法不可用
        }
    }
    function dateEdit(){
        layui.laydate({
            elem: this, 
            istime: true, 
            format: 'YYYY-MM-DD hh:mm:ss'
        })
    }



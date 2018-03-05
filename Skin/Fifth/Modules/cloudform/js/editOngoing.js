/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-09 09:03:26
 * @version $Id$
 */
    var id,
    iId =  getUrlParam('iid'),
    okId = getUrlParam('id'),
    okId2 = getUrlParam('ids'),
    dsid = getUrlParam('did'),
    sid = getUrlParam('sid'),
    userId = getUrlParam('userid'),
    schoolid =  getUrlParam('schoolid'),
    idEdit = getUrlParam('isEdit') || 0,
    formmanage =  getUrlParam('formmanage'),
    form=layui.form(),
    $Items,
    $data,$val = '';
    $('input[name="isupdate"]').val(idEdit);
    if (okId) id = okId;
    else if (okId2) id = okId2;
    else if (dsid) id = dsid,$('#Sava').hide();
    else if(sid) id = sid , $('input[name=isupdate]').val(1);
    else if (iId) id =iId ,$('#Sava').hide();

    $('input[name=formid]').val(id);
    if (formmanage) $data = {id:id,formmanage:formmanage} , $('.top>img').attr('src' ,'../../Common/img/logo'+schoolid+'.png');
    else $data = {id:id,formmanage:0};
    commonFn({
        url:'CloudForm/SettingShow',
        async : false,
        data:$data
    },function(data){
        $('.title').text(data.title);
        $Items = data.controls.items;
        for (var i = 0; i < $Items.length; i++) {
            addControl($Items[i] , iId)
        }
        // 多选框最多选几个限制
        $('input[type="checkbox"]').click(function() {
            if ($(this).parent().parent().find('input:checked').length == $(this).attr('data-maxlength')) {
                $(this).parent().parent().find('input').prop('disabled', true);
                $(this).attr('disabled', false)
                layer.msg("最多选"+$(this).attr('data-maxlength')+"个")
            } else {
                $(this).parent().parent().find('input').prop('disabled', false);
            }
        });
        form.on('checkbox',function(data){
            var maxlength = parseInt($(data.elem).attr('data-maxlength'))
            if (maxlength > 0 ) {
                console.log($(data.elem).parent().parent().find('input:checked').length,maxlength);
                if ($(data.elem).parent().parent().find('input:checked').length > maxlength) {
                    $(data.elem).attr('checked',false);
                    layer.msg("最多选"+maxlength+"个" ,{shift :6})
                }
            }else{ 
                $('input[type="checkbox"]').prop("disabled","disabled")
            } 
            form.render('checkbox'); 
        })
        form.render();
    })

    
    // $('#Sava').click(function() {
    form.on('submit(Sava)',function(){
        form.render();
        var obj={}
        obj.formid = id;
        obj.isupdate = $('input[name="isupdate"]').val();
        $.each($Items, function(index, val) {
            console.log(index,val);
            val.value = $('*[name="'+val.id+'"]').val()
            if (val.type ==3) {
                val.value = $('input[name="'+val.id+'"]:checked').val()
            }  
            if (val.type ==4) {
                val.value = [];
                $.each($('input[name="'+val.id+'"]:checked'), function(i, el) {
                    val.value.push($(el).val());
                });
                val.value = val.value.join(',')
            } 
        });
        obj.str = JSON.stringify($Items);
        var savaLoad =layer.load();
        commonFn({
            url:'CloudForm/FillCloudForm',
            data: obj,
            type:'post'
        },function(data){
            if (!okId2) {
                layer.msg('保存成功',{
                    time : 1200
                },function(){
                    layer.close(savaLoad);

                    location.href ="formongoinglist.html";
                })
            }else{
                layer.close(savaLoad);
                var btn = '<a href="javascript:window.opener=null;window.open(\'\',\'_self\');window.close();" class="layui-btn">关闭当前页</a>';
                $('input, textarea').prop('disabled','disabled');
                $('#Sava').parent().append(btn);
                $('#Sava').remove();
            }
        })
        return false;
    });
    // 根据返回罗列页面内容!!
    function addControl(obj ,iId){
        
        if (obj == null) {
            layer.alert('没有控件',{icon : 5})
        }else{
            var $fuck= 'placeholder='+obj.tips+'' , isgo = true;
            if (iId) {
                $fuck ='';
                isgo =false;
            }else{
                if (obj.value) {
                    $val = obj.value;
                    $fuck= 'value='+$val+''
                }
            }
            switch (obj.type){
                // 单行
                case 0 : 
                    $('<div class="layui-form-item f1" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" name="'+obj.id+'" maxlength="50" '+$fuck+' ></div>').appendTo('#content');
                break;
                // 多行
                case 1 : 
                    $('<div class="layui-form-item f1" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-inline"><textarea '+$fuck+' name="'+obj.id+'" id="" class="layui-textarea">'+$val+'</textarea></div></div>').appendTo('#content');
                break;
                // 数字
                case 2 : 
                    $('<div class="layui-form-item f1" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" lay-verify="number" type="number" name="'+obj.id+'" '+$fuck+'></div></div>').appendTo('#content');
                break;
                // 单选
                case 3 : 
                    $('<div class="layui-form-item f1" id="Radio'+obj.sort+'" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-block okblock"></div></div>').appendTo('#content');
                    for (var i = 0; i < obj.options.length; i++) {
                        var faker='';
                        if (!isgo){
                        }else if (obj.value == obj.options[i].value) {
                            faker ='checked';
                        }    
                        $('<div class="layui-input-block" style="padding-left:8em;"><input type="radio" '+faker+' title="'+obj.options[i].value+'" value="'+obj.options[i].value+'" name="'+obj.id+'"></div>').appendTo('#Radio'+obj.sort+' .okblock');
                    }
                break;
                // 多选
                case 4 : 
                    $('<div class="layui-form-item f1" id="Checkbox'+obj.sort+'" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-block radioitem"></div></div>').appendTo('#content');
                    if (obj.value) var chearr = obj.value.split(",");
                    if (!isgo)  return;
                    for (var i = 0; i < obj.options.length; i++) {
                        var faker=''
                        
                        if (chearr){
                            $.each(chearr ,function(index, el) {
                                if (obj.options[i].value == el) {
                                    faker = 'checked';
                                }
                            });  
                        }
                        
                        $('<div class="layui-input-block"><input data-maxlength = "'+obj.maxLength+'" '+faker+' type="checkbox" title="'+obj.options[i].value+'" value="'+obj.options[i].value+'" name="'+obj.id+'"></div>').appendTo('#Checkbox'+obj.sort+' .radioitem');
                    }   
                break;
                // 日期区间
                case 5 : 
                    $('<div class="layui-form-item f1" id="datarange" data-id="'+obj.id+'" data-typeId="'+obj.type+'"></div>').appendTo('#content');
                    for (var i = 0; i < obj.Items.length; i++) {
                        
                        $('<div class="layui-form-item><div class="layui-input-inline"><label class="layui-form-label"><span class="itemTitle">'+obj.Items[i].title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" onclick="layui.laydate({elem: this, istime: true, format: \'YYYY-MM-DD hh:mm:ss\'})" name="'+obj.id+'" value="'+obj.Items[i].tips+'"/></div></div>').appendTo('#datarange');
                    }   
                break;
                // 日期
                case 6 : 
                    $('<div class="layui-form-item f1" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-inline"><input class="layui-input" type="text" onclick="layui.laydate({elem: this, istime: true, format: \'YYYY-MM-DD hh:mm:ss\'})" id="Time" name="'+obj.id+'" '+$fuck+' ></div></div>').appendTo('#content');
                break;
                // 照片
                case 7 : 
                    var updom , uploadurl = '/AjaxCommon/UploadImage' , attrSrc = '';
                    if (obj.value) attrSrc = 'src="'+obj.value+'"';
                    if(dsid && isgo) updom = '<img class="uploadImg'+obj.id+'" '+attrSrc+' name="'+obj.id+'" /><input type="hidden" class="'+obj.id+'" name="'+obj.id+'"/>';
                    else if (!isgo) updom = '<input type="file" name="file" class="layui-upload-file upload'+obj.id+'"><img class="uploadImg'+obj.id+'" name="'+obj.id+'" /><input type="hidden" class="'+obj.id+'" name="'+obj.id+'"/>';
                    else updom = '<input type="file" name="file" class="layui-upload-file upload'+obj.id+'"><img class="uploadImg'+obj.id+'" '+attrSrc+' name="'+obj.id+'" /><input type="hidden" class="'+obj.id+'" name="'+obj.id+'"/>';
                    $('<div class="layui-form-item f1" data-id="'+obj.id+'" data-typeId="'+obj.type+'"><label class="layui-form-label"><span class="itemTitle">'+obj.title+'</span>：</label><div class="layui-input-inline">'+updom+'</div></div>').appendTo('#content');
                    if(formmanage) uploadurl = '/AjaxCommon/UploadImageWithoutLogin';
                    var upmodal;
                    layui.upload({
                        url: uploadurl,
                        elem:$('.upload'+obj.id),
                        title:"上传照片",
                        before:function(res){
                            upmodal = layer.load(1);
                        },
                        success: function(res){
                            layer.close(upmodal);
                            $('.uploadImg'+obj.id).attr('src',res.data);
                            $('.'+obj.id).val(res.data);
                        }
                    }); 
                break;
            }
            $("input[name='nubmer']").keyup(function(){  //keyup事件处理 
                $(this).val($(this).val().replace(/\D|^0/g,''));  
            }).bind("paste",function(){  //CTR+V事件处理 
                $(this).val($(this).val().replace(/\D|^0/g,''));  
            }).css("ime-mode", "disabled");  //CSS设置输入法不可用

            if (dsid != null) {
                $('input, textarea').prop('disabled','disabled');
            }
            form.render();
        }
    }
    function dateEdit(){
        layui.laydate({
            elem: this, 
            istime: true, 
            format: 'YYYY-MM-DD hh:mm:ss'
        })
    }
    



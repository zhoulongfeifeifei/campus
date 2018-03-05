/**
 *
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-11-28 16:40:22
 * @version $Id$
 * 发布日志模块
 */

var Id = getUrlParam('id'),
    element = layui.element(),
    form = layui.form(),
    layer =layui.layer,
    layedit = layui.layedit;


/************日志分类**********/
blogKind();
function blogKind(){
var GetLogsTypes = {
        url:'Blog/GetLogsTypes',
        id:Id
    }
commonFn(GetLogsTypes,function(res){
		
       $.each(res,function(index,el){
           $('#journalTypeSelect').after('<option value='+el.id+'>'+el.typeName+'</option>')
       })
       form.render();
    })
}

/**********编*****辑****日***志**********/
if (Id) {
    $('#title').text("编辑日志");
    element.init();
    var $Id =Id;
    var ajaxLogsInfo = {
        url:'Blog/LogsInfo',
        data:{
            logsId:$Id,
            userId:'112804'
        },
        type:'get'
    }
commonFn(ajaxLogsInfo, function(res){
                // 编辑的时候给 上日志标题
                $('input[name="journalName"]').val(res.log.logs_Title);
                $('#writeJournal').val(res.log.logs_Content); // 给编辑器里面加点东西
                $('#journalTypeSelect').parent().find('option[value='+res.log.logs_TypeId+']').attr('selected' ,'selected');
                $('#powerSelect').find('option[value='+res.log.logs_Power+']').attr('selected' ,'selected');
                form.render();
                whatSava($Id)
        })
    }else{
    $('#title').text("发布日志");
    element.init();
    whatSava()
}

function whatSava(id){
    Journal=layedit.build('writeJournal', {
        tool: ['strong', 'italic', 'underline', 'del', '|', 'left', 'center', 'right', 'link', 'unlink', 'face'],
        height: 180
    })
}

/************添加分类日志*************/
$('.addType').click(function () {
    layer.prompt({title: '输入分类名称'}, function (value, index) {
        if ($.trim(value).length > 0) {
            var ajaxAddLogsType = {
                url: 'Blog/AddLogsType',
                data: {typeName: value},
                type: 'post'
            }
            commonFn(ajaxAddLogsType, function (res) {
                parent.layer.msg("添加成功", {time: 1000}, function () {
                    layer.close(index);
                })
                $('select[name="city"] option').empty();
                blogKind();
            })
        } else {
            layer.msg("请输入分类名称");
        }
    })
});

/********************发布日志*****************/
$('.Sava').click(function () {
    //定一个空对象model
    var model = {}, url = 'Blog/PublishLogs';
    //给对象设置属性
    model.logs_Title = $('input[name="journalName"]').val();
    model.logs_Content = layedit.getContent(Journal);
    model.logs_TypeId = $('#journalTypeSelect').parent().val();
    model.logs_Power = $('#powerSelect').val();
    // console.log(model.logs_Power);
    if (Id) {
        model.id = Id;
        url = 'Blog/EditLogs';
    }
    if ($.trim(model.logs_Title).length > 0) {
        if ($.trim(model.logs_Content).length > 0) {
            var ajaxinfor = {
                url: url,
                data: model,
                type: 'post'
            }
            commonFn(ajaxinfor, function (res) {
                layer.msg("发布成功", {time: 1000}, function () {
                    location.href = "Journal.html";
                });
            })
        } else {
            layer.msg("日志内容不能为空");
        }
    } else {
        layer.msg("日志标题不能为空");
    }
});




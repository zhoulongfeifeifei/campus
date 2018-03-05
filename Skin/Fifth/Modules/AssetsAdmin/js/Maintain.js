var upload = layui.upload,
laydate = layui.laydate,
element = layui.element(),
form =layui.form(),
$ = layui.jquery,
layedit = layui.layedit;
function clearKeeper() {
    $('input[name="mainKeeper"]').removeAttr('value');
    $('input[name="mainKeeper"]').removeAttr('data-id');
}
function getRequestParam(param) {
    var requestString = location.search;
    var reg = new RegExp("(?:\\?|&)" + param + "=(.*?)(?:&|$)");
    if (reg.test(requestString)) {
        return decodeURIComponent(RegExp.$1);
    } else {
        return '';
    }
}
var Id = getRequestParam('id');
var Name = getRequestParam('name');
var schoolid = getCookieByUserInfo('schoolid');
$('input[name="mainName"]').val(Name);
$('input[name="mainName"]').attr('data-id', Id);
//资产维护的编辑
var GetListAssetsAttribute={
	url: '/Assets/GetListAssetsAttribute',
	data:{schoolId:schoolid},
	type:'get'
}
commonFn(GetListAssetsAttribute,function(data){
	var mainType = data.addTypeList;
    var keeper = data.keeperList;
    for (var i = 0; i < mainType.length; i++) {
        $('#maindept').append('<option value="' + mainType[i].id + '">' + mainType[i].name + '</option>')
           }
    form.render();       
    $('.choice').click(function() {
        $('#renwu ul').empty();
                for (var i = 0; i < keeper.length; i++) {

                    $('<li><label><input id="' + keeper[i].user_id + '" name = "keep" type="radio"><span>' + keeper[i].name + '</span></label></li>').appendTo('#renwu ul');
                }
                $('#renwu').css('margin-top', '10px')
                $('#renwu li').css({
                        'margin': '2% 4%',
                        'width': '40%',
                        'display': 'inline-block'
                    })
                $('#renwu input').change(function(event) {
                    $(this).parent().find('input').attr('checked', 'checked')
                });
                layer.open({
                    type: 1,
                    title: "维护人员",
                    closeBtn: 1,
                    shadeClose: true,
                    moveOut: true,
                    skin: 'yourclass',
                    area: ['500px', '300px'],
                    content: $('#renwu'), //这里content是一个DOM
                    btn: ['保存'],
                    yes: function(index, layero) {
                        $('#renwu ul li').each(function(i, el) {
                            if ($(el).find('input[checked="checked"]')) {
                                var dataid = $(el).find('input[name="keep"][checked="checked"]').attr('id')
                                var dname = $(el).find('input[name="keep"][checked="checked"]').next('span').html()
                                $('input[name="mainKeeper"]').attr('value', dname)
                                $('input[name="mainKeeper"]').attr('data-id', dataid)
                            }
                        });
                        layer.close(index);
                    }
                })
            })
    //修改之后进行保存
            $('#sava').click(function() {
                var model = {}
                model.id = $('input[name="mainName"]').attr('data-id');
                model.Name = $('input[name="mainName"]').val();
                model.keeper = $('input[name="mainKeeper"]').val();
                model.UserId = $('input[name="mainKeeper"]').attr('data-id');
                model.maintainType = $("#maindept").val();
    
                model.Remark = $('#Notes').val();
                model.AddTime = $('#BeginTime').val();
                if (!model.AddTime) {
                    layer.msg("时间不能为空");
                    return;
                }
                if(!model.maintainType){
                	layer.msg('请选择维护类型')
                }else if(!model.keeper){
                	layer.msg('请选择维护人员')
                }else{
                	var savaload= layer.load();
	                var AddMaintainRecored={
	                	url: "Assets/AddMaintainRecored",
	                    data: model,
	                    type:'post'
	                }
                	commonFn(AddMaintainRecored,function(data){
	                    layer.closeAll();
	                	parent.layer.msg('保存成功')
	                    parent.layer.closeAll();
	                })
                }                
            });
})
 
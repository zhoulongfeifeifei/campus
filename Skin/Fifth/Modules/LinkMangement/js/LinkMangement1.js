layer = layui.layer;
form = layui.form();

data_type(2);
//渲染数据到页面
function data_type(bbb) {
    var ajaxGetLinksList = {
        url: 'Link/GetLinksList',
        type: 'post',
        data: {
            type: bbb || 2
        }
    }
    commonFn(ajaxGetLinksList, function (data) {
        $('tbody').empty();
        $.each(data.resultData, function (i, n) {
            $('tbody').append("<tr><td><span class='types' data-id='" + n.type + "'>" + (i + 1) + "<span></td>" +
                "<td class='n-title'>" + n.title + "</td><td><span class='n-weburl'>" + n.webUrl + "</span></td>" +
                "<td><a href='javascript:' class='layui-btn layui-btn-mini edit' data-id='" + n.id + "'>编辑</a><a href='javascript:del(" + n.id + ");' class='layui-btn layui-btn-mini layui-btn-danger del' data-id='" + n.id + "'>删除</a></td></tr>");
        })
        form.render();

    })
}
//创建网址。
$('body').on('click','#add_web',function (){
    $('input[name="name"]').val('');
    $('input[name="link"]').val('');
    layer.open({
        type: 1,
        fix: false, //不固定
        maxmin: true,
        offset: '150px',
        scrollbar: false,
        area: ['550px', '330px'],
        btn: ['保存', '取消'],
        content: $('.layer-web'),
        yes: function (index) {
            //获取公共链接标签页,点击创建弹窗里的输入框的值
            var $$name = $('input[name="name"]').val();
            var $$weblink = $('input[name="link"]').val();
            var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            if($$name.length > 0 && reg.test($$weblink)) {
                var ajaxinfor = {
                    url: 'Link/AddLink',
                    type: 'POST',
                    data: {
                        title: $$name,
                        webUrl: $$weblink,
                        type: 2 //给标签页展示的内容一个标记,使他们俩互不相影响改的内容
                    }
                }
                commonFn(ajaxinfor, function () {
                    layer.msg('保存成功')
                    layer.close(index);
                    data_type(2)
                })
            }else{
                layer.msg('名称不能为空,或网址格式不正确')
            }

        }
    })
})

/******************编辑网址*************************/

$('body').on('click', '.edit', function () {
    var id = $(this).attr("data-id");
    //得到名称和url地址值
    var name = $(this).parent().parent().find('.n-title').text();
    var weblink = $(this).parent().parent().find('.n-weburl').text();
    //将得到的值保存在输入框里
    $('input[name="webName"]').val(name);
    $('input[name="linkName"]').val(weblink);
    layer.open({
        type: 1,
        area: ['550px', '330px'],
        content: $('.layer-web2'),
        btn: ['保存', '取消'],
        yes: function (index,layero) {
            //点击保存按钮时,拿到新改后的输入框的值
            var name = $('input[name="webName"]').val();
            var weblink = $('input[name="linkName"]').val();
            // console.log(weblink)
            var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            if (name.length > 0 && reg.test(weblink)) {
                var ajaxinfor = {
                    url: 'Link/UpdateLink',
                    data: { title: name, id: id,webUrl: weblink},
                    type: 'POST'
                };
                commonFn(ajaxinfor, function () {
                    layer.msg("修改成功");
                    layer.close(index);
                    data_type(2);
                })
            } else {
                layer.msg('名称不能为空,或编辑的网址格式不正确',{time:600})
            }
        }
    })
})

    /***********删除网址**************/
    function del(id) {
        layer.confirm('您确定要删除吗?',{ icon: 3, title:'提示'},function(index){
            var ajaxDeleteLink = {
                url: 'Link/DeleteLink?id=' + id,
                type: 'DELETE'
            };
            commonFn(ajaxDeleteLink, function() {
                $('tbody td').remove();
                layer.msg('删除成功');
                data_type(2);
            })
        })
    }
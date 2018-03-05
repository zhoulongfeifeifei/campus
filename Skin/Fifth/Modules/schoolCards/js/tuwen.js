

console.log(window.location.href);
var model = {};
model.schoolid = window.schoolid;
model.clint_type = 1;
// model.pageIndex = 1;
model.pageSize = 10;

commonFn({ url: 'XAWebCommon/GetList_LunboImgs', type: 'POST', data: model }, function (res) {
    var laypage = layui.laypage;
    aa();
    function aa(current) {
        var total = res.pageCount;
        model.pageIndex = current;
        commonFn({ url: 'XAWebCommon/GetList_LunboImgs', type: 'POST', data: model }, function (res) {
            console.log(res);
            var lunbo = res.resultData;
            laypage({
                cont: 'page',
                pages: total,
                curr: current,
                groups: 5,
                jump: function (e, first) {
                    if (!first) {
                        aa(e.curr);
                    }
                },
                skin: '#319c65',
                first: '首页',
                last: '尾页',
                prev: false,
                next: false
            });
            // laypageOk(current)
            $('.table table tbody').empty();
            for (var i = 0; i < lunbo.length; i++) {
                if (lunbo[i].xA_Album == null || lunbo[i].xA_Album == '') {
                    label = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>'
                    $('.table table tbody').append('<tr><td>' + (i + 1) + '</td><td>' + lunbo[i].clint_id + '</td><td></td><td>' + label +
                        '</td><td class="edit"><a class="text link" href="Lunbo.html?clint_id=' + lunbo[i].clint_id + '">编辑</a><a class="text link green publish" val="' +
                        lunbo[i].clint_id + '">重新发布</a></td></tr>');
                } else {
                    label = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>'
                    $('.table table tbody').append('<tr><td>' + (i + 1) + '</td><td>' + lunbo[i].clint_id + '</td><td></td><td>' + label +
                        '</td><td class="edit"><a class="text link" href="Lunbo.html?clint_id=' + lunbo[i].clint_id + '">编辑</a><a class="text link green publish" val="' +
                        lunbo[i].clint_id + '">重新发布</a></td></tr>');
                    for (var j = 0; j < lunbo[i].xA_Album.length; j++) {
                        $('.table table tbody tr').eq(i).find('td').eq(2).append('<img src="' + lunbo[i].xA_Album[j].img + '" style="height: 56px; width: 100px; display: inline-block;" />')
                    }

                }

            }
            $('.publish').click(function () {
                var device = $(this).attr('val');
                commonFn({ url: 'XAWebCommon/Update_LunboImg?devideids=' + device + '&img=" "&title=" "&type=0&position=1', type: 'GET' }, function (res) {
                    alert(res);
                })
            });
        })
    }

})





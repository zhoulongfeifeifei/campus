

commonFn({ url: 'XAWebBanpai/GetList_BaPingByDevice?schoolid=' + window.schoolid, type: 'GET' }, function (res) {
    console.log(res);
    for (var i = 0; i < res.length; i++) {
        if (res[i].state == 1) {
            label = '<label class="red"><i class="fa fa-minus-circle"></i> 未发布</label>'
            sta = '重新发布'
        } if (res[i].state == 2) {
            label = '<label class="green"><i class="fa fa-check-circle"></i> 已发布</label>'
            sta = '取消发布'
        }
        var time = res[i].updateTime.replace('T',' ')
        var str1 = res[i].deviceids.split(",");
        var str2 = '';
        $.each(str1,function(n){
           str2 += str1[n].split("(")[0];
           if (n != (str1.length - 1)) {
               str2 += ','
           }
        })
        console.log(str2)
        console.log(str1)
        if (res[i].allScreen == null || res[i].allScreen == '') {
            
            $('.table table tbody').append('<tr><td>' + (i + 1) + '</td><td></td><td></td><td>' + label +
                '</td><td>' + time + '</td><td class="edit"><a class="text link" href="">编辑</a><a class="text link green publish" val="' +
                str2 + '" data_cao="' + res[i].state + '">' + sta + '</a><a class="text red link del" val="">删除</a></td></tr>');
                for (var k = 0; k < str1.length; k++){
                    $('.table table tbody tr').eq(i).find('td').eq(1).append(str1[k] + '<br>')
                }
        } else {
            
            $('.table table tbody').append('<tr><td>' + (i + 1) + '</td><td></td><td></td><td>' + label +
                '</td><td>' + time + '</td><td class="edit"><a class="text link" href="ba.html">编辑</a><a class="text link green publish" val="' +
                str2 + '" data_cao="' + res[i].state + '" data_sno="' + res[i].allScreen[0].sno + '">' + sta + '</a><a class="text red link del" val="' + res[i].allScreen[0].sno + '">删除</a></td></tr>');
            for (var j = 0; j < res[i].allScreen.length; j++) {
                $('.table table tbody tr').eq(i).find('td').eq(2).append('<img src="' + res[i].allScreen[j].img + '" style="height: 56px; width: 100px; display: inline-block;" />')
            }
            for (var k = 0; k < str1.length; k++) {
                $('.table table tbody tr').eq(i).find('td').eq(1).append(str1[k] + '<br>')
            }
            $('.table table tbody tr').eq(i).find('.edit').find('a').eq(0).attr('href','ba.html?sno=' + res[i].allScreen[0].sno)
            // $('.edit a').eq(0).attr('href','ba.html?sno=' + res[i].allScreen[0].sno)

        }
        
    }
    $('.del').click(function () {
        console.log($(this).attr('val'))
        var tr = $(this).parent().parent("tr");
        if (confirm("是否删除该霸屏")) {
            commonFn({ url: 'XAWebBanpai/Delete_BaPingBySno?sno=' + $(this).attr('val'), type: 'GET' }, function (res) {
                if (res == true) $(tr).remove();
                console.log(res)
            })
        }


    })
    $('.publish').click(function () {
        console.log($(this).attr('val'))
        if ($(this).attr('data_cao') == 1) {
            fabu = 1
        } if ($(this).attr('data_cao') == 2) {
            fabu = 2
        }
        commonFn({ url: 'XAWebBanpai/Update_BaPing?deviceids=' + $(this).attr('val') + '&img=0&sno=' + $(this).attr('data_sno') + '&message=0&schoolid=' + window.schoolid + '&type=' + fabu, type: 'GET' }, function (res) {
            alert(res);
            history.go(0)
        })
    });

})
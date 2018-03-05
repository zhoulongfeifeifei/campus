
var timearr = [1, 2, 3, 5, 6, 7, 8];
var str_num;
var num;
var a = 2, b = 1, c = 0, d = 4, e = 0;
var dant = [1, 2], duot = [3], pant = [], tiant = [5, 6, 7, 8], jiet = [];
var dan = ['<p>111111111</p>', '<p>22222222</p>'], duo = ['<p>33333333</p>'], pan = [], tian = ['<p>55555</p>', '<p>66666</p>', '<p>777777</p>', '<p>8888888</p>'], jie = [];
if (dan != '') {
    $('#yulan .main #sec1').empty();
    $('#yulan .main #sec1').append('<p class="title">单选题</p>');
    $.each(dan, function (i) {
        var text = dan[i].replace(/<.*?>/ig, "");
        $('#yulan #sec1').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del">删除</span></div>');
        $('#yulan #sec1 div').eq(i).find('.del').attr('data_time', dant[i]);
    })
    $('#yulan #sec1 div').eq(0).find('.up').css('display','none')
    $('#yulan #sec1 div').eq(dan.length - 1).find('.down').css('display','none')
}
if (duo != '') {
    $('#yulan .main #sec2').empty();
    $('#yulan .main #sec2').append('<p class="title">多选题</p>');
    $.each(duo, function (i) {
        var text = duo[i].replace(/<.*?>/ig, "");
        $('#yulan #sec2').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del">删除</span></div>');
        $('#yulan #sec2 div').eq(i).find('.del').attr('data_time', duot[i]);
    })
    $('#yulan #sec2 div').eq(0).find('.up').css('display','none')
    $('#yulan #sec2 div').eq(duo.length - 1).find('.down').css('display','none')
}
if (pan != '') {
    $('#yulan .main #sec3').empty();
    $('#yulan .main #sec3').append('<p class="title">判断题</p>');
    $.each(pan, function (i) {
        var text = pan[i].replace(/<.*?>/ig, "");
        $('#yulan #sec3').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del">删除</span></div>');
        $('#yulan #sec3 div').eq(i).find('.del').attr('data_time', pant[i]);
    })
    $('#yulan #sec3 div').eq(0).find('.up').css('display','none')
    $('#yulan #sec3 div').eq(pan.length - 1).find('.down').css('display','none')
}
if (tian != '') {
    $('#yulan .main #sec4').empty();
    $('#yulan .main #sec4').append('<p class="title">填空题</p>');
    $.each(tian, function (i) {
        var text = tian[i].replace(/<.*?>/ig, "");
        $('#yulan #sec4').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del">删除</span></div>');
        $('#yulan #sec4 div').eq(i).find('.del').attr('data_time', tiant[i]);
    })
    $('#yulan #sec4 div').eq(0).find('.up').css('display','none')
    $('#yulan #sec4 div').eq(tian.length - 1).find('.down').css('display','none')
}
if (jie != '') {
    $('#yulan .main #sec5').empty();
    $('#yulan .main #sec5').append('<p class="title">解答题</p>');
    $.each(jie, function (i) {
        var text = jie[i].replace(/<.*?>/ig, "");
        $('#yulan #sec5').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del">删除</span></div>');
        $('#yulan #sec5 div').eq(i).find('.del').attr('data_time', jiet[i]);
    })
}



$('#yulan .main .sec').on('click','.up',function(){
    $('#yulan .main #sec4').empty();
    $('#yulan .main #sec4').append('<p class="title">填空题</p>');
    var tt = tian[$(this).attr('data_id')]
        
        tian[$(this).attr('data_id')] = tian[$(this).attr('data_id') - 1]
        tian[$(this).attr('data_id') - 1] = tt;
        console.log(tian)
    $.each(tian, function (i) {
        // $(this).attr('data_id');
        
        var text = tian[i].replace(/<.*?>/ig, "");
        $('#yulan #sec4').append('<div><b class="tit">' + (i + 1) + '.' + text + '</b><span class="up" data_id="' + i + '">上移</span><span class="down" data_id="' + i + '">下移</span><span class="del" data_qt="4">删除</span></div>');
        $('#yulan #sec4 div').eq(i).find('.del').attr('data_time', tiant[i]);
    })
    $('#yulan #sec4 div').eq(0).find('.up').css('display','none')
    $('#yulan #sec4 div').eq(tian.length - 1).find('.down').css('display','none')
})


$('.del').click(function () {
    str_num = $('#yulan .top .shi').html();
    num = parseInt(str_num.replace(/[^0-9]/ig, ""));
    $(this).parent('div').remove()
    $('#yulan .top .shi').html('推荐用时' + (num - $(this).attr('data_time')) + '分钟')
})


$('#tiaoji').click(function () {
    $(this).addClass('lathis').siblings().removeClass('lathis');
    $('#iframe1,#iframe3').hide();
    $('#iframe2').show();
})
$('#sucess').click(function () {
    $(this).addClass('lathis').siblings().removeClass('lathis');
    $('#iframe2,#iframe3').hide();
    $('#iframe1').show();
})
$('#defeat').click(function () {
    $(this).addClass('lathis').siblings().removeClass('lathis');
    $('#iframe1,#iframe2').hide();
    $('#iframe3').show();
})


// console.log(window.location.search);
var arr = window.location.search.split('&');
var a = arr[0].replace('?a=','');
var b = arr[1].replace('b=','');
var c = arr[2].replace('c=','');
var d = arr[3].replace('d=','');
var e = arr[4].replace('e=','');

if (a != 0) {
    $('.middle .a').append('单选题' + a + '道');
} if (b != 0) {
    $('.middle .b').append('多选题' + b + '道');
} if (c != 0) {
    $('.middle .c').append('判断题' + c + '道');
} if (d != 0) {
    $('.middle .d').append('填空题' + d + '道');
} if (e != 0) {
    $('.middle .e').append('解答题' + e + '道');
}

$('.bo').click(function(){
    location.href = 'question.html';
})
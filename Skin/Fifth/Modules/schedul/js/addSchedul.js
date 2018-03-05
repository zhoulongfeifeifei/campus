/**
 * 日程协同的添加编辑js
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-02-27 15:43:50
 * @version $Id$
 */

var form = layui.form(),
  laydate = layui.laydate,
  index = window.parent.layer.getFrameIndex(window.name), //获取窗口索引
  //从cookie里拿到userName
  usersname = getCookieByUserInfo('name'),
  option = {},
  users,
  id = getUrlParam('id'),
  selectDate = getUrlParam('data'),
  startDate = getUrlParam('start')
endDate = getUrlParam('end'),
  action = getUrlParam('action');
if (startDate && endDate) {
  startDate = startDate.replace(/%20/g, ' ');
  endDate = endDate.replace(/%20/g, ' ');
}
$('.usersname').text(usersname);
$('.startDate').val(selectDate);
$('#allDay').val(true);

// 编辑的时候
if (action == "edit") {
  $('.layui-form').append('<input type="hidden" id="Id" value=' + id + '>')
    // 获取数据
  commonFn({
    url:'Schedule/GetScheduleModel',
    data: {
      id: id
    }
  },function(res){
        $('#zhuti').val(res.title);
        if (res.allDay == "false") {
           option.istime = true;
           option.format = 'YYYY-MM-DD hh:mm:ss';
          $('input[name="allDay"]').prop('checked', false);
        } else {
          $('input[name="allDay"]').prop('checked', true);
        }

        $('.startDate').val(res.start);
        $('.endDate').val(res.end);
        $('.richengtype input[value=' + res.scheduleType + ']').prop('checked', true);
        $('.gongxtype input[value=' + res.shareType + ']').prop('checked', true);
        var strs = [],
          sdtypestr, ShareTypeStr;
        if (res.userList) strs = res.userList.split(";"), sdtypestr = strs[0], ShareTypeStr = strs[1]; //字符分割 
        if (res.scheduleType == 1) {
          $('.display1').css('display', 'block');
          $('input[name="openObject"]').attr('data-id', sdtypestr);
          $('input[name="openObject"]').val(res.cooName);
        }
        if (res.shareType == 1) {
          $('.display2').css('display', 'block');
          $('input[name="openObject_1"]').attr('data-id', ShareTypeStr);
          $('input[name="openObject_1"]').val(res.shareName);
        }
        form.render();
  })
} else if (action == "add" && endDate) {
  $('input[name="allDay"]').prop('checked', false);
  $('#allDay').val(false);
  $('.startDate').val(startDate);
  $('.endDate').val(endDate);
  option.istime = true;
  option.format = 'YYYY-MM-DD hh:mm:ss';
  form.render();
}
// 监听是否全天 改变时间控件显示的格式;
form.on('checkbox(allDay)', function(data) {
  $('input[name="date"]').val('');
  if (data.elem.checked) option.format = 'YYYY-MM-DD', $('#allDay').val(true);
  else option.format = 'YYYY-MM-DD hh:mm:ss', option.istime = true, $('#allDay').val(false);
  form.render();
});

function layuiDate(a) {
  option.min = '1900-01-01 00:00:00';
  if ($(a).hasClass('endDate')) {
    var startDate = $('.startDate').val();
    if (!startDate) {
      layer.msg("请先选择开始时间");
      return
    } else if ($('#allDay').val() == 'true') {
      //是全天事件的情况下,  结束事件应当从开始时间的下一天开始出现
      startDate =startDate.substr(0,8) + (parseInt(startDate.substr(-2 , 2))+1)
      option.min = startDate;
    } else {
      //不是全天事件的情况下,  结束事件应当从开始时间的当天开始出现
      startDate = startDate.substr(0, 18) + (parseInt(startDate.substr(-1, 1)) + 1)
      option.min = startDate;
    }
  }
  option.elem = a;
  laydate(option);
};

form.on('radio(share)', function(data) {
  if (data.value == 1) $('.display2').css('display', 'block');
  else if (data.value == 0) $('.display2').css('display', 'none');

})
form.on('radio(ScheduleType)', function(data) {
  if (data.value == 1) $('.display1').css('display', 'block');
  else if (data.value == 0) $('.display1').css('display', 'none');
})

function selectUser(a, b, c) {
  parent.layer.open({
    type: 2,
    title: "选择" + a + "人",
    area: ['600px', '500px'],
    content: '../../Common/Receiver/Receiver.html?id=2', //这里content是一个DOM
    btn: ['确定'],
    yes: function(index, layero) {
      var body = parent.layer.getChildFrame('body', index);
      //取数据方法
      var usertypes = [];
      var userlists = [];
      var usernames = [];
      $(body).find("#Peoples li").each(function(i, n) {

        var usertype = $(n).attr("data-usertype");
        var schoolid = $(n).attr("data-schoolid");
        var userid = $(n).attr("data-id");
        var username = $(n).find('a').html();
        if (usertype) {
          usertypes.push(usertype);
        } else if (userid) {
          userlists.push(userid);
        }
        usernames.push(username);
        $('input[name="' + b + '"]').val(usernames.join(','));
      });
      var obj = {};
      obj.SchoolId = $(body).find('#SchoolId').val();
      obj.UserTypeList = usertypes;
      obj.UserIdList = userlists;
      users = JSON.stringify(obj);
      $('input[name="' + b + '"]').attr('data-id', users);
      parent.layer.close(index);
    }
  })
}

function clearKeeper(a) { //清空功能
  if (a)
    $('input[name="openObject_1"]').val(""),
    $('input[name="openObject_1"]').removeAttr("data-id");
  else
    $('input[name="openObject"]').val(""),
    $('input[name="openObject"]').removeAttr("data-id");
}
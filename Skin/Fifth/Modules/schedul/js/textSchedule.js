/**
 * 日程协同的主页
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-02-27 15:26:14
 * @version $Id$
 */

var source = getUrlParam('source');
var addmodal = source === "default" ? parent.layer : layer;
$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month'
    },
    // theme: true,
    editable: true,
    timeFormat: 'H(:mm)',
    slotLabelFormat: 'H(:mm)',
    dragOpacity: {
        agenda: .5,
        '': .6
    },

    // callback，当拖拽完成并且时间改变时触发，用法：
    // function( event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ) { }
    // ayDelta 保存日程向前或者向后移动了多少天
    // minuteDelta 这个值只有在agenda视图有效，移动的时间
    // allDay 如果是月视图，或者是agenda视图的全天日程，此值为true,否则为false
    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
        // console.log(event);
        // console.log(event.start.format());
        var model = {};
        model.ID = event.id;
        model.AllDay = event.allDay;
        model.StartTime = event.start.format();

        if (event.end) {
            model.EndTime = event.end.format();
        }
        var Dropload = layer.load();
        commonFn({
            url: 'Schedule/Edit',
            data: model,
            type: 'post'
        }, function() {
            layer.close(Dropload);
        }, function() {
            layer.close(Dropload)
            layer.msg("错误");
        })
    },
    // callback，在日程事件改变大小并成功后调用, 参数和eventDrop参数用法一致。用法：
    // function( event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ) { }
    eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
        var model = {};
        model.ID = event.id;
        model.AllDay = event.allDay;
        model.StartTime = event.start.format();

        if (event.end) {
            model.EndTime = event.end.format();
        }
        var resizeload = layer.load();
        commonFn({
            url: 'Schedule/Edit',
            data: model,
            type: 'post'
        }, function() {
            layer.close(resizeload);
        }, function() {
            layer.close(resizeload)
            layer.msg("错误");
        })
    },
    selectable: true,
    // callback，被选中的函数回调，使用方法：
    // function( startDate, endDate, allDay, jsEvent, view )
    // startDate：被选中区域的开始时间
    // endDate：被选中区域的结束时间
    // allDay：是否为全天事件
    // startDate：jascript对象
    // startDate：当前视图对象
    select: function(startDate, endDate, jsEvent, view) {
        var url = ''
        if (view.type === "month") {
            var selDate = $.fullCalendar.formatDate(startDate, 'YYYY-MM-DD');
            url = '/Web/Skin/Fifth/Modules/schedul/scheduledit.html?action=add&data=' + selDate;
        } else {
            var start = $.fullCalendar.formatDate(startDate, 'YYYY-MM-DD hh:mm:ss');
            var end = $.fullCalendar.formatDate(endDate, 'YYYY-MM-DD hh:mm:ss');
            url = '/Web/Skin/Fifth/Modules/schedul/scheduledit.html?action=add&start=' + start + '&end=' + end;
        }
        addmodal.open({
            type: 2,
            area: ['500px', '490px'],
            title: "添加日程",
            content: url,
            btn: '确定',
            yes: function(index, layero) {
                addoredit(index);
            }
        });
    },
    // 日程事件数据  FullCalendar最重要的部分，设置用于日程事件相关信息。
    events: getData(),
    // 当单击日历中的某一天时，触发callback
    // });
    // date是点击的day的时间(如果在agenda view, 还包含时间)，在月view下点击一天时，allDay是true，在agenda模式下，点击all-day的窄条时，allDay是true，点击其他的agenda view下的day则为false，jsEvent就是一个普通的javascript事件，包含的是click事件的基础信息。
    // 在此  dayClick 和select冲突, 故 舍弃dayClick事件  用select事件处理点击事件
    // dayClick: function(date, allDay, jsEvent, view) {
    //     var selDate = $.fullCalendar.formatDate(date, 'YYYY-MM-DD');
    //     layer.open({
    //         type: 2,
    //         area: ['500px', '490px'],
    //         title:"添加日程",
    //         content: 'addSchedul.html?action=add&data='+selDate,
    //         btn:'确定',
    //         yes:function(index,layero){
    //             addoredit(index);
    //         }
    //     });
    // },
    // event是日程（事件）对象，jsEvent是个javascript事件，view是当前视图对象。
    eventClick: function(calEvent, jsEvent, view) {
        addmodal.open({
            type: 2,
            area: ['500px', '490px'],
            title: "编辑日程",
            content: '/Web/Skin/Fifth/Modules/schedul/scheduledit.html?action=edit&id=' + calEvent.id,
            btn: ['确定', "删除"],
            success: function() {
                $('.layui-layer-content').height(430);
            },
            yes: function(index, layero) {
                addoredit(index,calEvent);
            },
            btn2: function(index, layero) {
                parent.layer.confirm("您确定要删除吗?", {
                    icon: 3,
                    title: false
                }, function(indexto) {
                    layer.close(indexto);
                    commonFn({
                        url: '/Schedule/Delete?id=' + calEvent.id,
                        type: 'delete'
                    }, function() {
                        top.layer.msg("删除成功");
                            parent.location.reload();
                    })
                })
                return false;
            }
        });
    }
})

function addoredit(index,calEvent) {
    var body = addmodal.getChildFrame('body', index),
        model = {}
    model.Id = body.find('#Id').val();
    model.Title = body.find('#zhuti').val();
    if (!model.Title) {
        top.layer.msg("标题必填");
        return
    }
    model.AllDay = body.find('#allDay').val();
    model.StartTime = body.find('.startDate').val();
    model.EndTime = body.find('.endDate').val();
    if (!model.StartTime || !model.EndTime) {
        top.layer.msg("时间项必填");
        return
    }

    model.CooperativeUserId = body.find('input[name="openObject"]').attr('data-id');
    model.ShareUserId = body.find('input[name="openObject_1"]').attr('data-id');

    model.ScheduleType = body.find('input[name="ScheduleType"]:checked').val();
    if (model.ScheduleType == 0) model.CooperativeUserId = '';
    model.ShareType = body.find('input[name="share"]:checked').val();
    if (model.ShareType == 0) model.ShareUserId = '';
    if (model.ScheduleType == 1 && !model.CooperativeUserId) {
        top.layer.msg("协同人必填");
        return
    }
    if ((model.ShareType == 1 && !model.ShareUserId)) {
        top.layer.msg("共享人必填");
        return
    }
    var addload = layer.load();

    commonFn({
        url: 'Schedule/Add',
        data: model,
        type: 'post'
    }, function() {
        top.layer.close(addload);
        // $('#calendar').fullCalendar('updateEvent', calEvent);
        top.location.reload();
    })
    layer.close(top.index);
}

function getData() {
    var data1;
    commonFn({
        url: 'Schedule/GetSchedules',
        async: false
    }, function(data) {
        data1 = data;
    });
    return data1;
}
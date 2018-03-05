var gradeid = 0;
var subjectid = 0;
var layer = layui.layer,
	upload = layui.upload(),
	laypage = layui.laypage;

$("dl").on("click", "a", function(event) {
	event.preventDefault();
	if($(this).hasClass("active")) {
		$(this).removeClass("active")
	} else {
		$(this).addClass("active").siblings(".active").removeClass("active");
		$(this).parent().siblings("dt").children("a.active").removeClass("active");
	}
})
getVideoList(1, gradeid, subjectid, 1);
//getVideoList(1, gradeid, subjectid, 1);
//视频的点击弹出窗口
$('body').on('click', '.videoList li a', function() {
	if(!$(this).attr('data-url')) return;
	layer.open({
		type: 2,
		title: false,
		area: ['800px', '500px'],
		shade: 0.8,
		closeBtn: 0,
		shadeClose: true,
		content: 'index.html?src=' + $(this).attr('data-url')
	});
	layer.msg('点击任意处关闭', {
		offset: 0,
		shift: 6
	})
});
//返回查询条件,年级和教材
var GetListAllAttribute = {
	url: 'CloudCourse/GetListAllAttribute',
	data:{
		schoolId:window.schoolid
	}
}
commonFn(GetListAllAttribute, function(data){
	//		年级
	$.each(data.grade, function(i, n) {
		$(".grade dd").append("<a data-GradeId='" + n.id + "'>" + n.name + "</a>");
	})
	//      学科
	$.each(data.subjects, function(i, n) {
		$(".subjects dd").append("<a data-SubjectId='" + n.subject_id + "'>" + n.subject_name + "</a>");
	})
});

var grade , subjectid;
$(".grade").on("click", "a", function(event) {
	event.preventDefault();//阻止默认事件
	if($(".grade dd .active").length) {
		grade = $(".grade dd .active").attr("data-GradeId");
		$(".breadcrumb .grade").html($(".grade dd .active").html() + ">");
		$(".breadcrumb .grade").attr('data-grade', grade)
	} else {
		grade = null;
		$(".breadcrumb .grade").html("");
		$(".breadcrumb .grade").removeAttr('data-grade');
	}
});
$(".subjects").on("click", "a", function(event) {
	event.preventDefault();
	if($(".subjects dd .active").length) {
		subjectid = $(".subjects dd .active").attr("data-SubjectId");
		$(".breadcrumb .subjects").html($(".subjects dd .active").html() + ">");
		$(".breadcrumb .subjects").attr('data-subjects', subjectid)
	} else {
		subjectid = null;
		$(".breadcrumb .subjects").html("");
		$(".breadcrumb .subjects").removeAttr('data-subjects');
	}
})
$('.search').click(function() {
	getVideoList(1, grade, subjectid, $('.videobtn .btn-green').attr('data-type'))
})
$('.newBest').click(function() {
	$(this).addClass('btn-green').siblings().removeClass('btn-green');
	getVideoList(1, grade, subjectid, 1)
})
$('.hotBest').click(function() {
	$(this).addClass('btn-green').siblings().removeClass('btn-green');
	getVideoList(1, grade, subjectid, 2)
})
/*************视频资源*************/
function getVideoList(PageIndex, gradeid, subjectid) {
	// console.log(PageIndex+'---'+gradeid+'---'+subjectid);
	 var index = layer.load();
    $('.videoList >ul ').empty()
	var ajaxGetListSearch = {
		url: 'CloudCourse/GetListSearch',
		data: {
			pageIndex: PageIndex,
            gradeId: gradeid,
			subjectId: subjectid,	
		},
		type: 'post'
	}
	commonFn(ajaxGetListSearch, function(data) {
		// console.log(data)
		layer.close(index);
		//判断是否登录了
//		IsLogin();
		laypage({
			cont: 'page',
			pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			curr: data.pageIndex,
			groups: 5,
			jump: function(e, first) { //触发分页后的回调                
				if(!first) { //一定要加此判断，否则初始时会无限刷 
					getVideoList(e.curr, gradeid, subjectid);
//					getVideoList(e.curr, gradeid, subjectid, $('.videobtn .btn-green').attr('data-type'));
				}
			},
			skin: 'molv', //皮肤
			first: '首页', //将首页显示为数字1,。若不显示，设置false即可
			last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
			prev: false, //若不显示，设置false即可
			next: false //若不显示，设置false即可
		});
		if(data.resultData.length < 1) {
			layer.msg("没有该条件的视频资源")
		}
		$.each(data.resultData, function(i, el) {
			if(el.imgUrl == null) {
				el.imgUrl = "../../Common/img/d.png"
			}
			$('.videoList >ul').append('<li><a data-url="' + el.fileUrl + '">' +
				'<img src="' + el.imgUrl + '" alt="">' +
				'<div class="onimg">' +
				'<p>' + el.name + '</p>' +
				'<p><span class="yan">103</span><span class="date">' + solveTime(el.addTime) + '</span></p>' +
				'</div>' +
				'</a>' +
				'</li>')
		});
	})
}
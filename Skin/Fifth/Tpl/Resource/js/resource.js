var _Status=1,
	_Name=null,
	_CatalogId = 0,
	_TypeId = 0,
	_GradeId = 0,
	_SubjectId = 0,
	_JiaoCaiId = 0,
	_CharpterId = 0,
	_FileExt = null,
    _IsShow =1;
   
//点击赛选
$("body").on("click",'div.zy a',function(){
	console.log(123)
		_CatalogId=$(this).attr("data-catalogid");
		var $this=$(this);
		a_click($this,_CatalogId);
})
$("body").on("click",'ul.zy_title li',function(){
		_TypeId=$(this).attr("data-typeid");
		var $this=$(this);
		a_click($this,_TypeId);
})
$("body").on("click",'dl.grade a',function(){
		_GradeId=$(this).attr("data-gradeid");
		var $this=$(this);
		a_click($this,_GradeId);
})
$("body").on("click",'dl.subjects a',function(){
		_SubjectId=$(this).attr("data-subjectid");
		var $this=$(this);
		a_click($this,_SubjectId);
})
$("body").on("click",'dl.jiaocais a',function(){
		_JiaoCaiId=$(this).attr("data-jiaocaiid");
		var $this=$(this);
		a_click($this,_JiaoCaiId);
})

function a_click(th,id){
		$(th).addClass("active");
		if(id==0){
			$(th).parent().siblings().find("a").removeClass("active");
		}else{
			$(th).siblings().removeClass("active");
			$(th).parent().siblings().find("a").removeClass("active");
		}
		showInfo(_Status,_Name,_CatalogId,_TypeId,_GradeId,_SubjectId,_JiaoCaiId,_CharpterId,_FileExt,_IsShow);
}

//文件格式 下拉框赛选
//form.on('select(aihao)',function(data){
//	_TypeId=data.value;
//	showInfo(_Status,_Name,_CatalogId,_TypeId,_GradeId,_SubjectId,_JiaoCaiId,_CharpterId,_FileExt,_IsShow);
//  return false;
//});

//搜索框筛选
$('#search').click(function(event) {
	_Name = $(this).prev().val();
	showInfo(_Status,_Name,_CatalogId,_TypeId,_GradeId,_SubjectId,_JiaoCaiId,_CharpterId,_FileExt,_IsShow);
})


$(function() {
	var GetListAllAttribute = {
		url: "SchoolResources/GetListAllAttribute",
		data :{gradeid :0 ,subjectid :0 , jiaocaiid : 0,schoolid:window.schoolid},
		type: "get"
	};
	commonFn(GetListAllAttribute, function(data) {
				$.each(data.catalogs, function(i, n) {
					if(!i) {
						$(".zy dd").append("<a data-CatalogID=" + n.id + " >" + n.name + "</a>");
						_CatalogId = $(".zy .active").attr('data-CatalogID');
					} else {
						$(".zy dd").append("<a data-CatalogID=" + n.id + ">" + n.name + "</a>")
					}
				})
					//资源总数			
				$(".content_top p i").html(showNum(data.fileCount));
				//				年级
				$.each(data.grade, function(i, n) {
						$(".grade dd").append("<a data-GradeId=" + n.id + ">" + n.name + "</a>");
					})
					//				学科
				$.each(data.subjects, function(i, n) {
						$(".subjects dd").append("<a data-SubjectId=" + n.subject_id + ">" + n.subject_name + "</a>");
					})
					//				教材
				$.each(data.jiaoCais, function(i, n) {
						$(".jiaocais dd").append("<a data-JiaoCaiId=" + n.id + ">" + n.name + "</a>");
					})
					//				资源
				$.each(data.types, function(i, n) {
					$(".zy_title").append("<li data-TypeId=" + n.id + ">" + n.name + "</li>")
				})
				showInfo(_Status,_Name,_CatalogId,_TypeId,_GradeId,_SubjectId,_JiaoCaiId,_CharpterId,_FileExt,_IsShow);
//				
	});
});





function showInfo(_status,_name,_catalogId,_typeId,_gradeId,_subjectId,_jiaoCaiId,_charpterId,_fileExt,_isShow,current) {
	var GetListSearch = {
		url: "SchoolResources/GetListSearch",
		data: {
		    Status:_status,
			Name: _name,
			CatalogId: _catalogId,
			TypeId: _typeId,
			GradeId: _gradeId,
			SubjectId: _subjectId,
			JiaoCaiId: _jiaoCaiId,
			CharpterId: _charpterId,
			FileExt: _fileExt,
		    IsShow:_isShow,
		    schoolid:window.scoolid
		},
		type: "post"
	};
	commonFn(GetListSearch, function(data) {
        laypage({
            cont: 'page',
            pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            curr : data.pageIndex,
            groups: 5,
            jump: function(e, first){ //触发分页后的回调                
                if(!first){ //一定要加此判断，否则初始时会无限刷 
                   showInfo(_status,_name,_catalogId,_typeId,_gradeId,_subjectId,_jiaoCaiId,_charpterId,_fileExt,_isShow,e.curr)
                }
            },
            skin: 'molv', //皮肤
            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
            prev: false, //若不显示，设置false即可
            next: false //若不显示，设置false即可
        });
        var data = data.resultData;
        $(".content_right .fileinfo tbody").empty();
        $.each(data, function(i, n) {
            var i2=i+1
            if (n.fileUrl==null) {
                n.fileUrl ='#';
            }
            $(".content_right .fileinfo tbody").append("<tr>"+
                "<td>"+i2+"</td>"+
                "<td><a target='_blank' href='../../Modules/mgResources/onLinePreview.html?id="+n.id+"&Surl="+n.fileUrl+"'>"+n.name+"</a></td>"+
                "<td>" + solveTime(n.addTime) + "</td>"+
                "<td>"+n.userName+"</td>"+
                "<td>"+n.clicks+"</td>"+
                "<td><a href='javascript:;' data-id='"+n.id+"' data-url='"+n.fileUrl+"' class='tdxz' >下载</a></td>"+
                "</tr>");
        })

    })
}
//下载
$("body").on("click",'.tdxz',function (){
	var Id=$(this).attr("data-id");
	var URL=$(this).attr("data-url");
	window.location.href=URL;
	var UpdateClicks = {
		url: "SchoolResources/UpdateClicks",
		data: {
		   	id:Id,
		    schoolid:window.scoolid
		},
		type: "get"
	};
	commonFn(UpdateClicks, function(data) {
		showInfo(_Status,_Name,_CatalogId,_TypeId,_GradeId,_SubjectId,_JiaoCaiId,_CharpterId,_FileExt,_IsShow);
	})
//  $.get('SchoolResources/UpdateClicks?id='+id,function(){
//      window.location.href = url;
//  })
})

function showNum(count) {
	var str = "00";
	str+=count;
	if(str.length % 3 == 1) {
		str = str.slice(1);
	} else if(str.length % 3 == 2) {
		str = str.slice(2);
	}
	var str=str.split("");
	for(var i=0;i<str.length;i++){
		if(i%3==0&&i>0){
			$(".content_top p").append("<span>,</span><i>"+str[i]+"</i>");
		}else{
			$(".content_top p").append("<i>"+str[i]+"</i>");
		}	
	}
}


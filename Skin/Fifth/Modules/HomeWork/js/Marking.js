var str = '';
var t = '';

var arr =[];

//学科渲染
var GetSubjectList = {
                       url: "ZYHomeWorkWeb/GetSubjectList",
                       type: "GET", 
                       async: false,
                       data:{
                          schoolid:window.schoolid
                       }   
               };
               commonFn(GetSubjectList, function(json) { 
                   // console.log(json)
                   var html = '';
                   $.each(json,function(i,n){
                       html +='<li data-id="'+ n.subject_id +'"><a>'+ n.subject_name +'</a></li>'
                   })
                   $('.kemu2').append(html);
                   $('.kemu2 li:first').addClass('gren')
              })     
$('.kemu2').on('click','li',function(){
    $(this).addClass('gren').siblings().removeClass('gren')
    str = $(this).attr('data-id')
    a(str)
})

//获取发布对象
var xueke = $('.kemu2 li:first').attr('data-id');
a(xueke)
function a(str){
   var GetTeacherClass = {
            url: "ZYHomeWorkWeb/GetTeacherClass",
            type: "GET", 
            async: false,
            dataType: "Json",
            data:{
            	subjectid:str,
                schoolid:window.schoolid
            }       
    };      
    commonFn(GetTeacherClass, function(data) { 
          // console.log(data)     
         t = $("#demo1").ligerTree({
            data: data,
            checkbox: true, 
            ajaxType: 'get',
            idFieldName: 'id',         
       }) 
    });
}  
//完成并发布弹框提示出现
$('.footer .span1').click(function (){
	
	$('.zhezhao').css('display','block');
	$('.tishi').css('display','block');
})
//点击取消跳转页面
$('.footer .span2').click(function (){

	window.location.href="assign.html?type=0"
	
})
//取消发布弹框提示消失
$('.tishi .span2').click(function (){
	$('.zhezhao').css('display','none');
	$('.tishi').css('display','none');
})
//确认作业发布跳转
$('.tishi .span1').click(function (){
	if(!$('.layui-input').val()){
			alert('请选择截止时间');
			return
		}	
	var bbb = $(' input[name="sex"]:checked ').val();
	if(!str){
	  str = xueke
    }
    if(bbb == '到截止时间时公布答案'){
    	bbb = 0
    }else{
    	bbb = 1
    }
	t.alert()
	var groupids=arr.join(",");
	if(!groupids){
       alert('请选择发布对象');
	   return
	}
	var model = {}
		    model.paperId =getUrlParam('id');
		    model.title = $('.input').val();
		    model.suggestionTime = getNum($('.input1').val());
		    model.deadline = $('.layui-input').val();
		    model.subjectId = str;	
		    model.publishAnswerType = bbb;
		    model.studentIds = groupids;
		var AddHomeWork = {
	            url: "ZYHomeWorkWeb/AddHomeWork",
	            type: "POST", 
	            async: false,
	            data:model 
	    };      
	    commonFn(AddHomeWork, function(json) { 
	        if(json == true){
                window.location.href="assign.html?type=0"
	        }
	    });
})

//获取选择的树形节点的id
$.ligerui.controls.Tree.prototype.alert = function() {
	arr.splice(0,arr.length);
	var data = this.getChecked();
	var id='';
	console.log(data)
	for(var i = 0; i < data.length; i++) {
		id=data[i].data.customerId;
		if(id){
			arr.push(id);
		}				
	}
};

//提取字符串中的数字
 function getNum(text){
	var value = text.replace(/[^0-9]/ig,""); 
	return value
}

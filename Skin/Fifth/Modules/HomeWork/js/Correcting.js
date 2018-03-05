var str ='';
var a = '';
var b = '';
var name = '';
var name2 = '';
var name3 = '';
var name4 = '';
//圆形统计图

	$( document ).ready(function() {
	    $('.myStat').circliful();
	});
//批改模式的转换
$('.xwxk .span2').click(function(){
	$('.xwxk .span2').css({"background":"#0c8","border":"none"}).siblings().css({"background":"#fff","border":"1px solid #ccc"}).end().siblings().find('a').css("color","#000");
	$('.xwxk .span2 a').css("color","#FFF");
	$('.xwxk .span3').css('display','none');
	$('.danti').css('display','block');
	$('.tongbu').css('display','none');
	if($('.slider').html() == ''){
		$('.prev').css('display','none')
		$('.next').css('display','none')
	}else{
		$('.prev').css('display','block')
		$('.next').css('display','block')
	}
	
})
$('.xwxk .span1').click(function(){
	$('.xwxk .span1').css({"background":"#0c8","border":"none"}).siblings().css({"background":"#fff","border":"1px solid #ccc"}).end().siblings().find('a').css("color","#000");
	$('.xwxk .span1 a').css("color","#FFF");
	$('.xwxk .span3').css('display','block');
	$('.danti').css('display','none');
	$('.tongbu').css('display','block');
	if($('.slider').html() == ''){
		$('.prev').css('display','none')
		$('.next').css('display','none')
	}else{
		$('.prev').css('display','block')
		$('.next').css('display','block')
	}
})
//自定义打分
$(".dafen .span4").click(function(){
    if($(".zdydf").css("display")=="none"){
       $('.zdydf input').val('');
       $(".zdydf").show();
    }else{
      $('.zdyfs').css('display','block').html($('.zdydf input').val());
      $(".zdydf").hide();
    }
});
//返回
$('.fanhui').click(function(){
	window.location.href ='task.html'
})

//按题目批改
   var GetHomeWork = {
                   url: "ZYHomeWorkWeb/GetHomeWork",
                   type: "GET", 
                   async: false,
                   data:{
                      workid:getUrlParam('id'),
                      isfinished:0
                   }   
           };
           commonFn(GetHomeWork, function(json) { 
               // console.log(json)
               var num = '';
               var num2 = '';
               $('.weijiao').empty();
               $('.xuanran').empty(); 
               $('.slider').empty();             
               $.each(json,function(i,n){                 
                  var html = '';
                  var html2 ='';                 
              	 $.each(n.noSubmitList,function(name,key){
                      html +='<div class="ximing">'+
						         '<ul class="ul clearfix">'+
						            '<li data-id='+ key.id +'>'+ key.name +'</li>'+						            
						         '</ul>'+
						      '</div>'
                  });                                  
                  $.each(n.submitList,function(name,key){
              	  
                  	 
                      html2 +='<span style="width: 100px;height: 100px;text-align: center;"  data-id="'+ key.studentId +'">'+
			                     '<div class="myStat" data-text="'+ key.name +'" data-percent="'+ key.progress +'" style="width: 80px;height: 80px;margin-left:10px"></div>'+
			                     '<div class="zhushi">已批改</div>'+
			                  '</span>'				                           

                  });
	                  if(n.submitList == ''){
	                  	html2 = '<div class="div">目前没有学生提交作业！</div>'
	                  }
	                  if(n.noSubmitList == ''){
	                  	html = '<div>没有未提交的学生</div>'
	                  }
	                  if(n.noSubmitCount == 0){
	                   	  num += '<span class="span1">未提交的学生('+ n.noSubmitCount +')</span>'+ html				     
	                  }else{                  	
	                     num += '<span class="span1">未提交的学生('+ n.noSubmitCount +')</span>'+
						      '<a><span class="span2">全部提醒</span></a>'+html
	                  }

                   num2 +='<h3 style="color:#000">已提交学生('+ n.submitCount +'人待批阅)</h3>'+html2 
				          					                      
               })
               $('.weijiao').append(num);
               $('.xuanran').append(num2);                              
          })
 
//点击提交学生

$('.xuanran span:eq(0)').addClass('class')
if(name3 == ''){
	name3 = $('.xuanran span:eq(0)').attr('data-id')
}
$('.xuanran').on('click','span',function(){
	if($('.xwxk input[type="checkbox"]').is(':checked') == true){
	   str = 1;
    }else{
	   str = 0;
    }
	$(this).addClass('class').siblings().removeClass('class');	
	name3 = $(this).attr('data-id');
	num(name3,str);
	hh(name3);
	if($('.slider').html() == ''){
		$('.prev').css('display','none')
		$('.next').css('display','none')
	}else{
		$('.prev').css('display','block')
		$('.next').css('display','block')
	}
})

//主观题批改
$('.beijing').on('click','.span1',function(){
	$(this).parents('.dafen').siblings().find('.img1').css('display','block').siblings().css('display','none');
	name = $(this).attr('data-id');
	name2 = $(this).parents('.dafen').siblings('.xsda').attr('data-id');	
    name4 = $(this).parents('.dafen').siblings('.tigan').attr('data-id');
	vivo(name,name2,name3,name4)
});
$('.beijing').on('click','.span2',function(){
	$(this).parents('.dafen').siblings().find('.img2').css('display','block').siblings().css('display','none');
	name = $(this).attr('data-id');
	name2 = $(this).parents('.dafen').siblings('.xsda').attr('data-id');	
    name4 = $(this).parents('.dafen').siblings('.tigan').attr('data-id');
	vivo(name,name2,name3,name4)
});
$('.beijing').on('click','.span3',function(){
	$(this).parents('.dafen').siblings().find('.img3').css('display','block').siblings().css('display','none');
	name = $(this).attr('data-id');
	name2 = $(this).parents('.dafen').siblings('.xsda').attr('data-id');	
    name4 = $(this).parents('.dafen').siblings('.tigan').attr('data-id');
	console.log(name4)
	vivo(name,name2,name3,name4)
});
function vivo(name,name2,name3,name4){
	var UpdateStudentAnswer = {
                 url: "ZYHomeWorkWeb/UpdateStudentAnswer",
                 type: "GET", 
                 async: false,
                 data:{
                    workid:getUrlParam('id'),
                    iscorrect:name,
                    id:name2,
                    studentid:name3,
                    qid:name4
                 }   
         };
         commonFn(UpdateStudentAnswer, function(json) { 
                            
         })
}
//未交作业全部提醒
$('.weijiao .span2').click(function(){
	var PushRemind = {
                 url: "ZYHomeWorkWeb/PushRemind",
                 type: "GET", 
                 async: false,
                 data:{
                    workid:getUrlParam('id')
                 }   
         };
         commonFn(PushRemind, function(json) { 
                 $('#tsxi').html('成功提醒');
	             $('#tsxi').css('display','block');
	            setTimeout(function(){
	              $('#tsxi').css('display','none');
	            },1000);
                          
         })
})
//根据学生id获取题目
    num(name3,0)
	function num(name3,str){
		var GetHomeWorkReceive = {
	                 url: "ZYHomeWorkWeb/GetHomeWorkReceive",
	                 type: "GET", 
	                 async: false,
	                 data:{
	                    workid:getUrlParam('id'),
	                    studentId:name3,
	                    isfinished:str
	                 }   
	         };
	         commonFn(GetHomeWorkReceive, function(json) { 
	         	// console.log(json)
	         	$('.beijing1').empty();
	         	var html3 = '';
	              $.each(json.questions,function(i,n){
                       if(n.questionType == 1 || n.questionType == 2 || n.questionType == 3){
             	  		if(n.isCorrect == 1){
                          a = '2_14.png'
             	  		}else if(n.isCorrect == 2){
                          a = '2_13.png'
             	  		}else{
             	  		   a = '2_12.png'
             	  		}
                     html3 += '<div class="haha">'+
                                    '<div class="tigan">'+
   					                  // '<span class="fenshu">3分</span>'+
   					                  '<span>'+ n.question +'</span>'+
   					                  '<span class="img"><img src="img/'+ a +'"></span>'+
   					               '</div>'+
   					               '<div class="daan">'+
   					                  '<span class="zqda">答案</span>'+
   					                  '<span>'+ n.correctAnswer +'</span>'+
   					               '</div>'+
   					               '<div class="xsda">'+
   					                   '<span>学生答案</span>'+
   					                   '<span>'+ n.answer +'</span>'+
   					               '</div>'+
                              '</div>'
             	  	}else{

             	  		if(n.isCorrect == 0){
                  	  		html3 += '<div class="haha">'+
	                                    '<div class="tigan" data-id="'+ n.questionId +'">'+
	   					                  // '<span class="fenshu">3分</span>'+
	   					                  '<span>'+ n.question +'</span>'+	 
	   					                  '<span class="pi">'+
                                              '<span class="img img1" style="display:none"><img src="img/2_14.png"></span>'+ 
                                              '<span class="img img2" style="display:none"><img src="img/2_13.png"></span>'+ 
                                              '<span class="img img3" style="display:none"><img src="img/2_12.png"></span>'+
	   					                  '</span>' + 					                  
	   					               '</div>'+
	   					               '<div class="daan">'+
	   					                  '<span class="zqda">答案</span>'+
	   					                  '<span>'+ n.correctAnswer +'</span>'+
	   					               '</div>'+
	   					               '<div class="xsda"  data-id="'+ n.id +'">'+
	   					                   '<span>学生答案</span>'+
	   					                   '<span>'+ n.answer +''+ n.appachs +'</span>'+
	   					               '</div>'+
	   					               '<div class="dafen">'+
	                                      '<a><span class="span1" data-id="1"><img src="img/2_02.png">全对</span></a>'+
	                                      '<a><span class="span2" data-id="2"><img src="img/2_06.png">半对</span></a>'+
	                                      '<a><span class="span3" data-id="3"><img src="img/2_03.png">全错</span></a>'+
	                                      // '<a><span class="span4">自定义打分</span></a>'+
	                                   '</div>'+
                                   '</div>'
             	  		}else if(n.isCorrect != 0){
             	  			if(n.isCorrect == 1){
	                           b = '2_14.png'
	              	  		}else if(n.isCorrect == 2){
	                           b = '2_13.png'
	              	  		}else if(n.isCorrect == 3){
	              	  		   b = '2_12.png'
	              	  		}
             	  			html3 += '<div class="haha">'+
	                                    '<div class="tigan" data-id="'+ n.questionId +'">'+
	   					                  // '<span class="fenshu">3分</span>'+
	   					                  '<span>'+ n.question +'</span>'+	 
	   					                  '<span class="img"><img src="img/'+ b +'"></span>'+
	   					                  '<span class="pi">'+
                                              '<span class="img img1" style="display:none"><img src="img/2_14.png"></span>'+ 
                                              '<span class="img img2" style="display:none"><img src="img/2_13.png"></span>'+ 
                                              '<span class="img img3" style="display:none"><img src="img/2_12.png"></span>'+
	   					                  '</span>' + 					                  
	   					               '</div>'+
	   					               '<div class="daan">'+
	   					                  '<span class="zqda">答案</span>'+
	   					                  '<span>'+ n.correctAnswer +'</span>'+
	   					               '</div>'+
	   					               '<div class="xsda"  data-id="'+ n.id +'">'+
	   					                   '<span>学生答案</span>'+
	   					                   '<span>'+ n.answer +''+ n.appachs +'</span>'+
	   					               '</div>'+
	   					               '<div class="dafen">'+
	                                      '<a><span class="span1" data-id="1"><img src="img/2_02.png">全对</span></a>'+
	                                      '<a><span class="span2" data-id="2"><img src="img/2_06.png">半对</span></a>'+
	                                      '<a><span class="span3" data-id="3"><img src="img/2_03.png">全错</span></a>'+
	                                      // '<a><span class="span4">自定义打分</span></a>'+
	                                   '</div>'+
                                   '</div>'
             	  		}            	  		
                              
             	  	}
                                                          
	              })   
	              $('.beijing1').append(html3);      
	         })
	}

//是否只看待批作业
$('.xwxk input').click(function(){
	if($('.xwxk input[type="checkbox"]').is(':checked') == true){
	   str = 1;
    }else{
	   str = 0;
    }
    num(name3,str)

})
//安题目批改
      hh(name3);
	function hh(name3){
		var GetHomeWorkReceive = {
	                 url: "ZYHomeWorkWeb/GetHomeWorkReceive",
	                 type: "GET", 
	                 async: false,
	                 data:{
	                    workid:getUrlParam('id'),
	                    studentId:name3,
	                    isfinished:1
	                 }   
	         };
	         commonFn(GetHomeWorkReceive, function(json) { 
	         	
	         	$('.slider').empty();
	         	var html3 = '';
	              $.each(json.questions,function(i,n){
                      html3 +='<div id="slideBox">'+
				                     '<div class="hd">'+
								            '<ul class="hd_ul">'+
								                '<li>'+
								                    '<div class="beijing beijing2">'+
					                                   '<div class="haha">'+
						                                     '<div class="tigan" data-id="'+ n.questionId +'">'+
						   					                  // '<span class="fenshu">3分</span>'+
							   					                  '<span>'+ n.question +'</span>'+	 
							   					                  '<span class="pi">'+
							                                         '<span class="img img1" style="display:none"><img src="img/2_14.png"></span>'+ 
							                                         '<span class="img img2" style="display:none"><img src="img/2_13.png"></span>'+ 
							                                         '<span class="img img3" style="display:none"><img src="img/2_12.png"></span>'+
							   					                  '</span>' + 					                  
							   					               '</div>'+
							   					               '<div class="daan">'+
							   					                  '<span class="zqda">答案</span>'+
							   					                  '<span>'+ n.correctAnswer +'</span>'+
							   					               '</div>'+
							   					               '<div class="xsda"  data-id="'+ n.id +'">'+
							   					                   '<span>学生答案</span>'+
							   					                   '<span>'+ n.answer +''+ n.appachs +'</span>'+
							   					               '</div>'+
				                                               '<div class="dafen">'+
				               	                                 '<a><span class="span1" data-id="1"><img src="img/2_02.png">全对</span></a>'+
				               	                                 '<a><span class="span2" data-id="2"><img src="img/2_06.png">半对</span></a>'+
				               	                                 '<a><span class="span3" data-id="3"><img src="img/2_03.png">全错</span></a>'+
				               	                                 // '<a><span class="span4">自定义打分</span></a>'+
				                                               '</div>'+
						                                '</div>'+
						                                
					                                '</div>'+
								                '</li>'+			                
								            '</ul>'+
								        '</div>'+			      								        
					  		        '</div>'               	  
                                                          
	              })   
	               $('.slider').append(html3);    
	         })
	}

//题目左右转换
$('.prev').click(function(){  
       var index = $('.xuanran span[class="class"]').index()-1
       if( index-1 >= 0){       	
       	  $('.xuanran span').eq(index-1).addClass('class').siblings().removeClass('class');
       } 
    var mm =  $('.xuanran span[class="class"]').attr('data-id');
    hh(mm);
    if($('.slider').html() == ''){
		$('.prev').css('display','none')
		$('.next').css('display','none')
	}else{
		$('.prev').css('display','block')
		$('.next').css('display','block')
	}    
})

$('.next').click(function(){
	var index0 = $('.xuanran span[class="class"]').index()-1
       if( (index0 + 1) < $('.xuanran').children('span').length){
       	  $('.xuanran span').eq(index0+1).addClass('class').siblings().removeClass('class');
       } 
    var mm =  $('.xuanran span[class="class"]').attr('data-id');
    hh(mm);
    if($('.slider').html() == ''){
		$('.prev').css('display','none')
		$('.next').css('display','none')
	}else{
		$('.prev').css('display','block')
		$('.next').css('display','block')
	}
})

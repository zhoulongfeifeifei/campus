var str = '';
var str1 = '';
var str2 = '';
var arr = '';
var arr2 = '';
var laypage =layui.laypage;
//学科的初始化渲染
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
                   $('.kemu2 li:first').addClass('gren');
              })
//学科变换，班级跟着变换
$('.kemu2').on('click','li',function(){
    $(this).addClass('gren').siblings().removeClass('gren')
    str1 = $(this).attr('data-id');
    $('.banji2').empty()
    var GetTeacherClass = {
                       url: "ZYHomeWorkWeb/GetTeacherClass",
                       type: "GET", 
                       async: false,
                       data:{
                          subjectid:str1,
                          schoolid:window.schoolid
                       }   
               };
               commonFn(GetTeacherClass, function(json) { 
                   // console.log(json)                  
                   var html = '';
                   $.each(json,function(i,n){
                       html +='<li data-id="'+ n.class_id +'"><a>'+ n.text +'</a></li>'
                   })
                   html = '<li data-id="0"><a>全部</a></li>'+html
                   $('.banji2').append(html);
                   $('.banji2 li:first').addClass('gren');
              })  
              // console.log(arr2) 
              arr2 = $('.banji2 li:first').attr('data-id');      
    daipi(str1,arr2,1);
    yipi(str1,arr2,1);
    lishi(str1,arr2,1);
})
//班级初始化渲染
  arr = $('.kemu2 li:first').attr('data-id');
  arr2 = $('.banji2 li:first').attr('data-id');
var GetTeacherClass = {
                   url: "ZYHomeWorkWeb/GetTeacherClass",
                   type: "GET", 
                   async: false,
                   data:{
                      subjectid:arr,
                      schoolid:window.schoolid
                   }   
           };
           commonFn(GetTeacherClass, function(json) { 
               // console.log(json)               
               var html = '';
               $.each(json,function(i,n){
                   html +='<li data-id="'+ n.class_id +'"><a>'+ n.text +'</a></li>'
               })
               html = '<li data-id="0"><a>全部</a></li>'+html
               $('.banji2').append(html)
               $('.banji2 li:first').addClass('gren')
          })
 $('.banji2').on('click','li',function(){
    $(this).addClass('gren').siblings().removeClass('gren')
    str2 = $(this).attr('data-id');
    if(!str1){
    	str1 = $('.banji2 li[class="gren"]').attr('data-id')
    }
    daipi(str1,str2,1);
    yipi(str1,str2,1);
    lishi(str1,str2,1);
})
 var subjectid = $('.banji2 li[class="gren"]').attr('data-id');
 var gradeid = $('.kemu2 li[class="gren"]').attr('data-id');
 daipi(arr,arr2,1);
 yipi(arr,arr2,1);
 lishi(arr,arr2,1);
 //待批作业的渲染
function daipi(str1,str2,current){
 var model = {}
     model.subjectid = str1;
     model.classid = str2;
     model.type = 0;
     model.pageIndex = current;
	var GetHomeWorkList = {
	                  url: "ZYHomeWorkWeb/GetHomeWorkList",
	                  type: "post", 
	                  async: false,
	                  data:model
	          };
	          commonFn(GetHomeWorkList, function(json){ 	          	 	          
	              // console.log(json)	            	              	             
	              var html ='';
	              var aa = '';	
	              var timestamp = ''; 
	              var timestamp2 = ''; 
	              var len = '';    	             
	                $('.dpzy').empty();
	                if(json.list == ''){
	                	html ='<div class="html">目前没有待批改作业!</div>';
	                }
	              $.each(json.list,function(i,n){
	              // console.log(n)	                         	                 	                               
					
					  var num = ''; 
					 $.each(n.hwList,function(name,key){
					    aa = new Date(key.deadline).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');	
	 					 aa = aa.substring(0,19);    
	 					 aa = aa.replace(/-/g,'/'); 
	 					 timestamp = new Date(aa).getTime();
	 					 timestamp2 = Date.parse(new Date());
	 					 if(timestamp < timestamp2){
	                         var aa = '已截至'
	 					 }				    	
				    	num += '<div class="zyxq">'+
				                '<span class="quspan">'+
				                   '<span class="span1">'+ key.title +'</span>'+
				                   '<span class="span2">提交截止时间：<span class="span3">'+ aa +'</span></span>'+
				                '</span>'+
				                '<span class="span4">'+ key.submitCount +'</span>'+
				                '<span class="span5">/  '+ key.allCount +'</span>'+
				                '<span class="span6">已提交</span>'+
				                '<span class="span7">已批阅：</span>'+
				                '<span class="span8">'+ key.checkCount +'</span>'+
				                '<a href="Correcting.html?id='+ key.id +'" class="piyue"><span class="span11">去批阅</span></a>'+
				            '</div>'
				    })							
	                 html += '<div class="shijian">'+
				               '<span><i class="layui-icon">&#xe60e;</i></span>'+
				               '<span>'+ n.deadTime +'</span>'+num
				             '</div>'
				             
				    
                            
	              })
	              $('.dpzy').append(html+'<div id="page"></div>');
      	          laypage({
               	            cont: 'page',
               	            pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
               	            curr : json.pageIndex,
               	            groups: 5,
               	            jump: function(e, first){ //触发分页后的回调                
               	                if(!first){ //一定要加此判断，否则初始时会无限刷 
               	                    daipi(0,0,e.curr);          	                    
               	                }          	                
               	            },
               	            skin: '#27ae61', //皮肤
               	            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
               	            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
               	            prev: false, //若不显示，设置false即可
               	            next: false //若不显示，设置false即可
               	        });
	         })
}
//已批作业的渲染
function yipi(str1,str2,current){
var model = {}
     model.subjectid = str1;
     model.classid = str2;
     model.type = 1;
     model.pageIndex = current;
     model.pageSize = 10;
	var GetHomeWorkList = {
	                  url: "ZYHomeWorkWeb/GetHomeWorkList",
	                  type: "post", 
	                  async: false,
	                  data:model
	          };
	          commonFn(GetHomeWorkList, function(json) { 	          	
  	         
	              // console.log(json)	            	              	             
	              var html ='';
	              var aa = '';	
	              var timestamp = ''; 
	              var timestamp2 = ''; 
	              var len = '';    	             
	                 if(json.list == ''){
	                	html ='<div class="html">目前没有已批改作业!</div>';
	                }
	                $('.ypzy').empty();
	              $.each(json.list,function(i,n){
	              // console.log(n)	                         	                 	                               
					
					  var num = ''; 
					 $.each(n.hwList,function(name,key){
					    aa = new Date(key.deadline).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');	
	 					 aa = aa.substring(0,19);    
	 					 aa = aa.replace(/-/g,'/'); 
	 					 timestamp = new Date(aa).getTime();
	 					 timestamp2 = Date.parse(new Date());
	 					 if(timestamp < timestamp2){
	                         var aa = '已截至'
	 					 }			
	 					 if(key.accuracy == ''){
	 					 	key.accuracy ='0%'
	 					 }	    	
				    	num += '<div class="zyxq">'+
				                '<span class="quspan">'+
				                  '<span class="span1">'+ key.title +'</span>'+
				                  '<span class="span2">'+ aa +'</span>'+
				                '</span>       '+        
				               '<span class="span4">'+ key.submitCount +'</span>'+
				               '<span class="span5">/  '+ key.allCount +'</span>'+
				               '<span class="span6">已提交</span>'+
				               '<span class="span7">已批阅：</span>'+
				               '<span class="span8">'+ key.submitCount +'</span>'+
				               '<span class="span12">正确率：<span class="span13">'+ key.accuracy +'</span></span>'+
				               // '<a href="Correcting.html?id='+ key.id +'"><span class="span9">查看详情</span></a>'+
				               // '<a href="javaScript:;"><span class="span10">作业分析</span></a>'+
				            '</div>'
				    })							
	                 html +='<div class="shijian">'+
				               '<span><i class="layui-icon">&#xe60e;</i></span>'+
				               '<span>'+ n.deadTime +'</span>'+num
				             '</div>'                           
	              })
	           
   	              $('.ypzy').append(html+'<div id="page1"></div>');
      	          laypage({
               	            cont: 'page1',
               	            pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
               	            curr : json.pageIndex,
               	            groups: 5,
               	            jump: function(e, first){ //触发分页后的回调                
               	                if(!first){ //一定要加此判断，否则初始时会无限刷 
               	                    yipi(0,0,e.curr);
               	                    // console.log(e.curr);
               	                }
               	            },
               	            skin: '#27ae61', //皮肤
               	            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
               	            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
               	            prev: false, //若不显示，设置false即可
               	            next: false //若不显示，设置false即可
               	        });
              })
}
//历史作业的渲染
function lishi(str1,str2,current){
var model = {}
     model.subjectid = str1;
     model.classid = str2;
     model.type = 2;
     model.pageIndex = current;
     model.pageSize = 10;
	var GetHomeWorkList = {
	                  url: "ZYHomeWorkWeb/GetHomeWorkList",
	                  type: "post", 
	                  async: false,
	                  data:model
	          };
	          commonFn(GetHomeWorkList, function(json) { 	          	  	          
	              // console.log(json)	            	              	             
	              var html ='';
	              var aa = '';	
	              var timestamp = ''; 
	              var timestamp2 = ''; 
	              var len = '';    	             
                  $('.lszy').empty();
                  if(json.list == ''){
	                	html ='<div class="html">目前没有历史作业!</div>';
	                }
	              $.each(json.list,function(i,n){
	              // console.log(n)	                         	                 	                               
					
					  var num = ''; 
					 $.each(n.hwList,function(name,key){
					    aa = new Date(key.deadline).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');	
	 					 aa = aa.substring(0,19);    
	 					 aa = aa.replace(/-/g,'/'); 
	 					 timestamp = new Date(aa).getTime();
	 					 timestamp2 = Date.parse(new Date());
	 					 if(timestamp < timestamp2){
	                         var aa = '已截至'
	 					 }	
	 					 if(key.accuracy == ''){
	 					 	key.accuracy ='0%'
	 					 }			    	
				    	num += '<div class="zyxq">'+
				                '<span class="quspan">'+
				                  '<span class="span1">'+ key.title +'</span>'+
				                  '<span class="span2">'+ aa +'</span>'+
				                '</span>       '+        
				               '<span class="span4">'+ key.submitCount +'</span>'+
				               '<span class="span5">/  '+ key.allCount +'</span>'+
				               '<span class="span6">已提交</span>'+
				               '<span class="span7">已批阅：</span>'+
				               '<span class="span8">'+ key.submitCount +'</span>'+
				               '<span class="span12">正确率：<span class="span13">'+ key.accuracy +'</span></span>'+
				               // '<a href="Correcting.html?id='+ key.id +'"><span class="span9">查看详情</span></a>'+
				               // '<a href="javaScript:;"><span class="span10">作业分析</span></a>'+
				            '</div>'
				    })							
	                 html += '<div class="shijian">'+
				               '<span><i class="layui-icon">&#xe60e;</i></span>'+
				               '<span>'+ n.deadTime +'</span>'+num
				             '</div>'
				                                        
	              })
	             
  	              $('.lszy').append(html+'<div id="page2"></div>');
      	          laypage({
               	            cont: 'page2',
               	            pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
               	            curr : json.pageIndex,
               	            groups: 5,
               	            jump: function(e, first){ //触发分页后的回调                
               	                if(!first){ //一定要加此判断，否则初始时会无限刷 
               	                    lishi(0,0,e.curr);
               	                    // console.log(e.curr);
               	                }
               	                // console.log(1)
               	            },
               	            skin: '#27ae61', //皮肤
               	            first: '首页', //将首页显示为数字1,。若不显示，设置false即可
               	            last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
               	            prev: false, //若不显示，设置false即可
               	            next: false //若不显示，设置false即可
               	        });
          })
}

 // 第三种 时间戳转换时间
	function getLocalTime(nS) {     
	   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
	}     
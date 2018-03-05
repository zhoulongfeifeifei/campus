var str1 = '';
var aaaa = '';
var bbbb = '';
var cccc = '';
var dddd = '';
var eeee = '';
var ffff = '';
var gggg = '';
var hhhh = '';
var laypage =layui.laypage;
aa(null,0,0,0,0,1,0,0,gggg,0);
function aa(num,a,b,c,d,current,e,f,g,h){  
   var model = {}
       model.isShared = 1;
       model.schoolId = window.schoolid;
       model.knowledgeId = a;
       model.testId = b;       
       model.questionTypeId = c;
       model.difficultyId = d;
       model.gradeId = e;
       model.subjectId = f;
       model.source = g;
       model.workType = h;
       model.examineState = num;
       model.pageIndex = current;
       model.pageSize = 4;
   var QuestionList = {
                   url: "TKMyQuestion/QuestionList",
                   type: "POST", 
                   async: false,
                   data: model    
           };
           commonFn(QuestionList, function(json) { 
            laypage({
                        cont: 'page',
                        pages: json.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr : json.pageIndex,
                        groups: 4,
                        jump: function(e, first){ //触发分页后的回调                
                            if(!first){ //一定要加此判断，否则初始时会无限刷 

                              if(!hhhh){
                                hhhh = 0
                              }
                              if(!bbbb){
                                bbbb = 0
                              }
                              if(!aaaa){
                                aaaa = 0
                              }
                              if(!ffff){
                                ffff = 0
                              }
                              if(!eeee){
                                eeee = 0
                              }                            
                                aa(null,bbbb,ffff,aaaa,eeee,e.curr,0,0,gggg,hhhh);
                                // console.log(e.curr);
                            }
                        },
                        skin: '#27ae61', //皮肤
                        first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                        last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                        prev: false, //若不显示，设置false即可
                        next: false //若不显示，设置false即可
                    });
            // console.log(json);
             $('.xqy').empty();
            if(!json.resultData){
              $('.xqy').append('<div style="font-size: 18px;text-align: center;color: red;">没有数据啊</div>')
              return
            }
                 var html = '';    
                 var str = '<div class="main_center clearfix">'+
                      '<p>提示：单击题目显示答案和解析</p>'+
                      '<div class="tmpx">'+
                          '<span>共计<i class="tmsl">'+ json.recordCount +'</i>题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
                          // '<span class="zxsc">最新上传<img src="img/jt01.png" alt="" style="width: 9px;height: 12px;"></span>'+
                          // '<span class="zql">正确率<img src="img/jt02.png" alt="" style="width: 5px;height: 12px;"></span>'+
                      '</div>'+   
                      '<input class="ssinput" type="text" placeholder="根据题目来源搜索题目"/>'+ 
                      '<a class="sousuo">'+
                         '<img src="img/search.png" alt="" />'
                      '</a>'+        
                   '</div>' 
         $('.xqy').html(str)        
                $.each(json.resultData,function(i,n){
                  if(n.workType == 2){
                    str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                      html +=
                             ' <div class="shiti">'+
                               '<div class="stjj">'+
                                 ' <span class="stth">题号：<i>'+ n.id  +'</i></span>'+
                                  '<span>题型：<i>'+ n.typeName +'</i></span>'+
                                  '<span>日期：<i class="i">'+ str1 +'</i></span>'+
                                  '<span>试题难度：<i class="i">'+ n.difficuteName +'</i></span>'+
                                  // '<span>引用：<i class="i">7次</i></span>'+
                                  // '<span>正确率：<i class="i">80%</i></span>'+
                                  '<span>答题时间：<i class="i">'+ n.suggestionTime +'分钟</i></span>'+
                                  // '<span><i class="ii"></i>纠错</span>'+
                                  // '<span><i class="iii"></i>收藏试题</span>'+
                               '</div>'+
                               '<div class="stly">'+
                                  '<p>来源：<span class="span1">'+ n.questionSource +'</span><span class="jia" data-id="'+ n.id +'"><a>添加子级</a></span><span class="span2">分享者：<span class="span3">'+ n.createUserName +'</span></span></p>'+
                               '</div>'+
                               '<a class="stnra">'+
                                  '<div class="stnr">'+
                                      '<p class="sttg">'+ 
                                         '<audio controls>'+
                                           '<source src="'+n.audio +'" type="audio/mpeg">'+
                                         '</audio>'+
                                      '</p>'+                                     
                                   '</div>'+
                               '</a>'+
                               // '<div class="stcz">'+
                               //     '<a href="javascript:;">引入试卷</a>'+
                               // '</div>'+
                               '<div class="stjx">'+
                                    '<p><span class="span">答案</span><span>'+ n.correctAnswer +'</span></p>'+
                                    '<p><span class="span">解析</span><span>'+ n.analysis +'</span></p>'+
                               '</div>'+
                         '</div>'                    
                  }

                   str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                     html +=
                            ' <div class="shiti">'+
                              '<div class="stjj">'+
                                ' <span class="stth">题号：<i>'+ n.id  +'</i></span>'+
                                 '<span>题型：<i>'+ n.typeName +'</i></span>'+
                                 '<span>日期：<i class="i">'+ str1 +'</i></span>'+
                                 '<span>试题难度：<i class="i">'+ n.difficuteName +'</i></span>'+
                                 // '<span>引用：<i class="i">7次</i></span>'+
                                 // '<span>正确率：<i class="i">80%</i></span>'+
                                 '<span>答题时间：<i class="i">'+ n.suggestionTime +'分钟</i></span>'+
                                 // '<span><i class="ii"></i>纠错</span>'+
                                 // '<span><i class="iii"></i>收藏试题</span>'+
                              '</div>'+
                              '<div class="stly">'+
                                 '<p>来源：<span class="span1">'+ n.questionSource +'</span><span class="jia" data-id="'+ n.id +'"><a>添加子级</a></span><span class="span2">分享者：<span class="span3">'+ n.createUserName +'</span></span></p>'+
                              '</div>'+
                              '<a class="stnra">'+
                                 '<div class="stnr">'+
                                     '<p class="sttg">'+ n.question +'</p>'+                                     
                                  '</div>'+
                              '</a>'+
                              // '<div class="stcz">'+
                              //     '<a href="javascript:;">引入试卷</a>'+
                              // '</div>'+
                              '<div class="stjx">'+
                                   '<p><span class="span">答案</span><span>'+ n.correctAnswer +'</span></p>'+
                                   '<p><span class="span">解析</span><span>'+ n.analysis +'</span></p>'+
                              '</div>'+
                        '</div>'
                     
                })
                // console.log(html,123123);
                $('.xqy').append(html)
                $('.xqy').find(".shiti").eq(0).css('border','1px solid #27ae61')
           })
}
//试题来源搜索
$('body').on('click',".sousuo",function(){
   gggg = $('.ssinput').val();   
   aa(null,0,0,0,0,1,0,0,gggg,0);  
})
//点击试题答案显示
 $('.xqy').on('click','.stnra',function(){     
     $(this).siblings('.stjx').show().end().parent(".shiti").css('border','1px solid #27ae61').siblings().css('border','1px solid #ccc');
     $(this).parent(".shiti").siblings().find('.stjx').hide();
 })
//点击添加子集
 $('.xqy').on('click','.jia',function(){ 
    var IDs = $(this).attr('data-id');
    location.href = '../HomeWork/children.html?id=' + IDs;
 })
 $('.zt').on('click','li',function(){
 	$(this).addClass('gren').siblings().removeClass('gren')
 	if($(this).text() == '审核中'){
        aa(0,0,0,0,0,1,0,0,gggg,0)
 	}else if($(this).text() == '审核通过'){
        aa(1,0,0,0,0,1,0,0,gggg,0)
 	}else if($(this).text() == '审核失败'){
        aa(0,0,0,0,0,1,0,0,gggg)
 	}else if($(this).text() == '全部'){
        aa(null,0,0,0,0,1,0,0,gggg,0)
 	}
 })
 var GetGradeList = {
                 url: "TKCommon/GetGradeList",
                 type: "GET", 
                 async: false,
                 data:{
                    schoolid:window.schoolid
                 }   
         };
         commonFn(GetGradeList, function(json) { 
             // console.log(json)
             var str = '';
             $.each(json,function(i,n){
                 // console.log(n)
                 str += '<li data-id="'+ n.id +'"><a>'+ n.grade +'</a></li>'
             })
             $('.ztc').append(str)
             // $('.ztc').find("li").eq(1).addClass('gren')           
             
         })
  //点击年级
 $('.ztc').on('click','li',function(){
 	$(this).addClass('gren').siblings().removeClass('gren');
 	// console.log($(this).attr('data-id'))
 	dddd = $(this).attr('data-id')
 	aa(null,0,0,0,0,1,$(this).attr('data-id'),0,gggg,0)
 	var GetSubjectList = {
                 url: "TKCommon/GetSubjectList",
                 type: "GET", 
                 async: false,
                 data:{
                    schoolid:window.schoolid,
                    gradeid:$(this).attr('data-id')
                 }   
         };
         commonFn(GetSubjectList, function(json) { 
           // console.log(json)
           var html = '';
           $('.div').empty()
           $.each(json,function(i,n){
              html += '<li><a data-id="'+ n.subject_id +'">'+ n.subject_name +'</a></li>'
           })
           $('.div').append(html)
         })
        
 })
 //科目显示
 	var GetSubjectList = {
                 url: "TKCommon/GetSubjectList",
                 type: "GET", 
                 async: false,
                 data:{
                    schoolid:window.schoolid,
                    gradeid:6
                 }   
         };
         commonFn(GetSubjectList, function(json) { 
           // console.log(json)
           var html = '';
           $('.div').empty()
           $.each(json,function(i,n){
              html += '<li><a data-id="'+ n.subject_id +'">'+ n.subject_name +'</a></li>'
           })
           $('.div').append(html)
           // $('.div').find("li").first().addClass('gren')
         })

 //题型渲染
 	var GetQuestionTypeList = {
                 url: "TKCommon/GetQuestionTypeList",
                 type: "GET", 
                 async: false,
                 data:{
                    subjectid:30
                 }   
         };
         commonFn(GetQuestionTypeList, function(json) { 
         	// console.log(json)
              var html = '';
              $('.DIV').empty()
              $.each(json,function(i,n){
              	 html +='<li><a data-id="'+ n.id +'">'+ n.typeName +'</a></li>'
              })
            $('.DIV').append(html)
         })
    //作业类型
    $('.zydiv').on('click','li',function(){
         $('.zydiv').siblings().removeClass('gren');
         $(this).addClass('gren').siblings().removeClass('gren')
         hhhh = $(this).find('a').attr('data-id'); 
         if(!aaaa && !eeee && !ffff && !bbbb){
           aa(null,0,0,0,0,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && eeee != '' && !ffff && !bbbb){
           aa(null,0,0,aaaa,eeee,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && !eeee && !ffff && !bbbb){
           aa(null,0,0,aaaa,0,1,0,0,gggg,hhhh);
         }else if(!aaaa && eeee != '' && !ffff && !bbbb){
           aa(null,0,0,0,eeee,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && eeee != '' && ffff != ''){
           aa(null,0,ffff,aaaa,eeee,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && !eeee && ffff != ''){
           aa(null,0,ffff,aaaa,0,1,0,0,gggg,hhhh);
         }else if(!aaaa && eeee != '' && ffff != ''){
           aa(null,0,ffff,0,eeee,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && eeee != '' && bbbb != ''){
           aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,hhhh);
         }else if(aaaa != '' && !eeee && bbbb != ''){
           aa(null,bbbb,0,aaaa,0,1,0,0,gggg,hhhh);
         }else if(!aaaa && eeee != '' && bbbb != ''){
           aa(null,bbbb,0,0,eeee,1,0,0,gggg,hhhh);
         }                               
    })
    //题目类型点击
    $('.stlx').find('li').eq(1).click(function(){
      aaaa = ''
    	if(!ffff && !bbbb && !eeee && !hhhh){
          aa(null,0,0,0,0,1,0,0,gggg,0);
        }else if(ffff != '' && !hhhh){
          aa(null,0,ffff,0,0,1,0,0,gggg,0);
        }else if(bbbb != '' && !hhhh){
          aa(null,bbbb,0,0,0,1,0,0,gggg,0);
        }else if(eeee != '' && !hhhh){
          aa(null,0,0,0,eeee,1,0,0,gggg,0);
        }else if(ffff != '' && hhhh != ''){
          aa(null,0,ffff,0,0,1,0,0,gggg,hhhh);
        }else if(bbbb != '' && hhhh != ''){
          aa(null,bbbb,0,0,0,1,0,0,gggg,hhhh);
        }else if(eeee != '' && hhhh != ''){
          aa(null,0,0,0,eeee,1,0,0,gggg,hhhh);
        }else if(!ffff&& hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }else if(!bbbb && hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }else if(!eeee && hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }
    	$('.stlx').find('li').eq(1).addClass('gren')
    	$('.DIV').find('li').removeClass('gren')
    })     
   $('.DIV').on('click','li',function(){
   	   $('.DIV').siblings().removeClass('gren');
   	   $(this).addClass('gren').siblings().removeClass('gren')
   	   aaaa = $(this).find('a').attr('data-id');   	     	  
       if(!eeee && !ffff && !bbbb && !hhhh){
         aa(null,0,0,aaaa,0,1,0,0,gggg,0);
       }else if(!eeee && ffff !='' && !hhhh){
         aa(null,0,ffff,aaaa,0,1,0,0,gggg,0);
       }else if(!eeee && bbbb !='' && !hhhh){
         aa(null,bbbb,0,aaaa,0,1,0,0,gggg,0);
       }else if(eeee && !ffff && !bbbb && !hhhh){
         aa(null,0,0,aaaa,eeee,1,0,0,gggg,0);
       }else if(eeee && ffff != '' && !hhhh){
         aa(null,0,ffff,aaaa,eeee,1,0,0,gggg,0);
       }else if(eeee && bbbb != '' && !hhhh){
         aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,0);
       }else if(eeee && !ffff && !bbbb && hhhh){
         aa(null,0,0,aaaa,eeee,1,0,0,gggg,hhhh);
       }else if(eeee && !ffff && !bbbb && hhhh){
         aa(null,0,0,aaaa,eeee,1,0,0,gggg,hhhh);
       }else if(eeee && ffff != '' && hhhh){
         aa(null,0,ffff,aaaa,eeee,1,0,0,gggg,hhhh);
       }else if(eeee && bbbb != '' && hhhh){
         aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,hhhh);
       }else if(!eeee && !ffff && !bbbb && !hhhh){
         aa(null,0,0,aaaa,0,1,0,0,gggg,0);
       }else if(!eeee && ffff != '' && !hhhh){
         aa(null,0,ffff,aaaa,0,1,0,0,gggg,0);
       }else if(!eeee && bbbb != '' && !hhhh){
         aa(null,bbbb,0,aaaa,0,1,0,0,gggg,0);
       }else if(!eeee && !ffff && !bbbb && hhhh){
         aa(null,0,0,aaaa,0,1,0,0,gggg,hhhh);
       }else if(!eeee && ffff != '' && hhhh){
         aa(null,0,ffff,aaaa,0,1,0,0,gggg,hhhh);
       }else if(!eeee && bbbb != '' && hhhh){
         aa(null,bbbb,0,aaaa,0,1,0,0,gggg,hhhh);
       }   	    	   
   })
   //选择题目难易程度
    $('.stnd').find('li').eq(1).click(function(){
      eeee = ''
    	if(!ffff && !bbbb && !aaaa && !hhhh){
          aa(null,0,0,0,0,1,0,0,gggg,0);
        }else if(ffff != '' && !hhhh){
          aa(null,0,ffff,0,0,1,0,0,gggg,0);
        }else if(bbbb != '' && !hhhh){
          aa(null,bbbb,0,0,0,1,0,0,gggg,0);
        }else if(aaaa != '' && !hhhh){
          aa(null,0,0,aaaa,0,1,0,0,gggg,0);
        }else if(ffff != '' && hhhh != ''){
          aa(null,0,ffff,0,0,1,0,0,gggg,hhhh);
        }else if(bbbb != '' && hhhh != ''){
          aa(null,bbbb,0,0,0,1,0,0,gggg,hhhh);
        }else if(aaaa != '' && hhhh != ''){
          aa(null,0,0,aaaa,0,1,0,0,gggg,hhhh);
        }else if(!ffff && hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }else if(!bbbb && hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }else if(!aaaa && hhhh != ''){
          aa(null,0,0,0,0,1,0,0,gggg,hhhh);
        }
    	$('.stnd').find('li').eq(1).addClass('gren')
    	$('.BOX').find('li').removeClass('gren')
    })     
   $('.BOX').on('click','li',function(){
   	   $('.BOX').siblings().removeClass('gren');
   	   $(this).addClass('gren').siblings().removeClass('gren');
            	eeee = $(this).find('a').attr('data-id')
            if(!aaaa && !ffff && !bbbb && !hhhh){
                aa(null,0,0,0,eeee,1,0,0,gggg,0);  
             }else if(!aaaa && ffff !='' && !hhhh){
               aa(null,0,ffff,0,eeee,1,0,0,gggg,0);
             }else if(!aaaa && bbbb !='' && !hhhh){
               aa(null,bbbb,0,0,eeee,1,0,0,gggg,0);
             }else if(aaaa && !ffff && !bbbb && !hhhh){
               aa(null,0,0,aaaa,eeee,1,0,0,gggg,0);
             }else if(aaaa && ffff != '' && !hhhh){
              aa(null,0,ffff,aaaa,eeee,1,0,0,gggg,0);
             }else if(aaaa && bbbb != '' && !hhhh){
              aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,0);
             }else if(!aaaa && !ffff && !bbbb && hhhh){
               aa(null,0,0,0,eeee,1,0,0,gggg,hhhh);
             }else if(!aaaa && ffff !='' && hhhh){
               aa(null,0,ffff,0,eeee,1,0,0,gggg,hhhh);
             }else if(!aaaa && bbbb !='' && hhhh){
               aa(null,bbbb,0,0,eeee,1,0,0,gggg,hhhh);
             }else if(!aaaa && ffff != '' && hhhh){
              aa(null,0,ffff,0,eeee,1,0,0,gggg,hhhh);
             }else if(!aaaa && bbbb != '' && hhhh){
              aa(null,bbbb,0,0,eeee,1,0,0,gggg,hhhh);
             }else if(aaaa && !ffff && !bbbb && hhhh){
               aa(null,0,0,aaaa,eeee,1,0,0,gggg,hhhh);
             }else if(aaaa && ffff !='' && hhhh){
               aa(null,0,ffff,0,eeee,1,0,0,gggg,hhhh);
             }else if(aaaa && bbbb !='' && hhhh){
               aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,hhhh);
             }else if(aaaa && ffff != '' && hhhh){
              aa(null,0,ffff,aaaa,eeee,1,0,0,gggg,hhhh);
             }else if(aaaa && bbbb != '' && hhhh){
              aa(null,bbbb,0,aaaa,eeee,1,0,0,gggg,hhhh);
             }   	           	     	   	     	   
   })

 //题目难易程度
 	var GetDifficultyList = {
                 url: "TKCommon/GetDifficultyList",
                 type: "POST", 
                 async: false                 
         };
         commonFn(GetDifficultyList, function(json) { 
         	// console.log(json)
              var html = '';
              $('.BOX').empty()
              $.each(json,function(i,n){             
              	 html +='<li><a data-id="'+ n.id +'">'+ n.difficuteName +'</a></li>'
              })
            $('.BOX').append(html)
         })
//点击科目  
 $('.div').on('click','li',function(){
 	// console.log($(this).find("a").attr('data-id'))
  if(!dddd){
      dddd = 6 
  }
 	cccc = $(this).find("a").attr('data-id')
 	aa(null,0,0,0,0,1,dddd,$(this).find("a").attr('data-id'))
 	$(this).addClass('gren').siblings().removeClass('gren')
 	var GetTeaBookList = {
                 url: "Resource/GetTeaBookList",
                 type: "GET", 
                 async: false,
                 data:{
                    schoolId:window.schoolid
                 }   
         };
         commonFn(GetTeaBookList, function(json) { 
           // console.log(json)
           var html = '';
           $('.box').empty()
           $.each(json,function(i,n){
              html += '<li><a data-id="'+ n.subjectId +'" data-class="'+ n.jiaoCaiId +'" data-num="'+ n.gradeId +'">'+ n.name +''+ n.gradename +''+ n.subject_name +'</a></li>'
           })
           $('.box').append(html)              
         })
        //题目类型
         	var GetQuestionTypeList = {
                         url: "TKCommon/GetQuestionTypeList",
                         type: "GET", 
                         async: false,
                         data:{
                            subjectid:$(this).find("a").attr('data-id')
                         }   
                 };
                 commonFn(GetQuestionTypeList, function(json) { 
                 	// console.log(json)
                      var html = '';
                      $('.DIV').empty()
                      $.each(json,function(i,n){
                      	 html +='<li><a data-id="'+ n.id +'">'+ n.typeName +'</a></li>'
                      })
                    $('.DIV').append(html)
                    $('.stlx').eq("1").addClass('gren')
                 })

   //教材的渲染
      var GetTeaBookList = {
                    url: "ZYHomeWorkWeb/GetTeaBookList",
                    type: "GET", 
                    async: false,
                    data:{
                       schoolId:window.schoolid,
                       subjectid:cccc
                    }   
            };
            commonFn(GetTeaBookList, function(json) { 
              // console.log(json)
              var html = '';
              $('.box').empty()
              $.each(json,function(i,n){
                 html += '<li><a data-id="'+ n.subjectId +'" data-class="'+ n.jiaoCaiId +'" data-num="'+ n.gradeId +'">'+ n.name +''+ n.gradename +''+ n.subject_name +'</a></li>'
              })
              $('.box').append(html)
              // $('.box').find("li").first().addClass('gren')
            })
 })

$('.box').on('click','li',function(){
 	 $(this).addClass('gren').siblings().removeClass('gren')
   zsd($(this).find("a").attr('data-id'),$(this).find("a").attr('data-num'),$(this).find("a").attr('data-class'));
   kd($(this).find("a").attr('data-id'),$(this).find("a").attr('data-num'),$(this).find("a").attr('data-class'));
 })

//知识点树形
function zsd(a,b,c){
    var GetListResKnowledgeTree = {
                url:'TKResource/GetListResKnowledgeTree',
                type: "get",
                dataType: "Json",
                async: false,
                data:{
                   schoolid:window.schoolid,
                   subjectid:a,
                   gradeid:b,
                   jiaocaiid:c
                }         
        };      
        commonFn(GetListResKnowledgeTree, function(data) {
            // getlist(data.roomId,data.roomName);
           // console.log(data)
            $("#demo1").ligerTree({
                data: data,
                checkbox: false, 
                //ajaxType: 'get',
                idFieldName: 'id',
               onSelect: function (node,e){
                bbbb = node.data.id
                // console.log(node.data.id) 
                aa(null,node.data.id,0,0,0,0,0,0,gggg,0);                                  
               }
           }) 
        });
}

//考点树形
function kd(a,b,c){
   var GetListResTestTree = {
               url:'TKResource/GetListResTestTree',
               type: "get",
               dataType: "Json",
               async: false,
               data:{
                  schoolid:window.schoolid,
                  subjectid:a,
                  gradeid:b,
                  jiaocaiid:c
               }         
       };      
       commonFn(GetListResTestTree, function(data) {
           // getlist(data.roomId,data.roomName);
          // console.log(data)
           $("#demo2").ligerTree({
               data: data,
               checkbox: false, 
               //ajaxType: 'get',
               idFieldName: 'id',
              onSelect: function (node,e){
               // console.log(node.data.roomId)
               ffff = node.data.id
               aa(null,0,node.data.id,0,0,0,0,0,gggg,0);                         
              }
          }) 
       });
}

//考点知识点的转换
$('.left_lfet').click(function(){
	$('.left_lfet').addClass('gren');
	$('.left_right').removeClass('gren');
	$('.sxxl2').css('display','none');
	$('.sxxl1').css('display','block');
})
$('.left_right').click(function(){
	$('.left_lfet').removeClass('gren');
	$('.left_right').addClass('gren');
    $('.sxxl1').css('display','none');
    $('.sxxl2').css('display','block');
})

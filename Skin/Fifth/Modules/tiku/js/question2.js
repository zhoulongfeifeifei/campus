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
//Ĭ����ʾ����Ŀ
aa(null,0,0,0,0,1,0,0,gggg,0);
function aa(num,a,b,c,d,current,e,f,g,h){
   var model = {}
       model.isShared = 0;
       model.schoolId = window.schoolid;
       model.examineState = num;
       model.knowledgeId = a;
       model.testId = b;
       model.questionTypeId = c;
       model.difficultyId = d;
       model.gradeId = e;
       model.subjectId = f; 
       model.source = g;  
       model.workType = h;    
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
                        pages: json.pageCount, //���Խз���˰���ҳ������ĳһ���������ٻ�ȡ���������ǻ�ȡ������18
                        curr : json.pageIndex,
                        groups: 5,
                        jump: function(e, first){ //������ҳ��Ļص�                
                            if(!first){ //һ��Ҫ�Ӵ��жϣ������ʼʱ������ˢ
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
                        skin: '#27ae61', //Ƥ��
                        first: '��ҳ', //����ҳ��ʾΪ����1,��������ʾ������false����
                        last: 'βҳ', //��βҳ��ʾΪ��ҳ����������ʾ������false����
                        prev: false, //������ʾ������false����
                        next: false //������ʾ������false����
                    });
            // console.log(json);
             $('.st_main').empty() ;
            if(!json.resultData){
              $('.st_main').append('<div style="font-size: 18px;text-align: center;color: red;">û�����ݰ�</div>')
              return
            }
                 var html = '';    
                             
                $.each(json.resultData,function(i,n){
                  if(n.workType == 2){
                      str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                       html +='<input data-id="'+ n.id  +'" name="input" type="checkbox" class="input">'+                    
                              ' <div class="shiti">'+
                                '<div class="stjj">'+
                                  ' <span class="stth">��ţ�<i>'+ n.id  +'</i></span>'+
                                   '<span>���ͣ�<i>'+ n.typeName +'</i></span>'+
                                   '<span>���ڣ�<i class="i">'+ str1 +'</i></span>'+
                                   '<span>�����Ѷȣ�<i class="i">'+ n.difficuteName +'</i></span>'+
                                   // '<span>���ã�<i class="i">7��</i></span>'+
                                   // '<span>��ȷ�ʣ�<i class="i">80%</i></span>'+
                                   '<span>����ʱ�䣺<i class="i">'+ n.suggestionTime +'����</i></span>'+
                                   // '<span><i class="ii"></i>����</span>'+
                                   // '<span><i class="iii"></i>�ղ�����</span>'+
                                '</div>'+
                                '<div class="stly">'+
                                   '<p>��Դ��<span class="span1">'+ n.questionSource +'</span><span class="jiao" data-id="'+ n.id +'"><a>����Ӽ�</a></span></p>'+
                                '</div>'+
                                '<a class="stnn">'+
                                   '<div class="stnr">'+
                                       '<p class="sttg">'+
                                          '<audio controls>'+
                                            '<source src="'+n.audio +'" type="audio/mpeg">'+
                                          '</audio>'+
                                       '</p>'+
                                    '</div>'+
                                '</a>'+
                                '<div class="czhz">'+
                                     '<span data-id="'+ n.id +'" class="stsc czst" ><a href="javascript:;">ɾ������</a></span>'+
                                     '<span class="stbj czst" ><a href="edit.html?id='+ n.id +'">�༭����</a></span>'+
                                     // '<span class="stcz czst">'+
                                     //     '<a href="javascript:;">�����Ծ�</a>'+
                                     // '</span>'+
                                     '<span data-id="'+ n.id +'" class="stfx czst" ><a href="javascript:;">��������</a></span>'+
                                '</div>'+
                                '<div class="stjx">'+
                                     '<p><span class="span">��</span><span>'+ n.correctAnswer +'</span></p>'+
                                     '<p><span class="span">����</span><span>'+ n.analysis +'</span></p>'+
                                '</div>'+
                            '</div>' +
                     '</div>'
                  }
                   
                   str1 = new Date(n.intime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                     html +='<input data-id="'+ n.id  +'" name="input" type="checkbox" class="input">'+                    
                            ' <div class="shiti">'+
                              '<div class="stjj">'+
                                ' <span class="stth">��ţ�<i>'+ n.id  +'</i></span>'+
                                 '<span>���ͣ�<i>'+ n.typeName +'</i></span>'+
                                 '<span>���ڣ�<i class="i">'+ str1 +'</i></span>'+
                                 '<span>�����Ѷȣ�<i class="i">'+ n.difficuteName +'</i></span>'+
                                 // '<span>���ã�<i class="i">7��</i></span>'+
                                 // '<span>��ȷ�ʣ�<i class="i">80%</i></span>'+
                                 '<span>����ʱ�䣺<i class="i">'+ n.suggestionTime +'����</i></span>'+
                                 // '<span><i class="ii"></i>����</span>'+
                                 // '<span><i class="iii"></i>�ղ�����</span>'+
                              '</div>'+
                              '<div class="stly">'+
                                 '<p>��Դ��<span class="span1">'+ n.questionSource +'</span><span class="jiao" data-id="'+ n.id +'"><a>����Ӽ�</a></span></p>'+
                              '</div>'+
                              '<a class="stnn">'+
                                 '<div class="stnr">'+
                                     '<p class="sttg">'+ n.question +'</p>'+
                                  '</div>'+
                              '</a>'+
                              '<div class="czhz">'+
                                   '<span data-id="'+ n.id +'" class="stsc czst" ><a href="javascript:;">ɾ������</a></span>'+
                                   '<span class="stbj czst" ><a href="edit.html?id='+ n.id +'">�༭����</a></span>'+
                                   // '<span class="stcz czst">'+
                                   //     '<a href="javascript:;">�����Ծ�</a>'+
                                   // '</span>'+
                                   '<span data-id="'+ n.id +'" class="stfx czst" ><a href="javascript:;">��������</a></span>'+
                              '</div>'+
                              '<div class="stjx">'+
                                   '<p><span class="span">��</span><span>'+ n.correctAnswer +'</span></p>'+
                                   '<p><span class="span">����</span><span>'+ n.analysis +'</span></p>'+
                              '</div>'+
                          '</div>' +
                   '</div>'
                     
                })
                // console.log(html,123123);
                $('.st_main').html(html)
                $('.st_main').find(".shiti").eq(0).css('border','1px solid #27ae61')
           })
}
//������Դ����
$('body').on('click',".sousuo",function(){
   gggg = $('.ssinput').val();   
   aa(null,0,0,0,0,1,0,0,gggg,0);  
})
//����ʾ
 $('.st_main').on('click','.stnn',function(){
    $(this).siblings('.stjx').show().end().parent(".shiti").css('border','1px solid #27ae61').siblings().css('border','1px solid #ccc');
    $(this).parent(".shiti").siblings().find('.stjx').hide()
 })
 //�������Ӽ�
 $('.st_main').on('click','.jiao',function(){ 
    var IDs = $(this).attr('data-id');
    location.href = '../HomeWork/children.html?id=' + IDs;
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
  //����꼶
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
 //��Ŀ��ʾ
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
         //�����Ŀ  
          $('.div').on('click','li',function(){
           // console.log($(this).find("a").attr('data-id'))
           if(!dddd){
               dddd = 6 
           }
           cccc = $(this).find("a").attr('data-id')
           aa(null,0,0,0,0,1,dddd,$(this).find("a").attr('data-id'),gggg,0)
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
                 //��Ŀ����
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
                             // $('.stlx').eq("1").addClass('gren')
                          })
              //�̲ĵ���Ⱦ
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

 //������Ⱦ
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
    //��ҵ����
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
    //ѡ������
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
     //ѡ����Ŀ���׳̶�
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

 //��Ŀ���׳̶�
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

$('.box').on('click','li',function(){
  $(this).addClass('gren').siblings().removeClass('gren');
  zsd($(this).find("a").attr('data-id'),$(this).find("a").attr('data-num'),$(this).find("a").attr('data-class'));
  kd($(this).find("a").attr('data-id'),$(this).find("a").attr('data-num'),$(this).find("a").attr('data-class'));
 })

//֪ʶ������
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

//��������
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
//����֪ʶ���ת��
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
//ȫѡ��ȫ��ѡ
$('#qx').click(function(){
     if(this.checked){
         $(".st_main :checkbox").prop("checked", true);
     }else{
         $(".st_main :checkbox").prop("checked", false);
     } 
})
//��������,��������
$('.st_main').on('click','.stfx',function(){
   // console.log($(this).attr('data-id'))
   var BatchShare = {
                  url: "TKMyQuestion/BatchShare",
                  type: "GET", 
                  async: false,
                  data:{
                     qids:$(this).attr('data-id'),
                     schoolId:window.schoolid
                  }   
          };
          commonFn(BatchShare, function(json) { 
            // console.log(json)
           if(json == true){
             $('.tkts').html('����ɹ�')
              $('.tkts').css('display','block');
              setTimeout(function(){
                 $('.tkts').css('display','none');
                 history.go(0)
              },2000)
           }
         })
})

$('.plfx').click(function(){
    $('.plsc').removeClass('yanse');
    if($(".st_main :checkbox").is(':checked')){
     $('input[name="input"]:checked').each(function(i, n) {
        var id = $(n).attr("data-id");
        var BatchShare = {
                       url: "TKMyQuestion/BatchShare",
                       type: "GET", 
                       async: false,
                       data:{
                          qids:id,
                          schoolId:window.schoolid
                       }   
               };
               commonFn(BatchShare, function(json) { 
                 // console.log(json)
                if(json == true){
                  $('.tkts').html('����ɹ�')
                   $('.tkts').css('display','block');
                   setTimeout(function(){
                      $('.tkts').css('display','none');
                      history.go(0)
                   },2000)
                }
              })
      })
    }       
})
//����ɾ��,ɾ��
$('.st_main').on('click','.stsc',function(){
   var DelQuestions = {
                       url: "TKMyQuestion/DelQuestions",
                       type: "GET", 
                       async: false,
                       data:{
                          ids:$(this).attr('data-id')
                       }   
               };
               commonFn(DelQuestions, function(json) { 
                 // console.log(json)
                if(json == true){
                  $('.tkts').html('ɾ���ɹ�')
                   $('.tkts').css('display','block');
                   setTimeout(function(){
                      $('.tkts').css('display','none');
                      history.go(0)
                   },2000)
                }
              })
})

$('.plsc').click(function(){
    $('.plsc').removeClass('yanse');
    if($(".st_main :checkbox").is(':checked')){
     $('input[name="input"]:checked').each(function(i, n) {
        var id = $(n).attr("data-id");
        var DelQuestions = {
                       url: "TKMyQuestion/DelQuestions",
                       type: "GET", 
                       async: false,
                       data:{
                          ids:id
                       }   
               };
               commonFn(DelQuestions, function(json) { 
                 // console.log(json)
                if(json == true){
                  $('.tkts').html('ɾ���ɹ�')
                   $('.tkts').css('display','block');
                   setTimeout(function(){
                      $('.tkts').css('display','none');
                      history.go(0)
                   },2000)
                }
              })
      })
    }       
})
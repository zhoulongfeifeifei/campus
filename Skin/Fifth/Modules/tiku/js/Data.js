//试题总数、今日新增、待审核
var GetAllQuestionCount = {
            url: "TKMyQuestion/GetAllQuestionCount",
            type: "GET"        
    };
    commonFn(GetAllQuestionCount, function(json) {  
       // console.log(json)
       $('.header').html('<div class="left1 clearfix">'+
                             '<div class="left">'+
                                '<span>'+ json.allcount +'题</span>'+
                                '<span class="span">试题总量</span>'+
                             '</div>'+
                             '<div class="cent">'+
                                '<span>'+ json.todayCount +'题</span>'+
                                '<span class="span">今日新增</span>'+
                             '</div>'+
                         '</div>'+
                         '<div class="right1 clearfix">'+
                            '<div class="right">'+
                               '<span>'+ json.noExamineCount +'题</span>'+
                               '<span class="span">待审核</span>'+
                            '</div>'+
                         '</div>')
    })

//饼型图
function fetchData(cb){  
    var GetSubjectCount = {
                url: "TKMyQuestion/GetSubjectCount",
                type: "GET", 
                data:{
                  schoolId:window.schoolid
                }          
        };
        commonFn(GetSubjectCount, function(json) { 
             // console.log(json)                        
              cb({
                   categories:json.subject,
                   data:json.subjectCount
               });  
               var html = '';                 
             $.each(json.subjectCount,function(i,n){
                   html += '<li><a data-id="'+ n.id +'">'+ n.name+'教师</a></li>'
             })
             $('.jslb').append(html)
        })
}
    var myChart = echarts.init(document.getElementById('m_h_left'));
       var option = {
           tooltip : {
               trigger: 'item',
               formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           legend: {
               orient: 'horizontal',
               top: '100',
               data: []
           },           
       };
       // myChart.setOption(option);
       myChart.on('click', function (params) {
            $('.fxphb').empty()
            aa(params.data.id)
            // console.log(params.data.id)
        });
       fetchData(function (data) {
       
           myChart.hideLoading();
           myChart.setOption({
               legend: {
                   data:data.categories 
               },
               series: [{
                   name: '科目',
                   type: 'pie',
                   radius : '55%',
                   center: ['50%', '50%'],
                   data:data.data,
                   itemStyle: {
                       emphasis: {
                           shadowBlur: 10,
                           shadowOffsetX: 0,
                           shadowColor: 'rgba(0, 0, 0, 0.5)'
                       }
                   }
               }]
           });
       });

 //条形图
 function fetch(index,cb){  
     var GetUserShareCount = {
                 url: "TKMyQuestion/GetUserShareCount",
                 type: "GET", 
                 data:{
                   subjectId:index
                 }          
         };
         commonFn(GetUserShareCount, function(json) { 
              // console.log(json)                        
               cb({
                    categories:json.shareNum,
                    data:json.shareName
                });              
         })
 }
var Chart = echarts.init(document.getElementById('mian_food'));
var option = {
    title: {
        text: '分享排行'
    },
    tooltip: {},
    xAxis: {
        data: []
    },
    yAxis: {}
   
};
Chart.setOption(option);
fetch(0,function (data) {  
    Chart.hideLoading();
    Chart.setOption({
        xAxis: {
                data: data.data
            }, 
        series: [{
            name: '排行榜',
            type: 'bar',
            data: data.categories
        }]                                
    });
})

//试题分享榜
aa(0)
function aa(fenXiang){
   var GetUserShareCount = {
               url: "TKMyQuestion/GetUserShareCount",
               type: "GET",
               data:{
                 subjectId:fenXiang
               }     
       };
       commonFn(GetUserShareCount, function(json) {  
        // cb({
        //      categories:json.shareNum,
        //      data:json.shareName
        //  });
                
          var html = '';     
          var arr = []; 
          arr.push(json.userCount) 
          var str2 = arr[0].slice(0,3)
          // console.log(str2)
          $.each(str2,function(i,n){                       
            html += '<div class="fxlb">'+
                        '<img src="img/fxtp.png" alt="">'+
                        '<span class="fxmc">0'+ (i+1) +'</span>'+
                        '<span class="fxsf">'+
                           '<span class="jsmz">'+ n.userName +'</span>'+
                           '<span class="fxxk">'+ n.subject_name +'老师</span>'+
                        '</span>'+
                        '<span class="fxb">'+
                           '<i class="fxtb"></i>'+
                           '<span class="fxts">分享'+ n.shareNum +'题</span>'+
                        '</span>'+
                     '</div>'
          })

          $('.fxphb').append(html)
         
       })

}

//各个科目的跳转
$('.main_cent').on('click','li',function(){
   $(this).addClass('green').siblings().removeClass('green')
   // console.log($(this).find('a').attr('data-id'))
   var id = $(this).find('a').attr('data-id')
   if(!id){
      id = 0
   }
       fetch(id,function (data) {  
        Chart.hideLoading();
        Chart.setOption({
            xAxis: {
                    data: data.data
                }, 
            series: [{
                name: '排行榜',
                type: 'bar',
                data: data.categories
            }]                                
        });
    })
})

function sortarr(arr){
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}
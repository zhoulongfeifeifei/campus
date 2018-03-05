$('.topbar').find('.classname').html(decodeURI(getUrlParam('classname'))
)
// console.log(getUrlParam('id'))
if(getUrlParam('val') == 0){
	$('.wan').removeClass('hidden');
	$('.tu').addClass('hidden');
}else if(getUrlParam('val') == 1){
	$('.tu').removeClass('hidden');
	$('.wan').addClass('hidden');
}
// console.log(getUrlParam('type'))
// if(getUrlParam('type') ==0 || getUrlParam('type') == 'null'){
//    	var Get_KnowledgeByOne = {
//             url: "XAWebBanpai/Get_KnowledgeByOne",
//             type: "GET",
//             async: false,
//             data:{
//                    typeid:getUrlParam('id')
//             }
//     };
//     commonFn(Get_KnowledgeByOne, function(json) {  
//       console.log(decodeURI(getUrlParam('d')))
//           console.log(json)           
//                 html='<img class="bgPic" src="'+ json.img +'" width="448px" height="248px">'+
//                      '<div class="transparent">'+
//                      '</div>'+
//                     '<div class="word">'+
//                       '<h1>'+json.title+'</h1>'+
//                       '<p>'+ json.detail +'</p>'+
//                     '</div>'
//             $('.zaoDu').html(html)
//           $('.everyMain p').html(decodeURI(getUrlParam('d')))
//     })
// }else if(getUrlParam('type') == 1){
//     var Get_KnowledgeByOne = {
//            url: "XAWebBanpai/Get_KnowledgeByOne",
//            type: "GET",
//            async: false,
//            data:{
//                   typeid:getUrlParam('id')
//            }
//    };
//    commonFn(Get_KnowledgeByOne, function(json) {  
//          // console.log(json)     
//                $('.bgPic').attr('src',getUrlParam('c'))      
//                html= json.detail
//            $('.everyMain').html(html)
        
//    })
// }
if(getUrlParam('idm')!=0)
{
	var Get_KnowledgeByOne = {
		        url: "XAWebBanpai/Get_KnowledgeByOne",
		        type: "GET",
		        async: false,
		        data:{
                   typeid:getUrlParam('idm')
		        }
		};
		commonFn(Get_KnowledgeByOne, function(json) {  
              $('.everyMain').html(json.detail);
		})
}

if(getUrlParam('id')!=0)
{
	var Get_KnowledgeByOne = {
		        url: "XAWebBanpai/Get_KnowledgeByOne",
		        type: "GET",
		        async: false,
		        data:{
                   typeid:getUrlParam('id')
		        }
		};
		commonFn(Get_KnowledgeByOne, function(json) {  
		      console.log(json)           
                html='<img class="bgPic" src="'+ json.img +'" width="448px" height="248px">'+
                     '<div class="transparent">'+
                     '</div>'+
                    '<div class="word">'+
                      '<h1>'+json.title+'</h1>'+
                      '<p>'+ json.detail +'</p>'+
                    '</div>'
            
              $('.zaoDu').html(html)
		})
}






$('.topbar').find('.classname').html(decodeURI(getUrlParam('classname'))
)
console.log(getUrlParam('id'))
if(getUrlParam('val') == 0){
	$('.wan').removeClass('hidden');
	$('.tu').addClass('hidden');
}else if(getUrlParam('val') == 1){
	$('.tu').removeClass('hidden');
	$('.wan').addClass('hidden');
}

if(getUrlParam('ABC') ==0 || !getUrlParam('ABC')){
  aa();	
}

function aa(current){ 
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
                html='<li>'+                          
	                      '<img src="'+ json.img +'" style="height: 100px;">' + 
	                      '<h3>'+ json.title +'</h3>'+	                      
	                      '<p style="width: 190px;margin-left: 100px;">--'+ json.signName +'</p>'+
	                      '<span style="display:block">'+ json.detail +'</span>'+
	                      
	                   '</li>'
            $('#scroll').html(html)
           var boxo = document.getElementById("boxo");
           var scroll = document.getElementById("scroll");
           var scro = document.getElementById("scro");
           var speed=30;    //滚动速度值，值越大速度越慢
           var nnn=200/scroll.offsetHeight;
           for(i=0;i<nnn;i++){scroll.innerHTML+="<br/>"+ scroll.innerHTML}
           scro.innerHTML = scroll.innerHTML    //克隆demo2为demo1
           function Marquee(){
               if(scro.offsetTop-boxo.scrollTop<=0)    //当滚动至demo1与demo2交界时
                   boxo.scrollTop-=scroll.offsetHeight    //demo跳到最顶端
               else{
                   boxo.scrollTop++     //如果是横向的 将 所有的 height top 改成 width left
               }
           }
           var MyMar = setInterval(Marquee,speed);        //设置定时器
           boxo.onmouseover = function(){clearInterval(MyMar)}    //鼠标经过时清除定时器达到滚动停止的目的
           boxo.onmouseout = function(){MyMar = setInterval(Marquee,speed)}    //鼠标移开时重设定时器
         
		})
}




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
           var speed=30;    //�����ٶ�ֵ��ֵԽ���ٶ�Խ��
           var nnn=200/scroll.offsetHeight;
           for(i=0;i<nnn;i++){scroll.innerHTML+="<br/>"+ scroll.innerHTML}
           scro.innerHTML = scroll.innerHTML    //��¡demo2Ϊdemo1
           function Marquee(){
               if(scro.offsetTop-boxo.scrollTop<=0)    //��������demo1��demo2����ʱ
                   boxo.scrollTop-=scroll.offsetHeight    //demo�������
               else{
                   boxo.scrollTop++     //����Ǻ���� �� ���е� height top �ĳ� width left
               }
           }
           var MyMar = setInterval(Marquee,speed);        //���ö�ʱ��
           boxo.onmouseover = function(){clearInterval(MyMar)}    //��꾭��ʱ�����ʱ���ﵽ����ֹͣ��Ŀ��
           boxo.onmouseout = function(){MyMar = setInterval(Marquee,speed)}    //����ƿ�ʱ���趨ʱ��
         
		})
}




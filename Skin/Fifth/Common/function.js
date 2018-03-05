var _winWidth=$(window).width();
var _winHeight=$(window).height();

var $viewFrameBodyBar,$viewFrameBodyFrame,$inFrameLink;

$(function(){
	
	dropdown();//涓嬫媺鑿滃崟
	
	thsort();//琛ㄦ牸鎺掑簭
	
	IEplaceholder();//琛ㄥ崟placeholder鐨処E閫傞厤
	
	barTab();//bar-tab鍒囨崲
});


function dropdown(){
	$('.dropdown-sub').click(function(){
		var $dropdown=$(this).parents('.dropdown');
		var $dropdownMenu=$dropdown.find('.dropdown-menu');
		if($dropdown.hasClass('dropdown-active')){
			$dropdownMenu.hide();
			$dropdown.removeClass('dropdown-active');
			$dropdown.find('.fa-angle-left').removeClass().addClass('fa fa-angle-down');
		}else{
			$dropdownMenu.show();
			$dropdown.addClass('dropdown-active');
			$dropdown.find('.fa-angle-down').removeClass().addClass('fa fa-angle-left');
		}
	})
	
	
	//鐐瑰嚮闄よ彍鍗曚互澶栫殑浣嶇疆涔熷叧闂彍鍗�
	$(document).click(function(e){
		if(!$(e.target).is('.vF-header .dropdown,.vF-header .dropdown *')){
			var $dropdown = $('.vF-header .dropdown');
    		var $dropdownMenu = $dropdown.find('.dropdown-menu');
			if($dropdownMenu.length==0){
				$dropdown=$('.vF-header .dropdown', parent.document);
				$dropdownMenu=$('.vF-header .dropdown-menu', parent.document);
			}
			$dropdownMenu.hide();
			$dropdown.removeClass('dropdown-active');
			$dropdown.find('.fa-angle-left').removeClass().addClass('fa fa-angle-down');
		}
	})
}

function thsort(){
	$('.thsort').click(function(){
		var $fa=$(this).find('.fa');
		if($fa.hasClass('fa-sort-up')){
			$fa.attr('class','fa fa-sort-down');
		}else{
			$fa.attr('class','fa fa-sort-up');
		}
	})
}

function IEplaceholder(){
	$('input').placeholder();
}

var $barTab;
function barTab(){
	$barTab=$('.bar-tab');
	_barTab();//杩涘叆椤甸潰鏃跺垽鏂�
	$barTab.find('.item').click(function(){
		 var $this=$(this);
		 $barTab.find('.item-active').removeClass('item-active');
		 $this.addClass('item-active');
		 _barTab();//鐐瑰嚮鍚庡垽鏂�
	});
	
}
function _barTab(){
   $('.bar-tab-content').hide();
   $('.bar-tab-content-'+$barTab.find('.item-active').attr('data-content')).show();
}


function checknum(text){
	var strTemp = text;
	var sum=0;
	for(i=0;i<strTemp.length;i++){
		if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255)) {
		  sum=sum+1;
		}else {
		  sum=sum+2;
		}
	};
	
	return sum;
}

function vFselect(){
	$('.vF-select .vF-select-sub').click(function(){
		var $par=$(this).parent();
		if($par.hasClass('vF-select-active')){
			$par.removeClass('vF-select-active');
		}else{
			$par.addClass('vF-select-active');
		}
	});
	
	//鐐瑰嚮闄よ彍鍗曚互澶栫殑浣嶇疆涔熷叧闂彍鍗�
	$(document).click(function(e){
		if(!$(e.target).is('.vF-select-sub')){
			$('.vF-select').removeClass('vF-select-active');
		}
	});
}
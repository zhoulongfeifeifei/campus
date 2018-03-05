var _winWidth=$(window).width();
var _winHeight=$(window).height();

var $viewFrameBodyBar,$viewFrameBodyFrame,$inFrameLink;

$(function(){
	
	dropdown();//下拉菜单
	
	thsort();//表格排序
	
	IEplaceholder();//表单placeholder的IE适配
	
	barTab();//bar-tab切换
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
	_barTab();//进入页面时判断
	$barTab.find('.item').click(function(){
		 var $this=$(this);
		 $barTab.find('.item-active').removeClass('item-active');
		 $this.addClass('item-active');
		 _barTab();//点击后判断
	});
	
}
function _barTab(){
   $('.bar-tab-content').hide();
   $('.bar-tab-content-'+$barTab.find('.item-active').attr('data-content')).show();
}

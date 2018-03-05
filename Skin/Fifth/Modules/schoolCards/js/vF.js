$(function(){
	
	$(window).load(function(){
		setTimeout(function(){$('.vF-wrap').show();},500);
	})
	
	resize();
	menu();
	
})
//左侧导航
function menu(){
	var $vFleft=$('.vF-left');
	$vFleft.find('a').click(function(){
		$vFleft.find('a.active').removeClass('active');
		$(this).addClass('active');
	})
}


//框架尺寸
function resize(){
	//$('.viewFrame-main').css('height',_winHeight-90);
	//$('.viewFrame-leftnav .flow-ul').css('height',_winHeight-90-10-$('.viewFrame-leftnav .flow-account').height());
}

$(window).resize(function() {
	//_winWidth=$(window).width();
	//_winHeight=$(window).height();
 	resize();
});

//选择身份
function ClassChange(isFirst){
	if(isFirst==null){isFirst=false;}
		
	var $vFClassChange=$('.vF-ClassChange');
	if(isFirst){
		showCoverBg();
		$('.vF-ClassChange').show();
	}
	var $vFClassChangeClose=$vFClassChange.find('.vF-ClassChange-close');
	$('.vF-ClassChange-btn').click(function(){
		showCoverBg();
		setTimeout(function(){
			$vFClassChange.fadeIn(300);
		},500);
		
	});
	
	$('.vF-ClassChange-btn').one('click',function(){
		isFirst=false;
		$vFClassChangeClose.show();
		$vFClassChange.find('.vf-ClassChange-btn-img').hide();
	})
	
	$vFClassChangeClose.click(function(){
		if(isFirst){
			return false;
		}
		$vFClassChange.fadeOut(300);
		setTimeout(function(){
			hideCoverBg();
		},500);
	});
	
	$vFClassChange.click(function(e){
		if(!$(e.target).is('.vF-ClassChange-box a,.vF-ClassChange-box a img,.vF-ClassChange-box a p,.vF-ClassChange-box a p span,.vF-ClassChange-box a p span i')){
			if(isFirst){
				showTips('请先选择身份', 5);
				return false;
			}
			$vFClassChange.fadeOut(300);
			setTimeout(function(){
				hideCoverBg();
			},500);
		}
	});
	
	$vFClassChange.find('a').click(function(){
		$vFClassChange.find('a.active').removeClass('active');
		$(this).addClass('active');
		if ($(this).attr("target") == "midFrame") {
		    $vFClassChange.fadeOut(300);
		    setTimeout(function(){
		    	hideCoverBg();
		    },500);		    
		}

	});
}

//背景
function showCoverBg(){
	$('#vF-coverBg').fadeIn(200);	
}
function hideCoverBg(){
	$('#vF-coverBg').fadeOut(200);	
}

//提示框
function showTips(msg, icon, url) {
    var _icon = 1;
    var _time = 1800;
    if (icon) {
        _icon = icon;
    }
    if (_icon == "6") {
        _time = 100000;
    }
    ZENG.msgbox.show('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', _icon, _time);
    if (url) {
        setTimeout(function () { window.location.href = url; }, _time);
    }
}

function hideTips(time) {
    var _time = 0;
    if (time) {
        _time = time;
    }
    ZENG.msgbox.hide(_time);
}
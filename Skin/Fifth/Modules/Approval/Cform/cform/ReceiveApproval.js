
/**
 * preDataArr数组
 * id:id
 * name:标题
 * class:class名
 * editId:编辑项id
 * Dom:放入的Dom元素
 */
var preDataArr=new Array();
preDataArr=[
		{id:0,name:"单行输入框",class:'item-single',editId:'0,1,7',Dom:''+
			'<li class="item item-single" data-typeid="0">'+
				'<span class="s-label"><span class="s1">单行输入框</span><sup class="color-red">*</sup></span>'+
				'<input type="text" class="s-placeholder" placeholder="请输入">'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:1,name:"多行输入框",class:'item-multi',editId:'0,1,7',Dom:''+
			'<li class="item item-multi active" data-typeid="1">'+
				'<span class="s-label"><span class="s1">多行输入框</span><sup class="color-red">*</sup></span>'+
				'<textarea class="s-placeholder" placeholder="请输入"></textarea>'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:2,name:"数字输入框",class:'item-number',editId:'0,1,2,7',Dom:''+
			'<li class="item item-number active" data-typeid="2">'+
				'<span class="s-label"><span class="s1">数字输入框</span><span class="s2"></span><sup class="color-red">*</sup></span>'+
				'<input type="number" class="s-placeholder" placeholder="请输入">'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:3,name:"单选框",class:'item-radio',editId:'0,3,7',Dom:''+
			'<li class="item item-radio item-radio-close active" data-typeid="3">'+
				'<span class="s-label"><span class="s1">单选框</span><sup class="color-red">*</sup></span>'+
				'<input type="radio" name=""  class="s-right">'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:4,name:"多选框",class:'item-check',editId:'0,3,4,7',Dom:''+
			'<li class="item item-check item-check-close active" data-typeid="4">'+
				'<span class="s-label"><span class="s1">多选框</span><sup class="color-red">*</sup></span>'+
				'<input type="checkbox" name=""  class="s-right">'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:5,name:"日期区间",class:'item-date-multi',editId:'0,0,5,7',Dom:''+
			'<li class="item item-date-multi active" data-typeid="5">'+
				'<div class="date-item date-item-begin">'+
					'<span class="s-label"><span class="s1">开始时间</span><sup class="color-red">*</sup></span>'+
					'<span class="s-right"><input type="date" name=""></span>'+
				'</div>'+
				'<div class="date-item date-item-end">'+
					'<span class="s-label"><span class="s1">结束时间</span><sup class="color-red">*</sup></span>'+
					'<span class="s-right"><input type="date" name=""></span>'+
				'</div>'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:6,name:"日期",class:'item-date',editId:'0,5,7',Dom:''+
			'<li class="item item-date active" data-typeid="6">'+
				'<div class="date-item">'+
					'<span class="s-label"><span class="s1">日期</span><sup class="color-red">*</sup></span>'+
					'<span class="s-right"><input type="date" name=""></span>'+
				'</div>'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:7,name:"照片",class:'item-pic',editId:'0,7',Dom:''+
			'<li class="item item-pic active" data-typeid="7">'+
				'<span class="s-label"><span class="s1">照片</span><sup class="color-red">*</sup></span>'+
				'<span class="s-right">&nbsp;</span>'+
				'<i class="s-close"></i>'+
			'</li>'},
		{id:8,name:"明细",class:'item-box',editId:'0,8',Dom:''+
			'<li class="item item-box active" data-typeid="8">'+
				'<div class="title s-label"><span class="s1">明细</span></div>'+
				'<ul class="list-in"></ul>'+
				'<div class="bottom">+增加明细</div>'+
				'<i class="s-close"></i>'+
			'</li>'},
	];
	
/**
 * EditDataArr数组
 * id:id
 * type:类型
 * title:标题
 * subtitle:副标题
 * limit:限制字数
 */
var EditDataArr=new Array();
EditDataArr=[
	{id:0,type:'text-1',title:'标题',subtitle:'最多10个字',limit:10},
	{id:1,type:'text-2',title:'提示文字',subtitle:'最多25个字',limit:25},
	{id:2,type:'text-3',title:'单位',subtitle:'最多5个字',limit:5},
	{id:3,type:'mulit-text',title:'选项',subtitle:'最多50项，每项不超过100字',limit:100},
	{id:4,type:'select',title:'最多选择'},
	{id:5,type:'dateformat',title:'日期类型'},
	{id:6,type:'pic',title:'上传图片'},
	{id:7,type:'checkbox',title:'必填'},
	{id:8,type:'text-4',title:'动作名称',subtitle:'最多10个字',limit:10},
];

var _winHeight=$(window).height();
var _winWidth=$(window).width();
$(function(){
	//中间
	var $midWrap_ul=$('.mid-wrap ul');
	var midWrap_ul_x=$midWrap_ul.offset().left,
		midWrap_ul_y=$midWrap_ul.offset().top;
	midInit();
	function midInit(){
		$midWrap_ul=$('.mid-wrap ul');
		$midWrap_ul.sortable({
			placeholder: "item item-highlight",
			distance:5,
			connectWith:'.mid-wrap ul',
			helper:function(Event,ui){
				//抓起时，根据typeid，返回一个设定的类型DOM
				var helper_typeid = ui.attr('data-typeid');
				if(typeof(helper_typeid)==='undefined'){return false;}
				var helper_name=preDataArr[helper_typeid].name;
				var _html="";
				if(ui.parents('.list-in').length>0){
					//在嵌套框内的控件
					var $itemBox=ui.parents('.item-box');
					_html='<div><span style="left:'+(Event.clientX-midWrap_ul_x-60)+'px;top:'+(Event.clientY-midWrap_ul_y-$itemBox.position().top-ui.position().top-55-20)+'px">'+helper_name+'</span></div>';
				}else{
					//不在嵌套框内的控件
					_html='<div><span style="left:'+(Event.clientX-midWrap_ul_x-60)+'px;top:'+(Event.clientY-midWrap_ul_y-ui.position().top-20)+'px">'+helper_name+'</span></div>';
				}
				return _html;
			},
			start:function (Event, ui){
				//抓起开始时
				$midWrap_ul.find('.dragging').removeClass('dragging');
				$midWrap_ul.find('.active').removeClass('active');
				ui.item.addClass('dragging active');
				var _typeid=ui.item.attr('data-typeid');
				edit_set(_typeid);
			},
			stop:function(Event,ui){
				//放下时
				var _typeid=ui.item.attr('data-typeid');
				if(_typeid==='8'&&ui.item.parents('.list-in').length>0){
					$midWrap_ul.sortable('cancel');
					
					//删除错误操作导致的遗留项
					if($midWrap_ul.find('div.active').length>0){
						$midWrap_ul.find('div.active').remove();
					}
				}
				$midWrap_ul.find('.dragging').removeClass('dragging');
				
				//删除错误操作导致的遗留项
				if($midWrap_ul.find('.ui-sortable-helper').length>0){
					$midWrap_ul.find('.ui-sortable-helper').remove();
				}
				
			},
			scroll:false
		}).disableSelection();
	}
	//中间 - 删除一个控件
	$midWrap_ul.on('click','.item .s-close',function(){
		if(confirm('确认删除')){
			$(this).parents('.item').eq(0).remove();
		}
	});
	
	//控件设置
	var $rightWrap=$('.right-wrap'),
		$rTitle_span=$('.right-wrap .r-title span'),
		$rBox=$('.right-wrap .r-box'),
		$rBox_1=$('.right-wrap .r-box-1');
	$midWrap_ul.on('click','.item',function(e){
		
		//TODO 如果点击嵌套框内的item，会执行2次本方法，需优化。
		
		var $this;
		if($(e.target).hasClass('item')){
			$this=$(e.target);
		}else{
			//为适配嵌套框控件，只取匹配到的第一个item为当前项 
			$this=$(e.target).parents('.item').eq(0);
			
		}
		
		$midWrap_ul.find('.active').removeClass('active');
		$this.addClass('active');
		
		//右侧联动
		var _typeid=$this.attr('data-typeid');
		edit_set(_typeid);
	});
	
	//右侧设置项
	function edit_set(_typeid){
		if(typeof(_typeid)==='undefined'){
			$rBox_1.empty();
			return false;
		}
		if(typeof(preDataArr[_typeid].editId)==='undefined'){
			$rBox_1.empty();
			return false;
		}
		var _editIdArr=preDataArr[_typeid].editId.split(',');//获取设置项
		
		var _html="";
		$.each(_editIdArr,function(i,val){
			var EditArr=EditDataArr[val];
			switch(EditArr.type){
				case 'text-1':
				case 'text-2':
				case 'text-3':
				case 'text-4':
					_html+='<div class="r-item r-text">'+
							  '<label class="title">'+EditArr.title+'<span class="subtitle">'+EditArr.subtitle+'</span></label>'+
							  '<div class="r-item-b">'+
								 '<input type="text" data-limit="'+EditArr.limit+'" class="input-text" />'+
							  '</div>'+
						   '</div>';
					break;
				case 'checkbox':
					_html+='<div class="r-item r-checkbox">'+
							   '<div class="r-item-b">'+
								 '<label class="checkbox-label">'+
									  '<input type="checkbox" class="input-checkbox" />'+EditArr.title
								 '</label>'+
							   '</div>'+
						   '</div>';
					break;
				case 'mulit-text':
					_html+='<div class="r-item r-item-radio">'+
							'<label class="title">选项<span class="subtitle">最多50项，每项不超过100字</span></label>'+
							'<div class="r-item-b">'+
								  '<div class="item-b-n">'+
									  '<input type="text" data-limit="'+EditArr.limit+'" class="input-text"/><i class="remove fa fa-minus-circle"></i><i class="add fa fa-plus-circle"></i>'+
								  '</div>'+
								  '<div class="item-b-n">'+
									  '<input type="text" data-limit="'+EditArr.limit+'" class="input-text"/><i class="remove fa fa-minus-circle"></i><i class="add fa fa-plus-circle"></i>'+
								  '</div>'+
								  '<div class="item-b-n">'+
									  '<input type="text" data-limit="'+EditArr.limit+'" class="input-text"/><i class="remove fa fa-minus-circle"></i><i class="add fa fa-plus-circle"></i>'+
								  '</div>';
					var _hiddenVal=$midWrap_ul.find('.active .input-hidden').val();
					if(typeof(_hiddenVal)!=='undefined'){
						var _hiddenValArr=_hiddenVal.split('&,'),
							_hiddenValArr_1;
						_hiddenValArr.shift();
						_hiddenValArr.pop();
						$.each(_hiddenValArr,function(i,val){
							if(val.split('&:')[0]==='3'){
								_hiddenValArr_1=val.split('&:')[1].split('&;');
								_hiddenValArr_1.pop();
							}
						});
						if(_hiddenValArr_1.length>3){
							$.each(_hiddenValArr_1,function(i){
								if(i>2){
								_html+='<div class="item-b-n">'+
										  '<input type="text" data-limit="'+EditArr.limit+'" class="input-text"/><i class="remove fa fa-minus-circle"></i><i class="add fa fa-plus-circle"></i>'+
										  '</div>';
								}
							});
						}
					}
					_html+='</div>'+
						  '</div>';
					break;
				case 'select':
					  _html+='<div class="r-item r-item-select">'+
								  '<label class="title">最多选择</label>'+
								  '<div class="r-item-b">'+
									  '<select>'+
										  '<option value="1">2</option>'+
										  '<option value="2">3</option>';
					var _hiddenValSel=$midWrap_ul.find('.active .input-hidden').val();
					if(typeof(_hiddenValSel)!=='undefined'){
						var _hiddenValSelArr=_hiddenValSel.split('&,');
						_hiddenValSelArr.shift();
						_hiddenValSelArr.pop();
						$.each(_hiddenValSelArr,function(i,val){
							if(val.split('&:')[0]==='4'){
								for(var j=3;j<(parseInt(val.split('&:')[1])+1);j++){
									_html+='<option value="'+j+'">'+(j+1)+'</option>';
								}
							}
						});
					}
					_html+= '</select>项'+
								  '</div>'+
							 '</div>';
									 
					break;
				case 'dateformat':
					_html+='<div class="r-item r-item-dateformat">'+
								'<label class="title">日期类型</label>'+
								'<div class="r-item-b">'+
									'<select>'+
										'<option value="0">年 - 月</option>'+
										'<option value="1">年 - 月 - 日</option>'+
										'<option value="2">年 - 月 - 日 - 时：分</option>'+
									'</select>'+
								'</div>'+
						   '</div>';
					break;
			}
		});
		
		//显示r-box-1
		$rTitle_span.removeClass('active');
		$rTitle_span.eq(0).addClass('active');
		$rBox.removeClass('active');
		$rBox_1.addClass('active');
		
		$rBox_1.html(_html);//放置设置项
		setByMid();//读取数据放入设置项
	}
		
	/*
	 *右侧操作
	 */
	//右侧 - 切换表单设置和控件设置
	$rTitle_span.click(function(){
		$rTitle_span.removeClass('active');
		$(this).addClass('active');
		$rBox.removeClass('active');
		$rightWrap.find('.'+$(this).attr('name')).addClass('active');
	});
	
	//右侧 - 单选框设置 - 删除一个选项
	$rBox_1.on('click','.r-item-radio .remove',function(){
		if(confirm('确认删除')){
			$(this).parents('.item-b-n').remove();
			reSelect();
		}
	});
	
	//右侧 - 单选框设置 - 添加一个选项
	$rBox_1.on('click','.r-item-radio .add',function(){
		$(this).parents('.item-b-n').after('<div class="item-b-n">'+
					'<input class="input-text"/><i class="remove fa fa-minus-circle"></i><i class="add fa fa-plus-circle"></i>'+
				'</div>');
		reSelect();
	});
	
	//根据选项数量重设select
	function reSelect(){
		var $rItemRadio=$('.r-item-radio');
		var $rItemSelect=$('.r-item-select select');
		if($rItemSelect.length>0){
			var _len=$rItemRadio.find('.item-b-n').length;
			var _lenSel=$rItemSelect.find('option').length;
			var _index=$rItemSelect.find('option:selected').index();
			if(_lenSel!==_len){
				var _selHtml='';
				for(var si=2;si<=_len;si++){
					_selHtml+='<option value="'+(si-1)+'">'+si+'</option>';
				}
				$rItemSelect.html(_selHtml);
				$rItemSelect.find('option').eq(_index).attr('selected',true);
			}
		}
	}
	
	//右侧 - text编辑框变化时同步
	$rBox_1.on('keyup','.r-item .input-text',function(){
		var $this=$(this);
		var _limit=$this.attr('data-limit');
		var $par=$this.parents('.r-item');
		if(JHshStrLen($this.val())>_limit*2){
			if(!$par.hasClass('wranning')){
				$par.addClass('wranning');
			}
		}else{
			if($par.hasClass('wranning')){
				$par.removeClass('wranning');
			}
		};
		setByRight();
	});
	$rBox_1.on('change','.r-item .input-checkbox,.r-item select',function(){setByRight();});
	
	/*
	 *根据右边同步 setByRight
	 */
	function setByRight(){
		var $midActive=$midWrap_ul.find('.active');
		var	_typeid=$midActive.attr('data-typeid');
		
		if(typeof(_typeid)==='undefined'||typeof(preDataArr[_typeid]).editId==='undefined'){return false;}
		
		var _editIdArr=preDataArr[_typeid].editId.split(','),
			_val='typeid&:'+_typeid+'&,',
			$inputHidden=$midActive.find('.input-hidden'),
			$rItem=$rBox_1.find('.r-item');
		if($inputHidden.length<1){
			$midActive.append('<input class="input-hidden"/>');
			$inputHidden=$midActive.find('.input-hidden');
		}
		$.each(_editIdArr,function(i,val){
			switch(val){
				case '0':
					//标题
					var _inputVal_0=$rItem.eq(i).find('.input-text').val();
					$midActive.find('.s-label').eq(i).find('.s1').text(_inputVal_0);
					_val+=val+'&:'+_inputVal_0+'&,';
					
					break;
				case '1':
					//提示文字
					var _inputVal_1=$rItem.eq(i).find('.input-text').val();
					$midActive.find('.s-placeholder').text(_inputVal_1);
					_val+=val+'&:'+_inputVal_1+'&,';
					break;
				case '2':
					//单位
					var _inputVal_2=$rItem.eq(i).find('.input-text').val();
					if($.trim(_inputVal_2)){
						_inputVal_2='('+_inputVal_2+')';
					}
					$midActive.find('.s-label .s2').text(_inputVal_2);
					_val+=val+'&:'+_inputVal_2+'&,';
					break;
				case '3':
					//多项输入框
					_val+=val+'&:';
					$rItem.eq(i).find('.input-text').each(function(){
						_val+=$(this).val()+'&;';
					});
					_val+='&,';
					break;
				case '4':
					//select
					_val+=val+'&:'+$rItem.eq(i).find('select').val()+'&,';
					$midActive.find('.s-placeholder').text('最多选'+(parseInt($rItem.eq(i).find('select').val())+1)+'个');
					break;
				case '5':
					//select
					_val+=val+'&:'+$rItem.eq(i).find('select').val()+'&,';
					break;
				case '7':
					//checkbox
					var _isChecked=$rItem.eq(i).find('input[type="checkbox"]')[0].checked;
					_val+=val+'&:'+_isChecked+'&,';
					if(_isChecked){
						if($midActive.find('sup.color-red').length===0){
							$midActive.find('.s-label').append('<sup class="color-red">*</sup>');
						}
					}else{
						$midActive.find('sup.color-red').remove();
					}
					break;
				case '8':
					var _inputVal_8=$rItem.eq(i).find('.input-text').val();
					if($.trim(_inputVal_8)){
						$midActive.find('div.bottom').text('+'+_inputVal_8);
					}else{
						$midActive.find('div.bottom').text(_inputVal_8);
					}
					_val+=val+'&:'+_inputVal_8+'&,';
					break;
			}	
		});
		$inputHidden.val(_val);
	}
	
	/*
	 *根据中间同步 setByMid
	 */
	function setByMid(){
		var $midActive=$midWrap_ul.find('.active');
		var _inputVal=$midActive.find('>.input-hidden').val();
		if(typeof(_inputVal)==='undefined'){return false;}
		var _inputValArr=_inputVal.split('&,');
		_inputValArr.shift();//删除第一项
		_inputValArr.pop();//删除最后一项
		$.each(_inputValArr,function(i,val){
			var _valArr=val.split('&:');
			var _rid=_valArr[0];
			
			switch(_rid){
				case '0':
				case '1':
				case '8':
					$rBox_1.find('.r-item').eq(i).find('.input-text').val(_valArr[1]);
					break;
				case '2':
					_valArr[1]=_valArr[1].substring(1,_valArr[1].length-1);
					$rBox_1.find('.r-item').eq(i).find('.input-text').val(_valArr[1]);
					break;
				case '3':
					var _valArr_3=_valArr[1].split('&;');
					_valArr_3.pop();
					$.each(_valArr_3,function(ai,aval){
						$rBox_1.find('.r-item').eq(i).find('.input-text').eq(ai).val(aval);
					});
					break;
				case '4':
				case '5':
					$rBox_1.find('.r-item').eq(i).find('select option').eq(_valArr[1])[0].selected=true;
					break;
				case '7':
					if(_valArr[1]==='true'){
						$rBox_1.find('.r-item').eq(i).find('.input-checkbox')[0].checked=true;
					}
					break;
			}
		});
	}
	
	//左侧 自由控件
	var $leftWrap=$( ".left-wrap");
	var $midWrap_ulList=$('.mid-wrap ul.list');
	var leftWrap_x=$leftWrap.offset().left,
		leftWrap_y=$leftWrap.offset().top;
	$( "#sortable_left").css('height',$leftWrap.height()-$leftWrap.find('h3').outerHeight());//适配高度
	$( "#sortable_left li" ).draggable({
		connectToSortable:'.mid-wrap ul',//移动到对应ul 
		helper:function(Event){
			//抓起时，根据typeid，返回一个设定的类型DOM
			var $curItem=$(Event.currentTarget);
			var helper_typeid = $curItem.attr('data-typeid');
			var helper_name=preDataArr[helper_typeid].name;
			var _html='<div><span style="left:'+(Event.clientX-leftWrap_x-$curItem.position().left-60)+'px;top:'+(Event.clientY-leftWrap_y-$curItem.position().top-20)+'px">'+helper_name+'</span></div>';
			return _html;
		},
		start:function(){
			$leftWrap.addClass('zindex-top');
		},
		stop:function(Event){
			$leftWrap.removeClass('zindex-top');
			var $divActive=$midWrap_ul.find('div.active');
			if($divActive.length>0){
				var $curItem=$(Event.target);
				var helper_typeid = $curItem.attr('data-typeid');
				if(helper_typeid==='8'&&$divActive.parents('.list-in').length>0){
					//如果目标为嵌套框，拖入的控件也为嵌套框，则不替换正确控件，并删除
					$divActive.remove();//删除div.active
				}else{
					//替换正确的控件Dom
					var helper_Dom=preDataArr[helper_typeid].Dom;
					
					$divActive.after(helper_Dom).next().addClass('active');//插入Dom并active
					$midWrap_ulList.animate({'scrollTop':$divActive.position().top+$midWrap_ulList.scrollTop()-100},500);
					$divActive.remove();//删除div.active
					edit_set(helper_typeid);//调出控件设置项
					//$midWrap_ul.sortable( "destroy" );
					midInit();
				}
			}
			if($midWrap_ul.find('.ui-sortable-helper').length>0){
				$midWrap_ul.find('.ui-sortable-helper').remove();
			}
		},
		scroll:false
	}).disableSelection();
	
});

function JHshStrLen(sString){  
	var sStr,iCount,i,strTemp;
	iCount = 0 ;  
	sStr = sString.split("");  
	for (i = 0 ; i < sStr.length ; i ++){  
		strTemp = escape(sStr[i]);  
		if (strTemp.indexOf("%u",0) == -1){  
			iCount = iCount + 1 ;  // 英文 
		}  
		else{ 
			iCount = iCount + 2 ; // 汉字  
		}  
	}  
	return iCount ;  
}

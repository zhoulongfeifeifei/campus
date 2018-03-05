
/*
 *usage
 		//显示
 		$.AlerMsg({
			status: 'show',
			title:'标题',
			msg:'内容',
			type:'textarea',    //confirm , textarea
			placeholder:null,
			okColor:null,
			cancelColor:null,
			cancel:function(data){},
			okCheck:function(){ return true},//点击确认时需要做的验证
			ok:function(){}
		})
		
		//隐藏
		$.AlerMsg({
			status:'hide',              //显示或隐藏，默认为show
		})
 */

(function (window, document) {
	var $AlerMsg,$t,$b,$f,$close;
    init(); //初始化
	$AlerMsg=$('#AlerMsg');
	$t=$AlerMsg.find('h3.t');
	$b=$AlerMsg.find('.b');
	$f=$AlerMsg.find('.f');
	$close=$AlerMsg.find('.close');
    function init() {
        _html = '   <!--弹出框-->' +
				 '<div id="AlerMsg">' +
                      '<div class="AlerMsgBg"></div>' +
					  '<div class="AlerMsgBox">' +
						  '<h3 class="t"></h3>' +
						  '<div class="b"></div>' +
						  '<div class="f"><a class="cancel">取消</a><a class="ok">确定</a></div>' +
						  '<span class="close"><i class="fa fa-close"></i></span>'+
					  '</div>' +
				  '</div>' +
				  '<!--End 弹出框-->';
        AlerHTML = document.createElement('div');
        AlerHTML.innerHTML = _html;
        document.body.appendChild(AlerHTML);
    }
	
	
	
    var opts;
    $.AlerMsg = function (options) {
        var defaults = {
            status: 'show',
			type:'confirm',//confirm,textarea
            title: '提示',
            msg: null,
			placeholder:null,
			okColor:null,//确认按钮颜色
			cancelColor:null,//取消按钮颜色
			cancel:function(){},
			okCheck:function(){ return true},//点击确认时需要做的验证
			ok:function(data){}
        };
        opts = $.extend({}, defaults, options);

		

        if (opts.status == 'show') {
            show_box(opts);
        } else {
            hide_box();
        };
		
		//按钮颜色
		if(opts.okColor){
			$f.find('.ok').css('background',opts.okColor);
		};
		if(opts.cancelColor){
			$f.find('.cancel').css('background',opts.cancelColor);
		};
		
		$close.click(function(){
			hide_box();
			opts.cancel();
		});
		
		$f.find('.cancel').unbind('click').click(function(){
			hide_box();
			opts.cancel();
		})
		
		$f.find('.ok').unbind('click').click(function(){
			if(opts.okCheck($b.find('textarea').val())){
				hide_box();
				opts.ok($b.find('textarea').val());
			}
		})
    }

    function show_box(opts) {
		
		$AlerMsg.show();
		$t.text(opts.title);
		$b.html(opts.msg);
		if(opts.type=='textarea'){
			$b.append('<textarea placeholder="'+opts.placeholder+'"></textarea>');
		}
    }
    function hide_box() {
		$('#AlerMsg').fadeOut(300);
    }
})(window, document);
var SCHOOLID=getCookieByUserInfo("schoolid");
var getSchool ={url:"School/SchoolInfo",type:"get",data:{schoolId:SCHOOLID}};
//DataCenter("学校类型", $("#form1 select[name='type']"),type);
commonFn(getSchool,function(data){
	for(key in data) {
		$("#" + key).val(data[key]);
	}
	$("input[name='school_id']").val(data.school_id);
	$("#logo_img").attr("src",data.logo);
	$("#logo_val").val(data.logo);
	//DataCenter("最高学制", $("#form1 select[name='yearlength']"));
	var type = data.type.substring(0, 1);
	DataCenter("学校类型", $("#form1 select[name='type']"),type);
	if(type==7){
		$("#type_t").show();
		var type_t = data.type.substring(1, 100);
		$("#type_t").val(type_t);
	}else{
		$("#type_t").hide().val("");
	}
	var ids = data.area; 
	var sheng = ids.substring(0, 2);
	var shi = ids.substring(0, 4);
	diqu(0,"#sheng",sheng);//获取地区省
	if(sheng){
		diqu(sheng, "#shi",shi);
	}
	if(shi){
		
		diqu(shi, "#qu",ids);
	}
	var xz= data.school_address.split(",");
	$("#school_address").val(xz[0]);
	if(xz.length>1){
		$.each(xz,function(i,n){
			if(i>0){
				$(".allxz").append(getaLL("xz",n));
			}
		})
	}
	var tel=  data.school_tel.split(",");
		$("#school_tel").val(tel[0]);
	if(tel.length>1){
		$.each(tel,function(i,n){
			if(i>0){
				$(".alltel").append(getaLL("tel",n));
			}
		})
	}
	var cz= data.fax.split(",");
		$("#fax").val(cz[0]);
	if(cz.length>1){
		$.each(cz,function(i,n){
			if(i>0){
				$(".allcz").append(getaLL("cz",n));
			}
		})
	}
	var yx= data.email.split(",");
		$("#email").val(yx[0]);
	if(yx.length>1){
		$.each(yx,function(i,n){
			if(i>0){
				$(".allyx").append(getaLL("yx",n));
			}
		})
	}
	if(data.msgTypes){
		var msgTypes=data.msgTypes.split(',');
		$.each(msgTypes,function(i,n){
			$("input[type='checkbox'][value='"+n+"']").attr('checked',"checked");
		})
		$("input[type='checkbox']").attr("disabled","disabled");
	}
	form.render();
});
/////保存
 form.on('submit(save)',function(data){
		var bb=data.field;
		//var bb = aa($("#form0"));
		var xzl=$(".allxz").find("input").length;
		var tell=$(".alltel").find("input").length;
		var czl=$(".allcz").find("input").length;
		var yxl=$(".allyx").find("input").length;
			bb.school_address=getarr($(".allxz"));
			bb.school_tel=getarr($(".alltel"));
			bb.fax=getarr($(".allcz"));
			bb.email=getarr($(".allyx"));
		var saveSchool ={url:"School/SaveSchool",data: bb,type:"post"};
		commonFn(saveSchool,function(data){
				layer.msg("保存成功", { time: 1000 }, function() {
					 location.reload();
				});
		})
});
function getarr(name){
	var inps=$(name).find("input");
	var allarr='';
	$.each(inps, function(i,n) {
		if(i==0){
			allarr=$(n).val();
		}else if(i>0){
			allarr+=","+$(n).val();
		}
	});
	return allarr;
}

//自定义验证规则
form.verify({
    english: [/^$|^[A-Za-z ]*$/, '英文名称格式不正确']
    ,code: [/^$|^[1-9][0-9]{5}$/, '邮编格式不正确']
    ,tel: [/^$|^(\d{3,4}-)?\d{7,8}$/, '电话格式不正确']
    ,fax: [/^$|^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/, '传真格式不正确']
    ,email: [/^$|^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确']
    ,web: [/^$|^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/, '网址格式不正确']
  });
  
//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})
  //监听提交
form.on('submit(save1)',function(data){
	var bb=data.field;
	if($("#type").val()==7){
		bb.type=$("#type").val()+$("#type_t").val();
	}
	var saveSchool ={url:"School/SaveSchool",data: bb,type:"post"};
	commonFn(saveSchool,function(data){
			layer.msg("保存成功", { time: 1000 }, function() {
				 location.reload();
			});
		})
    return false;
});
form.on('submit(save2)',function(data){
	var bb=data.field;
	var saveSchool ={url:"School/SaveSchool",data: bb,type:"post"};
	commonFn(saveSchool,function(data){
				layer.msg("保存成功", { time: 1000 }, function() {
					 location.reload();
				});
				
		})
    return false;
});



//获取地区市
form.on('select(sheng)', function(data){
  diqu(data.value,"#shi");
  $("#qu").html("<option value=''></option>")
}); 
//获取地区县/区
form.on('select(shi)', function(data){
  diqu(data.value,"#qu");
}); 

//添加一条记录
$(".addone").on('click',function(){
	var types=$(this).attr('data-type');
	$(this).parent().parent().parent().append(getaLL(types,''));
})
function getaLL(model,val){
	switch(model){
		case "xz":
		return '<div class="layui-form-item" >'+
				'<label class="layui-form-label">校址：</label>'+
				'<div class="layui-input-inline">'+
					'<input type="text" class="layui-input"  name="school_address" placeholder="请输入校址" value="'+val+'">'+
						  
				'</div>'+
				'<div class="addbox">'+
					'<a class="dele" href="JavaScript:;">删除</a>'+
				'</div>'+
			'</div>';
		break;
		case "tel":
		return '<div class="layui-form-item" >'+
								'<label class="layui-form-label">电话：</label>'+
								'<div class="layui-input-inline">'+
									'<input type="text" class="layui-input"  name="school_tel" placeholder="请输入电话" value="'+val+'" lay-verify="phone">'+
										  
								'</div>'+
								'<div class="addbox">'+
									'<a class="dele" href="JavaScript:;">删除</a>'+
								'</div>'+
							'</div>';
		break;
		case "cz":
		return '<div class="layui-form-item" >'+
								'<label class="layui-form-label">传真：</label>'+
								'<div class="layui-input-inline">'+
									'<input type="text" class="layui-input"  name="fax" placeholder="请输入传真" value="'+val+'" lay-verify="phone">'+
										  
								'</div>'+
								'<div class="addbox">'+
									'<a class="dele" href="JavaScript:;">删除</a>'+
								'</div>'+
							'</div>';
		break;
		case "yx":
		return '<div class="layui-form-item" data-id="0">'+
							'<label class="layui-form-label">邮箱：</label>'+
							'<div class="layui-input-inline">'+
								'<input type="text" class="layui-input"  name="email" placeholder="请输入邮箱" value="'+val+'" lay-verify="email">'+
									  
							'</div>'+
							'<div class="addbox">'+
								'<a class="dele" href="JavaScript:;">删除</a>'+
							'</div>'+
						'</div>';
		break;
	}
}
//删除一条记录
$("body").on("click",'.dele',function(){
	$(this).parent().parent().remove();
})
//学校类型如选择‘其他’输入框显示
form.on('select(leixing)', function(data){
  	if(data.value==7){
		$("#type_t").show();
	}else{
		$("#type_t").hide().val("");
	}
}); 

//上传logo
layui.upload({
    url: 'http://60.190.202.49:1000/api/Common/UploadFile'
    ,elem: '#logo_file' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,success: function(res){
      	if(res.status == 1) {
			layer.msg("上传成功！", { time: 1000 }, function() {
				$("#logo_img").attr("src", res.data)
				$("#logo_val").val(res.data);
			});
		} else {
			layer.msg(res.message, { time: 1000 });
		}
    }
 });

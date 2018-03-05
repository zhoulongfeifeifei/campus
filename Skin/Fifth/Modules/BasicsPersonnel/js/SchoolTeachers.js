var Status=1,Isout=0,groupId=0;
issc=true;
var menu;
var actionNodeID;
var actionNodeName;
var SCHOOLID=getCookieByUserInfo("schoolid");
var USERID=getCookieByUserInfo("userid");
var t;//新增教师所在部门树
var groupsidtea=[];
var groupsnametea=[];
//自定义验证规则
form.verify({
    phone: [/^[1][358][0-9]{9}$/, '手机号格式不正确']  //必填
    ,phone2: [/^$|^[1][358][0-9]{9}$/, '手机号格式不正确'] //可为空
    ,email: [/^$|^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确']
    ,idcard: [/^$|^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, '身份证格式不正确']
  });
  
//及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})
 //及时表单验证
$("input").on("blur",function(){
	var $this=$(this);                  //当前input
	var name=$this.attr("lay-verify");  //当前验证类型  例：phone
	var vlaue=$this.val();              //当前input的值 
	validate(name, vlaue,$this);		//验证方法调用
})

//模态框tab切换
$("#nav_tab li").on("click", function() {
	$(this).addClass("active").siblings().removeClass("active");
	var tar = $(this).attr("data-toggle");
	$("#" + tar).addClass("active").siblings().removeClass("active");
	Status = $(this).attr("data-status");
	Isout = $(this).attr("data-isout");
	var pageindex = window.localStorage.getItem("PageIndex");
	teacher(pageindex,Status,Isout,groupId);
})

//侧导航获取全部教师			
$("body").on('click',".nav_title",function(){
	groupId=0;
	var pageindex = window.localStorage.getItem("PageIndex");
	teacher(pageindex,Status,Isout,groupId);
	$(".text-title span").html("教师管理");
})
		/**************侧导航*********************/
var getgrouptree ={url:"Teacher/GetTeaGroupListTree",data:{schoolId:SCHOOLID},type:"get"};
commonFn(getgrouptree,function(data){
	menu = $.ligerMenu({
		top: 100,
		left: 100,
		width: 120,
		items:            [         
			            { line: true },  { text: '暂无功能', click:function(){}  }           
		]
	});
	$(".nav_main .nav_list").ligerTree({  
         data:data, 
         checkbox:false,
         isExpand: false,
         autoCheckboxEven:false,
         idFieldName :'id',
         parentIDFieldName :'pid',
         onSelect:function(note){
         	groupId=note.data.id;
         	var name=note.data.text;
         	$(".text-title span").html("教师管理 > "+name);
         	var pageindex = window.localStorage.getItem("PageIndex");
         	teacher(pageindex,Status,Isout,groupId);
         },onContextmenu: function(node, e) {               
			actionNodeName = node.data.text;               
			actionNodeID = node.data.id;               
			menu.show({ top: e.pageY, left: e.pageX });               
			return false;           
		}
     })
});
		
teacher(1,Status,Isout,groupId);		
/*************老师列表信息显示*********************/
function teacher(current,Status,Isout,groupId,name,numbers,phone,iDcard) {
	var getteacherlist ={url:"Teacher/GetTeacherList",data: {
			PageIndex : current,
			status: Status,
			isout:Isout,
			groupid:groupId,
			name:name,
			number:numbers,
			phone:phone,
			idcard:iDcard,
			schoolId:SCHOOLID
		},type:"post"};
	commonFn(getteacherlist,function(data){
			laypage({
                cont: 'page',
                pages: data.pageCount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr : data.pageIndex,
                groups: 5,
                jump: function(e, first){ //触发分页后的回调
                    if(!first){ //一定要加此判断，否则初始时会无限刷
                      teacher(e.curr,Status,Isout,groupId);
                    }
                },
                skin: 'molv', //皮肤
                first: '首页', //将首页显示为数字1,。若不显示，设置false即可
                last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
                prev: false, //若不显示，设置false即可
                next: false //若不显示，设置false即可
            });
            var num=data.pageIndex;
            window.localStorage.setItem("PageIndex",num);
            var index = 1;
            var row=1;
			var data = data.resultData;
			if(num>1){
				index=1;
            	row=parseInt(String(num-1)+String(index));
            }
			if(Status==1&&Isout==0){
				$("#table thead").empty();
				$("#table thead").html(
							'<tr>'+
								'<th>序号</th>'+
								'<th><input type="checkbox" class="qx" value="" /></th>'+
								'<th>教师姓名</th>'+
								'<th>教职工编号</th>'+
								'<th>性别</th>'+
								'<th>手机号</th>'+
								'<th>所在部门</th>'+
								'<th>任教班级</th>'+
								'<th>任职</th>'+
								'<th>操作</th>'+
							'</tr>');
				$("#table tbody").empty();	
				var sClass="";
				var sub="";
				$.each(data, function(i, n) {
						$.each(n.classInfo,function(z,x){
							sClass+='<span>'+x.className+'</span><br/>';
							sub+='<span>'+x.userTypeName+'</span><br/>';
						})
						var GroupXml='';
						var GroupIDs=[];
						var GroupName='';
						$(n.groupXml).each(function(i,ele){
							var name=$(ele).find("groupName").text();//取得属性的方法 
							var id=$(ele).find("groupId").text();//取得属性的方法 
							GroupXml +=name+",";
							GroupIDs.push(id);
							GroupName += '<span>' + name + '</span><br/>';
						})
						$("#table tbody").append(
							'<tr data-id="' + n.teacherId + '">' +
							'<td >' + row + '</td>' +
							'<td ><input type="checkbox" name="" data-id="' + n.teacherId + '" id="" value="" /></td>' +
							'<td >' + isNull(n.name) + '</td>' +
							'<td >' + isNull(n.number) + '</td>' +
							'<td >' + isNull(n.gender) + '</td>' +
							'<td >' +isNull( n.phone) + '</td>' +
							'<td >' + GroupName + '</td>' +
							'<td >' + sClass + '</td>' +
							'<td >' + sub + '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;"  data-id="' + n.teacherId + '" data-groupid="'+GroupIDs+'" data-groupname="'+GroupXml+'" data-operation="AjaxTeacher.EditTeacher" class="layui-btn layui-btn-mini yinc bj">编辑</a>' +
							'<a href="javascript:;" data-id="' + n.teacherId + '" data-operation="AjaxTeacher.StopTeacher" class="  yinc layui-btn layui-btn-mini layui-btn-danger stop">停用</a>' +
//							'<a href="javascript:;" data-id="' + n.userId + '" data-operation="AjaxTeacher.StopTeacher" class="  yinc layui-btn layui-btn-mini layui-btn-warm Reset">重置</a>' +
							'</td>' +
							'</tr>');
							row++;
					sClass="";
					sub="";
					GroupXml="";
				});
			}else if(Status==0&&Isout==0){
				$("#table thead").empty();
				$("#table thead").append(
							'<tr>'+
								'<th>序号</th>'+
								'<th><input type="checkbox" class="qx" value="" /></th>'+
								'<th>教师姓名</th>'+
								'<th>教职工编号</th>'+
								'<th>性别</th>'+
								'<th>手机号</th>'+
								'<th>操作</th>'+
							'</tr>');
				$("#table tbody").empty();			
					$.each(data, function(i, n) {
						var GroupXml='';
						var GroupIDs=[];
						$(n.groupXml).each(function(i,ele){
							var name=$(ele).find("groupName").text();//取得属性的方法 
							var id=$(ele).find("groupId").text();//取得属性的方法 
							GroupXml +=name+",";
							GroupIDs.push(id);
						})
						$("#table tbody").append(
							'<tr data-id="' + n.teacherId + '">' +
							'<td >' + row + '</td>' +
							'<td ><input type="checkbox" name="" data-id="' + n.teacherId + '" id="" value="" /></td>' +
							'<td >' +isNull( n.name )+ '</td>' +
							'<td >' +isNull( n.number )+ '</td>' +
							'<td >' +isNull(  n.gender )+ '</td>' +
							'<td >' +isNull(  n.phone )+ '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;"  data-id="' + n.teacherId + '" data-groupid="'+GroupIDs+'" data-groupname="'+GroupXml+'" data-operation="AjaxTeacher.EditTeacher" class="layui-btn layui-btn-mini yinc bj">编辑</a>' +
							'<a href="javascript:;" data-id="' + n.teacherId + '" data-operation="AjaxTeacher.DeleteTeacher" class="  yinc layui-btn layui-btn-mini layui-btn-danger  cdsc">删除</a>' +
							'</td>' +
							'</tr>');
							row++;
					})
					
			}else if(Status==1&&Isout==1){
				$("#table thead").empty();
					$("#table thead").append(
							'<tr>'+
								'<th>序号</th>'+
								'<th><input type="checkbox" class="qx" value="" /></th>'+
								'<th>教师姓名</th>'+
								'<th>教职工编号</th>'+
								'<th>性别</th>'+
								'<th>手机号</th>'+
								'<th>调岗原因</th>'+
								'<th>调岗时间</th>'+
								'<th>操作</th>'+
							'</tr>');
					$("#table tbody").empty();
					$.each(data, function(i, n) {
						var GroupXml='';
						var GroupIDs=[];
						$(n.groupXml).each(function(i,ele){
							var name=$(ele).find("groupName").text();//取得属性的方法 
							var id=$(ele).find("groupId").text();//取得属性的方法 
							GroupXml +=name+",";
							GroupIDs.push(id);
						})
						$("#table tbody").append(
							'<tr data-id="' + n.teacherId + '">' +
							'<td >' + row + '</td>' +
							'<td ><input type="checkbox" name="" data-id="' + n.teacherId + '" id="" value="" /></td>' +
							'<td >' +isNull( n.name )+ '</td>' +
							'<td >' +isNull( n.number )+ '</td>' +
							'<td >' +isNull( n.gender )+ '</td>' +
							'<td >' + isNull(n.phone )+ '</td>' +
							'<td >' +isNull( n.changeJob) + '</td>' +
							'<td >' + solveTime(n.changeJobTime) + '</td>' +
							'<td class="Operation">' +
							'<a href="javascript:;"  data-id="' + n.teacherId + '"  data-groupid="'+GroupIDs+'" data-groupname="'+GroupXml+'" data-operation="AjaxTeacher.EditTeacher" class="layui-btn layui-btn-mini yinc bj">编辑</a>' +
							'<a href="javascript:;" data-id="' + n.teacherId + '" data-operation="AjaxTeacher.DeleteTeacher" class="  yinc layui-btn layui-btn-mini layui-btn-danger  cdsc">删除</a>' +
							'</td>' +
							'</tr>');
							row++;
						})
					
					
			}
			quanxian();
	})
}


//全选 
$("body").on("change", ".qx",function() {
	AllSelect(this);
})

			
//获取查询时部门列表
var grouplists ={url:"Teacher/GetTeaGroupListTree",data:{schoolId:SCHOOLID},type:"get"};
commonFn(grouplists,function(data){
	if(data){
		$.each(data, function (i, n) {
		    $(".nav_lists").append('<option value="+n.group_id+">'+n.group_name+'</optin>');
		    var s = showMenu("____",n);
		    $(".nav_lists").append(s);
		})
	}
})
function showMenu(space,menu)
{
    var options = "";
    if(menu.Children!=null){
        $.each(menu.Children, function (j, z) {
            options += '<option value="'+z.group_id+'">'+space+z.group_name+'</optin>';
            options += showMenu(space + "______", z);
        });
    }
    return options;
}

/************停用一条记录*******************/
$("body").on("click", ".Operation .stop", function() {
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要停用该记录吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Teacher/StopTeacher",data:{
				teacher_id: roId,
				schoolId:SCHOOLID
			},type:"get"};
	  commonFn(dele,function(data){
	  	layer.msg('停用成功',{time:1000},function(){
	  		var pageindex = window.localStorage.getItem("PageIndex");
			teacher(pageindex,Status,Isout,groupId);
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
})

////				/*批量停用列表*/
$("#plty").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
		if(inputs.length <= 0) {
			layer.msg("至少选择一名教师");
		} else {
			layer.confirm('你确定要停用以下记录吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
				var Ids='';
				$.each(inputs,function(i, n) {
					var id=$(n).attr("data-id");
					if(i==0){
						Ids=id;
					}else if(i>0){
						Ids+=","+id;
					}
				});
				  var dele ={url:"Teacher/StopTeacher",data:{
				teacher_id: Ids,
				schoolId:SCHOOLID
			},type:"get"};
				  commonFn(dele,function(data){
				  	layer.msg("停用成功", { time: 1000 }, function() {
						var pageindex = window.localStorage.getItem("PageIndex");
						teacher(pageindex,Status,Isout,groupId);
						$('thead input').removeAttr("checked");
						$('tbody input').removeAttr("checked");
					});
				  })
			}, function(){
			  layer.closeAll();
			});
		}
})
//新增教师所在部门相关操作
$('#icon').on('click',function(){
	if($('#teagroups .layui-unselect').hasClass("layui-form-selected")){
		$('#teagroups .layui-unselect').removeClass("layui-form-selected");
		$("#Grouptree").hide();
	}else{
		$('#teagroups .layui-unselect').addClass("layui-form-selected");
		$("#Grouptree").show();
	}
})

$("#Grouptree").mouseleave(function(){
	$('#teagroups .layui-unselect').removeClass("layui-form-selected");
	$("#Grouptree").hide();
	t.alert();
    $("#groupsname").val(groupsnametea.join(","));
})

  
//添加初始化
$('#add_ls').on("click",function(){
	layer.open({
	  type:1,
        title:"添加教师",
        content:$('#jsxx'),
        area:['800px','560px'],
       	cancel: function(){ 
        	$('#jsxx').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
	$(".form88 input").val("");
	$("#groupsname").val('');
	$(".form88 img").attr("src","");
	$(".form88 input[name='id']").val(0);
	var getteanum ={url:"Teacher/PostTeaNumber",data:{schoolId:SCHOOLID},type:"get"};
  	commonFn(getteanum,function(data){
		$("#Number").val(data);
	})
  	$(".form88 input[name='userid']").val(USERID);
	Selects();
	diqu(0,"#sheng");
	$("#qu").html("<option value=''></option>");
	$("#shi").html("<option value=''></option>");
	form.render();
	GetGroupTree();
})

//新增教师保存
form.on('submit(save1)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	if(groupsidtea.length>0){
		bb.groupid=groupsidtea.join(",");
	}else{
		bb.groupid='0';
	}
	var addtea ={url:'Teacher/AddEditTeacher',data: bb,type:"post"};
	commonFn(addtea,function(data){
            layer.msg("保存成功", { time: 1000 }, function() {
            	layer.closeAll();
                var pageindex = window.localStorage.getItem("PageIndex");
                teacher(pageindex, Status, Isout, groupId);
            });
		})
    return false;
});
	
	/*编辑老师信息*/
$("body").on("click", ".Operation .bj", function() {
	layer.open({
	  type:1,
	    title:"添加教师",
	    content:$('#jsxx'),
	   area:['800px','560px'],
	   cancel: function(){ 
        	$('#jsxx').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
	$(".jsxx input").val("");
	$(".jsxx img").attr("src", '');
	$("#groupsname").val("");
	$("#qu").html("<option value=''></option>");
	$("#shi").html("<option value=''></option>");
	var Ids = $(this).attr("data-id");
	var groupids = $(this).attr("data-groupid");
	var groupnames = $(this).attr("data-groupname");
	$("#jsxx input[name='id']").val(Ids);
	var gettea ={url:"Teacher/GetATeacher",data: {
			teacherid:Ids,status:1,schoolId:SCHOOLID
		},type:"get"};
	commonFn(gettea,function(data){
		for(key in data) {
			$("#jsxx input[name='" + key + "']").val(data[key]);
		}
		Selects(data.gender,data.nationality,data.nation,data.lengthYear,data.polityFace);
		var ids='';
		var sheng='';
		var shi='';
		if(data.native){
			ids = data.native; 
			sheng = ids.substring(0, 2);
			shi = ids.substring(0, 4);
			diqu(0,"#sheng",sheng);//获取地区省
			diqu(sheng, "#shi",shi);
			diqu(shi, "#qu",ids);
		}
		$("#jsxx .photo").attr("src", data.face);
		$("#jsxx input[name='userId']").val(data.userId);
		GetGroupTree(groupids);
		$("#groupsname").val(groupnames);
	})
})

///上传照片
layui.upload({
  	url: window.apiUrl+'Common/UploadFile'
    ,elem: '#UploadBtn' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,success: function(res){
      	if(res.status == 1) {
			layer.msg("上传成功！", { time: 1000 }, function() {
				$(".photo").attr("src", res.data)
				$("input[name='face']").val(res.data);
			});
		} else {
			layer.msg(res.message, { time: 1000 });
		}
    }
 });
			


//锁定账户和已调岗里的彻底删除
$("body").on("click",".cdsc",function(){
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要删除该记录吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Teacher/DeleteTeacher?teacher_id="+roId+"&schoolId="+SCHOOLID,type:"delete"};
	  commonFn(dele,function(data){
	  	layer.msg('删除成功',{time:1000},function(){
	  		var pageindex = window.localStorage.getItem("PageIndex");
			teacher(pageindex,Status,Isout,groupId);
	  	});
	  })
	}, function(){
	  layer.closeAll();
	});
})

//				/*锁定账户和已调岗里的批量删除列表*/
$(".plsc").on("click", function() {
var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一名教师");
	} else {
		layer.confirm('你确定要删除以下记录吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Ids='';
			$.each(inputs,function(i, n) {
				var id=$(n).attr("data-id");
				if(i==0){
					Ids=id;
				}else if(i>0){
					Ids+=","+id;
				}
			});
			  var dele ={url:"Teacher/DeleteTeacher?teacher_id="+Ids+"&schoolId="+SCHOOLID,type:"DELETE"};
			  commonFn(dele,function(data){
			  	layer.msg("删除成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
					teacher(pageindex,Status,Isout,groupId);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
		}, function(){
		  layer.closeAll();
		});
	}
})


//			//锁定账户，已调岗里批量还原记录
$("#huyan").on("click", function() {
	var inputs = $('tbody input[type="checkbox"]:checked');
	if(inputs.length <= 0) {
		layer.msg("至少选择一名教师");
	} else {
		layer.confirm('你确定要批量还原这些记录吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(){
			var Ids='';
			$.each(inputs,function(i, n) {
				var id=$(n).attr("data-id");
				if(i==0){
					Ids=id;
				}else if(i>0){
					Ids+=","+id;
				}
			});
			  var dele ={url:"Teacher/BackTeacher",data:{
			  	teacher_id: Ids,schoolId:SCHOOLID
			  },type:"get"};
			  commonFn(dele,function(data){
			  	layer.msg("还原成功", { time: 1000 }, function() {
					var pageindex = window.localStorage.getItem("PageIndex");
					teacher(pageindex,Status,Isout,groupId);
					$('thead input').removeAttr("checked");
					$('tbody input').removeAttr("checked");
				});
			  })
		}, function(){
		  layer.closeAll();
		});
	}
	
})

//批量调岗弹窗
$("#dg").on("click",function(){
	var len=$('tbody input[type="checkbox"]:checked').length;
	if(len<=0){
		layer.msg("至少选择一名教师");
	}else{
		layer.open({
		  type:1,
		    title:"批量调岗",
		    content:$('#jstg'),
		    area:['340px','220px'],
		    cancel: function(){ 
        	$('#jstg').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
		});
	}
})

////有效里批量调岗保存
form.on('submit(save8)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var inputs=$('tbody input[type="checkbox"]:checked');
	$.each(inputs,function(i, n) {
		var id=$(n).attr("data-id");
		if(i==0){
			bb.teacherId=id;
		}else if(i>0){
			bb.teacherId+=","+id;
		}
	});
	var addtea ={url:'Teacher/OutTeacher',data: bb,type:"post"};
	commonFn(addtea,function(data){
        layer.msg("调岗成功", { time: 1000 }, function() {
        	layer.closeAll();
        	$('#jstg').hide();
            var pageindex = window.localStorage.getItem("PageIndex");
            teacher(pageindex, Status, Isout, groupId);
        });
	})
    return false;
});



//导出所有选中的老师
var arr=[];
$(".pldc").on("click",function(){
		if($('tbody input[type="checkbox"]:checked').length<=0){
		layer.msg("至少选择一名教师");
	}else{
		$('tbody input[type="checkbox"]:checked').each(function(i, n) {
			var id=$(this).attr("data-id");
			arr.push(id);
		})
		var ids=arr.join(","); 
		window.location.href=window.siteHost+"Filedown/TeaTemplateExport?id="+ids+"&schoolId="+SCHOOLID; 
		$('thead input').removeAttr("checked");
		$('tbody input').removeAttr("checked");
	}
})


			

//查询弹出框
$('.allseach').on("click",function(){
	layer.open({
	  type:1,
	    title:"精确查询",
	    content:$('#gjss'),
	   area:['360px','360px'],
	   cancel: function(){ 
        	$('#gjss').hide();
		    //return false 开启该代码可禁止点击该按钮关闭
		 }
	});
})
////精确查询带验证
form.on('submit(search)',function(data){
    var name=$("#gjss input[name='name']").val();
	var numbers=$("#gjss input[name='number']").val();
	var phone=$("#gjss input[name='phone']").val();
	var iDCard=$("#gjss input[name='idCard']").val();
	var pageindex = window.localStorage.getItem("PageIndex");
	teacher(pageindex,Status,Isout,groupId,name,numbers,phone,iDCard);
	 layer.closeAll();
    return false;
});

//重置密码
$("body").on("click",".Reset",function(){
	var roId = $(this).attr("data-id");
	layer.confirm('你确定要重置该老师的密码吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(){
	  var dele ={url:"Teacher/ResetPass",data:{
				userid: roId,schoolId:SCHOOLID
			},type:"get"};
	  commonFn(dele,function(data){
		  	layer.msg('密码重置成功，新密码为当前手机号码后六位',{time:3000},function(){
		  		var pageindex = window.localStorage.getItem("PageIndex");
				teacher(pageindex,Status,Isout,groupId);
		  	});
	  })
	}, function(){
	  layer.closeAll();
	});

})


//获取地区市
form.on('select(sheng)', function(data){
  diqu(data.value,"#shi");
  $("#qu").html("<option value=''></option>")
}); 
//获取地区县/区
form.on('select(shi)', function(data){
  diqu(data.value,"#qu");
});  


//编号规则设置默认显示
$("#bh").on("click",function(){
	layer.open({
		type:1,
	    title:"编号规则设置",
	   	content:$('#bhgz'),
	    area:['330px','210px']
	});
	var getPlace ={url:"Common/GetBaseData",data: {field:"教师编号规则",schoolId:SCHOOLID},type:"get"};
	commonFn(getPlace,function(data){
			$("#bhgz input[name='str']").val(data[0].dataText);
			$("#bhgz select[name='digit']").find("option[value='"+data[1].dataText+"']").attr("selected","selected").siblings().removeAttr("selected");
			form.render();
	})
})

//编号规则设置保存
form.on('submit(bh_save)',function(data){
	var bb=data.field;
	bb.schoolId=SCHOOLID;
	var savebh ={url:'Teacher/SetNumRule',data: bb,type:"get"};
	commonFn(savebh,function(data){
               layer.msg("设置成功",{time:1000},function(){
               	 	layer.closeAll();
					var pageindex = window.localStorage.getItem("PageIndex");
					teacher(pageindex,Status,Isout,groupId);
				})
		})
    return false;
});
//下载模板
$("#xzmb").on("click",function(){
	window.location.href=window.siteHost+"Filedown/GetModelTemplate?alias=teacher";
})
//批量导入教师
$("#pldr").on("click",function(){
	layer.open({
	  type:1,
        title:"批量导入部门教师",
        content:$('#importtea'),
        area:['360px','160px'],
	});
})

//批量导入教师上传
layui.upload({
    url: window.apiUrl+'Common/ImportFile'
    ,elem: '#file_tea' //指定原始元素，默认直接查找class="layui-upload-file"
    ,method: 'post' //上传接口的http类型
    ,title:'选择文件上传'
    ,ext: 'xls'
    ,success: function(res){
    	var data=res.data;
    	var URLs ={url:'Teacher/TeaTemplateImport',data:{schoolid:SCHOOLID,url:data},type:"get"};
		commonFn(URLs,function(){
			layer.msg("上传成功！", { time: 1000 }, function() {
				layer.closeAll();
				teacher(1,Status,Isout,groupId);
			});
		})
    }
 });

 //数据字典取值
function Selects(gender,nationality,nation,lengthYear,polityFace) {
	DataCenter("性别",$("#jsxx select[name='gender']"),gender,"str");
	DataCenter("国籍",$("#jsxx select[name='nationality']"),nationality,"str");
	DataCenter("民族",$("#jsxx select[name='nation']"),nation,"str");
	DataCenter("最高学历",$("#jsxx select[name='lengthYear']"),lengthYear,"str");
	DataCenter("政治面貌",$("#jsxx select[name='polityFace']"),polityFace,"str");
}

//新增教师 所在部门树
function GetGroupTree(num){
	var getgroup ={url:'Teacher/GetTeaGroupListTree',data:{schoolId:SCHOOLID},type:"get"};
	commonFn(getgroup,function(data){
		t = $("#Grouptree").ligerTree({
			data: data,
			checkbox: true,
			autoCheckboxEven:false,
			idFieldName: 'id',
			parentIDFieldName: 'pid'
		})
		if(num){
			var groupid = num.split(",");
			for(var i = 0; i < groupid.length; i++) {
				$("#Grouptree li[id='" + groupid[i] + "'] ").find("div.l-checkbox").removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
			}
		}
	});
}
//取所选部门的id的方法
$.ligerui.controls.Tree.prototype.alert = function() {
	groupsidtea.splice(0,groupsidtea.length);
	groupsnametea.splice(0,groupsnametea.length);
	var data = this.getChecked();
	for(var i = 0; i < data.length; i++) {
		groupsidtea.push(data[i].data.id);
		groupsnametea.push(data[i].data.text);
	}
};
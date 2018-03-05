var arr=[];
 gette();
function gette(){
    //var reauload= layer.load();
    var GetResAuditor = {
		url: "SchoolResources/GetResAuditor",
		data: {
			schoolid:window.schoolid
		},
		type: "get"
	};
	commonFn(GetResAuditor, function(data) {
                $('#teacherAdmin').empty();
                if (data!==null) {
                    // 循环选中老师的列表
                    for (var i = 0; i < data.length; i++) {
                        $('#teacherAdmin').append('<span class="ad"><span class="btn btn-blue">'
                            +data[i].teacherName+
                            '</span><i  onclick="remobeAdmin('+data[i].customerId+')" class="layui-icon Icon red removeAdmin">&#x1007;</i></span>')
                            // '</span><i class="layui-icon" style="font-size: 30px; color: #1E9FFF;">&#x1007;</i></span>')
                        arr.push(data[i].customerId);
                    }

                }else{
                    layer.msg("目前没有审核人员")
                }    
    })
}

//所有老师
var getgroups={url:"Teacher/GetTeacherList",data: { pageSize: 99999,schoolId:window.schoolid,status: 1, isout: 0 },type:"post"};
commonFn(getgroups,function(data){
	$("#idselect").html("<option value=''></option>");
	var datas = data.resultData;
	$.each(datas, function(i, n) {
		$("#idselect").append(
			'<option value="' + n.teacherId + '">' + n.name + '</option>'
		);
	});
	form.render();
});

//添加审核人
$('#add').click(function(){
        var sVal = $('#idselect').val();
        console.log(arr+'---'+sVal);
        var ab=0;
        //将techerid放到一个数组里,然后循环遍历数组,拿他们的id与选择的来时的id进行比较
        for(var i=0;i<arr.length;i++){
            if(sVal==arr[i]){

                ab=1;
                break;
            }else{
                ab=0;
            }
        }
      //  掉接口前进行判断select框的值是否为空
      if(ab==1){
            layer.msg('不能重复添加老师');
        }else if(sVal==''){
          layer.msg('请选择老师')
      } else{
            onComplete(sVal);
        }
    })
    function onComplete(obj) {
        //var reauload = layer.load()
        var AddResAuditor = {
			url: "SchoolResources/AddResAuditor",
			data: {
				schoolid:window.schoolid,
				teacherid:obj
			},
			type: "get"
		};
        commonFn(AddResAuditor, function(data) {
                //layer.close(reauload);
                layer.msg("添加成功",{time:1000},function(){
                    gette();
                })
            });

    }
        
    
    //删除审核人
    function remobeAdmin(id){
        layer.confirm('确定删除该审核人员？',function(){
            var reauload = layer.load();
            var DeleteResAuditor = {
			url: "SchoolResources/DeleteResAuditor?teacherid="+id+"&schoolid="+window.schoolid,
				type: "delete"
			};
			commonFn(DeleteResAuditor, function(data) {
                     layer.close(reauload);
                        layer.msg("删除成功",{time:1000},function(){
                            for(var i=0;i<arr.length;i++){
                                if(arr[i]==id){
                                    arr.splice(i,1);
                                    console.log(arr);
                                }
                            }
                        	gette();
                        })
                 
            })
        })
    }
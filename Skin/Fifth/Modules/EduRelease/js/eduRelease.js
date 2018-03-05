var form =layui.form(),
$=layui.jquery,
layer =layui.layer,
laydate=layui.laydate;
var schoolid = getCookieByUserInfo('schoolid');
var usertype=getCookieByUserInfo('logintype');
//var usertype=10;
var userid=getCookieByUserInfo('userid');
//var logintype=getCookieByUserInfo('logintype');
if(!IsLogin()){
	 top.location.href="../../login.html";
}else{
	var PublishScore={
		url:'/Score/PublishScore',
		data:{schoolid:schoolid},
		type:'get'
	}
	commonFn(PublishScore,function(data){ 
            $('#classid').val(data.classes.classId);
            if (data.scoreTypes) {
                // $('#ScoreTypeId').empty();
                for (var i = 0; i < data.scoreTypes.length; i++) {
                    $('#ScoreTypeId #custom').before('<option value='+data.scoreTypes[i].scoreType+'>'+data.scoreTypes[i].typeName+'</option>')
                }
            }
            if (usertype ==10) {
//              $('.nianduan').text("班级：")
//              if (data.classes && data.classes.length > 0) {
//                  $('#GradeId').empty();
//                  $('#Year').empty(); 
//                  for (var i = 0; i < data.classes.length; i++) {
//                      $('#GradeId').append('<option value='+data.classes[i].classId+'>'+data.classes[i].className+'</option>')
//                  }
//                  for (var i = 0; i < data.grades.length; i++) {                       
//                       $('#Year').append('<option value='+data.grades[i].shortName+'>'+data.grades[i].shortName+'</option>')
//                  } 
//                 
//              }
            }else{
                if (data.grades && data.grades.length > 0) {
                    $('#GradeId').empty();
                    $('#Year').empty();
                    for (var i = 0; i < data.grades.length; i++) {
                        $('#GradeId').append('<option value='+data.grades[i].id+'>'+data.grades[i].grade+'</option>');
                         $('#Year').append('<option value='+data.grades[i].shortName+'>'+data.grades[i].shortName+'</option>')
                    } 
                }
            }               
            //layui更新动态加载的form 更新全部
            form.render(); 
            form.on('select(ScoreTypeId)' ,function(data){
                if (data.value== "-1") {
                    $('#ScoreTypeName').css('display','block');
                }else{
                    $('#ScoreTypeName').css('display','none');
                }
            })
        $('.layui-form').on('click',".export",function () {
            var gradeid , classid ;
            if (data.isAdmin) {
               gradeid= $("#GradeId").val();
               classid=0;
            }else{
               classid= $("#GradeId").val();
               gradeid= 0
            }
            window.location.href = window.siteHost+"ScoreDownload/SchoolExport?gradeid=" + gradeid + "&classid=" + classid+"&userid="+userid+"&schoolid="+schoolid;      
        });
	})
}
 


// 上传插件
layui.upload({
    url:window.apiUrl+'Common/ImportFile',
    type:'file',
    extensions: "xls,xlsx",	
    method:'post',
    success:function(res){
        $('input[name="path"]').val(res.data);
        $('#txtfiles').val(getFileName(res.data));
        $('#txtfiles').attr('url',getFileName(res.data));
    }
})
function getFileName(u){
    var arr = u.split('/');
    return arr[arr.length-1];
}
$('#uploadfiles').on('click',function(){
	 var args = new Object();
    args.Year = $("#Year").val();
    args.Term = $("#Term").val();  	 
    args.SubjectId = $("#SubjectId").val();
    args.SubjectName = $("#SubjectName").val(); 
    args.ScoreTypeId = $("#ScoreTypeId").val();
    args.ScoreTypeName = $("#ScoreTypeName").val();
    args.ScoreTimes = '1';//默认考试次数1 $("#ScoreTimes").val();
    args.ScoreTime = $("#ScoreTime").val();
    var exaimTime= args.ScoreTime.split('-')[0];
    args.ScoreFile=$('#txtfiles').attr('url');
    args.logintype=usertype;
    args.schoolId=schoolid;
    if (usertype !=10) {   
        args.GradeId = $("#GradeId").val();
        var GradeName=$('#GradeId option:selected').text().slice(0,4);
    }else{
        args.ClassId = $("#GradeId").val(); 
        var GradeName=$('#GradeId option:selected').text().slice(0,4);
    }
    if(!args.ScoreTypeId){
    	layer.msg('请选择考试类型');
    }else if(!args.ScoreTime){
    	layer.msg('请选择考试时间');
    }else if(!args.ScoreFile){
    	layer.msg('请选择文件');
    }else if(args.Year!=exaimTime){
    	layer.msg('学期与考试时间不符');
    }else if(args.Year!=GradeName){
    	layer.msg('学期与年段不符');
    }else if(exaimTime!=GradeName){
    	layer.msg('考试时间与年段不符');
    }else{
    	var TemplateImport={
			url:'/Score/TemplateImport',
			type:'post',
			data:args
		}
		commonFn(TemplateImport,function(data){
			layer.msg(data);
			 
		})
    }
	 
})
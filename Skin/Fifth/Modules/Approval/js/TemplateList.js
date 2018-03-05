var Modeltype='';
var usertype=getCookieByUserInfo("logintype");
if(usertype && usertype =="teacher"){
	Modeltype=0;
}else if(usertype && usertype =="parent"){
	Modeltype=1;
}else if(usertype && usertype =="student"){
	Modeltype=2;
}
console.log(usertype)
var temlistload= layer.load();
var GetListTemplate ={url:"Examine/GetListExamineModel",type:"get",data: {
		modeType:Modeltype,
		schoolId:window.schoolid
	}
};
commonFn(GetListTemplate,function(data){
	layer.close(temlistload); 
	if (data && data.length > 0) {
		$.each(data, function(i, n) {
			var row = $("#roleRow").clone();
			row.attr("href","LaunchApproval.html?ModelId="+n.id);
			for(key in n){
				row.find("#"+key).html(n[key]);
				row.find(".icon").attr("src",n.icoUrl);
			}
			row.appendTo($("#roleTable"));
		});
	}
				
		
})

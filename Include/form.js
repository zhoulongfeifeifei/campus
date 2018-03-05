//给表单赋值
var aa=function(form){ 
	var o={}; 
	$.each(form.serializeArray(),function(index){ 
	if(o[this['name']]){ 
	o[this['name']] = o[this['name']]+","+this['value']; 
	}else{ 
	o[this['name']] = this['value']; 
	} 
	}); 
	return o; 
} 
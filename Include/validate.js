//表单验证
function validate(name, Value,$this) {
	if(name == "required"){
		if(!Value){
			layer.msg('此处不能为空，请输入', {icon: 5});
			$this.css("border","1px solid red");
		}else{
			$this.css("border","1px solid #e6e6e6");
		}
	}
	if(name == "idcard") {
		//去掉字符串头尾空格  
		Value = valueTrim(Value.replace(/ /g, ""));
		if(Value.length == 15) {
			//进行15位身份证的验证   
			if(isValidityBrithBy15IdCard(Value) == false){
				layer.msg('请输入正确的身份证格式', {icon: 5});
			}else{
				$this.css("border","1px solid #e6e6e6");
			}
		} else if(Value.length == 18) {
			// 得到身份证数组    
			var a_idCard = Value.split("");
			//进行18位身份证的基本验证和第18位的验证  
			if(isValidityBrithBy18IdCard(Value) && isTrueValidateCodeBy18IdCard(a_idCard) == false) {
				layer.msg('请输入正确的身份证格式', {icon: 5});
				$this.css("border","1px solid red");
			}else{
				$this.css("border","1px solid #e6e6e6");
			}
		} else{
			layer.msg('请输入正确的身份证格式', {icon: 5});
			$this.css("border","1px solid red");
		}
	} else if(name == "tel") {
		var reg = /^$|^(\d{3,4}-)?\d{7,8}$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的固定电话格式', {icon: 5});
			$this.css("border","1px solid red");
		}else{
			$this.css("border","1px solid #e6e6e6");
		}
	}else if(name == "fax") {
		var reg = /^$|^(\d{3,4}-)?\d{7,8}$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的传真格式', {icon: 5});
			$this.css("border","1px solid red");
		}else{
			$this.css("border","1px solid #e6e6e6");
		}
	} else if(name == "english"){
		var reg = /^$|^[A-Za-z ]*$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的英文格式', {icon: 5});
			$this.css("border","1px solid red");
		}else{
			$this.css("border","1px solid #e6e6e6");
		}
	} else if(name == "code"){
		var reg = /^$|^[1-9][0-9]{5}$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的邮编格式', {icon: 5});
			$this.css("border","1px solid red");
		} else{
			$this.css("border","1px solid #e6e6e6");
		}
	} else if(name == "email"){
		var reg = /^$|^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的邮箱格式', {icon: 5});
			$this.css("border","1px solid red");
		} else{
			$this.css("border","1px solid #e6e6e6");
		}
	} else if(name == "web"){
		var reg = /^$|^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的网址格式', {icon: 5});
			$this.css("border","1px solid red");
		}else{
			$this.css("border","1px solid #e6e6e6");
		} 
	} else if(name == "phone"){
		var reg = /^$|^[1][358][0-9]{9}$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的手机号码格式', {icon: 5});
			$this.css("border","1px solid red");
		} else{
			$this.css("border","1px solid #e6e6e6");
		}
	} else if(name == "phone2"){
		var reg = /^$|^[1][358][0-9]{9}$/;
		if(reg.test(Value) == false){
			layer.msg('请输入正确的手机号码格式', {icon: 5});
			$this.css("border","1px solid red");
		} else{
			$this.css("border","1px solid #e6e6e6");
		}
	} 
}

function isTrueValidateCodeBy18IdCard(a_idCard) {
	var sum = 0; // 声明加权求和变量     
	if(a_idCard[17].toLowerCase() == 'x') {
		a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作     
	}
	for(var i = 0; i < 17; i++) {
		sum += Wi[i] * a_idCard[i]; // 加权求和     
	}
	valCodePosition = sum % 11; // 得到验证码所位置     
	if(a_idCard[17] == ValideCode[valCodePosition]) {
		return true;
	} else {
		return false;
	}
}
/**    
 * 验证18位数身份证号码中的生日是否是有效生日    
 * @param idCard 18位书身份证字符串    
 * @return    
 */
function isValidityBrithBy18IdCard(idCard18) {
	var year = idCard18.substring(6, 10);
	var month = idCard18.substring(10, 12);
	var day = idCard18.substring(12, 14);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	// 这里用getFullYear()获取年份，避免千年虫问题     
	if(temp_date.getFullYear() != parseFloat(year) ||
		temp_date.getMonth() != parseFloat(month) - 1 ||
		temp_date.getDate() != parseFloat(day)) {
		return false;
	} else {
		return true;
	}
}
/**    
 * 验证15位数身份证号码中的生日是否是有效生日    
 * @param idCard15 15位书身份证字符串    
 * @return    
 */
function isValidityBrithBy15IdCard(idCard15) {
	var year = idCard15.substring(6, 8);
	var month = idCard15.substring(8, 10);
	var day = idCard15.substring(10, 12);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法     
	if(temp_date.getYear() != parseFloat(year) ||
		temp_date.getMonth() != parseFloat(month) - 1 ||
		temp_date.getDate() != parseFloat(day)) {
		return false;
	} else {
		return true;
	}
}
//去掉字符串头尾空格
function valueTrim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子     
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
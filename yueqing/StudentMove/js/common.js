//日期格式化方法
function solveTime(datetime) {
	if(datetime) {
		datetime = datetime.substring(0, 19)
		datetime = datetime.replace(/T/, ' ');
	}
	return datetime;
}
// 得到URl路径的方法
//function getUrlParam(name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//	var r = window.location.search.substr(1).match(reg); //匹配目标参数
//	if(r != null) return(r[2]);
//	return null; //返回参数值
//}


function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");//构造一个含有目标参数的正则表达式对象
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}
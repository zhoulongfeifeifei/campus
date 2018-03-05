// 格式化时间1·¨
function oktime(isoktime) {
    if (isoktime) {
        isoktime = eval(isoktime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))
        isoktime = new Date(isoktime);
        isoktime = isoktime.getFullYear() + '-' + oktime2((isoktime.getMonth() + 1)) + '-' + oktime2(isoktime.getDate()) + ' ' + oktime2(isoktime.getHours()) + ':' + oktime2(isoktime.getMinutes()) + ':' + oktime2(isoktime.getSeconds());
        return isoktime;
    } else if (isoktime == null) {
        return ""
    }
    else {
        return "";
    }
}
function oktime2(a){
    if (parseInt(a) < 10) {
        return '0'+a;
    }else{
        return a;
    }
} 
/**********格式化时间2¨*************/
function formatTen(num) {  
    return num > 9 ? (num + "") : ("0" + num);  
}  

function formatDate(date) {  
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    var day = date.getDate();  
    var hour = date.getHours();  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    return year + "-" + formatTen(month) + "-" + formatTen(day)+" "+formatTen(hour)+":"+formatTen(minute)+":"+formatTen(second);  
}  

function GetTimeFromTimeStamp(value) {
    var timestamp = value.replace(/\/Date\((\d+)\)\//gi, '$1');
    timestamp = timestamp / 1000;
    if (isNaN(timestamp)) return "";
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    return newDate.toLocaleDateString();
}

function GetTimeDateFromTimeStamp(value) {
    var timestamp = value.replace(/\/Date\((\d+)\)\//gi, '$1');
    timestamp = timestamp / 1000;
    if (isNaN(timestamp)) return "";
    var newDate = new Date();
    newDate.setTime(timestamp * 1000); 
    return newDate;
}

function GetWeekDays(weeks) {
    if (weeks == null || weeks == "") return string.Empty;
    weeks = weeks.replace("1", "星期一");
    weeks = weeks.replace("2", "星期二");
    weeks = weeks.replace("3", "星期三");
    weeks = weeks.replace("4", "星期四");
    weeks = weeks.replace("5", "星期五");
    weeks = weeks.replace("6", "星期六");
    weeks = weeks.replace("0", "星期日");
    return weeks;
}
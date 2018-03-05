//通用ajax请求，控制器：返回统一格式，回调：成功/失败，错误
function AjaxProcess(data, success, failure) {
    var json = eval("(" + data.responseText + ")");
    if (json.Status == 1) {
        if (success) success(json.Data);
        else top.parent.showTips("操作成功", 4);
    } else {
        if (failure) failure(json.Status, json.Message);
        else top.parent.showTips("操作失败", 5);
    }
}
//AjaxUrlProcess("/Teacher/Student/StopStudent", { id: id }, function (data) {
//    tr.remove();
//    top.parent.showTips("操作成功", 4);
//}, function (status, message) {
//    top.parent.showTips(message, 5);
//}, function () {
//    top.parent.showTips("正在保存", 1);
//});
/**
 * 
 * @param {} url 
 * @param {} data 
 * @param {} success 
 * @param {} failure 
 * @param {} before 
 * @returns {} 
 */
function AjaxUrlProcess(url, data, success, failure, before) {
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        data: data,
        beforeSend: function () {
            if (before) before();
        },
        success: function (json) {
            if (json.Status == 1) {
                if (success) success(json.Data);
                else top.parent.showTips("操作成功", 4);
            } else {
                if (failure) failure(json.Status, json.Message);
                else top.parent.showTips("操作失败", 5);
            }

        },
        error: function (e) {
            if (failure) AjaxProcess(e, success, failure);
            else top.parent.showTips("对不起，服务器忙，请稍候再试!", 5);
        }
    });
}
/**
 * 
 * @param {} btn 
 * @param {} txt 
 * @returns {} 
 */
function DisableSubmit(btn, txt) {
    btn.val(txt);
    btn.attr("disabled", "disabled");
}
/**
 * 
 * @param {} btn 
 * @param {} txt 
 * @returns {} 
 */
function EnableSubmit(btn, txt) {
    btn.val(txt);
    btn.removeAttr("disabled");
}

function NotifyUser() {
    this.AllTeacher = false;
    this.AllStudent = false;
    this.Teachers = new Array();
    this.Students = new Array();
}
function NotifyArgs() {
    this.FormId = 0;
    this.Users = new NotifyUser();
}
function CreateArgs() {
    this.Title = "";
    this.BeginTime = "";
    this.EndTime = "";
    this.IsRepeat = false;
    this.IsOpen = false;
    this.IsPreview = false;
    this.IsPublish = false;
    this.Items = new Array();
    this.Users = new NotifyUser();
}
function ExamineCreateArgs() {
    this.Id = "";
    this.Title = "";
    this.Remark = "";
    this.IcoUrl = "";
    this.IsStart = false;
    this.Items = new Array();
}
function FormControl() {
    this.Id = "";
    this.Type = 0;
    this.Title = "";
    this.Tips = "";
    this.Unit = "";
    this.Format = "";
    this.Multiple = false;
    this.MinLength = 0;
    this.MaxLength = 0;
    this.Required = false;
    this.Rule = "";
    this.HiddenValue = "",
    this.Sort = 0;
    this.Default = 0;
    this.Options = new Array();
    this.Items = new Array();
}
function FormControlOption() {
    this.Value = "";
    this.Text = "";
    this.Sort = 0;
    this.checked=false;
}
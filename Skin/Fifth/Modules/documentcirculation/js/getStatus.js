/**
 * 获取筛选的条件状态
 * @authors Maunsell (982431279@qq.com)
 * @date    2017-02-14 09:30:07
 * @version $Id$
 */
var option ='';

function getStatusList(a){
	commonFn({
		url:'Offic/GetListStatus',
		data:{type :a}
	},function(res){
		if (res && res.length > 0) {
			$.each(res,function(index, el) {
				option += '<option value='+el.key+'>'+el.value+'</option>';
			});
			$('#condition').append(option);
			layui.form().render();
		}
	})
}


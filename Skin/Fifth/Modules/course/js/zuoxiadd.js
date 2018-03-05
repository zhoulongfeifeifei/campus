/**
 * 
 * @authors Maunsell (982431279@qq.com)
 * @date    2016-12-14 19:39:13
 * @version $Id$
 */
	var maxorder = 0;
	//获取数据
	var id = getUrlParam("id");
	id = id ? id : 0;
	var GetTimeSheetModel = {
		url: "OpenCourse/GetTimeSheetModel",
		data: {id: id},
	};
	commonFn(GetTimeSheetModel, function(result) {
			//给maxorder赋值
			maxorder = result.MaxOrder;
			//给总sheet赋值
			$('#sheetid').val(id);
			$('#SheetName').val(result.sheetName);
			$('#begintime').val(solveTime(result.beginTime));
			$('#endtime').val(solveTime(result.endTime));
			SetCheckedStatus(result.weekDays); //设置周一-周日选中
			$('#level').val(result.level);
			//获取初始行数
			$('#rownumber').val(result.sheetContentList.length);

			//显示sheetcontent
			var tbody_morning = "",
				morning_row = 0;
			var tbody_afternoon = "",
				afternoon_row = 0;
			var tbody_evening = "",
				evening_row = 0;
			var morning_sheets = new Array();
			var afternoon_sheets = new Array();
			var evening_sheets = new Array();
			for(var i = 0; i < result.sheetContentList.length; i++) {
				var obj = result.sheetContentList[i];
				if(GetTimeDateFromTimeStamp(obj.begintime_).getHours() <= 12)
					morning_sheets.push(result.sheetContentList[i]);
				else if(GetTimeDateFromTimeStamp(obj.begintime_).getHours() > 12 &&
					GetTimeDateFromTimeStamp(obj.begintime_).getHours() < 18)
					afternoon_sheets.push(result.sheetContentList[i]);
				else evening_sheets.push(result.sheetContentList[i]);
			}
			//morning_sheets = result.sheetContentList.filter(function(obj) {
			//    if (GetTimeDateFromTimeStamp(obj.begintime_).getHours() <= 12) {
			//        return obj;
			//    }
			//});
			if(morning_sheets != null) morning_row = morning_sheets.length + 1;
			if(afternoon_sheets != null) afternoon_row = afternoon_sheets.length + 1;
			if(evening_sheets != null) evening_row = evening_sheets.length + 1;

			tbody_morning += "<tr>" + "<td class=\"rowspan\" rowspan=\"" + morning_row + "\">上午</td>" + "</tr>";
			for(var i = 0; i < morning_row - 1; i++) {
				tbody_morning += "<tr class=\"" +
					GetTurnStatus(morning_sheets[i].isShow) +
					"\">" +
					"<td class=\"td-title\">" +
					"<input name=\"coursename\" type=\"text\" " +
					CanTurnOn(morning_sheets[i].sceneId) +
					" value=\"" +
					morning_sheets[i].courseName +
					"\" class=\"w-100\"/>" +
					"<input class=\"courseorder\" type=\"hidden\" name=\"courseorder\" value=\"" +
					GetCourseOrder(morning_sheets[i].SceneId, morning_sheets[i].courseOrder, 1) +
					"\" />" +
					"<input class=\"sceneid\" type=\"hidden\" name=\"sceneid\" value=\"" +
					morning_sheets[i].sceneId +
					"\" />" +
					"<input type=\"hidden\" class=\"contentid\" name=\"contentid\" value=\"" +
					morning_sheets[i].id +
					"\" />" +
					"</td>" +
					"<td>" +
					"<input name=\"BeginHour\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(morning_sheets[i].begintime_).getHours() +
					"\" /> 点 " +
					"<input name=\"BeginMinute\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(morning_sheets[i].begintime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td>" +
					"<input name=\"EndHour\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(morning_sheets[i].endtime_).getHours() +
					"\" /> 点 " +
					"<input name=\"EndMinute\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(morning_sheets[i].endtime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td class=\"td-status\">" +
					"<span>显示" +
					GetWeekdayCompare(result.weekDays, morning_sheets[i].weekDays) +
					"</span>" +
					"<a class=\"statusEdit link\">" +
					"<i class=\"fa\">&#xea4a;</i>" +
					"</a>" +
					"<input type=\"hidden\" name=\"weekdays\" class=\"statusInput\" value=\"" +
					ReplaceWeeks(morning_sheets[i].weekDays) +
					"\" />" +
					"<input class=\"isshow\" type=\"hidden\" name=\"isshow\" value=\"" +
					morning_sheets[i].isShow +
					"\" />" +
					"</td>" +
					"<td class=\"edit\">" +
					"<a class=\"up link\" href=\"javascript:void(0)\"><i class=\"fa\">&#xe623;</i></a>" +
					"<a class=\"down link\" href=\"javascript:void(0)\"><i class=\"fa \">&#xe62b;</i></a>" +
					"<a class=\"toggle link\" href=\"javascript:void(0)\"><i class=\"fa " +
					IsShowOn(morning_sheets[i].isShow) +
					"\"></i></a>";
				if(morning_sheets[i].sceneId == 3) {
					tbody_morning +=
						"<a class=\"add link\" href=\"javascript:void(0)\"><i class=\"fa \">&#xe625;</i></a>";
				} else {
					tbody_morning += "<a>&#12288;</a>";
				}
				tbody_morning += "</td></tr>";
			} //end morning;
			$(".morning tbody").html(tbody_morning);

			tbody_afternoon += "<tr>" + "<td class=\"rowspan\" rowspan=\"" + afternoon_row + "\">下午</td>" + "</tr>";
			for(var i = 0; i < afternoon_row - 1; i++) {
				tbody_afternoon += "<tr class=\"" +
					GetTurnStatus(afternoon_sheets[i].isShow) +
					"\">" +
					"<td class=\"td-title\">" +
					"<input name=\"coursename\" type=\"text\" " +
					CanTurnOn(afternoon_sheets[i].sceneId) +
					" value=\"" +
					afternoon_sheets[i].courseName +
					"\" class=\"w-100\"/>" +
					"<input class=\"courseorder\" type=\"hidden\" name=\"courseorder\" value=\"" +
					GetCourseOrder(afternoon_sheets[i].sceneId, afternoon_sheets[i].courseOrder, 2) +
					"\" />" +
					"<input class=\"sceneid\" type=\"hidden\" name=\"sceneid\" value=\"" +
					afternoon_sheets[i].sceneId +
					"\" />" +
					"<input type=\"hidden\" class=\"contentid\" name=\"contentid\" value=\"" +
					afternoon_sheets[i].id +
					"\" />" +
					"</td>" +
					"<td>" +
					"<input name=\"BeginHour\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(afternoon_sheets[i].begintime_).getHours() +
					"\" /> 点 " +
					"<input name=\"BeginMinute\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(afternoon_sheets[i].begintime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td>" +
					"<input name=\"EndHour\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(afternoon_sheets[i].endtime_).getHours() +
					"\" /> 点 " +
					"<input name=\"EndMinute\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(afternoon_sheets[i].endtime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td class=\"td-status\">" +
					"<span>显示" +
					GetWeekdayCompare(result.weekDays, afternoon_sheets[i].weekDays) +
					"</span>" +
					"<a class=\"statusEdit link\">" +
					"<i class=\"fa\">&#xea4a;</i>" +
					"</a>" +
					"<input type=\"hidden\" name=\"weekdays\" class=\"statusInput\" value=\"" +
					ReplaceWeeks(afternoon_sheets[i].weekDays) +
					"\" />" +
					"<input class=\"isshow\" type=\"hidden\" name=\"isshow\" value=\"" +
					afternoon_sheets[i].isShow +
					"\" />" +
					"</td>" +
					"<td class=\"edit\">" +
					"<a class=\"up link\" href=\"javascript:void(0)\"><i class=\"fa\">&#xe623;</i></a>" +
					"<a class=\"down link\" href=\"javascript:void(0)\"><i class=\"fa \">&#xe62b;</i></a>" +
					"<a class=\"toggle link\" href=\"javascript:void(0)\"><i class=\"fa " +
					IsShowOn(afternoon_sheets[i].isShow) +
					"\"></i></a>";
				if(afternoon_sheets[i].sceneId == 3) {
					tbody_afternoon +=
						"<a class=\"add link\" href=\"javascript:void(0)\"><i class=\"fa \">&#xe625;</i></a>";
				} else {
					tbody_afternoon += "<a>&#12288;</a>";
				}
				tbody_afternoon += "</td></tr>";
			} //end afternoon;
			$(".afternoon tbody").html(tbody_afternoon);

			tbody_evening += "<tr>" + "<td class=\"rowspan\" rowspan=\"" + evening_row + "\">晚上</td>" + "</tr>";
			for(var i = 0; i < evening_row - 1; i++) {
				tbody_evening += "<tr class=\"" +
					GetTurnStatus(evening_sheets[i].isShow) +
					"\">" +
					"<td class=\"td-title\">" +
					"<input name=\"coursename\" type=\"text\" " +
					CanTurnOn(evening_sheets[i].sceneId) +
					" value=\"" +
					evening_sheets[i].courseName +
					"\" class=\"w-100\"/>" +
					"<input class=\"courseorder\" type=\"hidden\" name=\"courseorder\" value=\"" +
					GetCourseOrder(evening_sheets[i].sceneId, evening_sheets[i].courseOrder, 3) +
					"\" />" +
					"<input class=\"sceneid\" type=\"hidden\" name=\"sceneid\" value=\"" +
					evening_sheets[i].sceneId +
					"\" />" +
					"<input type=\"hidden\" class=\"contentid\" name=\"contentid\" value=\"" +
					evening_sheets[i].id +
					"\" />" +
					"</td>" +
					"<td>" +
					"<input name=\"BeginHour\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(evening_sheets[i].begintime_).getHours() +
					"\" /> 点 " +
					"<input name=\"BeginMinute\" class=\"w-30 start-time\" value=\"" +
					GetTimeDateFromTimeStamp(evening_sheets[i].begintime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td>" +
					"<input name=\"EndHour\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(evening_sheets[i].endtime_).getHours() +
					"\" /> 点 " +
					"<input name=\"EndMinute\" class=\"w-30 end-time\" value=\"" +
					GetTimeDateFromTimeStamp(evening_sheets[i].endtime_).getMinutes() +
					"\" /> 分 " +
					"</td>" +
					"<td class=\"td-status\">" +
					"<span>显示" +
					GetWeekdayCompare(result.weekDays, evening_sheets[i].weekDays) +
					"</span>" +
					"<a class=\"statusEdit link\">" +
					"<i class=\"fa\">&#xea4a;</i>" +
					"</a>" +
					"<input type=\"hidden\" name=\"weekdays\" class=\"statusInput\" value=\"" +
					ReplaceWeeks(evening_sheets[i].weekDays) +
					"\" />" +
					"<input class=\"isshow\" type=\"hidden\" name=\"isshow\" value=\"" +
					evening_sheets[i].isShow +
					"\" />" +
					"</td>" +
					"<td class=\"edit\">" +
					"<a class=\"up link\" href=\"javascript:void(0)\"><i class=\"fa\">&#xe623;</i></a>" +
					"<a class=\"down link\" href=\"javascript:void(0)\"><i class=\"fa\">&#xe62b;</i></a>" +
					"<a class=\"toggle link\" href=\"javascript:void(0)\"><i class=\"fa " +
					IsShowOn(evening_sheets[i].isShow) +
					"\"></i></a>";
				if(evening_sheets[i].sceneId == 3) {
					tbody_evening +=
						"<a class=\"add link\" href=\"javascript:void(0)\"><i class=\"fa \">&#xe625;</i></a>";
				} else {
					tbody_evening += "<a>&#12288;</a>";
				}
				tbody_evening += "</td></tr>";
			} //end evening;
			$(".evening tbody").html(tbody_evening);

	})

	var $table = $('.table');

	//向上移动
	$table.on('click',
		'td.edit .up',
		function() {
			var $this = $(this);
			var $parTr = $this.parents('tr');
			var _trIndex = $parTr.index();
			var $thisTbodytr = $this.parents('tbody').find('tr');
			if(_trIndex > 1) {
				$parTr.css('background-color', '#cdedc0');
				setTimeout(function() {
						$parTr.prev().before($parTr); //向上移动
					},
					300);
				setTimeout(function() {
						$parTr.css('background-color', '');
					},
					600);
			} else {
				//table的第一项，如上面还有table，则移到上一个table
				var $prevTbodyTr = $this.parents('table').prev('table').find('tbody tr');
				if($prevTbodyTr.length > 0) {
					$parTr.css('background-color', '#cdedc0');
					setTimeout(function() {
							//移到下一个table
							$prevTbodyTr.parent('tbody').append($parTr);

							//重新设置2个table的第一个tr的rowspan
							$thisTbodytr.eq(0).find('.rowspan').attr('rowspan', $thisTbodytr.length - 1);
							$prevTbodyTr.eq(0).find('.rowspan').attr('rowspan', $prevTbodyTr.length + 1);

						},
						300);
					setTimeout(function() {
							$parTr.css('background-color', '');
						},
						600);
				}
			}
		});

	//向下移动
	$table.on('click',
		'td.edit .down',
		function() {
			var $this = $(this);
			var $parTr = $this.parents('tr');
			var _trIndex = $parTr.index();

			var $thisTbodytr = $this.parents('tbody').find('tr');
			if(_trIndex < $thisTbodytr.length - 1) {
				$parTr.css('background-color', '#c5e5f4');
				setTimeout(function() {
						$parTr.next().after($parTr); //向下移动
					},
					300);
				setTimeout(function() {
						$parTr.css('background-color', '');
					},
					600);
			} else {
				//table的最后一项，如下面还有table，则移到下一个table
				var $nextTbodyTr = $this.parents('table').next('table').find('tbody tr');
				if($nextTbodyTr.length > 0) {
					$parTr.css('background-color', '#c5e5f4');
					setTimeout(function() {
							//移到下一个table
							$nextTbodyTr.eq(1).before($parTr);

							//重新设置2个table的第一个tr的rowspan
							$thisTbodytr.eq(0).find('.rowspan').attr('rowspan', $thisTbodytr.length - 1);
							$nextTbodyTr.eq(0).find('.rowspan').attr('rowspan', $nextTbodyTr.length + 1);

						},
						300);
					setTimeout(function() {
							$parTr.css('background-color', '');
						},
						600);
				}
			}
		});

	//开启关闭整个tr
	$table.on('click',
		'td.edit .toggle',
		function() {
			var $parTr = $(this).parents('tr');
			if($parTr.hasClass('tr-off')) {
				$parTr.removeClass('tr-off');
				$(this).find('.fa').attr('class', 'fa icon-on');
				$parTr.find('input[type="text"]').removeAttr('readonly');
			} else {
				$parTr.addClass('tr-off');
				$(this).find('.fa').attr('class', 'fa icon-off');
				$parTr.find('input[type="text"]').attr('readonly', 'readonly');
			}
		});

	//复制&添加一行

	$table.on('click',
		'td.edit .add',
		function() {
			var $parTr = $(this).parents('tr');
			var $parTbody = $(this).parents('tbody');
			var _trIndex = $parTr.index();
			var $clone = $parTr.clone();
			if($parTr.find('td.edit .remove').length == 0) {
				$clone.find('td.edit')
					.append('<a class="remove link" href="javascript:void(0)"><i class="fa">&#xe621;</i></a>');
			}
			//加入自定义的复制
			$clone.find('td.td-title .courseorder').val(maxorder);
			maxorder++;
			$clone.find('td.td-title .sceneid').val(0);
			$clone.find('td.td-title .contentid').val(0);
			//已经完成复制
			$parTr.after($clone); //向下移动
			$parTbody.find('.rowspan').attr('rowspan', $parTbody.find('tr').length);
		});

	//删除一行
	$table.on('click',
		'td.edit .remove',
		function() {
			var $parTr = $(this).parents('tr');
			var $parTbody = $(this).parents('tbody');
			$parTr.remove();
			$parTbody.find('.rowspan').attr('rowspan', $parTbody.find('tr').length);
		});

	//显示状态编辑框 点击编辑按钮
	var $statusEnditBox = $('.statusEndit-box');
	$table.on('click',
		'td.td-status .statusEdit',
		function() {
			var $this = $(this);
			var $thisTr = $this.parents('tr');

			if($thisTr.hasClass('tr-off')) return false; //如果本行已关闭，则无法编辑

			if(!$thisTr.hasClass('tr-statusEdit-on')) {
				//显示编辑框
				$('.tr-statusEdit-on').removeClass('tr-statusEdit-on'); //取消其他地方的选中状态
				$thisTr.addClass('tr-statusEdit-on');
				$statusEnditBox.css({
					'left': $this.offset().left - 10,
					'top': $this.offset().top + 24
				}).show();

				//获取勾选记录
				var checkedArr = $('.tr-statusEdit-on .td-status .statusInput').val();
				if($.trim(checkedArr)) {
					checkedArr = checkedArr.split('-'); //横杠切割
					$statusEnditBox.find('input').removeAttr('checked'); //把所有input取消勾选
					$.each(checkedArr,
						function(i, val) {
							//根据记录勾选
							$statusEnditBox.find('.n-' + val + ' input').attr('checked', 'checked');
						});
					//如全选，则把全选也选中
					if(checkedArr.length == $statusEnditBox.find('.n').length) {
						$statusEnditBox.find('.checkall input').attr('checked', 'checked');
					}
				}
			} else {
				//隐藏编辑框
				$thisTr.removeClass('tr-statusEdit-on');
				$statusEnditBox.hide();
			}
		});

	//点击statusEnditBox之外的地方，隐藏statusEnditBox
	$(document).on('click',
		'body',
		function(e) {
			if(!$(e.target).is('.statusEndit-box,.statusEndit-box *,.statusEdit,.statusEdit *')) {
				$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
				$statusEnditBox.hide();
			}
		});

	//显示状态编辑框 全选
	$statusEnditBox.find('label.checkall')
		.click(function() {
			if($(this).find('input').prop('checked')) {
				//全选
				$statusEnditBox.find('input').prop('checked', 'checked');
			} else {
				//取消全选
				$statusEnditBox.find('input').prop('checked',false);
			}
		});

	//显示状态编辑框 监听其他checkbox以改变全选状态
	$statusEnditBox.find('label.n')
		.click(function() {
			console.log("是否执行全选?")
			if($statusEnditBox.find('label.n input:checked').length < $statusEnditBox.find('label.n').length) {
				$statusEnditBox.find('label.checkall input').removeAttr('checked');
			} else {
				$statusEnditBox.find('label.checkall input').prop('checked', 'checked');
			}
		});

	//显示状态编辑框 确定
	var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	$statusEnditBox.find('.ok')
		.click(function() {
			var checkVal = "";
			var checkTxt = "";
			var isAll = false;
			$statusEnditBox.find('input[type="checkbox"]')
				.each(function() {
					console.log($(this).prop('checked'))
					if($(this).prop('checked') == true) {
						if($(this).val() != 'all') {
							//把选中项记录（不记录全选按钮的值）
							checkVal += $(this).val() + "-";
							checkTxt += weekArr[$(this).val()] + "，";
						} else {
							isAll = true;
						}
					}
				});

			//去掉最后一个逗号
			checkVal = checkVal.substring(0, checkVal.length - 1);
			checkTxt = checkTxt.substring(0, checkTxt.length - 1);

			//赋值到tr
			$trStatusEditOn = $('.tr-statusEdit-on');
			$trStatusEditOn.find('.td-status .statusInput').val(checkVal); //保存到input[type="hidden"]
			if(isAll) {
				//全选
				$trStatusEditOn.find('.td-status span').text('显示');
			} else if(checkTxt.length > 0) {
				console.log(checkTxt);
				//勾选部分checkbox
				$trStatusEditOn.find('.td-status span').text('显示（' + checkTxt + '）');
			} else {
				//一个都不勾
				$trStatusEditOn.find('.td-status span').text('不显示');
				$trStatusEditOn.addClass('tr-off');
				$trStatusEditOn.find('td.edit .toggle .fa').attr('class', 'fa icon-off');
			}

			//隐藏编辑框
			$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
			$statusEnditBox.hide();
		});

	//显示状态编辑框 取消
	$statusEnditBox.find('.cancel')
		.click(function() {
			//隐藏编辑框
			$('.tr-statusEdit-on').removeClass('tr-statusEdit-on');
			$statusEnditBox.hide();
		});

	//勾选顶部
	$('.bar-header .topN')
		.click(function() {
			var _thisVal = $(this).find('input').val();
			if($(this).find('input').attr('checked') == 'checked') {
				//选中
				$statusEnditBox.find('label.n-' + _thisVal).parent().removeClass('hide');
			} else {
				//取消选中
				$statusEnditBox.find('label.n-' + _thisVal).parent().addClass('hide');
			}
			$statusEnditBox = $('.statusEndit-box'); //刷新$statusEnditBox变量

			topNcheck();
		});

	//顶部勾选时，tr中的span文字同步
	function topNcheck() {
		var topNArr = new Array();
		$('.bar-header .topN input:checked')
			.each(function(i) {
				topNArr[i] = $(this).val();
			});

		//去除status span 中文字
		$('table .td-status')
			.each(function() {
				var $this = $(this);
				var _thisTxt = "";
				var _thisValArr = $this.find('.statusInput').val();
				var _newlen = 0;

				_thisValArr = _thisValArr.split('-');
				$.each(_thisValArr,
					function(i, vali) {
						$.each(topNArr,
							function(j, valj) {
								if(vali == valj) {
									_thisTxt += weekArr[vali] + "，";
									_newlen++;
								}
							});
					});
				_thisTxt = _thisTxt.substring(0, _thisTxt.length - 1); //去除最后一个横杠
				//赋值到tr
				var $thisTr = $this.parent();
				if(_newlen == topNArr.length) {
					//全选
					$this.find('span').text('显示');
					if($thisTr.hasClass('tr-off')) {
						$thisTr.removeClass('tr-off');
						$thisTr.find('td.edit .toggle .fa').attr('class', 'fa icon-on');
					}
				} else if(_thisTxt.length > 0) {
					//勾选部分checkbox
					$this.find('span').text('显示（' + _thisTxt + '）');
					if($thisTr.hasClass('tr-off')) {
						$thisTr.removeClass('tr-off');
						$thisTr.find('td.edit .toggle .fa').attr('class', 'fa icon-on');
					}
				} else {
					//一个都不勾
					$this.find('span').text('不显示');
					$thisTr.addClass('tr-off');
					$thisTr.find('td.edit .toggle .fa').attr('class', 'fa icon-off');
				}
			});
	}

	//点击保存时，根据topN修改statusInput中的值
	$('#ok').click(function() {
		var topNArr = new Array();
		$('.bar-header .topN input:checked')
			.each(function(i) {
				topNArr[i] = $(this).val();
			});

		//去除 statusInput值
		$('table .td-status')
			.each(function() {
				var $this = $(this);
				var _thisval_new = "";
				var _thisValArr = $this.find('.statusInput').val();

				_thisValArr = _thisValArr.split('-');
				$.each(_thisValArr,
					function(i, vali) {
						$.each(topNArr,
							function(j, valj) {
								if(vali == valj) {
									_thisval_new += vali + "-";
								}
							});
					});
				_thisval_new = _thisval_new.substring(0, _thisval_new.length - 1); //去除最后一个横杠
				$this.find('.statusInput').val(_thisval_new);

				//循环计算显示问题
				$this_tr = $(this).parent();
				if($this_tr.hasClass('tr-off')) {
					$this.find('.isshow').val(0);
				} else {
					$this.find('.isshow').val(1);
				}
			});

		$('#rownumber').val($('.table .td-title').length); //计算行数
		if(timeCheck()) {
			layer.msg("时间设置错误");
			return false;
		}
		var d = $('#form1').serializeArray();
		console.log(d);
		var model ={},
		TimeWeekDaysarr = [],
		coursenamearr = [],
		courseorderarr= [],
		sceneidarr =[],
		contentidarr =[] ,
		BeginHourarr = [],
		EndHourarr = [],
		BeginMinutearr =[],
		EndMinutearr = [],
		weekdaysarr =[],
		isshowarr = [];
		$.each(d, function(index, val) {
			if (val.name === "Level") {
				console.log(1, val.value);
			}
			// val.value = val.value ? : 0;
			switch(val.name){
				case "SheetId":
				model.SheetId = val.value;
				break
				case "SheetName":
				model.SheetName = val.value;
				break
				case "BeginTime":
				model.BeginTime = val.value;
				break
				case "EndTime":
				model.EndTime = val.value;
				break
				case "rownumber":
				model.rownumber = val.value;
				break
				case "Level":
				model.Level = val.value;
				break
				case "TimeWeekDays":
				TimeWeekDaysarr.push(val.value);
				break
				case "coursename":
				coursenamearr.push(val.value);
				break
				case "courseorder":
				courseorderarr.push(val.value);
				break
				case "sceneid":
				sceneidarr.push(val.value);
				break
				case "contentid":
				contentidarr.push(val.value);
				break
				case "BeginHour":
				BeginHourarr.push(val.value);
				break
				case "EndHour":
				EndHourarr.push(val.value);
				break
				case "BeginMinute":
				BeginMinutearr.push(val.value);
				break
				case "EndMinute":
				EndMinutearr.push(val.value);
				break
				case "weekdays":
				weekdaysarr.push(val.value);
				break
				case "isshow":
				isshowarr.push(val.value);
				break
			}
		});
		model.TimeWeekDays = TimeWeekDaysarr.join(',')
		model.coursename = coursenamearr.join(',');
		model.courseorder = courseorderarr.join(',');
		model.sceneid = sceneidarr.join(',');
		model.contentid = contentidarr.join(',');
		model.BeginHour = BeginHourarr.join(',');
		model.EndHour = EndHourarr.join(',');
		model.BeginMinute = BeginMinutearr.join(',');
		model.EndMinute = EndMinutearr.join(',');
		model.weekdays_ = weekdaysarr.join(',');
		// model.weekdays = model.weekdays_;
		model.isshow = isshowarr.join(',');
		model.schoolId=getCookieByUserInfo('schoolid');
		console.log(model);
		commonFn({url:'OpenCourse/EditSheetContent',type:'post',data:model},function(res){
			location.href = "restsetlist.html?id=106";
		})
	});

	$table.on('blur',
		'.start-time,.end-time',
		function() {
			timeCheck();
		});

	//检查时间设置是否有错误（后面的大于前面的）
	function timeCheck() {
		var $checkTr = $('.td-status').parent();
		var lastTime_s = lastTime_e = thisTime_s = thisTime_e = 0;
		var lastI;
		var returnBool = false;
		$checkTr.each(function(i, e) {
			var $eachThis = $(this);
			if($eachThis.hasClass('tr-off')) {
				//删除注销项的错误提示
				$eachThis.removeClass('tr-start-error tr-end-error');
				return true;
			};

			//前一个tr和后一个tr
			thisTime_s = $eachThis.find('.start-time').eq(0).val() * 60 +
				$eachThis.find('.start-time').eq(1).val() * 1;
			if(lastTime_s > thisTime_s) {
				$eachThis.addClass('tr-start-error');
				$checkTr.eq(lastI).addClass('tr-start-error');
				returnBool = true;
			} else {
				$eachThis.removeClass('tr-start-error');
			}

			//前一个tr的结束时间和这一个tr的开始时间
			if(lastTime_e > thisTime_s) {
				$eachThis.addClass('tr-start-error');
				$checkTr.eq(lastI).addClass('tr-only-end-error');
				// $checkTr.eq(lastI).find('.start-time').css("border-color", "auto; !important");
				returnBool = true;
			} else {
				$eachThis.removeClass('tr-only-end-error');
			}

			//开始时间和结束时间
			thisTime_e = $eachThis.find('.end-time').eq(0).val() * 60 + $eachThis.find('.end-time').eq(1).val() * 1;

			if(thisTime_s > thisTime_e) {
				$eachThis.addClass('tr-end-error');
				returnBool = true;
			} else {
				$eachThis.removeClass('tr-end-error');
			}

			//赋值到last
			lastTime_s = thisTime_s;
			lastTime_e = thisTime_e;
			lastI = i;
		});
		return returnBool;
	}



var DataDeal = {  
//将从form中通过$('#form').serialize()获取的值转成json  
   	formToJson: function (data) {  
       	data=data.replace(/&/g,"\",\"");  
       	data=data.replace(/=/g,"\":\"");  
       	data="{\""+data+"\"}";  
       	return data;  
    },  
};  



function SetCheckedStatus(weeks) {
	if(weeks == null || weeks == '') return;
	var week = weeks.split(',');
	var boxes = document.getElementsByName("TimeWeekDays");
	for(var i = 0; i < boxes.length; i++) {
		for(var j = 0; j < week.length; j++) {
			if(boxes[i].value == week[j]) {
				boxes[i].checked = true;
				break
			}
		}
	}
}

function GetTurnStatus(isshow) {
	if(isshow == 0) {
		return "tr-off";

	}
	return "";
}

function IsShowOn(isshow) {
	if(isshow == 0) {
		return "icon-off";

	}
	return "icon-on";
}

function CanTurnOn(scenid) {
	if(scenid == 3) {
		return "";
	}
	return "readonly=\"readonly\" style=\"background-color:#dddddd\"";
}

function GetCourseOrder(val, courseorder, type) {
	if(val == 0) return courseorder;
	switch(type) {
		case 1:
			return 9;
		case 2:
			return 8;
		case 3:
			return 5;
		default:
			return 0;
	}
}

function GetWeekdayCompare(timeWeekDay, thisWeekDay) {
	if (timeWeekDay) {
		if(timeWeekDay == thisWeekDay) return "";
		return "(" + GetWeekDays(thisWeekDay) + ")";
	}
	return ""
}

function ReplaceWeeks(weeks) {
	weeks = weeks.replace(/,/g, "-");
	return weeks;
}
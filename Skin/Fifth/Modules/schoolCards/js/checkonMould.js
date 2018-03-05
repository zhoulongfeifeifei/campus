

commonFn({ url: 'XAWebXiaopai/Get_kqTemplate' + window.location.search + '&type=0', type: 'GET' }, function (res) {
    var info = res.resultData;
    if (res.stu_MinLate != 0 || res.stu_MinEarly != 0) {
        $('.bar-tab-content-1 input[name="isopen"]').prop('checked', true)
    }
    $('.bar-tab-content-1 input[name="minlate"]').val(res.stu_MinLate);
    $('.bar-tab-content-1 input[name="minearly"]').val(res.stu_MinEarly);
    $.each(info, function (i) {
        var html = '<div id="st' + i + '" class="span-item" data_id="' + info[i].templateID + '">' +
            '<span class="del btn btn-red" onClick="del_spanItem(this,\'stu\')">删除</span>';
        html += '<p>' +
            '<label class="t">考勤对象：</label>' +
            '<select name="stu_stutype">' +
            '<option value="0">所有学生</option>' +
            '<option value="1">通校生</option>' +
            '<option value="2">住校生</option>' +
            '</select>' +
            '<p>';
        html += '<p>' +
            '<label class="t">开始时间：</label>' +
            '<select class="Hour" name="stu_starthour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="stu_startminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">结束时间：</label>' +
            '<select class="Hour" name="stu_endhour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="stu_endminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">重复刷卡限制时间：</label>' +
            '<input class="w-50" name="stu_repeattime"/> 秒' +
            '</p>' +
            '<p>' +
            '<label class="t">类型：</label>' +
            '<select name="stu_type"><option value="0">早上到校</option><option value="1">中午离校</option><option value="2">下午到校</option><option value="3">下午离校</option><option value="4">晚上到校</option><option value="5">晚上离校</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">周信息：</label>' +
            '<label><input type="checkbox" class="w0 w" name="stu_w' +
            i +
            '" value="0">星期日</label>' +
            '<label><input type="checkbox" class="w1 w" name="stu_w' +
            i +
            '" value="1">星期一</label>' +
            '<label><input type="checkbox" class="w2 w" name="stu_w' +
            i +
            '" value="2">星期二</label>' +
            '<label><input type="checkbox" class="w3 w" name="stu_w' +
            i +
            '" value="3">星期三</label>' +
            '<label><input type="checkbox" class="w4 w" name="stu_w' +
            i +
            '" value="4">星期四</label>' +
            '<label><input type="checkbox" class="w5 w" name="stu_w' +
            i +
            '" value="5">星期五</label>' +
            '<label><input type="checkbox" class="w6 w" name="stu_w' +
            i +
            '" value="6">星期六</label>' +
            '</p>' +
            '<p>' +
            '<label class="t">短信内容：</label>' +
            '<input name="stu_detail" class="w-300" />' +
            '</p>';


        html += '<p>' +
            '<label class="t">语音播报：</label>' +
            '<input value="" name="stu_voice" class="w-300" />' +
            '<label class="text">注：所有标点符号请用中文符号</label>' +
            '</p>';

        html += '<hr/>' + '</div>';
        $('.bar-tab-content-1 .add-item').before(html);
        $("#stutempcount").val(info.length);
        for (j = 0; j < $('#st' + i + ' select[name="stu_stutype"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_stutype"] option')[j].value == info[i].stuType) {
                $('#st' + i + ' select[name="stu_stutype"] option')[j].selected = true;
            }
        }
        var bTh = info[i].beginTime.substr(0, 2);
        var bTm = info[i].beginTime.substr(3, 2);
        var eTh = info[i].endTime.substr(0, 2);
        var eTm = info[i].endTime.substr(3, 2);
        for (j = 0; j < $('#st' + i + ' select[name="stu_starthour"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_starthour"] option')[j].value == bTh) {
                $('#st' + i + ' select[name="stu_starthour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#st' + i + ' select[name="stu_startminute"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_startminute"] option')[j].value == bTm) {
                $('#st' + i + ' select[name="stu_startminute"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#st' + i + ' select[name="stu_endhour"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_endhour"] option')[j].value == eTh) {
                $('#st' + i + ' select[name="stu_endhour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#st' + i + ' select[name="stu_endminute"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_endminute"] option')[j].value == eTm) {
                $('#st' + i + ' select[name="stu_endminute"] option')[j].selected = true;
            }
        }
        $('#st' + i + ' input[name="stu_repeattime"]').attr('value', info[i].repeatTime);
        for (j = 0; j < $('#st' + i + ' select[name="stu_type"] option').length; j++) {
            if ($('#st' + i + ' select[name="stu_type"] option')[j].value == info[i].type) {
                $('#st' + i + ' select[name="stu_type"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#st' + i + '  input[type="checkbox"]').length; j++) {
            if (info[i].week.indexOf($('#st' + i + '  input[type="checkbox"]')[j].value) != -1) {
                $('#st' + i + '  input[type="checkbox"]').eq(j).prop('checked', true);
            }
        }
        $('#st' + i + ' input[name="stu_detail"]').attr('value', info[i].detail);
        $('#st' + i + ' input[name="stu_voice"]').attr('value', info[i].voice);

    })


    $('#stusave').click(function () {

        var spanItemLength = $('.bar-tab-content-1 .span-item').length;
        if ($('.bar-tab-content-1 input[name="isopen"]').is(':checked')) {
            open = 'on'
        } else {
            open = 'off'
        }
        if (spanItemLength <= 0) {
            return;
        } else {
            var arr = [];
            arr.length = spanItemLength;
            $('.bar-tab-content-1 .span-item').each(function (j) {
                $(this).addClass('sp' + $(this).index()).siblings().removeClass('sp' + $(this).index())
                var weeks = "";
                var weekslen = $('.sp' + $(this).index() + '  input[type="checkbox"]:checked').length - 1;
                $('.sp' + $(this).index() + '  input[type="checkbox"]:checked').each(function (n) {
                    var $this = $(this);
                    if ($('.sp' + $(this).index() + '  input[type="checkbox"]:checked').length > 0) {
                        weeks += $this.val();
                        if (n != weekslen) {
                            weeks += ",";
                        }
                    }
                });
                arr[j] = {};
                arr[j].beginTime = $('.sp' + $(this).index() + '  select[name="stu_starthour"] option:selected').val() + ':' + $('.sp' + $(this).index() + ' select[name="stu_startminute"] option:selected').val();
                arr[j].endTime = $('.sp' + $(this).index() + ' select[name="stu_endhour"] option:selected').val() + ':' + $('.sp' + $(this).index() + ' select[name="stu_endminute"] option:selected').val();
                arr[j].repeatTime = $('.sp' + $(this).index() + ' input[name="stu_repeattime"]').val();
                arr[j].type = $('.sp' + $(this).index() + ' select[name="stu_type"] option:selected').val();
                arr[j].stuType = $('.sp' + $(this).index() + ' select[name="stu_stutype"] option:selected').val();
                arr[j].voice = $('.sp' + $(this).index() + ' input[name="stu_voice"]').val();
                arr[j].detail = $('.sp' + $(this).index() + ' input[name="stu_detail"]').val();
                arr[j].week = weeks;
                if ($('.sp' + $(this).index()).attr('data_id')) {
                    arr[j].templateID = $('.sp' + $(this).index()).attr('data_id')
                }

            });

            var model = {};
            model.minLate = $('.bar-tab-content-1 input[name="minlate"]').val();
            model.minEarly = $('.bar-tab-content-1 input[name="minearly"]').val();
            model.deviceid = window.location.search.replace('?clint_id=', '');
            model.isOpen = open;
            model.type = 0;
            model.template = arr;

            if ($('.sp' + $(this).index() + ' input[name="stu_repeattime"]').val() == '') {
                alert('请填写重复刷卡时间');
                return
            } else {
                commonFn({ url: 'XAWebXiaopai/Update_KqTemplate', type: 'POST', data: model }, function (res) {
                    if (res == true) {
                        alert('修改成功！')
                    }
                    location.href = 'device.html';
                })
            }

        }


    });
})


commonFn({ url: 'XAWebXiaopai/Get_kqTemplate' + window.location.search + '&type=1', type: 'GET' }, function (res) {
    var info = res.resultData;
    if (res.par_MinLate != 0 || res.par_MinEarly != 0) {
        $('.bar-tab-content-2 input[name="isopen"]').prop('checked', true)
    }
    $('.bar-tab-content-2 input[name="minlate"]').val(res.par_MinLate);
    $('.bar-tab-content-2 input[name="minearly"]').val(res.par_MinEarly);
    $.each(info, function (i) {
        var html = '<div id="pa' + i + '" class="span-item" data_id="' + info[i].templateID + '">' +
            '<span class="del btn btn-red" onClick="del_spanItem(this,\'par\')">删除</span>';
        html += '<p>' +
            '<label class="t">开始时间：</label>' +
            '<select class="Hour" name="par_starthour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="par_startminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">结束时间：</label>' +
            '<select class="Hour" name="par_endhour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="par_endminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">重复刷卡限制时间：</label>' +
            '<input class="w-50" name="par_repeattime"/> 秒' +
            '</p>' +
            '<p>' +
            '<label class="t">类型：</label>' +
            '<select name="par_type"><option value="0">早上到校</option><option value="1">中午离校</option><option value="2">下午到校</option><option value="3">下午离校</option><option value="4">晚上到校</option><option value="5">晚上离校</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">周信息：</label>' +
            '<label><input type="checkbox" class="w0 w" name="par_w' +
            i +
            '" value="0">星期日</label>' +
            '<label><input type="checkbox" class="w1 w" name="par_w' +
            i +
            '" value="1">星期一</label>' +
            '<label><input type="checkbox" class="w2 w" name="par_w' +
            i +
            '" value="2">星期二</label>' +
            '<label><input type="checkbox" class="w3 w" name="par_w' +
            i +
            '" value="3">星期三</label>' +
            '<label><input type="checkbox" class="w4 w" name="par_w' +
            i +
            '" value="4">星期四</label>' +
            '<label><input type="checkbox" class="w5 w" name="par_w' +
            i +
            '" value="5">星期五</label>' +
            '<label><input type="checkbox" class="w6 w" name="par_w' +
            i +
            '" value="6">星期六</label>' +
            '</p>' +
            '<p>' +
            '<label class="t">短信内容：</label>' +
            '<input name="par_detail" class="w-300" />' +
            '</p>';


        html += '<p>' +
            '<label class="t">语音播报：</label>' +
            '<input value="" name="par_voice" class="w-300" />' +
            '<label class="text">注：所有标点符号请用中文符号</label>' +
            '</p>';

        html += '<hr/>' + '</div>';
        $('.bar-tab-content-2 .add-item').before(html);
        $("#partempcount").val(info.length);

        var bTh = info[i].beginTime.substr(0, 2);
        var bTm = info[i].beginTime.substr(3, 2);
        var eTh = info[i].endTime.substr(0, 2);
        var eTm = info[i].endTime.substr(3, 2);
        for (j = 0; j < $('#pa' + i + ' select[name="par_starthour"] option').length; j++) {
            if ($('#pa' + i + ' select[name="par_starthour"] option')[j].value == bTh) {
                $('#pa' + i + ' select[name="par_starthour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#pa' + i + ' select[name="par_startminute"] option').length; j++) {
            if ($('#pa' + i + ' select[name="par_startminute"] option')[j].value == bTm) {
                $('#pa' + i + ' select[name="par_startminute"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#pa' + i + ' select[name="par_endhour"] option').length; j++) {
            if ($('#pa' + i + ' select[name="par_endhour"] option')[j].value == eTh) {
                $('#pa' + i + ' select[name="par_endhour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#pa' + i + ' select[name="par_endminute"] option').length; j++) {
            if ($('#pa' + i + ' select[name="par_endminute"] option')[j].value == eTm) {
                $('#pa' + i + ' select[name="par_endminute"] option')[j].selected = true;
            }
        }
        $('#pa' + i + ' input[name="par_repeattime"]').attr('value', info[i].repeatTime);
        for (j = 0; j < $('#pa' + i + ' select[name="par_type"] option').length; j++) {
            if ($('#pa' + i + ' select[name="par_type"] option')[j].value == info[i].type) {
                $('#pa' + i + ' select[name="par_type"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#pa' + i + '  input[type="checkbox"]').length; j++) {
            if (info[i].week.indexOf($('#pa' + i + '  input[type="checkbox"]')[j].value) != -1) {
                $('#pa' + i + '  input[type="checkbox"]').eq(j).prop('checked', true);
            }
        }
        $('#pa' + i + ' input[name="par_detail"]').attr('value', info[i].detail);
        $('#pa' + i + ' input[name="par_voice"]').attr('value', info[i].voice);




    })


    $('#parsave').click(function () {

        var spanItemLength = $('.bar-tab-content-2 .span-item').length;
        if ($('.bar-tab-content-2 input[name="isopen"]').is(':checked')) {
            open = 'on'
        } else {
            open = 'off'
        }
        if (spanItemLength <= 0) {
            return;
        } else {
            var arr = [];
            arr.length = spanItemLength;
            $('.bar-tab-content-2 .span-item').each(function (j) {
                $(this).addClass('pa' + $(this).index()).siblings().removeClass('pa' + $(this).index())
                var weeks = "";
                var weekslen = $('.pa' + $(this).index() + '  input[type="checkbox"]:checked').length - 1;
                $('.pa' + $(this).index() + '  input[type="checkbox"]:checked').each(function (n) {
                    var $this = $(this);
                    if ($('.pa' + $(this).index() + '  input[type="checkbox"]:checked').length > 0) {
                        weeks += $this.val();
                        if (n != weekslen) {
                            weeks += ",";
                        }
                    }
                });
                arr[j] = {};
                arr[j].beginTime = $('.pa' + $(this).index() + '  select[name="par_starthour"] option:selected').val() + ':' + $('.pa' + $(this).index() + ' select[name="par_startminute"] option:selected').val();
                arr[j].endTime = $('.pa' + $(this).index() + ' select[name="par_endhour"] option:selected').val() + ':' + $('.pa' + $(this).index() + ' select[name="par_endminute"] option:selected').val();
                arr[j].repeatTime = $('.pa' + $(this).index() + ' input[name="par_repeattime"]').val();
                arr[j].type = $('.pa' + $(this).index() + ' select[name="par_type"] option:selected').val();
                arr[j].stuType = 1;
                arr[j].voice = $('.pa' + $(this).index() + ' input[name="par_voice"]').val();
                arr[j].detail = $('.pa' + $(this).index() + ' input[name="par_detail"]').val();
                arr[j].week = weeks;
                if ($('.pa' + $(this).index()).attr('data_id')) {
                    arr[j].templateID = $('.pa' + $(this).index()).attr('data_id')
                }

            });

            var model = {};
            model.minLate = $('.bar-tab-content-2 input[name="minlate"]').val();
            model.minEarly = $('.bar-tab-content-2 input[name="minearly"]').val();
            model.deviceid = window.location.search.replace('?clint_id=', '');
            model.isOpen = open;
            model.type = 1;
            model.template = arr;

            if ($('.pa' + $(this).index() + ' input[name="par_repeattime"]').val() == '') {
                alert('请填写重复刷卡时间');
                return;
            } else {
                commonFn({ url: 'XAWebXiaopai/Update_KqTemplate', type: 'POST', data: model }, function (res) {
                    if (res == true) {
                        alert('修改成功！')
                    }
                    location.href = 'device.html';
                })
            }

        }

    });
})


commonFn({ url: 'XAWebXiaopai/Get_kqTemplate' + window.location.search + '&type=2', type: 'GET' }, function (res) {
    var info = res.resultData;
    if (res.tea_MinLate != 0 || res.tea_MinEarly != 0) {
        $('.bar-tab-content-3 input[name="isopen"]').prop('checked', true)
    }
    $('.bar-tab-content-3 input[name="minlate"]').val(res.tea_MinLate);
    $('.bar-tab-content-3 input[name="minearly"]').val(res.tea_MinEarly);
    $.each(info, function (i) {
        var html = '<div id="te' + i + '" class="span-item" data_id="' + info[i].templateID + '">' +
            '<span class="del btn btn-red" onClick="del_spanItem(this,\'tea\')">删除</span>';
        html += '<p>' +
            '<label class="t">开始时间：</label>' +
            '<select class="Hour" name="tea_starthour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="tea_startminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">结束时间：</label>' +
            '<select class="Hour" name="tea_endhour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
            '<select class="Minute" name="tea_endminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">重复刷卡限制时间：</label>' +
            '<input class="w-50" name="tea_repeattime"/> 秒' +
            '</p>' +
            '<p>' +
            '<label class="t">类型：</label>' +
            '<select name="tea_type"><option value="0">早上到校</option><option value="1">中午离校</option><option value="2">下午到校</option><option value="3">下午离校</option><option value="4">晚上到校</option><option value="5">晚上离校</option></select>' +
            '</p>' +
            '<p>' +
            '<label class="t">周信息：</label>' +
            '<label><input type="checkbox" class="w0 w" name="tea_w' +
            i +
            '" value="0">星期日</label>' +
            '<label><input type="checkbox" class="w1 w" name="tea_w' +
            i +
            '" value="1">星期一</label>' +
            '<label><input type="checkbox" class="w2 w" name="tea_w' +
            i +
            '" value="2">星期二</label>' +
            '<label><input type="checkbox" class="w3 w" name="tea_w' +
            i +
            '" value="3">星期三</label>' +
            '<label><input type="checkbox" class="w4 w" name="tea_w' +
            i +
            '" value="4">星期四</label>' +
            '<label><input type="checkbox" class="w5 w" name="tea_w' +
            i +
            '" value="5">星期五</label>' +
            '<label><input type="checkbox" class="w6 w" name="tea_w' +
            i +
            '" value="6">星期六</label>' +
            '</p>' +
            '<p>' +
            '<label class="t">短信内容：</label>' +
            '<input name="tea_detail" class="w-300" />' +
            '</p>';


        html += '<p>' +
            '<label class="t">语音播报：</label>' +
            '<input value="" name="tea_voice" class="w-300" />' +
            '<label class="text">注：所有标点符号请用中文符号</label>' +
            '</p>';

        html += '<hr/>' + '</div>';
        $('.bar-tab-content-3 .add-item').before(html);
        $("#teatempcount").val(info.length);

        var bTh = info[i].beginTime.substr(0, 2);
        var bTm = info[i].beginTime.substr(3, 2);
        var eTh = info[i].endTime.substr(0, 2);
        var eTm = info[i].endTime.substr(3, 2);
        for (j = 0; j < $('#te' + i + ' select[name="tea_starthour"] option').length; j++) {
            if ($('#te' + i + ' select[name="tea_starthour"] option')[j].value == bTh) {
                $('#te' + i + ' select[name="tea_starthour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#te' + i + ' select[name="tea_startminute"] option').length; j++) {
            if ($('#te' + i + ' select[name="tea_startminute"] option')[j].value == bTm) {
                $('#te' + i + ' select[name="tea_startminute"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#te' + i + ' select[name="tea_endhour"] option').length; j++) {
            if ($('#te' + i + ' select[name="tea_endhour"] option')[j].value == eTh) {
                $('#te' + i + ' select[name="tea_endhour"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#te' + i + ' select[name="tea_endminute"] option').length; j++) {
            if ($('#te' + i + ' select[name="tea_endminute"] option')[j].value == eTm) {
                $('#te' + i + ' select[name="tea_endminute"] option')[j].selected = true;
            }
        }
        $('#te' + i + ' input[name="tea_repeattime"]').attr('value', info[i].repeatTime);
        for (j = 0; j < $('#te' + i + ' select[name="tea_type"] option').length; j++) {
            if ($('#te' + i + ' select[name="tea_type"] option')[j].value == info[i].type) {
                $('#te' + i + ' select[name="tea_type"] option')[j].selected = true;
            }
        }
        for (j = 0; j < $('#te' + i + '  input[type="checkbox"]').length; j++) {
            if (info[i].week.indexOf($('#te' + i + '  input[type="checkbox"]')[j].value) != -1) {
                $('#te' + i + '  input[type="checkbox"]').eq(j).prop('checked', true);
            }
        }
        $('#te' + i + ' input[name="tea_detail"]').attr('value', info[i].detail);
        $('#te' + i + ' input[name="tea_voice"]').attr('value', info[i].voice);




    })


    $('#teasave').click(function () {

        var spanItemLength = $('.bar-tab-content-3 .span-item').length;
        if ($('.bar-tab-content-3 input[name="isopen"]').is(':checked')) {
            open = 'on'
        } else {
            open = 'off'
        }
        if (spanItemLength <= 0) {
            return;
        } else {
            var arr = [];
            arr.length = spanItemLength;
            $('.bar-tab-content-3 .span-item').each(function (j) {
                $(this).addClass('te' + $(this).index()).siblings().removeClass('te' + $(this).index())
                var weeks = "";
                var weekslen = $('.te' + $(this).index() + '  input[type="checkbox"]:checked').length - 1;
                $('.te' + $(this).index() + '  input[type="checkbox"]:checked').each(function (n) {
                    var $this = $(this);
                    if ($('.te' + $(this).index() + '  input[type="checkbox"]:checked').length > 0) {
                        weeks += $this.val();
                        if (n != weekslen) {
                            weeks += ",";
                        }
                    }
                });
                arr[j] = {};
                arr[j].beginTime = $('.te' + $(this).index() + '  select[name="tea_starthour"] option:selected').val() + ':' + $('.te' + $(this).index() + ' select[name="tea_startminute"] option:selected').val();
                arr[j].endTime = $('.te' + $(this).index() + ' select[name="tea_endhour"] option:selected').val() + ':' + $('.te' + $(this).index() + ' select[name="tea_endminute"] option:selected').val();
                arr[j].repeatTime = $('.te' + $(this).index() + ' input[name="tea_repeattime"]').val();
                arr[j].type = $('.te' + $(this).index() + ' select[name="tea_type"] option:selected').val();
                arr[j].stuType = 1;
                arr[j].voice = $('.te' + $(this).index() + ' input[name="tea_voice"]').val();
                arr[j].detail = $('.te' + $(this).index() + ' input[name="tea_detail"]').val();
                arr[j].week = weeks;
                if ($('.te' + $(this).index()).attr('data_id')) {
                    arr[j].templateID = $('.te' + $(this).index()).attr('data_id')
                }

            });

            var model = {};
            model.minLate = $('.bar-tab-content-3 input[name="minlate"]').val();
            model.minEarly = $('.bar-tab-content-3 input[name="minearly"]').val();
            model.deviceid = window.location.search.replace('?clint_id=', '');
            model.isOpen = open;
            model.type = 2;
            model.template = arr;

            if ($('.te' + $(this).index() + ' input[name="tea_repeattime"]').val() == '') {
                alert('请填写重复刷卡时间');
                return;
            } else {
                commonFn({ url: 'XAWebXiaopai/Update_KqTemplate', type: 'POST', data: model }, function (res) {
                    if (res == true) {
                        alert('修改成功！')
                    }
                    location.href = 'device.html';
                })
            }

        }

    });
})



//应用到所有模板
function applyall(type) {
    // var clintid = "109CB00B375A8D7E";
    // $.post('/common/Ajax.aspx', { action: 'device.applyall', clintid: clintid, type: tabindex }, function (json) {
    //     if (json.status) {
    //         location.href = "../EquipmentTemplate/BasicSettings.aspx";
    //     } else top.parent.showTips(json.message, 5);
    // }, 'json');
    commonFn({ url: 'XAWebXiaopai/AllApply_template?deviceid=' + window.location.search.replace('?clint_id=', '') + '&type=' + type + '&schoolid=' + window.schoolid, type: 'GET' }, function (res) {
        if (res == true) {
            alert('应用成功！')
        }
    })
}

var $addSpanItem = $('.add-item');
function add_spanItem(temptype, tabindex) {
    var oricount = $("#" + temptype + "tempcount").val();
    var ori = parseInt(oricount);
    var nowcount = ori++;
    var html = '<div class="span-item sp' + ori + '">' +
        '<span class="del btn btn-red" onClick="del_spanItem(this,\'' + temptype + '\')">删除</span>';
    if (temptype == "stu") {
        html += '<p>' +
            '<label class="t">考勤对象：</label>' +
            '<select name="stu_stutype">' +
            '<option value="0">所有学生</option>' +
            '<option value="1">通校生</option>' +
            '<option value="2">住校生</option>' +
            '</select>' +
            '<p>';
    }
    html += '<p>' +
        '<label class="t">开始时间：</label>' +
        '<select class="Hour" name="' +
        temptype +
        '_starthour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
        '<select class="Minute" name="' +
        temptype +
        '_startminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
        '</p>' +
        '<p>' +
        '<label class="t">结束时间：</label>' +
        '<select class="Hour" name="' +
        temptype +
        '_endhour"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>' +
        '<select class="Minute" name="' +
        temptype +
        '_endminute"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>' +
        '</p>' +
        '<p>' +
        '<label class="t">重复刷卡限制时间：</label>' +
        '<input class="w-50" name="' +
        temptype +
        '_repeattime"/> 秒' +
        '</p>' +
        '<p>' +
        '<label class="t">类型：</label>' +
        '<select name="' +
        temptype +
        '_type"><option value="1">早上到校</option><option value="2">中午离校</option><option value="3">下午到校</option><option value="4">下午离校</option><option value="5">晚上到校</option><option value="6">晚上离校</option></select>' +
        '</p>' +
        '<p>' +
        '<label class="t">周信息：</label>' +
        '<label><input type="checkbox" class="w0 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="0">星期日</label>' +
        '<label><input type="checkbox" class="w1 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="1">星期一</label>' +
        '<label><input type="checkbox" class="w2 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="2">星期二</label>' +
        '<label><input type="checkbox" class="w3 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="3">星期三</label>' +
        '<label><input type="checkbox" class="w4 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="4">星期四</label>' +
        '<label><input type="checkbox" class="w5 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="5">星期五</label>' +
        '<label><input type="checkbox" class="w6 w" name="' +
        temptype +
        '_w' +
        nowcount +
        '" value="6">星期六</label>' +
        '</p>' +
        '<p>' +
        '<label class="t">短信内容：</label>' +
        '<input name="' +
        temptype +
        '_detail" class="w-300" />' +
        '</p>';


    html += '<p>' +
        '<label class="t">语音播报：</label>' +
        '<input value="" name="' + temptype + '_voice" class="w-300" />' +
        '<label class="text">注：所有标点符号请用中文符号</label>' +
        '</p>';

    html += '<hr/>' + '</div>';
    $('.bar-tab-content-' + tabindex + ' .add-item').before(html);
    //$addSpanItem.before(html);
    $("#" + temptype + "tempcount").val(nowcount);
}

function del_spanItem(e, temptype) {
    $(e).parent().find('p').css('background-color', '#ffe3e3');
    if (confirm('确定删除该项')) {
        $(e).parent().remove();
        var oricount = $("#" + temptype + "tempcount").val();
        var ori = parseInt(oricount);
        var nowcount = ori--;
        $("#" + temptype + "tempcount").val(nowcount);
    } else {
        $(e).parent().find('p').css('background-color', '#fff');
    }
}


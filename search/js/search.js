var $wd = $('#wd'),
	$result = $('#result'),
	onoff = true,
	num = -1,
	txt;

$wd.focus();

$wd.on('keyup', postData);

$('#prompt').on('mouseover', function() {
	onoff = true;
}).on('mouseout', function() {
	onoff = false;
});

$wd.on('focus', function() {
	if (this.value) {
		$('#prompt').show();
		return false;
	}
});

$wd.on('blur', function() {
	if (!onoff) {
		$('#prompt').hide();
	}
});

$(document).on('keydown', select_ele);

//监听document的键盘事件
function select_ele(e) {
	var ev = e || event,
		Len = $('#result li').length;
	switch (ev.keyCode) {
		case 38:
			num--;
			if (num < 0) num = Len - 1;
			resetClass();
			break;
		case 40:
			num++;
			num %= Len;
			resetClass();
			break;
		case 13:
			var search_cont = $('li.active .txt_link').attr('href');
			window.open(search_cont);
	}
	$(this).on('keyup', function() {
		$wd.on('keyup', postData);
	});
}

//清除li元素类名，解绑wd的onkeyup事件；
function resetClass() {
	$('#result li').each(function() {
		$(this).attr('class', '');
	});
	$('#result li').eq(num).addClass('active');
	$wd.val($('#result li a').eq(num).text());
	$wd.off('keyup', postData);
}

//监听搜索框按键抬起事件；
function postData() {
	if (this.value !== '') {
		var oScript = document.createElement('script');
		$('#prompt').show().css({
			top: $('#search_form').offset().top + $('#search_form').outerHeight(),
			left: $('#search_form').offset().left,
			position: 'absolute'
		});
		oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.value + '&cb=getData';
		document.body.appendChild(oScript);
	} else {
		$result.parent().hide();
	}
}

//触发jsonp后的回调函数；
function getData(data) {
	var $result = $('#result');
	if (data.s.length) {
		var txt = template('templateData', data);
		$result.parent().show();
		$result.html(txt);
	} else {
		$result.parent().hide();
	}
}

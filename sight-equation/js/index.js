$(function(){
	var aSection = document.getElementById( 'box' ).getElementsByTagName( 'section' );
	var container = document.getElementById( 'container' );
	var aImg = container.getElementsByTagName( 'img' );
	var onoff = true;
	var oBtn = document.getElementById( 'btn' );
	var aBtn = oBtn.getElementsByTagName( 'li' );
	var num = 0;
	var m = 0;
	var n = 40;
	var hidden, state, visibilityChange; 

	//判断用户是否正在观看你的页面
	if (typeof document.hidden !== "undefined") {
		hidden = "hidden";
		visibilityChange = "visibilitychange";
		state = "visibilityState";
	} else if (typeof document.mozHidden !== "undefined") {
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
		state = "mozVisibilityState";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
		state = "msVisibilityState";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
		state = "webkitVisibilityState";
	}

	document.addEventListener(visibilityChange, function() {
		// document.title = document[state];
		if( document[state] == 'hidden' ){
			clearInterval( container.timer );
		}
	}, false);
	if( document[state] == 'visible' ){
		move();
	}


	//初始化每个子页面的高度
	bind( window, 'load', setHeight );
	//css图片效果
	bind( window, 'load', function(){
		stage( container );
	})
	bind( container, 'mouseout', function(){
		move();
	})
	//css轮播图点击翻页功能;
	/*bind( container, 'click', function(){
		this.style.transform = 'rotateY(' + ( - (++m) ) * n + 'deg)';
	})*/



	function move(){
		container.timer = setInterval(function(){
			container.style.transform = 'rotateY(' + ( - (++m) ) * n + 'deg)';
			bind( container, 'mousemove', function(){
				clearInterval( container.timer );
			})
		},2000)
	}
	//初始化页面位移效果
	bind( window, 'load', function(){
		show( 'section'+ num );
	});
	bind( window, 'scroll', setHeight );
	//文档滚动条滚动时的效果类名的切换
	bind( document, 'mousewheel', mouseWheel );
	bind( document, 'DOMMouseScroll', mouseWheel );

	//右侧按钮点击事件
	aBtn[num].className = 'btn active';
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;
			aBtn[i].onclick = function(){
				if( onoff ){
					onoff = false;
					num = this.index;
					for (var i = 0; i < aBtn.length; i++) {
						aBtn[i].className = 'btn';
						hide( 'section' + i );
					};
					aBtn[num].className = 'btn active';
					show( 'section' + num );
					animated( num * docHeight(), function(){
						onoff =  true;
					} );
				}
			};
	};
	// window.location.href=window.location+"?" + Math.random();

	function mouseWheel( ev ){
		var e = ev || event;
		var detail = Math.max( -1, Math.min( 1, ( e.wheelDelta || -e.detail ) ) );
		if( detail > 0 ){
			//向上滚动
			if( onoff ){
				onoff = false;
				num--;
				num < 0 ? ( num = aSection.length - 1, hide( 'section' + 0 ) ) : hide( 'section' + ( num + 1 ) );
			}
		} else{
			//向下滚动
			if( onoff ){
				onoff = false;
				num++;
				num > aSection.length - 1 ? ( num = 0,hide( 'section' + ( aSection.length - 1 ) ) ) : hide( 'section' + ( num - 1 ) );
			}
		}
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].className = 'btn';
		};
		aBtn[num].className = 'btn active';
		show( 'section' + num );
		animated( num * docHeight(), function(){
			onoff = true;
		} )
	}

	function animated( t, fn ){
		//t为清定时器的条件( value = t )
		var timer = null;
		var dir = 30;
		scrollT() > t ? dir = -dir : 0;
		clearInterval( timer );
		timer = setInterval( function(){
			var value = 0;
			var icur = ( t - scrollT() ) / 20;
			icur = icur > 0 ? Math.ceil( icur ) : Math.floor( icur );
			value = scrollT() + icur;
			// console.log( value, scrollT(), icur, dir, t );
			( dir >= 0 && value >= t ) || ( dir <= 0 && value <= t ) ? ( clearInterval( timer ),value = t,fn && fn() ) : 'null';
			document.documentElement.scrollTop = document.body.scrollTop = value;
			document.title = value;
		},20)

	}

	function stage( ele ){
		var aImg = ele.getElementsByTagName( 'img' );
		for (var i = 0; i < aImg.length; i++) {
			aImg[i].style.transform = "rotateY("+i* 40+"deg) translateZ(" + ( 100 / ( Math.tan( 20 / 180 * Math.PI ) ) + 20 )+"px )";
			ele.style.transform = "rotateY(0deg)";
		};
	}

	function show( ele ){
		var aDiv = document.getElementById( ele ).getElementsByTagName( 'div' );
		for (var i = 0; i < aDiv.length; i++) {
			aDiv[i].className = 'on';
		};
	}

	function hide( ele ){
		var eles = document.getElementById( ele );
		var aDiv = eles.getElementsByTagName( 'div' );
		for (var i = 0; i < aDiv.length; i++) {
			aDiv[i].className = '';
		};
	}

	//动态设置每个子页面的高度
	function setHeight(){
		var i = 0;
		while( i < aSection.length ){
			aSection[i].style.height = docHeight() + 'px';
			i++;
		}
	}

	//绑定事件的方法
	function bind( ele, event, fn ){
		return ele.addEventListener ? ele.addEventListener( event, fn, false ) : ele.attachEvent( 'on' + event, fn );
	}

	//获取滚动条超出文档的高度
	function scrollT(){
		return document.documentElement.scrollTop || document.body.scrollTop;
	}

	//获取文档可视区高度
	function docHeight(){
		return document.documentElement.clientHeight || document.body.clientHeight;
	}

})
//解决右侧按钮点击没有过度效果的问题
//在此基础上引入了css shake效果
//新增了一个css3点击图片轮播的效果
 
